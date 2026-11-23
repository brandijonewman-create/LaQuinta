// Real-business checks for free listing submissions (hub, Nov 21, 2026).
// Every check returns { pass: true | false | null, ... }. null means the check
// could not run (missing credentials or an outage). Anything short of a pass
// sends the listing to Brandi Jo's review (she gets an email). Nothing is declined automatically.
import crypto from 'crypto';
import { categoryBySlug } from './index';

// ZIP codes inside the map area: Scottsdale, Paradise Valley, Fountain Hills,
// Cave Creek and Carefree.
export const MAP_AREA_ZIPS = new Set([
  '85250', '85251', '85254', '85255', '85256', '85257', '85258', '85259', '85260', '85262', '85266',
  '85253', // Paradise Valley
  '85268', // Fountain Hills
  '85331', // Cave Creek
  '85377', // Carefree
]);

const now = () => new Date();

export function checkMapArea(zip) {
  return { pass: MAP_AREA_ZIPS.has(zip), zip, checkedAt: now() };
}

const LEGAL = /\b(llc|l\.l\.c\.|inc|incorporated|co|corp|corporation|company|ltd|pllc|pc|the)\b/g;
export function normalizeName(s) {
  return String(s).toLowerCase().replace(/&/g, ' and ').replace(LEGAL, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}
const digits = (s) => String(s || '').replace(/\D/g, '').slice(-10);

// Website loads and shows the business name.
export async function checkWebsite(url, name) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'ScottsdaleGolfLifestyleBot/1.0 (+https://scottsdalegolflifestyle.com/guide)' },
    });
    if (!res.ok) return { pass: false, reason: `Website returned ${res.status}`, checkedAt: now() };
    const html = (await res.text()).slice(0, 500000);
    const text = normalizeName(html.replace(/<[^>]+>/g, ' '));
    const pass = text.includes(normalizeName(name));
    return { pass, reason: pass ? null : 'Business name not found on website', checkedAt: now() };
  } catch (e) {
    return { pass: false, reason: 'Website did not load', checkedAt: now() };
  }
}

// Google Maps match through DataForSEO: same name, plus the same phone or ZIP.
// Also returns Google's category so we can check the category fits.
export async function checkGoogleMaps({ name, city, zip, phone }) {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) return { pass: null, reason: 'DataForSEO not connected', checkedAt: now() };
  try {
    const res = await fetch('https://api.dataforseo.com/v3/serp/google/maps/live/advanced', {
      method: 'POST',
      signal: AbortSignal.timeout(20000),
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ keyword: `${name} ${city} AZ`, location_name: 'Arizona,United States', language_code: 'en', depth: 20 }]),
    });
    const data = await res.json();
    const items = data?.tasks?.[0]?.result?.[0]?.items || [];
    const want = normalizeName(name);
    const match = items.find((it) => {
      const n = normalizeName(it.title || '');
      const sameName = n === want || n.includes(want) || want.includes(n);
      const samePhone = phone && digits(it.phone) === digits(phone);
      const sameZip = zip && String(it.address || '').includes(zip);
      return sameName && (samePhone || sameZip);
    });
    if (!match) return { pass: false, reason: 'No matching Google Maps profile', checkedAt: now() };
    return {
      pass: true,
      placeId: match.place_id || null,
      cid: match.cid || null,
      googleCategory: match.category || null,
      googleCategories: match.additional_categories || [],
      rating: match.rating?.value ?? null,
      reviews: match.rating?.votes_count ?? null,
      checkedAt: now(),
    };
  } catch (e) {
    return { pass: null, reason: 'Google Maps check could not run', checkedAt: now() };
  }
}

// Category fits: Google's category shares a key word with ours or its included terms.
const STOP = new Set(['and', 'the', 'of', 'service', 'services', 'store', 'shop', 'company', 'in']);
const words = (s) => normalizeName(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/s$/, ''));
export function checkCategoryFit(categorySlug, maps) {
  const cat = categoryBySlug[categorySlug];
  const google = [maps?.googleCategory, ...(maps?.googleCategories || [])].filter(Boolean);
  if (!cat || !google.length) return { pass: null, reason: 'No Google category to compare', checkedAt: now() };
  const ours = new Set([cat.name, cat.title, ...cat.includes].flatMap(words));
  const pass = google.flatMap(words).some((w) => ours.has(w));
  return { pass, google, reason: pass ? null : 'Google category differs', checkedAt: now() };
}

// License numbers are checked by hand before going live, so a licensed
// category always waits for review in Phase 1.
export function checkLicense(categorySlug, number) {
  const cat = categoryBySlug[categorySlug];
  if (!cat?.license) return null;
  return { pass: null, number, reason: 'License to be confirmed', checkedAt: now() };
}

// Email code: 6 digits, stored hashed, good for 30 minutes and 5 tries.
export function newEmailCode() {
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  return { code, hash: hashCode(code), expiresAt: new Date(Date.now() + 30 * 60 * 1000), attempts: 0 };
}
export function hashCode(code) {
  return crypto.createHash('sha256').update(`${process.env.DIRECTORY_CODE_SECRET || 'sgl-directory'}:${code}`).digest('hex');
}

export function decideStatus(checks) {
  const required = [checks.emailCode, checks.mapArea, checks.website, checks.googleMaps, checks.categoryFit];
  if (checks.license) required.push(checks.license);
  return required.every((c) => c?.pass === true) ? 'live' : 'review';
}

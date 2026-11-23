// Scottsdale directory (/guide). Phase 1: structure only, not linked or indexed.
// Data lives in code (categories, cities) and in MongoDB (businesses, submissions).

import { CATEGORIES, CATEGORY_GROUPS } from './categories.data';

export { CATEGORIES, CATEGORY_GROUPS };

export const GUIDE_BASE = '/guide';

// Map area (hub, Nov 18, 2026). Order is display order.
export const CITIES = [
  { slug: 'scottsdale', name: 'Scottsdale', state: 'AZ' },
  { slug: 'paradise-valley', name: 'Paradise Valley', state: 'AZ' },
  { slug: 'fountain-hills', name: 'Fountain Hills', state: 'AZ' },
  { slug: 'cave-creek', name: 'Cave Creek', state: 'AZ' },
  { slug: 'carefree', name: 'Carefree', state: 'AZ' },
];

// Who issues the license a licensed category must supply on the form.
export const LICENSE_AUTHORITIES = {
  contractor: 'Arizona Registrar of Contractors',
  pest: 'Arizona Department of Agriculture, Office of Pest Management',
  real_estate: 'Arizona Department of Real Estate',
  appraiser: 'Arizona Board of Appraisal',
  mortgage: 'Arizona Department of Insurance and Financial Institutions',
  technical: 'Arizona Board of Technical Registration',
  insurance: 'Arizona Department of Insurance and Financial Institutions',
  attorney: 'State Bar of Arizona',
  cpa: 'Arizona State Board of Accountancy',
  health: 'Arizona professional licensing board for this field',
};

// Listing levels (hub, Revenue, Nov 21, 2026).
export const LEVELS = {
  free: { name: 'Free', monthly: 0, annual: 0 },
  full: { name: 'Full Listing', monthly: 49, annual: 490 },
  featured: { name: 'Featured Partner', monthly: 99, annual: 990 },
  // One per category per city, sold to the first to pay (Nov 21, 2026). Price is the founding default.
  premier: { name: 'Premier Partner', monthly: 149, annual: 1490, exclusive: true },
};

export const PAID_LEVELS = ['full', 'featured', 'premier'];
export const premierKey = (categorySlug, citySlug) => `${categorySlug}:${citySlug}`;

// Business record status flow:
// pending (submitted) -> checks run -> live, or review (any check failed, waits for Brandi Jo)
// review -> live | rejected (only by Brandi Jo). Nothing is declined automatically.
export const STATUSES = ['pending', 'review', 'live', 'rejected'];

export const RESERVED_SLUGS = ['add-your-business', 'thank-you'];

export const categoryBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));
export const cityBySlug = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’+]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoryCitySlug(categorySlug, citySlug) {
  return `${categorySlug}-${citySlug}`;
}

const categoryCityIndex = {};
for (const cat of CATEGORIES) {
  for (const city of CITIES) {
    categoryCityIndex[categoryCitySlug(cat.slug, city.slug)] = { category: cat, city };
  }
}

// Every slug the directory owns before any business is added.
export function structuralSlugs() {
  return [...RESERVED_SLUGS, ...CATEGORIES.map((c) => c.slug), ...Object.keys(categoryCityIndex)];
}

// Resolve /guide/[slug]: reserved, then category, then category-city, else a business.
export function resolveGuideSlug(slug) {
  if (RESERVED_SLUGS.includes(slug)) return { type: 'reserved', slug };
  if (categoryBySlug[slug]) return { type: 'category', category: categoryBySlug[slug] };
  if (categoryCityIndex[slug]) return { type: 'category-city', ...categoryCityIndex[slug] };
  return { type: 'business', slug };
}

// Business slug: company name, with city added when the name is taken (hub URL rule).
// `taken` is a Set of slugs already used by businesses.
export function businessSlug(name, citySlug, taken = new Set()) {
  const owned = new Set(structuralSlugs());
  const base = slugify(name);
  const candidates = [base, `${base}-${citySlug}`];
  for (const c of candidates) if (!owned.has(c) && !taken.has(c)) return c;
  let n = 2;
  while (owned.has(`${base}-${citySlug}-${n}`) || taken.has(`${base}-${citySlug}-${n}`)) n++;
  return `${base}-${citySlug}-${n}`;
}

export function pageTitle({ category, city }) {
  return city ? `${category.title} in ${city.name}, ${city.state}` : `${category.title} in Scottsdale, AZ`;
}

// Phase 1: the directory is built but not live. Flip to true at launch:
// pages become indexable and enter the sitemap.
export const DIRECTORY_LIVE = true;

export const categoryHref = (cat) => `${GUIDE_BASE}/${cat.slug}`;
export const categoryCityHref = (cat, city) => `${GUIDE_BASE}/${categoryCitySlug(cat.slug, city.slug)}`;
export const businessHref = (b) => `${GUIDE_BASE}/${b.slug}`;

export const luxuryCategories = () => CATEGORIES.filter((c) => c.luxury);
export const categoriesInGroup = (groupSlug) => CATEGORIES.filter((c) => c.group === groupSlug);

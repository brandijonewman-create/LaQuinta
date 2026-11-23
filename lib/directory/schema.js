// MongoDB record shape for the directory. Collection: directory_businesses.
// One collection holds every business: free submissions, DataForSEO pulls and paid partners.

import { categoryBySlug, cityBySlug, CATEGORIES, STATUSES } from './index';

export const COLLECTION = 'directory_businesses';

/*
{
  slug:          'acme-custom-homes',          // unique, see businessSlug()
  name:          'Acme Custom Homes',
  categories:    ['custom-home-builder'],      // first is primary
  city:          'paradise-valley',            // one of CITIES
  address:       { street, city, state, zip },
  geo:           { lat, lng },                 // from Mapbox geocoding
  description:   'Short description',          // free listings show name and this only
  website, phone, email,                       // stored for all; shown only on paid listings
  license:       { number, authority },        // required for licensed categories
  level:         'free' | 'full' | 'featured' | 'premier',
  premierKey:    'custom-home-builders:paradise-valley', // premier only; unique, one per category per city
  status:        'pending' | 'review' | 'live' | 'rejected',
  source:        'submission' | 'dataforseo',
  checks: {                                    // automated real-business check
    googleMaps:  { pass, placeId, checkedAt },
    emailCode:   { pass, verifiedAt },
    website:     { pass, checkedAt },
    license:     { pass, checkedAt } | null,
    mapArea:     { pass, checkedAt },
  },
  submitter:     { name, email, phone },
  articleSlugs:  [],                           // paid partners: articles that feature them
  createdAt, updatedAt, liveAt
}
*/

// Validate a free listing submission. Returns { ok, errors, value }.
export function validateSubmission(input = {}) {
  const errors = {};
  const s = (v) => (typeof v === 'string' ? v.trim() : '');
  const value = {
    name: s(input.name),
    category: s(input.category),
    city: s(input.city),
    street: s(input.street),
    zip: s(input.zip),
    website: s(input.website),
    phone: s(input.phone),
    email: s(input.email).toLowerCase(),
    description: s(input.description),
    licenseNumber: s(input.licenseNumber),
    submitterName: s(input.submitterName),
  };

  if (!value.name) errors.name = 'Business name is required.';
  const cat = categoryBySlug[value.category];
  if (!cat) errors.category = 'Choose a category.';
  if (!cityBySlug[value.city]) errors.city = 'Choose a city in our map area.';
  if (!value.street) errors.street = 'Street address is required.';
  if (!/^\d{5}$/.test(value.zip)) errors.zip = 'Enter a 5-digit ZIP code.';
  if (!/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(value.website)) errors.website = 'Enter your full website address.';
  if (!/^\+?[\d\s().-]{10,}$/.test(value.phone)) errors.phone = 'Enter your business phone.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = 'Enter your business email.';
  else if (value.website && !emailMatchesWebsite(value.email, value.website))
    errors.email = 'Use an email on your website domain, so we can confirm the business is yours.';
  if (value.description.length > 300) errors.description = 'Keep the description under 300 characters.';
  if (cat?.license && !value.licenseNumber) errors.licenseNumber = 'This category requires your Arizona license number.';
  if (!value.submitterName) errors.submitterName = 'Your name is required.';

  return { ok: Object.keys(errors).length === 0, errors, value };
}

export function emailMatchesWebsite(email, website) {
  try {
    const host = new URL(website).hostname.replace(/^www\./, '');
    const domain = email.split('@')[1];
    return domain === host || domain.endsWith(`.${host}`) || host.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

export async function ensureIndexes(db) {
  const col = db.collection(COLLECTION);
  await col.createIndex({ slug: 1 }, { unique: true });
  await col.createIndex({ status: 1, categories: 1, city: 1 });
  await col.createIndex({ level: 1, status: 1 });
  await col.createIndex({ 'checks.googleMaps.placeId': 1 }, { sparse: true });
  // Premier exclusivity: one live Premier Partner per category per city.
  await col.createIndex({ premierKey: 1 }, { unique: true, partialFilterExpression: { premierKey: { $type: 'string' } } });
}

export { CATEGORIES, STATUSES };

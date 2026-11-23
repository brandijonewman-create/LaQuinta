// Market settings for this Golf Lifestyle Network site.
//
// Every network site runs the same code. This file holds the details that
// change from market to market. To launch a new market:
//   1. Copy this repo.
//   2. Edit this file.
//   3. Run `node scripts/apply-market.mjs` to rename the market pages
//      (for example /laquinta-home-value) to match `slug`.
//   4. Load the market's own content (communities, courses, articles, listings).
//
// Owner: 7671 Enterprises, LLC DBA Golf Lifestyle Network.

export const MARKET = {
  // One word, lowercase, no dashes. Used in page addresses.
  slug: 'laquinta',

  // Display names.
  name: 'La Quinta',
  region: 'Coachella Valley',
  county: 'Riverside County',
  state: 'California',
  stateCode: 'CA',
  timeZoneLabel: 'Pacific time',

  // Brand and domain.
  siteName: 'La Quinta Golf Lifestyle',
  domain: 'laquintagolflifestyle.com',
  url: process.env.NEXT_PUBLIC_CANONICAL_URL || 'https://laquintagolflifestyle.com',
  // Extra domains that should be treated as this site (redirect to the apex).
  altDomains: ['www.laquintagolflifestyle.com'],

  // Map center.
  geo: { lat: 33.6634, lng: -116.3100 },

  // Analytics. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel.
  ga4: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',

  // Directory map area: the cities this site's directory covers.
  directoryCities: ['La Quinta'],

  // Licensing note used in the footer and disclosures.
  licenseState: 'California',

  // Short descriptions used in the site header, footer and metadata.
  tagline: 'The guide to the luxury golf lifestyle in La Quinta, California.',
  metaDescription:
    'The guide to the luxury golf lifestyle in La Quinta, California: private clubs, golf communities, homes and the local businesses golf households use.',
};

// Page addresses that carry the market slug. Keep links pointing here so a new
// market only changes `slug` above.
export const ROUTES = {
  homeValue: `/${MARKET.slug}-home-value`,
  communities: `/${MARKET.slug}-communities`,
  lifestyleMap: `/${MARKET.slug}-lifestyle-map`,
  golfCourses: `/${MARKET.slug}-golf-courses`,
  snowbirdGuide: `/${MARKET.slug}-snowbird-guide`,
  relocating: `/relocating-to-${MARKET.slug}`,
  clubCosts: `/${MARKET.slug}-club-membership-costs-2026`,
  communityIndex: `/${MARKET.slug}-golf-community-index-2026`,
  zipBase: `/${MARKET.slug}`,
};

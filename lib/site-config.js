// Central brand configuration for La Quinta Golf Lifestyle.
// Edit this file (and only this file) when the brand, market scope, or club
// list changes. All other modules read from here.
//
// IMPORTANT POLICY NOTES (do not violate):
//   • Owner reference: ALWAYS "7671 Enterprises LLC, owner and operator."
//   • Contact email is a PLACEHOLDER until the owner provides a real address.
//   • No fake listings, no fake testimonials, no fake market figures.
//   • This site covers La Quinta ONLY. Rancho Mirage, Palm Desert, Indian Wells,
//     and Palm Springs each get their own dedicated site in the network.

export const site = {
  name: 'La Quinta Golf Lifestyle',
  shortName: 'LQGL',
  domain: 'LaQuintaGolfLifestyle.com',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://laquintagolflifestyle.com',
  tagline:
    'The guide to golf homes, private clubs, and the desert lifestyle of La Quinta.',
  description:
    'Definitive coverage of golf real estate, private clubs, and the desert lifestyle of La Quinta, California — home to PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, The Quarry, and La Quinta Country Club.',
  contactEmail: 'contact@laquintagolflifestyle.com',
  contactEmailIsPlaceholder: true,
};

// Owner / operator. The site is owned and operated by 7671 Enterprises LLC.
// No individual name is published anywhere on the site.
export const owner = {
  name: '7671 Enterprises LLC',
  title: 'owner and operator',
  attribution: '7671 Enterprises LLC, owner and operator',
};

export const market = {
  region: 'La Quinta',
  county: 'Riverside County, California',
  state: 'California',
  cities: [
    { name: 'La Quinta', zips: ['92253'] },
  ],
};

// La Quinta private golf communities. Every entry must be independently
// verified before publishing a page.
export const communities = [
  { slug: 'the-madison-club', name: 'The Madison Club', city: 'La Quinta', architect: 'Tom Fazio', tier: 'flagship' },
  { slug: 'the-hideaway', name: 'The Hideaway', city: 'La Quinta', architect: 'Pete Dye & Clive Clark', tier: 'flagship' },
  { slug: 'pga-west', name: 'PGA West', city: 'La Quinta', architect: 'Pete Dye, Nicklaus, Norman, Weiskopf', tier: 'flagship' },
  { slug: 'the-tradition-golf-club', name: 'The Tradition Golf Club', city: 'La Quinta', architect: 'Arnold Palmer' },
  { slug: 'andalusia-country-club', name: 'Andalusia Country Club', city: 'La Quinta', architect: 'Rees Jones' },
  { slug: 'the-quarry-at-la-quinta', name: 'The Quarry at La Quinta', city: 'La Quinta', architect: 'Tom Fazio' },
  { slug: 'la-quinta-country-club', name: 'La Quinta Country Club', city: 'La Quinta' },
];

export const architects = [
  { slug: 'pete-dye', name: 'Pete Dye', signatureCourses: ['PGA West Stadium', 'The Hideaway'] },
  { slug: 'tom-fazio', name: 'Tom Fazio', signatureCourses: ['The Madison Club', 'The Quarry at La Quinta'] },
  { slug: 'jack-nicklaus', name: 'Jack Nicklaus', signatureCourses: ['PGA West Nicklaus'] },
  { slug: 'greg-norman', name: 'Greg Norman', signatureCourses: ['PGA West Norman Course'] },
  { slug: 'arnold-palmer', name: 'Arnold Palmer', signatureCourses: ['The Tradition Golf Club'] },
  { slug: 'tom-weiskopf', name: 'Tom Weiskopf', signatureCourses: ['PGA West Weiskopf Private'] },
  { slug: 'rees-jones', name: 'Rees Jones', signatureCourses: ['Andalusia Country Club'] },
];

// Standardized disclaimer required on any page surfacing market figures.
export const MARKET_DISCLAIMER =
  'Estimate only — verify with a licensed California real-estate professional before transacting.';

export const NAV_PRIMARY = [
  { label: 'Communities', href: '/communities' },
  { label: 'Homes for Sale', href: '/homes-for-sale' },
  { label: 'Golf Clubs', href: '/golf-clubs' },
  { label: 'Guides', href: '/guides' },
  { label: 'Market Reports', href: '/market-reports' },
  { label: 'Blog', href: '/blog' },
  // Secondary items (mobile menu only; kept out of the desktop bar for fit)
  { label: 'Architects', href: '/architects', secondary: true },
  { label: 'Lifestyle Map', href: '/desert-lifestyle-map', secondary: true },
  { label: 'About', href: '/about', secondary: true },
];

export const NAV_FOOTER = {
  Explore: [
    { label: 'Communities', href: '/communities' },
    { label: 'Architects', href: '/architects' },
    { label: 'Golf Clubs', href: '/golf-clubs' },
    { label: 'Lifestyle Map', href: '/desert-lifestyle-map' },
  ],
  Buyer: [
    { label: 'Homes for Sale', href: '/homes-for-sale' },
    { label: 'Community Quiz', href: '/community-quiz' },
    { label: 'Home Valuation', href: '/home-valuation' },
    { label: 'Compare Communities', href: '/compare' },
  ],
  Reading: [
    { label: 'Blog', href: '/blog' },
    { label: 'Guides', href: '/guides' },
    { label: 'Market Reports', href: '/market-reports' },
    { label: 'Glossary', href: '/glossary' },
  ],
  About: [
    { label: 'About the Site', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

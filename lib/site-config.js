// Central brand configuration for California Desert Golf Lifestyle.
// Edit this file (and only this file) when the brand, market scope, or
// signature-club list changes. All other modules read from here.
//
// IMPORTANT POLICY NOTES (do not violate, see project brief):
//   • Owner reference: ALWAYS "Brandi Jo Newman, owner and creator."
//     Never agent, broker, realtor, or advisor.
//   • Contact email is a PLACEHOLDER until the owner provides a real address.
//   • No fake listings, no fake testimonials, no fake market figures.

export const site = {
  name: 'California Desert Golf Lifestyle',
  shortName: 'CDGL',
  domain: 'CaliforniaDesertGolfLifestyle.com',
  url: 'https://californiadesertgolflifestyle.com',
  tagline:
    'The editorial guide to golf homes, private clubs, and the desert lifestyle of the Coachella Valley.',
  description:
    'Independent editorial coverage of golf real estate, private clubs, and the desert lifestyle across the Coachella Valley — La Quinta, Indian Wells, Rancho Mirage, Palm Desert, Palm Springs, Indio, and Bermuda Dunes.',
  // PLACEHOLDER — owner has not yet provided a real address. Do not surface
  // anywhere that implies a verified business contact until replaced.
  contactEmail: 'contact@californiadesertgolflifestyle.com',
  contactEmailIsPlaceholder: true,
};

export const owner = {
  name: 'Brandi Jo Newman',
  // EXACT title — do not change. See project brief, Hard Rule 7.
  title: 'owner and creator',
  attribution: 'Brandi Jo Newman, owner and creator',
};

export const market = {
  region: 'Coachella Valley',
  county: 'Riverside County, California',
  state: 'California',
  cities: [
    { name: 'Indian Wells', zips: ['92210'] },
    { name: 'La Quinta', zips: ['92253'] },
    { name: 'Rancho Mirage', zips: ['92270'] },
    { name: 'Palm Desert', zips: ['92211', '92260'] },
    { name: 'Palm Springs', zips: ['92262', '92264'] },
    { name: 'Indio', zips: ['92201', '92203'] },
    { name: 'Bermuda Dunes', zips: ['92203'] },
  ],
};

// Signature private golf communities for the editorial focus.
// Every entry below must be independently verified before publishing a page.
export const communities = [
  { slug: 'the-madison-club', name: 'The Madison Club', city: 'La Quinta', architect: 'Tom Fazio', tier: 'flagship' },
  { slug: 'the-hideaway', name: 'The Hideaway', city: 'La Quinta', architect: 'Pete Dye & Clive Clark', tier: 'flagship' },
  { slug: 'pga-west', name: 'PGA West', city: 'La Quinta', architect: 'Pete Dye, Nicklaus, Norman, Weiskopf', tier: 'flagship' },
  { slug: 'the-tradition-golf-club', name: 'The Tradition Golf Club', city: 'La Quinta', architect: 'Arnold Palmer' },
  { slug: 'andalusia-country-club', name: 'Andalusia Country Club', city: 'La Quinta', architect: 'Rees Jones' },
  { slug: 'the-quarry-at-la-quinta', name: 'The Quarry at La Quinta', city: 'La Quinta', architect: 'Tom Fazio' },
  { slug: 'la-quinta-country-club', name: 'La Quinta Country Club', city: 'La Quinta' },
  { slug: 'the-vintage-club', name: 'The Vintage Club', city: 'Indian Wells' },
  { slug: 'the-reserve-club', name: 'The Reserve Club', city: 'Indian Wells', architect: 'Tom Weiskopf' },
  { slug: 'eldorado-country-club', name: 'Eldorado Country Club', city: 'Indian Wells' },
  { slug: 'toscana-country-club', name: 'Toscana Country Club', city: 'Indian Wells' },
  { slug: 'indian-wells-country-club', name: 'Indian Wells Country Club', city: 'Indian Wells', tier: 'flagship' },
  { slug: 'bighorn-golf-club', name: 'BIGHORN Golf Club', city: 'Palm Desert', architect: 'Tom Fazio & Arthur Hills', tier: 'flagship' },
  { slug: 'stone-eagle', name: 'Stone Eagle', city: 'Palm Desert', architect: 'Tom Doak', tier: 'flagship' },
  { slug: 'ironwood-country-club', name: 'Ironwood Country Club', city: 'Palm Desert' },
  { slug: 'marrakesh-country-club', name: 'Marrakesh Country Club', city: 'Palm Desert' },
  { slug: 'thunderbird-country-club', name: 'Thunderbird Country Club', city: 'Rancho Mirage' },
  { slug: 'mission-hills-country-club', name: 'Mission Hills Country Club', city: 'Rancho Mirage', tier: 'flagship' },
  { slug: 'morningside-club', name: 'Morningside Club', city: 'Rancho Mirage', architect: 'Jack Nicklaus' },
  { slug: 'tamarisk-country-club', name: 'Tamarisk Country Club', city: 'Rancho Mirage' },
  { slug: 'the-springs-country-club', name: 'The Springs Country Club', city: 'Rancho Mirage' },
  { slug: 'sunnylands', name: 'Sunnylands', city: 'Rancho Mirage', editorialNote: 'historic context only' },
];

export const architects = [
  { slug: 'pete-dye', name: 'Pete Dye', signatureCourses: ['PGA West Stadium', 'The Hideaway'] },
  { slug: 'tom-fazio', name: 'Tom Fazio', signatureCourses: ['The Madison Club', 'BIGHORN', 'The Quarry'] },
  { slug: 'jack-nicklaus', name: 'Jack Nicklaus', signatureCourses: ['Morningside', 'PGA West Nicklaus'] },
  { slug: 'greg-norman', name: 'Greg Norman', signatureCourses: ['PGA West Norman Course'] },
  { slug: 'arnold-palmer', name: 'Arnold Palmer', signatureCourses: ['The Tradition'] },
  { slug: 'tom-doak', name: 'Tom Doak', signatureCourses: ['Stone Eagle'] },
  { slug: 'tom-weiskopf', name: 'Tom Weiskopf', signatureCourses: ['The Reserve'] },
  { slug: 'rees-jones', name: 'Rees Jones', signatureCourses: ['Andalusia'] },
  { slug: 'arthur-hills', name: 'Arthur Hills', signatureCourses: ['BIGHORN Mountains'] },
  { slug: 'ted-robinson-sr', name: 'Ted Robinson Sr.', signatureCourses: ['Mission Hills (historic / Dinah Shore)'] },
];

// Standardized disclaimer required on any page surfacing market figures.
export const EDITORIAL_DISCLAIMER =
  'Editorial estimate — verify with a licensed California real-estate professional before transacting.';

export const NAV_PRIMARY = [
  { label: 'Communities', href: '/communities' },
  { label: 'Architects', href: '/architects' },
  { label: 'Homes for Sale', href: '/homes-for-sale' },
  { label: 'Golf Clubs', href: '/golf-clubs' },
  { label: 'Guides', href: '/guides' },
  { label: 'Market Reports', href: '/market-reports' },
  { label: 'Lifestyle Map', href: '/desert-lifestyle-map' },
  { label: 'Journal', href: '/blog' },
  { label: 'About', href: '/about' },
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
  Editorial: [
    { label: 'Journal', href: '/blog' },
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

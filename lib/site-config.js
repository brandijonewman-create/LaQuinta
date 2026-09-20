// Central brand configuration for La Quinta Golf Lifestyle.
// Edit this file (and only this file) when the brand, market scope, or club
// list changes. All other modules read from here.
//
// IMPORTANT POLICY NOTES (do not violate):
//   • Owner reference: ALWAYS "7671 Enterprises, LLC DBA Golf Lifestyle
//     Network." Use `owner.fullName` for formal / legal disclosures and
//     `owner.name` when the short form is more readable in prose.
//   • No email addresses are displayed anywhere on the site UI. The
//     contact form is the only public contact channel; visible email
//     addresses were removed on 2026-09-02 at the owner's direction.
//   • No fake listings, no fake testimonials, no fake market figures.
//   • This site covers La Quinta ONLY. Rancho Mirage, Palm Desert, Indian Wells,
//     and Palm Springs each get their own dedicated site in the network.

export const site = {
  name: 'La Quinta Golf Lifestyle',
  shortName: 'LQGL',
  domain: 'LaQuintaGolfLifestyle.com',
  // Canonical production URL. Used for sitemap.xml, <link rel="canonical">,
  // OpenGraph/Twitter tags, and every JSON-LD @id / url. It MUST always point
  // at the real production domain so Google does not report "Page with
  // redirect" or a canonical mismatch. The preview/staging container may set
  // NEXT_PUBLIC_CANONICAL_URL to override for isolated environments, but the
  // default is always the live consumer domain — never the Emergent preview
  // subdomain.
  url: process.env.NEXT_PUBLIC_CANONICAL_URL || 'https://laquintagolflifestyle.com',
  tagline:
    'A lifestyle guide to the private golf communities, clubs, and desert living of La Quinta.',
  description:
    'A lifestyle guide to the seven private golf communities, clubs, and desert living of La Quinta, California — PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, The Quarry, and La Quinta Country Club. Listings and representation are provided by our California-licensed Exclusive Market Partner.',
  // SEO-optimized title and description used for <title>, canonical meta,
  // OpenGraph, and Twitter tags. Kept short enough to render fully in Google
  // SERPs (title ≤60 chars, description ≤160 chars).
  seoTitle: 'La Quinta Golf Communities, Clubs & Desert Lifestyle',
  seoDescription:
    'A lifestyle guide to La Quinta’s seven private golf communities — PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, The Quarry, and La Quinta Country Club.',
};

// Owner / operator. The site is owned and operated by 7671 Enterprises, LLC
// doing business as Golf Lifestyle Network. No individual name is published
// anywhere on the site.
export const owner = {
  name: '7671 Enterprises, LLC',
  dba: 'Golf Lifestyle Network',
  fullName: '7671 Enterprises, LLC DBA Golf Lifestyle Network',
  title: 'owner and operator',
  attribution: '7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator',
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
//
// PGA West is included as the seventh private club. Although it also has
// resort courses and a broader operational footprint than the other six,
// it is a La Quinta private club by every practical definition (three of
// its six 18-hole courses are private-membership only) and the site's
// buyer-facing copy consistently treats it as one of the seven.
export const communities = [
  { slug: 'the-madison-club', name: 'The Madison Club', city: 'La Quinta', architect: 'Tom Fazio', tier: 'flagship' },
  { slug: 'the-hideaway', name: 'The Hideaway', city: 'La Quinta', architect: 'Pete Dye & Clive Clark', tier: 'flagship' },
  { slug: 'pga-west', name: 'PGA West', city: 'La Quinta', architect: 'Pete Dye, Jack Nicklaus, Greg Norman & Tom Weiskopf', tier: 'flagship' },
  { slug: 'the-tradition-golf-club', name: 'The Tradition Golf Club', city: 'La Quinta', architect: 'Arnold Palmer', tier: 'flagship' },
  { slug: 'andalusia-country-club', name: 'Andalusia Country Club', city: 'La Quinta', architect: 'Rees Jones', tier: 'flagship' },
  { slug: 'the-quarry-at-la-quinta', name: 'The Quarry at La Quinta', city: 'La Quinta', architect: 'Tom Fazio', tier: 'flagship' },
  { slug: 'la-quinta-country-club', name: 'La Quinta Country Club', city: 'La Quinta', tier: 'flagship' },

  // Additional La Quinta communities — private, semi-private, resort
  // residences, active-adult, gated residential and historic hillside
  // neighborhoods. Content is deliberately conservative: architects, eras
  // and price bands are only listed when publicly verifiable.
  { slug: 'rancho-la-quinta-country-club', name: 'Rancho La Quinta Country Club', city: 'La Quinta', architect: 'Robert Trent Jones Jr. & Jerry Pate', tier: 'private' },
  { slug: 'mountain-view-country-club', name: 'Mountain View Country Club', city: 'La Quinta', architect: 'Arnold Palmer', tier: 'semi-private' },
  { slug: 'the-citrus-club', name: 'The Citrus Club', city: 'La Quinta', architect: 'Pete Dye', tier: 'private' },
  { slug: 'la-quinta-resort-club', name: 'La Quinta Resort & Club', city: 'La Quinta', architect: 'Pete Dye', tier: 'resort-residence' },
  { slug: 'duna-la-quinta', name: 'Duna La Quinta', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'trilogy-at-la-quinta', name: 'Trilogy at La Quinta', city: 'La Quinta', architect: 'Gary Panks', tier: 'active-adult' },
  { slug: 'coral-mountain-club', name: 'Coral Mountain', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'santa-rosa-cove', name: 'Santa Rosa Cove', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'griffin-ranch', name: 'Griffin Ranch', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'codorniz', name: 'Codorniz', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'legacy-villas', name: 'Legacy Villas at La Quinta', city: 'La Quinta', tier: 'resort-residence' },
  { slug: 'enclave-mountain-estates', name: 'Enclave Mountain Estates', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'the-cove-at-la-quinta', name: 'The Cove at La Quinta', city: 'La Quinta', tier: 'non-gated' },
  { slug: 'painted-cove', name: 'Painted Cove', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'la-quinta-fairways', name: 'La Quinta Fairways', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'estancia-la-quinta', name: 'Estancia La Quinta', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'palmilla', name: 'Palmilla', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'haciendas-at-la-quinta', name: 'Haciendas at La Quinta', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'piazza-serena', name: 'Piazza Serena', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'watercolors-at-la-quinta', name: 'Watercolors at La Quinta', city: 'La Quinta', tier: 'gated-residential' },
  { slug: 'bella-vista', name: 'Bella Vista at La Quinta', city: 'La Quinta', tier: 'gated-residential' },
];

// Course architects with at least one La Quinta course. Includes the four
// designers whose work sits outside PGA West (Dye, Fazio, Palmer, Rees Jones)
// plus the three whose La Quinta footprint is PGA West only (Nicklaus,
// Norman, Weiskopf).
export const architects = [
  { slug: 'pete-dye', name: 'Pete Dye', signatureCourses: ['The Hideaway', 'PGA West (Stadium, Dunes)'] },
  { slug: 'tom-fazio', name: 'Tom Fazio', signatureCourses: ['The Madison Club', 'The Quarry at La Quinta'] },
  { slug: 'jack-nicklaus', name: 'Jack Nicklaus', signatureCourses: ['PGA West (Nicklaus Tournament & Private)'] },
  { slug: 'arnold-palmer', name: 'Arnold Palmer', signatureCourses: ['The Tradition Golf Club'] },
  { slug: 'greg-norman', name: 'Greg Norman', signatureCourses: ['PGA West (Norman Course)'] },
  { slug: 'tom-weiskopf', name: 'Tom Weiskopf', signatureCourses: ['PGA West (Weiskopf Private)'] },
  { slug: 'rees-jones', name: 'Rees Jones', signatureCourses: ['Andalusia Country Club'] },
];

// Standardized disclaimer required on any page surfacing market figures.
export const MARKET_DISCLAIMER =
  'Estimate only — verify with a licensed California real-estate professional before transacting.';

export const NAV_PRIMARY = [
  { label: 'Communities', href: '/communities' },
  { label: 'Homes for Sale', href: '/homes-for-sale' },
  { label: 'Guides', href: '/guides' },
  { label: 'Market Reports', href: '/market-reports' },
  { label: 'Blog', href: '/blog' },
  { label: 'For Realtors', href: '/#become-our-partner' },
  // Secondary items (mobile menu only; kept out of the desktop bar for fit)
  { label: 'Golf Clubs', href: '/golf-clubs', secondary: true },
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

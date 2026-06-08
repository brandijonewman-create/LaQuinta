// Collaborator registry. One source of truth for editorial collaborator
// profiles. Keyed by slug. Add new collaborators by appending to this list —
// no code changes required elsewhere.
//
// Each record drives:
//   1. Their profile page at /collaborators/{slug}
//   2. Person JSON-LD schema for E-E-A-T signals
//   3. Blog byline links + Article author attribution when their slug appears
//      in a post's `author` frontmatter field
//   4. "About the Author" block at the bottom of any post they contribute to
//
// Field reference:
//   slug       — URL-safe identifier, used as /collaborators/{slug} and the
//                in-page anchor (#stepheny-finnie etc.)
//   name       — Full display name (with credentials, e.g. "Dr.")
//   jobTitle   — Person.jobTitle in schema, shown under name on profile
//   affiliation— Affiliated organization (Person.affiliation.name in schema)
//   bio        — Plain-text bio (Person.description in schema)
//   headshot   — Image URL (Person.image in schema)
//   url        — Optional external homepage (Person.url in schema)
//   anchor     — Optional in-page anchor for cross-linking from blog bylines
//                (defaults to same as slug)
//   page       — Slug of the *page* the profile lives on. Multiple people may
//                share one page (e.g. Ridgemont Financial team). Defaults to
//                the person's own slug.

export const collaborators = [
  {
    slug: 'stepheny-finnie',
    page: 'ridgemont-financial',
    anchor: 'stepheny-finnie',
    name: 'Dr. Stepheny Finnie',
    jobTitle: 'Annuity Specialist',
    affiliation: 'Ridgemont Financial',
    bio: 'Dr. Finnie brings an advanced academic perspective to the real-world challenges retirees face today. She helps clients navigate the financial complexities of retirement with clarity and confidence.',
    headshot: '/collaborators/stepheny-finnie.jpg',
  },
  {
    slug: 'one-point-media-group',
    page: 'one-point-media-group',
    anchor: 'one-point-media-group',
    name: 'One Point Media Group',
    jobTitle: 'Real Estate Photography, Video & Aerial',
    affiliation: null,
    url: 'https://onepointmediagroup.com',
    phone: '(760) 545-3131',
    bio: 'One Point Media Group is Southern California\u2019s premier real estate media practice, serving agents and listings across the Coachella Valley, the Lake Arrowhead Valley, and the Inland Empire. The studio combines architectural photography, cinematic videography, FAA-licensed aerial work, twilight production, virtual staging, 360\u00b0 tours, and 2D/3D floor plans \u2014 a complete visual program for properties that need to look the way they actually feel.',
    services: [
      'Architectural & Interior Photography',
      'Cinematic Videography',
      'Aerial Drone Photography & Video',
      'Twilight & Virtual Twilight',
      'Virtual Staging',
      '360\u00b0 Tours',
      '2D & 3D Floor Plans',
    ],
    brokeragePartners: ['HK Lane', 'Pacific Sotheby\u2019s International', 'California Lifestyles Realty', 'Bennion Deville Homes', 'Compass'],
    headshot: null,
  },
];

// Map a person's slug → their full record
export function getCollaborator(slug) {
  if (!slug) return null;
  return collaborators.find((c) => c.slug === slug) || null;
}

// Group all collaborators by the page slug they belong to (e.g.
// 'ridgemont-financial' → [stepheny-finnie, ...]). Used by /collaborators/[page]
export function getCollaboratorsByPage(pageSlug) {
  return collaborators.filter((c) => (c.page || c.slug) === pageSlug);
}

// Unique page slugs (for generateStaticParams)
export function getCollaboratorPageSlugs() {
  const set = new Set(collaborators.map((c) => c.page || c.slug));
  return Array.from(set);
}

// Build the canonical profile URL for a collaborator. Multi-person pages get
// a hash anchor; solo pages don't need one.
export function profileUrl(person, siteUrl = '') {
  if (!person) return '';
  const pageSlug = person.page || person.slug;
  const samePage = getCollaboratorsByPage(pageSlug);
  const base = `${siteUrl}/collaborators/${pageSlug}`;
  if (samePage.length > 1) return `${base}#${person.anchor || person.slug}`;
  return base;
}

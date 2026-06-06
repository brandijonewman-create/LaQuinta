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

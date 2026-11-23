// Authors registry. Used by:
//   - app/blog/[slug]/page.js  -> byline rendering + Article JSON-LD author
//   - app/collaborators/*      -> Person JSON-LD for E-E-A-T
//
// To author a post under a named contributor, set the MDX frontmatter
// `author` field to one of the slugs below (e.g. author: "advisor-slug").
// Posts that use a free-text author string fall back to the editorial byline.

import { SITE } from './data';

export const AUTHORS = {
  // (empty) — named contributors were removed 2026-09. Add new entries here
  // with slug/name/title/affiliation/bio/image/profilePath to enable bylines.
};

// Look up an author by slug. Returns the registry entry, or a fallback
// shape suitable for free-text editorial bylines (no profile link).
export function getAuthor(authorField) {
  if (!authorField) {
    return { name: 'Scottsdale Golf Lifestyle Editorial', isOrg: true };
  }
  const key = String(authorField).trim();
  const lower = key.toLowerCase();
  if (AUTHORS[lower]) return AUTHORS[lower];
  // Free-text fallback: just a display name, no profile link, treated as Organization
  return { name: key, isOrg: true };
}

// Build the Article schema `author` field from a frontmatter `author` value.
export function authorJsonLd(authorField) {
  const a = getAuthor(authorField);
  if (a.isOrg) {
    return { '@type': 'Organization', name: a.name };
  }
  return {
    '@type': 'Person',
    name: a.name,
    jobTitle: a.title,
    image: a.image,
    url: a.profileUrl,
    affiliation: a.affiliation ? { '@type': 'Organization', name: a.affiliation } : undefined
  };
}

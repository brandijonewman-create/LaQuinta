// Registry of downloadable lead-magnet PDFs.
// One per La Quinta community. Files are produced by
//   node scripts/build-community-guides.js
// and live in /public/downloads/.

export const LEAD_MAGNETS = {
  'community-guide-the-madison-club':      { label: 'The Madison Club Guide',        community: 'the-madison-club',      requirePhone: true, file: '/downloads/community-guide-the-madison-club.pdf' },
  'community-guide-the-hideaway':          { label: 'The Hideaway Guide',            community: 'the-hideaway',          requirePhone: true, file: '/downloads/community-guide-the-hideaway.pdf' },
  'community-guide-pga-west':              { label: 'PGA West Guide',                community: 'pga-west',              requirePhone: true, file: '/downloads/community-guide-pga-west.pdf' },
  'community-guide-the-tradition-golf-club': { label: 'The Tradition Golf Club Guide', community: 'the-tradition-golf-club', requirePhone: true, file: '/downloads/community-guide-the-tradition-golf-club.pdf' },
  'community-guide-andalusia-country-club':  { label: 'Andalusia Country Club Guide',  community: 'andalusia-country-club',  requirePhone: true, file: '/downloads/community-guide-andalusia-country-club.pdf' },
  'community-guide-the-quarry-at-la-quinta': { label: 'The Quarry at La Quinta Guide', community: 'the-quarry-at-la-quinta', requirePhone: true, file: '/downloads/community-guide-the-quarry-at-la-quinta.pdf' },
  'community-guide-la-quinta-country-club':  { label: 'La Quinta Country Club Guide',  community: 'la-quinta-country-club',  requirePhone: true, file: '/downloads/community-guide-la-quinta-country-club.pdf' },
};

export function magnetForCommunity(slug) {
  return LEAD_MAGNETS[`community-guide-${slug}`] || null;
}
export function getMagnet(slug) { return LEAD_MAGNETS[slug] || null; }
export function listMagnets() {
  return Object.entries(LEAD_MAGNETS).map(([slug, m]) => ({ slug, ...m }));
}

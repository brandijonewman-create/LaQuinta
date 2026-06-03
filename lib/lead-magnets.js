// Registry of available lead-magnet downloads. Each entry is editorial copy
// only — PDFs are produced by the owner. The download flow captures the email
// and acknowledges that the file will be sent directly.

export const LEAD_MAGNETS = {
  'la-quinta-buyers-checklist': {
    label: 'La Quinta Buyer\u2019s Checklist',
    description: 'A printable, single-page checklist for buying into a La Quinta private golf community. Covers club due-diligence, membership questions, California Prop-13 reassessment math, and the questions to ask before you make an offer.',
    pages: 1,
    format: 'PDF',
  },
  'club-membership-comparison': {
    label: 'Club Membership Comparison',
    description: 'A one-page side-by-side comparison of the seven La Quinta private clubs — architect, course count, scale, membership style, real-estate character.',
    pages: 1,
    format: 'PDF',
  },
};

export function getLeadMagnet(slug) {
  return LEAD_MAGNETS[slug] || null;
}

export function listLeadMagnets() {
  return Object.entries(LEAD_MAGNETS).map(([slug, m]) => ({ slug, ...m }));
}

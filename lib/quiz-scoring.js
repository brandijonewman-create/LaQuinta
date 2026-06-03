// Quiz scoring. 8 questions → ranked top-3 La Quinta communities.
//
// Scoring approach: each answer adds points to specific community slugs.
// Top-3 = highest cumulative scores. Ties broken by 'tier' (flagship > other).
//
// All match weights are editorially honest — we deliberately avoid making
// claims about price bands we can't verify (no "this club has $7M average
// homes"); the price-band question routes to the clubs whose buyer profile
// is widely understood to skew that way.

import { communities } from '@/lib/site-config';

export const QUIZ_QUESTIONS = [
  {
    id: 'architecture',
    label: 'Which architectural style appeals most?',
    options: [
      { value: 'modern_california', label: 'Modern California / contemporary' },
      { value: 'spanish_med',       label: 'Spanish-Mediterranean' },
      { value: 'mid_century',       label: 'Mid-century modern' },
      { value: 'classic_estate',    label: 'Classic estate / traditional' },
    ],
  },
  {
    id: 'scale',
    label: 'What community scale do you want?',
    options: [
      { value: 'intimate',  label: 'Intimate — small, tight-knit' },
      { value: 'mid',       label: 'Mid-size' },
      { value: 'large',     label: 'Large, multi-course' },
      { value: 'no_pref',   label: 'No strong preference' },
    ],
  },
  {
    id: 'design',
    label: 'What golf-course design speaks to you?',
    options: [
      { value: 'penal_dye',      label: 'Visually intimidating, strategic (Pete Dye)' },
      { value: 'forgiving_fazio',label: 'Forgiving fairways, framed views (Tom Fazio)' },
      { value: 'classic_player', label: 'Player-friendly classic (Palmer / Hughes)' },
      { value: 'modern_jones',   label: 'Modern championship traditional (Rees Jones)' },
      { value: 'no_pref',        label: 'No strong preference' },
    ],
  },
  {
    id: 'social',
    label: 'Membership atmosphere you want',
    options: [
      { value: 'quiet',          label: 'Quiet, low-key, privacy-first' },
      { value: 'active_social',  label: 'Active social calendar' },
      { value: 'family',         label: 'Family-friendly' },
      { value: 'competitive',    label: 'Competitive / tournament-driven' },
    ],
  },
  {
    id: 'price',
    label: 'What price band are you exploring?',
    options: [
      { value: 'under_2m',  label: 'Under $2M' },
      { value: '2_5m',      label: '$2M–$5M' },
      { value: '5_10m',     label: '$5M–$10M' },
      { value: 'over_10m',  label: 'Over $10M' },
    ],
  },
  {
    id: 'use',
    label: 'How will you use the home?',
    options: [
      { value: 'winter',    label: 'Winter only (Nov–Apr)' },
      { value: 'year',      label: 'Year-round / primary' },
      { value: 'occasional',label: 'Occasional / extended stays' },
    ],
  },
  {
    id: 'property',
    label: 'Property type',
    options: [
      { value: 'condo_villa',   label: 'Condo or fairway villa' },
      { value: 'resale_sfr',    label: 'Resale single-family home' },
      { value: 'new_custom',    label: 'Newer / custom estate' },
    ],
  },
  {
    id: 'resort',
    label: 'Resort access and hotel-style amenities',
    options: [
      { value: 'important',     label: 'Important to me' },
      { value: 'neutral',       label: 'Doesn\u2019t matter' },
      { value: 'private_only',  label: 'Prefer private-only, no resort' },
    ],
  },
];

// Score table: answer → { slug: weight, ... }
const SCORE_TABLE = {
  architecture: {
    modern_california: { 'the-madison-club': 2, 'the-hideaway': 1, 'andalusia-country-club': 2 },
    spanish_med:       { 'the-madison-club': 2, 'andalusia-country-club': 3, 'the-hideaway': 1 },
    mid_century:       { 'la-quinta-country-club': 3, 'the-tradition-golf-club': 1 },
    classic_estate:    { 'la-quinta-country-club': 2, 'the-tradition-golf-club': 2, 'the-madison-club': 1 },
  },
  scale: {
    intimate: { 'the-quarry-at-la-quinta': 3, 'the-tradition-golf-club': 2, 'la-quinta-country-club': 2, 'the-madison-club': 1 },
    mid:      { 'the-hideaway': 3, 'andalusia-country-club': 2, 'the-madison-club': 2 },
    large:    { 'pga-west': 4 },
    no_pref:  {},
  },
  design: {
    penal_dye:       { 'pga-west': 3, 'the-hideaway': 3 },
    forgiving_fazio: { 'the-madison-club': 3, 'the-quarry-at-la-quinta': 3, 'pga-west': 1 },
    classic_player:  { 'the-tradition-golf-club': 3, 'la-quinta-country-club': 2 },
    modern_jones:    { 'andalusia-country-club': 4 },
    no_pref:         {},
  },
  social: {
    quiet:         { 'the-madison-club': 3, 'the-quarry-at-la-quinta': 3, 'the-tradition-golf-club': 1 },
    active_social: { 'la-quinta-country-club': 2, 'pga-west': 2, 'andalusia-country-club': 2 },
    family:        { 'andalusia-country-club': 2, 'la-quinta-country-club': 2, 'pga-west': 1 },
    competitive:   { 'pga-west': 3, 'the-hideaway': 1 },
  },
  price: {
    under_2m: { 'pga-west': 4, 'la-quinta-country-club': 2 },
    '2_5m':   { 'la-quinta-country-club': 2, 'the-tradition-golf-club': 2, 'andalusia-country-club': 2, 'pga-west': 2 },
    '5_10m':  { 'andalusia-country-club': 2, 'the-hideaway': 3, 'the-tradition-golf-club': 1, 'the-quarry-at-la-quinta': 2 },
    over_10m: { 'the-madison-club': 4, 'the-quarry-at-la-quinta': 3, 'the-hideaway': 2 },
  },
  use: {
    winter:     { 'the-madison-club': 1, 'the-hideaway': 1, 'the-quarry-at-la-quinta': 1, 'pga-west': 1 },
    year:       { 'la-quinta-country-club': 2, 'andalusia-country-club': 2, 'the-tradition-golf-club': 1 },
    occasional: { 'pga-west': 2, 'la-quinta-country-club': 1 },
  },
  property: {
    condo_villa:  { 'pga-west': 4, 'la-quinta-country-club': 1 },
    resale_sfr:   { 'la-quinta-country-club': 2, 'the-tradition-golf-club': 2, 'pga-west': 1 },
    new_custom:   { 'the-madison-club': 3, 'andalusia-country-club': 3, 'the-quarry-at-la-quinta': 2 },
  },
  resort: {
    important:    { 'pga-west': 3 },
    neutral:      {},
    private_only: { 'the-madison-club': 2, 'the-hideaway': 2, 'andalusia-country-club': 1, 'the-quarry-at-la-quinta': 2, 'the-tradition-golf-club': 1, 'la-quinta-country-club': 1 },
  },
};

// Short reason snippets per club for the results page.
export const CLUB_REASONS = {
  'the-madison-club':       'Discreet Fazio routing, custom estates, and one of La Quinta\u2019s smallest, most private memberships.',
  'the-hideaway':           '36 holes (Dye + Clark) behind a single gate — architecturally cohesive, mid-scale, privacy-first.',
  'pga-west':               'Six courses, four architects, the broadest price range and most flexible membership tiers in the city.',
  'the-tradition-golf-club':'Arnold Palmer\u2019s only Coachella Valley design — walkable, mature, member-friendly.',
  'andalusia-country-club': 'Newer Rees Jones design with modern Spanish architecture and big mountain views.',
  'the-quarry-at-la-quinta':'Intimate Fazio routing on a former rock quarry — dramatic topography, very tight membership.',
  'la-quinta-country-club': 'The original La Quinta club (1959) — mid-century neighborhood, walking distance to the Cove.',
};

export function scoreQuiz(answers) {
  const scores = {};
  for (const c of communities) scores[c.slug] = 0;

  for (const [qid, ans] of Object.entries(answers || {})) {
    const row = SCORE_TABLE[qid]?.[ans];
    if (!row) continue;
    for (const [slug, pts] of Object.entries(row)) {
      scores[slug] = (scores[slug] || 0) + pts;
    }
  }

  const ranked = Object.entries(scores)
    .map(([slug, score]) => {
      const community = communities.find((c) => c.slug === slug);
      return { slug, score, name: community?.name, architect: community?.architect, tier: community?.tier };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tiebreak: flagship clubs first
      if (a.tier === 'flagship' && b.tier !== 'flagship') return -1;
      if (b.tier === 'flagship' && a.tier !== 'flagship') return 1;
      return 0;
    });

  return ranked.slice(0, 3).map((r) => ({
    slug: r.slug,
    name: r.name,
    architect: r.architect,
    score: r.score,
    reason: CLUB_REASONS[r.slug] || '',
  }));
}

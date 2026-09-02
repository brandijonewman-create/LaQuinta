// 5-question quiz matcher. Scoring max 13.
//
// Axes (la-quinta-adapted from the network template):
//   1. setting   — lifestyle setting in La Quinta
//   2. era       — architectural era of the course
//   3. character — club social character
//   4. footprint — real-estate footprint
//   5. fit       — residence-use fit (array per club)
//
// Score weights match the network spec:
//   setting   match   +3
//   era       match   +3
//   character match   +3
//   footprint exact   +2 / partial-mixed +1
//   fit       in-arr  +2

export const quizQuestions = [
  {
    id: 'setting',
    label: 'What La Quinta setting fits you best?',
    options: [
      { value: 'cove-walkable',     label: 'Cove / Old Town walkable',  detail: 'Mature streets, mid-century fabric, walk to Old Town for dinner.' },
      { value: 'private-south',     label: 'Southern La Quinta gated',  detail: 'Newer construction, design-coded estates, car-dependent.' },
      { value: 'resort-scale',      label: 'Resort-scale community',    detail: 'Multiple courses, full amenity scale, more operational activity.' },
      { value: 'classic-foothill',  label: 'Classic mid-valley',        detail: 'Established neighborhoods near the cove edge, lower density.' },
    ],
  },
  {
    id: 'era',
    label: 'Which course-design era pulls you in?',
    options: [
      { value: 'modern-strategic',  label: 'Modern strategic',         detail: 'Wide fairways, framed views, second-shot decisions (Fazio).' },
      { value: 'bold-visual',       label: 'Bold visual / penal',      detail: 'Visual intimidation, strategic recovery (Dye).' },
      { value: 'player-architect',  label: 'Player-architect classic', detail: 'Walkable, member-friendly, restrained (Palmer).' },
      { value: 'golden-age-classic',label: 'Golden-age classical',     detail: 'Mid-century traditional, mature corridors (Hughes-era).' },
    ],
  },
  {
    id: 'character',
    label: 'What club character do you want?',
    options: [
      { value: 'quiet-equity',  label: 'Quiet equity',  detail: 'Small membership, low-key calendar, privacy-first.' },
      { value: 'social-campus', label: 'Social campus', detail: 'Active calendar, family programming, full amenity slate.' },
      { value: 'tour-adjacent', label: 'Tour-adjacent', detail: 'Competitive culture, tournament history on property.' },
    ],
  },
  {
    id: 'footprint',
    label: 'What real-estate footprint?',
    options: [
      { value: 'estate',            label: 'Estate — large lots, custom builds', detail: 'Custom estates on substantial parcels.' },
      { value: 'mixed',             label: 'Mixed — condos to estates',         detail: 'Broad inventory across price points.' },
      { value: 'golf-only-no-house',label: 'Golf-only — no house attached',    detail: 'You are buying access; the real estate is secondary.' },
    ],
  },
  {
    id: 'fit',
    label: 'How will you use the home?',
    options: [
      { value: 'primary',  label: 'Primary residence',          detail: 'Year-round La Quinta living.' },
      { value: 'snowbird', label: 'Snowbird / seasonal',         detail: 'November through April, primary lives elsewhere.' },
      { value: 'investor', label: 'Investor / occasional use',   detail: 'Rented or used occasionally; not a daily home.' },
    ],
  },
];

// Attribute matrix for the 7 La Quinta private clubs.
// Verified against the editorial scaffolds in /lib/site-config.js.
export const communityAttrs = {
  'the-madison-club': {
    name: 'The Madison Club',
    city: 'La Quinta',
    setting: 'private-south',
    era: 'modern-strategic',
    character: 'quiet-equity',
    footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Fazio routing inside a tightly design-coded, low-key private community.',
  },
  'the-hideaway': {
    name: 'The Hideaway',
    city: 'La Quinta',
    setting: 'private-south',
    era: 'bold-visual',
    character: 'quiet-equity',
    footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: '36 holes behind one gate — Dye + Clark, mid-scale, privacy-first.',
  },
  'pga-west': null,  // Removed: PGA West is a separate city-site product.
  'the-tradition-golf-club': {
    name: 'The Tradition Golf Club',
    city: 'La Quinta',
    setting: 'classic-foothill',
    era: 'player-architect',
    character: 'quiet-equity',
    footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Arnold Palmer\u2019s only Coachella Valley design — walkable, mature, member-friendly.',
  },
  'andalusia-country-club': {
    name: 'Andalusia Country Club',
    city: 'La Quinta',
    setting: 'private-south',
    era: 'modern-strategic',
    character: 'social-campus',
    footprint: 'estate',
    fit: ['primary', 'snowbird'],
    why: 'Rees Jones design with modern Spanish architecture and active family programming.',
  },
  'the-quarry-at-la-quinta': {
    name: 'The Quarry at La Quinta',
    city: 'La Quinta',
    setting: 'private-south',
    era: 'modern-strategic',
    character: 'quiet-equity',
    footprint: 'estate',
    fit: ['snowbird'],
    why: 'Intimate Fazio routing on a former rock quarry — dramatic topography, very tight membership.',
  },
  'la-quinta-country-club': {
    name: 'La Quinta Country Club',
    city: 'La Quinta',
    setting: 'cove-walkable',
    era: 'golden-age-classic',
    character: 'social-campus',
    footprint: 'mixed',
    fit: ['primary', 'snowbird'],
    why: 'The original La Quinta club (1959), walking distance to the Cove and Old Town.',
  },
};

export function scoreQuiz(answers) {
  const results = Object.entries(communityAttrs)
    .filter(([, c]) => c && c.name)  // Skip null-sentinel entries (e.g., PGA West which is a separate site product).
    .map(([slug, c]) => {
    let score = 0;
    const reasons = [];
    if (answers.setting && c.setting === answers.setting) { score += 3; reasons.push('setting'); }
    if (answers.era && c.era === answers.era)             { score += 3; reasons.push('course era'); }
    if (answers.character && c.character === answers.character) { score += 3; reasons.push('club character'); }
    if (answers.footprint) {
      if (c.footprint === answers.footprint) { score += 2; reasons.push('footprint'); }
      else if (c.footprint === 'mixed' || answers.footprint === 'mixed') { score += 1; reasons.push('partial-footprint'); }
    }
    if (answers.fit && Array.isArray(c.fit) && c.fit.includes(answers.fit)) { score += 2; reasons.push('use-fit'); }
    return { slug, name: c.name, city: c.city, why: c.why, score, max: 13, reasons };
  });
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });
  return {
    top: results[0],
    runnersUp: results.slice(1, 3),
    all: results,
  };
}

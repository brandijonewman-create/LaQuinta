// La Quinta community quiz. Now archetype-gated across all 28 communities.
//
// Flow:
//   Q0 (new)  archetype, narrows the eligible pool up front
//   Q1        setting, La Quinta setting
//   Q2        era, course-design era (or architectural era for non-golf)
//   Q3        character, community atmosphere
//   Q4        footprint, real-estate footprint
//   Q5        fit, how the buyer will use the home
//
// Scoring: only communities matching the selected archetype are scored.
// For golf archetypes the network's original weighted scoring is used.
// For non-golf archetypes the archetype itself is the primary signal
// and secondary questions add tie-break weight.

export const ARCHETYPE_OPTIONS = [
  { value: 'private-club',        label: 'Private golf club',         detail: 'Flagship private, member-owned or invitation-only.' },
  { value: 'semi-private',        label: 'Semi-private club',         detail: 'Play access broader than a full private club.' },
  { value: 'resort-residence',    label: 'Resort residence',          detail: 'Villa, casita or condo with resort-side amenities and rental flexibility.' },
  { value: 'active-adult',        label: 'Active-adult 55+',          detail: 'Age-restricted, master-planned social calendar.' },
  { value: 'gated-residential',   label: 'Gated residential',         detail: 'Guard-gated non-golf residential HOA.' },
  { value: 'historic-non-gated',  label: 'Historic non-gated',        detail: 'Character neighborhood, walkable, not gated.' },
];

export const quizQuestions = [
  {
    id: 'archetype',
    label: 'What kind of La Quinta community are you looking for?',
    options: ARCHETYPE_OPTIONS,
  },
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
    label: 'Which architectural / design era pulls you in?',
    options: [
      { value: 'modern-strategic',  label: 'Modern strategic',         detail: 'Wide fairways, framed views, second-shot decisions (Fazio-style).' },
      { value: 'bold-visual',       label: 'Bold visual / penal',      detail: 'Visual intimidation, strategic recovery (Dye-style).' },
      { value: 'player-architect',  label: 'Player-architect classic', detail: 'Walkable, member-friendly, restrained (Palmer-style).' },
      { value: 'golden-age-classic',label: 'Golden-age classical',     detail: 'Mid-century traditional, mature corridors.' },
    ],
  },
  {
    id: 'character',
    label: 'What community character do you want?',
    options: [
      { value: 'quiet-equity',  label: 'Quiet & private',  detail: 'Small membership or HOA, low-key calendar, privacy-first.' },
      { value: 'social-campus', label: 'Social campus',    detail: 'Active calendar, family programming, full amenity slate.' },
      { value: 'tour-adjacent', label: 'Competitive edge', detail: 'Competitive culture, tournament history on property.' },
    ],
  },
  {
    id: 'footprint',
    label: 'What real-estate footprint?',
    options: [
      { value: 'estate',            label: 'Estate, large lots, custom builds', detail: 'Custom estates on substantial parcels.' },
      { value: 'mixed',             label: 'Mixed, condos to estates',         detail: 'Broad inventory across price points.' },
      { value: 'golf-only-no-house',label: 'Villa / casita / condo',            detail: 'Lock-and-leave, smaller footprint.' },
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

// Attribute matrix for all 28 La Quinta communities. `archetype` gates the
// eligible pool; the remaining fields feed the weighted scoring for
// tiebreaks within the pool. Fields we can't verify are omitted rather
// than fabricated.
export const communityAttrs = {
  // ---- Flagship private clubs (7) ----
  'the-madison-club': {
    name: 'The Madison Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Fazio routing inside a tightly design-coded, low-key private community.',
  },
  'the-hideaway': {
    name: 'The Hideaway', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'private-south', era: 'bold-visual', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: '36 holes behind one gate, Dye + Clark, mid-scale, privacy-first.',
  },
  'pga-west': {
    name: 'PGA West', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'resort-scale', era: 'bold-visual', character: 'tour-adjacent', footprint: 'mixed',
    fit: ['snowbird', 'primary', 'investor'],
    why: 'Six courses, four architects, the broadest price range and most flexible membership tiers in the city.',
  },
  'the-tradition-golf-club': {
    name: 'The Tradition Golf Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'classic-foothill', era: 'player-architect', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Arnold Palmer\u2019s walkable design, mature and member-friendly.',
  },
  'andalusia-country-club': {
    name: 'Andalusia Country Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'private-south', era: 'modern-strategic', character: 'social-campus', footprint: 'estate',
    fit: ['primary', 'snowbird'],
    why: 'Rees Jones design with modern Spanish architecture and active family programming.',
  },
  'the-quarry-at-la-quinta': {
    name: 'The Quarry at La Quinta', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird'],
    why: 'Intimate Fazio routing on a former rock quarry, dramatic topography, very tight membership.',
  },
  'la-quinta-country-club': {
    name: 'La Quinta Country Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'cove-walkable', era: 'golden-age-classic', character: 'social-campus', footprint: 'mixed',
    fit: ['primary', 'snowbird'],
    why: 'The original La Quinta club (1959), walking distance to the Cove and Old Town.',
  },

  // ---- Additional private / semi-private (3) ----
  'rancho-la-quinta-country-club': {
    name: 'Rancho La Quinta Country Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'classic-foothill', era: 'player-architect', character: 'social-campus', footprint: 'mixed',
    fit: ['primary', 'snowbird'],
    why: 'Two private 18s (Jones + Pate) behind a Trans West gate, a full-service country-club lifestyle.',
  },
  'the-citrus-club': {
    name: 'The Citrus Club', city: 'La Quinta',
    archetype: 'private-club',
    setting: 'classic-foothill', era: 'bold-visual', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'A quieter Pete Dye routing on former grove land, tree-lined corridors, long-tenure membership.',
  },
  'mountain-view-country-club': {
    name: 'Mountain View Country Club', city: 'La Quinta',
    archetype: 'semi-private',
    setting: 'private-south', era: 'player-architect', character: 'social-campus', footprint: 'estate',
    fit: ['primary', 'snowbird'],
    why: 'Arnold Palmer Signature course behind a Toll Brothers-developed semi-private gate.',
  },

  // ---- Resort residences (3) ----
  'la-quinta-resort-club': {
    name: 'La Quinta Resort & Club', city: 'La Quinta',
    archetype: 'resort-residence',
    setting: 'resort-scale', era: 'bold-visual', character: 'social-campus', footprint: 'golf-only-no-house',
    fit: ['snowbird', 'investor'],
    why: 'Casitas and condos inside the historic 1926 resort footprint, the walk-to-Old-Town resort lifestyle.',
  },
  'legacy-villas': {
    name: 'Legacy Villas at La Quinta', city: 'La Quinta',
    archetype: 'resort-residence',
    setting: 'resort-scale', era: 'modern-strategic', character: 'social-campus', footprint: 'golf-only-no-house',
    fit: ['snowbird', 'investor'],
    why: 'Resort-adjacent 2000s villa product with strong seasonal-rental character.',
  },
  'santa-rosa-cove': {
    name: 'Santa Rosa Cove', city: 'La Quinta',
    archetype: 'resort-residence',
    setting: 'resort-scale', era: 'golden-age-classic', character: 'social-campus', footprint: 'mixed',
    fit: ['snowbird', 'primary', 'investor'],
    why: 'Guard-gated 1980s HOA on the resort side of La Quinta, walkable to Old Town.',
  },

  // ---- Active-adult 55+ (1) ----
  'trilogy-at-la-quinta': {
    name: 'Trilogy at La Quinta', city: 'La Quinta',
    archetype: 'active-adult',
    setting: 'private-south', era: 'player-architect', character: 'social-campus', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Shea Homes 55+ master-planned community with a Gary Panks course and full social programming.',
  },

  // ---- Gated residential (13) ----
  'duna-la-quinta': {
    name: 'Duna La Quinta', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'resort-scale', era: 'bold-visual', character: 'quiet-equity', footprint: 'golf-only-no-house',
    fit: ['snowbird', 'investor'],
    why: 'Guard-gated 1980s condos and casitas along the historic Dunes Course frontage.',
  },
  'coral-mountain-club': {
    name: 'Coral Mountain', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Small residential enclave at the base of the Coral Reef Mountains in south La Quinta.',
  },
  'griffin-ranch': {
    name: 'Griffin Ranch', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['primary', 'snowbird'],
    why: 'A non-golf gated luxury estate community on historic Griffin ranch land.',
  },
  'codorniz': {
    name: 'Codorniz', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'classic-foothill', era: 'modern-strategic', character: 'quiet-equity', footprint: 'golf-only-no-house',
    fit: ['snowbird', 'primary'],
    why: 'Small Mediterranean-style gated casitas, village-scaled, lock-and-leave.',
  },
  'enclave-mountain-estates': {
    name: 'Enclave Mountain Estates', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['primary', 'snowbird'],
    why: 'Custom-lot estate enclave with direct Santa Rosa Mountain exposure.',
  },
  'painted-cove': {
    name: 'Painted Cove', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'classic-foothill', era: 'modern-strategic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Small Mediterranean gated HOA, low-profile with thin resale inventory.',
  },
  'la-quinta-fairways': {
    name: 'La Quinta Fairways', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'resort-scale', era: 'golden-age-classic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Guard-gated single-family homes along a fairway edge on the resort side of La Quinta.',
  },
  'estancia-la-quinta': {
    name: 'Estancia La Quinta', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'A contemporary Mediterranean gated HOA, detached plans, gate, exterior-managed maintenance.',
  },
  'palmilla': {
    name: 'Palmilla', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'estate',
    fit: ['snowbird', 'primary'],
    why: 'Gated Mediterranean estate community, plan-and-custom mix on generous lots.',
  },
  'haciendas-at-la-quinta': {
    name: 'Haciendas at La Quinta', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'classic-foothill', era: 'golden-age-classic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Hacienda / Spanish-Colonial gated HOA, traditional Coachella Valley material palette.',
  },
  'piazza-serena': {
    name: 'Piazza Serena', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Small gated Mediterranean HOA, quieter internal streetscape, thin resale inventory.',
  },
  'watercolors-at-la-quinta': {
    name: 'Watercolors at La Quinta', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'social-campus', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Contemporary desert-Mediterranean gated HOA with detached single-family plans.',
  },
  'bella-vista': {
    name: 'Bella Vista at La Quinta', city: 'La Quinta',
    archetype: 'gated-residential',
    setting: 'private-south', era: 'modern-strategic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['snowbird', 'primary'],
    why: 'Mediterranean gated HOA with mountain-framed view corridors on most streets.',
  },

  // ---- Historic non-gated (1) ----
  'the-cove-at-la-quinta': {
    name: 'The Cove at La Quinta', city: 'La Quinta',
    archetype: 'historic-non-gated',
    setting: 'cove-walkable', era: 'golden-age-classic', character: 'quiet-equity', footprint: 'mixed',
    fit: ['primary', 'snowbird'],
    why: 'Historic non-gated hillside neighborhood south of Old Town, walkable, character-forward.',
  },
};

// Golf-context archetypes get the full course-era & character scoring
// weight; non-golf archetypes still use the questions but with lighter
// weights (setting + footprint + fit dominate).
const GOLF_ARCHETYPES = new Set(['private-club', 'semi-private']);

export function scoreQuiz(answers) {
  const chosenArchetype = answers.archetype;

  // Filter pool by archetype. If no archetype was answered, fall back to
  // the flagship private clubs so legacy 5-question submissions still work.
  const pool = Object.entries(communityAttrs).filter(([, c]) => {
    if (!c) return false;
    if (!chosenArchetype) return c.archetype === 'private-club';
    return c.archetype === chosenArchetype;
  });

  const isGolf = GOLF_ARCHETYPES.has(chosenArchetype || 'private-club');

  const results = pool.map(([slug, c]) => {
    let score = 0;
    const reasons = [];

    // Archetype match itself is a strong signal.
    if (chosenArchetype && c.archetype === chosenArchetype) {
      score += 3;
      reasons.push('archetype');
    }

    // Setting (max +3)
    if (answers.setting && c.setting === answers.setting) {
      score += 3;
      reasons.push('setting');
    }

    // Era (max +3 golf, +2 non-golf)
    if (answers.era && c.era === answers.era) {
      score += isGolf ? 3 : 2;
      reasons.push(isGolf ? 'course era' : 'design era');
    }

    // Character (max +3)
    if (answers.character && c.character === answers.character) {
      score += 3;
      reasons.push('character');
    }

    // Footprint (max +2 exact, +1 partial)
    if (answers.footprint) {
      if (c.footprint === answers.footprint) {
        score += 2;
        reasons.push('footprint');
      } else if (c.footprint === 'mixed' || answers.footprint === 'mixed') {
        score += 1;
        reasons.push('partial-footprint');
      }
    }

    // Fit (max +2)
    if (answers.fit && Array.isArray(c.fit) && c.fit.includes(answers.fit)) {
      score += 2;
      reasons.push('use-fit');
    }

    return {
      slug,
      name: c.name,
      city: c.city,
      why: c.why,
      score,
      max: 16,
      reasons,
    };
  });

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });

  return {
    top: results[0] || null,
    runnersUp: results.slice(1, 3),
    all: results,
  };
}

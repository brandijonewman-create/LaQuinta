// Quiz matcher — 5-axis scoring engine for the /community-quiz funnel.
//
// Each user answer resolves to a string token on one of five axes:
//   region    — geographic sub-area of Scottsdale
//   era       — golf-course architectural sensibility
//   character — club / community character
//   footprint — real-estate lot scale
//   fit       — primary residence vs. snowbird vs. investor use
//
// Each featured community below has an attribute on the same five axes.
// Score is computed in score(answers, community) and ranges 0..13.
//
// Scoring weights (per spec):
//   region    match: +3
//   era       match: +3
//   character match: +3
//   footprint exact: +2 / partial-mixed: +1
//   fit       included-in-array: +2
//
// matchQuiz(answers) returns { top, runnersUp, scored } where:
//   top        = highest-scored community (object with slug+name+score+reasons)
//   runnersUp  = next two highest (array of same shape)
//   scored     = full ranked array for debugging
//
// Editorial: no fake stats, no hallucinated economics. Every community
// attribute below is grounded in publicly observable course architect,
// geography, and club-model facts.

export const QUIZ_QUESTIONS = [
  {
    id: 'region',
    question: 'Which Scottsdale corridor calls to you?',
    subtitle: 'Geography sets everything else: schools, hospital proximity, the way the desert feels at dusk.',
    options: [
      { value: 'north-ridge',       label: 'Far-north ridge',                      detail: 'Troon North, Desert Mountain, Estancia, Mirabel, Whisper Rock: elevation, big views, serious-golf country.' },
      { value: 'central',           label: 'Central 101 corridor',                 detail: 'Grayhawk, DC Ranch, Silverleaf: the modern luxury center of gravity with the best school + hospital access.' },
      { value: 'old-resort',        label: 'Old-Scottsdale resort core',           detail: 'McCormick Ranch, Gainey Ranch: the mature resort belt with walkability and lower entry pricing.' },
      { value: 'fountain-carefree', label: 'Fountain Hills / Carefree edge',       detail: 'The Boulders, Sereno Canyon: quieter edge of the metro, dramatic geology, lower density.' }
    ]
  },
  {
    id: 'era',
    question: 'Which golf-design sensibility do you respond to?',
    subtitle: 'Course architects shape the daily experience more than most buyers realize.',
    options: [
      { value: 'modern-strategic',  label: 'Modern strategic / desert minimalism', detail: 'Coore & Crenshaw, contemporary Fazio: wide fairways, firm turf, options off every tee.' },
      { value: 'golden-age',        label: 'Classical / Golden-Age proportions',   detail: 'Sympathetic, restraint-first design: the course looks like it was already there.' },
      { value: 'bold-visual',       label: 'Bold-visual / dramatic',               detail: 'Weiskopf, Nicklaus boulder-bisected fairways: designs that photograph as well as they play.' },
      { value: 'player-signature',  label: 'Player-architect signature',           detail: 'Phil Mickelson, Jack Nicklaus, Tom Weiskopf as the named designer on the scorecard.' }
    ]
  },
  {
    id: 'character',
    question: 'What kind of club culture fits you?',
    subtitle: 'The club’s personality shows up in your week-to-week life more than the course design does.',
    options: [
      { value: 'quiet-equity',     label: 'Quiet, equity-driven, low-event',       detail: 'Members own the club, the calendar is intentionally light, the dining room is conversational.' },
      { value: 'social-campus',    label: 'Social campus with full amenities',     detail: 'Multi-generational programming: tennis, pickleball, fitness, kids’ camp, big seasonal calendar.' },
      { value: 'tour-adjacent',    label: 'Tour-adjacent / prestige',               detail: 'Hosts professional events or carries that level of conditioning + visibility.' },
      { value: 'no-club',          label: 'No club membership, just access',     detail: 'Public-anchored or daily-fee golf next door; you keep your golf life and your housing decision separate.' }
    ]
  },
  {
    id: 'footprint',
    question: 'What kind of home and lot are you imagining?',
    subtitle: 'Footprint dictates which streets inside a community actually fit.',
    options: [
      { value: 'estate',    label: 'Estate: custom, larger lot',                    detail: 'Acreage-style lots, custom homes, room for a casita / guest wing / serious outdoor program.' },
      { value: 'mixed',     label: 'Mixed: production-luxury or smaller custom',    detail: 'A mix of product-builder homes and smaller custom homes inside a name-brand community.' },
      { value: 'golf-only', label: 'Golf-only: no house tied to the club',          detail: 'You want club / course access but you’ll live elsewhere in the Valley.' }
    ]
  },
  {
    id: 'fit',
    question: 'How will you actually use the home?',
    subtitle: 'Primary, snowbird, and investor profiles each surface different communities.',
    options: [
      { value: 'primary',  label: 'Primary residence',          detail: 'Living in Scottsdale year-round: schools, work commute, hospital proximity matter.' },
      { value: 'snowbird', label: 'Snowbird / seasonal home',   detail: 'November through April: turn-key, lock-and-leave, low maintenance, no school district pressure.' },
      { value: 'investor', label: 'Investor / rental focus',    detail: 'A rentable asset that performs well in the season: fewer HOAs restrict short-term, fewer clubs allow it.' }
    ]
  }
];

// ----------------------------------------------------------------------
// Community attribute matrix — 12 featured communities.
// Each row maps the community to its position on the same 5 axes.
// Sourced from publicly observable course architect, club model, and
// geographic facts. No fee numbers, no fabricated economics.
// ----------------------------------------------------------------------
export const COMMUNITY_ATTRS = [
  { slug: 'silverleaf',      name: 'Silverleaf',          town: 'North Scottsdale',  architect: 'Tom Weiskopf',                  region: 'central',           era: 'bold-visual',     character: 'tour-adjacent', footprint: 'estate', fit: ['primary', 'snowbird'] },
  { slug: 'dc-ranch',        name: 'DC Ranch',            town: 'North Scottsdale',  architect: 'Tom Lehman & John Fought',      region: 'central',           era: 'modern-strategic', character: 'social-campus', footprint: 'mixed',  fit: ['primary', 'snowbird'] },
  { slug: 'desert-mountain', name: 'Desert Mountain',     town: 'North Scottsdale',  architect: 'Jack Nicklaus (six courses)',   region: 'north-ridge',       era: 'player-signature', character: 'social-campus', footprint: 'estate', fit: ['primary', 'snowbird'] },
  { slug: 'estancia',        name: 'Estancia',            town: 'North Scottsdale',  architect: 'Tom Fazio',                     region: 'north-ridge',       era: 'modern-strategic', character: 'quiet-equity',  footprint: 'estate', fit: ['primary', 'snowbird'] },
  { slug: 'whisper-rock',    name: 'Whisper Rock',        town: 'North Scottsdale',  architect: 'Phil Mickelson + Tom Fazio',    region: 'north-ridge',       era: 'player-signature', character: 'quiet-equity',  footprint: 'estate', fit: ['primary', 'snowbird'] },
  { slug: 'grayhawk',        name: 'Grayhawk',            town: 'North Scottsdale',  architect: 'Tom Fazio + Graham/Panks',      region: 'central',           era: 'player-signature', character: 'tour-adjacent', footprint: 'mixed',  fit: ['primary', 'snowbird', 'investor'] },
  { slug: 'mirabel',         name: 'Mirabel',             town: 'North Scottsdale',  architect: 'Tom Fazio',                     region: 'north-ridge',       era: 'modern-strategic', character: 'quiet-equity',  footprint: 'estate', fit: ['primary', 'snowbird'] },
  { slug: 'troon-north',     name: 'Troon North',         town: 'North Scottsdale',  architect: 'Tom Weiskopf + Jay Morrish',    region: 'north-ridge',       era: 'bold-visual',      character: 'no-club',       footprint: 'mixed',  fit: ['primary', 'snowbird', 'investor'] },
  { slug: 'boulders',        name: 'The Boulders',        town: 'Carefree',          architect: 'Jay Morrish',                   region: 'fountain-carefree', era: 'bold-visual',      character: 'no-club',       footprint: 'mixed',  fit: ['primary', 'snowbird', 'investor'] },
  { slug: 'mccormick-ranch', name: 'McCormick Ranch',     town: 'Central Scottsdale',architect: 'Desmond Muirhead',              region: 'old-resort',        era: 'golden-age',       character: 'no-club',       footprint: 'mixed',  fit: ['primary', 'snowbird', 'investor'] },
  { slug: 'gainey-ranch',    name: 'Gainey Ranch',        town: 'Central Scottsdale',architect: 'Brad Benz + Mike Poellot',      region: 'old-resort',        era: 'modern-strategic', character: 'social-campus', footprint: 'mixed',  fit: ['primary', 'snowbird', 'investor'] },
  { slug: 'sereno-canyon',   name: 'Sereno Canyon',       town: 'North Scottsdale',  architect: 'No on-site course: nearby Troon, Pinnacle Peak access',  region: 'fountain-carefree', era: 'modern-strategic', character: 'quiet-equity',  footprint: 'estate', fit: ['primary', 'snowbird'] }
];

// Human-readable reason strings used in the result-screen breakdown.
const REGION_LABELS = {
  'north-ridge':       'far-north ridge',
  'central':           'central 101 corridor',
  'old-resort':        'old-Scottsdale resort core',
  'fountain-carefree': 'Fountain Hills / Carefree edge'
};
const ERA_LABELS = {
  'modern-strategic': 'modern strategic / desert minimalism',
  'golden-age':       'classical / Golden-Age proportions',
  'bold-visual':      'bold-visual / dramatic design',
  'player-signature': 'player-architect signature design'
};
const CHARACTER_LABELS = {
  'quiet-equity':  'quiet, equity-driven club culture',
  'social-campus': 'social campus with multi-generational amenities',
  'tour-adjacent': 'tour-adjacent prestige environment',
  'no-club':       'no-club / public-anchored golf access'
};
const FOOTPRINT_LABELS = {
  'estate':    'estate-lot footprint',
  'mixed':     'mixed estate + smaller-custom footprint',
  'golf-only': 'golf-only: no on-site residence'
};
const FIT_LABELS = {
  'primary':  'primary-residence',
  'snowbird': 'snowbird / seasonal',
  'investor': 'investor / rental'
};

function scoreCommunity(answers, attrs) {
  let total = 0;
  const reasons = [];

  if (answers.region === attrs.region) {
    total += 3;
    reasons.push(`matches the ${REGION_LABELS[attrs.region]} you chose`);
  }
  if (answers.era === attrs.era) {
    total += 3;
    reasons.push(`its ${ERA_LABELS[attrs.era]} matches your design preference`);
  }
  if (answers.character === attrs.character) {
    total += 3;
    reasons.push(`its ${CHARACTER_LABELS[attrs.character]} matches the club culture you want`);
  }
  if (answers.footprint === attrs.footprint) {
    total += 2;
    reasons.push(`an ${FOOTPRINT_LABELS[attrs.footprint]} aligns with your home vision`);
  } else if (answers.footprint === 'mixed' || attrs.footprint === 'mixed') {
    total += 1;
    reasons.push('partial footprint overlap');
  }
  if (Array.isArray(attrs.fit) && attrs.fit.includes(answers.fit)) {
    total += 2;
    reasons.push(`works well for ${FIT_LABELS[answers.fit]} use`);
  }

  return { score: total, reasons };
}

/**
 * Run the matcher over the full attribute table.
 * @param {Object} answers - { region, era, character, footprint, fit }
 * @returns { top, runnersUp, scored }
 */
export function matchQuiz(answers) {
  const scored = COMMUNITY_ATTRS.map(c => ({
    slug: c.slug,
    name: c.name,
    town: c.town,
    architect: c.architect,
    ...scoreCommunity(answers, c)
  }));
  // Sort by score desc, then name asc (alphabetical tiebreak per spec)
  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return {
    top: scored[0],
    runnersUp: scored.slice(1, 3),
    scored
  };
}

export const QUIZ_MAX_SCORE = 13;

// Map a community slug to its quiz-magnet PDF slug (used by /api/leads/magnet).
export function magnetSlugForCommunity(communitySlug) {
  return `community-guide-${communitySlug}`;
}

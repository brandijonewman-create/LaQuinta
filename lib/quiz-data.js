// ────────────────────────────────────────────────────────────────────────────
// "Which Community Is Right for You?" quiz data + scoring engine.
//
// 5 multiple-choice questions. IMPORTANT: This file must remain client-safe
// (no mongodb import chain). Communities are passed in as a parameter to the
// scoring functions so the client bundle never pulls in Node-only deps.
// ────────────────────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS = [
  {
    id: 'budget',
    question: 'What is your investment range for this acquisition?',
    subtext: 'We\u2019ll surface communities where you actually have options, not just the marquee names you\u2019ve already heard of.',
    options: [
      { value: 'under-1m',   label: 'Under $1M',          detail: 'Smart-money entry into Scottsdale golf' },
      { value: '1-to-2m',    label: '$1M – $2M',     detail: 'The Scottsdale golf-community sweet spot' },
      { value: '2-to-5m',    label: '$2M – $5M',     detail: 'Country-club flagship territory' },
      { value: '5m-plus',    label: '$5M+',               detail: 'Ultra-prestige private enclaves' }
    ]
  },
  {
    id: 'golf',
    question: 'What kind of golf access matters most to you?',
    subtext: 'Membership economics drive a 6-figure difference between communities: this is the single biggest filter.',
    options: [
      { value: 'ultra-private', label: 'Ultra-private members-only club',   detail: 'Six-figure initiation, invitation-style entry' },
      { value: 'country-club',  label: 'Country club inside a residential community',  detail: 'Owning here gets you the membership path' },
      { value: 'resort-public', label: 'Resort or public access: no membership required', detail: 'Tee time when I want, no monthly dues' },
      { value: 'lifestyle',     label: 'I don’t actually golf much: lifestyle matters more', detail: 'I just want the views, amenities, neighborhood' }
    ]
  },
  {
    id: 'usage',
    question: 'How will you use the home?',
    options: [
      { value: 'primary',  label: 'Primary residence',         detail: 'I’m moving here full-time' },
      { value: 'snowbird', label: 'Snowbird / second home',    detail: '3–6 months a year, escape from cold' },
      { value: 'split',    label: 'Split between two states',  detail: 'Genuinely 50/50 lifestyle' },
      { value: 'invest',   label: 'Investment / short-term rental', detail: 'Income property first, personal use second' }
    ]
  },
  {
    id: 'lifestyle',
    question: 'What’s the daily lifestyle you’re after?',
    subtext: 'Different communities reward different rhythms. Be honest about which one is actually yours.',
    options: [
      { value: 'walkable',  label: 'Walkable village with retail, dining, neighbors',   detail: 'I want to be in the action' },
      { value: 'secluded',  label: 'Private, secluded estate with mountain views',      detail: 'I came here to disappear' },
      { value: 'family',    label: 'Family-friendly with great schools & parks',         detail: 'Kids in the equation' },
      { value: 'resort',    label: 'Resort amenities: spa, dining, concierge',          detail: 'I want to live at a hotel' }
    ]
  },
  {
    id: 'security',
    question: 'How important is guard-gated security?',
    options: [
      { value: 'must-have', label: '24/7 manned guard-gate is non-negotiable', detail: 'Privacy & security come first' },
      { value: 'preferred', label: 'Card-gated is fine, just want a barrier', detail: 'Enough to deter casual traffic' },
      { value: 'optional',  label: 'Doesn’t matter: I trust the area',     detail: 'Open communities are fine' }
    ]
  }
];

// ────────────────────────────────────────────────────────────────────────────
// Derive a quiz "profile" for each community from existing data fields.
// ────────────────────────────────────────────────────────────────────────────
function parsePriceRange(pr) {
  if (!pr) return { low: 0, high: 0 };
  // Examples: '$850K – $4.2M', '$1.5M – $9M', '$695K – $2.2M'
  const nums = (pr.match(/\$?([\d.]+)(K|M)?/g) || []).slice(0, 2).map(s => {
    const m = s.match(/([\d.]+)(K|M)?/);
    if (!m) return 0;
    let v = parseFloat(m[1]);
    if (m[2] === 'M') v *= 1_000_000;
    else if (m[2] === 'K') v *= 1_000;
    else if (v > 1000) v *= 1; // already large number
    else v *= 1_000_000; // bare numbers like '3.5' assume millions
    return v;
  });
  return { low: nums[0] || 0, high: nums[1] || nums[0] || 0 };
}

function profileCommunity(c) {
  const courseStr = (c.courses || []).join(' ').toLowerCase();
  const desc = ((c.description || '') + ' ' + (c.tagline || '') + ' ' + (c.category || '')).toLowerCase();
  const { low, high } = parsePriceRange(c.priceRange);

  // Golf access
  let golfTier;
  if (/ultra-private|members-only|invitation|guard-gated/.test(desc) && /private/.test(courseStr)) golfTier = 'ultra-private';
  else if (/country club|country-club|private-club|private \(community/.test(desc) || /country club/.test(courseStr)) golfTier = 'country-club';
  else if (/resort|public|daily-fee|semi-private/.test(courseStr) || /resort|public/.test(desc)) golfTier = 'resort-public';
  else golfTier = 'country-club'; // safe default

  // Lifestyle
  let lifestyleTier;
  if (/walkable|village|marketplace|retail/.test(desc)) lifestyleTier = 'walkable';
  else if (/resort|spa|concierge|hotel/.test(desc)) lifestyleTier = 'resort';
  else if (/family|school|park|trail/.test(desc)) lifestyleTier = 'family';
  else lifestyleTier = 'secluded';

  // Security
  let securityTier;
  if (/guard-gated|24\/7 patrol|manned gate|members-only/.test(desc)) securityTier = 'must-have';
  else if (/gated|card-gated/.test(desc)) securityTier = 'preferred';
  else securityTier = 'optional';

  // Usage suitability
  const usageScore = {
    primary:  /family|school|primary|year-round/.test(desc) ? 2 : 1,
    snowbird: /snowbird|second home|seasonal|resort/.test(desc) ? 2 : 1,
    split:    1,
    invest:   /str|short-term rental|investment|rental/.test(desc) ? 2 : (high < 1_500_000 ? 1.5 : 1)
  };

  return { low, high, golfTier, lifestyleTier, securityTier, usageScore };
}

const BUDGET_BANDS = {
  'under-1m': { min: 0, max: 1_000_000 },
  '1-to-2m':  { min: 1_000_000, max: 2_000_000 },
  '2-to-5m':  { min: 2_000_000, max: 5_000_000 },
  '5m-plus':  { min: 5_000_000, max: Infinity }
};

export function scoreCommunity(c, answers) {
  const p = profileCommunity(c);
  let score = 0;
  const reasons = [];

  // Budget overlap (most important)
  if (answers.budget) {
    const b = BUDGET_BANDS[answers.budget];
    if (p.low <= b.max && p.high >= b.min) {
      score += 4;
      reasons.push(`Price range (${c.priceRange}) aligns with your stated investment range.`);
    } else if (Math.abs(p.low - b.min) < 500_000 || Math.abs(p.high - b.max) < 500_000) {
      score += 1;
    }
  }

  // Golf access
  if (answers.golf === p.golfTier) {
    score += 3;
    if (answers.golf === 'ultra-private') reasons.push('Ultra-private members-only golf matches your preference.');
    else if (answers.golf === 'country-club') reasons.push('Country-club residential model fits.');
    else if (answers.golf === 'resort-public') reasons.push('Resort/public golf access: no membership commitment.');
  } else if (answers.golf === 'lifestyle') {
    score += 2; // most communities work for non-golfers
  }

  // Lifestyle
  if (answers.lifestyle === p.lifestyleTier) {
    score += 2;
    if (answers.lifestyle === 'walkable') reasons.push('Known for walkable village amenities.');
    else if (answers.lifestyle === 'secluded') reasons.push('Secluded, privacy-first character.');
    else if (answers.lifestyle === 'family') reasons.push('Family-friendly with strong school access.');
    else if (answers.lifestyle === 'resort') reasons.push('Full resort-amenity lifestyle.');
  }

  // Security
  if (answers.security === p.securityTier) {
    score += 2;
    if (answers.security === 'must-have') reasons.push('24/7 guard-gated security.');
  } else if (answers.security === 'must-have' && p.securityTier === 'preferred') {
    score += 0; // strict requirement not met
  } else if (answers.security === 'optional') {
    score += 1;
  }

  // Usage
  if (answers.usage && p.usageScore[answers.usage]) {
    score += p.usageScore[answers.usage];
  }

  return { score, reasons };
}

export function getQuizMatches(answers, communities, limit = 3) {
  const ranked = (communities || []).map(c => ({
    community: c,
    ...scoreCommunity(c, answers)
  })).sort((a, b) => b.score - a.score);
  return ranked.slice(0, limit);
}

export function getRecommendedTier(answers) {
  // Quick tier label based on budget
  if (answers.budget === '5m-plus') return { label: 'Tier 1: Ultra-Prestige', href: '/laquinta-golf-community-index-2026#tier-1' };
  if (answers.budget === '2-to-5m') return { label: 'Tier 2: Country-Club Flagship', href: '/laquinta-golf-community-index-2026#tier-2' };
  if (answers.budget === '1-to-2m') return { label: 'Tier 3 / 4: Resort-Lifestyle & Established Mid-Market', href: '/laquinta-golf-community-index-2026#tier-3' };
  return { label: 'Tier 4 / 5: Mid-Market & Accessible', href: '/laquinta-golf-community-index-2026#tier-4' };
}

// ────────────────────────────────────────────────────────────────────────────
// Scottsdale private-club membership economics (editorial reference data).
//
// All initiation/dues figures here are EDITORIAL ESTIMATES based on industry
// reporting and member-relayed numbers. Clubs do not publish these figures.
// Numbers change. ALWAYS verify with the club directly before relying on any
// of this for a financial decision.
// ────────────────────────────────────────────────────────────────────────────
export const CLUB_MEMBERSHIPS = [
  {
    slug: 'silverleaf',
    club: 'Silverleaf Club',
    architect: 'Tom Weiskopf',
    type: 'Equity, members-only',
    invitation: 'By sponsorship of two existing members',
    initiation: '$300,000+',
    monthlyDues: '$2,500 – $3,500',
    cap: '~325',
    transferability: 'Equity transfers with home sale; club approval required',
    notes: 'Most exclusive country-club membership in the Valley. Home ownership inside Silverleaf is required.',
    communitySlug: 'silverleaf',
    tier: 1
  },
  {
    slug: 'estancia',
    club: 'The Estancia Club',
    architect: 'Tom Fazio',
    type: 'Equity, members-only',
    invitation: 'By sponsorship; committee review',
    initiation: '$250,000+',
    monthlyDues: '$2,200 – $2,800',
    cap: '~325',
    transferability: 'Equity ties to Estancia home; transferable on sale subject to approval',
    notes: 'Pure golf-club model at the base of Pinnacle Peak. Walkable Tom Fazio masterpiece.',
    communitySlug: 'estancia',
    tier: 1
  },
  {
    slug: 'scottsdale-national',
    club: 'Scottsdale National Golf Club',
    architect: 'Jackson/Kahn, Mickelson/Smith',
    type: 'Non-equity, by invitation',
    invitation: 'Bob Parsons-controlled; invitation-only',
    initiation: '$300,000+',
    monthlyDues: '$2,500 – $3,500',
    cap: '~325 national',
    transferability: 'Non-transferable; reverts to club on resignation',
    notes: 'No residential real estate on-site. Members live in Mirabel, Desert Mountain, or Estancia.',
    communitySlug: null,
    tier: 1
  },
  {
    slug: 'whisper-rock',
    club: 'Whisper Rock Golf Club',
    architect: 'Phil Mickelson, Tom Fazio',
    type: 'Equity, members-only',
    invitation: 'Sponsor + committee approval',
    initiation: '$200,000+',
    monthlyDues: '$1,800 – $2,500',
    cap: '~575',
    transferability: 'Equity refund per club bylaws on resignation',
    notes: '"The Augusta of Arizona"heavy PGA TOUR-pro membership. No on-site real estate.',
    communitySlug: null,
    tier: 1
  },
  {
    slug: 'desert-mountain',
    club: 'Desert Mountain Club',
    architect: 'Jack Nicklaus (6 courses)',
    type: 'Equity, members-only',
    invitation: 'Home purchase inside Desert Mountain required',
    initiation: '$150,000 – $250,000',
    monthlyDues: '$2,000 – $3,200',
    cap: '~2,300',
    transferability: 'Equity transfers with home sale; multiple membership tiers',
    notes: 'Only place in the world with six Nicklaus courses inside one club.',
    communitySlug: 'desert-mountain',
    tier: 1
  },
  {
    slug: 'desert-highlands',
    club: 'Desert Highlands Golf Club',
    architect: 'Jack Nicklaus',
    type: 'Equity, members-only',
    invitation: 'Home purchase required; club application',
    initiation: '$125,000 – $175,000',
    monthlyDues: '$1,800 – $2,400',
    cap: '~580 (one per home)',
    transferability: 'Equity transfers with home sale',
    notes: 'Jack Nicklaus’ first ever Arizona design (1983). Original home of the Skins Game.',
    communitySlug: 'desert-highlands',
    tier: 1
  },
  {
    slug: 'mirabel',
    club: 'Mirabel Club',
    architect: 'Jack Nicklaus Signature',
    type: 'Equity, members-only',
    invitation: 'Sponsor + interview',
    initiation: '$175,000 – $250,000',
    monthlyDues: '$1,900 – $2,500',
    cap: '~450',
    transferability: 'Equity ties to home (where applicable); national memberships available',
    notes: 'Rare walkable desert routing. Strong tennis, pickleball, fitness, and culinary programs.',
    communitySlug: 'mirabel',
    tier: 1
  },
  {
    slug: 'troon-cc',
    club: 'Troon Country Club',
    architect: 'Tom Weiskopf & Jay Morrish',
    type: 'Equity, members-only',
    invitation: 'Sponsor; committee review',
    initiation: '$125,000+',
    monthlyDues: '$1,500 – $2,000',
    cap: '~525',
    transferability: 'Equity transferable per bylaws',
    notes: 'Inside Troon Village, the original gated Scottsdale luxury community.',
    communitySlug: 'troon-village',
    tier: 2
  },
  {
    slug: 'dc-ranch-cc',
    club: 'DC Ranch Country Club',
    architect: 'Scott Miller',
    type: 'Equity, members-only',
    invitation: 'Home in DC Ranch + club application',
    initiation: '$75,000 – $125,000',
    monthlyDues: '$1,400 – $1,800',
    cap: '~600',
    transferability: 'Equity transfers with DC Ranch home sale',
    notes: 'Country club inside the established DC Ranch community. Full lifestyle amenities.',
    communitySlug: 'dc-ranch',
    tier: 2
  },
  {
    slug: 'grayhawk',
    club: 'Grayhawk Golf Club',
    architect: 'Tom Fazio (Raptor), Graham & Panks (Talon)',
    type: 'Daily-fee + Player Loyalty',
    invitation: 'Open to public; loyalty program for residents',
    initiation: 'No equity required',
    monthlyDues: 'Pay-per-round or annual pass',
    cap: 'Daily fee',
    transferability: 'N/A',
    notes: 'Public/resort access. Hosts NCAA D-I Championships. Grayhawk residents get preferred tee times.',
    communitySlug: 'grayhawk',
    tier: 3
  },
  {
    slug: 'troon-north',
    club: 'Troon North Golf Club',
    architect: 'Weiskopf & Morrish',
    type: 'Daily-fee + Player Loyalty',
    invitation: 'Open to public; resident loyalty discounts',
    initiation: 'No equity required',
    monthlyDues: 'Annual loyalty pass available',
    cap: 'Daily fee',
    transferability: 'N/A',
    notes: 'The original desert-target daily-fee model. Residents get preferred access.',
    communitySlug: 'troon-north',
    tier: 3
  },
  {
    slug: 'boulders',
    club: 'The Boulders Resort Club',
    architect: 'Jay Morrish',
    type: 'Resort + private membership tiers',
    invitation: 'Open to resort guests; private tiers available',
    initiation: '$25,000 – $60,000 (private tier)',
    monthlyDues: '$700 – $1,200',
    cap: 'Limited private',
    transferability: 'Per club bylaws',
    notes: 'Hybrid resort-private model. Boulders homeowners eligible for member-rate access.',
    communitySlug: 'boulders',
    tier: 3
  }
];

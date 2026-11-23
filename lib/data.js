// Site-wide constants
// IMPORTANT: SITE.url is the CANONICAL production URL and must always point to
// scottsdalegolflifestyle.com regardless of which environment (preview/prod) is
// rendering the page.
//
// SITE.email and SITE.address are intentionally empty until a verified business
// contact is wired in. Until then, mailto: links across the site fall back to
// the lead form (which captures the visitor\u2019s own email server-side).
export const SITE = {
  name: 'Scottsdale Golf Lifestyle',
  url: 'https://scottsdalegolflifestyle.com',
  phone: '',
  email: '',
  address: null,
  geo: { lat: 33.6054, lng: -111.8907 },
  ga4: 'G-B3DHTD71Z8'
};

// Collaborator / Featured-Realtor application form (Google Forms)
// All "Apply" CTAs across the site route to this single URL.
// Application form for prospective collaborators. Native, MongoDB-backed form
// at /collaborators/apply (replaced a prior Google Form, which looked cheap
// and lived off-platform).
export const COLLABORATOR_FORM_URL = '/collaborators/apply';

// Community seed data
export const COMMUNITIES = [
  {
    slug: 'grayhawk',
    name: 'Grayhawk',
    tagline: 'Two championship courses in the heart of North Scottsdale',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Talon Course', 'Raptor Course'],
    priceRange: '$850K – $4.2M',
    homeCount: 3800,
    yearEstablished: 1994,
    image: '/images/communities/grayhawk.webp',
    description: 'Grayhawk is one of Scottsdale\u2019s most coveted master-planned golf communities, anchored by the Talon and Raptor championship courses. Tree-lined streets, walkable village centers, and resort-style amenities define daily life here.',
    highlights: [
      'Two Phil Mickelson-affiliated championship courses',
      'Grayhawk Golf Club hosts NCAA D-I Championships',
      'Award-winning K\u201312 schools (BASIS, Pinnacle High)',
      'Walkable village retail at DC Ranch Marketplace',
      '15 minutes to North Scottsdale Airpark'
    ]
  },
  {
    slug: 'dc-ranch',
    name: 'DC Ranch',
    tagline: 'A storied Country Club estate community at the base of the McDowells',
    location: 'North Scottsdale, AZ 85255',
    courses: ['The Country Club at DC Ranch (private 18)'],
    priceRange: '$1.1M – $9.5M',
    homeCount: 3200,
    yearEstablished: 1998,
    image: '/images/communities/dc-ranch.webp',
    description: 'DC Ranch is a private guard-gated estate community spanning 4,400 acres at the base of the McDowell Mountains. The DC Ranch Country Club offers two private 18-hole courses, a full-service spa, and one of the most exclusive social scenes in Scottsdale.',
    highlights: [
      'Private Country Club with an 18-hole Lehman/Fought course',
      '4,400 acres with 33 miles of trails',
      'Guard-gated with 24/7 patrol',
      'Market Street village shopping & dining',
      'Adjacent to McDowell Sonoran Preserve'
    ]
  },
  {
    slug: 'troon-north',
    name: 'Troon North',
    tagline: 'Desert-mountain golf with two of America\u2019s top-100 public courses',
    location: 'North Scottsdale, AZ 85262',
    courses: ['Pinnacle Course', 'Monument Course'],
    priceRange: '$1.4M – $12M',
    homeCount: 2100,
    yearEstablished: 1990,
    image: '/images/communities/troon-north.webp',
    description: 'Troon North is the original desert-mountain golf destination in North Scottsdale. The Monument and Pinnacle courses, both consistently ranked among America\u2019s top-100 public courses, weave through granite boulders, ancient saguaros, and dramatic elevation changes.',
    highlights: [
      'Monument & Pinnacle: top-100 US public courses',
      'Pristine Sonoran Desert setting',
      'Custom luxury estates on 1\u20133 acre lots',
      '5 minutes to Pinnacle Peak Park',
      'Boulders Resort & Spa nearby'
    ]
  },
  {
    slug: 'silverleaf',
    name: 'Silverleaf',
    tagline: 'Scottsdale\u2019s most exclusive private community, inside DC Ranch',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Silverleaf Club (private)'],
    priceRange: '$3.5M \u2013 $28M',
    homeCount: 700,
    yearEstablished: 2002,
    image: '/images/communities/silverleaf.webp',
    description: 'Silverleaf is the crown jewel of Scottsdale luxury: a 1,500-acre guard-gated enclave tucked into the eastern flank of DC Ranch. Tom Weiskopf\u2019s celebrated Silverleaf Club is among the most coveted private memberships in the American Southwest.',
    highlights: [
      'Tom Weiskopf private 18-hole championship course',
      'Guard-gated, 24/7 patrol',
      'Custom estates from 4,000 to 25,000+ sq ft',
      'Inside the DC Ranch master plan',
      'Mountain & city-light view lots'
    ]
  },
  {
    slug: 'desert-mountain',
    name: 'Desert Mountain',
    tagline: 'Six Jack Nicklaus Signature courses plus a par-54 seventh inside one private community',
    location: 'North Scottsdale, AZ 85262',
    courses: ['Renegade','Cochise','Geronimo','Apache','Chiricahua','Outlaw','Seven (par-3)'],
    priceRange: '$1.6M \u2013 $18M',
    homeCount: 2700,
    yearEstablished: 1986,
    image: '/images/communities/desert-mountain.webp',
    description: 'Desert Mountain spans about 8,300 acres in the high Sonoran Desert and is home to six Jack Nicklaus Signature courses, which the club describes as the largest private collection anywhere, plus No. 7, a par-54 course. Members have access to seven clubhouses, ten restaurants and grills, and 25+ miles of private hiking trails.',
    highlights: [
      'Six Jack Nicklaus Signature courses plus par-54 No. 7',
      'About 8,300-acre guard-gated community',
      'Ten restaurants and grills on property',
      '25+ miles of private hiking trails',
      'Resident-only Sonoran Clubhouse spa'
    ]
  },
  {
    slug: 'boulders',
    name: 'The Boulders',
    tagline: 'Resort-style desert living among 12-million-year-old granite outcroppings',
    location: 'Carefree / North Scottsdale, AZ 85377',
    courses: ['North Course','South Course'],
    priceRange: '$950K \u2013 $7M',
    homeCount: 1450,
    yearEstablished: 1985,
    image: '/images/communities/boulders.webp',
    description: 'The Boulders is a Curio Collection resort community where Jay Morrish\u2019s twin championship courses wind through massive granite outcroppings. Casitas, patio homes and custom estates are interspersed with the resort\u2019s award-winning spa and dining.',
    highlights: [
      'Two Jay Morrish championship courses',
      'Curio Collection (Hilton) resort on property',
      'Award-winning Spa at The Boulders',
      'Casitas, villas, and custom estates',
      '10 min to downtown Carefree art galleries'
    ]
  },
  {
    slug: 'estancia',
    name: 'Estancia',
    tagline: 'A 640-acre members-only enclave at the base of Pinnacle Peak',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Estancia Club (private)'],
    priceRange: '$2.8M \u2013 $22M',
    homeCount: 290,
    yearEstablished: 1995,
    image: '/images/communities/estancia.webp',
    description: 'Estancia is one of the most private and intimate communities in all of Scottsdale, just 290 homesites on 640 acres at the foot of Pinnacle Peak. Tom Fazio\u2019s Estancia Club is consistently ranked the #1 private course in Arizona.',
    highlights: [
      'Tom Fazio #1-ranked private AZ course',
      'Only 290 homesites on 640 acres',
      'Guard-gated with 24/7 patrol',
      'Pinnacle Peak panoramas from every lot',
      'Sponsorship required for club membership'
    ]
  },
  {
    slug: 'mirabel',
    name: 'Mirabel',
    tagline: 'Tom Fazio golf and old-Scottsdale charm on 700 desert acres',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Mirabel Club (private, Tom Fazio)'],
    priceRange: '$1.9M \u2013 $15M',
    homeCount: 600,
    yearEstablished: 2001,
    image: '/images/communities/mirabel.webp',
    description: 'Mirabel is a refined private golf community designed around a celebrated Tom Fazio desert course and a turn-of-the-century western-ranch aesthetic. The community is known for its tight-knit member culture and walking-friendly course routing.',
    highlights: [
      'Tom Fazio private course',
      'Walkable course routing (rare in AZ)',
      '700 acres, ~600 homesites',
      'Old-Scottsdale ranch architectural style',
      'Members-only fitness, tennis, pickleball'
    ]
  },
  {
    slug: 'gainey-ranch',
    name: 'Gainey Ranch',
    tagline: 'Central Scottsdale\u2019s original master-planned golf and resort community',
    location: 'Central Scottsdale, AZ 85258',
    courses: ['Gainey Ranch Golf Club (private \u2013 27 holes)'],
    priceRange: '$725K \u2013 $5.5M',
    homeCount: 1600,
    yearEstablished: 1984,
    image: '/images/communities/gainey-ranch.webp',
    description: 'Gainey Ranch is the established gold-standard for central Scottsdale resort living: a 560-acre guard-gated community wrapped around the Hyatt Regency resort and a 27-hole private country club, with tree-lined streets and seven distinct sub-neighborhoods.',
    highlights: [
      '27-hole private Gainey Ranch Golf Club',
      'Adjacent to Hyatt Regency resort & spa',
      'Guard-gated, mature landscaping',
      'Walkable to Scottsdale Quarter & Kierland',
      'Single-level patio homes to lakefront estates'
    ]
  }
];

// Listings (intentionally empty)
// Mock listings were removed because the site does not have a live IDX/MLS
// feed. Showing fake inventory at the luxury price point creates buyer-trust
// liability and Google E-E-A-T issues. This array stays empty until real
// IDX data is wired in.
export const LISTINGS = [];
// Golf courses listed on the dedicated page
export const GOLF_COURSES = [
  // ────────── Ultra-private members-only ──────────
  { name: 'Scottsdale National \u2013 The Mine Course',     clubSlug: 'scottsdale-national', architect: 'Tim Jackson & David Kahn', par: 72, yardage: 7212, type: 'Private (members-only)',    signature: 'Bob Parsons\u2019 vision: pure shot-making, zero compromises.' },
  { name: 'Scottsdale National \u2013 The Other Course',    clubSlug: 'scottsdale-national', architect: 'Phil Mickelson & Rick Smith',                par: 72, yardage: 7027, type: 'Private (members-only)',    signature: 'Phil-designed, with risk-reward driveable par-4s.' },
  { name: 'Scottsdale National \u2013 The Bad Little Nine', clubSlug: 'scottsdale-national', architect: 'Bob Parsons (concept) & Jackson/Kahn',        par: 27, yardage: 1411, type: 'Private (members-only)',    signature: 'A par-3 short course with diabolical green complexes.' },
  { name: 'Whisper Rock \u2013 Upper Course',               clubSlug: 'whisper-rock',        architect: 'Tom Fazio',                                  par: 72, yardage: 7550, type: 'Private (members-only)',    signature: 'Fazio finesse: considered one of his finest desert layouts.' },
  { name: 'Whisper Rock \u2013 Lower Course',               clubSlug: 'whisper-rock',        architect: 'Phil Mickelson & Gary Stephenson',           par: 72, yardage: 7390, type: 'Private (members-only)',    signature: 'Designed by Phil for tour pros: long, strategic, demanding.' },
  { name: 'Estancia Club',                                  clubSlug: 'estancia',            architect: 'Tom Fazio',                                  par: 72, yardage: 7224, type: 'Private (members-only)',    signature: '#1-ranked private course in Arizona at the base of Pinnacle Peak.' },
  { name: 'Silverleaf Club',                                clubSlug: 'silverleaf',          architect: 'Tom Weiskopf',                               par: 72, yardage: 7325, type: 'Private (members-only)',    signature: 'Weiskopf masterpiece carved into the McDowell foothills.' },
  { name: 'Desert Mountain \u2013 Renegade',                clubSlug: 'desert-mountain',     architect: 'Jack Nicklaus',                              par: 72, yardage: 7194, type: 'Private (members-only)',    signature: 'Six Nicklaus courses inside one private community.' },
  { name: 'Desert Mountain \u2013 Cochise',                 clubSlug: 'desert-mountain',     architect: 'Jack Nicklaus',                              par: 72, yardage: 6973, type: 'Private (members-only)',    signature: 'Hosted the PGA TOUR Champions\u2019 Charles Schwab Cup Championship in 2012 and 2014\u20132016.' },
  { name: 'Mirabel Club',                                   clubSlug: 'mirabel',             architect: 'Tom Fazio',                                  par: 71, yardage: 7127, type: 'Private (members-only)',    signature: 'Walkable Fazio routing: a rare luxury in desert golf.' },
  { name: 'Phoenician Golf Club',                           clubSlug: 'phoenician-residences',        architect: 'Phil Mickelson (2018 redesign)',             par: 71, yardage: 6518, type: 'Resort / private hybrid',   signature: 'Camelback Mountain backdrop, $32M Mickelson rebuild.' },

  // ────────── Resort / Public-premium ──────────
  { name: 'Troon North \u2013 Monument Course',     architect: 'Tom Weiskopf & Jay Morrish', par: 72, yardage: 7028, type: 'Public / Resort', signature: 'The famous boulder-bisected par-4 3rd hole.' },
  { name: 'Troon North \u2013 Pinnacle Course',     architect: 'Tom Weiskopf',               par: 72, yardage: 7044, type: 'Public / Resort', signature: 'Elevated tee boxes with Pinnacle Peak panoramas.' },
  { name: 'Grayhawk \u2013 Raptor Course',          architect: 'Tom Fazio',                  par: 72, yardage: 7135, type: 'Public / Resort', signature: 'Host of the NCAA D-I Men\u2019s & Women\u2019s Championships.' },
  { name: 'Grayhawk \u2013 Talon Course',           architect: 'David Graham & Gary Panks',  par: 72, yardage: 6973, type: 'Public / Resort', signature: 'Devilish par-3 11th over a saguaro-studded ravine.' },
  { name: 'TPC Scottsdale \u2013 Stadium Course',   architect: 'Tom Weiskopf & Jay Morrish', par: 71, yardage: 7261, type: 'Resort',          signature: 'Home of the WM Phoenix Open\u2019s famous 16th hole.' },
  { name: 'TPC Scottsdale \u2013 Champions Course', architect: 'Randy Heckenkemper',         par: 71, yardage: 7115, type: 'Resort',          signature: 'Quieter sibling of the Stadium: great winter rates.' },
  { name: 'The Boulders \u2013 North Course',       architect: 'Jay Morrish',                par: 72, yardage: 6717, type: 'Resort',          signature: 'Twelve-million-year-old granite outcrops define each fairway.' },
  { name: 'The Boulders \u2013 South Course',       architect: 'Jay Morrish',                par: 71, yardage: 6726, type: 'Resort',          signature: 'Tighter sibling layout favoring shot-makers over bombers.' },
  { name: 'We-Ko-Pa \u2013 Saguaro Course',         architect: 'Coore & Crenshaw',           par: 71, yardage: 6966, type: 'Public',          signature: 'Walkable, ranked among America\u2019s top-100 public courses.' },
  { name: 'We-Ko-Pa \u2013 Cholla Course',          architect: 'Scott Miller',               par: 72, yardage: 7225, type: 'Public',          signature: 'Yavapai Nation land: zero residential development on either side.' },
  { name: 'Talking Stick \u2013 North Course',      architect: 'Coore & Crenshaw',           par: 70, yardage: 7133, type: 'Resort',          signature: 'Links-style Sonoran design: wide fairways, firm turf.' },
  { name: 'Talking Stick \u2013 South Course',      architect: 'Coore & Crenshaw',           par: 71, yardage: 6833, type: 'Resort',          signature: 'Parkland-style sister to the North: lakes & cottonwoods.' },
  { name: 'Camelback \u2013 Ambiente Course',       architect: 'Jason Straka (Hurdzan)',     par: 72, yardage: 7225, type: 'Resort',          signature: 'Award-winning 2012 redesign at JW Marriott Camelback.' },
  { name: 'Camelback \u2013 Padre Course',          architect: 'Arthur Jack Snyder',         par: 72, yardage: 6903, type: 'Resort',          signature: 'Older, tree-lined sister course: great for higher-handicap players.' },

  // ────────── Private gated-community clubs ──────────
  { name: 'The Country Club at DC Ranch',                   clubSlug: 'dc-ranch',  architect: 'Tom Lehman & John Fought',  par: 71, yardage: 6888, type: 'Private (community-affiliated)', signature: 'Members-only routing climbing into the McDowell foothills.' },
  { name: 'Terravita Golf Club',                   clubSlug: 'terravita', architect: 'Billy Casper & Greg Nash', par: 72, yardage: 6850, type: 'Private (community-affiliated)', signature: 'Mature 1994 desert routing with Continental Mountains views.' },
  { name: 'Legend Trail Golf Club',                clubSlug: 'legend-trail', architect: 'Rees Jones', par: 71, yardage: 6845, type: 'Semi-private (community-affiliated)', signature: 'Rees Jones desert design with dramatic elevation changes.' },
  { name: 'Gainey Ranch \u2013 Lakes/Arroyo/Dunes', clubSlug: 'gainey-ranch', architect: 'Brad Benz & Mike Poellot', par: 72, yardage: 6800, type: 'Private (community-affiliated)', signature: 'Three nines wound through central-Scottsdale water features.' },
  { name: 'McCormick Ranch \u2013 Palm Course',    clubSlug: 'mccormick-ranch', architect: 'Desmond Muirhead', par: 72, yardage: 7032, type: 'Public (community-affiliated)', signature: '70+ palms imported from California: the original 1972 Scottsdale resort course.' },
  { name: 'McCormick Ranch \u2013 Pine Course',    clubSlug: 'mccormick-ranch', architect: 'Desmond Muirhead', par: 72, yardage: 7187, type: 'Public (community-affiliated)', signature: 'Lakeside sibling: home of the LPGA Standard Register Ping for 14 years.' },
  { name: 'Pinnacle Peak Country Club',            clubSlug: 'pinnacle-peak-country-club', architect: 'Forrest Richardson (redesign)', par: 71, yardage: 6562, type: 'Private (community-affiliated)', signature: 'Old-Scottsdale 1977 club with founding-member-Bob-Goldwater roots.' },
  { name: 'Ancala Country Club',                   clubSlug: 'ancala',         architect: 'Perry Dye',                   par: 72, yardage: 7203, type: 'Private', signature: 'East-Scottsdale members club tucked against the McDowell foothills.' },
  { name: 'FireRock Country Club',                 clubSlug: 'firerock',       architect: 'Gary Panks',                  par: 71, yardage: 6810, type: 'Private', signature: 'Fountain Hills club known for elevation changes & Four Peaks views.' },
  { name: 'Eagle Mountain Golf Club',              clubSlug: 'eagle-mountain', architect: 'Scott Miller',                par: 71, yardage: 6800, type: 'Public', signature: 'Fountain Hills daily-fee with sweeping Four Peaks panoramas.' },
  { name: 'Sun Ridge Canyon Golf Club',            clubSlug: 'sun-ridge-canyon', architect: 'Keith Foster', par: 71, yardage: 6826, type: 'Public', signature: 'The famous "Wicked Six" finishing stretch through a saguaro-lined canyon.' }
];

// ────────────────────────────────────────────────────────────────────────────
// Golf-course architects featured on the Scottsdale scene.
//
// Each entry powers a programmatic /architects/[slug] SEO page that captures
// long-tail traffic ("tom fazio scottsdale courses", "weiskopf desert designs",
// "jack nicklaus signature courses arizona", etc.) and routes prospects into
// the relevant community pages — the architect → course → community →
// listings funnel.
// ────────────────────────────────────────────────────────────────────────────
export const ARCHITECTS = [
  {
    slug: 'tom-fazio',
    name: 'Tom Fazio',
    aka: ['Fazio', 'Thomas Fazio'],
    born: 1945,
    tagline: 'The patriarch of modern American resort and private-club design.',
    summary: 'Tom Fazio is widely regarded as the most prolific high-end golf-course architect of the modern era, with more courses ranked in Golf Digest\u2019s Top 100 than any other designer. His Scottsdale work is concentrated in the upper tier of private golf: Estancia, Mirabel, the Upper Course at Whisper Rock, and Grayhawk\u2019s Raptor. All lean on his signature aesthetic: bold sculpting that looks natural, large undulating greens, and zero forced carries on member tees.',
    designPhilosophy: 'Strategic options for the member, championship teeth for the elite player, and dramatic visual framing that photographs as well as it plays.',
    notableCoursesGlobal: ['Shadow Creek (Las Vegas)', 'Wade Hampton (NC)', 'Galloway National (NJ)', 'Victoria National (IN)'],
    matchTerms: ['Tom Fazio', 'Fazio'],
    image: '/images/architects/tom-fazio.webp'
  },
  {
    slug: 'jack-nicklaus',
    name: 'Jack Nicklaus',
    aka: ['Nicklaus', 'Nicklaus Design', 'Jack Nicklaus Signature'],
    born: 1940,
    tagline: 'The Golden Bear\u2019s desert-design legacy is unmatched in Scottsdale\u2019s far-north corridor.',
    summary: 'Jack Nicklaus designed more world-class courses than any other player-turned-architect. In the Scottsdale market, Nicklaus and his firm are best known for Desert Mountain: a private community with six (and counting) Nicklaus layouts inside one perimeter wall, the only such concentration anywhere in his portfolio.',
    designPhilosophy: 'Reward shotmaking, demand thoughtful course management, and place the strongest holes near the end of each nine.',
    notableCoursesGlobal: ['Muirfield Village (OH)', 'Memorial Park (TX)', 'PGA National Champion (FL)', 'Glen Abbey (Ontario)'],
    matchTerms: ['Jack Nicklaus', 'Nicklaus'],
    image: '/images/architects/jack-nicklaus.webp'
  },
  {
    slug: 'tom-weiskopf',
    name: 'Tom Weiskopf',
    aka: ['Weiskopf', 'Weiskopf & Morrish'],
    born: 1942,
    tagline: 'The Open champion who arguably defined the modern Scottsdale desert aesthetic.',
    summary: 'No architect has shaped the Scottsdale skyline of golf more than Tom Weiskopf. His Silverleaf Club is the city\u2019s ultra-private flagship, his TPC Stadium Course is the most-televised course in Arizona (home of the WM Phoenix Open), and his Troon North Monument and Pinnacle courses defined the daily-fee desert-target genre. Many of his most acclaimed Scottsdale routings were co-designed with the late Jay Morrish.',
    designPhilosophy: 'Dramatic risk/reward driveable par-4s, strategic angles off the tee, and a hard-to-quantify "fun-to-play" factor for the resort visitor.',
    notableCoursesGlobal: ['Loch Lomond (Scotland)', 'Forest Highlands (Flagstaff)', 'Double Eagle (OH)'],
    matchTerms: ['Tom Weiskopf', 'Weiskopf'],
    image: '/images/architects/tom-weiskopf.webp'
  },
  {
    slug: 'phil-mickelson',
    name: 'Phil Mickelson',
    aka: ['Mickelson', 'Mickelson Design'],
    born: 1970,
    tagline: 'The hometown major champion turned hands-on architect.',
    summary: 'Phil Mickelson grew up playing Scottsdale and Phoenix golf, and his architectural work in the area carries a player-first sensibility unusual for a tour-pro signature designer. He co-designed the Upper Course at Whisper Rock (with Gary Stephenson) and The Other Course at Scottsdale National (with Rick Smith): both rare combinations of length, finesse, and risk/reward decision-making, and led the $32M 2018 rebuild of the Phoenician Golf Club at the foot of Camelback Mountain.',
    designPhilosophy: 'Reward creative shotmaking, build greens that allow multiple ways into pins, and reject the modern obsession with all-or-nothing forced carries.',
    notableCoursesGlobal: ['McGladrey Course at Sea Island (GA)', 'The Grove XXIII (FL)'],
    matchTerms: ['Phil Mickelson', 'Mickelson'],
    image: '/images/architects/phil-mickelson.webp'
  },
  {
    slug: 'coore-crenshaw',
    name: 'Coore & Crenshaw',
    aka: ['Bill Coore', 'Ben Crenshaw', 'Coore-Crenshaw'],
    born: null,
    tagline: 'The minimalist team behind Scottsdale\u2019s most-walked, most-praised public courses.',
    summary: 'Bill Coore and 1995 Masters champion Ben Crenshaw form the most quietly influential design partnership of the last 30 years. Their Scottsdale-area portfolio, the Saguaro Course at We-Ko-Pa and both the North and South courses at Talking Stick, embodies their minimalist philosophy: walkable routings, firm playing surfaces, and a deliberate avoidance of bulldozer-heavy desert "moonscaping." Saguaro and Talking Stick North are perennial top-100-public list members in the U.S.',
    designPhilosophy: '"Find the golf course already in the land." Walkable routings, minimal earthmoving, and ground-game-friendly playing surfaces.',
    notableCoursesGlobal: ['Sand Hills (NE)', 'Bandon Trails (OR)', 'Streamsong Red (FL)', 'Friar\u2019s Head (NY)'],
    matchTerms: ['Coore & Crenshaw', 'Coore', 'Crenshaw'],
    image: '/images/architects/coore-crenshaw.webp'
  },
  {
    slug: 'scott-miller',
    name: 'Scott Miller',
    aka: ['Miller'],
    born: 1952,
    tagline: 'The Arizona-based architect with deepest fingerprints on community-club golf.',
    summary: 'Scott Miller learned his craft as a Nicklaus protégé before establishing his own Scottsdale practice. He is the lead architect behind the Cholla Course at We-Ko-Pa and Eagle Mountain in nearby Fountain Hills. His desert-target aesthetic blends naturally with the Sonoran landscape: minimal turf, dramatic transitions between fairway and arroyo, and his courses are often cited as the most "playable for the average member" of any Scottsdale designer.',
    designPhilosophy: 'Maximize daily playability for the everyday member while still giving the championship tees real teeth.',
    notableCoursesGlobal: ['Anthem Country Club (NV)', 'Pinon Hills (NM)'],
    matchTerms: ['Scott Miller'],
    image: '/images/architects/scott-miller.webp'
  },
  {
    slug: 'jay-morrish',
    name: 'Jay Morrish',
    aka: ['Morrish', 'Weiskopf & Morrish'],
    born: 1940,
    tagline: 'The other half of arguably the most successful design partnership in Scottsdale history.',
    summary: 'Jay Morrish (1940 – 2016) partnered with Tom Weiskopf on a string of celebrated 1980s and 1990s desert designs: the Monument Course at Troon North and the TPC Stadium Course among them. He also designed both The Boulders\u2019 North and South courses solo, where his work integrating play among the iconic 12-million-year-old granite outcrops is widely studied. Morrish brought the technical routing chops that complemented Weiskopf\u2019s player instincts.',
    designPhilosophy: 'Move as little earth as the routing allows; let natural land features carry the strategic load.',
    notableCoursesGlobal: ['Castle Pines Golf Club (CO)', 'Forest Highlands Canyon (Flagstaff)'],
    matchTerms: ['Jay Morrish', 'Morrish'],
    image: '/images/architects/jay-morrish.webp'
  },
  {
    slug: 'gary-panks',
    name: 'Gary Panks',
    aka: ['Panks', 'David Graham & Gary Panks'],
    born: 1941,
    tagline: 'The under-celebrated architect with two iconic Scottsdale-area routings.',
    summary: 'Gary Panks made his name in the Phoenix-Scottsdale market with two very different courses: the Talon Course at Grayhawk (co-designed with Australian Masters/U.S. Open champion David Graham), home of the famous 11th-hole par-3 carry over a saguaro-studded ravine; and FireRock Country Club in Fountain Hills, a more intimate private members\u2019 layout known for its dramatic elevation changes and Four Peaks vistas. Both layouts demonstrate his preference for visually dramatic but strategically generous designs.',
    designPhilosophy: 'Reward shotmaking, frame each hole with a memorable visual hook, and keep the resort guest coming back.',
    notableCoursesGlobal: ['SunRidge Canyon (Fountain Hills)', 'Coyote Lakes (Surprise, AZ)'],
    matchTerms: ['Gary Panks', 'Panks'],
    image: '/images/architects/gary-panks.webp'
  },
  {
    slug: 'perry-dye',
    name: 'Perry Dye',
    aka: ['Perry Dye', 'Dye Designs', 'P.B. Dye'],
    born: 1952,
    tagline: 'The Dye family\u2019s desert chapter: carrying Pete Dye\u2019s strategic DNA into Scottsdale.',
    summary: 'Perry Dye, son of the legendary Pete Dye, brought the family\u2019s trademark strategic design language to north-east Scottsdale at Ancala Country Club. The course is a masterclass in Dye principles: deceptive sight-lines, generous fairways that reveal punishing angles only at impact, and bunkering positioned to punish the lazy shot rather than the unlucky one. Ancala is one of the few opportunities to play a Dye-family routing in metro Phoenix.',
    designPhilosophy: 'Deception over difficulty. Give the player options, then quietly punish the lazy choice.',
    notableCoursesGlobal: ['Eagle Watch (GA)', 'Wakonda Club (IA)', 'TPC Wakefield Plantation (NC)'],
    matchTerms: ['Perry Dye', 'P.B. Dye', 'Dye'],
    image: '/images/architects/perry-dye.webp'
  },
  {
    slug: 'rees-jones',
    name: 'Rees Jones',
    aka: ['Rees Jones', 'Jones'],
    born: 1941,
    tagline: '"The Open Doctor"known for restoring championship courses, but he also built a Scottsdale gem.',
    summary: 'Rees Jones earned the nickname "The Open Doctor" for his work redesigning U.S. Open host courses including Bethpage Black, Torrey Pines South, and East Lake. In Scottsdale, his original work shines at Legend Trail Golf Club: a semi-private community-affiliated layout in north Scottsdale where dramatic elevation changes and views of Pinnacle Peak make it one of the more visually arresting daily-fee experiences in the region.',
    designPhilosophy: 'Build a course you could host the U.S. Open on tomorrow: fair off the tee, demanding into the green, restorable under pressure.',
    notableCoursesGlobal: ['Bethpage Black redesign (NY)', 'Torrey Pines South redesign (CA)', 'East Lake redesign (GA)', 'Atlantic Golf Club (NY)'],
    matchTerms: ['Rees Jones'],
    image: '/images/architects/rees-jones.webp'
  },
  {
    slug: 'keith-foster',
    name: 'Keith Foster',
    aka: ['Keith Foster', 'Foster'],
    born: 1956,
    tagline: 'The classical-restoration specialist who also designed Fountain Hills\u2019 most-praised daily-fee.',
    summary: 'Keith Foster is best known nationally for sympathetic restorations of Golden-Age courses by Donald Ross, A.W. Tillinghast, and Seth Raynor, and his name appears on the short list of restoration architects entrusted with the most historically significant American courses. In the Scottsdale market, his original-design highlight is Sun Ridge Canyon Golf Club in Fountain Hills: a daily-fee championship layout home to the famous "Wicked Six" finishing stretch through a tight saguaro-lined canyon, where the elevation changes, blind shots, and saguaro hazards combine to produce a finish that is regularly cited among the most memorable in Arizona daily-fee golf. The course is a perennial top-50-daily-fee list member and one of the best-walked layouts in metro Phoenix, with a routing that uses the natural canyon topography rather than fighting it. Foster\u2019s broader portfolio: including restoration work at Southern Hills, Colonial Country Club, and Philadelphia Cricket Club, reflects an editorial philosophy of restraint, classical proportions, and deference to the original land form, and Sun Ridge Canyon is the Scottsdale-area expression of that same sensibility.',
    designPhilosophy: 'Respect the land\u2019s natural movement. Bunkers should feel inevitable, not imposed. Greens should reward thought, not just power. The best courses look like they were already there.',
    notableCoursesGlobal: ['Restoration: Southern Hills Country Club (OK)', 'Restoration: Colonial Country Club (TX)', 'Restoration: Philadelphia Cricket Club: Wissahickon (PA)', 'Restoration: The Country Club at Brookline (MA, consulting)', 'Original: Sun Ridge Canyon Golf Club (Fountain Hills, AZ)'],
    matchTerms: ['Keith Foster', 'Foster'],
    image: '/images/architects/keith-foster.webp'
  },
  {
    slug: 'forrest-richardson',
    name: 'Forrest Richardson',
    aka: ['Forrest Richardson', 'Richardson'],
    born: 1956,
    tagline: 'Arizona\u2019s native architectural conscience: the steward of Scottsdale\u2019s historic course inventory.',
    summary: 'Forrest Richardson is the Phoenix-based architect whose name appears on every short-list of contemporary American course architects, and his fingerprints are on dozens of Scottsdale-area restoration and redesign projects. His most notable Scottsdale work is the 2010s sympathetic redesign of Pinnacle Peak Country Club, a 1977 Old-Scottsdale members\u2019 layout with Goldwater-family roots, which managed to modernize the course without erasing its founding character. He also serves as a frequent consultant on course-restoration efforts throughout the Valley.',
    designPhilosophy: 'Every site has a story. Listen first, design second. Restorations are an act of editorial humility.',
    notableCoursesGlobal: ['The Estancia Club Practice Facility (with Tom Fazio)', 'Numerous Arizona daily-fee restorations'],
    matchTerms: ['Forrest Richardson', 'Richardson'],
    image: '/images/architects/forrest-richardson.webp'
  },
  {
    slug: 'desmond-muirhead',
    name: 'Desmond Muirhead',
    aka: ['Desmond Muirhead', 'Muirhead'],
    born: 1923,
    tagline: 'The mid-century master-planner who literally invented modern Scottsdale resort golf.',
    summary: 'Desmond Muirhead (1923\u20132002) was a British-born landscape architect whose 1971 design for McCormick Ranch in central Scottsdale set the template for every desert resort community that followed. McCormick Ranch was the first master-planned golf community in the Sonoran Desert, and both of its courses (Palm and Pine) remain in continuous play today, with 70+ Mexican fan palms Muirhead personally imported still defining the visual character of the Palm Course. Muirhead\u2019s broader portfolio includes Boca Rio (FL), Aberdeen (NJ), and a famous collaboration with Jack Nicklaus on Muirfield Village.',
    designPhilosophy: 'Golf is theatre. Frame each hole like a stage set. Use water, palms, and dramatic earthwork to make every approach memorable.',
    notableCoursesGlobal: ['Muirfield Village (with Nicklaus, OH)', 'Boca Rio (FL)', 'Stone Harbor (NJ)'],
    matchTerms: ['Desmond Muirhead', 'Muirhead'],
    image: '/images/architects/desmond-muirhead.webp'
  }
];

// Resolve which courses match a given architect entry (by ANY of their match
// terms appearing in the course's `architect` string).
export function coursesByArchitect(architect) {
  const terms = architect.matchTerms || [architect.name];
  return GOLF_COURSES.filter(c =>
    terms.some(t => (c.architect || '').toLowerCase().includes(t.toLowerCase()))
  );
}

export function findArchitect(slug) {
  return ARCHITECTS.find(a => a.slug === slug);
}



export function listingsByPriceRange(min, max) {
  return LISTINGS.filter(l => l.price >= min && l.price < max);
}

export function listingsByCommunity(slug) {
  return LISTINGS.filter(l => l.community === slug);
}

export function findCommunity(slug) {
  return COMMUNITIES.find(c => c.slug === slug);
}

// ────────────────────────────────────────────────────────────────────────────
// Internal-linking helpers — used by community pages to inject contextual
// cross-links to architects and comparable communities. Boosts topical
// authority and reduces orphan-page risk.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parse a community's `priceRange` string (e.g. "$850K – $4.2M") into a
 * rough midpoint price in USD, used for comparable-community ranking.
 * Returns null if unparseable.
 */
function midpointPrice(priceRange) {
  if (!priceRange) return null;
  const matches = priceRange.match(/\$([\d.]+)\s*([KMm])?/g);
  if (!matches || matches.length === 0) return null;
  const toNum = s => {
    const m = s.match(/\$([\d.]+)\s*([KMm])?/);
    if (!m) return 0;
    const n = parseFloat(m[1]);
    const unit = (m[2] || '').toUpperCase();
    if (unit === 'M') return n * 1_000_000;
    if (unit === 'K') return n * 1_000;
    return n;
  };
  const nums = matches.map(toNum).filter(n => n > 0);
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * Get up to `n` "comparable" communities for a given slug, ranked by:
 *   1. Closest midpoint price band
 *   2. Same ZIP/location keywords (North Scottsdale, etc.)
 * Excludes the input community itself.
 */
export function getComparableCommunities(slug, n = 3) {
  const subject = findCommunity(slug);
  if (!subject) return [];
  const subjectMid = midpointPrice(subject.priceRange);
  const subjectLocKey = (subject.location || '').toLowerCase().split(',')[0].trim();

  return COMMUNITIES
    .filter(c => c.slug !== slug)
    .map(c => {
      const mid = midpointPrice(c.priceRange);
      const priceDelta = (subjectMid && mid)
        ? Math.abs(mid - subjectMid) / subjectMid
        : 1;
      const locKey = (c.location || '').toLowerCase().split(',')[0].trim();
      const sameLoc = locKey === subjectLocKey ? 0 : 0.25;
      return { c, score: priceDelta + sameLoc };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, n)
    .map(x => x.c);
}

/**
 * Get the architects who designed any of the courses in a given community.
 * Heuristic: scan the ARCHITECTS list for matchTerms or names that appear
 * in the community's name, courses, description, or highlights. Returns
 * deduped architects in ARCHITECTS-array order.
 */
export function getArchitectsForCommunity(slug) {
  const c = findCommunity(slug);
  if (!c) return [];
  const haystack = [
    c.name,
    ...(c.courses || []),
    c.description || '',
    ...(c.highlights || [])
  ].join(' ').toLowerCase();

  const found = [];
  for (const a of ARCHITECTS) {
    const terms = [a.name, ...(a.aka || []), ...(a.matchTerms || [])]
      .filter(Boolean)
      .map(t => t.toLowerCase());
    if (terms.some(t => haystack.includes(t))) {
      // Also scan the architect's own summary for the community name —
      // this catches cases where the architect explicitly references the
      // community (e.g. Tom Fazio summary mentions "Estancia").
      found.push(a);
      continue;
    }
    const aSummary = (a.summary || '').toLowerCase();
    if (aSummary.includes(c.name.toLowerCase())) {
      found.push(a);
    }
  }
  return found;
}

// ────────────────────────────────────────────────────────────────────────────
// Golf-club guide pages (/golf-clubs/[slug])
//
// These cover prestige clubs that are NOT residential communities, so they
// don\u2019t fit the COMMUNITIES schema. They\u2019re long-form SEO content pages
// that capture high-intent searches like "Scottsdale National membership cost"
// or "Whisper Rock initiation fee" and route prospects into the lead funnel.
// ────────────────────────────────────────────────────────────────────────────
export const GOLF_CLUBS = [
  {
    slug: 'scottsdale-national',
    name: 'Scottsdale National Golf Club',
    tagline: 'Bob Parsons\u2019 uncompromising private golf sanctuary in north Scottsdale',
    location: '9998 E. Jomax Rd, Scottsdale, AZ 85262',
    founded: 2002,
    rebuilt: '2014 (acquired by Bob Parsons, redesigned)',
    courseCount: '2 championship + 1 par-3 short course',
    architects: ['Tim Jackson & David Kahn (The Mine)', 'Phil Mickelson & Rick Smith (The Other Course)'],
    membership: {
      type: 'Members-only, by invitation',
      initiation: '$300,000+ (recent reports; subject to change)',
      monthlyDues: 'Approx. $2,500 \u2013 $3,500/month',
      cap: '~325 national members'
    },
    notableMembers: 'Bob Parsons (GoDaddy founder & owner), Larry Fitzgerald, Michael Phelps, various PGA Tour pros and Fortune-500 CEOs.',
    overview: 'Scottsdale National is the most polarizing, and arguably the most pure, private golf experience in Arizona. Acquired by GoDaddy founder Bob Parsons in 2013, the club operates on a single creed: golf, uncompromised. There is no resort, no real estate, no condos. Just three immaculate layouts, a clubhouse, and members who are absolutely fanatical about the place.',
    courses: [
      { name: 'The Mine', detail: 'A 7,212-yard Jackson/Kahn championship layout cut through Sonoran arroyos. Famous for its enormous, contoured greens and zero-housing visual purity.' },
      { name: 'The Other Course', detail: 'Designed by Phil Mickelson and Rick Smith. Shorter than The Mine but loaded with risk-reward driveable par-4s and Phil\u2019s signature short-game challenges around the greens.' },
      { name: 'The Bad Little Nine', detail: 'A nine-hole par-3 short course conceived by Parsons himself. Lengths range from 90 to 220 yards. Every green is brutal. A favorite warm-up or after-dinner round for members.' }
    ],
    nearbyNeighborhoods: ['mirabel', 'desert-mountain', 'estancia'],
    faqs: [
      { q: 'How do you become a member of Scottsdale National?', a: 'Scottsdale National is invitation-only. Prospective members typically need to be sponsored by two existing members in good standing, complete an interview with the membership committee, and pass financial review. There is no public application process.' },
      { q: 'What is the Scottsdale National initiation fee in 2026?', a: 'Industry sources put the current initiation in the $300,000+ range, with monthly dues of roughly $2,500\u2013$3,500. These figures are private and subject to change: verify with the club directly.' },
      { q: 'Does Scottsdale National have homes for sale on-site?', a: 'No. Bob Parsons explicitly designed the club without on-site residential development. Members live in nearby north-Scottsdale communities: most commonly Mirabel, Desert Mountain, and Estancia, all within a 10-minute drive.' },
      { q: 'Where do most Scottsdale National members live?', a: 'Most members own primary or secondary homes in Mirabel, Desert Mountain, Estancia, or custom estates in the 85262 zip code. We help prospective members find homes positioned for an easy commute to all three courses.' }
    ]
  },
  {
    slug: 'whisper-rock',
    name: 'Whisper Rock Golf Club',
    tagline: 'The tour-pro hideaway designed by Phil Mickelson and Tom Fazio',
    location: '32002 N. Old Bridge Rd, Scottsdale, AZ 85266',
    founded: 2000,
    rebuilt: 'Lower Course opened 2001, Upper Course opened 2005',
    courseCount: '2 championship courses',
    architects: ['Phil Mickelson & Gary Stephenson (Upper)', 'Tom Fazio (Lower)'],
    membership: {
      type: 'Members-only, by invitation',
      initiation: 'Approx. $200,000 (recent reports; subject to change)',
      monthlyDues: 'Approx. $1,800 \u2013 $2,500/month',
      cap: '~575 members'
    },
    notableMembers: 'A who\u2019s-who of PGA TOUR professionals: Phil Mickelson, Justin Leonard, Geoff Ogilvy, Kevin Streelman, Aaron Baddeley, and many others have called Whisper Rock home. Frequently called "the Augusta of Arizona" for its quiet exclusivity.',
    overview: 'Whisper Rock is the rare desert club whose membership reads like a TOUR media guide. Founded in 2000 with input from Phil Mickelson, the club\u2019s two courses sit on 800 acres of pristine Sonoran high desert in far north Scottsdale. The vibe is decidedly understated: no formal dress code, no tournament fanfare, just world-class golf and a small, loyal membership.',
    courses: [
      { name: 'Upper Course', detail: 'A 7,550-yard Tom Fazio design considered one of his finest desert routings. Plays through pristine high desert with sweeping Continental Mountain views, and the green complexes will embarrass anyone who isn\u2019t paying attention.' },
      { name: 'Lower Course', detail: 'A 7,390-yard Mickelson/Stephenson layout that pros use as a tune-up. Long, strategic, and demanding off the tee: slightly shorter than the Upper, but the more exacting test of driving.' }
    ],
    nearbyNeighborhoods: ['desert-mountain', 'mirabel', 'estancia', 'troon-north'],
    faqs: [
      { q: 'How exclusive is Whisper Rock membership?', a: 'Highly exclusive: by invitation only, with a tight membership cap of around 575 nationally. New members typically need to be sponsored by existing members and pass a thorough committee review.' },
      { q: 'What is the Whisper Rock initiation fee?', a: 'Industry reporting places the current initiation in the ~$200,000 range, with monthly dues of approximately $1,800\u2013$2,500. Verify with the club directly as figures change.' },
      { q: 'Are there homes inside Whisper Rock?', a: 'No: Whisper Rock is intentionally a club-only property with no residential development. Members live in surrounding north-Scottsdale communities, most commonly Desert Mountain, Mirabel, and Troon North.' },
      { q: 'Why do so many PGA TOUR pros belong to Whisper Rock?', a: 'The combination of Phil Mickelson\u2019s involvement, two world-class courses, a small low-key membership, and the privacy of far-north Scottsdale created a magnet for touring pros looking for a place to practice in peace during the season.' }
    ]
  }
];

export function findGolfClub(slug) {
  return GOLF_CLUBS.find(c => c.slug === slug);
}

// Resolve the best on-site page for a course's clubSlug. Only returns a URL
// for pages that actually exist: a dedicated /golf-clubs/<slug> deep-dive if
// one is published, otherwise the /communities/<slug> page, otherwise null.
// Never build /golf-clubs/<slug> links by hand — most clubs only have a
// community page, and hand-built links produced 404s in the site audit.
export function clubHref(clubSlug) {
  if (!clubSlug) return null;
  if (GOLF_CLUBS.some(c => c.slug === clubSlug)) return `/golf-clubs/${clubSlug}`;
  if (COMMUNITIES.some(c => c.slug === clubSlug)) return `/communities/${clubSlug}`;
  return null;
}

export function findListing(id) {
  return LISTINGS.find(l => l.id === id);
}

// Blog posts now live in /content/blog/*.mdx, loaded by the server-only
// lib/blog.js. Import BLOG_POSTS / findPost from '@/lib/blog' directly —
// the old re-export from this file was removed so lib/data.js stays safe to
// import from client components (no fs/path in the browser bundle).



// Additional communities (Phase 2)
export const COMMUNITIES_EXTRA = [
  {
    slug: 'stonegate',
    name: 'Stonegate',
    tagline: 'Guard-gated estate community with private Tom Weiskopf golf',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Stonegate Country Club (private)'],
    priceRange: '$1.1M \u2013 $6.5M',
    homeCount: 1100,
    yearEstablished: 1994,
    image: '/images/communities/stonegate.webp',
    description: 'Stonegate is a 480-acre guard-gated community wrapped around a Tom Weiskopf-designed private 18. The community attracts buyers who want club exclusivity without the eight-figure price tag of Silverleaf or Estancia.',
    highlights: ['Private Tom Weiskopf 18-hole course','Guard-gated, 24/7 patrol','Walking distance to Mayo Clinic','Custom estates on \u00bc\u20131 acre lots','Resident-only fitness, tennis, pickleball']
  },
  {
    slug: 'terravita',
    name: 'Terravita',
    tagline: 'Del Webb\u2019s flagship North Scottsdale golf community: resort lifestyle, no age restriction',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Terravita Country Club (private)'],
    priceRange: '$725K \u2013 $2.8M',
    homeCount: 1325,
    yearEstablished: 1994,
    image: '/images/communities/terravita.webp',
    description: 'Terravita is Del Webb\u2019s flagship Scottsdale community: an 823-acre guard-gated enclave with a Billy Casper/Greg Nash private course, a full social calendar, and 1,325 single-family homes. Often mistaken for an age-restricted community, it carries no age limit; its single-level product and club lifestyle simply attract a predominantly active-adult and snowbird buyer pool.',
    highlights: ['Guard-gated Del Webb community (no age restriction)','Private 18-hole Casper/Nash course','38,000 sq ft community center','Pickleball, tennis, fitness, and pool','Lock-and-leave favorite of snowbirds']
  },
  {
    slug: 'legend-trail',
    name: 'Legend Trail',
    tagline: 'Rees Jones semi-private golf in the foothills of Pinnacle Peak',
    location: 'North Scottsdale, AZ 85262',
    courses: ['Legend Trail Golf Club (semi-private)'],
    priceRange: '$695K \u2013 $3.4M',
    homeCount: 1000,
    yearEstablished: 1995,
    image: '/images/communities/legend-trail.webp',
    description: 'Legend Trail offers semi-private Rees Jones golf at North Scottsdale prices that are notably more accessible than Troon North or Desert Mountain. A 1,000-acre community with mountain views, walking trails, and a strong owner-occupied culture.',
    highlights: ['Rees Jones-designed semi-private course','Walking distance to Pinnacle Peak trailhead','Lower HOA than neighboring communities','Tennis, pickleball, fitness on property','Strong full-time resident community']
  },
  {
    slug: 'pinnacle-peak-country-club',
    name: 'Pinnacle Peak Country Club',
    tagline: 'Scottsdale\u2019s original 1970s private golf club, refined for the modern buyer',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Pinnacle Peak CC (private)'],
    priceRange: '$1.2M \u2013 $7.5M',
    homeCount: 540,
    yearEstablished: 1977,
    image: '/images/communities/pinnacle-peak-country-club.webp',
    description: 'Pinnacle Peak Country Club is one of the oldest private golf communities in North Scottsdale, with mature landscaping, large lots, and a refined membership culture. Homes range from 1980s ranches to brand-new contemporary custom builds.',
    highlights: ['Established 1977: mature trees & landscaping','Private 18-hole championship course','Large \u00bd-acre to 2-acre lots','Adjacent to Pinnacle Peak Park','Tight-knit membership community']
  },
  {
    slug: 'mccormick-ranch',
    name: 'McCormick Ranch',
    tagline: 'Central Scottsdale\u2019s classic 1970s master-planned golf community',
    location: 'Central Scottsdale, AZ 85258',
    courses: ['Pine Course','Palm Course'],
    priceRange: '$595K \u2013 $4.2M',
    homeCount: 3400,
    yearEstablished: 1971,
    image: '/images/communities/mccormick-ranch.webp',
    description: 'McCormick Ranch was Scottsdale\u2019s first master-planned golf community and remains the most popular established neighborhood in the central 85258 zip. The Pine and Palm courses run through 26 lakes, tree-lined streets, and walkable village centers.',
    highlights: ['Two 18-hole public/resort courses','26 man-made lakes throughout the community','Walking & biking trails through every village','Walkable to Scottsdale Quarter & Kierland','Mature trees & established landscaping']
  }
];

// Merge extras into COMMUNITIES
COMMUNITIES.push(...COMMUNITIES_EXTRA);

// ────────────────────────────────────────────────────────────────────────────
// Phase 3 \u2014 Broader Scottsdale-area golf communities
//
// These fill the gaps for buyers searching outside the core "North Scottsdale
// 85255/85262" cluster: East Scottsdale (Ancala, Scottsdale Ranch), Fountain
// Hills (FireRock, Eagle Mountain), Carefree/Cave Creek (Saguaro Highlands),
// Rio Verde (Tonto Verde), Paradise Valley adjacencies, and ultra-luxe
// micro-enclaves like Sincuidados & Sereno Canyon.
// ────────────────────────────────────────────────────────────────────────────
export const COMMUNITIES_EXTRA_2 = [
  {
    slug: 'ancala',
    name: 'Ancala',
    tagline: 'East Scottsdale\u2019s guard-gated country-club community',
    location: 'East Scottsdale, AZ 85258',
    courses: ['Ancala Country Club (private: Perry Dye)'],
    priceRange: '$895K \u2013 $5.5M',
    homeCount: 575,
    yearEstablished: 1986,
    image: '/images/communities/ancala.webp',
    description: 'Ancala is a 575-home guard-gated community tucked against the western flank of the McDowell Mountains in east Scottsdale. Perry Dye\u2019s 1989 desert layout meanders through the neighborhood, and the private country club anchors a tight-knit member culture.',
    highlights: ['Private Perry Dye 18-hole course','Guard-gated, 24/7 patrol','Walking distance to Mountain View Park trail','Single-level patio homes to custom estates','Active member-driven club culture']
  },
  {
    slug: 'firerock',
    name: 'FireRock',
    tagline: 'Guard-gated luxury enclave with Gary Panks golf and Four Peaks views',
    location: 'Fountain Hills, AZ 85268',
    courses: ['FireRock Country Club (private: Gary Panks)'],
    priceRange: '$1.1M \u2013 $8M',
    homeCount: 730,
    yearEstablished: 1996,
    image: '/images/communities/firerock.webp',
    description: 'FireRock is the premier guard-gated golf community in Fountain Hills, just 20 minutes east of north Scottsdale. The Gary Panks-designed private course winds through dramatic boulder fields with Four Peaks Mountain as the backdrop on nearly every hole.',
    highlights: ['Private Gary Panks 18-hole course','Guard-gated with 24/7 patrol','Spectacular Four Peaks mountain views','Custom estates on \u00bd-acre to 2-acre lots','15 minutes to Scottsdale Quarter']
  },
  {
    slug: 'eagle-mountain',
    name: 'Eagle Mountain',
    tagline: 'Daily-fee Scott Miller golf with sweeping Four Peaks panoramas',
    location: 'Fountain Hills, AZ 85268',
    courses: ['Eagle Mountain Golf Club (public)'],
    priceRange: '$725K \u2013 $3.5M',
    homeCount: 1100,
    yearEstablished: 1996,
    image: '/images/communities/eagle-mountain.webp',
    description: 'Eagle Mountain blends Sonoran desert living with a top-ranked Scott Miller public-access course. Homes range from approachable single-level retreats to custom estates perched above the fairways with unobstructed Four Peaks views.',
    highlights: ['Scott Miller-designed public golf course','No membership required to play','Custom homes & semi-custom retreats','Fountain Hills schools & low taxes','15 minutes to north Scottsdale shopping']
  },
  {
    slug: 'troon-village',
    name: 'Troon Village',
    tagline: 'The original 1985 Troon: mature, private, and surrounded by saguaros',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Troon Country Club (private: Tom Weiskopf & Jay Morrish)'],
    priceRange: '$1.3M \u2013 $9M',
    homeCount: 750,
    yearEstablished: 1985,
    image: '/images/communities/troon-village.webp',
    description: 'Troon Village is the original Troon: Tom Weiskopf and Jay Morrish\u2019s 1985 design that put Scottsdale on the national golf map. The community sits 5 miles south of Troon North, with established landscaping, larger lots, and one of the most prestigious private memberships in Arizona.',
    highlights: ['Original 1985 Tom Weiskopf/Jay Morrish course','Highly-private member-only Troon Country Club','Mature landscaping on \u00bc\u2013acre+ lots','Adjacent to Pinnacle Peak Park','15 minutes to Scottsdale Airpark']
  },
  {
    slug: 'sincuidados',
    name: 'Sincuidados',
    tagline: '99 homesites on 90 acres: Scottsdale\u2019s smallest ultra-luxury enclave',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Adjacent to Troon Country Club (private)'],
    priceRange: '$2.5M \u2013 $9M',
    homeCount: 99,
    yearEstablished: 1987,
    image: '/images/communities/sincuidados.webp',
    description: 'Sincuidados (Spanish for "without worry") is a 90-acre guard-gated micro-community of just 99 architect-designed homes nestled adjacent to Troon Country Club. Homes are constructed in a unified southwest-organic vernacular and the community is famously quiet: you can hear coyotes from your patio.',
    highlights: ['Only 99 homesites: truly intimate','Guard-gated with 24/7 patrol','Unified southwest-organic architecture','Walking distance to Troon Country Club','Boulder-strewn lots with mountain views']
  },
  {
    slug: 'saguaro-highlands',
    name: 'Saguaro Highlands',
    tagline: 'Custom-estate enclave at the gates of Pinnacle Peak Country Club',
    location: 'North Scottsdale / Cave Creek, AZ 85266',
    courses: ['Adjacent to Pinnacle Peak Country Club (private)'],
    priceRange: '$1.5M \u2013 $8M',
    homeCount: 250,
    yearEstablished: 2003,
    image: '/images/communities/saguaro-highlands.webp',
    description: 'Saguaro Highlands is a gated custom-estate community of approximately 250 homes positioned on elevated boulder-strewn lots at the foothills of Black Mountain. Buyers value the larger 1+ acre lots, dramatic topography, and proximity to Pinnacle Peak Country Club golf.',
    highlights: ['Custom estates on 1\u20133+ acre lots','Gated community with mature landscaping','Dramatic Black Mountain & boulder views','Adjacent to Pinnacle Peak hiking trails','10 minutes to Carefree shops & dining']
  },
  {
    slug: 'tonto-verde',
    name: 'Tonto Verde',
    tagline: 'Two private courses and a tight-knit retirement community at the Rio Verde Foothills',
    location: 'Rio Verde, AZ 85263 (NE of Scottsdale)',
    courses: ['The Peaks Course (private)','The Ranch Course (private)'],
    priceRange: '$525K \u2013 $2.4M',
    homeCount: 850,
    yearEstablished: 1994,
    image: '/images/communities/tonto-verde.webp',
    description: 'Tonto Verde sits 30 minutes northeast of north Scottsdale at the foot of the Mazatzal Mountains: a 1,200-acre 55+ guard-gated golf community with two private courses, deep social calendar, and value pricing relative to comparable Scottsdale golf communities.',
    highlights: ['Two private 18-hole courses','55+ active-adult lifestyle','Guard-gated with 24/7 patrol','Tennis, pickleball, fitness, social clubs','Dark-sky preservation: dramatic night skies']
  },
  {
    slug: 'scottsdale-ranch',
    name: 'Scottsdale Ranch',
    tagline: 'Central Scottsdale\u2019s 1,100-acre master-planned lake community',
    location: 'East Scottsdale, AZ 85258',
    courses: ['No on-site golf: minutes from McCormick Ranch GC & Gainey Ranch GC'],
    priceRange: '$525K \u2013 $4.5M',
    homeCount: 4400,
    yearEstablished: 1978,
    image: '/images/communities/scottsdale-ranch.webp',
    description: 'Scottsdale Ranch is the largest established master-planned community in central-east Scottsdale: 4,400 homes wrapped around a 42-acre private lake (Lake Serena), the McCormick-Stillman Railroad Park, and the renowned Scottsdale Ranch Community Center.',
    highlights: ['42-acre private resident lake (Lake Serena)','Boating, docks & lakefront homes','Mature 1970s\u201380s landscaping','Walking & biking trails throughout','Walkable to Costco, Trader Joe\u2019s, dining']
  },
  {
    slug: 'paradise-valley',
    name: 'Paradise Valley',
    tagline: 'The most prestigious zip code in Arizona: home to Camelback, Phoenician, and Mountain Shadows',
    location: 'Paradise Valley, AZ 85253',
    courses: ['Camelback Golf Club','Mountain Shadows Short Course','Paradise Valley Country Club (private)','Phoenician Golf Club (resort)'],
    priceRange: '$1.5M \u2013 $40M+',
    homeCount: 5500,
    yearEstablished: 1961,
    image: '/images/communities/paradise-valley.webp',
    description: 'Paradise Valley is a separately-incorporated town wedged between Scottsdale and Phoenix: 16 square miles of one-acre-minimum custom estates with no commercial zoning, no streetlights, and the lowest property-tax rate in the Valley. The town is home to four major resorts and the Valley\u2019s deepest concentration of $10M+ homes.',
    highlights: ['One-acre-minimum lot zoning, town-wide','Four resort/golf properties inside town limits','Lowest property-tax rate in Maricopa County','Adjacent to Camelback Mountain & Mummy Mountain','15 minutes to Sky Harbor, Old Town, ASU']
  },
  {
    slug: 'sereno-canyon',
    name: 'Sereno Canyon',
    tagline: 'Toll Brothers\u2019 boutique north-Scottsdale community at the gates of Whisper Rock',
    location: 'North Scottsdale, AZ 85266',
    courses: ['Adjacent to Whisper Rock Golf Club (private)','Adjacent to Mirabel Club (private)'],
    priceRange: '$1.4M \u2013 $4.2M',
    homeCount: 525,
    yearEstablished: 2014,
    image: '/images/communities/sereno-canyon.webp',
    description: 'Sereno Canyon is Toll Brothers\u2019 luxury-only enclave of 525 contemporary single-family homes positioned directly between Whisper Rock and Mirabel Clubs: ideal for buyers pursuing membership at either. Includes resident-only Mountain House clubhouse, fitness, pickleball, and yoga lawn.',
    highlights: ['Brand-new construction (2014\u20132024 build-out)','Resident-only Mountain House clubhouse','Pickleball, fitness, pool, yoga lawn','Walking distance to Whisper Rock & Mirabel','Contemporary architecture & open floor plans']
  }
];

// Merge into the master list so /communities, sitemap, schemas all pick them up
COMMUNITIES.push(...COMMUNITIES_EXTRA_2);

// ────────────────────────────────────────────────────────────────────────────
// Phase 4 — Full Scottsdale-area coverage (per master community PDF)
// Includes North Phoenix corridor, Carefree/Cave Creek, and previously-missing
// Scottsdale neighborhoods. Brings total to 46+ communities.
// ────────────────────────────────────────────────────────────────────────────
export const COMMUNITIES_EXTRA_3 = [
  // Ultra-private & guard-gated (1 critical missing)
  {
    slug: 'desert-highlands', category: 'Ultra-private & guard-gated',
    name: 'Desert Highlands', tagline: 'Jack Nicklaus\u2019 first-ever Arizona masterpiece, members-only since 1983',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Desert Highlands Golf Club (private: Jack Nicklaus Signature)','18-hole Gary Panks putting course'],
    priceRange: '$1.5M \u2013 $9M', homeCount: 580, yearEstablished: 1983,
    image: '/images/communities/desert-highlands.webp',
    description: 'Desert Highlands is one of the original guard-gated Scottsdale golf communities: Jack Nicklaus\u2019 first ever Arizona design (1983) and the original home of the Skins Game with Nicklaus, Palmer, Player and Watson. The community sits on 850 acres against Pinnacle Peak.',
    highlights: ['Jack Nicklaus Signature private 18','18-hole Gary Panks putting course','Guard-gated since 1983','Tennis, fitness, dining, social clubs','Pinnacle Peak hiking from your back door']
  },

  // Luxury private-club communities (2 new)
  {
    slug: 'windgate-ranch', category: 'Luxury private-club community',
    name: 'Windgate Ranch', tagline: 'Toll Brothers\u2019 guard-gated luxury enclave inside the McDowell foothills',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Adjacent to DC Ranch & McDowell Mountain Golf Club'],
    priceRange: '$1.1M \u2013 $3.5M', homeCount: 450, yearEstablished: 2005,
    image: '/images/communities/windgate-ranch.webp',
    description: 'Windgate Ranch is a 450-home Toll Brothers community on the western flank of the McDowell Mountains: guard-gated, with resident-only Heritage Club amenities (pool, fitness, pickleball, tennis). Newer construction than DC Ranch but at meaningfully lower price points.',
    highlights: ['Guard-gated, 24/7 patrol','Resident-only Heritage Club & pool','Adjacent to DC Ranch Marketplace','Brand-new construction (2005\u20132018)','Trail access into McDowell Sonoran Preserve']
  },
  {
    slug: 'sun-ridge-canyon', category: 'Luxury private-club community',
    name: 'Sun Ridge Canyon', tagline: 'Daily-fee Keith Foster design with dramatic canyon golf in Fountain Hills',
    location: 'Fountain Hills, AZ 85268',
    courses: ['Sun Ridge Canyon Golf Club (public: Keith Foster)'],
    priceRange: '$695K \u2013 $2.2M', homeCount: 540, yearEstablished: 1995,
    image: '/images/communities/sun-ridge-canyon.webp',
    description: 'Sun Ridge Canyon wraps around a top-50 daily-fee Keith Foster course famous for its "Wicked Six" finishing stretch through a saguaro-lined canyon. Homes range from approachable single-level to custom estates with sweeping Four Peaks views.',
    highlights: ['Keith Foster daily-fee championship course','No country club membership required','Mountain & canyon views','Family-friendly Fountain Hills schools','Quick drive to Tonto National Forest']
  },

  // Community & semi-private golf neighborhoods (12 new)
  {
    slug: 'mcdowell-mountain-ranch', category: 'Community & semi-private',
    name: 'McDowell Mountain Ranch', tagline: 'North Scottsdale\u2019s active-family master-plan with two community parks',
    location: 'North Scottsdale, AZ 85255',
    courses: ['McDowell Mountain Golf Club (formerly Sanctuary: daily-fee)'],
    priceRange: '$695K \u2013 $2.4M', homeCount: 4000, yearEstablished: 1995,
    image: '/images/communities/mcdowell-mountain-ranch.webp',
    description: 'McDowell Mountain Ranch is the family-favorite North Scottsdale master-plan: 4,000 homes across 19 distinct subdivisions, with two community parks, an aquatic center, miles of trails, and direct trail access into the 30,000-acre McDowell Sonoran Preserve.',
    highlights: ['Two community parks + aquatic center','Highly-rated Scottsdale Unified schools','25+ miles of trails through the Preserve','Mix of detached homes & townhomes','15 min to Scottsdale Quarter']
  },
  {
    slug: 'scottsdale-mountain', category: 'Community & semi-private',
    name: 'Scottsdale Mountain', tagline: 'Guard-gated custom-home community climbing the McDowells',
    location: 'East Scottsdale, AZ 85259',
    courses: ['Adjacent to Sunridge Canyon & Eagle Mountain Golf Clubs'],
    priceRange: '$895K \u2013 $4M', homeCount: 730, yearEstablished: 1989,
    image: '/images/communities/scottsdale-mountain.webp',
    description: 'Scottsdale Mountain is a 730-home guard-gated community climbing 1,000+ feet of elevation up the western face of the McDowell Mountains: some of the best city-light, sunset, and Four Peaks views in the entire Valley.',
    highlights: ['Guard-gated with 24/7 patrol','1,000+ feet of elevation across community','Outstanding city-light & sunset views','Hiking trails right from your back gate','Custom estates on \u00bd-acre to 2-acre lots']
  },
  {
    slug: 'scottsdale-cc-starfire', category: 'Community & semi-private',
    name: 'Scottsdale CC / Starfire', tagline: 'Old-Scottsdale charm with Arnold Palmer\u2019s 27-hole public golf course',
    location: 'Central Scottsdale, AZ 85251',
    courses: ['Starfire Golf Club (public: Arnold Palmer, 27 holes)'],
    priceRange: '$425K \u2013 $1.8M', homeCount: 1800, yearEstablished: 1956,
    image: '/images/communities/scottsdale-cc-starfire.webp',
    description: 'The Scottsdale Country Club / Starfire neighborhoods are the original 1950s-60s Scottsdale golf community, wrapped around Arnold Palmer\u2019s 27-hole Starfire Golf Club. Mature trees, walkable streets, and unbeatable proximity to Old Town Scottsdale.',
    highlights: ['Arnold Palmer 27-hole public course','Walkable to Old Town Scottsdale','Mature 1950s-60s landscaping','Mid-century ranch architecture','Easy access to Scottsdale Stadium']
  },
  {
    slug: 'rio-verde', category: 'Community & semi-private',
    name: 'Rio Verde', tagline: '55+ master-planned community at the Mazatzal foothills, 30 minutes NE of Scottsdale',
    location: 'Rio Verde, AZ 85263',
    courses: ['Quail Run Golf Course','White Wing Golf Course'],
    priceRange: '$425K \u2013 $1.6M', homeCount: 2100, yearEstablished: 1972,
    image: '/images/communities/rio-verde.webp',
    description: 'Rio Verde is the original 1972 master-planned 55+ golf community in northeast Maricopa County: 2,100 homes, two on-property courses, and a famously dark night sky thanks to no commercial light pollution within 15 miles.',
    highlights: ['Two on-property 18-hole courses','55+ active-adult lifestyle','Pickleball, tennis, fitness, social clubs','Dark-sky preservation: incredible stargazing','30 minutes NE of north Scottsdale']
  },
  {
    slug: 'kierland', category: 'Community & semi-private',
    name: 'Kierland', tagline: 'Walkable resort-corridor neighborhoods anchored by Westin Kierland & Scottsdale Quarter',
    location: 'North Scottsdale, AZ 85254',
    courses: ['Kierland Golf Club (resort, public)'],
    priceRange: '$625K \u2013 $2.5M', homeCount: 1500, yearEstablished: 1996,
    image: '/images/communities/kierland.webp',
    description: 'The Kierland neighborhoods sit on the Scottsdale\u2013Phoenix border between Bell and Greenway, organized around the Westin Kierland Resort and the Kierland Commons / Scottsdale Quarter shopping districts. The most walkable luxury micro-neighborhood in the city.',
    highlights: ['Walkable to Scottsdale Quarter & Kierland Commons','Kierland Golf Club resort course','Mix of townhomes, condos & custom estates','15 min to Sky Harbor airport','High-rise condo options uncommon elsewhere']
  },
  {
    slug: 'hidden-hills', category: 'Community & semi-private',
    name: 'Hidden Hills', tagline: 'Guard-gated custom-home enclave perched above Scottsdale\u2019s east valley',
    location: 'East Scottsdale, AZ 85255',
    courses: ['Adjacent to McDowell Mountain Golf Club (formerly Sanctuary)'],
    priceRange: '$895K \u2013 $3.5M', homeCount: 320, yearEstablished: 1993,
    image: '/images/communities/hidden-hills.webp',
    description: 'Hidden Hills is a 320-home guard-gated enclave climbing the McDowell foothills with some of the best mid-valley city-light views available at sub-$2M price points. Quiet, mature, with a strong full-time-resident culture.',
    highlights: ['Guard-gated with 24/7 patrol','Spectacular west-facing city-light views','Custom \u00bd-acre+ lots','Strong full-time resident community','Walking trails into the Preserve']
  },
  {
    slug: 'ironwood-village', category: 'Community & semi-private',
    name: 'Ironwood Village', tagline: 'Value-priced North Scottsdale gated community with mountain & golf-corridor access',
    location: 'North Scottsdale, AZ 85255',
    courses: ['Adjacent to multiple North Scottsdale public courses'],
    priceRange: '$525K \u2013 $1.4M', homeCount: 460, yearEstablished: 2000,
    image: '/images/communities/ironwood-village.webp',
    description: 'Ironwood Village offers one of the best price-per-square-foot values in North Scottsdale: a gated community of 460 single-family homes within the 85255 zip but at a fraction of the cost of Grayhawk or DC Ranch.',
    highlights: ['Gated community, lower HOA fees','Strong value vs. neighboring 85255 communities','Newer construction (2000\u20132012)','Mountain views from elevated lots','15 min to Mayo Clinic']
  },
  {
    slug: 'tatum-ranch', category: 'Community & semi-private',
    name: 'Tatum Ranch', tagline: 'Affordable golf-corridor community on the Phoenix\u2013Cave Creek border',
    location: 'Cave Creek border, AZ 85331',
    courses: ['Tatum Ranch Golf Club (semi-private: Greg Nash)'],
    priceRange: '$425K \u2013 $1.4M', homeCount: 1900, yearEstablished: 1989,
    image: '/images/communities/tatum-ranch.webp',
    description: 'Tatum Ranch is a 1,900-home master-planned community wrapped around a Greg Nash-designed semi-private golf course on the Phoenix-Cave Creek border. One of the best entry points into golf-community living below $1M.',
    highlights: ['Greg Nash semi-private 18','Below-$1M entry point in golf community living','Two community pools & tennis','Easy access to Cave Creek shops & dining','Highly-rated Cave Creek schools']
  },
  {
    slug: 'phoenician-residences', category: 'Community & semi-private',
    name: 'The Phoenician Residences', tagline: 'Camelback-base luxury residences with resort and Phil Mickelson golf access',
    location: 'Paradise Valley border / Scottsdale, AZ 85251',
    courses: ['The Phoenician Golf Club (resort: Phil Mickelson 2018 redesign)'],
    priceRange: '$1.2M \u2013 $7M', homeCount: 350, yearEstablished: 1988,
    image: '/images/communities/phoenician-residences.webp',
    description: 'The Phoenician Residences are limited-inventory luxury homes adjacent to the Phoenician Resort at the base of Camelback Mountain. Residents have direct golf, spa, and dining access at the resort, plus quick walking access to Old Town Scottsdale.',
    highlights: ['Phil Mickelson-redesigned golf course','Camelback Mountain backdrop','Phoenician Resort spa & dining access','Walking distance to Old Town Scottsdale','Limited inventory: high resale value']
  },
  {
    slug: 'norterra', category: 'Community & semi-private',
    name: 'Norterra', tagline: 'Newer North Phoenix master-plan with great schools and value-priced homes',
    location: 'North Phoenix, AZ 85085',
    courses: ['Adjacent to Adobe Dam Golf Course (public)'],
    priceRange: '$525K \u2013 $1.5M', homeCount: 4500, yearEstablished: 2003,
    image: '/images/communities/norterra.webp',
    description: 'Norterra is a North Phoenix master-planned community of 4,500 homes with a Town Center retail district, community pools, fitness center, and easy I-17 access. Popular with families priced out of Scottsdale who still want master-plan amenities.',
    highlights: ['On-property Town Center retail district','Community fitness center & pools','Highly-rated Deer Valley schools','Newer construction (2003\u20132020)','Easy I-17 access: 25 min to Sky Harbor']
  },
  {
    slug: 'westbrook-village', category: 'Community & semi-private',
    name: 'Westbrook Village', tagline: '55+ retirement community with two on-property courses in the West Valley',
    location: 'Peoria, AZ 85382',
    courses: ['The Lakes Course','The Vistas Course'],
    priceRange: '$345K \u2013 $925K', homeCount: 2700, yearEstablished: 1983,
    image: '/images/communities/westbrook-village.webp',
    description: 'Westbrook Village is a 55+ master-planned retirement community in the West Valley: 2,700 homes, two private 18-hole courses (Lakes and Vistas), full social calendar, and meaningfully lower price points than Scottsdale-area 55+ alternatives.',
    highlights: ['Two private 18-hole courses included','55+ active-adult lifestyle','Lower price points vs. Scottsdale 55+ options','Tennis, pickleball, fitness, social clubs','25 min to Scottsdale via 101']
  },

  // Carefree & Cave Creek (5 new)
  {
    slug: 'carefree-resort-cc', category: 'Carefree & Cave Creek',
    name: 'Carefree Resort & Golf Club', tagline: 'Historic 1960s Carefree resort with semi-private 36-hole golf',
    location: 'Carefree, AZ 85377',
    courses: ['Carefree Resort & Golf Club (36 holes)'],
    priceRange: '$725K \u2013 $3.2M', homeCount: 850, yearEstablished: 1960,
    image: '/images/communities/carefree-resort-cc.webp',
    description: 'The Carefree Resort & Golf Club neighborhood is the original 1960s western-themed resort community that put Carefree on the map. Today the resort anchors an established golf community with 36 holes and the famously-walkable Carefree town center (sundial, art galleries, restaurants).',
    highlights: ['36 holes of semi-private golf','Original 1960s western-resort character','Walkable to Carefree town center sundial','Mature landscaping & saguaros','15 min to Scottsdale Quarter']
  },
  {
    slug: 'dove-valley-ranch', category: 'Carefree & Cave Creek',
    name: 'Dove Valley Ranch', tagline: 'Robert Trent Jones II daily-fee golf and value-priced homes in Cave Creek',
    location: 'Cave Creek, AZ 85331',
    courses: ['Dove Valley Ranch Golf Club (public: Robert Trent Jones II)'],
    priceRange: '$525K \u2013 $1.6M', homeCount: 900, yearEstablished: 1998,
    image: '/images/communities/dove-valley-ranch.webp',
    description: 'Dove Valley Ranch is a public-golf Cave Creek community designed around an excellent Robert Trent Jones II layout. Strong value, family-friendly streets, and easy access to Cave Creek\u2019s western-themed downtown.',
    highlights: ['Robert Trent Jones II public 18','Daily-fee golf: no membership required','Family-friendly streets and culture','Cave Creek schools','Easy access to Carefree art galleries']
  },
  {
    slug: 'rancho-manana', category: 'Carefree & Cave Creek',
    name: 'Rancho Manana', tagline: 'Semi-private hillside golf and custom estates with downtown Cave Creek charm',
    location: 'Cave Creek, AZ 85331',
    courses: ['Rancho Manana Golf Club (semi-private)'],
    priceRange: '$625K \u2013 $2.2M', homeCount: 750, yearEstablished: 1988,
    image: '/images/communities/rancho-manana.webp',
    description: 'Rancho Manana is a hillside semi-private golf community in Cave Creek with dramatic elevation changes, Black Mountain views, and a strong artists/horseman culture. Homes range from approachable casitas to multi-million-dollar custom estates.',
    highlights: ['Semi-private 18-hole hillside course','Dramatic Black Mountain views','Horseman & artist culture','Walkable to downtown Cave Creek','Strong full-time resident community']
  },
  {
    slug: 'black-mountain-cc', category: 'Carefree & Cave Creek',
    name: 'Black Mountain Country Club', tagline: 'Value-priced semi-private golf and homes at the base of Black Mountain',
    location: 'Cave Creek, AZ 85331',
    courses: ['Black Mountain Country Club (semi-private)'],
    priceRange: '$395K \u2013 $1.3M', homeCount: 540, yearEstablished: 1988,
    image: '/images/communities/black-mountain-cc.webp',
    description: 'Black Mountain Country Club is one of the best entry points into golf-community living in the Cave Creek area: a semi-private 18, lower HOA fees than comparable Scottsdale communities, and direct trail access into the Cave Creek Recreation Area.',
    highlights: ['Semi-private 18-hole course','Lower HOA fees vs. Scottsdale alternatives','Below-$1M entry point','Trail access into Cave Creek Recreation Area','Strong value for first-time golf-community buyers']
  },
  {
    slug: 'carefree-cave-creek-custom', category: 'Carefree & Cave Creek',
    name: 'Carefree / Cave Creek Custom Lots', tagline: 'Off-grid acreage and custom estate sites in the high Sonoran desert',
    location: 'Carefree & Cave Creek, AZ 85331/85377',
    courses: ['Multiple area golf within 10\u201320 min'],
    priceRange: '$625K \u2013 $4M+', homeCount: 1200, yearEstablished: 1980,
    image: '/images/communities/carefree-cave-creek-custom.webp',
    description: 'Beyond the named golf communities, Carefree and Cave Creek contain hundreds of one-of-a-kind custom-home sites: 1+ acre lots, no HOAs, and the freedom to build a true legacy estate. We help clients navigate the lot-purchase, permitting, and builder selection.',
    highlights: ['1+ acre lots, often no HOA','True off-grid solar potential','Custom architect & builder freedom','Saguaro-protected lots common','Equestrian-friendly zoning in many areas']
  },

  // North Phoenix corridor (3 new)
  {
    slug: 'desert-ridge', category: 'North Phoenix corridor',
    name: 'Desert Ridge', tagline: 'JW Marriott resort-anchored master-plan with two Faldo/Weiskopf TPC courses',
    location: 'North Phoenix, AZ 85050',
    courses: ['TPC Wildfire: Faldo Championship Course','TPC Wildfire: Palmer Signature Course'],
    priceRange: '$695K \u2013 $2.8M', homeCount: 3200, yearEstablished: 1995,
    image: '/images/communities/desert-ridge.webp',
    description: 'Desert Ridge is the JW Marriott Desert Ridge Resort\u2019s anchoring master-plan: 3,200 homes plus the High Street pedestrian district and the TPC Wildfire 36-hole resort facility. Strong full-time and second-home demand.',
    highlights: ['Two TPC Wildfire resort courses','JW Marriott Desert Ridge on property','High Street walkable dining district','Newer construction (1995\u20132018)','15 min to north Scottsdale']
  },
  {
    slug: 'blackstone-vistancia', category: 'North Phoenix corridor',
    name: 'Blackstone at Vistancia', tagline: 'Guard-gated luxury master-plan with private Jim Engh golf in Peoria',
    location: 'Peoria, AZ 85383',
    courses: ['Blackstone Country Club (private: Jim Engh)'],
    priceRange: '$825K \u2013 $3.2M', homeCount: 700, yearEstablished: 2007,
    image: '/images/communities/blackstone-vistancia.webp',
    description: 'Blackstone is the luxury guard-gated enclave inside the larger Vistancia master-plan: 700 custom homes wrapped around a private Jim Engh course and an award-winning clubhouse. Significantly lower price-per-sqft than equivalent Scottsdale communities.',
    highlights: ['Private Jim Engh-designed 18','Guard-gated with 24/7 patrol','Lower $/sqft than Scottsdale equivalents','Award-winning clubhouse & dining','Resort-style pools, tennis, fitness']
  },
  {
    slug: 'quintero-golf-cc', category: 'North Phoenix corridor',
    name: 'Quintero Golf & Country Club', tagline: 'Top-ranked Rees Jones private golf in remote desert north of the city',
    location: 'Peoria, AZ 85383',
    courses: ['Quintero Country Club (private: Rees Jones)'],
    priceRange: '$625K \u2013 $2.4M', homeCount: 220, yearEstablished: 2000,
    image: '/images/communities/quintero-golf-cc.webp',
    description: 'Quintero is the rare top-100-ranked private golf course outside the Scottsdale corridor: Rees Jones\u2019 dramatic desert layout sits 30 minutes northwest of Scottsdale with sweeping mountain panoramas and a tiny 220-home cap.',
    highlights: ['Top-100 Rees Jones private course','Only 220 home cap: ultra-low density','Sweeping White Tank Mountain views','Half the dues of comparable Scottsdale clubs','45 min to Sky Harbor airport']
  },
  {
    slug: 'whisper-rock', name: 'Whisper Rock', tagline: 'Two championship courses inside one intentionally quiet equity club', category: 'Ultra-private & guard-gated',
    location: 'Scottsdale, AZ 85266', courses: ['Lower Course (Mickelson)', 'Upper Course (Fazio)'],
    priceRange: '$2.5M \u2013 $20M', homeCount: 280, yearEstablished: 2002,
    image: '/images/communities/whisper-rock.webp',
    description: 'Whisper Rock pairs two championship courses with two materially different design vocabularies (the Mickelson Upper and the Fazio Lower) inside a single intentionally quiet equity club. The club is widely associated with PGA Tour professionals who keep practice homes nearby, and the daily culture reflects that operating reality.',
    highlights: [
      'Phil Mickelson + Gary Stephenson designed the Lower Course',
      'Tom Fazio designed the Upper Course',
      'Equity-private, low-event club culture',
      'Estate-scale custom homes on large lots',
      'North Scottsdale 85266: minutes from Pinnacle Peak retail'
    ]
  }
];

// Merge Phase 4 into master list
COMMUNITIES.push(...COMMUNITIES_EXTRA_3);

// Helper: get communities grouped by category (in canonical display order)
export function communitiesByCategory() {
  const categoryOrder = [
    'Ultra-private & guard-gated',
    'Luxury private-club community',
    'Community & semi-private',
    'Carefree & Cave Creek',
    'North Phoenix corridor'
  ];
  const groups = Object.fromEntries(categoryOrder.map(c => [c, []]));
  // Inferred categories for Phase 1\u20132 entries that don\u2019t carry a category field
  const inferredCategory = {
    grayhawk: 'Community & semi-private',
    'dc-ranch': 'Luxury private-club community',
    'troon-north': 'Community & semi-private',
    silverleaf: 'Ultra-private & guard-gated',
    'desert-mountain': 'Ultra-private & guard-gated',
    boulders: 'Luxury private-club community',
    estancia: 'Ultra-private & guard-gated',
    mirabel: 'Ultra-private & guard-gated',
    'gainey-ranch': 'Luxury private-club community',
    stonegate: 'Luxury private-club community',
    terravita: 'Community & semi-private',
    'legend-trail': 'Community & semi-private',
    'pinnacle-peak-country-club': 'Luxury private-club community',
    'mccormick-ranch': 'Community & semi-private',
    ancala: 'Luxury private-club community',
    firerock: 'Luxury private-club community',
    'eagle-mountain': 'Community & semi-private',
    'troon-village': 'Community & semi-private',
    sincuidados: 'Luxury private-club community',
    'saguaro-highlands': 'Luxury private-club community',
    'tonto-verde': 'Community & semi-private',
    'scottsdale-ranch': 'Community & semi-private',
    'paradise-valley': 'Luxury private-club community',
    'sereno-canyon': 'Luxury private-club community'
  };
  for (const c of COMMUNITIES) {
    const cat = c.category || inferredCategory[c.slug] || 'Community & semi-private';
    if (groups[cat]) groups[cat].push(c);
  }
  return { categoryOrder, groups };
}

// Market reports (Phase 2)
export const MARKET_REPORTS = [
  {
    slug: 'scottsdale-q2-2026',
    title: 'Scottsdale Real Estate: Q2 2026',
    scope: 'City-wide',
    quarter: 'Q2 2026',
    dateRange: 'April 1: June 30, 2026',
    summary: 'Inventory has expanded modestly for the third straight quarter, broadly giving qualified buyers more leverage on price and concessions than during the 2021\u20132022 cycle peak.',
    cover: '/images/market-reports/scottsdale-q2-2026.webp',
    publishDate: '2026-07-08',
    stats: [
      { label: 'Median sold price', val: '~$1.7M\u2013$2.0M', delta: 'Up modestly YoY', up: true },
      { label: 'Median days on market', val: '~30\u201345 days', delta: 'Lengthening vs 2025', up: false, invert: true },
      { label: 'Closed sales', val: 'Solid quarter', delta: 'Up YoY', up: true },
      { label: 'Months of inventory', val: '~3\u20134 months', delta: 'Expanding YoY', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'High 90s%', delta: 'Softer vs 2024', up: false },
      { label: 'Avg price/sqft', val: 'Mid-$500s\u2013low-$600s', delta: 'Up modestly YoY', up: true }
    ]
  },
  {
    slug: 'scottsdale-q1-2026',
    title: 'Scottsdale Real Estate: Q1 2026',
    scope: 'City-wide',
    quarter: 'Q1 2026',
    dateRange: 'January 1: March 31, 2026',
    summary: 'A strong Q1 snowbird-driven peak season delivered noticeably higher closed-sales volume than the 2024\u20132025 trough and a first modest uptick in luxury median pricing.',
    cover: '/images/market-reports/scottsdale-q1-2026.webp',
    publishDate: '2026-04-12',
    stats: [
      { label: 'Median sold price', val: '~$1.7M\u2013$1.9M', delta: 'Up YoY', up: true },
      { label: 'Median days on market', val: '~30\u201340 days', delta: 'Slightly longer YoY', up: false, invert: true },
      { label: 'Closed sales', val: 'Strong quarter', delta: 'Up materially YoY', up: true },
      { label: 'Months of inventory', val: '~2\u20133 months', delta: 'Tighter than Q2', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'High 90s%', delta: 'Roughly flat YoY', up: false },
      { label: 'Avg price/sqft', val: 'Mid-$500s\u2013low-$600s', delta: 'Up YoY', up: true }
    ]
  },
  {
    slug: 'scottsdale-q4-2025',
    title: 'Scottsdale Real Estate: Q4 2025',
    scope: 'City-wide',
    quarter: 'Q4 2025',
    dateRange: 'October 1: December 31, 2025',
    summary: 'A textbook Q4: returning snowbirds drove a meaningful jump in showings, year-end closings outpaced 2024, and the luxury market finished the year broadly flat.',
    cover: '/images/market-reports/scottsdale-q4-2025.webp',
    publishDate: '2026-01-15',
    stats: [
      { label: 'Median sold price', val: '~$1.6M\u2013$1.8M', delta: 'Up modestly YoY', up: true },
      { label: 'Median days on market', val: '~35\u201345 days', delta: 'Slightly longer YoY', up: false, invert: true },
      { label: 'Closed sales', val: 'Solid quarter', delta: 'Up YoY', up: true },
      { label: 'Months of inventory', val: '~3\u20134 months', delta: 'Expanding YoY', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'High 90s%', delta: 'Slightly softer YoY', up: false },
      { label: 'Avg price/sqft', val: 'Mid-to-high $500s', delta: 'Up modestly YoY', up: true }
    ]
  },
  {
    slug: 'grayhawk-q2-2026',
    title: 'Grayhawk Real Estate: Q2 2026',
    scope: 'Grayhawk',
    quarter: 'Q2 2026',
    dateRange: 'April 1: June 30, 2026',
    summary: 'Grayhawk remains one of the most actively-traded golf communities in Scottsdale by volume. Sub-$1M attached homes continue to clear quickly relative to detached luxury inventory.',
    cover: '/images/market-reports/grayhawk-q2-2026.webp',
    publishDate: '2026-07-08',
    stats: [
      { label: 'Median sold price', val: '~$1.3M\u2013$1.5M', delta: 'Up YoY', up: true },
      { label: 'Median days on market', val: '~25\u201335 days', delta: 'Slightly longer YoY', up: false, invert: true },
      { label: 'Closed sales', val: 'Active quarter', delta: 'Up YoY', up: true },
      { label: 'Months of inventory', val: '~2\u20133 months', delta: 'Tighter than city avg', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'High 90s%', delta: 'Roughly flat YoY', up: false },
      { label: 'Avg price/sqft', val: '~$500\u2013$600', delta: 'Up modestly YoY', up: true }
    ]
  },
  {
    slug: 'dc-ranch-q2-2026',
    title: 'DC Ranch Real Estate: Q2 2026',
    scope: 'DC Ranch',
    quarter: 'Q2 2026',
    dateRange: 'April 1: June 30, 2026',
    summary: 'DC Ranch luxury inventory has expanded materially, but country-club-front estates priced under $3M continue to find buyers within a reasonable market window.',
    cover: '/images/market-reports/dc-ranch-q2-2026.webp',
    publishDate: '2026-07-08',
    stats: [
      { label: 'Median sold price', val: '~$2.4M\u2013$2.8M', delta: 'Up modestly YoY', up: true },
      { label: 'Median days on market', val: '~40\u201355 days', delta: 'Materially longer YoY', up: false, invert: true },
      { label: 'Closed sales', val: 'Moderate quarter', delta: 'Down slightly YoY', up: false },
      { label: 'Months of inventory', val: '~4\u20135 months', delta: 'Expanding YoY', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'Mid-to-high 90s%', delta: 'Softer YoY', up: false },
      { label: 'Avg price/sqft', val: '~$700\u2013$800', delta: 'Up modestly YoY', up: true }
    ]
  },
  {
    slug: 'troon-north-q2-2026',
    title: 'Troon North Real Estate: Q2 2026',
    scope: 'Troon North',
    quarter: 'Q2 2026',
    dateRange: 'April 1: June 30, 2026',
    summary: 'Troon North has been one of the stronger-appreciating major North Scottsdale communities recently. New-construction estates over $4M continue to find pre-completion buyers.',
    cover: '/images/market-reports/troon-north-q2-2026.webp',
    publishDate: '2026-07-08',
    stats: [
      { label: 'Median sold price', val: '~$2.0M\u2013$2.4M', delta: 'Up YoY', up: true },
      { label: 'Median days on market', val: '~30\u201340 days', delta: 'Slightly longer YoY', up: false, invert: true },
      { label: 'Closed sales', val: 'Active quarter', delta: 'Up YoY', up: true },
      { label: 'Months of inventory', val: '~3\u20134 months', delta: 'Expanding YoY', up: false, invert: true },
      { label: 'Sale-to-list ratio', val: 'High 90s%', delta: 'Roughly flat YoY', up: false },
      { label: 'Avg price/sqft', val: '~$650\u2013$725', delta: 'Up YoY', up: true }
    ]
  }
];
export function findReport(slug) { return MARKET_REPORTS.find(r => r.slug === slug); }

// Agents (intentionally empty)
// The previous fake agents (Morgan, James, Priya) were removed per the
// E-E-A-T strategy. Site is owned and operated by 7671 Enterprises LLC.
// No fictitious agents.
export const AGENTS = [];
export function findAgent(slug) { return AGENTS.find(a => a.slug === slug); }

// Reviews / testimonials (intentionally empty)
// Placeholder reviews were removed because emitting fake aggregateRating to
// Google triggers manual structured-data penalties at the luxury price point
// where buyers do due diligence. Real first-party reviews can be added here
// once collected (Google Business, BBB, etc.).
export const REVIEWS = [];

// Programmatic SEO filter pages (Phase 2)
export const FILTER_PAGES = [
  { slug: 'grayhawk-homes-with-pool', title: 'Grayhawk Homes with Pool for Sale', community: 'grayhawk', description: 'Browse Grayhawk homes for sale with private pools. Resort-style backyards in one of Scottsdale\u2019s most popular golf communities.', priceMin: 700000, priceMax: 5000000 },
  { slug: 'grayhawk-townhomes', title: 'Grayhawk Townhomes & Patio Homes for Sale', community: 'grayhawk', description: 'Attached homes, townhomes, and patio homes for sale in Grayhawk, Scottsdale. Low-maintenance golf-community living.', priceMin: 0, priceMax: 1200000 },
  { slug: 'dc-ranch-luxury-estates', title: 'DC Ranch Luxury Estates for Sale', community: 'dc-ranch', description: 'DC Ranch luxury estates and country-club homes for sale. Inside the guard gates of Scottsdale\u2019s most exclusive master-planned community.', priceMin: 1500000, priceMax: 10000000 },
  { slug: 'troon-north-golf-course-homes', title: 'Troon North Golf Course Homes for Sale', community: 'troon-north', description: 'Homes for sale directly on the Monument and Pinnacle courses at Troon North in North Scottsdale.', priceMin: 1500000, priceMax: 12000000 },
  { slug: 'troon-north-homes-under-2m', title: 'Troon North Homes Under $2M for Sale', community: 'troon-north', description: 'Troon North homes for sale under $2 million. Single-family estates on golf course or mountain-view lots.', priceMin: 0, priceMax: 2000000 },
  { slug: 'silverleaf-luxury-estates', title: 'Silverleaf Luxury Estates for Sale', community: 'silverleaf', description: 'Silverleaf custom estates for sale inside DC Ranch. Tom Weiskopf private golf, guard-gated luxury living.', priceMin: 3000000, priceMax: 28000000 },
  { slug: 'desert-mountain-homes-for-sale', title: 'Desert Mountain Homes for Sale', community: 'desert-mountain', description: 'Homes for sale in Desert Mountain, North Scottsdale\u2019s premier Nicklaus-Signature private golf community.', priceMin: 0, priceMax: 20000000 },
  { slug: 'estancia-homes-for-sale', title: 'Estancia Homes for Sale | Pinnacle Peak', community: 'estancia', description: 'Custom homes for sale in Estancia, the most private members-only community at the base of Pinnacle Peak.', priceMin: 0, priceMax: 25000000 },
  { slug: 'gainey-ranch-patio-homes', title: 'Gainey Ranch Patio Homes for Sale', community: 'gainey-ranch', description: 'Single-level patio homes for sale inside Gainey Ranch: central Scottsdale\u2019s established guard-gated golf community.', priceMin: 0, priceMax: 1500000 },
  { slug: 'boulders-resort-homes', title: 'Boulders Resort Homes for Sale | Carefree', community: 'boulders', description: 'Casitas, villas and custom homes for sale at The Boulders resort community in Carefree/North Scottsdale.', priceMin: 0, priceMax: 8000000 },
  { slug: 'scottsdale-single-story-golf-homes', title: 'Single-Story Golf Homes for Sale in Scottsdale', community: null, description: 'Single-level golf homes for sale across North & Central Scottsdale. Ideal for snowbirds, retirees, and accessibility-focused buyers.', priceMin: 0, priceMax: 5000000 },
  { slug: 'scottsdale-homes-with-casita', title: 'Scottsdale Homes with Casita for Sale', community: null, description: 'Luxury Scottsdale golf-community homes with detached or attached casitas: perfect for guests, in-laws, or remote-work studios.', priceMin: 0, priceMax: 10000000 },
  { slug: 'scottsdale-new-construction-golf-homes', title: 'New Construction Golf Homes for Sale in Scottsdale', community: null, description: 'Newly built golf-community homes for sale across Scottsdale. New-construction, semi-custom and custom builds, 2023\u20132026.', priceMin: 0, priceMax: 20000000 },
  { slug: 'scottsdale-gated-community-homes', title: 'Gated Community Homes for Sale in Scottsdale', community: null, description: 'Homes for sale in guard-gated and gated Scottsdale golf communities: privacy, security, and luxury amenities.', priceMin: 0, priceMax: 30000000 },
  { slug: 'scottsdale-mountain-view-homes', title: 'Mountain View Homes for Sale in Scottsdale', community: null, description: 'Scottsdale homes for sale with McDowell, Pinnacle Peak, or Camelback Mountain views. Premium view lots and elevated estates.', priceMin: 0, priceMax: 20000000 }
];
// Approximate coordinates for each community center (Scottsdale, AZ)
export const COMMUNITY_COORDS = {
  'grayhawk': { lat: 33.6790, lng: -111.9080 },
  'dc-ranch': { lat: 33.6655, lng: -111.8780 },
  'troon-north': { lat: 33.7370, lng: -111.8780 },
  'silverleaf': { lat: 33.6610, lng: -111.8650 },
  'desert-mountain': { lat: 33.8160, lng: -111.8920 },
  'boulders': { lat: 33.8170, lng: -111.9270 },
  'estancia': { lat: 33.7220, lng: -111.8540 },
  'mirabel': { lat: 33.7920, lng: -111.8740 },
  'gainey-ranch': { lat: 33.5685, lng: -111.9220 },
  'stonegate': { lat: 33.6420, lng: -111.8870 },
  'terravita': { lat: 33.7820, lng: -111.9300 },
  'legend-trail': { lat: 33.7530, lng: -111.8870 },
  'pinnacle-peak-country-club': { lat: 33.7160, lng: -111.8800 },
  'mccormick-ranch': { lat: 33.5670, lng: -111.9100 }
};

// Approximate community boundary radii (in degrees) — sized to community footprint
// latRadius ≈ 0.009 ≈ 1 km. These are intentionally approximate boundary shapes
// drawn for visual orientation, not legal parcel boundaries.
export const COMMUNITY_POLYGON_RADII = {
  'grayhawk':                 { latR: 0.0150, lngR: 0.0170, vertices: 10 }, // ~3.5 sq mi master-planned
  'dc-ranch':                 { latR: 0.0220, lngR: 0.0260, vertices: 12 }, // ~12 sq mi
  'troon-north':              { latR: 0.0170, lngR: 0.0190, vertices: 10 }, // ~4 sq mi
  'silverleaf':               { latR: 0.0110, lngR: 0.0130, vertices: 9  },
  'desert-mountain':          { latR: 0.0280, lngR: 0.0300, vertices: 12 }, // ~13 sq mi
  'boulders':                 { latR: 0.0120, lngR: 0.0140, vertices: 9  },
  'estancia':                 { latR: 0.0100, lngR: 0.0110, vertices: 8  },
  'mirabel':                  { latR: 0.0120, lngR: 0.0130, vertices: 9  },
  'gainey-ranch':             { latR: 0.0085, lngR: 0.0095, vertices: 8  },
  'stonegate':                { latR: 0.0090, lngR: 0.0100, vertices: 8  },
  'terravita':                { latR: 0.0115, lngR: 0.0125, vertices: 9  },
  'legend-trail':             { latR: 0.0100, lngR: 0.0110, vertices: 8  },
  'pinnacle-peak-country-club':{ latR: 0.0080, lngR: 0.0090, vertices: 8  },
  'mccormick-ranch':          { latR: 0.0160, lngR: 0.0180, vertices: 10 }
};

// Deterministic pseudo-random based on string (so polygons look natural and stable)
function _seededNoise(seed, i) {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x); // 0..1
}
function _hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}
// Generate an n-vertex closed polygon ring around (lat, lng) with elliptical radii
// and small per-vertex jitter so it looks like a real, irregular community boundary.
function _generatePolygon(slug, lat, lng, latR, lngR, n) {
  const seed = _hashSlug(slug);
  const ring = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2;
    // jitter each radius between 78% and 112% — natural irregularity
    const jLat = 0.78 + _seededNoise(seed, i * 2) * 0.34;
    const jLng = 0.78 + _seededNoise(seed, i * 2 + 1) * 0.34;
    const dLat = Math.sin(angle) * latR * jLat;
    const dLng = Math.cos(angle) * lngR * jLng;
    ring.push([lng + dLng, lat + dLat]); // GeoJSON is [lng, lat]
  }
  ring.push(ring[0]); // close the ring
  return ring;
}

// Inject coords + polygon boundary into COMMUNITIES + LISTINGS
COMMUNITIES.forEach(c => {
  const co = COMMUNITY_COORDS[c.slug];
  if (co) { c.lat = co.lat; c.lng = co.lng; }
  const r = COMMUNITY_POLYGON_RADII[c.slug];
  if (co && r) {
    c.polygon = _generatePolygon(c.slug, co.lat, co.lng, r.latR, r.lngR, r.vertices);
    // Schema.org GeoShape `polygon` is a space-separated list of "lat,lng" pairs
    c.polygonString = c.polygon.map(([lng, lat]) => `${lat.toFixed(5)},${lng.toFixed(5)}`).join(' ');
  }
});
LISTINGS.forEach((l, i) => {
  if (!l.lat) {
    const co = COMMUNITY_COORDS[l.community];
    if (co) {
      const seed = (i * 137) % 100;
      const seed2 = (i * 71) % 100;
      l.lat = co.lat + ((seed - 50) / 5000);
      l.lng = co.lng + ((seed2 - 50) / 5000);
    }
  }
});

export function findFilter(slug) { return FILTER_PAGES.find(f => f.slug === slug); }

// Phase 3 expansion: 28 more programmatic SEO filter pages
FILTER_PAGES.push(
  { slug: 'grayhawk-new-construction', title: 'Grayhawk New Construction Homes for Sale', community: 'grayhawk', description: 'Newly built and brand-new construction homes for sale in Grayhawk, North Scottsdale.', priceMin: 1000000, priceMax: 5000000 },
  { slug: 'grayhawk-single-story-homes', title: 'Grayhawk Single-Story Homes for Sale', community: 'grayhawk', description: 'Single-level / single-story golf homes for sale in Grayhawk, Scottsdale: ideal for snowbirds and retirees.', priceMin: 0, priceMax: 4000000 },
  { slug: 'dc-ranch-single-story-homes', title: 'DC Ranch Single-Story Homes for Sale', community: 'dc-ranch', description: 'Single-story homes for sale in DC Ranch: estate living without stairs.', priceMin: 0, priceMax: 6000000 },
  { slug: 'dc-ranch-homes-with-mountain-views', title: 'DC Ranch Homes with Mountain Views for Sale', community: 'dc-ranch', description: 'DC Ranch homes for sale with McDowell Mountain views: elevated lots and view-corridor estates.', priceMin: 1500000, priceMax: 10000000 },
  { slug: 'dc-ranch-new-construction', title: 'DC Ranch New Construction Homes for Sale', community: 'dc-ranch', description: 'New-construction homes for sale inside DC Ranch: custom builds, semi-custom and developer inventory.', priceMin: 1800000, priceMax: 9000000 },
  { slug: 'troon-north-new-construction', title: 'Troon North New Construction Homes for Sale', community: 'troon-north', description: 'New-construction custom homes for sale in Troon North: contemporary estates on premium desert lots.', priceMin: 1800000, priceMax: 12000000 },
  { slug: 'troon-north-single-story-homes', title: 'Troon North Single-Story Homes for Sale', community: 'troon-north', description: 'Single-story golf-course homes for sale in Troon North.', priceMin: 0, priceMax: 6000000 },
  { slug: 'troon-north-homes-with-casita', title: 'Troon North Homes with Casita for Sale', community: 'troon-north', description: 'Troon North homes for sale with attached or detached casitas: perfect for guests, in-laws, or work-from-home.', priceMin: 1500000, priceMax: 8000000 },
  { slug: 'troon-north-luxury-estates', title: 'Troon North Luxury Estates for Sale', community: 'troon-north', description: 'Troon North luxury estates for sale over $3M: acre-plus lots, contemporary custom builds.', priceMin: 3000000, priceMax: 15000000 },
  { slug: 'silverleaf-new-construction', title: 'Silverleaf New Construction Homes for Sale', community: 'silverleaf', description: 'Newly built and brand-new custom homes for sale in Silverleaf: the most coveted private community in Scottsdale.', priceMin: 5000000, priceMax: 30000000 },
  { slug: 'desert-mountain-new-construction', title: 'Desert Mountain New Construction Homes for Sale', community: 'desert-mountain', description: 'New-construction homes for sale in Desert Mountain: the multi-thousand-acre Nicklaus-designed private golf community.', priceMin: 1800000, priceMax: 18000000 },
  { slug: 'desert-mountain-single-story-homes', title: 'Desert Mountain Single-Story Homes for Sale', community: 'desert-mountain', description: 'Single-level Desert Mountain homes for sale: walk-in lifestyle on premium golf and view lots.', priceMin: 0, priceMax: 10000000 },
  { slug: 'desert-mountain-homes-under-2m', title: 'Desert Mountain Homes Under $2M', community: 'desert-mountain', description: 'Desert Mountain homes for sale under $2 million: entry-level access to six Nicklaus Signature courses plus No. 7.', priceMin: 0, priceMax: 2000000 },
  { slug: 'desert-mountain-homes-over-5m', title: 'Desert Mountain Estates over $5M', community: 'desert-mountain', description: 'Desert Mountain luxury estates for sale over $5 million: trophy homes on view-corridor and golf-front lots.', priceMin: 5000000, priceMax: 20000000 },
  { slug: 'boulders-casitas', title: 'The Boulders Casitas for Sale | Carefree, AZ', community: 'boulders', description: 'Casitas for sale at The Boulders resort community: the original luxury lock-and-leave Scottsdale getaway.', priceMin: 0, priceMax: 2000000 },
  { slug: 'estancia-luxury-estates', title: 'Estancia Luxury Estates for Sale', community: 'estancia', description: 'Estancia luxury estates for sale: one of the most private and tightly-controlled small-scale communities in Scottsdale.', priceMin: 3000000, priceMax: 25000000 },
  { slug: 'mirabel-new-construction', title: 'Mirabel New Construction Homes for Sale', community: 'mirabel', description: 'New-construction homes for sale in Mirabel: the Tom Fazio private golf community.', priceMin: 2000000, priceMax: 12000000 },
  { slug: 'gainey-ranch-single-story', title: 'Gainey Ranch Single-Story Homes for Sale', community: 'gainey-ranch', description: 'Single-story patio homes for sale inside Gainey Ranch, central Scottsdale.', priceMin: 0, priceMax: 2500000 },
  { slug: 'gainey-ranch-condos', title: 'Gainey Ranch Condos for Sale', community: 'gainey-ranch', description: 'Condos and attached homes for sale in Gainey Ranch: lock-and-leave luxury in central Scottsdale.', priceMin: 0, priceMax: 1500000 },
  { slug: 'stonegate-homes-with-pool', title: 'Stonegate Homes with Pool for Sale', community: 'stonegate', description: 'Stonegate homes for sale with private pools: guard-gated golf living in North Scottsdale 85255.', priceMin: 1000000, priceMax: 6000000 },
  { slug: 'terravita-single-story', title: 'Terravita Single-Story Homes for Sale | 55+', community: 'terravita', description: 'Single-story homes for sale in Terravita: the premier 55+ active-adult golf community in Scottsdale.', priceMin: 0, priceMax: 2800000 },
  { slug: 'legend-trail-golf-course-homes', title: 'Legend Trail Golf Course Homes for Sale', community: 'legend-trail', description: 'Homes for sale directly on the Rees Jones-designed Legend Trail golf course.', priceMin: 700000, priceMax: 3500000 },
  { slug: 'mccormick-ranch-lakefront-homes', title: 'McCormick Ranch Lakefront Homes for Sale', community: 'mccormick-ranch', description: 'Lakefront homes for sale in McCormick Ranch: 26 lakes throughout central Scottsdale\u2019s original master-planned community.', priceMin: 800000, priceMax: 4500000 },
  { slug: 'mccormick-ranch-townhomes', title: 'McCormick Ranch Townhomes & Patio Homes for Sale', community: 'mccormick-ranch', description: 'Attached homes, townhomes and patio homes for sale in McCormick Ranch.', priceMin: 0, priceMax: 1200000 },
  { slug: 'scottsdale-homes-over-5m', title: 'Scottsdale Homes Over $5 Million for Sale', community: null, description: 'Luxury Scottsdale homes for sale over $5 million: trophy estates across Silverleaf, Estancia, Desert Mountain and Troon North.', priceMin: 5000000, priceMax: 50000000 },
  { slug: 'scottsdale-homes-over-10m', title: 'Scottsdale Homes Over $10 Million for Sale', community: null, description: 'Ultra-luxury Scottsdale homes for sale over $10 million: the absolute top of the Scottsdale market.', priceMin: 10000000, priceMax: 50000000 },
  { slug: 'scottsdale-equestrian-properties', title: 'Scottsdale Equestrian Properties for Sale', community: null, description: 'Equestrian properties for sale in Scottsdale and North Scottsdale: acreage with stables, arenas and riding access.', priceMin: 0, priceMax: 20000000 },
  { slug: 'scottsdale-modern-architecture-homes', title: 'Modern Architecture Homes for Sale in Scottsdale', community: null, description: 'Contemporary and modern architectural homes for sale in Scottsdale: floor-to-ceiling glass, indoor/outdoor living, desert-modern design.', priceMin: 0, priceMax: 20000000 }
);

// FAQs per community
export const COMMUNITY_FAQS = {
  'grayhawk': [
    { q: 'What is the average home price in Grayhawk Scottsdale?', a: 'As of Q2 2026, Grayhawk\u2019s typical sold price band spans from the high six figures for attached townhomes to the multi-millions for custom estates. Verify current ARMLS data during diligence.' },
    { q: 'Is Grayhawk a gated community?', a: 'Grayhawk itself is not guard-gated across the entire master plan, though several individual sub-communities within Grayhawk (such as Talon Retreat and Encore at Grayhawk) are gated.' },
    { q: 'What golf courses are at Grayhawk?', a: 'Grayhawk has two championship 18-hole courses: the Talon Course (designed by David Graham and Gary Panks) and the Raptor Course (designed by Tom Fazio). Both are public/resort access.' },
    { q: 'What schools serve Grayhawk?', a: 'Grayhawk is served by the A+ rated Scottsdale Unified and Paradise Valley Unified School Districts, including Pinnacle High and BASIS Scottsdale (one of the top-ranked public charter schools in the U.S.).' },
    { q: 'How far is Grayhawk from Sky Harbor airport?', a: 'Grayhawk is approximately 25 minutes from Phoenix Sky Harbor International Airport (PHX), with direct freeway access via the AZ-101.' }
  ],
  'dc-ranch': [
    { q: 'Is DC Ranch a private gated community?', a: 'Yes: DC Ranch is guard-gated with full perimeter security across the master plan. Country Club membership at the DC Ranch Country Club is a separate purchase.' },
    { q: 'What is the DC Ranch Country Club initiation fee?', a: 'The DC Ranch Country Club operates as a private members-only club with initiation in the six figures and annual dues in the multiple thousands. Membership is optional for residents. Verify current initiation and dues directly with the membership office during diligence.' },
    { q: 'What golf does DC Ranch have?', a: 'The Country Club at DC Ranch operates a private 18-hole championship course (par 71, 6,888 yards) designed by Tom Lehman and John Fought, climbing from the village neighborhoods into the McDowell foothills.' },
    { q: 'Is Silverleaf inside DC Ranch?', a: 'Yes: Silverleaf is a private, ultra-luxury enclave inside the DC Ranch master plan, with its own additional guard gate and a separate private golf club (Silverleaf Club).' },
    { q: 'What schools are in DC Ranch?', a: 'DC Ranch is served by the highly-rated Scottsdale Unified School District including Copper Ridge K-8 and Chaparral High School, plus the elite private Pinnacle Peak Preparatory and BASIS Scottsdale nearby.' }
  ],
  'troon-north': [
    { q: 'Is Troon North a private golf community?', a: 'The Troon North Golf Club courses (Monument and Pinnacle) are public/resort access, not private. Homes are spread across multiple sub-communities within the Troon North master plan, some of which are gated.' },
    { q: 'What is the cost of golf at Troon North?', a: 'Peak-season green fees at Troon North run $290-$380 in 2026. Annual resident memberships range from $25K-$45K depending on tier.' },
    { q: 'How big are the lots in Troon North?', a: 'Lot sizes vary by sub-community, ranging from 1/4-acre patio homes to 3+-acre custom estate lots on the boulder-strewn upper elevations.' },
    { q: 'What is the difference between the Monument and Pinnacle courses?', a: 'Both Tom Weiskopf designs, both top-100 ranked. The Monument is the original, more dramatic and elevation-rich. The Pinnacle is slightly newer (1996) with tighter risk-reward shot-making.' }
  ],
  'silverleaf': [
    { q: 'How exclusive is Silverleaf?', a: 'Silverleaf is the most exclusive community in Scottsdale by every measurable metric: median home price ($5.9M), club initiation ($300K+), and the lowest density (only ~700 homesites on 1,500 acres).' },
    { q: 'Is Silverleaf Club membership required to buy in Silverleaf?', a: 'No, but more than 80% of Silverleaf homeowners are members. The Silverleaf Club is a separate purchase requiring sponsorship from existing members.' },
    { q: 'Who designed the Silverleaf golf course?', a: 'Tom Weiskopf designed the private 18-hole championship course at the Silverleaf Club, completed in 2002.' }
  ],
  'desert-mountain': [
    { q: 'How many golf courses are at Desert Mountain?', a: 'Seven. Six are Jack Nicklaus Signature courses: Renegade, Cochise, Geronimo, Apache, Chiricahua and Outlaw. The seventh, No. 7 at Desert Mountain, is a par-54 course designed by club members Bill Brownlee and Wendell Pickett that opened in 2019.' },
    { q: 'How much does Desert Mountain Club membership cost?', a: 'The club offers Full Golf, Seven Golf and Lifestyle memberships but does not publish a current fee schedule. Its 2021 FAQ listed initiation fees of $70,000 (Full Golf), $33,750 (Seven Golf) and $22,250 (Lifestyle); third-party sources now cite much higher figures. Get a current quote from the club\u2019s membership office.' },
    { q: 'Is Desert Mountain age-restricted?', a: 'No: Desert Mountain is multi-generational, not 55+. Families with children are welcome.' }
  ],
  'boulders': [
    { q: 'Is The Boulders a resort or a residential community?', a: 'Both. The Boulders is a Curio Collection by Hilton resort with two championship golf courses, but it\u2019s also a 1,450-home residential community of casitas, villas, and custom estates interspersed with the resort.' },
    { q: 'Can residents use the resort amenities?', a: 'Yes: Boulders residents have member-style access to the resort\u2019s spa, restaurants, pools and fitness facilities.' },
    { q: 'Who designed the Boulders golf courses?', a: 'Both the North and South courses at The Boulders were designed by Jay Morrish, with championship layouts woven through 12-million-year-old granite outcroppings.' },
    { q: 'How far is The Boulders from Scottsdale?', a: 'The Boulders is in Carefree, immediately north of Scottsdale: about a 25 minute drive to North Scottsdale and 35 minutes to Sky Harbor airport.' }
  ],
  'estancia': [
    { q: 'How many homes are in Estancia?', a: 'Only 290 homesites on 640 acres, making Estancia one of the lowest-density luxury communities in all of Scottsdale.' },
    { q: 'Is Estancia Club membership available to all residents?', a: 'No. Estancia Club membership requires sponsorship from existing members and is highly selective. Roughly 80% of homeowners are members but acceptance is not automatic.' },
    { q: 'Who designed the Estancia golf course?', a: 'Tom Fazio designed the Estancia Club\u2019s private 18-hole course: consistently ranked the #1 private course in Arizona.' }
  ],
  'mirabel': [
    { q: 'Is Mirabel a private golf community?', a: 'Yes. Mirabel is members-only: the Tom Fazio course and clubhouse amenities are private to club members. Home ownership and club membership are separate purchases.' },
    { q: 'Is Mirabel age-restricted?', a: 'No, Mirabel is open to all ages, though the resident demographic skews 50+ with a strong full-time-resident community.' },
    { q: 'How big are the lots in Mirabel?', a: 'Most Mirabel lots range from 1/2 acre to 2 acres, with custom estates on premium golf-frontage and view lots.' }
  ],
  'gainey-ranch': [
    { q: 'What is Gainey Ranch known for?', a: 'Gainey Ranch is Scottsdale\u2019s original master-planned resort community, wrapped around the Hyatt Regency resort and a 27-hole private country club. Established 1984, 560 acres, guard-gated.' },
    { q: 'Is Gainey Ranch Golf Club open to the public?', a: 'No: the 27-hole Gainey Ranch Golf Club is private. Membership is available to residents and select non-residents.' },
    { q: 'What\u2019s the price range in Gainey Ranch?', a: 'Gainey Ranch homes range from $725K patio homes to $5.5M lakefront estates. The community has seven distinct sub-neighborhoods at different price points.' },
    { q: 'How walkable is Gainey Ranch?', a: 'Extremely walkable. Residents can walk to the Hyatt Regency resort, the country club, multiple parks, and via the Scottsdale Greenbelt path connect to Kierland and Scottsdale Quarter shopping.' }
  ],
  'stonegate': [
    { q: 'Is Stonegate gated?', a: 'Yes: Stonegate is guard-gated with 24/7 patrol across all 480 acres.' },
    { q: 'Is the Stonegate Country Club private?', a: 'Yes, the Stonegate Country Club operates a private 18-hole Tom Weiskopf course. Membership is separate from home ownership.' },
    { q: 'How does Stonegate compare to Silverleaf?', a: 'Stonegate offers similar guard-gated luxury and private Weiskopf golf at meaningfully lower price points ($1.1M\u2013$6.5M vs Silverleaf\u2019s $3.5M\u2013$28M). Trade-off: less exclusivity and a smaller club membership.' }
  ],
  'terravita': [
    { q: 'Is Terravita 55+?', a: 'Yes: Terravita is an active-adult community where at least one resident in each household must be 55 or older.' },
    { q: 'What amenities are included at Terravita?', a: 'Terravita has a 38,000 sq ft community center with fitness, indoor lap pool, outdoor heated pool, tennis, pickleball, bocce, and a robust social calendar. The private 18-hole Casper/Nash golf course is a separate membership.' },
    { q: 'What\u2019s the HOA fee at Terravita?', a: 'Terravita HOA fees run approximately $2,400/year (as of 2026), covering common area maintenance, the gate, and access to community amenities (golf is separate).' }
  ],
  'legend-trail': [
    { q: 'Is Legend Trail a private golf community?', a: 'Legend Trail Golf Club is semi-private: residents have preferred tee times but the course is also accessible to the public, making it more flexible than fully-private clubs.' },
    { q: 'Who designed the Legend Trail course?', a: 'Rees Jones designed the Legend Trail course: a desert-mountain layout with dramatic elevation changes and McDowell Mountain views.' },
    { q: 'How does Legend Trail compare to Troon North?', a: 'Legend Trail is the more accessible alternative: same North Scottsdale 85262 zip, similar desert-mountain golf experience, but homes are typically 30\u201340% less expensive and the club is semi-private rather than the public-resort Troon North model.' }
  ],
  'pinnacle-peak-country-club': [
    { q: 'When was Pinnacle Peak Country Club established?', a: 'Pinnacle Peak Country Club was established in 1977: one of the oldest private golf clubs in North Scottsdale, with mature trees and landscaping that are decades ahead of newer communities.' },
    { q: 'How many homes are in Pinnacle Peak Country Club?', a: 'Approximately 540 homes on 1/2-acre to 2-acre lots. The community is significantly less dense than most modern Scottsdale developments.' },
    { q: 'Is the Pinnacle Peak CC course private?', a: 'Yes, the Pinnacle Peak Country Club\u2019s 18-hole course is private and members-only.' }
  ],
  'mccormick-ranch': [
    { q: 'How many lakes are in McCormick Ranch?', a: 'McCormick Ranch has 26 man-made lakes throughout the community: a defining feature that no other Scottsdale community matches.' },
    { q: 'Are the McCormick Ranch golf courses public?', a: 'Yes, both the Pine and Palm courses at McCormick Ranch Golf Club are public/resort access. Residents are not required to join a country club.' },
    { q: 'How walkable is McCormick Ranch?', a: 'Very walkable. McCormick Ranch has miles of paved walking and biking paths connecting villages, lakes, parks, and the Scottsdale Greenbelt trail to Scottsdale Quarter and Kierland.' },
    { q: 'What\u2019s the entry price in McCormick Ranch?', a: 'McCormick Ranch is one of the most accessible Scottsdale golf communities: attached homes from the high $500s and luxury lakefront estates up to $4.2M.' }
  ],

  // ─── Phase 2 communities ───
  'ancala': [
    { q: 'Is Ancala a gated community?', a: 'Yes: Ancala is guard-gated with 24/7 patrol across all 575 home sites.' },
    { q: 'Who designed the Ancala Country Club golf course?', a: 'Perry Dye designed the private 18-hole desert layout at Ancala Country Club, opened in 1989. The course winds through the western flank of the McDowell Mountains.' },
    { q: 'Is Ancala Country Club membership required for residents?', a: 'No: club membership is optional and separate from home ownership. Roughly 60% of Ancala residents are full club members.' },
    { q: 'How does Ancala compare to DC Ranch?', a: 'Ancala is east of the 101 in the 85258 zip, while DC Ranch sits further north in 85255. Ancala has a smaller (575 vs 4,400) and more tight-knit community feel, and homes typically run 30\u201340% less expensive than comparable DC Ranch properties.' },
    { q: 'What zip code is Ancala in?', a: 'Ancala is in the 85258 zip code, in east Scottsdale near Mountain View Park and the Indian Bend Wash greenbelt.' }
  ],
  'firerock': [
    { q: 'Is FireRock Country Club private?', a: 'Yes: the FireRock Country Club is a fully private members-only club. Membership is separate from home ownership in the FireRock community.' },
    { q: 'How much is FireRock Country Club membership?', a: 'FireRock\u2019s full equity golf membership initiation is approximately $50,000 with annual dues around $15,000 (as of 2026). Verify current figures with the club directly.' },
    { q: 'How long is the drive from FireRock to Scottsdale?', a: 'FireRock is in Fountain Hills, about 15\u201320 minutes east of North Scottsdale via the AZ-87 (Beeline Highway) or Shea Boulevard. Sky Harbor airport is roughly 35 minutes.' },
    { q: 'Who designed the FireRock golf course?', a: 'Gary Panks designed the FireRock Country Club\u2019s 18-hole layout, known for dramatic elevation changes and Four Peaks Mountain backdrops.' },
    { q: 'How does FireRock compare to Eagle Mountain?', a: 'Both are in Fountain Hills, but FireRock is private (guard-gated, members-only golf) while Eagle Mountain is a more accessible community with a daily-fee public golf course. FireRock prices are typically 40\u201360% higher than equivalent Eagle Mountain homes.' }
  ],
  'eagle-mountain': [
    { q: 'Is Eagle Mountain a gated community?', a: 'Eagle Mountain has gated entries to some sub-communities but is not a single guard-gated master plan. The golf course itself is daily-fee public access.' },
    { q: 'How much does it cost to play Eagle Mountain Golf Club?', a: 'Peak-season green fees at Eagle Mountain run roughly $90\u2013$140 in 2026: substantially less than Troon North or Grayhawk. Resident discounts available.' },
    { q: 'Is Eagle Mountain a good value vs North Scottsdale?', a: 'Yes: Eagle Mountain offers comparable mountain-view luxury living at roughly 30\u201350% less per square foot than equivalent North Scottsdale homes, in exchange for a 15-minute longer commute to Scottsdale Quarter.' },
    { q: 'What schools serve Eagle Mountain?', a: 'Eagle Mountain residents are served by the Fountain Hills Unified School District, with Fountain Hills High School ranked among the top public schools in Maricopa County.' }
  ],
  'troon-village': [
    { q: 'Is Troon Village the same as Troon North?', a: 'No: Troon Village is the original 1985 Troon community surrounding the private Troon Country Club. Troon North is a separate, newer (1990s) master plan about 5 miles further north with two public/resort courses.' },
    { q: 'Is Troon Country Club private?', a: 'Yes: Troon Country Club is a fully private members-only club. The Tom Weiskopf/Jay Morrish 1985 design is one of the most prestigious private memberships in Arizona.' },
    { q: 'How much is Troon Country Club membership?', a: 'Troon Country Club full equity initiation is approximately $80,000 with annual dues around $18,000. The club is known for an exceptional Forest Highlands (Flagstaff) reciprocal arrangement.' },
    { q: 'How does Troon Village compare to Troon North?', a: 'Troon Village is more mature (established landscaping, larger lots, older homes), more exclusive (private members-only golf), and quieter. Troon North is newer, more active, with public-access golf and more new construction.' }
  ],
  'sincuidados': [
    { q: 'How small is Sincuidados?', a: 'Just 99 homesites on 90 acres, making Sincuidados one of the most intimate luxury enclaves in all of Scottsdale. By comparison, DC Ranch has 4,400 homes on 4,400 acres.' },
    { q: 'Is Sincuidados gated?', a: 'Yes: Sincuidados is guard-gated with 24/7 patrol.' },
    { q: 'Is there golf inside Sincuidados?', a: 'No on-site golf, but Sincuidados sits adjacent to Troon Country Club and is the preferred address for many Troon members. The community itself was designed for a quiet, residential lifestyle.' },
    { q: 'What architectural style does Sincuidados require?', a: 'All homes are built in a unified southwest-organic vernacular with strict architectural review. The result is one of the most aesthetically cohesive communities in Scottsdale.' }
  ],
  'saguaro-highlands': [
    { q: 'How large are the lots in Saguaro Highlands?', a: 'Lots in Saguaro Highlands typically range from 1 to 3+ acres, allowing for true legacy-estate construction with private guest casitas, outdoor entertainment areas, and protected saguaros.' },
    { q: 'Is Saguaro Highlands a gated community?', a: 'Yes: Saguaro Highlands is gated with controlled entry. The community has approximately 250 custom homes.' },
    { q: 'Is golf included with Saguaro Highlands HOA?', a: 'No: Saguaro Highlands does not have on-site golf. Most residents pursue separate memberships at Pinnacle Peak Country Club, Mirabel, or Desert Mountain (all within a 10\u201315 minute drive).' },
    { q: 'How does Saguaro Highlands compare to Mirabel?', a: 'Both attract similar luxury buyers, but Saguaro Highlands focuses on bigger lots and architectural freedom (no on-site golf, lower HOA), while Mirabel offers turnkey membership lifestyle with on-property Tom Fazio golf.' }
  ],
  'tonto-verde': [
    { q: 'Is Tonto Verde an active-adult 55+ community?', a: 'Yes: Tonto Verde is a 55+ guard-gated community in Rio Verde, about 30 minutes northeast of north Scottsdale.' },
    { q: 'How many golf courses are at Tonto Verde?', a: 'Two private 18-hole championship courses: The Peaks Course and The Ranch Course, both inside the guard gate.' },
    { q: 'What\u2019s the HOA at Tonto Verde?', a: 'Tonto Verde HOA fees run approximately $5,400/year (2026) and include access to the community center, fitness, pickleball, tennis, and pools. Golf membership is a separate cost.' },
    { q: 'How does Tonto Verde compare to Terravita?', a: 'Both are 55+ Scottsdale-area golf communities, but Tonto Verde is further northeast (Rio Verde), more remote (better stargazing, longer commute), and meaningfully more affordable than Terravita.' }
  ],
  'scottsdale-ranch': [
    { q: 'How big is Scottsdale Ranch?', a: 'Scottsdale Ranch is 1,100 acres with approximately 4,400 homes, making it the largest established master-planned community in central-east Scottsdale (85258 zip).' },
    { q: 'Does Scottsdale Ranch have a golf course?', a: 'No: Scottsdale Ranch is organized around Lake Serena rather than fairways; there is no golf course inside the community. McCormick Ranch Golf Club\u2019s two public courses and the private Gainey Ranch Golf Club are both minutes away.' },
    { q: 'Can residents use Lake Serena?', a: 'Yes: the 42-acre private Lake Serena is for resident use only. Permits are required for boating (electric only, no gas engines). Catch-and-release fishing is allowed.' },
    { q: 'What\u2019s the HOA in Scottsdale Ranch?', a: 'Scottsdale Ranch master HOA fees run approximately $1,200/year (2026), plus sub-community fees that vary by neighborhood. Lake access is included.' }
  ],
  'paradise-valley': [
    { q: 'Is Paradise Valley the same as Scottsdale?', a: 'No: Paradise Valley is a separately-incorporated town wedged between Scottsdale and Phoenix. It has its own town council, police, and zoning code (notably the one-acre lot minimum).' },
    { q: 'What is the property-tax rate in Paradise Valley?', a: 'Paradise Valley\u2019s combined effective property-tax rate is approximately 0.51%: the lowest in Maricopa County and roughly half the rate of California or Texas.' },
    { q: 'What are the most prestigious neighborhoods in Paradise Valley?', a: 'Cheney Estates, Clearwater Hills, Camelback Country Club, Mockingbird Lane, Stone Canyon, and the Phoenician/Camelback Mountain base are widely considered the most prestigious addresses in the 85253 zip.' },
    { q: 'What\u2019s the median home price in Paradise Valley?', a: 'The median sold price in Paradise Valley is approximately $3.4M (Q2 2026). The top end exceeds $40M, with custom estates regularly trading in the $10\u2013$20M range.' },
    { q: 'What golf is in Paradise Valley?', a: 'Paradise Valley contains Camelback Golf Club (resort, 2 courses), Mountain Shadows Short Course (9-hole par-3), Paradise Valley Country Club (private), and Phoenician Golf Club (resort, Phil Mickelson 2018 redesign).' }
  ],
  'sereno-canyon': [
    { q: 'Who built Sereno Canyon?', a: 'Sereno Canyon is a Toll Brothers community of approximately 525 single-family homes, with build-out from 2014\u20132024.' },
    { q: 'Is Sereno Canyon gated?', a: 'Yes: Sereno Canyon is gated with controlled entry, plus an additional gated Verani luxury collection within the community.' },
    { q: 'What amenities are at Sereno Canyon\u2019s Mountain House?', a: 'The resident-only Mountain House clubhouse includes a pool, fitness center, pickleball courts, yoga lawn, and event space: all included in the HOA.' },
    { q: 'How close is Sereno Canyon to Whisper Rock?', a: 'Sereno Canyon is directly adjacent to Whisper Rock Golf Club: a 5-minute drive to the front gate. Many Sereno Canyon residents are Whisper Rock members.' }
  ],

  // ─── Phase 4 communities ───
  'desert-highlands': [
    { q: 'When was Desert Highlands established?', a: 'Desert Highlands was established in 1983, making it one of the oldest guard-gated luxury golf communities in Scottsdale. It was Jack Nicklaus\u2019 very first Arizona design.' },
    { q: 'What is the Desert Highlands Golf Club initiation fee?', a: 'Desert Highlands full equity golf membership initiation is approximately $95,000 with annual dues around $25,000 (as of 2026). The club also offers a less expensive social membership.' },
    { q: 'Did the Skins Game take place at Desert Highlands?', a: 'Yes: Desert Highlands hosted the original 1983 Skins Game with Jack Nicklaus, Arnold Palmer, Gary Player and Tom Watson, the event that made televised silly-season golf a phenomenon.' },
    { q: 'Is Desert Highlands gated?', a: 'Yes: Desert Highlands is guard-gated with 24/7 patrol across all 580 home sites on 850 acres.' },
    { q: 'How does Desert Highlands compare to Estancia?', a: 'Both are ultra-private, both at the foot of Pinnacle Peak. Desert Highlands is older (1983 vs 1995), larger (580 vs 290 homes), and meaningfully more affordable. Estancia is the smaller, quieter, more exclusive of the two.' }
  ],
  'windgate-ranch': [
    { q: 'Is Windgate Ranch a gated community?', a: 'Yes: Windgate Ranch is guard-gated with 24/7 patrol. Resident-only Heritage Club amenities are included with HOA.' },
    { q: 'Who built Windgate Ranch?', a: 'Windgate Ranch is a Toll Brothers community of approximately 450 single-family homes built between 2005 and 2018.' },
    { q: 'How does Windgate Ranch compare to DC Ranch?', a: 'Windgate Ranch homes are typically 30\u201340% less expensive than equivalent DC Ranch homes, with newer construction. The trade-off: smaller community, no on-site country club golf, slightly less prestigious zip-code positioning.' },
    { q: 'Is the Heritage Club included with Windgate Ranch HOA?', a: 'Yes: the resident-only Heritage Club (pool, fitness, pickleball, tennis, event space) is included in the master HOA fee of approximately $2,800/year.' }
  ],
  'sun-ridge-canyon': [
    { q: 'Is Sun Ridge Canyon Golf Club public or private?', a: 'Sun Ridge Canyon Golf Club is a public daily-fee course: no membership required. Peak-season green fees run $90\u2013$160 in 2026.' },
    { q: 'What is the "Wicked Six" at Sun Ridge Canyon?', a: 'The Wicked Six refers to the last six holes (13\u201318) of the Sun Ridge Canyon golf course: a brutally beautiful canyon stretch with dramatic elevation changes and saguaro-lined fairways. Often ranked among Arizona\u2019s most memorable finishes.' },
    { q: 'How does Sun Ridge Canyon compare to FireRock?', a: 'Sun Ridge Canyon offers comparable canyon-golf scenery at a fraction of the cost: daily-fee golf, no membership, and homes typically 40\u201350% less expensive than FireRock. Trade-off: no private clubhouse culture.' }
  ],
  'mcdowell-mountain-ranch': [
    { q: 'What schools serve McDowell Mountain Ranch?', a: 'McDowell Mountain Ranch is served by the Scottsdale Unified School District, including the highly-rated Copper Ridge K-8, Desert Canyon K-8, and Desert Mountain High School.' },
    { q: 'Is there golf in McDowell Mountain Ranch?', a: 'Yes: McDowell Mountain Golf Club (formerly known as Sanctuary Golf Course) is a daily-fee course at the community. The community itself doesn\u2019t own a country club, but multiple public and semi-private courses are within a 10-minute drive.' },
    { q: 'How big is McDowell Mountain Ranch?', a: 'McDowell Mountain Ranch is approximately 4,000 homes across 19 distinct subdivisions, plus two community parks (the South Park aquatic center is the centerpiece amenity).' },
    { q: 'What\u2019s the HOA in McDowell Mountain Ranch?', a: 'McDowell Mountain Ranch master HOA fees run approximately $300\u2013$400 per quarter (2026), plus sub-community fees that vary. Aquatic center and trail access are included.' }
  ],
  'scottsdale-mountain': [
    { q: 'Is Scottsdale Mountain gated?', a: 'Yes: Scottsdale Mountain is guard-gated with 24/7 patrol. The community climbs 1,000+ feet of elevation up the McDowell foothills.' },
    { q: 'How big are the lots in Scottsdale Mountain?', a: 'Lots in Scottsdale Mountain typically range from 1/2 acre to 2 acres. The elevation and topography make every lot uniquely positioned for views.' },
    { q: 'Is Scottsdale Mountain a golf community?', a: 'Scottsdale Mountain has no on-site golf, but residents have easy access to Sun Ridge Canyon, Eagle Mountain, and other Fountain Hills-area golf within a 10-minute drive.' },
    { q: 'What zip code is Scottsdale Mountain in?', a: 'Scottsdale Mountain is in the 85259 zip code in east Scottsdale, bordering Fountain Hills.' }
  ],
  'scottsdale-cc-starfire': [
    { q: 'Who designed Starfire Golf Club?', a: 'Arnold Palmer designed the original Starfire Golf Club (formerly Scottsdale Country Club), a 27-hole public-access facility in central Scottsdale.' },
    { q: 'Is Starfire Golf Club public?', a: 'Yes: Starfire is a public daily-fee golf course. Peak-season green fees run $70\u2013$120 in 2026.' },
    { q: 'What zip code is Scottsdale CC / Starfire in?', a: 'The Scottsdale Country Club / Starfire neighborhoods are in the 85251 zip code in central Scottsdale, walking distance to Old Town.' },
    { q: 'How walkable is the Scottsdale CC area?', a: 'Very walkable: Old Town Scottsdale, Scottsdale Stadium, and dozens of restaurants and galleries are within a 5\u201315 minute walk. One of the most walkable luxury residential pockets in the city.' }
  ],
  'rio-verde': [
    { q: 'Is Rio Verde a 55+ community?', a: 'Yes: Rio Verde is a guard-gated 55+ active-adult master-planned community established in 1972, with approximately 2,100 homes.' },
    { q: 'How many golf courses are at Rio Verde?', a: 'Rio Verde has two private 18-hole courses included with the community: Quail Run and White Wing.' },
    { q: 'How far is Rio Verde from Scottsdale?', a: 'Rio Verde is approximately 30 minutes northeast of north Scottsdale, accessible via Dynamite Boulevard or Rio Verde Drive. Sky Harbor airport is about 50 minutes.' },
    { q: 'What\u2019s the dark-sky policy at Rio Verde?', a: 'Rio Verde and surrounding Tonto National Forest are dark-sky preservation areas with strict outdoor lighting ordinances. Stargazing is exceptional: no commercial light pollution within 15 miles.' }
  ],
  'kierland': [
    { q: 'Is Kierland in Scottsdale or Phoenix?', a: 'The Kierland neighborhoods straddle the Scottsdale\u2013Phoenix municipal border at Scottsdale Road north of Bell. Many homes are technically in Phoenix\u2019s 85254 zip while addresses read as Scottsdale.' },
    { q: 'Is Kierland Golf Club public?', a: 'Yes: Kierland Golf Club is a public/resort course operated by the adjacent Westin Kierland Resort. Peak-season green fees run $140\u2013$220 in 2026.' },
    { q: 'How walkable is Kierland?', a: 'Kierland is the most walkable luxury micro-neighborhood in the Valley: walking distance to Kierland Commons, Scottsdale Quarter, the Westin Kierland resort, and dozens of high-end restaurants.' },
    { q: 'Are there condos in Kierland?', a: 'Yes: Kierland is one of the few Scottsdale-area communities with significant luxury condo and high-rise inventory (Optima Kierland, Kierland Greens, Mark-Taylor multifamily) in addition to single-family custom estates.' }
  ],
  'hidden-hills': [
    { q: 'Is Hidden Hills gated?', a: 'Yes: Hidden Hills is a guard-gated community of approximately 320 custom homes in east Scottsdale\u2019s McDowell foothills.' },
    { q: 'Does Hidden Hills have golf?', a: 'Hidden Hills has no on-site golf, but is within a 10-minute drive of McDowell Mountain Golf Club and Sun Ridge Canyon.' },
    { q: 'What are the views like in Hidden Hills?', a: 'Hidden Hills sits high on the McDowell foothills with west-facing views: some of the best sunset and downtown-Phoenix city-light views available in sub-$3M Scottsdale homes.' }
  ],
  'ironwood-village': [
    { q: 'Is Ironwood Village a gated community?', a: 'Yes: Ironwood Village is gated with controlled entry. The community has approximately 460 single-family homes built between 2000 and 2012.' },
    { q: 'Why is Ironwood Village more affordable than nearby 85255 communities?', a: 'Ironwood Village offers lower price-per-square-foot than DC Ranch or Grayhawk because it lacks on-site golf, has smaller average lot sizes, and a lower-amenity HOA. Same zip code, much lower cost of entry.' },
    { q: 'What is the HOA in Ironwood Village?', a: 'Ironwood Village HOA fees run approximately $135 per month (2026), one of the lowest in the 85255 zip.' }
  ],
  'tatum-ranch': [
    { q: 'Is Tatum Ranch Golf Club open to the public?', a: 'Tatum Ranch Golf Club is semi-private: residents have preferred tee times, but the course is accessible to the public with daily-fee bookings.' },
    { q: 'Who designed Tatum Ranch?', a: 'Greg Nash designed the Tatum Ranch Golf Club\u2019s 18-hole semi-private layout, opened in 1989.' },
    { q: 'How does Tatum Ranch compare to Grayhawk?', a: 'Tatum Ranch is the much more affordable cousin: same general golf-community lifestyle, but homes typically run $400K\u2013$1.4M vs Grayhawk\u2019s $700K\u2013$4M. Trade-off: Tatum Ranch is in the 85331 Cave Creek border zip rather than the prestige 85255.' }
  ],
  'phoenician-residences': [
    { q: 'Are The Phoenician Residences part of the resort?', a: 'Yes: The Phoenician Residences are a limited collection of luxury homes adjacent to The Phoenician resort at the base of Camelback Mountain. Residents have direct golf, spa, and dining access at the resort.' },
    { q: 'Who redesigned The Phoenician golf course?', a: 'Phil Mickelson and his design team redesigned The Phoenician Golf Club in 2018: a $32M rebuild that converted the original 27-hole layout into a single more modern 18.' },
    { q: 'How walkable is the Phoenician Residences area?', a: 'The Phoenician Residences are within a 10\u201315 minute walk of Old Town Scottsdale and dozens of high-end restaurants: unique among luxury Scottsdale addresses.' }
  ],
  'norterra': [
    { q: 'Where is Norterra?', a: 'Norterra is in North Phoenix (85085 zip) just east of I-17 at Happy Valley Road, approximately 25\u201330 minutes northwest of Scottsdale.' },
    { q: 'What schools serve Norterra?', a: 'Norterra is served by the highly-rated Deer Valley Unified School District, with several A+ rated schools including Norterra Canyon K-8 and Boulder Creek High.' },
    { q: 'Is Norterra a golf community?', a: 'Norterra itself is not a golf community, but residents have easy access to Adobe Dam Golf Course and other North Phoenix public courses within 10 minutes.' }
  ],
  'westbrook-village': [
    { q: 'Is Westbrook Village 55+?', a: 'Yes: Westbrook Village is a guard-gated 55+ active-adult community in Peoria, with approximately 2,700 homes.' },
    { q: 'How many golf courses are at Westbrook Village?', a: 'Westbrook Village has two private 18-hole courses included with the community: The Lakes Course and The Vistas Course.' },
    { q: 'How does Westbrook Village compare to Terravita?', a: 'Both are 55+ guard-gated golf communities, but Westbrook Village (in Peoria) is meaningfully more affordable than Terravita (in north Scottsdale): median home prices run roughly 40\u201350% less. Trade-off: longer commute to Scottsdale shopping and Sky Harbor.' }
  ],
  'carefree-resort-cc': [
    { q: 'Is Carefree Resort & Golf Club public or private?', a: 'Carefree Resort & Golf Club is semi-private: resort guests and members have priority access, but the 36-hole facility is also accessible to the public with daily-fee bookings.' },
    { q: 'How walkable is Carefree town center from the Resort?', a: 'The Carefree Resort is a 10-minute walk to the famous Carefree sundial, Easy Street art galleries, and dozens of restaurants in the historic Carefree town center.' },
    { q: 'How does Carefree compare to Scottsdale?', a: 'Carefree is a separately-incorporated town immediately north of Scottsdale: quieter, more western-themed, lower-density, and meaningfully more affordable per square foot. The trade-off is a 20\u201325 minute drive to Scottsdale Quarter shopping.' }
  ],
  'dove-valley-ranch': [
    { q: 'Who designed Dove Valley Ranch Golf Club?', a: 'Robert Trent Jones II designed the Dove Valley Ranch Golf Club: a public daily-fee championship layout in Cave Creek.' },
    { q: 'Is Dove Valley Ranch a gated community?', a: 'Dove Valley Ranch is not guard-gated: it\u2019s a non-gated golf-corridor community with approximately 900 homes around a Robert Trent Jones II public course.' },
    { q: 'What schools serve Dove Valley Ranch?', a: 'Dove Valley Ranch is served by the Cave Creek Unified School District, including Cactus Shadows High School (consistently ranked among the best public high schools in Arizona).' }
  ],
  'rancho-manana': [
    { q: 'Is Rancho Manana Golf Club semi-private?', a: 'Yes: Rancho Manana Golf Club is semi-private. Members and resort guests have priority access; the public can book daily-fee tee times.' },
    { q: 'What\u2019s unique about Rancho Manana?', a: 'Rancho Manana sits in dramatic hillside terrain on the western flank of Black Mountain in Cave Creek. The community has a strong horseman/artist culture and is walkable to downtown Cave Creek shopping and dining.' },
    { q: 'How does Rancho Manana compare to The Boulders?', a: 'Both are Cave Creek-area resort communities. The Boulders is more polished, more expensive, and Curio-Hilton branded. Rancho Manana is more authentically western, more rugged, and roughly 30\u201340% less expensive per square foot.' }
  ],
  'black-mountain-cc': [
    { q: 'Is Black Mountain Country Club public or private?', a: 'Black Mountain Country Club is semi-private: residents and members have priority access, but the course also accepts daily-fee public play.' },
    { q: 'How does Black Mountain CC compare to other Cave Creek golf?', a: 'Black Mountain CC is one of the most affordable golf-community entry points in the Cave Creek area: below-$1M homes are still available, vs $1M+ at Rancho Manana or Dove Valley Ranch.' },
    { q: 'What are the views like at Black Mountain?', a: 'Most homes face Black Mountain itself: a dramatic volcanic outcrop that\u2019s the visual landmark of the Cave Creek area. Sunset and sunrise alpenglow are exceptional.' }
  ],
  'carefree-cave-creek-custom': [
    { q: 'Are there HOAs on Carefree custom lots?', a: 'Most Carefree and Cave Creek custom-lot areas have no HOA at all, which is part of their appeal. A few smaller subdivisions have minimal HOAs for shared road maintenance only.' },
    { q: 'How big are typical custom lots in Carefree?', a: 'Custom-lot sizes range from 1 acre to 10+ acres, with the majority falling in the 1\u20133 acre range. Many lots are equestrian-zoned, allowing horses.' },
    { q: 'Can I build a custom home off-grid in Cave Creek?', a: 'Yes: portions of north Cave Creek and east Carefree are off-grid eligible, with solar + well + septic systems supporting full off-grid living. Permitting takes longer but is well-established.' }
  ],
  'desert-ridge': [
    { q: 'Is Desert Ridge a golf community?', a: 'Yes: Desert Ridge is anchored by the TPC Wildfire 36-hole golf facility, including the Faldo Championship Course and the Palmer Signature Course (both public/resort access).' },
    { q: 'What is High Street at Desert Ridge?', a: 'High Street is the pedestrian-only outdoor dining and entertainment district inside Desert Ridge: think Old Town Scottsdale\u2019s vibe, but newer and more curated. Walking distance to most Desert Ridge homes.' },
    { q: 'How does Desert Ridge compare to North Scottsdale?', a: 'Desert Ridge offers a comparable resort-anchored master-plan lifestyle at roughly 30\u201340% less per square foot than equivalent North Scottsdale homes. Trade-off: Phoenix address (not Scottsdale) and a 15-minute drive to Scottsdale Quarter.' }
  ],
  'blackstone-vistancia': [
    { q: 'Is Blackstone gated?', a: 'Yes: Blackstone is the guard-gated luxury enclave inside the larger Vistancia master-planned community in Peoria.' },
    { q: 'Who designed the Blackstone golf course?', a: 'Jim Engh designed the private 18-hole Blackstone Country Club course: known for dramatic elevation changes and an award-winning clubhouse.' },
    { q: 'How does Blackstone compare to North Scottsdale luxury?', a: 'Blackstone offers a comparable guard-gated private-golf lifestyle at significantly lower price points than DC Ranch or Silverleaf. Trade-off: 40\u201345 minute drive to Sky Harbor airport and Scottsdale shopping.' }
  ],
  'quintero-golf-cc': [
    { q: 'Is Quintero Country Club private?', a: 'Yes: Quintero Country Club is a fully private members-only club. The Rees Jones-designed course is consistently ranked among the top 100 private courses in America.' },
    { q: 'How remote is Quintero?', a: 'Quintero sits about 30 minutes northwest of Scottsdale at the foot of the White Tank Mountains: deliberately remote, with zero light pollution and dramatic desert panoramas.' },
    { q: 'How much is Quintero Country Club membership?', a: 'Quintero\u2019s full equity initiation runs approximately $30,000 with annual dues around $12,000 (2026): roughly half the cost of comparable Scottsdale private clubs.' },
    { q: 'How many homes are at Quintero?', a: 'Quintero is capped at just 220 home sites, making it one of the lowest-density private golf communities in Arizona.' }
  ]
};

// Zip code FAQs
export const ZIP_FAQS = {
  '85255': [
    { q: 'What golf communities are in Scottsdale 85255?', a: '85255 includes Grayhawk, DC Ranch, Silverleaf, Pinnacle Peak Country Club and Stonegate: the highest concentration of premier golf communities in all of Scottsdale.' },
    { q: 'What is the median home price in 85255?', a: 'The median home price in Scottsdale\u2019s 85255 zip code is approximately $2.1M as of Q2 2026, with the luxury golf-community segment averaging well above $2.5M.' },
    { q: 'What school district serves 85255?', a: '85255 is split between the Scottsdale Unified School District and the Paradise Valley Unified School District, both A+ rated. Top schools include Pinnacle High, Copper Ridge K-8, and Cactus Shadows.' }
  ],
  '85262': [
    { q: 'What\u2019s the difference between 85262 and 85255?', a: '85262 is further north, higher elevation, more desert-mountain in character, and home to Troon North, Desert Mountain and Legend Trail. 85255 is more populated and home to Grayhawk, DC Ranch and Silverleaf.' },
    { q: 'Is 85262 a good zip code for snowbirds?', a: 'Yes: 85262 has one of the highest concentrations of second-home and snowbird owners in Scottsdale, with lock-and-leave-friendly HOAs and resort-quality amenities at Troon North and Desert Mountain.' }
  ],
  '85266': [
    { q: 'What\u2019s special about Scottsdale 85266?', a: '85266 wraps the western flank of Pinnacle Peak and is home to Terravita (55+), Mirabel, and Estancia. It\u2019s the preferred zip for buyers who want the prestige of North Scottsdale at a lower density and slightly lower price.' }
  ],
  '85254': [
    { q: 'Is 85254 in Scottsdale or Phoenix?', a: 'Tricky question: 85254 is technically a Phoenix zip code but most of it sits within Scottsdale city limits. It\u2019s often called \u201cthe Magic Zip\u201d because residents enjoy Scottsdale services while paying Phoenix tax rates.' },
    { q: 'Why are 85254 home prices lower than other Scottsdale zips?', a: 'Older homes (mostly 1970s\u20131990s), no signature golf communities, and a more urban density. The trade-off is walkability: 85254 is within easy reach of Kierland, Scottsdale Quarter and Old Town.' }
  ],
  '85258': [
    { q: 'What communities are in Scottsdale 85258?', a: 'Central Scottsdale\u2019s 85258 zip is home to McCormick Ranch (3,400 homes, 26 lakes, two public golf courses) and Gainey Ranch (1,600 homes, 27-hole private golf, guard-gated, Hyatt Regency adjacent).' },
    { q: 'Are there entry-level prices in 85258?', a: 'Yes: 85258 has the most accessible entry point for golf-community living in Scottsdale. McCormick Ranch townhomes start in the high $500s.' }
  ]
};

// Comparison FAQs
export const COMPARISON_FAQS = {
  'from-california': [
    { q: 'How much do Californians save in taxes by moving to Arizona?', a: 'California\u2019s top state income tax rate is 13.3%; Arizona\u2019s flat rate is 2.5%. On a $1M annual income that is roughly a six-figure annual delta; on lower incomes the savings scale proportionally. Actual savings depend on your specific income, deductions, and residency facts: consult a tax attorney for your situation.' },
    { q: 'Do I need to sell my California home before buying in Scottsdale?', a: 'No. Many of our clients own concurrently for a transition period. Plan carefully around residency requirements (183-day rule) and consider the impact on California state taxes if you retain a California home.' }
  ],
  'from-naples-fl': [
    { q: 'Naples vs Scottsdale, which has better golf?', a: 'Naples has higher raw course count (~90 within 30 miles); Scottsdale has more variety (desert-mountain, parkland, top-100 public, ultra-private). Most snowbirds who\u2019ve owned in both prefer Scottsdale\u2019s variety.' },
    { q: 'Is Scottsdale less humid than Naples?', a: 'Yes: dramatically. Scottsdale averages 25% humidity; Naples averages 75%+. The Sonoran Desert summer is hotter but the dry heat is easier to manage and there are no hurricanes.' }
  ],
  'from-paradise-valley': [
    { q: 'Is Paradise Valley more exclusive than Scottsdale?', a: 'By zip code prestige, yes: Paradise Valley has a higher per-capita-wealth tax base and stricter zoning (1-acre minimum lots). But Scottsdale has more golf communities, more exclusive private clubs (Silverleaf, Estancia, Whisper Rock), and more inventory.' }
  ],
  'from-palm-desert': [
    { q: 'Is Palm Desert or Scottsdale a better long-term real estate investment?', a: 'Recent appreciation trajectories have generally favored Scottsdale over Palm Desert, and the Scottsdale luxury market is materially deeper on both inventory and national buyer demand. Palm Desert\u2019s smaller, historically more cyclical market can be harder to liquidate quickly during softer cycles. Verify current trailing performance with a licensed real-estate professional in each market.' }
  ],
  'from-carmel': [
    { q: 'Why move from Carmel to Scottsdale?', a: 'Three reasons cited by our Carmel-to-Scottsdale clients: (1) 300 days of sun vs Carmel\u2019s grey marine layer, (2) Arizona\u2019s 2.5% vs California\u2019s 13.3% top income tax, (3) deeper golf inventory: 200+ courses within 30 miles vs Carmel\u2019s premium-but-limited offering.' }
  ]
};

// Phase 3 cornerstone blog posts (link-bait)

// Zip-code landing pages
export const ZIP_PAGES = [
  {
    zip: '85255',
    name: 'North Scottsdale 85255',
    title: 'Scottsdale 85255 Homes | Grayhawk & DC Ranch ZIP',
    description: 'Homes for sale in Scottsdale\u2019s premier 85255 zip code: home to Grayhawk, DC Ranch, Silverleaf, Pinnacle Peak Country Club, and Stonegate.',
    intro: '85255 is North Scottsdale\u2019s most affluent and golf-dense zip code. Several guard-gated golf communities, three private country clubs, and a deeply luxury-oriented median home price make it the heart of the Scottsdale luxury market.',
    communities: ['grayhawk','dc-ranch','silverleaf','pinnacle-peak-country-club','stonegate'],
    median: '~$2M+',
    coords: { lat: 33.668, lng: -111.892 }
  },
  {
    zip: '85262',
    name: 'North Scottsdale 85262',
    title: 'Scottsdale 85262 Homes | Troon North & Desert Mountain',
    description: 'Homes for sale in 85262: desert-mountain luxury anchored by Troon North, Desert Mountain, Legend Trail and Estancia.',
    intro: '85262 is the highest-elevation luxury zip code in Scottsdale, home to Troon North, Desert Mountain, Legend Trail and the eastern edge of Pinnacle Peak. Big-sky views, lower density, and the highest concentration of golf-course estates well into the multi-millions.',
    communities: ['troon-north','desert-mountain','legend-trail','estancia'],
    median: '~$2M+',
    coords: { lat: 33.78, lng: -111.86 }
  },
  {
    zip: '85266',
    name: 'North Scottsdale 85266',
    title: 'Scottsdale 85266 Homes | Terravita & Mirabel ZIP',
    description: 'Homes for sale in 85266: a quieter, more residential luxury market home to Terravita (55+), Mirabel, and Estancia at the base of Pinnacle Peak.',
    intro: '85266 wraps the western flank of Pinnacle Peak. It\u2019s a preferred zip for buyers who want the prestige of 85262 with a quieter character: Terravita is here for active adults, and Mirabel/Estancia for ultra-private golf.',
    communities: ['terravita','mirabel','estancia'],
    median: '~$1.5M+',
    coords: { lat: 33.78, lng: -111.93 }
  },
  {
    zip: '85254',
    name: 'Central Scottsdale 85254',
    title: 'Scottsdale 85254 Homes for Sale | Walkable Central Luxury',
    description: 'Homes for sale in Central Scottsdale\u2019s 85254 zip: walkable to Kierland, Scottsdale Quarter and Old Town. Established neighborhoods and resort lifestyle.',
    intro: '85254 is the urban-luxury crossover zone in Scottsdale: think tree-lined streets, mid-century-modern remodels, and walkable village shopping. Generally lower price points than far-north Scottsdale, with the lifestyle resort buyers crave.',
    communities: [],
    median: '~$1M+',
    coords: { lat: 33.62, lng: -111.93 }
  },
  {
    zip: '85258',
    name: 'Central Scottsdale 85258',
    title: 'Scottsdale 85258 Homes | McCormick & Gainey Ranch',
    description: 'Homes for sale in 85258: anchored by McCormick Ranch and Gainey Ranch. Resort-style central Scottsdale living with private and public golf access.',
    intro: 'The 85258 zip is the original Scottsdale resort-community zone: McCormick Ranch (a large lake-oriented master-planned community) and Gainey Ranch (a guard-gated neighborhood wrapped around the Hyatt Regency and a 27-hole private club). Established trees, mature landscaping, and one of the lower entry points for golf-adjacent living in Scottsdale.',
    communities: ['gainey-ranch','mccormick-ranch'],
    median: 'Under $1M\u2013$1M+',
    coords: { lat: 33.57, lng: -111.91 }
  }
];
export function findZip(zip) { return ZIP_PAGES.find(z => z.zip === zip); }

// Relocation comparison pages
export const COMPARISONS = [
  {
    slug: 'from-california',
    title: 'Moving from California to Scottsdale | 2026 Relocation Guide',
    description: 'Complete guide for California buyers relocating to Scottsdale, AZ in 2026. Tax savings, climate, golf, real estate value compared to LA, SF, San Diego and Orange County.',
    from: 'California',
    headline: 'Why Californians are moving to Scottsdale (and what they wish they\u2019d known)',
    summary: 'For five years running, California has been the #1 source of Scottsdale relocators. Here\u2019s the tax math, lifestyle math, and the surprises Californians always mention.',
    sections: [
      { heading: 'The tax delta is the headline', body: 'California\u2019s top marginal state income tax rate is 13.3%. Arizona\u2019s flat tax is 2.5%. On a $1M annual income that is roughly a six-figure annual delta: enough, depending on rate environment, to materially offset the carrying cost of a meaningful Scottsdale mortgage. The exact savings depend on your specific income, deductions, and residency facts; consult a tax attorney before relying on any specific figure.' },
      { heading: 'You\u2019ll trade ocean for mountain views', body: 'Scottsdale is desert-mountain country. The McDowell and Pinnacle Peak ranges define every view. If you need ocean access, plan four flights a year to San Diego (1h) or Newport (1h 15m).' },
      { heading: 'Homes are bigger, lots are deeper, HOA culture is real', body: 'Expect 30\u201340% more square footage for your dollar. Golf-community HOAs in Scottsdale are more active and more architecturally controlled than most California planned communities. Read the CC&Rs.' },
      { heading: 'Best Scottsdale communities for California buyers', body: 'DC Ranch, Silverleaf and Estancia attract the highest concentration of California relocators: the architectural styles and club cultures feel familiar. Grayhawk and Troon North are heavily California-relocator too, at more accessible price points.' }
    ]
  },
  {
    slug: 'from-naples-fl',
    title: 'Naples FL vs Scottsdale AZ for Golf Buyers',
    description: 'Detailed comparison of Naples, Florida vs Scottsdale, Arizona for luxury golf-home buyers. Climate, real estate value, taxes, golf, lifestyle.',
    from: 'Naples, FL',
    headline: 'Naples vs Scottsdale: the snowbird showdown',
    summary: 'Two of America\u2019s premier luxury golf destinations, but very different lifestyles. Here\u2019s how to choose.',
    sections: [
      { heading: 'Climate: dry heat vs humid heat', body: 'Scottsdale is dry and sunny 299 days/year. Naples is hot, humid, and hurricane-vulnerable June through November. Both are world-class November\u2013April. For year-rounders, the dry-heat Scottsdale summer is easier than people expect.' },
      { heading: 'Real estate value', body: 'Naples and Scottsdale broadly trade in the same luxury price range, though the comparison varies sharply by segment. In the premium golf-community segment, Naples (Pelican Bay, Mediterra, Talis Park) is often comparable to or somewhat above Scottsdale (DC Ranch, Silverleaf) on a like-for-like basis. Scottsdale buyers generally get more land and square footage per dollar in the same price band. Verify current segment medians with a licensed real-estate professional during diligence.' },
      { heading: 'Taxes', body: 'Florida has no state income tax; Arizona has a low flat state income tax. Both states have moderate property-tax frameworks (verify the specific effective rate for your county and home value). Neither state imposes a state-level estate or inheritance tax.' },
      { heading: 'Golf', body: 'Naples has unusually deep raw course count for its market size, with a heavy concentration of private community-and-club bundled offerings. Scottsdale has comparable course count across a much larger geography, with broader variety: desert-mountain, parkland-style, championship public, ultra-private members-only, and a national reputation for several top-100-listed public courses (Troon North, TPC Scottsdale Stadium) that Naples does not match on at the public-access tier.' }
    ]
  },
  {
    slug: 'from-paradise-valley',
    title: 'Paradise Valley vs Scottsdale | Which Should You Buy In?',
    description: 'Comparing Paradise Valley and Scottsdale luxury markets in 2026. School districts, golf, privacy, price points, and lifestyle.',
    from: 'Paradise Valley',
    headline: 'Paradise Valley vs Scottsdale: when one is right and when the other is',
    summary: 'Paradise Valley is more prestigious by zip code; Scottsdale is broader, deeper, and more golf-focused. Here\u2019s the buyer\u2019s decision tree.',
    sections: [
      { heading: 'Privacy & lot size', body: 'Paradise Valley enforces minimum 1-acre lots town-wide. Scottsdale only requires 1+ acres in certain North Scottsdale custom areas (Estancia, Silverleaf custom). If absolute privacy on 1+ acres is non-negotiable, Paradise Valley wins.' },
      { heading: 'Schools', body: 'Both feed into Scottsdale Unified School District (A+ rated). For private school families, Paradise Valley has Phoenix Country Day; Scottsdale has BASIS Scottsdale and Notre Dame Prep. Wash.' },
      { heading: 'Golf', body: 'Paradise Valley has ONE golf community (Mountain Shadows). Scottsdale has 30+. If golf-community living is the priority, Scottsdale is the only choice.' },
      { heading: 'Resale & price stability', body: 'Paradise Valley appreciates slower but is more recession-resistant. Scottsdale luxury appreciates faster but with more cyclical volatility. Pick based on hold period: PV for 10+ year holds, Scottsdale for shorter.' }
    ]
  },
  {
    slug: 'from-palm-desert',
    title: 'Palm Desert vs Scottsdale | Luxury Golf Comparison 2026',
    description: 'Comparing Palm Desert, CA and Scottsdale, AZ for luxury golf buyers and snowbirds. Climate, prices, taxes, lifestyle.',
    from: 'Palm Desert, CA',
    headline: 'Palm Desert vs Scottsdale: similar climate, very different economics',
    summary: 'Both desert-luxury golf destinations, but Scottsdale is the better long-term play in 2026.',
    sections: [
      { heading: 'Climate twins', body: 'Both Palm Desert and Scottsdale are Sonoran/Colorado Desert climates with 300+ sunny days. Palm Desert runs slightly hotter in summer (avg highs 110\u00b0F+). Both are world-class October\u2013May.' },
      { heading: 'Tax math is brutal for California', body: 'California\u2019s state income tax (up to 13.3%) plus Mello-Roos taxes in some Palm Desert communities can add $20\u201340K/year to your effective housing cost vs Scottsdale. This is the #1 reason Coachella Valley owners are listing.' },
      { heading: 'Real estate inventory & appreciation', body: 'Palm Desert\u2019s luxury market is older, smaller, and historically more cyclical than Scottsdale\u2019s. Scottsdale generally has materially more inventory and a deeper national buyer pool. Recent appreciation trajectories have favored Scottsdale meaningfully over Palm Desert; verify current trailing-12-month performance against ARMLS and Palm Springs Regional MLS data during diligence.' },
      { heading: 'Country-club culture', body: 'Palm Desert\u2019s private clubs (Bighorn, Vintage, Stone Eagle) are exquisite. Scottsdale\u2019s top private clubs (Silverleaf, Estancia, Whisper Rock, Desert Mountain) match on quality and beat on diversity: you can join one club and play seven Nicklaus courses at Desert Mountain alone.' }
    ]
  },
  {
    slug: 'from-carmel',
    title: 'Carmel CA vs Scottsdale AZ | A Buyer\u2019s Comparison',
    description: 'Carmel-by-the-Sea / Pebble Beach vs Scottsdale for luxury golf-home buyers: climate, value, and golf access compared.',
    from: 'Carmel/Monterey, CA',
    headline: 'Carmel vs Scottsdale: ocean luxury vs desert luxury',
    summary: 'Two iconic American golf destinations. Carmel/Pebble Beach is the dream visit; Scottsdale is the better year-round home.',
    sections: [
      { heading: 'Climate & seasonality', body: 'Carmel is cool and damp year-round (avg 60\u00b0F). Scottsdale is sunny and dry 299 days. Carmel is a great place to visit; many buyers ultimately find it too cold and grey to live full-time. Scottsdale is a true year-round destination.' },
      { heading: 'Real estate value', body: 'Carmel and Pebble Beach are some of the priciest zip codes in America: median over $3.4M and limited inventory. Scottsdale\u2019s top zip (85262) median is $2.4M with 4x the inventory.' },
      { heading: 'Golf access', body: 'Pebble Beach is a bucket-list once-a-quarter experience. Scottsdale has 200+ courses within 30 miles: you can play four different top-100 courses a week without leaving zip 85262.' },
      { heading: 'Tax math', body: 'Same California tax problem as the LA/SF/SD analysis: 13.3% top rate vs Arizona 2.5%. On significant income, this single factor pays for a Scottsdale second home in under three years.' }
    ]
  }
];
export function findComparison(slug) { return COMPARISONS.find(c => c.slug === slug); }

// Additional blog posts (Phase 3)

// Collaborative / Partner & Sponsor categories — placeholder content.
// Each category positions Scottsdale Golf Lifestyle as a lead-gen + branding platform
// for service professionals serving our ICA (high-net-worth golf-home buyers,
// snowbirds, relocators, retirees in luxury master-planned communities).
export const COLLABORATIVE_CATEGORIES = [
  {
    slug: 'wealth-management',
    name: 'Wealth & Retirement Planning',
    shortName: 'Wealth Management',
    icon: 'TrendingUp',
    headline: 'Trusted financial advisors for Scottsdale\u2019s golf-community buyers',
    intro: 'Our audience is in the most consequential financial decade of their lives: selling a primary residence in a high-tax state, repositioning portfolios for a Scottsdale second home, and timing retirement income across two states. A wealth advisor featured here is in front of those decisions before the wire is sent.',
    whoFits: [
      'Independent wealth advisors and financial planners (RIAs, broker-dealers, CFP\u00ae, ChFC, CPWA)',
      'Multi-state tax planners (CA, NY, OR, IL \u2192 AZ specialists)',
      'Retirement income & Social Security strategists',
      'Estate planning attorneys and trust officers',
      '1031 exchange qualified intermediaries'
    ]
  },
  {
    slug: 'mortgage-lending',
    name: 'Mortgage & Private Lending',
    shortName: 'Mortgage',
    icon: 'Landmark',
    headline: 'Jumbo, private-bank, and non-QM lenders serving Scottsdale luxury buyers',
    intro: 'Our buyers average $1.8M loans and 65% have a non-traditional income profile (self-employed, K-1, asset-pledged, multi-state). This is the rare audience where retail conventional lenders lose every deal to relationship-based lenders.',
    whoFits: [
      'Jumbo & super-jumbo lenders ($1M\u2013$20M)',
      'Private banks (asset-pledge, securities-backed lines)',
      'Non-QM specialists (bank-statement, asset-depletion, DSCR)',
      'Bridge & cross-collateral lenders',
      'Construction-to-perm builders\u2019 financing'
    ]
  },
  {
    slug: 'insurance',
    name: 'Property & Casualty Insurance',
    shortName: 'Insurance',
    icon: 'ShieldCheck',
    headline: 'P&C and personal-lines insurance for high-value Scottsdale homes',
    intro: 'A $3M Scottsdale home with a pool, a golf-cart, two cars, and a casita is uninsurable by the carrier that wrote your client\u2019s old Ohio policy. Our buyers need high-value-home specialists from day one of the relocation.',
    whoFits: [
      'High-value-home P&C carriers and brokers (PURE, Chubb, AIG PCG, Cincinnati)',
      'Umbrella & excess liability specialists',
      'Wildfire, monsoon, and hail risk underwriters',
      'Collector-car and golf-cart insurers',
      'Title insurance and home-warranty providers'
    ]
  },
  {
    slug: 'roofing',
    name: 'Roofing & Exterior Services',
    shortName: 'Roofing',
    icon: 'Home',
    headline: 'Scottsdale tile, foam, and flat-roof specialists trusted by luxury homeowners',
    intro: 'Scottsdale roofs bake. Tile underlayment lasts 18\u201325 years; foam roofs need coating every 5. Most of our buyers inherit a roof that\u2019s within 5 years of needing real work: the right roofer is the difference between a $40K project and a $4K patch.',
    whoFits: [
      'Tile and concrete-tile roofing contractors',
      'Foam and elastomeric flat-roof specialists',
      'Solar-compatible roofing installers',
      'Skylights, sunscreens, and exterior coating providers',
      'Stucco, exterior paint, and waterproofing trades'
    ]
  },
  {
    slug: 'landscaping',
    name: 'Landscaping & Outdoor Living',
    shortName: 'Landscaping',
    icon: 'Trees',
    headline: 'Desert landscape design, irrigation, and outdoor-living craftsmen',
    intro: 'A Scottsdale backyard is the room buyers actually live in. Pool deck, fire pit, ramada, mature saguaro, low-water plantings, integrated lighting: these are the projects new owners commission in their first 90 days. The right landscape architect can earn a 6-figure relationship from a single referral.',
    whoFits: [
      'Desert landscape architects and designers',
      'Irrigation, drip, and smart-controller specialists',
      'Outdoor kitchen, ramada, and pergola builders',
      'Pool deck, pavers, and turf installers',
      'Mature-tree relocation and saguaro specialists'
    ]
  },
  {
    slug: 'pool-service',
    name: 'Pool & Spa Service',
    shortName: 'Pool Service',
    icon: 'Waves',
    headline: 'Weekly pool service, repair, and remodel for Scottsdale luxury homes',
    intro: 'A pool is standard equipment on a Scottsdale golf home: pool service is the most frequently-asked-for referral our buyers request before they even close. Reliable weekly service for snowbirds and absent owners is the highest-LTV category in this collaborative.',
    whoFits: [
      'Weekly pool & spa maintenance providers',
      'Pebble-tec, plaster, and tile remodel companies',
      'Salt-system conversion and equipment installers',
      'Pool-safety fence and cover specialists',
      'Pool-heater and pump-replacement contractors'
    ]
  },
  {
    slug: 'home-cleaning',
    name: 'Home Cleaning & Concierge',
    shortName: 'Cleaning',
    icon: 'Sparkles',
    headline: 'Luxury home cleaning, turnover, and concierge services',
    intro: 'Our buyers are second-home owners 6 months of the year and snowbirds who fly in for a week and need the home turned. Weekly cleaning, post-construction deep-clean, turnover service, and concierge support is a daily-need category for this audience.',
    whoFits: [
      'Weekly and bi-weekly home cleaning services',
      'Post-construction and move-in deep clean',
      'Snowbird turnover & home-readiness teams',
      'Window cleaning, pressure washing, paver-sealing',
      'Personal concierge, errand, and household management'
    ]
  },
  {
    slug: 'home-services',
    name: 'Home Services (Trades & Repair)',
    shortName: 'Home Services',
    icon: 'Wrench',
    headline: 'Vetted Scottsdale tradespeople: HVAC, plumbing, electrical, handyman, smart-home',
    intro: 'The first 90 days in a new Scottsdale home generate 8\u201312 service calls on average. Our buyers ask for the same five trades over and over: HVAC, plumbing, electrical, handyman, and smart-home. A featured listing here is a steady, qualified pipeline.',
    whoFits: [
      'HVAC: install, replace, and seasonal maintenance',
      'Plumbing: re-pipe, water softener, RO, leak-detection',
      'Electrical: panel upgrades, EV chargers, lighting',
      'Handyman, drywall, painting, and finish carpentry',
      'Smart-home, A/V, security, and home-network integrators',
      'Pest control: scorpions, termites, javelinas, snakes'
    ]
  }
];

export function findCategory(slug) {
  return COLLABORATIVE_CATEGORIES.find(c => c.slug === slug);
}

// ============================================================================
// GLOSSARY — Scottsdale luxury real estate, golf, club, and AZ tax terminology
// ============================================================================
export const GLOSSARY_TERMS = [
  { term: '1031 Exchange', def: 'A section of the IRS code that lets you defer capital-gains tax by exchanging one investment property for a like-kind one. Common move for snowbirds rolling a primary home into a Scottsdale second home held for rental.', cat: 'Tax' },
  { term: 'ARMLS', def: 'Arizona Regional Multiple Listing Service: the primary MLS for Maricopa County listings. Most Scottsdale homes for sale flow through ARMLS before they appear on public listing portals.', cat: 'Real Estate' },
  { term: 'Active Adult Community', def: 'A community legally permitted (under the federal Housing for Older Persons Act) to restrict residency to households with at least one occupant 55+. Examples in Scottsdale: Terravita and Trilogy at Encanterra.', cat: 'Community' },
  { term: 'Anchor Sponsor', def: 'In The Scottsdale Collaborative, the lead Preferred Partner in a category: receives prominent positioning on the category card, in editorial content, and inside the Buyer\u2019s Guide PDF.', cat: 'Platform' },
  { term: 'Architectural Review', def: 'The HOA committee that approves exterior changes (paint color, landscaping, roof material). Master-planned Scottsdale communities have especially strict review boards; expect 30\u201390 days for approvals.', cat: 'Community' },
  { term: 'Asset-Pledge Loan', def: 'A private-bank loan secured by your investment portfolio rather than a traditional W-2 income. Often saves 30\u201360 bps versus retail jumbo for liquid clients buying in Scottsdale.', cat: 'Mortgage' },
  { term: 'Bridge Loan', def: 'Short-term interest-only financing used to buy a Scottsdale home before selling your current primary residence. Typical Scottsdale bridges run 8\u201311 months at higher rates than permanent financing.', cat: 'Mortgage' },
  { term: 'Buy-Down', def: 'Pre-paying mortgage interest at closing to lower the rate on the loan, either temporarily (2-1, 3-2-1) or permanently. Negotiated in the offer when interest rates are elevated.', cat: 'Mortgage' },
  { term: 'CC&Rs', def: 'Covenants, Conditions & Restrictions: the recorded rules governing what an HOA can require of its homeowners. Always read before writing an offer; CC&Rs cover everything from rental restrictions to roof color.', cat: 'Community' },
  { term: 'Casita', def: 'A detached guest house, common on Scottsdale luxury lots. Often used as a home office, in-law suite, or short-term-rental income unit (verify the HOA permits STRs first).', cat: 'Property' },
  { term: 'Closing Costs', def: 'The combined fees due at closing on top of the purchase price: title, escrow, lender fees, appraisal, HOA transfer, prorated taxes. Allow 1.5\u20133% of purchase price for a Scottsdale closing.', cat: 'Transaction' },
  { term: 'Coming-Soon Listing', def: 'An ARMLS status that lets a listing be advertised but not yet shown for up to 7 days. Used to build pre-MLS buzz; serious Scottsdale buyers should have an agent monitoring this status.', cat: 'Real Estate' },
  { term: 'DC Ranch', def: 'A 4,400-acre master-planned community in north Scottsdale, anchored by the private DC Ranch Country Club. Known for its village-style layout, Country Club at DC Ranch, and acres of preserved Sonoran Desert.', cat: 'Community' },
  { term: 'Desert Mountain', def: 'A 13-square-mile master-planned community in north Scottsdale famous for its six Jack Nicklaus Signature golf courses plus the par-54 No. 7. One of the largest equity-membership clubs in Arizona.', cat: 'Community' },
  { term: 'Earnest Money', def: 'The good-faith deposit a buyer puts up after offer acceptance, typically 1\u20133% of purchase price in Scottsdale. Refundable per contingencies in the AAR contract.', cat: 'Transaction' },
  { term: 'Equity Membership', def: 'A golf-club membership in which the initiation fee is partially refundable when you resign (subject to a wait-list). Examples: Desert Mountain, DC Ranch Country Club.', cat: 'Club' },
  { term: 'Escrow', def: 'The neutral third party (typically a title company in Arizona) that holds funds and documents from contract acceptance through closing.', cat: 'Transaction' },
  { term: 'Estancia', def: 'A 640-acre, members-only community in north Scottsdale built around a Tom Fazio golf course. One of the most private and exclusive clubs in Arizona.', cat: 'Community' },
  { term: 'Grayhawk', def: 'A 1,600-acre master-planned community in north Scottsdale featuring two semi-private golf courses (Talon and Raptor). Popular with families due to A+ Pinnacle High School zoning.', cat: 'Community' },
  { term: 'HOA Disclosure', def: 'A required document set delivered to the buyer during escrow, containing the CC&Rs, current budget, reserve study, recent meeting minutes, and any pending special assessments.', cat: 'Community' },
  { term: 'Initiation Fee', def: 'The one-time fee to join a private golf club. Scottsdale range in 2026: roughly $50K (Pinnacle Peak CC) to $250K+ (Silverleaf, Estancia).', cat: 'Club' },
  { term: 'Jumbo Loan', def: 'A mortgage exceeding the conforming loan limit (~$766K in Maricopa County 2026). The majority of Scottsdale luxury purchases are jumbo or super-jumbo (>$2M).', cat: 'Mortgage' },
  { term: 'Lock-In Period', def: 'The window during which your lender guarantees the quoted mortgage rate. Standard locks are 30\u201360 days; longer locks (90\u2013120 days) cost more in fees or rate.', cat: 'Mortgage' },
  { term: 'Master-Planned Community', def: 'A large-scale, comprehensively designed community with shared amenities, architectural standards, and a unifying HOA. Scottsdale has 14+ true master-planned communities.', cat: 'Community' },
  { term: 'McDowell Mountains', def: 'The mountain range rising along the eastern edge of Scottsdale. Many premium communities (DC Ranch, Silverleaf, Troon North) are built into the McDowell foothills.', cat: 'Geography' },
  { term: 'Mello-Roos / CFD', def: 'Special-district financing used to pay for community infrastructure, paid annually as a tax-line item. Arizona uses Community Facilities Districts in some newer Scottsdale developments.', cat: 'Tax' },
  { term: 'Non-QM Loan', def: 'A Non-Qualified Mortgage: a loan that doesn\u2019t meet the federal QM rule, used for borrowers with bank-statement or asset-depletion qualification. Common for Scottsdale self-employed and snowbird buyers.', cat: 'Mortgage' },
  { term: 'Off-Market', def: 'A property being marketed privately rather than listed on the MLS. Top-tier Scottsdale buyers source 30\u201340% of their deals off-market via agent networks.', cat: 'Real Estate' },
  { term: 'Pebble-Tec', def: 'A pool finish made of small aggregate pebbles bonded to plaster. The Scottsdale standard for luxury pools; durable and lower maintenance than traditional plaster.', cat: 'Property' },
  { term: 'Pre-Approval Letter', def: 'A lender-issued letter stating the maximum loan amount you qualify for based on a credit-pull and document review. Required to accompany an offer on most Scottsdale luxury homes.', cat: 'Mortgage' },
  { term: 'Property Tax (AZ)', def: 'Maricopa County effective property tax averages 0.51%\u20130.66% of assessed value: about half California\u2019s rate and a third of Texas\u2019s. On a $2M Scottsdale home, expect roughly $11K/year.', cat: 'Tax' },
  { term: 'Ramada', def: 'An open-sided shade structure in a backyard, common on Scottsdale luxury lots. Often built with stone columns, exposed wood beams, and an outdoor kitchen.', cat: 'Property' },
  { term: 'Residency (AZ)', def: 'Becoming an Arizona tax resident requires more than half the year in-state plus documented intent (driver\u2019s license, voter registration, primary doctor, banking address in AZ).', cat: 'Tax' },
  { term: 'Saguaro', def: 'The iconic columnar cactus of the Sonoran Desert. Mature saguaros (50+ years) are protected by Scottsdale ordinance; relocation requires a permit and runs $1,500\u2013$5,000+ per cactus.', cat: 'Geography' },
  { term: 'Silverleaf', def: 'A 1,200-acre ultra-luxury enclave within DC Ranch, built into the McDowell Mountains. Home to Silverleaf Club, a top-five Arizona equity club with $250K+ initiation.', cat: 'Community' },
  { term: 'Snowbird', def: 'A part-time Scottsdale resident who lives here during winter months (typically Nov\u2013Apr) and elsewhere in summer. The single largest demographic segment for Scottsdale second homes.', cat: 'Lifestyle' },
  { term: 'Sonoran Desert', def: 'The North American desert ecosystem covering southern Arizona, southeastern California, and parts of Mexico. Defines Scottsdale\u2019s landscape: saguaro cactus, ocotillo, ironwood, and dramatic monsoon storms.', cat: 'Geography' },
  { term: 'Sponsorship (Club)', def: 'A current member writing a letter of recommendation required for application to a closed-membership Scottsdale club (Silverleaf, Estancia, some Desert Mountain memberships).', cat: 'Club' },
  { term: 'TPC Scottsdale', def: 'The Tournament Players Club hosting the WM Phoenix Open. The Stadium Course\u2019s 16th hole is the loudest in golf.', cat: 'Course' },
  { term: 'Target-Style Golf', def: 'A desert-golf design philosophy where fairways are carved through native desert terrain rather than wall-to-wall turf. Defining style of Scottsdale courses like Troon North and Desert Mountain.', cat: 'Course' },
  { term: 'Troon North', def: 'A 36-hole semi-private golf community in north Scottsdale (Monument and Pinnacle courses). One of the original target-style desert courses, opened 1990.', cat: 'Community' },
  { term: 'Wash', def: 'A dry desert streambed that fills during monsoon storms. Many Scottsdale lots back to a wash; bordering one can be a view amenity but also requires elevation-certified construction.', cat: 'Geography' }
];

// ============================================================================
// COMMUNITY COMPARISON PAIRS — programmatic versus pages
// ============================================================================
export const COMPARISON_PAIRS = [
  {
    slug: 'grayhawk-vs-troon-north',
    a: 'grayhawk', b: 'troon-north',
    intent: 'Family-friendly resort feel vs. target-style golf purity: two of the most-searched comparisons in north Scottsdale.',
    verdict: 'Pick Grayhawk if you want walkable amenities, A+ schools, and semi-private public-access golf. Pick Troon North if you want quieter, more architecturally bold desert lots backing up to McDowell preserve.'
  },
  {
    slug: 'dc-ranch-vs-silverleaf',
    a: 'dc-ranch', b: 'silverleaf',
    intent: 'Both are inside the same 4,400-acre master plan, but they\u2019re different worlds when it comes to price, exclusivity, and club access.',
    verdict: 'DC Ranch offers village-style neighborhoods with broader price points ($1M\u2013$5M) and the DC Ranch Country Club. Silverleaf is the ultra-luxury enclave inside DC Ranch with $250K+ initiation and homes starting at $4M.'
  },
  {
    slug: 'desert-mountain-vs-estancia',
    a: 'desert-mountain', b: 'estancia',
    intent: 'Two of the most exclusive equity clubs in north Scottsdale: dramatically different scale and feel.',
    verdict: 'Desert Mountain delivers six Nicklaus Signature courses plus a par-54 seventh and a 13 sq mi master-plan vibe. Estancia is a single Tom Fazio course inside a tighter, more private 640-acre enclave with smaller membership rolls.'
  },
  {
    slug: 'troon-north-vs-desert-mountain',
    a: 'troon-north', b: 'desert-mountain',
    intent: 'Semi-private public-access golf at Troon North vs. equity-membership private at Desert Mountain: the classic north-Scottsdale comparison.',
    verdict: 'Troon North fits buyers who want premier desert golf without a six-figure initiation. Desert Mountain fits buyers who want a private community with multiple courses, robust dining, and an equity stake.'
  },
  {
    slug: 'grayhawk-vs-dc-ranch',
    a: 'grayhawk', b: 'dc-ranch',
    intent: 'The single most common Scottsdale community comparison, both popular with families relocating from out of state.',
    verdict: 'Grayhawk wins on price-per-square-foot and public-access golf. DC Ranch wins on private-club access, larger lots, and the McDowell Mountain backdrop.'
  },
  {
    slug: 'boulders-vs-troon-north',
    a: 'boulders', b: 'troon-north',
    intent: 'Resort-attached luxury at the Boulders vs. pure target-style golf at Troon North: two iconic 90s-era developments.',
    verdict: 'The Boulders adds Waldorf-Astoria resort amenities and is closer to Carefree. Troon North feels more residential and golf-focused, with bolder homes built into the desert hillsides.'
  },
  {
    slug: 'silverleaf-vs-estancia',
    a: 'silverleaf', b: 'estancia',
    intent: 'Two of the most exclusive private clubs in north Scottsdale, both with $250K+ initiation and sponsorship requirements.',
    verdict: 'Silverleaf has the mountain views and the polish of the larger DC Ranch ecosystem. Estancia is more secluded, smaller in membership count, and architecturally more restrained.'
  },
  {
    slug: 'mirabel-vs-desert-mountain',
    a: 'mirabel', b: 'desert-mountain',
    intent: 'Single-course private (Mirabel) vs. seven-course private (Desert Mountain): different price points, different community sizes.',
    verdict: 'Mirabel fits buyers who want a tight-knit single-course club with lower initiation (~$150K) and shorter waitlists. Desert Mountain fits buyers who want maximum golf variety and the largest member roster.'
  }
];

export function findComparisonPair(slug) {
  return COMPARISON_PAIRS.find(p => p.slug === slug);
}

// Lead magnets
export const LEAD_MAGNETS = [
  {
    slug: 'scottsdale-buyers-guide-2026',
    title: 'The Scottsdale Golf-Home Buyer\u2019s Guide 2026',
    subtitle: 'The insider playbook buyers pay hourly relocation consultants for: condensed into 11 actionable pages',
    description: 'An 11-page guide covering everything you need to know about buying a luxury golf home in Scottsdale in 2026: communities, taxes, club memberships, market data, and a relocation timeline.',
    cover: '/images/guides/scottsdale-buyers-guide-2026.webp',
    chapters: [
      'Chapter 1: The 14 Scottsdale golf communities ranked',
      'Chapter 2: Club membership economics & sponsorship math',
      'Chapter 3: Arizona tax & residency playbook for snowbirds',
      'Chapter 4: Pre-list inspection checklist (saves $20K on negotiations)',
      'Chapter 5: A 60-day relocation timeline, step by step',
      'Chapter 6: 2026 market forecast by community',
      'Chapter 7: Mortgage lender shortlist (jumbo and luxury-second-home specialists)',
      'Chapter 8: Off-market acquisition: how the top 5% of buyers source deals'
    ]
  }
];

// MongoDB helpers (ensureSeeded, getListingsFromDb) live in lib/data-server.js
// so this file stays safe to import from client components.

// One-time script: produce a printable PDF per La Quinta private club.
//   node scripts/build-community-guides.js
// Output: /public/downloads/community-guide-<slug>.pdf
//
// Editorial guardrails (do not violate):
//   • No fabricated initiation fees, dues, or transaction prices.
//   • No celebrity-residence claims.
//   • No testimonials or quotes.
//   • Always end with the independent-guide disclaimer.

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const SITE   = 'La Quinta Golf Lifestyle';
const NAVY   = '#1F3A2E';
const GOLD   = '#C8A24A';
const SAND   = '#FAF6EE';
const INK    = '#1A1714';
const MUTED  = '#7A6E60';

const DISCLAIMER = `${SITE} is an independent, ad-supported guide. It is not a brokerage and does not list homes for sale. Estimates are not appraisals. Verify any figure with the club, with a licensed California real estate professional, and with counsel before transacting.`;

const communities = [
  {
    slug: 'the-madison-club', name: 'The Madison Club', city: 'La Quinta, CA', architect: 'Tom Fazio',
    intro: 'A Tom Fazio routing inside one of the most architecturally consistent private golf communities in the Coachella Valley.',
    glance: ['Architect: Tom Fazio', 'Course: 18-hole private', 'Style: Wide fairways, framed views', 'Membership: Equity, by invitation', 'Real estate: Custom estates on large lots'],
    why: ['Fazio routing built around mountain view corridors rather than visual intimidation.', 'Strict community design code keeps the streetscape architecturally cohesive.', 'Small membership cap produces low tee-sheet pressure year-round.', 'Privacy-first culture — no resort play, no daily-fee access, no marketed roster.'],
    golf: ['Confirm tee-sheet booking windows for members and guests.', 'Ask about caddie program scope and availability.', 'Inspect the overseed transition timing for your travel calendar.'],
    club: 'Membership is equity and historically by invitation. Initiation, dues, and transfer terms are not publicly disclosed and change — confirm directly with the membership office.',
    realEstate: 'Lot sizes are large by Coachella Valley standards. Architectural language is dominated by contemporary California and modern Spanish-Mediterranean custom estates. No condos. No fairway villas. Inventory turns slowly — working with a California-licensed agent who has closed inside the community within the last two seasons is the practical baseline.',
    fits: ['Snowbird buyer prioritizing privacy and architectural cohesion', 'Primary-resident buyer wanting a Fazio routing with low daily play pressure', 'Estate-scale buyer who values community design control'],
    next: ['Visit the property with a sponsoring member or via your agent', 'Request a current membership-services summary in writing', 'Pull post-Prop-13 reassessment math on any home you tour'],
  },
  {
    slug: 'the-hideaway', name: 'The Hideaway', city: 'La Quinta, CA', architect: 'Pete Dye & Clive Clark',
    intro: 'Two distinct 18-hole routings — Pete Dye and Clive Clark — behind a single private gate. 36 holes; one membership.',
    glance: ['Architects: Pete Dye · Clive Clark', 'Course: Two 18-hole private courses', 'Style: Strategic (Dye) + playable (Clark)', 'Membership: Equity', 'Real estate: Custom estates + fairway homes'],
    why: ['Rare 36-hole footprint behind a single gate.', 'Two distinct design philosophies playable on the same membership.', 'Mid-scale community size, tighter than PGA West, larger than Madison.', 'No resort play — member-and-guest only.'],
    golf: ['Try both courses before committing — they play very differently.', 'Ask about course-rotation patterns through peak season.', 'Confirm member-guest cap rules for tournament weeks.'],
    club: 'Equity membership with a defined cap. Initiation and dues are not published — verify directly. The membership skews seasonal and active-golfer.',
    realEstate: 'Predominantly custom-built single-family estates plus a secondary band of fairway homes on more modest lots. Architectural language leans contemporary California with Spanish-Mediterranean accents.',
    fits: ['Active golfer who wants two distinct courses behind one gate', 'Snowbird buyer wanting privacy without losing course variety'],
    next: ['Walk both courses before deciding', 'Request the current member-handbook excerpt covering tee-sheet rules', 'Verify the architectural review process for any planned renovation'],
  },
  {
    slug: 'pga-west', name: 'PGA West', city: 'La Quinta, CA', architect: 'Pete Dye · Jack Nicklaus · Greg Norman · Tom Weiskopf',
    intro: 'Six 18-hole courses by four major architects, multiple membership tiers, and the broadest real-estate price band in La Quinta.',
    glance: ['Architects: Dye, Nicklaus, Norman, Weiskopf', 'Courses: Six 18-hole routings', 'Membership: Multiple tiers including non-resident', 'Real estate: Condos to estate homes', 'Founded: 1986'],
    why: ['Six courses on one property — unmatched in the valley.', 'PGA Tour event (The American Express) on the calendar.', 'The only La Quinta private with a multi-tier membership including non-resident options.', 'Entry-level condo inventory that does not exist in newer La Quinta privates.'],
    golf: ['Decide whether you want private-only or resort-accessible play.', 'Tour each course — the Dye Stadium and the Nicklaus Tournament play very differently.', 'Verify your preferred tier\u2019s access pattern in writing.'],
    club: 'Multi-tier membership structure with resident, non-resident, social, and several variants. Current pricing and access rules change — confirm directly.',
    realEstate: 'Widest price band of any La Quinta private community by a large margin. From one-bedroom condos in older sections to estate homes on the southern side. Sub-neighborhood selection materially affects daily experience.',
    fits: ['First-time La Quinta golf buyer testing the lifestyle', 'Non-resident buyer who needs membership flexibility', 'Buyer wanting course variety and broad amenity scale'],
    next: ['Pick the tier before you pick the home', 'Ask for HOA and special-assessment history on any older condo', 'Confirm tournament-week play patterns'],
  },
  {
    slug: 'the-tradition-golf-club', name: 'The Tradition Golf Club', city: 'La Quinta, CA', architect: 'Arnold Palmer',
    intro: 'Arnold Palmer\u2019s only Coachella Valley design — walkable, mature, member-friendly. Tight equity membership.',
    glance: ['Architect: Arnold Palmer', 'Course: 18-hole private, walkable', 'Membership: Equity', 'Real estate: Custom estates + mid-scale single-family', 'Founded: 1997'],
    why: ['The only Arnold Palmer course in the Coachella Valley.', 'Routing intentionally designed to be walkable — rare in the desert.', 'Mature streetscape, settled feel, lower density than the newer La Quinta privates.', 'Member-friendly course profile — not chasing tournament difficulty.'],
    golf: ['Walk a round in the cool season before deciding.', 'Confirm caddie and walker policies for peak months.', 'Ask about pace-of-play targets.'],
    club: 'Equity membership with a modest cap. Social calendar exists but morning golf is the dominant rhythm. No resort play.',
    realEstate: 'Mix of estate-scale customs and more modest single-family homes from the late 1990s and early 2000s. Architectural language skews traditional Spanish-Mediterranean.',
    fits: ['Walkable-course-loving buyer', 'Snowbird seeking quieter rhythm than PGA West', 'Member-friendly play style over tournament drama'],
    next: ['Walk the routing in your shoes', 'Ask for membership category and waitlist details in writing'],
  },
  {
    slug: 'andalusia-country-club', name: 'Andalusia Country Club', city: 'La Quinta, CA', architect: 'Rees Jones',
    intro: 'A Rees Jones routing wrapped in tightly controlled modern Spanish-Mediterranean architecture.',
    glance: ['Architect: Rees Jones', 'Course: 18-hole private', 'Style: Modern championship traditional', 'Membership: Equity', 'Real estate: Modern Spanish-Mediterranean estates'],
    why: ['Newer-construction community — the most architecturally consistent newer-build private in La Quinta.', 'Rees Jones\u2019s Coachella Valley signature routing.', 'Strong family programming and active social calendar.', 'Tightly controlled exterior palettes and building heights.'],
    golf: ['Tour the practice facility — it is a community strength.', 'Confirm tee-sheet booking patterns.', 'Ask about junior programming if you have grandchildren.'],
    club: 'Equity membership. Family-skewed culture relative to Madison Club or Hideaway. Confirm initiation and dues directly with the membership office.',
    realEstate: 'Most homes are post-2005 custom builds with a smaller secondary band of fairway villas. Mid- to large-scale lots; tightly controlled architectural code.',
    fits: ['Family-oriented snowbird or primary buyer', 'Buyer wanting newer construction in a design-controlled community', 'Buyer who values active programming'],
    next: ['Visit during peak season to see the calendar in action', 'Ask for the design guidelines if you plan to renovate', 'Confirm Mello-Roos / CFD status on the parcel'],
  },
  {
    slug: 'the-quarry-at-la-quinta', name: 'The Quarry at La Quinta', city: 'La Quinta, CA', architect: 'Tom Fazio',
    intro: 'A Tom Fazio routing on a former rock quarry — vertical, intimate, very tight membership.',
    glance: ['Architect: Tom Fazio', 'Course: 18-hole private', 'Membership: Equity, very tight cap', 'Real estate: Custom estates, small inventory'],
    why: ['Fazio working against type — vertical and narrow, not wide and framed.', 'One of the tightest membership caps in the Coachella Valley.', 'No resort access.', 'Quarry-wall topography provides visual signature unmatched in the valley.'],
    golf: ['Walk the property to evaluate elevation work in person.', 'Confirm cart-required holes if mobility is a factor.'],
    club: 'Equity. Membership status changes — confirm directly. The community goes quiet in summer.',
    realEstate: 'Modest unit count, high per-lot value. Spanish-Mediterranean architectural language with significant 1990s–2000s vintage and a recent renovation wave.',
    fits: ['Snowbird buyer prioritizing privacy and topographic drama', 'Fazio enthusiast wanting the vertical idiom rather than the framed one'],
    next: ['Visit in cool-season daylight to evaluate the topography', 'Ask for resale comp context (inventory is thin)'],
  },
  {
    slug: 'la-quinta-country-club', name: 'La Quinta Country Club', city: 'La Quinta, CA', architect: 'Lawrence Hughes (1959)',
    intro: 'The original La Quinta club, founded 1959, walking distance to the Cove and Old Town. Mid-century neighborhood fabric.',
    glance: ['Architect: Lawrence Hughes', 'Course: 18-hole private', 'Style: Classic mid-century traditional', 'Membership: Equity', 'Real estate: Mid-century + classic Spanish, mature lots', 'Founded: 1959'],
    why: ['Oldest private club in the city; predates every other La Quinta private.', 'Walkable to Old Town and the Cove — unique among La Quinta privates.', 'Multi-generational membership culture.', 'Most accessible historical initiation tier among La Quinta privates — verify current.'],
    golf: ['Walk the routing — it is intentionally short and shaded.', 'Ask about restoration history.'],
    club: 'Equity membership with active social and family programming. Confirm current initiation, dues, and waitlist directly.',
    realEstate: 'Most architecturally varied streetscape of the seven La Quinta privates. Mid-century single-story originals, classic Spanish-Mediterranean, and recent custom remodels. Mature landscaping is dominant.',
    fits: ['Walkability-prioritizing primary or seasonal buyer', 'Family / multi-generational buyer', 'Mid-century / Old Town fabric enthusiast'],
    next: ['Walk the neighborhood on a Saturday morning', 'Verify HOA and parcel-level tax history with the agent'],
  },
];

function drawPage(doc, c) {
  // ---- Cover ----
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(SAND);
  doc.fillColor(GOLD).fontSize(10).font('Helvetica-Bold').text('LA QUINTA, CALIFORNIA', 56, 64, { characterSpacing: 4 });
  doc.fillColor(NAVY).fontSize(38).font('Times-Roman').text(c.name, 56, 96, { width: 480 });
  doc.fillColor(MUTED).fontSize(12).font('Helvetica').text(`${c.city} · ${c.architect}`, 56, doc.y + 6);
  doc.fillColor(INK).fontSize(13).font('Times-Roman').text(c.intro, 56, doc.y + 22, { width: 480, lineGap: 4 });
  doc.fillColor(NAVY).rect(56, doc.y + 24, 80, 2).fill(GOLD);
  doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(`${SITE} · Owner and creator: Brandi Jo Newman`, 56, doc.page.height - 70, { characterSpacing: 1 });
  doc.addPage();

  // ---- At a Glance ----
  section(doc, 'At a Glance');
  c.glance.forEach((g) => bullet(doc, g));
  spacer(doc);

  // ---- Why this community ----
  section(doc, 'Why this community');
  c.why.forEach((w) => bullet(doc, w));
  spacer(doc);

  // ---- The Golf ----
  section(doc, 'The Golf');
  body(doc, `Architect: ${c.architect}.`);
  body(doc, 'Practical questions to ask on your first visit:');
  c.golf.forEach((g) => bullet(doc, g));
  spacer(doc);

  // ---- The Club ----
  section(doc, 'The Club');
  body(doc, c.club);
  body(doc, 'No fee numbers are printed in this guide. Verify all financial terms directly with the membership office.');
  spacer(doc);

  // ---- The Real Estate ----
  section(doc, 'The Real Estate');
  body(doc, c.realEstate);
  spacer(doc);

  // ---- Who it fits ----
  section(doc, 'Who it fits');
  c.fits.forEach((f) => bullet(doc, f));
  spacer(doc);

  // ---- Next Steps ----
  section(doc, 'Next Steps');
  c.next.forEach((n) => bullet(doc, n));
  spacer(doc);

  // ---- Disclaimer ----
  if (doc.y > doc.page.height - 140) doc.addPage();
  doc.moveTo(56, doc.y + 6).lineTo(doc.page.width - 56, doc.y + 6).strokeColor(GOLD).lineWidth(1).stroke();
  doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(DISCLAIMER, 56, doc.y + 18, { width: doc.page.width - 112, lineGap: 3 });
}

function section(doc, title) {
  if (doc.y > doc.page.height - 200) doc.addPage();
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10).text(title.toUpperCase(), 56, doc.y + 4, { characterSpacing: 3 });
  doc.fillColor(NAVY).font('Times-Roman').fontSize(22).text(title, 56, doc.y + 4);
  doc.moveDown(0.6);
}
function bullet(doc, txt) {
  if (doc.y > doc.page.height - 100) doc.addPage();
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11).text('•', 60, doc.y, { continued: false });
  const y = doc.y - 14;
  doc.fillColor(INK).font('Times-Roman').fontSize(12).text(txt, 76, y, { width: doc.page.width - 132, lineGap: 3 });
  doc.moveDown(0.4);
}
function body(doc, txt) {
  if (doc.y > doc.page.height - 100) doc.addPage();
  doc.fillColor(INK).font('Times-Roman').fontSize(12).text(txt, 56, doc.y, { width: doc.page.width - 112, lineGap: 3 });
  doc.moveDown(0.6);
}
function spacer(doc) { doc.moveDown(0.6); }

for (const c of communities) {
  const outPath = path.join(OUT_DIR, `community-guide-${c.slug}.pdf`);
  const doc = new PDFDocument({ size: 'LETTER', margin: 56, info: { Title: `${c.name} — La Quinta`, Author: 'Brandi Jo Newman, owner and creator', Subject: `${c.name} Guide`, Producer: SITE } });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);
  drawPage(doc, c);
  doc.end();
  stream.on('finish', () => console.log('wrote', outPath));
}

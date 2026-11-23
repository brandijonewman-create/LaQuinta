/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/build-community-guides.js
//
// Generates one community-guide PDF per featured Scottsdale community and
// writes it to /public/downloads/community-guide-<slug>.pdf.
//
// Run once (and re-run whenever the community data changes):
//   node scripts/build-community-guides.js
//
// Hard editorial rules enforced here:
//   — No fake testimonials, no fabricated quotes.
//   — No specific membership fees / initiation / dues / transaction prices.
//   — No celebrity-residence claims.
//   — The word "editorial" does not appear in any user-facing copy.
//   — Disclaimer at the end identifies the site as an independent guide.

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Brand palette (matches the navy + gold the site uses).
const NAVY  = '#062840';
const GOLD  = '#BA9273';
const SAND  = '#fbf8f2';
const MUTED = '#5b6b7a';
const BORDER = '#e5d9c4';

// Featured communities + the practical facts each guide should surface.
// Architecture, geography, club model = publicly observable. No fees.
const COMMUNITIES = [
  {
    slug: 'silverleaf', name: 'Silverleaf', town: 'North Scottsdale, AZ',
    architect: 'Tom Weiskopf',
    intro: 'A Tom Weiskopf signature carved into the western flank of the McDowell Mountains. Silverleaf is the prestige answer to the question “which North-Scottsdale guard-gated community has the most serious estate inventory and the most-photographed course?”',
    glance: ['Region: central 101 corridor', 'Club model: equity-private with strong tour-adjacent visibility', 'Footprint: estate-scale custom homes', 'Best fit: primary or four-season residence; less common for short-term snowbird use'],
    why: 'Silverleaf is the community most often shortlisted by buyers whose previous home was in Beverly Park, Bel Air, or a major Hamptons enclave. The architectural review process is unusually rigorous; the resulting streetscape reads as a single curated estate corridor rather than a patchwork.',
    golf: ['Tom Weiskopf design — his strongest in Arizona by consensus', 'Member-only equity course — not a public-play option', 'Practice facility is among the largest in the state', 'Walkability of routing is moderate; carts standard'],
    clubBlurb: 'Silverleaf Club is equity-driven and member-owned. Specific initiation, dues, and capital commitments are set by the membership office and change over time — verify directly with the club.',
    realEstate: 'Estate-scale lots, mostly custom homes. Inventory tends to be limited and turn-over is slow relative to neighboring communities. New construction continues in select sub-corridors. Resale typically transacts off-market or via designated brokers.',
    fits: 'Strongest fit for a primary or four-season buyer who values architectural restraint, a member-owned club, and a recognized name. Less obvious fit for a casual seasonal buyer who wants resort-style amenity density.'
  },
  {
    slug: 'dc-ranch', name: 'DC Ranch', town: 'North Scottsdale, AZ',
    architect: 'Scott Miller',
    intro: 'A storied modern community at the base of the McDowells with the broadest amenity mix in central Scottsdale. DC Ranch is the answer to the question “which community has the best combination of family infrastructure, equity-club access, and walkable retail?”',
    glance: ['Region: central 101 corridor', 'Club model: equity Country Club, plus a separate social club (The Homestead)', 'Footprint: mixed — custom estate corridors plus product-luxury neighborhoods', 'Best fit: primary residence with strong school + lifestyle anchors'],
    why: 'DC Ranch wins on amenity density. Tennis, swim, pickleball, fitness, kids’ programming, and on-property dining all sit inside the community. Market Street — the on-property retail spine — is one of the few genuinely walkable luxury village centers in metro Phoenix.',
    golf: ['Scott Miller-designed 36-hole equity course (Sunrise + Sunset)', 'Member-only access — not a public-play option', 'Walkability is moderate; routing wraps the central residential corridor'],
    clubBlurb: 'DC Ranch Country Club is equity-based and member-owned. The Homestead is a separate non-golf social club. Fee structures, joining minimums, and waitlist status are managed by each club’s membership office.',
    realEstate: 'A genuinely mixed footprint — the Country Club sub-area runs to estate scale, while several other DC Ranch neighborhoods offer single-family production-luxury and townhome product. Inventory rotates more actively than in the most exclusive nearby communities.',
    fits: 'Strongest fit for primary-residence buyers who want school access, walkable retail, and the option to opt into a serious club without being forced into one. Snowbird buyers do live here; investor / rental fit is weaker due to HOA conventions.'
  },
  {
    slug: 'desert-mountain', name: 'Desert Mountain', town: 'Scottsdale (85262), AZ',
    architect: 'Jack Nicklaus (six championship courses + one short course)',
    intro: 'The largest concentration of Jack Nicklaus-designed golf in the world inside a single private community. Desert Mountain is the answer to the question “if I want serious club golf with multiple course choices, where do I go?”',
    glance: ['Region: far-north ridge', 'Club model: equity-private, multi-course', 'Footprint: estate-scale, several thousand homes', 'Best fit: serious-golf primary or four-season buyer; strong for active retirees'],
    why: 'No other Scottsdale community comes close to the scale of golf optionality here. Members rotate across six full-length courses plus a popular par-3 short course (No. 7). The community also runs a full amenity program — tennis, pickleball, fitness, hiking trail network, dining.',
    golf: ['Six Nicklaus-designed championship courses (Renegade, Cochise, Geronimo, Apache, Chiricahua, Outlaw)', 'Members rotate access; tee-time choice is part of the value proposition', 'Hosts the PGA TOUR Champions’ Charles Schwab Cup Championship (Cochise)', 'Substantial elevation; walking varies by course'],
    clubBlurb: 'Desert Mountain Club is equity-based and member-owned. Initiation, dues, and capital obligations are managed by the membership office and have changed multiple times historically; verify current numbers directly.',
    realEstate: 'Estate-scale lots across many sub-villages with materially different character (e.g., Apache, Cochise, Geronimo, Saguaro Forest, the Upper Canyon). Custom homes dominate; production luxury exists in newer phases. Listings typically transact through brokers who specialize in the community.',
    fits: 'Strongest fit for buyers whose central question is “how much golf do I get and how good is it?” Less obvious fit for buyers who want Sky Harbor in under 30 minutes or Old-Town walkability.'
  },
  {
    slug: 'estancia', name: 'Estancia', town: 'Scottsdale (85262), AZ',
    architect: 'Tom Fazio',
    intro: 'A small, low-density Tom Fazio masterpiece at the base of Pinnacle Peak. Estancia is the answer to the question “which North-Scottsdale club regularly tops the state private-course rankings, and what does it feel like to live there?”',
    glance: ['Region: far-north ridge', 'Club model: equity-private, intentionally quiet', 'Footprint: estate-scale, low home count', 'Best fit: primary or four-season buyer who prizes privacy and architectural restraint'],
    why: 'The course is widely cited as Tom Fazio’s strongest desert work. The community is small by design — a few hundred homes — and the culture is intentionally restrained. The dining room reads as a private supper-club rather than a campus.',
    golf: ['Tom Fazio championship layout', 'Equity-member-only — no public play', 'Routing uses Pinnacle Peak as a near-constant backdrop'],
    clubBlurb: 'Estancia Club is equity-based and member-owned. Membership inventory is constrained by the size of the community. Specific fee structures — verify directly with the membership office.',
    realEstate: 'Estate-scale custom homes on substantial lots. The total inventory is small, which can make timing the buy a multi-quarter exercise. Specialty brokers handle most resales.',
    fits: 'Strongest fit for buyers who explicitly do not want a campus / amenity-heavy club. Less obvious fit for families with school-age children who need walkable peer density.'
  },
  {
    slug: 'whisper-rock', name: 'Whisper Rock', town: 'Scottsdale (85266), AZ',
    architect: 'Phil Mickelson + Gary Stephenson (Upper) and Tom Fazio (Lower)',
    intro: 'Two distinctly different courses inside a single intentionally quiet club. Whisper Rock is widely associated with PGA Tour professionals who keep practice homes nearby, and the daily culture reflects that operating reality.',
    glance: ['Region: far-north ridge', 'Club model: equity-private, low-key', 'Footprint: estate-scale, low-density', 'Best fit: serious-player primary or four-season buyer'],
    why: 'Two championship courses with materially different design vocabularies under one membership. The Upper (Mickelson) plays as a player-architect modern; the Lower (Fazio) plays as a more classical desert routing. The clubhouse program is intentionally light.',
    golf: ['Upper Course: Phil Mickelson & Gary Stephenson', 'Lower Course: Tom Fazio', 'Both equity-member-only', 'Practice infrastructure is unusually deep'],
    clubBlurb: 'Whisper Rock is equity-based and member-owned. Membership is constrained; the club has a reputation for being privacy-protective. Verify any specific commitment numbers with the membership office.',
    realEstate: 'Estate-scale custom homes on large lots. Inventory turns slowly. Some homeowners are not members of the club; the buyer should not assume a home purchase delivers membership.',
    fits: 'Strongest fit for buyers who care about practice infrastructure and prefer a quiet club culture. Less obvious fit for buyers who want a multi-amenity campus.'
  },
  {
    slug: 'grayhawk', name: 'Grayhawk', town: 'North Scottsdale, AZ',
    architect: 'Tom Fazio (Raptor) and David Graham + Gary Panks (Talon)',
    intro: 'A daily-fee-anchored master-planned community in the heart of central Scottsdale, with two championship courses that double as host venues for NCAA D-I championships. Grayhawk is the answer to “which community gives me good golf access without forcing me into an equity club commitment?”',
    glance: ['Region: central 101 corridor', 'Club model: daily-fee public-access golf; community itself is HOA-only', 'Footprint: mixed — production-luxury, smaller custom, some larger estates', 'Best fit: primary, snowbird, or investor'],
    why: 'Grayhawk is the broad-access answer in the North-Scottsdale luxury map. The two courses are publicly playable. The community itself is HOA-only — there is no equity-club commitment tied to home ownership.',
    golf: ['Raptor (Tom Fazio): host of the NCAA D-I Men’s and Women’s Championships', 'Talon (David Graham + Gary Panks): the famous par-3 11th over a saguaro ravine', 'Public-play; tee-time priority varies by status'],
    clubBlurb: 'Grayhawk is not an equity-club model. Home ownership confers community HOA membership; golf is paid per round or via a separate Players Card. The club retains full public-play access.',
    realEstate: 'Mixed inventory: condominiums and townhomes at the lower price end, single-family product-luxury through the broad mid-band, and a smaller pool of larger custom homes. Resale turnover is more active than in equity-only neighbors.',
    fits: 'Strongest fit for buyers who want a name-brand golf address without an equity-club commitment. Strong fit for snowbird and investor profiles given the active rental market and the public-play golf.'
  },
  {
    slug: 'mirabel', name: 'Mirabel', town: 'Scottsdale (85266), AZ',
    architect: 'Jack Nicklaus (Signature)',
    intro: 'A quiet Jack Nicklaus-signature club tucked into the far-north Scottsdale desert. Mirabel is the answer to “which community delivers a serious Nicklaus signature without the scale of Desert Mountain?”',
    glance: ['Region: far-north ridge', 'Club model: equity-private, deliberately small', 'Footprint: estate-scale, low home count', 'Best fit: primary or four-season buyer'],
    why: 'A walkable Nicklaus routing inside a small equity club is a rare combination. Mirabel has built its identity around restraint — fewer members, fewer events, a quieter clubhouse calendar.',
    golf: ['Single Nicklaus Signature course', 'Walkable routing — a feature in desert golf', 'Equity-member-only'],
    clubBlurb: 'Mirabel Club is equity-based and member-owned. Fee structures are managed by the membership office.',
    realEstate: 'Estate-scale custom homes on large lots. Inventory is constrained by the size of the community.',
    fits: 'Strongest fit for buyers who want a single great course inside an intentionally small community. Less obvious fit for buyers who want a multi-course rotation.'
  },
  {
    slug: 'troon-north', name: 'Troon North', town: 'North Scottsdale, AZ',
    architect: 'Tom Weiskopf and Jay Morrish',
    intro: 'Two championship desert courses run as a public-access club, surrounded by one of the most established luxury master-planned communities in north Scottsdale. Troon North is the answer to “which north-Scottsdale corridor combines bold-visual desert golf with broad-access housing?”',
    glance: ['Region: far-north ridge', 'Club model: daily-fee public-access; no on-site equity club tied to home ownership', 'Footprint: mixed — production-luxury through estate', 'Best fit: primary, snowbird, or investor'],
    why: 'The Monument and Pinnacle courses are visually iconic — the boulder-bisected par-4 third on Monument is one of the most-photographed holes in Arizona. The surrounding community is broad and well-established, with a mature streetscape.',
    golf: ['Monument Course: Tom Weiskopf + Jay Morrish (1990)', 'Pinnacle Course: Tom Weiskopf (1996)', 'Public-play; resort partners offer stay-and-play packages'],
    clubBlurb: 'Troon North Golf Club is daily-fee public-access. No equity-club commitment attaches to home ownership in the community.',
    realEstate: 'Mixed footprint across many sub-neighborhoods (e.g., Pinnacle Canyon, Talus, Boulder Heights). Inventory is broader than in the equity-only neighbors; resale turnover is more active.',
    fits: 'Strongest fit for buyers who want a name-brand course without an equity-club commitment, or for investor / rental profiles. Less obvious fit for buyers who want a private members-only environment.'
  },
  {
    slug: 'boulders', name: 'The Boulders', town: 'Carefree, AZ',
    architect: 'Jay Morrish',
    intro: 'A resort-anchored community at the geological edge of metro Phoenix, where 12-million-year-old granite outcrops define both the courses and the architecture. The Boulders is the answer to “which Scottsdale-area community delivers a dramatic, low-density setting without going to estate-only scale?”',
    glance: ['Region: Fountain Hills / Carefree edge', 'Club model: resort club; public-play available', 'Footprint: mixed — patio homes through custom estates', 'Best fit: snowbird or primary; strong for rental'],
    why: 'The Boulders is one of the few communities where the natural geology genuinely dominates the architecture. The Curt Rosenberger-led architectural language uses the boulder outcrops as wall material and orienting features.',
    golf: ['North Course: Jay Morrish (1984)', 'South Course: Jay Morrish (1985)', 'Resort club — public-play access via the Waldorf Astoria resort'],
    clubBlurb: 'The Boulders Club is resort-affiliated. Membership tiers and the relationship to home ownership vary; verify current structure with the club.',
    realEstate: 'Materially mixed: patio homes and casitas at the lower entry, mid-scale single-family homes, and a smaller pool of custom estates. Inventory rotates actively.',
    fits: 'Strongest fit for snowbird buyers who want a turn-key resort connection. Strong fit for investor / rental profiles. Less obvious fit for buyers who want an equity-club commitment.'
  },
  {
    slug: 'mccormick-ranch', name: 'McCormick Ranch', town: 'Central Scottsdale, AZ',
    architect: 'Desmond Muirhead',
    intro: 'The original Scottsdale resort community, anchored by Desmond Muirhead’s 1972 Palm and Pine courses. McCormick Ranch is the answer to “which central-Scottsdale community offers true golf-course living at materially lower entry pricing than the far-north prestige enclaves?”',
    glance: ['Region: old-Scottsdale resort core', 'Club model: public-access; no equity club tied to home ownership', 'Footprint: mixed — townhome through single-family estate', 'Best fit: snowbird, primary at entry tier, or investor'],
    why: 'The mature 1970s landscape — imported palms, broad lakes, established trees — is genuinely different from the desert-modern aesthetic of the newer north-corridor communities. The price band is broader and lower than the far-north neighbors.',
    golf: ['Palm Course: Desmond Muirhead (1972) — the original imported-palm resort course in Arizona', 'Pine Course: Desmond Muirhead — hosted the LPGA Standard Register Ping for 14 years', 'Both public-access'],
    clubBlurb: 'McCormick Ranch is public-access; ownership does not include an equity-club commitment. Stay-and-play packages run through the on-property resort partners.',
    realEstate: 'The broadest footprint in this guide: townhomes, condominiums, single-family homes through mid-scale lakefront and golf-frontage estates. Inventory is actively traded.',
    fits: 'Strongest fit for budget-conscious snowbird and primary-residence buyers, and for investor profiles. Less obvious fit for buyers who want estate scale.'
  },
  {
    slug: 'gainey-ranch', name: 'Gainey Ranch', town: 'Central Scottsdale, AZ',
    architect: 'Brad Benz and Mike Poellot (three nines)',
    intro: 'A central-Scottsdale guard-gated community wrapped around 27 holes (Lakes / Arroyo / Dunes), with one of the highest concentrations of resort and dining amenity in the city. Gainey Ranch is the answer to “which central-Scottsdale community combines guard-gated infrastructure with serious walkability?”',
    glance: ['Region: old-Scottsdale resort core', 'Club model: equity-community-affiliated', 'Footprint: mixed — patio through single-family estate', 'Best fit: snowbird or primary; strong walking-to-coffee profile'],
    why: 'The Hyatt Regency Gainey Ranch sits at the community spine, which makes the dining and event amenity unusually deep. The 27-hole course wraps the central residential corridor; lot orientation matters more here than in most communities.',
    golf: ['Three nines: Lakes, Arroyo, Dunes — Brad Benz + Mike Poellot', 'Equity-community-affiliated club', 'Walkable routing'],
    clubBlurb: 'Gainey Ranch Golf Club is equity-affiliated with the community. Fee structures and membership categories are managed by the club office.',
    realEstate: 'Genuinely mixed: patio-home product, single-family homes, and a smaller pool of larger custom homes on lake or course frontage.',
    fits: 'Strongest fit for snowbird buyers who want walkable resort amenities. Strong fit for primary buyers who want guard-gated infrastructure without committing to far-north geography.'
  },
  {
    slug: 'sereno-canyon', name: 'Sereno Canyon', town: 'North Scottsdale, AZ',
    architect: 'No on-site course — Pinnacle Peak / Troon corridor access nearby',
    intro: 'A newer guard-gated community built on a dramatic north-Scottsdale parcel adjacent to the McDowell Sonoran Preserve. Sereno Canyon is the answer to “which newer community gets me modern construction, low density, and serious view corridors without forcing me onto an equity-club roster?”',
    glance: ['Region: Fountain Hills / Carefree edge (geographically north-Scottsdale)', 'Club model: lifestyle club (no on-site course); golf access through nearby clubs and daily-fee venues', 'Footprint: estate-scale custom homes', 'Best fit: primary or four-season buyer who values views and modern construction'],
    why: 'No on-site course means no club commitment tied to ownership — the buyer keeps their golf life separate. The community itself focuses on a Mountain Club (pool, fitness, social) and view-corridor architecture. Several flagship developers operate inside Sereno Canyon.',
    golf: ['No on-site course', 'Nearby public-access: Troon North (Monument, Pinnacle), Boulders', 'Nearby private-club access: Pinnacle Peak, Whisper Rock, Mirabel (by individual membership)'],
    clubBlurb: 'Sereno Canyon’s on-site Mountain Club is a lifestyle / amenity club (no golf). Golf access is a separate decision the buyer makes on their own.',
    realEstate: 'Estate-scale custom homes built since the mid-2010s. Inventory is constrained relative to mature communities. Several flagship custom-builders operate in the community.',
    fits: 'Strongest fit for buyers who want modern construction + serious view corridors + the freedom to choose their golf life separately. Less obvious fit for buyers who want an integrated on-site course.'
  }
];

function buildPdf(c) {
  const filename = `community-guide-${c.slug}.pdf`;
  const outPath = path.join(OUT_DIR, filename);
  const doc = new PDFDocument({ size: 'LETTER', margins: { top: 64, bottom: 64, left: 64, right: 64 } });
  doc.pipe(fs.createWriteStream(outPath));

  // ---------- Cover ----------
  doc.rect(0, 0, doc.page.width, 220).fill(NAVY);
  doc.fillColor('#fde68a').font('Helvetica-Bold').fontSize(11).text('SCOTTSDALE GOLF LIFESTYLE', 64, 56, { characterSpacing: 3 });
  doc.moveTo(64, 78).lineTo(190, 78).strokeColor(GOLD).lineWidth(1.5).stroke();
  doc.fillColor('#fde68a').font('Times-Roman').fontSize(11).text('COMMUNITY GUIDE', 64, 92, { characterSpacing: 2 });
  doc.fillColor('#fde68a').font('Times-Bold').fontSize(34).text(c.name, 64, 116, { width: doc.page.width - 128 });
  doc.fillColor('#fde68a').font('Times-Italic').fontSize(13).text(c.town, 64, 164);
  doc.fillColor('#fde68a').font('Times-Roman').fontSize(11).text(`Course architect: ${c.architect}`, 64, 184);

  doc.fillColor(NAVY).font('Times-Roman').fontSize(12);
  doc.moveDown(2);
  doc.y = 250;
  doc.text(c.intro, { align: 'left', lineGap: 4 });

  // ---------- At a glance ----------
  doc.moveDown(1.4);
  sectionHeading(doc, 'At a glance');
  c.glance.forEach(g => bullet(doc, g));

  // ---------- Why this community ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'Why this community');
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(c.why, { lineGap: 3 });

  // ---------- The golf ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'The golf');
  c.golf.forEach(g => bullet(doc, g));
  doc.moveDown(0.4);
  doc.fillColor(MUTED).font('Times-Italic').fontSize(10.5).text('Questions to ask the membership office: walkability, pace-of-play, peak-season tee-time priority, guest-pass policy, and whether course access is open to non-resident members.', { lineGap: 3 });

  // ---------- The club ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'The club');
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(c.clubBlurb, { lineGap: 3 });
  doc.moveDown(0.3);
  doc.fillColor(MUTED).font('Times-Italic').fontSize(10.5).text('We never publish specific initiation, dues, or capital-contribution numbers. The membership office is the only authoritative source.', { lineGap: 3 });

  // ---------- Real estate ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'The real estate');
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(c.realEstate, { lineGap: 3 });

  // ---------- Who it fits ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'Who it fits');
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(c.fits, { lineGap: 3 });

  // ---------- Next steps ----------
  if (doc.y > doc.page.height - 220) doc.addPage();
  doc.moveDown(0.8);
  sectionHeading(doc, 'Next steps');
  bullet(doc, `Walk the course (or play a tee-time if access permits) before committing to a home.`);
  bullet(doc, `Contact the membership office directly for current fee structures and waitlist status.`);
  bullet(doc, `Pair this guide with the runner-up communities the quiz surfaced — the right Scottsdale community is often the second or third option for many buyers.`);
  bullet(doc, `Read the full deep-dive at scottsdalegolflifestyle.com/communities/${c.slug}.`);

  // ---------- Disclaimer ----------
  doc.moveDown(1.0);
  doc.strokeColor(BORDER).lineWidth(0.8).moveTo(64, doc.y).lineTo(doc.page.width - 64, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fillColor(MUTED).font('Times-Italic').fontSize(9.5).text('Scottsdale Golf Lifestyle is an independent, ad-supported guide. It is not a brokerage and does not list homes for sale. Estimates are not appraisals. Verify any figure with the club, with a licensed local real estate professional, and with counsel before transacting.', { lineGap: 3, align: 'justify' });

  doc.end();
  return outPath;
}

function sectionHeading(doc, text) {
  if (doc.y > doc.page.height - 140) doc.addPage();
  doc.moveDown(0.2);
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10).text(text.toUpperCase(), { characterSpacing: 2 });
  doc.moveTo(64, doc.y + 2).lineTo(64 + 36, doc.y + 2).strokeColor(GOLD).lineWidth(1.2).stroke();
  doc.moveDown(0.6);
  doc.fillColor(NAVY);
}

function bullet(doc, text) {
  if (doc.y > doc.page.height - 100) doc.addPage();
  const startX = 64;
  const indent = 14;
  doc.fillColor(GOLD).font('Times-Bold').fontSize(11).text('\u2022', startX, doc.y, { continued: false, lineBreak: false });
  const y0 = doc.y;
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(text, startX + indent, y0, { lineGap: 2, width: doc.page.width - (startX + indent) - 64 });
}

// ---------- Run ----------
let built = 0;
for (const c of COMMUNITIES) {
  try {
    const out = buildPdf(c);
    built++;
    console.log(`✓ ${path.basename(out)}`);
  } catch (e) {
    console.error(`✗ ${c.slug}: ${e.message}`);
  }
}
console.log(`\nBuilt ${built} of ${COMMUNITIES.length} community guides into ${OUT_DIR}`);

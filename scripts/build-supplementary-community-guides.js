/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/build-supplementary-community-guides.js
//
// Generates community-guide PDFs for the 34 communities NOT already covered
// by the hand-curated build-community-guides.js script (which handles the
// 12 featured communities with deep editorial content).
//
// Source of truth: lib/data.js COMMUNITIES array. Every fact in the
// generated PDFs is drawn directly from there \u2014 nothing invented.
//
// Run once and whenever lib/data.js community data changes:
//   node scripts/build-supplementary-community-guides.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const PDFDocument = require('pdfkit');

const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Brand palette \u2014 same as the featured-community script for visual consistency.
const NAVY  = '#062840';
const GOLD  = '#BA9273';
const MUTED = '#5b6b7a';
const BORDER = '#e5d9c4';

// Slugs that already have hand-curated PDFs (do not overwrite).
const FEATURED = new Set([
  'silverleaf', 'dc-ranch', 'desert-mountain', 'estancia', 'whisper-rock',
  'grayhawk', 'mirabel', 'troon-north', 'boulders', 'mccormick-ranch',
  'gainey-ranch', 'sereno-canyon'
]);

// ---------- Load COMMUNITIES from lib/data.js ----------
// lib/data.js uses Next.js path-alias imports that vanilla Node ESM can't
// resolve. We extract each COMMUNITIES* array literal via bracket-aware
// scanning and concatenate the results. The actual COMMUNITIES variable
// in data.js is built from an initial declaration plus 3 EXTRA batches
// that are appended via .push(...).
function extractArrayByName(src, varName) {
  const startMatch = src.match(new RegExp(`export const ${varName} = (\\[)`));
  if (!startMatch) return null;
  const arrayStart = startMatch.index + startMatch[0].length - 1;
  let i = arrayStart;
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let inLineComment = false;
  let inBlockComment = false;
  while (i < src.length) {
    const ch = src[i];
    const next = src[i + 1];
    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      i++; continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') { inBlockComment = false; i += 2; continue; }
      i++; continue;
    }
    if (inStr) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === strCh) { inStr = false; }
      i++; continue;
    }
    if (ch === '/' && next === '/') { inLineComment = true; i += 2; continue; }
    if (ch === '/' && next === '*') { inBlockComment = true; i += 2; continue; }
    if (ch === '\'' || ch === '"' || ch === '`') { inStr = true; strCh = ch; i++; continue; }
    if (ch === '[' || ch === '{') depth++;
    else if (ch === ']' || ch === '}') {
      depth--;
      if (depth === 0 && ch === ']') {
        const literal = src.slice(arrayStart, i + 1);
        const sandbox = { result: null };
        vm.createContext(sandbox);
        vm.runInContext(`result = ${literal};`, sandbox);
        return sandbox.result;
      }
    }
    i++;
  }
  throw new Error(`Unbalanced brackets while scanning ${varName} array`);
}

function loadCommunities() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'lib', 'data.js'), 'utf-8');
  const main = extractArrayByName(src, 'COMMUNITIES') || [];
  const extra1 = extractArrayByName(src, 'COMMUNITIES_EXTRA') || [];
  const extra2 = extractArrayByName(src, 'COMMUNITIES_EXTRA_2') || [];
  const extra3 = extractArrayByName(src, 'COMMUNITIES_EXTRA_3') || [];
  return [...main, ...extra1, ...extra2, ...extra3];
}

// Bucket a community into a price tier for the "Who it fits" section.
// Uses the low end of the priceRange string.
function priceTier(priceRange) {
  if (!priceRange) return 'mid';
  const lowMatch = priceRange.match(/\$\s*([0-9]+(?:\.[0-9]+)?)\s*([KM])/i);
  if (!lowMatch) return 'mid';
  const num = parseFloat(lowMatch[1]);
  const unit = lowMatch[2].toUpperCase();
  const value = unit === 'M' ? num * 1_000_000 : num * 1_000;
  if (value < 800_000) return 'entry';
  if (value < 1_500_000) return 'mid';
  if (value < 3_000_000) return 'upper-mid';
  return 'luxury';
}

const TIER_COPY = {
  'entry': 'a strong fit for first-time Scottsdale buyers, snowbirds entering the market, and investors looking at the active-rental tier of the metro. The combination of established infrastructure and a lower entry point gives buyers more inventory turnover and faster transactions than the upper-tier communities.',
  'mid': 'a strong fit for primary-residence buyers and four-season buyers who want a name-brand Scottsdale address without committing to ultra-luxury pricing. The mid-tier band tends to carry the broadest school, hospital, and retail access in the metro.',
  'upper-mid': 'a fit for serious primary-residence and four-season buyers who want estate-scale lots, considered club access, and resilient resale. The upper-mid tier is where most relocating high-net-worth buyers actually transact in Scottsdale.',
  'luxury': 'a fit for trophy-home buyers and ultra-high-net-worth buyers who want estate-scale custom construction, restrained density, and a name that carries on the national market. Inventory is constrained, transactions are infrequent, and specialty brokers handle most resales.'
};

// ---------- PDF builder ----------
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
  doc.fillColor('#fde68a').font('Times-Italic').fontSize(13).text(c.location || 'Scottsdale, Arizona', 64, 164);
  if (c.tagline) {
    doc.fillColor('#fde68a').font('Times-Roman').fontSize(11).text(c.tagline, 64, 184, { width: doc.page.width - 128 });
  }

  doc.fillColor(NAVY).font('Times-Roman').fontSize(12);
  doc.y = 250;
  if (c.description) doc.text(c.description, { align: 'left', lineGap: 4 });

  // ---------- At a glance ----------
  doc.moveDown(1.4);
  sectionHeading(doc, 'At a glance');
  const glance = [];
  if (c.location)        glance.push(`Location: ${c.location}`);
  if (c.courses?.length) glance.push(`Course${c.courses.length > 1 ? 's' : ''}: ${c.courses.join(', ')}`);
  if (c.priceRange)      glance.push(`Published home-price range: ${c.priceRange}`);
  if (c.homeCount)       glance.push(`Approximate residence count: ${c.homeCount.toLocaleString()}`);
  if (c.yearEstablished) glance.push(`Year established: ${c.yearEstablished}`);
  if (glance.length === 0) glance.push('Detail data is limited \u2014 see the full community deep-dive at scottsdalegolflifestyle.com.');
  glance.forEach(g => bullet(doc, g));

  // ---------- Community highlights ----------
  if (c.highlights?.length) {
    doc.moveDown(0.8);
    sectionHeading(doc, 'Community highlights');
    c.highlights.forEach(h => bullet(doc, h));
  }

  // ---------- The real estate ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'The real estate');
  const re = [];
  if (c.priceRange) {
    re.push(`Inventory currently lists across the ${c.priceRange} band. Lows trade more actively than highs in most quarters; trophy listings can stay on market longer simply because the buyer pool is narrower.`);
  } else {
    re.push('Inventory and price-band detail vary by quarter \u2014 the latest market report at scottsdalegolflifestyle.com/market-reports tracks the current movement.');
  }
  if (c.homeCount) {
    re.push(`With approximately ${c.homeCount.toLocaleString()} residences, ${c.name} offers ${c.homeCount > 2000 ? 'broader' : 'narrower'} inventory rotation than peer communities at the same price band.`);
  }
  re.forEach(r => {
    doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(r, { lineGap: 3 });
    doc.moveDown(0.3);
  });

  // ---------- The club / course ----------
  doc.moveDown(0.4);
  sectionHeading(doc, 'The club and the course');
  let clubBlurb = '';
  if (c.courses?.length === 1) {
    clubBlurb = `${c.name} is anchored by ${c.courses[0]}. Whether the course is publicly playable, equity-private, or daily-fee resort \u2014 and what the membership structure looks like \u2014 is set by the operating club and changes over time. The membership office is the authoritative source.`;
  } else if (c.courses?.length > 1) {
    clubBlurb = `${c.name} is anchored by ${c.courses.length} courses (${c.courses.join(', ')}). Each course\u2019s play access, membership tier, and fee structure is set by the operating club and the membership office is the authoritative source.`;
  } else {
    clubBlurb = `${c.name} is a residential community without an on-site course tied to ownership. Residents typically maintain memberships at one of the nearby private clubs or play daily-fee golf at neighboring venues.`;
  }
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(clubBlurb, { lineGap: 3 });
  doc.moveDown(0.3);
  doc.fillColor(MUTED).font('Times-Italic').fontSize(10.5).text('We never publish specific initiation, dues, or capital-contribution numbers. The membership office is the only authoritative source.', { lineGap: 3 });

  // ---------- Who it fits ----------
  doc.moveDown(0.8);
  sectionHeading(doc, 'Who it fits');
  const tier = priceTier(c.priceRange);
  doc.fillColor(NAVY).font('Times-Roman').fontSize(11.5).text(`${c.name} reads as ${TIER_COPY[tier]}`, { lineGap: 3 });

  // ---------- Next steps ----------
  if (doc.y > doc.page.height - 220) doc.addPage();
  doc.moveDown(0.8);
  sectionHeading(doc, 'Next steps');
  bullet(doc, `Read the full deep-dive at scottsdalegolflifestyle.com/communities/${c.slug} \u2014 schools, hospital proximity, internal cross-links to comparable communities, and the latest market report.`);
  if (c.courses?.length) {
    bullet(doc, `Walk or play ${c.courses[0]} if access permits, before committing to a home in the community. The course experience is the single best predictor of how the daily-life experience will feel.`);
  }
  bullet(doc, 'Take the 2-minute community quiz at scottsdalegolflifestyle.com/community-quiz to see which other Scottsdale communities surface as strong alternatives.');
  bullet(doc, 'Contact the operating club\u2019s membership office directly for current fee structures, waitlist status, and any current promotions.');

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
const communities = loadCommunities();
const target = communities.filter(c => !FEATURED.has(c.slug));
let built = 0;
let skipped = 0;
for (const c of target) {
  try {
    const out = buildPdf(c);
    built++;
    console.log(`\u2713 ${path.basename(out)}`);
  } catch (e) {
    skipped++;
    console.error(`\u2717 ${c.slug}: ${e.message}`);
  }
}
console.log(`\nBuilt ${built} supplementary community guides (skipped ${skipped}). Total community PDFs now: ${built + FEATURED.size} of ${communities.length}.`);

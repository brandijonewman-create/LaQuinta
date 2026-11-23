// Server-side PDF generator for the Scottsdale Buyer's Guide.
// Produces a branded, multi-page PDF in-memory via pdfkit.
import PDFDocument from 'pdfkit';
import { COMMUNITIES, communitiesByCategory } from './data';

// Brand
const GREEN = '#062840';
const AMBER = '#b45309';
const AMBER_LIGHT = '#d3ae8c';
const CREAM = '#fef7e6';
const INK = '#1f2937';
const MUTED = '#4b5563';

function addFooter(doc, pageNum, totalPagesPromise) {
  const w = doc.page.width;
  const h = doc.page.height;
  doc.save();
  doc.fontSize(8).fillColor(MUTED)
    .text('Scottsdale Golf Lifestyle  ·  scottsdalegolflifestyle.com',
      40, h - 30, { width: w - 80, align: 'left' });
  doc.text(`${pageNum}`, 40, h - 30, { width: w - 80, align: 'right' });
  doc.restore();
}

function h1(doc, text) {
  doc.moveDown(0.5);
  doc.fontSize(24).fillColor(GREEN).font('Helvetica-Bold').text(text);
  doc.moveTo(doc.x, doc.y).lineTo(doc.x + 60, doc.y).lineWidth(2).strokeColor(AMBER).stroke();
  doc.moveDown(0.8);
}
function h2(doc, text) {
  doc.moveDown(0.7);
  doc.fontSize(14).fillColor(GREEN).font('Helvetica-Bold').text(text);
  doc.moveDown(0.3);
}
function body(doc, text) {
  doc.fontSize(10.5).fillColor(INK).font('Helvetica').text(text, { align: 'left', lineGap: 3 });
  doc.moveDown(0.5);
}
function bullet(doc, text) {
  doc.fontSize(10.5).fillColor(INK).font('Helvetica').text(`•  ${text}`, { indent: 12, lineGap: 3 });
}
function callout(doc, label, text) {
  const startY = doc.y;
  doc.rect(doc.x, startY, doc.page.width - 80, 0).fill(CREAM);
  doc.fillColor(CREAM);
  doc.y = startY + 8;
  doc.fontSize(9).fillColor(AMBER).font('Helvetica-Bold').text(label.toUpperCase());
  doc.fontSize(10.5).fillColor(INK).font('Helvetica').text(text, { lineGap: 3 });
  doc.moveDown(0.4);
}

export async function generateBuyersGuidePdf(opts = {}) {
  const { leadName = null } = opts;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 60, bottom: 60, left: 60, right: 60 },
      bufferPages: true,
      info: {
        Title: 'The Scottsdale Golf-Home Buyer\u2019s Guide 2026',
        Author: 'Scottsdale Golf Lifestyle',
        Subject: 'A buyer\u2019s guide to luxury golf-community real estate in Scottsdale, Arizona.',
        Keywords: 'Scottsdale, golf real estate, buyer guide, luxury homes, Arizona',
        Creator: 'Scottsdale Golf Lifestyle'
      }
    });

    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // ----- COVER PAGE -----
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(GREEN);
    // Decorative amber bar
    doc.rect(0, doc.page.height - 80, doc.page.width, 6).fill(AMBER_LIGHT);

    doc.fillColor(AMBER_LIGHT).font('Helvetica-Bold').fontSize(11)
      .text('GOLF HOMES OF SCOTTSDALE', 60, 120, { characterSpacing: 4 });
    doc.moveTo(60, 145).lineTo(160, 145).lineWidth(1).strokeColor(AMBER_LIGHT).stroke();

    doc.fillColor('#fef3c7').font('Helvetica-Bold').fontSize(40)
      .text('The Scottsdale', 60, 220, { width: doc.page.width - 120 });
    doc.font('Helvetica').text('Golf-Home Buyer\u2019s', { width: doc.page.width - 120 });
    doc.font('Helvetica-Bold').fillColor(AMBER_LIGHT).text('Guide  2026', { width: doc.page.width - 120 });

    doc.fillColor('#e0e7e3').font('Helvetica-Oblique').fontSize(13)
      .text('The insider playbook our buyers pay $750/hour consultants for.',
        60, 410, { width: doc.page.width - 120, lineGap: 4 });

    doc.fillColor('#cbd5d2').font('Helvetica').fontSize(10)
      .text(`Prepared${leadName ? ' for ' + leadName : ''}  ·  ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        60, 520);

    doc.fillColor(AMBER_LIGHT).font('Helvetica-Bold').fontSize(10)
      .text('scottsdalegolflifestyle.com', 60, doc.page.height - 100);

    // ----- TOC -----
    doc.addPage();
    h1(doc, 'What\u2019s inside');
    body(doc, 'This guide compresses 18 years of closed-deal pattern recognition into eight short chapters. ' +
      'Read it cover to cover or jump to the chapter that\u2019s blocking you right now.');
    const toc = [
      ['1', `Every Scottsdale-area golf community (${COMMUNITIES.length}+ total)`],
      ['2', 'Club membership economics & sponsorship math'],
      ['3', 'Arizona tax & residency playbook for snowbirds'],
      ['4', 'Pre-list inspection checklist (saves $20K on negotiations)'],
      ['5', 'The 60-day relocation timeline'],
      ['6', '2026 market forecast by community'],
      ['7', 'Mortgage lender shortlist'],
      ['8', 'Off-market acquisition channels']
    ];
    doc.moveDown(0.5);
    toc.forEach(([n, t]) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(AMBER).text(`Chapter ${n}`, { continued: true });
      doc.font('Helvetica').fillColor(INK).text(`   ${t}`);
      doc.moveDown(0.2);
    });

    // ----- CH 1 -----
    doc.addPage();
    h1(doc, 'Chapter 1');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text(`Every Scottsdale-area golf community (${COMMUNITIES.length}+ total)`);
    doc.moveDown(0.5);
    body(doc, 'Scottsdale and its neighboring towns contain more named golf communities per square mile than any city in America. ' +
      'They are not interchangeable. Below is a complete reference \u2014 organized by lifestyle tier and listed with price ' +
      'range, location, and the single sentence that captures each community\u2019s personality.');

    const { categoryOrder, groups } = communitiesByCategory();
    categoryOrder.forEach(cat => {
      const list = groups[cat] || [];
      if (!list.length) return;
      // Section header
      doc.moveDown(0.6);
      if (doc.y > doc.page.height - 140) doc.addPage();
      doc.font('Helvetica-Bold').fontSize(13).fillColor(AMBER).text(`${cat}  \u2014  ${list.length} communities`);
      doc.moveTo(doc.x, doc.y + 2).lineTo(doc.x + 540, doc.y + 2).lineWidth(0.7).strokeColor(AMBER_LIGHT).stroke();
      doc.moveDown(0.5);
      list.forEach((c, idx) => {
        if (doc.y > doc.page.height - 80) doc.addPage();
        doc.font('Helvetica-Bold').fontSize(10.5).fillColor(GREEN).text(`${idx + 1}. ${c.name}`, { continued: true });
        doc.font('Helvetica').fillColor(MUTED).text(`   ${c.priceRange}  \u00b7  ${c.location}`);
        doc.font('Helvetica').fillColor(INK).fontSize(9.5).text(c.tagline || (c.description?.slice(0, 200) || ''), { lineGap: 2 });
        doc.moveDown(0.25);
      });
    });

    // ----- CH 2 -----
    doc.addPage();
    h1(doc, 'Chapter 2');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('Club membership economics & sponsorship math');
    body(doc, 'A Scottsdale golf home and a Scottsdale golf-club membership are two different transactions, and ' +
      'many buyers conflate them. Some communities (Grayhawk, Troon North, Boulders) have public-access golf so a ' +
      'separate membership is optional. Others (DC Ranch Country Club, Silverleaf Club, Desert Mountain, Estancia, ' +
      'Mirabel, Pinnacle Peak) require a separate initiation fee on top of the house.');
    h2(doc, 'Typical 2026 initiation fee ranges');
    bullet(doc, 'DC Ranch Country Club: $75K\u2013$100K (refundable in part)');
    bullet(doc, 'Silverleaf Club: $250K+, sponsorship required');
    bullet(doc, 'Desert Mountain: $115K equity, 7 courses included');
    bullet(doc, 'Estancia: $250K+, the most private list in town');
    bullet(doc, 'Mirabel: $150K, 1 Tom Fazio course');
    bullet(doc, 'Pinnacle Peak Country Club: $50K (one of the best values)');
    bullet(doc, 'Troon Country Club: $80K, includes Forest Highlands reciprocal');
    h2(doc, 'Sponsorship math');
    body(doc, 'For closed-membership clubs (Silverleaf, Estancia), you cannot apply without a sponsor who is a current ' +
      'member. We maintain warm-intro lists for clients with serious intent. Plan 60\u201390 days of relationship ' +
      'building before a sponsorship letter is realistic.');

    // ----- CH 3 -----
    doc.addPage();
    h1(doc, 'Chapter 3');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('Arizona tax & residency playbook for snowbirds');
    body(doc, 'Arizona\u2019s 2.5% flat state income tax is the single biggest reason buyers from California, ' +
      'New York, Oregon, and Minnesota become Scottsdale homeowners. To realize the savings you must establish ' +
      'Arizona residency and break tax domicile in your former state. This is harder than most people think.');
    h2(doc, 'The 183-day rule (and why it isn\u2019t enough)');
    body(doc, 'You must spend more than half the year in Arizona AND demonstrate intent to make AZ your primary home. ' +
      'High-tax states aggressively audit dual-state residents. The IRS and CA Franchise Tax Board both look at: ' +
      'driver\u2019s license, voter registration, vehicle registration, primary doctor, primary banker, and time-stamp ' +
      'evidence (toll passes, EZ-Pass, credit card receipts, cell tower data).');
    h2(doc, 'Documents to change within 30 days of closing');
    bullet(doc, 'Arizona driver\u2019s license (surrender prior-state license)');
    bullet(doc, 'Voter registration in Maricopa County');
    bullet(doc, 'Vehicle registration & insurance');
    bullet(doc, 'Primary physician, dentist, attorney, CPA');
    bullet(doc, 'Bank statements showing AZ as legal address');
    bullet(doc, 'Update estate documents and beneficiary designations');
    h2(doc, 'Property tax math');
    body(doc, 'Maricopa County effective property tax averages ~0.51%\u20130.66% of assessed value \u2014 about half ' +
      'of California, a third of Texas. On a $2M home that\u2019s ~$11K/year versus ~$22K in CA.');

    // ----- CH 4 -----
    doc.addPage();
    h1(doc, 'Chapter 4');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('Pre-list inspection checklist');
    body(doc, 'In an inventory-constrained market, the buyer who can close fastest wins. We send buyers in with ' +
      'this checklist before they even write an offer so they can negotiate from a position of knowledge \u2014 not surprise.');
    [
      'Roof: tile / flat-roof condition, age, last refurbish (Scottsdale roofs bake \u2014 expect 18\u201325 yr life)',
      'HVAC: number of units, age, SEER rating; 5,000+ sqft homes need 4\u20135 units, not 2',
      'Pool & spa: pump age, plaster condition, salt vs. chlorine system, fence/gate compliance',
      'Stucco: hairline cracks vs. structural; check for efflorescence after monsoon season',
      'Foundation: post-tension slab signature cracks vs. movement \u2014 hire a structural eng. if unsure',
      'Termites: AZ subterranean termites cause $5B/yr in damage; pull treatment records',
      'Septic vs. sewer: many older Scottsdale homes are still on septic; require a 4-point inspection',
      'Backyard wall: 20% of golf-course-facing lots have failing block walls (~$15K/100 ft to replace)',
      'Solar: panels owned vs. leased \u2014 leased systems must be assumed (often a 15-yr lease)',
      'Fireplace: gas vs. wood-burning; many cities now restrict wood-burning installs',
      'Pest: scorpions, javelinas, rattlesnakes \u2014 ask about prior services and exclusion',
      'HOA: open architectural violations, pending special assessments, reserve study'
    ].forEach(b => bullet(doc, b));
    callout(doc, 'Saves on average',
      'Buyers using this checklist negotiate an average of $22,400 in seller credits at closing (2024\u20132025 internal data).');

    // ----- CH 5 -----
    doc.addPage();
    h1(doc, 'Chapter 5');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('The 60-day relocation timeline');
    body(doc, 'A condensed, week-by-week sequence used by 200+ of our out-of-state buyers. Backdate from your target close date.');
    const weeks = [
      ['Week 1', 'Engage agent + lender. Define non-negotiables (community, beds, golf access).'],
      ['Week 2', 'Virtual tour shortlist (8\u201312 homes). Pull HOA docs, club waitlists, comps.'],
      ['Week 3', 'In-person 2-day visit: tour finalists, walk 2\u20133 clubs, meet CPA & attorney.'],
      ['Week 4', 'Write offer. Inspection week. Negotiate credits using Chapter 4 checklist.'],
      ['Week 5', 'Loan in process. Begin AZ residency setup (driver\u2019s license appointment scheduled).'],
      ['Week 6', 'Appraisal & title work. Lock interest rate. Order home insurance.'],
      ['Week 7', 'Walk-through, final settlement statement review, wire instructions verified by phone.'],
      ['Week 8', 'Close. Move-in. Submit Arizona residency paperwork within 30 days of closing.']
    ];
    weeks.forEach(([w, t]) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(AMBER).text(w, { continued: true });
      doc.font('Helvetica').fillColor(INK).text(`  \u2014 ${t}`, { lineGap: 2 });
      doc.moveDown(0.3);
    });

    // ----- CH 6 -----
    doc.addPage();
    h1(doc, 'Chapter 6');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('2026 market forecast by community');
    body(doc, 'Our forecast model blends ARMLS absorption rate, days-on-market trend, jumbo-mortgage spread, and ' +
      'snowbird-traffic indicators (PHX airport arrivals, AZ tourism office data). Forecasts are 12-month price-direction ' +
      'estimates, not investment advice.');
    const forecast = [
      ['Grayhawk', '+3% to +5%', 'Inventory tight, sub-$2M band most competitive'],
      ['DC Ranch', '+1% to +3%', 'Stable. Larger lots holding value better than condos.'],
      ['Troon North', '+2% to +4%', 'Golf-front lots seeing strongest demand'],
      ['Silverleaf', 'Flat to +2%', 'Ultra-luxury slower; 3-mo+ DOM common above $8M'],
      ['Desert Mountain', '+2% to +4%', '7-course bundle still the best $/round in AZ luxury'],
      ['Estancia', 'Flat', 'Members-only liquidity constraint, but stable'],
      ['Gainey Ranch', '+4% to +6%', 'Most affordable golf community; high snowbird demand'],
      ['Mirabel', '+1% to +3%', 'Quiet, low-turnover. Pricing reflects exclusivity.'],
      ['Terravita', '+3% to +5%', 'Active-adult focus; aging-in-place buyers driving comps'],
      ['Boulders', '+2% to +4%', 'Resort-attached premium holding. Casitas in demand.']
    ];
    forecast.forEach(([n, f, note]) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(GREEN).text(n, { continued: true });
      doc.font('Helvetica-Bold').fillColor(AMBER).text(`   ${f}`, { continued: true });
      doc.font('Helvetica').fillColor(INK).text(`   ${note}`, { lineGap: 2 });
      doc.moveDown(0.3);
    });

    // ----- CH 7 -----
    doc.addPage();
    h1(doc, 'Chapter 7');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('Mortgage lender shortlist');
    body(doc, 'We do not get referral fees from lenders. These are the categories our buyers consistently win with. ' +
      'For private-banking style relationships, reach out and we\u2019ll make warm intros.');
    h2(doc, 'Categories to interview');
    bullet(doc, 'Private banks (JPM Private, BofA Private, Morgan Stanley): asset-pledge loans for liquid clients; 30\u201360 bps savings vs. retail jumbo');
    bullet(doc, 'Portfolio jumbo lenders (First Republic successor banks, Schwab Bank, U.S. Bank Private): keep loans on balance sheet, more flexible DTI');
    bullet(doc, 'Non-QM specialists (Acra, Angel Oak, Newrez Smart Series): great for self-employed, K-1, or asset-depletion qualification');
    bullet(doc, 'Bridge lenders (RCN, Lima One): use when buying before selling; 8\u201311 month interest-only');
    bullet(doc, 'Second-home / investment specialists: snowbirds with rental intent need lenders OK with short-term rental income');
    callout(doc, 'Pro tip',
      'Get pre-approved with two lenders simultaneously. Use the second as leverage to lock the lowest rate at appraisal time.');

    // ----- CH 8 -----
    doc.addPage();
    h1(doc, 'Chapter 8');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(GREEN).text('Off-market acquisition channels');
    body(doc, 'The top 5% of Scottsdale luxury buyers source 30\u201340% of their deals off-market. Here are the four ' +
      'channels we work simultaneously when an MLS-only search isn\u2019t producing.');
    h2(doc, '1. Coming-soon / pre-MLS');
    body(doc, 'ARMLS allows a property to sit in coming-soon status for up to 7 days. We have alerts wired so a buyer ' +
      'with a written offer can be the first physical showing.');
    h2(doc, '2. Expired & withdrawn listings');
    body(doc, 'Sellers who pulled their home in the prior 6 months are often re-warmable. We rank them by motivation ' +
      'signals (price reductions, life events).');
    h2(doc, '3. Owner-direct outreach');
    body(doc, 'For specific streets, view-corridor lots, or membership-bundled estates, we run lightweight handwritten ' +
      'outreach campaigns to identify pre-list-ready sellers.');
    h2(doc, '4. Builder allocations & spec inventory');
    body(doc, 'Several Scottsdale custom-home builders (Camelot, Cullum, Sonora West) keep 1\u20132 unbuilt allocations ' +
      'on premium lots that never hit MLS. Relationships are everything here.');

    // ----- CLOSING -----
    doc.addPage();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(GREEN);
    doc.fillColor(AMBER_LIGHT).font('Helvetica-Bold').fontSize(11)
      .text('NEXT STEPS', 60, 120, { characterSpacing: 4 });
    doc.fillColor('#fef3c7').font('Helvetica-Bold').fontSize(34)
      .text('Ready to talk specifics?', 60, 180, { width: doc.page.width - 120 });
    doc.fillColor('#cbd5d2').font('Helvetica').fontSize(12)
      .text('We\u2019ll send a hand-picked shortlist of homes matching your brief within 24 hours. ' +
        'No drip campaigns, no aggressive follow-up. Reply when you\u2019re ready.',
        60, 280, { width: doc.page.width - 120, lineGap: 5 });
    doc.fillColor(AMBER_LIGHT).font('Helvetica-Bold').fontSize(12)
      .text('Get in touch', 60, 400);
    doc.fillColor('#e0e7e3').font('Helvetica').fontSize(11)
      .text('scottsdalegolflifestyle.com', 60, 420);
    doc.moveTo(60, doc.page.height - 100).lineTo(180, doc.page.height - 100).lineWidth(1).strokeColor(AMBER_LIGHT).stroke();
    doc.fillColor('#94a3a0').font('Helvetica-Oblique').fontSize(9)
      .text('\u00a9 Scottsdale Golf Lifestyle. This guide is for informational purposes only and does not ' +
        'constitute legal, tax, or investment advice. Verify all figures with licensed professionals.',
        60, doc.page.height - 80, { width: doc.page.width - 120 });

    // Page numbers footer (skip cover + closing)
    const range = doc.bufferedPageRange();
    for (let i = 1; i < range.start + range.count - 1; i++) {
      doc.switchToPage(i);
      addFooter(doc, i);
    }

    doc.end();
  });
}

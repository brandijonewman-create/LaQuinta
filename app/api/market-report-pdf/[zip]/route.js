// Dynamic market-report PDF generator. Requests to
// /downloads/la-quinta-market-report-:zip-q3-2026.pdf are rewritten (see
// next.config.js) to /api/market-report-pdf/:zip and served here.
//
// The PDF is generated on demand from the same summary data that appears
// on /market-reports/:zip. No fabricated numbers, ranges only. This
// unblocks the "Blocked by robots.txt" -> "Not found (404)" transition
// that Search Console was heading toward.

import PDFDocument from 'pdfkit';
import { MARKET_REPORT_COPY } from '@/lib/content/thin-page-copy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REPORT_DATA = {
  '92253': {
    quarter: 'Q3 2026',
    summary: [
      { m: 'Median range',     v: '$1.45M – $1.62M', n: 'Single-family, all communities' },
      { m: 'Inventory months', v: '4.1 – 5.3',        n: 'Q3 seasonal soft' },
      { m: 'YoY direction',    v: 'Flat to +2%',      n: 'Median holding' },
    ],
    narrative: [
      'Q3 2026 played out as expected for La Quinta, the summer-soft pattern that the 92253 ZIP runs through every year. Triple-digit heat clears the snowbird population, foot traffic at private clubs drops, and the higher end of the market goes effectively dormant from late June through mid-September. The transactions that did close were primarily primary-residence buyers and a handful of opportunistic second-home deals where sellers were motivated.',
      'The most active segment was the $700K–$1.4M band, historic La Quinta Country Club, Trilogy at La Quinta, and Duna La Quinta. Days on market lengthened modestly versus Q2; price reductions were more common than in spring but remained moderate (typically 3–5%, not the 10%+ corrections seen in the broader Coachella Valley in 2020–2022).',
    ],
    byClub: [
      ['PGA West',                            'Widest range, broadest activity. Condo segment most active. Stadium and Norman-course homes held value best.'],
      ['La Quinta Country Club',              'Steady volume. The historic-club discount versus newer construction continues to attract heritage buyers.'],
      ['Andalusia, The Hideaway, Tradition',  'Slow summer typical of the upper-mid market. Listings carried into Q4.'],
      ['The Madison Club, The Quarry',        'Effectively dormant, typical pattern.'],
    ],
    outlook:
      'The Q4 ramp typically begins in mid-to-late October as snowbirds return. Inventory tends to firm, days on market shorten, and the upper-mid market reactivates first. Watch the $1.5M–$3M range at PGA West, Andalusia, and Mountain View, those are typically the early indicators of how the high season will price.',
    disclaimer:
      'Ranges are sourced from CARETS/CRMLS via our partner California-licensed realtor. Confirm specifics with a licensed agent before transacting. Not an appraisal.',
  },
};

function buildPdf(zip, data, copy) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 60, bottom: 60, left: 60, right: 60 },
      info: {
        Title: `La Quinta ${zip} Market Report, ${data.quarter}`,
        Author: 'La Quinta Golf Lifestyle',
        Subject: `La Quinta ${zip} quarterly market report`,
        Keywords: `La Quinta, ${zip}, market report, ${data.quarter}, Coachella Valley real estate`,
      },
    });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Palette
    const PALM = '#0f2a3a';
    const TERRACOTTA = '#c47a5a';
    const MUTED = '#6b6b6b';

    // Cover header
    doc
      .fillColor(TERRACOTTA)
      .fontSize(9)
      .font('Helvetica-Bold')
      .text(`ZIP ${zip} · ${data.quarter.toUpperCase()}`.toUpperCase(), { characterSpacing: 2 });

    doc.moveDown(0.6);
    doc
      .fillColor(PALM)
      .font('Times-Roman')
      .fontSize(28)
      .text(`La Quinta · ${zip} Market Report`, { lineGap: 4 });

    doc.moveDown(0.6);
    doc
      .fillColor(MUTED)
      .font('Helvetica')
      .fontSize(11)
      .text(copy?.metaDescription || 'Editorial quarterly market view for the 92253 ZIP.', {
        lineGap: 2,
      });

    doc.moveDown(1.2);
    doc.strokeColor(TERRACOTTA).lineWidth(1).moveTo(60, doc.y).lineTo(552, doc.y).stroke();
    doc.moveDown(1.2);

    // Summary grid
    doc.fillColor(PALM).font('Helvetica-Bold').fontSize(10).text('AT A GLANCE', { characterSpacing: 2 });
    doc.moveDown(0.4);
    data.summary.forEach((s) => {
      doc
        .font('Helvetica-Bold')
        .fillColor(MUTED)
        .fontSize(9)
        .text(s.m.toUpperCase(), { characterSpacing: 1.5 });
      doc.font('Times-Roman').fillColor(PALM).fontSize(16).text(s.v);
      doc.font('Helvetica-Oblique').fillColor(MUTED).fontSize(9).text(s.n);
      doc.moveDown(0.6);
    });

    doc.moveDown(0.6);

    // Narrative
    doc.font('Helvetica-Bold').fillColor(PALM).fontSize(14).text('What this quarter looked like');
    doc.moveDown(0.3);
    data.narrative.forEach((p) => {
      doc.font('Times-Roman').fillColor('#333').fontSize(11).text(p, { align: 'left', lineGap: 3 });
      doc.moveDown(0.6);
    });

    // By club
    doc.moveDown(0.4);
    doc.font('Helvetica-Bold').fillColor(PALM).fontSize(14).text('By club');
    doc.moveDown(0.3);
    data.byClub.forEach(([label, body]) => {
      doc.font('Helvetica-Bold').fillColor(PALM).fontSize(11).text(label + ':', { continued: true });
      doc.font('Times-Roman').fillColor('#333').fontSize(11).text(' ' + body, { lineGap: 3 });
      doc.moveDown(0.4);
    });

    // Outlook
    doc.moveDown(0.4);
    doc.font('Helvetica-Bold').fillColor(PALM).fontSize(14).text('What we expect in Q4');
    doc.moveDown(0.3);
    doc.font('Times-Roman').fillColor('#333').fontSize(11).text(data.outlook, { lineGap: 3 });

    // Footer disclaimer
    doc.moveDown(1.2);
    doc.strokeColor('#d9d9d9').lineWidth(0.5).moveTo(60, doc.y).lineTo(552, doc.y).stroke();
    doc.moveDown(0.4);
    doc
      .font('Helvetica-Oblique')
      .fillColor(MUTED)
      .fontSize(9)
      .text(data.disclaimer, { align: 'left', lineGap: 2 });

    doc.moveDown(0.6);
    doc
      .font('Helvetica')
      .fillColor(MUTED)
      .fontSize(8)
      .text(
        'La Quinta Golf Lifestyle · 7671 Enterprises, LLC DBA Golf Lifestyle Network · laquintagolflifestyle.com',
        { align: 'center' }
      );

    doc.end();
  });
}

export async function GET(_request, { params }) {
  const zip = params?.zip;
  const data = REPORT_DATA[zip];
  const copy = MARKET_REPORT_COPY[zip];
  if (!data) {
    return new Response('Market report not found', { status: 404 });
  }
  try {
    const pdf = await buildPdf(zip, data, copy);
    return new Response(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="la-quinta-market-report-${zip}-q3-2026.pdf"`,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (err) {
    console.error('[market-report-pdf] generation failed', err);
    return new Response('PDF generation failed', { status: 500 });
  }
}

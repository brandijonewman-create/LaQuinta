// /llms.txt — a plain-text index of the site for LLM crawlers (Fix Round A
// item 10). Regenerates from the same data sources as the sitemap.
import { SITE, COMMUNITIES, ARCHITECTS, MARKET_REPORTS, LEAD_MAGNETS } from '@/lib/data';
import { BLOG_POSTS as ALL_POSTS } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET() {
  const line = (title, url, desc) => `- [${title}](${SITE.url}${url}): ${desc}`;
  const oneLine = (s = '') => s.replace(/\s+/g, ' ').trim().slice(0, 180);

  const parts = [];
  parts.push('# Scottsdale Golf Lifestyle');
  parts.push('');
  parts.push(
    'Scottsdale Golf Lifestyle is an editorial guide to luxury golf-course real estate in Scottsdale, Arizona, operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network. It covers 40+ golf communities across Scottsdale, Paradise Valley, Carefree, Cave Creek, Fountain Hills, Rio Verde, north Phoenix and Peoria, plus the course architects, private-club membership economics, Arizona tax considerations, and snowbird seasonality that shape the market. It publishes original research and long-form journalism. It is not a real estate brokerage and hosts no live MLS listings; market figures are illustrative ranges that should be verified with a licensed Arizona real estate professional.'
  );

  parts.push('', '## Golf Communities');
  for (const c of COMMUNITIES) parts.push(line(c.name, `/communities/${c.slug}`, oneLine(c.tagline || c.description)));

  parts.push('', '## Course Architects');
  for (const a of ARCHITECTS) parts.push(line(a.name, `/architects/${a.slug}`, oneLine(a.summary || a.tagline)));

  parts.push('', '## Guides');
  for (const g of LEAD_MAGNETS) parts.push(line(g.title, `/guides/${g.slug}`, oneLine(g.description)));
  parts.push(line('Scottsdale Club Membership Costs 2026', '/scottsdale-club-membership-costs-2026', 'Initiation and dues bands for Scottsdale private golf clubs, with equity vs non-equity explained.'));
  parts.push(line('The 2026 Scottsdale Golf Community Index', '/scottsdale-golf-community-index-2026', 'Editorial tier ranking of every named Scottsdale-area golf community.'));
  parts.push(line('Scottsdale Snowbird Guide', '/scottsdale-snowbird-guide', 'Seasonal ownership playbook for October-to-April residents.'));

  parts.push('', '## Market Reports');
  for (const r of MARKET_REPORTS) parts.push(line(r.title, `/market-reports/${r.slug}`, oneLine(r.summary)));

  parts.push('', '## Journal');
  for (const p of ALL_POSTS) parts.push(line(p.title, `/blog/${p.slug}`, oneLine(p.excerpt || p.description)));

  return new Response(parts.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

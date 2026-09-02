// Dynamic /llms.txt for AI crawlers (ChatGPT, Perplexity, Claude, etc.).
//
// Follows the llms.txt convention (https://llmstxt.org): a markdown-formatted
// plain-text index of the site's most important resources, one URL per line
// with a short human-readable description.
//
// TRUTH RULE (do not violate): every link in this file MUST resolve to a real
// page on this site. The content is generated from the same registries the
// sitemap uses — `lib/site-config` (communities, architects), `lib/blog`
// (blog posts + guides), and `lib/collaborators` — so it stays in sync as
// content is added. We deliberately DO NOT list gated downloads, lead-gated
// PDFs, or `/api/*` routes.
//
// Served with Content-Type text/plain per the llms.txt spec. Some crawlers
// also accept text/markdown; text/plain is the safest interoperable choice.

import { site, owner, communities, architects, market } from '@/lib/site-config';
import { getAllPosts, getAllGuides } from '@/lib/blog';
import { collaborators, getCollaboratorPageSlugs, getCollaborator } from '@/lib/collaborators';
import { partner } from '@/lib/exclusive-partner';

// Force this route to be rendered on every request so newly-added posts,
// guides and collaborators appear in /llms.txt immediately.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Homes-for-sale filter landing pages that actually resolve today. Kept in
// lock-step with the FILTERS array in app/sitemap.js.
const HOMES_FILTERS = [
  { slug: 'gated', label: 'Gated communities' },
  { slug: 'golf-membership-included', label: 'Homes with golf membership included' },
  { slug: 'mountain-view', label: 'Mountain-view homes' },
  { slug: 'new-construction', label: 'New-construction homes' },
  { slug: 'the-madison-club', label: 'The Madison Club homes' },
  { slug: 'under-2-million', label: 'Homes under $2M' },
  { slug: '2-to-5-million', label: 'Homes from $2M to $5M' },
  { slug: 'over-5-million', label: 'Homes over $5M' },
];

// Market-report ZIP pages that resolve today.
const MARKET_ZIPS = ['92253'];

function line(url, label, note) {
  const path = url.startsWith('http') ? url : `${site.url}${url}`;
  return note ? `- [${label}](${path}): ${note}` : `- [${label}](${path})`;
}

function build() {
  const posts = getAllPosts();
  const guides = getAllGuides();
  const collabPages = getCollaboratorPageSlugs();

  const out = [];
  out.push(`# ${site.name}`);
  out.push('');
  out.push(`> ${site.seoDescription}`);
  out.push('');
  out.push(
    `${site.name} covers golf real estate, private clubs, and the desert ` +
      `lifestyle of La Quinta, California (${market.county}). The site is ` +
      `owned and operated by ${owner.name}. All content is editorial; ` +
      `transactions are routed to a California-licensed real estate professional.`
  );
  out.push('');

  // ---- Start here ---------------------------------------------------------
  out.push('## Start Here');
  out.push('');
  out.push(line('/', `${site.name} — homepage`, 'Site overview, featured communities, and latest editorial.'));
  out.push(line('/about', 'About', 'Editorial standards, ownership, and how leads are routed.'));
  out.push(line('/glossary', 'Glossary', 'Definitions of terms used across the site (equity club, HOA, CC&R, etc.).'));
  out.push('');

  // ---- Golf communities ---------------------------------------------------
  out.push('## Golf Communities in La Quinta');
  out.push('');
  out.push(line('/communities', 'All La Quinta golf communities', 'Directory of private clubs and gated golf communities in La Quinta.'));
  for (const c of communities) {
    const note = c.architect ? `Designed by ${c.architect}.` : undefined;
    out.push(line(`/communities/${c.slug}`, c.name, note));
  }
  out.push('');

  // ---- Architects ---------------------------------------------------------
  out.push('## Golf Course Architects');
  out.push('');
  out.push(line('/architects', 'All architects', 'Profiles of the golf-course architects who shaped La Quinta.'));
  for (const a of architects) {
    const note = a.signatureCourses && a.signatureCourses.length
      ? `Signature courses: ${a.signatureCourses.join(', ')}.`
      : undefined;
    out.push(line(`/architects/${a.slug}`, a.name, note));
  }
  out.push('');

  // ---- Editorial: blog ----------------------------------------------------
  out.push('## Editorial — Blog');
  out.push('');
  out.push(line('/blog', 'All articles', 'Long-form coverage of La Quinta communities, clubs, architects, and market context.'));
  for (const p of posts) {
    out.push(line(`/blog/${p.slug}`, p.frontmatter.title, p.frontmatter.excerpt));
  }
  out.push('');

  // ---- Guides -------------------------------------------------------------
  if (guides.length > 0) {
    out.push('## Guides');
    out.push('');
    out.push(line('/guides', 'All guides', 'In-depth reference guides for La Quinta buyers.'));
    for (const g of guides) {
      out.push(line(`/guides/${g.slug}`, g.frontmatter.title, g.frontmatter.excerpt));
    }
    out.push('');
  }

  // ---- Market reports -----------------------------------------------------
  out.push('## Market Reports');
  out.push('');
  out.push(line('/market-reports', 'Market reports index', 'Quarterly context for La Quinta ZIP-level real estate.'));
  for (const zip of MARKET_ZIPS) {
    out.push(line(`/market-reports/${zip}`, `La Quinta ${zip} market report`));
  }
  out.push('');

  // ---- Homes for sale + tools --------------------------------------------
  out.push('## Homes for Sale & Buyer Tools');
  out.push('');
  out.push(line('/homes-for-sale', 'Homes for sale in La Quinta', 'Directory of active La Quinta listings by category.'));
  for (const f of HOMES_FILTERS) {
    out.push(line(`/homes-for-sale/${f.slug}`, f.label));
  }
  out.push(line('/community-quiz', 'Community-fit quiz', 'Five-question quiz that recommends the three La Quinta clubs that best match a buyer profile.'));
  out.push(line('/home-valuation', 'La Quinta home valuation request', 'Editorial valuation request routed to a licensed California real-estate professional.'));
  out.push(line('/compare', 'Compare communities', 'Side-by-side comparison of La Quinta golf communities.'));
  out.push(line('/desert-lifestyle-map', 'La Quinta desert lifestyle map', 'Interactive map of clubs, landmarks, trailheads, and Old Town La Quinta.'));
  out.push(line('/golf-clubs', 'Golf clubs directory', 'Directory of La Quinta private golf clubs.'));
  out.push('');

  // ---- Exclusive Market Partner & collaborators --------------------------
  out.push('## Exclusive Market Partner & Editorial Collaborators');
  out.push('');
  out.push(line('/#meet-kathy', `Meet ${partner.displayName}`, `${partner.brokerage.name} \u00b7 CA DRE #${partner.dreLicense} \u2014 the site\u2019s Exclusive Market Partner for La Quinta.`));
  out.push(line('/collaborators', 'Editorial collaborators', 'Vetted professionals who contribute editorial expertise to the site.'));
  for (const pageSlug of collabPages) {
    // Represent each page by its first collaborator.
    const first = collaborators.find((c) => (c.page || c.slug) === pageSlug);
    if (!first) continue;
    const note = first.jobTitle
      ? `${first.jobTitle}${first.affiliation ? ` \u2014 ${first.affiliation}` : ''}.`
      : undefined;
    out.push(line(`/collaborators/${pageSlug}`, first.name, note));
  }
  out.push(line('/collaborate', 'Exclusive Market Partner program', 'How California-licensed agents can lease a city site in the Golf Lifestyle Network portfolio (La Quinta is filled; other cities open).'));
  out.push(line('/property-spotlight/sample', 'Sample property spotlight', 'Reference format for the site\u2019s property-spotlight editorial slot.'));
  out.push('');

  // ---- Legal --------------------------------------------------------------
  out.push('## Legal');
  out.push('');
  out.push(line('/privacy', 'Privacy policy'));
  out.push(line('/terms', 'Terms of use'));
  out.push('');

  // ---- Machine-readable feeds --------------------------------------------
  out.push('## Feeds');
  out.push('');
  out.push(line('/sitemap.xml', 'XML sitemap', 'Complete machine-readable index of every canonical URL on the site.'));
  out.push(line('/robots.txt', 'Robots policy'));
  out.push('');

  // ---- Editorial policy note ---------------------------------------------
  out.push('## Editorial policy');
  out.push('');
  out.push(
    '- No fabricated listings, testimonials, market statistics, or celebrity endorsements.'
  );
  out.push(
    '- All real-estate transactions are routed to a California-licensed real estate professional.'
  );
  out.push(
    `- The site is owned and operated by ${owner.name}. No individual name is published as author or agent.`
  );
  out.push(
    '- Content covers La Quinta, California only. Palm Desert, Rancho Mirage, Indian Wells, and Palm Springs each have their own dedicated sites in the network.'
  );
  out.push('');

  return out.join('\n');
}

export async function GET() {
  const body = build();
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache for one hour at the CDN edge; content updates when we add posts,
      // guides, communities, architects, or collaborators.
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}

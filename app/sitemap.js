// SEO sitemap.
//
// Rules (see /app/test_result.md for background):
//   1. Every URL has a real `lastModified` — either the frontmatter date of
//      the underlying MDX, or a hand-maintained entry in PAGE_LAST_MODIFIED
//      below. We deliberately DO NOT use fs.statSync(mtime) — on a fresh CI
//      clone every file's mtime is the build time, which would stamp every
//      URL "today" on every deploy.
//   2. Index / hub pages (/blog, /guides, /communities, /architects,
//      /homes-for-sale, /market-reports) compute lastmod as the newest date
//      among their child pages, so publishing a post automatically bumps the
//      parent listing. If a hub has no children, it falls back to the
//      PAGE_LAST_MODIFIED entry.
//   3. `changeFrequency` and `priority` are intentionally omitted — Google
//      ignores them and they were previously giving false signal.
//   4. If a route in STATIC_PAGES is missing from PAGE_LAST_MODIFIED, we
//      throw at build/render time so a new page cannot be silently deployed
//      with the wrong lastmod.

import { site, communities, architects, market } from '@/lib/site-config';
import { getAllPosts, getAllGuides } from '@/lib/blog';

// Homes-for-sale filter landing pages that resolve today. Kept in lock-step
// with the FILTERS object in app/homes-for-sale/[filter]/page.js.
const FILTERS = [
  'gated',
  'golf-membership-included',
  'mountain-view',
  'new-construction',
  'the-madison-club',
  'under-2-million',
  '2-to-5-million',
  'over-5-million',
];

// Static pages served from this site. Every entry must appear in
// PAGE_LAST_MODIFIED below.
const STATIC_PAGES = [
  '/',
  '/about',
  '/communities',
  '/architects',
  '/homes-for-sale',
  '/golf-clubs',
  '/market-reports',
  '/desert-lifestyle-map',
  '/community-quiz',
  '/home-valuation',
  '/compare',
  '/guides',
  '/blog',
  '/glossary',
  '/privacy',
  '/terms',
];

// Filter landing pages (all currently share a single last-content-edit date
// because the copy is templated from the same source).
const HOMES_FILTER_LASTMOD = '2026-06-08';

// Market-report ZIP pages that resolve today.
const MARKET_ZIP_LASTMOD = {
  '92253': '2026-06-08',
};

// Hand-maintained last-modified index for static / hub pages.
// Update the date for a route when you meaningfully change that page's copy.
// Hub pages listed here are used as a *fallback* only — the sitemap will
// prefer the newest child date when the hub is a listing page.
//
// Format: ISO date (YYYY-MM-DD). Dates should be truthful — do not bump a
// page's date without an actual content change.
const PAGE_LAST_MODIFIED = {
  '/':                     '2026-06-08',
  '/about':                '2026-06-08',
  '/communities':          '2026-06-08',
  '/architects':           '2026-06-08',
  '/homes-for-sale':       '2026-06-08',
  '/golf-clubs':           '2026-06-08',
  '/market-reports':       '2026-06-08',
  '/desert-lifestyle-map': '2026-06-08',
  '/community-quiz':       '2026-06-08',
  '/home-valuation':       '2026-06-08',
  '/compare':              '2026-06-08',
  '/guides':               '2026-06-08',
  '/blog':                 '2026-06-08',
  '/glossary':             '2026-06-08',
  '/privacy':              '2026-06-08',
  '/terms':                '2026-06-08',
};

// Per-slug overrides for detail pages whose underlying source isn't a dated
// MDX file. Community and architect pages read from lib/content/* and don't
// carry a publish date, so we track their last content edits here.
const COMMUNITY_LASTMOD_DEFAULT = '2026-06-08';
const COMMUNITY_LASTMOD_OVERRIDES = {};

const ARCHITECT_LASTMOD_DEFAULT = '2026-06-08';
const ARCHITECT_LASTMOD_OVERRIDES = {};

function parseDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`[sitemap] Invalid ISO date "${iso}"`);
  }
  return d;
}

function newestDate(dates) {
  if (!dates.length) return null;
  return dates.reduce((max, d) => (d > max ? d : max), dates[0]);
}

function abs(path) {
  return path === '/' ? site.url : `${site.url}${path}`;
}

export default function sitemap() {
  const entries = [];

  // ---- Detail pages (compute first so hubs can aggregate) -----------------

  // Blog posts (frontmatter.date)
  const posts = getAllPosts();
  const postDates = [];
  for (const p of posts) {
    const d = parseDate(p.frontmatter.date);
    postDates.push(d);
    entries.push({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: d,
    });
  }

  // Guides (frontmatter.date)
  const guides = getAllGuides();
  const guideDates = [];
  for (const g of guides) {
    const d = parseDate(g.frontmatter.date);
    guideDates.push(d);
    entries.push({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: d,
    });
  }

  // Community detail pages
  const communityDates = [];
  for (const c of communities) {
    const iso = COMMUNITY_LASTMOD_OVERRIDES[c.slug] || COMMUNITY_LASTMOD_DEFAULT;
    const d = parseDate(iso);
    communityDates.push(d);
    entries.push({
      url: `${site.url}/communities/${c.slug}`,
      lastModified: d,
    });
  }

  // Architect detail pages
  const architectDates = [];
  for (const a of architects) {
    const iso = ARCHITECT_LASTMOD_OVERRIDES[a.slug] || ARCHITECT_LASTMOD_DEFAULT;
    const d = parseDate(iso);
    architectDates.push(d);
    entries.push({
      url: `${site.url}/architects/${a.slug}`,
      lastModified: d,
    });
  }

  // Homes-for-sale filter pages
  const homesFilterDates = [];
  const homesFilterDate = parseDate(HOMES_FILTER_LASTMOD);
  for (const f of FILTERS) {
    homesFilterDates.push(homesFilterDate);
    entries.push({
      url: `${site.url}/homes-for-sale/${f}`,
      lastModified: homesFilterDate,
    });
  }

  // Market-report ZIP pages
  const marketZipDates = [];
  for (const zip of market.cities.flatMap((c) => c.zips)) {
    const iso = MARKET_ZIP_LASTMOD[zip];
    if (!iso) {
      throw new Error(`[sitemap] Missing MARKET_ZIP_LASTMOD entry for ZIP ${zip}`);
    }
    const d = parseDate(iso);
    marketZipDates.push(d);
    entries.push({
      url: `${site.url}/market-reports/${zip}`,
      lastModified: d,
    });
  }

  // ---- Hub-page lastmod resolution ---------------------------------------
  // For hubs that list children, prefer the newest child date. Fall back to
  // the manual PAGE_LAST_MODIFIED entry when a hub has no children.

  const HUB_AGGREGATE = {
    '/blog':           postDates,
    '/guides':         guideDates,
    '/communities':    communityDates,
    '/architects':     architectDates,
    '/homes-for-sale': homesFilterDates,
    '/market-reports': marketZipDates,
  };

  // ---- Static pages -------------------------------------------------------
  for (const path of STATIC_PAGES) {
    const iso = PAGE_LAST_MODIFIED[path];
    if (!iso) {
      throw new Error(
        `[sitemap] Missing PAGE_LAST_MODIFIED entry for ${path}. ` +
          `Add it to /app/app/sitemap.js before deploying.`
      );
    }
    const fallback = parseDate(iso);
    const childDates = HUB_AGGREGATE[path] || [];
    const lastModified = newestDate(childDates) || fallback;
    entries.push({
      url: abs(path),
      lastModified,
    });
  }

  // /downloads/* intentionally omitted — noindex/lead-gated.

  return entries;
}

import { SITE, COMMUNITIES, ZIP_PAGES, COMPARISON_PAIRS, GOLF_CLUBS, ARCHITECTS } from '@/lib/data';
import { BLOG_POSTS as ALL_POSTS } from '@/lib/blog';
import { LANDING_TOPICS } from '@/lib/landing-topics';
import contentDates from '@/lib/content-dates.json';
import { IMPORTED_BUSINESSES, IMPORTED_AT } from '@/lib/directory/imported';
import { CATEGORIES, CITIES, categoryCitySlug } from '@/lib/directory';

// lastmod policy (Fix Round A item 9): every <lastmod> comes from a REAL
// content date — MDX frontmatter for blog posts, git-derived last-change dates
// (lib/content-dates.json, regenerated via scripts/generate-content-dates.mjs)
// for everything else. changefreq / priority are intentionally omitted —
// Google ignores them and they added noise.
const FALLBACK = contentDates.routes['/'] || '2026-06-12';
const routeDate = (route) => new Date(contentDates.routes[route] || FALLBACK);
const familyDate = (family) => new Date(contentDates.families[family] || FALLBACK);

export default function sitemap() {
  const staticRoutes = [
    '',
    '/communities',
    '/scottsdale-golf-courses',
    '/blog',
    '/golf-clubs',
    '/architects',
    '/scottsdale-golf-community-index-2026',
    '/community-quiz',
    '/scottsdale-club-membership-costs-2026',
    '/scottsdale-snowbird-guide',
    '/scottsdale-lifestyle-map',
    '/collaborators',
    '/partner-with-us',
    '/about',
    '/glossary',
    '/compare',
    '/contact',
    '/privacy',
    '/terms',
    '/disclosure'
  ].map(p => ({ url: `${SITE.url}${p}`, lastModified: routeDate(p === '' ? '/' : p) }));

  // NOTE (AdSense quality pass): the following programmatic route families are
  // intentionally EXCLUDED from the sitemap and carry robots noindex until they
  // have substantive unique content / live listing data:
  //   - /homes-for-sale/* (empty until IDX feed)  - /market-reports/* (placeholder)
  //   - /relocating-to-scottsdale/* (thin)        - /guides/* (lead magnets)
  //   - /map, /scottsdale-home-value (utility/lead tools)
  const communityRoutes    = COMMUNITIES.map(c =>      ({ url: `${SITE.url}/communities/${c.slug}`,            lastModified: routeDate(`/communities/${c.slug}`) }));
  const blogRoutes         = ALL_POSTS.map(p =>       ({ url: `${SITE.url}/blog/${p.slug}`,                   lastModified: new Date(p.date) }));
  const zipRoutes          = ZIP_PAGES.map(z =>        ({ url: `${SITE.url}/scottsdale/${z.zip}`,              lastModified: familyDate('zips') }));
  const compareRoutes      = COMPARISON_PAIRS.map(p => ({ url: `${SITE.url}/compare/${p.slug}`,                lastModified: familyDate('compare') }));
  const golfClubRoutes     = GOLF_CLUBS.map(c =>       ({ url: `${SITE.url}/golf-clubs/${c.slug}`,             lastModified: familyDate('golf-clubs') }));
  const architectRoutes    = ARCHITECTS.map(a =>       ({ url: `${SITE.url}/architects/${a.slug}`,             lastModified: familyDate('architects') }));
  const landingTopicRoutes = LANDING_TOPICS.map(t =>   ({ url: `${SITE.url}/scottsdale-communities/${t.slug}`, lastModified: familyDate('landing-topics') }));
  const landingTopicIndex  = [{ url: `${SITE.url}/scottsdale-communities`,        lastModified: routeDate('/scottsdale-communities') }];

  // Directory (/guide): the hub, then only category, category-city and business
  // pages that have real listings. Empty category pages stay out until filled.
  const guideDate = new Date(IMPORTED_AT);
  const withListings = new Set();
  for (const b of IMPORTED_BUSINESSES) for (const c of b.categories) { withListings.add(c); withListings.add(categoryCitySlug(c, b.city)); }
  const guideRoutes = [
    { url: `${SITE.url}/guide`, lastModified: guideDate },
    ...CATEGORIES.filter((c) => withListings.has(c.slug)).map((c) => ({ url: `${SITE.url}/guide/${c.slug}`, lastModified: guideDate })),
    ...CATEGORIES.flatMap((c) => CITIES.map((city) => categoryCitySlug(c.slug, city.slug)))
      .filter((slug) => withListings.has(slug)).map((slug) => ({ url: `${SITE.url}/guide/${slug}`, lastModified: guideDate })),
    ...IMPORTED_BUSINESSES.map((b) => ({ url: `${SITE.url}/guide/${b.slug}`, lastModified: guideDate })),
  ];
  return [
    ...staticRoutes,
    ...communityRoutes,
    ...blogRoutes,
    ...zipRoutes,
    ...compareRoutes,
    ...golfClubRoutes,
    ...architectRoutes,
    ...landingTopicRoutes,
    ...landingTopicIndex,
    ...guideRoutes
  ];
}

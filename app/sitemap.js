import { site, communities, architects } from '@/lib/site-config';

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

const STATIC_PAGES = [
  '',
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

import { getPostSlugs, getGuideSlugs } from '@/lib/blog';

export default function sitemap() {
  const now = new Date();

  const entries = [];

  // Static pages
  for (const path of STATIC_PAGES) {
    entries.push({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1.0 : 0.7,
    });
  }

  // Community detail pages
  for (const c of communities) {
    entries.push({
      url: `${site.url}/communities/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Architect detail pages
  for (const a of architects) {
    entries.push({
      url: `${site.url}/architects/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Homes-for-sale filter slugs
  for (const f of FILTERS) {
    entries.push({
      url: `${site.url}/homes-for-sale/${f}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // Market-report ZIP pages (currently only 92253)
  entries.push({
    url: `${site.url}/market-reports/92253`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // Blog posts
  for (const slug of getPostSlugs()) {
    entries.push({
      url: `${site.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Guides
  for (const slug of getGuideSlugs()) {
    entries.push({
      url: `${site.url}/guides/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // /downloads/* intentionally omitted — they are noindex/lead-gated.

  return entries;
}

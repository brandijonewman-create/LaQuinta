// Generates lib/content-dates.json — real last-modified dates per route,
// derived from git history of each route's source files (item 9: sitemap
// lastmod must come from real content dates, not `new Date()`).
// Re-run after meaningful content edits:  node scripts/generate-content-dates.mjs
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = '/app';
const gitDate = (file) => {
  try {
    // Uncommitted local modifications mean the content changed "today".
    const dirty = execSync(`git status --porcelain -- "${file}"`, { cwd: ROOT }).toString().trim();
    if (dirty) return new Date().toISOString().slice(0, 10);
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, { cwd: ROOT }).toString().trim();
    return out ? out.slice(0, 10) : null;
  } catch { return null; }
};
const maxDate = (...files) => {
  const ds = files.map(gitDate).filter(Boolean).sort();
  return ds.length ? ds[ds.length - 1] : new Date().toISOString().slice(0, 10);
};

const dates = { routes: {}, families: {} };

// ---- static routes -> their page.js ----
const staticMap = {
  '/': 'app/page.js',
  '/communities': 'app/communities/page.js',
  '/scottsdale-golf-courses': 'app/scottsdale-golf-courses/page.js',
  '/blog': 'app/blog/page.js',
  '/golf-clubs': 'app/golf-clubs/page.js',
  '/architects': 'app/architects/page.js',
  '/scottsdale-golf-community-index-2026': 'app/scottsdale-golf-community-index-2026/page.js',
  '/community-quiz': 'app/community-quiz/page.js',
  '/scottsdale-club-membership-costs-2026': 'app/scottsdale-club-membership-costs-2026/page.js',
  '/scottsdale-snowbird-guide': 'app/scottsdale-snowbird-guide/page.js',
  '/scottsdale-lifestyle-map': 'app/scottsdale-lifestyle-map/page.js',
  '/collaborators': 'app/collaborators/page.js',
  '/partner-with-us': 'app/partner-with-us/page.js',
  '/about': 'app/about/page.js',
  '/glossary': 'app/glossary/page.js',
  '/compare': 'app/compare/page.js',
  '/privacy': 'app/privacy/page.js',
  '/terms': 'app/terms/page.js',
  '/disclosure': 'app/disclosure/page.js',
  '/contact': 'app/contact/page.js',
  '/scottsdale-communities': 'app/scottsdale-communities/page.js'
};
for (const [route, file] of Object.entries(staticMap)) {
  if (fs.existsSync(path.join(ROOT, file))) dates.routes[route] = maxDate(file);
}

// ---- per-community: which editorial file mentions the slug ----
const editorialFiles = [
  'lib/community-editorial.js',
  'lib/community-editorial-extra.js',
  'lib/community-editorial-tier2.js'
];
const dataDate = maxDate('lib/data.js');
const detailDate = maxDate('components/community-detail.js');
const commSlugs = [...fs.readFileSync(path.join(ROOT, 'lib/data.js'), 'utf8')
  .matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);
const uniq = [...new Set(commSlugs)];
for (const slug of uniq) {
  const hits = editorialFiles.filter(f =>
    fs.readFileSync(path.join(ROOT, f), 'utf8').includes(`'${slug}'`) ||
    fs.readFileSync(path.join(ROOT, f), 'utf8').includes(`"${slug}"`));
  const d = hits.length ? maxDate(...hits) : [dataDate, detailDate].sort().pop();
  dates.routes[`/communities/${slug}`] = d;
}

// ---- families ----
dates.families['compare'] = maxDate('lib/compare-editorial.js', 'app/compare/[slug]/page.js');
dates.families['golf-clubs'] = maxDate('lib/data.js', 'app/golf-clubs/[slug]/page.js');
dates.families['architects'] = maxDate('lib/data.js', 'app/architects/[slug]/page.js');
dates.families['zips'] = maxDate('lib/seo-content.js', 'app/scottsdale/[zip]/page.js');
dates.families['landing-topics'] = maxDate('lib/landing-topics.js', 'app/scottsdale-communities/[topic]/page.js');

fs.writeFileSync(path.join(ROOT, 'lib/content-dates.json'), JSON.stringify(dates, null, 2));
console.log('routes:', Object.keys(dates.routes).length, 'families:', Object.keys(dates.families).length);
console.log('sample:', dates.routes['/communities/grayhawk'], dates.families['compare']);

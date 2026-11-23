// One-time image localization (Fix Round A, item 9).
// Downloads every external (unsplash/pexels/wikimedia) image referenced in the
// codebase into /public/images/[section]/[slug].webp, guarantees each entity a
// DISTINCT photo (deduped by photo id), and rewrites the source references.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = '/app';
const PUB = path.join(ROOT, 'public', 'images');
const POOL = fs.readFileSync(path.join(ROOT, 'scripts/image-pool.txt'), 'utf8')
  .split('\n').map(s => s.trim()).filter(Boolean);

const EXT_RE = /https:\/\/(?:images\.unsplash\.com|images\.pexels\.com|upload\.wikimedia\.org)[^'")\s]+/g;

function photoId(url) {
  let m = url.match(/photo-([A-Za-z0-9-]+)/);
  if (m) return 'u-' + m[1];
  m = url.match(/pexels-photo-(\d+)/) || url.match(/photos\/(\d+)/);
  if (m) return 'p-' + m[1];
  return url.split('?')[0];
}

const usedIds = new Set();
let poolIdx = 0;
function claim(url) {
  // Returns a source URL whose photo id is not yet used; prefers `url`.
  if (url && !usedIds.has(photoId(url))) { usedIds.add(photoId(url)); return url; }
  while (poolIdx < POOL.length) {
    const cand = POOL[poolIdx++];
    if (!usedIds.has(photoId(cand))) { usedIds.add(photoId(cand)); return cand; }
  }
  throw new Error('image pool exhausted');
}

async function download(url, outFile, attempt = 0) {
  const full = url.includes('unsplash.com') && !/[?&]w=/.test(url) ? url + '&w=1600' : url;
  const res = await fetch(full, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(outFile);
}

const rewrites = []; // { file, from, to }
const jobs = [];     // { url, out }

function planEntity(section, slug, url) {
  let src;
  try { src = claim(url); } catch (e) { console.error('POOL EXHAUSTED at', section, slug); process.exit(1); }
  const rel = `/images/${section}/${slug}.webp`;
  const out = path.join(PUB, section, `${slug}.webp`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  jobs.push({ url: src, out });
  return rel;
}

// ---------- 1. lib/data.js ----------
const dataFile = path.join(ROOT, 'lib/data.js');
let data = fs.readFileSync(dataFile, 'utf8');
const sections = [
  ['COMMUNITIES', 'communities'],
  ['GOLF_COURSES', 'golf-courses'],
  ['COMMUNITIES_EXTRA', 'communities'],
  ['COMMUNITIES_EXTRA_2', 'communities'],
  ['COMMUNITIES_EXTRA_3', 'communities'],
  ['ZIP_FAQS', 'zips'],
  ['ARCHITECTS', 'architects'],
  ['GOLF_CLUBS', 'golf-clubs'],
  ['MARKET_REPORTS', 'market-reports'],
  ['LEAD_MAGNETS', 'guides'],
  ['ZIP_PAGES', 'zips'],
  ['AUTHORS', 'authors'],
  ['FEATURED', 'pages']
];
const sectionStarts = sections
  .map(([name, dir]) => ({ name, dir, idx: data.indexOf(`export const ${name}`) }))
  .filter(s => s.idx >= 0)
  .sort((a, b) => a.idx - b.idx);
function sectionFor(pos) {
  let cur = { dir: 'misc' };
  for (const s of sectionStarts) if (pos >= s.idx) cur = s;
  return cur.dir;
}
let m;
const dataMatches = [];
const fieldRe = /(image|cover|avatar|heroImage|photo):\s*'(https:\/\/(?:images\.unsplash\.com|images\.pexels\.com|upload\.wikimedia\.org)[^']+)'/g;
while ((m = fieldRe.exec(data)) !== null) {
  // nearest preceding slug
  const before = data.slice(Math.max(0, m.index - 2500), m.index);
  const slugMatches = [...before.matchAll(/slug:\s*'([a-z0-9-]+)'/g)];
  const after = data.slice(m.index, m.index + 2500);
  const slugAfter = after.match(/slug:\s*'([a-z0-9-]+)'/);
  const slug = slugMatches.length ? slugMatches[slugMatches.length - 1][1] : (slugAfter ? slugAfter[1] : `item-${m.index}`);
  dataMatches.push({ url: m[2], slug, pos: m.index });
}
const seenNames = new Set();
for (const dm of dataMatches) {
  const dir = sectionFor(dm.pos);
  let name = dm.slug;
  let i = 2;
  while (seenNames.has(`${dir}/${name}`)) name = `${dm.slug}-${i++}`;
  seenNames.add(`${dir}/${name}`);
  const rel = planEntity(dir, name, dm.url);
  rewrites.push({ file: dataFile, from: dm.url, to: rel });
}

// ---------- 2. blog MDX covers ----------
const blogDir = path.join(ROOT, 'content/blog');
for (const f of fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))) {
  const p = path.join(blogDir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const cm = txt.match(/cover:\s*"(https:\/\/[^"]+)"/);
  if (!cm) continue;
  const slug = f.replace(/\.mdx$/, '');
  const rel = planEntity('blog', slug, cm[1]);
  rewrites.push({ file: p, from: cm[1], to: rel });
}

// ---------- 3. page-level images ----------
const pageFiles = [
  'app/scottsdale-golf-courses/page.js',
  'app/golf-clubs/page.js',
  'app/relocating-to-scottsdale/page.js',
  'app/property-spotlight/sample/page.js'
];
for (const pf of pageFiles) {
  const p = path.join(ROOT, pf);
  if (!fs.existsSync(p)) continue;
  const txt = fs.readFileSync(p, 'utf8');
  const urls = [...new Set(txt.match(EXT_RE) || [])];
  urls.forEach((u, i) => {
    const base = pf.split('/')[1].replace(/[^a-z0-9-]/g, '');
    const name = urls.length > 1 ? `${base}-${i + 1}` : base;
    const rel = planEntity('pages', name, u);
    rewrites.push({ file: p, from: u, to: rel });
  });
}

// ---------- run downloads ----------
console.log(`Planned ${jobs.length} downloads, ${rewrites.length} rewrites`);
let ok = 0, fail = 0;
const queue = [...jobs];
async function worker() {
  while (queue.length) {
    const j = queue.shift();
    try { await download(j.url, j.out); ok++; }
    catch (e) {
      // fallback: replace with a fresh pool image
      try {
        const alt = claim(null);
        await download(alt, j.out); ok++;
        console.log('FALLBACK used for', j.out);
      } catch (e2) { fail++; console.error('FAIL', j.out, e.message); }
    }
  }
}
await Promise.all([worker(), worker(), worker(), worker(), worker()]);
console.log(`Downloaded ok=${ok} fail=${fail}`);
if (fail > 0) process.exit(1);

// ---------- apply rewrites ----------
const byFile = new Map();
for (const r of rewrites) {
  if (!byFile.has(r.file)) byFile.set(r.file, fs.readFileSync(r.file, 'utf8'));
  byFile.set(r.file, byFile.get(r.file).split(r.from).join(r.to));
}
for (const [f, txt] of byFile) fs.writeFileSync(f, txt);
console.log('Rewrote', byFile.size, 'files. Done.');

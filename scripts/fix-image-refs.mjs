// Corrective pass: ensure every entity in lib/data.js points at ITS OWN
// /images/<section>/<slug>.webp file (fixes the shared-URL global-replace bug).
import fs from 'fs';

const dataFile = '/app/lib/data.js';
let data = fs.readFileSync(dataFile, 'utf8');

const sections = [
  ['COMMUNITIES', 'communities'],
  ['GOLF_COURSES', 'golf-courses'],
  ['ARCHITECTS', 'architects'],
  ['GOLF_CLUBS', 'golf-clubs'],
  ['COMMUNITIES_EXTRA', 'communities'],
  ['COMMUNITIES_EXTRA_2', 'communities'],
  ['COMMUNITIES_EXTRA_3', 'communities'],
  ['MARKET_REPORTS', 'market-reports'],
  ['LEAD_MAGNETS', 'guides'],
  ['ZIP_PAGES', 'zips']
];
const starts = sections
  .map(([name, dir]) => ({ name, dir, idx: data.indexOf(`export const ${name}`) }))
  .filter(s => s.idx >= 0).sort((a, b) => a.idx - b.idx);
const dirFor = pos => { let d = 'misc'; for (const s of starts) if (pos >= s.idx) d = s.dir; return d; };

let out = '';
let last = 0;
const re = /(image|cover|avatar|heroImage):\s*'(\/images\/[^']+)'/g;
let m, fixed = 0, missing = 0;
while ((m = re.exec(data)) !== null) {
  const before = data.slice(Math.max(0, m.index - 2500), m.index);
  const slugs = [...before.matchAll(/slug:\s*'([a-z0-9-]+)'/g)];
  if (!slugs.length) continue;
  const slug = slugs[slugs.length - 1][1];
  const dir = dirFor(m.index);
  const want = `/images/${dir}/${slug}.webp`;
  if (m[2] !== want) {
    if (fs.existsSync('/app/public' + want)) {
      out += data.slice(last, m.index) + `${m[1]}: '${want}'`;
      last = m.index + m[0].length;
      fixed++;
    } else { missing++; console.log('NO FILE for', dir, slug, '(leaving', m[2], ')'); }
  }
}
out += data.slice(last);
fs.writeFileSync(dataFile, out);
console.log('fixed', fixed, 'missing', missing);

// report remaining duplicate references
const refs = [...out.matchAll(/\/images\/[a-z-]+\/[a-z0-9.-]+\.webp/g)].map(x => x[0]);
const c = {};
refs.forEach(r => c[r] = (c[r] || 0) + 1);
Object.entries(c).filter(([, n]) => n > 1).forEach(([r, n]) => console.log('DUP in data.js:', r, n));

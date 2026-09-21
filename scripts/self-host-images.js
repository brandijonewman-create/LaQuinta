// One-off image downloader. Run once with:
//   node scripts/self-host-images.js
// Downloads each community hero image + the homepage hero to /public/images,
// then prints a mapping so we can search-replace the URLs in source.
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const COMMUNITIES_DIR = path.join(OUT_DIR, 'communities');
const HERO_DIR = path.join(OUT_DIR, 'hero');
fs.mkdirSync(COMMUNITIES_DIR, { recursive: true });
fs.mkdirSync(HERO_DIR, { recursive: true });

// Slug → external URL, pulled by hand from community-content.js.
const raw = fs.readFileSync(
  path.join(__dirname, '..', 'lib', 'content', 'community-content.js'),
  'utf8'
);

// Grab every "'slug': {" and the following image: '...'  pair.
const entries = [];
const blockRe = /'([a-z0-9-]+)':\s*\{[^}]*?image:\s*'([^']+)'/gs;
let m;
while ((m = blockRe.exec(raw)) !== null) {
  entries.push({ slug: m[1], url: m[2] });
}
console.log(`Found ${entries.length} community image references.`);

// Also the homepage hero.
const heroRaw = fs.readFileSync(
  path.join(__dirname, '..', 'components', 'home', 'hero.js'),
  'utf8'
);
const heroMatch = /src="([^"]+)"/.exec(heroRaw);
if (heroMatch) {
  entries.push({ slug: '__hero__', url: heroMatch[1] });
}

async function downloadOne({ slug, url }) {
  const cleanUrl = url; // keep querystring; Pexels/Unsplash respect it
  const res = await fetch(cleanUrl);
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status} for ${cleanUrl}`);
  }
  const outPath =
    slug === '__hero__'
      ? path.join(HERO_DIR, 'homepage-hero.jpg')
      : path.join(COMMUNITIES_DIR, `${slug}.jpg`);
  await pipeline(res.body, fs.createWriteStream(outPath));
  const size = fs.statSync(outPath).size;
  return { slug, outPath, size };
}

(async () => {
  const mapping = [];
  for (const e of entries) {
    try {
      const r = await downloadOne(e);
      const localPath =
        r.slug === '__hero__'
          ? '/images/hero/homepage-hero.jpg'
          : `/images/communities/${r.slug}.jpg`;
      mapping.push({ from: e.url, to: localPath, kb: Math.round(r.size / 1024) });
      console.log(`  ok  ${r.slug.padEnd(35)} ${Math.round(r.size / 1024)} KB`);
    } catch (err) {
      console.log(`  FAIL ${e.slug}: ${err.message}`);
    }
  }
  // Emit a JSON file the next step can read to search-replace URLs.
  fs.writeFileSync(
    path.join(__dirname, 'image-url-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  console.log(`\nWrote scripts/image-url-mapping.json with ${mapping.length} rows.`);
})();

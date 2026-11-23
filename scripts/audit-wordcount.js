// Audit: fetch sitemap URLs from localhost and count visible words per page.
const BASE = 'http://localhost:3000';

function words(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(' ').filter(Boolean).length;
}

async function main() {
  const sm = await fetch(`${BASE}/sitemap.xml`).then(r => r.text());
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const paths = urls.map(u => new URL(u).pathname);
  const results = [];
  for (const p of paths) {
    try {
      const res = await fetch(`${BASE}${p}`);
      const html = await res.text();
      results.push({ path: p, status: res.status, words: words(html) });
    } catch (e) {
      results.push({ path: p, status: 'ERR', words: 0 });
    }
  }
  results.sort((a, b) => a.words - b.words);
  for (const r of results) {
    console.log(String(r.words).padStart(6), String(r.status).padStart(4), r.path);
  }
  console.log('\nTotal pages:', results.length);
  console.log('Under 600 words:', results.filter(r => r.words < 600).length);
  console.log('600-1000 words:', results.filter(r => r.words >= 600 && r.words < 1000).length);
}
main();

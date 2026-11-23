// Codemod: convert <img> to next/image in app/ and components/ (item 9).
// Handles the dominant pattern: single-line aspect-wrapper + object-cover img.
import fs from 'fs';

const files = [
  'app/scottsdale-communities/[topic]/page.js',
  'app/architects/page.js',
  'app/architects/[slug]/page.js',
  'app/scottsdale-golf-courses/page.js',
  'app/page.js',
  'app/scottsdale-snowbird-guide/page.js',
  'app/golf-clubs/page.js',
  'app/scottsdale/[zip]/page.js',
  'app/communities/page.js',
  'app/market-reports/page.js',
  'app/market-reports/[slug]/page.js',
  'app/relocating-to-scottsdale/page.js',
  'app/blog/page.js',
  'app/blog/[slug]/page.js',
  'app/property-spotlight/sample/page.js',
  'app/scottsdale-golf-community-index-2026/page.js',
  'components/community-detail.js',
  'components/listing-card.js'
].map(f => '/app/' + f);

let totalConverted = 0;
for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  const before = (src.match(/<img /g) || []).length;
  if (!before) continue;

  // 1) single-line wrapper pattern: <TAG className="...."><img ... /></TAG-close on same line
  src = src.replace(/className="([^"]*)"([^>]*)>\s*<img\s+([^>]*?)\/>/g, (full, wrapCls, wrapRest, imgAttrs) => {
    const cls = wrapCls.includes('relative') ? wrapCls : wrapCls + ' relative';
    let attrs = imgAttrs.trim();
    // strip w-full h-full from img class, keep the rest
    attrs = attrs.replace(/className="([^"]*)"/, (a, c) => `className="${c.replace(/w-full|h-full/g, '').replace(/\s+/g, ' ').trim()}"`);
    return `className="${cls}"${wrapRest}><Image ${attrs} fill sizes="(max-width: 768px) 100vw, 50vw" />`;
  });

  // 2) any remaining bare <img ... /> lines: convert with fill and mark parent manually later
  const remaining = (src.match(/<img /g) || []).length;

  if (src.includes('<Image ') && !/from 'next\/image'/.test(src)) {
    if (src.startsWith("'use client'")) {
      src = src.replace(/^('use client';?\n)/, `$1import Image from 'next/image';\n`);
    } else {
      src = `import Image from 'next/image';\n` + src;
    }
  }
  fs.writeFileSync(f, src);
  totalConverted += before - remaining;
  if (remaining) console.log(`${f}: ${remaining} <img> left (manual)`);
}
console.log('converted', totalConverted);

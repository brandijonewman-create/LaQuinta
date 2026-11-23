#!/usr/bin/env node
// Renames the market pages and their links to match MARKET.slug in lib/market.js.
//
// Usage: node scripts/apply-market.mjs
//
// The slug the code currently uses is stored in .market-slug. The script moves
// every market page folder (for example app/scottsdale-home-value) to the new
// slug (app/laquinta-home-value), rewrites links that start with the old slug,
// then saves the new slug to .market-slug. Running it twice is safe.

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const marketSrc = fs.readFileSync(path.join(root, 'lib/market.js'), 'utf8');
const to = (marketSrc.match(/slug:\s*'([a-z0-9]+)'/) || [])[1];
if (!to) throw new Error('Could not read MARKET.slug from lib/market.js');

const slugFile = path.join(root, '.market-slug');
const from = fs.readFileSync(slugFile, 'utf8').trim();
if (from === to) {
  console.log(`Already on "${to}". Nothing to do.`);
  process.exit(0);
}

// 1. Rename top-level page folders that carry the old slug.
const appDir = path.join(root, 'app');
const folderPattern = new RegExp(`(^|-)${from}(-|$)`);
for (const name of fs.readdirSync(appDir)) {
  if (!folderPattern.test(name)) continue;
  const next = name.replace(folderPattern, `$1${to}$2`);
  fs.renameSync(path.join(appDir, name), path.join(appDir, next));
  console.log(`page  /${name}  ->  /${next}`);
}

// 2. Rewrite links that start with the old slug, in code only.
//    Matches '/scottsdale-...', "/relocating-to-scottsdale", `/scottsdale/${zip}` and similar.
const linkPattern = new RegExp(`(['"\`])/((?:[a-z-]+-)?)${from}(?=[-/'"\`])`, 'g');
let files = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(p); continue; }
    if (!/\.(js|jsx|mjs|ts|tsx)$/.test(entry.name)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const out = src.replace(linkPattern, (_, q, prefix) => `${q}/${prefix}${to}`);
    if (out !== src) { fs.writeFileSync(p, out); files++; }
  }
}
for (const d of ['app', 'components', 'lib']) walk(path.join(root, d));
console.log(`links rewritten in ${files} files`);

fs.writeFileSync(slugFile, `${to}\n`);
console.log(`Market slug is now "${to}".`);

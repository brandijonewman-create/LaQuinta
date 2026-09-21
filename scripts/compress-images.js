// Compress /public/images/**.jpg to reasonable web size (max 1920px wide,
// quality 78). Overwrites originals in place. Run with:
//   node scripts/compress-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'public', 'images');

async function compress(file) {
  const buf = fs.readFileSync(file);
  const before = buf.length;
  const out = await sharp(buf)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(file, out);
  return { before, after: out.length };
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.jpe?g$/i.test(entry.name)) files.push(full);
  }
  return files;
}

(async () => {
  const files = walk(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of files) {
    try {
      const { before, after } = await compress(f);
      totalBefore += before;
      totalAfter += after;
      const kbBefore = Math.round(before / 1024);
      const kbAfter = Math.round(after / 1024);
      const rel = path.relative(ROOT, f);
      console.log(`  ${rel.padEnd(50)}  ${kbBefore.toString().padStart(6)} KB -> ${kbAfter.toString().padStart(5)} KB`);
    } catch (err) {
      console.log(`  FAIL ${f}: ${err.message}`);
    }
  }
  console.log(
    `\nTotal: ${Math.round(totalBefore / 1024 / 1024)} MB -> ${Math.round(
      totalAfter / 1024 / 1024
    )} MB (${files.length} files)`
  );
})();

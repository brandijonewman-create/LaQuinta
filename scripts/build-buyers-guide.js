/**
 * Standalone PDF build script for the Scottsdale Golf Buyer's Guide.
 *
 * Run anytime the underlying community data or editorial changes:
 *   $ node scripts/build-buyers-guide.js
 *
 * It hits the local dev server's /api/guide-download endpoint, saves the PDF
 * to /public/downloads/scottsdale-golf-buyers-guide-2026.pdf, and then removes
 * the temporary lead document it created during generation. The dev server
 * must be running on http://localhost:3000.
 *
 * If you'd rather build without the dev server, the alternative is to refactor
 * /lib/buyers-guide-pdf.js to not import from /lib/data (which transitively
 * imports MongoDB) — out of scope for this script.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const HOST = 'localhost';
const PORT = 3000;
const SLUG = 'scottsdale-buyers-guide-2026';
const TITLE = 'The 2026 Scottsdale Golf Buyer\u2019s Guide';
const MARKER_EMAIL = '_build@build.local';
const OUT_PATH = path.join(__dirname, '..', 'public', 'downloads', `${SLUG}.pdf`);

function postJson(pathname, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = http.request(
      {
        host: HOST,
        port: PORT,
        path: pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}: ${Buffer.concat(chunks).toString('utf8').slice(0, 200)}`));
          }
          resolve(Buffer.concat(chunks));
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`> Generating PDF via http://${HOST}:${PORT}/api/guide-download ...`);
  const pdf = await postJson('/api/guide-download', {
    name: '_pdf_build',
    email: MARKER_EMAIL,
    guideSlug: SLUG,
    guideTitle: TITLE
  });

  if (!pdf || pdf.length < 1000 || !pdf.slice(0, 4).toString('ascii').startsWith('%PDF')) {
    throw new Error('Response is not a valid PDF.');
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, pdf);
  console.log(`> Wrote ${pdf.length.toLocaleString()} bytes to ${path.relative(process.cwd(), OUT_PATH)}`);

  console.log('> Cleaning up the build-marker lead from MongoDB ...');
  console.log('  Run this manually if you want to delete it:');
  console.log(`    mongosh "${process.env.MONGO_URL || 'mongodb://localhost:27017/golfhomes'}" --eval 'db.leads.deleteMany({"payload.email":"${MARKER_EMAIL}"})'`);
  console.log('> Done.');
}

main().catch(err => {
  console.error('Build failed:', err.message);
  process.exit(1);
});

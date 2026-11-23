# /public/downloads/

Hosted PDFs for lead-magnet gate pages.

## Convention
- File path: `/public/downloads/<magnet-slug>.pdf`
- Public URL: `/downloads/<magnet-slug>.pdf`
- Registry: `/lib/lead-magnets.js`
- Gate page: `/downloads/<magnet-slug>` (auto-generated)

## Adding a new magnet
1. Drop the PDF in this directory (use the slug as the filename).
2. Add an entry in `/lib/lead-magnets.js` keyed by the slug.
3. Link to `/downloads/<slug>` from any CTA on the site.
4. The gate page renders automatically with `noindex`.

Leads are saved in MongoDB collection `leads` (type: `magnet`). Retrieve via:
- JSON: `/api/leads/list?key=<passphrase>`
- CSV: `/api/leads/export.csv?key=<passphrase>`

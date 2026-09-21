// Admin leads dashboard. Key-gated via ?key=<LEADS_ACCESS_KEY>.
//
// Read-only server component. Reads leads + quiz + valuation collections
// and renders a tabbed table with basic type filters. Not indexed by
// search engines. No client-side JS beyond simple <form> filters.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { leadCollection, quizCollection, valuationCollection } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: 'Admin · Leads',
  robots: { index: false, follow: false },
};

const TYPE_LABELS = {
  contact:         'Contact form',
  'gated-asset':   'Gated download',
  'quiz-magnet':   'Quiz + guide',
  quiz:            'Quiz completion',
  collaborator:    'Realtor application',
  lead_magnet:     'Lead magnet',
  valuation:       'Home valuation',
};

function humanDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'short', timeStyle: 'short' });
}

function summarize(doc) {
  // Pull name/email/phone from the top-level or from `payload` (older schema).
  const p = doc.payload || {};
  return {
    name:    doc.name  || p.name  || '',
    email:   doc.email || p.email || '',
    phone:   doc.phone || p.phone || '',
    detail:  doc.message || doc.subject || p.assetTitle || p.brokerage || doc.address || doc.community || '',
    source:  doc.source || doc.type || '',
  };
}

export default async function AdminLeadsPage({ searchParams }) {
  const KEY = process.env.LEADS_ACCESS_KEY || '';
  const providedKey = searchParams?.key || '';
  const authed = !!KEY && providedKey === KEY;

  if (!authed) {
    return (
      <section className="container py-24 max-w-md">
        <h1 className="font-serif text-3xl text-palm">Admin · Leads</h1>
        <p className="text-foreground/70 mt-4 text-sm leading-relaxed">
          This page is key-gated. Append <code className="bg-sand-100 px-1 py-0.5 text-[12px]">?key=YOUR_LEADS_ACCESS_KEY</code> to the URL.
        </p>
        {!KEY && (
          <p className="text-terracotta mt-6 text-xs leading-relaxed">
            The <code>LEADS_ACCESS_KEY</code> environment variable is not set on the server.
          </p>
        )}
      </section>
    );
  }

  const activeType = searchParams?.type || 'all';
  const limit = Math.min(parseInt(searchParams?.limit || '200', 10), 1000);

  // Pull each collection separately, then merge for the "All" view.
  const [leadsDocs, quizDocs, valuationDocs] = await Promise.all([
    (await leadCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),
    (await quizCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),
    (await valuationCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray(),
  ]);

  const allDocs = [
    ...leadsDocs,
    ...quizDocs.map((d) => ({ ...d, type: d.type || 'quiz' })),
    ...valuationDocs.map((d) => ({ ...d, type: d.type || 'valuation' })),
  ].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const typeCounts = {};
  for (const d of allDocs) {
    const t = d.type || 'unknown';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  }

  const filtered = activeType === 'all'
    ? allDocs
    : allDocs.filter((d) => (d.type || 'unknown') === activeType);

  const typeChips = ['all', ...Object.keys(typeCounts).sort()];

  return (
    <section className="container py-14 lg:py-20 max-w-[1400px]">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-terracotta mb-2">Admin · Read-only</div>
          <h1 className="font-serif text-3xl md:text-4xl text-palm">Leads</h1>
          <p className="text-foreground/65 mt-2 text-sm">
            {allDocs.length} total across contact, quiz, downloads and valuations. Showing the most recent {limit}.
          </p>
        </div>
        <div className="text-[11px] text-foreground/50">
          <Link href={`/api/leads/export.csv?key=${encodeURIComponent(providedKey)}`} className="underline underline-offset-4 hover:text-palm">
            Export CSV
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {typeChips.map((t) => {
          const isActive = t === activeType;
          const count = t === 'all' ? allDocs.length : (typeCounts[t] || 0);
          const label = t === 'all' ? 'All' : (TYPE_LABELS[t] || t);
          return (
            <Link
              key={t}
              href={`/admin/leads?key=${encodeURIComponent(providedKey)}&type=${encodeURIComponent(t)}`}
              className={
                'text-xs uppercase tracking-[0.18em] px-4 py-2 border transition-colors ' +
                (isActive
                  ? 'bg-palm text-sand-50 border-palm'
                  : 'bg-sand-50 text-foreground/70 border-border hover:border-palm hover:text-palm')
              }
            >
              {label}
              <span className={'ml-2 ' + (isActive ? 'text-gold' : 'text-foreground/45')}>{count}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 border border-border bg-white overflow-x-auto">
        <table className="min-w-full text-[13px]">
          <thead>
            <tr className="bg-sand-100 text-foreground/70 uppercase tracking-[0.14em] text-[10px]">
              <th className="text-left px-4 py-3">When</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Detail / Source</th>
              <th className="text-left px-4 py-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-foreground/55 py-16 text-sm">
                  No leads in this bucket yet.
                </td>
              </tr>
            )}
            {filtered.map((doc, i) => {
              const s = summarize(doc);
              return (
                <tr key={doc.id || i} className="border-t border-border align-top">
                  <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">{humanDate(doc.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-sand-100 border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground/70">
                      {TYPE_LABELS[doc.type] || doc.type || 'lead'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground/85">{s.name || '—'}</td>
                  <td className="px-4 py-3">
                    {s.email ? (
                      <a href={`mailto:${s.email}`} className="text-palm underline underline-offset-2 hover:text-terracotta">
                        {s.email}
                      </a>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-foreground/70 whitespace-nowrap">{s.phone || '—'}</td>
                  <td className="px-4 py-3 text-foreground/70 max-w-[380px]">
                    <div className="line-clamp-3">{s.detail || s.source || '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-foreground/50 whitespace-nowrap">
                    {doc.meta?.ip || '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[11px] text-foreground/45">
        Data is read live from MongoDB. Nothing is cached. This page is <code>noindex, nofollow</code>.
      </p>
    </section>
  );
}

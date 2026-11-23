import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, MARKET_REPORTS, findReport } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  return MARKET_REPORTS.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const r = findReport(params.slug);
  if (!r) return { title: 'Report not found' };
  return {
    robots: { index: false, follow: true },
    title: r.title,
    description: r.summary,
    alternates: { canonical: `${SITE.url}/market-reports/${r.slug}` },
    openGraph: { url: `${SITE.url}/market-reports/${r.slug}`, type: 'article', images: [r.cover], publishedTime: r.publishDate }
  };
}

export default function Page({ params }) {
  const r = findReport(params.slug);
  if (!r) notFound();
  const others = MARKET_REPORTS.filter(x => x.slug !== r.slug).slice(0,3);

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Market Reports', path: '/market-reports' },
        { name: r.quarter, path: `/market-reports/${r.slug}` }
      ])} />
      <JsonLd data={{
        '@context':'https://schema.org','@type':'Report',
        name: r.title, datePublished: r.publishDate, about: 'Scottsdale Arizona real estate market',
        publisher: { '@type':'Organization', name: SITE.name },
        url: `${SITE.url}/market-reports/${r.slug}`
      }} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4 flex items-center gap-2"><Calendar className="h-3 w-3" /> Market Report &middot; {r.quarter}</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">{r.title}</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">{r.summary}</p>
          <div className="mt-3 text-xs text-emerald-50/55">Period: {r.dateRange}</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-10">
        <div className="rounded-xl border border-amber-300/40 bg-amber-50/60 p-5 text-sm text-[#062840]/85">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-800 mb-1">Editorial estimate</div>
          The figures below are <strong>editorial estimates</strong> compiled from publicly available reporting and reasonable market interpolation: they are not a live MLS pull, and they are not investment advice. Verify current numbers against ARMLS or a licensed Arizona real-estate professional before making any purchase, listing, or pricing decision.
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-serif text-3xl text-[#062840] mb-6">Headline metrics (editorial estimates)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {r.stats.map(s => (
            <div key={s.label} className="p-6 rounded-xl border border-emerald-900/10 bg-white">
              <div className="text-xs uppercase tracking-wider text-emerald-900/60">{s.label}</div>
              <div className="font-serif text-3xl text-[#062840] mt-2">{s.val}</div>
              <div className={`flex items-center gap-1 text-xs mt-2 ${ (s.up && !s.invert) || (!s.up && s.invert) ? 'text-emerald-700' : 'text-rose-700' }`}>
                {s.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>
        <MarketDisclaimer />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-6">
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-[#062840] mb-6">More reports</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map(o => (
            <Link key={o.slug} href={`/market-reports/${o.slug}`} className="group rounded-xl overflow-hidden border border-emerald-900/10 bg-white hover:shadow-xl transition">
              <div className="aspect-[5/3] overflow-hidden relative"><Image src={o.cover} alt={o.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-amber-700">{o.scope} &middot; {o.quarter}</div>
                <div className="font-serif text-xl text-[#062840] mt-1">{o.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, MARKET_REPORTS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Real Estate Market Reports 2026',
  description: 'Quarterly Scottsdale luxury & golf-community market reports. Median price, days on market, inventory by neighborhood. Updated quarterly.',
  alternates: { canonical: `${SITE.url}/market-reports` },
  openGraph: { url: `${SITE.url}/market-reports`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const cityWide = MARKET_REPORTS.filter(r => r.scope === 'City-wide');
  const byCommunity = MARKET_REPORTS.filter(r => r.scope !== 'City-wide');
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Market Reports', path: '/market-reports' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Market Reports</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale Market Intelligence</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">Quarterly reports across the Scottsdale luxury and golf-community markets. Data sourced from ARMLS closed transactions.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-serif text-3xl text-[#062840] mb-6">City-wide reports</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cityWide.map(r => (
            <Link key={r.slug} href={`/market-reports/${r.slug}`} className="group overflow-hidden rounded-xl bg-white border border-emerald-900/10 hover:shadow-xl transition">
              <div className="aspect-[5/3] overflow-hidden relative"><Image src={r.cover} alt={r.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1"><Calendar className="h-3 w-3" /> {r.quarter}</div>
                <h3 className="font-serif text-xl text-[#062840] leading-snug">{r.title}</h3>
                <p className="text-sm text-emerald-900/70 mt-2 line-clamp-3">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-800 group-hover:text-amber-600">View report <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
        <MarketDisclaimer />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-[#062840] mb-6">By community</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {byCommunity.map(r => (
            <Link key={r.slug} href={`/market-reports/${r.slug}`} className="group overflow-hidden rounded-xl bg-white border border-emerald-900/10 hover:shadow-xl transition">
              <div className="aspect-[5/3] overflow-hidden relative"><Image src={r.cover} alt={r.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {r.scope} &middot; {r.quarter}</div>
                <h3 className="font-serif text-xl text-[#062840] leading-snug">{r.title}</h3>
                <p className="text-sm text-emerald-900/70 mt-2 line-clamp-3">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-800 group-hover:text-amber-600">View report <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
        <MarketDisclaimer />
      </section>
    </PageShell>
  );
}

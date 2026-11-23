import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, LEAD_MAGNETS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, FileText, Download } from 'lucide-react';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Golf Real Estate Guides',
  description: 'Guides to buying luxury golf homes in Scottsdale: community deep-dives, market reports, and the 2026 Buyer\u2019s Guide. Independent, ad-supported coverage.',
  alternates: { canonical: `${SITE.url}/guides` },
  openGraph: {
    url: `${SITE.url}/guides`,
    title: 'Scottsdale Golf Real Estate Guides',
    description: 'Independent guides to luxury golf real estate in Scottsdale.',
    images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }]
  }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' }
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4 flex items-center gap-2">
            <FileText className="h-3 w-3" /> Guides
          </div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale Golf Real Estate Guides</h1>
          <p className="mt-5 text-emerald-50/85 text-lg max-w-3xl">
            Independent, ad-supported guides to luxury golf real estate in Scottsdale.
            We do not sell homes. We do not run an MLS feed. We write honestly about what each
            community delivers, what each club costs, and what the relocation actually looks like
            in 2026.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-[#062840] mb-2">Buyer&rsquo;s guides</h2>
        <p className="text-emerald-900/70 mb-8">Full-length PDFs you can download to read offline.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {LEAD_MAGNETS.map(g => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group rounded-2xl border border-emerald-900/10 bg-white p-6 md:p-8 hover:shadow-xl transition flex flex-col"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-3 flex items-center gap-2">
                <Download className="h-3 w-3" /> Direct download
              </div>
              <h3 className="font-serif text-2xl text-[#062840] leading-snug">{g.title}</h3>
              <p className="mt-3 text-sm text-emerald-900/75 leading-relaxed flex-1">{g.description}</p>
              {g.chapters && g.chapters.length > 0 && (
                <ul className="mt-4 space-y-1 text-xs text-emerald-900/60">
                  {g.chapters.slice(0, 4).map(ch => (
                    <li key={ch}>&middot; {ch}</li>
                  ))}
                </ul>
              )}
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#062840] group-hover:text-amber-700 transition">
                Read the guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          <Link href="/blog" className="rounded-xl border border-emerald-900/10 bg-emerald-50/30 p-6 hover:shadow-md transition">
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-700 mb-2">Journal</div>
            <div className="font-serif text-xl text-[#062840]">Long-form journal</div>
            <p className="text-xs text-emerald-900/65 mt-1">Community deep-dives, comparisons, and relocation analysis.</p>
          </Link>
          <Link href="/market-reports" className="rounded-xl border border-emerald-900/10 bg-emerald-50/30 p-6 hover:shadow-md transition">
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-700 mb-2">Quarterly</div>
            <div className="font-serif text-xl text-[#062840]">Market reports</div>
            <p className="text-xs text-emerald-900/65 mt-1">Price-range and inventory analysis by ZIP, with disclaimers.</p>
          </Link>
          <Link href="/glossary" className="rounded-xl border border-emerald-900/10 bg-emerald-50/30 p-6 hover:shadow-md transition">
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-700 mb-2">Reference</div>
            <div className="font-serif text-xl text-[#062840]">Glossary</div>
            <p className="text-xs text-emerald-900/65 mt-1">Golf and real-estate terminology used across the site.</p>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

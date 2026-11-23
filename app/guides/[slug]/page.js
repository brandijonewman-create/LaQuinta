import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, LEAD_MAGNETS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Check, FileText, Download, ArrowRight } from 'lucide-react';

const guide = LEAD_MAGNETS[0];
const DOWNLOAD_HREF = `/downloads/${guide.slug}`;

export const metadata = {
  robots: { index: false, follow: true },
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `${SITE.url}/guides/${guide.slug}` },
  openGraph: { url: `${SITE.url}/guides/${guide.slug}`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: guide.title, path: `/guides/${guide.slug}` }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4 flex items-center gap-2"><FileText className="h-3 w-3" /> Buyer Guide · 2026 Edition</div>
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight">{guide.title}</h1>
            <p className="mt-5 text-emerald-50/85 text-lg">{guide.subtitle}</p>
            <ul className="mt-8 space-y-2">
              {guide.chapters.map(ch => (
                <li key={ch} className="flex items-start gap-2 text-sm text-emerald-50/85"><Check className="h-5 w-5 text-amber-300 mt-0.5 shrink-0" /> {ch}</li>
              ))}
            </ul>
          </div>
          <div className="md:sticky md:top-24">
            <div className="rounded-2xl bg-white text-[#062840] p-8 shadow-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-700 mb-3">
                <Download className="h-3.5 w-3.5" /> Hosted PDF · No email
              </div>
              <h2 className="font-serif text-2xl leading-snug mb-3">Get the full guide</h2>
              <p className="text-sm text-[#062840]/75 leading-relaxed">
                Tell us a little about your search and the download starts immediately.
                The file is hosted on this site: we do not email it.
              </p>
              <Link
                href={DOWNLOAD_HREF}
                className="mt-6 w-full inline-flex justify-center items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-6 py-3 text-sm font-semibold tracking-wide transition"
              >
                {guide.cta || 'Download the guide'} <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-[11px] text-[#062840]/55 leading-relaxed">
                We do not sell your data. We do not send marketing emails.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-[#062840] mb-4">Who this guide is for</h2>
        <p className="text-emerald-900/85 text-lg">If you\u2019re considering a luxury golf-home purchase in Scottsdale: whether as a primary residence, second home, or investment, this guide compresses years of on-the-ground Scottsdale research into a tight playbook. We made it because too many buyers were paying hourly relocation consultants for information we already knew.</p>
        <MarketDisclaimer />
        <p className="text-emerald-900/85 text-lg mt-4">It’s most useful if you’re 6–18 months out from buying: the residency, tax, and club-membership planning often takes that long to do well.</p>

        {/* Inline mid-content CTA card */}
        <div className="mt-10 rounded-2xl border border-amber-300/30 bg-amber-50/60 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-serif text-xl text-[#062840]">Ready when you are.</div>
            <p className="text-sm text-[#062840]/70 mt-1">Direct download. We do not email this file.</p>
          </div>
          <Link
            href={DOWNLOAD_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a5c] text-amber-50 px-6 py-3 text-sm font-semibold tracking-wide transition shrink-0"
          >
            {guide.cta || 'Download the guide'} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

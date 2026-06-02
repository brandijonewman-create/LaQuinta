import { notFound } from 'next/navigation';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import { market } from '@/lib/site-config';

const VALID_ZIPS = ['92253'];

export function generateStaticParams() {
  return VALID_ZIPS.map((zip) => ({ zip }));
}

export function generateMetadata({ params }) {
  if (!VALID_ZIPS.includes(params.zip)) return {};
  return {
    title: `La Quinta Market Report — ${params.zip}`,
    description: `Market context for La Quinta ZIP ${params.zip} — honest ranges only.`,
    alternates: { canonical: `/market-reports/${params.zip}` },
  };
}

export default function MarketReportZipPage({ params }) {
  if (!VALID_ZIPS.includes(params.zip)) notFound();
  return (
    <>
      <PageHero
        eyebrow={`ZIP ${params.zip}`}
        title={`La Quinta · ${params.zip} Market Report`}
        subtitle="A quarterly read on the La Quinta golf-community market. Ranges only — verify with a licensed California real-estate professional before transacting."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Market Reports', href: '/market-reports' }, { label: params.zip }]} />
        <div className="max-w-3xl mt-10 space-y-8">
          <Disclaimer />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Median range', 'Inventory months', 'YoY direction'].map((m) => (
              <div key={m} className="bg-sand-50 border border-border p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">{m}</div>
                <div className="font-serif text-3xl text-palm mt-2">TBD</div>
                <div className="text-[11px] text-foreground/55 mt-1 italic">Range only when published</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-serif text-3xl text-palm mb-3">What we cover</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Single-family range, by club</li>
              <li>Condo / villa range, by club</li>
              <li>Months of inventory, with seasonality note</li>
              <li>Membership initiation environment (qualitative)</li>
              <li>What changed quarter-over-quarter</li>
            </ul>
          </div>

          <p className="text-foreground/65 italic text-sm">
            The full Q3 2026 report is in development. We will not publish a figure until it is sourced.
          </p>
        </div>
      </section>
    </>
  );
}

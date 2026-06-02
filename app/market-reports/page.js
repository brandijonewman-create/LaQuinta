import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import { market } from '@/lib/site-config';

export const metadata = {
  title: 'La Quinta Market Reports',
  description: 'Quarterly market reports for La Quinta\u2019s 92253 ZIP code. Honest ranges with disclaimers — no fabricated medians.',
};

export default function MarketReportsIndex() {
  const zips = market.cities.flatMap((c) => c.zips);
  return (
    <>
      <PageHero
        eyebrow="Market Reports"
        title="Honest market context for La Quinta."
        subtitle="Quarterly reports for the 92253 ZIP — ranges only, with the verify-with-a-licensed-pro disclaimer."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Market Reports' }]} />
        <div className="max-w-2xl mt-10">
          <Disclaimer />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {zips.map((zip) => (
            <Link key={zip} href={`/market-reports/${zip}`} className="group border border-border hover:border-palm bg-sand-50 hover:bg-palm hover:text-sand-50 transition-colors p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-terracotta group-hover:text-gold">La Quinta</div>
              <div className="font-serif text-4xl text-palm group-hover:text-sand-50 mt-2">{zip}</div>
              <div className="text-sm text-foreground/70 group-hover:text-sand-50/80 mt-3">View market report &rarr;</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

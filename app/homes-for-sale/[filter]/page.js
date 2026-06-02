import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';

const FILTERS = {
  'gated':                      { label: 'Gated communities',         seo: 'Gated golf communities in La Quinta with private security and 24-hour access.' },
  'golf-membership-included':   { label: 'Golf membership included',  seo: 'La Quinta homes where the purchase includes a deeded or transferable golf membership.' },
  'mountain-view':              { label: 'Mountain views',             seo: 'La Quinta golf homes with direct Santa Rosa or Coral Reef mountain views.' },
  'new-construction':           { label: 'New construction',           seo: 'Newly built La Quinta golf homes — currently strongest at Andalusia and the southern half of PGA West.' },
  'pga-west':                   { label: 'PGA West homes',             seo: 'Homes inside PGA West, La Quinta\u2019s largest private golf community.' },
  'the-madison-club':           { label: 'The Madison Club homes',     seo: 'Homes inside The Madison Club, La Quinta\u2019s most discreet private community.' },
  'under-2-million':            { label: 'Under $2 million',           seo: 'La Quinta golf homes priced under $2,000,000 — typically condos, fairway villas, and resale single-family in older communities.' },
  '2-to-5-million':             { label: '$2M–$5M',                     seo: 'La Quinta golf homes priced $2,000,000–$5,000,000 — the mid-luxury band.' },
  'over-5-million':             { label: 'Over $5 million',            seo: 'La Quinta golf homes priced over $5,000,000 — typically The Madison Club, Hideaway, and PGA West estate sections.' },
};

export function generateStaticParams() {
  return Object.keys(FILTERS).map((filter) => ({ filter }));
}

export function generateMetadata({ params }) {
  const f = FILTERS[params.filter];
  if (!f) return {};
  return {
    title: `La Quinta Homes for Sale: ${f.label}`,
    description: f.seo,
    alternates: { canonical: `/homes-for-sale/${params.filter}` },
  };
}

export default function HomesForSaleFilterPage({ params }) {
  const f = FILTERS[params.filter];
  if (!f) notFound();
  return (
    <>
      <PageHero
        eyebrow="Homes for Sale"
        title={`La Quinta: ${f.label}`}
        subtitle={f.seo}
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Homes for Sale', href: '/homes-for-sale' }, { label: f.label }]} />
        <div className="mt-10 max-w-2xl">
          <Disclaimer>
            Live listings for this filter will appear here when a verified California IDX feed is connected. Until then this page exists as an honest placeholder — no fabricated inventory.
          </Disclaimer>
        </div>
        <div className="mt-10">
          <Link href="/homes-for-sale" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">← All filters</Link>
        </div>
      </section>
    </>
  );
}

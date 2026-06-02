import { notFound } from 'next/navigation';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ComingSoon from '@/components/shared/coming-soon';

const DOWNLOADS = {
  'la-quinta-buyers-checklist': { label: 'La Quinta Buyer\u2019s Checklist', desc: 'A printable checklist for buying into a La Quinta private golf community.' },
  'club-membership-comparison': { label: 'Club Membership Comparison', desc: 'A one-page comparison of the seven La Quinta private clubs.' },
};

export function generateStaticParams() {
  return Object.keys(DOWNLOADS).map((slug) => ({ slug }));
}

export const metadata = {
  // Gated downloads should NOT be indexed.
  robots: { index: false, follow: false },
};

export default function DownloadPage({ params }) {
  const d = DOWNLOADS[params.slug];
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow="Download" title={d.label} subtitle={d.desc} />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Downloads' }, { label: d.label }]} />
        <div className="mt-10 max-w-3xl">
          <ComingSoon note="The lead-magnet system (MongoDB-backed, no third-party CRM) arrives soon." />
        </div>
      </section>
    </>
  );
}

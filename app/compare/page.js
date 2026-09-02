import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata = {
  title: 'Compare La Quinta Communities',
  description: 'Side-by-side comparison of any two La Quinta private golf communities — architects, courses, membership style, real-estate character.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Two clubs, side by side."
        subtitle="Compare any two La Quinta private communities across architecture, courses, membership, and real-estate character."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        <div className="mt-10 max-w-3xl">
          <ComingSoon note="The comparison tool arrives once all seven community profiles are verified." ctaHref="/communities" ctaLabel="Browse communities" />
        </div>
      </section>
    </>
  );
}

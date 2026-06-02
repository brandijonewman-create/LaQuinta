import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata = {
  title: 'Find Your La Quinta Community',
  description: 'Eight questions to match you to the La Quinta private golf communities most aligned with how you want to live.',
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Find Your Community"
        title="Seven private clubs. One quiz."
        subtitle="Eight questions — architecture, scale, social scene, price band, and membership style. We&rsquo;ll match you to the La Quinta communities most aligned with how you actually want to live."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Community Quiz' }]} />
        <div className="mt-10 max-w-3xl">
          <ComingSoon
            note="The interactive quiz arrives soon — with MongoDB-only lead capture (no third-party CRM). Until then, browse the seven community profiles directly."
            ctaHref="/communities"
            ctaLabel="Browse communities"
          />
        </div>
      </section>
    </>
  );
}

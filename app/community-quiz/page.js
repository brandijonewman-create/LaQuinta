import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import QuizFlow from '@/components/quiz/quiz-flow';

export const metadata = {
  title: 'Find Your La Quinta Community',
  description: 'Eight questions to match you to the La Quinta private golf communities most aligned with how you want to live.',
  alternates: { canonical: '/community-quiz' },
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Find Your Community"
        title="Seven private clubs. One quiz."
        subtitle="Eight questions — architecture, scale, social scene, price band, and membership style — and we&rsquo;ll match you to the La Quinta communities most aligned with how you actually want to live."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Community Quiz' }]} />
        <div className="mt-12">
          <QuizFlow />
        </div>
      </section>
    </>
  );
}

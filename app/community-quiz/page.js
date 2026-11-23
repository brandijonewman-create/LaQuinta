import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import QuizClient from './QuizClient';

export const metadata = {
  title: 'Find Your La Quinta Community',
  description: 'A six-question match across every named La Quinta community, private clubs, semi-private, resort residences, active-adult 55+, gated residential, and historic non-gated neighborhoods. We point you to the community that fits best, plus two runners-up.',
  alternates: { canonical: '/community-quiz' },
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Find Your Community"
        title={'Twenty-eight communities. One match.'}
        subtitle="Six questions: the kind of community, setting, design era, character, real-estate footprint, and how you&rsquo;ll actually use the home. We&rsquo;ll match you to the La Quinta community that fits best, plus two runners-up."
      />
      <section className="container py-14 lg:py-20">
        <Breadcrumbs items={[{ label: 'Community Quiz' }]} />
        <div className="mt-10">
          <QuizClient />
        </div>
      </section>
    </>
  );
}

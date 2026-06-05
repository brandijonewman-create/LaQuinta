import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import QuizClient from './QuizClient';

export const metadata = {
  title: 'Find Your La Quinta Community',
  description: 'A five-question match: tell us how you want to live, and we will point you to the La Quinta private golf community that fits best. Free downloadable guide included.',
  alternates: { canonical: '/community-quiz' },
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Find Your Community"
        title="Seven private clubs. One match."
        subtitle="Five questions — setting, course era, club character, real-estate footprint, and how you\u2019ll actually use the home. We\u2019ll match you to the La Quinta community that fits best, plus two runners-up, and send you a printable guide for the match."
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

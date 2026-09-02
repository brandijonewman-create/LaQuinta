import Hero from '@/components/home/hero';
import IntroBlock, { ArchitectsPreview } from '@/components/home/editorial-intro';
import { FeaturedRealtorSlot } from '@/components/home/homepage-blocks';
import FeaturedCommunities from '@/components/home/featured-communities';
import LifestylePreview from '@/components/home/lifestyle-preview';
import QuizCta from '@/components/home/quiz-cta';
import LatestJournal from '@/components/home/latest-journal';

export const metadata = {
  alternates: { canonical: '/' },
};

// Homepage section order mirrors the Golf Lifestyle network reference site
// (Palm Beach Golf Lifestyle) for consistency across all 14 markets:
//   Hero → Intro → Communities → Featured Realtor → Quiz CTA → Architects →
//   Lifestyle → Latest articles
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroBlock />
      <FeaturedCommunities />
      <FeaturedRealtorSlot />
      <QuizCta />
      <ArchitectsPreview />
      <LifestylePreview />
      <LatestJournal />
    </>
  );
}

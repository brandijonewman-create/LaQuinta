import Hero from '@/components/home/hero';
import { StatsRow, ResourcesRow, FeaturedRealtorSlot } from '@/components/home/homepage-blocks';
import FeaturedCommunities from '@/components/home/featured-communities';
import EditorialIntro from '@/components/home/editorial-intro';
import LifestylePreview from '@/components/home/lifestyle-preview';
import QuizCta from '@/components/home/quiz-cta';
import LatestJournal from '@/components/home/latest-journal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsRow />
      <FeaturedCommunities />
      <EditorialIntro />
      <ResourcesRow />
      <LifestylePreview />
      <QuizCta />
      <FeaturedRealtorSlot />
      <LatestJournal />
    </>
  );
}

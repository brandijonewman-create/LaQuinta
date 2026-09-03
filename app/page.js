import Hero from '@/components/home/hero';
import IntroBlock, { ArchitectsPreview } from '@/components/home/editorial-intro';
import { FeaturedRealtorSlot } from '@/components/home/homepage-blocks';
import PartnerInquiryForm from '@/components/home/partner-inquiry-form';
import FeaturedCommunities from '@/components/home/featured-communities';
import LifestylePreview from '@/components/home/lifestyle-preview';
import QuizCta from '@/components/home/quiz-cta';
import LatestJournal from '@/components/home/latest-journal';

export const metadata = {
  alternates: { canonical: '/' },
};

// Homepage section order:
//   Hero → Intro → Communities → Partner Recruitment → Partner Inquiry Form
//   → Quiz CTA → Architects → Lifestyle → Latest articles
// The Partner Recruitment section is a B2B pitch to prospective realtors
// while the La Quinta Exclusive Market Partner slot is open. The buyer
// contact form still mounts globally below <main> on every page.
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroBlock />
      <FeaturedCommunities />
      <FeaturedRealtorSlot />
      <PartnerInquiryForm />
      <QuizCta />
      <ArchitectsPreview />
      <LifestylePreview />
      <LatestJournal />
    </>
  );
}

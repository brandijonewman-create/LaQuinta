import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CommunityCard from '@/components/community-card';
import { communities } from '@/lib/site-config';
import { getCommunityContent } from '@/lib/content/community-content';

export const metadata = {
  title: 'La Quinta Private Golf Communities',
  description: 'Profiles of the private golf communities in La Quinta, California — The Madison Club, The Hideaway, The Tradition, Andalusia, The Quarry, and La Quinta Country Club.',
};

export default function CommunitiesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Clubs"
        title="La Quinta’s private golf communities."
        subtitle="Each profile covers the architecture, the membership, the daily lifestyle, and the real-estate character — with listings and private tours arranged by Kathy Schowe, our Exclusive Market Partner."
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Communities' }]} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {communities.map((c) => {
            const content = getCommunityContent(c.slug);
            return (
              <CommunityCard
                key={c.slug}
                community={c}
                image={content.image}
                blurb={content.tagline}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

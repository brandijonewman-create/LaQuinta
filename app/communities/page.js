import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CommunityCard from '@/components/community-card';
import { communities } from '@/lib/site-config';
import { getCommunityContent } from '@/lib/content/community-content';

export const metadata = {
  title: 'La Quinta Golf & Gated Communities',
  description: 'An editorial guide to La Quinta\u2019s golf, gated and historic residential communities — from the flagship private clubs (PGA West, The Madison Club, The Hideaway, The Tradition, Andalusia, The Quarry, La Quinta Country Club) to semi-private clubs, resort residences, active-adult and gated residential HOAs across the city.',
  alternates: { canonical: '/communities' },
};

export default function CommunitiesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Communities"
        title="La Quinta’s golf and gated communities."
        subtitle="An editorial guide to the flagship private clubs, semi-private clubs, resort residences, active-adult and gated residential HOAs across La Quinta &mdash; with listings and private tours arranged by a licensed California real-estate professional."
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

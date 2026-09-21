import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CommunitiesGrid from '@/components/communities-grid';
import { communities } from '@/lib/site-config';
import { getCommunityContent } from '@/lib/content/community-content';

export const metadata = {
  title: 'La Quinta Golf & Gated Communities',
  description:
    'An editorial guide to La Quinta\u2019s golf, gated and historic residential communities \u2014 the flagship private clubs (PGA West, The Madison Club, The Hideaway, The Tradition, Andalusia, The Quarry, La Quinta Country Club) plus semi-private clubs, resort residences, active-adult and gated residential HOAs across the city.',
  alternates: { canonical: '/communities' },
};

export default function CommunitiesIndexPage() {
  // Serialize only the fields the client needs so the payload stays lean.
  const contentByslug = {};
  for (const c of communities) {
    const content = getCommunityContent(c.slug);
    contentByslug[c.slug] = { image: content.image, tagline: content.tagline };
  }

  return (
    <>
      <PageHero
        eyebrow="Communities"
        title={'La Quinta\u2019s golf and gated communities.'}
        subtitle="An editorial guide to the flagship private clubs, semi-private clubs, resort residences, active-adult and gated residential HOAs across La Quinta &mdash; with listings and private tours arranged by a licensed California real-estate professional."
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Communities' }]} />

        <CommunitiesGrid communities={communities} contentByslug={contentByslug} />
      </section>
    </>
  );
}

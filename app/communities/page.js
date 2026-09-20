import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CommunityCard from '@/components/community-card';
import { communities } from '@/lib/site-config';
import { getCommunityContent } from '@/lib/content/community-content';

export const metadata = {
  title: 'La Quinta Private Golf Communities',
  description: 'Profiles of the seven private golf communities in La Quinta, California — PGA West, The Madison Club, The Hideaway, The Tradition, Andalusia, The Quarry, and La Quinta Country Club.',
  alternates: { canonical: '/communities' },
};

export default function CommunitiesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Clubs"
        title="La Quinta’s private golf communities."
        subtitle="Each profile covers the architecture, the membership, the daily lifestyle, and the real-estate character &mdash; with listings and private tours arranged by a licensed California real-estate professional."
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

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="text-2xl font-serif text-foreground">
            Other La Quinta communities we don&rsquo;t currently cover
          </h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            La Quinta and the surrounding Coachella Valley are home to several additional
            golf and country-club neighborhoods that fall outside the seven private clubs
            profiled above. If you&rsquo;re researching one of the communities below and
            would like a private introduction, tell us what you&rsquo;re looking for and
            we&rsquo;ll route you to a licensed California real-estate professional who
            covers that area.
          </p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-muted-foreground list-disc list-inside">
            <li>Rancho La Quinta Country Club</li>
            <li>Mountain View Country Club</li>
            <li>Coral Mountain Club</li>
            <li>The Citrus Club</li>
            <li>La Quinta Resort Club</li>
            <li>Duna La Quinta</li>
            <li>Trilogy at La Quinta</li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Looking for something specific?{' '}
            <a href="/contact" className="text-foreground underline underline-offset-4 hover:no-underline">
              Send us a note
            </a>{' '}
            and we&rsquo;ll follow up personally.
          </p>
        </div>
      </section>
    </>
  );
}

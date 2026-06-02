import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata = {
  title: 'La Quinta Lifestyle Map',
  description: 'An interactive Mapbox-powered lifestyle map of La Quinta — private clubs, neighborhoods, hiking, and Old Town.',
};

export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="Lifestyle Map"
        title="La Quinta, interactive."
        subtitle="An interactive Mapbox map plotting the seven private clubs, key neighborhoods, the Cove, hiking trailheads, and Old Town La Quinta."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Lifestyle Map' }]} />
        <div className="mt-10">
          <ComingSoon
            note="The Mapbox-powered interactive map arrives soon. The Mapbox token is configured; the interactive renderer is next."
            ctaHref="/communities"
            ctaLabel="Browse communities meanwhile"
          />
        </div>
      </section>
    </>
  );
}

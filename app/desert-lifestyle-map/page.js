import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import LifestyleMap from '@/components/lifestyle-map';

export const metadata = {
  title: 'La Quinta Lifestyle Map',
  description: 'An interactive map of La Quinta — the seven private golf communities, Old Town, the Cove, the La Quinta Resort, and the foothill trailheads.',
  alternates: { canonical: '/desert-lifestyle-map' },
};

export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="Lifestyle Map"
        title="La Quinta, interactive."
        subtitle="All seven private golf communities, plus the Cove, Old Town, the La Quinta Resort, and the foothill trailheads — mapped against the Santa Rosa Mountains. Click any marker for context."
      />
      <section className="container py-12 lg:py-16">
        <Breadcrumbs items={[{ label: 'Lifestyle Map' }]} />
        <div className="mt-8">
          <LifestyleMap />
        </div>
        <p className="text-[11px] text-foreground/55 mt-6 italic max-w-3xl">
          Marker positions are approximate. Verify any siting decision with the club, the parcel records, or a licensed California real-estate professional.
        </p>
      </section>
    </>
  );
}

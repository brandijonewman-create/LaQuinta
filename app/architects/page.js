import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ArchitectCard from '@/components/architect-card';
import { architects } from '@/lib/site-config';

export const metadata = {
  title: 'The Architects of La Quinta Golf',
  description: 'Profiles of the seven course architects whose work defines La Quinta golf — Pete Dye, Tom Fazio, Jack Nicklaus, Greg Norman, Arnold Palmer, Tom Weiskopf, and Rees Jones.',
};

export default function ArchitectsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="The Architects"
        title="The seven names behind La Quinta golf."
        subtitle="Pete Dye, Tom Fazio, Jack Nicklaus, Greg Norman, Arnold Palmer, Tom Weiskopf, and Rees Jones — the architects whose routings shaped the city."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Architects' }]} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
          {architects.map((a) => <ArchitectCard key={a.slug} architect={a} />)}
        </div>
      </section>
    </>
  );
}

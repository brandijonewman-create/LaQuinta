import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Homes for Sale in La Quinta',
  description: 'Current La Quinta listings are handled by Kathy Schowe, our California-licensed Exclusive Market Partner. A live IDX/MLS search will appear here once the feed is connected.',
};

const filters = [
  { slug: 'gated', label: 'Gated communities' },
  { slug: 'golf-membership-included', label: 'Golf membership included' },
  { slug: 'mountain-view', label: 'Mountain views' },
  { slug: 'new-construction', label: 'New construction' },
  { slug: 'the-madison-club', label: 'The Madison Club homes' },
  { slug: 'under-2-million', label: 'Under $2M' },
  { slug: '2-to-5-million', label: '$2M–$5M' },
  { slug: 'over-5-million', label: 'Over $5M' },
];

export default function HomesForSaleIndex() {
  return (
    <>
      <PageHero
        eyebrow="Homes for Sale"
        title="Where to find current La Quinta listings."
        subtitle="This site is a lifestyle guide to La Quinta’s golf communities — we don’t list inventory ourselves. Current listings, private showings, and buyer representation are handled by Kathy Schowe, our California-licensed Exclusive Market Partner. A live MLS search will appear here once the CARETS/CRMLS feed is connected."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Homes for Sale' }]} />

        <div className="mt-10 max-w-2xl">
          <Disclaimer>
            A lifestyle guide, not a brokerage. Listings and representation are provided by our California-licensed Exclusive Market Partner. The live IDX feed is scheduled once the CARETS/CRMLS integration is in place.
          </Disclaimer>
        </div>

        <div className="mt-14">
          <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />Browse by</div>
          <h2 className="font-serif text-3xl text-palm mb-8">Filters that will be live at launch</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filters.map((f) => (
              <Link key={f.slug} href={`/homes-for-sale/${f.slug}`} className="group border border-border hover:border-palm bg-sand-50 hover:bg-palm hover:text-sand-50 transition-colors p-5">
                <div className="font-serif text-lg leading-tight">{f.label}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/55 group-hover:text-sand-50/70 mt-2">View when live →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3 justify-center">
          <Button asChild className="rounded-none bg-palm text-sand-50 hover:bg-palm-700">
            <Link href="/#meet-kathy">Connect with Kathy for current listings</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none">
            <Link href="/community-quiz">Take the Community Quiz</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

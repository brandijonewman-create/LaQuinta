import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Homes for Sale in La Quinta',
  description: 'A live IDX feed for La Quinta golf homes will appear here when a verified California CARETS/CRMLS feed and a partner licensed agent are in place.',
};

const filters = [
  { slug: 'gated', label: 'Gated communities' },
  { slug: 'golf-membership-included', label: 'Golf membership included' },
  { slug: 'mountain-view', label: 'Mountain views' },
  { slug: 'new-construction', label: 'New construction' },
  { slug: 'pga-west', label: 'PGA West homes' },
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
        title="Listings coming soon."
        subtitle="A live MLS feed for La Quinta will appear here the day we have a verified California CARETS/CRMLS data partner and a licensed-agent partner in place. Until then, no fake listings."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Homes for Sale' }]} />

        <div className="mt-10 max-w-2xl">
          <Disclaimer>
            This site is the definitive guide. Listings are powered by our California-licensed realtor partners. The live IDX feed goes online when the CARETS/CRMLS data is in place.
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

        <div className="mt-14 text-center">
          <Button asChild className="rounded-none bg-palm text-sand-50 hover:bg-palm-700">
            <Link href="/community-quiz">Take the Community Quiz Instead</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

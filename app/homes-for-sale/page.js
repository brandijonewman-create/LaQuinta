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

        <div className="mt-20 border-t border-border pt-14">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center bg-palm text-sand-50 p-8 md:p-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-4">For Licensed Real Estate Professionals</div>
              <h3 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-4">Are you a La Quinta realtor?</h3>
              <p className="text-sm md:text-base text-sand-50/85 leading-relaxed max-w-xl">
                We work with a small, vetted bench of California-licensed agents who actually know La Quinta&rsquo;s seven private clubs &mdash; PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, La Quinta Country Club, and The Quarry. If that&rsquo;s you, apply to become a featured collaborator and receive direct introductions to qualified leads from our Community Quiz funnel.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <Button asChild className="rounded-none bg-gold text-palm hover:bg-gold/90 font-semibold tracking-[0.15em] uppercase text-xs py-6">
                <Link href="/collaborate">Apply to Collaborate</Link>
              </Button>
              <Link
                href="/collaborate"
                className="text-[11px] uppercase tracking-[0.22em] text-sand-50/70 hover:text-gold transition-colors text-center lg:text-left"
              >
                Read who we&rsquo;re looking for &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { owner, site } from '@/lib/site-config';

export const metadata = {
  title: 'About',
  description: `About ${site.name}, a lifestyle guide to La Quinta’s private golf communities. Owned and operated by ${owner.name}.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A lifestyle guide to La Quinta."
        subtitle={`${site.name} covers La Quinta’s private golf communities, the architects who built them, and the desert life around them. Listings and buyer representation are reserved for one California-licensed realtor partner, selected by invitation.`}
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
            <h2 className="font-serif text-3xl text-palm">Owned and operated by {owner.fullName}</h2>
            <p>
              {site.name} is owned and operated by <strong className="text-palm">{owner.fullName}</strong>. The site is part of the Golf Lifestyle Network, a group of single-city publications, each written for the buyer who wants a clear picture of the communities before a showing is arranged.
            </p>
            <p>
              We publish lifestyle context: architecture, membership, and daily character. Listings, tours, and representation are reserved for one invited local realtor partner in each market.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">Meet the owner and creator</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start pt-1">
              <img
                src="/images/brandi-jo-newman.jpg"
                alt="Brandi Jo Newman, owner and creator"
                className="w-32 h-32 rounded-full object-cover border border-border flex-shrink-0"
              />
              <div className="space-y-4">
                <p>
                  <strong className="text-palm">Brandi Jo Newman</strong> is the owner and creator of {site.name}. Golf has been the throughline of her life: from 1994 to 2003 she competed as a touring professional, playing across six continents.
                </p>
                <p>
                  She has spent three decades building financial services and marketing businesses, and created the Golf Lifestyle Network to give serious buyers an honest, community-by-community read on the places golfers want to live, written before a single showing is arranged. La Quinta is one of the network&rsquo;s live markets, alongside Scottsdale and Palm Beach.
                </p>
                <p>
                  Brandi Jo is the author of the guides and journal on this site until additional strategic partners contribute. The aim is simple: the clearest, most trustworthy picture of desert golf communities anywhere online.
                </p>
              </div>
            </div>

            <h2 className="font-serif text-3xl text-palm pt-6">What we publish</h2>
            <p>
              Profiles of La Quinta&rsquo;s private golf communities. Dedicated pages for the architects whose work defines them. Long-form buyer guides, starting with the 2026 La Quinta Golf Buyer&rsquo;s Guide. A market-context report for the 92253 ZIP. An interactive lifestyle map. And a regular journal on the questions buyers actually ask.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">Our standards</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Every quote and testimonial we publish is real and attributed.</li>
              <li>Market figures are sourced, shown as ranges, and paired with a verify-with-a-licensed-professional note.</li>
              <li>Homeowner and celebrity addresses stay private.</li>
            </ul>

          </div>

          <aside className="lg:col-span-5">
            <div className="bg-sand-50 border border-border p-6 lg:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-4">Get in touch</div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Reach out via the community quiz or the home-valuation form. Inquiries are answered directly by the team at {owner.name}.
              </p>
              <p className="text-sm text-foreground/70 mt-4">
                Press inquiries, corrections, or community partnership questions: please use the contact form on the relevant page.
              </p>
            </div>
            <div className="bg-palm text-sand-50 p-6 lg:p-8 mt-6">
              <div className="text-xs uppercase tracking-[0.28em] text-gold mb-3">The Network</div>
              <p className="text-sm text-sand-50/85 leading-relaxed">
                {site.name} is part of the Golf Lifestyle Network, operated by {owner.name}.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

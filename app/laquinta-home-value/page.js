import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ValuationForm from '@/components/valuation-form';
import { SITE, COMMUNITIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, TrendingUp, Home, Shield } from 'lucide-react';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Home Value: Golf-Community Valuation Report',
  description: 'What is your Scottsdale golf-community home worth in 2026? Request a no-obligation home-value report from a local specialist familiar with Grayhawk, DC Ranch, Silverleaf, Troon North and beyond.',
  alternates: { canonical: `${SITE.url}/scottsdale-home-value` },
  openGraph: { url: `${SITE.url}/scottsdale-home-value`, title: 'Scottsdale Home Value Tool', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function HomeValuePage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Scottsdale Home Value', path: '/laquinta-home-value' }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Scottsdale Golf-Community Home Valuation',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: { '@type': 'City', name: 'Scottsdale, AZ' },
        serviceType: 'Comparative Market Analysis (CMA) for residential real estate'
      }} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Seller Tools</div>
            <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">What is your Scottsdale golf home <em className="text-amber-300 not-italic">actually</em> worth in 2026?</h1>
            <p className="mt-6 text-emerald-50/85 text-lg max-w-xl">
              Automated home-value estimates routinely miss the mark in Scottsdale’s golf-community
              market, because they don’t weigh golf-course frontage, club-membership transferability,
              private-community premiums, or the specific buyer pool for your zip code.
            </p>
            <p className="mt-4 text-emerald-50/75 max-w-xl">
              Request a no-obligation, human-prepared valuation packet. We’ll pull active and sold comps inside your
              specific community, weight them against current days-on-market and absorption-rate data, and email you a
              one-page PDF estimate within one business day.
            </p>
            <MarketDisclaimer light className="max-w-xl" />
          </div>
          <div className="md:col-span-5">
            <ValuationForm />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div>
          <TrendingUp className="h-8 w-8 text-[#BA9273] mb-3" />
          <h3 className="font-serif text-2xl text-[#062840] mb-2">Hyper-local comps</h3>
          <p className="text-sm text-[#062840]/70">We pull comparable sales only from inside your own community (not just your zip code), because a Silverleaf comp doesn’t value a DC Ranch home, and vice versa.</p>
        </div>
        <div>
          <Home className="h-8 w-8 text-[#BA9273] mb-3" />
          <h3 className="font-serif text-2xl text-[#062840] mb-2">Golf premiums weighted</h3>
          <p className="text-sm text-[#062840]/70">Direct golf-course frontage, mountain views, and transferable club memberships are explicitly priced in line-by-line: the way buyer agents will price them when offers come in.</p>
        </div>
        <div>
          <Shield className="h-8 w-8 text-[#BA9273] mb-3" />
          <h3 className="font-serif text-2xl text-[#062840] mb-2">No obligation, no spam</h3>
          <p className="text-sm text-[#062840]/70">You get a one-page PDF and an offer to chat: nothing more. We don’t cold-call you, we don’t sell your data, and you’re not signed up for a drip campaign.</p>
        </div>
      </section>

      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840]">Why a human-prepared CMA beats algorithmic estimates</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-[#062840]/85">
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-2">What automated estimates miss</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>Golf-course-frontage premium (often a low-to-mid six-figure amount in Scottsdale; verify with a licensed Arizona real estate professional)</li>
                <li>Sub-community boundaries (e.g. Horseshoe Canyon inside Silverleaf)</li>
                <li>Transferable vs. non-transferable club memberships</li>
                <li>HOA assessment status (special assessments active?)</li>
                <li>Recent remodels not reflected in tax records</li>
                <li>Privacy/sightline issues that show up only on a site visit</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-2">What we factor in</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>Last 90 days of sold comps inside your community</li>
                <li>Currently-pending and currently-active inventory</li>
                <li>Absorption rate (months of supply) for your price band</li>
                <li>Buyer pool composition (cash vs. financed, primary vs. second-home)</li>
                <li>Days-on-market trend by community</li>
                <li>Seasonality and ramp-up to the Phoenix Open buyer wave</li>
              </ul>
            </div>
          </div>
          <MarketDisclaimer />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Browse by Community</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-8">Get community-specific market context first</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMMUNITIES.slice(0, 16).map(c => (
            <Link key={c.slug} href={`/communities/${c.slug}`} className="px-4 py-3 rounded-lg border border-[#062840]/10 text-sm text-[#062840] hover:border-[#BA9273] hover:bg-[#BA9273]/5 transition">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Ready to list? Or just curious?</h2>
          <p className="mt-3 text-emerald-50/80">Either way, the valuation carries no cost and no obligation, and we won’t hassle you.</p>
          <Link href="#top" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold">Request my valuation ↑ <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </PageShell>
  );
}

import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import SimpleLeadForm from '@/components/simple-lead-form';
import { SITE, COMMUNITIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Snowflake, Sun, Calendar, FileText, Plane, Home, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Scottsdale Snowbird Guide 2026 | Tax & HOA',
  description: 'The 2026 logistics guide for snowbirds buying or renting a Scottsdale golf-community home: Arizona residency thresholds, HOA seasonal-rental rules, club-membership economics for part-time owners, and the 90-day setup checklist.',
  alternates: { canonical: `${SITE.url}/scottsdale-snowbird-guide` },
  openGraph: { url: `${SITE.url}/scottsdale-snowbird-guide`, title: 'The Scottsdale Snowbird Guide 2026', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

const CHECKLIST = [
  { icon: Plane, label: 'Travel windows', detail: 'Most snowbirds arrive late October and stay through mid-April. The shoulder months (Nov + April) have noticeably better tee times and dining availability than Jan–Feb peak.' },
  { icon: FileText, label: 'Arizona residency thresholds', detail: 'Spending 183+ days/year in AZ generally triggers state-income-tax residency. Many snowbirds intentionally stay under 180 to preserve home-state residency.' },
  { icon: Home, label: 'HOA seasonal-rental rules', detail: 'Most Scottsdale golf-community HOAs prohibit short-term rentals (< 30 days). Long-stay (90+ day) rentals are usually permitted but may require HOA registration.' },
  { icon: Calendar, label: 'Club membership economics', detail: 'Many clubs offer dedicated "seasonal" or "social" memberships at 40–60% of full dues for part-time owners. Verify membership-tier flexibility before buying inside a club-affiliated community.' },
  { icon: Sun, label: 'Summer-period home management', detail: 'You\u2019ll need an A/C-monitored property-care plan from May through September. Reputable Scottsdale snowbird-home managers run $150–$300/month.' },
  { icon: Snowflake, label: 'Tax-residency planning', detail: 'Coordinate with a CPA who handles bi-state residency. Some snowbirds eventually flip residency to AZ for the state-income-tax savings; others deliberately stay home-state for estate-planning reasons.' }
];

const RECOMMENDED_COMMUNITIES = ['troon-north', 'grayhawk', 'gainey-ranch', 'mccormick-ranch', 'pinnacle-peak-country-club', 'troon-village'];

export default function SnowbirdGuide() {
  const recs = RECOMMENDED_COMMUNITIES.map(s => COMMUNITIES.find(c => c.slug === s)).filter(Boolean);

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Snowbird Guide', path: '/laquinta-snowbird-guide' }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Scottsdale Snowbird Guide 2026',
        author: { '@type': 'Organization', name: SITE.name },
        publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        datePublished: '2026-01-10'
      }} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-300 mb-3"><Snowflake className="h-4 w-4" /> 2026 Snowbird Edition</div>
            <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">The Scottsdale snowbird guide.</h1>
            <p className="mt-6 text-emerald-50/85 text-lg max-w-xl">
              Arizona residency thresholds, HOA seasonal-rental rules, club-membership economics for part-time owners,
              and the 90-day setup checklist. Written for the 100,000+ snowbirds who treat Scottsdale as their second home.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white rounded-2xl p-7 shadow-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">Free PDF</div>
              <h2 className="font-serif text-2xl text-[#062840] mb-1">Snowbird Buyer&rsquo;s Checklist</h2>
              <p className="text-sm text-[#062840]/65 mb-4">A 1-page setup checklist + 6-community shortlist for snowbird buyers. Sent to your email.</p>
              <SimpleLeadForm source="snowbird-guide" intent="snowbird-checklist" submitLabel="Send me the checklist" successMessage="Your snowbird checklist is on the way. Watch your inbox within one business day." />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">The 6 things that actually matter</div>
        <h2 className="font-serif text-3xl md:text-4xl text-[#062840]">Snowbird logistics in plain English.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {CHECKLIST.map(item => (
            <div key={item.label} className="flex gap-4 p-5 rounded-xl bg-white border border-[#062840]/10">
              <div className="p-2.5 bg-[#062840] text-amber-300 rounded-lg h-fit"><item.icon className="h-5 w-5" /></div>
              <div>
                <h3 className="font-serif text-xl text-[#062840]">{item.label}</h3>
                <p className="text-sm text-[#062840]/75 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#062840]/55 italic">
          None of the above is tax, legal, or HOA advice. Verify with your CPA, attorney, and the specific community&rsquo;s HOA before making decisions.
        </p>
      </section>

      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Best Communities for Snowbirds</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840]">Where Scottsdale snowbirds actually buy.</h2>
          <p className="mt-3 text-[#062840]/75 max-w-2xl">
            We weighted these six communities by lock-and-leave practicality, established management, golf-course access without full membership commitment, and resale liquidity: the things that actually matter when you&rsquo;re only here 4-6 months a year.
          </p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recs.map(c => (
              <Link key={c.slug} href={`/communities/${c.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[#062840]/10 hover:shadow-xl transition-all">
                <div className="aspect-[5/3] overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl text-[#062840] group-hover:text-[#BA9273] transition">{c.name}</h3>
                  <p className="text-sm text-[#062840]/65 mt-1 line-clamp-2">{c.tagline}</p>
                  <div className="flex items-center justify-between text-xs text-[#062840]/60 mt-3 pt-3 border-t border-[#062840]/10">
                    <span>{(c.location || '').split(',')[0]}</span>
                    <span className="text-[#BA9273] font-semibold">{c.priceRange}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <MarketDisclaimer />
        </div>
      </section>

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Not sure which snowbird community fits you?</h2>
          <p className="mt-3 text-emerald-50/75">Take our 2-minute matching quiz: tell us your investment range, golf preference, and lifestyle, and we&rsquo;ll surface your top 3 candidates from the 46 Scottsdale golf communities.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/community-quiz" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold">Take the community quiz <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/laquinta-golf-community-index-2026" className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 text-amber-50 hover:bg-amber-50 hover:text-[#062840] px-7 py-3 text-sm font-semibold">2026 Community Index</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

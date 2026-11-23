import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, COMMUNITIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, Crown, Award, TrendingUp, MapPin, Home, Calendar } from 'lucide-react';

export const metadata = {
  title: 'The 2026 Scottsdale Golf Community Index | 46 Tiered',
  description: 'A definitive editorial tier ranking of every named Scottsdale-area golf community in 2026. Tier 1 ultra-prestige, Tier 2 country-club flagships, Tier 3 resort-lifestyle, Tier 4 mid-market, and the emerging communities to watch.',
  alternates: { canonical: `${SITE.url}/scottsdale-golf-community-index-2026` },
  openGraph: { url: `${SITE.url}/scottsdale-golf-community-index-2026`, title: 'The 2026 Scottsdale Golf Community Index', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

// ────────────────────────────────────────────────────────────────────────────
// Editorial tier assignment.
// These tiers are *defensible* groupings based on objective, verifiable
// signals: price range, exclusivity (private/guarded vs. public), year of
// founding, scale of golf footprint, and the residential price band.
// NO numeric "scores" are invented \u2014 each community is placed in a tier
// using the editorial criteria documented on the page.
// ────────────────────────────────────────────────────────────────────────────
const TIER_DEFINITIONS = [
  {
    id: 'tier-1',
    label: 'Tier 1: Ultra-Prestige',
    icon: Crown,
    color: '#062840',
    accent: '#BA9273',
    criteria: 'Private members-only golf clubs with multi-million-dollar initiation/transfer fees, 24/7 guard-gated security, and home prices commonly above $3M. The buy-in to even tour the community is significant.',
    slugs: ['silverleaf', 'estancia', 'mirabel', 'desert-mountain', 'desert-highlands', 'scottsdale-national', 'whisper-rock', 'paradise-valley']
  },
  {
    id: 'tier-2',
    label: 'Tier 2: Country-Club Flagship',
    icon: Award,
    color: '#062840',
    accent: '#BA9273',
    criteria: 'Established master-planned communities with championship private or resort-affiliated golf, mature landscaping (20+ years), strong HOA, and a price floor near $1M. The "tour-stop quality" of Scottsdale golf living.',
    slugs: ['dc-ranch', 'troon-north', 'grayhawk', 'gainey-ranch', 'troon-village', 'sereno-canyon', 'sincuidados']
  },
  {
    id: 'tier-3',
    label: 'Tier 3: Resort-Lifestyle',
    icon: TrendingUp,
    color: '#062840',
    accent: '#BA9273',
    criteria: 'Resort-affiliated or destination communities where the lifestyle (spa, dining, daily-fee golf access) is the headline. Often includes mix of primary residences, second homes and short-term rentals. Mid-7 to low-8-figure homes co-exist with much-more-accessible price points.',
    slugs: ['boulders', 'mccormick-ranch', 'pinnacle-peak-country-club', 'firerock', 'phoenician-residences', 'kierland', 'carefree-resort-cc']
  },
  {
    id: 'tier-4',
    label: 'Tier 4: Established Mid-Market',
    icon: Home,
    color: '#062840',
    accent: '#BA9273',
    criteria: 'Mature 1990s/2000s golf neighborhoods with strong HOA structure, semi-private or community-affiliated golf, broad family appeal, and home prices typically $700K\u2013$1.8M. The smart-money entry into the Scottsdale golf-community footprint.',
    slugs: ['terravita', 'legend-trail', 'ancala', 'stonegate', 'tonto-verde', 'sun-ridge-canyon', 'mcdowell-mountain-ranch', 'scottsdale-ranch', 'scottsdale-mountain', 'eagle-mountain', 'scottsdale-cc-starfire', 'hidden-hills', 'tatum-ranch', 'ironwood-village']
  },
  {
    id: 'tier-5',
    label: 'Tier 5: Accessible & Emerging',
    icon: Calendar,
    color: '#062840',
    accent: '#BA9273',
    criteria: 'Newer master-plans, accessible-price golf neighborhoods, or North Phoenix corridor communities that offer the lifestyle benefits without the prestige-community premium. Strong appreciation potential as Scottsdale\u2019s urban edge migrates north.',
    slugs: ['windgate-ranch', 'saguaro-highlands', 'rio-verde', 'norterra', 'westbrook-village', 'dove-valley-ranch', 'rancho-manana', 'black-mountain-cc', 'carefree-cave-creek-custom', 'desert-ridge', 'blackstone-vistancia']
  }
];

export default function CommunityIndex2026() {
  // Resolve slugs to full community objects, in tier order
  const tiers = TIER_DEFINITIONS.map(t => ({
    ...t,
    communities: t.slugs.map(s => COMMUNITIES.find(c => c.slug === s)).filter(Boolean)
  }));

  // Sanity: list any communities not yet assigned to a tier
  const allTieredSlugs = new Set(TIER_DEFINITIONS.flatMap(t => t.slugs));
  const unranked = COMMUNITIES.filter(c => !allTieredSlugs.has(c.slug));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The 2026 Scottsdale Golf Community Index',
    description: 'A definitive tier ranking of every named Scottsdale-area golf community for 2026.',
    itemListElement: COMMUNITIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/communities/${c.slug}`,
      name: c.name
    }))
  };

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'The 2026 Community Index', path: '/laquinta-golf-community-index-2026' }
      ])} />
      <JsonLd data={itemListSchema} />

      {/* Hero */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-amber-300 mb-4">2026 Edition</div>
          <h1 className="font-serif text-4xl md:text-7xl tracking-tight leading-[1.02]">The Scottsdale Golf<br/><em className="text-amber-300 not-italic">Community Index.</em></h1>
          <p className="mt-7 text-emerald-50/85 text-lg md:text-xl max-w-3xl mx-auto">
            An editorial tier ranking of every named Scottsdale-area golf community in 2026,
            from the ultra-private $30M Silverleaf compound to the smart-money $700K mid-market plays.
          </p>
          <MarketDisclaimer light className="max-w-2xl mx-auto" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {tiers.map(t => (
              <a key={t.id} href={`#${t.id}`} className="bg-white/5 hover:bg-amber-300 hover:text-[#062840] border border-amber-300/30 rounded-lg p-3 text-xs uppercase tracking-wider transition">
                <div className="font-serif text-2xl text-amber-300 group-hover:text-[#062840] mb-1">{t.communities.length}</div>
                <div className="leading-tight">{t.label.split('')[1] || t.label}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Methodology</div>
        <h2 className="font-serif text-3xl md:text-4xl text-[#062840]">How we built this index.</h2>
        <p className="mt-4 text-[#062840]/80 leading-relaxed">
          We do not assign numeric scores or invented composite ratings. Instead, every Scottsdale-area golf community is
          placed into one of five tiers based on objective, verifiable signals:
        </p>
        <ul className="mt-5 space-y-2 text-[#062840]/85">
          <li className="flex gap-3"><span className="text-[#BA9273]">&bull;</span> <strong>Exclusivity:</strong> private members-only vs. semi-private vs. public/resort access</li>
          <li className="flex gap-3"><span className="text-[#BA9273]">&bull;</span> <strong>Price floor:</strong> the realistic minimum to acquire any residence inside the community in 2026</li>
          <li className="flex gap-3"><span className="text-[#BA9273]">&bull;</span> <strong>Security infrastructure:</strong> guard-gated 24/7 vs. card-gated vs. ungated</li>
          <li className="flex gap-3"><span className="text-[#BA9273]">&bull;</span> <strong>Golf footprint:</strong> championship 18 vs. multi-course campus vs. community-affiliated semi-private</li>
          <li className="flex gap-3"><span className="text-[#BA9273]">&bull;</span> <strong>Maturity:</strong> year founded, completeness of build-out, and HOA financial health</li>
        </ul>
        <p className="mt-5 text-[#062840]/80 leading-relaxed">
          Tier 1 is &ldquo;ultra-prestige&rdquo; not necessarily &ldquo;best for you.&rdquo; A Tier 4 community can be a far smarter primary
          residence than a Tier 1 one, depending on your goals. Use the tiers as orientation, not a ladder to climb.
        </p>
      </section>

      {/* Tiers */}
      {tiers.map(t => (
        <section key={t.id} id={t.id} className="border-t border-[#062840]/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-start gap-5 mb-6">
              <div className="p-3 rounded-xl bg-[#062840] text-amber-300">
                <t.icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-1">{t.communities.length} communities</div>
                <h2 className="font-serif text-3xl md:text-5xl text-[#062840]">{t.label}</h2>
                <p className="mt-3 text-[#062840]/75 max-w-3xl">{t.criteria}</p>
                <MarketDisclaimer />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {t.communities.map(c => (
                <Link key={c.slug} href={`/communities/${c.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[#062840]/10 hover:shadow-xl transition-all">
                  <div className="aspect-[5/3] overflow-hidden bg-[#062840]/5 relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl text-[#062840] group-hover:text-[#BA9273] transition">{c.name}</h3>
                    <p className="text-sm text-[#062840]/65 mt-1 line-clamp-2">{c.tagline}</p>
                    <div className="flex items-center justify-between text-xs text-[#062840]/60 mt-4 pt-3 border-t border-[#062840]/10">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{(c.location || '').split(',')[0]}</span>
                      <span className="text-[#BA9273] font-semibold">{c.priceRange || ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Unranked */}
      {unranked.length > 0 && (
        <section className="border-t border-[#062840]/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">Also Covered</div>
            <h2 className="font-serif text-3xl text-[#062840]">Additional Scottsdale-area golf communities</h2>
            <p className="mt-2 text-[#062840]/70 max-w-2xl">These communities are still being slotted into the 2026 tier framework. Each has a full guide page.</p>
            <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
              {unranked.map(c => (
                <Link key={c.slug} href={`/communities/${c.slug}`} className="px-4 py-3 rounded-lg border border-[#062840]/10 text-sm text-[#062840] hover:border-[#BA9273] hover:bg-[#BA9273]/5 transition">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Want to go deeper?</div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight">Get the full PDF buyer&rsquo;s guide.</h2>
          <p className="mt-5 text-emerald-50/80 max-w-2xl mx-auto">
            The 2026 Scottsdale Golf-Home Buyer&rsquo;s Guide expands on every tier in this index: club initiation
            economics, HOA fee comparisons, the Arizona residency tax playbook, and a 60-day relocation timeline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/guides/scottsdale-golf-buyers-guide" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold">Download the PDF guide <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/communities" className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 text-amber-50 hover:bg-amber-50 hover:text-[#062840] px-7 py-3 text-sm font-semibold">Browse all 46 communities</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

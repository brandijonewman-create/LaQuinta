import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ListingCard from '@/components/listing-card';
import ListingsMap from '@/components/lifestyle-map-lazy';
import FAQ from '@/components/faq';
import MarketDisclaimer from '@/components/market-disclaimer';
import RelatedContent from '@/components/related-content';
import QuizCTABand from '@/components/QuizCTABand';
import CommunityMagnetInline from '@/components/lead/CommunityMagnetInline';
import { getMagnet } from '@/lib/lead-magnets';
import {
  SITE,
  findCommunity,
  listingsByCommunity,
  COMMUNITY_FAQS,
  getComparableCommunities,
  getArchitectsForCommunity
} from '@/lib/data';
import { getPostsMentioningCommunity } from '@/lib/blog';
import { getCommunityEditorial } from '@/lib/community-editorial';
import { breadcrumbSchema, realEstateListingSchema, placeSchema, JsonLd } from '@/lib/seo';
import { MapPin, Home, Calendar, Trophy, Check, ArrowRight, BookOpen, Compass } from 'lucide-react';

export default function CommunityDetail({ slug }) {
  const c = findCommunity(slug);
  if (!c) return <div className="p-20 text-center">Community not found.</div>;
  const listings = listingsByCommunity(slug);
  const center = c.lat && c.lng ? [c.lng, c.lat] : [-111.91, 33.70];
  const faqs = COMMUNITY_FAQS[slug] || [];

  // Lead-magnet detection. If a community-guide PDF exists for this community
  // (12 of 46 today), render the inline lead-capture block before the related
  // content. Otherwise fall back to the quiz CTA to funnel the visitor into
  // the matcher \u2014 every community page has at least one lead-capture path.
  const magnetSlug = `community-guide-${slug}`;
  const magnet = getMagnet(magnetSlug);

  // Contextual cross-link data for internal-linking density. All three
  // helpers are deterministic and runtime-cheap; they boost topical
  // authority signals and reduce orphan-page risk in SEMrush audits.
  const comparableCommunities = getComparableCommunities(slug, 3);
  const courseArchitects = getArchitectsForCommunity(slug);
  const relatedPosts = getPostsMentioningCommunity(c.name, 3);

  // Long-form editorial (lib/community-editorial.js) — present for the 12
  // marquee communities; pages without an entry simply skip the section.
  const editorial = getCommunityEditorial(slug);

  // FAQPage JSON-LD — emitted whenever this community has FAQs in COMMUNITY_FAQS.
  // Google uses this to render expandable FAQ rich snippets in SERPs, which
  // typically lifts CTR 15–30% on top-10 ranked queries.
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null;

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Communities', path: '/communities' },
        { name: c.name, path: `/communities/${c.slug}` }
      ])} />
      <JsonLd data={placeSchema(c)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {listings.map(l => (
        <JsonLd key={l.id} data={realEstateListingSchema(l)} />
      ))}

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0"><Image src={c.image} alt={`${c.name} golf community in Scottsdale`} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062840]/60 via-[#062840]/55 to-[#062840]/90" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Scottsdale &middot; Golf Community</div>
          <h1 className="font-serif text-5xl md:text-6xl text-amber-50 tracking-tight">{c.name}</h1>
          <p className="text-amber-50/85 mt-4 max-w-2xl text-lg">{c.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-6 text-amber-50/80 text-sm">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-300" /> {c.location}</span>
            <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-300" /> {c.courses.join(' & ')}</span>
            <span className="flex items-center gap-2"><Home className="h-4 w-4 text-amber-300" /> {c.homeCount.toLocaleString()} residences</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-amber-300" /> Est. {c.yearEstablished}</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">Overview</div>
          <h2 className="font-serif text-4xl text-[#062840] mb-5">Life at {c.name}</h2>
          <p className="text-emerald-900/85 text-lg leading-relaxed">{c.description}</p>
          <h3 className="font-serif text-2xl text-[#062840] mt-10 mb-4">Community Highlights</h3>
          <ul className="space-y-2">
            {c.highlights.map(h => (
              <li key={h} className="flex items-start gap-2 text-emerald-900/85"><Check className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" /> {h}</li>
            ))}
          </ul>
        </div>
        <aside className="bg-[#062840] text-amber-50 rounded-2xl p-8 h-fit sticky top-24">
          <div className="font-serif text-2xl mb-1">{c.priceRange}</div>
          <div className="text-xs uppercase tracking-wider text-amber-300/80 mb-6">Current price range</div>
          <div className="space-y-4 text-sm text-emerald-50/80">
            <div><div className="text-emerald-50/50 text-xs uppercase tracking-wider">Golf</div>{c.courses.length} championship courses</div>
            <div><div className="text-emerald-50/50 text-xs uppercase tracking-wider">Homes</div>{c.homeCount.toLocaleString()} residences</div>
            <div><div className="text-emerald-50/50 text-xs uppercase tracking-wider">Established</div>{c.yearEstablished}</div>
          </div>
          <MarketDisclaimer light />
          <Link href="/#concierge" scroll={false} className="mt-8 w-full inline-flex justify-center items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-5 py-3 text-sm font-semibold transition">Request a {c.name} shortlist</Link>
        </aside>
      </section>

      {/* In-depth editorial — marquee communities only (lib/community-editorial.js) */}
      {editorial && (
        <section className="max-w-6xl mx-auto px-6 pb-4">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">In Depth</div>
            <h2 className="font-serif text-4xl text-[#062840] mb-8">{c.name}, examined properly</h2>
            {editorial.sections.map((s, i) => (
              <div key={i} className="mb-10">
                <h3 className="font-serif text-2xl text-[#062840] mb-4">{s.heading}</h3>
                {s.paragraphs.map((para, j) => (
                  <p key={j} className="text-emerald-900/85 text-lg leading-relaxed mb-5">{para}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Listings */}
      {listings.length > 0 && (
        <section className="bg-emerald-50/40 border-y border-emerald-900/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">For Sale</div>
                <h2 className="font-serif text-4xl text-[#062840]">Homes in {c.name}</h2>
              </div>
              <Link href="/homes-for-sale/1m-to-3m" className="hidden md:inline-flex items-center gap-1 text-sm text-emerald-800 hover:text-amber-600">All Scottsdale listings <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">Map</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-6">{c.name} on the map</h2>
        <ListingsMap listings={listings} communities={[c]} height={460} center={center} zoom={13} />
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <>
          <FAQ items={faqs} heading={`${c.name} FAQs`} />
          <div className="max-w-4xl mx-auto px-6 pb-4"><MarketDisclaimer /></div>
        </>
      )}

      {/* Designed by — architect cross-links */}
      {courseArchitects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2 flex items-center gap-2"><Compass className="h-3 w-3" /> Designed by</div>
          <h2 className="font-serif text-3xl text-[#062840] mb-6">
            The architects behind {c.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseArchitects.map(a => (
              <Link
                key={a.slug}
                href={`/architects/${a.slug}`}
                className="group rounded-xl overflow-hidden border border-emerald-900/10 bg-white hover:shadow-xl transition flex items-center gap-4 p-4"
              >
                {a.image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative"><Image src={a.image} alt={a.name} className="object-cover group-hover:scale-105 transition-transform" fill sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-xl text-[#062840] leading-tight">{a.name}</div>
                  <div className="text-xs text-emerald-900/60 mt-0.5 line-clamp-2">{a.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comparable communities — contextual, ranked by price tier + location */}
      {comparableCommunities.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">Compare</div>
          <h2 className="font-serif text-4xl text-[#062840] mb-6">Communities similar to {c.name}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {comparableCommunities.map(o => (
              <Link key={o.slug} href={`/communities/${o.slug}`} className="group rounded-xl overflow-hidden border border-emerald-900/10 bg-white hover:shadow-xl transition">
                <div className="aspect-[5/3] overflow-hidden relative"><Image src={o.image} alt={o.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-4">
                  <div className="font-serif text-2xl text-[#062840]">{o.name}</div>
                  <div className="text-xs text-emerald-900/60">{o.priceRange}</div>
                  <div className="text-[11px] text-emerald-900/50 mt-1">{o.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related editorial — blog posts that mention this community */}
      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-emerald-900/10">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2 flex items-center gap-2"><BookOpen className="h-3 w-3" /> Related reading</div>
          <h2 className="font-serif text-3xl text-[#062840] mb-6">
            Editorial coverage that touches {c.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-emerald-900/10 bg-white hover:shadow-xl transition"
              >
                {p.cover && (
                  <div className="aspect-[5/3] overflow-hidden relative"><Image src={p.cover} alt={p.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                )}
                <div className="p-4">
                  <div className="font-serif text-lg text-[#062840] leading-tight line-clamp-2">{p.title}</div>
                  <div className="text-xs text-emerald-900/60 mt-2 line-clamp-2">{p.excerpt}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lead capture \u2014 inline community magnet (if PDF exists) or quiz funnel CTA */}
      {magnet ? (
        <CommunityMagnetInline community={{ slug, name: c.name }} magnetSlug={magnetSlug} />
      ) : (
        <QuizCTABand
          variant="subtle"
          title={`Is ${c.name} actually the right fit for you?`}
          subtitle={`Take the 2-minute community quiz: we'll surface whether ${c.name} ranks in your top match, plus two runners-up to compare it against.`}
          cta="Take the community quiz"
        />
      )}

      <RelatedContent
        pageType="community"
        community={slug}
        excludePath={`/communities/${slug}`}
      />
    </PageShell>
  );
}

import MarketDisclaimer from '@/components/market-disclaimer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ListingCard from '@/components/listing-card';
import SavedSearchForm from '@/components/saved-search-form';
import { SITE, FILTER_PAGES, LISTINGS, findFilter, findCommunity } from '@/lib/data';
import { getFilterEditorial } from '@/lib/seo-content';
import { breadcrumbSchema, realEstateListingSchema, JsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  return FILTER_PAGES.map(f => ({ filter: f.slug }));
}

export async function generateMetadata({ params }) {
  const f = findFilter(params.filter);
  if (!f) return { title: 'Filter not found' };
  return {
    robots: { index: false, follow: true },
    title: f.title,
    description: f.description,
    alternates: { canonical: `${SITE.url}/homes-for-sale/${f.slug}` },
  openGraph: { url: `${SITE.url}/homes-for-sale/${f.slug}`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
  };
}

export default function Page({ params }) {
  const f = findFilter(params.filter);
  if (!f) notFound();
  const community = f.community ? findCommunity(f.community) : null;
  const editorial = getFilterEditorial(f.slug);
  // Compose a filtered listing set (community + price band) \u2014 LISTINGS is
  // intentionally empty until a live IDX/MLS feed is wired in. The page
  // renders the community context + saved-search subscription instead of
  // mock listings, preserving SEO equity while staying honest.
  const matches = LISTINGS.filter(l => {
    if (f.community && l.community !== f.community) return false;
    if (l.price < f.priceMin || l.price > f.priceMax) return false;
    return true;
  });

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Homes for Sale', path: '/homes-for-sale/1m-to-3m' },
        { name: f.title.replace(' for Sale',''), path: `/homes-for-sale/${f.slug}` }
      ])} />
      {matches.map(l => <JsonLd key={l.id} data={realEstateListingSchema(l)} />)}

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Curated Search</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{f.title}</h1>
          <p className="mt-4 max-w-2xl text-emerald-50/75">{f.description}</p>
          <MarketDisclaimer light className="max-w-2xl" />
          {community && (
            <Link href={`/communities/${community.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm text-amber-200 hover:text-amber-100">Learn about {community.name} &rarr;</Link>
          )}
        </div>
      </section>

      {matches.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div className="font-serif text-2xl text-[#062840]">{matches.length} home{matches.length !== 1 ? 's' : ''} matching</div>
            <div className="text-xs text-emerald-900/60 uppercase tracking-wider">Updated daily</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      ) : (
        <section className="max-w-3xl mx-auto px-6 py-14">
          <div className="rounded-xl border border-emerald-900/15 bg-emerald-50/40 p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-3">No live listings yet</div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#062840] mb-3">Listings for this search are not yet live on this site.</h2>
            <p className="text-emerald-900/80 leading-relaxed">
              The editorial guide below covers what to expect in this segment. Scottsdale Golf Lifestyle is an
              editorial guide, not a brokerage, and we don&rsquo;t hold listings of our
              own. {community ? `For currently-available homes in ${community.name}, ` : 'For currently-available homes matching this search, '}
              subscribe below and we&rsquo;ll send a hand-picked shortlist (including off-market homes) within 24 hours.
            </p>
          </div>
        </section>
      )}

      {editorial && (
        <section className="bg-emerald-50/40 border-y border-[#062840]/10">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">About this search</div>
            <h2 className="font-serif text-3xl text-[#062840] mb-6">{f.title.replace(/ for Sale$/i, '')}: what to know</h2>
            <div className="prose prose-lg max-w-none text-[#062840]/85">
              {editorial.paragraphs.map((p, i) => (
                <p key={i} className="mb-5 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Saved-search subscription \u2014 captures email + filter intent */}
      <section className="max-w-4xl mx-auto px-6 pb-14 pt-10">
        <SavedSearchForm
          searchTitle={f.title.replace(/ for Sale$/i, '')}
          searchSlug={f.slug}
          communitySlug={f.community}
          sourcePath={`/homes-for-sale/${f.slug}`}
        />
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-6">
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-2xl text-[#062840] mb-4">Related searches</h2>
        <div className="flex flex-wrap gap-2">
          {FILTER_PAGES.filter(x => x.slug !== f.slug).slice(0,10).map(x => (
            <Link key={x.slug} href={`/homes-for-sale/${x.slug}`} className="text-sm rounded-full border border-emerald-900/15 bg-white hover:bg-emerald-50 px-4 py-2 text-emerald-900 transition">{x.title.replace(' for Sale','')}</Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ListingCard from '@/components/listing-card';
import SavedSearchForm from '@/components/saved-search-form';
import { SITE, listingsByPriceRange } from '@/lib/data';
import { breadcrumbSchema, realEstateListingSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Golf Homes $1M to $3M for Sale',
  description: 'Mid-luxury golf homes for sale in Scottsdale from $1M to $3M. Single-family estates in Grayhawk, DC Ranch and Troon North with mountain & golf-course views.',
  alternates: { canonical: `${SITE.url}/homes-for-sale/1m-to-3m` },
  openGraph: { url: `${SITE.url}/homes-for-sale/1m-to-3m`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const listings = listingsByPriceRange(1000000, 3000000);
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Homes for Sale', path: '/homes-for-sale/1m-to-3m' },
        { name: '$1M to $3M', path: '/homes-for-sale/1m-to-3m' }
      ])} />
      {listings.map(l => <JsonLd key={l.id} data={realEstateListingSchema(l)} />)}

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Homes for Sale</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale Golf Homes: $1M to $3M</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">The sweet spot of Scottsdale golf living. Spacious single-family homes, generous lots, resort backyards and full club access: in the communities that define North Scottsdale.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/homes-for-sale/under-1m" className="rounded-full border border-amber-200/30 px-4 py-2 text-amber-100 hover:bg-amber-300 hover:text-[#062840] transition">Under $1M</Link>
            <Link href="/communities" className="rounded-full border border-amber-200/30 px-4 py-2 text-amber-100 hover:bg-amber-300 hover:text-[#062840] transition">All communities</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div className="font-serif text-2xl text-[#062840]">{listings.length} home{listings.length !== 1 ? 's' : ''} available</div>
          <div className="text-xs text-emerald-900/60 uppercase tracking-wider">Updated daily</div>
        </div>
        {listings.length === 0 ? (
          <div className="text-center py-20 text-emerald-900/60">No active listings in this range. Check back soon.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-14">
        <SavedSearchForm
          searchTitle="Scottsdale Golf Homes $1M&ndash;$3M"
          searchSlug="1m-to-3m"
          sourcePath="/homes-for-sale/1m-to-3m"
        />
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-[#062840] mb-4">What $1M&ndash;$3M buys in Scottsdale golf country</h2>
        <p className="text-emerald-900/85">This is the largest and most competitive band of the Scottsdale golf market. At this price point buyers can expect 2,500&ndash;4,500 sq ft single-family homes on quarter- to half-acre lots, frequently with private pools, three-car garages, and direct golf or mountain views.</p>
        <p className="text-emerald-900/85 mt-3">The most active sub-markets are Grayhawk (golf-membership optional), DC Ranch (Country Club optional, separate fee), and Troon North (golf-cart accessible to the clubhouse). Inventory moves fastest in the $1.3M&ndash;$1.9M window where renovation-ready homes are typically under contract within 21 days.</p>
      </section>
    </PageShell>
  );
}

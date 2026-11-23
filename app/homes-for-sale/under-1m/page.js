import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ListingCard from '@/components/listing-card';
import SavedSearchForm from '@/components/saved-search-form';
import { SITE, listingsByPriceRange } from '@/lib/data';
import { breadcrumbSchema, realEstateListingSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Golf Homes Under $1 Million for Sale',
  description: 'Affordable luxury golf homes for sale in Scottsdale under $1M. Patio homes, townhomes and condos in Grayhawk, DC Ranch, Troon North and more.',
  alternates: { canonical: `${SITE.url}/homes-for-sale/under-1m` },
  openGraph: { url: `${SITE.url}/homes-for-sale/under-1m`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const listings = listingsByPriceRange(0, 1000000);
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Homes for Sale', path: '/homes-for-sale/under-1m' },
        { name: 'Under $1M', path: '/homes-for-sale/under-1m' }
      ])} />
      {listings.map(l => <JsonLd key={l.id} data={realEstateListingSchema(l)} />)}

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Homes for Sale</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale Golf Homes Under $1M</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">Yes, you can still own a home on a Scottsdale fairway for under seven figures. Browse curated townhomes, patio homes and golf villas in Grayhawk, DC Ranch and beyond.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/homes-for-sale/1m-to-3m" className="rounded-full border border-amber-200/30 px-4 py-2 text-amber-100 hover:bg-amber-300 hover:text-[#062840] transition">$1M &ndash; $3M</Link>
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
          searchTitle="Scottsdale Golf Homes Under $1M"
          searchSlug="under-1m"
          sourcePath="/homes-for-sale/under-1m"
        />
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20 prose prose-emerald">
        <h2 className="font-serif text-3xl text-[#062840] mb-4">Buying a Scottsdale golf home under $1 million</h2>
        <p className="text-emerald-900/85">In 2026 Scottsdale&rsquo;s sub-$1M market is dominated by attached homes, golf villas and patio homes inside master-planned communities. Grayhawk, Gainey Ranch and the southern edge of DC Ranch all offer ownership with full club access at price points that have historically been the entry door to the lifestyle.</p>
        <p className="text-emerald-900/85 mt-3">Expect 1,500&ndash;2,400 sq ft, 2&ndash;3 bedrooms, and HOAs that include landscaping, exterior maintenance and access to community pools. Many of these communities still permit short-term rentals subject to HOA rules: an important consideration for second-home buyers.</p>
      </section>
    </PageShell>
  );
}

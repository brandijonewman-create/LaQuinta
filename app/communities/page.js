import MarketDisclaimer from '@/components/market-disclaimer';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, COMMUNITIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { MapPin, Home, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf Communities | All 46 Covered',
  description: 'Compare Scottsdale’s most prestigious golf communities: Grayhawk, DC Ranch, Troon North, by price, golf courses, amenities and lifestyle.',
  alternates: { canonical: `${SITE.url}/communities` },
  openGraph: { url: `${SITE.url}/communities`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function CommunitiesPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Communities', path: '/communities' }
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Communities</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale&rsquo;s Premier Golf Communities</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">Each Scottsdale golf community has its own personality, from Grayhawk&rsquo;s vibrant village energy to DC Ranch&rsquo;s private-club exclusivity and Troon North&rsquo;s pure desert-mountain drama.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        {COMMUNITIES.map((c, i) => (
          <Link key={c.slug} href={`/communities/${c.slug}`} className={`grid md:grid-cols-2 gap-8 group bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-2">{c.priceRange}</div>
              <h2 className="font-serif text-4xl text-[#062840]">{c.name}</h2>
              <p className="text-emerald-900/80 mt-3">{c.tagline}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-emerald-900/60">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {c.location}</span>
                <span className="flex items-center gap-1"><Home className="h-4 w-4" /> {c.homeCount.toLocaleString()} homes</span>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-emerald-800 group-hover:text-amber-600">Explore {c.name} <ArrowRight className="h-3.5 w-3.5" /></div>
            </div>
          </Link>
        ))}
        <MarketDisclaimer />
      </section>
    </PageShell>
  );
}

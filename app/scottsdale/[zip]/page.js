import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import FAQ from '@/components/faq';
import SavedSearchForm from '@/components/saved-search-form';
import { SITE, ZIP_PAGES, findZip, findCommunity, ZIP_FAQS } from '@/lib/data';
import { getZipEditorial } from '@/lib/seo-content';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { MapPin, Home, TrendingUp, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return ZIP_PAGES.map(z => ({ zip: z.zip }));
}

export async function generateMetadata({ params }) {
  const z = findZip(params.zip);
  if (!z) return { title: 'Not found' };
  return { title: z.title, description: z.description, alternates: { canonical: `${SITE.url}/scottsdale/${z.zip}` },
  openGraph: { url: `${SITE.url}/scottsdale/${z.zip}`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] } };
}

export default function Page({ params }) {
  const z = findZip(params.zip);
  if (!z) notFound();
  const communities = z.communities.map(findCommunity).filter(Boolean);
  const editorial = getZipEditorial(z.zip);
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: `Scottsdale ${z.zip}`, path: `/scottsdale/${z.zip}` }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4 flex items-center gap-2"><MapPin className="h-3 w-3" /> Scottsdale Zip Code &middot; {z.zip}</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">{z.name}</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">{z.intro}</p>
          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            <div><div className="font-serif text-3xl text-amber-300">{z.median}</div><div className="text-xs uppercase tracking-wider text-emerald-50/60">Editorial median est.</div></div>
            <div><div className="font-serif text-3xl text-amber-300">{communities.length || 0}</div><div className="text-xs uppercase tracking-wider text-emerald-50/60">Golf communities</div></div>
            <div><div className="font-serif text-3xl text-amber-300">{z.zip}</div><div className="text-xs uppercase tracking-wider text-emerald-50/60">Zip code</div></div>
          </div>
          <div className="mt-6 max-w-2xl text-xs text-emerald-50/55">Editorial estimate based on broad market reporting, not a live MLS pull. Verify current ZIP-level data with ARMLS or a licensed Arizona real-estate professional.</div>
        </div>
      </section>
      {communities.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl text-[#062840] mb-6">Golf communities in {z.zip}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map(c => (
              <Link key={c.slug} href={`/communities/${c.slug}`} className="group overflow-hidden rounded-xl bg-white border border-emerald-900/10 hover:shadow-xl transition">
                <div className="aspect-[5/3] overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
                <div className="p-5">
                  <div className="font-serif text-xl text-[#062840]">{c.name}</div>
                  <div className="text-xs text-emerald-900/60 mt-1">{c.priceRange} · {c.homeCount.toLocaleString()} homes</div>
                  <p className="text-sm text-emerald-900/70 mt-2 line-clamp-2">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <MarketDisclaimer />
        </section>
      )}
      {editorial && (
        <section className="bg-emerald-50/40 border-y border-[#062840]/10">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">About this ZIP</div>
            <h2 className="font-serif text-3xl text-[#062840] mb-6">Understanding {z.name}</h2>
            <div className="prose prose-lg max-w-none text-[#062840]/85">
              {editorial.paragraphs.map((p, i) => (
                <p key={i} className="mb-5 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="max-w-7xl mx-auto px-6 pb-20 pt-12">
        <h2 className="font-serif text-2xl text-[#062840] mb-4">Explore other Scottsdale zip codes</h2>
        <div className="flex flex-wrap gap-2">
          {ZIP_PAGES.filter(o => o.zip !== z.zip).map(o => (
            <Link key={o.zip} href={`/scottsdale/${o.zip}`} className="text-sm rounded-full border border-emerald-900/15 bg-white hover:bg-emerald-50 px-4 py-2 text-emerald-900 transition">{o.name}</Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <SavedSearchForm
          searchTitle={`Homes for Sale in Scottsdale ${z.zip}`}
          searchSlug={`zip-${z.zip}`}
          sourcePath={`/scottsdale/${z.zip}`}
        />
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-6">
      </section>
      {(() => {
        const base = ZIP_FAQS[z.zip] || [];
        const extra = editorial?.faqs || [];
        const all = [...base, ...extra];
        return all.length > 0 ? <FAQ items={all} heading={`Scottsdale ${z.zip} FAQs`} /> : null;
      })()}
    </PageShell>
  );
}

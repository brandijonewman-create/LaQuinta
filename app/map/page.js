import PageShell from '@/components/page-shell';
import ListingsMap from '@/components/lifestyle-map-lazy';
import { SITE, LISTINGS, COMMUNITIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { GOLF_COURSES } from '@/lib/pois';

const PUBLIC_COURSES = GOLF_COURSES.filter(g => g.access === 'public').length;
const PRIVATE_COURSES = GOLF_COURSES.filter(g => g.access === 'private').length;

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Scottsdale Golf Homes Map | Interactive Search by Community',
  description: 'Explore every Scottsdale golf community and active listing on an interactive map. Filter by location, price, and amenities.',
  alternates: { canonical: `${SITE.url}/map` },
  openGraph: { url: `${SITE.url}/map`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Map', path: '/map' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Interactive Map</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Scottsdale Golf Homes Map</h1>
          <p className="mt-3 max-w-2xl text-emerald-50/75">Every Scottsdale golf community and active listing on one map. Click a pin to see details.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-8">
        <ListingsMap listings={LISTINGS} communities={COMMUNITIES} pois={GOLF_COURSES} height={680} />
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-emerald-900/70">
          <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-amber-300 border-2 border-[#062840] rounded-full"></span> Golf community</div>
          <div className="flex items-center gap-2"><span className="inline-block px-2 py-0.5 bg-[#062840] text-amber-300 border border-amber-300 rounded-full text-[10px] font-bold">$</span> Active listing &middot; click pin for details</div>
          <div className="flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-white text-white text-[10px]" style={{ background: '#15803d' }}>&#9971;</span> Public golf course ({PUBLIC_COURSES})</div>
          <div className="flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-white text-white text-[10px]" style={{ background: '#334155' }}>&#9971;</span> Private golf course ({PRIVATE_COURSES})</div>
        </div>
      </section>

      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">How to use this map</div>
          <h2 className="font-serif text-3xl text-[#062840] mb-6">Reading the Scottsdale golf-community geography</h2>
          <div className="prose prose-lg max-w-none text-[#062840]/85">
            <p className="mb-5 leading-relaxed">Scottsdale\u2019s 46 golf communities are not evenly distributed across the city. The premier guard-gated luxury communities cluster in three distinct geographies that map directly onto specific ZIP codes: understanding which corridor you are looking at is the first step in narrowing the right shortlist for your relocation or second-home search.</p>
            <p className="mb-5 leading-relaxed">The north-central corridor (ZIP 85255) is the densest concentration of luxury golf communities in the city: Grayhawk, DC Ranch, Silverleaf, Pinnacle Peak Country Club, and Stonegate all sit inside a five-mile radius here. This is the geographic center of gravity for relocator buyers wanting walkable retail (Market Street at DC Ranch, Grayhawk Plaza, Kierland a short drive south), strong school proximity, and a balanced demographic mix of full-time residents and snowbirds.</p>
            <p className="mb-5 leading-relaxed">The far-north desert-mountain corridor (ZIP 85262, with parts of 85266) is the higher-elevation luxury band. Troon North, Desert Mountain, Estancia, Mirabel, and Legend Trail all sit here. This corridor is quieter, lower-density, and geographically further from Sky Harbor (25\u201330 minutes off-peak). Trophy-estate inventory and serious private-club golf are most concentrated here.</p>
            <p className="mb-5 leading-relaxed">The central-Scottsdale corridor (ZIPs 85254 and 85258) anchors the city\u2019s established resort-community heritage: McCormick Ranch, Gainey Ranch, and the broader lifestyle belt of mid-century-modern and Spanish-Colonial-Revival inventory. This corridor offers materially lower entry-point pricing for true golf-community living, with the trade-off of less guard-gated infrastructure and smaller lots than the far-north alternatives.</p>
            <p className="mb-5 leading-relaxed">Use the map filters to layer in the lifestyle anchors that matter for your specific search: schools, hospitals, dining clusters, and Sky Harbor International. The right community for any given buyer is rarely the most famous one; it is the one whose intersection of geography, club model, architectural vocabulary, and demographic mix best fits the buyer\u2019s actual day-to-day pattern.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

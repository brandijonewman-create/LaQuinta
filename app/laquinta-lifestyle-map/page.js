import PageShell from '@/components/page-shell';
import LifestyleMapLazy from '@/components/lifestyle-map-lazy';
import { SITE, COMMUNITIES } from '@/lib/data';
import { LIFESTYLE_POIS } from '@/lib/pois';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { GraduationCap, Plus, Utensils, Plane, ShoppingBag, Flag } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf-Community Lifestyle Map',
  description: 'Every Scottsdale-area golf community on one map, overlaid with top hospitals (Mayo Clinic, HonorHealth), highest-rated schools (BASIS, Chaparral, Notre Dame Prep), notable dining, luxury retail, and both airports (Sky Harbor + Scottsdale Airport).',
  alternates: { canonical: `${SITE.url}/scottsdale-lifestyle-map` },
  openGraph: { url: `${SITE.url}/scottsdale-lifestyle-map`, title: 'Scottsdale Golf-Community Lifestyle Map', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

const GOLF_LEGEND = [
  { color: '#15803d', label: 'Public golf course',  count: LIFESTYLE_POIS.filter(p => p.type === 'golf' && p.access === 'public').length },
  { color: '#334155', label: 'Private golf course', count: LIFESTYLE_POIS.filter(p => p.type === 'golf' && p.access === 'private').length }
];

const LEGEND = [
  { icon: GraduationCap, color: '#0e7490', label: 'Top schools', count: LIFESTYLE_POIS.filter(p => p.type === 'school').length },
  { icon: Plus,          color: '#dc2626', label: 'Hospitals',   count: LIFESTYLE_POIS.filter(p => p.type === 'hospital').length },
  { icon: Utensils,      color: '#b45309', label: 'Dining',      count: LIFESTYLE_POIS.filter(p => p.type === 'dining').length },
  { icon: ShoppingBag,   color: '#7c3aed', label: 'Retail',      count: LIFESTYLE_POIS.filter(p => p.type === 'retail').length },
  { icon: Plane,         color: '#1d4ed8', label: 'Airports',    count: LIFESTYLE_POIS.filter(p => p.type === 'airport').length }
];

export default function LifestyleMap() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Lifestyle Map', path: '/laquinta-lifestyle-map' }
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Lifestyle Map</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Every golf community + the lifestyle around it.</h1>
          <p className="mt-3 max-w-2xl text-emerald-50/80">
            All 46 named Scottsdale-area golf communities on one interactive map, overlaid with the schools, hospitals,
            airports, and dining that matter when you&rsquo;re choosing where to live.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-wrap items-center gap-5 text-xs text-[#062840]/85">
          <span className="font-semibold uppercase tracking-wider text-[#BA9273]">Legend:</span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-amber-300 border-2 border-[#062840] rounded-full" /> Golf community
          </div>
          {GOLF_LEGEND.map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-white text-white text-[10px]" style={{ background: l.color }}>
                <Flag className="h-3 w-3" />
              </span>
              <span>{l.label} <span className="text-[#062840]/55">({l.count})</span></span>
            </div>
          ))}
          {LEGEND.map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-white text-white text-[10px]" style={{ background: l.color }}>
                <l.icon className="h-3 w-3" />
              </span>
              <span>{l.label} <span className="text-[#062840]/55">({l.count})</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <LifestyleMapLazy communities={COMMUNITIES} pois={LIFESTYLE_POIS} height={720} />
        <p className="mt-4 text-xs text-[#062840]/55">
          Click any pin for details. POI list is curated, not exhaustive: reach out via the lead form if there&rsquo;s a
          school, hospital, restaurant, or amenity you want added.
        </p>
      </section>

      <section className="bg-emerald-50/40 border-t border-[#062840]/10">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">How to use this map</div>
          <h2 className="font-serif text-3xl text-[#062840]">Common buyer-side questions answered visually.</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-[#062840]/80">
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-1">For relocating families</h3>
              <p className="text-sm">Filter mentally by school proximity. BASIS Scottsdale and Chaparral HS pull strong demand toward the central + south DC Ranch and Gainey Ranch corridors. Notre Dame Prep and Desert Mountain HS anchor the north-Scottsdale family market.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-1">For Mayo Clinic patients & retirees</h3>
              <p className="text-sm">Mayo Clinic\u2019s Phoenix campus sits in north Scottsdale. Communities within a 15-minute drive: Grayhawk, DC Ranch, Silverleaf, McDowell Mountain Ranch, carry a notable premium for that proximity alone.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-1">For snowbirds &amp; frequent flyers</h3>
              <p className="text-sm">Scottsdale Airport (SDL) is the general-aviation field; Sky Harbor (PHX) is your commercial hub. Central-Scottsdale communities (McCormick Ranch, Gainey Ranch) split the difference between both.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#062840] mb-1">For Old Town lifestyle seekers</h3>
              <p className="text-sm">If you want to walk to FnB, Mastro\u2019s, and Scottsdale Fashion Square, look at communities clustered around Indian Bend Wash: Gainey Ranch, McCormick Ranch, Scottsdale Ranch, not the north-Scottsdale prestige enclaves.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Editorial guide</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-6">Reading Scottsdale&rsquo;s lifestyle geography</h2>
        <div className="prose prose-lg max-w-none text-[#062840]/85 space-y-5 leading-relaxed">
          <p>Scottsdale is a long, narrow city. It stretches roughly 31 miles north to south but rarely more than five miles east to west. That linear geometry, combined with the way the city grew, in successive waves from the original Old Town core outward and northward into the desert, produces three distinct lifestyle bands that map cleanly onto specific golf-community clusters. Understanding which band a community sits in is the single most useful framing for narrowing a relocation or second-home search.</p>

          <p><strong>The southern band (Old Town and the Indian Bend corridor)</strong> is the urban-resort core. McCormick Ranch, Gainey Ranch, and Scottsdale Ranch sit here, alongside the resort hotels (The Phoenician, Hyatt Regency Gainey Ranch) and the Old Town dining and gallery district. Lot sizes are smaller, density is higher, and the walking-to-coffee experience is real. School assignments include Chaparral HS and the BASIS Scottsdale charter network. For buyers who prioritize the urban side of Scottsdale: restaurant walkability, art-walk Thursdays, downtown energy, easier Sky Harbor access, the southern band delivers it at a materially lower entry point than the far-north prestige communities.</p>

          <p><strong>The central band (the 101 corridor north to Pinnacle Peak Road)</strong> is the demographic and demand center of gravity for the modern Scottsdale luxury market. Grayhawk, DC Ranch, Silverleaf, McDowell Mountain Ranch, and the Pinnacle Peak / Stonegate cluster all sit here. This is where the strongest combination of school quality, hospital proximity (Mayo Clinic, HonorHealth Shea), and golf-community density occurs. The buyer demographic here skews toward in-prime-career relocators from the West Coast and Midwest, with a meaningful overlay of high-net-worth retirees. Market Street at DC Ranch and Grayhawk Plaza provide retail centers; Kierland Commons and Scottsdale Quarter sit on the southern edge.</p>

          <p><strong>The far-northern band (north of Pinnacle Peak Road into Carefree, Cave Creek, and Fountain Hills)</strong> is the trophy-estate and serious-golf-club band. Troon North, Desert Mountain, Estancia, Mirabel, Whisper Rock, Legend Trail, and Sereno Canyon all sit here. The geography rises in elevation, the lots widen, the views open up toward the Tonto National Forest and the McDowell range, and the urban infrastructure thins materially. School assignments include Notre Dame Prep and the Cave Creek Unified district. The trade-off is real: this is the most beautiful, lowest-density, most architecturally serious Scottsdale geography, but it is also a 25-to-35-minute commitment to Sky Harbor and a 20-minute commitment to most major hospital systems. Buyers who choose this band are generally choosing it deliberately, not by default.</p>

          <p>The lifestyle map is most useful when you layer in the anchors that actually drive your day. For a Mayo Clinic patient, a 12-minute drive to north Scottsdale&rsquo;s Mayo campus eliminates roughly two-thirds of the community inventory. For a family that wants to attend Notre Dame Prep, the residential geometry collapses to the far-north band almost entirely. For a snowbird who flies private into Scottsdale Airport (SDL) twice a month, the central-and-north bands are equivalent, but the southern band adds a meaningful drive each direction. The right Scottsdale community for any given buyer is rarely the most famous one: it is the one whose intersection of geography, club model, school assignment, and anchor proximity best matches the buyer&rsquo;s actual weekly pattern.</p>

          <p>Use the map filters above to layer the anchors that matter most for your search. Click each community pin for the full community deep-dive page, which covers price tier, club model, architect lineage, HOA structure, and the comparable communities most often considered alongside it. The combined view, map plus community detail, is the editorial framework that will let you shortlist faster and more honestly than any algorithmic property feed.</p>
        </div>
      </section>
    </PageShell>
  );
}

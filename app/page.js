import Image from 'next/image';
import Link from 'next/link';
import MarketDisclaimer from '@/components/market-disclaimer';
import PageShell from '@/components/page-shell';
import GuideDownloadForm from '@/components/guide-download-form';
import { SITE, COMMUNITIES } from '@/lib/data';
import { BLOG_POSTS as ALL_POSTS } from '@/lib/blog';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, Award, MapPin, Sparkles, Compass, Flag, Crown, Utensils, Sun, PenTool, Plane } from 'lucide-react';

const LIFESTYLE = [
  { href: '/scottsdale-golf-courses', icon: Flag, eyebrow: 'Play', title: 'The Courses', copy: 'Desert target golf, mountain views and championship layouts, public and private, across North Scottsdale.', cta: 'Explore the courses' },
  { href: '/golf-clubs', icon: Crown, eyebrow: 'Belong', title: 'The Private Clubs', copy: 'Club culture, membership types and what life inside each club looks like, from first tee to the dining room.', cta: 'Read the club guide' },
  { href: '/scottsdale-lifestyle-map', icon: Utensils, eyebrow: 'Dine and Shop', title: 'The Lifestyle Map', copy: 'Dining, retail, schools, hospitals and airports mapped around the golf communities they serve.', cta: 'Open the map' },
  { href: '/scottsdale-snowbird-guide', icon: Sun, eyebrow: 'The Season', title: 'Seasonal Living', copy: 'Winters in the sun, summers wherever you like. How part-time Scottsdale life works.', cta: 'Read the snowbird guide' },
  { href: '/architects', icon: PenTool, eyebrow: 'The Craft', title: 'The 8 Course Architects', copy: 'Fazio. Nicklaus. Weiskopf. Mickelson. Coore and Crenshaw. The designers behind Scottsdale golf.', cta: 'Meet the architects' },
  { href: '/relocating-to-scottsdale', icon: Plane, eyebrow: 'The Move', title: 'Relocating to Scottsdale', copy: 'Neighborhoods, schools, healthcare, taxes and when to visit before you make Scottsdale home.', cta: 'Plan the move' }
];

export const metadata = {
  title: 'Scottsdale Golf Lifestyle: Golf, Clubs, Dining and Luxury Living',
  description: 'The guide to the luxury golf lifestyle in Scottsdale, Arizona: courses, private clubs, dining, seasonal living and the golf communities that hold it all.',
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    url: `${SITE.url}/`,
    title: 'Where Scottsdale Lives Well | Scottsdale Golf Lifestyle',
    description: 'Golf, private clubs, dining, seasonal living and the communities that hold it all.'
  }
};

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0"><Image src="/images/pages/home-hero-living.webp" priority
            alt="Sunset over a desert golf course seen from a patio with a fire pit, a glass of wine and lounge chairs, saguaros and mountains beyond"
            className="object-cover object-center" fill sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-44 text-center">
          <div className="inline-block text-xs uppercase tracking-[0.4em] text-white mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.7)]">Scottsdale &middot; Arizona</div>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.05] tracking-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.55)]">Where Scottsdale<br/><em className="text-amber-200 not-italic">Lives Well</em></h1>
          <p className="text-white mt-6 max-w-2xl mx-auto text-lg [text-shadow:_0_2px_10px_rgba(0,0,0,0.6)]">Golf, dining, wellness, cars and the communities that hold it all. The guide to the luxury golf lifestyle in Scottsdale.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/scottsdale-lifestyle-map" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold tracking-wide transition shadow-xl shadow-black/30">Explore the Lifestyle <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/golf-clubs" className="inline-flex items-center gap-2 rounded-full bg-[#062840]/85 hover:bg-[#062840] border border-amber-200/40 text-amber-50 px-7 py-3 text-sm font-semibold tracking-wide transition backdrop-blur-sm shadow-xl shadow-black/30">Private Club Guide</Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-white">
            <div><div className="font-serif text-3xl text-amber-200 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">46</div><div className="text-xs uppercase tracking-wider text-white/95 [text-shadow:_0_1px_4px_rgba(0,0,0,0.7)]">Golf communities</div></div>
            <div><div className="font-serif text-3xl text-amber-200 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">35</div><div className="text-xs uppercase tracking-wider text-white/95 [text-shadow:_0_1px_4px_rgba(0,0,0,0.7)]">Golf courses</div></div>
            <div><div className="font-serif text-3xl text-amber-200 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">5</div><div className="text-xs uppercase tracking-wider text-white/95 [text-shadow:_0_1px_4px_rgba(0,0,0,0.7)]">Zip codes</div></div>
          </div>
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] text-white/70 z-10 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">Illustrative image</div>
      </section>
      {/* Lifestyle pillars */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">The Golf Lifestyle</div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#062840]">How Scottsdale Lives</h2>
          <p className="mt-4 text-emerald-900/75">Morning tee times, long lunches, sunset swims and a calendar built around the desert season. Start with the part of the life you want most.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIFESTYLE.map(({ href, icon: Icon, eyebrow, title, copy, cta }) => (
            <Link key={href} href={href} className="group block rounded-xl bg-white border border-emerald-900/10 p-7 hover:shadow-xl transition">
              <Icon className="h-7 w-7 text-amber-600 mb-4" />
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-1">{eyebrow}</div>
              <h3 className="font-serif text-2xl text-[#062840] mb-2 group-hover:text-[#BA9273] transition">{title}</h3>
              <p className="text-sm text-emerald-900/70">{copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#BA9273] group-hover:text-[#062840]">{cta} <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="bg-emerald-50/40 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">From the Journal</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#062840]">Insider perspective</h2>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-1 text-sm text-emerald-800 hover:text-amber-600">All articles <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ALL_POSTS.slice(0,3).map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl bg-white border border-emerald-900/10 hover:shadow-xl transition">
              <div className="aspect-[5/3] overflow-hidden relative"><Image src={p.cover} alt={p.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">{new Date(p.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                <h3 className="font-serif text-xl text-[#062840] leading-snug">{p.title}</h3>
                <p className="text-sm text-emerald-900/70 mt-2 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>

      {/* Living here: the one real estate section */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-2">Living Here</div>
              <h2 className="font-serif text-4xl md:text-5xl">Find Your Scottsdale Community</h2>
              <p className="mt-4 text-emerald-50/75 max-w-2xl">When the lifestyle fits, the next question is where to call home. Six signature golf communities to start.</p>
            </div>
            <Link href="/communities" className="hidden md:inline-flex items-center gap-1 text-sm text-amber-200 hover:text-amber-50">View all communities <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {COMMUNITIES.slice(0,6).map(c => (
              <Link key={c.slug} href={`/communities/${c.slug}`} className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl transition-all">
                <div className="aspect-[5/4] overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#062840]">{c.name}</h3>
                    <span className="text-xs text-amber-700">{c.priceRange}</span>
                  </div>
                  <p className="text-sm text-emerald-900/70 line-clamp-2">{c.tagline}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-700/70 mt-3"><MapPin className="h-3 w-3" /> {c.location}</div>
                </div>
              </Link>
            ))}
          </div>
          <MarketDisclaimer light />

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Link href="/community-quiz" className="group block">
              <Compass className="h-6 w-6 text-amber-300 mb-3" />
              <h3 className="font-serif text-xl mb-1 group-hover:text-amber-200 transition">Which community fits you?</h3>
              <p className="text-sm text-emerald-50/70">A 2-minute, 5-question quiz. Your top match plus two runners-up, with the reason each surfaced.</p>
            </Link>
            <Link href="/scottsdale-golf-community-index-2026" className="group block">
              <Award className="h-6 w-6 text-amber-300 mb-3" />
              <h3 className="font-serif text-xl mb-1 group-hover:text-amber-200 transition">The 2026 Community Index</h3>
              <p className="text-sm text-emerald-50/70">A tier ranking of all 46 named Scottsdale-area golf communities.</p>
            </Link>
            <Link href="/scottsdale-home-value" className="group block">
              <Sparkles className="h-6 w-6 text-amber-300 mb-3" />
              <h3 className="font-serif text-xl mb-1 group-hover:text-amber-200 transition">Home Valuation</h3>
              <p className="text-sm text-emerald-50/70">A no-obligation, human-prepared comparative market analysis for your Scottsdale golf home.</p>
            </Link>
          </div>

          <div className="mt-14 pt-12 border-t border-amber-200/20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Buyer&rsquo;s Guide</div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">The Scottsdale Golf-Home Buyer&rsquo;s Guide</h3>
              <p className="text-emerald-50/75 max-w-md mb-4">An 11-page PDF covering every Scottsdale-area golf community, club membership economics, the Arizona tax and residency playbook, and the 60-day relocation timeline.</p>
              <p className="text-emerald-50/60 max-w-md text-sm">Enter your name and email &rarr; the PDF downloads instantly.</p>
            </div>
            <div>
              <GuideDownloadForm guideSlug="scottsdale-golf-buyers-guide" guideTitle="The Scottsdale Golf-Home Buyer\u2019s Guide" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import PageShell from '@/components/page-shell';
import FAQ from '@/components/faq';
import GuideSearch from '@/components/directory/guide-search';
import { PartnerBadge, SampleBadge } from '@/components/directory/listing-card';
import PremierPromo from '@/components/directory/premier-promo';
import { pageMeta, breadcrumbSchema, JsonLd } from '@/lib/seo';
import {
  CATEGORY_GROUPS, CITIES, GUIDE_BASE, LEVELS, categoryBySlug, cityBySlug, categoriesInGroup,
  categoryHref, categoryCityHref, businessHref, luxuryCategories,
} from '@/lib/directory';
import { AREA_TEXT } from '@/lib/directory/content';
import { getListings } from '@/lib/directory/data';

export const metadata = pageMeta(GUIDE_BASE, {
  title: 'The Scottsdale Golf Lifestyle Guide: Verified Local Businesses',
  description: `Find verified local businesses serving ${AREA_TEXT}, Arizona, from realtors and custom home builders to golf club fitters.`,
});

// Site photography already in the repo. Categories without a fitting photo
// get a typographic tile rather than a mismatched image.
const IMG = {
  hero: '/images/pages/home-hero.webp',
  cities: '/images/communities/sun-ridge-canyon.webp',
  closing: '/images/communities/troon-north.webp',
  verify: '/images/communities/scottsdale-mountain.webp',
};
const CATEGORY_IMG = {
  'custom-home-builders': '/images/blog/estancia-homes-for-sale-2026-guide.webp',
  realtors: '/images/pages/relocating-to-scottsdale.webp',
  'interior-designers': '/images/blog/desert-mountain-homes-for-sale-2026-guide.webp',
};

const STEPS = [
  { title: 'Google Maps match', text: 'Name, address and phone match a real Google Business Profile.', who: 'Every listing' },
  { title: 'Inside our five cities', text: `Every address sits in ${AREA_TEXT}.`, who: 'Every listing' },
  { title: 'Owner confirmed', text: 'A code goes to an email on the business’s own domain.', who: 'Self-added listings' },
  { title: 'License checked', text: 'Licensed trades give an Arizona license number, checked by hand.', who: 'Self-added listings' },
];

const FAQ_ITEMS = [
  { q: 'What is the Scottsdale Golf Lifestyle Guide?', a: `A directory of verified local businesses serving the golf households of ${AREA_TEXT}, Arizona, organized by category and city.` },
  { q: 'How do you verify a business?', a: 'We match every listing to its Google Maps profile and confirm it sits inside our map area. Businesses that add themselves also confirm an email on their own domain, and licensed trades give an Arizona license number.' },
  { q: 'Is a listing free?', a: 'Yes. Every business in our map area can have a free listing with its name and a short description.' },
  { q: 'What does the Partner label mean?', a: 'Partner marks a business that pays for an upgraded listing. The label appears wherever a Partner is named, including in our articles.' },
  { q: 'What is a Premier Partner?', a: 'Each category in each city has one Premier Partner at most. The Premier Partner appears first on that page.' },
];

const eyebrow = 'text-[11px] uppercase tracking-[0.35em] text-[#BA9273]';

function CategoryTile({ c, count, large = false }) {
  const img = CATEGORY_IMG[c.slug];
  return (
    <Link href={categoryHref(c)} className="group block">
      <div className={`relative overflow-hidden ${large ? 'aspect-[4/5] md:aspect-auto md:h-[560px]' : 'aspect-[4/3]'}`}>
        {img ? (
          <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 bg-[#062840] flex items-center justify-center">
            <div className="absolute inset-4 border border-[#BA9273]/40" />
            <span className="font-serif italic text-3xl md:text-4xl text-[#BA9273] text-center px-10 leading-tight">{c.title}</span>
          </div>
        )}
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-4 border-b border-[#062840]/15 pb-3">
        <h3 className={`font-serif text-[#062840] group-hover:text-[#BA9273] transition ${large ? 'text-3xl' : 'text-2xl'}`}>{c.title}</h3>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#062840]/50 shrink-0">{count > 0 ? `${count.toLocaleString()} listed` : 'Coming soon'}</span>
      </div>
    </Link>
  );
}

export default async function GuideHome() {
  const all = await getListings();
  const byCategory = {};
  const byCity = {};
  for (const b of all) {
    for (const c of b.categories) byCategory[c] = (byCategory[c] || 0) + 1;
    byCity[b.city] = (byCity[b.city] || 0) + 1;
  }
  const premiers = all.filter((b) => b.level === 'premier').slice(0, 6);
  const partners = all.filter((b) => b.level === 'featured').slice(0, 3);
  const lux = luxuryCategories();
  const lead = lux.find((c) => c.slug === 'custom-home-builders');
  const restLux = lux.filter((c) => c.slug !== 'custom-home-builders');

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guide', path: GUIDE_BASE }])} />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end text-amber-50">
        <img src={IMG.hero} alt="Desert golf course beneath the mountains of north Scottsdale" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041c2d] via-[#041c2d]/60 to-[#041c2d]/10" />
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-20 md:pb-28 pt-40">
          <div className="text-[11px] uppercase tracking-[0.4em] text-amber-200/90 mb-6">The Guide</div>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-4xl">
            The businesses behind the Scottsdale golf life.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-amber-50/85 max-w-2xl font-light">
            Verified, local and chosen for the households of {AREA_TEXT}.
          </p>
          <GuideSearch />
        </div>
      </section>

      {/* PREMIER PARTNERS: directly under the hero and search; a promotion box until the first one joins */}
      {premiers.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 pt-16">
          <PremierPromo />
        </section>
      )}
      {premiers.length > 0 && (
        <section className="bg-[#062840] text-amber-50">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-[11px] uppercase tracking-[0.4em] text-amber-300">Premier Partners</div>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#BA9273]/30 border border-[#BA9273]/30">
              {premiers.map((b) => {
                const cat = categoryBySlug[b.categories[0]];
                const city = cityBySlug[b.city];
                return (
                  <Link key={b.slug} href={businessHref(b)} className="group bg-[#062840] p-8 flex flex-col min-h-[200px]">
                    <div className="flex gap-2 flex-wrap items-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300">Premier</span>
                      <PartnerBadge />{b.sample && <SampleBadge />}
                    </div>
                    <h3 className="mt-5 font-serif text-2xl md:text-3xl text-amber-50 group-hover:text-amber-300 transition">{b.name}</h3>
                    <div className="mt-auto pt-6 text-sm text-amber-100/70 flex items-center gap-2"><span>{cat?.title}</span><span>·</span><MapPin className="h-3.5 w-3.5" />{city?.name}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className={eyebrow}>Our standard</div>
        <p className="mt-6 font-serif text-3xl md:text-4xl text-[#062840] leading-snug">
          Every name in this guide is a real business with a real address in our five cities.
        </p>
      </section>

      {/* LUXURY CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className={eyebrow}>Luxury</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#062840] tracking-tight">Where to begin</h2>
          </div>
          <a href="#all-categories" className="hidden md:inline-flex items-center gap-2 text-sm text-[#062840] hover:text-[#BA9273]">All 289 categories <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-6">{lead && <CategoryTile c={lead} count={byCategory[lead.slug] || 0} large />}</div>
          <div className="md:col-span-6 grid sm:grid-cols-2 gap-8">
            {restLux.map((c) => <CategoryTile key={c.slug} c={c} count={byCategory[c.slug] || 0} />)}
          </div>
        </div>
      </section>

      {/* HOW WE VERIFY */}
      <section className="bg-[#f6f1ea]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[620px]">
            <img src={IMG.verify} alt="Saguaro in the Sonoran Desert" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-6 md:px-16 py-20">
            <div className={eyebrow}>How we verify</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#062840] tracking-tight">Real, local businesses only.</h2>
            <ol className="mt-12 space-y-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#062840]/15 pt-6">
                  <span className="font-serif text-2xl text-[#BA9273]">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-serif text-xl text-[#062840]">{s.title}</h3>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#062840]/45">{s.who}</span>
                    </div>
                    <p className="mt-1 text-[#062840]/70">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      {partners.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className={eyebrow}>Our partners</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#062840] tracking-tight">Featured Partners</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-px bg-[#062840]/15 border border-[#062840]/15">
            {partners.map((b) => {
              const cat = categoryBySlug[b.categories[0]];
              const city = cityBySlug[b.city];
              return (
                <Link key={b.slug} href={businessHref(b)} className="group bg-white p-10 flex flex-col min-h-[260px]">
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#BA9273]">{LEVELS[b.level].name}</span>
                    <PartnerBadge />{b.sample && <SampleBadge />}
                  </div>
                  <h3 className="mt-6 font-serif text-3xl text-[#062840] group-hover:text-[#BA9273] transition">{b.name}</h3>
                  <div className="mt-auto pt-8 text-sm text-[#062840]/60 flex items-center gap-2"><span>{cat?.title}</span><span>·</span><MapPin className="h-3.5 w-3.5" />{city?.name}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CITIES */}
      <section className="relative text-amber-50">
        <img src={IMG.cities} alt="Saguaros and desert mountains outside Scottsdale" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#041c2d]/75" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.35em] text-amber-200/90">Browse by city</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Five cities, one guide.</h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {CITIES.map((city) => (
              <div key={city.slug} className="border-t border-amber-200/30 pt-6">
                <h3 className="font-serif text-2xl">{city.name}</h3>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-amber-200/70">{(byCity[city.slug] || 0).toLocaleString()} businesses</div>
                <ul className="mt-5 space-y-2 text-[15px]">
                  {lux.map((c) => (
                    <li key={c.slug}><Link href={categoryCityHref(c, city)} className="text-amber-50/85 hover:text-amber-300 transition">{c.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CATEGORIES */}
      <section id="all-categories" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className={eyebrow}>The full index</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#062840] tracking-tight">All 289 categories</h2>
        </div>
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-12">
          {CATEGORY_GROUPS.map((g) => (
            <div key={g.slug} className="break-inside-avoid mb-12">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] border-b border-[#062840]/15 pb-3 mb-4">{g.name}</h3>
              <ul className="space-y-1.5">
                {categoriesInGroup(g.slug).map((c) => (
                  <li key={c.slug} className="flex justify-between gap-3">
                    <Link href={categoryHref(c)} className="font-serif text-[17px] text-[#062840]/85 hover:text-[#BA9273] transition">{c.title}</Link>
                    {byCategory[c.slug] > 0 && <span className="text-xs text-[#062840]/40 tabular-nums pt-1">{byCategory[c.slug]}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[#f6f1ea]"><FAQ items={FAQ_ITEMS} /></div>

      {/* CLOSING */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[420px]">
          <img src={IMG.closing} alt="Golf green and bunker at sunset" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="bg-[#062840] text-amber-50 px-6 md:px-16 py-20 flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-[0.35em] text-amber-300">For business owners</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight leading-tight">Be found by the households that matter.</h2>
          <p className="mt-5 text-amber-50/80 max-w-md">Start with a free listing, or claim the one Premier spot in your category. Founding rates are locked for life.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/partner-with-us" className="inline-flex items-center gap-2 bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3.5 text-sm font-semibold tracking-wide">
              Become a Founding Partner <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`${GUIDE_BASE}/add-your-business`} className="inline-flex items-center gap-2 border border-amber-200/50 hover:border-amber-200 text-amber-50 px-7 py-3.5 text-sm font-semibold tracking-wide">
              Add your business free
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

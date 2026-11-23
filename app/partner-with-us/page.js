import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { LEVELS, GUIDE_BASE } from '@/lib/directory';
import { AREA_TEXT } from '@/lib/directory/content';
import { ArrowRight, BadgeCheck, Check, Star } from 'lucide-react';

// Partner sales page: the three listing levels and the founding offer
// (hub, Revenue: Directory Listings, Nov 21, 2026). Monthly billing, no free
// month. No invented statistics, no em dashes, no referral fees, no exclusive
// realtor slot.

export const metadata = {
  title: 'Partner With Us: Founding Partner Offer | Scottsdale Golf Lifestyle',
  description: `List your business free, or become a Founding Partner at $49, $99 or $149 a month and keep that rate for life. One Premier Partner per category per city. Reach the golf households of ${AREA_TEXT}.`,
  alternates: { canonical: `${SITE.url}/partner-with-us` },
  openGraph: {
    url: `${SITE.url}/partner-with-us`,
    images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }]
  },
  robots: { index: true, follow: true }
};

const PREMIER_FEATURES = [
  'One Premier Partner per category per city. The spot is yours alone.',
  'First position on your category and city pages, above every other partner',
  'Everything in Featured Partner',
  'First rights to reader inquiries for your category and city',
];

const PLANS = [
  {
    key: 'free',
    tagline: 'Be in the guide',
    features: ['Your business name and a short description', 'Listed in your category and city pages', 'Verified as a real, local business'],
    cta: { label: 'Add your business free', href: `${GUIDE_BASE}/add-your-business` },
  },
  {
    key: 'full',
    tagline: 'Be found and contacted',
    founding: true,
    features: [
      'Your website, phone and email on your listing',
      'One SEO and AEO article about your business each month',
      'Your name and website in our matching articles',
      'Links from your listing to every article that features you',
      'Contact tracking and a monthly report',
    ],
    cta: { label: 'Become a Founding Partner', href: '/collaborators/apply?level=full' },
  },
  {
    key: 'featured',
    tagline: 'Lead your category',
    founding: true,
    highlight: true,
    features: [
      'Everything in Full Listing',
      'Featured placement at the top of your category',
      'One SEO and AEO article about your business each week',
      'Reader inquiries for your category sent straight to you',
    ],
    cta: { label: 'Become a Founding Partner', href: '/collaborators/apply?level=featured' },
  },
];

export default function PartnerWithUsPage({ searchParams }) {
  const chosen = typeof searchParams?.level === 'string' ? searchParams.level : null;

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Partner With Us', path: '/partner-with-us' }
      ])} />

      {/* HERO */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">
            <Star className="h-4 w-4" /> Founding Partner offer
          </div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] max-w-3xl">
            Lock in your founding rate for life
          </h1>
          <p className="mt-6 text-emerald-50/80 text-lg leading-relaxed max-w-2xl">
            Scottsdale Golf Lifestyle is the luxury guide to golf living in {AREA_TEXT}. Our first partners
            join at founding rates from ${LEVELS.full.monthly} a month and keep that
            price for as long as they stay with us.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#plans" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold transition">
              See the plans <ArrowRight className="h-4 w-4" />
            </a>
            <Link href={`${GUIDE_BASE}/add-your-business`} className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 hover:border-amber-200 text-amber-100 px-7 py-3 text-sm font-semibold transition">
              Start with a free listing
            </Link>
          </div>
        </div>
      </section>

      {/* WHO YOU REACH */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Who you reach</div>
        <h2 className="font-serif text-3xl md:text-4xl text-[#062840] tracking-tight mb-5">A reader who has already done the homework.</h2>
        <div className="grid md:grid-cols-2 gap-10 text-[#062840]/80 leading-relaxed">
          <p>
            Our pages answer the questions Scottsdale golf households research: what a community costs to
            live in, how clubs work, which neighborhoods fit a snowbird season or a full-time move, and who
            to hire once they arrive. By the time a reader looks for a business here, they are ready to act.
          </p>
          <p>
            Read a <Link href="/communities/desert-mountain" className="text-amber-700 underline underline-offset-4">community guide</Link>,
            the <Link href="/laquinta-golf-community-index-2026" className="text-amber-700 underline underline-offset-4">Community Index</Link> or
            the <Link href="/blog" className="text-amber-700 underline underline-offset-4">Journal</Link> to see
            the depth of what we publish. We share real numbers in conversation and publish only what we can verify.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">The offer</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] tracking-tight">Four ways to be in the guide.</h2>
          <p className="mt-3 text-[#062840]/75 max-w-2xl">Billed monthly. Pay for the year and get two months free. Founding rates stay locked for life.</p>

          {/* PREMIER */}
          <article className={`mt-10 bg-[#062840] text-amber-50 rounded-2xl p-8 md:p-10 border ${chosen === 'premier' ? 'border-amber-300 ring-2 ring-amber-300/60' : 'border-[#BA9273]'}`}>
            <div className="md:flex md:items-start md:justify-between gap-10">
              <div className="max-w-2xl">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full bg-amber-300 text-[#062840]">One per category per city</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full bg-[#BA9273] text-white">Founding rate</span>
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-amber-200/70">Own your category</div>
                <h3 className="font-serif text-3xl mt-1">{LEVELS.premier.name}</h3>
                <ul className="mt-6 space-y-2">
                  {PREMIER_FEATURES.map((f) => (
                    <li key={f} className="flex gap-2 text-amber-50/90 text-[15px]"><Check className="h-4 w-4 mt-1 text-amber-300 shrink-0" />{f}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-amber-100/70">Realtors: the Premier Realtor in each city supplies the listings feed shown on our pages and receives the buyer inquiries.</p>
              </div>
              <div className="mt-8 md:mt-0 md:text-right shrink-0">
                <div><span className="font-serif text-5xl">${LEVELS.premier.monthly}</span><span className="text-amber-100/70"> a month</span></div>
                <div className="text-sm text-amber-100/70">or ${LEVELS.premier.annual.toLocaleString()} a year, two months free</div>
                <Link href="/collaborators/apply?level=premier" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold">
                  Claim your Premier spot <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-2 text-xs text-amber-100/60">First to claim a spot keeps it.</div>
              </div>
            </div>
          </article>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => {
              const level = LEVELS[p.key];
              const ring = p.highlight || chosen === p.key;
              return (
                <article key={p.key} className={`bg-white rounded-2xl p-8 flex flex-col border ${ring ? 'border-[#BA9273] ring-1 ring-[#BA9273]/40' : 'border-[#062840]/10'}`}>
                  {p.founding && (
                    <div className="self-start text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full bg-[#BA9273] text-white mb-4">Founding rate</div>
                  )}
                  <div className="text-xs uppercase tracking-[0.25em] text-[#062840]/60">{p.tagline}</div>
                  <h3 className="font-serif text-2xl text-[#062840] mt-1">{level.name}</h3>
                  <div className="mt-4 text-[#062840]">
                    <span className="font-serif text-4xl">${level.monthly}</span>
                    <span className="text-[#062840]/60">{level.monthly ? ' a month' : ''}</span>
                  </div>
                  <div className="text-sm text-[#062840]/60 min-h-[1.25rem]">
                    {level.annual ? `or $${level.annual.toLocaleString()} a year, two months free` : 'Free, always'}
                  </div>
                  <ul className="mt-6 space-y-2 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-[#062840]/85 text-[15px]"><Check className="h-4 w-4 mt-1 text-[#BA9273] shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Link href={p.cta.href}
                    className={`mt-8 block text-center px-6 py-3 rounded-full text-sm font-semibold ${p.highlight ? 'bg-[#BA9273] text-white hover:bg-[#a67f61]' : 'border border-[#062840] text-[#062840] hover:bg-[#062840] hover:text-white'}`}>
                    {p.cta.label}
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 bg-[#062840] text-amber-50 rounded-2xl p-8 md:flex md:items-center md:justify-between gap-6">
            <div>
              <div className="font-serif text-2xl">The founding offer</div>
              <p className="mt-2 text-amber-100/85 max-w-2xl">
                Join as a Full Listing, Featured or Premier Partner now and your monthly rate never goes up, for as long as
                you stay a partner. Founding rates are for our first partners only.
              </p>
            </div>
            <Link href="/collaborators/apply?level=featured" className="mt-5 md:mt-0 shrink-0 inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold">
              Claim your founding rate <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-3">The fine print, up front</div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">How we keep reader trust.</h2>
            </div>
            <ul className="space-y-4 text-emerald-50/85 text-[15px] leading-relaxed">
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" /> Every paid business carries a Partner label, on its listing and everywhere we name it, as US advertising law requires.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" /> We verify every business before it appears and publish only facts we can confirm. No fake reviews, no invented statistics.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" /> Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network. We are not a brokerage.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#062840] tracking-tight leading-tight">Ready when you are.</h2>
        <p className="mt-4 text-[#062840]/70 max-w-xl mx-auto leading-relaxed">
          Start free, or claim your founding rate today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/collaborators/apply?level=featured" className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-8 py-3.5 text-sm font-semibold transition">
            Become a Founding Partner <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`${GUIDE_BASE}/add-your-business`} className="inline-flex items-center gap-2 rounded-full border border-[#062840]/20 hover:border-[#062840]/50 text-[#062840] px-8 py-3.5 text-sm font-semibold transition">
            Add your business free
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

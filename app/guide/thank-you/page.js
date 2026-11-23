import Link from 'next/link';
import { Check } from 'lucide-react';
import PageShell from '@/components/page-shell';
import { GUIDE_BASE, LEVELS } from '@/lib/directory';

export const metadata = { title: 'Thank You | Scottsdale Golf Lifestyle Guide', robots: { index: false, follow: false } };

const OFFERS = [
  {
    key: 'premier',
    features: [
      'One per category per city. The spot is yours alone.',
      'First position, above every other partner',
      'Everything in Featured Partner',
      'First rights to reader inquiries for your category and city',
    ],
  },
  {
    key: 'full',
    features: [
      'Your website, phone and email on your listing',
      'One SEO and AEO article about your business each month',
      'Your name and website in our matching articles',
      'Links from your listing to every article that features you',
      'Contact tracking and a monthly report',
    ],
  },
  {
    key: 'featured',
    features: [
      'Everything in Full Listing',
      'Featured placement at the top of your category',
      'One SEO and AEO article about your business each week',
      'Reader inquiries for your category sent straight to you',
    ],
  },
];

export default function ThankYou({ searchParams }) {
  const live = searchParams?.status === 'live';
  const listing = typeof searchParams?.listing === 'string' ? searchParams.listing : null;

  return (
    <PageShell>
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-4">Thank you</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            {live ? 'Your free listing is live' : 'Your listing is in review'}
          </h1>
          <p className="mt-5 text-amber-100/90 text-lg">
            {live
              ? 'Your business passed our verification check and now appears in the guide.'
              : 'We are confirming a few details by hand. Your listing goes live as soon as we finish.'}
          </p>
          {live && listing && (
            <Link href={`${GUIDE_BASE}/${listing}`} className="mt-6 inline-block text-amber-300 hover:text-amber-100">View your listing &rarr;</Link>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="font-serif text-3xl md:text-4xl text-[#062840]">Put your business in front of every golf household we reach</h2>
        <p className="mt-3 text-[#062840]/80 max-w-2xl">
          Upgrade today and lock in your founding rate for life.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {OFFERS.map(({ key, features }) => {
            const level = LEVELS[key];
            const featured = key === 'premier';
            return (
              <div key={key} className={`rounded-2xl p-8 bg-white border ${featured ? 'border-[#BA9273] ring-1 ring-[#BA9273]/40' : 'border-[#062840]/10'}`}>
                {key === 'premier' && <div className="text-[10px] uppercase tracking-[0.25em] text-[#BA9273] mb-2">One per category per city</div>}
                <h3 className="font-serif text-2xl text-[#062840]">{level.name}</h3>
                <div className="mt-3 text-[#062840]">
                  <span className="font-serif text-4xl">${level.monthly}</span><span className="text-[#062840]/60"> a month</span>
                </div>
                <div className="text-sm text-[#062840]/60">or ${level.annual.toLocaleString()} a year, two months free</div>
                <ul className="mt-6 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-[#062840]/85"><Check className="h-4 w-4 mt-1 text-[#BA9273] shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link href={`/partner-with-us?level=${key}${listing ? `&listing=${encodeURIComponent(listing)}` : ''}`}
                  className={`mt-8 block text-center px-6 py-3 rounded-full ${featured ? 'bg-[#BA9273] text-white hover:bg-[#a67f61]' : 'border border-[#062840] text-[#062840] hover:bg-[#062840] hover:text-white'}`}>
                  Choose {level.name}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

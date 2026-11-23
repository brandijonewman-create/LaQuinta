import PageShell from '@/components/page-shell';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

// Sister markets owned by 7671 Enterprises LLC. Order preserved as supplied
// by ownership (flagship first, then by state grouping).
const NETWORK_MARKETS = [
  { market: 'Scottsdale, AZ',    domain: 'ScottsdaleGolfLifestyle.com',   status: 'Active' },
  { market: 'La Quinta, CA',     domain: 'LaQuintaGolfLifestyle.com',     status: 'Active' },
  { market: 'Rancho Mirage, CA', domain: 'RanchoMirageGolfLifestyle.com', status: 'Confirmed' },
  { market: 'Palm Desert, CA',   domain: 'PalmDesertGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Indian Wells, CA',  domain: 'IndianWellsGolfLifestyle.com',  status: 'Confirmed' },
  { market: 'Carlsbad, CA',      domain: 'CarlsbadGolfLifestyle.com',     status: 'Confirmed' },
  { market: 'Naples, FL',        domain: 'NaplesGolfLifestyle.com',       status: 'Confirmed' },
  { market: 'Palm Beach, FL',    domain: 'PalmBeachGolfLifestyle.com',    status: 'Active' },
  { market: 'Ponte Vedra, FL',   domain: 'PonteVedraGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Boca Raton, FL',    domain: 'BocaRatonGolfLifestyle.com',    status: 'Confirmed' },
  { market: 'Destin, FL',        domain: 'DestinGolfLifestyle.com',       status: 'Confirmed' },
  { market: 'Hilton Head, SC',   domain: 'HiltonHeadGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Kiawah Island, SC', domain: 'KiawahIslandGolfLifestyle.com', status: 'Confirmed' },
  { market: 'Las Vegas, NV',     domain: 'LasVegasGolfLifestyle.com',     status: 'Confirmed' }
];

export const metadata = {
  title: 'About | Scottsdale Golf Lifestyle',
  description: 'About Scottsdale Golf Lifestyle: a research-first guide to luxury golf real estate in Scottsdale, Arizona. Operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: { url: `${SITE.url}/about`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const activeCount = NETWORK_MARKETS.filter(m => m.status === 'Active').length;
  const confirmedCount = NETWORK_MARKETS.filter(m => m.status === 'Confirmed').length;

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ])} />

      {/* HERO */}
      <section className="relative bg-[#062840] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_30%,#d4af37_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#d4af37_0%,transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.4em] text-amber-300 mb-5">About &middot; Est. 2025</div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-amber-50 tracking-tight leading-[1.05]">
            Scottsdale&rsquo;s most thorough<br/>
            <span className="text-amber-300">golf real-estate guide.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-emerald-50/80 text-lg md:text-xl leading-relaxed">
            Every named golf community in the greater Scottsdale area: price ranges, golf access,
            HOA economics, architecture, and an honest take on who each community actually fits.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[0.25em] text-amber-200/70">
            <div><span className="text-amber-300 font-bold text-sm">47</span> &nbsp;communities covered</div>
            <div><span className="text-amber-300 font-bold text-sm">22</span> &nbsp;long-form articles</div>
            <div><span className="text-amber-300 font-bold text-sm">13</span> &nbsp;architect profiles</div>
          </div>
        </div>
      </section>

      {/* LEAD */}
      <section className="bg-[#fdfaf4]">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <p className="font-serif text-2xl md:text-[28px] text-[#062840] leading-[1.45]">
            Scottsdale Golf Lifestyle is a research-first resource covering every named golf community in the greater Scottsdale area: price ranges, golf access, HOA fees, membership economics, and an honest assessment of who each community actually fits.
          </p>
        </div>
      </section>

      {/* FROM THE PUBLISHER */}
      <section id="publisher" className="bg-white border-t border-[#062840]/10">
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Person', name: 'Brandi Jo Newman', jobTitle: 'Publisher', worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url }, url: `${SITE.url}/about#publisher` }} />
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-6">From the Publisher</div>
          <div className="space-y-5 text-[#062840]/85 leading-relaxed text-[16px] md:text-[18px] font-serif">
            <p>Welcome to Scottsdale Golf Lifestyle.</p>
            <p>I spent eleven years playing professional golf across six continents. Having walked fairways in some of the most extraordinary settings in the world, I learned early on that the finest destinations all share a quiet truth: the golf is merely the beginning. It is the life woven around the game that invites you to stay.</p>
            <p>Following my time on tour, I spent three decades building businesses in financial services and marketing. That chapter instilled in me an enduring respect for numbers that stand up to scrutiny and people who speak with candid clarity.</p>
            <p>I created this publication on those very foundations. Scottsdale is undeniably one of the world&rsquo;s premier golf havens, yet living here well is about the entire cadence of the day: the right club, an exceptional table on a Friday evening, the drive through the desert morning, and a community that feels effortlessly like home.</p>
            <p>Every insight within these pages is anchored in verified fact. Market figures are presented as carefully considered ranges, accompanied by the guidance to confirm specifics with trusted professionals. Where we feature partners, they are transparently identified. You deserve complete confidence in what you read.</p>
            <p>My hope is simple: that you discover your own place in Scottsdale, and that this guide brings you there with clarity, distinction, and ease.</p>
          </div>
          <div className="mt-10 text-[#062840]">
            <p className="font-serif text-lg italic">See you out there,</p>
            <p className="mt-4 font-serif text-2xl">Brandi Jo Newman</p>
            <p className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mt-1">Publisher</p>
          </div>
        </div>
      </section>

      {/* WHAT THIS SITE IS / IS NOT: two-column */}
      <section className="bg-white border-t border-[#062840]/10">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-emerald-700 mb-3">01 &middot; What this is</div>
            <h2 className="font-serif text-3xl text-[#062840] mb-5 leading-tight">A research-first guide built with the people who work the market.</h2>
            <p className="text-[#062840]/80 leading-relaxed text-[15px]">
              We cover every named golf community in the greater Scottsdale area in partnership with affiliated realtors, financial advisors, and architecture experts who actually work this market day-to-day. Their content, photography, and on-the-ground knowledge make the coverage useful; transparent collaborator partnerships make the publication sustainable.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-3">02 &middot; What this isn&rsquo;t</div>
            <h2 className="font-serif text-3xl text-[#062840] mb-5 leading-tight">A brokerage, an MLS feed, or a black box.</h2>
            <ul className="space-y-2.5 text-[#062840]/80 text-[15px]">
              <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&times;</span> It is not a brokerage. We do not hold real-estate listings ourselves.</li>
              <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&times;</span> It is not a generic directory. Coverage is editorial and curated.</li>
              <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&times;</span> Collaborator partnerships are disclosed. Pretending otherwise serves no one.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW WE MAKE MONEY */}
      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-3">03 &middot; The business model</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] mb-6 leading-tight">How we make money: transparently.</h2>
          <p className="text-[#062840]/80 leading-relaxed text-[16px] md:text-[17px]">
            <strong>Preferred Partner listings.</strong> Businesses in our <Link href="/collaborators" className="text-amber-700 underline-offset-4 underline hover:text-amber-800">directory</Link> pay for upgraded Preferred Partner listings. Every paid listing is named and marked as a partnership on the page where it appears. We take no referral fees and no commissions.
          </p>
          <p className="mt-6 text-[#062840]/70 text-[14px] md:text-[15px] leading-relaxed italic">
            Partner listings do not buy favorable coverage. If a community isn&rsquo;t a fit for a particular buyer profile, we say so.
          </p>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-3">04 &middot; Ownership</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] mb-6 leading-tight">Operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network.</h2>
          <p className="text-[#062840]/80 leading-relaxed text-[16px] md:text-[17px]">
            Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator. It is built in partnership with Arizona-licensed real estate professionals. We are not a real estate brokerage. Scottsdale Golf Lifestyle is the Arizona flagship of a national network of luxury golf-real-estate publications, each built around the same editorial principles: research-first, no fake listings, transparent monetization.
          </p>
        </div>
      </section>

      {/* NETWORK MARKETS */}
      <section className="bg-[#062840] text-amber-50 border-t border-amber-300/20">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.35em] text-amber-300 mb-4">05 &middot; The network</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl">Sister markets across the country.</h2>
            <div className="flex gap-6 text-amber-200/80 text-xs uppercase tracking-[0.25em]">
              <div><span className="block font-bold text-amber-300 text-2xl mb-1">{activeCount}</span>Active</div>
              <div><span className="block font-bold text-amber-300 text-2xl mb-1">{confirmedCount}</span>Confirmed</div>
              <div><span className="block font-bold text-amber-300 text-2xl mb-1">{NETWORK_MARKETS.length}</span>Markets</div>
            </div>
          </div>
          <p className="max-w-2xl text-emerald-50/75 text-base md:text-lg leading-relaxed mb-10">
            <strong className="text-amber-100">Active</strong> sites are publishing now. <strong className="text-amber-100">Confirmed</strong> sites have secured domains with build phases scheduled.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-amber-300/15 bg-[#08344f]/60 backdrop-blur-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0a3d5c] border-b border-amber-300/15">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.2em] text-[10px] text-amber-300/80">Market</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.2em] text-[10px] text-amber-300/80">Domain</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.2em] text-[10px] text-amber-300/80 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-300/10">
                {NETWORK_MARKETS.map(m => (
                  <tr key={m.domain} className="hover:bg-[#0a3d5c]/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-amber-50 whitespace-nowrap">{m.market}</td>
                    <td className="px-6 py-4 text-emerald-50/70 font-mono text-[13px]">
                      {m.status === 'Active' ? (
                        <a href={`https://${m.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 underline-offset-4 hover:underline">{m.domain}</a>
                      ) : (
                        <span>{m.domain}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {m.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 text-amber-200 ring-1 ring-amber-400/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Confirmed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

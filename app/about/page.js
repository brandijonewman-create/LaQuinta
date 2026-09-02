import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { owner, site } from '@/lib/site-config';

// Golf Lifestyle network markets — 14 single-city publications operated by
// 7671 Enterprises LLC. Status values: 'Active' (live and indexing) or
// 'Confirmed' (domain secured, build on schedule).
const NETWORK_MARKETS = [
  { market: 'Scottsdale, AZ',     domain: 'ScottsdaleGolfLifestyle.com',   status: 'Active' },
  { market: 'La Quinta, CA',      domain: 'LaQuintaGolfLifestyle.com',     status: 'Active' },
  { market: 'Rancho Mirage, CA',  domain: 'RanchoMirageGolfLifestyle.com', status: 'Confirmed' },
  { market: 'Palm Desert, CA',    domain: 'PalmDesertGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Indian Wells, CA',   domain: 'IndianWellsGolfLifestyle.com',  status: 'Confirmed' },
  { market: 'Carlsbad, CA',       domain: 'CarlsbadGolfLifestyle.com',     status: 'Confirmed' },
  { market: 'Naples, FL',         domain: 'NaplesGolfLifestyle.com',       status: 'Confirmed' },
  { market: 'Palm Beach, FL',     domain: 'PalmBeachGolfLifestyle.com',    status: 'Active' },
  { market: 'Ponte Vedra, FL',    domain: 'PonteVedraGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Boca Raton, FL',     domain: 'BocaRatonGolfLifestyle.com',    status: 'Confirmed' },
  { market: 'Destin, FL',         domain: 'DestinGolfLifestyle.com',       status: 'Confirmed' },
  { market: 'Hilton Head, SC',    domain: 'HiltonHeadGolfLifestyle.com',   status: 'Confirmed' },
  { market: 'Kiawah Island, SC',  domain: 'KiawahIslandGolfLifestyle.com', status: 'Confirmed' },
  { market: 'Las Vegas, NV',      domain: 'LasVegasGolfLifestyle.com',     status: 'Confirmed' },
];

export const metadata = {
  title: 'About',
  description: `About ${site.name} — a lifestyle guide to La Quinta’s private golf communities. Owned and operated by ${owner.name}.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A lifestyle guide to La Quinta."
        subtitle={`${site.name} covers La Quinta’s private golf communities, the architects who built them, and the desert life around them. Listings and representation are provided by our California-licensed Exclusive Market Partner.`}
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
            <h2 className="font-serif text-3xl text-palm">Owned and operated by {owner.fullName}</h2>
            <p>
              {site.name} is owned and operated by <strong className="text-palm">{owner.fullName}</strong>. The site is part of a small network of single-city desert publications &mdash; each one focused on a single Coachella Valley municipality, each written for the buyer who wants a clear picture of the communities before a showing is arranged.
            </p>
            <p>
              The network exists because most online coverage of desert golf real estate is either listing-portal noise or thinly veiled promotion for a single brokerage. We publish lifestyle context &mdash; architecture, membership, daily character &mdash; in partnership with the local realtor who actually works each market. The listings, the tours, and the representation come from them.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we publish</h2>
            <p>
              Profiles of La Quinta&rsquo;s private golf communities. Dedicated pages for the architects whose work defines them. Long-form buyer guides &mdash; starting with the 2026 La Quinta Golf Buyer&rsquo;s Guide. A market-context report for the 92253 ZIP. An interactive lifestyle map. And a regular journal on the questions buyers actually ask.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we don&rsquo;t do</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not publish fabricated testimonials or quotes.</li>
              <li>We do not publish unverified market figures, initiation fees, or transaction prices.</li>
              <li>We do not publish celebrity or homeowner addresses.</li>
              <li>We do not send automated marketing emails.</li>
            </ul>

            <h2 className="font-serif text-3xl text-palm pt-6">Editorial independence</h2>
            <p>
              We are a publisher, not a broker. Every California real estate transaction referenced on this site is executed by our California-licensed Exclusive Market Partner. Editorial content is not for sale &mdash; no affiliate placements in the articles, no paid community placement in the quiz results, no listing fees.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-10">The Golf Lifestyle network</h2>
            <p>
              {site.name} is one of fourteen single-city golf-market publications owned and operated by {owner.name}. Three sites are live and indexing today; the remaining eleven domains are confirmed and on the build calendar.
            </p>

            <div className="mt-6 overflow-hidden border border-border rounded-lg bg-white">
              <table className="w-full text-sm">
                <thead className="bg-sand-50 border-b border-border">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-[0.2em] text-foreground/65">Market</th>
                    <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-[0.2em] text-foreground/65">Domain</th>
                    <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-[0.2em] text-foreground/65 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {NETWORK_MARKETS.map((m) => (
                    <tr
                      key={m.domain}
                      className={`border-b border-border/60 last:border-0 ${m.market === 'La Quinta, CA' ? 'bg-gold/10' : ''}`}
                    >
                      <td className="px-4 py-3 text-palm font-medium whitespace-nowrap">{m.market}</td>
                      <td className="px-4 py-3 text-foreground/75 font-mono text-[12.5px]">
                        {m.status === 'Active' ? (
                          <a
                            href={`https://${m.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-palm hover:text-terracotta underline-offset-2 hover:underline"
                          >
                            {m.domain}
                          </a>
                        ) : (
                          <span>{m.domain}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium ${
                            m.status === 'Active' ? 'text-palm' : 'text-foreground/55'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              m.status === 'Active' ? 'bg-palm' : 'bg-gold-dark/60'
                            }`}
                          />
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45 mt-3">
              Status &middot; Active: live and indexing &middot; Confirmed: domain secured, build on schedule
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-sand-50 border border-border p-6 lg:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-4">Get in touch</div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Reach out via the community quiz or the home-valuation form. Inquiries are answered directly by the team at {owner.name}.
              </p>
              <p className="text-sm text-foreground/70 mt-4">
                Press inquiries, corrections, or community partnership questions: please use the contact form on the relevant page.
              </p>
            </div>
            <div className="bg-palm text-sand-50 p-6 lg:p-8 mt-6">
              <div className="text-xs uppercase tracking-[0.28em] text-gold mb-3">The Network</div>
              <p className="text-sm text-sand-50/85 leading-relaxed">
                {site.name} is one of fourteen single-city golf-market publications operated by {owner.name} &mdash; from Coachella Valley through Florida, the Carolinas, and Las Vegas. See the full network table below.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

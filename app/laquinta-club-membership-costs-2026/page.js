import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { CLUB_MEMBERSHIPS } from '@/lib/membership-data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Crown, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf Club Membership Costs 2026',
  description: 'Editorial estimates of initiation fees, monthly dues, member caps, and transferability rules for the 12 most-asked-about Scottsdale private golf clubs in 2026.',
  alternates: { canonical: `${SITE.url}/scottsdale-club-membership-costs-2026` },
  openGraph: { url: `${SITE.url}/scottsdale-club-membership-costs-2026`, title: 'Scottsdale Golf Club Membership Costs 2026', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const tiers = [
    { id: 1, label: 'Tier 1: Ultra-Prestige Private', clubs: CLUB_MEMBERSHIPS.filter(c => c.tier === 1) },
    { id: 2, label: 'Tier 2: Country-Club Flagship', clubs: CLUB_MEMBERSHIPS.filter(c => c.tier === 2) },
    { id: 3, label: 'Tier 3: Daily-Fee & Resort', clubs: CLUB_MEMBERSHIPS.filter(c => c.tier === 3) }
  ];

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Club Membership Costs 2026', path: '/laquinta-club-membership-costs-2026' }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Scottsdale Golf Club Membership Costs 2026',
        author: { '@type': 'Organization', name: SITE.name },
        publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        datePublished: '2026-01-15'
      }} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-300 mb-3"><Crown className="h-4 w-4" /> 2026 Edition</div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">Scottsdale golf club membership costs.</h1>
          <p className="mt-6 text-emerald-50/85 text-lg max-w-2xl">
            Initiation fees, monthly dues, member caps, and transferability rules for the 12 most-asked-about
            Scottsdale private and resort golf clubs in 2026.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
          <div className="text-sm text-[#062840]/85">
            <strong>How these numbers are sourced.</strong> Clubs do not publish initiation fees or dues. The figures
            here are <em>editorial estimates</em> compiled from member-relayed reporting, real-estate-broker channels,
            and industry trade publications. Numbers shift annually, sometimes meaningfully. <strong>Always verify
            directly with the club</strong> before relying on any of this for a financial decision.
          </div>
        </div>
      </section>

      {tiers.map(t => (
        <section key={t.id} className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] mb-6">{t.label}</h2>
          <div className="overflow-x-auto rounded-xl border border-[#062840]/10">
            <table className="w-full text-sm">
              <thead className="bg-[#062840] text-amber-50">
                <tr>
                  <th className="text-left px-4 py-3 font-serif text-base">Club</th>
                  <th className="text-left px-4 py-3 font-serif text-base">Architect</th>
                  <th className="text-left px-4 py-3 font-serif text-base">Initiation</th>
                  <th className="text-left px-4 py-3 font-serif text-base">Monthly Dues</th>
                  <th className="text-left px-4 py-3 font-serif text-base">Cap</th>
                  <th className="text-left px-4 py-3 font-serif text-base">Transferability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#062840]/10">
                {t.clubs.map(c => (
                  <tr key={c.slug} className="hover:bg-[#BA9273]/5 transition">
                    <td className="px-4 py-4">
                      <div className="font-serif text-lg text-[#062840]">{c.club}</div>
                      {c.communitySlug ? (
                        <Link href={`/communities/${c.communitySlug}`} className="text-xs text-[#BA9273] hover:underline">/communities/{c.communitySlug}</Link>
                      ) : (
                        <span className="text-xs text-[#062840]/50">No on-site real estate</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[#062840]/80">{c.architect}</td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#062840]">{c.initiation}</span>
                    </td>
                    <td className="px-4 py-4 text-[#062840]/85">{c.monthlyDues}</td>
                    <td className="px-4 py-4 text-[#062840]/85">{c.cap}</td>
                    <td className="px-4 py-4 text-[#062840]/85 text-xs">{c.transferability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 space-y-3">
            {t.clubs.map(c => (
              <div key={`note-${c.slug}`} className="text-xs text-[#062840]/70">
                <strong className="text-[#062840]">{c.club}:</strong> {c.notes}
              </div>
            ))}
          </div>
          <MarketDisclaimer />
        </section>
      ))}

      <section className="bg-emerald-50/40 border-t border-[#062840]/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">How to think about this</div>
          <h2 className="font-serif text-3xl text-[#062840]">Equity vs. non-equity. Transferable vs. not.</h2>
          <p className="mt-4 text-[#062840]/80 leading-relaxed">
            Two clubs can advertise the same $250,000 initiation but be fundamentally different financial products.
            An <strong>equity</strong> membership at a community-affiliated club (like Desert Mountain, DC Ranch, or
            Estancia) typically returns a portion of your initiation on resignation: it lives on the community real
            estate. A <strong>non-equity</strong> membership at a stand-alone club (Scottsdale National being the canonical
            example) is closer to a permanent lifestyle expense that vanishes on resignation.
          </p>
          <p className="mt-4 text-[#062840]/80 leading-relaxed">
            The right answer depends on (1) how long you plan to be in Scottsdale, (2) whether you want club access tied
            to your home or independent of it, and (3) your appetite for capital-at-risk inside the club&rsquo;s reserves.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/architects" className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3 text-sm font-semibold">Browse club architects <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/laquinta-golf-community-index-2026" className="inline-flex items-center gap-2 rounded-full border border-[#062840]/20 text-[#062840] hover:bg-[#062840]/5 px-6 py-3 text-sm font-semibold">The 2026 Community Index</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

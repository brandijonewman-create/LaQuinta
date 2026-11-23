import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

const LAST_UPDATED = 'November 18, 2026';

export const metadata = {
  title: 'Advertising & Affiliate Disclosure | Scottsdale Golf Lifestyle',
  description: 'How Scottsdale Golf Lifestyle is funded: paid Preferred Partner listings, clearly named. No referral fees. We are not a real estate brokerage.',
  alternates: { canonical: `${SITE.url}/disclosure` },
  openGraph: { url: `${SITE.url}/disclosure`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] },
  robots: { index: true, follow: true }
};

export default function DisclosurePage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Disclosure', path: '/disclosure' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Advertising &amp; Affiliate Disclosure</h1>
          <p className="mt-4 text-emerald-50/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-6 py-14 prose prose-emerald">
        <h2>How this publication is funded</h2>
        <p>Scottsdale Golf Lifestyle is a free editorial publication funded by disclosed commercial partnerships, not by display advertising. The Site does not run ad-network advertising. Our editorial content (community guides, comparisons, market commentary, the Journal) is not for sale, is not authored by partners, and partners do not review or approve it.</p>

        <h2>Preferred Partner listings are paid, and named</h2>
        <p>Businesses listed in our directory as Preferred Partners pay for those listings. Every paid listing and every partner mention in an article identifies the business by name and is marked as partner content.</p>

        <h2>No referral fees</h2>
        <p>We take no referral fees, commissions or revenue share from any professional. You are never obligated to use a business listed on this site.</p>

        <h2>We are not a real estate brokerage</h2>
        <p>Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator. It is built in partnership with Arizona-licensed real estate professionals. We are not a real estate brokerage. We do not list property, represent buyers or sellers, or provide brokerage services of any kind.</p>

        <h2>Estimates are not appraisals</h2>
        <p>Any market figure, price band, valuation estimate, or membership-cost range published on this site is an editorial estimate compiled from public sources. Figures are illustrative ranges compiled from public sources and change with the market. Verify current pricing, dues and fees with a licensed Arizona real estate professional or directly with the club. Nothing on this site is an appraisal, a broker price opinion, or financial, legal, or tax advice.</p>

        <h2>Questions</h2>
        <p>Questions about this disclosure? Reach us through the <a href="/contact">contact form</a>.</p>
      </article>
    </PageShell>
  );
}

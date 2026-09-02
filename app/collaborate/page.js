import CollaborateForm from './CollaborateForm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import Link from 'next/link';
import { partner } from '@/lib/exclusive-partner';

export const metadata = {
  title: 'Exclusive Market Partner — La Quinta slot filled',
  description: 'The La Quinta Exclusive Market Partner slot is filled by Kathy Schowe. Licensed California realtors interested in the same annual partnership in another California city can apply here.',
  alternates: { canonical: '/collaborate' },
};

export default function CollaboratePage() {
  return (
    <>
      <PageHero
        eyebrow="For Licensed Real Estate Professionals"
        title="La Quinta is filled. Another California city?"
        subtitle="Exactly one realtor per city — an Exclusive Market Partnership. La Quinta belongs to Kathy Schowe. If you want the same arrangement in Palm Desert, Rancho Mirage, Bermuda Dunes, Indian Wells, or another California golf market, tell us about your practice."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exclusive Market Partner' }]} />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 mt-10">
          <div>
            <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />La Quinta slot</div>
            <div className="bg-sand-50 border border-border p-6 mb-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mb-2">Filled — La Quinta, CA</div>
              <div className="font-serif text-2xl text-palm">{partner.displayName}</div>
              <div className="text-sm text-foreground/70 mt-1">{partner.brokerage.name} · CA DRE #{partner.dreLicense}</div>
              <Link href="/#meet-kathy" className="mt-3 inline-block text-sm text-palm underline decoration-terracotta underline-offset-2 hover:text-terracotta">
                Meet Kathy →
              </Link>
            </div>

            <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />How the partnership works</div>
            <h2 className="font-serif text-3xl text-palm leading-[1.1] mb-6">One realtor. One city. Annual subscription.</h2>
            <div className="prose prose-sm text-foreground/80 max-w-none space-y-4">
              <p>Golf Lifestyle Network builds and operates city-level golf-lifestyle sites. Each site is leased on an annual recurring subscription to exactly one California-licensed realtor as its Exclusive Market Partner. One realtor per city. No competing names. No round-robin lead routing.</p>
              <p>What the partner gets:</p>
              <ul>
                <li>A pre-built starter site featuring your headshot, brokerage, and community list — ready before you sign.</li>
                <li>Co-branding throughout — your name and brand integrated into every page, every guide, every email.</li>
                <li>Quarterly co-branded golf market report for your city.</li>
                <li>Co-branded buyer&rsquo;s guide PDF you can hand to clients.</li>
                <li>&ldquo;Exclusive Market Partner&rdquo; designation on the site — one realtor per city, no exceptions.</li>
                <li>Every qualified lead generated through the site routes directly to you — the contact form, the community quiz, the home-valuation form, gated downloads, all of it.</li>
              </ul>
              <p>What we ask: honesty, responsiveness, and a strict &ldquo;no-fakes&rdquo; standard for client communication.</p>
              <p><strong>Risk-reversal guarantee:</strong> if you don&rsquo;t receive at least three qualified, ready-to-tour buyer leads in your first 90 days, we refund your payment in full and you keep the co-branded content.</p>
              <p><strong>Pricing:</strong> $173/month or $1,733/year for U.S. markets. No setup fees. Annual renewal.</p>
            </div>

            <div className="mt-10">
              <Disclaimer>
                Submitting this form is an inquiry only, not a contract or referral agreement. We review every application personally and respond within 5 business days. Listings displayed on this site — when live — will be powered by California-licensed partners only.
              </Disclaimer>
            </div>
          </div>

          <div>
            <div className="bg-sand-50 border border-border p-6 md:p-8">
              <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Apply</div>
              <h3 className="font-serif text-2xl text-palm mb-6">Tell us about your practice.</h3>
              <CollaborateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

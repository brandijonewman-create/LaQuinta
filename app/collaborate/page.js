import CollaborateForm from './CollaborateForm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';

export const metadata = {
  title: 'Realtor Collaborators — Apply to Partner',
  description: 'Licensed California real estate professionals: apply to become a featured collaborator on La Quinta Golf Lifestyle. We work with a small, vetted bench of agents who actually know La Quinta’s private clubs.',
  alternates: { canonical: '/collaborate' },
};

export default function CollaboratePage() {
  return (
    <>
      <PageHero
        eyebrow="For Licensed Real Estate Professionals"
        title="Apply to become a collaborator."
        subtitle="We work with a small, vetted bench of California-licensed agents who actually live and sell inside La Quinta’s private clubs. If that’s you, tell us about your practice and we’ll be in touch."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Homes for Sale', href: '/homes-for-sale' }, { label: 'Collaborate' }]} />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 mt-10">
          <div>
            <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />Who we’re looking for</div>
            <h2 className="font-serif text-3xl text-palm leading-[1.1] mb-6">A small bench. Real expertise. La Quinta only.</h2>
            <div className="prose prose-sm text-foreground/80 max-w-none space-y-4">
              <p>This is an independent guide to La Quinta, California — not a brokerage. We don’t list, broker, or sell real estate ourselves. Instead, when a reader is ready to actually transact, we hand them off to a small, hand-picked group of California-licensed real estate professionals who specialize in La Quinta’s private clubs.</p>
              <p>If your business is built around <strong>PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, La Quinta Country Club, or The Quarry</strong> — and you can speak honestly about what it’s actually like to own and live inside them — we’d like to hear from you.</p>
              <p>What collaborators get:</p>
              <ul>
                <li>Direct introductions to qualified leads from the Community Quiz funnel and lead magnets.</li>
                <li>Editorial mentions inside the relevant community profiles you specialize in.</li>
                <li>First-look at IDX-fed listings tagged to your specialty communities when our MLS feed goes live.</li>
              </ul>
              <p>What we ask in return: honesty, responsiveness, and a strict “no fakes” standard for client communication — the same rule we hold ourselves to.</p>
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

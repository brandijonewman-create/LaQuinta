import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { owner, site } from '@/lib/site-config';

export const metadata = {
  title: 'About',
  description: `About ${site.name} — an independent guide to La Quinta golf real estate. ${owner.name}, ${owner.title}.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent guide to La Quinta."
        subtitle={`${site.name} covers the seven private golf communities of La Quinta, California, the architects who built them, and the lifestyle they sit inside. Independent. Not a brokerage.`}
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
            <h2 className="font-serif text-3xl text-palm">The owner and creator</h2>
            <p>
              <strong className="text-palm">{owner.name}</strong> is the owner and creator of {site.name}. The site is part of a small network of single-city desert publications &mdash; each one focused on a single Coachella Valley municipality, each one independent, each one written for the buyer who wants the editorial story before the sales pitch.
            </p>
            <p>
              The network exists because the desert golf market is consistently misrepresented online. Most coverage is either listing-portal noise or thinly disguised marketing for a specific brokerage. The independent-publication slot &mdash; honest editorial, no agent affiliation, no fake testimonials, no fabricated stats &mdash; was empty. We&rsquo;re filling it, one city at a time.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we publish</h2>
            <p>
              Profiles of all seven La Quinta private golf communities. Dedicated pages for the seven architects whose work defines them. Long-form buyer guides &mdash; starting with the 2026 La Quinta Golf Buyer&rsquo;s Guide. An honest market report for the 92253 ZIP. An interactive lifestyle map. And a regular blog covering the things buyers actually want to know about, written like a normal human.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we don&rsquo;t do</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not list, broker, or sell real estate.</li>
              <li>We do not publish fabricated testimonials or quotes.</li>
              <li>We do not publish unverified market figures, initiation fees, or transaction prices.</li>
              <li>We do not publish celebrity or homeowner addresses.</li>
              <li>We do not send automated marketing emails.</li>
            </ul>

            <h2 className="font-serif text-3xl text-palm pt-6">How we make money</h2>
            <p>
              Display advertising via Google AdSense. That&rsquo;s it &mdash; no affiliate placements in the editorial, no paid community placement in the quiz results, no listing fees, no brokerage relationships.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-sand-50 border border-border p-6 lg:p-8">
              <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Get in touch</div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Reach out via the community quiz or the home-valuation form. Brandi answers personally.
              </p>
              <p className="text-sm text-foreground/70 mt-4">
                Press inquiries, corrections, or community partnership questions: please use the contact form on the relevant page.
              </p>
            </div>
            <div className="bg-palm text-sand-50 p-6 lg:p-8 mt-6">
              <div className="text-xs uppercase tracking-[0.28em] text-gold mb-3">The Network</div>
              <p className="text-sm text-sand-50/85 leading-relaxed">
                {site.name} is one of four planned single-city desert publications. Sister sites cover Rancho Mirage, Palm Desert, Indian Wells, and Palm Springs.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { owner, site } from '@/lib/site-config';

export const metadata = {
  title: 'About',
  description: `About ${site.name} — an independent guide to La Quinta golf real estate. ${owner.name}, ${owner.title}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`An independent guide to La Quinta.`}
        subtitle={`${site.name} is an independent guide covering the seven private golf communities of La Quinta, California, and the architects, lifestyle, and real-estate context around them.`}
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
            <h2 className="font-serif text-3xl text-palm">The owner and creator</h2>
            <p>
              {site.name} is owned and created by <strong>{owner.name}</strong>.
              The site is part of a small network of single-city desert
              publications, each focused on one Coachella Valley municipality.
            </p>
            <p className="text-foreground/70 italic">
              Full bio copy in development. The owner has not yet provided
              canonical bio text; this page will be updated when she does.
              No fabricated biography is published here.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we publish</h2>
            <p>
              Profiles of La Quinta&rsquo;s seven private golf
              communities, dedicated pages for the seven architects whose work
              defines them, long-form buyer guides, an honest 92253 market
              report, and an interactive lifestyle map.
            </p>

            <h2 className="font-serif text-3xl text-palm pt-6">What we don&rsquo;t do</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not list, broker, or sell real estate.</li>
              <li>We do not publish fabricated testimonials or quotes.</li>
              <li>We do not publish unverified market figures.</li>
              <li>We do not publish celebrity or owner addresses.</li>
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-sand-50 border border-border p-6 lg:p-8">
              <div className="editorial-eyebrow mb-4">
                <span className="editorial-rule" />
                Get in touch
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                The site contact email is a placeholder while the owner sets up
                the production address.
              </p>
              <p className="font-mono text-xs text-palm mt-4 break-all">
                {site.contactEmail}
              </p>
              <p className="text-[11px] text-foreground/55 mt-3 italic">
                Placeholder until a verified address is provided.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

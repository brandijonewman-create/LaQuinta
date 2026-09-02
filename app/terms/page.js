import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { site, MARKET_DISCLAIMER } from '@/lib/site-config';

export const metadata = {
  title: 'Terms of Use',
  description: `Terms of use for ${site.name}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" subtitle="The terms under which this site is published." />
      <section className="container py-16 lg:py-24 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Terms' }]} />
        <div className="prose-editorial mt-10 space-y-6 text-foreground/80 leading-relaxed">
          <p>
            {site.name} is a lifestyle guide to La Quinta&rsquo;s private golf communities. Listings, private showings, and buyer representation are provided by our California-licensed Exclusive Market Partner. Nothing on this site constitutes legal, tax, or real-estate advice.
          </p>
          <p>
            All market figures referenced on this site are presented as ranges. {MARKET_DISCLAIMER}
          </p>
          <p className="italic text-foreground/65 text-sm">
            Full legal language ships before public launch.
          </p>
        </div>
      </section>
    </>
  );
}

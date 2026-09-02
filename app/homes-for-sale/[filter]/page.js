import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import ThinPageIntro from '@/components/shared/thin-page-intro';
import ThinPageFaq from '@/components/shared/thin-page-faq';
import { JsonLd, faqSchema, breadcrumbSchema } from '@/lib/json-ld';
import { HOMES_FOR_SALE_COPY, HOMES_FOR_SALE_SLUGS } from '@/lib/content/thin-page-copy';

export function generateStaticParams() {
  return HOMES_FOR_SALE_SLUGS.map((filter) => ({ filter }));
}

export function generateMetadata({ params }) {
  const copy = HOMES_FOR_SALE_COPY[params.filter];
  if (!copy) return {};
  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: { canonical: `/homes-for-sale/${params.filter}` },
  };
}

export default function HomesForSaleFilterPage({ params }) {
  const copy = HOMES_FOR_SALE_COPY[params.filter];
  if (!copy) notFound();

  const crumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Homes for Sale', url: '/homes-for-sale' },
    { name: copy.heroTitle, url: `/homes-for-sale/${params.filter}` },
  ]);
  const faq = faqSchema(copy.faqs);

  return (
    <>
      <JsonLd data={crumb} />
      <JsonLd data={faq} />

      <PageHero
        eyebrow="Homes for Sale"
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
      />

      <section className="container pt-10">
        <Breadcrumbs
          items={[
            { label: 'Homes for Sale', href: '/homes-for-sale' },
            { label: copy.heroTitle },
          ]}
        />
      </section>

      <ThinPageIntro>{copy.intro}</ThinPageIntro>

      <ThinPageFaq faqs={copy.faqs} />

      <section className="container pb-16 lg:pb-24">
        <div className="max-w-3xl">
          <Disclaimer>
            Live listings for this filter will appear here once the California
            IDX feed is connected. Current La Quinta listings, private showings,
            and buyer representation are provided by Kathy Schowe, our Exclusive
            Market Partner. Estimate only &mdash; verify with a licensed
            California real-estate professional before transacting.
          </Disclaimer>
          <div className="mt-8">
            <Link
              href="/homes-for-sale"
              className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm"
            >
              &larr; All filters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

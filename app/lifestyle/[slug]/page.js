import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';
import { getLifestylePage, getLifestyleSlugs } from '@/lib/content/lifestyle-content';
import { site, owner } from '@/lib/site-config';

export function generateStaticParams() {
  return getLifestyleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = getLifestylePage(params.slug);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle || page.title },
    description: page.metaDescription,
    alternates: { canonical: `/lifestyle/${params.slug}` },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      images: page.heroImage ? [page.heroImage] : [],
      type: 'article',
    },
  };
}

// Minimal Article schema for these editorial neighborhood/lifestyle pieces.
// Uses today's date as datePublished/dateModified; the source-of-truth is
// this file's Git history, but Search Console reads schema, not Git.
function lifestyleArticleSchema(slug, page) {
  const iso = new Date().toISOString().slice(0, 10);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.metaTitle || page.title,
    description: page.metaDescription,
    datePublished: iso,
    dateModified: iso,
    image: page.heroImage ? [`${site.url}${page.heroImage}`] : undefined,
    author: { '@type': 'Organization', name: owner.name || site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/lifestyle/${slug}`,
    },
  };
}

export default function LifestylePage({ params }) {
  const page = getLifestylePage(params.slug);
  if (!page) notFound();

  const crumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Lifestyle', url: '/lifestyle' },
    { name: page.title, url: `/lifestyle/${params.slug}` },
  ]);
  const article = lifestyleArticleSchema(params.slug, page);
  const faq = faqSchema(page.faqs);

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={crumb} />
      <JsonLd data={faq} />

      <PageHero
        variant="image"
        image={page.heroImage}
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.tagline}
      />

      <section className="container pt-10 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Lifestyle', href: '/lifestyle' },
            { label: page.title },
          ]}
        />
      </section>

      <section className="container py-10 lg:py-14 max-w-3xl">
        <p className="text-foreground/85 leading-relaxed text-lg">{page.intro}</p>

        {page.sections?.map((s, i) => (
          <div key={i} className="mt-10">
            <h2 className="font-serif text-3xl text-palm mb-3">{s.heading}</h2>
            <p className="text-foreground/80 leading-relaxed">{s.body}</p>
          </div>
        ))}

        {Array.isArray(page.faqs) && page.faqs.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-serif text-3xl text-palm mb-6">Frequently asked</h2>
            <dl className="space-y-6">
              {page.faqs.map((q, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <dt className="font-serif text-xl text-palm">{q.q}</dt>
                  <dd className="text-foreground/75 leading-relaxed mt-2">{q.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {Array.isArray(page.related) && page.related.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Related</div>
            <ul className="space-y-3">
              {page.related.map((r, i) => (
                <li key={i}>
                  <Link
                    href={r.href}
                    className="text-palm underline decoration-terracotta underline-offset-4 hover:text-terracotta"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

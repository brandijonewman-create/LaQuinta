import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import LeadGate from '@/components/lead-gate';
import { getGuide, getGuideSlugs } from '@/lib/blog';
import { mdxComponents } from '@/components/mdx-components';
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.excerpt,
    alternates: { canonical: `/guides/${params.slug}` },
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.excerpt,
      images: guide.frontmatter.cover ? [guide.frontmatter.cover] : [],
      type: 'article',
      publishedTime: guide.frontmatter.date,
    },
  };
}

export default function GuidePage({ params }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  const fm = guide.frontmatter;

  const articleData = articleSchema(guide, 'guides');
  const faqData = faqSchema(fm.faq);
  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: fm.title, url: `/guides/${guide.slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleData} />
      <JsonLd data={faqData} />
      <JsonLd data={crumbData} />

      <PageHero variant="image" image={fm.cover} eyebrow={fm.category} title={fm.title} subtitle={fm.excerpt} />
      <section className="container py-16 lg:py-24 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }, { label: fm.title }]} />

        {/* Lead gate wraps the entire body when frontmatter `gated: true`. The
            gate requires name/email/phone before content is shown. Per-asset:
            unlock state lives in component memory only, not in a cookie. */}
        <LeadGate
          assetSlug={`guide:${guide.slug}`}
          assetTitle={fm.title}
          downloadUrl={fm.downloadUrl}
        >
        {Array.isArray(fm.tldr) && fm.tldr.length > 0 && (
          <div className="mt-10 bg-sand-50 border border-border p-6">
            <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />TL;DR</div>
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed list-disc pl-5">
              {fm.tldr.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}

        <article className="prose-editorial mt-10">
          <MDXRemote source={guide.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>

        {Array.isArray(fm.faq) && fm.faq.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-serif text-3xl text-palm mb-6">Frequently asked</h2>
            <dl className="space-y-6">
              {fm.faq.map((q, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <dt className="font-serif text-xl text-palm">{q.q}</dt>
                  <dd className="text-foreground/75 leading-relaxed mt-2">{q.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        </LeadGate>

        <div className="mt-14">
          <Link href="/guides" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">← All guides</Link>
        </div>
      </section>
    </>
  );
}

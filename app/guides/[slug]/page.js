import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import LeadGate from '@/components/lead-gate';
import ThinPageIntro from '@/components/shared/thin-page-intro';
import ThinPageFaq from '@/components/shared/thin-page-faq';
import { getGuide, getGuideSlugs } from '@/lib/blog';
import { mdxComponents } from '@/components/mdx-components';
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';
import { GUIDE_PREVIEW_COPY } from '@/lib/content/thin-page-copy';

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const preview = GUIDE_PREVIEW_COPY[params.slug];
  return {
    title: preview?.title || guide.frontmatter.title,
    description: preview?.metaDescription || guide.frontmatter.excerpt,
    alternates: { canonical: `/guides/${params.slug}` },
    openGraph: {
      title: preview?.title || guide.frontmatter.title,
      description: preview?.metaDescription || guide.frontmatter.excerpt,
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
  const preview = GUIDE_PREVIEW_COPY[params.slug];

  const articleData = articleSchema(guide, 'guides');
  // Prefer the public preview FAQ for schema (higher-quality, buyer-facing
  // Q&A). Fall back to any frontmatter FAQ for older guides that predate the
  // preview copy.
  const faqData = faqSchema(preview?.faqs || fm.faq);
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

      <section className="container pt-10 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }, { label: fm.title }]} />
      </section>

      {/* Public preview intro — renders ABOVE the lead-gate form so the page
          has visible content for search engines and buyers browsing without
          submitting the form. */}
      {preview?.intro ? (
        <ThinPageIntro>{preview.intro}</ThinPageIntro>
      ) : null}

      <section className="container max-w-3xl">
        {/* Lead gate wraps the guide's full MDX body. The gate requires
            name/email/phone before the full content is shown. Per-asset
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
        </LeadGate>
      </section>

      {/* Public preview FAQ — renders BELOW the lead-gate form. Also the
          source of the FAQPage JSON-LD emitted at the top of the page. */}
      {preview?.faqs && preview.faqs.length > 0 ? (
        <ThinPageFaq faqs={preview.faqs} />
      ) : null}

      <section className="container pb-16 max-w-3xl">
        <Link href="/guides" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">
          &larr; All guides
        </Link>
      </section>
    </>
  );
}

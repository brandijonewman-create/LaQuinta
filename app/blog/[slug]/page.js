import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { getPost, getPostSlugs } from '@/lib/blog';
import { mdxComponents } from '@/components/mdx-components';
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : [],
      type: 'article',
      publishedTime: post.frontmatter.date,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  const articleData = articleSchema(post, 'blog');
  const faqData = faqSchema(fm.faq);
  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: fm.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleData} />
      <JsonLd data={faqData} />
      <JsonLd data={crumbData} />

      <PageHero variant="image" image={fm.cover} eyebrow={fm.category} title={fm.title} subtitle={fm.excerpt} />
      <section className="container py-16 lg:py-24 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: fm.title }]} />

        {Array.isArray(fm.tldr) && fm.tldr.length > 0 && (
          <div className="mt-10 bg-sand-50 border border-border p-6">
            <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />TL;DR</div>
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed list-disc pl-5">
              {fm.tldr.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}

        <article className="prose-editorial mt-10">
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
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

        <div className="mt-14">
          <Link href="/blog" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">← All posts</Link>
        </div>
      </section>
    </>
  );
}

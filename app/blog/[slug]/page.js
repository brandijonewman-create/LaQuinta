import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CollaboratorHeadshot from '@/components/collaborators/collaborator-headshot';
import { getPost, getPostSlugs } from '@/lib/blog';
import { getCollaborator } from '@/lib/collaborators';
import { mdxComponents } from '@/components/mdx-components';
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';
import { owner } from '@/lib/site-config';

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

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  // Author resolution: frontmatter `author: <slug>` (e.g. "stepheny-finnie")
  // resolves to a Person collaborator. If absent, falls back to the site owner.
  const author = fm.author ? getCollaborator(fm.author) : null;
  const profileHref = author
    ? `/collaborators/${author.page || author.slug}#${author.anchor || author.slug}`
    : null;

  const articleData = articleSchema(post, 'blog', author);
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

        {/* Byline. Renders as a link to the collaborator's profile when the
            article has a Person author; otherwise shows site owner & date. */}
        <div className="mt-8 flex items-center gap-3 text-sm text-foreground/70">
          {author ? (
            <Link href={profileHref} className="flex items-center gap-3 group" rel="author">
              <span className="w-9 h-9 rounded-full overflow-hidden bg-sand-100 border border-border flex-shrink-0">
                <CollaboratorHeadshot person={author} className="w-full h-full object-cover" />
              </span>
              <span>
                <span className="block text-foreground/55 text-[11px] uppercase tracking-[0.2em]">By</span>
                <span className="block text-palm font-medium group-hover:text-terracotta transition-colors">
                  {author.name}
                </span>
              </span>
            </Link>
          ) : (
            <span>
              <span className="block text-foreground/55 text-[11px] uppercase tracking-[0.2em]">By</span>
              <span className="block text-palm font-medium">{owner.name}</span>
            </span>
          )}
          <span className="text-foreground/30">·</span>
          <span className="text-foreground/65">{formatDate(fm.date)}</span>
          {fm.readMin ? (
            <>
              <span className="text-foreground/30">·</span>
              <span className="text-foreground/65">{fm.readMin} min read</span>
            </>
          ) : null}
        </div>

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

        {/* About the Author block. Only renders when a Person collaborator is
            attributed. Cross-links back to the canonical profile via rel=author
            for additional Google authorship signal. */}
        {author ? (
          <aside className="mt-16 border-t border-border pt-10" aria-labelledby="about-the-author">
            <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mb-4" id="about-the-author">
              About the Author
            </div>
            <div className="grid grid-cols-[88px_1fr] md:grid-cols-[120px_1fr] gap-5 md:gap-7 bg-sand-50 border border-border p-6 md:p-8">
              <Link href={profileHref} rel="author" className="block">
                <div className="aspect-square rounded-xl overflow-hidden bg-sand-100 border border-border">
                  <CollaboratorHeadshot person={author} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div>
                <Link href={profileHref} rel="author" className="font-serif text-2xl text-palm leading-tight hover:text-terracotta transition-colors">
                  {author.name}
                </Link>
                <div className="text-sm text-foreground/70 mt-1">
                  {author.jobTitle}
                  {author.affiliation ? <> &middot; <span className="text-palm">{author.affiliation}</span></> : null}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mt-3">{author.bio}</p>
                <Link
                  href={profileHref}
                  rel="author"
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-terracotta hover:text-palm transition-colors"
                >
                  Read full profile &rarr;
                </Link>
              </div>
            </div>
          </aside>
        ) : null}

        <div className="mt-14">
          <Link href="/blog" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">&larr; All posts</Link>
        </div>
      </section>
    </>
  );
}

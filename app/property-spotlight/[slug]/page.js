import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import SampleBanner from '@/components/property-spotlight/sample-banner';
import { mdxComponents } from '@/components/mdx-components';
import { JsonLd, breadcrumbSchema } from '@/lib/json-ld';
import { site } from '@/lib/site-config';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'property-spotlights');

function readSpotlight(slug) {
  const full = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, content };
}

function listSlugs() {
  try {
    return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = readSpotlight(params.slug);
  if (!post) return {};
  const isSample = params.slug === 'sample';
  return {
    title: isSample
      ? `Sample Property Spotlight — ${post.frontmatter.title}`
      : post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: { canonical: `/property-spotlight/${params.slug}` },
    // Sample pages are intentionally kept out of search indexes — they exist
    // for sales conversations, not for SEO traffic.
    robots: isSample ? { index: false, follow: true } : undefined,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : [],
      type: 'article',
    },
  };
}

export default function PropertySpotlightPage({ params }) {
  const post = readSpotlight(params.slug);
  if (!post) notFound();
  const fm = post.frontmatter;
  const isSample = params.slug === 'sample';

  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Property Spotlight', url: `/property-spotlight/${params.slug}` },
    { name: fm.title, url: `/property-spotlight/${params.slug}` },
  ]);

  return (
    <>
      <JsonLd data={crumbData} />

      {isSample ? <SampleBanner variant="top" /> : null}

      <PageHero
        variant="image"
        image={fm.cover}
        eyebrow={fm.category}
        title={fm.title}
        subtitle={fm.excerpt}
      />

      <section className="container py-16 lg:py-24 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Property Spotlight', href: `/property-spotlight/${params.slug}` },
            { label: fm.title },
          ]}
        />

        {/* Placeholder byline. On a real partner article this becomes a Person-
            attributed link to /collaborators/<their-firm>#<their-slug>. */}
        <div className="mt-8 flex items-center gap-3 text-sm">
          <span className="w-9 h-9 rounded-full bg-sand-100 border border-dashed border-palm/40 flex items-center justify-center text-[10px] uppercase tracking-[0.16em] text-palm/60">
            You
          </span>
          <span>
            <span className="block text-foreground/55 text-[11px] uppercase tracking-[0.2em]">Listed By</span>
            <span className="block text-palm font-medium">Your Name &middot; Your Brokerage</span>
          </span>
          <span className="text-foreground/30">&middot;</span>
          <span className="text-foreground/65">Sample article</span>
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
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
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

        {isSample ? <SampleBanner variant="bottom" /> : null}

        <div className="mt-12">
          <Link href="/" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  );
}

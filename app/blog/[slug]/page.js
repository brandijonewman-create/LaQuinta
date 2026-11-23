import Image from 'next/image';
import MarketDisclaimer from '@/components/market-disclaimer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PageShell from '@/components/page-shell';
import RelatedContent from '@/components/related-content';
import QuizCTABand from '@/components/QuizCTABand';
import { mdxComponents, FAQBlock, TLDR } from '@/components/mdx-components';
import { SITE, COMMUNITIES } from '@/lib/data';
import { BLOG_POSTS, findPost } from '@/lib/blog';
import { getAuthor, authorJsonLd } from '@/lib/authors';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = findPost(params.slug);
  if (!p) return { title: 'Post not found' };
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${SITE.url}/blog/${p.slug}` },
    openGraph: { url: `${SITE.url}/blog/${p.slug}`, type: 'article', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: p.title }], publishedTime: p.date }
  };
}

export default function Page({ params }) {
  const p = findPost(params.slug);
  if (!p) notFound();
  const related = (p.related || []).map(findPost).filter(Boolean);

  // Detect community slugs mentioned in the post (title/excerpt/content) for
  // programmatic internal linking via RelatedContent below.
  const contentBlob = ((p.title || '') + ' ' + (p.excerpt || '') + ' ' + (p.description || '') + ' ' + (p.content || '')).toLowerCase();
  const mentionedCommunitySlugs = COMMUNITIES
    .filter(c => contentBlob.includes(c.name.toLowerCase()) || contentBlob.includes(c.slug))
    .map(c => c.slug)
    .slice(0, 5);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    image: p.cover && p.cover.startsWith('/') ? `${SITE.url}${p.cover}` : p.cover,
    datePublished: p.date,
    dateModified: p.date,
    author: authorJsonLd(p.author),
    publisher: { '@type': 'Organization', name: 'Scottsdale Golf Lifestyle', logo: { '@type': 'ImageObject', url: `${SITE.url}/og.jpg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${p.slug}` }
  };

  // FAQPage JSON-LD schema \u2014 only emitted if the post has FAQs in frontmatter.
  const faqSchema = (p.faqs && p.faqs.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map(qa => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a }
    }))
  } : null;

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: p.title, path: `/blog/${p.slug}` }
      ])} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <article>
        <div className="relative">
          <div className="absolute inset-0"><Image src={p.cover} alt={p.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#062840]/65 to-[#062840]/95" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-amber-200 hover:text-amber-100 mb-6"><ArrowLeft className="h-4 w-4" /> All articles</Link>
            <h1 className="font-serif text-4xl md:text-6xl text-amber-50 tracking-tight leading-tight">{p.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-emerald-50/70">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(p.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {(() => {
                  const a = getAuthor(p.author);
                  return a.profilePath ? (
                    <Link href={a.profilePath} className="hover:text-amber-200 underline-offset-4 hover:underline">{a.name}</Link>
                  ) : a.name;
                })()}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-14 text-[#062840]/85 text-lg leading-relaxed">
          {/* TL;DR (frontmatter-driven) renders before the prose body for the long-form articles that include one. */}
          {p.tldr && p.tldr.length > 0 && <TLDR items={p.tldr} />}
          {/* MDX content. Bodies authored in /content/blog/[slug].mdx — frontmatter + markdown + custom <CTA> components. TL;DR and FAQ live in YAML frontmatter for reliable structured rendering + JSON-LD. */}
          <MDXRemote source={p.content || ''} components={mdxComponents} />
          {p.faqs && p.faqs.length > 0 && <FAQBlock items={p.faqs} />}
          <MarketDisclaimer className="not-prose" />

          {/* About-the-author block — appears only for posts written by a registered collaborator. */}
          {(() => {
            const a = getAuthor(p.author);
            if (a.isOrg) return null;
            return (
              <aside className="mt-12 rounded-2xl border border-[#062840]/10 bg-white p-6 md:p-7 flex flex-col md:flex-row gap-5 not-prose">
                <div className="flex-shrink-0 relative w-24 h-24"><Image src={a.image} alt={a.name} className="rounded-full object-cover ring-2 ring-amber-300/40" fill sizes="96px" />
                </div>
                <div className="flex-1 text-base">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#BA9273]">About the author</div>
                  <div className="mt-1 font-serif text-xl text-[#062840]">{a.name}</div>
                  <div className="text-sm text-[#062840]/70">{a.title}{a.affiliation ? ` · ${a.affiliation}` : ''}</div>
                  <p className="mt-3 text-[15px] text-[#062840]/80 leading-relaxed">{a.bio}</p>
                  {a.profilePath && (
                    <Link href={a.profilePath} className="mt-3 inline-flex text-sm text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline">
                      View full profile →
                    </Link>
                  )}
                </div>
              </aside>
            );
          })()}
        </div>

        {related.length > 0 && (
          <section className="bg-emerald-50/40 border-t border-emerald-900/10">
            <div className="max-w-7xl mx-auto px-6 py-14">
              <h2 className="font-serif text-3xl text-[#062840] mb-6">Keep reading</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex gap-5 bg-white rounded-xl overflow-hidden border border-emerald-900/10 hover:shadow-xl transition">
                    <div className="w-1/3 aspect-square overflow-hidden flex-shrink-0 relative"><Image src={r.cover} alt={r.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
                    <div className="p-4 flex-1">
                      <div className="text-xs uppercase text-amber-700 tracking-wider">{new Date(r.date).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</div>
                      <div className="font-serif text-lg text-[#062840] leading-snug mt-1">{r.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      {/* Programmatic internal links \u2014 surfaces communities mentioned in the post,
          relevant comparisons, and the latest market report. */}
      <RelatedContent
        pageType="blog"
        tags={mentionedCommunitySlugs}
        excludePath={`/blog/${p.slug}`}
      />

      {/* Quiz funnel CTA \u2014 every blog post terminates in a path back to the\n          interactive matcher, capturing readers who arrived from organic search. */}
      <QuizCTABand variant="subtle" />
    </PageShell>
  );
}

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

// Server component. Reads the three most-recent published posts from
// /content/blog and renders them as teaser cards on the homepage.
// If there are ever zero published posts, the entire section is hidden
// (rather than shipping a "coming soon" placeholder that Google will read
// as thin/duplicate content).
export default function LatestJournal() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="container py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">
            <span className="editorial-rule" />
            From the Blog
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
            Long-form reading.
          </h2>
          <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
            Community deep-dives, architect profiles, and honest market commentary.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-palm transition-colors self-start lg:self-end"
        >
          All articles <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {posts.map((p) => (
          <article key={p.slug} className="group border-t border-border pt-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-terracotta">
              <span>{p.frontmatter.category || 'Journal'}</span>
              {p.frontmatter.readMin ? (
                <span className="text-foreground/40">{p.frontmatter.readMin} min read</span>
              ) : null}
            </div>
            <h3 className="font-serif text-xl md:text-2xl leading-[1.25] text-palm mt-4 group-hover:text-terracotta transition-colors">
              <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
            </h3>
            {p.frontmatter.excerpt ? (
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed line-clamp-3">
                {p.frontmatter.excerpt}
              </p>
            ) : null}
            <Link
              href={`/blog/${p.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-foreground/70 group-hover:text-palm transition-colors"
            >
              Read <ArrowUpRight size={13} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Blog',
  description: 'Long-form coverage of La Quinta golf real estate, private clubs, architects, and the California desert lifestyle.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="From the Blog"
        title="Long-form coverage of La Quinta golf and lifestyle."
        subtitle="Community deep-dives, architect profiles, and honest market commentary."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        {posts.length === 0 ? (
          <div className="mt-10 border border-dashed border-border bg-sand-50 p-12 text-center">
            <div className="text-xs uppercase tracking-[0.28em] text-terracotta mb-3">Coming soon</div>
            <p className="text-foreground/75">Launch posts are in development.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-10">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                  <img src={p.frontmatter.cover} alt={p.frontmatter.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-terracotta">
                  <span>{p.frontmatter.category}</span>
                  <span className="text-foreground/40">{p.frontmatter.readMin} min read</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-palm mt-3 leading-[1.25] group-hover:text-terracotta transition-colors">
                  {p.frontmatter.title}
                </h3>
                <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{p.frontmatter.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-foreground/70 group-hover:text-palm">
                  Read <ArrowUpRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

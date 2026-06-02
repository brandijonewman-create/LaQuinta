import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Placeholder cards for Phase 1. The real MDX-driven blog index ships in Phase 2.
const placeholders = [
  {
    title: 'Inside The Madison Club: Why La Quinta&rsquo;s most private address stays private',
    category: 'Community Deep-Dive',
    readMin: 14,
    href: '/blog',
  },
  {
    title: 'PGA West, demystified: Six courses, four architects, and how to read the membership',
    category: 'Buyer&rsquo;s Guide',
    readMin: 12,
    href: '/blog',
  },
  {
    title: 'Pete Dye&rsquo;s Stadium course and the case for difficulty in the desert',
    category: 'Architect Profile',
    readMin: 9,
    href: '/blog',
  },
];

export default function LatestJournal() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">
            <span className="editorial-rule" />
            From the Blog
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
            Coming to the blog.
          </h2>
          <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
            Community deep-dives, architect profiles, and honest market commentary.
            Launch posts arrive soon.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {placeholders.map((p, i) => (
          <article key={i} className="group border-t border-border pt-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-terracotta">
              <span dangerouslySetInnerHTML={{ __html: p.category }} />
              <span className="text-foreground/40">{p.readMin} min read</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl leading-[1.25] text-palm mt-4 group-hover:text-terracotta transition-colors">
              <Link href={p.href} dangerouslySetInnerHTML={{ __html: p.title }} />
            </h3>
            <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-foreground/70 group-hover:text-palm transition-colors">
              Coming soon <ArrowUpRight size={13} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

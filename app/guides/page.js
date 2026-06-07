import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { getAllGuides } from '@/lib/blog';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Guides',
  description: 'Pillar guides to buying into a La Quinta private golf community — architects, membership economics, California-specific context.',
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Long-form pillar guides to La Quinta golf real estate."
        subtitle="Pillar pieces — from the 2026 Buyer&rsquo;s Guide to architect-by-architect breakdowns."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Guides' }]} />
        {guides.length === 0 ? (
          <div className="mt-10 border border-dashed border-border bg-sand-50 p-12 text-center">
            <div className="text-xs uppercase tracking-[0.28em] text-terracotta mb-3">Coming soon</div>
            <p className="text-foreground/75">Pillar guides in development.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group block border border-palm/10 bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden bg-palm">
                  {g.frontmatter.cover ? (
                    <>
                      <img src={g.frontmatter.cover} alt={g.frontmatter.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-palm to-palm-700">
                      <div className="w-12 h-px bg-gold mx-auto mb-4" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{g.frontmatter.category} {g.frontmatter.gated ? '· Free Access' : ''}</div>
                    <h3 className="font-serif text-xl lg:text-2xl leading-[1.15]">{g.frontmatter.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-foreground/70 leading-relaxed">{g.frontmatter.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta group-hover:text-palm transition-colors">
                    Read guide <ArrowUpRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

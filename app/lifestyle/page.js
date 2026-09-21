import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { LIFESTYLE_PAGES } from '@/lib/content/lifestyle-content';

export const metadata = {
  title: 'La Quinta Lifestyle Guides',
  description: 'Editorial guides to the La Quinta neighborhoods, parks, trails and districts that anchor daily life in the city \u2014 Fritz Burns Park, Bear Creek Trail, Old Town La Quinta and more.',
  alternates: { canonical: '/lifestyle' },
};

export default function LifestyleIndexPage() {
  const entries = Object.entries(LIFESTYLE_PAGES);
  return (
    <>
      <PageHero
        eyebrow="Lifestyle"
        title="Daily life in La Quinta."
        subtitle="Editorial guides to the neighborhoods, parks, trails and districts that make up the daily life around La Quinta&rsquo;s clubs and gated communities."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Lifestyle' }]} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {entries.map(([slug, p]) => (
            <Link
              key={slug}
              href={`/lifestyle/${slug}`}
              className="group block border border-border bg-white hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[5/4] overflow-hidden bg-sand-100">
                <img
                  src={p.heroImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta">{p.eyebrow}</div>
                <h2 className="font-serif text-2xl text-palm mt-2 leading-tight">{p.title}</h2>
                <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

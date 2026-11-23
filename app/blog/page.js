import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { BLOG_POSTS as ALL_POSTS } from '@/lib/blog';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Real Estate & Golf Blog',
  description: 'Insights, guides and analysis from Scottsdale\u2019s leading golf-real-estate team. Community comparisons, market data, snowbird tips and more.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: { url: `${SITE.url}/blog`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  const [hero, ...rest] = ALL_POSTS;
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' }
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">The Journal</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale Real Estate &amp; Golf Insights</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">In-depth guides, market commentary, and the kind of insider knowledge our buyers ask us about most.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <Link href={`/blog/${hero.slug}`} className="grid md:grid-cols-2 gap-8 group bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
          <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative"><Image src={hero.cover} alt={hero.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-2 flex items-center gap-2"><Calendar className="h-3 w-3" /> {new Date(hero.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
            <h2 className="font-serif text-4xl text-[#062840] leading-tight">{hero.title}</h2>
            <p className="text-emerald-900/80 mt-3">{hero.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm text-emerald-800 group-hover:text-amber-600">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
          </div>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl bg-white border border-emerald-900/10 hover:shadow-xl transition">
              <div className="aspect-[5/3] overflow-hidden relative"><Image src={p.cover} alt={p.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">{new Date(p.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                <h3 className="font-serif text-xl text-[#062840] leading-snug">{p.title}</h3>
                <p className="text-sm text-emerald-900/70 mt-2 line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

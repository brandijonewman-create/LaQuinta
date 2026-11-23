import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, COMPARISON_PAIRS, findCommunity } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, Scale } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf Community Comparisons',
  description: 'Honest side-by-side comparisons of Scottsdale’s top luxury golf communities. Grayhawk vs Troon North. DC Ranch vs Silverleaf. Desert Mountain vs Estancia. Pricing, club access, lifestyle.',
  alternates: { canonical: `${SITE.url}/compare` },
  openGraph: { url: `${SITE.url}/compare`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Comparisons', path: '/compare' }
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Comparisons</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Community vs. community.</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/85 text-lg leading-relaxed">The most common Scottsdale buyer question we hear is &ldquo;What&rsquo;s the difference between <em>X</em> and <em>Y</em>?&rdquo; Here are honest side-by-side comparisons of the communities our buyers actually weigh against each other.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-5">
          {COMPARISON_PAIRS.map(p => {
            const a = findCommunity(p.a);
            const b = findCommunity(p.b);
            if (!a || !b) return null;
            return (
              <Link key={p.slug} href={`/compare/${p.slug}`} className="group block bg-white border border-emerald-900/10 hover:border-amber-300 hover:shadow-lg rounded-2xl p-7 transition">
                <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-amber-700">
                  <Scale className="h-3.5 w-3.5" /> Versus
                </div>
                <h2 className="font-serif text-2xl text-[#062840] leading-tight mb-3">
                  {a.name} <span className="text-emerald-900/40">vs.</span> {b.name}
                </h2>
                <p className="text-sm text-emerald-900/75 leading-relaxed mb-4">{p.intent}</p>
                <div className="inline-flex items-center gap-1.5 text-sm text-emerald-800 group-hover:text-amber-700 font-medium transition">
                  Read the comparison <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

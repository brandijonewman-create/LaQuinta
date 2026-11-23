import Link from 'next/link';
import PageShell from '@/components/page-shell';
import QuizCTABand from '@/components/QuizCTABand';
import { SITE } from '@/lib/data';
import { LANDING_TOPICS } from '@/lib/landing-topics';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Compass, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Communities by Lifestyle | 2026 Guide',
  description: 'Browse Scottsdale golf communities by lifestyle anchor: Mayo Clinic proximity, Old Town walkability, snowbird-friendly, equity-club, gated-and-guarded, and more.',
  alternates: { canonical: `${SITE.url}/scottsdale-communities` }
};

export default function Page() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: SITE.url },
    { name: 'Scottsdale Communities', url: `${SITE.url}/scottsdale-communities` }
  ]);

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-300 mb-3">
            <Compass className="h-3.5 w-3.5" /> Communities by lifestyle
          </div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">Scottsdale communities, narrowed by the anchor that actually matters to you</h1>
          <p className="mt-5 text-emerald-50/85 text-base md:text-lg max-w-3xl leading-relaxed">
            The right Scottsdale community is almost never the most famous one: it&rsquo;s the one whose intersection of geography, club model, school assignment, and lifestyle anchor matches the way you actually want to live. These curated guides cut the 47-community search down by the dimension that matters most to you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {LANDING_TOPICS.map(t => (
            <Link key={t.slug} href={`/laquinta-communities/${t.slug}`} className="group bg-white border border-[#062840]/10 rounded-2xl p-7 hover:shadow-xl hover:border-amber-300 transition">
              <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">{t.eyebrow}</div>
              <h2 className="font-serif text-2xl text-[#062840] group-hover:text-amber-700 transition leading-tight">{t.h1}</h2>
              <p className="mt-3 text-sm text-[#062840]/70 line-clamp-3 leading-relaxed">{t.metaDescription}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#062840]/55">{t.communitySlugs?.length || 0} communities</span>
                <span className="inline-flex items-center gap-1 text-sm text-amber-700 group-hover:gap-2 transition-all">Read the guide <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <QuizCTABand variant="subtle" />
    </PageShell>
  );
}

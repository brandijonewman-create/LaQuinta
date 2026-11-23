import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import FAQ from '@/components/faq';
import { SITE, COMPARISONS, findComparison, COMPARISON_FAQS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return COMPARISONS.map(c => ({ from: c.slug }));
}

export async function generateMetadata({ params }) {
  const c = findComparison(params.from);
  if (!c) return { title: 'Not found' };
  return { robots: { index: false, follow: true }, title: c.title, description: c.description, alternates: { canonical: `${SITE.url}/relocating-to-scottsdale/${c.slug}` },
  openGraph: { url: `${SITE.url}/relocating-to-scottsdale/${c.slug}`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] } };
}

export default function Page({ params }) {
  const c = findComparison(params.from);
  if (!c) notFound();
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Relocating to Scottsdale', path: '/relocating-to-scottsdale' },
        { name: `From ${c.from}`, path: `/relocating-to-scottsdale/${c.slug}` }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Relocation Comparison &middot; From {c.from}</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">{c.headline}</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/75 text-lg">{c.summary}</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        {c.sections.map(s => (
          <div key={s.heading}>
            <h2 className="font-serif text-3xl text-[#062840] mb-3">{s.heading}</h2>
            <p className="text-emerald-900/85 text-lg leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-2xl text-[#062840] mb-4">More relocation comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {COMPARISONS.filter(o => o.slug !== c.slug).map(o => (
            <Link key={o.slug} href={`/relocating-to-scottsdale/${o.slug}`} className="text-sm rounded-full border border-emerald-900/15 bg-white hover:bg-emerald-50 px-4 py-2 text-emerald-900 transition">From {o.from} <ArrowRight className="inline h-3 w-3" /></Link>
          ))}
        </div>
      </section>
      {COMPARISON_FAQS[c.slug] && <FAQ items={COMPARISON_FAQS[c.slug]} heading={`Moving from ${c.from}: FAQs`} />}
    </PageShell>
  );
}

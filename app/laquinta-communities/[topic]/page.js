import MarketDisclaimer from '@/components/market-disclaimer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/page-shell';
import QuizCTABand from '@/components/QuizCTABand';
import RelatedContent from '@/components/related-content';
import { SITE, findCommunity } from '@/lib/data';
import { findTopic, LANDING_TOPICS } from '@/lib/landing-topics';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, MapPin, Compass, Sparkles, Building2 } from 'lucide-react';

export function generateStaticParams() {
  return LANDING_TOPICS.map(t => ({ topic: t.slug }));
}

export function generateMetadata({ params }) {
  const t = findTopic(params.topic);
  if (!t) return { title: 'Not found' };
  const url = `${SITE.url}/scottsdale-communities/${t.slug}`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      type: 'article',
      images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }]
    }
  };
}

export default function Page({ params }) {
  const t = findTopic(params.topic);
  if (!t) notFound();

  const communities = (t.communitySlugs || []).map(findCommunity).filter(Boolean);
  const relatedTopics = (t.relatedTopics || []).map(slug => LANDING_TOPICS.find(x => x.slug === slug)).filter(Boolean);
  const pageUrl = `${SITE.url}/scottsdale-communities/${t.slug}`;

  // ---- Schemas ----
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: SITE.url },
    { name: 'Scottsdale Communities', url: `${SITE.url}/scottsdale-communities` },
    { name: t.h1, url: pageUrl }
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.h1,
    description: t.metaDescription,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: communities.length,
      itemListElement: communities.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.url}/communities/${c.slug}`,
        name: c.name
      }))
    }
  };

  const faqSchema = t.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null;

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collectionSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-300 mb-3">
            <Compass className="h-3.5 w-3.5" /> {t.eyebrow}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">{t.h1}</h1>
          <p className="mt-5 text-emerald-50/85 text-base md:text-lg max-w-3xl leading-relaxed">{t.heroIntro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/community-quiz" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-5 py-2.5 text-sm font-semibold transition">
              Take the community quiz <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/laquinta-communities" className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 text-amber-100 hover:bg-amber-300 hover:text-[#062840] px-5 py-2.5 text-sm font-semibold transition">
              Other lifestyle topics
            </Link>
          </div>
        </div>
      </section>

      {/* Matched communities */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">{communities.length} {communities.length === 1 ? 'community matches' : 'communities match'}</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-2">Curated matches</h2>
        <p className="text-[#062840]/70 mb-8 max-w-3xl">Each community below was hand-selected against the criteria above. Click through for the full deep-dive page, the on-site lead-magnet, and cross-links to comparable communities.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.map(c => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="group bg-white border border-[#062840]/10 rounded-xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition"
            >
              {c.image && (
                <div className="aspect-[16/9] overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#BA9273] mb-1">{c.location || 'Scottsdale, Arizona'}</div>
                <h3 className="font-serif text-xl text-[#062840] group-hover:text-amber-700 transition">{c.name}</h3>
                {c.tagline && <p className="text-sm text-[#062840]/65 mt-1 line-clamp-2">{c.tagline}</p>}
                {c.priceRange && <div className="text-xs text-[#062840]/55 mt-3">Published range: {c.priceRange}</div>}
              </div>
            </Link>
          ))}
        </div>
        <MarketDisclaimer />
      </section>

      {/* Editorial sections */}
      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {t.editorialSections?.map((sec, i) => (
            <div key={i} className={i > 0 ? 'mt-10' : ''}>
              <h2 className="font-serif text-3xl text-[#062840] mb-4">{sec.heading}</h2>
              <div className="space-y-4">
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="text-[#062840]/80 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {t.faqs?.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl text-[#062840] mb-6">Common questions</h2>
          <div className="space-y-5">
            {t.faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-[#062840]/10 rounded-xl p-5 open:shadow-md transition">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="font-serif text-lg text-[#062840]">{f.q}</span>
                  <span className="text-amber-700 group-open:rotate-45 transition transform text-2xl leading-none flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-[#062840]/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Quiz funnel */}
      <QuizCTABand variant="navy" title="Not sure if these are the right communities for you?" subtitle="Take the 2-minute community quiz: we'll surface your top match plus two runners-up across all 47 Scottsdale-area golf communities." />

      {/* Related topics */}
      {relatedTopics.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">Related lifestyle topics</div>
          <h2 className="font-serif text-3xl text-[#062840] mb-6">Other ways buyers narrow the Scottsdale shortlist</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedTopics.map(r => (
              <Link key={r.slug} href={`/laquinta-communities/${r.slug}`} className="group bg-white border border-[#062840]/10 rounded-xl p-5 hover:shadow-md hover:border-amber-300 transition">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#BA9273] mb-1">{r.eyebrow}</div>
                <div className="font-serif text-lg text-[#062840] group-hover:text-amber-700 transition">{r.h1}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-700 group-hover:gap-2 transition-all">Read the guide <ArrowRight className="h-3 w-3" /></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <RelatedContent pageType="generic" communities={t.communitySlugs?.slice(0, 3)} excludePath={`/laquinta-communities/${t.slug}`} />
    </PageShell>
  );
}

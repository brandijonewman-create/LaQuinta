import { notFound } from 'next/navigation';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import LeadGate from '@/components/lead-gate';
import ThinPageIntro from '@/components/shared/thin-page-intro';
import ThinPageFaq from '@/components/shared/thin-page-faq';
import { JsonLd, faqSchema, breadcrumbSchema } from '@/lib/json-ld';
import { MARKET_REPORT_COPY } from '@/lib/content/thin-page-copy';
import { site, owner } from '@/lib/site-config';

const VALID_ZIPS = Object.keys(MARKET_REPORT_COPY);

export function generateStaticParams() {
  return VALID_ZIPS.map((zip) => ({ zip }));
}

export function generateMetadata({ params }) {
  const copy = MARKET_REPORT_COPY[params.zip];
  if (!copy) return {};
  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: { canonical: `/market-reports/${params.zip}` },
  };
}

// Article schema for the quarterly report itself. Google treats a quarterly
// research/data report as an editorial Article when it has clear publish +
// modified dates, an author (the site organization), and an `about` Place.
function marketReportArticleSchema(zip, copy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.title,
    description: copy.metaDescription,
    datePublished: copy.datePublished,
    dateModified: copy.dateModified,
    author: { '@type': 'Organization', name: owner.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/market-reports/${zip}`,
    },
    about: {
      '@type': 'Place',
      name: `La Quinta, CA ${zip}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'La Quinta',
        addressRegion: 'CA',
        postalCode: zip,
        addressCountry: 'US',
      },
    },
  };
}

export default function MarketReportZipPage({ params }) {
  if (!VALID_ZIPS.includes(params.zip)) notFound();
  const copy = MARKET_REPORT_COPY[params.zip];

  const crumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Market Reports', url: '/market-reports' },
    { name: `La Quinta ${params.zip} Market Report`, url: `/market-reports/${params.zip}` },
  ]);
  const faq = faqSchema(copy.faqs);
  const article = marketReportArticleSchema(params.zip, copy);

  return (
    <>
      <JsonLd data={crumb} />
      <JsonLd data={faq} />
      <JsonLd data={article} />

      <PageHero
        eyebrow={`ZIP ${params.zip} · Q3 2026`}
        title={`La Quinta · ${params.zip} Market Report`}
        subtitle={copy.metaDescription}
      />

      <section className="container pt-10">
        <Breadcrumbs
          items={[
            { label: 'Market Reports', href: '/market-reports' },
            { label: params.zip },
          ]}
        />
      </section>

      {/* Public preview intro — everyone sees this. */}
      <ThinPageIntro>{copy.intro}</ThinPageIntro>

      {/* Gated quarterly PDF + summary numbers. */}
      <section className="container pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto">
          <LeadGate
            assetSlug={`market-report:${params.zip}-q3-2026`}
            assetTitle={`the Q3 2026 La Quinta ${params.zip} Market Report`}
            downloadUrl={`/downloads/la-quinta-market-report-${params.zip}-q3-2026.pdf`}
          >
            <div className="space-y-8">
              <Disclaimer />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { m: 'Median range', v: '$1.45M – $1.62M', n: 'Single-family, all communities' },
                  { m: 'Inventory months', v: '4.1 – 5.3', n: 'Q3 seasonal soft' },
                  { m: 'YoY direction', v: 'Flat to +2%', n: 'Median holding' },
                ].map((s) => (
                  <div key={s.m} className="bg-sand-50 border border-border p-5">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">{s.m}</div>
                    <div className="font-serif text-2xl text-palm mt-2">{s.v}</div>
                    <div className="text-[11px] text-foreground/55 mt-1 italic">{s.n}</div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-serif text-3xl text-palm mb-4">What this quarter looked like</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Q3 2026 played out as expected for La Quinta — the summer-soft pattern that the 92253 ZIP runs through every year. Triple-digit heat clears the snowbird population, foot traffic at private clubs drops, and the higher end of the market goes effectively dormant from late June through mid-September. The transactions that did close were primarily primary-residence buyers and a handful of opportunistic second-home deals where sellers were motivated.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  The most active segment was the $700K–$1.4M band — historic La Quinta Country Club, Trilogy at La Quinta, and Duna La Quinta. Days on market lengthened modestly versus Q2; price reductions were more common than in spring but remained moderate (typically 3–5%, not the 10%+ corrections seen in the broader Coachella Valley in 2020–2022).
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl text-palm mb-4">By club</h2>
                <ul className="space-y-3 text-foreground/80">
                  <li><strong className="text-palm">PGA West:</strong> Widest range, broadest activity. Condo segment most active. Stadium and Norman-course homes held value best.</li>
                  <li><strong className="text-palm">La Quinta Country Club:</strong> Steady volume. The historic-club discount versus newer construction continues to attract heritage buyers.</li>
                  <li><strong className="text-palm">Andalusia, The Hideaway, Tradition:</strong> Slow summer typical of the upper-mid market. Listings carried into Q4.</li>
                  <li><strong className="text-palm">The Madison Club, The Quarry:</strong> Effectively dormant — typical pattern.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-3xl text-palm mb-4">What we expect in Q4</h2>
                <p className="text-foreground/80 leading-relaxed">
                  The Q4 ramp typically begins in mid-to-late October as snowbirds return. Inventory tends to firm, days on market shorten, and the upper-mid market reactivates first. Watch the $1.5M–$3M range at PGA West, Andalusia, and Mountain View — those are typically the early indicators of how the high season will price.
                </p>
              </div>

              <p className="text-foreground/55 italic text-sm pt-4 border-t border-border">
                Ranges are sourced from CARETS/CRMLS via our partner California-licensed realtor. Confirm specifics with a licensed agent before transacting.
              </p>
            </div>
          </LeadGate>
        </div>
      </section>

      <ThinPageFaq faqs={copy.faqs} />
    </>
  );
}

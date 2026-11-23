import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, GLOSSARY_TERMS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Scottsdale Real-Estate Glossary | Key Terms Defined',
  description: 'Every term a Scottsdale luxury home buyer needs to know, from 1031 exchanges and CC&Rs to target-style golf and Sonoran Desert. 40+ terms defined in plain English.',
  alternates: { canonical: `${SITE.url}/glossary` },
  openGraph: { url: `${SITE.url}/glossary`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function Page() {
  // Sort terms alphabetically then group by first letter
  const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
  const grouped = LETTERS.reduce((acc, L) => {
    const items = sorted.filter(t => t.term.toUpperCase().startsWith(L));
    if (items.length) acc[L] = items;
    return acc;
  }, {});

  // DefinedTermSet JSON-LD
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Scottsdale Luxury Real-Estate Glossary',
    url: `${SITE.url}/glossary`,
    description: 'Glossary of Scottsdale real estate, golf community, club membership, and Arizona tax terminology.',
    hasDefinedTerm: sorted.map(t => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE.url}/glossary#${slugify(t.term)}`,
      name: t.term,
      description: t.def,
      termCode: t.cat,
      inDefinedTermSet: `${SITE.url}/glossary`
    }))
  };

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Glossary', path: '/glossary' }
      ])} />
      <JsonLd data={definedTermSetSchema} />

      {/* HERO */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Reference</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Scottsdale real-estate glossary</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/85 text-lg leading-relaxed">{sorted.length} terms every Scottsdale luxury home buyer eventually has to look up, from <em>1031 exchanges</em> to <em>target-style golf</em>, defined in plain English by people who actually use them.</p>
          <MarketDisclaimer light className="max-w-2xl" />
        </div>
      </section>

      {/* JUMP-LINK NAV */}
      <section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur border-b border-emerald-900/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap gap-1.5 text-xs">
          {LETTERS.map(L => grouped[L] ? (
            <a key={L} href={`#letter-${L}`} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-900 hover:bg-amber-200 hover:text-[#062840] font-semibold transition">{L}</a>
          ) : (
            <span key={L} className="inline-flex items-center justify-center w-7 h-7 rounded-full text-emerald-900/25 font-semibold cursor-default">{L}</span>
          ))}
        </div>
      </section>

      {/* TERMS */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {Object.entries(grouped).map(([L, items]) => (
          <div key={L} id={`letter-${L}`} className="mb-14 scroll-mt-32">
            <h2 className="font-serif text-4xl text-amber-700 mb-6">{L}</h2>
            <div className="space-y-6">
              {items.map(t => (
                <article key={t.term} id={slugify(t.term)} className="scroll-mt-32 pb-6 border-b border-emerald-900/10 last:border-b-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-serif text-2xl text-[#062840]">{t.term}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{t.cat}</span>
                  </div>
                  <p className="text-emerald-900/80 leading-relaxed">{t.def}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Ad slot near footer of long content page */}
      <section className="max-w-3xl mx-auto px-6 pb-8">
      </section>

      {/* CTA */}
      <section className="bg-emerald-50/30 border-t border-emerald-900/10">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="font-serif text-3xl text-[#062840]">Term not here?</h2>
          <p className="mt-3 text-emerald-900/75">Submit it through our <a href="/#concierge" className="text-amber-700 hover:underline">contact form</a> and we&rsquo;ll add it. The glossary grows with every buyer who asks.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/guides/scottsdale-buyers-guide-2026" className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3 text-sm font-semibold transition">
              Download the Buyer&rsquo;s Guide PDF
            </Link>
            <Link href="/communities" className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 text-emerald-900 hover:border-amber-300 hover:text-amber-700 bg-white px-6 py-3 text-sm font-semibold transition">
              Explore communities
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

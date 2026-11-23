import MarketDisclaimer from '@/components/market-disclaimer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import RelatedContent from '@/components/related-content';
import { SITE, COMPARISON_PAIRS, findCommunity, findComparisonPair } from '@/lib/data';
import { getCompareEditorial } from '@/lib/compare-editorial';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, Scale, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return COMPARISON_PAIRS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = findComparisonPair(params.slug);
  if (!p) return { title: 'Not found' };
  const a = findCommunity(p.a);
  const b = findCommunity(p.b);
  if (!a || !b) return { title: 'Not found' };
  return {
    title: `${a.name} vs. ${b.name} | Scottsdale Comparison`,
    description: `${a.name} or ${b.name}? Honest comparison: pricing, club access, lifestyle, schools, and which community fits which buyer. ${p.intent}`,
    alternates: { canonical: `${SITE.url}/compare/${p.slug}` },
  openGraph: { url: `${SITE.url}/compare/${p.slug}`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
  };
}

function Cell({ label, a, b }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 py-3 border-b border-emerald-900/10 last:border-b-0">
      <div className="text-xs uppercase tracking-wider text-emerald-700 self-center">{label}</div>
      <div className="text-sm text-emerald-900/85">{a || <span className="text-emerald-900/30">n/a</span>}</div>
      <div className="text-sm text-emerald-900/85">{b || <span className="text-emerald-900/30">n/a</span>}</div>
    </div>
  );
}

export default function Page({ params }) {
  const p = findComparisonPair(params.slug);
  if (!p) notFound();
  const a = findCommunity(p.a);
  const b = findCommunity(p.b);
  if (!a || !b) notFound();
  const editorial = getCompareEditorial(p.slug);

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Comparisons', path: '/compare' },
        { name: `${a.name} vs. ${b.name}`, path: `/compare/${p.slug}` }
      ])} />

      {/* HERO */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3 flex items-center gap-2"><Scale className="h-3.5 w-3.5" /> Versus</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">
            {a.name} <span className="text-emerald-50/55">vs.</span> {b.name}
          </h1>
          <p className="mt-5 max-w-3xl text-emerald-50/85 text-lg leading-relaxed">{p.intent}</p>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">At a glance</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-6">Side-by-side</h2>

        <div className="grid grid-cols-3 gap-3 md:gap-6 pb-3 mb-2 border-b-2 border-emerald-900/15">
          <div></div>
          <div className="font-serif text-xl text-[#062840]">{a.name}</div>
          <div className="font-serif text-xl text-[#062840]">{b.name}</div>
        </div>

        <Cell label="Tagline"     a={a.tagline}    b={b.tagline} />
        <Cell label="Location"    a={a.location}   b={b.location} />
        <Cell label="Price range" a={a.priceRange} b={b.priceRange} />
        <Cell label="Lot count"   a={a.homes ? `${a.homes.toLocaleString()} homes` : null} b={b.homes ? `${b.homes.toLocaleString()} homes` : null} />
        <Cell label="Golf"        a={a.golf}       b={b.golf} />
        <Cell label="Club access" a={a.club}       b={b.club} />
        <Cell label="HOA"         a={a.hoa}        b={b.hoa} />
        <MarketDisclaimer />
      </section>

      {/* VERDICT */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-2">Our take</div>
          <p className="text-emerald-900/90 text-lg leading-relaxed">{p.verdict}</p>
        </div>
      </section>

      {/* LONG-FORM EDITORIAL — unique per-pair analysis (lib/compare-editorial.js) */}
      {editorial && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          {editorial.sections.map((s, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-serif text-3xl text-[#062840] mb-4">{s.heading}</h2>
              {s.paragraphs.map((para, j) => (
                <p key={j} className="text-[#062840]/85 text-lg leading-relaxed mb-5">{para}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* IN-DEPTH */}
      <section className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        {[a, b].map(c => (
          <div key={c.slug} className="bg-white border border-emerald-900/10 rounded-2xl p-7">
            <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">{c.name}</div>
            <h3 className="font-serif text-2xl text-[#062840] mb-3 leading-tight">{c.tagline}</h3>
            <p className="text-sm text-emerald-900/80 leading-relaxed mb-5">{c.description}</p>
            <div className="space-y-2 text-sm text-emerald-900/80 mb-5">
              {[
                ['Location', c.location],
                ['Price', c.priceRange],
                ['Golf', c.golf],
                ['Club', c.club]
              ].filter(([_, v]) => !!v).map(([k, v]) => (
                <div key={k} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" /><span><strong>{k}:</strong> {v}</span></div>
              ))}
            </div>
            <Link href={`/communities/${c.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800">
              Read the full {c.name} guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
        <div className="md:col-span-2"><MarketDisclaimer /></div>
      </section>

      {/* AD */}
      <section className="max-w-3xl mx-auto px-6 pb-6">
      </section>

      {/* RELATED */}
      <RelatedContent
        pageType="comparison"
        communities={[a.slug, b.slug]}
        excludePath={`/compare/${p.slug}`}
      />

      {/* OTHER COMPARISONS */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="font-serif text-2xl text-[#062840] mb-4">Other comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {COMPARISON_PAIRS.filter(o => o.slug !== p.slug).slice(0, 6).map(o => {
            const oa = findCommunity(o.a);
            const ob = findCommunity(o.b);
            if (!oa || !ob) return null;
            return (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="text-sm rounded-full border border-emerald-900/15 bg-white hover:bg-emerald-50 px-4 py-2 text-emerald-900 transition">
                {oa.name} vs. {ob.name}
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

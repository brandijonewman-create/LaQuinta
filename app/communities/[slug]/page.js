import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Disclaimer from '@/components/shared/disclaimer';
import { Button } from '@/components/ui/button';
import { communities, architects } from '@/lib/site-config';
import { getCommunityContent } from '@/lib/content/community-content';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd, placeSchema, faqSchema, breadcrumbSchema } from '@/lib/json-ld';

// Short-form disclaimer used in the compact sidebar Price Band card. The
// long-form MARKET_DISCLAIMER already appears via <Disclaimer /> in the main
// article column, so this only needs to be a compressed reminder.
const MARKET_DISCLAIMER_SHORT =
  'Directional pricing only. Verify with a California-licensed real estate professional.';

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const community = communities.find((c) => c.slug === params.slug);
  if (!community) return {};
  const content = getCommunityContent(params.slug);
  return {
    title: community.name,
    description: content.tagline,
    alternates: { canonical: `/communities/${params.slug}` },
    openGraph: {
      title: community.name,
      description: content.tagline,
      images: content.image ? [content.image] : [],
      type: 'article',
    },
  };
}

export default function CommunityDetailPage({ params }) {
  const community = communities.find((c) => c.slug === params.slug);
  if (!community) notFound();
  const content = getCommunityContent(params.slug);
  const related = communities.filter((c) => c.slug !== community.slug).slice(0, 3);
  const linkedArchitects = architects.filter((a) =>
    (community.architect || '').toLowerCase().includes(a.name.toLowerCase().split(' ')[0])
  );

  const placeData = placeSchema({ ...community, tagline: content.tagline });
  const faqData = faqSchema(content.faqs);
  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Communities', url: '/communities' },
    { name: community.name, url: `/communities/${community.slug}` },
  ]);

  return (
    <>
      <JsonLd data={placeData} />
      <JsonLd data={faqData} />
      <JsonLd data={crumbData} />

      <PageHero
        variant="image"
        image={content.image}
        eyebrow={community.city}
        title={community.name}
        subtitle={content.tagline}
      />

      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Communities', href: '/communities' }, { label: community.name }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <article className="lg:col-span-8 space-y-12">
            <div>
              <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Overview</div>
              <p className="text-lg leading-relaxed text-foreground/85">{content.overview}</p>
            </div>

            {content.sections?.map((s, i) => (
              <div key={i}>
                <h2 className="font-serif text-3xl text-palm mb-3">{s.heading}</h2>
                <p className="text-foreground/75 leading-relaxed">{s.body}</p>
              </div>
            ))}

            {content.membership && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Membership</div>
                <h2 className="font-serif text-3xl text-palm mb-4">How membership actually works</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-2">
                  {[
                    ['Structure',       content.membership.structure],
                    ['Initiation tier', content.membership.initiationTier],
                    ['Dues tier',       content.membership.duesTier],
                    ['Waitlist',        content.membership.waitlist],
                    ['Transfer terms',  content.membership.transferTerms],
                    ['Guest / outside play', content.membership.guestPolicy],
                  ].filter(([, v]) => Boolean(v)).map(([label, value]) => (
                    <div key={label} className="border-t border-border pt-3">
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">{label}</dt>
                      <dd className="text-foreground/85 leading-relaxed mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
                {content.membership.buyerFit && (
                  <p className="mt-6 text-foreground/85 leading-relaxed">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60 mr-2">Buyer fit</span>
                    {content.membership.buyerFit}
                  </p>
                )}
                <p className="mt-4 text-xs text-foreground/55 italic">
                  Membership figures move. Verify current initiation, dues, and transfer terms directly with the club before making financial commitments.
                </p>
              </div>
            )}

            {content.architectContext && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Architect Context</div>
                <h2 className="font-serif text-3xl text-palm mb-4">The architect and the design signature</h2>
                <dl className="space-y-4">
                  {[
                    ['Primary designer',        content.architectContext.primary],
                    ['Era',                     content.architectContext.era],
                    ['Other Coachella work',    content.architectContext.otherCoachellaWork],
                    ['Design signature',        content.architectContext.designSignature],
                    ['Play character',          content.architectContext.playCharacter],
                  ].filter(([, v]) => Boolean(v)).map(([label, value]) => (
                    <div key={label} className="border-b border-border pb-3">
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">{label}</dt>
                      <dd className="text-foreground/85 leading-relaxed mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {content.priceContext && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Real-Estate Context</div>
                <h2 className="font-serif text-3xl text-palm mb-4">Price band, inventory and product mix</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    ['Band tier',           content.priceContext.bandTier],
                    ['Typical range',       content.priceContext.typicalRange],
                    ['Lot size',            content.priceContext.lotSize],
                    ['Dominant vintage',    content.priceContext.dominantVintage],
                    ['Dominant style',      content.priceContext.dominantStyle],
                    ['Inventory velocity',  content.priceContext.inventoryVelocity],
                    ['Entry product',       content.priceContext.entryProduct],
                  ].filter(([, v]) => Boolean(v)).map(([label, value]) => (
                    <div key={label} className="border-t border-border pt-3">
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">{label}</dt>
                      <dd className="text-foreground/85 leading-relaxed mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-foreground/55 italic">
                  Price bands are directional and reflect observed listings and public transaction ranges. Verify current pricing with a California-licensed real estate professional before making an offer.
                </p>
              </div>
            )}

            {Array.isArray(content.touringChecklist) && content.touringChecklist.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />On a Tour</div>
                <h2 className="font-serif text-3xl text-palm mb-4">What to verify when you tour</h2>
                <ul className="space-y-3">
                  {content.touringChecklist.map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground/85 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Disclaimer />

            {Array.isArray(content.faqs) && content.faqs.length > 0 && (
              <div className="border-t border-border pt-10">
                <h2 className="font-serif text-3xl text-palm mb-6">Frequently asked</h2>
                <dl className="space-y-6">
                  {content.faqs.map((q, i) => (
                    <div key={i} className="border-b border-border pb-6">
                      <dt className="font-serif text-xl text-palm">{q.q}</dt>
                      <dd className="text-foreground/75 leading-relaxed mt-2">{q.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {Array.isArray(content.searchIntents) && content.searchIntents.length > 0 && (
              <div className="border-t border-border pt-10">
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Also Searched</div>
                <h2 className="font-serif text-3xl text-palm mb-4">Buyers researching {community.name} also search for</h2>
                <ul className="flex flex-wrap gap-2">
                  {content.searchIntents.map((term, i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border bg-sand-50 px-3.5 py-1.5 text-sm text-foreground/80"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-foreground/55 mt-4 italic">
                  These are common search phrases used by La Quinta golf-community buyers. To dig into any of them, take the <Link className="underline decoration-terracotta underline-offset-2" href="/community-quiz">community-fit quiz</Link>, browse the <Link className="underline decoration-terracotta underline-offset-2" href="/guides">buyer guides</Link>, or <Link className="underline decoration-terracotta underline-offset-2" href="/home-valuation">request an editorial valuation</Link>.
                </p>
              </div>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-8">
            {content.quickFacts?.length > 0 && (
              <div className="bg-sand-50 border border-border p-6">
                <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />Quick Facts</div>
                <dl className="space-y-3 text-sm">
                  {content.quickFacts.map((f, i) => (
                    <div key={i} className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
                      <dt className="text-foreground/60 uppercase tracking-[0.12em] text-[11px]">{f.label}</dt>
                      <dd className="text-palm font-medium text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {content.membership && (
              <div className="bg-white border border-border p-6">
                <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />Membership Snapshot</div>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Structure',       content.membership.structure],
                    ['Initiation tier', content.membership.initiationTier],
                    ['Dues tier',       content.membership.duesTier],
                    ['Guest policy',    content.membership.guestPolicy],
                  ].filter(([, v]) => Boolean(v)).map(([label, value]) => (
                    <div key={label} className="border-b border-border/60 pb-2 last:border-0">
                      <dt className="text-foreground/60 uppercase tracking-[0.12em] text-[11px]">{label}</dt>
                      <dd className="text-palm mt-1 leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11px] text-foreground/55 italic leading-snug">
                  Directional. Verify current terms with the club.
                </p>
              </div>
            )}

            {content.priceContext && (
              <div className="bg-white border border-border p-6">
                <div className="editorial-eyebrow mb-5"><span className="editorial-rule" />Price Band</div>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Band tier',        content.priceContext.bandTier],
                    ['Typical range',    content.priceContext.typicalRange],
                    ['Entry product',    content.priceContext.entryProduct],
                    ['Inventory turn',   content.priceContext.inventoryVelocity],
                  ].filter(([, v]) => Boolean(v)).map(([label, value]) => (
                    <div key={label} className="border-b border-border/60 pb-2 last:border-0">
                      <dt className="text-foreground/60 uppercase tracking-[0.12em] text-[11px]">{label}</dt>
                      <dd className="text-palm mt-1 leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11px] text-foreground/55 italic leading-snug">
                  {MARKET_DISCLAIMER_SHORT}
                </p>
              </div>
            )}

            {linkedArchitects.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Architect{linkedArchitects.length > 1 ? 's' : ''}</div>
                <ul className="space-y-3">
                  {linkedArchitects.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/architects/${a.slug}`} className="group flex items-center justify-between text-sm border-b border-border pb-3">
                        <span className="font-serif text-lg text-palm group-hover:text-terracotta transition-colors">{a.name}</span>
                        <ArrowUpRight size={14} className="text-foreground/40 group-hover:text-terracotta" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-palm text-sand-50 p-6">
              <div className="text-xs uppercase tracking-[0.28em] text-gold mb-3">Find Your Community</div>
              <p className="text-sm text-sand-50/85 leading-relaxed mb-4">
                Take the eight-question quiz to see which of La Quinta&rsquo;s seven clubs fit you best.
              </p>
              <Button asChild className="rounded-none bg-gold text-palm hover:bg-sand-50 w-full">
                <Link href="/community-quiz">Start the Quiz</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pb-24">
          <div className="editorial-eyebrow mb-6"><span className="editorial-rule" />Related Communities</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {related.map((r) => {
              const rc = getCommunityContent(r.slug);
              return (
                <Link key={r.slug} href={`/communities/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                    <img src={rc.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="font-serif text-xl text-white">{r.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-sand-50/80 mt-1">{r.architect || r.city}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

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

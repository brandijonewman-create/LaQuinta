import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { architects, communities, site } from '@/lib/site-config';
import { getArchitectContent } from '@/lib/content/architect-content';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/lib/json-ld';

export function generateStaticParams() {
  return architects.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = architects.find((x) => x.slug === params.slug);
  if (!a) return {};
  const content = getArchitectContent(params.slug);
  const description = content.hero || `Profile of course architect ${a.name} and his La Quinta work.`;
  return {
    title: `${a.name} — course architect`,
    description,
    alternates: { canonical: `/architects/${params.slug}` },
  };
}

// A profile is considered "deep" when we have written a fully-expanded page:
// hero lede, careerArc paragraphs, design signatures, per-course La Quinta
// work, and comparisons. Stub profiles still render the summary and sidebar,
// but the "in development" disclaimer is shown to keep expectations honest.
function isDeepProfile(content) {
  return Boolean(
    content?.careerArc?.length &&
      content?.designSignatures?.length &&
      content?.laQuintaWork?.length
  );
}

export default function ArchitectDetailPage({ params }) {
  const architect = architects.find((a) => a.slug === params.slug);
  if (!architect) notFound();
  const content = getArchitectContent(params.slug);
  const firstName = architect.name.split(' ')[0].toLowerCase();
  const linkedCommunities = communities.filter((c) =>
    (c.architect || '').toLowerCase().includes(firstName)
  );
  const deep = isDeepProfile(content);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: architect.name,
    jobTitle: 'Golf course architect',
    description: content.summary,
    knowsAbout: architect.signatureCourses,
    url: `${site.url}/architects/${architect.slug}`,
  };
  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Architects', url: '/architects' },
    { name: architect.name, url: `/architects/${architect.slug}` },
  ]);
  const faqData = Array.isArray(content.faqs) && content.faqs.length > 0
    ? faqSchema(content.faqs)
    : null;

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={crumbData} />
      {faqData && <JsonLd data={faqData} />}

      <PageHero
        eyebrow="Course Architect"
        title={architect.name}
        subtitle={content.hero || content.summary}
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs
          items={[
            { label: 'Architects', href: '/architects' },
            { label: architect.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <article className="lg:col-span-8 space-y-12">
            {/* Header stats */}
            <div className="grid grid-cols-2 gap-6 border-y border-border py-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">Tenure</div>
                <div className="font-serif text-2xl text-palm mt-1">{content.tenure}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">Design Discipline</div>
                <div className="font-serif text-2xl text-palm mt-1">{content.discipline}</div>
              </div>
            </div>

            {/* Career arc */}
            <div>
              <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Career Arc</div>
              <h2 className="font-serif text-3xl text-palm mb-5">
                {deep ? `The making of ${firstName === architect.name.toLowerCase() ? architect.name : architect.name.split(' ').slice(-1)[0]}\u2019s design language` : 'Career & La Quinta work'}
              </h2>
              {Array.isArray(content.careerArc) && content.careerArc.length > 0 ? (
                <div className="space-y-5">
                  {content.careerArc.map((para, i) => (
                    <p key={i} className="text-foreground/80 leading-relaxed text-lg">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-foreground/80 leading-relaxed text-lg">{content.summary}</p>
                  <p className="text-foreground/65 italic text-sm mt-6">
                    Full long-form profile in development. Verified course-by-course breakdowns coming soon.
                  </p>
                </>
              )}
            </div>

            {/* Design signatures */}
            {Array.isArray(content.designSignatures) && content.designSignatures.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Design Signatures</div>
                <h2 className="font-serif text-3xl text-palm mb-5">The design language, read on any hole</h2>
                <dl className="space-y-5">
                  {content.designSignatures.map((s, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <dt className="font-serif text-xl text-palm">{s.label}</dt>
                      <dd className="text-foreground/80 leading-relaxed mt-1">{s.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* La Quinta work — course by course */}
            {Array.isArray(content.laQuintaWork) && content.laQuintaWork.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />La Quinta Work</div>
                <h2 className="font-serif text-3xl text-palm mb-5">Course by course, inside La Quinta</h2>
                <div className="space-y-8">
                  {content.laQuintaWork.map((c, i) => (
                    <div key={i} className="border-l-2 border-terracotta pl-6">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                        <h3 className="font-serif text-2xl text-palm">{c.course}</h3>
                        {c.year && (
                          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">{c.year}</span>
                        )}
                      </div>
                      {c.community && (
                        <div className="text-sm text-foreground/60 mb-3">
                          Inside{' '}
                          <Link
                            href={`/communities/${communities.find((x) => x.name === c.community)?.slug || ''}`}
                            className="underline decoration-terracotta underline-offset-2 hover:text-terracotta"
                          >
                            {c.community}
                          </Link>
                        </div>
                      )}
                      {c.playCharacter && (
                        <p className="text-foreground/80 leading-relaxed">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 mr-2">Play character</span>
                          {c.playCharacter}
                        </p>
                      )}
                      {c.whatToNotice && (
                        <p className="text-foreground/80 leading-relaxed mt-3">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 mr-2">What to notice</span>
                          {c.whatToNotice}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design philosophy */}
            {content.philosophy && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Design Philosophy</div>
                <h2 className="font-serif text-3xl text-palm mb-5">What the routings are trying to do</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">{content.philosophy}</p>
              </div>
            )}

            {/* Notable work outside La Quinta */}
            {Array.isArray(content.otherNotableWork) && content.otherNotableWork.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Beyond La Quinta</div>
                <h2 className="font-serif text-3xl text-palm mb-5">Notable work outside the Coachella Valley</h2>
                <ul className="space-y-3">
                  {content.otherNotableWork.map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparisons */}
            {Array.isArray(content.comparisons) && content.comparisons.length > 0 && (
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />How He Compares</div>
                <h2 className="font-serif text-3xl text-palm mb-5">Read against the other architects on the property</h2>
                <dl className="space-y-5">
                  {content.comparisons.map((c, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <dt className="font-serif text-xl text-palm">vs {c.against}</dt>
                      <dd className="text-foreground/80 leading-relaxed mt-1">{c.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* FAQs */}
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

            {/* Search intents chip cloud */}
            {Array.isArray(content.searchIntents) && content.searchIntents.length > 0 && (
              <div className="border-t border-border pt-10">
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Also Searched</div>
                <h2 className="font-serif text-2xl text-palm mb-4">
                  Readers researching {architect.name} also search for
                </h2>
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
              </div>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-8">
            {architect.signatureCourses?.length > 0 && (
              <div className="bg-sand-50 border border-border p-6">
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />La Quinta Courses</div>
                <ul className="space-y-2.5 text-sm">
                  {architect.signatureCourses.map((c, i) => (
                    <li key={i} className="font-serif text-lg text-palm">{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {linkedCommunities.length > 0 && (
              <div className="bg-white border border-border p-6">
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Communities</div>
                <ul className="space-y-3">
                  {linkedCommunities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/communities/${c.slug}`}
                        className="text-palm hover:text-terracotta transition-colors font-serif text-lg"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border border-border p-6">
              <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />Next Steps</div>
              <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                Considering a home in one of {architect.name.split(' ').slice(-1)[0]}’s La Quinta communities?
              </p>
              <div className="space-y-2 text-sm">
                <Link href="/community-quiz" className="block text-palm hover:text-terracotta transition-colors">
                  → Take the community-fit quiz
                </Link>
                <Link href="/guides" className="block text-palm hover:text-terracotta transition-colors">
                  → Read the buyer guides
                </Link>
                <Link href="/home-valuation" className="block text-palm hover:text-terracotta transition-colors">
                  → Request an editorial valuation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

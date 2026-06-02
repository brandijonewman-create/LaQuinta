import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { architects, communities } from '@/lib/site-config';
import { getArchitectContent } from '@/lib/content/architect-content';
import { getCommunityContent } from '@/lib/content/community-content';

export function generateStaticParams() {
  return architects.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = architects.find((x) => x.slug === params.slug);
  if (!a) return {};
  return {
    title: a.name,
    description: `Profile of course architect ${a.name} and his work in La Quinta, California.`,
    alternates: { canonical: `/architects/${params.slug}` },
  };
}

export default function ArchitectDetailPage({ params }) {
  const architect = architects.find((a) => a.slug === params.slug);
  if (!architect) notFound();
  const content = getArchitectContent(params.slug);

  const firstName = architect.name.split(' ')[0].toLowerCase();
  const linkedCommunities = communities.filter((c) => (c.architect || '').toLowerCase().includes(firstName));

  return (
    <>
      <PageHero
        eyebrow="Course Architect"
        title={architect.name}
        subtitle={content.summary}
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Architects', href: '/architects' }, { label: architect.name }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <article className="lg:col-span-8 space-y-8">
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

            <div>
              <h2 className="font-serif text-3xl text-palm mb-4">Career &amp; La Quinta work</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">{content.summary}</p>
              <p className="text-foreground/65 italic text-sm mt-6">
                Full long-form profile in development. Verified course-by-course breakdowns ship in the full profile.
              </p>
            </div>
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
              <div>
                <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Communities</div>
                <ul className="space-y-3">
                  {linkedCommunities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/communities/${c.slug}`} className="text-palm hover:text-terracotta transition-colors font-serif text-lg">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

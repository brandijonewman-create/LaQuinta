import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import CollaboratorHeadshot from '@/components/collaborators/collaborator-headshot';
import { JsonLd, personSchema, breadcrumbSchema } from '@/lib/json-ld';
import {
  getCollaboratorsByPage,
  getCollaboratorPageSlugs,
} from '@/lib/collaborators';
import { site, owner } from '@/lib/site-config';

export function generateStaticParams() {
  return getCollaboratorPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const people = getCollaboratorsByPage(params.slug);
  if (!people.length) return {};
  const lead = people[0];
  const pageName = lead.affiliation || lead.name;
  return {
    title: `${pageName} — Collaborator`,
    description: `${lead.name}, ${lead.jobTitle}${lead.affiliation ? ` at ${lead.affiliation}` : ''} — contributing collaborator on La Quinta Golf Lifestyle.`,
    alternates: { canonical: `/collaborators/${params.slug}` },
    openGraph: {
      title: `${pageName} — Collaborator`,
      description: lead.bio,
      images: lead.headshot ? [lead.headshot] : [],
      type: 'profile',
    },
  };
}

export default function CollaboratorPage({ params }) {
  const people = getCollaboratorsByPage(params.slug);
  if (!people.length) notFound();
  const lead = people[0];
  const pageName = lead.affiliation || lead.name;

  const crumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Collaborators', url: '/collaborators' },
    { name: pageName, url: `/collaborators/${params.slug}` },
  ]);

  return (
    <>
      <JsonLd data={crumbData} />
      {people.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}

      <PageHero
        eyebrow="Collaborator"
        title={pageName}
        subtitle={`${lead.name}, ${lead.jobTitle}— contributing subject-matter perspective on retirement, real estate, and the financial life around La Quinta.`}
      />

      <section className="container py-16 lg:py-24 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Collaborators', href: '/collaborators' },
            { label: pageName },
          ]}
        />

        <div className="mt-10 space-y-20">
          {people.map((p) => (
            <article key={p.slug} id={p.anchor || p.slug} className="scroll-mt-24">
              <div className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl bg-sand-100 border border-border">
                    <CollaboratorHeadshot person={p} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-terracotta mb-3">
                    {p.affiliation || 'Editorial collaborator'}
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-palm leading-[1.1]">{p.name}</h2>
                  <div className="text-sm text-foreground/70 mt-2">
                    {p.jobTitle}
                    {p.affiliation ? <> &middot; <span className="text-palm">{p.affiliation}</span></> : null}
                  </div>

                  <div className="mt-6 text-foreground/85 leading-relaxed text-base md:text-lg">
                    {p.bio}
                  </div>

                  {Array.isArray(p.services) && p.services.length > 0 ? (
                    <div className="mt-8">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mb-3">Services</div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/80">
                        {p.services.map((s) => (
                          <li key={s} className="border-l border-gold/40 pl-3">{s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {Array.isArray(p.brokeragePartners) && p.brokeragePartners.length > 0 ? (
                    <div className="mt-8">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mb-3">Brokerage Partners</div>
                      <div className="flex flex-wrap gap-2">
                        {p.brokeragePartners.map((b) => (
                          <span key={b} className="inline-block text-xs px-3 py-1.5 bg-sand-50 border border-border text-foreground/80">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {(p.phone || p.url) ? (
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      {p.phone ? (
                        <a href={`tel:${p.phone.replace(/[^0-9+]/g, '')}`} className="text-palm hover:text-terracotta">
                          {p.phone}
                        </a>
                      ) : null}
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm transition-colors"
                        >
                          Visit {p.affiliation || p.name} →
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <p className="text-xs uppercase tracking-[0.22em] text-foreground/50 mb-4">A note on collaborators</p>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            Collaborators on {site.name} contribute subject-matter expertise within their licensed and professional scope. Their contributions are clearly bylined and attributed. Their participation is contributor-based — not a referral arrangement, a brokerage relationship, or a guarantee of any outcome. — The team at {owner.name}
          </p>
        </div>

        <div className="mt-10">
          <Link href="/collaborators" className="text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm">
            ← All collaborators
          </Link>
        </div>
      </section>
    </>
  );
}

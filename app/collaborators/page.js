import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import CollaboratorHeadshot from '@/components/collaborators/collaborator-headshot';
import { collaborators } from '@/lib/collaborators';

export const metadata = {
  title: 'Collaborators',
  description: 'Specialists who contribute subject-matter expertise to La Quinta Golf Lifestyle — financial, legal, design, and retirement experts who work the desert market.',
  alternates: { canonical: '/collaborators' },
};

export default function CollaboratorsIndexPage() {
  // Group by page slug so a multi-person firm only shows once.
  const seen = new Set();
  const pageGroups = [];
  for (const p of collaborators) {
    const key = p.page || p.slug;
    if (seen.has(key)) continue;
    seen.add(key);
    pageGroups.push({ pageSlug: key, lead: p });
  }

  return (
    <>
      <PageHero
        eyebrow="Collaborators"
        title="Specialists we trust."
        subtitle="A small bench of subject-matter experts who contribute expertise on retirement, real estate, and the financial life around La Quinta."
      />
      <section className="container py-16 lg:py-24 max-w-5xl">
        {pageGroups.length === 0 ? (
          <p className="text-foreground/70">No collaborators yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {pageGroups.map(({ pageSlug, lead }) => (
              <Link
                key={pageSlug}
                href={`/collaborators/${pageSlug}`}
                className="group block bg-white rounded-xl border border-border hover:border-palm/30 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="aspect-[5/4] overflow-hidden bg-sand-100">
                  <CollaboratorHeadshot person={lead} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-terracotta mb-2">{lead.affiliation || 'Collaborator'}</div>
                  <h2 className="font-serif text-2xl text-palm leading-tight">{lead.name}</h2>
                  <div className="text-sm text-foreground/65 mt-1">{lead.jobTitle}</div>
                  <p className="text-sm text-foreground/75 mt-3 line-clamp-3 leading-relaxed">{lead.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8 text-sm text-foreground/60 max-w-2xl">
          Collaborators contribute subject-matter expertise within their licensed and professional scope. Their participation is contributor-based — not a referral arrangement.
        </div>
      </section>
    </>
  );
}

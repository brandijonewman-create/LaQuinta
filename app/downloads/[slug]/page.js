// Modernized /downloads/[slug]. Now serves the 7 community-guide PDFs from the
// lead-magnet registry, gates them with the new /api/leads/magnet endpoint,
// auto-triggers the PDF download, and fires both Resend emails (owner +
// confirmation). Replaces the old generic lead form.

import { notFound } from 'next/navigation';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import DownloadGate from '@/components/forms/download-gate';
import { LEAD_MAGNETS, getMagnet } from '@/lib/lead-magnets';
import { communities } from '@/lib/site-config';
import { FileText } from 'lucide-react';

export function generateStaticParams() {
  return Object.keys(LEAD_MAGNETS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const m = getMagnet(params.slug);
  if (!m) return { robots: { index: false, follow: false } };
  return {
    title: m.label,
    description: `Download the ${m.label} — a printable guide from La Quinta Golf Lifestyle.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/downloads/${params.slug}` },
  };
}

export default function DownloadPage({ params }) {
  const m = getMagnet(params.slug);
  if (!m) notFound();
  const community = communities.find((c) => c.slug === m.community);
  return (
    <>
      <PageHero
        eyebrow="Download"
        title={m.label}
        subtitle={`A printable, ${m.requirePhone ? '8-section' : '8-section'} guide covering the course, the club, the real-estate character, and the questions to ask before you commit.`}
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Downloads' }, { label: m.label }]} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-start gap-4 border-b border-border pb-6">
              <FileText size={36} className="text-terracotta flex-shrink-0" />
              <div>
                <div className="font-serif text-2xl text-palm">{m.label}</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 mt-1">
                  PDF · La Quinta, California
                </div>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg">
              An honest walkthrough of {community?.name || m.label.replace(' Guide','')}— the course, the membership structure, the real-estate character, and the practical questions to ask before you commit.
            </p>
            <p className="text-foreground/65 italic text-sm">
              How it works: fill the form, the guide downloads instantly, and we email you a copy with a re-download link. We do not send automated marketing emails. No spam.
            </p>
          </div>
          <div className="lg:col-span-5">
            <DownloadGate
              slug={params.slug}
              label={m.label}
              community={community?.name || ''}
              requirePhone={!!m.requirePhone}
            />
          </div>
        </div>
      </section>
    </>
  );
}

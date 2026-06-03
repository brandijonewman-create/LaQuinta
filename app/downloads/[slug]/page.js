import { notFound } from 'next/navigation';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import LeadMagnetForm from '@/components/forms/lead-magnet-form';
import { LEAD_MAGNETS, getLeadMagnet } from '@/lib/lead-magnets';
import { FileText } from 'lucide-react';

export function generateStaticParams() {
  return Object.keys(LEAD_MAGNETS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const m = getLeadMagnet(params.slug);
  if (!m) return { robots: { index: false, follow: false } };
  return {
    title: m.label,
    description: m.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/downloads/${params.slug}` },
  };
}

export default function DownloadPage({ params }) {
  const m = getLeadMagnet(params.slug);
  if (!m) notFound();
  return (
    <>
      <PageHero eyebrow="Download" title={m.label} subtitle={m.description} />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Downloads' }, { label: m.label }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-start gap-4 border-b border-border pb-6">
              <FileText size={36} className="text-terracotta flex-shrink-0" />
              <div>
                <div className="font-serif text-2xl text-palm">{m.label}</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 mt-1">
                  {m.pages} page · {m.format}
                </div>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg">{m.description}</p>
            <p className="text-foreground/65 italic text-sm">
              How it works: enter your email below. The file is sent to you directly by Brandi, the owner and creator. There are no automated emails and no marketing list.
            </p>
          </div>
          <div className="lg:col-span-5">
            <LeadMagnetForm magnetSlug={params.slug} magnetLabel={m.label} />
          </div>
        </div>
      </section>
    </>
  );
}

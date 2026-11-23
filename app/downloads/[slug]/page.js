import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/page-shell';
import LeadGateForm from '@/components/lead/LeadGateForm';
import { getMagnet, listMagnets } from '@/lib/lead-magnets';
import { SITE } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return listMagnets().map(m => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const m = getMagnet(params.slug);
  if (!m) return { title: 'Download not found' };
  return {
    title: `${m.title}: Download`,
    description: m.subtitle,
    alternates: { canonical: `${SITE.url}/downloads/${m.slug}` },
    // Gate pages must NOT be indexed. The companion long-form page on the site
    // (e.g. /guides/<slug>) is the SEO-canonical entry point. The gate page is
    // a conversion landing, not editorial content.
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } }
  };
}

export default function Page({ params }) {
  const m = getMagnet(params.slug);
  if (!m) notFound();

  return (
    <PageShell>
      <section className="relative bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-sm text-amber-200 hover:text-amber-100 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all guides
          </Link>
          <div className="text-xs uppercase tracking-[0.4em] text-amber-300 mb-4">Free download</div>
          <h1 className="font-serif text-4xl md:text-6xl text-amber-50 tracking-tight leading-[1.05]">{m.title}</h1>
          <p className="text-amber-50/85 mt-5 text-lg leading-relaxed">{m.subtitle}</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <LeadGateForm magnet={m} />
        <p className="mt-6 text-center text-xs text-[#062840]/60 leading-relaxed">
          After you submit, your download will start automatically.
          The file is hosted on this site: we do not email it.
        </p>
      </section>
    </PageShell>
  );
}

import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import CollaboratorApplyClient from './CollaboratorApplyClient';

export const metadata = {
  title: 'Apply to be a Preferred Partner | Scottsdale Golf Lifestyle',
  description: 'Apply to be a Preferred Partner in the Scottsdale Golf Lifestyle directory.',
  alternates: { canonical: `${SITE.url}/collaborators/apply` },
  openGraph: {
    url: `${SITE.url}/collaborators/apply`,
    images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }]
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Collaborators', path: '/collaborators' },
        { name: 'Apply', path: '/collaborators/apply' }
      ])} />

      {/* HERO */}
      <section className="relative bg-[#062840] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_15%_25%,#d4af37_0%,transparent_45%),radial-gradient(circle_at_85%_75%,#d4af37_0%,transparent_45%)]" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.4em] text-amber-300 mb-5">Collaborator application</div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-amber-50 tracking-tight leading-[1.1]">
            Partner with the Scottsdale<br/>
            <span className="text-amber-300">golf-real-estate publication.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-emerald-50/85 text-lg leading-relaxed">
            Scottsdale Golf Lifestyle covers 47 named golf communities, 13 architects, and the full spectrum of buyers actively researching this market. Every Preferred Partner is vetted before listed: the model is built around quality.
          </p>
        </div>
      </section>

      {/* What we're looking for */}
      <section className="bg-[#fdfaf4]">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#BA9273] mb-3">What we&rsquo;re looking for</div>
          <h2 className="font-serif text-3xl text-[#062840] leading-tight mb-5">A working agent who actually closes deals in this market.</h2>
          <ul className="space-y-3 text-[#062840]/80 text-[15px] leading-relaxed">
            <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&middot;</span> Active production in Scottsdale golf communities (closings, not just listings).</li>
            <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&middot;</span> A clear point of view on at least one community, club, or buyer profile.</li>
            <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&middot;</span> Willingness to contribute original photography and/or commentary that our readers can&rsquo;t get from a Zillow listing.</li>
            <li className="flex gap-3"><span className="text-amber-600 font-bold flex-shrink-0">&middot;</span> Comfort with editorial integrity: we won&rsquo;t pretend a community fits a buyer when it doesn&rsquo;t.</li>
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white border-t border-[#062840]/10">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <CollaboratorApplyClient />
        </div>
      </section>
    </PageShell>
  );
}

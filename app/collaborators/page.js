import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, COLLABORATIVE_CATEGORIES } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Award, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Scottsdale Collaborative | Partner Realtors',
  description: 'A curated collaborative of Scottsdale wealth managers, lenders, insurers, and home-services professionals serving luxury golf-community homeowners. Preferred Partner positions available.',
  alternates: { canonical: `${SITE.url}/collaborators` },
  openGraph: { url: `${SITE.url}/collaborators`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

const APPLY_URL = '/collaborators/apply';

function ContactRow({ size = 'lg' }) {
  const cls = size === 'sm' ? 'px-5 py-2.5 text-xs' : 'px-6 py-3 text-sm';
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={APPLY_URL} className={`inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] font-semibold transition ${cls}`}>
        Apply to join <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Collaborators', path: '/collaborators' }
      ])} />

      {/* HERO */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">The Scottsdale Collaborative</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight max-w-4xl">A curated team of trusted Scottsdale professionals.</h1>
          <p className="mt-6 max-w-3xl text-emerald-50/85 text-lg leading-relaxed">
            Scottsdale Golf Lifestyle is a lead-generation, branding, and content platform for the service professionals who serve Scottsdale&rsquo;s luxury homeowners. The wealth managers, lenders, insurance brokers, and home-services experts every buyer eventually needs.
          </p>
          <p className="mt-4 max-w-2xl text-emerald-50/65 text-base">
            We curate one to three Preferred Partners per category. If you serve our buyers exceptionally well, we want to talk.
          </p>
          <div className="mt-10">
            <ContactRow />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">Open categories</div>
        <h2 className="font-serif text-4xl text-[#062840] tracking-tight mb-3">Who fits the collaborative</h2>
        <p className="text-emerald-900/75 max-w-2xl mb-10">Each category below is a placeholder: a real description of who serves our buyers and what kinds of businesses we&rsquo;re curating. Slots are first-come, first-vetted.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {COLLABORATIVE_CATEGORIES.map(c => (
            <article key={c.slug} className="bg-white border border-emerald-900/10 rounded-2xl p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">{c.shortName}</div>
                  <h3 className="font-serif text-2xl text-[#062840] leading-tight">{c.name}</h3>
                </div>
                {c.anchorPartner?.featured ? (
                  <div className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber-700">
                    <Award className="h-3 w-3" /> Anchor sponsor
                  </div>
                ) : (
                  <div className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-700">
                    <Sparkles className="h-3 w-3" /> Open
                  </div>
                )}
              </div>
              <p className="text-sm text-emerald-900/80 leading-relaxed mb-5">{c.intro}</p>

              <div className="text-xs uppercase tracking-wider text-emerald-700 mb-2">Who fits</div>
              <ul className="text-sm text-emerald-900/80 space-y-1 mb-5">
                {c.whoFits.slice(0, 4).map(item => (
                  <li key={item} className="flex items-start gap-2"><span className="text-amber-600 mt-1">•</span><span>{item}</span></li>
                ))}
              </ul>

              {c.anchorPartner?.featured ? (
                <div className="pt-5 border-t border-emerald-900/10">
                  <div className="text-xs text-emerald-900/60 mb-1">Preferred Partner</div>
                  <div className="font-serif text-lg text-[#062840]">{c.anchorPartner.name}</div>
                  <div className="text-xs text-emerald-900/70 mt-0.5">{c.anchorPartner.tagline}</div>
                </div>
              ) : (
                <div className="pt-5 border-t border-emerald-900/10">
                  <div className="text-xs uppercase tracking-wider text-emerald-700 mb-2">Featured slot</div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-emerald-900/75"><span className="font-serif text-base text-[#062840]">Your business here</span></div>
                    <Link href={APPLY_URL} className="inline-flex items-center gap-1 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-4 py-2 text-xs font-semibold transition shrink-0">
                      Apply <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-emerald-50/30 border-y border-emerald-900/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">How collaboration works</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] tracking-tight mb-10">Three ways your brand shows up</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white border border-emerald-900/10 rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">1. Preferred Partner category position</div>
              <p className="text-sm text-emerald-900/75">Your name, tagline, and direct contact on the category card here: the curated home for buyers searching for trusted Scottsdale professionals in your space.</p>
            </div>
            <div className="bg-white border border-emerald-900/10 rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">2. Co-authored editorial</div>
              <p className="text-sm text-emerald-900/75">A quarterly blog post co-written with you on a high-intent topic in your category, byline-credited to your principal. Editorial polish from us, expertise from you.</p>
            </div>
            <div className="bg-white border border-emerald-900/10 rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-amber-700 mb-2">3. Buyer&rsquo;s guide feature</div>
              <p className="text-sm text-emerald-900/75">A featured callout inside our downloadable Scottsdale Buyer&rsquo;s Guide PDF: delivered to every lead who downloads it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Talk to us</div>
          <h2 className="font-serif text-4xl md:text-5xl text-amber-50 tracking-tight">Let&rsquo;s see if you&rsquo;re a fit.</h2>
          <p className="mt-5 text-emerald-50/75 text-lg">A short application, then a real conversation. We&rsquo;ll set up a 20-minute call and explain the rest from there.</p>
          <div className="mt-10 flex justify-center">
            <ContactRow />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

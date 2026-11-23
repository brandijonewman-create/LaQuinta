import MarketDisclaimer from '@/components/market-disclaimer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/page-shell';
import LeadForm from '@/components/lead-form';
import RelatedContent from '@/components/related-content';
import { SITE, GOLF_CLUBS, findGolfClub, findCommunity } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Flag, Lock, MapPin, Users, DollarSign, Calendar } from 'lucide-react';

export function generateStaticParams() {
  return GOLF_CLUBS.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = findGolfClub(params.slug);
  if (!c) return {};
  return {
    title: `${c.name} | Membership, Cost & Homes`,
    description: `${c.tagline}. ${c.courseCount}. Initiation ${c.membership.initiation}. How to get in, what it costs, and where members live in north Scottsdale.`,
    alternates: { canonical: `${SITE.url}/golf-clubs/${c.slug}` },
    openGraph: { url: `${SITE.url}/golf-clubs/${c.slug}`, title: `${c.name}: Private Club Guide`, description: c.tagline, type: 'article', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
  };
}

function clubFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export default function Page({ params }) {
  const c = findGolfClub(params.slug);
  if (!c) return notFound();

  const nearby = (c.nearbyNeighborhoods || []).map(s => findCommunity(s)).filter(Boolean);

  const clubSchema = {
    '@context': 'https://schema.org',
    '@type': 'GolfCourse',
    name: c.name,
    address: { '@type': 'PostalAddress', streetAddress: c.location, addressLocality: 'Scottsdale', addressRegion: 'AZ', addressCountry: 'US' },
    description: c.overview,
    foundingDate: String(c.founded),
    url: `${SITE.url}/golf-clubs/${c.slug}`
  };

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Private Golf Clubs', path: '/golf-clubs' },
        { name: c.name, path: `/golf-clubs/${c.slug}` }
      ])} />
      <JsonLd data={clubSchema} />
      <JsonLd data={clubFaqSchema(c.faqs)} />

      <section className="relative bg-[#062840]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-amber-300"><Lock className="h-3.5 w-3.5" /> Members-only club</div>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl text-amber-50 tracking-tight">{c.name}</h1>
          <p className="mt-4 max-w-2xl text-emerald-50/85 text-lg">{c.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-emerald-50/85">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-300" /> {c.location}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-amber-300" /> Founded {c.founded}</span>
            <span className="flex items-center gap-1.5"><Flag className="h-3.5 w-3.5 text-amber-300" /> {c.courseCount}</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-lg border border-emerald-900/15 bg-white">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-900/50"><DollarSign className="h-3 w-3" /> Initiation</div>
            <div className="mt-1 font-serif text-lg text-[#062840]">{c.membership.initiation}</div>
          </div>
          <div className="p-4 rounded-lg border border-emerald-900/15 bg-white">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-900/50"><Calendar className="h-3 w-3" /> Monthly dues</div>
            <div className="mt-1 font-serif text-lg text-[#062840]">{c.membership.monthlyDues}</div>
          </div>
          <div className="p-4 rounded-lg border border-emerald-900/15 bg-white">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-900/50"><Users className="h-3 w-3" /> Cap</div>
            <div className="mt-1 font-serif text-lg text-[#062840]">{c.membership.cap}</div>
          </div>
          <div className="p-4 rounded-lg border border-emerald-900/15 bg-white">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-900/50"><Lock className="h-3 w-3" /> Access</div>
            <div className="mt-1 font-serif text-lg text-[#062840]">{c.membership.type}</div>
          </div>
        </div>
        <p className="text-[11px] text-emerald-900/55 -mt-6 mb-4">Membership figures are based on publicly-reported industry sources and are subject to change. Verify current numbers directly with the club.</p>
        <MarketDisclaimer className="mb-10 !mt-0" />

        <article className="prose prose-emerald max-w-none">
          <h2>Overview</h2>
          <p>{c.overview}</p>

          <h2>The courses</h2>
          <ul>
            {c.courses.map(co => (
              <li key={co.name}><strong>{co.name}.</strong> {co.detail}</li>
            ))}
          </ul>

          <h2>Architects</h2>
          <ul>{c.architects.map(a => <li key={a}>{a}</li>)}</ul>

          <h2>Notable members</h2>
          <p>{c.notableMembers}</p>
        </article>
      </section>

      <section className="max-w-3xl mx-auto px-6">
      </section>

      {nearby.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="font-serif text-3xl text-[#062840]">Where members live</h2>
          <p className="mt-3 text-emerald-900/85">Because {c.name} has no on-site real estate, members live in nearby north-Scottsdale communities. These are the most common addresses:</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {nearby.map(n => (
              <Link key={n.slug} href={`/communities/${n.slug}`} className="group block p-5 rounded-lg border border-emerald-900/15 bg-white hover:border-amber-600/40 hover:shadow-md transition">
                <div className="font-serif text-xl text-[#062840] group-hover:text-amber-700">{n.name}</div>
                <div className="text-sm text-emerald-900/70 mt-1">{n.tagline}</div>
                <div className="mt-3 text-xs text-amber-700 font-semibold">Explore the community →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-serif text-3xl text-[#062840]">Frequently asked questions</h2>
        <div className="mt-6 space-y-5">
          {c.faqs.map((f, i) => (
            <div key={i} className="p-5 rounded-lg border border-emerald-900/15 bg-white">
              <div className="font-semibold text-[#062840]">{f.q}</div>
              <p className="mt-2 text-sm text-emerald-900/85">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-[#062840] text-amber-50 p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300">Concierge</div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl tracking-tight">Shopping for a home near {c.name}?</h2>
          <p className="mt-3 text-emerald-50/85 max-w-2xl">Tell us a little about your search and your timeline. We’ll send a private list of currently-available homes positioned for an easy drive to the club, plus an introduction to a current member who can sponsor your application.</p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </section>

      <RelatedContent pageType="community" community={c.nearbyNeighborhoods?.[0]} excludePath={`/golf-clubs/${c.slug}`} />
    </PageShell>
  );
}

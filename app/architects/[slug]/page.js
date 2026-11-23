import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/page-shell';
import ArchitectViewTracker from '@/components/architect-view-tracker';
import RelatedContent from '@/components/related-content';
import { SITE, ARCHITECTS, GOLF_CLUBS, COMMUNITIES, findArchitect, coursesByArchitect, clubHref } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, MapPin, Trophy } from 'lucide-react';

export async function generateStaticParams() {
  return ARCHITECTS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const a = findArchitect(params.slug);
  if (!a) return {};
  return {
    title: `${a.name}: Scottsdale Golf Course Designs`,
    description: `${a.name}'s Scottsdale-area golf course portfolio: courses designed, communities they anchor, and the design philosophy behind them.`,
    alternates: { canonical: `${SITE.url}/architects/${a.slug}` },
    openGraph: { url: `${SITE.url}/architects/${a.slug}`, images: [a.image] }
  };
}

export default function ArchitectDetail({ params }) {
  const a = findArchitect(params.slug);
  if (!a) return notFound();
  const courses = coursesByArchitect(a);

  // Resolve communities tied to this architect’s courses via clubSlug.
  const relatedClubSlugs = new Set(courses.map(c => c.clubSlug).filter(Boolean));
  const relatedClubs = GOLF_CLUBS.filter(c => relatedClubSlugs.has(c.slug));
  const relatedCommunities = COMMUNITIES.filter(c => relatedClubSlugs.has(c.slug));

  return (
    <PageShell>
      <ArchitectViewTracker slug={a.slug} name={a.name} courses={courses.length} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Architects', path: '/architects' },
        { name: a.name, path: `/architects/${a.slug}` }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: a.name,
        jobTitle: 'Golf Course Architect',
        url: `${SITE.url}/architects/${a.slug}`,
        image: a.image && a.image.startsWith('/') ? `${SITE.url}${a.image}` : a.image,
        description: a.summary,
        knowsAbout: ['Golf Course Architecture', 'Scottsdale, Arizona', 'Desert Course Design']
      }} />

      <section className="relative">
        <div className="absolute inset-0"><Image src={a.image} alt={a.name} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062840] via-[#062840]/85 to-[#062840]/40" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-amber-50">
          <Link href="/architects" className="inline-block text-xs uppercase tracking-[0.3em] text-amber-300 mb-4 hover:text-amber-100">&larr; All Architects</Link>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05]">{a.name}</h1>
          <p className="mt-5 text-amber-200/95 text-lg md:text-xl italic max-w-2xl">{a.tagline}</p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full border border-amber-300/40">{courses.length} Scottsdale-area courses</span>
            {a.born && <span className="text-xs px-3 py-1 rounded-full border border-amber-300/40">Born {a.born}</span>}
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-emerald">
        <h2 className="font-serif text-3xl text-[#062840] mb-4">Overview</h2>
        <p className="text-[#062840]/85 text-lg leading-relaxed">{a.summary}</p>
        <h2 className="font-serif text-3xl text-[#062840] mt-10 mb-3">Design Philosophy</h2>
        <p className="text-[#062840]/85 leading-relaxed italic">&ldquo;{a.designPhilosophy}&rdquo;</p>
        {a.notableCoursesGlobal?.length > 0 && (
          <>
            <h2 className="font-serif text-3xl text-[#062840] mt-10 mb-3">Notable Courses Outside Arizona</h2>
            <ul className="list-disc pl-6 text-[#062840]/85">
              {a.notableCoursesGlobal.map(c => <li key={c}>{c}</li>)}
            </ul>
          </>
        )}

        {/* Programmatic buyer-perspective editorial — visible to crawlers, useful to readers,
            and contributes 200–400 words of unique content to every architect page. */}
        <h2 className="font-serif text-3xl text-[#062840] mt-10 mb-3">What this means for Scottsdale homebuyers</h2>
        <p className="text-[#062840]/85 leading-relaxed">
          For buyers shopping the Scottsdale luxury market, a course architect&rsquo;s identity is more than a
          credential: it is a real predictor of how the home and community will feel day-to-day. The
          architect&rsquo;s routing decisions shape the lot layout. The bunker style and green complexity drive
          handicap-band suitability. The course&rsquo;s difficulty rating and walkability influence the demographic
          mix of the membership, which in turn influences resale velocity in the surrounding real estate.
          {a.name.split(' ')[0]}&rsquo;s Scottsdale work {courses.length === 1 ? 'is concentrated in a single project' : `spans ${courses.length} courses across the region`},
          which makes the buyer&rsquo;s evaluation cleaner than it would be for a generalist architect: you can study
          a contained body of work and form a sharper view on whether the design vocabulary matches your eye.
        </p>
        {relatedCommunities.length > 0 ? (
          <p className="text-[#062840]/85 leading-relaxed mt-4">
            The communities anchored by {a.name}&rsquo;s Scottsdale courses,
            {relatedCommunities.map(c => c.name).join(', ')}, share a discernible character that
            reflects the architect&rsquo;s sensibility: lot orientations that respect the natural movement of the
            land, view corridors that frame the desert rather than fight it, and a course-routing logic that
            shapes the daily walking and driving patterns of residents. Buyers who connect strongly with a
            specific architect&rsquo;s vocabulary often find that the right Scottsdale community is whichever one
            sits on that architect&rsquo;s most successful Arizona course. Use the community pages below to read
            the price tier, club model, HOA structure, and resale dynamics of each.
          </p>
        ) : (
          <p className="text-[#062840]/85 leading-relaxed mt-4">
            For buyers who connect strongly with {a.name}&rsquo;s sensibility, the next step is to study the
            specific Scottsdale courses bearing the architect&rsquo;s name above: visit the course in
            person if possible, walk a hole or two, and pay attention to how the routing aligns with the
            surrounding residential lots. Use the &ldquo;Other architects&rdquo; links below to compare design
            philosophies side by side. The strongest community fit is rarely the most famous course; it is the
            course whose architectural vocabulary most closely matches the way you actually want to use it.
          </p>
        )}
      </article>

      {/* Scottsdale portfolio */}
      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">Scottsdale Portfolio</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#062840]">{a.name} courses in Scottsdale</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {courses.map(c => (
              <div key={c.name} className="bg-white p-6 rounded-xl border border-[#062840]/10 shadow-sm">
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-[#BA9273] mt-1 shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-[#062840]">{c.name}</h3>
                    <div className="text-xs text-[#062840]/60 mt-1">{c.type} · Par {c.par} · {c.yardage.toLocaleString()} yds</div>
                    <p className="text-sm text-[#062840]/80 mt-3">{c.signature}</p>
                    {clubHref(c.clubSlug) && (
                      <Link href={clubHref(c.clubSlug)} className="mt-3 inline-flex items-center gap-1 text-xs text-[#BA9273] hover:text-[#062840]">
                        {clubHref(c.clubSlug).startsWith('/golf-clubs/') ? 'Club deep-dive' : 'Community guide'} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related communities */}
      {relatedCommunities.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">Live Where {a.name.split(' ')[0]} Built</div>
            <h2 className="font-serif text-4xl text-[#062840]">Communities anchored by {a.name} courses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedCommunities.map(c => (
              <Link key={c.slug} href={`/communities/${c.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[#062840]/10 hover:shadow-xl transition">
                <div className="aspect-[5/3] overflow-hidden relative"><Image src={c.image} alt={c.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#062840]">{c.name}</h3>
                  <p className="text-sm text-[#062840]/70 mt-1 line-clamp-2">{c.tagline}</p>
                  <div className="flex items-center gap-1 text-xs text-[#BA9273] mt-3"><MapPin className="h-3 w-3" /> {c.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Looking for a home on a {a.name} design?</h2>
          <p className="mt-3 text-emerald-50/75">Tell us which {a.name.split(' ')[0]} course matters most and we’ll route you to the right community pages and the local concierge specialist.</p>
          <Link href="/communities" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-6 py-3 text-sm font-semibold">Explore golf communities <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <RelatedContent
        pageType="architect"
        architect={a.slug}
        excludePath={`/architects/${a.slug}`}
      />
    </PageShell>
  );
}

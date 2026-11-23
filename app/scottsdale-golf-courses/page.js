import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, GOLF_COURSES, clubHref } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Flag, MapPin, Lock } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf Courses 2026 | 35+ Courses Ranked by Locals',
  description: 'A locals\u2019 guide to every notable golf course in Scottsdale: ultra-private, resort, daily-fee. Troon North, Grayhawk, TPC, Scottsdale National, Whisper Rock, Estancia, Desert Mountain and more.',
  alternates: { canonical: `${SITE.url}/scottsdale-golf-courses` },
  openGraph: { url: `${SITE.url}/scottsdale-golf-courses`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

function groupCourses() {
  const groups = { 'Ultra-private members-only': [], 'Resort & premium public': [], 'Private community clubs': [] };
  for (const c of GOLF_COURSES) {
    if (c.type.startsWith('Private (members-only)')) groups['Ultra-private members-only'].push(c);
    else if (c.type.startsWith('Private') || c.type.startsWith('Semi-private') || c.type.startsWith('Public (community')) groups['Private community clubs'].push(c);
    else groups['Resort & premium public'].push(c);
  }
  return groups;
}

export default function Page() {
  const groups = groupCourses();
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Scottsdale Golf Courses', path: '/scottsdale-golf-courses' }
      ])} />

      <section className="relative">
        <div className="absolute inset-0"><Image src="/images/pages/scottsdale-golf-courses.webp" alt="Aerial view of golf course in Scottsdale" className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062840]/55 to-[#062840]/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">2026 Course Guide</div>
          <h1 className="font-serif text-5xl md:text-6xl text-amber-50 tracking-tight">Every Notable Golf Course in Scottsdale</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/85 text-lg">Scottsdale is home to more than 200 golf courses within a 30-mile radius. These are the {GOLF_COURSES.length} that define the lifestyle: organized by who can play them and what they cost.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        {Object.entries(groups).map(([label, courses]) => courses.length === 0 ? null : (
          <div key={label}>
            <div className="flex items-baseline justify-between mb-5 border-b border-emerald-900/15 pb-3">
              <h2 className="font-serif text-3xl text-[#062840]">{label}</h2>
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-900/60">{courses.length} courses</span>
            </div>
            <div className="space-y-3">
              {courses.map((g) => {
                const targetHref = clubHref(g.clubSlug);
                const Wrap = ({ children }) => targetHref
                  ? <Link href={targetHref} className="block grid md:grid-cols-12 gap-4 items-center p-5 rounded-xl border border-emerald-900/10 bg-white hover:shadow-md hover:border-amber-600/40 transition">{children}</Link>
                  : <div className="grid md:grid-cols-12 gap-4 items-center p-5 rounded-xl border border-emerald-900/10 bg-white">{children}</div>;
                return (
                  <Wrap key={g.name}>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-xl text-[#062840]">{g.name}</h3>
                      <div className="text-xs text-emerald-900/60 mt-1">by {g.architect}</div>
                    </div>
                    <div className="md:col-span-3 text-sm text-emerald-900/85">
                      <div className="flex items-center gap-1.5"><Flag className="h-3.5 w-3.5 text-amber-600" /> Par {g.par} &middot; {g.yardage.toLocaleString()} yds</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {g.type.includes('Private') ? <Lock className="h-3.5 w-3.5 text-amber-600" /> : <MapPin className="h-3.5 w-3.5 text-amber-600" />}
                        {g.type}
                      </div>
                    </div>
                    <div className="md:col-span-4 text-xs italic text-emerald-900/70">&ldquo;{g.signature}&rdquo;</div>
                  </Wrap>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-[#062840] mb-4">Public, resort, or private, which fits you?</h2>
        <p className="text-emerald-900/85">Scottsdale offers a uniquely democratic golf scene. Top-100 courses like Troon North&rsquo;s Monument and Grayhawk&rsquo;s Raptor are open to the public year-round. Resort courses (TPC Scottsdale, Boulders, Phoenician, Camelback) are accessible with a stay or a daily fee. The true exclusives: <Link href="/golf-clubs/scottsdale-national" className="text-amber-700 hover:text-amber-800 underline">Scottsdale National</Link>, <Link href="/golf-clubs/whisper-rock" className="text-amber-700 hover:text-amber-800 underline">Whisper Rock</Link>, <Link href="/communities/estancia" className="text-amber-700 hover:text-amber-800 underline">Estancia</Link>, <Link href="/communities/desert-mountain" className="text-amber-700 hover:text-amber-800 underline">Desert Mountain</Link>, and <Link href="/communities/silverleaf" className="text-amber-700 hover:text-amber-800 underline">Silverleaf</Link>: remain members-only and typically require sponsorship.</p>
        <p className="text-emerald-900/85 mt-3">If your dream is to play different courses every weekend, base yourself near Grayhawk or Troon North where 12 top courses are within a 15-minute drive. If you want the same caddies and bartenders to know your name, target DC Ranch Country Club or Desert Mountain.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/communities" className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-7 py-3 text-sm font-semibold tracking-wide transition">See homes near these courses</Link>
          <Link href="/golf-clubs" className="inline-flex items-center gap-2 rounded-full border border-[#062840] hover:bg-emerald-50 text-[#062840] px-7 py-3 text-sm font-semibold tracking-wide transition">Private club membership guide</Link>
        </div>
      </section>
    </PageShell>
  );
}

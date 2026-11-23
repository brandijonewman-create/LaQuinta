import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE, GOLF_CLUBS } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Flag, Lock } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Private Golf Clubs Guide | Membership & Cost',
  description: 'A locals’ guide to Scottsdale’s most exclusive private golf clubs: Scottsdale National, Whisper Rock, and more. Membership costs, application process, and where members live.',
  alternates: { canonical: `${SITE.url}/golf-clubs` },
  openGraph: { url: `${SITE.url}/golf-clubs`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Private Golf Clubs', path: '/golf-clubs' }
      ])} />

      <section className="relative bg-[#062840]">
        <div className="absolute inset-0 opacity-30"><Image src="/images/pages/golf-clubs.webp" alt="" className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062840]/70 to-[#062840]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Members-Only Guide</div>
          <h1 className="font-serif text-4xl md:text-6xl text-amber-50 tracking-tight">Scottsdale’s Private Golf Clubs</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/85 text-lg">The most prestigious clubs in north Scottsdale don’t have homes inside them: their members live in nearby communities. Here’s what it actually costs to join, how to get in, and where to live to make the commute effortless.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8">
        {GOLF_CLUBS.map(club => (
          <Link key={club.slug} href={`/golf-clubs/${club.slug}`} className="group block rounded-xl border border-emerald-900/15 bg-white p-7 hover:shadow-lg hover:border-amber-600/40 transition">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-amber-700"><Lock className="h-3.5 w-3.5" /> Members-only</div>
            <h2 className="mt-3 font-serif text-3xl text-[#062840] group-hover:text-amber-700 transition">{club.name}</h2>
            <p className="mt-2 text-emerald-900/80">{club.tagline}</p>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-[10px] uppercase tracking-wider text-emerald-900/50">Initiation</div><div className="font-semibold text-[#062840]">{club.membership.initiation}</div></div>
              <div><div className="text-[10px] uppercase tracking-wider text-emerald-900/50">Courses</div><div className="font-semibold text-[#062840]">{club.courseCount}</div></div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-700"><Flag className="h-3.5 w-3.5" /> Read the full club guide →</div>
          </Link>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-12">
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-[#062840]">Why these clubs have no homes</h2>
        <p className="mt-4 text-emerald-900/85">The most coveted private clubs in north Scottsdale: Scottsdale National, Whisper Rock, Estancia’s sister-style golf-only purity, were intentionally built without on-site residential development. The founders’ thesis was simple: real estate distracts from the golf. Members live nearby instead, typically in Mirabel, Desert Mountain, Estancia, or custom estates in 85262/85266.</p>
        <p className="mt-3 text-emerald-900/85">If your goal is membership at one of these clubs, your home search is best framed around proximity: a 7-minute drive to the gate, not a view of the 18th green. We help prospective members identify homes positioned for the lifestyle they’re actually buying into.</p>
        <div className="mt-8">
          <Link href="/communities" className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-7 py-3 text-sm font-semibold tracking-wide transition">Explore north Scottsdale communities</Link>
        </div>
      </section>
    </PageShell>
  );
}

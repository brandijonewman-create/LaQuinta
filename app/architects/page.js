import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import ArchitectCardLink from '@/components/architect-card-link';
import { SITE, ARCHITECTS, coursesByArchitect } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Scottsdale Golf Course Architects | All 14 Profiled',
  description: 'A guide to the eight golf course architects who designed Scottsdale’s most acclaimed courses: Tom Fazio, Jack Nicklaus, Tom Weiskopf, Phil Mickelson, Coore & Crenshaw, Scott Miller, Jay Morrish, and Gary Panks.',
  alternates: { canonical: `${SITE.url}/architects` },
  openGraph: { url: `${SITE.url}/architects`, title: 'Scottsdale Golf Course Architects', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function ArchitectsIndex() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Architects', path: '/architects' }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Scottsdale Golf Course Architects',
        itemListElement: ARCHITECTS.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.url}/architects/${a.slug}`,
          name: a.name
        }))
      }} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Course Architects</div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">The 8 architects who shaped Scottsdale golf.</h1>
          <p className="mt-6 text-emerald-50/80 text-lg max-w-3xl">
            Every great Scottsdale golf community traces its DNA back to one of these eight designers. Use this guide to
            connect the architect signature you love: minimalist Coore-Crenshaw walkability, dramatic Weiskopf
            risk/reward, Nicklaus member-first routings: to the residential communities built around their courses.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        {ARCHITECTS.map((a, idx) => {
          const courses = coursesByArchitect(a);
          return (
            <ArchitectCardLink key={a.slug} slug={a.slug} name={a.name} position={idx + 1} className="group bg-white rounded-2xl overflow-hidden border border-[#062840]/10 shadow-sm hover:shadow-2xl transition-all">
              <div className="aspect-[16/7] overflow-hidden relative"><Image src={a.image} alt={a.name} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-7">
                <h2 className="font-serif text-3xl text-[#062840] group-hover:text-[#BA9273] transition">{a.name}</h2>
                <p className="text-sm text-[#062840]/65 mt-2 italic">{a.tagline}</p>
                <div className="mt-5 text-xs uppercase tracking-wider text-[#BA9273]">Scottsdale-area portfolio</div>
                <ul className="mt-2 space-y-1.5 text-sm text-[#062840]/85">
                  {courses.slice(0, 4).map(c => (
                    <li key={c.name} className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-1 text-[#BA9273] shrink-0" /> {c.name}</li>
                  ))}
                  {courses.length > 4 && <li className="text-[#BA9273] italic text-xs">+ {courses.length - 4} more</li>}
                </ul>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-[#062840] group-hover:text-[#BA9273] transition">Read full architect profile <ArrowRight className="h-3.5 w-3.5" /></div>
              </div>
            </ArchitectCardLink>
          );
        })}
      </section>
    </PageShell>
  );
}

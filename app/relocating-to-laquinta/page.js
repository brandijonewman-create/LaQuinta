import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Plane, GraduationCap, Sun, Heart, ShoppingBag, Banknote, Trees, ChevronRight } from 'lucide-react';

export const metadata = {
  robots: { index: false, follow: true },
  title: 'Relocating to Scottsdale, AZ | Insider’s 2026 Moving Guide',
  description: 'Thinking of moving to Scottsdale? Your complete 2026 relocation guide: neighborhoods, schools, weather, taxes, healthcare, golf and the lifestyle.',
  alternates: { canonical: `${SITE.url}/relocating-to-scottsdale` },
  openGraph: { url: `${SITE.url}/relocating-to-scottsdale`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

const facts = [
  { icon: Sun, label: 'Sunshine', val: '299 days/year' },
  { icon: Plane, label: 'PHX airport', val: '25 min' },
  { icon: GraduationCap, label: 'Top schools', val: 'A+ rated district' },
  { icon: Banknote, label: 'State income tax', val: '2.5% flat' },
  { icon: Heart, label: 'Mayo Clinic', val: 'on the AZ-101' },
  { icon: ShoppingBag, label: 'Scottsdale Quarter', val: '10 min' },
  { icon: Trees, label: 'Preserved desert', val: '30,000+ acres' }
];

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Relocating to Scottsdale', path: '/relocating-to-laquinta' }
      ])} />

      <section className="relative">
        <div className="absolute inset-0"><Image src="/images/pages/relocating-to-scottsdale.webp" alt="Arizona desert landscape" className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062840]/65 to-[#062840]/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">Relocation Guide</div>
          <h1 className="font-serif text-5xl md:text-6xl text-amber-50 tracking-tight">Relocating to Scottsdale</h1>
          <p className="mt-5 max-w-2xl text-emerald-50/85 text-lg">Everything golfers, retirees, remote-workers and growing families need to know about making the move to Scottsdale, Arizona in 2026.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {facts.map((f, i) => (
            <div key={i} className="rounded-xl border border-emerald-900/10 bg-white p-5">
              <f.icon className="h-6 w-6 text-amber-600 mb-3" />
              <div className="text-xs uppercase tracking-wider text-emerald-900/60">{f.label}</div>
              <div className="font-serif text-xl text-[#062840]">{f.val}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10 space-y-10">
        <div>
          <h2 className="font-serif text-3xl text-[#062840] mb-3">Why people are moving to Scottsdale in 2026</h2>
          <p className="text-emerald-900/85">Scottsdale continues to be one of the fastest-growing premium destinations in the American Southwest. The combination of 299 days of sunshine, Arizona&rsquo;s 2.5% flat income tax, world-class golf, Mayo Clinic-anchored healthcare and a thriving North Scottsdale tech corridor has attracted a steady stream of California, Pacific Northwest and Midwest transplants over the last five years.</p>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-[#062840] mb-3">Choosing the right neighborhood</h2>
          <p className="text-emerald-900/85">Scottsdale is geographically long: it spans 31 miles north to south. Most luxury buyers focus on three distinct zones:</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3"><ChevronRight className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" /><span><strong className="text-[#062840]">North Scottsdale (85255, 85262):</strong> Home to Grayhawk, DC Ranch, Troon North, Silverleaf and the Boulders. The center of gravity for premier golf real estate.</span></li>
            <li className="flex gap-3"><ChevronRight className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" /><span><strong className="text-[#062840]">Central Scottsdale (85251, 85253):</strong> Walkable Old Town, Paradise Valley adjacency, mid-century modern and Gainey Ranch. More urban feel.</span></li>
            <li className="flex gap-3"><ChevronRight className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" /><span><strong className="text-[#062840]">South Scottsdale:</strong> Closer to ASU and downtown Phoenix, lower price points, increasingly hip dining and breweries.</span></li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-[#062840] mb-3">Schools, healthcare &amp; daily life</h2>
          <p className="text-emerald-900/85">Scottsdale Unified School District is rated A+ overall. The North Scottsdale corridor is anchored by BASIS Scottsdale, Pinnacle High and Notre Dame Prep: consistently among Arizona&rsquo;s top-performing schools. Healthcare is anchored by the Mayo Clinic&rsquo;s 250-acre Scottsdale campus, with HonorHealth Shea and HonorHealth Thompson Peak nearby.</p>
        </div>


        <div>
          <h2 className="font-serif text-3xl text-[#062840] mb-3">Taxes &amp; cost of living</h2>
          <p className="text-emerald-900/85">Arizona enacted a 2.5% flat state income tax in 2023, making it one of the most tax-friendly states for high earners. Property tax is moderate (~0.62% effective rate). There is no state estate or inheritance tax. Sales tax in Scottsdale is 8.05%.</p>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-[#062840] mb-3">When to visit before you buy</h2>
          <p className="text-emerald-900/85">Most relocating buyers fly in twice: once in February (peak season, perfect weather, Phoenix Open energy) and once in July (the brutal honesty test, if you love it in 112&deg;F summer, you&rsquo;ll love it year-round).</p>
        </div>
      </section>

      <section className="bg-[#062840] text-amber-50 mt-10">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-4xl mb-4">Plan your move with a Scottsdale specialist</h2>
          <p className="text-emerald-50/75 max-w-xl mx-auto mb-8">We&rsquo;ll arrange a private 3-day tour covering golf, neighborhoods, schools and clubs: tailored to your priorities.</p>
          <Link href="/communities" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3 text-sm font-semibold tracking-wide transition">Browse communities</Link>
        </div>
      </section>
    </PageShell>
  );
}

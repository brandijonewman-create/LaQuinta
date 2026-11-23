import Link from 'next/link';
import PageShell from '@/components/page-shell';
import { Home, Search, MapPin, BookOpen } from 'lucide-react';

// Per AdSense policy, this page intentionally contains NO ad slots.
// Custom 404 also improves UX and prevents thin/error-only pages from being indexed.
export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">404</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">This green isn&rsquo;t on our scorecard.</h1>
          <p className="mt-6 max-w-xl mx-auto text-emerald-50/85 text-lg leading-relaxed">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get you somewhere useful.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-6 py-3 text-sm font-semibold transition">
              <Home className="h-4 w-4" /> Back to home
            </Link>
            <Link href="/communities" className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 text-amber-100 hover:bg-amber-300 hover:text-[#062840] px-6 py-3 text-sm font-semibold transition">
              <MapPin className="h-4 w-4" /> Browse golf communities
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-serif text-2xl text-[#062840] mb-6 text-center">Popular destinations</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/homes-for-sale/under-1m',  title: 'Homes Under $1M',     icon: Search },
            { href: '/homes-for-sale/1m-to-3m',  title: 'Homes $1M\u2013$3M', icon: Search },
            { href: '/relocating-to-laquinta', title: 'Relocating Guide',    icon: BookOpen },
            { href: '/guides/scottsdale-buyers-guide-2026', title: 'Free Buyer\u2019s Guide PDF', icon: BookOpen }
          ].map(({ href, title, icon: Icon }) => (
            <Link key={href} href={href} className="group block bg-white border border-emerald-900/10 hover:border-amber-300 hover:shadow rounded-xl p-5 transition">
              <Icon className="h-5 w-5 text-amber-600 mb-2" />
              <div className="font-serif text-[#062840] group-hover:text-amber-700 transition">{title}</div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

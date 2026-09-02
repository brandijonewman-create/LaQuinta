import Link from 'next/link';
import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { communities } from '@/lib/site-config';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'La Quinta Golf Clubs',
  description: 'An index of the six private golf clubs of La Quinta, California, plus notes on the resort and daily-fee options.',
  alternates: { canonical: '/golf-clubs' },
};

export default function GolfClubsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Golf Clubs"
        title="The six private clubs of La Quinta."
        subtitle="Private membership clubs are the heart of La Quinta golf. Public and resort access lives elsewhere in the city — we&rsquo;ll cover both."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Golf Clubs' }]} />
        <div className="editorial-eyebrow mt-10 mb-5"><span className="editorial-rule" />Private (Member-Only)</div>
        <ul className="divide-y divide-border border-y border-border">
          {communities.map((c) => (
            <li key={c.slug}>
              <Link href={`/communities/${c.slug}`} className="group flex items-center justify-between py-5 hover:bg-sand-50 px-3 -mx-3 transition-colors">
                <div>
                  <div className="font-serif text-2xl text-palm group-hover:text-terracotta transition-colors">{c.name}</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-foreground/55 mt-1">
                    {c.architect || 'La Quinta'}
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-foreground/40 group-hover:text-palm" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="editorial-eyebrow mt-14 mb-5"><span className="editorial-rule" />Resort &amp; Public Access</div>
        <div className="bg-sand-50 border border-border p-8">
          <p className="text-foreground/75 leading-relaxed">
            Coverage of the La Quinta Resort courses (Mountain, Dunes, Citrus) and any public-access options inside city limits is in development. Resort-course profiles ship in the full profile.
          </p>
        </div>
      </section>
    </>
  );
}

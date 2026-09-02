// Server-rendered banner shown at the top and bottom of any Property Spotlight
// page flagged as a sample. Makes it impossible for a visitor to mistake the
// article for a real listing.
//
// Since the site now has a signed Exclusive Market Partner (Kathy Schowe)
// for La Quinta, this banner points visitors to her instead of soliciting
// realtor applications. The /collaborate page still exists for realtors
// interested in the same partnership in a DIFFERENT city.

import Link from 'next/link';
import { Info, ArrowUpRight } from 'lucide-react';
import { partner } from '@/lib/exclusive-partner';

export default function SampleBanner({ variant = 'top' }) {
  if (variant === 'bottom') {
    return (
      <aside className="mt-16 bg-palm text-sand-50 p-6 md:p-8 rounded-lg">
        <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
          This is a sample Property Spotlight
        </div>
        <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-3">
          Real Property Spotlights for La Quinta homes route directly to {partner.displayName}, our Exclusive Market Partner.
        </h3>
        <p className="text-sand-50/80 text-sm md:text-base leading-relaxed max-w-2xl">
          Editorial coverage on this site is co-branded with Kathy. Every lead generated through a Property Spotlight is routed to her directly \u2014 no round-robin, no competing names.
        </p>
        <Link
          href="/#meet-kathy"
          className="mt-6 inline-flex items-center gap-2 bg-gold text-palm font-semibold tracking-[0.18em] uppercase text-xs px-7 py-3.5 hover:bg-gold/90 transition-colors"
        >
          Meet {partner.displayName} <ArrowUpRight size={14} />
        </Link>
      </aside>
    );
  }

  // Top variant — slim, attention-grabbing, immediately above the article hero.
  return (
    <div className="bg-gold/15 border-y border-gold/30">
      <div className="container py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
        <div className="flex items-start md:items-center gap-2.5 text-palm">
          <Info size={16} className="shrink-0 mt-0.5 md:mt-0 text-gold-dark" />
          <span>
            <strong className="font-semibold">Sample Property Spotlight.</strong>{' '}
            <span className="text-palm/85">
              Example of the editorial coverage every La Quinta listing receives, co-branded with {partner.displayName}.
            </span>
          </span>
        </div>
        <Link
          href="/#meet-kathy"
          className="text-[11px] uppercase tracking-[0.22em] text-terracotta hover:text-palm whitespace-nowrap inline-flex items-center gap-1"
        >
          Meet {partner.displayName} <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}

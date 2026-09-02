import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { architects } from '@/lib/site-config';

// Short Palm-Beach-style editorial intro block. Replaces the previous pull-
// quote on the homepage with a calm, scannable lead-in. No quote, no byline.
export default function IntroBlock() {
  return (
    <section className="bg-sand-50 border-y border-border">
      <div className="container py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
            From the Journal
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-palm leading-[1.1]">
            A reference for serious buyers of the La Quinta golf life.
          </h2>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed mt-6">
            From the Fazio routings of The Madison Club and The Quarry to the Pete Dye course at The Hideaway and Arnold Palmer&rsquo;s only Coachella Valley design at The Tradition, La Quinta holds one of the deepest concentrations of championship private golf on the West Coast. We document each community &mdash; its architect, its character, the lifestyle around it &mdash; so you can decide where you belong before you ever step onto a property.
          </p>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed mt-5">
            This publication does not sell homes or list inventory. Every buyer inquiry is routed to Kathy Schowe, our Exclusive Market Partner and a California-licensed real estate professional based in La Quinta.
          </p>
        </div>
      </div>
    </section>
  );
}

// Architects preview row — text intro + 8 architect chips. Mirrors the
// "The Architects" pattern from sister sites in the network.
export function ArchitectsPreview() {
  return (
    <section className="container py-20 lg:py-24">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start mb-12">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
            The Architects
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-palm leading-[1.1]">
            The hands that shaped La Quinta golf.
          </h2>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed mt-5">
            Pete Dye built the Stadium. Fazio laid out Madison and The Quarry. Nicklaus, Norman, Weiskopf, and Palmer each left a signature on this valley. Rees Jones drew Andalusia. Read the dedicated guide for every architect with a course in La Quinta.
          </p>
          <Link
            href="/architects"
            className="mt-6 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.22em] text-palm hover:text-terracotta transition-colors"
          >
            View all architects <ArrowUpRight size={14} />
          </Link>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
          {architects.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/architects/${a.slug}`}
                className="group block border border-border hover:border-palm bg-white rounded-lg p-4 transition-colors"
              >
                <div className="font-serif text-lg text-palm leading-tight">{a.name}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-terracotta mt-2 inline-flex items-center gap-1 group-hover:text-palm transition-colors">
                  Read profile <ArrowUpRight size={11} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

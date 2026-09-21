import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

// The seven La Quinta golf communities profiled on the site. Price bands
// are indicative MLS observation ranges only — wide brackets used
// deliberately, not guarantees.
const communities = [
  {
    slug: 'the-madison-club',
    name: 'The Madison Club',
    architect: 'Tom Fazio',
    priceRange: '$4M – $30M+',
    image: '/images/communities/the-madison-club.jpg',
    blurb: 'La Quinta\u2019s most discreet ultra-luxury enclave behind a Fazio routing.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'the-hideaway',
    name: 'The Hideaway',
    architect: 'Pete Dye & Clive Clark',
    priceRange: '$2M – $10M',
    image: '/images/communities/the-hideaway.jpg',
    blurb: 'Two cohesive courses behind a single gate \u2014 one of La Quinta\u2019s tightest.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'pga-west',
    name: 'PGA West',
    architect: 'Dye, Nicklaus, Norman & Weiskopf',
    priceRange: '$500K – $15M+',
    image: '/images/communities/pga-west.jpg',
    blurb: 'Six courses, four architects, and La Quinta\u2019s widest price band \u2014 condos to estates behind one master-planned gate.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'andalusia-country-club',
    name: 'Andalusia Country Club',
    architect: 'Rees Jones',
    priceRange: '$1.4M – $6M',
    image: '/images/communities/andalusia-country-club.jpg',
    blurb: 'Newer Rees Jones design at La Quinta\u2019s southern edge with big mountain views.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'the-tradition-golf-club',
    name: 'The Tradition Golf Club',
    architect: 'Arnold Palmer',
    priceRange: '$2M – $12M',
    image: '/images/communities/the-tradition-golf-club.jpg',
    blurb: 'Palmer\u2019s only Coachella Valley design \u2014 mature, quiet, tightly held.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'la-quinta-country-club',
    name: 'La Quinta Country Club',
    architect: 'Lawrence Hughes (1959)',
    priceRange: '$700K – $4M',
    image: '/images/communities/la-quinta-country-club.jpg',
    blurb: 'The original La Quinta club \u2014 walking distance to the resort and the Cove.',
    zip: 'La Quinta, CA 92253',
  },
  {
    slug: 'the-quarry-at-la-quinta',
    name: 'The Quarry at La Quinta',
    architect: 'Tom Fazio',
    priceRange: '$3M – $15M',
    image: '/images/communities/the-quarry-at-la-quinta.jpg',
    blurb: 'A second Fazio routing on a dramatic granite-quarry site \u2014 one of the smallest memberships in the valley.',
    zip: 'La Quinta, CA 92253',
  },
];

export default function FeaturedCommunities() {
  return (
    <section className="container py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-2">
            Signature Communities
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
            Where La Quinta plays.
          </h2>
          <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
            A community-by-community lifestyle guide &mdash; their architects,
            their price bands, and the character of daily life inside each gate.
            Current listings and private tours are arranged by a licensed
            California real-estate professional.
          </p>
        </div>
        <Link
          href="/communities"
          className="hidden lg:inline-flex items-center gap-1 text-sm text-palm hover:text-terracotta transition-colors"
        >
          View all communities <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((c) => (
          <Link
            key={c.slug}
            href={`/communities/${c.slug}`}
            className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl border border-palm/10 transition-all"
          >
            <div className="aspect-[5/4] overflow-hidden bg-sand-100">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2 gap-3">
                <h3 className="font-serif text-2xl text-palm leading-tight">{c.name}</h3>
                <span className="text-xs text-gold-dark whitespace-nowrap font-medium">{c.priceRange}</span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 mb-3">
                {c.architect}
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed line-clamp-2">
                {c.blurb}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-palm/60 mt-4">
                <MapPin size={12} /> {c.zip}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center lg:hidden">
        <Link
          href="/communities"
          className="inline-flex items-center gap-1 text-sm text-palm"
        >
          View all communities <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

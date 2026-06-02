import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const featured = [
  {
    slug: 'the-madison-club',
    name: 'The Madison Club',
    city: 'La Quinta',
    architect: 'Tom Fazio',
    image: 'https://images.pexels.com/photos/14869685/pexels-photo-14869685.jpeg',
    blurb:
      'A private Fazio routing widely regarded as the valley’s most discreet luxury enclave.',
  },
  {
    slug: 'pga-west',
    name: 'PGA West',
    city: 'La Quinta',
    architect: 'Dye · Nicklaus · Norman · Weiskopf',
    image: 'https://images.pexels.com/photos/8334036/pexels-photo-8334036.jpeg',
    blurb:
      'Six championship courses, a long PGA Tour history, and a deep bench of homes and condos at every price band.',
  },
  {
    slug: 'bighorn-golf-club',
    name: 'BIGHORN Golf Club',
    city: 'Palm Desert',
    architect: 'Fazio · Arthur Hills',
    image: 'https://images.unsplash.com/photo-1621881806763-1b8128f374a7',
    blurb:
      'Hillside fairways pressed into the Santa Rosas — Mountains and Canyons — and architecture that follows the contour.',
  },
  {
    slug: 'stone-eagle',
    name: 'Stone Eagle',
    city: 'Palm Desert',
    architect: 'Tom Doak',
    image: 'https://images.pexels.com/photos/8065818/pexels-photo-8065818.jpeg',
    blurb:
      'A minimalist Doak design on a dramatic Palm Desert hillside, with one of the smallest, most private memberships in the valley.',
  },
  {
    slug: 'indian-wells-country-club',
    name: 'Indian Wells Country Club',
    city: 'Indian Wells',
    architect: 'Eddie Susalla (historic)',
    image: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da',
    blurb:
      'Walk-of-Champions heritage, mature landscaping, and a deep mid-century footprint just off El Paseo.',
  },
  {
    slug: 'mission-hills-country-club',
    name: 'Mission Hills Country Club',
    city: 'Rancho Mirage',
    architect: 'Pete Dye · Ted Robinson Sr.',
    image: 'https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg',
    blurb:
      'Home of the former Dinah Shore / ANA Inspiration major and a sprawling, multi-club community across the valley floor.',
  },
];

export default function FeaturedCommunities() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">
            <span className="editorial-rule" />
            Signature Communities
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
            The clubs that define the desert.
          </h2>
          <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
            Deep editorial profiles of the Coachella Valley’s most influential private
            golf communities — their architects, their character, and what it actually
            feels like to live there.
          </p>
        </div>
        <Link
          href="/communities"
          className="hidden lg:inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-palm hover:text-terracotta transition-colors"
        >
          All Communities <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {featured.map((c) => (
          <Link
            key={c.slug}
            href={`/communities/${c.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.28em] text-gold bg-ink/40 backdrop-blur-sm px-3 py-1.5">
                {c.city}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-serif text-2xl text-white">{c.name}</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-sand-50/80 mt-1">
                  {c.architect}
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mt-4">{c.blurb}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta group-hover:text-palm transition-colors">
              Read profile <ArrowUpRight size={13} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 lg:hidden">
        <Link
          href="/communities"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-palm"
        >
          All Communities <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

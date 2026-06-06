import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const featured = [
  {
    slug: 'the-madison-club',
    name: 'The Madison Club',
    architect: 'Tom Fazio',
    image: 'https://images.pexels.com/photos/14869677/pexels-photo-14869677.jpeg',
    credit: 'Lifestyle photo · Pexels',
    blurb:
      'A private Fazio routing widely regarded as La Quinta\u2019s most discreet luxury enclave.',
  },
  {
    slug: 'pga-west',
    name: 'PGA West',
    architect: 'Dye · Nicklaus · Norman · Weiskopf',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/La_Quinta%2C_California_%2815656391455%29.jpg',
    credit: 'Photo: Ken Lund, CC BY-SA 2.0 via Wikimedia Commons',
    blurb:
      'Six championship courses, a long PGA Tour history, and a deep bench of homes and condos at every price band.',
  },
  {
    slug: 'the-hideaway',
    name: 'The Hideaway',
    architect: 'Pete Dye & Clive Clark',
    image: 'https://images.pexels.com/photos/8334036/pexels-photo-8334036.jpeg',
    credit: 'Lifestyle photo · Pexels',
    blurb:
      'Two distinct courses behind a single gate &mdash; one of La Quinta\u2019s most architecturally cohesive private communities.',
  },
  {
    slug: 'andalusia-country-club',
    name: 'Andalusia Country Club',
    architect: 'Rees Jones',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Andalusia_Country_Club_2023.jpg',
    credit: 'Photo via Wikimedia Commons',
    blurb:
      'A newer Rees Jones design at the southern edge of La Quinta &mdash; modern Spanish architecture and big mountain views.',
  },
  {
    slug: 'the-tradition-golf-club',
    name: 'The Tradition Golf Club',
    architect: 'Arnold Palmer',
    image: 'https://images.pexels.com/photos/8065818/pexels-photo-8065818.jpeg',
    credit: 'Lifestyle photo · Pexels',
    blurb:
      'Palmer\u2019s only Coachella Valley design, set against the cove with quiet, mature streets and tight membership.',
  },
  {
    slug: 'la-quinta-country-club',
    name: 'La Quinta Country Club',
    architect: 'Lawrence Hughes (historic)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/La_Quinta_Country_Club.jpg',
    credit: 'Photo: Supermac1961, CC BY 2.0 via Wikimedia Commons',
    blurb:
      'The original La Quinta club &mdash; founded 1959, walking distance to the La Quinta Resort and the Cove.',
  },
];

export default function FeaturedCommunities() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">
            <span className="editorial-rule" />
            Private Clubs
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
            The clubs that define La Quinta.
          </h2>
          <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
            An honest look at La Quinta&apos;s seven private golf communities &mdash;
            their architects, their character, and what it actually feels like to
            live there.
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
          <div key={c.slug} className="group block">
            <Link href={`/communities/${c.slug}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.28em] text-gold bg-ink/40 backdrop-blur-sm px-3 py-1.5">
                  La Quinta
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-serif text-2xl text-white">{c.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-sand-50/80 mt-1">
                    {c.architect}
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.16em] text-foreground/40 mt-2">
              {c.credit}
            </p>
            <p
              className="text-sm text-foreground/70 leading-relaxed mt-3"
              dangerouslySetInnerHTML={{ __html: c.blurb }}
            />
            <Link
              href={`/communities/${c.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta group-hover:text-palm transition-colors"
            >
              Read profile <ArrowUpRight size={13} />
            </Link>
          </div>
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

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const pillars = [
  {
    eyebrow: 'The Architects',
    title: 'Pete Dye, Tom Fazio, Arnold Palmer, and the routings that shaped La Quinta.',
    href: '/architects',
    image: 'https://images.pexels.com/photos/8334036/pexels-photo-8334036.jpeg',
  },
  {
    eyebrow: 'The Map',
    title: 'An interactive lifestyle map &mdash; clubs, neighborhoods, hiking, and Old Town.',
    href: '/desert-lifestyle-map',
    image: 'https://images.unsplash.com/photo-1621881806763-1b8128f374a7',
  },
  {
    eyebrow: 'The Guides',
    title: 'Long-form guides &mdash; starting with the 2026 La Quinta Buyer&rsquo;s Guide.',
    href: '/guides',
    image: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da',
  },
];

export default function LifestylePreview() {
  return (
    <section className="container py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <div className="editorial-eyebrow mb-4">
          <span className="editorial-rule" />
          On the Site
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-palm leading-[1.05]">
          More than fairways.
        </h2>
        <p className="text-foreground/70 mt-5 text-base md:text-lg leading-relaxed">
          La Quinta is a story about water, design, and a winter sun that built a
          century of architecture. We cover all three.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group relative block aspect-[3/4] overflow-hidden bg-sand-100"
          >
            <img
              src={p.image}
              alt={p.eyebrow}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
            <div className="absolute inset-0 p-7 lg:p-8 flex flex-col justify-end text-white">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold mb-3">
                {p.eyebrow}
              </div>
              <div
                className="font-serif text-2xl lg:text-[26px] leading-[1.2]"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-sand-50/90 group-hover:text-gold transition-colors">
                Enter <ArrowUpRight size={13} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

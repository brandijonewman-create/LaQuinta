import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { partner } from '@/lib/exclusive-partner';

const stats = [
  { value: '7',  label: 'Private clubs' },
  { value: '13', label: 'Golf courses' },
  { value: '7',  label: 'Course architects' },
];

const resources = [
  {
    title: 'The La Quinta Community Index',
    blurb: 'A comparative lifestyle guide to all seven private golf communities — architecture, membership style, and daily character.',
    href: '/communities',
    cta: 'Read the index',
  },
  {
    title: 'The Course Architects',
    blurb: 'Dye, Fazio, Nicklaus, Palmer, Norman, Weiskopf, Rees Jones. Meet the designers behind every great La Quinta course — and where they built.',
    href: '/architects',
    cta: 'Meet the architects',
  },
  {
    title: 'Find Your Match (2-min quiz)',
    blurb: 'Five questions about your budget, golf style, and lifestyle. We match you to your top three La Quinta communities.',
    href: '/community-quiz',
    cta: 'Take the quiz',
  },
];

export function StatsRow() {
  return (
    <section className="border-y border-border bg-sand-50">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-3 gap-y-8 gap-x-6 text-center max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl md:text-5xl text-palm leading-none">{s.value}</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60 mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourcesRow() {
  return (
    <section className="container py-20 lg:py-24">
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group block bg-white border border-border p-7 hover:border-palm transition-colors"
          >
            <div className="font-serif text-xl text-palm leading-tight mb-3">{r.title}</div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-5">{r.blurb}</p>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-terracotta group-hover:text-palm transition-colors">
              {r.cta} <ArrowUpRight size={13} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FeaturedRealtorSlot() {
  return (
    <section id="meet-kathy" className="bg-palm text-sand-50">
      <div className="container py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* Portrait side */}
          <div className="flex flex-col items-start">
            <div className="w-full max-w-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.headshot.src}
                alt={partner.headshot.alt}
                className="w-full aspect-[4/5] object-cover border-4 border-gold/70 shadow-2xl"
              />
            </div>
            <div className="mt-6 space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold">Exclusive Market Partner · La Quinta</div>
              <div className="font-serif text-3xl md:text-4xl leading-tight text-sand-50">{partner.displayName}</div>
              <div className="text-sm text-sand-50/70">{partner.brokerage.name} · CA DRE #{partner.dreLicense}</div>
            </div>
          </div>

          {/* Copy side */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-4">Meet Your La Quinta Market Partner</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-6">
              Listings, private tours, and buyer representation from <span className="text-gold">{partner.displayName}.</span>
            </h2>
            <div className="space-y-4 text-sand-50/85 text-base leading-relaxed max-w-xl">
              <p>{partner.bioShort}</p>
              <p>
                We&rsquo;re a lifestyle guide to La Quinta&rsquo;s golf communities; Kathy is the licensed real estate professional. As the site&rsquo;s single Exclusive Market Partner, every showing request, off-market inquiry, and community introduction goes directly to her. No round-robin. No competing names.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div className="border-l border-gold/40 pl-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-gold/90">Direct</div>
                <a href={`tel:${partner.contact.phoneTel}`} className="font-serif text-xl text-sand-50 hover:text-gold transition-colors block mt-1">
                  {partner.contact.phone}
                </a>
              </div>
              <div className="border-l border-gold/40 pl-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-gold/90">Office</div>
                <div className="text-sm text-sand-50/85 mt-1 leading-snug">{partner.brokerage.address}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={partner.scheduler.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-palm font-semibold tracking-[0.18em] uppercase text-xs px-7 py-4 hover:bg-gold/90 transition-colors"
              >
                Connect with Kathy <ArrowUpRight size={15} />
              </a>
              <Link
                href="/community-quiz"
                className="inline-flex items-center gap-2 border border-gold/60 text-gold tracking-[0.18em] uppercase text-xs px-7 py-4 hover:bg-gold/15 transition-colors"
              >
                Take the Community-Fit Quiz <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

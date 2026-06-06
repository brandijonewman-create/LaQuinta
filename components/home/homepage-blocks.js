import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '14', label: 'Golf communities' },
  { value: '22', label: 'Golf courses' },
  { value: '5', label: 'Course architects' },
];

const resources = [
  {
    title: 'The La Quinta Community Index',
    blurb: 'An honest tier ranking of all seven private golf communities — from ultra-prestige to mid-market sleeper.',
    href: '/communities',
    cta: 'Read the index',
  },
  {
    title: 'The Course Architects',
    blurb: 'Dye, Nicklaus, Fazio, Palmer, Rees Jones. Meet the designers behind every great La Quinta course — and where they built.',
    href: '/architects',
    cta: 'Meet the architects',
  },
  {
    title: 'Find Your Match (2-min quiz)',
    blurb: 'Five questions about your budget, golf style, and lifestyle. We match you to your top three La Quinta clubs.',
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
    <section className="bg-palm text-sand-50">
      <div className="container py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-4">Featured Realtor Slot — Open</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-6">This space is reserved <span className="text-gold">for one La Quinta realtor.</span></h2>
            <div className="space-y-4 text-sand-50/85 text-base leading-relaxed max-w-xl">
              <p>La Quinta Golf Lifestyle is an independent guide — we don’t list homes ourselves. We route every qualified buyer lead generated through this site to a small, hand-picked bench of California-licensed realtors who actually work inside the seven private clubs.</p>
              <p>If you’re a licensed California realtor who specializes in PGA West, The Madison Club, The Hideaway, Andalusia, The Tradition, La Quinta Country Club, or The Quarry — and you want to be the name buyers see when they reach out for showings, off-market intel, and club introductions — we want to talk.</p>
            </div>
            <div className="mt-8">
              <Link
                href="/collaborate"
                className="inline-flex items-center gap-2 bg-gold text-palm font-semibold tracking-[0.18em] uppercase text-xs px-7 py-4 hover:bg-gold/90 transition-colors"
              >
                Apply for the Featured Realtor Slot <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-gold/90 mb-5">What the featured realtor gets</div>
            <ul className="space-y-5">
              {[
                { t: 'Exclusive lead routing', d: 'Every buyer and seller lead generated through this site routes to our hand-picked bench. No competing names.' },
                { t: 'Homepage placement', d: 'Your headshot, brokerage, and bio appear in this exact slot — the highest-traffic position on the site.' },
                { t: 'Community-page co-branding', d: 'Listed as the “recommended specialist” on every La Quinta community profile and filter landing page.' },
                { t: 'Curated buyer profile', d: 'Our visitors are pre-educated, financially-qualified, and ready to tour. No tire-kickers.' },
              ].map((i) => (
                <li key={i.t} className="border-l border-gold/40 pl-5">
                  <div className="text-sm font-semibold tracking-wide text-sand-50">{i.t}</div>
                  <div className="text-sm text-sand-50/75 leading-relaxed mt-1.5">{i.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

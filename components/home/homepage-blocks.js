import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { partner, partnerRecruitment } from '@/lib/exclusive-partner';

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
  // While the La Quinta partner slot is OPEN, this section is a
  // recruitment pitch to prospective realtors — not a buyer-facing
  // partner card. When a partner is signed (partner.status === 'signed'),
  // this component can be extended to render the partner card variant
  // sourced from partner.signed.
  return (
    <section id="become-our-partner" className="bg-palm text-sand-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_20%_20%,#C8A24A,transparent_55%),radial-gradient(circle_at_80%_80%,#B45D3C,transparent_55%)] pointer-events-none" />

      <div className="relative container py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16">
          {/* Pitch side */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-4">
              {partnerRecruitment.eyebrow}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-6 text-balance">
              {partnerRecruitment.headline}
            </h2>
            <p className="text-sand-50/85 text-lg leading-relaxed max-w-xl">
              {partnerRecruitment.subhead}
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {partnerRecruitment.points.map((p) => (
                <div key={p.title} className="border-l-2 border-gold/60 pl-5">
                  <div className="font-serif text-lg text-gold leading-tight">{p.title}</div>
                  <p className="text-sm text-sand-50/80 leading-relaxed mt-2">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#partner-inquiry"
                className="inline-flex items-center gap-2 bg-gold text-palm font-semibold tracking-[0.18em] uppercase text-xs px-7 py-4 hover:bg-gold/90 transition-colors"
              >
                Request the brief <ArrowUpRight size={15} />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-gold/60 text-gold tracking-[0.18em] uppercase text-xs px-7 py-4 hover:bg-gold/15 transition-colors"
              >
                About the Network <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Meta / positioning side */}
          <div className="border-l border-gold/25 lg:pl-12">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold/90 mb-4">The Slot</div>
            <dl className="space-y-5">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Market</dt>
                <dd className="font-serif text-2xl text-sand-50 leading-tight mt-1">
                  La Quinta, California (ZIP 92253)
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Segment</dt>
                <dd className="text-sm text-sand-50/85 leading-relaxed mt-1">
                  Seven private golf communities, plus the broader semi-private and active-adult belt around them. Buyers range from $450K condos to $30M+ estates.
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Status</dt>
                <dd className="text-sm text-sand-50 mt-1">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    Open — accepting inquiries
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Terms</dt>
                <dd className="text-sm text-sand-50/85 leading-relaxed mt-1">
                  Monthly fee. 12-month term. Right of first renewal. No commission split, no referral fee.
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Requirements</dt>
                <dd className="text-sm text-sand-50/85 leading-relaxed mt-1">
                  Active California DRE license, La Quinta market fluency, and a brokerage relationship that supports independent lead sourcing.
                </dd>
              </div>
            </dl>

            <div className="mt-10 pt-6 border-t border-gold/25">
              <p className="text-xs text-sand-50/60 leading-relaxed">
                {partner.displayName} is one of fourteen single-city golf-market publications in the Golf Lifestyle Network, operated by 7671 Enterprises, LLC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export const metadata = {
  title: 'Glossary',
  description: 'Golf and real-estate terminology used across La Quinta Golf Lifestyle — equity membership, deeded membership, base-year value, and more.',
};

const terms = [
  { term: 'Equity membership', def: 'A private-club membership purchased outright; carries voting rights and a refundable component on resignation, subject to club rules.' },
  { term: 'Deeded membership', def: 'A club membership tied to title on a specific property; transfers with the home at sale.' },
  { term: 'Initiation fee', def: 'The one-time entry cost to join a private club, separate from monthly dues. Varies materially club to club; verify directly.' },
  { term: 'Base-year value (Prop 13)', def: 'California-specific. The assessed value of a property at the time of purchase, which then escalates at a capped rate. Critical for new buyers to model.' },
  { term: 'CARETS / CRMLS', def: 'The Combined LA/Westside Regional MLS (CRMLS) and CARETS data exchange — California\u2019s desert-region MLS infrastructure.' },
  { term: 'IDX', def: 'Internet Data Exchange — the licensed feed of MLS listings to a public-facing website. Requires a licensed-agent partner in California.' },
  { term: 'Resort vs. private course', def: 'A resort course allows daily-fee public play; a private course is members-only. PGA West has both within the same community.' },
  { term: 'Days on market (DOM)', def: 'How long a listing has been active. Important quarterly indicator; we publish as a range, not a single figure.' },
];

export default function GlossaryPage() {
  return (
    <>
      <PageHero eyebrow="Glossary" title="Terms used on this site." subtitle="Golf-club and California-real-estate terminology used across La Quinta Golf Lifestyle." />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Glossary' }]} />
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {terms.map((t) => (
            <div key={t.term} className="py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <dt className="font-serif text-xl text-palm md:col-span-1">{t.term}</dt>
              <dd className="text-foreground/80 leading-relaxed md:col-span-3">{t.def}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

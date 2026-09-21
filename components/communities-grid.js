'use client';

import { useMemo, useState } from 'react';
import CommunityCard from '@/components/community-card';

// Filter chips shown above the /communities grid. Labels are user-facing;
// tier keys match the values used in lib/site-config.js.
const FILTERS = [
  { key: 'all',                label: 'All' },
  { key: 'flagship',           label: 'Private clubs' },
  { key: 'private',            label: 'Private (other)' },
  { key: 'semi-private',       label: 'Semi-private' },
  { key: 'resort-residence',   label: 'Resort residences' },
  { key: 'active-adult',       label: 'Active-adult 55+' },
  { key: 'gated-residential',  label: 'Gated residential' },
  { key: 'non-gated',          label: 'Historic non-gated' },
];

export default function CommunitiesGrid({ communities, contentByslug }) {
  const [active, setActive] = useState('all');

  const counts = useMemo(() => {
    const c = { all: communities.length };
    for (const community of communities) {
      const t = community.tier || 'gated-residential';
      c[t] = (c[t] || 0) + 1;
    }
    return c;
  }, [communities]);

  const filtered = useMemo(() => {
    if (active === 'all') return communities;
    return communities.filter((c) => (c.tier || 'gated-residential') === active);
  }, [active, communities]);

  return (
    <>
      <div className="mt-10 mb-8 flex flex-wrap items-center gap-2">
        {FILTERS.filter((f) => f.key === 'all' || counts[f.key]).map((f) => {
          const isActive = active === f.key;
          const count = counts[f.key] || 0;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={
                'text-xs uppercase tracking-[0.18em] px-4 py-2 border transition-colors ' +
                (isActive
                  ? 'bg-palm text-sand-50 border-palm'
                  : 'bg-sand-50 text-foreground/70 border-border hover:border-palm hover:text-palm')
              }
              aria-pressed={isActive}
            >
              {f.label}
              <span className={'ml-2 ' + (isActive ? 'text-gold' : 'text-foreground/45')}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-foreground/70 py-16 text-center">
          No communities in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((c) => {
            const content = contentByslug[c.slug] || {};
            return (
              <CommunityCard
                key={c.slug}
                community={c}
                image={content.image}
                blurb={content.tagline}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';

// Robust headshot renderer with two-stage fallback:
//   1. Try the configured headshot URL
//   2. On 404 / load error, fall back to initials on a sand background
// This keeps the page presentable even if a remotely-hosted image is missing.
export default function CollaboratorHeadshot({ person, className = '' }) {
  const [failed, setFailed] = useState(false);
  const initials = (person?.name || '?')
    .split(/\s+/)
    .map((s) => s.replace(/[^A-Za-z]/g, ''))
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  if (failed || !person?.headshot) {
    return (
      <div
        role="img"
        aria-label={person?.name || 'Collaborator headshot'}
        className={`flex items-center justify-center bg-sand-100 text-palm font-serif text-4xl ${className}`}
      >
        {initials || '•'}
      </div>
    );
  }

  return (
    <img
      src={person.headshot}
      alt={person.name}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

'use client';

import { usePathname } from 'next/navigation';
import ContextualContactForm from './contextual-contact-form';
import { communities, architects } from '@/lib/site-config';

// Pages that already contain their own primary form or would be inappropriate
// hosts for a contact form (legal pages, admin, downloads, API, etc.).
const EXCLUDED_PATHS = [
  '/community-quiz',
  '/home-valuation',
  '/collaborate',
  '/privacy',
  '/terms',
  '/glossary',
  '/admin',
];
const EXCLUDED_PREFIXES = [
  '/api/',
  '/downloads/',
  '/collaborators',
  '/opengraph-image',
  '/og-image',
  '/robots',
  '/sitemap',
];

// Given a pathname, produce a subject line for the contact form. The subject
// is what shows up on the page ("Interested in The Madison Club?") and in the
// welcome-package email.
function deriveSubject(pathname) {
  if (!pathname || pathname === '/') return 'La Quinta golf real estate';

  // /communities/[slug]
  const cm = pathname.match(/^\/communities\/([^/]+)/);
  if (cm) {
    const c = communities.find((x) => x.slug === cm[1]);
    return c ? c.name : 'La Quinta golf communities';
  }
  if (pathname === '/communities') return 'La Quinta golf communities';

  // /architects/[slug]
  const am = pathname.match(/^\/architects\/([^/]+)/);
  if (am) {
    const a = architects.find((x) => x.slug === am[1]);
    return a ? `${a.name}'s La Quinta courses` : 'La Quinta course architects';
  }
  if (pathname === '/architects') return 'La Quinta course architects';

  if (pathname.startsWith('/blog')) return 'La Quinta golf real estate';
  if (pathname.startsWith('/guides')) return 'the La Quinta buyer\u2019s guide';
  if (pathname.startsWith('/market-reports')) return 'La Quinta market context';
  if (pathname === '/homes-for-sale' || pathname.startsWith('/homes-for-sale/'))
    return 'La Quinta homes for sale';
  if (pathname === '/desert-lifestyle-map') return 'La Quinta lifestyle';
  if (pathname === '/compare') return 'comparing La Quinta clubs';
  if (pathname === '/golf-clubs') return 'La Quinta private clubs';
  if (pathname.startsWith('/property-spotlight')) return 'this property';
  if (pathname === '/about') return 'La Quinta golf real estate';

  return 'La Quinta golf real estate';
}

// Layout-level global contact section. Renders on every content page, hidden
// on excluded routes. The subject auto-derives from the pathname so buyers
// see contextual copy ("Interested in The Madison Club?") without any
// per-page wiring.
export default function GlobalContactSection() {
  const pathname = usePathname() || '/';

  if (EXCLUDED_PATHS.includes(pathname)) return null;
  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const subject = deriveSubject(pathname);
  return (
    <div className="bg-sand-50/40 border-t border-border">
      <ContextualContactForm subject={subject} />
    </div>
  );
}

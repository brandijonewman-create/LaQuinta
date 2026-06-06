'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_PRIMARY, site } from '@/lib/site-config';
import { Button } from '@/components/ui/button';

const DESKTOP_NAV = NAV_PRIMARY.filter((i) => !i.secondary).slice(0, 6);

// Solid deep-navy header (#062840 via `bg-palm` token). Provides strong
// contrast against the cream page background AND remains legible above image
// hero sections. Mirrors the Golf Lifestyle network primary brand color.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-palm text-sand-50 border-b border-gold/20 ${
        scrolled ? 'shadow-lg shadow-palm/20' : ''
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20 gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          aria-label={site.name}
        >
          <Wordmark />
        </Link>

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {DESKTOP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] uppercase tracking-[0.14em] whitespace-nowrap text-sand-50/85 hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Button
            asChild
            size="sm"
            className="rounded-none whitespace-nowrap bg-gold text-palm font-semibold hover:bg-gold/90"
          >
            <Link href="/community-quiz">Find Your Community</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden p-2 -mr-2 text-sand-50"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-palm border-t border-gold/20">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.16em] text-sand-50/85 hover:text-gold border-b border-gold/15"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-4 rounded-none bg-gold text-palm font-semibold hover:bg-gold/90">
              <Link href="/community-quiz" onClick={() => setOpen(false)}>
                Find Your Community
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Wordmark() {
  return (
    <div className="flex flex-col leading-none text-sand-50">
      <span className="font-serif text-[17px] md:text-[19px] tracking-[0.04em]">
        La Quinta
      </span>
      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gold opacity-90">
        Golf &middot; Lifestyle
      </span>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_PRIMARY, site } from '@/lib/site-config';
import { Button } from '@/components/ui/button';

// Desktop bar shows only the primary items (≤ 6). Secondary items (Architects,
// Lifestyle Map, About) live in the mobile menu so the bar never overflows.
const DESKTOP_NAV = NAV_PRIMARY.filter((i) => !i.secondary).slice(0, 6);

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-background/80 backdrop-blur-sm border-b border-border/40'
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20 gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label={site.name}>
          <Wordmark />
        </Link>

        {/* Desktop nav: appears at xl (1280px+) where there is real horizontal
            room for 6 items + logo + CTA without crowding. */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {DESKTOP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] uppercase tracking-[0.14em] whitespace-nowrap text-foreground/80 hover:text-palm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Button
            asChild
            size="sm"
            className="rounded-none whitespace-nowrap bg-palm text-sand-50 border border-palm hover:bg-palm-700"
          >
            <Link href="/community-quiz">Find Your Community</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-background border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.16em] text-foreground/80 hover:text-palm border-b border-border/60"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-4 rounded-none bg-palm text-sand-50 hover:bg-palm-700">
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
    <div className="flex flex-col leading-none text-palm transition-colors">
      <span className="font-serif text-[17px] md:text-[19px] tracking-[0.04em]">
        La Quinta
      </span>
      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] opacity-70">
        Golf &middot; Lifestyle
      </span>
    </div>
  );
}

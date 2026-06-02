'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_PRIMARY, site } from '@/lib/site-config';
import { Button } from '@/components/ui/button';

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
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2 group" aria-label={site.name}>
          <Wordmark scrolled={scrolled} />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_PRIMARY.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] uppercase tracking-[0.16em] transition-colors ${
                scrolled
                  ? 'text-foreground/80 hover:text-palm'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className={`rounded-none border ${
              scrolled
                ? 'bg-palm text-sand-50 border-palm hover:bg-palm-700'
                : 'bg-transparent text-white border-white/70 hover:bg-white hover:text-palm'
            }`}
          >
            <Link href="/community-quiz">Find Your Community</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 -mr-2 ${scrolled ? 'text-foreground' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
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

function Wordmark({ scrolled }) {
  const color = scrolled ? 'text-palm' : 'text-white';
  return (
    <div className={`flex flex-col leading-none ${color} transition-colors`}>
      <span className="font-serif text-[15px] md:text-[17px] tracking-[0.04em]">
        California Desert
      </span>
      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] opacity-80">
        Golf · Lifestyle
      </span>
    </div>
  );
}

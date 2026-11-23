'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Menu, X } from 'lucide-react';
import { MARKET } from '@/lib/market';

const NAV_LINKS = [
  { href: '/communities',                 label: 'Communities' },
  { href: '/community-quiz',              label: 'Community Quiz' },
  { href: '/architects',                  label: 'Architects' },
  { href: '/laquinta-home-value',       label: 'Home Value' },
  { href: '/guide',                       label: 'The Guide' },
  { href: '/blog',                        label: 'Journal' },
  { href: '/about',                       label: 'About' }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-emerald-900/20 bg-[#062840]/95 backdrop-blur supports-[backdrop-filter]:bg-[#062840]/85">
        <div className="hidden md:flex items-center justify-end gap-6 px-6 py-1.5 text-[11px] text-emerald-50/70 border-b border-emerald-50/10">
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {MARKET.name}, {MARKET.state}</span>
        </div>
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#062840] font-serif font-bold text-lg">S</div>
            <div className="leading-tight">
              <div className="font-serif text-lg text-amber-50 tracking-wide">{MARKET.name}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-200/70">Golf Lifestyle</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm text-emerald-50/90">
            {NAV_LINKS.map(n => (
              <Link key={n.href} href={n.href} className="hover:text-amber-300 transition">{n.label}</Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Hamburger (mobile + tablet) */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-amber-300/30 text-amber-100 hover:bg-amber-300 hover:text-[#062840] transition"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#062840]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#062840] text-amber-50 shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-300/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#062840] font-serif font-bold text-lg">S</div>
              <div className="leading-tight">
                <div className="font-serif text-lg text-amber-50">{MARKET.name}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-200/70">Golf Lifestyle</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-amber-300/30 text-amber-100 hover:bg-amber-300 hover:text-[#062840] transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-4 text-base">
            {NAV_LINKS.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3.5 border-b border-amber-300/10 text-amber-50 hover:text-amber-300 font-serif text-lg transition"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/map"
              onClick={() => setOpen(false)}
              className="py-3.5 border-b border-amber-300/10 text-emerald-50/75 hover:text-amber-300 text-sm transition"
            >
              Interactive Map
            </Link>
            <Link
              href={`/market-reports/${MARKET.slug}-q2-2026`}
              onClick={() => setOpen(false)}
              className="py-3.5 border-b border-amber-300/10 text-emerald-50/75 hover:text-amber-300 text-sm transition"
            >
              Market Report
            </Link>
            <Link
              href={`/guides/${MARKET.slug}-buyers-guide-2026`}
              onClick={() => setOpen(false)}
              className="py-3.5 text-emerald-50/75 hover:text-amber-300 text-sm transition"
            >
              Buyer Guide
            </Link>
          </nav>

          <div className="mt-auto p-6 border-t border-amber-300/10 space-y-3">
            <div className="pt-2 text-center text-[11px] text-emerald-50/40 flex items-center justify-center gap-1.5">
              <MapPin className="h-3 w-3" /> {MARKET.name}, {MARKET.state}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

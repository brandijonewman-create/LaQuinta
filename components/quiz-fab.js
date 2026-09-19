'use client';

// Sticky "Take the Quiz" pill for mobile.
// Fixed to the bottom-right of the viewport, appears after the user has
// scrolled past the hero (>400px) so it doesn't crowd the initial view.
// Hidden on the community-quiz page itself (redundant) and on admin routes.
// md:hidden — this is a mobile-only nudge; desktop users have the hero CTA
// and multiple in-page quiz CTAs available on scroll.

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Compass } from 'lucide-react';

const HIDE_ON_PATHS = ['/community-quiz', '/admin'];

export default function QuizFab() {
  const pathname = usePathname() || '/';
  const [visible, setVisible] = useState(false);

  const hide = HIDE_ON_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hide) return undefined;
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hide]);

  if (hide) return null;

  return (
    <Link
      href="/community-quiz"
      aria-label="Take the 60-second community quiz"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      className={
        'md:hidden fixed right-4 z-50 inline-flex items-center gap-2 ' +
        'bg-gold text-palm px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] ' +
        'text-[11px] font-semibold uppercase tracking-[0.18em] ' +
        'transition-all duration-300 ease-out will-change-transform ' +
        (visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none')
      }
    >
      <Compass size={16} strokeWidth={2.4} />
      <span>Take the Quiz</span>
    </Link>
  );
}

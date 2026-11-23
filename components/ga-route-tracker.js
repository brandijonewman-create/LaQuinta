'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * GA4 SPA page-view tracker.
 *
 * Next.js App Router navigations are client-side — the gtag('config', ID) call
 * in the root layout only fires page_view on the initial document load. Without
 * this component, every <Link> click would silently skip GA4 reporting, leading
 * to a 40–70% undercount of true traffic.
 *
 * This component listens for pathname + searchParams changes and pushes a
 * synthetic page_view to GA4 on every route transition (including the first
 * mount, since send_page_view is disabled in the layout's gtag config).
 *
 * Wrapped in <Suspense> because useSearchParams() makes the bundle dynamic.
 * Does NOT import from lib/data — that would pull MongoDB into the client
 * bundle and break the build. gtag already knows the configured Measurement
 * ID from the gtag('config', ...) call in the root layout, so we don't need
 * to pass send_to here.
 */
function GARouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;

    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    try {
      window.gtag('event', 'page_view', {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title
      });
    } catch (_) {
      // Never let analytics break the UX.
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GARouteTracker() {
  return (
    <Suspense fallback={null}>
      <GARouteTrackerInner />
    </Suspense>
  );
}

'use client';

// GA4 install. Uses Google's exact recommended snippet (synchronous gtag init
// inline + async loader) so the initial page_view fires immediately. A
// route-change tracker layered on top fires additional page_view events on
// client-side navigations within the Next.js App Router.

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_ID } from '@/lib/analytics';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
    // Skip the initial mount — gtag('config') already fired a page_view for
    // the landing route. Track subsequent client-side navigations only.
    if (window.__lqgl_initial_route_logged !== true) {
      window.__lqgl_initial_route_logged = true;
      return;
    }
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : '');
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    });
  }, [pathname, searchParams]);
  return null;
}

export default function GAScripts() {
  if (!GA_ID) return null;
  return (
    <>
      {/* Google tag (gtag.js) — exact recommended install. */}
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

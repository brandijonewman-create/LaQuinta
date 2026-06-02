'use client';

// Honest SPA page_view tracker. gtag config sets send_page_view: false at boot,
// then this component fires a page_view on every client-side route change —
// including the very first paint — so we get exactly one event per navigation.

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_ID, trackPageView } from '@/lib/analytics';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!GA_ID) return;
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);
  return null;
}

export default function GAScripts() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

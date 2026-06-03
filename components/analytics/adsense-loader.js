// AdSense auto-ads loader. No-ops when NEXT_PUBLIC_ADSENSE_PUB_ID is absent.
// AdSense's own logic decides whether/where to place ads on each page.
//
// We deliberately do NOT load AdSense on:
//   • /downloads/*  (lead-magnet pages, noindex per brief)
//   • /api/*        (API routes — not user-facing anyway)
// All other routes get the loader.

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ADSENSE_PUB_ID } from '@/lib/analytics';

export default function AdSenseLoader() {
  const pathname = usePathname();
  if (!ADSENSE_PUB_ID) return null;
  if (pathname?.startsWith('/downloads')) return null;

  return (
    <Script
      id="adsense-loader"
      async
      crossOrigin="anonymous"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
    />
  );
}

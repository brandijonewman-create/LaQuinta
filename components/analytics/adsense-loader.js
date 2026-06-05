// AdSense auto-ads loader. No-ops when NEXT_PUBLIC_ADSENSE_PUB_ID is absent.
// AdSense's own logic decides whether/where to place ads on each page.
//
// We deliberately do NOT load AdSense on:
//   • /downloads/*  (lead-magnet pages, noindex per brief)
//   • /api/*        (API routes — not user-facing anyway)
// All other routes get the loader.

'use client';

import Script from 'next/script';
import { ADSENSE_PUB_ID } from '@/lib/analytics';

export default function AdSenseLoader() {
  if (!ADSENSE_PUB_ID) return null;
  // Loaded in <head> via beforeInteractive per AdSense verification crawl
  // requirement. The AdSense bot reads ads.txt + the loader script during
  // verification and prefers head placement.
  return (
    <Script
      id="adsense-loader"
      async
      crossOrigin="anonymous"
      strategy="beforeInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
    />
  );
}

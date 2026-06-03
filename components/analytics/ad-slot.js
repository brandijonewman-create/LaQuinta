// Reusable manual AdSense slot. Drop into any page or MDX where you want a
// specific ad unit. Pass the slot ID from your AdSense dashboard.
//
// Example:
//   <AdSlot slot="1234567890" format="auto" />
//
// Currently unused on the site — auto-ads handle placement — but available
// the moment you want a guaranteed unit at a specific location.

'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_PUB_ID } from '@/lib/analytics';

export default function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  layout,
  layoutKey,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ADSENSE_PUB_ID || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not yet initialized — will retry on next render.
    }
  }, [slot]);

  if (!ADSENSE_PUB_ID || !slot) return null;

  return (
    <div className={`adsense-slot my-8 ${className}`} aria-label="Advertisement">
      <div className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 mb-2">
        Advertisement
      </div>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={style || { display: 'block' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

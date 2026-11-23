'use client';
import dynamic from 'next/dynamic';

// Lazy-load Mapbox-backed ListingsMap on the lifestyle map page so the
// ~250kb mapbox-gl bundle does not block first paint or Lighthouse LCP.
// SSR is disabled because mapbox-gl needs `window`. A lightweight skeleton
// renders during the hydration window so the page does not visually jank.
const ListingsMap = dynamic(() => import('@/components/listings-map'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl bg-emerald-50/40 border border-[#062840]/10 flex items-center justify-center text-[#062840]/55 text-sm"
      style={{ height: 720 }}
    >
      <div className="flex flex-col items-center gap-3 text-center px-6">
        <div className="h-8 w-8 rounded-full border-2 border-[#062840]/20 border-t-[#BA9273] animate-spin" />
        <div>Loading interactive map…</div>
        <div className="text-xs text-[#062840]/40 max-w-xs">All 46 Scottsdale golf communities plus schools, hospitals, dining and airports.</div>
      </div>
    </div>
  )
});

export default function LifestyleMapLazy(props) {
  return <ListingsMap {...props} />;
}

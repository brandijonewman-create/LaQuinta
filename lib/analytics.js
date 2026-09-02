// GA4 wrapper. No-ops when NEXT_PUBLIC_GA_MEASUREMENT_ID is not set.
// All event names match the brief: 'page_view', 'quiz_complete', 'lead_capture'.

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  if (!window.gtag || !GA_ID) return;
  window.gtag('event', name, params);
}

export function trackPageView(url) {
  if (typeof window === 'undefined') return;
  if (!window.gtag || !GA_ID) return;
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: url,
    send_to: GA_ID,
  });
}

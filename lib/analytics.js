// Lightweight client-side GA4 event wrapper.
// Use:  trackEvent('quiz_completed', { investment_range: 'mid', top_match: 'silverleaf' })
// All events are no-ops if window.gtag is not loaded (SSR or ad-blocker).
//
// Recommended GA4 "Mark as key event" candidates after deployment:
//   - quiz_completed       (Community Quiz finish + lead capture)
//   - valuation_request    (Home valuation form submit)
//   - architect_page_view  (Architect deep-dive engagement)
//   - architect_card_click (Outbound click from /architects index)
//
// Existing events already wired elsewhere (do not duplicate):
//   - generate_lead          (general lead-form + guide download)
//   - saved_search_subscribe (saved search form)

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch (_) {
    // swallow analytics errors — they should never break the UX
  }
}

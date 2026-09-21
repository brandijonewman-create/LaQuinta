'use client';

// Small link/button visitors can click to re-open the consent banner.
// Emits a custom event that <ConsentAndAnalytics /> listens for.

export default function FooterConsentLink({ className = '' }) {
  function reopen() {
    try {
      window.localStorage.removeItem('lqgl_analytics_consent');
    } catch {
      /* no-op */
    }
    window.dispatchEvent(new Event('lqgl:consent-reopen'));
  }
  return (
    <button type="button" onClick={reopen} className={className}>
      Cookie preferences
    </button>
  );
}

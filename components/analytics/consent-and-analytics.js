'use client';

// Cookie/analytics consent banner + GA4 gating.
//
// California CPRA-friendly model: no GA4 scripts load until the visitor
// affirmatively clicks "Accept". "Decline" (or ignoring the banner) means
// no gtag ever installs. Consent state is persisted in localStorage.
//
// Storage key: 'lqgl_analytics_consent', values 'accepted' | 'declined'.
// A "Manage" link in the footer can rehydrate the banner by clearing the
// key (see components/shared/footer-consent-link.js).

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_ID } from '@/lib/analytics';

const STORAGE_KEY = 'lqgl_analytics_consent';

function readConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* private-mode / disabled storage, no-op */
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
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

export default function ConsentAndAnalytics() {
  // 'unknown' means we haven't read localStorage yet (SSR).
  const [consent, setConsent] = useState('unknown');

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored === 'accepted' || stored === 'declined' ? stored : 'unset');
    // Allow the footer "Cookie preferences" link to reopen the banner.
    const handler = () => setConsent('unset');
    window.addEventListener('lqgl:consent-reopen', handler);
    return () => window.removeEventListener('lqgl:consent-reopen', handler);
  }, []);

  function accept() {
    writeConsent('accepted');
    setConsent('accepted');
  }
  function decline() {
    writeConsent('declined');
    setConsent('declined');
  }

  // Only render analytics scripts once the visitor has accepted.
  const shouldLoadGa = GA_ID && consent === 'accepted';

  return (
    <>
      {shouldLoadGa && (
        <>
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
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        </>
      )}

      {consent === 'unset' && GA_ID && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookies and analytics preferences"
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md bg-palm text-sand-50 border border-palm-700 shadow-xl p-5"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">
            Cookies &amp; analytics
          </div>
          <p className="text-sm leading-relaxed text-sand-50/90">
            We use Google Analytics to understand how visitors read our editorial
            guides. Nothing is loaded until you accept. See our{' '}
            <a
              href="/privacy"
              className="underline decoration-gold underline-offset-2 hover:text-white"
            >
              privacy notice
            </a>{' '}
            for the details.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={accept}
              className="bg-gold text-palm hover:bg-sand-50 px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
            >
              Accept analytics
            </button>
            <button
              onClick={decline}
              className="bg-transparent border border-sand-50/40 text-sand-50 hover:bg-palm-700 px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
            >
              Decline
            </button>
          </div>
          <p className="mt-3 text-[10px] text-sand-50/60 leading-snug">
            California residents may change or withdraw this preference at any time
            from the footer.
          </p>
        </div>
      )}
    </>
  );
}

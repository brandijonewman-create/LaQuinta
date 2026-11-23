// Capture the page/source context a lead submission originates from.
//
// Called at submit time (NOT in a hook) so it works in any environment
// without useEffect/useState gymnastics. Returns {} on the server.
//
//   sourcePath   — window.location.pathname (e.g. "/blog/foo")
//   sourceDetail — value of ?from= or ?src= query param, if present.
//                  Used by /community-quiz to attribute the *referring* page,
//                  since the actual submission happens on /community-quiz.

export function readLeadSource() {
  if (typeof window === 'undefined') return { sourcePath: '', sourceDetail: '' };
  try {
    const url = new URL(window.location.href);
    const fromParam = url.searchParams.get('from') || url.searchParams.get('src') || '';
    return {
      sourcePath: window.location.pathname || '',
      sourceDetail: (fromParam || '').slice(0, 200)
    };
  } catch (_) {
    return { sourcePath: '', sourceDetail: '' };
  }
}

'use client';
import { useState } from 'react';
import { Bell, Check } from 'lucide-react';

/**
 * Compact saved-search subscription form for programmatic / filter / zip pages.
 * SEO benefit: gives every "thin" filter page a unique, contextual conversion intent.
 * Persists a lead with `saved-search`, `saved-search-{slug}`, and (if any) community tags.
 *
 * Props:
 *   - searchTitle: human label shown to the user (e.g. "Grayhawk Homes Under $2M")
 *   - searchSlug:  unique identifier — used as a tag on the lead
 *   - communitySlug: optional, adds `community-{slug}` tag
 *   - sourcePath:  optional, full URL path for note context
 */
export default function SavedSearchForm({ searchTitle, searchSlug, communitySlug = null, sourcePath = null, compact = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [status, setStatus] = useState('idle');

  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/saved-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          frequency,
          searchTitle,
          searchSlug,
          communitySlug,
          sourcePath
        })
      });
      if (res.ok) {
        // GA4 conversion — distinct from main lead form
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'saved_search_subscribe', {
            currency: 'USD',
            value: 15,
            search_slug: searchSlug,
            community: communitySlug || 'none',
            frequency
          });
        }
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-emerald-50 border border-emerald-200 rounded-2xl ${compact ? 'p-6' : 'p-8'} text-center`}>
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-3">
          <Check className="h-6 w-6 text-amber-700" />
        </div>
        <h3 className="font-serif text-xl text-[#062840]">You&rsquo;re on the list.</h3>
        <p className="text-sm text-emerald-900/75 mt-2">
          We&rsquo;ll email you the moment a new <strong>{searchTitle}</strong> match hits the market.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-amber-200/60 rounded-2xl shadow-sm ${compact ? 'p-5' : 'p-7 md:p-8'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <Bell className="h-5 w-5 text-amber-700" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-amber-700">Saved Search</div>
          <h3 className={`font-serif ${compact ? 'text-lg' : 'text-xl md:text-2xl'} text-[#062840] leading-tight`}>
            Get notified when new <span className="text-amber-700">{searchTitle}</span> hit the market
          </h3>
        </div>
      </div>
      <p className="text-sm text-emerald-900/75 mb-4">
        We&rsquo;ll send a private alert the moment a matching home is listed, often before it reaches the public portals.
      </p>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
        <input
          placeholder="First name (optional)"
          className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email address"
          className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <select
          className="sm:col-span-2 rounded-lg border border-emerald-900/15 bg-white text-[#062840] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
        >
          <option>Instant: the moment a match hits</option>
          <option>Daily</option>
          <option>Weekly</option>
        </select>
        <button
          disabled={status === 'loading'}
          className="sm:col-span-2 inline-flex justify-center items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3 text-sm font-semibold tracking-wide transition disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing\u2026' : (<>Notify me <Bell className="h-4 w-4" /></>)}
        </button>
        {status === 'error' && (
          <div className="sm:col-span-2 text-sm text-rose-700 text-center">Could not subscribe: please try again. Please try again.</div>
        )}
        <div className="sm:col-span-2 text-[11px] text-emerald-900/50 text-center">
          One-click unsubscribe. We never sell your email.
        </div>
      </form>
    </div>
  );
}

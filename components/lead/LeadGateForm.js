'use client';

import { useState } from 'react';
import { INTEREST_OPTIONS } from '@/lib/lead-magnets';
import { readLeadSource } from '@/lib/use-lead-source';

/**
 * Reusable lead-gate form. Submits to /api/leads/magnet, then either triggers
 * the browser download (if the magnet has a `file`) or shows a follow-up
 * thank-you message (if `file` is null).
 *
 * Hard-coded honest disclosures:
 *   - "We do not email this file."
 *   - "We do not sell your data."
 *
 * Props:
 *   magnet — entry from /lib/lead-magnets.js
 */
export default function LeadGateForm({ magnet }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [community, setCommunity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Name, email, and phone are required.');
      return;
    }
    setSubmitting(true);
    try {
      const { sourcePath, sourceDetail } = readLeadSource();
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: magnet.slug,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          community,
          source: 'lead-gate',
          sourcePath,
          sourceDetail
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      // Fire GA4 event if available
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'contact_submit', { magnet_slug: magnet.slug });
        } catch (_) { /* never break UX on analytics */ }
      }

      // Trigger auto-download if a file is configured
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        try {
          const a = document.createElement('a');
          a.href = data.downloadUrl;
          a.download = '';
          a.rel = 'noopener';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (_) { /* fall back to manual click on the button below */ }
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 md:p-10 shadow-sm">
        <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-3">Thank you</div>
        <h2 className="font-serif text-3xl text-[#062840] mb-3">You\u2019re all set.</h2>
        {downloadUrl ? (
          <>
            <p className="text-[#062840]/80 leading-relaxed">
              Your download is starting. <strong>We do not email this file.</strong>
              If the download didn\u2019t start automatically, use the button below.
            </p>
            <a
              href={downloadUrl}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a5c] text-amber-50 px-6 py-3 text-sm font-semibold tracking-wide transition"
            >
              {magnet.cta}
            </a>
          </>
        ) : (
          <p className="text-[#062840]/80 leading-relaxed">
            We\u2019ve received your request. We do not currently follow up
            individually via email, but your interest is logged and informs
            our editorial coverage.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-emerald-900/10 bg-white p-6 md:p-8 shadow-sm"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="lg-name" className="block text-xs uppercase tracking-wider text-[#062840]/70 mb-1.5">
            Name <span className="text-amber-700">*</span>
          </label>
          <input
            id="lg-name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            className="w-full rounded-md border border-emerald-900/15 bg-white px-3.5 py-2.5 text-[#062840] focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
          />
        </div>
        <div>
          <label htmlFor="lg-email" className="block text-xs uppercase tracking-wider text-[#062840]/70 mb-1.5">
            Email <span className="text-amber-700">*</span>
          </label>
          <input
            id="lg-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-md border border-emerald-900/15 bg-white px-3.5 py-2.5 text-[#062840] focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
          />
        </div>
        <div>
          <label htmlFor="lg-phone" className="block text-xs uppercase tracking-wider text-[#062840]/70 mb-1.5">
            Phone <span className="text-amber-700">*</span>
          </label>
          <input
            id="lg-phone"
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            autoComplete="tel"
            className="w-full rounded-md border border-emerald-900/15 bg-white px-3.5 py-2.5 text-[#062840] focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
          />
        </div>
        <div>
          <label htmlFor="lg-community" className="block text-xs uppercase tracking-wider text-[#062840]/70 mb-1.5">
            {magnet.topicLabel || 'Which best describes you?'}
          </label>
          <select
            id="lg-community"
            value={community}
            onChange={e => setCommunity(e.target.value)}
            className="w-full rounded-md border border-emerald-900/15 bg-white px-3.5 py-2.5 text-[#062840] focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
          >
            {INTEREST_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full inline-flex justify-center items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 disabled:opacity-60 disabled:cursor-not-allowed text-[#062840] px-7 py-3 text-sm font-semibold tracking-wide transition"
        >
          {submitting ? 'Submitting\u2026' : magnet.cta}
        </button>

        <p className="text-[11px] text-[#062840]/55 leading-relaxed mt-1">
          We collect your contact info to fulfill this request. We do not email this file.
          We do not sell your data.
        </p>
      </div>
    </form>
  );
}

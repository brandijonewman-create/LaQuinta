'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Download, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { readLeadSource } from '@/lib/use-lead-source';

// Inline lead-magnet card for community detail pages.
// Shown only when a community-guide PDF exists for the community.
//
// Props:
//   community  — { slug, name }
//   magnetSlug — e.g. 'community-guide-silverleaf' (must exist in lib/lead-magnets)
//
// Submits directly to /api/leads/magnet — same pipeline as the quiz funnel.
// On success, auto-triggers the PDF download via a programmatic <a> click.
export default function CommunityMagnetInline({ community, magnetSlug }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const dlRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Name, email, and phone are all required.');
      return;
    }
    setSubmitting(true);
    try {
      const { sourcePath, sourceDetail } = readLeadSource();
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: magnetSlug,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          community: community.name,
          source: 'community-page',
          sourcePath,
          sourceDetail
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.');
      setDownloadUrl(json.downloadUrl || `/downloads/${magnetSlug}.pdf`);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // Auto-trigger download once submitted
  useEffect(() => {
    if (submitted && downloadUrl && dlRef.current) {
      const t = setTimeout(() => { try { dlRef.current.click(); } catch (e) { /* ignore */ } }, 150);
      return () => clearTimeout(t);
    }
  }, [submitted, downloadUrl]);

  if (submitted) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-7 md:p-9 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-700 mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl text-[#062840] mt-3">Your {community.name} guide is downloading…</h2>
          <p className="mt-2 text-sm text-[#062840]/70 max-w-md mx-auto">We also sent you a backup download link by email in case the file didn’t start automatically.</p>
          <a ref={dlRef} href={downloadUrl} download className="hidden" aria-hidden="true">download</a>
          <a href={downloadUrl} download className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] text-amber-100 px-6 py-3 text-sm font-semibold transition">
            <Download className="h-4 w-4" /> Download manually
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-7 md:p-9 shadow-xl shadow-amber-900/5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-700 mb-2">
          <Download className="h-3 w-3" /> Free · instant download
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-[#062840] leading-tight">
          Get the {community.name} community guide
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#062840]/75 leading-relaxed">
          A practical walkthrough of {community.name}: the course, the club model, the real-estate footprint,
          and who the community honestly fits. Written by us, not the developer. No drip campaign, no cold call.
        </p>

        <form onSubmit={onSubmit} className="mt-5 grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Full name *"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="sm:col-span-2 w-full rounded-lg border border-[#062840]/15 bg-white px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
          <input
            type="email"
            required
            placeholder="Email *"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-[#062840]/15 bg-white px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
          <input
            type="tel"
            required
            placeholder="Phone *"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-lg border border-[#062840]/15 bg-white px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
          {error && (
            <div className="sm:col-span-2 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" /> <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] disabled:opacity-60 disabled:cursor-not-allowed text-amber-100 px-6 py-3 text-sm font-semibold transition"
          >
            {submitting ? 'Sending…' : <>Get the {community.name} guide <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
        <p className="mt-3 text-[11px] text-[#062840]/45 leading-relaxed text-center">
          We email the guide once. No drip campaigns, no cold calls. We share your information only if you ask us to connect you with a licensed professional.
        </p>
      </div>
    </section>
  );
}

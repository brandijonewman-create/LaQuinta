'use client';

import { useState } from 'react';
import { site } from '@/lib/site-config';

// Universal contact form. Rendered at the bottom of every content page via
// the root layout. The parent page passes a `subject` (e.g. "The Madison
// Club" or "The 2026 buyer's guide") which contextualizes the headline and
// gets stamped onto every submission and welcome email.
//
// While the Exclusive Market Partner slot is OPEN, submissions route via
// Resend to OWNER_EMAIL only (see /app/lib/email.js). No partner card is
// rendered — buyers see a single-column form.

export default function ContextualContactForm({
  subject = 'La Quinta golf real estate',
  headline,
  intro,
  variant = 'default', // 'default' | 'compact'
  submitLabel,
  formId,
}) {
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const derivedHeadline =
    headline || `Interested in ${subject}?`;
  const derivedIntro =
    intro ||
    `Send us a note. We'll reply within one business day with information tailored to your interest in ${subject}. Your note is private — no automated marketing emails and no third-party lists.`;

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          // Simple honeypot for bot filtering.
          website: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('ok');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'ok') {
    return (
      <section id={formId} className="container py-16 lg:py-20">
        <div className="mx-auto max-w-2xl border border-border bg-sand-50 p-10 text-center">
          <div className="editorial-eyebrow mb-4 justify-center inline-flex"><span className="editorial-rule" />Thank you</div>
          <h2 className="font-serif text-3xl text-palm mb-4">Your note is on its way.</h2>
          <p className="text-foreground/75 leading-relaxed">
            We&rsquo;ll reply within one business day. A confirmation is being emailed to you now.
          </p>
        </div>
      </section>
    );
  }

  const isCompact = variant === 'compact';

  return (
    <section id={formId} className="container py-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />{site.name}</div>
        <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight">
          {derivedHeadline}
        </h2>
        <p className="text-foreground/70 leading-relaxed mt-4">{derivedIntro}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">Full name</span>
              <input
                required
                value={form.name}
                onChange={onChange('name')}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-palm focus:outline-none focus:border-terracotta transition-colors"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={onChange('phone')}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-palm focus:outline-none focus:border-terracotta transition-colors"
                autoComplete="tel"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={onChange('email')}
              className="mt-2 w-full border-b border-border bg-transparent py-2 text-palm focus:outline-none focus:border-terracotta transition-colors"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              What would you like to know about {subject}?
            </span>
            <textarea
              value={form.message}
              onChange={onChange('message')}
              rows={4}
              className="mt-2 w-full border border-border bg-transparent p-3 text-palm focus:outline-none focus:border-terracotta transition-colors"
              placeholder="Timeline, budget range, must-haves, or just ask anything."
            />
          </label>

          {status === 'error' && (
            <p className="text-sm text-terracotta">{error}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 bg-palm text-cream px-6 py-3 text-sm uppercase tracking-[0.22em] hover:bg-terracotta transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending\u2026' : (submitLabel || 'Send message')}
            </button>
            <span className="text-xs text-foreground/55">
              Your note is private. No third-party marketing lists.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

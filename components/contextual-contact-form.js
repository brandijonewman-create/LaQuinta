'use client';

import { useState } from 'react';
import { partner } from '@/lib/exclusive-partner';

// Universal contact form. Rendered at the bottom of every content page via
// the root layout. The parent page passes a `subject` (e.g. "The Madison Club"
// or "The 2026 buyer\u2019s guide") which contextualizes the headline and gets
// stamped onto every submission and welcome email.
//
// On submit -> POST /api/contact:
//   1) writes a `lead` document to Mongo (type: 'contact')
//   2) sends a rich welcome email to the inquirer (community-tour offers,
//      buyer's guide link, scheduler link, and Kathy\u2019s contact card)
//   3) sends a notification email to Kathy and OWNER_EMAIL

export default function ContextualContactForm({
  subject = 'La Quinta golf real estate',
  headline,
  intro,
  variant = 'default', // 'default' | 'compact'
}) {
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const derivedHeadline =
    headline || `Interested in ${subject}?`;
  const derivedIntro =
    intro ||
    `Connect with Kathy Schowe, our Exclusive Market Partner for La Quinta. She provides current listings, private community tours, and buyer representation, and will personally reply within one business day.`;

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
      <section className="container py-16 lg:py-20">
        <div className="mx-auto max-w-2xl border border-border bg-sand-50 p-10 text-center">
          <div className="editorial-eyebrow mb-4 justify-center inline-flex"><span className="editorial-rule" />Thank you</div>
          <h2 className="font-serif text-3xl text-palm mb-4">Your note is on its way to Kathy.</h2>
          <p className="text-foreground/75 leading-relaxed">
            A welcome package is being emailed to you now. Kathy will personally follow up within one business day.
          </p>
          <p className="text-foreground/60 text-sm mt-4">
            Prefer to talk sooner? {partner.displayName} at{' '}
            <a href={`tel:${partner.contact.phoneTel}`} className="underline decoration-terracotta underline-offset-2 hover:text-terracotta">
              {partner.contact.phone}
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  const isCompact = variant === 'compact';

  return (
    <section className="container py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto">
        {/* Partner side */}
        <div className="lg:col-span-5 lg:pr-6 border-l-2 border-terracotta pl-6 lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-6 lg:border-r-terracotta">
          <div className="editorial-eyebrow mb-4"><span className="editorial-rule" />Exclusive Market Partner</div>
          <div className="flex items-center gap-4 mb-5">
            {partner.headshot?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={partner.headshot.src}
                alt={partner.headshot.alt}
                width={72}
                height={72}
                className="h-18 w-18 rounded-full object-cover ring-2 ring-terracotta/70 shrink-0"
                style={{ height: 72, width: 72 }}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-palm text-cream flex items-center justify-center font-serif text-2xl shrink-0">
                {partner.headshot.initials}
              </div>
            )}
            <div>
              <div className="font-serif text-2xl text-palm leading-tight">{partner.displayName}</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60 mt-1">
                {partner.brokerage.name} · DRE #{partner.dreLicense}
              </div>
            </div>
          </div>
          {!isCompact && (
            <p className="text-foreground/75 leading-relaxed text-sm">{partner.bioShort}</p>
          )}
          <dl className="mt-5 space-y-2 text-sm">
            <div>
              <dt className="inline text-foreground/55 uppercase tracking-[0.14em] text-[11px] mr-2">Phone</dt>
              <dd className="inline">
                <a href={`tel:${partner.contact.phoneTel}`} className="text-palm hover:text-terracotta transition-colors">
                  {partner.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline text-foreground/55 uppercase tracking-[0.14em] text-[11px] mr-2">Email</dt>
              <dd className="inline">
                <a href={`mailto:${partner.contact.email}`} className="text-palm hover:text-terracotta transition-colors">
                  {partner.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline text-foreground/55 uppercase tracking-[0.14em] text-[11px] mr-2">Office</dt>
              <dd className="inline text-foreground/75">{partner.brokerage.address}</dd>
            </div>
          </dl>
          <div className="mt-5">
            <a
              href={partner.scheduler.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-palm border-b border-terracotta hover:text-terracotta transition-colors"
            >
              {partner.scheduler.label} →
            </a>
          </div>
        </div>

        {/* Form side */}
        <div className="lg:col-span-7">
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
                {status === 'sending' ? 'Sending…' : `Send to ${partner.displayName}`}
              </button>
              <span className="text-xs text-foreground/55">
                Your note is private. No third-party marketing lists.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

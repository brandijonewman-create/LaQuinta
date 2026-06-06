'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle2 } from 'lucide-react';

export default function LeadMagnetForm({ magnetSlug, magnetLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, magnet: magnetSlug }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed.');
      trackEvent('lead_capture', { magnet: magnetSlug });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-border bg-sand-50 p-10 text-center">
        <CheckCircle2 size={36} className="text-palm mx-auto" />
        <h2 className="font-serif text-3xl text-palm mt-5">Thanks — you&rsquo;re on the list.</h2>
        <p className="text-foreground/75 mt-4 leading-relaxed max-w-md mx-auto">
          We will email <strong className="text-palm">{magnetLabel}</strong> to you directly
          once it is ready. We do not send automated marketing emails.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border bg-sand-50 p-8 lg:p-10">
      <div className="space-y-4">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-border bg-white px-4 py-3" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Email <span className="text-terracotta">*</span></span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-white px-4 py-3" placeholder="you@example.com" />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 w-full h-12 text-sm uppercase tracking-[0.18em]">
          {submitting ? 'Submitting…' : `Get “${magnetLabel}”`}
        </Button>
        <p className="text-[11px] text-foreground/55 leading-relaxed">
          We will not send automated marketing emails. A member of our team may reach out directly.
        </p>
      </div>
    </form>
  );
}

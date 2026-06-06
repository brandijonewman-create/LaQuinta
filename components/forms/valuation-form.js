'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { communities } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle2 } from 'lucide-react';

export default function ValuationForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', community: '',
    sqft: '', beds: '', baths: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  function setField(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const r = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed.');
      trackEvent('valuation_request', { community: form.community || 'unknown' });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto border border-border bg-sand-50 p-10 lg:p-14 text-center">
        <CheckCircle2 size={36} className="text-palm mx-auto" />
        <h2 className="font-serif text-3xl text-palm mt-5">Thanks — we have your request.</h2>
        <p className="text-foreground/75 mt-4 leading-relaxed">
          Your information is recorded. Our team will follow up directly with a
          California-licensed agent partner who can produce an honest range
          valuation. We do not send automated emails or sell your information.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" required>
          <input required value={form.name} onChange={(e) => setField('name', e.target.value)} className="input-field" placeholder="Your name" />
        </Field>
        <Field label="Email" required>
          <input required type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} className="input-field" placeholder="you@example.com" />
        </Field>
        <Field label="Phone (optional)">
          <input type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} className="input-field" placeholder="(760) 555-0100" />
        </Field>
        <Field label="Community">
          <select value={form.community} onChange={(e) => setField('community', e.target.value)} className="input-field">
            <option value="">Select community…</option>
            {communities.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
            <option value="Other / outside a private club">Other / outside a private club</option>
          </select>
        </Field>
      </div>

      <Field label="Property address" required>
        <input required value={form.address} onChange={(e) => setField('address', e.target.value)} className="input-field" placeholder="Street, La Quinta, CA 92253" />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Sq ft">
          <input value={form.sqft} onChange={(e) => setField('sqft', e.target.value)} className="input-field" placeholder="e.g. 3,200" />
        </Field>
        <Field label="Beds">
          <input value={form.beds} onChange={(e) => setField('beds', e.target.value)} className="input-field" placeholder="e.g. 4" />
        </Field>
        <Field label="Baths">
          <input value={form.baths} onChange={(e) => setField('baths', e.target.value)} className="input-field" placeholder="e.g. 4.5" />
        </Field>
      </div>

      <Field label="Anything else we should know?">
        <textarea rows={4} value={form.notes} onChange={(e) => setField('notes', e.target.value)} className="input-field" placeholder="Recent renovations, course view, etc." />
      </Field>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="pt-2">
        <Button type="submit" disabled={submitting} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 h-12 px-8 text-sm uppercase tracking-[0.18em]">
          {submitting ? 'Submitting…' : 'Request honest range valuation'}
        </Button>
        <p className="text-[11px] text-foreground/55 mt-4 leading-relaxed">
          By submitting you consent to A California-licensed partner agent contacting you directly. We do not sell or share your information.
        </p>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          border: 1px solid hsl(var(--border));
          background: white;
          padding: 0.75rem 1rem;
          color: hsl(var(--foreground));
          outline: none;
          font-family: inherit;
        }
        .input-field:focus { box-shadow: 0 0 0 2px rgba(31,58,46,0.25); }
      `}</style>
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">
        {label}{required && <span className="text-terracotta ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const COMMUNITY_OPTIONS = [
  'PGA West',
  'The Madison Club',
  'The Hideaway',
  'Andalusia Country Club',
  'The Tradition Golf Club',
  'La Quinta Country Club',
  'The Quarry at La Quinta',
  'Other / Broader La Quinta',
];

export default function CollaborateForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    brokerage: '',
    dreLicense: '',
    yearsActive: '',
    website: '',
    specialties: [],
    notes: '',
    agree: false,
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleSpecialty(c) {
    setForm((f) => {
      const has = f.specialties.includes(c);
      return { ...f, specialties: has ? f.specialties.filter((x) => x !== c) : [...f.specialties, c] };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    if (!form.name || !form.email || !form.brokerage || !form.dreLicense) {
      setErrorMsg('Name, email, brokerage, and DRE license number are required.');
      return;
    }
    if (!form.agree) {
      setErrorMsg('Please confirm you are a California-licensed real estate professional.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/collaborate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Submission failed.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Submission failed.');
    }
  }

  if (status === 'success') {
    return (
      <div className="py-6">
        <div className="font-serif text-2xl text-palm mb-3">Application received.</div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Thanks for applying. We review every partner application personally and will respond within 5 business days at the email you provided. — The team at 7671 Enterprises LLC.
        </p>
      </div>
    );
  }

  const inputCls = 'w-full bg-white border border-border rounded-none px-3 py-2 text-sm focus:outline-none focus:border-palm focus:ring-1 focus:ring-palm';
  const labelCls = 'block text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-1.5';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="name">Full name *</label>
          <input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email *</label>
          <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="jane@brokerage.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} placeholder="(760) 555-1234" />
        </div>
        <div>
          <label className={labelCls} htmlFor="yearsActive">Years active</label>
          <input id="yearsActive" value={form.yearsActive} onChange={(e) => update('yearsActive', e.target.value)} className={inputCls} placeholder="e.g. 12" />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="brokerage">Brokerage / firm *</label>
        <input id="brokerage" required value={form.brokerage} onChange={(e) => update('brokerage', e.target.value)} className={inputCls} placeholder="Compass, Coldwell Banker, etc." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="dreLicense">CA DRE license # *</label>
          <input id="dreLicense" required value={form.dreLicense} onChange={(e) => update('dreLicense', e.target.value)} className={inputCls} placeholder="01234567" />
        </div>
        <div>
          <label className={labelCls} htmlFor="website">Website / profile</label>
          <input id="website" value={form.website} onChange={(e) => update('website', e.target.value)} className={inputCls} placeholder="https://" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Communities you specialize in</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {COMMUNITY_OPTIONS.map((c) => {
            const active = form.specialties.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleSpecialty(c)}
                className={`text-left text-xs px-3 py-2 border transition-colors ${active ? 'border-palm bg-palm text-sand-50' : 'border-border bg-white hover:border-palm'}`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="notes">Why La Quinta? (optional)</label>
        <textarea id="notes" rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} className={inputCls} placeholder="A few sentences on your La Quinta experience, recent transactions inside the private clubs, or anything else we should know." />
      </div>

      <label className="flex items-start gap-2 text-xs text-foreground/75">
        <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} className="mt-0.5" />
        <span>I confirm I am a California-licensed real estate professional in good standing, and that the information above is accurate.</span>
      </label>

      {errorMsg ? (
        <div className="text-xs text-terracotta bg-terracotta/5 border border-terracotta/30 p-3">{errorMsg}</div>
      ) : null}

      <Button type="submit" disabled={status === 'submitting'} className="rounded-none w-full bg-palm text-sand-50 hover:bg-palm-700 disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Submit Application'}
      </Button>

      <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 text-center">
        Submitting this form is an inquiry only — not a referral agreement.
      </p>
    </form>
  );
}

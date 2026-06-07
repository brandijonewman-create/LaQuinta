'use client';

import { useState } from 'react';
import { Lock, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// LeadGate — universal per-asset lead capture.
// Renders the gate form on top of a hidden body of content. On successful
// submission, the gate unmounts and the children become visible. The unlock
// is *per asset, per session* — navigating to another gated page requires a
// fresh submission. (Owner spec.)
//
// Props:
//   assetSlug  — unique slug of the gated asset ("buyers-guide", "q3-2026-zip", etc.)
//   assetTitle — human title shown in the gate ("the 2026 La Quinta Buyer's Guide")
//   downloadUrl — optional. If set, the success state shows a Download button.
//   children   — the actual page content, only revealed after gate clears.
export default function LeadGate({ assetSlug, assetTitle, downloadUrl, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    if (!form.name || !form.email || !form.phone) {
      setErrorMsg('Name, email, and phone are required to access this asset.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads/gate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, assetSlug, assetTitle, downloadUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Submission failed.');
      setUnlocked(true);
      setStatus('success');
      // Auto-trigger download if available
      if (downloadUrl) {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = '';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Submission failed.');
    }
  }

  if (unlocked) return <>{children}</>;

  const inputCls = 'w-full bg-white border border-border rounded-none px-3 py-2.5 text-sm focus:outline-none focus:border-palm focus:ring-1 focus:ring-palm';
  const labelCls = 'block text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-1.5';

  return (
    <div className="max-w-2xl mx-auto bg-white border border-palm/15 rounded-xl shadow-sm p-6 md:p-10">
      <div className="flex items-center gap-3 text-palm mb-5">
        <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
          <Lock size={16} />
        </div>
        <div className="text-[11px] uppercase tracking-[0.28em] text-terracotta">
          Free · No Spam · Instant Access
        </div>
      </div>
      <h2 className="font-serif text-2xl md:text-3xl text-palm leading-[1.15] mb-3">
        Get instant access to {assetTitle}.
      </h2>
      <p className="text-sm text-foreground/70 leading-relaxed mb-6">
        Enter your name, email, and phone number and we&rsquo;ll unlock the full content immediately{downloadUrl ? ' and email you the PDF copy' : ''}. We share your information with our partner California-licensed real estate professional in La Quinta.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={labelCls} htmlFor="gate-name">Full name *</label>
          <input id="gate-name" required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} placeholder="Jane Doe" autoComplete="name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="gate-email">Email *</label>
            <input id="gate-email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label className={labelCls} htmlFor="gate-phone">Phone *</label>
            <input id="gate-phone" type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} placeholder="(760) 555-1234" autoComplete="tel" />
          </div>
        </div>

        {errorMsg ? (
          <div className="text-xs text-terracotta bg-terracotta/5 border border-terracotta/30 p-3">{errorMsg}</div>
        ) : null}

        <Button type="submit" disabled={status === 'submitting'} className="rounded-none w-full bg-palm text-sand-50 hover:bg-palm-700 disabled:opacity-60 py-6">
          {status === 'submitting' ? 'Unlocking…' : downloadUrl ? (
            <span className="inline-flex items-center gap-2"><Download size={16} /> Unlock &amp; Download</span>
          ) : (
            <span className="inline-flex items-center gap-2">Unlock Full Content <ArrowRight size={16} /></span>
          )}
        </Button>

        <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 text-center pt-2">
          Your information is used only to deliver this asset and connect you with our partner realtor.
        </p>
      </form>
    </div>
  );
}

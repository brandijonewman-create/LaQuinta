'use client';
import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

// Reusable simple lead form. POSTs to /api/lead with optional source / intent
// / tags so different funnels (snowbird, valuation, quiz) can be segmented.
export default function SimpleLeadForm({ source = 'simple-lead', intent = 'general', extraTags = [], submitLabel = 'Send me the guide', successMessage = 'Got it. Look for our email within one business day.' }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.email) { setErr('Email is required.'); return; }
    setErr('');
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source,
          intent,
          tags: [source, intent, ...extraTags]
        })
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErr('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
        <p className="font-serif text-lg text-[#062840]">Thank you!</p>
        <p className="text-sm text-[#062840]/70 mt-1">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name (optional)" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
      {err && <p className="text-rose-600 text-xs">{err}</p>}
      <button disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3.5 text-sm font-semibold transition disabled:opacity-60">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : submitLabel}
      </button>
      <p className="text-[10px] text-[#062840]/45 leading-relaxed">By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>. No spam, ever.</p>
    </form>
  );
}

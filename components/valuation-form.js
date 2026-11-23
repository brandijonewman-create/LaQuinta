'use client';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ValuationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', community: '', notes: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.address) {
      setStatus('error');
      setMessage('Email and property address are both required.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'home-valuation-tool',
          intent: 'home-valuation',
          tags: ['home-valuation', 'seller-lead', form.community ? `community-${form.community}` : null].filter(Boolean)
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      // GA4 custom conversion event — mark as "key event" in GA4 admin to count as a conversion.
      trackEvent('valuation_request', {
        method: 'home-valuation-tool',
        community: form.community || 'not-specified',
        has_phone: form.phone ? 'yes' : 'no',
        has_notes: form.notes ? 'yes' : 'no'
      });
      setStatus('success');
      setMessage('Got it. Your valuation packet is being prepared: expect an email within 1 business day.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again, or email us via the contact link in the footer.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-[#062840] mb-2">Your request is in.</h3>
        <p className="text-[#062840]/75">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-[#062840]/10 rounded-2xl p-7 shadow-sm space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
      </div>
      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
      <input required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Property address (street, city, ZIP)" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm" />
      <select value={form.community} onChange={e => setForm({ ...form, community: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm bg-white">
        <option value="">Community (optional)</option>
        <option value="grayhawk">Grayhawk</option>
        <option value="dc-ranch">DC Ranch</option>
        <option value="silverleaf">Silverleaf</option>
        <option value="troon-north">Troon North</option>
        <option value="desert-mountain">Desert Mountain</option>
        <option value="estancia">Estancia</option>
        <option value="boulders">The Boulders</option>
        <option value="other">Other / not listed</option>
      </select>
      <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know? (upgrades, golf-course frontage, timeline)" className="w-full px-4 py-3 rounded-lg border border-[#062840]/15 focus:border-[#BA9273] focus:outline-none text-sm h-24 resize-none" />
      {status === 'error' && <p className="text-rose-600 text-sm">{message}</p>}
      <button disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3.5 text-sm font-semibold transition disabled:opacity-60">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'Request my home valuation'}
      </button>
      <p className="text-[10px] text-[#062840]/50 leading-relaxed">We use this information only to prepare your valuation and, if you ask, connect you with a licensed Arizona real estate professional. No spam. See our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
    </form>
  );
}

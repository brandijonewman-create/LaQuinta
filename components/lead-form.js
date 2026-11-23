'use client';
import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', timeline: 'Within 3 months', budget: '$1M\u2013$3M', message: '' });
  const [status, setStatus] = useState('idle');

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        // Fire GA4 conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'USD',
            value: 50,
            lead_source: 'website-form',
            timeline: form.timeline,
            budget: form.budget
          });
        }
        setStatus('success');
      } else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4"><Check className="h-7 w-7 text-amber-600" /></div>
        <h3 className="font-serif text-2xl text-[#062840] mb-2">Thank you, {form.name.split(' ')[0] || 'friend'}.</h3>
        <p className="text-emerald-900/70">A Scottsdale specialist will reach out within 24 hours with a hand-curated shortlist.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-8 md:p-10 grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-2">Private Shortlist</div>
        <h3 className="font-serif text-3xl text-[#062840]">Get hand-picked homes in your inbox</h3>
        <p className="text-sm text-emerald-900/70 mt-1">Tell us what you&rsquo;re looking for. We&rsquo;ll send a vetted shortlist (including off-market homes) within 24 hours.</p>
      </div>
      <input required placeholder="Full name" className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input required type="email" placeholder="Email" className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone (optional)" className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <select className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}>
        <option>Within 3 months</option>
        <option>3&ndash;6 months</option>
        <option>6&ndash;12 months</option>
        <option>Just browsing</option>
      </select>
      <select className="md:col-span-2 rounded-lg border border-emerald-900/15 bg-white text-[#062840] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
        <option>Under $1M</option>
        <option>$1M&ndash;$3M</option>
        <option>$3M&ndash;$5M</option>
        <option>$5M&ndash;$10M</option>
        <option>$10M+</option>
      </select>
      <textarea placeholder="Tell us what matters most (golf course, schools, single-level, view, etc.)" rows={3} className="md:col-span-2 rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      <button disabled={status === 'loading'} className="md:col-span-2 inline-flex justify-center items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-7 py-3 text-sm font-semibold tracking-wide transition disabled:opacity-60">
        {status === 'loading' ? 'Sending\u2026' : <>Send my shortlist request <Send className="h-4 w-4" /></>}
      </button>
      {status === 'error' && <div className="md:col-span-2 text-sm text-rose-700 text-center">Something went wrong. Please try again or refresh the page.</div>}
      <div className="md:col-span-2 text-[11px] text-emerald-900/50 text-center">We respect your inbox. No spam, ever. Reply STOP to opt out.</div>
    </form>
  );
}

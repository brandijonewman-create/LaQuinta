'use client';
import { useState } from 'react';
import { Check, Download, FileText } from 'lucide-react';

export default function GuideDownloadForm({ guideSlug, guideTitle }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle');

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          guideSlug,
          guideTitle
        })
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/pdf')) {
        // Stream the PDF blob and trigger download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${guideSlug}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        // GA4 conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'USD',
            value: 50,
            lead_source: 'lead-magnet-download',
            guide_slug: guideSlug
          });
        }
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Check className="h-7 w-7 text-amber-600" />
        </div>
        <h3 className="font-serif text-2xl text-[#062840] mb-2">
          Your download has started, {form.name.split(' ')[0] || 'friend'}.
        </h3>
        <p className="text-emerald-900/70 mb-5">
          If it didn&rsquo;t open automatically, click the button below. We&rsquo;ve also saved your details so a Scottsdale specialist can answer any follow-up questions.
        </p>
        <button
          onClick={() => submit({ preventDefault: () => {} })}
          className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3 text-sm font-semibold transition"
        >
          <Download className="h-4 w-4" /> Re-download the PDF
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-8 space-y-3">
      <div className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-1">Instant Download</div>
      <h3 className="font-serif text-2xl text-[#062840] leading-tight">Get the guide instantly</h3>
      <p className="text-xs text-emerald-900/70 -mt-1 mb-2 flex items-center gap-1">
        <FileText className="h-3 w-3" /> 11-page branded PDF &middot; downloads immediately
      </p>
      <input
        required
        placeholder="Full name"
        className="w-full rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        required
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <button
        disabled={status === 'loading'}
        className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-50 px-6 py-3 text-sm font-semibold tracking-wide transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Generating your PDF\u2026' : (<><Download className="h-4 w-4" /> Download the guide</>)}
      </button>
      {status === 'error' && (
        <div className="text-sm text-rose-700 text-center">Download failed: please try again. Please try again.</div>
      )}
      <div className="text-[11px] text-emerald-900/50 text-center">No spam. Unsubscribe anytime.</div>
    </form>
  );
}

'use client';

// Lead gate for direct /downloads/[slug] visits. Posts to /api/leads/magnet,
// auto-triggers the PDF download on success, fires both Resend emails.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle2, Download } from 'lucide-react';

export default function DownloadGate({ slug, label, community, requirePhone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const r = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, name, email, phone, community, source: 'downloads-direct' }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed');
      setDownloadUrl(data.downloadUrl);
      trackEvent('lead_capture', { magnet: slug, community });
      try {
        const a = document.createElement('a');
        a.href = data.downloadUrl; a.download = '';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      } catch {}
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-border bg-sand-50 p-8 lg:p-10 text-center">
        <CheckCircle2 size={36} className="text-palm mx-auto" />
        <h2 className="font-serif text-2xl text-palm mt-4">Downloading…</h2>
        <p className="text-foreground/75 mt-3 leading-relaxed text-sm">
          A copy is on its way to <strong>{email}</strong> with a re-download link.
        </p>
        <Button asChild className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 mt-5">
          <a href={downloadUrl} download><Download size={14} className="mr-2" /> Download again</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border bg-sand-50 p-6 lg:p-8">
      <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />Get the guide</div>
      <p className="text-sm text-foreground/70 leading-relaxed mb-5">
        The {label} will be delivered to you on submission and emailed for your records.
      </p>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Name <span className="text-terracotta">*</span></span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-border bg-white px-4 py-3" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Email <span className="text-terracotta">*</span></span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-white px-4 py-3" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Phone <span className="text-terracotta">*</span></span>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-border bg-white px-4 py-3" placeholder="(760) 555-0100" />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 w-full h-12 text-sm uppercase tracking-[0.18em]">
          {submitting ? 'Sending…' : 'Send me the guide'}
        </Button>
        <p className="text-[11px] text-foreground/55 leading-relaxed">
          No automated marketing emails. A member of our team may reach out directly. We do not sell or share your information.
        </p>
      </div>
    </form>
  );
}

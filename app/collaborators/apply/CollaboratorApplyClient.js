'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Send } from 'lucide-react';
import { readLeadSource } from '@/lib/use-lead-source';

const SPECIALTIES = [
  'Desert Mountain',
  'Silverleaf / DC Ranch',
  'Estancia',
  'Whisper Rock',
  'Mirabel',
  'Troon (North & Country Club)',
  'Grayhawk',
  'Equity / private clubs (general)',
  'Resort-lifestyle communities',
  'New construction / spec builds',
  'Multiple: see notes'
];

export default function CollaboratorApplyClient() {
  const [form, setForm] = useState({
    name: '',
    brokerage: '',
    license: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    yearsExperience: '',
    specialty: '',
    communities: '',
    pitch: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const requiredEmpty = ['name', 'brokerage', 'email', 'phone'].filter(k => !form[k].trim());
    if (requiredEmpty.length) {
      setError('Please fill all required fields: ' + requiredEmpty.join(', '));
      return;
    }
    setSubmitting(true);
    try {
      const { sourcePath, sourceDetail } = readLeadSource();
      const res = await fetch('/api/collaborator/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sourcePath, sourceDetail })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Submission failed.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-50 to-white p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto mb-4" />
        <h2 className="font-serif text-3xl text-[#062840] mb-3">Application received.</h2>
        <p className="text-[#062840]/75 leading-relaxed max-w-xl mx-auto">
          Thank you, <strong>{form.name.split(' ')[0]}</strong>. We&rsquo;ve received your application and will review it personally within 48 hours. If we see an editorial fit, we&rsquo;ll be in touch via the email you provided to schedule an introductory call.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#BA9273]">7671 Enterprises LLC &middot; Scottsdale Golf Lifestyle</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[#062840]/10 bg-white p-6 md:p-10 shadow-sm">
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {/* Section: about you */}
      <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#BA9273]">01 &middot; About you</div>
      <h3 className="font-serif text-xl text-[#062840] mb-5">The basics</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-7">
        <Field label="Full name" required>
          <input value={form.name} onChange={update('name')} required type="text" className={inputCls} placeholder="Jane Doe" />
        </Field>
        <Field label="Brokerage / firm" required>
          <input value={form.brokerage} onChange={update('brokerage')} required type="text" className={inputCls} placeholder="Your firm name" />
        </Field>
        <Field label="Email" required>
          <input value={form.email} onChange={update('email')} required type="email" className={inputCls} placeholder="you@yourfirm.com" />
        </Field>
        <Field label="Phone" required>
          <input value={form.phone} onChange={update('phone')} required type="tel" className={inputCls} placeholder="(602) 555-0123" />
        </Field>
        <Field label="Arizona real estate license #">
          <input value={form.license} onChange={update('license')} type="text" className={inputCls} placeholder="SA123456000" />
        </Field>
        <Field label="Years working the Scottsdale luxury / golf market">
          <input value={form.yearsExperience} onChange={update('yearsExperience')} type="text" className={inputCls} placeholder="e.g. 12" />
        </Field>
      </div>

      {/* Section: presence */}
      <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#BA9273]">02 &middot; Online presence</div>
      <h3 className="font-serif text-xl text-[#062840] mb-5">Where can we verify your work?</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-7">
        <Field label="Website / brokerage profile URL">
          <input value={form.website} onChange={update('website')} type="url" className={inputCls} placeholder="https://www.yourfirm.com" />
        </Field>
        <Field label="LinkedIn URL">
          <input value={form.linkedin} onChange={update('linkedin')} type="url" className={inputCls} placeholder="https://linkedin.com/in/yourname" />
        </Field>
      </div>

      {/* Section: focus */}
      <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#BA9273]">03 &middot; Your focus</div>
      <h3 className="font-serif text-xl text-[#062840] mb-5">Where do you actually do most of your business?</h3>

      <div className="grid gap-4 mb-7">
        <Field label="Primary specialty">
          <select value={form.specialty} onChange={update('specialty')} className={inputCls + ' bg-white'}>
            <option value="">Select your strongest market</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Communities you've closed deals in (last 24 months)" hint="Free text. E.g. Desert Mountain, Silverleaf, Estancia, Talus, Whisper Rock…">
          <textarea value={form.communities} onChange={update('communities')} rows={3} className={textareaCls} placeholder="Desert Mountain (4 closings), Silverleaf (2), Estancia (1)…" />
        </Field>
      </div>

      {/* Section: pitch */}
      <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#BA9273]">04 &middot; The pitch</div>
      <h3 className="font-serif text-xl text-[#062840] mb-5">Why this partnership?</h3>
      <Field label="Tell us why you want to be a Scottsdale Golf Lifestyle Preferred Partner" hint="Two or three paragraphs is plenty. What you'd bring; what you'd want in return.">
        <textarea value={form.pitch} onChange={update('pitch')} rows={6} className={textareaCls} placeholder="The kind of buyer I work with, what differentiates my service, the editorial content I could contribute, and what kind of partnership I'm looking for…" />
      </Field>

      {/* Submit */}
      <div className="mt-8 pt-6 border-t border-[#062840]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-xs text-[#062840]/60 leading-relaxed max-w-md">
          Submissions are reviewed personally. We respond to every application within 48 hours regardless of fit.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] disabled:bg-[#062840]/40 text-amber-100 px-7 py-3 text-sm font-semibold transition flex-shrink-0"
        >
          {submitting ? (
            <>Sending<span className="ml-1 inline-block animate-pulse">…</span></>
          ) : (
            <>Submit application <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls = 'w-full rounded-lg border border-[#062840]/15 bg-[#fdfaf4]/40 px-4 py-2.5 text-[15px] text-[#062840] placeholder:text-[#062840]/35 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition';
const textareaCls = inputCls + ' resize-y leading-relaxed';

function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-semibold uppercase tracking-wider text-[#062840]/70 mb-1.5">
        {label}
        {required && <span className="text-amber-600 ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1.5 text-[12px] text-[#062840]/50 leading-relaxed">{hint}</span>}
    </label>
  );
}

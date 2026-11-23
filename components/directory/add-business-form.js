'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, CATEGORY_GROUPS, CITIES, LICENSE_AUTHORITIES, categoryBySlug } from '@/lib/directory';

const input = 'w-full rounded-lg border border-[#062840]/20 bg-white px-4 py-3 text-[#062840] focus:outline-none focus:border-[#BA9273]';
const label = 'block text-sm text-[#062840] mb-1';

function Field({ name, label: text, error, hint, children }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{text}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-[#062840]/60">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function AddBusinessForm() {
  const router = useRouter();
  const [form, setForm] = useState({ category: '', city: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState('details');
  const [pending, setPending] = useState(null);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const cat = categoryBySlug[form.category];

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErrors({}); setMessage('');
    try {
      const res = await fetch('/api/directory/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.errors) setErrors(data.errors);
      else if (data.ok) { setPending(data); setStep('code'); }
      else setMessage(data.error || 'Something went wrong. Please try again.');
    } catch { setMessage('Something went wrong. Please try again.'); }
    setBusy(false);
  }

  async function verify(e) {
    e.preventDefault();
    setBusy(true); setMessage('');
    try {
      const res = await fetch('/api/directory/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: pending.id, code }) });
      const data = await res.json();
      if (data.ok) router.push(`/guide/thank-you?status=${data.status}&listing=${encodeURIComponent(data.slug)}`);
      else setMessage(data.error || 'Something went wrong. Please try again.');
    } catch { setMessage('Something went wrong. Please try again.'); }
    setBusy(false);
  }

  if (step === 'code') {
    return (
      <form onSubmit={verify} className="space-y-5 max-w-md">
        <h2 className="font-serif text-2xl text-[#062840]">Check your email</h2>
        <p className="text-[#062840]/80">We sent a 6-digit code to <strong>{pending.email}</strong>. Enter it to confirm the business is yours.</p>
        {pending.previewCode && <p className="text-xs bg-amber-100 text-amber-900 rounded p-2">Preview only: your code is {pending.previewCode}</p>}
        <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className={`${input} text-2xl tracking-[0.5em] text-center`} aria-label="Code" />
        {message && <p className="text-sm text-red-700">{message}</p>}
        <button disabled={busy || code.length !== 6} className="w-full px-6 py-3 rounded-full bg-[#BA9273] text-white hover:bg-[#a67f61] disabled:opacity-50">
          {busy ? 'Confirming your business...' : 'Confirm and finish'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" className="hidden" onChange={set('company_fax')} aria-hidden="true" />

      <Field name="name" label="Business name" error={errors.name}>
        <input id="name" className={input} onChange={set('name')} />
      </Field>

      <div className="grid md:grid-cols-2 gap-5">
        <Field name="category" label="Category" error={errors.category}>
          <select id="category" className={input} value={form.category} onChange={set('category')}>
            <option value="">Choose a category</option>
            {CATEGORY_GROUPS.map((g) => (
              <optgroup key={g.slug} label={g.name}>
                {CATEGORIES.filter((c) => c.group === g.slug).map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field name="city" label="City" error={errors.city}>
          <select id="city" className={input} value={form.city} onChange={set('city')}>
            <option value="">Choose a city</option>
            {CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid md:grid-cols-[1fr_140px] gap-5">
        <Field name="street" label="Street address" error={errors.street}>
          <input id="street" className={input} autoComplete="street-address" onChange={set('street')} />
        </Field>
        <Field name="zip" label="ZIP" error={errors.zip}>
          <input id="zip" className={input} inputMode="numeric" maxLength={5} autoComplete="postal-code" onChange={set('zip')} />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field name="website" label="Website" error={errors.website} hint="Full address, for example https://yourbusiness.com">
          <input id="website" className={input} type="url" placeholder="https://" onChange={set('website')} />
        </Field>
        <Field name="phone" label="Business phone" error={errors.phone}>
          <input id="phone" className={input} type="tel" autoComplete="tel" onChange={set('phone')} />
        </Field>
      </div>

      <Field name="email" label="Business email" error={errors.email} hint="Use an email on your website's domain. We send a code there to confirm the business is yours.">
        <input id="email" className={input} type="email" autoComplete="email" onChange={set('email')} />
      </Field>

      {cat?.license && (
        <Field name="licenseNumber" label="Arizona license number" error={errors.licenseNumber} hint={`Issued by the ${LICENSE_AUTHORITIES[cat.license]}.`}>
          <input id="licenseNumber" className={input} onChange={set('licenseNumber')} />
        </Field>
      )}

      <Field name="description" label="Short description (optional)" error={errors.description} hint="Up to 300 characters.">
        <textarea id="description" rows={3} maxLength={300} className={input} onChange={set('description')} />
      </Field>

      <Field name="submitterName" label="Your name" error={errors.submitterName}>
        <input id="submitterName" className={input} autoComplete="name" onChange={set('submitterName')} />
      </Field>

      {message && <p className="text-sm text-red-700">{message}</p>}
      <button disabled={busy} className="w-full md:w-auto px-8 py-3 rounded-full bg-[#BA9273] text-white hover:bg-[#a67f61] disabled:opacity-50">
        {busy ? 'Sending...' : 'Add my business free'}
      </button>
      <p className="text-xs text-[#062840]/60">We confirm every business is real and local before it appears.</p>
    </form>
  );
}

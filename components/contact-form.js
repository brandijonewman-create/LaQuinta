'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: `[contact-form] ${message}` })
      });
      const data = await res.json();
      setStatus(data.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-emerald-900/15 bg-emerald-50/50 p-8 text-center">
        <div className="font-serif text-2xl text-[#062840] mb-2">Message received.</div>
        <p className="text-emerald-900/75 text-sm">Thank you. We read every message and reply to those that need a reply, usually within two business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          placeholder="Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
        />
      </div>
      <textarea
        required
        rows={6}
        placeholder="Your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="rounded-lg border border-emerald-900/15 bg-white text-[#062840] placeholder:text-emerald-900/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#0a3a55] text-amber-100 px-7 py-3 text-sm font-semibold transition disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && <p className="text-sm text-rose-700">Something went wrong. Please try again.</p>}
    </form>
  );
}

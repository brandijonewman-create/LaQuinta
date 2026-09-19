'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { quizQuestions } from '@/lib/quiz-matcher';
import { trackEvent } from '@/lib/analytics';
import {
  ArrowLeft,
  RotateCcw,
  Download,
  CheckCircle2,
  Copy as CopyIcon,
  Check,
  Mail as MailIcon,
  MessageCircle,
  Share2,
} from 'lucide-react';

// ---- Shareable-URL encoding helpers ---------------------------------------
// Format: /community-quiz?a=<qid>:<val>,<qid>:<val>,...
// Answer values are kebab-case in the source data, so they URL-encode cleanly
// without needing a lookup table.

function encodeAnswers(answers) {
  return Object.entries(answers)
    .map(([k, v]) => `${k}:${v}`)
    .join(',');
}

function decodeAnswers(str) {
  if (!str) return null;
  const out = {};
  for (const pair of str.split(',')) {
    const idx = pair.indexOf(':');
    if (idx < 0) continue;
    const k = pair.slice(0, idx);
    const v = pair.slice(idx + 1);
    if (k && v) out[k] = v;
  }
  // Confirm every question has been answered — otherwise the shared URL
  // is corrupt and we should fall back to the empty quiz.
  const missing = quizQuestions.find((q) => !out[q.id]);
  return missing ? null : out;
}

export default function QuizClient() {
  // stage: 'q' | 'result' | 'done'
  const [stage, setStage] = useState('q');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [match, setMatch] = useState(null);
  // Whether the visitor landed on the result via a shared link (vs. having
  // just completed the quiz themselves). Toggles a small banner.
  const [arrivedViaLink, setArrivedViaLink] = useState(false);
  const [rehydrating, setRehydrating] = useState(false);

  // lead form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // share section
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const rehydratedOnce = useRef(false);

  const total = quizQuestions.length;
  const currentQ = quizQuestions[step];
  const currentAns = answers[currentQ?.id];

  // ---- Rehydrate from shared URL on mount --------------------------------
  useEffect(() => {
    if (rehydratedOnce.current) return;
    rehydratedOnce.current = true;
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a');
    const parsed = decodeAnswers(a);
    if (!parsed) return;
    setRehydrating(true);
    setAnswers(parsed);
    (async () => {
      try {
        const r = await fetch('/api/quiz/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ answers: parsed }),
        });
        const data = await r.json();
        if (!data.ok) throw new Error(data.error || 'Score failed');
        setMatch(data);
        setStage('result');
        setArrivedViaLink(true);
        trackEvent('quiz_result_shared_view', { top_match: data.top.slug });
      } catch (e) {
        // Bad URL — silently fall back to the empty quiz.
        setError('');
      } finally {
        setRehydrating(false);
      }
    })();
  }, []);

  // ---- On result stage entry (fresh completion), sync URL so the current
  // browser location is itself shareable. Skip when the visitor already
  // arrived with the URL populated. ----------------------------------------
  useEffect(() => {
    if (stage !== 'result') return;
    if (typeof window === 'undefined') return;
    if (Object.keys(answers).length !== total) return;
    const encoded = encodeAnswers(answers);
    const params = new URLSearchParams(window.location.search);
    if (params.get('a') !== encoded) {
      params.set('a', encoded);
      const next = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', next);
    }
    // Capture the final absolute URL into state so the share input renders
    // the up-to-date value (history.replaceState alone doesn't re-render).
    setShareUrl(window.location.href);
  }, [stage, answers, total]);

  async function pick(value) {
    const next = { ...answers, [currentQ.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      // last question — score now and move to result
      try {
        const r = await fetch('/api/quiz/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ answers: next }),
        });
        const data = await r.json();
        if (!data.ok) throw new Error(data.error || 'Score failed');
        setMatch(data);
        setStage('result');
        setArrivedViaLink(false);
        trackEvent('quiz_complete', { top_match: data.top.slug, score: data.top.score });
      } catch (e) {
        setError(e.message);
      }
    }
  }

  function back() {
    setError('');
    if (stage === 'q') {
      if (step > 0) setStep(step - 1);
    } else if (stage === 'result') {
      setStage('q');
      setArrivedViaLink(false);
    }
  }

  function restart() {
    setStep(0); setAnswers({}); setMatch(null);
    setName(''); setEmail(''); setPhone('');
    setDownloadUrl(''); setError(''); setStage('q');
    setArrivedViaLink(false);
    setShareUrl('');
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const slug = `community-guide-${match.top.slug}`;
      const r = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          slug,
          name, email, phone,
          community: match.top.name,
          source: 'community-quiz',
          quizAnswers: answers,
          runnersUp: match.runnersUp.map((r) => r.name),
        }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed');
      setDownloadUrl(data.downloadUrl);
      trackEvent('lead_capture', { magnet: slug, community: match.top.name });
      // Auto-download
      try {
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch {}
      setStage('done');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Share helpers -----------------------------------------------------
  function currentShareUrl() {
    return shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
  }
  function shareText() {
    if (!match) return '';
    return `My La Quinta community match is ${match.top.name}. Take the 60-second quiz to find yours:`;
  }
  async function onCopyLink() {
    const url = currentShareUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent('quiz_result_share', { channel: 'copy', top_match: match?.top?.slug });
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Older browsers — fall back to a temp textarea copy.
      try {
        const t = document.createElement('textarea');
        t.value = url;
        t.style.position = 'fixed';
        t.style.opacity = '0';
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {
        // No-op; user can select & copy manually from the input.
      }
    }
  }
  function smsHref() {
    // iOS uses `&`, Android uses `?`. Both accept `&body=`; using `?body=` is
    // the more compatible form and iOS 8+ tolerates it. We keep this simple.
    return `sms:?&body=${encodeURIComponent(`${shareText()} ${currentShareUrl()}`)}`;
  }
  function emailHref() {
    const subject = encodeURIComponent(`My La Quinta community match: ${match?.top?.name || ''}`);
    const body = encodeURIComponent(`${shareText()}\n\n${currentShareUrl()}\n\nvia La Quinta Golf Lifestyle`);
    return `mailto:?subject=${subject}&body=${body}`;
  }
  async function onNativeShare() {
    if (typeof navigator === 'undefined' || !navigator.share) return onCopyLink();
    try {
      await navigator.share({
        title: `My La Quinta community match: ${match?.top?.name || ''}`,
        text: shareText(),
        url: currentShareUrl(),
      });
      trackEvent('quiz_result_share', { channel: 'native', top_match: match?.top?.slug });
    } catch {
      /* user cancelled — no-op */
    }
  }

  // ---- LOADING (rehydrating from shared URL) -----------------------------
  if (rehydrating && stage !== 'result') {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="inline-block h-6 w-6 border-2 border-palm/25 border-t-palm rounded-full animate-spin" />
        <p className="text-foreground/60 mt-4 text-sm">Loading the shared match&hellip;</p>
      </div>
    );
  }

  // ---- DONE ----
  if (stage === 'done') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="border border-border bg-sand-50 p-10 lg:p-14 text-center">
          <CheckCircle2 size={42} className="text-palm mx-auto" />
          <h2 className="font-serif text-3xl text-palm mt-5">Your guide is downloading&hellip;</h2>
          <p className="text-foreground/75 mt-4 leading-relaxed max-w-md mx-auto">
            We&rsquo;ve also sent a copy to <strong>{email}</strong> with a re-download link.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 h-12 px-7 text-sm uppercase tracking-[0.18em]">
              <a href={downloadUrl} download><Download size={14} className="mr-2" /> Download again</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-palm text-palm hover:bg-palm hover:text-sand-50 h-12 px-7 text-sm uppercase tracking-[0.18em]">
              <Link href={`/communities/${match.top.slug}`}>Read {match.top.name} profile</Link>
            </Button>
            <Button onClick={restart} variant="ghost" className="rounded-none text-foreground/70 hover:text-palm">
              <RotateCcw size={14} className="mr-2" /> Retake quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---- RESULT + LEAD GATE ----
  if (stage === 'result' && match) {
    return (
      <div className="max-w-3xl mx-auto">

        {/* Banner when arriving via a shared link */}
        {arrivedViaLink && (
          <div className="mb-8 border border-gold/50 bg-gold/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-terracotta mb-1">Shared match</div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Someone shared their La Quinta community match with you. Take your own 60-second quiz to find yours &mdash; it&rsquo;s free.
              </p>
            </div>
            <Button onClick={restart} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 text-xs uppercase tracking-[0.18em] shrink-0">
              Start my quiz
            </Button>
          </div>
        )}

        <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-3"><span className="editorial-rule" />Your match</div>
        <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight">
          {match.top.name}
        </h2>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm text-foreground/65">Score</span>
          <span className="font-serif text-3xl text-gold">{match.top.score}<span className="text-foreground/40 text-xl">/{match.top.max}</span></span>
          {match.top.reasons?.length > 0 && (
            <span className="text-xs text-foreground/55 uppercase tracking-[0.16em]">
              &middot; matched on {match.top.reasons.join(', ')}
            </span>
          )}
        </div>
        <p className="text-foreground/80 mt-5 leading-relaxed text-lg">{match.top.why}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {match.runnersUp.map((r, i) => (
            <div key={r.slug} className="border border-border bg-sand-50 p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-terracotta">Runner-up {i + 1}</div>
              <div className="font-serif text-xl text-palm mt-1">{r.name}</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/55 mt-1">Score {r.score}/{r.max}</div>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{r.why}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-foreground/60 mt-6 italic">
          A match, not a recommendation to transact. Walk the community and verify everything that matters with a licensed California professional.
        </p>

        {/* ---- Share this match ---- */}
        <div className="mt-8 border border-border bg-white p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Share2 size={15} className="text-terracotta" />
            <div className="text-[11px] uppercase tracking-[0.24em] text-terracotta">Share this match</div>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            Send it to a spouse, family member, or advisor. The link opens on the same result.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              readOnly
              value={currentShareUrl()}
              onFocus={(e) => e.target.select()}
              className="flex-1 border border-border bg-sand-50 px-3 py-2 text-xs text-foreground/70 font-mono truncate"
              aria-label="Share URL"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCopyLink}
                className="inline-flex items-center gap-2 border border-palm bg-palm text-sand-50 px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-palm-700 transition-colors"
              >
                {copied ? <><Check size={13} /> Copied</> : <><CopyIcon size={13} /> Copy</>}
              </button>
              <a
                href={smsHref()}
                onClick={() => trackEvent('quiz_result_share', { channel: 'sms', top_match: match?.top?.slug })}
                className="inline-flex items-center gap-2 border border-border bg-sand-50 text-palm px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-palm hover:text-sand-50 hover:border-palm transition-colors"
              >
                <MessageCircle size={13} /> Text
              </a>
              <a
                href={emailHref()}
                onClick={() => trackEvent('quiz_result_share', { channel: 'email', top_match: match?.top?.slug })}
                className="inline-flex items-center gap-2 border border-border bg-sand-50 text-palm px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-palm hover:text-sand-50 hover:border-palm transition-colors"
              >
                <MailIcon size={13} /> Email
              </a>
              {typeof navigator !== 'undefined' && navigator.share ? (
                <button
                  type="button"
                  onClick={onNativeShare}
                  className="sm:hidden inline-flex items-center gap-2 border border-border bg-sand-50 text-palm px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-palm hover:text-sand-50 hover:border-palm transition-colors"
                >
                  <Share2 size={13} /> More
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-10 border border-border bg-sand-50 p-6 lg:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-3"><span className="editorial-rule" />Get the printable guide</div>
          <p className="text-foreground/75 leading-relaxed mb-5 text-sm">
            A printable {match.top.name} guide &mdash; the course, the club, the real estate, the questions to ask.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
          {error && <p className="text-sm text-destructive mt-4">{error}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={submitting} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700 h-12 px-7 text-sm uppercase tracking-[0.18em]">
              {submitting ? 'Sending\u2026' : 'Send me the guide'}
            </Button>
            <Button type="button" onClick={arrivedViaLink ? restart : back} variant="ghost" className="rounded-none text-foreground/70 hover:text-palm">
              <ArrowLeft size={14} className="mr-2" /> {arrivedViaLink ? 'Take my own quiz' : 'Adjust answers'}
            </Button>
          </div>
          <p className="text-[11px] text-foreground/55 mt-4 leading-relaxed">
            No automated marketing emails. We&rsquo;ll follow up directly. We do not sell or share your information.
          </p>
        </form>
      </div>
    );
  }

  // ---- QUESTION ----
  const progress = Math.round(((step + (currentAns ? 1 : 0)) / total) * 100);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-foreground/55">
        <span>Question {step + 1} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-2 h-px bg-border relative">
        <div className="absolute inset-y-0 left-0 bg-gold transition-all duration-300" style={{ width: `${progress}%`, height: '2px', top: '-0.5px' }} />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight mt-8">{currentQ.label}</h2>

      <div className="mt-8 space-y-3">
        {currentQ.options.map((opt) => {
          const selected = currentAns === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className={`w-full text-left border px-5 py-4 transition-colors ${
                selected
                  ? 'border-palm bg-palm text-sand-50'
                  : 'border-border bg-white hover:border-palm hover:bg-sand-50'
              }`}
            >
              <div className="font-serif text-lg">{opt.label}</div>
              <div className={`text-sm mt-1 ${selected ? 'text-sand-50/80' : 'text-foreground/65'}`}>{opt.detail}</div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive mt-4">{error}</p>}

      {step > 0 && (
        <div className="mt-8">
          <Button onClick={back} variant="ghost" className="rounded-none text-foreground/70 hover:text-palm">
            <ArrowLeft size={14} className="mr-2" /> Back
          </Button>
        </div>
      )}
    </div>
  );
}

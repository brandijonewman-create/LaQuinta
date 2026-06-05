'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { quizQuestions } from '@/lib/quiz-matcher';
import { trackEvent } from '@/lib/analytics';
import { ArrowLeft, ArrowRight, RotateCcw, Download, CheckCircle2 } from 'lucide-react';

export default function QuizClient() {
  // stage: 'q' | 'result' | 'done'
  const [stage, setStage] = useState('q');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [match, setMatch] = useState(null);

  // lead form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const total = quizQuestions.length;
  const currentQ = quizQuestions[step];
  const currentAns = answers[currentQ?.id];

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
    }
  }

  function restart() {
    setStep(0); setAnswers({}); setMatch(null);
    setName(''); setEmail(''); setPhone('');
    setDownloadUrl(''); setError(''); setStage('q');
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

  // ---- DONE ----
  if (stage === 'done') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="border border-border bg-sand-50 p-10 lg:p-14 text-center">
          <CheckCircle2 size={42} className="text-palm mx-auto" />
          <h2 className="font-serif text-3xl text-palm mt-5">Your guide is downloading…</h2>
          <p className="text-foreground/75 mt-4 leading-relaxed max-w-md mx-auto">
            We\u2019ve also sent a copy to <strong>{email}</strong> with a re-download link.
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
        <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-3"><span className="editorial-rule" />Your match</div>
        <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight">
          {match.top.name}
        </h2>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm text-foreground/65">Score</span>
          <span className="font-serif text-3xl text-gold">{match.top.score}<span className="text-foreground/40 text-xl">/{match.top.max}</span></span>
          {match.top.reasons?.length > 0 && (
            <span className="text-xs text-foreground/55 uppercase tracking-[0.16em]">
              · matched on {match.top.reasons.join(', ')}
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

        <form onSubmit={submit} className="mt-10 border border-border bg-sand-50 p-6 lg:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-terracotta mb-3"><span className="editorial-rule" />Get the printable guide</div>
          <p className="text-foreground/75 leading-relaxed mb-5 text-sm">
            A printable {match.top.name} guide — the course, the club, the real estate, the questions to ask. Free.
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
              {submitting ? 'Sending…' : 'Send me the guide'}
            </Button>
            <Button type="button" onClick={back} variant="ghost" className="rounded-none text-foreground/70 hover:text-palm">
              <ArrowLeft size={14} className="mr-2" /> Adjust answers
            </Button>
          </div>
          <p className="text-[11px] text-foreground/55 mt-4 leading-relaxed">
            No automated marketing emails. Brandi may reach out directly. We do not sell or share your information.
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

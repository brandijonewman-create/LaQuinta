'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { QUIZ_QUESTIONS } from '@/lib/quiz-scoring';
import { trackEvent } from '@/lib/analytics';
import { ArrowLeft, ArrowRight, RotateCcw, ArrowUpRight } from 'lucide-react';

export default function QuizFlow() {
  const [step, setStep] = useState(0); // 0..n-1 = questions, n = email (optional), n+1 = results
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const total = QUIZ_QUESTIONS.length;
  const onEmailStep = step === total;
  const onResults = step === total + 1;
  const onQuestion = step < total;
  const currentQ = onQuestion ? QUIZ_QUESTIONS[step] : null;
  const currentAnswer = currentQ ? answers[currentQ.id] : null;

  function pickAnswer(qid, value) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function next() {
    setError('');
    if (onQuestion && !currentAnswer) { setError('Please pick an option.'); return; }
    setStep((s) => s + 1);
  }

  function back() { setError(''); setStep((s) => Math.max(0, s - 1)); }

  function restart() {
    setStep(0); setAnswers({}); setName(''); setEmail(''); setResults(null); setError('');
  }

  async function submit(saveContact) {
    setSubmitting(true); setError('');
    try {
      const payload = { answers };
      if (saveContact) { payload.email = email; payload.name = name; }
      const r = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed.');
      setResults(data.results);
      trackEvent('quiz_complete', {
        top_match: data.results?.[0]?.slug || 'unknown',
        contacted: saveContact ? 'yes' : 'no',
      });
      setStep(total + 1);
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  // Render: results
  if (onResults && results) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />Your top matches</div>
        <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight">
          The three La Quinta communities most aligned with your answers.
        </h2>
        <p className="text-foreground/70 mt-4 leading-relaxed">
          These rankings come from your eight responses scored against publicly known
          characteristics of each club. They are a starting point — not a recommendation
          to buy.
        </p>

        <ol className="mt-10 space-y-6">
          {results.map((r, i) => (
            <li key={r.slug} className="border border-border bg-sand-50 p-6 lg:p-8">
              <div className="flex items-baseline gap-4">
                <div className="font-serif text-5xl text-gold leading-none">{i + 1}</div>
                <div className="flex-1">
                  <div className="font-serif text-2xl text-palm">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 mt-1">
                    {r.architect || 'La Quinta'}
                  </div>
                </div>
                <Link
                  href={`/communities/${r.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta hover:text-palm"
                >
                  Read profile <ArrowUpRight size={13} />
                </Link>
              </div>
              <p className="text-foreground/80 leading-relaxed mt-4">{r.reason}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={restart} variant="outline" className="rounded-none border-palm text-palm hover:bg-palm hover:text-sand-50">
            <RotateCcw size={14} className="mr-2" /> Take it again
          </Button>
          <Button asChild className="rounded-none bg-palm text-sand-50 hover:bg-palm-700">
            <Link href="/communities">Browse all 7 communities</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Render: optional email-capture step
  if (onEmailStep) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="editorial-eyebrow mb-3"><span className="editorial-rule" />Almost there</div>
        <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight">
          Want your results saved?
        </h2>
        <p className="text-foreground/70 mt-3 leading-relaxed">
          Optional. Drop your name and email and we&rsquo;ll keep your top-three matches on file
          so you can revisit them. We do not sell or share your information. We do not send
          automated emails. Brandi may reach out directly.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-palm/30"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-palm/30"
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={back} variant="outline" className="rounded-none border-palm text-palm hover:bg-palm hover:text-sand-50">
            <ArrowLeft size={14} className="mr-2" /> Back
          </Button>
          <Button
            onClick={() => submit(true)}
            disabled={submitting || !email}
            className="rounded-none bg-palm text-sand-50 hover:bg-palm-700"
          >
            {submitting ? 'Submitting...' : 'Save & see my results'}
          </Button>
          <Button
            onClick={() => submit(false)}
            disabled={submitting}
            variant="ghost"
            className="rounded-none text-foreground/70 hover:text-palm"
          >
            Skip — just show me
          </Button>
        </div>
      </div>
    );
  }

  // Render: question step
  const progress = Math.round(((step + (currentAnswer ? 1 : 0)) / (total + 1)) * 100);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-foreground/55">
        <span>Question {step + 1} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-2 h-px bg-border relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gold transition-all duration-300" style={{ width: `${progress}%`, height: '2px', top: '-0.5px' }} />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl text-palm leading-tight mt-8">
        {currentQ.label}
      </h2>

      <div className="mt-8 space-y-3">
        {currentQ.options.map((opt) => {
          const selected = currentAnswer === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => pickAnswer(currentQ.id, opt.value)}
              className={`w-full text-left border px-5 py-4 transition-colors ${
                selected
                  ? 'border-palm bg-palm text-sand-50'
                  : 'border-border bg-white hover:border-palm hover:bg-sand-50'
              }`}
            >
              <span className="font-serif text-lg">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive mt-4">{error}</p>}

      <div className="mt-10 flex justify-between">
        <Button onClick={back} disabled={step === 0} variant="outline" className="rounded-none border-palm text-palm hover:bg-palm hover:text-sand-50 disabled:opacity-30">
          <ArrowLeft size={14} className="mr-2" /> Back
        </Button>
        <Button onClick={next} className="rounded-none bg-palm text-sand-50 hover:bg-palm-700">
          {step === total - 1 ? 'Continue' : 'Next'} <ArrowRight size={14} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

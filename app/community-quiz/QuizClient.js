'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { QUIZ_QUESTIONS, matchQuiz, QUIZ_MAX_SCORE, magnetSlugForCommunity } from '@/lib/quiz-matcher';
import { readLeadSource } from '@/lib/use-lead-source';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, CheckCircle2, Download, AlertCircle } from 'lucide-react';

// Interactive 5-question funnel.
//   step 0..4  — quiz questions
//   step 5     — result + lead-gate form (same screen)
//   step 6     — success / download triggered
export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const dlRef = useRef(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const onQuestion = step < totalQuestions;
  const onResult   = step === totalQuestions;

  // Compute match only once all 5 axes have an answer.
  const result = useMemo(() => {
    const haveAll = QUIZ_QUESTIONS.every(q => answers[q.id]);
    if (!haveAll) return null;
    try { return matchQuiz(answers); } catch { return null; }
  }, [answers]);

  function pick(qid, value) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    // auto-advance
    setStep(prev => prev + 1);
  }

  function back() {
    setStep(prev => Math.max(0, prev - 1));
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setForm({ name: '', email: '', phone: '' });
    setSubmitted(false);
    setSubmitError('');
    setDownloadUrl('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setSubmitError('Name, email, and phone are all required.');
      return;
    }
    if (!result?.top) {
      setSubmitError('Quiz result unavailable: please retake the quiz.');
      return;
    }
    setSubmitting(true);
    try {
      const slug = magnetSlugForCommunity(result.top.slug);
      const { sourcePath, sourceDetail } = readLeadSource();
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          community: result.top.name,
          source: 'community-quiz',
          sourcePath,
          sourceDetail,
          quizAnswers: answers,
          runnersUp: result.runnersUp.map(r => r.name)
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong.');
      }
      setDownloadUrl(json.downloadUrl || `/downloads/${slug}.pdf`);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // Auto-trigger download once we have a url + submitted state.
  useEffect(() => {
    if (submitted && downloadUrl && dlRef.current) {
      // micro-delay so React commits the success state before the click
      const t = setTimeout(() => { try { dlRef.current.click(); } catch (e) { /* ignore */ } }, 150);
      return () => clearTimeout(t);
    }
  }, [submitted, downloadUrl]);

  // GA4 event fire (best-effort, no-op if gtag missing)
  useEffect(() => {
    if (submitted && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'quiz_lead_submit', {
          community: result?.top?.name || '',
          score: result?.top?.score || 0
        });
      } catch (e) { /* ignore */ }
    }
  }, [submitted, result]);

  return (
    <div className="bg-white border border-[#062840]/10 rounded-2xl shadow-xl shadow-[#062840]/5 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-[#062840]/10">
        <div
          className="h-full bg-amber-400 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.round((step / totalQuestions) * 100))}%` }}
        />
      </div>

      <div className="p-7 md:p-10">
        {onQuestion && (
          <QuestionCard
            index={step}
            total={totalQuestions}
            question={QUIZ_QUESTIONS[step]}
            onPick={pick}
            onBack={step > 0 ? back : null}
          />
        )}

        {onResult && !submitted && result?.top && (
          <ResultPanel
            result={result}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
            onBack={back}
            onReset={reset}
          />
        )}

        {submitted && result?.top && (
          <SuccessPanel
            result={result}
            downloadUrl={downloadUrl}
            onReset={reset}
            dlRef={dlRef}
          />
        )}
      </div>
    </div>
  );
}

// ---------- sub-components ----------

function QuestionCard({ index, total, question, onPick, onBack }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273]">Question {index + 1} of {total}</div>
        {onBack && (
          <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-[#062840]/55 hover:text-[#062840] transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
      </div>
      <h2 className="font-serif text-2xl md:text-3xl text-[#062840] leading-snug">{question.question}</h2>
      {question.subtitle && (
        <p className="mt-2 text-sm md:text-base text-[#062840]/65 leading-relaxed">{question.subtitle}</p>
      )}
      <div className="mt-6 grid gap-3">
        {question.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onPick(question.id, opt.value)}
            className="group text-left w-full bg-white border-2 border-[#062840]/10 hover:border-amber-400 hover:bg-amber-50/30 rounded-xl p-4 md:p-5 transition"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full border-2 border-[#062840]/30 group-hover:border-amber-500 group-hover:bg-amber-400 transition flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg text-[#062840] group-hover:text-amber-700 transition">{opt.label}</div>
                <div className="text-sm text-[#062840]/65 mt-0.5">{opt.detail}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#062840]/30 group-hover:text-amber-600 group-hover:translate-x-1 transition flex-shrink-0 mt-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultPanel({ result, form, setForm, onSubmit, submitting, submitError, onBack, onReset }) {
  const top = result.top;
  const runners = result.runnersUp;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-700"><Sparkles className="h-3.5 w-3.5" /> Your match</div>
        <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-[#062840]/55 hover:text-[#062840] transition">
          <ArrowLeft className="h-3.5 w-3.5" /> Change my last answer
        </button>
      </div>

      {/* Top match */}
      <div className="rounded-xl border-2 border-amber-400 bg-amber-50/40 p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="font-serif text-3xl md:text-4xl text-[#062840] leading-tight">{top.name}</h2>
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-800 bg-white border border-amber-300 rounded-full px-3 py-1">{top.score}/{QUIZ_MAX_SCORE} match</div>
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#BA9273] mt-1">{top.town} · {top.architect}</div>
        {top.reasons?.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {top.reasons.slice(0, 3).map((r, i) => (
              <li key={i} className="text-sm text-[#062840]/80 flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700 flex-shrink-0 mt-0.5" /><span>{r}</span></li>
            ))}
          </ul>
        )}
      </div>

      {/* Runners-up */}
      {runners.length > 0 && (
        <div className="mt-5">
          <div className="text-xs uppercase tracking-[0.25em] text-[#062840]/55 mb-2">Also strong matches</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {runners.map(r => (
              <div key={r.slug} className="rounded-xl border border-[#062840]/10 bg-white p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-serif text-xl text-[#062840]">{r.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-700">{r.score}/{QUIZ_MAX_SCORE}</div>
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#BA9273] mt-0.5">{r.town}</div>
                {r.reasons?.[0] && <div className="text-xs text-[#062840]/70 mt-2 line-clamp-2">{r.reasons[0]}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lead-gate form */}
      <form onSubmit={onSubmit} className="mt-7 pt-6 border-t border-[#062840]/10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#BA9273] mb-2">Get the {top.name} guide</div>
        <p className="text-sm text-[#062840]/70 mb-4">
          A practical walkthrough of {top.name}: the course, the club model, the real-estate footprint, and who the community honestly fits. Free, instant download.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Full name *"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="sm:col-span-2 w-full rounded-lg border border-[#062840]/15 px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
          <input
            type="email"
            required
            placeholder="Email *"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-[#062840]/15 px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
          <input
            type="tel"
            required
            placeholder="Phone *"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-lg border border-[#062840]/15 px-4 py-2.5 text-[#062840] placeholder:text-[#062840]/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition"
          />
        </div>
        {submitError && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"><AlertCircle className="h-4 w-4 flex-shrink-0" /> <span>{submitError}</span></div>
        )}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] disabled:opacity-60 disabled:cursor-not-allowed text-amber-100 px-6 py-3 text-sm font-semibold transition"
          >
            {submitting ? 'Sending…' : <>Get the {top.name} guide <ArrowRight className="h-4 w-4" /></>}
          </button>
          <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 text-xs text-[#062840]/55 hover:text-[#062840] transition">
            <RotateCcw className="h-3.5 w-3.5" /> Retake the quiz
          </button>
        </div>
        <p className="mt-3 text-[11px] text-[#062840]/45 leading-relaxed">
          We email the guide once. No drip campaigns, no cold calls. We share your information only if you ask us to connect you with a licensed professional.
        </p>
      </form>
    </div>
  );
}

function SuccessPanel({ result, downloadUrl, onReset, dlRef }) {
  const top = result.top;
  return (
    <div className="text-center py-4">
      <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
      <h2 className="font-serif text-2xl md:text-3xl text-[#062840] mt-4">Your {top.name} guide is downloading…</h2>
      <p className="mt-3 text-sm md:text-base text-[#062840]/70 max-w-md mx-auto leading-relaxed">
        We’ve also emailed you a backup link in case the download doesn’t start automatically. Keep an eye on your inbox in the next minute or two.
      </p>
      <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
        {/* Hidden anchor used to trigger the programmatic download */}
        <a ref={dlRef} href={downloadUrl} download className="hidden" aria-hidden="true">download</a>
        <a href={downloadUrl} download className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] text-amber-100 px-6 py-3 text-sm font-semibold transition">
          <Download className="h-4 w-4" /> Download manually
        </a>
        <button onClick={onReset} className="inline-flex items-center gap-1.5 text-xs text-[#062840]/55 hover:text-[#062840] transition">
          <RotateCcw className="h-3.5 w-3.5" /> Retake the quiz
        </button>
      </div>
      <div className="mt-8 pt-6 border-t border-[#062840]/10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#062840]/55 mb-3">Also worth your time</div>
        <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
          <Link href={`/communities/${top.slug}`} className="text-amber-700 hover:text-amber-900 underline underline-offset-4">Full {top.name} deep-dive</Link>
          <Link href="/market-reports" className="text-amber-700 hover:text-amber-900 underline underline-offset-4">Latest market report</Link>
          <Link href="/guides/scottsdale-buyers-guide-2026" className="text-amber-700 hover:text-amber-900 underline underline-offset-4">The 2026 buyer’s guide</Link>
        </div>
      </div>
    </div>
  );
}

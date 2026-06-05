import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { quizCollection, valuationCollection, leadCollection } from '@/lib/mongodb';
import { scoreQuiz } from '@/lib/quiz-matcher';
import { getMagnet } from '@/lib/lead-magnets';
import { sendQuizLeadOwnerEmail, sendQuizLeadConfirmationEmail } from '@/lib/email';

const PASSPHRASE = process.env.LEAD_RETRIEVAL_PASSPHRASE || '';
const CSV_KEY = process.env.LEADS_ACCESS_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

const json = (body, init = {}) => NextResponse.json(body, init);
const err  = (msg, status = 400) => json({ ok: false, error: msg }, { status });

function cleanString(v, max = 500) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}
function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || ''); }
async function readJson(request) { try { return await request.json(); } catch { return {}; } }
async function clientMeta(request) {
  return {
    ip:        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
    userAgent: request.headers.get('user-agent') || null,
    referer:   request.headers.get('referer') || null,
  };
}

// ---- POST /api/quiz/score — score-only, no persistence ----
async function handleQuizScore(request) {
  const body = await readJson(request);
  const answers = body?.answers || {};
  const result = scoreQuiz(answers);
  return json({ ok: true, ...result });
}

// ---- POST /api/quiz — legacy persistence (kept for back-compat) ----
async function handleQuiz(request) {
  const body = await readJson(request);
  const answers = body?.answers || {};
  if (typeof answers !== 'object' || Array.isArray(answers)) return err('Invalid answers payload.');
  const result = scoreQuiz(answers);
  const submission = {
    id: randomUUID(),
    type: 'quiz',
    createdAt: new Date().toISOString(),
    answers,
    results: [result.top, ...result.runnersUp],
    email: cleanString(body?.email, 200) || null,
    name: cleanString(body?.name, 120) || null,
    meta: await clientMeta(request),
  };
  if (submission.email && !isEmail(submission.email)) return err('Invalid email.');
  try { await (await quizCollection()).insertOne(submission); } catch { return err('Database error.', 500); }
  return json({ ok: true, id: submission.id, results: submission.results });
}

// ---- POST /api/valuation ----
async function handleValuation(request) {
  const body = await readJson(request);
  for (const f of ['address', 'email', 'name']) if (!cleanString(body?.[f])) return err(`Missing field: ${f}`);
  const email = cleanString(body.email, 200);
  if (!isEmail(email)) return err('Invalid email.');
  const submission = {
    id: randomUUID(), type: 'valuation', createdAt: new Date().toISOString(),
    address: cleanString(body.address, 500), name: cleanString(body.name, 120), email,
    phone: cleanString(body.phone, 60), community: cleanString(body.community, 120),
    sqft: cleanString(body.sqft, 30), beds: cleanString(body.beds, 30), baths: cleanString(body.baths, 30),
    notes: cleanString(body.notes, 2000), meta: await clientMeta(request),
  };
  try { await (await valuationCollection()).insertOne(submission); } catch { return err('Database error.', 500); }
  return json({ ok: true, id: submission.id });
}

// ---- POST /api/leads — legacy generic lead capture ----
async function handleLeadCapture(request) {
  const body = await readJson(request);
  const email = cleanString(body?.email, 200);
  const name  = cleanString(body?.name, 120);
  const magnet = cleanString(body?.magnet, 120);
  if (!isEmail(email)) return err('Invalid email.');
  if (!magnet) return err('Missing magnet slug.');
  const submission = { id: randomUUID(), type: 'lead_magnet', createdAt: new Date().toISOString(), magnet, email, name, meta: await clientMeta(request) };
  try { await (await leadCollection()).insertOne(submission); } catch { return err('Database error.', 500); }
  return json({ ok: true, id: submission.id });
}

// ---- POST /api/leads/magnet — NEW quiz-magnet funnel ----
async function handleLeadsMagnet(request) {
  const body = await readJson(request);
  const slug    = cleanString(body?.slug, 120);
  const name    = cleanString(body?.name, 120);
  const email   = cleanString(body?.email, 200);
  const phone   = cleanString(body?.phone, 60);
  const community = cleanString(body?.community, 200);
  const source = cleanString(body?.source, 60) || 'community-quiz';
  const quizAnswers = (body?.quizAnswers && typeof body.quizAnswers === 'object') ? body.quizAnswers : {};
  const runnersUp = Array.isArray(body?.runnersUp) ? body.runnersUp.map((s) => cleanString(s, 200)) : [];

  if (!slug)          return err('Missing slug.');
  const magnet = getMagnet(slug);
  if (!magnet)        return err('Unknown magnet.');
  if (!name)          return err('Missing name.');
  if (!isEmail(email))return err('Invalid email.');
  if (magnet.requirePhone && !phone) return err('Missing phone.');

  const submission = {
    id: randomUUID(),
    type: 'quiz-magnet',
    createdAt: new Date().toISOString(),
    slug, source,
    payload: { name, email, phone, community, quizAnswers, runnersUp },
    meta: await clientMeta(request),
  };
  try { await (await leadCollection()).insertOne(submission); } catch { return err('Database error.', 500); }

  const downloadUrl = magnet.file;

  // Fire-and-forget email sends; do not block response.
  Promise.allSettled([
    sendQuizLeadOwnerEmail({ name, email, phone, matchedCommunity: community, runnersUp, quizAnswers }),
    sendQuizLeadConfirmationEmail({ name, email, matchedCommunity: community, downloadUrl, baseUrl: BASE_URL }),
  ]).then((res) => {
    res.forEach((r, i) => {
      const which = i === 0 ? 'owner' : 'confirmation';
      if (r.status === 'fulfilled') console.log(`[email/${which}]`, r.value);
      else                          console.log(`[email/${which}] rejected`, r.reason);
    });
  });

  return json({ ok: true, downloadUrl });
}

// ---- GET /api/leads — admin retrieval (legacy passphrase) ----
async function handleLeadRetrieval(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!PASSPHRASE || key !== PASSPHRASE) return err('Unauthorized.', 401);
  try {
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '500', 10), 2000);
    const [quiz, valuation, leads] = await Promise.all([
      (await quizCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
      (await valuationCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
      (await leadCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
    ]);
    return json({ ok: true, counts: { quiz: quiz.length, valuation: valuation.length, leadMagnet: leads.length }, quiz, valuation, leadMagnet: leads });
  } catch { return err('Database error.', 500); }
}

// ---- GET /api/leads/export.csv — LEADS_ACCESS_KEY-gated CSV export ----
async function handleLeadsExportCsv(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!CSV_KEY || key !== CSV_KEY) return new Response('Unauthorized', { status: 401 });
  try {
    const docs = await (await leadCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(5000).toArray();
    const cols = ['createdAt','type','source','slug','name','email','phone','community','runnersUp','quizAnswers','ip','userAgent','referer'];
    const esc = (v) => {
      if (v == null) return '';
      const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
      return '"' + s.replace(/"/g, '""') + '"';
    };
    const rows = [cols.join(',')];
    for (const d of docs) {
      const p = d.payload || {};
      const m = d.meta || {};
      rows.push([
        d.createdAt, d.type, d.source || '', d.slug || d.magnet || '',
        p.name || d.name || '', p.email || d.email || '', p.phone || '',
        p.community || '',
        Array.isArray(p.runnersUp) ? p.runnersUp.join(' | ') : '',
        p.quizAnswers || d.answers || '',
        m.ip || '', m.userAgent || '', m.referer || '',
      ].map(esc).join(','));
    }
    return new Response(rows.join('\n'), {
      status: 200,
      headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="leads.csv"' },
    });
  } catch { return new Response('Database error', { status: 500 }); }
}

// ---- Router ----
export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  if (path === '')                  return json({ ok: true, service: 'La Quinta Golf Lifestyle API', endpoints: ['POST /api/quiz/score','POST /api/quiz','POST /api/valuation','POST /api/leads','POST /api/leads/magnet','GET /api/leads?key=...','GET /api/leads/export.csv?key=...'] });
  if (path === 'leads')             return handleLeadRetrieval(request);
  if (path === 'leads/export.csv')  return handleLeadsExportCsv(request);
  return err('Not found.', 404);
}
export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  switch (path) {
    case 'quiz/score':    return handleQuizScore(request);
    case 'quiz':          return handleQuiz(request);
    case 'valuation':     return handleValuation(request);
    case 'leads':         return handleLeadCapture(request);
    case 'leads/magnet':  return handleLeadsMagnet(request);
    default:              return err(`POST /api/${path} not implemented.`, 404);
  }
}

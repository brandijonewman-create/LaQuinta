import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { quizCollection, valuationCollection, leadCollection } from '@/lib/mongodb';
import { scoreQuiz } from '@/lib/quiz-scoring';

const PASSPHRASE = process.env.LEAD_RETRIEVAL_PASSPHRASE || '';

const json = (body, init = {}) => NextResponse.json(body, init);
const err = (msg, status = 400) => json({ ok: false, error: msg }, { status });

function cleanString(v, max = 500) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');
}

async function readJson(request) {
  try { return await request.json(); } catch { return {}; }
}

async function clientMeta(request) {
  return {
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
    userAgent: request.headers.get('user-agent') || null,
    referer: request.headers.get('referer') || null,
  };
}

// --- Handlers ---

async function handleQuiz(request) {
  const body = await readJson(request);
  const answers = body?.answers || {};
  if (typeof answers !== 'object' || Array.isArray(answers)) {
    return err('Invalid answers payload.');
  }
  const results = scoreQuiz(answers);
  const submission = {
    id: randomUUID(),
    type: 'quiz',
    createdAt: new Date().toISOString(),
    answers,
    results,
    email: cleanString(body?.email, 200) || null,
    name: cleanString(body?.name, 120) || null,
    meta: await clientMeta(request),
  };
  if (submission.email && !isEmail(submission.email)) {
    return err('Invalid email.');
  }
  try {
    const col = await quizCollection();
    await col.insertOne(submission);
  } catch (e) {
    return err('Database error.', 500);
  }
  return json({ ok: true, id: submission.id, results });
}

async function handleValuation(request) {
  const body = await readJson(request);
  const required = ['address', 'email', 'name'];
  for (const f of required) {
    if (!cleanString(body?.[f])) return err(`Missing field: ${f}`);
  }
  const email = cleanString(body.email, 200);
  if (!isEmail(email)) return err('Invalid email.');

  const submission = {
    id: randomUUID(),
    type: 'valuation',
    createdAt: new Date().toISOString(),
    address:   cleanString(body.address, 500),
    name:      cleanString(body.name, 120),
    email,
    phone:     cleanString(body.phone, 60),
    community: cleanString(body.community, 120),
    sqft:      cleanString(body.sqft, 30),
    beds:      cleanString(body.beds, 30),
    baths:     cleanString(body.baths, 30),
    notes:     cleanString(body.notes, 2000),
    meta: await clientMeta(request),
  };
  try {
    const col = await valuationCollection();
    await col.insertOne(submission);
  } catch {
    return err('Database error.', 500);
  }
  return json({ ok: true, id: submission.id });
}

async function handleLeadCapture(request) {
  const body = await readJson(request);
  const email = cleanString(body?.email, 200);
  const name  = cleanString(body?.name, 120);
  const magnet = cleanString(body?.magnet, 120);
  if (!isEmail(email)) return err('Invalid email.');
  if (!magnet) return err('Missing magnet slug.');

  const submission = {
    id: randomUUID(),
    type: 'lead_magnet',
    createdAt: new Date().toISOString(),
    magnet,
    email,
    name,
    meta: await clientMeta(request),
  };
  try {
    const col = await leadCollection();
    await col.insertOne(submission);
  } catch {
    return err('Database error.', 500);
  }
  return json({ ok: true, id: submission.id });
}

async function handleLeadRetrieval(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!PASSPHRASE || key !== PASSPHRASE) {
    return err('Unauthorized.', 401);
  }
  try {
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '500', 10), 2000);
    const [quiz, valuation, leads] = await Promise.all([
      (await quizCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
      (await valuationCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
      (await leadCollection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray(),
    ]);
    return json({ ok: true, counts: { quiz: quiz.length, valuation: valuation.length, leadMagnet: leads.length }, quiz, valuation, leadMagnet: leads });
  } catch {
    return err('Database error.', 500);
  }
}

// --- Router ---

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  if (path === '') return json({ ok: true, service: 'La Quinta Golf Lifestyle API', endpoints: ['POST /api/quiz', 'POST /api/valuation', 'POST /api/leads', 'GET /api/leads?key=...'] });
  if (path === 'leads') return handleLeadRetrieval(request);
  return err('Not found.', 404);
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  switch (path) {
    case 'quiz':      return handleQuiz(request);
    case 'valuation': return handleValuation(request);
    case 'leads':     return handleLeadCapture(request);
    default:          return err(`POST /api/${path} not implemented.`, 404);
  }
}

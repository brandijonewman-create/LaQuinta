import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { quizCollection, valuationCollection, leadCollection } from '@/lib/mongodb';
import { scoreQuiz } from '@/lib/quiz-matcher';
import { getMagnet } from '@/lib/lead-magnets';
import { sendQuizLeadOwnerEmail, sendQuizLeadConfirmationEmail, sendCollaboratorApplicationEmail, sendContactWelcomeEmail, sendContactPartnerEmail } from '@/lib/email';
import { rateLimit, maybePrune } from '@/lib/rate-limit';

const PASSPHRASE = process.env.LEADS_ACCESS_KEY || process.env.LEAD_RETRIEVAL_PASSPHRASE || '';
const CSV_KEY = process.env.LEADS_ACCESS_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

const json = (body, init = {}) => NextResponse.json(body, init);
const err  = (msg, status = 400) => json({ ok: false, error: msg }, { status });

// Wrap rateLimit so a 429 short-circuits with a consistent shape and a
// Retry-After header the browser can act on.
function limit(request, opts) {
  maybePrune();
  const r = rateLimit(request, opts);
  if (r.ok) return null;
  return json(
    { ok: false, error: r.error },
    { status: 429, headers: { 'Retry-After': String(r.retryAfter) } }
  );
}

// Honeypot: real humans never fill this field. Bots that scrape and submit
// forms typically do. If it's populated we return a 200-OK-ish shape so the
// bot thinks it succeeded, but we never persist anything.
function isHoneypotTripped(body) {
  return Boolean(cleanString(body?.website) || cleanString(body?._hp));
}

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

// ---- POST /api/leads/gate — universal per-asset lead gate ----
async function handleLeadsGate(request) {
  const rl = limit(request, { bucket: 'leads-gate', limit: 5, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  if (isHoneypotTripped(body)) return json({ ok: true, honey: true });

  const name = cleanString(body?.name, 160);
  const email = cleanString(body?.email, 200);
  const phone = cleanString(body?.phone, 50);
  const assetSlug = cleanString(body?.assetSlug, 200);
  const assetTitle = cleanString(body?.assetTitle, 300);
  const downloadUrl = cleanString(body?.downloadUrl, 500);

  if (!name || !email || !phone) return err('Name, email, and phone are required.');
  if (!isEmail(email)) return err('Invalid email.');

  const doc = {
    id: randomUUID(),
    type: 'gated-asset',
    source: assetSlug || 'unknown',
    createdAt: new Date().toISOString(),
    payload: { name, email, phone, assetSlug, assetTitle, downloadUrl },
    meta: await clientMeta(request),
  };
  try { await (await leadCollection()).insertOne(doc); } catch { return err('Database error.', 500); }

  return json({ ok: true, id: doc.id });
}

// ---- POST /api/collaborate — realtor collaborator application ----
async function handleCollaborate(request) {
  const rl = limit(request, { bucket: 'collaborate', limit: 3, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  // Honeypot: dedicated hidden field (never `website` here — that's a real
  // broker-site field on the collaborator form).
  if (cleanString(body?._hp)) return json({ ok: true, honey: true });

  const name = cleanString(body?.name, 160);
  const email = cleanString(body?.email, 200);
  const phone = cleanString(body?.phone, 50);
  const brokerage = cleanString(body?.brokerage, 200);
  const dreLicense = cleanString(body?.dreLicense, 60);
  const yearsActive = cleanString(body?.yearsActive, 30);
  const website = cleanString(body?.website, 300);
  const notes = cleanString(body?.notes, 4000);
  const specialties = Array.isArray(body?.specialties)
    ? body.specialties.filter((s) => typeof s === 'string').slice(0, 12).map((s) => cleanString(s, 80))
    : [];
  const agree = !!body?.agree;

  if (!name || !email || !brokerage || !dreLicense) return err('Name, email, brokerage, and DRE license number are required.');
  if (!isEmail(email)) return err('Invalid email.');
  if (!agree) return err('Please confirm California licensure.');

  const doc = {
    id: randomUUID(),
    type: 'collaborator',
    source: 'collaborate-page',
    createdAt: new Date().toISOString(),
    payload: { name, email, phone, brokerage, dreLicense, yearsActive, website, specialties, notes },
    meta: await clientMeta(request),
  };
  try { await (await leadCollection()).insertOne(doc); } catch { return err('Database error.', 500); }

  // Fire-and-forget owner notification (fails soft if Resend not configured)
  try {
    await sendCollaboratorApplicationEmail({
      name, email, phone, brokerage, dreLicense, yearsActive, website, specialties, notes,
    });
  } catch (_) { /* fail soft */ }

  return json({ ok: true, id: doc.id });
}

// ---- POST /api/quiz/gate — gate the quiz result behind a lead capture.
// Called from the community-quiz flow between "last question answered" and
// "result shown". Persists the lead into the leads collection so it lands
// in /admin/leads, then returns the score payload so the client can reveal
// the match.
async function handleQuizGate(request) {
  const rl = limit(request, { bucket: 'quiz-gate', limit: 5, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  if (isHoneypotTripped(body)) {
    // Silently succeed but still score, so the honey caller doesn't infer
    // the gate exists.
    const answers = (body?.answers && typeof body.answers === 'object') ? body.answers : {};
    const result = scoreQuiz(answers);
    return json({ ok: true, honey: true, ...result });
  }

  const firstName = cleanString(body?.firstName, 120);
  const lastName  = cleanString(body?.lastName, 120);
  const email     = cleanString(body?.email, 200);
  const phone     = cleanString(body?.phone, 60); // optional
  const zip       = cleanString(body?.zip, 15);
  const answers   = (body?.answers && typeof body.answers === 'object') ? body.answers : {};

  if (!firstName) return err('Please add your first name.');
  if (!lastName)  return err('Please add your last name.');
  if (!isEmail(email)) return err('Please add a valid email.');
  if (!zip || !/^\d{5}(-\d{4})?$/.test(zip)) return err('Please add a valid U.S. ZIP code.');

  // Score first (deterministic, safe to precompute) so we can attach the
  // top match to the lead doc for at-a-glance triage in the admin table.
  const result = scoreQuiz(answers);
  const fullName = `${firstName} ${lastName}`.trim();

  const submission = {
    id: randomUUID(),
    type: 'quiz-gate',
    source: 'community-quiz',
    createdAt: new Date().toISOString(),
    // Top-level shorthand fields (what the admin table renders)
    name:  fullName,
    email,
    phone,
    subject: result?.top?.name || 'Community quiz',
    message: `Quiz gate: matched to ${result?.top?.name || '\u2014'}. Runners-up: ${(result?.runnersUp || []).map((r) => r.name).join(', ') || '\u2014'}. ZIP: ${zip}.`,
    // Full structured record
    payload: {
      firstName, lastName, email, phone, zip,
      match:      result?.top || null,
      runnersUp:  result?.runnersUp || [],
      answers,
    },
    meta: await clientMeta(request),
  };

  try {
    await (await leadCollection()).insertOne(submission);
  } catch {
    return err('Database error.', 500);
  }

  return json({ ok: true, id: submission.id, ...result });
}

// ---- POST /api/quiz/score — score-only, no persistence ----
async function handleQuizScore(request) {
  const rl = limit(request, { bucket: 'quiz-score', limit: 30, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  const answers = body?.answers || {};
  const result = scoreQuiz(answers);
  return json({ ok: true, ...result });
}

// ---- POST /api/quiz — legacy persistence (kept for back-compat) ----
async function handleQuiz(request) {
  const rl = limit(request, { bucket: 'quiz', limit: 10, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

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
  const rl = limit(request, { bucket: 'leads-magnet', limit: 5, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  if (isHoneypotTripped(body)) return json({ ok: true, honey: true });

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
  if (!phone) return err('Missing phone.');

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

// ---- POST /api/contact — universal contextual contact form ---------------
// Fields:  name (req), email (req), phone (opt), message (opt),
//          subject (req — page context, e.g. "The Madison Club"),
//          page   (opt — pathname the buyer was on)
//          website (honeypot; MUST be empty)
// Behavior:
//   1) validate + honeypot
//   2) insert `type: 'contact'` document into `leads` collection
//   3) fire-and-forget welcome email to the buyer + notification to OWNER_EMAIL
async function handleContact(request) {
  const rl = limit(request, { bucket: 'contact', limit: 5, windowMs: 60 * 60 * 1000 });
  if (rl) return rl;

  const body = await readJson(request);
  // Honeypot: real humans never fill this field.
  if (isHoneypotTripped(body)) return json({ ok: true, honey: true });

  const name    = cleanString(body?.name, 120);
  const email   = cleanString(body?.email, 200);
  const phone   = cleanString(body?.phone, 60);
  const message = cleanString(body?.message, 4000);
  const subject = cleanString(body?.subject, 200) || 'La Quinta golf real estate';
  const page    = cleanString(body?.page, 500);

  if (!name)  return err('Please add your name.');
  if (!isEmail(email)) return err('Please add a valid email.');

  const submission = {
    id: randomUUID(),
    type: 'contact',
    createdAt: new Date().toISOString(),
    name, email, phone, message, subject, page,
    meta: await clientMeta(request),
  };
  try { await (await leadCollection()).insertOne(submission); }
  catch { return err('Database error.', 500); }

  Promise.allSettled([
    sendContactWelcomeEmail({ name, email, subject, message, baseUrl: BASE_URL }),
    sendContactPartnerEmail({ name, email, phone, subject, message, page, baseUrl: BASE_URL }),
  ]).then((res) => {
    res.forEach((r, i) => {
      const which = i === 0 ? 'contact/welcome' : 'contact/partner';
      if (r.status === 'fulfilled') console.log(`[email/${which}]`, r.value);
      else                          console.log(`[email/${which}] rejected`, r.reason);
    });
  });

  return json({ ok: true, id: submission.id });
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
  if (path === '')                  return json({ ok: true, service: 'La Quinta Golf Lifestyle API', endpoints: ['POST /api/contact','POST /api/quiz/score','POST /api/quiz','POST /api/valuation','POST /api/leads','POST /api/leads/magnet','POST /api/leads/gate','POST /api/collaborate','GET /api/leads?key=...','GET /api/leads/export.csv?key=...'] });
  if (path === 'leads')             return handleLeadRetrieval(request);
  if (path === 'leads/export.csv')  return handleLeadsExportCsv(request);
  return err('Not found.', 404);
}
export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  switch (path) {
    case 'quiz/score':    return handleQuizScore(request);
    case 'quiz/gate':     return handleQuizGate(request);
    case 'quiz':          return handleQuiz(request);
    case 'valuation':     return handleValuation(request);
    case 'leads':         return handleLeadCapture(request);
    case 'leads/magnet':  return handleLeadsMagnet(request);
    case 'leads/gate':    return handleLeadsGate(request);
    case 'collaborate':   return handleCollaborate(request);
    case 'contact':       return handleContact(request);
    default:              return err(`POST /api/${path} not implemented.`, 404);
  }
}

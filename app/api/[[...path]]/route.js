import { NextResponse } from 'next/server';
import { LISTINGS, COMMUNITIES } from '@/lib/data';
import { ensureSeeded } from '@/lib/data-server';
import { getDb } from '@/lib/mongodb';
import { getMagnet } from '@/lib/lead-magnets';
import { sendQuizLeadOwnerEmail, sendQuizLeadConfirmationEmail, sendCollaboratorApplicationOwnerEmail } from '@/lib/email';

// ---------- helpers ----------

function getClientMeta(request) {
  const fwd = request.headers.get('x-forwarded-for') || '';
  const ip = fwd.split(',')[0].trim() || request.headers.get('x-real-ip') || '';
  return {
    ip,
    userAgent: request.headers.get('user-agent') || '',
    referer: request.headers.get('referer') || ''
  };
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
}

function isAuthorized(request) {
  const key = new URL(request.url).searchParams.get('key');
  const expected = process.env.LEADS_ACCESS_KEY;
  // Constant-time-ish compare; both are short opaque strings, so a simple compare is fine.
  return Boolean(expected) && key === expected;
}

function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function saveLead(doc) {
  const db = await getDb();
  await db.collection('leads').insertOne({ ...doc, createdAt: new Date() });
}

// ---------- GET ----------

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');

  if (path === '' || path === 'health') {
    return NextResponse.json({ ok: true, service: 'scottsdale-golf-lifestyle' });
  }
  if (path === 'seed') {
    const r = await ensureSeeded();
    return NextResponse.json(r);
  }
  if (path === 'listings') {
    return NextResponse.json({ listings: LISTINGS });
  }
  if (path === 'communities') {
    return NextResponse.json({ communities: COMMUNITIES });
  }

  // --- Leads retrieval (passphrase-gated) ---
  if (path === 'leads/list') {
    if (!isAuthorized(request)) return unauthorized();
    try {
      const url = new URL(request.url);
      const typeFilter = url.searchParams.get('type');
      let limit = parseInt(url.searchParams.get('limit') || '500', 10);
      if (!Number.isFinite(limit) || limit < 1) limit = 500;
      if (limit > 2000) limit = 2000;

      const db = await getDb();
      const query = typeFilter ? { type: typeFilter } : {};
      const leads = await db
        .collection('leads')
        .find(query, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

      return NextResponse.json({ ok: true, count: leads.length, leads });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
    }
  }

  if (path === 'leads/export.csv') {
    if (!isAuthorized(request)) return unauthorized();
    try {
      const db = await getDb();
      const leads = await db
        .collection('leads')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(10000)
        .toArray();

      const header = ['createdAt', 'type', 'magnet', 'name', 'email', 'phone', 'community', 'source', 'sourcePath', 'sourceDetail', 'quiz_region', 'quiz_era', 'quiz_character', 'quiz_footprint', 'quiz_fit', 'runnersUp', 'referer', 'ip', 'userAgent'];
      const rows = leads.map(l => {
        const p = l.payload || {};
        const m = l.meta || {};
        const q = p.quizAnswers || {};
        return [
          l.createdAt instanceof Date ? l.createdAt.toISOString() : l.createdAt,
          l.type || '',
          p.slug || '',
          p.name || '',
          p.email || '',
          p.phone || '',
          p.community || '',
          p.source || '',
          p.sourcePath || '',
          p.sourceDetail || '',
          q.region || '',
          q.era || '',
          q.character || '',
          q.footprint || '',
          q.fit || '',
          Array.isArray(p.runnersUp) ? p.runnersUp.join(' | ') : '',
          m.referer || '',
          m.ip || '',
          m.userAgent || ''
        ].map(csvEscape).join(',');
      });
      const csv = [header.join(','), ...rows].join('\n') + '\n';

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="leads.csv"',
          'Cache-Control': 'no-store'
        }
      });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'not found' }, { status: 404 });
}

// ---------- POST ----------

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');

  // -------- Gated lead magnet (primary new endpoint) --------
  if (path === 'leads/magnet') {
    try {
      const body = await request.json();
      const slug = (body.slug || '').trim();
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const phone = (body.phone || '').trim();
      const community = (body.community || '').trim();
      const source = (body.source || 'magnet').trim();
      const sourcePath = (body.sourcePath || '').toString().trim().slice(0, 300);
      const sourceDetail = (body.sourceDetail || '').toString().trim().slice(0, 300);
      const quizAnswers = body.quizAnswers && typeof body.quizAnswers === 'object' ? body.quizAnswers : null;
      const runnersUp = Array.isArray(body.runnersUp) ? body.runnersUp.map(s => String(s).trim()).filter(Boolean) : [];

      if (!name || !email || !phone) {
        return NextResponse.json(
          { ok: false, error: 'name, email, and phone are required' },
          { status: 400 }
        );
      }
      const magnet = getMagnet(slug);
      if (!magnet) {
        return NextResponse.json({ ok: false, error: 'unknown magnet' }, { status: 404 });
      }

      const meta = getClientMeta(request);
      const isQuiz = source === 'community-quiz' && quizAnswers;
      const docType = isQuiz ? 'quiz-magnet' : 'magnet';

      // Persist the lead. quizAnswers + runnersUp are kept in payload so
      // /api/leads/list and the CSV export surface them with the rest.
      await saveLead({
        type: docType,
        payload: {
          slug,
          name,
          email,
          phone,
          community,
          source,
          sourcePath,
          sourceDetail,
          quizAnswers,
          runnersUp
        },
        meta
      });

      const downloadUrl = magnet.file || null;

      // Fire-and-forget transactional emails for EVERY magnet submission.
      // Quiz-specific context (runnersUp, quizAnswers) is included when
      // present; for plain community-page or guide-page submissions the
      // owner still gets a notification and the lead still gets a
      // confirmation with the download link.
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      const matchedCommunity = community || magnet.title;
      Promise.allSettled([
        sendQuizLeadOwnerEmail({
          name,
          email,
          phone,
          matchedCommunity,
          runnersUp,
          quizAnswers: quizAnswers || { source },
          score: body.score ?? null
        }),
        sendQuizLeadConfirmationEmail({
          name,
          email,
          matchedCommunity,
          downloadUrl,
          baseUrl
        })
      ]).then(results => {
        const summary = results.map((r, i) => {
          const label = i === 0 ? 'owner' : 'lead';
          if (r.status === 'fulfilled') {
            const v = r.value || {};
            return `${label}=${v.skipped ? 'skipped:' + (v.reason || '?') : (v.ok ? 'ok' : 'fail:' + (v.error || '?'))}`;
          }
          return `${label}=rejected:${r.reason?.message || r.reason || '?'}`;
        }).join(' | ');
        console.log(`[${docType} email] ${email} src=${source} ${summary}`);
      }).catch(e => console.log(`[${docType} email] unhandled`, e?.message || e));

      return NextResponse.json({
        ok: true,
        downloadUrl
      });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }
  }

  // -------- Collaborator application (native form replacing prior Google Form) --------
  if (path === 'collaborator/apply') {
    try {
      const body = await request.json();
      const fields = {
        name:            (body.name || '').toString().trim().slice(0, 200),
        brokerage:       (body.brokerage || '').toString().trim().slice(0, 200),
        license:         (body.license || '').toString().trim().slice(0, 100),
        email:           (body.email || '').toString().trim().slice(0, 200),
        phone:           (body.phone || '').toString().trim().slice(0, 50),
        website:         (body.website || '').toString().trim().slice(0, 300),
        linkedin:        (body.linkedin || '').toString().trim().slice(0, 300),
        yearsExperience: (body.yearsExperience || '').toString().trim().slice(0, 50),
        specialty:       (body.specialty || '').toString().trim().slice(0, 300),
        communities:     (body.communities || '').toString().trim().slice(0, 1000),
        pitch:           (body.pitch || '').toString().trim().slice(0, 3000),
        sourcePath:      (body.sourcePath || '').toString().trim().slice(0, 300),
        sourceDetail:    (body.sourceDetail || '').toString().trim().slice(0, 300)
      };

      if (!fields.name || !fields.email || !fields.phone || !fields.brokerage) {
        return NextResponse.json(
          { ok: false, error: 'name, email, phone, and brokerage are required' },
          { status: 400 }
        );
      }

      const meta = getClientMeta(request);
      await saveLead({
        type: 'collaborator-application',
        payload: fields,
        meta
      });

      // Fire-and-forget owner notification.
      sendCollaboratorApplicationOwnerEmail(fields).then(r => {
        const status = r?.skipped ? 'skipped:' + (r.reason || '?') : (r?.ok ? 'ok' : 'fail:' + (r?.error || '?'));
        console.log(`[collaborator-application email] ${fields.email} ${status}`);
      }).catch(e => console.log('[collaborator-application email] unhandled', e?.message || e));

      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }
  }

  // -------- Legacy form endpoints: now MongoDB-only (external CRM push removed) --------
  // All five existing form components continue to POST to these paths. They
  // now persist to our MongoDB `leads` collection. Owner retrieves via
  // /api/leads/list?key=... or /api/leads/export.csv?key=...

  if (path === 'lead') {
    try {
      const body = await request.json();
      const meta = getClientMeta(request);
      await saveLead({
        type: 'lead',
        payload: {
          name: (body.name || '').trim(),
          email: (body.email || '').trim(),
          phone: (body.phone || '').trim(),
          message: (body.message || '').trim(),
          timeline: body.timeline || null,
          budget: body.budget || null,
          community: body.community || null
        },
        meta
      });
      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }
  }

  if (path === 'guide-download') {
    try {
      const body = await request.json();
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const guideSlug = body.guideSlug || 'scottsdale-buyers-guide-2026';
      const guideTitle = body.guideTitle || 'Scottsdale Buyer\u2019s Guide 2026';

      if (!email) {
        return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
      }

      const meta = getClientMeta(request);
      await saveLead({
        type: 'guide-download',
        payload: { slug: guideSlug, name, email, guideTitle }
      , meta });

      // Stream the freshly-generated PDF back to the browser.
      const { generateBuyersGuidePdf } = await import('@/lib/buyers-guide-pdf');
      const pdfBuffer = await generateBuyersGuidePdf({ leadName: name.split(/\s+/)[0] || null });

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${guideSlug}.pdf"`,
          'Content-Length': String(pdfBuffer.length),
          'Cache-Control': 'no-store'
        }
      });
    } catch (e) {
      console.error('Guide PDF generation failed:', e);
      return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
    }
  }

  if (path === 'saved-search') {
    try {
      const body = await request.json();
      const email = (body.email || '').trim();
      const name = (body.name || '').trim();
      if (!email) {
        return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
      }
      const meta = getClientMeta(request);
      await saveLead({
        type: 'saved-search',
        payload: {
          name,
          email,
          searchTitle: body.searchTitle || 'Saved Search',
          searchSlug: body.searchSlug || 'unknown',
          communitySlug: body.communitySlug || null,
          frequency: body.frequency || 'Daily',
          sourcePath: body.sourcePath || meta.referer || ''
        },
        meta
      });
      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }
  }

  return NextResponse.json({ error: 'not found' }, { status: 404 });
}

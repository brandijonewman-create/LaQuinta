import { NextResponse } from 'next/server';

// Phase 1 stub. Real endpoints (lead capture, quiz, valuation) ship in Phase 4.
// All endpoints will be MongoDB-only, no third-party CRM.
export async function GET(_request, { params }) {
  const path = params?.path || [];
  if (path.length === 0) {
    return NextResponse.json({
      ok: true,
      service: 'California Desert Golf Lifestyle API',
      phase: 1,
      message: 'API skeleton online. Lead endpoints arrive in Phase 4.',
    });
  }
  return NextResponse.json({ ok: false, error: 'Not implemented in Phase 1.' }, { status: 404 });
}

export async function POST(_request, { params }) {
  const path = params?.path || [];
  return NextResponse.json(
    { ok: false, error: `POST /api/${path.join('/')} not implemented in Phase 1.` },
    { status: 404 }
  );
}

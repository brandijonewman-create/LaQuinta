// Approve or reject a listing from the link in Brandi Jo's review email.
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { COLLECTION } from '@/lib/directory/schema';
import { validReviewToken } from '@/lib/directory/review-token';

export const dynamic = 'force-dynamic';

const page = (msg) => new NextResponse(
  `<!doctype html><meta name="robots" content="noindex"><body style="font-family:Georgia,serif;color:#062840;padding:40px"><h2 style="font-weight:normal">${msg}</h2></body>`,
  { headers: { 'Content-Type': 'text/html' } }
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const action = searchParams.get('action');
  if (!ObjectId.isValid(id) || !['approve', 'reject'].includes(action) || !validReviewToken(id, action, searchParams.get('token'))) {
    return page('This link is not valid.');
  }
  const { getDb } = await import('@/lib/mongodb');
  const col = (await getDb()).collection(COLLECTION);
  const status = action === 'approve' ? 'live' : 'rejected';
  const r = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date(), reviewedAt: new Date(), ...(status === 'live' ? { liveAt: new Date() } : {}) } }
  );
  const biz = r?.value || r;
  if (!biz) return page('Listing not found.');
  return page(`${biz.name} is ${status === 'live' ? 'approved and live' : 'rejected'}.`);
}

// Step 2 of a free listing: confirm the email code, run the real-business
// checks, set live or review, and email Brandi Jo.
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { COLLECTION } from '@/lib/directory/schema';
import { cityBySlug } from '@/lib/directory';
import { hashCode, checkWebsite, checkGoogleMaps, checkCategoryFit, checkLicense, decideStatus } from '@/lib/directory/checks';
import { sendReviewNotice } from '@/lib/directory/notify';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (!ObjectId.isValid(body.id) || !/^\d{6}$/.test(String(body.code || ''))) {
    return NextResponse.json({ error: 'Enter the 6-digit code from your email.' }, { status: 422 });
  }

  const { getDb } = await import('@/lib/mongodb');
  const col = (await getDb()).collection(COLLECTION);
  const _id = new ObjectId(body.id);
  const biz = await col.findOne({ _id });
  if (!biz || biz.status !== 'pending') return NextResponse.json({ error: 'This submission was already confirmed or has expired.' }, { status: 410 });

  const ec = biz.emailCode || {};
  if (ec.attempts >= 5 || new Date(ec.expiresAt) < new Date()) {
    return NextResponse.json({ error: 'This code has expired. Please submit the form again.' }, { status: 410 });
  }
  if (hashCode(body.code) !== ec.hash) {
    await col.updateOne({ _id }, { $inc: { 'emailCode.attempts': 1 } });
    return NextResponse.json({ error: 'That code does not match. Check your email and try again.' }, { status: 422 });
  }

  const city = cityBySlug[biz.city];
  const [website, googleMaps] = await Promise.all([
    checkWebsite(biz.website, biz.name),
    checkGoogleMaps({ name: biz.name, city: city?.name, zip: biz.address?.zip, phone: biz.phone }),
  ]);
  const checks = {
    ...biz.checks,
    emailCode: { pass: true, verifiedAt: new Date() },
    website,
    googleMaps,
    categoryFit: checkCategoryFit(biz.categories[0], googleMaps),
    license: checkLicense(biz.categories[0], biz.license?.number),
  };
  const status = decideStatus(checks);
  const update = { checks, status, updatedAt: new Date(), ...(status === 'live' ? { liveAt: new Date() } : {}) };
  await col.updateOne({ _id }, { $set: update, $unset: { emailCode: '' } });

  await sendReviewNotice({ ...biz, ...update });

  return NextResponse.json({ ok: true, status, slug: biz.slug });
}

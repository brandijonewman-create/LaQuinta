// Step 1 of a free listing: validate, save as pending, email a confirmation code.
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { validateSubmission, COLLECTION } from '@/lib/directory/schema';
import { businessSlug, cityBySlug, slugify } from '@/lib/directory';
import { checkMapArea, newEmailCode } from '@/lib/directory/checks';
import { sendEmailCode } from '@/lib/directory/notify';
import { showSampleData } from '@/lib/directory/data';
import { IMPORTED_BUSINESSES } from '@/lib/directory/imported';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (body.company_fax) return NextResponse.json({ ok: true, id: new ObjectId().toString() }); // honeypot

  const { ok, errors, value } = validateSubmission(body);
  if (!ok) return NextResponse.json({ errors }, { status: 422 });

  const { getDb } = await import('@/lib/mongodb');
  const col = (await getDb()).collection(COLLECTION);

  const base = slugify(value.name);
  const taken = new Set([...IMPORTED_BUSINESSES.map((b) => b.slug), ...(await col.find({ slug: { $regex: `^${base}` } }, { projection: { slug: 1 } }).toArray()).map((d) => d.slug)]);
  const code = newEmailCode();
  const city = cityBySlug[value.city];
  const now = new Date();

  const doc = {
    slug: businessSlug(value.name, value.city, taken),
    name: value.name,
    categories: [value.category],
    city: value.city,
    address: { street: value.street, city: city.name, state: 'AZ', zip: value.zip },
    description: value.description,
    website: value.website,
    phone: value.phone,
    email: value.email,
    license: value.licenseNumber ? { number: value.licenseNumber } : null,
    level: 'free',
    status: 'pending',
    source: 'submission',
    checks: { mapArea: checkMapArea(value.zip), emailCode: { pass: false } },
    emailCode: { hash: code.hash, expiresAt: code.expiresAt, attempts: 0 },
    submitter: { name: value.submitterName, email: value.email, phone: value.phone },
    articleSlugs: [],
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await col.insertOne(doc);
  const mail = await sendEmailCode({ to: value.email, name: value.name, code: code.code });

  return NextResponse.json({
    ok: true,
    id: insertedId.toString(),
    email: value.email,
    // Preview only, when email is not configured: show the code so the flow can be tested.
    ...(mail.skipped && showSampleData() ? { previewCode: code.code } : {}),
  });
}

// Server-only MongoDB helpers, split out of lib/data.js so that client
// components importing static site data never pull the mongodb driver into
// the browser bundle (it broke `next build` with net/tls resolution errors).
import { getDb } from './mongodb';
import { LISTINGS, COMMUNITIES } from './data';

// Seed MongoDB on first call (idempotent)
export async function ensureSeeded() {
  try {
    const db = await getDb();
    const count = await db.collection('listings').countDocuments();
    if (count === 0) {
      await db.collection('listings').insertMany(LISTINGS.map(l => ({ ...l, _id: l.id })));
    }
    const ccount = await db.collection('communities').countDocuments();
    if (ccount === 0) {
      await db.collection('communities').insertMany(COMMUNITIES.map(c => ({ ...c, _id: c.slug })));
    }
    return { listings: LISTINGS.length, communities: COMMUNITIES.length };
  } catch (e) {
    return { error: e.message };
  }
}

export async function getListingsFromDb() {
  try {
    const db = await getDb();
    const docs = await db.collection('listings').find({}).toArray();
    return docs.length ? docs : LISTINGS;
  } catch {
    return LISTINGS;
  }
}

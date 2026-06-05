// MongoDB connection helper. Reuses a single client across hot-reloads in dev.

import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URL) {
  throw new Error('MONGO_URL is not set');
}
if (!DB_NAME) {
  throw new Error('DB_NAME is not set');
}

let cached = globalThis.__lqgl_mongo;
if (!cached) {
  cached = globalThis.__lqgl_mongo = { client: null, db: null, promise: null };
}

export async function getDb() {
  if (cached.db) return cached.db;
  if (!cached.promise) {
    const client = new MongoClient(MONGO_URL, { ignoreUndefined: true });
    cached.promise = client.connect().then((c) => {
      cached.client = c;
      cached.db = c.db(DB_NAME);
      return cached.db;
    });
  }
  return cached.promise;
}

// Collection accessors. UUIDs only — never expose ObjectId.
export async function quizCollection() {
  return (await getDb()).collection('quiz_submissions');
}
export async function valuationCollection() {
  return (await getDb()).collection('valuation_requests');
}
export async function leadCollection() {
  return (await getDb()).collection('leads');
}

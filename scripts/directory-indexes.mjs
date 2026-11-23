// One-time setup: create MongoDB indexes for the directory.
// Run: MONGO_URL=... DB_NAME=golflifestyle node scripts/directory-indexes.mjs
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const col = client.db(process.env.DB_NAME || 'golflifestyle').collection('directory_businesses');
await col.createIndex({ slug: 1 }, { unique: true });
await col.createIndex({ status: 1, categories: 1, city: 1 });
await col.createIndex({ level: 1, status: 1 });
await col.createIndex({ 'checks.googleMaps.placeId': 1 }, { sparse: true });
await col.createIndex({ premierKey: 1 }, { unique: true, partialFilterExpression: { premierKey: { $type: 'string' } } });
console.log('Directory indexes ready.');
await client.close();

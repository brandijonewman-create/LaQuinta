// Server-side reads for the directory. Live records come from MongoDB;
// sample records appear only outside production.
import { COLLECTION } from './schema';
import { SAMPLE_BUSINESSES } from './sample';
import { IMPORTED_BUSINESSES } from './imported';

const LEVEL_RANK = { premier: 0, featured: 1, full: 2, free: 3 };

export function showSampleData() {
  // Vercel previews and local dev show samples; production never does.
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV !== 'production';
  return process.env.NODE_ENV !== 'production';
}

async function liveFromDb(query) {
  if (!process.env.MONGO_URL) return [];
  try {
    const { getDb } = await import('@/lib/mongodb');
    const db = await getDb();
    return await db
      .collection(COLLECTION)
      .find({ status: 'live', ...query }, { projection: { _id: 0, submitter: 0, checks: 0, emailCode: 0, license: 0 } })
      .toArray();
  } catch (e) {
    console.error('directory read failed', e.message);
    return [];
  }
}

function sortListings(list) {
  return [...list].sort(
    (a, b) => (LEVEL_RANK[a.level] ?? 4) - (LEVEL_RANK[b.level] ?? 4) || a.name.localeCompare(b.name)
  );
}

export async function getListings({ category, city } = {}) {
  const query = {};
  if (category) query.categories = category;
  if (city) query.city = city;
  let list = await liveFromDb(query);
  const dbSlugs = new Set(list.map((b) => b.slug));
  list = list.concat(
    IMPORTED_BUSINESSES.filter((b) => !dbSlugs.has(b.slug) && (!category || b.categories.includes(category)) && (!city || b.city === city))
  );
  if (showSampleData()) {
    list = list.concat(
      SAMPLE_BUSINESSES.filter((b) => (!category || b.categories.includes(category)) && (!city || b.city === city))
    );
  }
  return sortListings(list);
}

export async function getBusiness(slug) {
  if (showSampleData()) {
    const s = SAMPLE_BUSINESSES.find((b) => b.slug === slug);
    if (s) return s;
  }
  const [b] = await liveFromDb({ slug });
  return b || IMPORTED_BUSINESSES.find((x) => x.slug === slug) || null;
}

export const isPaid = (b) => ['full', 'featured', 'premier'].includes(b.level);

// Is the Premier spot for this category and city still open?
export async function premierOpen(categorySlug, citySlug) {
  const list = await getListings({ category: categorySlug, city: citySlug });
  return !list.some((b) => b.level === 'premier');
}

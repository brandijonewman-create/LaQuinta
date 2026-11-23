// Tiny in-process per-IP sliding-window rate limiter.
//
// Not distributed, a single Next.js process only. Fine for a single-region
// deploy; if we scale horizontally later we'd swap the Map for Upstash Redis
// or Mongo. Records are pruned lazily on read.
//
// Usage:
//   const rl = rateLimit(request, { bucket: 'contact', limit: 5, windowMs: 60*60*1000 });
//   if (!rl.ok) return NextResponse.json({ok:false,error:rl.error},{status:429});

const BUCKETS = new Map(); // key = "bucket:ip"  ->  number[] of timestamps

function ipFromRequest(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  const first = xff.split(',')[0].trim();
  return first || request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(request, { bucket = 'default', limit = 5, windowMs = 60 * 60 * 1000 } = {}) {
  const ip = ipFromRequest(request);
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const cutoff = now - windowMs;

  const prior = BUCKETS.get(key) || [];
  const recent = prior.filter((t) => t > cutoff);

  if (recent.length >= limit) {
    // Store back the pruned window so future calls also see the current state.
    BUCKETS.set(key, recent);
    const retryMs = Math.max(1000, (recent[0] || now) + windowMs - now);
    return {
      ok: false,
      error: 'Too many requests. Please try again shortly.',
      retryAfter: Math.ceil(retryMs / 1000),
      ip,
      bucket,
    };
  }

  recent.push(now);
  BUCKETS.set(key, recent);
  return { ok: true, remaining: limit - recent.length, ip, bucket };
}

// Best-effort periodic prune (server-side only). Runs at most once per
// minute per process. Safe no-op if called from an edge/serverless context.
let lastPrune = 0;
export function maybePrune(maxAgeMs = 2 * 60 * 60 * 1000) {
  const now = Date.now();
  if (now - lastPrune < 60 * 1000) return;
  lastPrune = now;
  const cutoff = now - maxAgeMs;
  for (const [k, arr] of BUCKETS.entries()) {
    const kept = arr.filter((t) => t > cutoff);
    if (kept.length === 0) BUCKETS.delete(k);
    else if (kept.length !== arr.length) BUCKETS.set(k, kept);
  }
}

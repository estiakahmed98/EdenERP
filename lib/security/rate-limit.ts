/**
 * Fixed-window, in-process rate limiter.
 *
 * Limits are per server instance. That is enough to blunt brute force and
 * spam on a single Node process; behind several instances use a shared store
 * (Redis/DB) instead — see docs/production-audit/SECURITY_AUDIT.md.
 */
type Bucket = { count: number; resetAt: number };

const MAX_KEYS = 10_000;

export type RateLimitResult = { ok: boolean; remaining: number; retryAfterSeconds: number };

export function createRateLimiter(options: { limit: number; windowMs: number; now?: () => number }) {
  const { limit, windowMs } = options;
  const now = options.now ?? Date.now;
  const buckets = new Map<string, Bucket>();

  function sweep(t: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= t) buckets.delete(key);
    }
  }

  return {
    check(key: string): RateLimitResult {
      const t = now();
      if (buckets.size >= MAX_KEYS) sweep(t);
      // Still full after sweeping: fail closed for new keys rather than grow unbounded.
      if (buckets.size >= MAX_KEYS && !buckets.has(key)) {
        return { ok: false, remaining: 0, retryAfterSeconds: Math.ceil(windowMs / 1000) };
      }

      let bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= t) {
        bucket = { count: 0, resetAt: t + windowMs };
        buckets.set(key, bucket);
      }
      bucket.count += 1;

      const ok = bucket.count <= limit;
      return {
        ok,
        remaining: Math.max(0, limit - bucket.count),
        retryAfterSeconds: ok ? 0 : Math.max(1, Math.ceil((bucket.resetAt - t) / 1000)),
      };
    },
    reset(key: string) {
      buckets.delete(key);
    },
  };
}

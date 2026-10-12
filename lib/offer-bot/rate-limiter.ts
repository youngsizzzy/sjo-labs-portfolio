/**
 * In-memory rate limiting and session guard.
 *
 * NOTE ON SERVERLESS PLATFORMS:
 * In-memory stores on serverless environments (e.g. Netlify/Vercel functions)
 * are scoped to the running execution container and are best-effort. Containers
 * may spin up or scale down independently. For distributed enforcement across
 * multi-region serverless clusters, an external Redis/KV store would be required.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();
const claimFormIpMap = new Map<string, RateLimitRecord>();
const sessionMessageCount = new Map<string, number>();
const sessionsWithTelegramDispatched = new Set<string>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_MESSAGES_PER_SESSION = 25;

const CLAIM_FORM_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_CLAIM_FORM_PER_WINDOW = 5; // 5 claim submissions per IP per hour

// Periodically clean up expired IP rate limit windows to avoid memory growth
function cleanupExpiredRecords() {
  const now = Date.now();
  ipMap.forEach((record, ip) => {
    if (record.resetAt <= now) {
      ipMap.delete(ip);
    }
  });
  claimFormIpMap.forEach((record, ip) => {
    if (record.resetAt <= now) {
      claimFormIpMap.delete(ip);
    }
  });
}

setInterval(cleanupExpiredRecords, 5 * 60 * 1000).unref?.();

export function checkIpRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = ipMap.get(ip);

  if (!existing || existing.resetAt <= now) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function checkClaimFormRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = claimFormIpMap.get(ip);

  if (!existing || existing.resetAt <= now) {
    claimFormIpMap.set(ip, { count: 1, resetAt: now + CLAIM_FORM_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_CLAIM_FORM_PER_WINDOW) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function checkSessionMessageCap(sessionId: string): { allowed: boolean; count: number } {
  const current = (sessionMessageCount.get(sessionId) || 0) + 1;
  sessionMessageCount.set(sessionId, current);

  if (current > MAX_MESSAGES_PER_SESSION) {
    return { allowed: false, count: current };
  }

  return { allowed: true, count: current };
}

export function hasTelegramBeenDispatched(sessionId: string): boolean {
  return sessionsWithTelegramDispatched.has(sessionId);
}

export function markTelegramDispatched(sessionId: string): void {
  sessionsWithTelegramDispatched.add(sessionId);
}

export function resetLimitsForTesting(): void {
  ipMap.clear();
  sessionMessageCount.clear();
  sessionsWithTelegramDispatched.clear();
}

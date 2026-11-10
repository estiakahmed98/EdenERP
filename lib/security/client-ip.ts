import { isIP } from "node:net";

type HeaderSource = { get(name: string): string | null };

/**
 * Best-effort client IP from proxy headers. Returns null unless the value is
 * a syntactically valid IPv4/IPv6 address, so arbitrary header strings never
 * reach geo lookups, caches or rate-limit keys.
 *
 * Only trust these headers when the app sits behind a proxy that overwrites
 * them (Vercel, nginx `proxy_set_header`), otherwise they are client-controlled.
 */
export function getClientIp(headers: HeaderSource): string | null {
  const candidates = [
    headers.get("x-forwarded-for")?.split(",")[0],
    headers.get("x-real-ip"),
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (value && isIP(value)) return value;
  }
  return null;
}

/**
 * Cookies shared by the geo-locale flow (proxy.ts, the client fallback and
 * the language switcher). Kept dependency-free so the Edge proxy can import it.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";
/** Set when Bangla was chosen automatically from the visitor's location.
 *  The switcher shows a glowing "English" hint while it is present. */
export const GEO_HINT_COOKIE = "GEO_LOCALE_HINT";
/** Set once a geo decision was made, so the client does not re-check. */
export const GEO_CHECKED_COOKIE = "GEO_LOCALE_CHECKED";
/** Set when English was chosen automatically for a visitor forwarded from
 *  adonerp.com (verified token, see lib/geo/domain-forward.ts). Cleared by an
 *  explicit language choice, so a later forward never overrides that choice. */
export const LOCALE_SOURCE_COOKIE = "LOCALE_SOURCE";

export const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
export const ONE_DAY_SECONDS = 60 * 60 * 24;

/** Countries that default to Bangla on first visit. */
export const BANGLA_COUNTRIES = new Set(["BD"]);

const DEFAULT_COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "cloudfront-viewer-country",
];

/**
 * Country from headers set by the hosting edge (Vercel, Cloudflare, CloudFront,
 * nginx GeoIP). Returns an upper-case ISO 3166-1 alpha-2 code or null.
 *
 * Only a header the edge overwrites can be trusted, since clients can send any
 * of them. On Vercel only `x-vercel-ip-country` is read; elsewhere set
 * `GEO_COUNTRY_HEADER` (e.g. `cf-ipcountry`) to the one your edge sets.
 * Without either, the legacy list below is tried in order.
 * `GEO_COUNTRY_OVERRIDE=BD` simulates a location outside production.
 */
export function countryFromHeaders(
  headers: { get(name: string): string | null },
  env: Record<string, string | undefined> = process.env,
) {
  const override = env.GEO_COUNTRY_OVERRIDE?.trim();
  if (override && env.NODE_ENV !== "production") return override.toUpperCase();

  const pinned = env.GEO_COUNTRY_HEADER?.trim().toLowerCase();
  const names = pinned
    ? [pinned]
    : env.VERCEL
      ? ["x-vercel-ip-country"]
      : DEFAULT_COUNTRY_HEADERS;

  for (const name of names) {
    const value = headers.get(name)?.trim().toUpperCase();
    if (value && /^[A-Z]{2}$/.test(value) && value !== "XX" && value !== "T1") return value;
  }
  return null;
}

export function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function deleteCookie(name: string) {
  writeCookie(name, "", 0);
}

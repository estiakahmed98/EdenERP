/**
 * Verified domain forwarding: adonerp.com -> adonerp.com.bd.
 *
 * Visitors forwarded from the international domain must land in English, but
 * a plain `?source=adonerp.com` (or a Referer header) proves nothing: anyone
 * can type it, and redirects often drop the Referer. So the forwarding hop
 * mints a short-lived token signed with HMAC-SHA256 over a shared secret:
 *
 *     ?adon_fwd=<base64url(payload)>.<base64url(signature)>
 *     payload   = "<source host>|<expires, unix seconds>|<random nonce>"
 *     signature = HMAC-SHA256(DOMAIN_FORWARD_SECRET, "adon-fwd-v1|" + payload)
 *
 * The target (proxy.ts) verifies the signature, the source host and the
 * expiry, records the result in a cookie and redirects to the same URL
 * without the token. Tokens expire after a few minutes, so a copied link
 * cannot be used to force English on other people for long.
 *
 * The same format is implemented by scripts/domain-forward/cloudflare-worker.js
 * for setups where adonerp.com is served by a separate edge instead of this app.
 *
 * Dependency-free (Web Crypto only) so it runs in the proxy and in `node --test`.
 */

export const FORWARD_PARAM = "adon_fwd";
export const FORWARD_SOURCE_VALUE = "forward";

const SIGNATURE_CONTEXT = "adon-fwd-v1|";
const DEFAULT_TTL_SECONDS = 120;
const MAX_TTL_SECONDS = 600;
/** Tolerated clock drift between a separate forwarding edge and this app. */
const CLOCK_SKEW_SECONDS = 30;
const MIN_SECRET_LENGTH = 32;

export type ForwardConfig = {
  /** null disables the whole feature (tokens are stripped and ignored). */
  secret: string | null;
  /** Hosts whose visitors are forwarded, normalised without `www.`. */
  sourceHosts: string[];
  /** Origin visitors are forwarded to, e.g. https://adonerp.com.bd */
  targetOrigin: string | null;
  ttlSeconds: number;
};

type Env = Record<string, string | undefined>;

export function normalizeHost(host: string | null | undefined) {
  if (!host) return "";
  return host.trim().toLowerCase().split(":", 1)[0].replace(/^www\./, "").replace(/\.$/, "");
}

export function getForwardConfig(env: Env = process.env): ForwardConfig {
  const rawSecret = env.DOMAIN_FORWARD_SECRET?.trim() ?? "";
  const secret = rawSecret.length >= MIN_SECRET_LENGTH ? rawSecret : null;

  const sourceHosts = (env.DOMAIN_FORWARD_SOURCE_HOSTS ?? "adonerp.com")
    .split(",")
    .map(normalizeHost)
    .filter(Boolean);

  let targetOrigin: string | null = null;
  const rawTarget = (env.DOMAIN_FORWARD_TARGET_ORIGIN ?? "https://adonerp.com.bd").trim();
  try {
    const url = new URL(rawTarget);
    if (url.protocol === "https:" || url.protocol === "http:") targetOrigin = url.origin;
  } catch {
    targetOrigin = null;
  }

  const ttl = Number(env.DOMAIN_FORWARD_TTL_SECONDS);
  const ttlSeconds =
    Number.isFinite(ttl) && ttl > 0 ? Math.min(Math.floor(ttl), MAX_TTL_SECONDS) : DEFAULT_TTL_SECONDS;

  return { secret, sourceHosts, targetOrigin, ttlSeconds };
}

/* ------------------------------ encoding ------------------------------ */

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]*$/.test(value)) return null;
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function sign(secret: string, payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return { key, data: encoder.encode(SIGNATURE_CONTEXT + payload) };
}

/* ------------------------------- tokens ------------------------------- */

export async function createForwardToken(
  secret: string,
  sourceHost: string,
  options: { nowSeconds?: number; ttlSeconds?: number } = {},
) {
  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const exp = now + Math.min(options.ttlSeconds ?? DEFAULT_TTL_SECONDS, MAX_TTL_SECONDS);
  const nonce = bytesToBase64Url(crypto.getRandomValues(new Uint8Array(12)));
  const payload = `${normalizeHost(sourceHost)}|${exp}|${nonce}`;

  const { key, data } = await sign(secret, payload);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));
  return `${bytesToBase64Url(new TextEncoder().encode(payload))}.${bytesToBase64Url(signature)}`;
}

/**
 * Returns the verified source host, or null for anything that is not a
 * correctly signed, unexpired token from an allowed source.
 */
export async function verifyForwardToken(
  token: string | null | undefined,
  secret: string | null,
  allowedSources: string[],
  options: { nowSeconds?: number } = {},
): Promise<string | null> {
  if (!token || !secret || token.length > 512) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const payloadBytes = base64UrlToBytes(parts[0]);
  const signature = base64UrlToBytes(parts[1]);
  if (!payloadBytes || !signature || signature.length !== 32) return null;

  const payload = new TextDecoder().decode(payloadBytes);
  const [source, expRaw, nonce, extra] = payload.split("|");
  if (extra !== undefined || !source || !nonce || !/^\d{1,12}$/.test(expRaw ?? "")) return null;
  if (!allowedSources.includes(source)) return null;

  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const exp = Number(expRaw);
  if (exp < now - CLOCK_SKEW_SECONDS) return null; // expired
  if (exp > now + MAX_TTL_SECONDS + CLOCK_SKEW_SECONDS) return null; // implausibly long-lived

  const { key, data } = await sign(secret, payload);
  // crypto.subtle.verify compares in constant time.
  const valid = await crypto.subtle.verify("HMAC", key, signature as BufferSource, data);
  return valid ? source : null;
}

/* ------------------------------ routing ------------------------------- */

/** Same paths as the page matcher in proxy.ts (everything that renders a page). */
export function isPagePath(pathname: string) {
  return /^\/(?!api|_next|_vercel|auth|admin|.*\..*).*$/.test(pathname);
}

/**
 * Builds the URL a visitor on a source host is sent to: same path and query
 * on the target origin, plus a fresh token for page requests.
 */
export async function buildForwardUrl(
  requestUrl: URL,
  config: ForwardConfig & { secret: string; targetOrigin: string },
  sourceHost: string,
) {
  const target = new URL(requestUrl.pathname + requestUrl.search, config.targetOrigin);
  target.searchParams.delete(FORWARD_PARAM);
  if (isPagePath(requestUrl.pathname)) {
    target.searchParams.set(
      FORWARD_PARAM,
      await createForwardToken(config.secret, sourceHost, { ttlSeconds: config.ttlSeconds }),
    );
  }
  return target;
}

/* ------------------------- locale preference -------------------------- */

type CookieReader = { get(name: string): { value: string } | undefined };

/**
 * Locale the visitor chose themselves, or null.
 * NEXT_LOCALE is also written by automatic decisions; those are tagged with
 * GEO_LOCALE_HINT (country -> Bangla) or LOCALE_SOURCE (verified forward ->
 * English), and the language switcher clears both tags on an explicit choice.
 */
export function explicitLocaleFromCookies(
  cookies: CookieReader,
  isLocale: (value: string) => boolean,
  names: { locale: string; geoHint: string; source: string },
) {
  const saved = cookies.get(names.locale)?.value?.trim().toLowerCase();
  if (!saved || !isLocale(saved)) return null;
  if (cookies.get(names.geoHint)?.value) return null;
  if (cookies.get(names.source)?.value) return null;
  return saved;
}

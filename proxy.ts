import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { isLocale } from "@/i18n/config";
import {
  BANGLA_COUNTRIES,
  GEO_CHECKED_COOKIE,
  GEO_HINT_COOKIE,
  LOCALE_COOKIE,
  LOCALE_SOURCE_COOKIE,
  ONE_DAY_SECONDS,
  ONE_YEAR_SECONDS,
  countryFromHeaders,
} from "@/lib/geo/locale-cookies";
import {
  FORWARD_PARAM,
  FORWARD_SOURCE_VALUE,
  buildForwardUrl,
  explicitLocaleFromCookies,
  getForwardConfig,
  normalizeHost,
  verifyForwardToken,
} from "@/lib/geo/domain-forward";

const intlMiddleware = createMiddleware(routing);
const forwardConfig = getForwardConfig();

function hasLocalePrefix(pathname: string) {
  const first = pathname.split("/")[1];
  return Boolean(first) && isLocale(first);
}

function withLocale(request: NextRequest, locale: string, from?: URL) {
  const url = from ? new URL(from) : request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  return url;
}

function noStore<T extends Response>(response: T) {
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

/**
 * Requests that reach this app on the international domain (adonerp.com,
 * when it is attached to the same deployment) are sent to adonerp.com.bd
 * with a freshly signed token. 307 + no-store: a cached permanent redirect
 * would replay an expired token.
 */
async function forwardFromSourceHost(request: NextRequest) {
  const { secret, sourceHosts, targetOrigin } = forwardConfig;
  const host = normalizeHost(request.headers.get("host") ?? request.nextUrl.host);
  if (!targetOrigin || !sourceHosts.includes(host)) return null;
  if (normalizeHost(new URL(targetOrigin).host) === host) return null; // never loop

  const target = secret
    ? await buildForwardUrl(request.nextUrl, { ...forwardConfig, secret, targetOrigin }, host)
    : (() => {
        const url = new URL(request.nextUrl.pathname + request.nextUrl.search, targetOrigin);
        url.searchParams.delete(FORWARD_PARAM);
        return url;
      })();
  return noStore(NextResponse.redirect(target, 307));
}

/**
 * Arrival on adonerp.com.bd with `?adon_fwd=<token>`. The token is always
 * removed from the URL. A valid one makes English the automatic choice
 * (above country detection, below an explicit choice); an invalid, expired
 * or forged one is ignored and normal detection runs on the clean URL.
 */
async function handleForwardToken(request: NextRequest) {
  if (!request.nextUrl.searchParams.has(FORWARD_PARAM)) return null;

  const clean = request.nextUrl.clone();
  clean.searchParams.delete(FORWARD_PARAM);

  const source = await verifyForwardToken(
    request.nextUrl.searchParams.get(FORWARD_PARAM),
    forwardConfig.secret,
    forwardConfig.sourceHosts,
  );
  if (!source) return noStore(NextResponse.redirect(clean));

  const explicit = explicitLocaleFromCookies(request.cookies, isLocale, {
    locale: LOCALE_COOKIE,
    geoHint: GEO_HINT_COOKIE,
    source: LOCALE_SOURCE_COOKIE,
  });
  // Locale-prefixed deep links keep the locale in their URL.
  const destination = hasLocalePrefix(clean.pathname)
    ? clean
    : withLocale(request, explicit ?? routing.defaultLocale, clean);

  const response = noStore(NextResponse.redirect(destination));
  if (!explicit) {
    const cookie = { path: "/", sameSite: "lax" as const, maxAge: ONE_YEAR_SECONDS };
    response.cookies.set(LOCALE_COOKIE, routing.defaultLocale, cookie);
    response.cookies.set(LOCALE_SOURCE_COOKIE, FORWARD_SOURCE_VALUE, cookie);
    response.cookies.delete(GEO_HINT_COOKIE);
  }
  return response;
}

/**
 * Picks a locale for an unprefixed URL (e.g. `/` or `/pricing`):
 *   1. a locale saved earlier (NEXT_LOCALE cookie): an explicit choice, or the
 *      automatic English of a verified forward from adonerp.com
 *   2. Bangla for visitors located in Bangladesh (edge country header)
 *   3. otherwise next-intl's default (English)
 * When the host sends no country header, the client fallback
 * (components/geo-locale-detector.tsx) asks /api/geo instead.
 */
function geoLocaleRedirect(request: NextRequest) {
  if (hasLocalePrefix(request.nextUrl.pathname)) return null;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value?.trim().toLowerCase();
  if (saved && isLocale(saved)) {
    return saved === routing.defaultLocale
      ? null
      : NextResponse.redirect(withLocale(request, saved));
  }

  const country = countryFromHeaders(request.headers);
  if (!country) return null;

  const cookie = { path: "/", sameSite: "lax" as const };
  if (!BANGLA_COUNTRIES.has(country)) {
    const response = intlMiddleware(request);
    response.cookies.set(GEO_CHECKED_COOKIE, country, { ...cookie, maxAge: ONE_DAY_SECONDS });
    return response;
  }

  const response = NextResponse.redirect(withLocale(request, "bn"));
  response.cookies.set(LOCALE_COOKIE, "bn", { ...cookie, maxAge: ONE_YEAR_SECONDS });
  response.cookies.set(GEO_HINT_COOKIE, "bn", { ...cookie, maxAge: ONE_YEAR_SECONDS });
  response.cookies.set(GEO_CHECKED_COOKIE, country, { ...cookie, maxAge: ONE_DAY_SECONDS });
  return response;
}

/**
 * Locale priority: explicit choice > verified adonerp.com forward >
 * country (edge header, then the client /api/geo fallback) > English.
 */
export default async function proxy(request: NextRequest) {
  const fromSource = await forwardFromSourceHost(request);
  if (fromSource) return fromSource;

  // Expose the pathname to server components (used for canonical/hreflang).
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);

  const forwarded = new NextRequest(request.url, { headers, method: request.method });
  return (
    (await handleForwardToken(forwarded)) ??
    geoLocaleRedirect(forwarded) ??
    intlMiddleware(forwarded)
  );
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|auth|admin|.*\\..*).*)",
    // Every path on the international domain is forwarded (keep in sync with
    // DOMAIN_FORWARD_SOURCE_HOSTS; matcher values must be literals).
    { source: "/:path*", has: [{ type: "host", value: "(www\\.)?adonerp\\.com" }] },
  ],
};

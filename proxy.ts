import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { isLocale } from "@/i18n/config";
import {
  BANGLA_COUNTRIES,
  GEO_CHECKED_COOKIE,
  GEO_HINT_COOKIE,
  LOCALE_COOKIE,
  ONE_DAY_SECONDS,
  ONE_YEAR_SECONDS,
  countryFromHeaders,
} from "@/lib/geo/locale-cookies";

const intlMiddleware = createMiddleware(routing);

function hasLocalePrefix(pathname: string) {
  const first = pathname.split("/")[1];
  return Boolean(first) && isLocale(first);
}

function withLocale(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  return url;
}

/**
 * Picks a locale for an unprefixed URL (e.g. `/` or `/pricing`):
 *   1. a locale the visitor chose earlier (NEXT_LOCALE cookie)
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

export default function proxy(request: NextRequest) {
  // Expose the pathname to server components (used for canonical/hreflang).
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);

  const forwarded = new NextRequest(request.url, { headers, method: request.method });
  return geoLocaleRedirect(forwarded) ?? intlMiddleware(forwarded);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|auth|admin|.*\\..*).*)"],
};

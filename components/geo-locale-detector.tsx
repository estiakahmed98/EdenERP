"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  BANGLA_COUNTRIES,
  GEO_CHECKED_COOKIE,
  GEO_HINT_COOKIE,
  LOCALE_COOKIE,
  ONE_DAY_SECONDS,
  ONE_YEAR_SECONDS,
  readCookie,
  writeCookie,
} from "@/lib/geo/locale-cookies";

/**
 * Client fallback for hosts that send no country header to proxy.ts.
 * On a visitor's very first page (no locale cookie, no geo decision yet) it
 * asks /api/geo once and moves Bangladeshi visitors to Bangla.
 */
export default function GeoLocaleDetector() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (readCookie(LOCALE_COOKIE) || readCookie(GEO_CHECKED_COOKIE)) return;

    const controller = new AbortController();
    fetch("/api/geo", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string | null } | null) => {
        const country = data?.country ?? null;
        if (!country) return; // unknown: try again next visit
        writeCookie(GEO_CHECKED_COOKIE, country, ONE_DAY_SECONDS);
        if (!BANGLA_COUNTRIES.has(country) || locale === "bn") return;

        writeCookie(LOCALE_COOKIE, "bn", ONE_YEAR_SECONDS);
        writeCookie(GEO_HINT_COOKIE, "bn", ONE_YEAR_SECONDS);
        router.replace(`${pathname}${window.location.search}${window.location.hash}`, {
          locale: "bn",
        });
      })
      .catch(() => {});

    return () => controller.abort();
    // Run once per mount: the cookies guard against repeats.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

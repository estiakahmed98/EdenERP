import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

/**
 * Builds canonical + hreflang alternates for a page.
 * Canonical points to the page's own locale (so translated pages are indexable),
 * and `x-default` points to the default locale.
 */
export async function getLocaleAlternates(pathname: string) {
  const normalizedPath = pathname === "/" ? "" : pathname;
  const locale = await getLocale();

  return {
    canonical: `/${locale}${normalizedPath}`,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}${normalizedPath}`]),
      ),
      "x-default": `/${routing.defaultLocale}${normalizedPath}`,
    },
  };
}

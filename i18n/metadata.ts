import { routing } from "@/i18n/routing";

export function getLocaleAlternates(pathname: string) {
  const normalizedPath = pathname === "/" ? "" : pathname;

  return {
    canonical: `/${routing.defaultLocale}${normalizedPath}`,
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, `/${locale}${normalizedPath}`]),
    ),
  };
}

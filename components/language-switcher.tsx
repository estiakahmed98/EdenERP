"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { isLocale, languageNames, locales, type AppLocale } from "@/i18n/config";
import {
  GEO_HINT_COOKIE,
  LOCALE_COOKIE,
  ONE_YEAR_SECONDS,
  deleteCookie,
  readCookie,
  writeCookie,
} from "@/lib/geo/locale-cookies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageSwitcherProps = {
  variant: "desktop" | "mobile";
};

export default function LanguageSwitcher({
  variant,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common.languageSwitcher");
  const activeLocale = isLocale(locale) ? locale : "en";

  // Bangla was picked from the visitor's location (not by them): offer English
  // with a soft glow until they choose a language themselves.
  const [showEnglishHint, setShowEnglishHint] = useState(false);
  useEffect(() => {
    setShowEnglishHint(locale === "bn" && readCookie(GEO_HINT_COOKIE) === "bn");
  }, [locale]);

  function switchLanguage(nextLocale: AppLocale) {
    // An explicit choice wins over geo detection from now on.
    writeCookie(LOCALE_COOKIE, nextLocale, ONE_YEAR_SECONDS);
    deleteCookie(GEO_HINT_COOKIE);
    setShowEnglishHint(false);
    if (nextLocale === locale) return;
    router.replace(`${pathname}${window.location.search}${window.location.hash}`, {
      locale: nextLocale,
    });
  }

  const englishHint = showEnglishHint && (
    <button
      type="button"
      lang="en"
      title={t("switchToEnglish")}
      aria-label={t("switchToEnglish")}
      onClick={() => switchLanguage("en")}
      className={
        variant === "mobile"
          ? "geo-english-hint flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary"
          : "geo-english-hint hidden items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary md:inline-flex"
      }
    >
      <span aria-hidden="true" className="geo-english-hint-dot size-1.5 rounded-full bg-primary" />
      English
    </button>
  );

  return (
    <div className={variant === "mobile" ? "space-y-2" : "flex items-center gap-2"}>
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t("label")}: ${languageNames[activeLocale]}`}
          className={
            variant === "mobile"
              ? "flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-card-foreground transition-colors hover-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              : "hidden items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
          }
        >
          <Languages className="size-4 shrink-0" aria-hidden="true" />
          {variant === "mobile" && <span>{t("label")}</span>}
          <span lang={activeLocale} className={variant === "mobile" ? "ms-auto" : undefined}>
            {languageNames[activeLocale]}
          </span>
          <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        aria-label={t("label")}
        className="z-60 min-w-48 rounded-xl p-1.5"
      >
        {locales.map((nextLocale) => {
          const hinted = showEnglishHint && nextLocale === "en";
          return (
            <DropdownMenuItem
              key={nextLocale}
              role="menuitemradio"
              aria-checked={locale === nextLocale}
              onSelect={() => switchLanguage(nextLocale)}
              className={`hover-gradient cursor-pointer justify-between gap-6 rounded-lg px-3 py-2.5${
                hinted ? " geo-english-hint text-primary" : ""
              }`}
            >
              <span lang={nextLocale}>{languageNames[nextLocale]}</span>
              {locale === nextLocale && <Check className="size-4 text-primary" aria-hidden="true" />}
              {hinted && (
                <span aria-hidden="true" className="geo-english-hint-dot size-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
    {englishHint}
    </div>
  );
}

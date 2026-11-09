"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  isLocale,
  languageNames,
  locales,
  type AppLocale,
} from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Admin lives outside the `[locale]` route segment, so the language is kept in
 * the same `NEXT_LOCALE` cookie the public site uses and the page is refreshed.
 */
export default function AdminLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("admin.shell");
  const active = isLocale(locale) ? locale : "en";

  function switchLanguage(next: AppLocale) {
    if (next === active) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <DropdownMenu dir={active === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t("language")}: ${languageNames[active]}`}
          className="flex h-10 items-center gap-2 rounded-xl px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Languages className="size-4 shrink-0" aria-hidden="true" />
          <span lang={active} className="hidden sm:inline">
            {languageNames[active]}
          </span>
          <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        aria-label={t("language")}
        className="z-60 min-w-44 rounded-xl p-1.5"
      >
        {locales.map((next) => (
          <DropdownMenuItem
            key={next}
            role="menuitemradio"
            aria-checked={active === next}
            onSelect={() => switchLanguage(next)}
            className="cursor-pointer justify-between gap-6 rounded-lg px-3 py-2.5"
          >
            <span lang={next}>{languageNames[next]}</span>
            {active === next && (
              <Check className="size-4 text-primary" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

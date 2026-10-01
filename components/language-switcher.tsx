"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { isLocale, languageNames, locales, type AppLocale } from "@/i18n/config";
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

  function switchLanguage(nextLocale: AppLocale) {
    if (nextLocale === locale) return;
    router.replace(`${pathname}${window.location.search}${window.location.hash}`, {
      locale: nextLocale,
    });
  }

  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t("label")}: ${languageNames[activeLocale]}`}
          className={
            variant === "mobile"
              ? "flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-card-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              : "hidden items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
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
        {locales.map((nextLocale) => (
          <DropdownMenuItem
            key={nextLocale}
            role="menuitemradio"
            aria-checked={locale === nextLocale}
            onSelect={() => switchLanguage(nextLocale)}
            className="cursor-pointer justify-between gap-6 rounded-lg px-3 py-2.5"
          >
            <span lang={nextLocale}>{languageNames[nextLocale]}</span>
            {locale === nextLocale && <Check className="size-4 text-primary" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

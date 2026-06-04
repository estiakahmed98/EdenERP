"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";

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

  function switchLanguage(nextLocale: "en" | "bn") {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  if (variant === "mobile") {
    return (
      <div
        aria-label={t("label")}
        className="flex w-full items-center justify-center gap-10 rounded-2xl border border-border bg-card px-5 py-4 text-card-foreground"
      >
        {(["en", "bn"] as const).map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            onClick={() => switchLanguage(nextLocale)}
            className={`text-sm font-bold ${
              locale === nextLocale ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t(`options.${nextLocale}`)}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-label={t("label")}
      className="hidden items-center gap-1 rounded-full border border-border bg-card/90 p-1 shadow-sm md:inline-flex"
    >
      {(["en", "bn"] as const).map((nextLocale) => (
        <button
          key={nextLocale}
          type="button"
          onClick={() => switchLanguage(nextLocale)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            locale === nextLocale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
          }`}
        >
          {t(`options.${nextLocale}`)}
        </button>
      ))}
    </div>
  );
}

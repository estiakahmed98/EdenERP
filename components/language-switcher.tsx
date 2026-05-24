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
        className="flex w-full items-center justify-center gap-10 rounded-2xl border border-slate-300 px-5 py-4 dark:border-slate-800"
      >
        {(["en", "bn"] as const).map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            onClick={() => switchLanguage(nextLocale)}
            className={`text-sm font-bold ${
              locale === nextLocale ? "text-slate-900 dark:text-white" : "text-slate-500"
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
      className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 md:inline-flex"
    >
      {(["en", "bn"] as const).map((nextLocale) => (
        <button
          key={nextLocale}
          type="button"
          onClick={() => switchLanguage(nextLocale)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            locale === nextLocale
              ? "bg-(--purple) text-white"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          {t(`options.${nextLocale}`)}
        </button>
      ))}
    </div>
  );
}

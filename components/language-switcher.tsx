"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { type AppLocale, locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  mobile?: boolean;
};

export default function LanguageSwitcher({
  mobile = false,
}: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

  const [pendingLocale, setPendingLocale] = useState<AppLocale | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(nextLocale: AppLocale) {
    if (nextLocale === locale || isPending) return;

    setPendingLocale(nextLocale);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      setPendingLocale(null);
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm",
        mobile && "w-full justify-between p-2",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 px-2 text-xs font-semibold text-slate-500",
          mobile && "px-1 text-sm",
        )}
      >
        <Languages className="h-4 w-4" />
        <span>{t("label")}</span>
      </div>

      <div className="inline-flex rounded-xl bg-slate-100 p-1">
        {locales.map((value) => {
          const isActive = value === locale;
          const isLoading = pendingLocale === value && isPending;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleLocaleChange(value)}
              disabled={isPending}
              aria-pressed={isActive}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-3.5",
                isActive
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800",
                isPending && "cursor-not-allowed opacity-70",
              )}
            >
              {isLoading
                ? "..."
                : value === "en"
                  ? t("englishShort")
                  : t("banglaShort")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

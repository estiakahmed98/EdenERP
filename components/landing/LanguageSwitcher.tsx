"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { useLanguage, type Language } from "./LanguageProvider";

function replaceLocaleInPath(pathname: string, locale: Language) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  segments[0] = locale;
  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const { language, setLanguage } = useLanguage();

  const onSwitch = (nextLang: Language) => {
    setLanguage(nextLang);
    const nextPath = replaceLocaleInPath(pathname, nextLang);
    router.push(nextPath);
  };

  const ariaLabel =
    params?.locale === "bn" ? "ভাষা পরিবর্তন করুন" : "Switch language";

  return (
    <div
      aria-label={ariaLabel}
      className="fixed right-4 top-4 z-50 flex gap-2 rounded-full border border-[#eeedf2] bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => onSwitch("en")}
        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
          language === "en"
            ? "bg-(--purple) text-white"
            : "text-muted hover:bg-gray-100"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onSwitch("bn")}
        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
          language === "bn"
            ? "bg-(--purple) text-white"
            : "text-muted hover:bg-gray-100"
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}

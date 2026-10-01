"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function LocaleDocument() {
  const locale = useLocale();

  // The root layout persists during client navigation between languages.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}

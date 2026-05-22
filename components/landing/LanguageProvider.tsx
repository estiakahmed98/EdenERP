"use client";

import React, { useCallback, useMemo, useState } from "react";

import bnMessages from "@/messages/bn";
import enMessages from "@/messages/en";

export type Language = "en" | "bn";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  return current;
}

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const messagesByLang = useMemo(
    () =>
      ({
        en: enMessages,
        bn: bnMessages,
      }) as Record<Language, any>,
    [],
  );

  const t = useCallback(
    (path: string) => {
      const val = getNestedValue(messagesByLang[language], path);
      return val === undefined ? path : val;
    },
    [language, messagesByLang],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

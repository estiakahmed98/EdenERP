import { routing } from "@/i18n/routing";

export const locales = routing.locales;

export type AppLocale = (typeof locales)[number];

export const languageNames = {
  en: "English",
  bn: "বাংলা",
  zh: "中文",
  tr: "Türkçe",
  ar: "العربية",
  ja: "日本語",
  ne: "नेपाली",
  vi: "Tiếng Việt",
} satisfies Record<AppLocale, string>;

export const defaultLocale = routing.defaultLocale;

export function isLocale(value: string): value is AppLocale {
  const normalized = value.trim().toLowerCase();
  return locales.some((locale) => locale.toLowerCase() === normalized);
}

import { routing } from "@/i18n/routing";

export const locales = routing.locales;

export type AppLocale = (typeof locales)[number];

export const defaultLocale = routing.defaultLocale;

export function isLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

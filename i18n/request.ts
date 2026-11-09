// i18n/request.ts
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale, type AppLocale } from "@/i18n/config";
import { mergeMessages } from "@/i18n/messages";

const messageLoaders = {
  en: () => import("../messages/en.json"),
  bn: () => import("../messages/bn.json"),
  zh: () => import("../messages/zh.json"),
  tr: () => import("../messages/tr.json"),
  ar: () => import("../messages/ar.json"),
  ja: () => import("../messages/ja.json"),
  ne: () => import("../messages/ne.json"),
  vi: () => import("../messages/vi.json"),
} satisfies Record<AppLocale, () => Promise<{ default: Record<string, unknown> }>>;

const manufacturingLoaders = {
  en: () => import("../messages/manufacturing/en.json"),
  bn: () => import("../messages/manufacturing/bn.json"),
  zh: () => import("../messages/manufacturing/zh.json"),
  tr: () => import("../messages/manufacturing/tr.json"),
  ar: () => import("../messages/manufacturing/ar.json"),
  ja: () => import("../messages/manufacturing/ja.json"),
  ne: () => import("../messages/manufacturing/ne.json"),
  vi: () => import("../messages/manufacturing/vi.json"),
} satisfies Record<AppLocale, () => Promise<{ default: Record<string, unknown> }>>;

async function getMessages(locale: AppLocale) {
  const [english, translated, englishMfg, translatedMfg] = await Promise.all([
    messageLoaders.en(),
    messageLoaders[locale](),
    manufacturingLoaders.en(),
    manufacturingLoaders[locale](),
  ]);
  const base = mergeMessages(english.default, translated.default);
  const manufacturing = mergeMessages(
    englishMfg.default,
    translatedMfg.default,
  );
  return mergeMessages(base, { pages: { manufacturingModules: manufacturing } });
}

export default getRequestConfig(async ({ requestLocale }) => {
  let requestedLocale = (await requestLocale)?.trim().toLowerCase();

  // Routes outside [locale] (e.g. /admin) have no locale segment, so fall back
  // to the NEXT_LOCALE cookie set by the public site and the admin switcher.
  if (!requestedLocale) {
    requestedLocale = (await cookies())
      .get("NEXT_LOCALE")
      ?.value?.trim()
      .toLowerCase();
  }

  const locale: AppLocale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});

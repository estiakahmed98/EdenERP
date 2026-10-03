// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale, type AppLocale } from "@/i18n/config";
import { mergeMessages } from "@/i18n/messages";

const messageLoaders = {
  en: () => import("../messages/en.json"),
  bn: () => import("../messages/bn.json"),
  zh: () => import("../messages/zh.json"),
  ar: () => import("../messages/ar.json"),
  ja: () => import("../messages/ja.json"),
  ne: () => import("../messages/ne.json"),
  vi: () => import("../messages/vi.json"),
} satisfies Record<AppLocale, () => Promise<{ default: Record<string, unknown> }>>;

async function getMessages(locale: AppLocale) {
  const [english, translated] = await Promise.all([
    messageLoaders.en(),
    messageLoaders[locale](),
  ]);
  return mergeMessages(english.default, translated.default);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale: AppLocale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});

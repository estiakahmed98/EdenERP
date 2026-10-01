// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale, type AppLocale } from "@/i18n/config";
import { mergeMessages } from "@/i18n/messages";

async function getMessages(locale: AppLocale) {
  switch (locale) {
    case "ar": {
      const [english, arabic] = await Promise.all([
        import("../messages/en.json"),
        import("../messages/ar.json"),
      ]);
      return mergeMessages(english.default, arabic.default);
    }
    case "bn":
      return (await import("../messages/bn.json")).default;

    case "en":
    default:
      return (await import("../messages/en.json")).default;
  }
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

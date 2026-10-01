// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale } from "@/i18n/config";

type Locale = "en" | "bn";

async function getMessages(locale: Locale) {
  switch (locale) {
    case "bn":
      return (await import("../messages/bn.json")).default;

    case "en":
    default:
      return (await import("../messages/en.json")).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale: Locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});

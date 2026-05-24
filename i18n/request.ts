import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale } from "@/i18n/config";

async function getMessagesForLocale(locale: "en" | "bn") {
  const [common, layout, home, pricing, apps, help, support] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/layout.json`),
    import(`../messages/${locale}/pages/home.json`),
    import(`../messages/${locale}/pages/pricing.json`),
    import(`../messages/${locale}/pages/apps.json`),
    import(`../messages/${locale}/pages/help.json`),
    import(`../messages/${locale}/pages/support.json`),
  ]);

  return {
    common: common.default,
    layout: layout.default,
    pages: {
      home: home.default,
      pricing: pricing.default,
      apps: apps.default,
      help: help.default,
      support: support.default,
    },
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});

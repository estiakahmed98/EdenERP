import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
  // The cookie is written only on an explicit choice (language switcher) or by
  // the geo redirect in proxy.ts, so the client geo fallback can tell them apart.
  localeCookie: false,
});

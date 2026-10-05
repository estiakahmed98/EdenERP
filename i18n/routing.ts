import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

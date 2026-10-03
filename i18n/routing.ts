import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "zh", "ar", "ja", "ne", "vi"],
  defaultLocale: "en",
  localePrefix: "always"
});

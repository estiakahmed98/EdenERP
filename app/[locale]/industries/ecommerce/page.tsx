import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.ecommerce"),
    alternates: getLocaleAlternates("/industries/ecommerce"),
  };
}

export default function IndustriesEcommercePage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="ecommerce"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

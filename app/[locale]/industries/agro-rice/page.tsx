import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ManufacturingIndustryPage } from "@/components/industries/manufacturing/page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.agroRice"),
    alternates: await getLocaleAlternates("/industries/agro-rice"),
  };
}

export default function ManufacturingIndustryLanding() {
  return <ManufacturingIndustryPage slug="agro-rice" />;
}

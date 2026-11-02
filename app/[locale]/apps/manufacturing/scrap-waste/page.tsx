import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.manufacturing");

  return {
    title: t("links.scrapWaste"),
    alternates: getLocaleAlternates("/apps/manufacturing/scrap-waste"),
  };
}

export default function ManufacturingScrapWastePage() {
  return <ComingSoonPage moduleKey="manufacturing" linkKey="scrapWaste" />;
}

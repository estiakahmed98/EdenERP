import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.realEstate");

  return {
    title: t("links.properties"),
    alternates: getLocaleAlternates("/apps/real-estate/properties"),
  };
}

export default function RealEstatePropertiesPage() {
  return <ComingSoonPage moduleKey="realEstate" linkKey="properties" />;
}

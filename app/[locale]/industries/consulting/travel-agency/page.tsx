import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.travelAgency"),
    alternates: getLocaleAlternates("/industries/consulting/travel-agency"),
  };
}

export default function IndustriesTravelAgencyPage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="travelAgency"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

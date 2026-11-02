import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.garments"),
    alternates: getLocaleAlternates("/industries/garments"),
  };
}

export default function IndustriesGarmentsPage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="garments"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

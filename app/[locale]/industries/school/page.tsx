import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.school"),
    alternates: getLocaleAlternates("/industries/school"),
  };
}

export default function IndustriesSchoolPage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="school"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

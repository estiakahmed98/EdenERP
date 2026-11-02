import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.college"),
    alternates: getLocaleAlternates("/industries/college"),
  };
}

export default function IndustriesCollegePage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="college"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

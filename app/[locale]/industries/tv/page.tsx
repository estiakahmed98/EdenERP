import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.tv"),
    alternates: await getLocaleAlternates("/industries/tv"),
  };
}

export default function IndustriesTvPage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="tv"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

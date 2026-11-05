import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.accessories"),
    alternates: await getLocaleAlternates("/industries/accessories"),
  };
}

export default function IndustriesAccessoriesPage() {
  return (
    <ComingSoonPage
      moduleKey="industries"
      linkKey="accessories"
      backHref="/industries"
      backKey="backIndustries"
    />
  );
}

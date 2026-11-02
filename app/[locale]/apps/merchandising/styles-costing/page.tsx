import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.merchandising");

  return {
    title: t("links.stylesCosting"),
    alternates: getLocaleAlternates("/apps/merchandising/styles-costing"),
  };
}

export default function MerchandisingStylesCostingPage() {
  return <ComingSoonPage moduleKey="merchandising" linkKey="stylesCosting" />;
}

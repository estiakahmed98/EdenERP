import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.merchandising");

  return {
    title: t("links.merchandisingDashboard"),
    alternates: getLocaleAlternates("/apps/merchandising/merchandising-dashboard"),
  };
}

export default function MerchandisingMerchandisingDashboardPage() {
  return <ComingSoonPage moduleKey="merchandising" linkKey="merchandisingDashboard" />;
}

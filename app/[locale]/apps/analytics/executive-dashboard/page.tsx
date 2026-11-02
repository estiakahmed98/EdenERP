import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.analytics");

  return {
    title: t("links.executiveDashboard"),
    alternates: getLocaleAlternates("/apps/analytics/executive-dashboard"),
  };
}

export default function AnalyticsExecutiveDashboardPage() {
  return <ComingSoonPage moduleKey="analytics" linkKey="executiveDashboard" />;
}

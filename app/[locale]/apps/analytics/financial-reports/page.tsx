import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.analytics");

  return {
    title: t("links.financialReports"),
    alternates: getLocaleAlternates("/apps/analytics/financial-reports"),
  };
}

export default function AnalyticsFinancialReportsPage() {
  return <ComingSoonPage moduleKey="analytics" linkKey="financialReports" />;
}

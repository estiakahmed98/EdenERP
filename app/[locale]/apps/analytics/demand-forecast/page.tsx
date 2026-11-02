import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.analytics");

  return {
    title: t("links.demandForecast"),
    alternates: getLocaleAlternates("/apps/analytics/demand-forecast"),
  };
}

export default function AnalyticsDemandForecastPage() {
  return <ComingSoonPage moduleKey="analytics" linkKey="demandForecast" />;
}

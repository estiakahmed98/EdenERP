import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import AnalyticsShowcase from "@/components/analytics-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.analytics.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps/analytics/bi-analytics-reporting"),
  };
}

export default function AnalyticsShowcasePage() {
  return <AnalyticsShowcase />;
}

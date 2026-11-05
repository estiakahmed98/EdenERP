import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import FundAccountingShowcase from "@/components/fund-accounting-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.fundAccounting.dashboard.metadata");
  return {
    title: t("title"),
    description: t("description"),
    alternates: await getLocaleAlternates("/apps/fund-accounting/dashboard"),
  };
}

export default function FundDashboardPage() {
  return <FundAccountingShowcase page="dashboard" />;
}

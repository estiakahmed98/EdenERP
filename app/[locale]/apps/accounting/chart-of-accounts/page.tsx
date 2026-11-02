import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.accounting");

  return {
    title: t("links.chartOfAccounts"),
    alternates: getLocaleAlternates("/apps/accounting/chart-of-accounts"),
  };
}

export default function AccountingChartOfAccountsPage() {
  return <ComingSoonPage moduleKey="accounting" linkKey="chartOfAccounts" />;
}

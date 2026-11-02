import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.salesCrm");

  return {
    title: t("links.amScorecard"),
    alternates: getLocaleAlternates("/apps/sales/crm/insights/am-scorecard"),
  };
}

export default function SalesCrmAmScorecardPage() {
  return <ComingSoonPage moduleKey="salesCrm" linkKey="amScorecard" />;
}

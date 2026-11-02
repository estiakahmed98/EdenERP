import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.tradeFinance");

  return {
    title: t("links.salesContracts"),
    alternates: getLocaleAlternates("/apps/trade-finance/sales-contracts"),
  };
}

export default function TradeFinanceSalesContractsPage() {
  return <ComingSoonPage moduleKey="tradeFinance" linkKey="salesContracts" />;
}

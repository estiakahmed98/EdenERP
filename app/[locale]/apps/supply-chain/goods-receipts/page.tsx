import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.supplyChain");

  return {
    title: t("links.goodsReceipts"),
    alternates: getLocaleAlternates("/apps/supply-chain/goods-receipts"),
  };
}

export default function SupplyChainGoodsReceiptsPage() {
  return <ComingSoonPage moduleKey="supplyChain" linkKey="goodsReceipts" />;
}

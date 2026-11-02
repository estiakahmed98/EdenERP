import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.pos");

  return {
    title: t("links.stockLots"),
    alternates: getLocaleAlternates("/apps/pos/stock-lots"),
  };
}

export default function PosStockLotsPage() {
  return <ComingSoonPage moduleKey="pos" linkKey="stockLots" />;
}

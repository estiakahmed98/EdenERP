import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.inventory");

  return {
    title: t("links.inventorySummary"),
    alternates: getLocaleAlternates("/apps/inventory/inventory-summary"),
  };
}

export default function InventoryInventorySummaryPage() {
  return <ComingSoonPage moduleKey="inventory" linkKey="inventorySummary" />;
}

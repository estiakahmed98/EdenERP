// app/%5Blocale%5D/apps/inventory/demand-forecast/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import InventoryDemandForecast from "@/components/inventory-demand-forecast";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.inventory");

  return {
    title: t("links.demandForecast"),
    alternates: getLocaleAlternates("/apps/inventory/demand-forecast"),
  };
}

export default function InventoryDemandForecastPage() {
  return <InventoryDemandForecast />;
}

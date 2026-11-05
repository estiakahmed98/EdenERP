import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ManufacturingProductionOrders from "@/components/manufacturing/production-orders";
import ManufacturingEnglishContent from "@/components/manufacturing/english-content";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: "en",
    namespace: "pages.manufacturingDetails.productionOrders",
  });
  return {
    title: t("moduleLabel"),
    description: t("heroDescription"),
    alternates: await getLocaleAlternates("/apps/manufacturing/production-orders"),
  };
}

export default function ProductionOrdersPage() {
  return (
    <ManufacturingEnglishContent>
      <ManufacturingProductionOrders />
    </ManufacturingEnglishContent>
  );
}

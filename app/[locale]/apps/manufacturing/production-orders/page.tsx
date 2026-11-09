import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import ManufacturingProductionOrders from "@/components/manufacturing/production-orders";
import visual from "@/components/manufacturing/manufacturing-visuals.module.css";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.manufacturingDetails.productionOrders",
  );
  return {
    title: t("moduleLabel"),
    description: t("heroDescription"),
    alternates: await getLocaleAlternates("/apps/manufacturing/production-orders"),
  };
}

export default function ProductionOrdersPage() {
  const locale = useLocale();
  return (
    <div className={locale === "en" ? visual.englishContent : undefined}>
      <ManufacturingProductionOrders />
    </div>
  );
}

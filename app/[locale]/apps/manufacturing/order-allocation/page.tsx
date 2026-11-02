import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.manufacturing");

  return {
    title: t("links.orderAllocation"),
    alternates: getLocaleAlternates("/apps/manufacturing/order-allocation"),
  };
}

export default function ManufacturingOrderAllocationPage() {
  return <ComingSoonPage moduleKey="manufacturing" linkKey="orderAllocation" />;
}

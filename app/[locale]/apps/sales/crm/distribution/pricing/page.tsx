import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.salesCrm");

  return {
    title: t("links.pricing"),
    alternates: getLocaleAlternates("/apps/sales/crm/distribution/pricing"),
  };
}

export default function SalesCrmPricingPage() {
  return <ComingSoonPage moduleKey="salesCrm" linkKey="pricing" />;
}

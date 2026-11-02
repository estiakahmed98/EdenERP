import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.salesCrm");

  return {
    title: t("links.claims"),
    alternates: getLocaleAlternates("/apps/sales/crm/trade-promo/claims"),
  };
}

export default function SalesCrmClaimsPage() {
  return <ComingSoonPage moduleKey="salesCrm" linkKey="claims" />;
}

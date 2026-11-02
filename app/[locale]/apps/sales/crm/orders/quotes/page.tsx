import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.salesCrm");

  return {
    title: t("links.quotes"),
    alternates: getLocaleAlternates("/apps/sales/crm/orders/quotes"),
  };
}

export default function SalesCrmQuotesPage() {
  return <ComingSoonPage moduleKey="salesCrm" linkKey="quotes" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.accounting");

  return {
    title: t("links.invoicesAr"),
    alternates: getLocaleAlternates("/apps/accounting/invoices-ar"),
  };
}

export default function AccountingInvoicesArPage() {
  return <ComingSoonPage moduleKey="accounting" linkKey="invoicesAr" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.salesCrm");

  return {
    title: t("links.playbook"),
    alternates: getLocaleAlternates("/apps/sales/crm/accounts/playbook"),
  };
}

export default function SalesCrmPlaybookPage() {
  return <ComingSoonPage moduleKey="salesCrm" linkKey="playbook" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.projectAccounting");

  return {
    title: t("links.changeOrders"),
    alternates: getLocaleAlternates("/apps/project-accounting/change-orders"),
  };
}

export default function ProjectAccountingChangeOrdersPage() {
  return <ComingSoonPage moduleKey="projectAccounting" linkKey="changeOrders" />;
}

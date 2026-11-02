import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.budgetManagement");

  return {
    title: t("links.variance"),
    alternates: getLocaleAlternates("/apps/budget-management/variance"),
  };
}

export default function BudgetManagementVariancePage() {
  return <ComingSoonPage moduleKey="budgetManagement" linkKey="variance" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BudgetManagementShowcase from "@/components/budget-management-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.budgetManagement.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps/Finance/budget-management"),
  };
}

export default function BudgetManagementPage() {
  return <BudgetManagementShowcase />;
}

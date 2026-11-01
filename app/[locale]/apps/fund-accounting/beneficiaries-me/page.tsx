import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import FundAccountingShowcase from "@/components/fund-accounting-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.fundAccounting.beneficiaries.metadata",
  );
  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates(
      "/apps/fund-accounting/beneficiaries-me",
    ),
  };
}

export default function BeneficiariesPage() {
  return <FundAccountingShowcase page="beneficiaries" />;
}

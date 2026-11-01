import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import FundAccountingShowcase from "@/components/fund-accounting-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.fundAccounting.grants.metadata");
  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps/fund-accounting/grants"),
  };
}

export default function GrantsPage() {
  return <FundAccountingShowcase page="grants" />;
}

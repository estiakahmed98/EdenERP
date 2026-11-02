import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.accounting");

  return {
    title: t("links.fixedAssetRegister"),
    alternates: getLocaleAlternates("/apps/accounting/fixed-asset-register"),
  };
}

export default function AccountingFixedAssetRegisterPage() {
  return <ComingSoonPage moduleKey="accounting" linkKey="fixedAssetRegister" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.merchandising");

  return {
    title: t("links.inHouseReceipts"),
    alternates: getLocaleAlternates("/apps/merchandising/in-house-receipts"),
  };
}

export default function MerchandisingInHouseReceiptsPage() {
  return <ComingSoonPage moduleKey="merchandising" linkKey="inHouseReceipts" />;
}

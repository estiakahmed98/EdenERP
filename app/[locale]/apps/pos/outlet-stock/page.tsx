import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.pos");

  return {
    title: t("links.outletStock"),
    alternates: getLocaleAlternates("/apps/pos/outlet-stock"),
  };
}

export default function PosOutletStockPage() {
  return <ComingSoonPage moduleKey="pos" linkKey="outletStock" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.pos");

  return {
    title: t("links.daySummaryZ"),
    alternates: getLocaleAlternates("/apps/pos/day-summary-z"),
  };
}

export default function PosDaySummaryZPage() {
  return <ComingSoonPage moduleKey="pos" linkKey="daySummaryZ" />;
}

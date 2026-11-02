import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.quality");

  return {
    title: t("links.nonConformance"),
    alternates: getLocaleAlternates("/apps/quality/non-conformance"),
  };
}

export default function QualityNonConformancePage() {
  return <ComingSoonPage moduleKey="quality" linkKey="nonConformance" />;
}

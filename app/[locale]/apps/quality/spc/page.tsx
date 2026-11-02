import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.quality");

  return {
    title: t("links.spc"),
    alternates: getLocaleAlternates("/apps/quality/spc"),
  };
}

export default function QualitySpcPage() {
  return <ComingSoonPage moduleKey="quality" linkKey="spc" />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.manufacturing");

  return {
    title: t("links.masterScheduleMps"),
    alternates: getLocaleAlternates("/apps/manufacturing/master-schedule-mps"),
  };
}

export default function ManufacturingMasterScheduleMpsPage() {
  return <ComingSoonPage moduleKey="manufacturing" linkKey="masterScheduleMps" />;
}

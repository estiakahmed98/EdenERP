import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.manufacturing");

  return {
    title: t("links.mrpPlanning"),
    alternates: getLocaleAlternates("/apps/manufacturing/mrp-planning"),
  };
}

export default function ManufacturingMrpPlanningPage() {
  return <ComingSoonPage moduleKey="manufacturing" linkKey="mrpPlanning" />;
}

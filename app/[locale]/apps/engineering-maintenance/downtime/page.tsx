import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.engineeringMaintenance");

  return {
    title: t("links.downtime"),
    alternates: getLocaleAlternates("/apps/engineering-maintenance/downtime"),
  };
}

export default function EngineeringMaintenanceDowntimePage() {
  return <ComingSoonPage moduleKey="engineeringMaintenance" linkKey="downtime" />;
}

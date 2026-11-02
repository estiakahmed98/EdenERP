import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.engineeringMaintenance");

  return {
    title: t("links.workOrders"),
    alternates: getLocaleAlternates("/apps/engineering-maintenance/work-orders"),
  };
}

export default function EngineeringMaintenanceWorkOrdersPage() {
  return <ComingSoonPage moduleKey="engineeringMaintenance" linkKey="workOrders" />;
}

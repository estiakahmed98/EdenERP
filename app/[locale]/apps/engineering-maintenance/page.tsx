import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import EngineeringMaintenanceShowcase from "@/components/engineering-maintenance-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.engineeringMaintenance.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps/engineering-maintenance"),
  };
}

export default function EngineeringMaintenancePage() {
  return <EngineeringMaintenanceShowcase />;
}

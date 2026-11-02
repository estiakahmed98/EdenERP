import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.manufacturing");

  return {
    title: t("links.schedulingAps"),
    alternates: getLocaleAlternates("/apps/manufacturing/scheduling-aps"),
  };
}

export default function ManufacturingSchedulingApsPage() {
  return <ComingSoonPage moduleKey="manufacturing" linkKey="schedulingAps" />;
}

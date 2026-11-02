import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.pos");

  return {
    title: t("links.outletDashboard"),
    alternates: getLocaleAlternates("/apps/pos/outlet-dashboard"),
  };
}

export default function PosOutletDashboardPage() {
  return <ComingSoonPage moduleKey="pos" linkKey="outletDashboard" />;
}

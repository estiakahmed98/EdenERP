import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.transportPool");

  return {
    title: t("links.maintenance"),
    alternates: getLocaleAlternates("/apps/transport-pool/maintenance"),
  };
}

export default function TransportPoolMaintenancePage() {
  return <ComingSoonPage moduleKey="transportPool" linkKey="maintenance" />;
}

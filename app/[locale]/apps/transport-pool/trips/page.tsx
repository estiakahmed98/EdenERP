import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.transportPool");

  return {
    title: t("links.trips"),
    alternates: getLocaleAlternates("/apps/transport-pool/trips"),
  };
}

export default function TransportPoolTripsPage() {
  return <ComingSoonPage moduleKey="transportPool" linkKey="trips" />;
}

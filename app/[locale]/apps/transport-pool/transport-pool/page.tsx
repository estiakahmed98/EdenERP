import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import TransportPoolShowcase from "@/components/transport-pool-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.transportPool.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: await getLocaleAlternates("/apps/transport-pool/transport-pool"),
  };
}

export default function TransportPoolPage() {
  return <TransportPoolShowcase />;
}

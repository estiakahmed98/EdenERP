import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.openPlatform");

  return {
    title: t("links.migrationStudio"),
    alternates: getLocaleAlternates("/apps/open-platform/migration-studio"),
  };
}

export default function OpenPlatformMigrationStudioPage() {
  return <ComingSoonPage moduleKey="openPlatform" linkKey="migrationStudio" />;
}

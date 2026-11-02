import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.projectAccounting");

  return {
    title: t("links.boq"),
    alternates: getLocaleAlternates("/apps/project-accounting/boq"),
  };
}

export default function ProjectAccountingBoqPage() {
  return <ComingSoonPage moduleKey="projectAccounting" linkKey="boq" />;
}

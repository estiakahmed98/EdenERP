import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.projectAccounting");

  return {
    title: t("links.milestones"),
    alternates: getLocaleAlternates("/apps/project-accounting/milestones"),
  };
}

export default function ProjectAccountingMilestonesPage() {
  return <ComingSoonPage moduleKey="projectAccounting" linkKey="milestones" />;
}

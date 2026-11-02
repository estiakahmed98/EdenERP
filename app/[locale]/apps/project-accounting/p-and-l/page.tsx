import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.projectAccounting");

  return {
    title: t("links.pAndL"),
    alternates: getLocaleAlternates("/apps/project-accounting/p-and-l"),
  };
}

export default function ProjectAccountingPAndLPage() {
  return <ComingSoonPage moduleKey="projectAccounting" linkKey="pAndL" />;
}

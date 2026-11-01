import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ProjectAccountingShowcase from "@/components/project-accounting-showcase";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.project.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps/project-accounting/projects"),
  };
}

export default function ProjectAccountingPage() {
  return <ProjectAccountingShowcase />;
}

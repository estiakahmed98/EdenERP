import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.empowerEducationProgram",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/empower-education/education-program"),
  };
}

export default async function EducationProgramPage() {
  const t = await getTranslations("pages.community.placeholder");

  return <div>{t("empowerEducationProgram")}</div>;
}

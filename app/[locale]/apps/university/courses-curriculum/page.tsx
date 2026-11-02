import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");

  return {
    title: t("links.coursesCurriculum"),
    alternates: getLocaleAlternates("/apps/university/courses-curriculum"),
  };
}

export default function UniversityCoursesCurriculumPage() {
  return <ComingSoonPage moduleKey="university" linkKey="coursesCurriculum" />;
}

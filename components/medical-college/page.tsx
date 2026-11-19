import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocaleAlternates } from "@/i18n/metadata";
import Experience from "./experience";
import { collegeHref, type CollegeSlug } from "./registry";
export async function collegeMetadata(slug: CollegeSlug): Promise<Metadata> {
  const t = await getTranslations("pages.medicalCollegeApp");
  return {
    title: t(`pages.${slug}.title`),
    description: t(`pages.${slug}.description`),
    alternates: await getLocaleAlternates(collegeHref(slug)),
  };
}
export function MedicalCollegePage({ slug }: { slug: CollegeSlug }) {
  return <Experience slug={slug} />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocaleAlternates } from "@/i18n/metadata";
import HospitalExperience from "./experience";
import { hospitalHref, type HospitalSlug } from "./registry";

export async function hospitalMetadata(slug: HospitalSlug): Promise<Metadata> {
  const t = await getTranslations("pages.hospitalApp");
  return {
    title: { absolute: t("ui.metadata", { title: t(`pages.${slug}.title`) }) },
    description: t(`pages.${slug}.description`),
    alternates: await getLocaleAlternates(hospitalHref(slug)),
  };
}
export function HospitalPage({ slug }: { slug: HospitalSlug }) {
  return <HospitalExperience slug={slug} />;
}

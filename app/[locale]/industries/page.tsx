import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import IndustryDirectory from "@/components/industries/industry-directory";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.industriesApp.index");
  return {
    title: t("page.industryErpSolutionsInBangladesh"),
    description: t("page.industrySpecificErpForBangladeshBusiness"),
    alternates: await getLocaleAlternates("/industries"),
  };
}
export default function IndustriesPage() {
  return <IndustryDirectory />;
}

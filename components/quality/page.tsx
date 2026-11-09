import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import type { Metadata } from "next";
import { getLocaleAlternates } from "@/i18n/metadata";
import { getQualityPages, type QualitySlug } from "./data";
import QualityHero from "./heroes";
import DashboardWorkspace from "./dashboard";
import NonConformanceWorkspace from "./non-conformance";
import CapaWorkspace from "./capa";
import AqlWorkspace from "./aql";
import SpcWorkspace from "./spc";
import { QualityClosing, QualityConnections, QualityFlow, css } from "./ui";

export async function qualityMetadata(slug: QualitySlug): Promise<Metadata> {
  const t = await getTranslations("pages.qualityApp");
  const qualityPages = getQualityPages(t);

  return {
    title: t("ui.metadataTitle", { name: qualityPages[slug].title }),
    description: qualityPages[slug].description,
    alternates: await getLocaleAlternates(`/apps/quality/${slug}`),
  };
}
const workspaces = {
  "quality-dashboard": DashboardWorkspace,
  "non-conformance": NonConformanceWorkspace,
  capa: CapaWorkspace,
  "aql-sampling": AqlWorkspace,
  spc: SpcWorkspace,
};
export function QualityPage({ slug }: { slug: QualitySlug }) {
  const locale = useLocale();

  const SelectedWorkspace = workspaces[slug];
  return (
    <main
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={css.quality}
      data-qms-page={slug}
    >
      <QualityHero slug={slug} />
      <SelectedWorkspace />
      <QualityFlow slug={slug} />
      <QualityConnections slug={slug} />
      <QualityClosing />
    </main>
  );
}

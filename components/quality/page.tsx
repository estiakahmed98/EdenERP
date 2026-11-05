import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import english from "@/messages/en.json";
import { getLocaleAlternates } from "@/i18n/metadata";
import { qualityPages, type QualitySlug } from "./data";
import QualityHero from "./heroes";
import DashboardWorkspace from "./dashboard";
import NonConformanceWorkspace from "./non-conformance";
import CapaWorkspace from "./capa";
import AqlWorkspace from "./aql";
import SpcWorkspace from "./spc";
import { QualityClosing, QualityConnections, QualityFlow, css } from "./ui";

export async function qualityMetadata(slug: QualitySlug): Promise<Metadata> {
  return {
    title: `${qualityPages[slug].title} | Quality Management`,
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
  const SelectedWorkspace = workspaces[slug];
  return (
    <NextIntlClientProvider
      locale="en"
      messages={{
        common: { actions: { liveDemo: english.common.actions.liveDemo } },
      }}
    >
      <main lang="en" dir="ltr" className={css.quality} data-qms-page={slug}>
        <QualityHero slug={slug} />
        <SelectedWorkspace />
        <QualityFlow slug={slug} />
        <QualityConnections slug={slug} />
        <QualityClosing />
      </main>
    </NextIntlClientProvider>
  );
}

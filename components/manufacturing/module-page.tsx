import type { Metadata } from "next";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { getLocaleAlternates } from "@/i18n/metadata";
import ManufacturingModuleShowcase from "./module-showcase";
import { localizeModule } from "./localized-content";
import type { ManufacturingSlug } from "./module-content";
import visual from "./manufacturing-visuals.module.css";

const NAMESPACE = "pages.manufacturingModules";

export async function manufacturingMetadata(slug: ManufacturingSlug): Promise<Metadata> {
  const t = await getTranslations(NAMESPACE);
  return {
    title: `${t(`modules.${slug}.title`)} | ${t("ui.manufacturing")}`,
    description: t(`modules.${slug}.description`),
    alternates: await getLocaleAlternates(`/apps/manufacturing/${slug}`),
  };
}

export async function ManufacturingModulePage({ slug }: { slug: ManufacturingSlug }) {
  const messages = (await getMessages()) as unknown as {
    pages: { manufacturingModules: { modules: Record<string, never> } };
  };
  const locale = await getLocale();
  const text = messages.pages.manufacturingModules.modules[slug];
  return (
    <div className={locale === "en" ? visual.englishContent : undefined}>
      <ManufacturingModuleShowcase
        slug={slug}
        content={localizeModule(slug, text)}
      />
    </div>
  );
}

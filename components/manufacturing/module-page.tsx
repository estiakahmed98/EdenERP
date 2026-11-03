import type { Metadata } from "next";
import { getLocaleAlternates } from "@/i18n/metadata";
import ManufacturingEnglishContent from "./english-content";
import ManufacturingModuleShowcase from "./module-showcase";
import { manufacturingModules, type ManufacturingSlug } from "./module-content";

export function manufacturingMetadata(slug: ManufacturingSlug): Metadata {
  const content = manufacturingModules[slug];
  return {
    title: `${content.title} | Manufacturing`,
    description: content.description,
    alternates: getLocaleAlternates(`/apps/manufacturing/${slug}`),
  };
}

export function ManufacturingModulePage({ slug }: { slug: ManufacturingSlug }) {
  return (
    <ManufacturingEnglishContent>
      <ManufacturingModuleShowcase
        slug={slug}
        content={manufacturingModules[slug]}
      />
    </ManufacturingEnglishContent>
  );
}

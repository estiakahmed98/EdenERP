"use client";

import { useTranslations } from "next-intl";

import AppSection from "@/components/landing/apps/AppSection";
import FilterBar from "@/components/landing/apps/FilterBar";
import { mostDownloaded, newApps, topApps } from "@/data/apps";

export default function AppsPageClient() {
  const t = useTranslations("pages.apps");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <FilterBar />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12">
        <AppSection title={t("sections.topApps")} apps={topApps} />
        <AppSection title={t("sections.newApps")} apps={newApps} />
        <AppSection title={t("sections.mostDownloaded")} apps={mostDownloaded} />
      </div>
    </div>
  );
}

"use client";

import FilterBar from "@/components/landing/apps/FilterBar";
import AppSection from "@/components/landing/apps/AppSection";
import { topApps, newApps, mostDownloaded } from "@/data/apps";

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <FilterBar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <AppSection title="Top Apps" apps={topApps} />
        <AppSection title="New Apps" apps={newApps} />
        <AppSection title="Most Downloaded" apps={mostDownloaded} />
      </div>
    </div>
  );
}
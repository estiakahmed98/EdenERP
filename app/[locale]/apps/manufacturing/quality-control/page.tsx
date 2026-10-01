"use client";

import { BadgeCheck, ClipboardList, Gauge, ListChecks, ShieldAlert, ShieldCheck } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function QualityControlPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.qualityControl"
      sectionVisuals={[
        { icon: <ClipboardList className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Quality Control/QC templates list.png" },
        { icon: <Gauge className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Quality Control/Add QC parameter form.png", reversed: true, tint: "muted" },
        { icon: <ShieldAlert className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Quality Control/Rice mill QC standard table.png" },
      ]}
      featureIcons={[BadgeCheck, ListChecks, ShieldCheck, Gauge]}
    />
  );
}

"use client";

import { Cog, Gauge, Timer, Users, Wrench, Zap } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function WorkCentersPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.workCenters"
      sectionVisuals={[
        { icon: <Cog className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Work Centers/Manufacturing.png" },
        { icon: <Wrench className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Work Centers/New Work Center.png", reversed: true, tint: "muted" },
        { icon: <Gauge className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Work Centers/Five Work Centers.png" },
      ]}
      featureIcons={[Timer, Zap, Users, Cog]}
    />
  );
}

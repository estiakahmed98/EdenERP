"use client";

import { Calculator, History, LineChart, Percent, Receipt, Scale } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function StandardCostingPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.standardCosting"
      sectionVisuals={[
        { icon: <Calculator className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Standard Costing/Standard costing main screen.png" },
        { icon: <Scale className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Standard Costing/Cost component preview breakdown.png", reversed: true, tint: "muted" },
        { icon: <History className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Standard Costing/Frozen standard cost card version.png" },
      ]}
      featureIcons={[Receipt, LineChart, Percent, Calculator]}
    />
  );
}

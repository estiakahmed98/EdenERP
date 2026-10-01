"use client";

import { Boxes, Layers3, Recycle, Scale, Split, Workflow } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function BillOfMaterialsPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.billOfMaterials"
      sectionVisuals={[
        { icon: <Layers3 className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Bill of Materials/Bill of Materials list screen.png" },
        { icon: <Split className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Bill of Materials/Co-product, by-product, and scrap entry forms.png", reversed: true, tint: "muted" },
        { icon: <Scale className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Bill of Materials/BOM quantity reconciliation example.png" },
      ]}
      featureIcons={[Workflow, Recycle, Boxes, Scale]}
    />
  );
}

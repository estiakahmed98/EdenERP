"use client";

import { ClipboardCheck, Factory, ListChecks, PackageCheck, ScanLine, Truck } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function ProductionOrdersPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.productionOrders"
      sectionVisuals={[
        { icon: <Factory className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Production Orders/Production orders list dashboard.png" },
        { icon: <ScanLine className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Production Orders/New production order form.png", reversed: true, tint: "muted" },
        { icon: <PackageCheck className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Production Orders/Shop floor execution screen.png" },
      ]}
      featureIcons={[ListChecks, ClipboardCheck, Truck, Factory]}
    />
  );
}

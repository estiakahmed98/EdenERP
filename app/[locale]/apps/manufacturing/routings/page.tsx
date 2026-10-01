"use client";

import { ClipboardList, GitBranch, ListOrdered, ShieldCheck, Timer, Truck } from "lucide-react";
import { TranslatedManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function RoutingsPage() {
  return (
    <TranslatedManufacturingDetailPage
      namespace="pages.manufacturingDetails.routings"
      sectionVisuals={[
        { icon: <ListOrdered className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Routings/Routing list screen.png" },
        { icon: <GitBranch className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Routings/Milling route example.png", reversed: true, tint: "muted" },
        { icon: <Timer className="h-4 w-4" />, imageSrc: "/Assets/Manufacturing/Routings/Add operation form.png" },
      ]}
      featureIcons={[ClipboardList, Timer, ShieldCheck, Truck]}
    />
  );
}

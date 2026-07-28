"use client";

import {
  ClipboardCheck,
  Factory,
  ListChecks,
  PackageCheck,
  ScanLine,
  Truck,
} from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function ProductionOrdersPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Production Orders"
      heroTitle="From plan"
      heroTitleHighlight="to shop floor reality"
      heroDescription="A Production Order turns a BOM and Routing into an executable job — components reserved, operations sequenced by Work Center, and every output (main, co-product, by-product, scrap) recorded as it happens."
      sections={[
        {
          icon: <Factory className="h-4 w-4" />,
          eyebrow: "Production Order Dashboard",
          title: <>Every order, its status, and progress — in one view</>,
          description:
            "Draft, Confirmed, In Progress, and Done orders are tracked with their linked BOM, Routing, target quantity, and completion percentage — so a Production Planner can see exactly where every job stands without walking the floor.",
          imageSrc:
            "/Assets/Manufacturing/Production Orders/Production orders list dashboard.png",
          imageAlt: "Production orders list dashboard",
        },
        {
          icon: <ScanLine className="h-4 w-4" />,
          eyebrow: "New Production Order",
          title: <>Product, BOM, Routing & quantity — locked at creation</>,
          description:
            "Selecting the product auto-suggests its Default BOM and Routing. Material components are reserved from the source warehouse (Paddy Godown → Milling Floor WIP) the moment the order is confirmed.",
          imageSrc:
            "/Assets/Manufacturing/Production Orders/New production order form.png",
          imageAlt: "New production order form",
          reversed: true,
          tint: "muted",
          bullets: [
            "Default BOM and Routing pre-fill automatically from the product",
            "Component reservation moves stock from RM to WIP warehouse",
            "Target quantity and due date drive Capacity & MPS visibility",
          ],
        },
        {
          icon: <PackageCheck className="h-4 w-4" />,
          eyebrow: "Shop Floor Execution",
          title: <>Operation-by-operation, output recorded as it's made</>,
          description:
            "Each Routing operation is validated on the shop floor as it completes — main output, co-products, by-products, and scrap are all posted against the order, moving stock from WIP into the Finished Goods warehouse.",
          imageSrc:
            "/Assets/Manufacturing/Production Orders/Shop floor execution screen.png",
          imageAlt: "Shop floor execution screen",
        },
      ]}
      workflowTitle="From order"
      workflowHighlight="to finished goods"
      workflowDescription="A Production Order is the connective record between planning, the shop floor, quality, and cost."
      workflowSteps={[
        {
          title: "1. Create & confirm",
          description: "Product, quantity, BOM and Routing selected; components reserved.",
        },
        {
          title: "2. Execute operations",
          description: "Each Routing step run and validated by Work Center.",
        },
        {
          title: "3. Record output",
          description: "Main product, co/by-products, and scrap posted to stock.",
        },
        {
          title: "4. Close & cost",
          description: "Order marked Done; Actual Cost compared against Standard.",
        },
      ]}
      featuresTitle="Connected to every module around it"
      features={[
        {
          icon: ListChecks,
          title: "BOM & Routing driven",
          description:
            "Material requirements and operation sequence come straight from the linked BOM and Routing — no re-entry.",
        },
        {
          icon: ClipboardCheck,
          title: "Quality checkpoints inline",
          description:
            "Any operation flagged QC Required in the Routing surfaces its inspection right on the shop floor.",
        },
        {
          icon: Truck,
          title: "Subcontracted operations tracked",
          description:
            "External processing steps stay visible inside the same Production Order timeline.",
        },
        {
          icon: Factory,
          title: "Real-time WIP visibility",
          description:
            "See exactly which orders are in progress, at which Work Center, and how close to completion.",
        },
      ]}
      ctaTitle="Turn plans into production"
      ctaDescription="Confirm a Production Order and watch components reserve, operations sequence, and output post automatically."
    />
  );
}

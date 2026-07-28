"use client";

import {
  Boxes,
  Layers3,
  Recycle,
  Scale,
  Split,
  Workflow,
} from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function BillOfMaterialsPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Bill of Materials"
      heroTitle="What goes in,"
      heroTitleHighlight="what comes out"
      heroDescription="A Bill of Materials defines exactly what input quantity produces a given output — including Co-Products, By-Products, and Scrap. Where Routing defines how a product is made, BOM defines what it's made from."
      sections={[
        {
          icon: <Layers3 className="h-4 w-4" />,
          eyebrow: "BOM List",
          title: <>Product, Type, Output & Yield — one recipe per row</>,
          description:
            "Every BOM shows its target Product, Type (Standard / Kit / Subcontracting), Output quantity, Yield percentage, and line count. A product can have several BOMs, but exactly one Default is used by Production Orders unless overridden.",
          imageSrc:
            "/Assets/Manufacturing/Bill of Materials/Bill of Materials list screen.png",
          imageAlt: "Bill of Materials list screen",
        },
        {
          icon: <Split className="h-4 w-4" />,
          eyebrow: "Co-Products, By-Products & Scrap",
          title: <>One process, multiple outputs</>,
          description:
            "Milling 100 kg of paddy doesn't produce only rice — it also yields Broken Rice (Co-Product), Rice Bran and Rice Husk (By-Products), and process loss (Scrap). Each output line is typed correctly so costing and inventory posting split value appropriately.",
          imageSrc:
            "/Assets/Manufacturing/Bill of Materials/Co-product, by-product, and scrap entry forms.png",
          imageAlt: "Co-product, by-product, and scrap entry forms",
          reversed: true,
          tint: "muted",
          bullets: [
            "Co-Product: another meaningful output of equal significance",
            "By-Product: a secondary output that still has recoverable value",
            "Scrap: process loss, waste, or rejected material",
          ],
        },
        {
          icon: <Scale className="h-4 w-4" />,
          eyebrow: "Rice Mill Example",
          title: <>100 kg paddy → reconciled to the kilogram</>,
          description:
            "Input: 100 kg Paddy. Output: 65 kg Rice (main), 5 kg Broken Rice (co-product), 8 kg Rice Bran + 20 kg Rice Husk (by-products) — 98 kg listed, with a 2 kg unallocated difference recorded as process loss. Every gram is accounted for.",
          imageSrc:
            "/Assets/Manufacturing/Bill of Materials/BOM quantity reconciliation example.png",
          imageAlt: "BOM quantity reconciliation example",
        },
      ]}
      workflowTitle="Build a"
      workflowHighlight="BOM that reconciles"
      workflowDescription="A BOM that doesn't add up to its input quantity will silently distort costing and inventory. Reconcile every line before it goes live."
      workflowSteps={[
        {
          title: "1. Set the main output",
          description: "Product, BOM Code, Type, Output Qty, and Yield %.",
        },
        {
          title: "2. Link the Routing",
          description: "Attach the process route this BOM's output will follow.",
        },
        {
          title: "3. Add input lines",
          description: "Every raw material and quantity the recipe consumes.",
        },
        {
          title: "4. Add outputs & reconcile",
          description: "Co-products, by-products, scrap — total should match input, minus process loss.",
        },
      ]}
      featuresTitle="Costing-aware from the first line"
      features={[
        {
          icon: Workflow,
          title: "Standard, Kit, or Subcontracting",
          description:
            "Model discrete manufacturing recipes, bundled kits, or vendor-processed outputs with the same structure.",
        },
        {
          icon: Recycle,
          title: "Cost Share for joint outputs",
          description:
            "Split joint production cost across co-products and by-products using a policy-driven percentage share.",
        },
        {
          icon: Boxes,
          title: "Feeds Production Orders directly",
          description:
            "The Default BOM auto-populates material requirements the moment a Production Order is created.",
        },
        {
          icon: Scale,
          title: "Yield-aware quantity planning",
          description:
            "Yield % adjusts standard material requirement so planning reflects real process efficiency — not theoretical output.",
        },
      ]}
      ctaTitle="Define your product recipes"
      ctaDescription="Get inputs, outputs, and yield reconciled once — every Production Order and cost calculation depends on it."
    />
  );
}

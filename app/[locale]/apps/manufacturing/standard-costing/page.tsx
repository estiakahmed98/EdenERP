"use client";

import {
  Calculator,
  History,
  LineChart,
  Percent,
  Receipt,
  Scale,
} from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function StandardCostingPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Standard Costing"
      heroTitle="Freeze the cost"
      heroTitleHighlight="before production starts"
      heroDescription="Standard Cost = Material + Labor + Machine + Overhead — calculated from the BOM's material quantities and the Routing's operation times at each Work Center's rate. Freezing it creates a versioned cost card you compare Actual Cost against later."
      sections={[
        {
          icon: <Calculator className="h-4 w-4" />,
          eyebrow: "Standard Costing Main Screen",
          title: <>Select a product, see its full cost rollup</>,
          description:
            "Choose any finished product and the system pulls its Default BOM and Routing to calculate a per-unit Material, Labor, Machine, and Overhead cost — the same formula, every time, no manual spreadsheet.",
          imageSrc:
            "/Assets/Manufacturing/Standard Costing/Standard Costing Main Screen.png",
          imageAlt: "Standard costing main screen",
        },
        {
          icon: <Scale className="h-4 w-4" />,
          eyebrow: "Cost Component Preview",
          title: <>Material, Labor, Machine & Overhead — broken down</>,
          description:
            "Material cost comes from BOM standard quantity × item rate. Labor and Machine cost come from Routing operation time × the Work Center's hourly rates. Overhead applies the Work Center's overhead rate per hour of processing.",
          imageSrc:
            "/Assets/Manufacturing/Standard Costing/Cost Component Preview.png",
          imageAlt: "Cost component preview breakdown",
          reversed: true,
          tint: "muted",
          bullets: [
            "Material Cost = BOM standard quantity × standard unit rate",
            "Labor & Machine Cost = Routing operation time × Work Center rate",
            "Overhead Cost = Work Center overhead rate × processing hours",
          ],
        },
        {
          icon: <History className="h-4 w-4" />,
          eyebrow: "Freeze & Version",
          title: <>A cost card that doesn't move once frozen</>,
          description:
            "Freezing Standard creates a versioned, effective-dated cost card. When material rates, yield, routing time, or Work Center rates change, a new version is frozen — the old version stays for historical comparison and variance analysis.",
          imageSrc:
            "/Assets/Manufacturing/Standard Costing/Frozen Cost Card Version.png",
          imageAlt: "Frozen standard cost card version",
        },
      ]}
      workflowTitle="From BOM & Routing"
      workflowHighlight="to a frozen cost card"
      workflowDescription="Standard Costing only works if the BOM, Routing, and Work Center rates behind it are accurate — verify them first."
      workflowSteps={[
        {
          title: "1. Confirm BOM & Routing",
          description: "Material quantities and operation times must be correct.",
        },
        {
          title: "2. Set Work Center rates",
          description: "Labor, Machine, and Overhead hourly rates entered.",
        },
        {
          title: "3. Preview the rollup",
          description: "Review Material + Labor + Machine + Overhead before freezing.",
        },
        {
          title: "4. Freeze & compare",
          description: "Version is locked; Actual Cost is measured against it later.",
        },
      ]}
      featuresTitle="Cost control that stays honest"
      features={[
        {
          icon: Receipt,
          title: "Versioned cost cards",
          description:
            "Every freeze creates a dated version — nothing overwrites history, so past comparisons stay valid.",
        },
        {
          icon: LineChart,
          title: "Standard vs. Actual variance",
          description:
            "Compare a completed Production Order's Actual Cost directly against the frozen Standard.",
        },
        {
          icon: Percent,
          title: "Co-/By-product cost share",
          description:
            "Joint production cost allocation policy affects unit cost — changes require Accounts/Costing sign-off.",
        },
        {
          icon: Calculator,
          title: "No spreadsheet re-entry",
          description:
            "Cost rolls up automatically from the same BOM and Routing data used for planning and execution.",
        },
      ]}
      ctaTitle="Freeze your first Standard Cost"
      ctaDescription="Turn your BOM and Routing into a trustworthy per-unit cost — then track how Actual compares over time."
    />
  );
}

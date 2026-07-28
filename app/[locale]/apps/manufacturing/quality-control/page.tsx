"use client";

import {
  BadgeCheck,
  ClipboardList,
  Gauge,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function QualityControlPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Quality Control"
      heroTitle="One standard,"
      heroTitleHighlight="every inspection"
      heroDescription="QC Templates define reusable inspection checklists — parameters, acceptable Min/Target/Max ranges, and result type — so quality decisions never depend on who's checking, only on the standard everyone checks against."
      sections={[
        {
          icon: <ClipboardList className="h-4 w-4" />,
          eyebrow: "QC Templates List",
          title: <>Incoming, In-Process, Final & Patrol — by inspection type</>,
          description:
            "Incoming Inspection checks raw material on receipt. In-Process catches issues mid-production. Final Inspection gates finished goods before release. Patrol/Random handles routine shop-floor spot checks — each with its own template and parameter set.",
          imageSrc:
            "/Assets/Manufacturing/Quality Control/QC templates list.png",
          imageAlt: "QC templates list",
          bullets: [
            "Incoming: raw material moisture, foreign matter, variety match",
            "In-Process: husking efficiency, broken rice %, mid-run checks",
            "Final: finished goods moisture, color, net weight before release",
          ],
        },
        {
          icon: <Gauge className="h-4 w-4" />,
          eyebrow: "Add Parameter",
          title: <>Numeric, Pass/Fail, Text, or Rating — with real limits</>,
          description:
            "Each parameter has a Type, Unit, and — for numeric checks — a Min/Target/Max range plus an Inspection Method describing exactly how it's measured. Mandatory parameters block inspection completion until recorded.",
          imageSrc:
            "/Assets/Manufacturing/Quality Control/Add QC parameter form.png",
          imageAlt: "Add QC parameter form",
          reversed: true,
          tint: "muted",
          bullets: [
            "Numeric: e.g. Moisture 12%–14%, target 13%",
            "Pass/Fail: e.g. Variety Match, Packaging Intact",
            "Text or Rating: e.g. color/whiteness grade, remarks",
          ],
        },
        {
          icon: <ShieldAlert className="h-4 w-4" />,
          eyebrow: "Mill  Factory Standard",
          title: <>A real inspection plan, stage by stage</>,
          description:
            "Incoming Paddy: Moisture 12–14%, Foreign Matter max limit, Variety match. In-Process: Husking Efficiency target, Broken Rice max %. Final Rice: Moisture range, Color/Whiteness grade, Net Weight tolerance at Packing.",
          imageSrc:
            "/Assets/Manufacturing/Quality Control/Rice mill QC standard table.png",
          imageAlt: "Rice mill QC standard table",
        },
      ]}
      workflowTitle="Inspection that's"
      workflowHighlight="never subjective"
      workflowDescription="Build the template once, apply it everywhere the same product or stage recurs."
      workflowSteps={[
        {
          title: "1. Define the stage",
          description: "Incoming, In-Process, Final, or Patrol/Random.",
        },
        {
          title: "2. Add parameters",
          description: "Type, unit, and Min/Target/Max acceptance range.",
        },
        {
          title: "3. Link to Routing",
          description: "Mark the relevant operation as QC Required.",
        },
        {
          title: "4. Record results",
          description:
            "Inspectors log results against the same fixed standard.",
        },
      ]}
      featuresTitle="Consistent standards, every shift"
      features={[
        {
          icon: BadgeCheck,
          title: "Mandatory parameter enforcement",
          description:
            "Inspection can't be marked complete until every mandatory parameter is recorded.",
        },
        {
          icon: ListChecks,
          title: "Four inspection types",
          description:
            "Incoming, In-Process, Final, and Patrol/Random cover every point defects can enter.",
        },
        {
          icon: ShieldCheck,
          title: "Routing-linked checkpoints",
          description:
            "QC Required operations surface their template automatically during shop floor execution.",
        },
        {
          icon: Gauge,
          title: "Numeric range validation",
          description:
            "Min/Target/Max limits catch out-of-spec results the moment they're entered.",
        },
      ]}
      ctaTitle="Standardize your inspections"
      ctaDescription="Build QC templates once and every inspector, every shift, checks against the same fixed standard."
    />
  );
}

"use client";

import {
  Cog,
  Gauge,
  Timer,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function WorkCentersPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Work Centers"
      heroTitle="Where every"
      heroTitleHighlight="production step happens"
      heroDescription="A Work Center is a Machine, Labor Group, Production Line, or external resource where one operation of a Routing is carried out — its capacity, hours, efficiency, and rate drive both planning and costing."
      sections={[
        {
          icon: <Cog className="h-4 w-4" />,
          eyebrow: "Work Centers List",
          title: (
            <>Name, Code, Type, Capacity & Operations — at a glance</>
          ),
          description:
            "Every Work Center is listed with its type (Machine / Labor Group / Production Line / External), rated capacity, efficiency, and how many Routing operations reference it — so planners know exactly what resource they're scheduling against.",
          imageSrc: "/Assets/Manufacturing/Work Centers/Manufacturing.png",
          imageAlt: "Work Centers list screen",
          bullets: [
            "Type: Machine, Labor Group, Production Line, or External/Subcontracted",
            "Unique short Code for fast lookup in Routing and reports",
            "Operations count shows how heavily each resource is used",
          ],
        },
        {
          icon: <Wrench className="h-4 w-4" />,
          eyebrow: "New Work Center",
          title: <>Capacity, hours & rates that feed planning</>,
          description:
            "Capacity, Capacity UOM, Operating Hours and Efficiency determine daily practical output for bottleneck analysis. Labor Rate, Machine Rate, and Overhead Rate feed directly into Standard Cost — get these wrong and every downstream cost calculation is wrong too.",
          imageSrc: "/Assets/Manufacturing/Work Centers/New Work Center.png",
          imageAlt: "New Work Center form",
          reversed: true,
          tint: "muted",
          bullets: [
            "Practical daily capacity = Rated Capacity × Operating Hours × Efficiency",
            "Labor & Machine Rate drive per-hour conversion cost",
            "Overhead Rate allocates indirect factory cost per hour",
          ],
        },
        {
          icon: <Gauge className="h-4 w-4" />,
          eyebrow: "Example — Rice Mill",
          title: <>Five Work Centers, one milling line</>,
          description:
            "Paddy Intake & Pre-Cleaning → Husking → Whitening & Polishing → Grading & Sorting → Weighing & Packing. Each stage is its own Work Center with its own capacity and rate, so a bottleneck at Husking is visible before it delays the whole batch.",
          imageSrc: "/Assets/Manufacturing/Work Centers/Five Work Centers.png",
          imageAlt: "Rice mill work centers example",
        },
      ]}
      workflowTitle="Set up a"
      workflowHighlight="Work Center in 4 steps"
      workflowDescription="Get the resource defined once, correctly, and every Routing, Production Order, and Cost Card that references it stays accurate."
      workflowSteps={[
        {
          title: "1. Define the resource",
          description: "Name, unique Code, and Type — Machine, Labor Group, Line, or External.",
        },
        {
          title: "2. Set capacity",
          description: "Capacity, Capacity UOM, Operating Hours, and Efficiency.",
        },
        {
          title: "3. Set rates",
          description: "Labor Rate, Machine Rate, and Overhead Rate per hour.",
        },
        {
          title: "4. Link to Routing",
          description: "The Work Center becomes selectable on any Routing operation.",
        },
      ]}
      featuresTitle="Built for real factory floors"
      features={[
        {
          icon: Timer,
          title: "Capacity-aware planning",
          description:
            "Daily practical capacity feeds MPS, MRP, and Capacity Planning automatically — no manual recalculation.",
        },
        {
          icon: Zap,
          title: "Cost-driving rates",
          description:
            "Labor, Machine, and Overhead rates flow straight into Standard Costing and variance analysis.",
        },
        {
          icon: Users,
          title: "External & subcontracted resources",
          description:
            "Model vendor-performed operations as Work Centers too, so subcontracting stays inside the same Routing.",
        },
        {
          icon: Cog,
          title: "One resource, many operations",
          description:
            "A single Work Center can be reused across multiple Routings and BOMs without re-entry.",
        },
      ]}
      ctaTitle="Set up your first Work Center"
      ctaDescription="Get every machine, line, and labor group into the system before you build a single Routing."
    />
  );
}

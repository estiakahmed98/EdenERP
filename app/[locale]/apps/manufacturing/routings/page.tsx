"use client";

import { ClipboardList, GitBranch, ListOrdered, ShieldCheck, Timer, Truck } from "lucide-react";

import { ManufacturingDetailPage } from "@/components/manufacturing-detail-page";

export default function RoutingsPage() {
  return (
    <ManufacturingDetailPage
      moduleLabel="Manufacturing / Routings"
      heroTitle="The recipe for"
      heroTitleHighlight="how, where & how long"
      heroDescription="A Routing is the sequenced list of operations needed to make a product — which Work Center runs each step and how much time it takes. Where a BOM defines what material is consumed, the Routing defines how the process actually runs."
      sections={[
        {
          icon: <ListOrdered className="h-4 w-4" />,
          eyebrow: "Routing List",
          title: <>Sequenced operations, one Work Center at a time</>,
          description:
            "Every Routing shows its Code, number of Operations, linked BOM count, and Default status. Sequence numbers are kept in steps of 10 (10, 20, 30…) so a new operation can be inserted later without renumbering everything.",
          imageSrc: "/Assets/Manufacturing/Routings/Routing list screen.png",
          imageAlt: "Routing list screen",
          bullets: [
            "Sequence gaps (10, 20, 30) leave room to insert operations later",
            "Default Routing marks the standard process path for a product",
            "Operation count and linked BOMs shown at a glance",
          ],
        },
        {
          icon: <GitBranch className="h-4 w-4" />,
          eyebrow: "Example — Milling Route",
          title: <>Five operations, five Work Centers, one flow</>,
          description:
            "Seq 10 Paddy Intake & Pre-Cleaning → Seq 20 Husking → Seq 30 Whitening & Polishing → Seq 40 Grading & Sorting → Seq 50 Weighing & Packing. Each operation names its purpose and the exact Work Center responsible.",
          imageSrc:
            "/Assets/Manufacturing/Routings/Milling route example.png",
          imageAlt: "Milling route example",
          reversed: true,
          tint: "muted",
        },
        {
          icon: <Timer className="h-4 w-4" />,
          eyebrow: "Add Operation",
          title: <>Setup, run & teardown time — modeled separately</>,
          description:
            "Setup Time (prep before the operation starts), Op Time (actual processing), and Teardown Time (cleaning/changeover) are tracked independently, plus a Time Mode — Per Unit, Per Batch, or Fixed — so capacity and cost calculations match how the operation actually behaves.",
          imageSrc: "/Assets/Manufacturing/Routings/Add operation form.png",
          imageAlt: "Add operation form",
        },
      ]}
      workflowTitle="Build a"
      workflowHighlight="Routing step by step"
      workflowDescription="A Routing links directly into BOM and Standard Costing — get the sequence and timing right once."
      workflowSteps={[
        {
          title: "1. Create the Routing",
          description: "Name, Code, Description, and optionally mark as Default.",
        },
        {
          title: "2. Add operations",
          description: "Each in Sequence, with its Work Center assigned.",
        },
        {
          title: "3. Set time & mode",
          description: "Setup, Op Time, Teardown — Per Unit, Per Batch, or Fixed.",
        },
        {
          title: "4. Flag QC steps",
          description: "Mark any operation as QC Required for inspection.",
        },
      ]}
      featuresTitle="Time modeled the way your process actually runs"
      features={[
        {
          icon: ClipboardList,
          title: "Sequence with room to grow",
          description:
            "Step-10 numbering means new operations slot in without disturbing the rest of the route.",
        },
        {
          icon: Timer,
          title: "Per Unit, Per Batch, or Fixed",
          description:
            "Match the time-calculation mode to how the operation behaves — unit inspection vs. batch husking vs. fixed changeover.",
        },
        {
          icon: ShieldCheck,
          title: "QC checkpoints built in",
          description:
            "Mark any operation as QC Required so Quality Control is never a separate, disconnected step.",
        },
        {
          icon: Truck,
          title: "Subcontracted operations",
          description:
            "Mark an operation as performed externally and link it to the vendor Work Center.",
        },
      ]}
      ctaTitle="Map your production process"
      ctaDescription="Turn your factory floor sequence into a Routing that drives planning, capacity, and cost together."
    />
  );
}

export const industrySlugs = ["steel", "agro-rice"] as const;
export type IndustrySlug = (typeof industrySlugs)[number];
type Stage = {
  label: string;
  title: string;
  body: string;
  details: [string, string][];
};
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  story: string;
  stages: Stage[];
  demoTitle: string;
  demoDescription: string;
  tools: { title: string; body: string; href: string }[];
  faqs: [string, string][];
};
export const pages: Record<IndustrySlug, Content> = {
  steel: {
    title: "Steel",
    eyebrow: " Adon ERP / STEEL MANUFACTURING",
    headline: "Follow the metal.",
    accent: "Keep the detail.",
    description:
      "Explore a connected view of material identity, work-centre activity, weight and dispatch context—from the first coil to the next handoff.",
    story: "A material’s story continues through the mill.",
    demoTitle: "Start with the weight. Follow the allocation.",
    demoDescription:
      "Change an illustrative gross/tare weighment and two example order allocations. The arithmetic stays local; no weighbridge ticket, reservation or dispatch is created.",
    stages: [
      {
        label: "Intake",
        title: "Give the incoming material a clear identity.",
        body: "Bring the weighment, material reference and stock context into the same conversation before following the material into production.",
        details: [
          ["Weight context", "Gross, tare and net"],
          ["Material context", "Coil / lot reference"],
          ["Next handoff", "Inventory and production"],
        ],
      },
      {
        label: "Production",
        title: "Read the work in its manufacturing context.",
        body: "Explore production orders, work centres and the routing view while keeping the material reference visible.",
        details: [
          ["Order context", "Production order"],
          ["Process context", "Routing and work centre"],
          ["Material context", "Batch and stock movement"],
        ],
      },
      {
        label: "Quality",
        title: "Keep inspection evidence close to the material.",
        body: "Explore quality records alongside material and production context. Discuss the checks your own process needs in a guided walkthrough.",
        details: [
          ["Record context", "Inspection and reference"],
          ["Trace context", "Material and order"],
          ["Next action", "Review and follow-up"],
        ],
      },
      {
        label: "Dispatch",
        title: "Make the final handoff readable.",
        body: "Bring order allocation, available weight and stock movement into view before discussing the dispatch workflow.",
        details: [
          ["Order context", "Allocated weight"],
          ["Stock context", "Remaining material"],
          ["Next handoff", "Movement and dispatch record"],
        ],
      },
    ],
    tools: [
      {
        title: "Weighbridge & scales",
        body: "Explore gross, tare and net weighment in the existing inventory presentation.",
        href: "/apps/inventory/weighbridge-scales",
      },
      {
        title: "Production orders",
        body: "Follow the existing order-execution showcase and its manufacturing context.",
        href: "/apps/manufacturing/production-orders",
      },
      {
        title: "Batches & lots",
        body: "Explore material identity and the batch/lot traceability presentation.",
        href: "/apps/manufacturing/batches-lots",
      },
      {
        title: "Quality control",
        body: "Look at the quality workspace and discuss your own inspection process.",
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        "Does the weighment example read from a real scale?",
        "No. The weights are editable example inputs. No device, weighbridge, calibration record or live inventory connection is used by this page.",
      ],
      [
        "Does an allocation reserve or cut material?",
        "No. It compares two example order weights with calculated net weight. It does not check dimensions, grade, physical cutting feasibility or stock availability, and it creates no reservation.",
      ],
      [
        "Can we use our coil and production process in the demo?",
        "Yes. Bring material references, work-centre stages, weight units and order-flow questions to the advisor conversation so the walkthrough can follow your process.",
      ],
    ],
  },
  "agro-rice": {
    title: "Agro Rice",
    eyebrow: " Adon ERP / AGRO & RICE MILLING",
    headline: "From incoming paddy",
    accent: "to a clearer mill picture.",
    description:
      "Bring intake, milling-output records and stock context into one considered view of the lot, with room for the detail of your own rice operation.",
    story: "Keep the lot in view as its form changes.",
    demoTitle: "See the lot through a simple mass balance.",
    demoDescription:
      "Enter illustrative paddy and output weights. Explore the recorded fractions and any unassigned difference; no mill output, quality result or inventory posting is created.",
    stages: [
      {
        label: "Receive",
        title: "Begin with a readable intake record.",
        body: "Explore how the source lot, net weight and receiving context frame the work that follows.",
        details: [
          ["Lot context", "Incoming paddy reference"],
          ["Weight context", "Net intake weight"],
          ["Next handoff", "Storage and processing"],
        ],
      },
      {
        label: "Process",
        title: "Keep the outputs attached to the input lot.",
        body: "Use the local example to discuss head rice, broken rice, bran and husk as separate recorded outputs, without assuming a standard yield.",
        details: [
          ["Input context", "Paddy weight"],
          ["Output context", "Rice and other fractions"],
          ["Review context", "Recorded vs unassigned weight"],
        ],
      },
      {
        label: "Review",
        title: "Read the record before drawing a conclusion.",
        body: "Bring inspection and quantity evidence into the conversation. The page does not infer grain quality, moisture correction or acceptance limits.",
        details: [
          ["Quality context", "Inspection records"],
          ["Quantity context", "Output weights"],
          ["Next action", "Review the evidence"],
        ],
      },
      {
        label: "Stock",
        title: "Follow each recorded output into its stock context.",
        body: "Explore warehouses and stock movements when discussing how different products and by-products are stored and handed over.",
        details: [
          ["Product context", "Separate output identities"],
          ["Location context", "Warehouse records"],
          ["Next handoff", "Stock movements and packing"],
        ],
      },
    ],
    tools: [
      {
        title: "Weighbridge & scales",
        body: "Explore the existing weighment presentation as an intake starting point.",
        href: "/apps/inventory/weighbridge-scales",
      },
      {
        title: "Bill of materials",
        body: "Inspect the manufacturing BOM presentation and discuss your own input/output structure.",
        href: "/apps/manufacturing/bill-of-materials",
      },
      {
        title: "Warehouses",
        body: "Explore location records and the inventory context around stored products.",
        href: "/apps/inventory/warehouses",
      },
      {
        title: "Stock movements",
        body: "Follow the existing movement showcase for receiving and issue context.",
        href: "/apps/inventory/stock-movements",
      },
    ],
    faqs: [
      [
        "Are the example output percentages industry benchmarks?",
        "No. Every weight and calculated fraction belongs to the illustrative example. The page makes no claim about normal milling recovery, quality grade or the performance of a real mill.",
      ],
      [
        "Is unassigned weight automatically a process loss?",
        "No. It is only the arithmetic difference between the entered input and recorded outputs. The example does not classify that difference or apply moisture, quality or measurement corrections.",
      ],
      [
        "Can we explore our own varieties, outputs and stock process?",
        "Yes. Bring your lot identities, input/output categories, units and warehouse flow to an advisor walkthrough. The local calculator does not replace your operating records or process controls.",
      ],
    ],
  },
};
export const steelExample = {
  reference: "EX-COIL-01",
  gross: 18400,
  tare: 8600,
  orders: [
    { reference: "EX-ORDER-A", weight: 4000 },
    { reference: "EX-ORDER-B", weight: 3200 },
  ],
};
export const riceExample = {
  reference: "EX-PADDY-01",
  input: 10000,
  headRice: 6500,
  brokenRice: 500,
  bran: 800,
  husk: 2000,
};
export const kg = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 3 })} kg`;

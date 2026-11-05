export const apparelSlugs = [
  "garments",
  "accessories",
  "buying-house",
  "merchandising",
] as const;
export type ApparelSlug = (typeof apparelSlugs)[number];
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  story: string;
  stages: { label: string; title: string; body: string; points: string[] }[];
  demoTitle: string;
  demoDescription: string;
  tools: { title: string; body: string; href: string }[];
  faqs: [string, string][];
};
export const pages: Record<ApparelSlug, Content> = {
  garments: {
    title: "Garments",
    eyebrow: "Adon ERP / GARMENT OPERATIONS",
    headline: "A style becomes an order.",
    accent: "Keep every piece in context.",
    description:
      "Explore the connection between the size set, production work and the records behind the garment—from the first breakdown to the next factory handoff.",
    story: "Give the garment order a readable path.",
    demoTitle: "Turn a size ratio into a piece breakdown.",
    demoDescription:
      "Adjust a fictional order quantity and four whole-number size ratios. The example distributes whole pieces exactly; it does not create a cutting plan or production order.",
    stages: [
      {
        label: "Order breakdown",
        title: "Start with the pieces behind the order.",
        body: "Use the local size-ratio exercise to discuss how an order quantity becomes a clear size breakdown.",
        points: ["Order quantity", "Size ratio", "Whole-piece allocation"],
      },
      {
        label: "Production context",
        title: "Follow the work beyond the breakdown.",
        body: "Explore the existing line-planning and shop-floor presentations when discussing the order’s manufacturing journey.",
        points: [
          "Line-planning context",
          "Shop-floor activity",
          "Order follow-up",
        ],
      },
      {
        label: "Review & handoff",
        title: "Keep quality and cost close to the order.",
        body: "Bring inspection and production-cost questions into the same product conversation without inferring real factory performance.",
        points: [
          "Inspection context",
          "Production-cost records",
          "Next operational handoff",
        ],
      },
    ],
    tools: [
      {
        title: "Line planning",
        body: "Explore the existing production-line planning presentation.",
        href: "/apps/manufacturing/line-planning-board",
      },
      {
        title: "Shop floor",
        body: "Look at the shop-floor showcase and its execution context.",
        href: "/apps/manufacturing/shop-floor",
      },
      {
        title: "Production costing",
        body: "Inspect the manufacturing cost presentation.",
        href: "/apps/manufacturing/production-costing",
      },
      {
        title: "Quality control",
        body: "Explore inspection records and the quality workspace.",
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        "Does the ratio example make a cutting plan?",
        "No. It allocates an entered quantity into whole pieces using example ratios. It does not check marker efficiency, fabric consumption, garment specifications or physical cutting constraints.",
      ],
      [
        "Why can a size receive one extra piece?",
        "The example uses proportional shares, then assigns the remaining whole pieces to the largest fractional remainders. Equal remainders are resolved in the displayed size order, so the total always matches the entered order quantity.",
      ],
      [
        "Can we discuss our own garment process?",
        "Yes. Bring size sets, order breakdowns, production stages and quality or costing questions to an advisor walkthrough.",
      ],
    ],
  },
  accessories: {
    title: "Accessories",
    eyebrow: "Adon ERP / APPAREL ACCESSORIES",
    headline: "Small parts.",
    accent: "A much clearer order picture.",
    description:
      "Bring buttons, zips, labels and packing detail into the order conversation, with a clear view of the quantities behind each requirement.",
    story: "The details deserve their own context.",
    demoTitle: "Explore a small trims requirement.",
    demoDescription:
      "Change an illustrative order quantity, per-piece counts, stock and extra allowance. Every item is counted in pieces; no purchase or stock reservation is created.",
    stages: [
      {
        label: "Define the detail",
        title: "Keep the item and its unit explicit.",
        body: "The local example uses whole-piece accessories only. Use the product conversation to explore your own item identities and units.",
        points: ["Accessory identity", "Per-garment count", "Explicit unit"],
      },
      {
        label: "Read the requirement",
        title: "Separate the order need from the allowance.",
        body: "Compare the entered quantity and per-piece count with an optional extra allowance that belongs only to this example.",
        points: [
          "Order pieces",
          "Entered allowance",
          "Whole-piece requirement",
        ],
      },
      {
        label: "Check the gap",
        title: "See the difference before the next handoff.",
        body: "Compare the example requirement with entered stock, then explore the existing BOM and inventory presentations.",
        points: ["Example stock", "Quantity gap", "BOM and inventory context"],
      },
    ],
    tools: [
      {
        title: "Items & products",
        body: "Explore item identity and the existing product-record presentation.",
        href: "/apps/accounting/items-products",
      },
      {
        title: "Bill of materials",
        body: "Look at the manufacturing BOM and its input structure.",
        href: "/apps/manufacturing/bill-of-materials",
      },
      {
        title: "Stock movements",
        body: "Explore the receiving and issue record presentation.",
        href: "/apps/inventory/stock-movements",
      },
      {
        title: "Quality context",
        body: "Inspect the quality workspace for an accessory-check conversation.",
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        "Is the extra allowance a recommended wastage rate?",
        "No. It is an editable assumption for this local example, rounded to 0.01 percentage point. The page assumes no standard allowance or industry loss rate.",
      ],
      [
        "Why are requirements rounded up?",
        "All four example items use whole pieces. The calculator rounds each entered requirement up to the next whole piece after the allowance; it does not convert between pieces, metres or other units.",
      ],
      [
        "Does a shortfall generate a purchase request?",
        "No. The example does not read live stock, reserve items or create a purchase document. Bring your actual items and units to the advisor demo.",
      ],
    ],
  },
  "buying-house": {
    title: "Buying House",
    eyebrow: "Adon ERP / BUYING-HOUSE OPERATIONS",
    headline: "Bring the buyer,",
    accent: "factory and detail together.",
    description:
      "Explore the coordination behind an order, with a clear distinction between trading value, commission fees and the operational records supporting the handoff.",
    story: "A considered handoff between buyer and factory.",
    demoTitle: "Compare two commercial conversations.",
    demoDescription:
      "Switch between an illustrative margin-trading calculation and a commission-fee calculation. Both stay in USD; no invoice, exchange rate or factory allocation is created.",
    stages: [
      {
        label: "Order context",
        title: "Begin with the buyer’s order and the factory context.",
        body: "Explore factory and buyer-workspace presentations to frame the order-coordination conversation.",
        points: ["Buyer context", "Factory profile", "Order handoff"],
      },
      {
        label: "Settlement mode",
        title: "Keep a trading sale distinct from a fee.",
        body: "The local example treats margin trading and commission as different models. A commission fee is not the full merchandise value.",
        points: [
          "Trading revenue and purchase cost",
          "Commission fee basis",
          "Separate commercial meaning",
        ],
      },
      {
        label: "Receipt & review",
        title: "Follow the evidence behind the commercial view.",
        body: "Use the in-house receipt and profitability presentations to discuss ownership, quantities and the document context.",
        points: [
          "Receipt records",
          "Ownership context",
          "Profitability presentation",
        ],
      },
    ],
    tools: [
      {
        title: "Factory profiles",
        body: "Explore factory capacity and the existing source-profile presentation.",
        href: "/apps/merchandising/factories",
      },
      {
        title: "In-house receipts",
        body: "See the existing receipt and ownership-mode showcase.",
        href: "/apps/merchandising/in-house-receipts",
      },
      {
        title: "Profitability",
        body: "Inspect the quoted-versus-actual commercial presentation.",
        href: "/apps/merchandising/profitability",
      },
      {
        title: "Buyer workspace context",
        body: "Explore the explanatory buyer-role and access preview.",
        href: "/apps/merchandising/buyer-portal",
      },
    ],
    faqs: [
      [
        "Is the commission amount a net profit figure?",
        "No. It is the example quantity multiplied by the entered per-piece fee. Operating costs are not supplied in commission mode, so net profit and margin are not calculated.",
      ],
      [
        "Does the trading difference include all business costs?",
        "No. It compares entered selling value with entered purchase cost only. Other costs, tax, currency conversion and accounting policies are outside this local scenario.",
      ],
      [
        "Can we discuss our own settlement and factory flow?",
        "Yes. Bring buyer/order structures, factory arrangements, receipt ownership and commercial-record questions to an advisor conversation.",
      ],
    ],
  },
  merchandising: {
    title: "Merchandising",
    eyebrow: "Adon ERP / MERCHANDISING OPERATIONS",
    headline: "A style in motion.",
    accent: "A clearer next action.",
    description:
      "Explore style development, material readiness and the time-and-action conversation, with the next handoff kept in view.",
    story: "Keep the style’s decisions connected.",
    demoTitle: "Work back from an example cutting date.",
    demoDescription:
      "Choose a fictional planned cutting date and calendar-day offsets for four milestones. These are local planning assumptions, not production lead-time standards or a saved TNA plan.",
    stages: [
      {
        label: "Style development",
        title: "Start with the specification and commercial context.",
        body: "Explore the existing style-and-costing presentation before following the material and milestone conversations.",
        points: ["Style identity", "Sample context", "Cost-sheet presentation"],
      },
      {
        label: "Materials & time",
        title: "Bring the material question into the date conversation.",
        body: "Use the milestone exercise to discuss the relationship between an example PCD and the actions that should precede it.",
        points: [
          "Planned cutting date",
          "Entered calendar-day offsets",
          "Material-readiness context",
        ],
      },
      {
        label: "Follow the action",
        title: "Keep the next handoff visible.",
        body: "Explore the merchandising dashboard and TNA presentations to discuss the evidence and responsibilities behind a follow-up.",
        points: [
          "Milestone context",
          "Responsibility discussion",
          "Dashboard follow-up",
        ],
      },
    ],
    tools: [
      {
        title: "Styles & costing",
        body: "Explore the existing style, sample and costing presentation.",
        href: "/apps/merchandising/styles-costing",
      },
      {
        title: "Time & action",
        body: "Look at the existing TNA calendar and source milestone excerpt.",
        href: "/apps/merchandising/tna-calendar",
      },
      {
        title: "Material booking",
        body: "Inspect material-line readiness in the existing workspace.",
        href: "/apps/merchandising/material-booking",
      },
      {
        title: "Merchandising overview",
        body: "Explore the wider source dashboard and follow-up context.",
        href: "/apps/merchandising/merchandising-dashboard",
      },
    ],
    faqs: [
      [
        "Are the day offsets standard production lead times?",
        "No. Each offset is an editable example assumption. The calculation subtracts calendar days; it does not model working weeks, holidays, capacity or supplier commitments.",
      ],
      [
        "Does changing a date update a production plan?",
        "No. The example stores no TNA milestones, bookings or orders. The separate linked TNA presentation contains its own clearly labelled source and local examples.",
      ],
      [
        "Can we use our own style and milestone process in a demo?",
        "Yes. Bring style-development stages, sample rounds, material requirements and planning rules to an advisor walkthrough.",
      ],
    ],
  },
};
export const sizes = [
  { label: "S", ratio: 1 },
  { label: "M", ratio: 2 },
  { label: "L", ratio: 2 },
  { label: "XL", ratio: 1 },
];
export const trims = [
  { id: "button", name: "Buttons", perPiece: 6, stock: 6000 },
  { id: "zip", name: "Zips", perPiece: 1, stock: 1000 },
  { id: "label", name: "Labels", perPiece: 2, stock: 1500 },
  { id: "tag", name: "Hang tags", perPiece: 1, stock: 800 },
];
export const milestones = [
  { id: "cost", name: "Cost-sheet discussion", days: 21 },
  { id: "fabric", name: "Fabric-booking discussion", days: 14 },
  { id: "sample", name: "Sample-review discussion", days: 10 },
  { id: "trims", name: "Trim-readiness discussion", days: 7 },
];
export const examplePcd = "2026-12-15";
export const money = (value: number) =>
  `USD ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const num = (value: number) => value.toLocaleString("en-US");
export const dateLabel = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

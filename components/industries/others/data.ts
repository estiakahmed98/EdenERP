export const otherIndustries = ["ecommerce", "ngo", "tv"] as const;
export type OtherIndustry = (typeof otherIndustries)[number];
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  storyTitle: string;
  stages: { label: string; title: string; body: string; points: string[] }[];
  demoTitle: string;
  demoDescription: string;
  tools: { title: string; body: string; href: string }[];
  faqs: [string, string][];
};
export const pages: Record<OtherIndustry, Content> = {
  ecommerce: {
    title: "E-commerce",
    eyebrow: "EDEN ERP / E-COMMERCE",
    headline: "A considered storefront.",
    accent: "A clearer order journey.",
    description:
      "Explore how the product, basket and business records fit together—from a customer’s first selection to the next operational handoff.",
    storyTitle: "Give the order a readable path.",
    demoTitle: "Build a small example basket.",
    demoDescription:
      "Explore three fictional products, change quantities and compare an example delivery charge and flat discount. No order, payment or stock reservation is created.",
    stages: [
      {
        label: "The catalogue",
        title: "Start with the product in context.",
        body: "Bring the product identity, price and stock conversation together before following the order into business records.",
        points: ["Product identity", "Price context", "Inventory discussion"],
      },
      {
        label: "The basket",
        title: "Keep the calculation easy to read.",
        body: "Use the local basket to see the relationship between item totals, an entered delivery charge and a flat discount.",
        points: [
          "Selected products",
          "Quantity and subtotal",
          "Example order total",
        ],
      },
      {
        label: "The handoff",
        title: "Follow the commercial detail beyond the basket.",
        body: "Explore the existing invoice and delivery-document presentations when discussing your order workflow.",
        points: [
          "Order context",
          "Invoice presentation",
          "Delivery-document context",
        ],
      },
    ],
    tools: [
      {
        title: "E-commerce presentation",
        body: "Explore the existing website commerce showcase.",
        href: "/apps/website/ecommerce",
      },
      {
        title: "Inventory overview",
        body: "Look at the inventory presentation behind the product conversation.",
        href: "/apps/inventory/inventory-summary",
      },
      {
        title: "Customer invoices",
        body: "Explore the existing invoice presentation and its commercial context.",
        href: "/apps/accounting/invoices-ar",
      },
      {
        title: "Delivery documents",
        body: "Inspect the delivery-challan showcase for the order handoff.",
        href: "/apps/accounting/delivery-challans",
      },
    ],
    faqs: [
      [
        "Can I place an order or pay here?",
        "No. The products, basket and charges are illustrative local examples. No checkout, payment gateway, delivery booking or inventory service is connected.",
      ],
      [
        "Does the basket calculate tax?",
        "No. The example shows item totals, an entered delivery charge and a flat discount only. Tax rules and any production checkout configuration should be discussed separately.",
      ],
      [
        "Can we discuss our own products and order process?",
        "Yes. Bring your catalogue, price structure, inventory and delivery questions to the advisor walkthrough.",
      ],
    ],
  },
  ngo: {
    title: "NGO",
    eyebrow: "EDEN ERP / NGO & PROGRAMME OPERATIONS",
    headline: "Keep the purpose.",
    accent: "Bring the detail together.",
    description:
      "Explore the relationship between funds, programmes and the records behind them, with a clear view of the administrative work that supports your mission.",
    storyTitle: "Make the programme context visible.",
    demoTitle: "Explore a programme-budget conversation.",
    demoDescription:
      "Adjust an illustrative planning budget and three allocation amounts. The calculation does not record a donation, transfer funds or approve programme spending.",
    stages: [
      {
        label: "Fund context",
        title: "Begin with the funding conversation.",
        body: "Use the existing donor and fund presentations to discuss how funding identity and purpose should remain visible in your records.",
        points: [
          "Fund and donor context",
          "Programme purpose",
          "Document references",
        ],
      },
      {
        label: "Programme detail",
        title: "Keep the activities connected to their context.",
        body: "Bring programme planning and allocation questions into the same conversation, without treating an example budget as actual spending.",
        points: [
          "Programme structure",
          "Planning amounts",
          "Allocation discussion",
        ],
      },
      {
        label: "Reporting",
        title: "Follow the record behind the report.",
        body: "Explore the existing fund-reporting and grant presentations when discussing the evidence and reports your organisation needs.",
        points: ["Grant context", "Record review", "Reporting presentation"],
      },
    ],
    tools: [
      {
        title: "Donors & funds",
        body: "Explore donor and fund identities in the existing presentation.",
        href: "/apps/fund-accounting/donors-funds",
      },
      {
        title: "Grants",
        body: "Look at grant context and the supporting product showcase.",
        href: "/apps/fund-accounting/grants",
      },
      {
        title: "Cost allocation",
        body: "Inspect the existing allocation presentation as a discussion starting point.",
        href: "/apps/fund-accounting/cost-allocation",
      },
      {
        title: "Fund reports",
        body: "Explore the reporting showcase and its record context.",
        href: "/apps/fund-accounting/reports",
      },
    ],
    faqs: [
      [
        "Are these actual donations or programme results?",
        "No. Every amount and programme label in this page is illustrative. No donor, recipient, beneficiary or impact claim is represented by the example.",
      ],
      [
        "Does a balanced allocation approve expenditure?",
        "No. It only means the entered planning amounts add up to the example budget. The tool does not check grant restrictions, eligibility, policy or compliance, and it approves no spending.",
      ],
      [
        "Can we explore our fund and reporting structure?",
        "Yes. Bring your programme structure, fund categories, allocation questions and reporting needs to an advisor conversation.",
      ],
    ],
  },
  tv: {
    title: "TV",
    eyebrow: "EDEN ERP / TV & MEDIA OPERATIONS",
    headline: "Behind every programme,",
    accent: "a clearer operational picture.",
    description:
      "Explore the planning, resources and commercial context behind a television programme, with room for the detail of your own production workflow.",
    storyTitle: "Keep the work behind the screen in view.",
    demoTitle: "Shape an illustrative programme rundown.",
    demoDescription:
      "Edit five segment durations, choose a start time and compare the total with an example target. The clock is a local planning illustration, not a broadcast automation system.",
    stages: [
      {
        label: "Programme planning",
        title: "Give the programme a clear planning context.",
        body: "Use the example rundown to discuss segment lengths and handoffs alongside the wider project schedule.",
        points: ["Programme brief", "Segment sequence", "Schedule context"],
      },
      {
        label: "Resources & cost",
        title: "Bring the supporting work into the picture.",
        body: "Explore existing project budgets and asset records when discussing the resources behind a production.",
        points: [
          "Project budget context",
          "Equipment records",
          "Team and resource discussion",
        ],
      },
      {
        label: "Commercial handoff",
        title: "Keep the business record close to the programme.",
        body: "Explore the invoice presentation for commercial questions around your operation. No advertising inventory, rights or billing integration is implied by this page.",
        points: [
          "Commercial context",
          "Document presentation",
          "Review and follow-up",
        ],
      },
    ],
    tools: [
      {
        title: "Project schedule",
        body: "Explore the existing project-schedule presentation for planning context.",
        href: "/apps/project-accounting/schedule",
      },
      {
        title: "Project budgets",
        body: "Inspect project budgeting as a production-cost discussion starting point.",
        href: "/apps/project-accounting/budgets",
      },
      {
        title: "Equipment records",
        body: "Explore the existing fixed-asset register presentation.",
        href: "/apps/accounting/fixed-asset-register",
      },
      {
        title: "Commercial invoices",
        body: "Look at the invoice showcase for the commercial handoff.",
        href: "/apps/accounting/invoices-ar",
      },
    ],
    faqs: [
      [
        "Does this control a broadcast or play media?",
        "No. There is no playout, streaming, signal monitoring, media playback or transmission integration. The rundown is an editable local timing example.",
      ],
      [
        "Are the timings frame-accurate broadcast timecode?",
        "No. The calculator uses whole seconds and a 24-hour clock. It does not model frame rates, timecode standards, transmission rules or a real station schedule.",
      ],
      [
        "Can we discuss our own production process?",
        "Yes. Bring programme planning, project cost, equipment and commercial-record questions to a guided product conversation.",
      ],
    ],
  },
};
export const products = [
  {
    id: "EX-NOTE",
    name: "Everyday notebook",
    category: "Stationery",
    price: 350,
    art: "notebook",
  },
  {
    id: "EX-MUG",
    name: "Desk mug",
    category: "Everyday objects",
    price: 650,
    art: "mug",
  },
  {
    id: "EX-TOTE",
    name: "Canvas tote",
    category: "Carry essentials",
    price: 950,
    art: "tote",
  },
] as const;
export const initialBasket: Record<string, number> = {
  "EX-NOTE": 1,
  "EX-MUG": 1,
};
export const programmeLines = [
  { id: "programme-a", label: "Example programme A", amount: 35000 },
  { id: "programme-b", label: "Example programme B", amount: 45000 },
  { id: "shared", label: "Shared operations · example", amount: 20000 },
];
export const segments = [
  { id: "EX-01", title: "Opening", duration: "02:00" },
  { id: "EX-02", title: "News segment", duration: "09:00" },
  { id: "EX-03", title: "Feature", duration: "08:00" },
  { id: "EX-04", title: "Example break", duration: "03:00" },
  { id: "EX-05", title: "Closing", duration: "02:00" },
];
export const money = (value: number) =>
  `BDT ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

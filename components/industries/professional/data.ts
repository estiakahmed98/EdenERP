export const professionalSlugs = [
  "real-estate-agency",
  "architecture-firm",
  "construction",
  "accounting-firm",
  "marketing-agency",
  "talent-acquisition",
  "audit-certification",
  "travel-agency",
] as const;
export type ProfessionalSlug = (typeof professionalSlugs)[number];
type Content = {
  title: string;
  group: "realestate" | "consulting";
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  steps: [string, string][];
  tools: { title: string; href: string; body: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const invoices = tool(
  "Customer invoices",
  "/apps/accounting/invoices-ar",
  "Explore the existing billing and receivables presentation.",
);
const clients = tool(
  "Customer records",
  "/apps/accounting/customers",
  "Look at the customer-record presentation.",
);
const projects = tool(
  "Projects",
  "/apps/project-accounting/projects",
  "Explore project identity, context and related records.",
);
const documents = tool(
  "Project documents",
  "/apps/project-accounting/documents",
  "Look at the existing project-document presentation.",
);
export const pages: Record<ProfessionalSlug, Content> = {
  "real-estate-agency": {
    title: "Real Estate Agency",
    group: "realestate",
    eyebrow: "THE PROPERTY AND THE CONVERSATION",
    headline: "Every address has a story.",
    accent: "Keep the whole picture close.",
    description:
      "Bring property detail, buyer conversations and the records behind each handoff into one considered view. A fresh perspective on the business behind the address.",
    demoTitle: "Explore a fictional property portfolio.",
    demoDescription:
      "Choose a property type and enter a price limit to filter three illustrative records. These are not real listings or availability promises.",
    steps: [
      ["The property", "Keep type, area and the item’s identity together."],
      [
        "The conversation",
        "Connect the property detail with the buyer’s questions.",
      ],
      [
        "The handoff",
        "Review existing booking, unit and customer presentations.",
      ],
    ],
    tools: [
      tool(
        "Properties",
        "/apps/real-estate/properties",
        "Explore the existing property presentation.",
      ),
      tool(
        "Units",
        "/apps/real-estate/units",
        "Look at individual unit records and their context.",
      ),
      tool(
        "Booking records",
        "/apps/real-estate/bookings",
        "Explore the product presentation for booking records.",
      ),
      clients,
    ],
    faqs: [
      [
        "Are these actual properties?",
        "No. All names, areas, identifiers and prices are fictional. The example does not show live availability or make an offer.",
      ],
      [
        "What does the price limit do?",
        "It filters the illustrative listed amounts only, together with the chosen property type. It is not an affordability assessment or investment recommendation.",
      ],
      [
        "Will selecting a property create a booking?",
        "No. This portfolio is an exploratory local example. Discuss your actual property and buyer workflow with an advisor.",
      ],
    ],
  },
  "architecture-firm": {
    title: "Architecture Firm",
    group: "realestate",
    eyebrow: "DESIGN INTENT. PROJECT CONTEXT.",
    headline: "Space for better ideas.",
    accent: "Structure for the work behind them.",
    description:
      "Give the brief, the design phases and the effort behind the drawings a clear place. A composed operational perspective for the architecture practice.",
    demoTitle: "Explore a small phase-effort estimate.",
    demoDescription:
      "Enter whole hours for three fictional design phases and an hourly fee in BDT. The arithmetic stays local and does not save a quotation.",
    steps: [
      [
        "The brief",
        "Give the scope and project identity a clear starting point.",
      ],
      ["The phases", "Keep the effort assumptions visible by design phase."],
      [
        "The record",
        "Explore project, schedule, document and billing presentations.",
      ],
    ],
    tools: [
      projects,
      tool(
        "Project schedule",
        "/apps/project-accounting/schedule",
        "Explore the scheduling presentation.",
      ),
      documents,
      invoices,
    ],
    faqs: [
      [
        "Is the drawing a scale plan?",
        "No. It is a conceptual illustration, separate from any technical drawing or building specification.",
      ],
      [
        "Are the hours and fee recommended rates?",
        "No. They are editable fictional assumptions. The example multiplies whole hours by the entered hourly fee, rounded to cents.",
      ],
      [
        "Does this generate a proposal?",
        "No. It calculates a local amount only, without scope approval, taxes or a saved quotation.",
      ],
    ],
  },
  construction: {
    title: "Construction",
    group: "realestate",
    eyebrow: "THE WORK ON SITE. THE DETAIL IN THE RECORD.",
    headline: "Build with a clearer picture.",
    accent: "From the site to the cost line.",
    description:
      "Bring work items, quantities and project-cost conversations closer together. A precise, modern perspective on the records behind progress on site.",
    demoTitle: "Read the numbers behind a small work plan.",
    demoDescription:
      "Adjust fictional whole-unit quantities, rates and a budget. This is arithmetic for discussion, not an engineering estimate or procurement instruction.",
    steps: [
      [
        "The work item",
        "Keep quantity, unit and the item description distinct.",
      ],
      [
        "The cost line",
        "Calculate entered quantities and rates transparently.",
      ],
      [
        "The project view",
        "Explore existing BOQ, budget and job-cost presentations.",
      ],
    ],
    tools: [
      tool(
        "Bill of quantities",
        "/apps/project-accounting/boq",
        "Look at the existing BOQ presentation.",
      ),
      tool(
        "Project budgets",
        "/apps/project-accounting/budgets",
        "Explore the project-budget presentation.",
      ),
      tool(
        "Job cost",
        "/apps/project-accounting/job-cost",
        "Review the project-cost presentation.",
      ),
      projects,
    ],
    faqs: [
      [
        "Can this be used as a construction estimate?",
        "The example is fictional arithmetic only. It does not evaluate specifications, productivity, wastage, site conditions or engineering requirements.",
      ],
      [
        "What does the budget difference mean?",
        "It compares the entered budget with the sum of the displayed line amounts. It does not represent approved spending or actual project performance.",
      ],
      [
        "Does changing a line order materials?",
        "No. The example creates no purchase, stock movement, contract or project record.",
      ],
    ],
  },
  "accounting-firm": {
    title: "Accounting Firm",
    group: "consulting",
    eyebrow: "A CONSIDERED VIEW OF CLIENT WORK",
    headline: "Clear records.",
    accent: "A calmer client review.",
    description:
      "Give the work behind the numbers a readable path. Bring client context, review tasks and the next handoff into a composed practice-management conversation.",
    demoTitle: "Work through a small review checklist.",
    demoDescription:
      "Manually mark four fictional engagement tasks. The progress reflects only your selections, not an automated accounting or compliance review.",
    steps: [
      ["The engagement", "Start with client and period context."],
      ["The review", "Keep manually tracked tasks and open questions visible."],
      [
        "The handoff",
        "Explore the accounting records that support the conversation.",
      ],
    ],
    tools: [
      tool(
        "Accounting hub",
        "/apps/accounting/accounting-hub",
        "Explore the accounting overview presentation.",
      ),
      tool(
        "Ledgers",
        "/apps/accounting/ledgers",
        "Look at the ledger presentation.",
      ),
      tool(
        "Bank reconciliation",
        "/apps/accounting/bank-reconciliation",
        "Explore the bank-reconciliation presentation.",
      ),
      tool(
        "Financial reports",
        "/apps/accounting/financial-reports",
        "Review the reporting presentation.",
      ),
    ],
    faqs: [
      [
        "Does marking a task review real accounts?",
        "No. These are manually selected local example tasks. No ledger, document or accounting result is inspected.",
      ],
      [
        "Does 100% mean the engagement is complete?",
        "It means all four example checkboxes are selected. It is not a professional review conclusion or a compliance decision.",
      ],
      [
        "Are any client records saved?",
        "No. The engagement identifier and tasks are fictional, and changes stay in this page’s local state.",
      ],
    ],
  },
  "marketing-agency": {
    title: "Marketing Agency",
    group: "consulting",
    eyebrow: "CREATIVE THINKING. VISIBLE ASSUMPTIONS.",
    headline: "Big ideas need room.",
    accent: "Good work needs a clear plan.",
    description:
      "Bring the campaign brief, channel amounts and client conversation into a creative workspace with a considered operational foundation.",
    demoTitle: "Give a campaign budget a clear shape.",
    demoDescription:
      "Edit three fictional channel amounts and compare their total with an entered budget. The chart shows allocation only, with no performance prediction.",
    steps: [
      ["The brief", "Keep the client and campaign context close to the work."],
      [
        "The allocation",
        "Make entered channel amounts and the remaining budget visible.",
      ],
      ["The delivery", "Explore project, customer and invoice presentations."],
    ],
    tools: [
      projects,
      clients,
      tool(
        "Budget lines",
        "/apps/budget-management/lines",
        "Explore the existing budget-line presentation.",
      ),
      invoices,
    ],
    faqs: [
      [
        "Does the chart predict campaign results?",
        "No. It visualises entered amounts only, without impressions, conversions, ROI or performance forecasts.",
      ],
      [
        "What happens if allocations exceed the budget?",
        "The example displays the amount over budget. It does not approve or place any advertising spend.",
      ],
      [
        "Does changing a channel connect to an ad platform?",
        "No. All values are fictional and local. There is no advertising-platform integration or payment.",
      ],
    ],
  },
  "talent-acquisition": {
    title: "Talent Acquisition",
    group: "consulting",
    eyebrow: "A CLEARER PATH THROUGH RECRUITMENT",
    headline: "Make room for the next step.",
    accent: "Keep the candidate journey clear.",
    description:
      "Bring role context, candidate identifiers and explicit recruitment stages into a thoughtful, readable process. A human-centred perspective on the work behind hiring.",
    demoTitle: "Explore an anonymous candidate journey.",
    demoDescription:
      "Change the stages of three fictional candidate IDs. This is local workflow tracking, with no ranking, assessment or hiring recommendation.",
    steps: [
      ["The role", "Keep the role and candidate identity in context."],
      [
        "The conversation",
        "Record an explicit stage rather than an inferred assessment.",
      ],
      [
        "The next step",
        "Explore the existing recruitment and activity presentations.",
      ],
    ],
    tools: [
      tool(
        "Recruitment",
        "/apps/human-resources/recruitment",
        "Explore the existing recruitment presentation.",
      ),
      tool(
        "Activity tasks",
        "/apps/sales/crm/activities/tasks",
        "Look at the task and follow-up presentation.",
      ),
      clients,
      invoices,
    ],
    faqs: [
      [
        "Are these real applicants?",
        "No. Only fictional anonymous identifiers and role labels are shown. No personal applicant information is used.",
      ],
      [
        "Does moving a stage evaluate a person?",
        "No. Stages change only when you select them; there is no scoring, ranking, suitability inference or hiring recommendation.",
      ],
      [
        "Are candidates contacted or saved?",
        "No. Changes remain local and do not contact anyone or update a recruitment database.",
      ],
    ],
  },
  "audit-certification": {
    title: "Audit & Certification",
    group: "consulting",
    eyebrow: "EVIDENCE WITH ITS CONTEXT INTACT",
    headline: "A clearer trail of evidence.",
    accent: "A more considered review.",
    description:
      "Bring document identity, review state and follow-up context into a focused evidence conversation. Let the record tell a readable story, one item at a time.",
    demoTitle: "Explore a small evidence review list.",
    demoDescription:
      "Set fictional documents to missing, provided or reviewed, then filter the list. States are manually selected examples, not a compliance or certification result.",
    steps: [
      ["The evidence", "Keep each document’s identity and context visible."],
      [
        "The review state",
        "Distinguish provided material from a manually reviewed item.",
      ],
      [
        "The follow-up",
        "Explore existing document and quality-action presentations.",
      ],
    ],
    tools: [
      documents,
      tool(
        "Quality dashboard",
        "/apps/quality/quality-dashboard",
        "Explore the existing quality overview.",
      ),
      tool(
        "Non-conformance",
        "/apps/quality/non-conformance",
        "Look at the non-conformance presentation.",
      ),
      tool(
        "CAPA",
        "/apps/quality/capa",
        "Explore corrective and preventive action records.",
      ),
    ],
    faqs: [
      [
        "Does Reviewed mean certified or compliant?",
        "No. It is a manually selected state in a fictional list. The example evaluates no standard and issues no certificate.",
      ],
      [
        "Can I upload real evidence here?",
        "This example has no upload or document-analysis feature. Discuss actual evidence handling with an advisor.",
      ],
      [
        "Does changing a state update quality records?",
        "No. The local list is separate from the linked quality presentations and does not create findings or actions.",
      ],
    ],
  },
  "travel-agency": {
    title: "Travel Agency",
    group: "consulting",
    eyebrow: "THE JOURNEY AND THE DETAILS BEHIND IT",
    headline: "A journey worth planning.",
    accent: "The details, beautifully in view.",
    description:
      "Bring travellers, stay assumptions and service amounts into one considered travel conversation. A clear itinerary begins with a clear view of the details.",
    demoTitle: "Put together an illustrative trip estimate.",
    demoDescription:
      "Enter travellers, fares, room nights and a transfer amount. Calculate a local BDT estimate, without checking availability or making a booking.",
    steps: [
      ["The journey", "Keep traveller count and the trip brief clear."],
      [
        "The assumptions",
        "Separate per-traveller fares, room nights and transfer charges.",
      ],
      ["The record", "Explore customer, quote and billing presentations."],
    ],
    tools: [
      clients,
      tool(
        "Sales quotations",
        "/apps/sales/crm/orders/quotes",
        "Explore the existing quotation presentation.",
      ),
      invoices,
      tool(
        "Customer receipts",
        "/apps/accounting/receipts",
        "Look at the receipt presentation.",
      ),
    ],
    faqs: [
      [
        "Are these actual fares or room prices?",
        "No. All prices are entered fictional assumptions. No airline, hotel, itinerary availability or live price feed is connected.",
      ],
      [
        "How is the estimate calculated?",
        "Travellers × fare per traveller, plus rooms × nights × nightly room rate, plus a single transfer amount. Taxes, fees and other services are outside this example.",
      ],
      [
        "Does the example book or issue anything?",
        "No. It creates no reservation, ticket, payment, travel document or quotation record.",
      ],
    ],
  },
};
export const groupLabel = (group: "realestate" | "consulting") =>
  group === "realestate" ? "Real Estate" : "Consulting";
export const routeFor = (slug: ProfessionalSlug) =>
  `/industries/${pages[slug].group}/${slug}`;
export const properties = [
  {
    id: "EX-P01",
    name: "Courtyard Apartment",
    type: "Apartment",
    area: 1250,
    price: 12500000,
  },
  {
    id: "EX-P02",
    name: "Studio Office",
    type: "Office",
    area: 850,
    price: 9800000,
  },
  {
    id: "EX-P03",
    name: "Corner Retail Space",
    type: "Shop",
    area: 600,
    price: 16000000,
  },
] as const;
export const phases = [
  { name: "Concept study", hours: 12 },
  { name: "Design development", hours: 20 },
  { name: "Documentation", hours: 8 },
] as const;
export const workItems = [
  { name: "Concrete work", unit: "m³", quantity: 12, rate: 8500 },
  { name: "Masonry work", unit: "m²", quantity: 80, rate: 950 },
  { name: "Finish work", unit: "m²", quantity: 60, rate: 1200 },
] as const;
export const reviewTasks = [
  "Example documents received",
  "Ledger questions noted",
  "Reconciliation review noted",
  "Client handoff prepared",
];
export const channels = [
  { name: "Search", amount: 120000 },
  { name: "Social", amount: 105000 },
  { name: "Creative", amount: 75000 },
] as const;
export const candidateStages = ["applied", "interview", "shortlist"] as const;
export type CandidateStage = (typeof candidateStages)[number];
export const candidateLabels: Record<CandidateStage, string> = {
  applied: "Applied",
  interview: "Interview",
  shortlist: "Shortlisted",
};
export const candidates: { id: string; role: string; stage: CandidateStage }[] =
  [
    { id: "EX-C01", role: "Role brief A", stage: "applied" },
    { id: "EX-C02", role: "Role brief A", stage: "interview" },
    { id: "EX-C03", role: "Role brief B", stage: "shortlist" },
  ];
export const evidenceStates = ["missing", "provided", "reviewed"] as const;
export type EvidenceState = (typeof evidenceStates)[number];
export const evidenceLabels: Record<EvidenceState, string> = {
  missing: "Missing",
  provided: "Provided",
  reviewed: "Reviewed",
};
export const evidenceRows: {
  id: string;
  name: string;
  state: EvidenceState;
}[] = [
  { id: "EX-E01", name: "Scope note", state: "reviewed" },
  { id: "EX-E02", name: "Process record", state: "provided" },
  { id: "EX-E03", name: "Follow-up note", state: "missing" },
  { id: "EX-E04", name: "Review summary", state: "provided" },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export const qualitySlugs = [
  "quality-dashboard",
  "non-conformance",
  "capa",
  "aql-sampling",
  "spc",
] as const;
export type QualitySlug = (typeof qualitySlugs)[number];
export const qualityCompany = "Alif Steel Mills Ltd";
export const qualityPages: Record<
  QualitySlug,
  { title: string; description: string; steps: [string, string][] }
> = {
  "quality-dashboard": {
    title: "Quality Dashboard",
    description:
      "Bring non-conformance, corrective action and inspection signals into a clear quality overview.",
    steps: [
      [
        "See the signal",
        "Review open cases, severity and inspection indicators.",
      ],
      [
        "Find the context",
        "Connect the snapshot to the supplied case excerpt.",
      ],
      ["Follow the action", "Review corrective and preventive work in CAPA."],
      [
        "Review the outcome",
        "Keep inspection evidence and closure decisions connected.",
      ],
    ],
  },
  "non-conformance": {
    title: "Non-Conformance",
    description:
      "Follow a quality exception from detection through containment, disposition and closure.",
    steps: [
      [
        "Record the exception",
        "Identify the problem, source, severity and affected quantity.",
      ],
      [
        "Contain the issue",
        "Review the immediate containment and disposition context.",
      ],
      [
        "Connect the action",
        "Open the relevant corrective or preventive investigation.",
      ],
      [
        "Retain the evidence",
        "Review the outcome before a case is considered complete.",
      ],
    ],
  },
  capa: {
    title: "CAPA",
    description:
      "Turn a quality finding into a clear action plan, verified evidence and an effective resolution.",
    steps: [
      [
        "Understand the problem",
        "Keep the finding and investigation context together.",
      ],
      [
        "Plan the action",
        "Define corrective or preventive work and its owner.",
      ],
      [
        "Verify effectiveness",
        "Review completed actions against the intended outcome.",
      ],
      ["Close the loop", "Retain the verification context with the case."],
    ],
  },
  "aql-sampling": {
    title: "AQL Sampling",
    description:
      "Explore acceptance sampling with a transparent plan lookup, sample quantity and accept/reject decision.",
    steps: [
      [
        "Define the lot",
        "Choose a whole-number lot quantity and inspection basis.",
      ],
      [
        "Look up the plan",
        "Use a configured row for the chosen AQL and level.",
      ],
      ["Inspect the sample", "Record the number of defective units found."],
      [
        "Review the decision",
        "Compare the finding with the plan's acceptance and rejection limits.",
      ],
    ],
  },
  spc: {
    title: "SPC",
    description:
      "Explore process variation with Individuals and moving-range charts, specification limits and capability metrics.",
    steps: [
      [
        "Choose the readings",
        "Keep the parameter, units and observation order clear.",
      ],
      [
        "Estimate variation",
        "Calculate moving ranges and the within-process sigma estimate.",
      ],
      [
        "Inspect the signal",
        "Compare observations with control and specification limits.",
      ],
      [
        "Review capability",
        "Interpret Cp and Cpk alongside process stability and the data basis.",
      ],
    ],
  },
};

export const qualitySnapshot = {
  ncTotal: 6,
  ncOpen: 4,
  ncCritical: 1,
  capaTotal: 5,
  capaOpen: 4,
  capaOverdue: 0,
  capaClosed: 1,
  firstPassYield: 92,
  aqlPassRate: null,
  aqlInspections: 0,
  month: "Oct 2026",
  severity: [
    { name: "Minor", count: 1 },
    { name: "Major", count: 4 },
    { name: "Critical", count: 1 },
  ],
  sources: [
    { name: "Inspection", count: 2 },
    { name: "Supplier", count: 2 },
    { name: "Production", count: 2 },
  ],
};
export type Severity = "Minor" | "Major" | "Critical";
export type NcSource = "Inspection" | "Supplier" | "Production";
export type NcRecord = {
  id: string;
  title: string;
  source: NcSource;
  severity: Severity;
  status: "Open" | "CAPA";
  affected: number;
  detected: string;
  provenance: "supplied" | "demo";
};
export const suppliedNcRecords: NcRecord[] = [
  {
    id: "NC-0005",
    title: "Bundle short-weight at dispatch",
    source: "Production",
    severity: "Major",
    status: "CAPA",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0004",
    title: "Corrugation pitch out of tolerance",
    source: "Production",
    severity: "Major",
    status: "Open",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0003",
    title: "Shade variation between two coils of one order",
    source: "Supplier",
    severity: "Minor",
    status: "Open",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0002",
    title: "White rust on incoming GI coil",
    source: "Inspection",
    severity: "Major",
    status: "CAPA",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
];
export type CapaRecord = {
  id: string;
  problem: string;
  type: "Corrective" | "Preventive";
  status: "Open";
  owner: string | null;
  due: string | null;
  provenance: "supplied" | "demo";
};
export const suppliedCapaRecords: CapaRecord[] = [
  {
    id: "CAPA-0006",
    problem: "Paint peel on T-bend after 3T",
    type: "Corrective",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0005",
    problem: "Bundle short-weight at dispatch",
    type: "Preventive",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0004",
    problem: "Corrugation pitch out of tolerance",
    type: "Preventive",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0002",
    problem: "White rust on incoming GI coil",
    type: "Corrective",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
];

export type AqlPlan = {
  min: number;
  max: number;
  code: string;
  sample: number;
  accept: number;
  reject: number;
};
/** Only the fully visible numeric AQL 2.5 / General II excerpt is reproduced. */
export const suppliedAqlPlans: AqlPlan[] = [
  { min: 2, max: 8, code: "A", sample: 2, accept: 0, reject: 1 },
  { min: 9, max: 15, code: "B", sample: 3, accept: 0, reject: 1 },
  { min: 16, max: 25, code: "C", sample: 5, accept: 0, reject: 1 },
  { min: 26, max: 50, code: "D", sample: 8, accept: 0, reject: 1 },
  { min: 51, max: 90, code: "E", sample: 13, accept: 1, reject: 2 },
  { min: 91, max: 150, code: "F", sample: 20, accept: 1, reject: 2 },
  { min: 151, max: 280, code: "G", sample: 32, accept: 2, reject: 3 },
  { min: 281, max: 500, code: "H", sample: 50, accept: 3, reject: 4 },
];

export const suppliedSpcSummary = {
  cp: 0.621,
  cpk: 0.578,
  mean: 23.3958,
  sigma: 0.8053,
  analyzed: 100,
  available: 351,
  outOfControl: 3,
  lsl: 22,
  usl: 25,
  target: 23.5,
  ucl: 25.8117,
  lcl: 20.9799,
  parameter: "Top coat DFT (μm)",
  context: "Colour Coil — Final (per coil)",
};
/** Deterministic simulation; these are not reconstructed source readings. */
export const simulatedReadings = Array.from({ length: 100 }, (_, i) => {
  if ([36, 72, 91].includes(i)) return 20.35 - (i % 3) * 0.1;
  return Number(
    (
      23.55 +
      Math.sin(i * 1.73) * 0.61 +
      Math.cos(i * 0.49) * 0.42 +
      Math.sin(i * 0.13) * 0.18
    ).toFixed(4),
  );
});

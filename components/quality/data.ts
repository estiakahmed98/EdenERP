import type { TFn } from "@/lib/i18n/t-types";
export const qualitySlugs = [
  "quality-dashboard",
  "non-conformance",
  "capa",
  "aql-sampling",
  "spc",
] as const;
export type QualitySlug = (typeof qualitySlugs)[number];
export const qualityCompany = "Alif Steel Mills Ltd";
export function getQualityPages(
  t: TFn,
): Record<
  QualitySlug,
  { title: string; description: string; steps: [string, string][] }
> {
  return {
    "quality-dashboard": {
      title: t("qualityPages.quality-dashboard.title"),
      description: t("qualityPages.quality-dashboard.description"),
      steps: [
        [
          t("qualityPages.quality-dashboard.steps.0.0"),
          t("qualityPages.quality-dashboard.steps.0.1"),
        ],
        [
          t("qualityPages.quality-dashboard.steps.1.0"),
          t("qualityPages.quality-dashboard.steps.1.1"),
        ],
        [
          t("qualityPages.quality-dashboard.steps.2.0"),
          t("qualityPages.quality-dashboard.steps.2.1"),
        ],
        [
          t("qualityPages.quality-dashboard.steps.3.0"),
          t("qualityPages.quality-dashboard.steps.3.1"),
        ],
      ],
    },
    "non-conformance": {
      title: t("qualityPages.non-conformance.title"),
      description: t("qualityPages.non-conformance.description"),
      steps: [
        [
          t("qualityPages.non-conformance.steps.0.0"),
          t("qualityPages.non-conformance.steps.0.1"),
        ],
        [
          t("qualityPages.non-conformance.steps.1.0"),
          t("qualityPages.non-conformance.steps.1.1"),
        ],
        [
          t("qualityPages.non-conformance.steps.2.0"),
          t("qualityPages.non-conformance.steps.2.1"),
        ],
        [
          t("qualityPages.non-conformance.steps.3.0"),
          t("qualityPages.non-conformance.steps.3.1"),
        ],
      ],
    },
    capa: {
      title: t("qualityPages.capa.title"),
      description: t("qualityPages.capa.description"),
      steps: [
        [t("qualityPages.capa.steps.0.0"), t("qualityPages.capa.steps.0.1")],
        [t("qualityPages.capa.steps.1.0"), t("qualityPages.capa.steps.1.1")],
        [t("qualityPages.capa.steps.2.0"), t("qualityPages.capa.steps.2.1")],
        [t("qualityPages.capa.steps.3.0"), t("qualityPages.capa.steps.3.1")],
      ],
    },
    "aql-sampling": {
      title: t("qualityPages.aql-sampling.title"),
      description: t("qualityPages.aql-sampling.description"),
      steps: [
        [
          t("qualityPages.aql-sampling.steps.0.0"),
          t("qualityPages.aql-sampling.steps.0.1"),
        ],
        [
          t("qualityPages.aql-sampling.steps.1.0"),
          t("qualityPages.aql-sampling.steps.1.1"),
        ],
        [
          t("qualityPages.aql-sampling.steps.2.0"),
          t("qualityPages.aql-sampling.steps.2.1"),
        ],
        [
          t("qualityPages.aql-sampling.steps.3.0"),
          t("qualityPages.aql-sampling.steps.3.1"),
        ],
      ],
    },
    spc: {
      title: t("qualityPages.spc.title"),
      description: t("qualityPages.spc.description"),
      steps: [
        [t("qualityPages.spc.steps.0.0"), t("qualityPages.spc.steps.0.1")],
        [t("qualityPages.spc.steps.1.0"), t("qualityPages.spc.steps.1.1")],
        [t("qualityPages.spc.steps.2.0"), t("qualityPages.spc.steps.2.1")],
        [t("qualityPages.spc.steps.3.0"), t("qualityPages.spc.steps.3.1")],
      ],
    },
  };
}

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
export const suppliedNcRecords: Omit<NcRecord, "title">[] = [
  {
    id: "NC-0005",
    source: "Production",
    severity: "Major",
    status: "CAPA",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0004",
    source: "Production",
    severity: "Major",
    status: "Open",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0003",
    source: "Supplier",
    severity: "Minor",
    status: "Open",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
  {
    id: "NC-0002",
    source: "Inspection",
    severity: "Major",
    status: "CAPA",
    affected: 0,
    detected: "2026-10-19",
    provenance: "supplied",
  },
];
export function getSuppliedNcRecords(t: TFn) {
  return suppliedNcRecords.map((row, index) => ({
    ...row,
    title: t(`suppliedNcRecords.${index}.title`),
  }));
}
export type CapaRecord = {
  id: string;
  problem: string;
  type: "Corrective" | "Preventive";
  status: "Open";
  owner: string | null;
  due: string | null;
  provenance: "supplied" | "demo";
};
export const suppliedCapaRecords: Omit<CapaRecord, "problem">[] = [
  {
    id: "CAPA-0006",
    type: "Corrective",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0005",
    type: "Preventive",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0004",
    type: "Preventive",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
  {
    id: "CAPA-0002",
    type: "Corrective",
    status: "Open",
    owner: null,
    due: null,
    provenance: "supplied",
  },
];
export function getSuppliedCapaRecords(t: TFn) {
  return suppliedCapaRecords.map((row, index) => ({
    ...row,
    problem: t(`suppliedCapaRecords.${index}.problem`),
  }));
}

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
};
export function getSuppliedSpcSummary(t: TFn) {
  return {
    ...suppliedSpcSummary,
    parameter: t("suppliedSpcSummary.parameter"),
    context: t("suppliedSpcSummary.context"),
  };
}
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

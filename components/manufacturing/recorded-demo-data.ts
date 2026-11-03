/** Transcribed from the software screenshots supplied by the user.
 * These are static demo excerpts, not a live ERP connection.
 * Missing values remain null; source totals are not fabricated into extra rows.
 */
export const recordedDemoSlugs = [
  "work-centers",
  "routings",
  "bill-of-materials",
  "capacity-planning",
  "master-schedule-mps",
  "production-orders",
  "batches-lots",
] as const;
export type RecordedDemoSlug = (typeof recordedDemoSlugs)[number];
export function isRecordedDemoSlug(value: string): value is RecordedDemoSlug {
  return (recordedDemoSlugs as readonly string[]).includes(value);
}

export const demoCompany = "Alif Steel Mills Ltd";
export const demoWeeks = [
  "W45",
  "W46",
  "W47",
  "W48",
  "W49",
  "W50",
  "W51",
  "W52",
];

export const steelWorkCenters = [
  {
    code: "WC-CCL-PRE",
    name: "Colour Coating Line — entry, cleaning & pre-treatment",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
  {
    code: "WC-CCL-EXIT",
    name: "Colour Coating Line — exit, inspection & recoil",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
  {
    code: "WC-CCL-FIN",
    name: "Colour Coating Line — finish & back coater & oven",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
  {
    code: "WC-CCL-PRIME",
    name: "Colour Coating Line — primer coater & oven",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
  {
    code: "WC-CGL",
    name: "Continuous Galvalume Line (CGL) — furnace & Al–Zn pot",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 3,
  },
  {
    code: "WC-CORR-BD",
    name: "Corrugation — Boro Dew roll former",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
  {
    code: "WC-CORR-CD",
    name: "Corrugation — Cherry Dew roll former",
    type: "Machine",
    capacity: null,
    efficiency: null,
    operations: 0,
  },
  {
    code: "WC-CTL",
    name: "Cut-to-length, stacking & bundling",
    type: "Labor Group",
    capacity: null,
    efficiency: null,
    operations: 1,
  },
];

export const steelRoutings = [
  {
    code: "RT-CCL",
    name: "Colour coating — four-stage CCL (Routes A2 and B)",
    operations: 4,
    boms: 5,
    isDefault: true,
  },
  {
    code: "RT-CORR",
    name: "Corrugation & cut-to-length",
    operations: 2,
    boms: 3,
    isDefault: false,
  },
  {
    code: "RT-CGL",
    name: "Route A1 — Galvalume coating (CGL)",
    operations: 3,
    boms: 2,
    isDefault: false,
  },
];

export const cclOperations = [
  {
    sequence: 10,
    name: "Entry, degrease & pre-treat",
    workCenter: "WC-CCL-PRE",
    setup: 0,
    run: 300,
    teardown: 0,
    qc: false,
  },
  {
    sequence: 20,
    name: "Primer coat 5 μm & cure",
    workCenter: "WC-CCL-PRIME",
    setup: 0,
    run: 310,
    teardown: 0,
    qc: false,
  },
  {
    sequence: 30,
    name: "Top coat 18–20 μm + back coat & cure",
    workCenter: "WC-CCL-FIN",
    setup: 0,
    run: 325,
    teardown: 0,
    qc: false,
  },
  {
    sequence: 40,
    name: "Exit inspection & recoil",
    workCenter: "WC-CCL-EXIT",
    setup: 0,
    run: 290,
    teardown: 0,
    qc: true,
  },
];

export const steelProducts = {
  plain: {
    name: "Alif Plain Colour Sheet 0.40 mm CNG Green",
    code: "PS-040-GRN",
  },
  cherry: {
    name: "Alif Colour Sheet — Cherry Dew profile 0.25 mm Alif Blue",
    code: "CS-CD-025-BLU",
  },
  boro: {
    name: "Alif Colour Sheet — Boro Dew profile 0.30 mm CNG Green",
    code: "CS-BD-030-GRN",
  },
  coilGi: {
    name: "Alif Colour Coil 0.32 mm — CNG Green (on GI Z120)",
    code: "CC-032-GI-GRN",
  },
  coil032: {
    name: "Alif Colour Coil 0.32 mm — Alif Blue (on AZ100)",
    code: "CC-032-BLU",
  },
  coil025: {
    name: "Alif Colour Coil 0.25 mm — Alif Blue (on AZ100)",
    code: "CC-025-BLU",
  },
  coil040: {
    name: "Alif Colour Coil 0.40 mm — CNG Green (on in-house AZ150)",
    code: "CC-040-GRN",
  },
  coil030: {
    name: "Alif Colour Coil 0.30 mm — CNG Green (on in-house AZ150)",
    code: "CC-030-GRN",
  },
  gal040: {
    name: "Alif Galvalume coil AZ150 0.40 mm × 1219 mm",
    code: "SF-GL-040",
  },
  gal030: {
    name: "Alif Galvalume coil AZ150 0.30 mm × 1000 mm",
    code: "SF-GL-030",
  },
} as const;
export type SteelProductKey = keyof typeof steelProducts;

export const steelBoms: {
  code: string;
  product: SteelProductKey;
  type: string;
  output: number;
  yield: number;
  lines: number;
}[] = [
  {
    code: "BOM-CTL-PLAIN",
    product: "plain",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 2,
  },
  {
    code: "BOM-CORR-CD",
    product: "cherry",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 2,
  },
  {
    code: "BOM-CORR-BD",
    product: "boro",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 2,
  },
  {
    code: "BOM-CCL-032-GI",
    product: "coilGi",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 6,
  },
  {
    code: "BOM-CCL-032-BLU",
    product: "coil032",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 6,
  },
  {
    code: "BOM-CCL-025-BLU",
    product: "coil025",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 6,
  },
  {
    code: "BOM-CCL-040-GRN",
    product: "coil040",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 6,
  },
  {
    code: "BOM-CCL-030-GRN",
    product: "coil030",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 6,
  },
  {
    code: "BOM-CGL-040",
    product: "gal040",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 3,
  },
  {
    code: "BOM-CGL-030",
    product: "gal030",
    type: "Standard",
    output: 1000,
    yield: 98,
    lines: 3,
  },
];
export const plainSheetBom = {
  code: "BOM-CTL-PLAIN",
  output: 1000,
  yield: 98,
  estimatedCost: 143858,
  inputQuantity: 1006,
  scrapQuantity: 6,
  scrapCostShare: 1,
};

export const capacitySnapshot = {
  workCenters: 8,
  overloaded: 0,
  undatedOrders: 1,
  overrides: 28,
  utilization: 0,
};
export const capacityOverrides = [
  { workCenter: "WC-CCL-FIN", date: "Sep 4, 2026", minutes: 1372 },
  { workCenter: "WC-CCL-EXIT", date: "Sep 7, 2026", minutes: 408 },
  { workCenter: "WC-CORR-BD", date: "Sep 7, 2026", minutes: 530 },
  { workCenter: "WC-CCL-PRE", date: "Sep 9, 2026", minutes: 435 },
  { workCenter: "WC-CCL-PRE", date: "Sep 10, 2026", minutes: 402 },
  { workCenter: "WC-CCL-PRE", date: "Sep 12, 2026", minutes: 412 },
  { workCenter: "WC-CCL-FIN", date: "Sep 16, 2026", minutes: 491 },
  { workCenter: "WC-CCL-FIN", date: "Sep 18, 2026", minutes: 375 },
];
export const mpsProducts: {
  product: SteelProductKey;
  onHand: number;
  reorder: number;
}[] = [
  { product: "coil025", onHand: 47903.06, reorder: 2000 },
  { product: "coil030", onHand: 34935.63, reorder: 2000 },
];

export const steelProductionOrders: {
  id: string;
  product: SteelProductKey;
  bom: string;
  status: "In progress" | "Completed";
  planned: number;
  produced: number;
  start: null;
}[] = [
  {
    id: "MO-2026-000058",
    product: "coil032",
    bom: "BOM-CCL-032-BLU",
    status: "In progress",
    planned: 32000,
    produced: 0,
    start: null,
  },
  {
    id: "MO-2026-000057",
    product: "plain",
    bom: "BOM-CTL-PLAIN",
    status: "Completed",
    planned: 29773.26,
    produced: 29773.26,
    start: null,
  },
  {
    id: "MO-2026-000056",
    product: "cherry",
    bom: "BOM-CORR-CD",
    status: "Completed",
    planned: 32117.58,
    produced: 32117.58,
    start: null,
  },
  {
    id: "MO-2026-000055",
    product: "boro",
    bom: "BOM-CORR-BD",
    status: "Completed",
    planned: 40501.89,
    produced: 40501.89,
    start: null,
  },
  {
    id: "MO-2026-000054",
    product: "coil032",
    bom: "BOM-CCL-032-BLU",
    status: "Completed",
    planned: 59992.1,
    produced: 59992.1,
    start: null,
  },
  {
    id: "MO-2026-000053",
    product: "coil025",
    bom: "BOM-CCL-025-BLU",
    status: "Completed",
    planned: 57922.68,
    produced: 57922.68,
    start: null,
  },
  {
    id: "MO-2026-000052",
    product: "coil040",
    bom: "BOM-CCL-040-GRN",
    status: "Completed",
    planned: 56467.97,
    produced: 56467.97,
    start: null,
  },
  {
    id: "MO-2026-000051",
    product: "coil030",
    bom: "BOM-CCL-030-GRN",
    status: "Completed",
    planned: 59435.02,
    produced: 59435.02,
    start: null,
  },
  {
    id: "MO-2026-000050",
    product: "gal040",
    bom: "BOM-CGL-040",
    status: "Completed",
    planned: 53308.13,
    produced: 53308.13,
    start: null,
  },
];
export const sourceProductionOrderCount = 58;

export const steelBatches: {
  id: string;
  product: SteelProductKey;
  status: string;
  manufactured: string;
  expiry: null;
  quantity: number;
  supplierBatch: null;
}[] = [
  {
    id: "AS-2609-1089",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 3696.26,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1088",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 5775,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1087",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 3766,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1086",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 3644,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1085",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 3495,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1084",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 4515,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1083",
    product: "plain",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 4882,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1082",
    product: "cherry",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 4852.58,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1081",
    product: "cherry",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 4203,
    supplierBatch: null,
  },
  {
    id: "AS-2609-1080",
    product: "cherry",
    status: "Active",
    manufactured: "Sep 17, 2026",
    expiry: null,
    quantity: 5263,
    supplierBatch: null,
  },
];
export const sourceBatchCount = 200;

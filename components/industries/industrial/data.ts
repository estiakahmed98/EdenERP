import { memoT, type TFn } from "@/lib/i18n/t-types";
export const industrialSlugs = ["textile", "metal", "furniture"] as const;
export type IndustrialSlug = (typeof industrialSlugs)[number];
type Content = {
  title: string;
  category: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  steps: [string, string][];
  tools: { title: string; href: string; body: string }[];
  related: { title: string; href: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const bom = memoT((t: TFn) => (tool(
  t("industrial.data.billOfMaterials"),
  "/apps/manufacturing/bill-of-materials",
  t("industrial.data.exploreComponentAndMaterialRecordsIn"),
)));
const orders = memoT((t: TFn) => (tool(
  t("industrial.data.productionOrders"),
  "/apps/manufacturing/production-orders",
  t("industrial.data.followTheProductionOrderPresentation"),
)));
const routings = memoT((t: TFn) => (tool(
  t("industrial.data.routings"),
  "/apps/manufacturing/routings",
  t("industrial.data.exploreTheSequenceOfOperationsAnd"),
)));
const qc = memoT((t: TFn) => (tool(
  t("industrial.data.qualityControl"),
  "/apps/manufacturing/quality-control",
  t("industrial.data.lookAtTheInspectionAndQuality"),
)));
const manufacturingLinks = memoT((t: TFn) => ([
  { title: t("industrial.data.steel"), href: "/industries/steel" },
  { title: t("industrial.data.agroRice"), href: "/industries/agro-rice" },
]));
export const pages = memoT((t: TFn): Record<IndustrialSlug, Content> => ({
  textile: {
    title: t("industrial.data.textileManufacturing"),
    category: t("industrial.data.garmentsTextile"),
    eyebrow: t("industrial.data.fromTheFirstThreadToThe"),
    headline: t("industrial.data.aFabricOfConnectedDetails"),
    accent: t("industrial.data.aClearerManufacturingStory"),
    description:
      t("industrial.data.bringTheMaterialProcessStageAnd"),
    demoTitle: t("industrial.data.followAnExampleLengthThroughThree"),
    demoDescription:
      t("industrial.data.enterAnIncomingFabricLengthAnd"),
    steps: [
      [
        t("industrial.data.theMaterial"),
        t("industrial.data.keepTheLotIdentityAndUnit"),
      ],
      [
        t("industrial.data.theProcess"),
        t("industrial.data.readEachEnteredStageAssumptionBefore"),
      ],
      [
        t("industrial.data.theRecord"),
        t("industrial.data.exploreTheExistingLotOrderRouting"),
      ],
    ],
    tools: [
      tool(
        t("industrial.data.batchesLots"),
        "/apps/manufacturing/batches-lots",
        t("industrial.data.exploreLotIdentityAndTraceabilityContext"),
      ),
      orders(t),
      routings(t),
      qc(t),
    ],
    related: [
      { title: t("industrial.data.garments"), href: "/industries/garments" },
      { title: t("industrial.data.accessories"), href: "/industries/accessories" },
      { title: t("industrial.data.buyingHouse"), href: "/industries/buying-house" },
      { title: t("industrial.data.merchandising"), href: "/industries/merchandising" },
    ],
    faqs: [
      [
        t("industrial.data.isTheLossPercentageATextile"),
        t("industrial.data.noEveryPercentageIsAnEditable"),
      ],
      [
        t("industrial.data.doesTheExampleConvertYarnInto"),
        t("industrial.data.noItKeepsMetresThroughoutIt"),
      ],
      [
        t("industrial.data.howAreTheStageValuesCalculated"),
        t("industrial.data.eachStageAppliesItsEnteredLoss"),
      ],
    ],
  },
  metal: {
    title: t("industrial.data.metalFabrication"),
    category: t("industrial.data.manufacturing"),
    eyebrow: t("industrial.data.theDetailBehindEveryPiece"),
    headline: t("industrial.data.precisionStartsWithClarity"),
    accent: t("industrial.data.fromTheStockBarToThe"),
    description:
      t("industrial.data.bringStockLengthRequestedPiecesAnd"),
    demoTitle: t("industrial.data.exploreASimpleOneLengthCutting"),
    demoDescription:
      t("industrial.data.enterStockLengthPieceLengthA"),
    steps: [
      [
        t("industrial.data.theStock"),
        t("industrial.data.keepStockLengthAndRequestedPiece"),
      ],
      [t("industrial.data.theAllowance"), t("industrial.data.makeTheAssumedConsumptionPerPiece")],
      [
        t("industrial.data.theHandoff"),
        t("industrial.data.exploreBomRoutingScrapAndProduction"),
      ],
    ],
    tools: [
      bom(t),
      routings(t),
      tool(
        t("industrial.data.scrapWaste"),
        "/apps/manufacturing/scrap-waste",
        t("industrial.data.exploreTheExistingScrapAndWaste"),
      ),
      orders(t),
    ],
    related: [
      ...manufacturingLinks(t),
      {
        title: t("industrial.data.furnitureProduction"),
        href: "/industries/manufacturing/furniture",
      },
      { title: t("industrial.data.textile"), href: "/industries/manufacturing/textile" },
    ],
    faqs: [
      [
        t("industrial.data.isThisAMachineReadyCutting"),
        t("industrial.data.noItIsOneDimensionalArithmetic"),
      ],
      [
        t("industrial.data.whatDoesTheAllowanceRepresent"),
        "An entered whole-millimetre allowance consumed for every piece, including final separation. It is an explicit example assumption, not a recommended kerf or end-trim rule.",
      ],
      [
        t("industrial.data.howAreThePatternsGrouped"),
        "The example shows the count of full-pattern bars and, when necessary, one partial-pattern bar. Remaining length is an arithmetic remainder, not a guaranteed reusable offcut.",
      ],
    ],
  },
  furniture: {
    title: t("industrial.data.furnitureProduction"),
    category: t("industrial.data.manufacturing"),
    eyebrow: t("industrial.data.craftInTheObjectClarityIn"),
    headline: t("industrial.data.thoughtfullyMade"),
    accent: t("industrial.data.clearlyConnectedPartByPart"),
    description:
      t("industrial.data.bringTheDesignComponentCountsAnd"),
    demoTitle: t("industrial.data.readTheComponentsBehindASmall"),
    demoDescription:
      "Enter a fictional order quantity, per-chair component counts and stock. Compare component-only kit coverage, without reserving parts or releasing production.",
    steps: [
      [
        t("industrial.data.theDesign"),
        t("industrial.data.keepTheProductIdentityAndComponent"),
      ],
      [
        t("industrial.data.theParts"),
        t("industrial.data.compareWholePieceRequirementsForEach"),
      ],
      [
        t("industrial.data.theAssembly"),
        t("industrial.data.exploreBomProductionCostingAndQuality"),
      ],
    ],
    tools: [
      bom(t),
      orders(t),
      tool(
        t("industrial.data.productionCosting"),
        "/apps/manufacturing/production-costing",
        t("industrial.data.exploreTheExistingManufacturingCostPrese"),
      ),
      qc(t),
    ],
    related: [
      ...manufacturingLinks(t),
      { title: t("industrial.data.metalFabrication"), href: "/industries/manufacturing/metal" },
      { title: t("industrial.data.furnitureRetail"), href: "/industries/retail/furniture-store" },
    ],
    faqs: [
      [
        t("industrial.data.doesKitCoverageMeanFurnitureIs"),
        t("industrial.data.noTheCountConsidersOnlyThe"),
      ],
      [
        t("industrial.data.whatUnitsDoesTheExampleUse"),
        t("industrial.data.wholePiecesForEachSeparatelyIdentified"),
      ],
      [
        t("industrial.data.doesEditingTheExampleReserveOr"),
        t("industrial.data.noEveryFigureIsFictionalAnd"),
      ],
    ],
  },
}));
export const textileStages = memoT((t: TFn) => ([t("industrial.data.preparation"), t("industrial.data.colourProcess"), t("industrial.data.finishing")]));
export const defaultLosses = [1, 2, 0.5];
export const components = [
  { id: "EX-F01", name: "Leg component", perUnit: 4, stock: 80 },
  { id: "EX-F02", name: "Seat panel", perUnit: 1, stock: 30 },
  { id: "EX-F03", name: "Fastener kit", perUnit: 1, stock: 20 },
] as const;
export const num = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(
    value,
  );
export const routeFor = (slug: IndustrialSlug) =>
  `/industries/manufacturing/${slug}`;

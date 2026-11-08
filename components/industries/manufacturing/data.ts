import { memoT, type TFn } from "@/lib/i18n/t-types";
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
export const pages = memoT((t: TFn): Record<IndustrySlug, Content> => ({
  steel: {
    title: t("manufacturing.data.steel"),
    eyebrow: t("manufacturing.data.adonErpSteelManufacturing"),
    headline: t("manufacturing.data.followTheMetal"),
    accent: t("manufacturing.data.keepTheDetail"),
    description:
      t("manufacturing.data.exploreAConnectedViewOfMaterial"),
    story: t("manufacturing.data.aMaterialSStoryContinuesThrough"),
    demoTitle: t("manufacturing.data.startWithTheWeightFollowThe"),
    demoDescription:
      t("manufacturing.data.changeAnIllustrativeGrossTareWeighment"),
    stages: [
      {
        label: t("manufacturing.data.intake"),
        title: t("manufacturing.data.giveTheIncomingMaterialAClear"),
        body: t("manufacturing.data.bringTheWeighmentMaterialReferenceAnd"),
        details: [
          [t("manufacturing.data.weightContext"), t("manufacturing.data.grossTareAndNet")],
          [t("manufacturing.data.materialContext"), t("manufacturing.data.coilLotReference")],
          [t("manufacturing.data.nextHandoff"), t("manufacturing.data.inventoryAndProduction")],
        ],
      },
      {
        label: t("manufacturing.data.production"),
        title: t("manufacturing.data.readTheWorkInItsManufacturing"),
        body: t("manufacturing.data.exploreProductionOrdersWorkCentresAnd"),
        details: [
          [t("manufacturing.data.orderContext"), t("manufacturing.data.productionOrder")],
          [t("manufacturing.data.processContext"), t("manufacturing.data.routingAndWorkCentre")],
          [t("manufacturing.data.materialContext"), t("manufacturing.data.batchAndStockMovement")],
        ],
      },
      {
        label: t("manufacturing.data.quality"),
        title: t("manufacturing.data.keepInspectionEvidenceCloseToThe"),
        body: t("manufacturing.data.exploreQualityRecordsAlongsideMaterialAn"),
        details: [
          [t("manufacturing.data.recordContext"), t("manufacturing.data.inspectionAndReference")],
          [t("manufacturing.data.traceContext"), t("manufacturing.data.materialAndOrder")],
          [t("manufacturing.data.nextAction"), t("manufacturing.data.reviewAndFollowUp")],
        ],
      },
      {
        label: t("manufacturing.data.dispatch"),
        title: t("manufacturing.data.makeTheFinalHandoffReadable"),
        body: t("manufacturing.data.bringOrderAllocationAvailableWeightAnd"),
        details: [
          [t("manufacturing.data.orderContext"), t("manufacturing.data.allocatedWeight")],
          [t("manufacturing.data.stockContext"), t("manufacturing.data.remainingMaterial")],
          [t("manufacturing.data.nextHandoff"), t("manufacturing.data.movementAndDispatchRecord")],
        ],
      },
    ],
    tools: [
      {
        title: t("manufacturing.data.weighbridgeScales"),
        body: t("manufacturing.data.exploreGrossTareAndNetWeighment"),
        href: "/apps/inventory/weighbridge-scales",
      },
      {
        title: t("manufacturing.data.productionOrders"),
        body: t("manufacturing.data.followTheExistingOrderExecutionShowcase"),
        href: "/apps/manufacturing/production-orders",
      },
      {
        title: t("manufacturing.data.batchesLots"),
        body: t("manufacturing.data.exploreMaterialIdentityAndTheBatch"),
        href: "/apps/manufacturing/batches-lots",
      },
      {
        title: t("manufacturing.data.qualityControl"),
        body: t("manufacturing.data.lookAtTheQualityWorkspaceAnd"),
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        t("manufacturing.data.doesTheWeighmentExampleReadFrom"),
        t("manufacturing.data.noTheWeightsAreEditableExample"),
      ],
      [
        t("manufacturing.data.doesAnAllocationReserveOrCut"),
        t("manufacturing.data.noItComparesTwoExampleOrder"),
      ],
      [
        t("manufacturing.data.canWeUseOurCoilAnd"),
        "Yes. Bring material references, work-centre stages, weight units and order-flow questions to the advisor conversation so the walkthrough can follow your process.",
      ],
    ],
  },
  "agro-rice": {
    title: t("manufacturing.data.agroRice"),
    eyebrow: t("manufacturing.data.adonErpAgroRiceMilling"),
    headline: t("manufacturing.data.fromIncomingPaddy"),
    accent: t("manufacturing.data.toAClearerMillPicture"),
    description:
      t("manufacturing.data.bringIntakeMillingOutputRecordsAnd"),
    story: t("manufacturing.data.keepTheLotInViewAs"),
    demoTitle: t("manufacturing.data.seeTheLotThroughASimple"),
    demoDescription:
      t("manufacturing.data.enterIllustrativePaddyAndOutputWeights"),
    stages: [
      {
        label: t("manufacturing.data.receive"),
        title: t("manufacturing.data.beginWithAReadableIntakeRecord"),
        body: t("manufacturing.data.exploreHowTheSourceLotNet"),
        details: [
          [t("manufacturing.data.lotContext"), t("manufacturing.data.incomingPaddyReference")],
          [t("manufacturing.data.weightContext"), t("manufacturing.data.netIntakeWeight")],
          [t("manufacturing.data.nextHandoff"), t("manufacturing.data.storageAndProcessing")],
        ],
      },
      {
        label: t("manufacturing.data.process"),
        title: t("manufacturing.data.keepTheOutputsAttachedToThe"),
        body: t("manufacturing.data.useTheLocalExampleToDiscuss"),
        details: [
          [t("manufacturing.data.inputContext"), t("manufacturing.data.paddyWeight")],
          [t("manufacturing.data.outputContext"), t("manufacturing.data.riceAndOtherFractions")],
          [t("manufacturing.data.reviewContext"), t("manufacturing.data.recordedVsUnassignedWeight")],
        ],
      },
      {
        label: t("manufacturing.data.review"),
        title: t("manufacturing.data.readTheRecordBeforeDrawingA"),
        body: t("manufacturing.data.bringInspectionAndQuantityEvidenceInto"),
        details: [
          [t("manufacturing.data.qualityContext"), t("manufacturing.data.inspectionRecords")],
          [t("manufacturing.data.quantityContext"), t("manufacturing.data.outputWeights")],
          [t("manufacturing.data.nextAction"), t("manufacturing.data.reviewTheEvidence")],
        ],
      },
      {
        label: t("manufacturing.data.stock"),
        title: t("manufacturing.data.followEachRecordedOutputIntoIts"),
        body: t("manufacturing.data.exploreWarehousesAndStockMovementsWhen"),
        details: [
          [t("manufacturing.data.productContext"), t("manufacturing.data.separateOutputIdentities")],
          [t("manufacturing.data.locationContext"), t("manufacturing.data.warehouseRecords")],
          [t("manufacturing.data.nextHandoff"), t("manufacturing.data.stockMovementsAndPacking")],
        ],
      },
    ],
    tools: [
      {
        title: t("manufacturing.data.weighbridgeScales"),
        body: t("manufacturing.data.exploreTheExistingWeighmentPresentationA"),
        href: "/apps/inventory/weighbridge-scales",
      },
      {
        title: t("manufacturing.data.billOfMaterials"),
        body: t("manufacturing.data.inspectTheManufacturingBomPresentationAn"),
        href: "/apps/manufacturing/bill-of-materials",
      },
      {
        title: t("manufacturing.data.warehouses"),
        body: t("manufacturing.data.exploreLocationRecordsAndTheInventory"),
        href: "/apps/inventory/warehouses",
      },
      {
        title: t("manufacturing.data.stockMovements"),
        body: t("manufacturing.data.followTheExistingMovementShowcaseFor"),
        href: "/apps/inventory/stock-movements",
      },
    ],
    faqs: [
      [
        t("manufacturing.data.areTheExampleOutputPercentagesIndustry"),
        t("manufacturing.data.noEveryWeightAndCalculatedFraction"),
      ],
      [
        t("manufacturing.data.isUnassignedWeightAutomaticallyAProcess"),
        t("manufacturing.data.noItIsOnlyTheArithmetic"),
      ],
      [
        t("manufacturing.data.canWeExploreOurOwnVarieties"),
        t("manufacturing.data.yesBringYourLotIdentitiesInput"),
      ],
    ],
  },
}));
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

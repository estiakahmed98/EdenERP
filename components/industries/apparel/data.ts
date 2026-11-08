import { memoT, type TFn } from "@/lib/i18n/t-types";
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
export const pages = memoT((t: TFn): Record<ApparelSlug, Content> => ({
  garments: {
    title: t("apparel.data.garments"),
    eyebrow: t("apparel.data.adonErpGarmentOperations"),
    headline: t("apparel.data.aStyleBecomesAnOrder"),
    accent: t("apparel.data.keepEveryPieceInContext"),
    description:
      t("apparel.data.exploreTheConnectionBetweenTheSize"),
    story: t("apparel.data.giveTheGarmentOrderAReadable"),
    demoTitle: t("apparel.data.turnASizeRatioIntoA"),
    demoDescription:
      t("apparel.data.adjustAFictionalOrderQuantityAnd"),
    stages: [
      {
        label: t("apparel.data.orderBreakdown"),
        title: t("apparel.data.startWithThePiecesBehindThe"),
        body: t("apparel.data.useTheLocalSizeRatioExercise"),
        points: [t("apparel.data.orderQuantity"), t("apparel.data.sizeRatio"), t("apparel.data.wholePieceAllocation")],
      },
      {
        label: t("apparel.data.productionContext"),
        title: t("apparel.data.followTheWorkBeyondTheBreakdown"),
        body: "Explore the existing line-planning and shop-floor presentations when discussing the order’s manufacturing journey.",
        points: [
          t("apparel.data.linePlanningContext"),
          t("apparel.data.shopFloorActivity"),
          t("apparel.data.orderFollowUp"),
        ],
      },
      {
        label: t("apparel.data.reviewHandoff"),
        title: t("apparel.data.keepQualityAndCostCloseTo"),
        body: t("apparel.data.bringInspectionAndProductionCostQuestion"),
        points: [
          t("apparel.data.inspectionContext"),
          t("apparel.data.productionCostRecords"),
          t("apparel.data.nextOperationalHandoff"),
        ],
      },
    ],
    tools: [
      {
        title: t("apparel.data.linePlanning"),
        body: t("apparel.data.exploreTheExistingProductionLinePlanning"),
        href: "/apps/manufacturing/line-planning-board",
      },
      {
        title: t("apparel.data.shopFloor"),
        body: t("apparel.data.lookAtTheShopFloorShowcase"),
        href: "/apps/manufacturing/shop-floor",
      },
      {
        title: t("apparel.data.productionCosting"),
        body: t("apparel.data.inspectTheManufacturingCostPresentation"),
        href: "/apps/manufacturing/production-costing",
      },
      {
        title: t("apparel.data.qualityControl"),
        body: t("apparel.data.exploreInspectionRecordsAndTheQuality"),
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        t("apparel.data.doesTheRatioExampleMakeA"),
        t("apparel.data.noItAllocatesAnEnteredQuantity"),
      ],
      [
        t("apparel.data.whyCanASizeReceiveOne"),
        t("apparel.data.theExampleUsesProportionalSharesThen"),
      ],
      [
        t("apparel.data.canWeDiscussOurOwnGarment"),
        t("apparel.data.yesBringSizeSetsOrderBreakdowns"),
      ],
    ],
  },
  accessories: {
    title: t("apparel.data.accessories"),
    eyebrow: t("apparel.data.adonErpApparelAccessories"),
    headline: t("apparel.data.smallParts"),
    accent: t("apparel.data.aMuchClearerOrderPicture"),
    description:
      t("apparel.data.bringButtonsZipsLabelsAndPacking"),
    story: t("apparel.data.theDetailsDeserveTheirOwnContext"),
    demoTitle: t("apparel.data.exploreASmallTrimsRequirement"),
    demoDescription:
      t("apparel.data.changeAnIllustrativeOrderQuantityPer"),
    stages: [
      {
        label: t("apparel.data.defineTheDetail"),
        title: t("apparel.data.keepTheItemAndItsUnit"),
        body: t("apparel.data.theLocalExampleUsesWholePiece"),
        points: [t("apparel.data.accessoryIdentity"), t("apparel.data.perGarmentCount"), t("apparel.data.explicitUnit")],
      },
      {
        label: t("apparel.data.readTheRequirement"),
        title: t("apparel.data.separateTheOrderNeedFromThe"),
        body: t("apparel.data.compareTheEnteredQuantityAndPer"),
        points: [
          t("apparel.data.orderPieces"),
          t("apparel.data.enteredAllowance"),
          t("apparel.data.wholePieceRequirement"),
        ],
      },
      {
        label: t("apparel.data.checkTheGap"),
        title: t("apparel.data.seeTheDifferenceBeforeTheNext"),
        body: t("apparel.data.compareTheExampleRequirementWithEntered"),
        points: [t("apparel.data.exampleStock"), t("apparel.data.quantityGap"), t("apparel.data.bomAndInventoryContext")],
      },
    ],
    tools: [
      {
        title: t("apparel.data.itemsProducts"),
        body: t("apparel.data.exploreItemIdentityAndTheExisting"),
        href: "/apps/accounting/items-products",
      },
      {
        title: t("apparel.data.billOfMaterials"),
        body: t("apparel.data.lookAtTheManufacturingBomAnd"),
        href: "/apps/manufacturing/bill-of-materials",
      },
      {
        title: t("apparel.data.stockMovements"),
        body: t("apparel.data.exploreTheReceivingAndIssueRecord"),
        href: "/apps/inventory/stock-movements",
      },
      {
        title: t("apparel.data.qualityContext"),
        body: t("apparel.data.inspectTheQualityWorkspaceForAn"),
        href: "/apps/manufacturing/quality-control",
      },
    ],
    faqs: [
      [
        t("apparel.data.isTheExtraAllowanceARecommended"),
        t("apparel.data.noItIsAnEditableAssumption"),
      ],
      [
        t("apparel.data.whyAreRequirementsRoundedUp"),
        t("apparel.data.allFourExampleItemsUseWhole"),
      ],
      [
        t("apparel.data.doesAShortfallGenerateAPurchase"),
        t("apparel.data.noTheExampleDoesNotRead"),
      ],
    ],
  },
  "buying-house": {
    title: t("apparel.data.buyingHouse"),
    eyebrow: t("apparel.data.adonErpBuyingHouseOperations"),
    headline: t("apparel.data.bringTheBuyer"),
    accent: t("apparel.data.factoryAndDetailTogether"),
    description:
      t("apparel.data.exploreTheCoordinationBehindAnOrder"),
    story: t("apparel.data.aConsideredHandoffBetweenBuyerAnd"),
    demoTitle: t("apparel.data.compareTwoCommercialConversations"),
    demoDescription:
      "Switch between an illustrative margin-trading calculation and a commission-fee calculation. Both stay in USD; no invoice, exchange rate or factory allocation is created.",
    stages: [
      {
        label: t("apparel.data.orderContext"),
        title: t("apparel.data.beginWithTheBuyerSOrder"),
        body: "Explore factory and buyer-workspace presentations to frame the order-coordination conversation.",
        points: [t("apparel.data.buyerContext"), t("apparel.data.factoryProfile"), t("apparel.data.orderHandoff")],
      },
      {
        label: t("apparel.data.settlementMode"),
        title: t("apparel.data.keepATradingSaleDistinctFrom"),
        body: t("apparel.data.theLocalExampleTreatsMarginTrading"),
        points: [
          t("apparel.data.tradingRevenueAndPurchaseCost"),
          t("apparel.data.commissionFeeBasis"),
          t("apparel.data.separateCommercialMeaning"),
        ],
      },
      {
        label: t("apparel.data.receiptReview"),
        title: t("apparel.data.followTheEvidenceBehindTheCommercial"),
        body: t("apparel.data.useTheInHouseReceiptAnd"),
        points: [
          t("apparel.data.receiptRecords"),
          t("apparel.data.ownershipContext"),
          t("apparel.data.profitabilityPresentation"),
        ],
      },
    ],
    tools: [
      {
        title: t("apparel.data.factoryProfiles"),
        body: t("apparel.data.exploreFactoryCapacityAndTheExisting"),
        href: "/apps/merchandising/factories",
      },
      {
        title: t("apparel.data.inHouseReceipts"),
        body: t("apparel.data.seeTheExistingReceiptAndOwnership"),
        href: "/apps/merchandising/in-house-receipts",
      },
      {
        title: t("apparel.data.profitability"),
        body: t("apparel.data.inspectTheQuotedVersusActualCommercial"),
        href: "/apps/merchandising/profitability",
      },
      {
        title: t("apparel.data.buyerWorkspaceContext"),
        body: t("apparel.data.exploreTheExplanatoryBuyerRoleAnd"),
        href: "/apps/merchandising/buyer-portal",
      },
    ],
    faqs: [
      [
        t("apparel.data.isTheCommissionAmountANet"),
        t("apparel.data.noItIsTheExampleQuantity"),
      ],
      [
        t("apparel.data.doesTheTradingDifferenceIncludeAll"),
        t("apparel.data.noItComparesEnteredSellingValue"),
      ],
      [
        t("apparel.data.canWeDiscussOurOwnSettlement"),
        t("apparel.data.yesBringBuyerOrderStructuresFactory"),
      ],
    ],
  },
  merchandising: {
    title: t("apparel.data.merchandising"),
    eyebrow: t("apparel.data.adonErpMerchandisingOperations"),
    headline: t("apparel.data.aStyleInMotion"),
    accent: t("apparel.data.aClearerNextAction"),
    description:
      t("apparel.data.exploreStyleDevelopmentMaterialReadiness"),
    story: t("apparel.data.keepTheStyleSDecisionsConnected"),
    demoTitle: t("apparel.data.workBackFromAnExampleCutting"),
    demoDescription:
      "Choose a fictional planned cutting date and calendar-day offsets for four milestones. These are local planning assumptions, not production lead-time standards or a saved TNA plan.",
    stages: [
      {
        label: t("apparel.data.styleDevelopment"),
        title: t("apparel.data.startWithTheSpecificationAndCommercial"),
        body: t("apparel.data.exploreTheExistingStyleAndCosting"),
        points: [t("apparel.data.styleIdentity"), t("apparel.data.sampleContext"), t("apparel.data.costSheetPresentation")],
      },
      {
        label: t("apparel.data.materialsTime"),
        title: t("apparel.data.bringTheMaterialQuestionIntoThe"),
        body: t("apparel.data.useTheMilestoneExerciseToDiscuss"),
        points: [
          t("apparel.data.plannedCuttingDate"),
          t("apparel.data.enteredCalendarDayOffsets"),
          t("apparel.data.materialReadinessContext"),
        ],
      },
      {
        label: t("apparel.data.followTheAction"),
        title: t("apparel.data.keepTheNextHandoffVisible"),
        body: t("apparel.data.exploreTheMerchandisingDashboardAndTna"),
        points: [
          t("apparel.data.milestoneContext"),
          t("apparel.data.responsibilityDiscussion"),
          t("apparel.data.dashboardFollowUp"),
        ],
      },
    ],
    tools: [
      {
        title: t("apparel.data.stylesCosting"),
        body: t("apparel.data.exploreTheExistingStyleSampleAnd"),
        href: "/apps/merchandising/styles-costing",
      },
      {
        title: t("apparel.data.timeAction"),
        body: t("apparel.data.lookAtTheExistingTnaCalendar"),
        href: "/apps/merchandising/tna-calendar",
      },
      {
        title: t("apparel.data.materialBooking"),
        body: t("apparel.data.inspectMaterialLineReadinessInThe"),
        href: "/apps/merchandising/material-booking",
      },
      {
        title: t("apparel.data.merchandisingOverview"),
        body: t("apparel.data.exploreTheWiderSourceDashboardAnd"),
        href: "/apps/merchandising/merchandising-dashboard",
      },
    ],
    faqs: [
      [
        t("apparel.data.areTheDayOffsetsStandardProduction"),
        t("apparel.data.noEachOffsetIsAnEditable"),
      ],
      [
        t("apparel.data.doesChangingADateUpdateA"),
        t("apparel.data.noTheExampleStoresNoTna"),
      ],
      [
        t("apparel.data.canWeUseOurOwnStyle"),
        t("apparel.data.yesBringStyleDevelopmentStagesSample"),
      ],
    ],
  },
}));
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

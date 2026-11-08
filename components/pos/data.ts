import { memoT, type TFn } from "@/lib/i18n/t-types";
export const posSlugs = [
  "register-till",
  "shifts",
  "receipts",
  "day-summary-z",
  "outlet-dashboard",
  "loyalty-vouchers",
  "transfers",
  "stock-lots",
  "outlet-stock",
  "outlets-registers",
] as const;
export type PosSlug = (typeof posSlugs)[number];
export const company = memoT((t: TFn) => (t("data.denimHouseLtd")));
type PageContent = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  lab: string;
  labDescription: string;
  steps: [string, string][];
  related: PosSlug[];
};
export const pages = memoT((t: TFn): Record<PosSlug, PageContent> => ({
  "register-till": {
    title: t("data.registerTill"),
    eyebrow: t("data.theEverydayCheckout"),
    headline: t("data.aGreatSaleStarts"),
    accent: t("data.atTheCounter"),
    description:
      t("data.giveEveryBasketAClearPath"),
    lab: t("data.buildABasket"),
    labDescription:
      t("data.tryProductSearchQuantitiesAndCash"),
    steps: [
      [t("data.findTheItem"), t("data.lookUpASkuOrSearch")],
      [t("data.buildTheBasket"), t("data.reviewQuantitiesAndTheVatInclusive")],
      [t("data.takeTender"), t("data.checkTheAmountReceivedAndChange")],
      [t("data.keepTheTrail"), t("data.connectTheReceiptToItsCashier")],
    ],
    related: ["shifts", "receipts", "outlet-stock"],
  },
  shifts: {
    title: t("data.shifts"),
    eyebrow: t("data.everyDrawerAccountedFor"),
    headline: t("data.openWithConfidence"),
    accent: t("data.closeWithClarity"),
    description:
      t("data.bringTheCashierFloatReceiptsAnd"),
    lab: t("data.reconcileACashDrawer"),
    labDescription:
      t("data.compareALocalCountWithThe"),
    steps: [
      [t("data.openTheDrawer"), t("data.identifyTheCashierRegisterAndOpening")],
      [t("data.tradeThroughTheShift"), t("data.keepReceiptsConnectedToTheirSource")],
      [t("data.countTheCash"), t("data.compareThePhysicalCountWithExpected")],
      [
        t("data.reviewTheDifference"),
        t("data.investigateVarianceBeforeTheAccountingHa"),
      ],
    ],
    related: ["register-till", "day-summary-z", "receipts"],
  },
  receipts: {
    title: t("data.receipts"),
    eyebrow: t("data.theDetailBehindTheSale"),
    headline: t("data.smallReceipt"),
    accent: t("data.completeStory"),
    description:
      t("data.followTheBasketTenderAndTax"),
    lab: t("data.inspectAReceipt"),
    labDescription:
      t("data.noReceiptScreenshotWasSuppliedThis"),
    steps: [
      [t("data.findTheSale"), t("data.searchTheReceiptReferenceOrItem")],
      [t("data.readTheBasket"), t("data.seeTheProductQuantityAndInclusive")],
      [t("data.checkTheTender"), t("data.followThePaymentMethodAndTax")],
      [
        t("data.traceTheContext"),
        t("data.returnToTheRegisterShiftAnd"),
      ],
    ],
    related: ["register-till", "shifts", "day-summary-z"],
  },
  "day-summary-z": {
    title: t("data.daySummaryZ"),
    eyebrow: t("data.theDayBalanced"),
    headline: t("data.everySaleAddsUp"),
    accent: t("data.toAClearerClose"),
    description:
      t("data.turnABusyTradingDayInto"),
    lab: t("data.readTheClose"),
    labDescription:
      t("data.exploreTheSuppliedOneReceiptSummary"),
    steps: [
      [t("data.chooseTheScope"), t("data.reviewTheRelevantShiftOrTrading")],
      [t("data.readTheTotals"), t("data.bringSalesRefundsVatAndDiscounts")],
      [t("data.explainTheMargin"), t("data.separateTaxAndCostFromThe")],
      [t("data.reviewTheDetail"), t("data.checkTenderCategoryAndTopItem")],
    ],
    related: ["shifts", "outlet-dashboard", "receipts"],
  },
  "outlet-dashboard": {
    title: t("data.outletDashboard"),
    eyebrow: t("data.aRetailerSWiderView"),
    headline: t("data.thePulseOfRetail"),
    accent: t("data.inOnePlace"),
    description:
      t("data.seeSalesBasketValueAndMargin"),
    lab: t("data.exploreTheOutletSnapshot"),
    labDescription:
      "Switch between the supplied sales and stock-cover views. The screenshot's 14-day window is historical; no daily series has been invented.",
    steps: [
      [t("data.setTheContext"), t("data.identifyTheOutletAndReportingWindow")],
      [t("data.readTheSignal"), t("data.reviewSalesReceiptsAndAverageBasket")],
      [
        t("data.followTheDrivers"),
        t("data.inspectTheSuppliedProductAndRegister"),
      ],
      [t("data.chooseTheNextView"), t("data.moveIntoStockShiftsOrCheckout")],
    ],
    related: ["outlet-stock", "day-summary-z", "loyalty-vouchers"],
  },
  "loyalty-vouchers": {
    title: t("data.loyaltyVouchers"),
    eyebrow: t("data.aReasonToReturn"),
    headline: t("data.makeTheNextVisit"),
    accent: t("data.partOfThisOne"),
    description:
      t("data.bringLoyaltyBalancesAndGiftVouchers"),
    lab: t("data.exploreARedemption"),
    labDescription:
      t("data.tryAnIllustrativePointsConversionThe"),
    steps: [
      [
        t("data.identifyTheCustomer"),
        t("data.connectTheVisitWithTheRight"),
      ],
      [
        t("data.reviewTheBalance"),
        t("data.keepAvailablePointsDistinctFromVoucher"),
      ],
      [t("data.applyThePolicy"), t("data.useTheConfiguredEarningAndRedemption")],
      [t("data.retainTheEvidence"), t("data.traceTheMovementBackToThe")],
    ],
    related: ["register-till", "outlet-dashboard", "receipts"],
  },
  transfers: {
    title: t("data.transfers"),
    eyebrow: t("data.fromFactoryToShopFloor"),
    headline: t("data.moveTheStock"),
    accent: t("data.keepTheStory"),
    description:
      t("data.seeWhereGoodsLeaveWhereThey"),
    lab: t("data.followATransfer"),
    labDescription:
      t("data.inspectTheTwoSuppliedReceivedTransfers"),
    steps: [
      [
        t("data.prepareTheTransfer"),
        t("data.identifyTheSourceDestinationAndItem"),
      ],
      [t("data.sendTheStock"), t("data.recordWhatLeavesTheSupplyingLocation")],
      [t("data.receiveAgainstDispatch"), t("data.compareWhatArrivesWithWhatWas")],
      [t("data.explainDifferences"), t("data.keepShortagesAndMarkdownsVisible")],
    ],
    related: ["outlet-stock", "outlets-registers", "stock-lots"],
  },
  "stock-lots": {
    title: t("data.stockLots"),
    eyebrow: t("data.onePurchaseManyPossibilities"),
    headline: t("data.openTheBale"),
    accent: t("data.unpackTheValue"),
    description:
      t("data.turnALumpPricePurchaseInto"),
    lab: t("data.exploreCostApportionment"),
    labDescription:
      t("data.useAnIllustrativeTwoLineIntake"),
    steps: [
      [t("data.receiveTheLot"), t("data.identifyTheSupplierAndLumpPurchase")],
      [t("data.sortTheIntake"), t("data.breakTheOpenedLotIntoItem")],
      [t("data.apportionTheCost"), t("data.reviewTheSelectedAllocationBasis")],
      [
        t("data.reviewBeforePosting"),
        t("data.checkThatAllocatedValuesEqualThe"),
      ],
    ],
    related: ["outlet-stock", "transfers", "outlets-registers"],
  },
  "outlet-stock": {
    title: t("data.outletStock"),
    eyebrow: t("data.knowWhatSOnTheShelf"),
    headline: t("data.theRightStock"),
    accent: t("data.aSharperView"),
    description:
      t("data.bringOnHandQuantityCostAnd"),
    lab: t("data.exploreTheStockRoom"),
    labDescription:
      t("data.searchTheSixSuppliedBashundharaCity"),
    steps: [
      [t("data.chooseTheOutlet"), t("data.keepTheStockViewTiedTo")],
      [t("data.findTheItem"), t("data.reviewTheSkuOnHandBalance")],
      [t("data.countTheShelf"), t("data.compareAPhysicalCountWithThe")],
      [t("data.resolveTheVariance"), t("data.reviewDifferencesBeforeAnyAdjustment")],
    ],
    related: ["transfers", "stock-lots", "outlet-dashboard"],
  },
  "outlets-registers": {
    title: t("data.outletsRegisters"),
    eyebrow: t("data.theFoundationsOfRetail"),
    headline: t("data.manyLocations"),
    accent: t("data.oneConnectedCounter"),
    description:
      t("data.giveEveryOutletItsPlaceAnd"),
    lab: t("data.exploreYourRetailNetwork"),
    labDescription:
      t("data.selectASuppliedLocationToInspect"),
    steps: [
      [t("data.defineTheOutlet"), t("data.identifyWhichWarehousesSellOverThe")],
      [t("data.connectARegister"), t("data.associateTheTillWithItsSelling")],
      [t("data.setTheRules"), t("data.configureTaxAndRetailPolicyIn")],
      [t("data.assignTheCashier"), t("data.giveEachOperatorAClearRegister")],
    ],
    related: ["register-till", "outlet-stock", "shifts"],
  },
}));

export const stock = [
  {
    sku: "DH-5343",
    name: "Slim Straight Jean — 10 oz Black",
    qty: 30,
    cost: 1043.59,
    value: 31307.7,
    price: 3110,
    retail: 93300,
  },
  {
    sku: "DH-6026",
    name: "LR Baggy Taper — 12 oz Denim",
    qty: 288,
    cost: 1316.05,
    value: 379022.4,
    price: 3620,
    retail: 1042560,
  },
  {
    sku: "DH-6070",
    name: "Athletic Fit Jean — 12 oz Denim",
    qty: 192,
    cost: 1261.09,
    value: 242129.28,
    price: 3450,
    retail: 662400,
  },
  {
    sku: "DH-7101",
    name: "Three-Quarter Pant — Cotton Twill",
    qty: 80,
    cost: 609.22,
    value: 48737.6,
    price: 2270,
    retail: 181600,
  },
  {
    sku: "LOT-TOP-BLU",
    name: "Ladies’ Top — Blue (assorted sizes)",
    qty: 380,
    cost: 190.45,
    value: 72371,
    price: 690,
    retail: 262200,
  },
  {
    sku: "LOT-TOP-RED",
    name: "Ladies’ Top — Red (assorted sizes)",
    qty: 420,
    cost: 190.45,
    value: 79989,
    price: 690,
    retail: 289800,
  },
];
export const shifts = memoT((t: TFn) => ([
  {
    id: "SHF-2026-000024",
    register: "R1-BSC",
    cashier: "RASEL",
    opened: t("data.oct201230Pm"),
    closed: "—",
    float: 0,
    cash: null,
    receipts: 1,
    status: t("data.open"),
  },
  {
    id: "SHF-2026-000023",
    register: "R1-BSC",
    cashier: "RASEL",
    opened: t("data.oct051220Pm"),
    closed: t("data.oct051221Pm"),
    float: 0,
    cash: 3450,
    receipts: 1,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000022",
    register: "R1-JFP",
    cashier: "RASEL",
    opened: t("data.oct030700Pm"),
    closed: t("data.oct081254Pm"),
    float: 1,
    cash: 7071,
    receipts: 2,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000021",
    register: "R1-JFP",
    cashier: "RASEL",
    opened: t("data.oct030649Pm"),
    closed: t("data.oct030652Pm"),
    float: 1,
    cash: 3111,
    receipts: 1,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000020",
    register: "R1-JFP",
    cashier: t("data.sohelRana"),
    opened: t("data.oct030529Pm"),
    closed: t("data.oct030535Pm"),
    float: 0,
    cash: 10350,
    receipts: 2,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000019",
    register: "R1-BSC",
    cashier: t("data.rinaAkter"),
    opened: t("data.sep260437Pm"),
    closed: t("data.oct030529Pm"),
    float: 0,
    cash: 0,
    receipts: 0,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000018",
    register: "R1-JFP",
    cashier: t("data.rinaAkter"),
    opened: t("data.sep220718Pm"),
    closed: t("data.sep220730Pm"),
    float: 1,
    cash: 2271,
    receipts: 1,
    status: t("data.posted"),
  },
  {
    id: "SHF-2026-000015",
    register: "R1-BSC",
    cashier: t("data.rinaAkter"),
    opened: t("data.sep201000Am"),
    closed: t("data.sep220741Pm"),
    float: 5000,
    cash: 14670,
    receipts: 3,
    status: t("data.posted"),
  },
]));
export const transfers = memoT((t: TFn) => ([
  {
    id: "STR-2026-000002",
    from: "FG",
    to: "OUT2",
    outlet: t("data.jamunaFuturePark"),
    sent: t("data.sep190400Pm"),
    received: t("data.oct030653Pm"),
    lines: 3,
    qty: 27,
    value: 18897.39,
    shortage: null,
    markdown: null,
  },
  {
    id: "STR-2026-000001",
    from: "FG",
    to: "OUT1",
    outlet: t("data.bashundharaCity"),
    sent: t("data.sep110300Pm"),
    received: t("data.sep121030Am"),
    lines: 3,
    qty: 48,
    value: 33487.48,
    shortage: 587.99,
    markdown: 4305.84,
  },
]));
export const locations = memoT((t: TFn) => ([
  {
    code: "CN",
    name: "Spare Parts & Consumables",
    address: t("data.factoryKashimpurGazipur"),
    outlet: false,
    register: null,
  },
  {
    code: "FG",
    name: "Finished Goods Warehouse",
    address: t("data.factoryKashimpurGazipur"),
    outlet: false,
    register: null,
  },
  {
    code: "OUT1",
    name: "Bashundhara City",
    address: t("data.level5BashundharaCityShoppingComplex"),
    outlet: true,
    register: "R1-BSC",
  },
  {
    code: "OUT2",
    name: "Jamuna Future Park",
    address: t("data.level3JamunaFutureParkKuril"),
    outlet: true,
    register: "R1-JFP",
  },
  {
    code: "RM",
    name: "Fabric & Trims Store",
    address: t("data.factoryKashimpurGazipur"),
    outlet: false,
    register: null,
  },
  {
    code: "WIP",
    name: "Sewing Floor (WIP)",
    address: t("data.factoryKashimpurGazipur"),
    outlet: false,
    register: null,
  },
]));
export const saleSummary = {
  gross: 3450,
  vat: 450,
  cost: 1261.09,
  margin: 1738.91,
  receipts: 1,
  items: 1,
  refunds: 0,
  discount: 0,
};
export const money = (value: number) =>
  `৳ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const number = (value: number) => value.toLocaleString("en-US");

import { memoT, type TFn } from "@/lib/i18n/t-types";
export const hospitalitySlugs = [
  "restaurant",
  "fast-food",
  "guest-house",
  "beverage-distributor",
  "hotel",
] as const;
export type HospitalitySlug = (typeof hospitalitySlugs)[number];
export type TicketStage = "queued" | "preparing" | "ready";
export type RoomState = "ready" | "occupied" | "service";
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  story: string;
  stages: { label: string; title: string; body: string; points: string[] }[];
  tools: { title: string; href: string; body: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const restaurantPos = memoT((t: TFn) => (tool(
  t("hospitality.data.restaurantPos"),
  "/apps/sales/pos-restaurant",
  t("hospitality.data.exploreTheExistingDiningAndCheckout"),
)));
const items = memoT((t: TFn) => (tool(
  t("hospitality.data.itemsProducts"),
  "/apps/accounting/items-products",
  t("hospitality.data.lookAtTheItemRecordsBehind"),
)));
const stock = memoT((t: TFn) => (tool(
  t("hospitality.data.stockMovements"),
  "/apps/inventory/stock-movements",
  t("hospitality.data.followTheInventoryMovementPresentation"),
)));
const invoices = memoT((t: TFn) => (tool(
  t("hospitality.data.customerInvoices"),
  "/apps/accounting/invoices-ar",
  t("hospitality.data.exploreCustomerBillingRecordsAndThe"),
)));
const customers = memoT((t: TFn) => (tool(
  t("hospitality.data.customerRecords"),
  "/apps/accounting/customers",
  t("hospitality.data.lookAtTheExistingCustomerRecord"),
)));
const reports = memoT((t: TFn) => (tool(
  t("hospitality.data.financialReports"),
  "/apps/accounting/financial-reports",
  t("hospitality.data.exploreTheReportingPresentationWithAn"),
)));
export const pages = memoT((t: TFn): Record<HospitalitySlug, Content> => ({
  restaurant: {
    title: t("hospitality.data.restaurant"),
    eyebrow: t("hospitality.data.theArtOfAWellRun"),
    headline: t("hospitality.data.aThoughtfulTable"),
    accent: t("hospitality.data.aWellConnectedService"),
    description:
      t("hospitality.data.bringTheDiningRoomTheCounter"),
    demoTitle: t("hospitality.data.findTheRightTableForThe"),
    demoDescription:
      t("hospitality.data.chooseAFictionalTableAndEnter"),
    story: t("hospitality.data.everyServiceHasARhythmGive"),
    stages: [
      {
        label: t("hospitality.data.theDiningRoom"),
        title: t("hospitality.data.startWithTheTableAndThe"),
        body: t("hospitality.data.useTheSeatingExerciseToDiscuss"),
        points: [t("hospitality.data.tableIdentity"), t("hospitality.data.partySize"), t("hospitality.data.seatComparison")],
      },
      {
        label: t("hospitality.data.theOrder"),
        title: t("hospitality.data.carryContextFromTheTableTo"),
        body: t("hospitality.data.exploreTheExistingRestaurantPosPresentat"),
        points: [t("hospitality.data.orderDetail"), t("hospitality.data.serviceHandoff"), t("hospitality.data.checkoutContext")],
      },
      {
        label: t("hospitality.data.theClose"),
        title: t("hospitality.data.keepTheRecordsBehindServiceReadable"),
        body: t("hospitality.data.reviewItemStockAndBillingPresentations"),
        points: [t("hospitality.data.itemRecords"), t("hospitality.data.stockMovements"), t("hospitality.data.billingDetail")],
      },
    ],
    tools: [restaurantPos(t), items(t), stock(t), invoices(t)],
    faqs: [
      [
        t("hospitality.data.doesChoosingATableReserveIt"),
        t("hospitality.data.noTheFloorPlanAndTable"),
      ],
      [
        t("hospitality.data.canTheExampleCombineTables"),
        t("hospitality.data.noItConsidersOneSelectedTable"),
      ],
      [
        t("hospitality.data.whereCanWeDiscussRealRestaurant"),
        t("hospitality.data.useTheSharedAdvisorButtonAnd"),
      ],
    ],
  },
  "fast-food": {
    title: t("hospitality.data.fastFood"),
    eyebrow: t("hospitality.data.aClearerViewOfTheKitchen"),
    headline: t("hospitality.data.theNextOrder"),
    accent: t("hospitality.data.aClearerHandoff"),
    description:
      t("hospitality.data.giveTheRushAReadableRhythm"),
    demoTitle: t("hospitality.data.moveATicketThroughTheKitchen"),
    demoDescription:
      t("hospitality.data.advanceThreeFictionalTicketsFromQueued"),
    story: t("hospitality.data.keepTheHandoffVisibleOneTicket"),
    stages: [
      {
        label: t("hospitality.data.theTicket"),
        title: t("hospitality.data.letTheOrderCarryItsDetail"),
        body: t("hospitality.data.eachExampleTicketHasItsOwn"),
        points: [t("hospitality.data.ticketIdentifier"), t("hospitality.data.itemDetail"), t("hospitality.data.initialStage")],
      },
      {
        label: t("hospitality.data.thePreparation"),
        title: t("hospitality.data.showTheStageWithoutGuessingThe"),
        body: t("hospitality.data.changeStagesExplicitlyInTheExample"),
        points: [t("hospitality.data.queued"), t("hospitality.data.preparing"), t("hospitality.data.ready")],
      },
      {
        label: t("hospitality.data.theHandoff"),
        title: t("hospitality.data.connectTheKitchenConversationToThe"),
        body: t("hospitality.data.exploreTheExistingPosItemAnd"),
        points: [t("hospitality.data.orderContext"), t("hospitality.data.collectionHandoff"), t("hospitality.data.stockRecords")],
      },
    ],
    tools: [
      restaurantPos(t),
      items(t),
      stock(t),
      tool(
        t("hospitality.data.loyaltyVouchers"),
        "/apps/pos/loyalty-vouchers",
        t("hospitality.data.exploreTheExistingCustomerRewardsPresent"),
      ),
    ],
    faqs: [
      [
        t("hospitality.data.isTheBoardConnectedToA"),
        t("hospitality.data.noAllTicketsAndStagesAre"),
      ],
      [
        t("hospitality.data.doesReadyMeanAnOrderWas"),
        t("hospitality.data.noReadyIsOnlyAStage"),
      ],
      [
        t("hospitality.data.canIRestartTheExample"),
        t("hospitality.data.yesResetRestoresTheThreeFictional"),
      ],
    ],
  },
  "guest-house": {
    title: t("hospitality.data.guestHouse"),
    eyebrow: t("hospitality.data.aWarmWelcomeWithTheDetails"),
    headline: t("hospitality.data.aStayToRemember"),
    accent: t("hospitality.data.theDetailThoughtfullyKept"),
    description:
      t("hospitality.data.bringArrivalDatesRoomChoicesAnd"),
    demoTitle: t("hospitality.data.exploreASimpleStayEstimate"),
    demoDescription:
      t("hospitality.data.chooseExampleArrivalAndDepartureDates"),
    story: t("hospitality.data.makeTheStayEasyToFollow"),
    stages: [
      {
        label: t("hospitality.data.theArrival"),
        title: t("hospitality.data.keepTheDatesClearFromThe"),
        body: t("hospitality.data.theLocalExerciseUsesExplicitArrival"),
        points: [t("hospitality.data.arrivalDate"), t("hospitality.data.departureDate"), t("hospitality.data.nightCount")],
      },
      {
        label: t("hospitality.data.theStay"),
        title: t("hospitality.data.makeTheEnteredRateVisible"),
        body: t("hospitality.data.useAnIllustrativeNightlyRateTo"),
        points: [
          t("hospitality.data.enteredNightlyRate"),
          t("hospitality.data.calculatedRoomCharge"),
          t("hospitality.data.visibleAssumptions"),
        ],
      },
      {
        label: t("hospitality.data.theDeparture"),
        title: t("hospitality.data.bringGuestRecordsAndBillingInto"),
        body: t("hospitality.data.exploreExistingCustomerAndAccountingPres"),
        points: [t("hospitality.data.customerContext"), t("hospitality.data.billingRecords"), t("hospitality.data.accountingReview")],
      },
    ],
    tools: [
      customers(t),
      invoices(t),
      tool(
        t("hospitality.data.customerReceipts"),
        "/apps/accounting/receipts",
        t("hospitality.data.exploreRecordedCustomerPaymentsInThe"),
      ),
      reports(t),
    ],
    faqs: [
      [
        t("hospitality.data.willTheseDatesCheckRoomAvailability"),
        t("hospitality.data.noThisIsALocalNights"),
      ],
      [
        t("hospitality.data.whatIsIncludedInTheEstimate"),
        t("hospitality.data.onlyTheNumberOfNightsMultiplied"),
      ],
      [
        t("hospitality.data.canIUseHistoricalDates"),
        t("hospitality.data.yesTheFictionalExerciseAcceptsValid"),
      ],
    ],
  },
  "beverage-distributor": {
    title: t("hospitality.data.beverageDistributor"),
    eyebrow: t("hospitality.data.fromTheDepotToTheNext"),
    headline: t("hospitality.data.keepTheCartonsMoving"),
    accent: t("hospitality.data.keepEveryUnitInView"),
    description:
      t("hospitality.data.bringCartonsUnitCountsAndOutlet"),
    demoTitle: t("hospitality.data.buildASmallCartonLoadExample"),
    demoDescription:
      t("hospitality.data.changeCartonCountsAndUnitsPer"),
    story: t("hospitality.data.followTheQuantityThroughEachHandoff"),
    stages: [
      {
        label: t("hospitality.data.theDepot"),
        title: t("hospitality.data.startWithTheCartonAndIts"),
        body: t("hospitality.data.theExampleKeepsCartonsAndIndividual"),
        points: [t("hospitality.data.itemIdentity"), t("hospitality.data.cartonCount"), t("hospitality.data.unitsPerCarton")],
      },
      {
        label: t("hospitality.data.theLoad"),
        title: t("hospitality.data.readTheTotalsBeforeTheNext"),
        body: t("hospitality.data.compareTotalUnitsWithAnEntered"),
        points: [t("hospitality.data.totalCartons"), t("hospitality.data.individualUnits"), t("hospitality.data.enteredCountLimit")],
      },
      {
        label: t("hospitality.data.theOutlet"),
        title: t("hospitality.data.bringTheStockAndTripRecords"),
        body: t("hospitality.data.exploreTheExistingDistributorStockTrip"),
        points: [t("hospitality.data.distributorStock"), t("hospitality.data.tripContext"), t("hospitality.data.outletHandoff")],
      },
    ],
    tools: [
      tool(
        t("hospitality.data.distributorStock"),
        "/apps/sales/crm/dms/distributor-stock",
        t("hospitality.data.exploreTheExistingDistributorStockPresen"),
      ),
      tool(
        t("hospitality.data.tripRecords"),
        "/apps/sales/crm/van-sales/trips",
        t("hospitality.data.lookAtTheTripAndOutlet"),
      ),
      tool(
        t("hospitality.data.vanStock"),
        "/apps/sales/crm/van-sales/van-stock",
        t("hospitality.data.exploreStockHeldOnAVan"),
      ),
      invoices(t),
    ],
    faqs: [
      [
        t("hospitality.data.doesACountInsideTheLimit"),
        t("hospitality.data.noTheExerciseComparesCountsOnly"),
      ],
      [
        t("hospitality.data.areTheseRealBeverageOrStock"),
        t("hospitality.data.noAllItemIdentifiersCartonCounts"),
      ],
      [
        t("hospitality.data.doesChangingACartonCountCreate"),
        t("hospitality.data.noThereIsNoDispatchRoute"),
      ],
    ],
  },
  hotel: {
    title: t("hospitality.data.hotel"),
    eyebrow: t("hospitality.data.aConsideredViewOfTheWhole"),
    headline: t("hospitality.data.everyRoomHasAStory"),
    accent: t("hospitality.data.seeThePropertyWithClarity"),
    description:
      t("hospitality.data.bringRoomStatusServiceContextAnd"),
    demoTitle: t("hospitality.data.exploreASmallPropertyDaySnapshot"),
    demoDescription:
      t("hospitality.data.changeSixFictionalRoomStatesAnd"),
    story: t("hospitality.data.seeThePropertyThroughAFew"),
    stages: [
      {
        label: t("hospitality.data.theRoomPicture"),
        title: t("hospitality.data.keepTheRoomAndItsState"),
        body: t("hospitality.data.eachFictionalRoomCanBeMarked"),
        points: [t("hospitality.data.roomIdentity"), t("hospitality.data.floorContext"), t("hospitality.data.explicitState")],
      },
      {
        label: t("hospitality.data.theDaySNumbers"),
        title: t("hospitality.data.makeTheArithmeticAssumptionsVisible"),
        body: t("hospitality.data.theExampleComparesOccupiedRoomsWith"),
        points: [t("hospitality.data.roomCounts"), t("hospitality.data.declaredDenominator"), t("hospitality.data.exampleRoomCharges")],
      },
      {
        label: t("hospitality.data.theRecord"),
        title: t("hospitality.data.bringBillingAndReportingQuestionsTo"),
        body: t("hospitality.data.exploreTheExistingAccountingPresentation"),
        points: [t("hospitality.data.customerRecords"), t("hospitality.data.billingContext"), t("hospitality.data.financialReporting")],
      },
    ],
    tools: [
      customers(t),
      invoices(t),
      tool(
        t("hospitality.data.customerReceipts"),
        "/apps/accounting/receipts",
        t("hospitality.data.exploreTheAccountingReceiptPresentation"),
      ),
      reports(t),
    ],
    faqs: [
      [
        t("hospitality.data.doesThisChangeActualRoomInventory"),
        t("hospitality.data.noTheRoomBoardIsFictional"),
      ],
      [
        t("hospitality.data.howIsTheExampleOccupancyPercentage"),
        t("hospitality.data.occupiedRoomsDividedByReadyPlus"),
      ],
      [
        t("hospitality.data.whatDoesTheRoomChargeTotal"),
        t("hospitality.data.itSumsTheDisplayedFictionalDaily"),
      ],
    ],
  },
}));
export const tables = [
  { id: "T01", seats: 2, state: "open" },
  { id: "T02", seats: 4, state: "open" },
  { id: "T03", seats: 6, state: "occupied" },
  { id: "T04", seats: 4, state: "open" },
] as const;
export const ticketStages: TicketStage[] = ["queued", "preparing", "ready"];
export const ticketLabels = memoT((t: TFn): Record<TicketStage, string> => ({
  queued: t("hospitality.data.queued"),
  preparing: t("hospitality.data.preparing"),
  ready: t("hospitality.data.ready"),
}));
export const tickets = memoT((t: TFn): { id: string; items: string[]; stage: TicketStage }[] => ([
  {
    id: "EX-K01",
    items: [t("hospitality.data.n1HouseBurger"), t("hospitality.data.n1PotatoSide")],
    stage: "queued",
  },
  { id: "EX-K02", items: [t("hospitality.data.n2VeggieWraps")], stage: "preparing" },
  { id: "EX-K03", items: [t("hospitality.data.n1Sandwich"), t("hospitality.data.n1Juice")], stage: "ready" },
]));
export const arrivalDate = "2026-12-15",
  departureDate = "2026-12-18";
export const drinks = [
  { id: "EX-D01", name: "Sparkling water", cartons: 12, units: 12 },
  { id: "EX-D02", name: "Fruit juice", cartons: 8, units: 24 },
  { id: "EX-D03", name: "Cold brew", cartons: 6, units: 6 },
] as const;
export const roomStates: RoomState[] = ["ready", "occupied", "service"];
export const roomLabels = memoT((t: TFn): Record<RoomState, string> => ({
  ready: t("hospitality.data.ready"),
  occupied: t("hospitality.data.occupied"),
  service: t("hospitality.data.service"),
}));
export const rooms: {
  id: string;
  floor: string;
  rate: number;
  state: RoomState;
}[] = [
  { id: "101", floor: "01", rate: 4500, state: "occupied" },
  { id: "102", floor: "01", rate: 4500, state: "ready" },
  { id: "103", floor: "01", rate: 5200, state: "service" },
  { id: "201", floor: "02", rate: 6000, state: "occupied" },
  { id: "202", floor: "02", rate: 6000, state: "occupied" },
  { id: "203", floor: "02", rate: 6500, state: "ready" },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (amount: number) =>
  new Intl.NumberFormat("en-US").format(amount);
export const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

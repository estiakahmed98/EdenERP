import { memoT, type TFn } from "@/lib/i18n/t-types";
export const retailSlugs = [
  "book-store",
  "clothing-store",
  "furniture-store",
  "grocery-store",
  "hardware-store",
  "toy-store",
] as const;
export type RetailSlug = (typeof retailSlugs)[number];
type Content = {
  title: string;
  category: string;
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
const pos = memoT((t: TFn) => (tool(
  t("retail.data.pointOfSale"),
  "/apps/pos/register-till",
  t("retail.data.exploreTheRegisterAndCheckoutPresentatio"),
)));
const stock = memoT((t: TFn) => (tool(
  t("retail.data.outletStock"),
  "/apps/pos/outlet-stock",
  t("retail.data.lookAtTheStockAndCount"),
)));
const loyalty = memoT((t: TFn) => (tool(
  t("retail.data.loyaltyVouchers"),
  "/apps/pos/loyalty-vouchers",
  t("retail.data.exploreTheCustomerRewardsPresentation"),
)));
const outlets = memoT((t: TFn) => (tool(
  t("retail.data.outletDashboard"),
  "/apps/pos/outlet-dashboard",
  t("retail.data.followTheOutletReportingPresentation"),
)));
const transfers = memoT((t: TFn) => (tool(
  t("retail.data.stockTransfers"),
  "/apps/pos/transfers",
  t("retail.data.exploreTheWarehouseToOutletHandoff"),
)));
const products = memoT((t: TFn) => (tool(
  t("retail.data.itemsProducts"),
  "/apps/accounting/items-products",
  t("retail.data.lookAtItemRecordsAndCatalogue"),
)));
export const pages = memoT((t: TFn): Record<RetailSlug, Content> => ({
  "book-store": {
    title: t("retail.data.bookStore"),
    category: t("retail.data.forTheBusinessOfBooks"),
    headline: t("retail.data.aGoodStoryStarts"),
    accent: t("retail.data.withAWellRunBookstore"),
    description:
      t("retail.data.bringTheShelfTheReaderAnd"),
    demoTitle: t("retail.data.buildAReaderSBasket"),
    demoDescription:
      t("retail.data.pickFromThreeFictionalTitlesAnd"),
    story: t("retail.data.fromATitleOnTheShelf"),
    stages: [
      {
        label: t("retail.data.theCatalogue"),
        title: t("retail.data.giveEveryTitleAClearPlace"),
        body: t("retail.data.discussHowTitleEditionItemIdentity"),
        points: [t("retail.data.itemIdentity"), t("retail.data.editionContext"), t("retail.data.shelfAndStock")],
      },
      {
        label: t("retail.data.theCounter"),
        title: t("retail.data.keepTheBasketEasyToRead"),
        body: t("retail.data.useTheLocalBookBasketTo"),
        points: [t("retail.data.selectedTitles"), t("retail.data.pieceQuantities"), t("retail.data.clearBasketTotal")],
      },
      {
        label: t("retail.data.theReturnVisit"),
        title: t("retail.data.makeRoomForTheNextChapter"),
        body: t("retail.data.exploreCustomerLoyaltyAndOutletReporting"),
        points: [t("retail.data.customerContext"), t("retail.data.rewardsDiscussion"), t("retail.data.outletReporting")],
      },
    ],
    tools: [pos(t), stock(t), loyalty(t), outlets(t)],
    faqs: [
      [
        t("retail.data.areTheseRealBooksAndPrices"),
        t("retail.data.noTheTitlesIdentifiersStockAnd"),
      ],
      [
        t("retail.data.doesTheExampleIncludeTaxesOr"),
        t("retail.data.noItTotalsTheEnteredBook"),
      ],
      [
        t("retail.data.canWeReviewOurCatalogueAnd"),
        t("retail.data.yesUseTheSharedAdvisorButton"),
      ],
    ],
  },
  "clothing-store": {
    title: t("retail.data.clothingStore"),
    category: t("retail.data.aClearerViewOfYourCollection"),
    headline: t("retail.data.everyColourEverySize"),
    accent: t("retail.data.oneConsideredRetailExperience"),
    description:
      t("retail.data.giveTheCollectionAClearOperational"),
    demoTitle: t("retail.data.findTheDetailBehindAVariant"),
    demoDescription:
      t("retail.data.chooseAFictionalColourAndSize"),
    story: t("retail.data.letTheCollectionSDetailsTravel"),
    stages: [
      {
        label: t("retail.data.theCollection"),
        title: t("retail.data.startWithTheColourAndSize"),
        body: t("retail.data.aGarmentIsMoreThanIts"),
        points: [t("retail.data.styleIdentity"), t("retail.data.colourChoices"), t("retail.data.sizeCombinations")],
      },
      {
        label: t("retail.data.theStockPicture"),
        title: t("retail.data.readTheSpecificVariant"),
        body: t("retail.data.theExampleChecksTheSelectedColour"),
        points: [
          t("retail.data.variantIdentifier"),
          t("retail.data.exampleOnHandPieces"),
          t("retail.data.requestedPieces"),
        ],
      },
      {
        label: t("retail.data.theStoreJourney"),
        title: t("retail.data.connectTheCollectionToTheOutlet"),
        body: t("retail.data.exploreTheExistingOutletAndTransfer"),
        points: [t("retail.data.outletRecords"), t("retail.data.stockHandoffs"), t("retail.data.registerContext")],
      },
    ],
    tools: [products(t), stock(t), transfers(t), pos(t)],
    faqs: [
      [
        t("retail.data.isTheVariantStockConnectedTo"),
        t("retail.data.noAllNineColourSizeCombinations"),
      ],
      [
        t("retail.data.willChoosingAVariantReserveIt"),
        t("retail.data.noTheResultIsAnIllustrative"),
      ],
      [
        t("retail.data.whatHappensWhenARequestExceeds"),
        t("retail.data.theExampleShowsTheShortfallFor"),
      ],
    ],
  },
  "furniture-store": {
    title: t("retail.data.furnitureStore"),
    category: t("retail.data.fromTheShowroomToTheOrder"),
    headline: t("retail.data.aBeautifulRoom"),
    accent: t("retail.data.aClearerOrderBehindIt"),
    description:
      t("retail.data.bringFinishesFurniturePiecesAndDelivery"),
    demoTitle: t("retail.data.composeASmallShowroomSet"),
    demoDescription:
      t("retail.data.selectAFictionalFinishPieceQuantities"),
    story: t("retail.data.keepTheChoicesBehindTheRoom"),
    stages: [
      {
        label: t("retail.data.theArrangement"),
        title: t("retail.data.seeThePiecesAsASet"),
        body: t("retail.data.useTheFurnitureCompositionToDiscuss"),
        points: [t("retail.data.selectedFurniture"), t("retail.data.pieceQuantities"), t("retail.data.roomContext")],
      },
      {
        label: t("retail.data.theFinish"),
        title: t("retail.data.makeTheChosenFinishExplicit"),
        body: t("retail.data.theLocalExampleAppliesADisplayed"),
        points: [
          t("retail.data.finishSelection"),
          t("retail.data.visibleSurcharge"),
          t("retail.data.calculatedPieceValues"),
        ],
      },
      {
        label: t("retail.data.theHandoff"),
        title: t("retail.data.carryDeliveryContextIntoTheConversation"),
        body: t("retail.data.theEnteredDeliveryAmountIsArithmetic"),
        points: [t("retail.data.orderDetail"), t("retail.data.deliveryContext"), t("retail.data.stockHandoff")],
      },
    ],
    tools: [products(t), pos(t), stock(t), transfers(t)],
    faqs: [
      [
        t("retail.data.isThisAnActualFurnitureQuote"),
        t("retail.data.noTheFurnitureFinishesUnitPrices"),
      ],
      [
        t("retail.data.howIsTheFinishSurchargeApplied"),
        t("retail.data.theDisplayedSurchargeIsAddedTo"),
      ],
      [
        t("retail.data.doesTheRoomDrawingCheckFurniture"),
        "No. It is a conceptual top-view illustration, not a scale plan or a room-fit calculation.",
      ],
    ],
  },
  "grocery-store": {
    title: t("retail.data.groceryStore"),
    category: t("retail.data.aFreshPerspectiveOnRetail"),
    headline: t("retail.data.theEverydayShop"),
    accent: t("retail.data.withTheDetailsInView"),
    description:
      t("retail.data.keepTheCounterMovingWhileBringing"),
    demoTitle: t("retail.data.readTheDatesBehindTheShelf"),
    demoDescription:
      t("retail.data.moveAnExampleReferenceDateAnd"),
    story: t("retail.data.makeShelfContextPartOfThe"),
    stages: [
      {
        label: t("retail.data.incomingStock"),
        title: t("retail.data.giveTheBatchItsContext"),
        body: t("retail.data.discussItemReceivedQuantityAndRecorded"),
        points: [t("retail.data.itemAndBatch"), t("retail.data.recordedQuantity"), t("retail.data.recordedDate")],
      },
      {
        label: t("retail.data.dateReview"),
        title: t("retail.data.keepTheReferenceDateVisible"),
        body: t("retail.data.theDateExerciseIdentifiesPastMatching"),
        points: [
          t("retail.data.referenceDate"),
          t("retail.data.calendarDayDifference"),
          t("retail.data.reviewWindowAssumption"),
        ],
      },
      {
        label: t("retail.data.theCounter"),
        title: t("retail.data.connectTheShelfWithTheNext"),
        body: t("retail.data.exploreTheExistingStockAndRegister"),
        points: [
          t("retail.data.shelfAndStoreContext"),
          t("retail.data.registerWorkflow"),
          t("retail.data.outletReporting"),
        ],
      },
    ],
    tools: [stock(t), pos(t), transfers(t), outlets(t)],
    faqs: [
      [
        t("retail.data.doesAFutureDateMeanA"),
        t("retail.data.noThisExampleOnlySubtractsDates"),
      ],
      [
        t("retail.data.areTheseRealBatchRecords"),
        t("retail.data.noAllBatchIdentifiersQuantitiesAnd"),
      ],
      [
        t("retail.data.doesTheReviewWindowChangeInventory"),
        t("retail.data.noItOnlyChangesWhichDate"),
      ],
    ],
  },
  "hardware-store": {
    title: t("retail.data.hardwareStore"),
    category: t("retail.data.precisionAtTheTradeCounter"),
    headline: t("retail.data.fromTheSmallestFixing"),
    accent: t("retail.data.toTheCompleteOrder"),
    description:
      t("retail.data.bringPacksIndividualUnitsAndTrade"),
    demoTitle: t("retail.data.turnAUnitShortageIntoWhole"),
    demoDescription:
      t("retail.data.enterATargetQuantityExampleStock"),
    story: t("retail.data.keepTheUnitClearFromShelf"),
    stages: [
      {
        label: t("retail.data.itemIdentity"),
        title: t("retail.data.startWithTheExactItem"),
        body: t("retail.data.aFixingSItemRecordAnd"),
        points: [
          t("retail.data.itemIdentifier"),
          t("retail.data.recordedSpecification"),
          t("retail.data.unitOfMeasure"),
        ],
      },
      {
        label: t("retail.data.packArithmetic"),
        title: t("retail.data.orderInPacksReadTheResult"),
        body: t("retail.data.theLocalCalculatorRoundsPurchasePacks"),
        points: [t("retail.data.targetUnits"), t("retail.data.unitsAlreadyOnHand"), t("retail.data.wholePacksNeeded")],
      },
      {
        label: t("retail.data.counterHandoff"),
        title: t("retail.data.keepPurchasingAndSellingContextDistinct"),
        body: t("retail.data.exploreTheStockAndRegisterPresentations"),
        points: [t("retail.data.stockContext"), t("retail.data.counterRequest"), t("retail.data.productRecords")],
      },
    ],
    tools: [products(t), stock(t), pos(t), transfers(t)],
    faqs: [
      [
        t("retail.data.doesTheCalculatorOrderStock"),
        t("retail.data.noItCalculatesAPackQuantity"),
      ],
      [
        t("retail.data.whyCanThereBeUnitsLeft"),
        t("retail.data.whenTheShortageIsNotDivisible"),
      ],
      [
        t("retail.data.doesTheDrawingSpecifyACertified"),
        t("retail.data.noItIsAConceptualIllustration"),
      ],
    ],
  },
  "toy-store": {
    title: t("retail.data.toyStore"),
    category: t("retail.data.aLittlePlayALotMore"),
    headline: t("retail.data.makeSpaceForPlay"),
    accent: t("retail.data.keepTheShopInOrder"),
    description:
      t("retail.data.bringAPlayfulCollectionToLife"),
    demoTitle: t("retail.data.putTogetherAGiftBasket"),
    demoDescription:
      t("retail.data.chooseFictionalToysAddOptionalGift"),
    story: t("retail.data.giveTheJoyfulPartAThoughtful"),
    stages: [
      {
        label: t("retail.data.theCollection"),
        title: t("retail.data.letEachItemHaveItsOwn"),
        body: t("retail.data.exploreTheCollectionThroughFictionalProd"),
        points: [
          t("retail.data.productIdentity"),
          t("retail.data.displayedExamplePrice"),
          t("retail.data.selectedPieces"),
        ],
      },
      {
        label: t("retail.data.theGift"),
        title: t("retail.data.makeTheBasketEasyToUnderstand"),
        body: t("retail.data.theGiftExampleAddsTheSelected"),
        points: [t("retail.data.selectedToys"), t("retail.data.optionalWrap"), t("retail.data.budgetDifference")],
      },
      {
        label: t("retail.data.theNextVisit"),
        title: t("retail.data.carryTheConversationBeyondTheGift"),
        body: t("retail.data.exploreLoyaltyCheckoutAndOutletReporting"),
        points: [
          t("retail.data.checkoutContext"),
          t("retail.data.customerRewardsDiscussion"),
          t("retail.data.outletReporting"),
        ],
      },
    ],
    tools: [pos(t), loyalty(t), stock(t), outlets(t)],
    faqs: [
      [
        t("retail.data.areTheseToysAvailableForPurchase"),
        t("retail.data.noTheProductsPricesAndIdentifiers"),
      ],
      [
        t("retail.data.doesThePageRecommendToysFor"),
        t("retail.data.noTheIllustrationsHaveNoAge"),
      ],
      [
        t("retail.data.whatIfTheBasketExceedsThe"),
        t("retail.data.theLocalExampleShowsTheAmount"),
      ],
    ],
  },
}));
export const books = memoT((t: TFn) => ([
  {
    id: "EX-B01",
    name: "The Quiet Atlas",
    detail: t("retail.data.travelEssaysPaperback"),
    price: 450,
    colour: "blue",
  },
  {
    id: "EX-B02",
    name: "Small Garden Notes",
    detail: t("retail.data.natureJournalHardback"),
    price: 680,
    colour: "green",
  },
  {
    id: "EX-B03",
    name: "A City in Lines",
    detail: t("retail.data.illustratedFictionPaperback"),
    price: 520,
    colour: "sand",
  },
] as const));
export const colours = [
  { id: "navy", name: "Navy", hex: "#31527a" },
  { id: "sage", name: "Sage", hex: "#91a990" },
  { id: "cream", name: "Cream", hex: "#ded5c3" },
] as const;
export const clothingSizes = ["S", "M", "L"] as const;
export const variantStock = [
  [8, 12, 5],
  [4, 0, 7],
  [6, 9, 3],
];
export const furniture = [
  { id: "sofa", name: "Studio sofa", price: 28500 },
  { id: "chair", name: "Reading chair", price: 12500 },
  { id: "table", name: "Low table", price: 6800 },
] as const;
export const finishes = [
  { id: "natural", name: "Natural", extra: 0 },
  { id: "oak", name: "Warm oak", extra: 900 },
  { id: "walnut", name: "Walnut", extra: 1500 },
] as const;
export const batches = [
  { id: "EX-G01", name: "Milk carton", quantity: 24, date: "2026-12-14" },
  { id: "EX-G02", name: "Yoghurt cup", quantity: 36, date: "2026-12-16" },
  { id: "EX-G03", name: "Bread loaf", quantity: 18, date: "2026-12-15" },
  { id: "EX-G04", name: "Oat pack", quantity: 42, date: "2027-01-12" },
] as const;
export const referenceDate = "2026-12-15";
export const toys = memoT((t: TFn) => ([
  {
    id: "EX-T01",
    name: "Shape blocks",
    detail: t("retail.data.fictionalWoodenSet"),
    price: 850,
    kind: "blocks",
  },
  {
    id: "EX-T02",
    name: "Little train",
    detail: t("retail.data.fictionalPlayCollection"),
    price: 1250,
    kind: "train",
  },
  {
    id: "EX-T03",
    name: "Pattern puzzle",
    detail: t("retail.data.fictionalPuzzleBox"),
    price: 650,
    kind: "puzzle",
  },
] as const));
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
export const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

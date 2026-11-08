import { memoT, type TFn } from "@/lib/i18n/t-types";
export const otherIndustries = ["ecommerce", "ngo", "tv"] as const;
export type OtherIndustry = (typeof otherIndustries)[number];
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  storyTitle: string;
  stages: { label: string; title: string; body: string; points: string[] }[];
  demoTitle: string;
  demoDescription: string;
  tools: { title: string; body: string; href: string }[];
  faqs: [string, string][];
};
export const pages = memoT((t: TFn): Record<OtherIndustry, Content> => ({
  ecommerce: {
    title: t("others.data.eCommerce"),
    eyebrow: t("others.data.adonErpECommerce"),
    headline: t("others.data.aConsideredStorefront"),
    accent: t("others.data.aClearerOrderJourney"),
    description:
      t("others.data.exploreHowTheProductBasketAnd"),
    storyTitle: t("others.data.giveTheOrderAReadablePath"),
    demoTitle: t("others.data.buildASmallExampleBasket"),
    demoDescription:
      t("others.data.exploreThreeFictionalProductsChangeQuant"),
    stages: [
      {
        label: t("others.data.theCatalogue"),
        title: t("others.data.startWithTheProductInContext"),
        body: t("others.data.bringTheProductIdentityPriceAnd"),
        points: [t("others.data.productIdentity"), t("others.data.priceContext"), t("others.data.inventoryDiscussion")],
      },
      {
        label: t("others.data.theBasket"),
        title: t("others.data.keepTheCalculationEasyToRead"),
        body: t("others.data.useTheLocalBasketToSee"),
        points: [
          t("others.data.selectedProducts"),
          t("others.data.quantityAndSubtotal"),
          t("others.data.exampleOrderTotal"),
        ],
      },
      {
        label: t("others.data.theHandoff"),
        title: t("others.data.followTheCommercialDetailBeyondThe"),
        body: t("others.data.exploreTheExistingInvoiceAndDelivery"),
        points: [
          t("others.data.orderContext"),
          t("others.data.invoicePresentation"),
          t("others.data.deliveryDocumentContext"),
        ],
      },
    ],
    tools: [
      {
        title: t("others.data.eCommercePresentation"),
        body: t("others.data.exploreTheExistingWebsiteCommerceShowcas"),
        href: "/apps/website/ecommerce",
      },
      {
        title: t("others.data.inventoryOverview"),
        body: t("others.data.lookAtTheInventoryPresentationBehind"),
        href: "/apps/inventory/inventory-summary",
      },
      {
        title: t("others.data.customerInvoices"),
        body: t("others.data.exploreTheExistingInvoicePresentationAnd"),
        href: "/apps/accounting/invoices-ar",
      },
      {
        title: t("others.data.deliveryDocuments"),
        body: t("others.data.inspectTheDeliveryChallanShowcaseFor"),
        href: "/apps/accounting/delivery-challans",
      },
    ],
    faqs: [
      [
        t("others.data.canIPlaceAnOrderOr"),
        t("others.data.noTheProductsBasketAndCharges"),
      ],
      [
        t("others.data.doesTheBasketCalculateTax"),
        t("others.data.noTheExampleShowsItemTotals"),
      ],
      [
        t("others.data.canWeDiscussOurOwnProducts"),
        t("others.data.yesBringYourCataloguePriceStructure"),
      ],
    ],
  },
  ngo: {
    title: "NGO",
    eyebrow: t("others.data.adonErpNgoProgrammeOperations"),
    headline: t("others.data.keepThePurpose"),
    accent: t("others.data.bringTheDetailTogether"),
    description:
      t("others.data.exploreTheRelationshipBetweenFundsProgra"),
    storyTitle: t("others.data.makeTheProgrammeContextVisible"),
    demoTitle: t("others.data.exploreAProgrammeBudgetConversation"),
    demoDescription:
      t("others.data.adjustAnIllustrativePlanningBudgetAnd"),
    stages: [
      {
        label: t("others.data.fundContext"),
        title: t("others.data.beginWithTheFundingConversation"),
        body: t("others.data.useTheExistingDonorAndFund"),
        points: [
          t("others.data.fundAndDonorContext"),
          t("others.data.programmePurpose"),
          t("others.data.documentReferences"),
        ],
      },
      {
        label: t("others.data.programmeDetail"),
        title: t("others.data.keepTheActivitiesConnectedToTheir"),
        body: t("others.data.bringProgrammePlanningAndAllocationQuest"),
        points: [
          t("others.data.programmeStructure"),
          t("others.data.planningAmounts"),
          t("others.data.allocationDiscussion"),
        ],
      },
      {
        label: t("others.data.reporting"),
        title: t("others.data.followTheRecordBehindTheReport"),
        body: t("others.data.exploreTheExistingFundReportingAnd"),
        points: [t("others.data.grantContext"), t("others.data.recordReview"), t("others.data.reportingPresentation")],
      },
    ],
    tools: [
      {
        title: t("others.data.donorsFunds"),
        body: t("others.data.exploreDonorAndFundIdentitiesIn"),
        href: "/apps/fund-accounting/donors-funds",
      },
      {
        title: t("others.data.grants"),
        body: t("others.data.lookAtGrantContextAndThe"),
        href: "/apps/fund-accounting/grants",
      },
      {
        title: t("others.data.costAllocation"),
        body: t("others.data.inspectTheExistingAllocationPresentation"),
        href: "/apps/fund-accounting/cost-allocation",
      },
      {
        title: t("others.data.fundReports"),
        body: t("others.data.exploreTheReportingShowcaseAndIts"),
        href: "/apps/fund-accounting/reports",
      },
    ],
    faqs: [
      [
        t("others.data.areTheseActualDonationsOrProgramme"),
        t("others.data.noEveryAmountAndProgrammeLabel"),
      ],
      [
        t("others.data.doesABalancedAllocationApproveExpenditur"),
        t("others.data.noItOnlyMeansTheEntered"),
      ],
      [
        t("others.data.canWeExploreOurFundAnd"),
        t("others.data.yesBringYourProgrammeStructureFund"),
      ],
    ],
  },
  tv: {
    title: "TV",
    eyebrow: t("others.data.adonErpTvMediaOperations"),
    headline: t("others.data.behindEveryProgramme"),
    accent: t("others.data.aClearerOperationalPicture"),
    description:
      t("others.data.exploreThePlanningResourcesAndCommercial"),
    storyTitle: t("others.data.keepTheWorkBehindTheScreen"),
    demoTitle: t("others.data.shapeAnIllustrativeProgrammeRundown"),
    demoDescription:
      t("others.data.editFiveSegmentDurationsChooseA"),
    stages: [
      {
        label: t("others.data.programmePlanning"),
        title: t("others.data.giveTheProgrammeAClearPlanning"),
        body: t("others.data.useTheExampleRundownToDiscuss"),
        points: [t("others.data.programmeBrief"), t("others.data.segmentSequence"), t("others.data.scheduleContext")],
      },
      {
        label: t("others.data.resourcesCost"),
        title: t("others.data.bringTheSupportingWorkIntoThe"),
        body: t("others.data.exploreExistingProjectBudgetsAndAsset"),
        points: [
          t("others.data.projectBudgetContext"),
          t("others.data.equipmentRecords"),
          t("others.data.teamAndResourceDiscussion"),
        ],
      },
      {
        label: t("others.data.commercialHandoff"),
        title: t("others.data.keepTheBusinessRecordCloseTo"),
        body: t("others.data.exploreTheInvoicePresentationForCommerci"),
        points: [
          t("others.data.commercialContext"),
          t("others.data.documentPresentation"),
          t("others.data.reviewAndFollowUp"),
        ],
      },
    ],
    tools: [
      {
        title: t("others.data.projectSchedule"),
        body: t("others.data.exploreTheExistingProjectSchedulePresent"),
        href: "/apps/project-accounting/schedule",
      },
      {
        title: t("others.data.projectBudgets"),
        body: t("others.data.inspectProjectBudgetingAsAProduction"),
        href: "/apps/project-accounting/budgets",
      },
      {
        title: t("others.data.equipmentRecords"),
        body: t("others.data.exploreTheExistingFixedAssetRegister"),
        href: "/apps/accounting/fixed-asset-register",
      },
      {
        title: t("others.data.commercialInvoices"),
        body: t("others.data.lookAtTheInvoiceShowcaseFor"),
        href: "/apps/accounting/invoices-ar",
      },
    ],
    faqs: [
      [
        t("others.data.doesThisControlABroadcastOr"),
        t("others.data.noThereIsNoPlayoutStreaming"),
      ],
      [
        t("others.data.areTheTimingsFrameAccurateBroadcast"),
        t("others.data.noTheCalculatorUsesWholeSeconds"),
      ],
      [
        t("others.data.canWeDiscussOurOwnProduction"),
        t("others.data.yesBringProgrammePlanningProjectCost"),
      ],
    ],
  },
}));
export const products = memoT((t: TFn) => ([
  {
    id: "EX-NOTE",
    name: "Everyday notebook",
    category: t("others.data.stationery"),
    price: 350,
    art: "notebook",
  },
  {
    id: "EX-MUG",
    name: "Desk mug",
    category: t("others.data.everydayObjects"),
    price: 650,
    art: "mug",
  },
  {
    id: "EX-TOTE",
    name: "Canvas tote",
    category: t("others.data.carryEssentials"),
    price: 950,
    art: "tote",
  },
] as const));
export const initialBasket: Record<string, number> = {
  "EX-NOTE": 1,
  "EX-MUG": 1,
};
export const programmeLines = memoT((t: TFn) => ([
  { id: "programme-a", label: t("others.data.exampleProgrammeA"), amount: 35000 },
  { id: "programme-b", label: t("others.data.exampleProgrammeB"), amount: 45000 },
  { id: "shared", label: t("others.data.sharedOperationsExample"), amount: 20000 },
]));
export const segments = memoT((t: TFn) => ([
  { id: "EX-01", title: t("others.data.opening"), duration: "02:00" },
  { id: "EX-02", title: t("others.data.newsSegment"), duration: "09:00" },
  { id: "EX-03", title: t("others.data.feature"), duration: "08:00" },
  { id: "EX-04", title: t("others.data.exampleBreak"), duration: "03:00" },
  { id: "EX-05", title: t("others.data.closing"), duration: "02:00" },
]));
export const money = (value: number) =>
  `BDT ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

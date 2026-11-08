import { memoT, type TFn } from "@/lib/i18n/t-types";
export const professionalSlugs = [
  "real-estate-agency",
  "architecture-firm",
  "construction",
  "accounting-firm",
  "marketing-agency",
  "talent-acquisition",
  "audit-certification",
  "travel-agency",
] as const;
export type ProfessionalSlug = (typeof professionalSlugs)[number];
type Content = {
  title: string;
  group: "realestate" | "consulting";
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  steps: [string, string][];
  tools: { title: string; href: string; body: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const invoices = memoT((t: TFn) => (tool(
  t("professional.data.customerInvoices"),
  "/apps/accounting/invoices-ar",
  t("professional.data.exploreTheExistingBillingAndReceivables"),
)));
const clients = memoT((t: TFn) => (tool(
  t("professional.data.customerRecords"),
  "/apps/accounting/customers",
  t("professional.data.lookAtTheCustomerRecordPresentation"),
)));
const projects = memoT((t: TFn) => (tool(
  t("professional.data.projects"),
  "/apps/project-accounting/projects",
  t("professional.data.exploreProjectIdentityContextAndRelated"),
)));
const documents = memoT((t: TFn) => (tool(
  t("professional.data.projectDocuments"),
  "/apps/project-accounting/documents",
  t("professional.data.lookAtTheExistingProjectDocument"),
)));
export const pages = memoT((t: TFn): Record<ProfessionalSlug, Content> => ({
  "real-estate-agency": {
    title: t("professional.data.realEstateAgency"),
    group: "realestate",
    eyebrow: t("professional.data.thePropertyAndTheConversation"),
    headline: t("professional.data.everyAddressHasAStory"),
    accent: t("professional.data.keepTheWholePictureClose"),
    description:
      t("professional.data.bringPropertyDetailBuyerConversationsAnd"),
    demoTitle: t("professional.data.exploreAFictionalPropertyPortfolio"),
    demoDescription:
      t("professional.data.chooseAPropertyTypeAndEnter"),
    steps: [
      [t("professional.data.theProperty"), t("professional.data.keepTypeAreaAndTheItem")],
      [
        t("professional.data.theConversation"),
        t("professional.data.connectThePropertyDetailWithThe"),
      ],
      [
        t("professional.data.theHandoff"),
        t("professional.data.reviewExistingBookingUnitAndCustomer"),
      ],
    ],
    tools: [
      tool(
        t("professional.data.properties"),
        "/apps/real-estate/properties",
        t("professional.data.exploreTheExistingPropertyPresentation"),
      ),
      tool(
        t("professional.data.units"),
        "/apps/real-estate/units",
        t("professional.data.lookAtIndividualUnitRecordsAnd"),
      ),
      tool(
        t("professional.data.bookingRecords"),
        "/apps/real-estate/bookings",
        t("professional.data.exploreTheProductPresentationForBooking"),
      ),
      clients(t),
    ],
    faqs: [
      [
        t("professional.data.areTheseActualProperties"),
        t("professional.data.noAllNamesAreasIdentifiersAnd"),
      ],
      [
        t("professional.data.whatDoesThePriceLimitDo"),
        t("professional.data.itFiltersTheIllustrativeListedAmounts"),
      ],
      [
        t("professional.data.willSelectingAPropertyCreateA"),
        t("professional.data.noThisPortfolioIsAnExploratory"),
      ],
    ],
  },
  "architecture-firm": {
    title: t("professional.data.architectureFirm"),
    group: "realestate",
    eyebrow: t("professional.data.designIntentProjectContext"),
    headline: t("professional.data.spaceForBetterIdeas"),
    accent: t("professional.data.structureForTheWorkBehindThem"),
    description:
      t("professional.data.giveTheBriefTheDesignPhases"),
    demoTitle: t("professional.data.exploreASmallPhaseEffortEstimate"),
    demoDescription:
      t("professional.data.enterWholeHoursForThreeFictional"),
    steps: [
      [
        t("professional.data.theBrief"),
        t("professional.data.giveTheScopeAndProjectIdentity"),
      ],
      [t("professional.data.thePhases"), t("professional.data.keepTheEffortAssumptionsVisibleBy")],
      [
        t("professional.data.theRecord"),
        t("professional.data.exploreProjectScheduleDocumentAndBilling"),
      ],
    ],
    tools: [
      projects(t),
      tool(
        t("professional.data.projectSchedule"),
        "/apps/project-accounting/schedule",
        t("professional.data.exploreTheSchedulingPresentation"),
      ),
      documents(t),
      invoices(t),
    ],
    faqs: [
      [
        t("professional.data.isTheDrawingAScalePlan"),
        t("professional.data.noItIsAConceptualIllustration"),
      ],
      [
        t("professional.data.areTheHoursAndFeeRecommended"),
        t("professional.data.noTheyAreEditableFictionalAssumptions"),
      ],
      [
        t("professional.data.doesThisGenerateAProposal"),
        t("professional.data.noItCalculatesALocalAmount"),
      ],
    ],
  },
  construction: {
    title: t("professional.data.construction"),
    group: "realestate",
    eyebrow: t("professional.data.theWorkOnSiteTheDetail"),
    headline: t("professional.data.buildWithAClearerPicture"),
    accent: t("professional.data.fromTheSiteToTheCost"),
    description:
      t("professional.data.bringWorkItemsQuantitiesAndProject"),
    demoTitle: t("professional.data.readTheNumbersBehindASmall"),
    demoDescription:
      t("professional.data.adjustFictionalWholeUnitQuantitiesRates"),
    steps: [
      [
        t("professional.data.theWorkItem"),
        t("professional.data.keepQuantityUnitAndTheItem"),
      ],
      [
        t("professional.data.theCostLine"),
        t("professional.data.calculateEnteredQuantitiesAndRatesTransp"),
      ],
      [
        t("professional.data.theProjectView"),
        t("professional.data.exploreExistingBoqBudgetAndJob"),
      ],
    ],
    tools: [
      tool(
        t("professional.data.billOfQuantities"),
        "/apps/project-accounting/boq",
        t("professional.data.lookAtTheExistingBoqPresentation"),
      ),
      tool(
        t("professional.data.projectBudgets"),
        "/apps/project-accounting/budgets",
        t("professional.data.exploreTheProjectBudgetPresentation"),
      ),
      tool(
        t("professional.data.jobCost"),
        "/apps/project-accounting/job-cost",
        t("professional.data.reviewTheProjectCostPresentation"),
      ),
      projects(t),
    ],
    faqs: [
      [
        t("professional.data.canThisBeUsedAsA"),
        t("professional.data.theExampleIsFictionalArithmeticOnly"),
      ],
      [
        t("professional.data.whatDoesTheBudgetDifferenceMean"),
        t("professional.data.itComparesTheEnteredBudgetWith"),
      ],
      [
        t("professional.data.doesChangingALineOrderMaterials"),
        t("professional.data.noTheExampleCreatesNoPurchase"),
      ],
    ],
  },
  "accounting-firm": {
    title: t("professional.data.accountingFirm"),
    group: "consulting",
    eyebrow: t("professional.data.aConsideredViewOfClientWork"),
    headline: t("professional.data.clearRecords"),
    accent: t("professional.data.aCalmerClientReview"),
    description:
      t("professional.data.giveTheWorkBehindTheNumbers"),
    demoTitle: t("professional.data.workThroughASmallReviewChecklist"),
    demoDescription:
      t("professional.data.manuallyMarkFourFictionalEngagementTasks"),
    steps: [
      [t("professional.data.theEngagement"), t("professional.data.startWithClientAndPeriodContext")],
      [t("professional.data.theReview"), t("professional.data.keepManuallyTrackedTasksAndOpen")],
      [
        t("professional.data.theHandoff"),
        t("professional.data.exploreTheAccountingRecordsThatSupport"),
      ],
    ],
    tools: [
      tool(
        t("professional.data.accountingHub"),
        "/apps/accounting/accounting-hub",
        t("professional.data.exploreTheAccountingOverviewPresentation"),
      ),
      tool(
        t("professional.data.ledgers"),
        "/apps/accounting/ledgers",
        t("professional.data.lookAtTheLedgerPresentation"),
      ),
      tool(
        t("professional.data.bankReconciliation"),
        "/apps/accounting/bank-reconciliation",
        t("professional.data.exploreTheBankReconciliationPresentation"),
      ),
      tool(
        t("professional.data.financialReports"),
        "/apps/accounting/financial-reports",
        t("professional.data.reviewTheReportingPresentation"),
      ),
    ],
    faqs: [
      [
        t("professional.data.doesMarkingATaskReviewReal"),
        t("professional.data.noTheseAreManuallySelectedLocal"),
      ],
      [
        t("professional.data.does100MeanTheEngagementIs"),
        t("professional.data.itMeansAllFourExampleCheckboxes"),
      ],
      [
        t("professional.data.areAnyClientRecordsSaved"),
        t("professional.data.noTheEngagementIdentifierAndTasks"),
      ],
    ],
  },
  "marketing-agency": {
    title: t("professional.data.marketingAgency"),
    group: "consulting",
    eyebrow: t("professional.data.creativeThinkingVisibleAssumptions"),
    headline: t("professional.data.bigIdeasNeedRoom"),
    accent: t("professional.data.goodWorkNeedsAClearPlan"),
    description:
      t("professional.data.bringTheCampaignBriefChannelAmounts"),
    demoTitle: t("professional.data.giveACampaignBudgetAClear"),
    demoDescription:
      t("professional.data.editThreeFictionalChannelAmountsAnd"),
    steps: [
      [t("professional.data.theBrief"), t("professional.data.keepTheClientAndCampaignContext")],
      [
        t("professional.data.theAllocation"),
        t("professional.data.makeEnteredChannelAmountsAndThe"),
      ],
      [t("professional.data.theDelivery"), t("professional.data.exploreProjectCustomerAndInvoicePresenta")],
    ],
    tools: [
      projects(t),
      clients(t),
      tool(
        t("professional.data.budgetLines"),
        "/apps/budget-management/lines",
        t("professional.data.exploreTheExistingBudgetLinePresentation"),
      ),
      invoices(t),
    ],
    faqs: [
      [
        t("professional.data.doesTheChartPredictCampaignResults"),
        t("professional.data.noItVisualisesEnteredAmountsOnly"),
      ],
      [
        t("professional.data.whatHappensIfAllocationsExceedThe"),
        t("professional.data.theExampleDisplaysTheAmountOver"),
      ],
      [
        t("professional.data.doesChangingAChannelConnectTo"),
        t("professional.data.noAllValuesAreFictionalAnd"),
      ],
    ],
  },
  "talent-acquisition": {
    title: t("professional.data.talentAcquisition"),
    group: "consulting",
    eyebrow: t("professional.data.aClearerPathThroughRecruitment"),
    headline: t("professional.data.makeRoomForTheNextStep"),
    accent: t("professional.data.keepTheCandidateJourneyClear"),
    description:
      t("professional.data.bringRoleContextCandidateIdentifiersAnd"),
    demoTitle: t("professional.data.exploreAnAnonymousCandidateJourney"),
    demoDescription:
      t("professional.data.changeTheStagesOfThreeFictional"),
    steps: [
      [t("professional.data.theRole"), t("professional.data.keepTheRoleAndCandidateIdentity")],
      [
        t("professional.data.theConversation"),
        t("professional.data.recordAnExplicitStageRatherThan"),
      ],
      [
        t("professional.data.theNextStep"),
        t("professional.data.exploreTheExistingRecruitmentAndActivity"),
      ],
    ],
    tools: [
      tool(
        t("professional.data.recruitment"),
        "/apps/human-resources/recruitment",
        t("professional.data.exploreTheExistingRecruitmentPresentatio"),
      ),
      tool(
        t("professional.data.activityTasks"),
        "/apps/sales/crm/activities/tasks",
        t("professional.data.lookAtTheTaskAndFollow"),
      ),
      clients(t),
      invoices(t),
    ],
    faqs: [
      [
        t("professional.data.areTheseRealApplicants"),
        t("professional.data.noOnlyFictionalAnonymousIdentifiersAnd"),
      ],
      [
        t("professional.data.doesMovingAStageEvaluateA"),
        t("professional.data.noStagesChangeOnlyWhenYou"),
      ],
      [
        t("professional.data.areCandidatesContactedOrSaved"),
        t("professional.data.noChangesRemainLocalAndDo"),
      ],
    ],
  },
  "audit-certification": {
    title: t("professional.data.auditCertification"),
    group: "consulting",
    eyebrow: t("professional.data.evidenceWithItsContextIntact"),
    headline: t("professional.data.aClearerTrailOfEvidence"),
    accent: t("professional.data.aMoreConsideredReview"),
    description:
      t("professional.data.bringDocumentIdentityReviewStateAnd"),
    demoTitle: t("professional.data.exploreASmallEvidenceReviewList"),
    demoDescription:
      t("professional.data.setFictionalDocumentsToMissingProvided"),
    steps: [
      [t("professional.data.theEvidence"), t("professional.data.keepEachDocumentSIdentityAnd")],
      [
        t("professional.data.theReviewState"),
        t("professional.data.distinguishProvidedMaterialFromAManually"),
      ],
      [
        t("professional.data.theFollowUp"),
        t("professional.data.exploreExistingDocumentAndQualityAction"),
      ],
    ],
    tools: [
      documents(t),
      tool(
        t("professional.data.qualityDashboard"),
        "/apps/quality/quality-dashboard",
        t("professional.data.exploreTheExistingQualityOverview"),
      ),
      tool(
        t("professional.data.nonConformance"),
        "/apps/quality/non-conformance",
        t("professional.data.lookAtTheNonConformancePresentation"),
      ),
      tool(
        "CAPA",
        "/apps/quality/capa",
        t("professional.data.exploreCorrectiveAndPreventiveActionReco"),
      ),
    ],
    faqs: [
      [
        t("professional.data.doesReviewedMeanCertifiedOrCompliant"),
        t("professional.data.noItIsAManuallySelected"),
      ],
      [
        t("professional.data.canIUploadRealEvidenceHere"),
        t("professional.data.thisExampleHasNoUploadOr"),
      ],
      [
        t("professional.data.doesChangingAStateUpdateQuality"),
        t("professional.data.noTheLocalListIsSeparate"),
      ],
    ],
  },
  "travel-agency": {
    title: t("professional.data.travelAgency"),
    group: "consulting",
    eyebrow: t("professional.data.theJourneyAndTheDetailsBehind"),
    headline: t("professional.data.aJourneyWorthPlanning"),
    accent: t("professional.data.theDetailsBeautifullyInView"),
    description:
      t("professional.data.bringTravellersStayAssumptionsAndService"),
    demoTitle: t("professional.data.putTogetherAnIllustrativeTripEstimate"),
    demoDescription:
      t("professional.data.enterTravellersFaresRoomNightsAnd"),
    steps: [
      [t("professional.data.theJourney"), t("professional.data.keepTravellerCountAndTheTrip")],
      [
        t("professional.data.theAssumptions"),
        t("professional.data.separatePerTravellerFaresRoomNights"),
      ],
      [t("professional.data.theRecord"), t("professional.data.exploreCustomerQuoteAndBillingPresentati")],
    ],
    tools: [
      clients(t),
      tool(
        t("professional.data.salesQuotations"),
        "/apps/sales/crm/orders/quotes",
        t("professional.data.exploreTheExistingQuotationPresentation"),
      ),
      invoices(t),
      tool(
        t("professional.data.customerReceipts"),
        "/apps/accounting/receipts",
        t("professional.data.lookAtTheReceiptPresentation"),
      ),
    ],
    faqs: [
      [
        t("professional.data.areTheseActualFaresOrRoom"),
        t("professional.data.noAllPricesAreEnteredFictional"),
      ],
      [
        t("professional.data.howIsTheEstimateCalculated"),
        t("professional.data.travellersFarePerTravellerPlusRooms"),
      ],
      [
        t("professional.data.doesTheExampleBookOrIssue"),
        t("professional.data.noItCreatesNoReservationTicket"),
      ],
    ],
  },
}));
export const groupLabel = (group: "realestate" | "consulting", t: TFn) =>
  group === "realestate" ? t("professional.data.realEstate") : t("professional.data.consulting");
export const routeFor = (slug: ProfessionalSlug, t: TFn) =>
  `/industries/${pages(t)[slug].group}/${slug}`;
export const properties = [
  {
    id: "EX-P01",
    name: "Courtyard Apartment",
    type: "Apartment",
    area: 1250,
    price: 12500000,
  },
  {
    id: "EX-P02",
    name: "Studio Office",
    type: "Office",
    area: 850,
    price: 9800000,
  },
  {
    id: "EX-P03",
    name: "Corner Retail Space",
    type: "Shop",
    area: 600,
    price: 16000000,
  },
] as const;
export const phases = [
  { name: "Concept study", hours: 12 },
  { name: "Design development", hours: 20 },
  { name: "Documentation", hours: 8 },
] as const;
export const workItems = [
  { name: "Concrete work", unit: "m³", quantity: 12, rate: 8500 },
  { name: "Masonry work", unit: "m²", quantity: 80, rate: 950 },
  { name: "Finish work", unit: "m²", quantity: 60, rate: 1200 },
] as const;
export const reviewTasks = memoT((t: TFn) => ([
  t("professional.data.exampleDocumentsReceived"),
  t("professional.data.ledgerQuestionsNoted"),
  t("professional.data.reconciliationReviewNoted"),
  t("professional.data.clientHandoffPrepared"),
]));
export const channels = [
  { name: "Search", amount: 120000 },
  { name: "Social", amount: 105000 },
  { name: "Creative", amount: 75000 },
] as const;
export const candidateStages = ["applied", "interview", "shortlist"] as const;
export type CandidateStage = (typeof candidateStages)[number];
export const candidateLabels = memoT((t: TFn): Record<CandidateStage, string> => ({
  applied: t("professional.data.applied"),
  interview: t("professional.data.interview"),
  shortlist: t("professional.data.shortlisted"),
}));
export const candidates: { id: string; role: string; stage: CandidateStage }[] =
  [
    { id: "EX-C01", role: "Role brief A", stage: "applied" },
    { id: "EX-C02", role: "Role brief A", stage: "interview" },
    { id: "EX-C03", role: "Role brief B", stage: "shortlist" },
  ];
export const evidenceStates = ["missing", "provided", "reviewed"] as const;
export type EvidenceState = (typeof evidenceStates)[number];
export const evidenceLabels = memoT((t: TFn): Record<EvidenceState, string> => ({
  missing: t("professional.data.missing"),
  provided: t("professional.data.provided"),
  reviewed: t("professional.data.reviewed"),
}));
export const evidenceRows: {
  id: string;
  name: string;
  state: EvidenceState;
}[] = [
  { id: "EX-E01", name: "Scope note", state: "reviewed" },
  { id: "EX-E02", name: "Process record", state: "provided" },
  { id: "EX-E03", name: "Follow-up note", state: "missing" },
  { id: "EX-E04", name: "Review summary", state: "provided" },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

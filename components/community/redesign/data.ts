import { memoT, type TFn } from "@/lib/i18n/t-types";
export const communitySlugs = [
  "home",
  "tutorials",
  "documentation",
  "training",
  "blog",
  "meet-advisor",
  "support",
  "customer-stories",
  "forum",
  "events",
  "translations",
  "become-a-partner",
] as const;
export type CommunitySlug = (typeof communitySlugs)[number];
export type Group = "Learn" | "Get Services" | "Collaborate";
type Page = {
  title: string;
  group: Group | "Community";
  path: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  faqs: [string, string][];
};
const page = (
  title: string,
  group: Page["group"],
  path: string,
  eyebrow: string,
  headline: string,
  accent: string,
  description: string,
  sectionTitle: string,
  sectionDescription: string,
  faqs: [string, string][],
): Page => ({
  title,
  group,
  path,
  eyebrow,
  headline,
  accent,
  description,
  sectionTitle,
  sectionDescription,
  faqs,
});
export const pages = memoT((t: TFn): Record<CommunitySlug, Page> => ({
  home: page(
    "Community",
    "Community",
    "/community",
    t("data.learnConnectBuildYourNextStep"),
    t("data.aLittleSharedKnowledge"),
    t("data.aMuchClearerWayForward"),
    t("data.findYourWayThroughProductGuides"),
    t("data.findTheRightPlaceToBegin"),
    t("data.searchTheCommunityMenuOrChoose"),
    [
      [
        t("data.whereShouldIStart"),
        t("data.chooseLearnForProductExplorationGet"),
      ],
      [
        t("data.willAnAdvisorRequestBookA"),
        t("data.theSharedFormRequestsYourContact"),
      ],
    ],
  ),
  tutorials: page(
    t("data.tutorials"),
    "Learn",
    "/community/learn/tutorials",
    t("data.smallStepsUsefulContext"),
    t("data.understandTheNextStep"),
    t("data.thenExploreItForYourself"),
    t("data.followShortWrittenWalkthroughsThroughExi"),
    t("data.chooseAProductWalkthrough"),
    t("data.theseWrittenGuidesExplainHowTo"),
    [
      [
        t("data.areTheseVideoLessons"),
        t("data.theseAreShortWrittenProductExploration"),
      ],
      [
        t("data.doesMarkingAGuideOpenRecord"),
        t("data.noReadingAndExpandingAGuide"),
      ],
    ],
  ),
  documentation: page(
    t("data.documentation"),
    "Learn",
    "/community/learn/documentation",
    t("data.aReferenceWithRoomToBreathe"),
    t("data.findTheDetail"),
    t("data.keepTheBiggerPicture"),
    t("data.readFocusedGuideNotesForNavigating"),
    t("data.aSmallPracticalReferenceLibrary"),
    t("data.searchAuthoredGuideNotesBelowProduct"),
    [
      [
        t("data.isThisAnApiReference"),
        t("data.thisPageProvidesPublicProductGuide"),
      ],
      [
        t("data.canISearchTheNotes"),
        t("data.yesSearchTitlesSummariesAndGuide"),
      ],
    ],
  ),
  training: page(
    t("data.training"),
    "Learn",
    "/community/learn/training",
    t("data.makeTheLearningPathYourOwn"),
    t("data.startWithYourRole"),
    t("data.buildAMoreUsefulAgenda"),
    t("data.chooseTheTopicsThatMatterTo"),
    t("data.buildASmallLearningAgenda"),
    t("data.roleSelectionsOrganiseExistingProductLin"),
    [
      [
        t("data.areThereConfirmedTrainingDatesHere"),
        t("data.thisPagePreparesATopicAgenda"),
      ],
      [
        t("data.canIDiscussATeamTraining"),
        t("data.yesOpenTheSharedAdvisorRequest"),
      ],
    ],
  ),
  blog: page(
    t("data.blog"),
    "Learn",
    "/community/learn/blog",
    t("data.theAdonErpJournal"),
    t("data.ideasWorthReading"),
    t("data.aLittleContextForTheWork"),
    t("data.browseArticlesFromTheExistingPublic"),
    t("data.fromTheJournal"),
    t("data.postsAreLoadedFromTheExisting"),
    [
      [
        t("data.whereDoTheArticlesComeFrom"),
        t("data.theJournalReadsTheExistingPublic"),
      ],
      [
        t("data.howIsArticleContentDisplayed"),
        t("data.articleContentIsShownAsReadable"),
      ],
    ],
  ),
  "meet-advisor": page(
    t("data.meetAnAdvisor"),
    "Get Services",
    "/community/get-services/meet-advisor",
    t("data.yourWorkflowIsAGoodPlace"),
    t("data.bringTheQuestions"),
    t("data.letSMakeTheConversationUseful"),
    t("data.prepareAFewNotesAboutYour"),
    t("data.prepareYourConversationBrief"),
    t("data.thisBriefStaysOnThisPage"),
    [
      [
        t("data.doesPreparingTheBriefSendA"),
        t("data.noTheBriefIsLocalUse"),
      ],
      [
        t("data.willThePageConfirmAnAdvisor"),
        t("data.noTheTeamContactsYouTo"),
      ],
    ],
  ),
  support: page(
    t("data.support"),
    "Get Services",
    "/community/get-services/support",
    t("data.aClearerRouteToHelp"),
    t("data.aQuestionDeserves"),
    t("data.aUsefulNextStep"),
    t("data.findAGuidePrepareTheDetail"),
    t("data.findTheRightHelpRoute"),
    t("data.searchTheGuideNotesOrPrepare"),
    [
      [
        t("data.doesThisPageCreateATicket"),
        t("data.noTicketEndpointIsConnectedHere"),
      ],
      [
        t("data.whereDoTheContactDetailsCome"),
        t("data.theyComeFromTheRepositoryS"),
      ],
    ],
  ),
  "customer-stories": page(
    t("data.customerStories"),
    "Get Services",
    "/community/get-services/customer-stories",
    t("data.contextBeforeClaims"),
    t("data.everyOperationHasAStory"),
    t("data.startWithTheWorkBehindIt"),
    t("data.exploreIllustrativeWorkflowJourneysAndTh"),
    t("data.exploreAFewWorkflowJourneys"),
    t("data.theJourneysBelowAreIllustrativeExamples"),
    [
      [
        t("data.areTheseVerifiedCustomerCaseStudies"),
        t("data.noTheyAreClearlyLabelledWorkflow"),
      ],
      [
        t("data.canIAskAboutReferences"),
        t("data.useTheSharedAdvisorRequestTo"),
      ],
    ],
  ),
  forum: page(
    t("data.forum"),
    "Collaborate",
    "/community/collaborate/forum",
    t("data.goodQuestionsCreateBetterConversations"),
    t("data.shareTheContext"),
    t("data.makeTheQuestionClearer"),
    t("data.exploreStarterDiscussionNotesAndPrepare"),
    t("data.startWithAUsefulQuestion"),
    t("data.theseAuthoredStarterDiscussionsAreNot"),
    [
      [
        t("data.canIPublishAForumPost"),
        t("data.aPublicForumPostingServiceIs"),
      ],
      [
        t("data.areTheDisplayedDiscussionsLiveUser"),
        t("data.noTheyAreAuthoredStarterNotes"),
      ],
    ],
  ),
  events: page(
    t("data.events"),
    "Collaborate",
    "/community/collaborate/events",
    t("data.makeRoomForAUsefulConversation"),
    t("data.bringPeopleAndTopics"),
    t("data.intoTheSamePicture"),
    t("data.prepareAFocusedAgendaAroundThe"),
    t("data.buildAConversationAgenda"),
    t("data.noConfirmedPublicEventScheduleIs"),
    [
      [
        t("data.isThisAPublicEventCalendar"),
        t("data.noConfirmedPublicDatesOrRegistration"),
      ],
      [
        t("data.canIRequestAWalkthroughAbout"),
        t("data.yesOpenTheSharedAdvisorRequest2"),
      ],
    ],
  ),
  translations: page(
    t("data.translations"),
    "Collaborate",
    "/community/collaborate/translations",
    t("data.theSameProductMoreWaysTo"),
    t("data.goodWordingBrings"),
    t("data.morePeopleIntoThePicture"),
    t("data.exploreARealConfiguredInterfaceLabel"),
    t("data.prepareATranslationLabelDraft"),
    t("data.theSourceAndTargetSamplesCome"),
    [
      [
        t("data.doesDownloadingADraftUpdateThe"),
        t("data.noTheDownloadedJsonIsA"),
      ],
      [
        t("data.areCompletionPercentagesShown"),
        t("data.noTranslationCoverageOrContributorStatis"),
      ],
    ],
  ),
  "become-a-partner": page(
    t("data.becomeAPartner"),
    "Collaborate",
    "/community/collaborate/become-a-partner",
    t("data.buildAConversationAroundYourPractice"),
    t("data.differentStrengths"),
    t("data.aMoreUsefulCollaboration"),
    t("data.exploreWaysToFrameYourServices"),
    t("data.prepareThePartnershipConversation"),
    t("data.thePathsAreEnquiryTopicsNot"),
    [
      [
        t("data.doesSelectingAPathMakeUs"),
        t("data.noThisPagePreparesAConversation"),
      ],
      [
        t("data.howCanISendAnEnquiry"),
        t("data.useTheConfiguredSalesEmailDraft"),
      ],
    ],
  ),
}));
export const menuSlugs = communitySlugs.filter(
  (s): s is Exclude<CommunitySlug, "home"> => s !== "home",
);
export type Guide = {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  href: string;
  linkLabel: string;
};
export const guides = memoT((t: TFn): Guide[] => ([
  {
    id: "finance",
    title: t("data.followTheAccountingPicture"),
    category: t("data.finance"),
    summary:
      t("data.exploreTheHubIdentifyAQuestion"),
    steps: [
      t("data.openTheAccountingHubAndRead"),
      t("data.distinguishIllustrativeRecordsFromYourOw"),
      t("data.followTheProductLinksForThe"),
    ],
    href: "/apps/accounting/accounting-hub",
    linkLabel: t("data.exploreAccountingHub"),
  },
  {
    id: "inventory",
    title: t("data.readTheStockContext"),
    category: t("data.operations"),
    summary:
      t("data.exploreHowAWarehousePresentationGives"),
    steps: [
      t("data.openTheWarehousesPresentationAndInspect"),
      t("data.noteTheWarehouseAndMovementQuestions"),
      t("data.bringYourOwnReceivingTransferAnd"),
    ],
    href: "/apps/inventory/warehouses",
    linkLabel: t("data.exploreWarehouses"),
  },
  {
    id: "production",
    title: t("data.followAProductionOrderStory"),
    category: t("data.manufacturing"),
    summary:
      t("data.exploreTheOrderAndTheRecords"),
    steps: [
      t("data.openTheProductionOrdersPresentationAnd"),
      t("data.lookAtTheRelationshipBetweenOrder"),
      t("data.useLinkedManufacturingPagesToPrepare"),
    ],
    href: "/apps/manufacturing/production-orders",
    linkLabel: t("data.exploreProductionOrders"),
  },
]));
export const referenceNotes = memoT((t: TFn): Guide[] => ([
  {
    id: "navigate",
    title: t("data.findTheRelevantProductPresentation"),
    category: t("data.navigation"),
    summary: t("data.useTheAppsAndIndustriesMenus"),
    steps: [
      t("data.chooseAnAppsTopicForA"),
      t("data.readThePageIntroductionBeforeExploring"),
      t("data.useBreadcrumbsAndRelatedPageLinks"),
    ],
    href: "/apps",
    linkLabel: t("data.exploreApps"),
  },
  {
    id: "examples",
    title: t("data.understandIllustrativeRecords"),
    category: t("data.examples"),
    summary: t("data.keepExampleFiguresSeparateFromLive"),
    steps: [
      t("data.readTheExampleOrSourceLabels"),
      t("data.whenALocalCalculatorIsProvided"),
      t("data.doNotTreatLocalPreviewChanges"),
    ],
    href: "/industries",
    linkLabel: t("data.exploreIndustries"),
  },
  {
    id: "request",
    title: t("data.prepareAnAdvisorRequest"),
    category: t("data.conversations"),
    summary: t("data.bringYourWorkflowQuestionsToThe"),
    steps: [
      t("data.writeDownTheWorkflowAndThe"),
      t("data.openTheSharedAdvisorFormAnd"),
      t("data.theExistingFormReportsItsOwn"),
    ],
    href: "/community/get-services/meet-advisor",
    linkLabel: t("data.prepareABrief"),
  },
  {
    id: "help",
    title: t("data.giveASupportQuestionUsefulContext"),
    category: t("data.support"),
    summary: t("data.prepareAClearTopicAndConcise"),
    steps: [
      t("data.identifyThePageOrWorkflowAnd"),
      t("data.describeTheResultYouObservedWithout"),
      t("data.openADraftToTheConfigured"),
    ],
    href: "/community/get-services/support",
    linkLabel: t("data.openSupport"),
  },
]));
export const discussionNotes = memoT((t: TFn): Guide[] => ([
  {
    ...guides(t)[0],
    id: "finance-question",
    title: t("data.whichAccountingDetailShouldIExplore"),
    summary:
      t("data.beginWithTheOverviewThenNarrow"),
  },
  {
    ...guides(t)[1],
    id: "stock-question",
    title: t("data.howShouldIFrameAWarehouse"),
    summary:
      t("data.describeTheReceivingTransferOrCounting"),
  },
  {
    ...guides(t)[2],
    id: "production-question",
    title: t("data.whatContextHelpsAManufacturingConversati"),
    summary:
      t("data.bringTheOrderMaterialRoutingAnd"),
  },
]));
export const journeys = memoT((t: TFn) => ([
  {
    id: "stock",
    title: t("data.aReceivingToStockConversation"),
    category: t("data.operations"),
    context:
      t("data.aTeamWantsToDiscussHow"),
    workflow: [
      t("data.identifyTheReceivingStep"),
      t("data.reviewWarehouseContext"),
      t("data.prepareTransferAndCountQuestions"),
    ],
    href: "/apps/inventory/warehouses",
  },
  {
    id: "billing",
    title: t("data.anOrderToBillingConversation"),
    category: t("data.finance"),
    context:
      t("data.aTeamWantsToExploreHow"),
    workflow: [
      t("data.describeTheCustomerHandoff"),
      t("data.reviewTheInvoicePresentation"),
      t("data.prepareReceivablesQuestions"),
    ],
    href: "/apps/accounting/invoices-ar",
  },
  {
    id: "making",
    title: t("data.aMaterialToProductionConversation"),
    category: t("data.manufacturing"),
    context:
      t("data.aTeamWantsToDiscussThe"),
    workflow: [
      t("data.describeTheOrderAndMaterial"),
      t("data.reviewTheProductionPresentation"),
      t("data.prepareRoutingAndQualityQuestions"),
    ],
    href: "/apps/manufacturing/production-orders",
  },
]));
export const topics = memoT((t: TFn) => ([
  {
    id: "finance",
    label: t("data.accountingOverview"),
    href: "/apps/accounting/accounting-hub",
    group: t("data.finance"),
  },
  {
    id: "stock",
    label: t("data.warehouseContext"),
    href: "/apps/inventory/warehouses",
    group: t("data.operations"),
  },
  {
    id: "production",
    label: t("data.productionOrders"),
    href: "/apps/manufacturing/production-orders",
    group: t("data.operations"),
  },
  {
    id: "people",
    label: t("data.recruitmentContext"),
    href: "/apps/human-resources/recruitment",
    group: t("data.people"),
  },
]));
export const partnerPaths = memoT((t: TFn) => ([
  {
    id: "implementation",
    title: t("data.implementationConversations"),
    body: t("data.describeYourPracticeSWorkflowDiscovery"),
  },
  {
    id: "training",
    title: t("data.learningTrainingConversations"),
    body: t("data.describeTheAudiencesProductTopicsAnd"),
  },
  {
    id: "technical",
    title: t("data.technicalCollaborationConversations"),
    body: t("data.describeYourTechnicalPracticeAndThe"),
  },
]));
export const partnerChecklist = memoT((t: TFn) => ([
  t("data.practiceAndServiceFocusNoted"),
  t("data.relevantExperiencePrepared"),
  t("data.contactPersonIdentified"),
  t("data.questionsForTheTeamListed"),
]));
export const groups: Group[] = ["Learn", "Get Services", "Collaborate"];
const groupKeys: Record<string, string> = { "Learn": "groups.learn", "Get Services": "groups.getServices", "Collaborate": "groups.collaborate", "Community": "groups.community" };
/** Display label for a group id. The ids stay English because they are compared and used for filtering. */
export const groupLabel = (group: string, t: TFn) => t(groupKeys[group] ?? "groups.community");

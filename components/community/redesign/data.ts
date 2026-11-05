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
export const pages: Record<CommunitySlug, Page> = {
  home: page(
    "Community",
    "Community",
    "/community",
    "LEARN. CONNECT. BUILD YOUR NEXT STEP.",
    "A little shared knowledge.",
    "A much clearer way forward.",
    "Find your way through product guides, conversations and collaboration. One considered starting point for the Adon ERP community.",
    "Find the right place to begin.",
    "Search the Community menu or choose a purpose. Every card leads to an existing page, including the unchanged partner directory.",
    [
      [
        "Where should I start?",
        "Choose Learn for product exploration, Get Services for a conversation or support, and Collaborate for contribution and partnership topics.",
      ],
      [
        "Will an advisor request book a time automatically?",
        "The shared form requests your contact details. The team arranges the conversation; the directory does not promise a meeting slot.",
      ],
    ],
  ),
  tutorials: page(
    "Tutorials",
    "Learn",
    "/community/learn/tutorials",
    "SMALL STEPS. USEFUL CONTEXT.",
    "Understand the next step.",
    "Then explore it for yourself.",
    "Follow short written walkthroughs through existing public product presentations. Start with a question, open the relevant workspace, and keep your own process in view.",
    "Choose a product walkthrough.",
    "These written guides explain how to explore the public presentations. They are not videos, certified lessons or instructions for a live company database.",
    [
      [
        "Are these video lessons?",
        "These are short written product-exploration guides, with working links to existing public presentations.",
      ],
      [
        "Does marking a guide open record course completion?",
        "No. Reading and expanding a guide is local browsing, separate from course enrolment or certification.",
      ],
    ],
  ),
  documentation: page(
    "Documentation",
    "Learn",
    "/community/learn/documentation",
    "A REFERENCE WITH ROOM TO BREATHE",
    "Find the detail.",
    "Keep the bigger picture.",
    "Read focused guide notes for navigating the public product experience, understanding example records and preparing useful questions for an advisor.",
    "A small, practical reference library.",
    "Search authored guide notes below. Product links open existing presentations; these notes do not describe unsupported API endpoints or hidden features.",
    [
      [
        "Is this an API reference?",
        "This page provides public product-guide notes. It does not advertise API endpoints or integration contracts that have not been documented here.",
      ],
      [
        "Can I search the notes?",
        "Yes. Search titles, summaries and guide text, then expand a note to read it.",
      ],
    ],
  ),
  training: page(
    "Training",
    "Learn",
    "/community/learn/training",
    "MAKE THE LEARNING PATH YOUR OWN",
    "Start with your role.",
    "Build a more useful agenda.",
    "Choose the topics that matter to your work. Prepare a product-exploration path for yourself or a conversation with the team.",
    "Build a small learning agenda.",
    "Role selections organise existing product links. They do not enrol you in a class, reserve an event or issue a certificate.",
    [
      [
        "Are there confirmed training dates here?",
        "This page prepares a topic agenda. It does not publish a live class schedule or confirm training availability.",
      ],
      [
        "Can I discuss a team training plan?",
        "Yes. Open the shared advisor request and bring your selected topics to the conversation.",
      ],
    ],
  ),
  blog: page(
    "Blog",
    "Learn",
    "/community/learn/blog",
    "THE Adon ERP JOURNAL",
    "Ideas worth reading.",
    "A little context for the work.",
    "Browse articles from the existing public blog service. Search the journal, open a post and read at your own pace.",
    "From the journal.",
    "Posts are loaded from the existing Blog API. Loading, empty and unavailable states are shown honestly, without sample posts presented as published articles.",
    [
      [
        "Where do the articles come from?",
        "The journal reads the existing public Blog API. This redesign does not create, edit or delete posts.",
      ],
      [
        "How is article content displayed?",
        "Article content is shown as readable plain text. HTML from posts is not executed or injected into the page.",
      ],
    ],
  ),
  "meet-advisor": page(
    "Meet an Advisor",
    "Get Services",
    "/community/get-services/meet-advisor",
    "YOUR WORKFLOW IS A GOOD PLACE TO START",
    "Bring the questions.",
    "Let’s make the conversation useful.",
    "Prepare a few notes about your operation, explore the product context and request a live demo through the shared Adon ERP form.",
    "Prepare your conversation brief.",
    "This brief stays on this page and is not automatically sent with the shared request form. Keep it beside you when you speak with the team.",
    [
      [
        "Does preparing the brief send a request?",
        "No. The brief is local. Use the shared advisor button to open the actual demo request form.",
      ],
      [
        "Will the page confirm an advisor or meeting time?",
        "No. The team contacts you to arrange the discussion. Only the existing request form can report its own save result.",
      ],
    ],
  ),
  support: page(
    "Support",
    "Get Services",
    "/community/get-services/support",
    "A CLEARER ROUTE TO HELP",
    "A question deserves",
    "a useful next step.",
    "Find a guide, prepare the detail behind your question or open an email draft to the support contact configured for this site.",
    "Find the right help route.",
    "Search the guide notes or prepare a support email. Opening a draft does not send a message or create a support ticket.",
    [
      [
        "Does this page create a ticket?",
        "No ticket endpoint is connected here. You can open an email draft in your own mail application using the configured support address.",
      ],
      [
        "Where do the contact details come from?",
        "They come from the repository’s shared public business configuration, rather than the old placeholder contact values.",
      ],
    ],
  ),
  "customer-stories": page(
    "Customer Stories",
    "Get Services",
    "/community/get-services/customer-stories",
    "CONTEXT BEFORE CLAIMS",
    "Every operation has a story.",
    "Start with the work behind it.",
    "Explore illustrative workflow journeys and the questions they raise. Ask an advisor about customer references for your own industry.",
    "Explore a few workflow journeys.",
    "The journeys below are illustrative examples, not verified customer accounts. They contain no invented client names, quotes or performance results.",
    [
      [
        "Are these verified customer case studies?",
        "No. They are clearly labelled workflow examples. No customer endorsement or measured result is claimed.",
      ],
      [
        "Can I ask about references?",
        "Use the shared advisor request to ask about customer references relevant to your requirements.",
      ],
    ],
  ),
  forum: page(
    "Forum",
    "Collaborate",
    "/community/collaborate/forum",
    "GOOD QUESTIONS CREATE BETTER CONVERSATIONS",
    "Share the context.",
    "Make the question clearer.",
    "Explore starter discussion notes and prepare a thoughtful product question. The examples help you frame the topic without presenting simulated forum activity as live conversation.",
    "Start with a useful question.",
    "These authored starter discussions are not user posts. Search a topic, expand the note or prepare a question for an email draft.",
    [
      [
        "Can I publish a forum post here?",
        "A public forum-posting service is not connected to this page. The question composer prepares a local draft only.",
      ],
      [
        "Are the displayed discussions live user activity?",
        "No. They are authored starter notes without invented replies, view counts, votes or member identities.",
      ],
    ],
  ),
  events: page(
    "Events",
    "Collaborate",
    "/community/collaborate/events",
    "MAKE ROOM FOR A USEFUL CONVERSATION",
    "Bring people and topics",
    "into the same picture.",
    "Prepare a focused agenda around the ERP topics your team wants to explore. Confirm public event dates and formats with the team.",
    "Build a conversation agenda.",
    "No confirmed public event schedule is connected here. This planner organises your topics locally; it does not register attendance or reserve a session.",
    [
      [
        "Is this a public event calendar?",
        "No confirmed public dates or registration endpoint are connected. The agenda builder is a local planning aid.",
      ],
      [
        "Can I request a walkthrough about these topics?",
        "Yes. Open the shared advisor request and bring your agenda into the conversation.",
      ],
    ],
  ),
  translations: page(
    "Translations",
    "Collaborate",
    "/community/collaborate/translations",
    "THE SAME PRODUCT. MORE WAYS TO UNDERSTAND IT.",
    "Good wording brings",
    "more people into the picture.",
    "Explore a real configured interface-label sample, prepare a local wording draft and download it for review. A considered contribution starts with clear context.",
    "Prepare a translation-label draft.",
    "The source and target samples come from the configured interface messages. Editing a draft does not change the application or publish a translation.",
    [
      [
        "Does downloading a draft update the interface?",
        "No. The downloaded JSON is a local review artifact. It does not write to translation files or a contribution service.",
      ],
      [
        "Are completion percentages shown?",
        "No translation-coverage or contributor statistics are inferred. Only the selected configured label and your local draft are displayed.",
      ],
    ],
  ),
  "become-a-partner": page(
    "Become a Partner",
    "Collaborate",
    "/community/collaborate/become-a-partner",
    "BUILD A CONVERSATION AROUND YOUR PRACTICE",
    "Different strengths.",
    "A more useful collaboration.",
    "Explore ways to frame your services, prepare a partnership enquiry and discuss the next step with the team.",
    "Prepare the partnership conversation.",
    "The paths are enquiry topics, not programme tiers, pricing promises or partner approval. Drafting an enquiry does not submit an application.",
    [
      [
        "Does selecting a path make us a partner?",
        "No. This page prepares a conversation. It does not approve an application or grant partner status.",
      ],
      [
        "How can I send an enquiry?",
        "Use the configured sales-email draft or the existing contact page. Sending happens in your own mail application after you choose to send.",
      ],
    ],
  ),
};
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
export const guides: Guide[] = [
  {
    id: "finance",
    title: "Follow the accounting picture",
    category: "Finance",
    summary:
      "Explore the hub, identify a question and follow the relevant accounting detail.",
    steps: [
      "Open the Accounting Hub and read its overview sections.",
      "Distinguish illustrative records from your own company’s transactions.",
      "Follow the product links for the topic you want to review with an advisor.",
    ],
    href: "/apps/accounting/accounting-hub",
    linkLabel: "Explore Accounting Hub",
  },
  {
    id: "inventory",
    title: "Read the stock context",
    category: "Operations",
    summary:
      "Explore how a warehouse presentation gives stock information its context.",
    steps: [
      "Open the Warehouses presentation and inspect its labelled example views.",
      "Note the warehouse and movement questions relevant to your operation.",
      "Bring your own receiving, transfer and count process into an advisor discussion.",
    ],
    href: "/apps/inventory/warehouses",
    linkLabel: "Explore Warehouses",
  },
  {
    id: "production",
    title: "Follow a production-order story",
    category: "Manufacturing",
    summary:
      "Explore the order and the records around its manufacturing journey.",
    steps: [
      "Open the Production Orders presentation and inspect its example workspace.",
      "Look at the relationship between order, material and production context.",
      "Use linked manufacturing pages to prepare your routing, quality or costing questions.",
    ],
    href: "/apps/manufacturing/production-orders",
    linkLabel: "Explore Production Orders",
  },
];
export const referenceNotes: Guide[] = [
  {
    id: "navigate",
    title: "Find the relevant product presentation",
    category: "Navigation",
    summary: "Use the Apps and Industries menus to choose a starting point.",
    steps: [
      "Choose an Apps topic for a specific workflow, or an Industry page for broader context.",
      "Read the page introduction before exploring the linked workspace.",
      "Use breadcrumbs and related-page links to keep your place.",
    ],
    href: "/apps",
    linkLabel: "Explore Apps",
  },
  {
    id: "examples",
    title: "Understand illustrative records",
    category: "Examples",
    summary: "Keep example figures separate from live operational data.",
    steps: [
      "Read the example or source labels beside a record, chart or workspace.",
      "When a local calculator is provided, change assumptions and read its stated limits.",
      "Do not treat local preview changes as saved company records.",
    ],
    href: "/industries",
    linkLabel: "Explore Industries",
  },
  {
    id: "request",
    title: "Prepare an advisor request",
    category: "Conversations",
    summary: "Bring your workflow questions to the shared demo request.",
    steps: [
      "Write down the workflow and the questions you want to discuss.",
      "Open the shared advisor form and provide the required contact details.",
      "The existing form reports its own result; the team arranges the conversation.",
    ],
    href: "/community/get-services/meet-advisor",
    linkLabel: "Prepare a brief",
  },
  {
    id: "help",
    title: "Give a support question useful context",
    category: "Support",
    summary: "Prepare a clear topic and concise description.",
    steps: [
      "Identify the page or workflow and the behaviour you expected.",
      "Describe the result you observed without including passwords or private keys.",
      "Open a draft to the configured support address and review it before sending.",
    ],
    href: "/community/get-services/support",
    linkLabel: "Open Support",
  },
];
export const discussionNotes: Guide[] = [
  {
    ...guides[0],
    id: "finance-question",
    title: "Which accounting detail should I explore first?",
    summary:
      "Begin with the overview, then narrow the question to billing, ledgers or reporting.",
  },
  {
    ...guides[1],
    id: "stock-question",
    title: "How should I frame a warehouse workflow question?",
    summary:
      "Describe the receiving, transfer or counting step and the context around it.",
  },
  {
    ...guides[2],
    id: "production-question",
    title: "What context helps a manufacturing conversation?",
    summary:
      "Bring the order, material, routing and quality questions together before the walkthrough.",
  },
];
export const journeys = [
  {
    id: "stock",
    title: "A receiving-to-stock conversation",
    category: "Operations",
    context:
      "A team wants to discuss how incoming stock relates to warehouse records.",
    workflow: [
      "Identify the receiving step",
      "Review warehouse context",
      "Prepare transfer and count questions",
    ],
    href: "/apps/inventory/warehouses",
  },
  {
    id: "billing",
    title: "An order-to-billing conversation",
    category: "Finance",
    context:
      "A team wants to explore how order context travels into customer billing.",
    workflow: [
      "Describe the customer handoff",
      "Review the invoice presentation",
      "Prepare receivables questions",
    ],
    href: "/apps/accounting/invoices-ar",
  },
  {
    id: "making",
    title: "A material-to-production conversation",
    category: "Manufacturing",
    context:
      "A team wants to discuss the records behind a production-order journey.",
    workflow: [
      "Describe the order and material",
      "Review the production presentation",
      "Prepare routing and quality questions",
    ],
    href: "/apps/manufacturing/production-orders",
  },
];
export const topics = [
  {
    id: "finance",
    label: "Accounting overview",
    href: "/apps/accounting/accounting-hub",
    group: "Finance",
  },
  {
    id: "stock",
    label: "Warehouse context",
    href: "/apps/inventory/warehouses",
    group: "Operations",
  },
  {
    id: "production",
    label: "Production orders",
    href: "/apps/manufacturing/production-orders",
    group: "Operations",
  },
  {
    id: "people",
    label: "Recruitment context",
    href: "/apps/human-resources/recruitment",
    group: "People",
  },
];
export const partnerPaths = [
  {
    id: "implementation",
    title: "Implementation conversations",
    body: "Describe your practice’s workflow discovery, rollout and customer-support experience.",
  },
  {
    id: "training",
    title: "Learning & training conversations",
    body: "Describe the audiences, product topics and learning support your practice focuses on.",
  },
  {
    id: "technical",
    title: "Technical collaboration conversations",
    body: "Describe your technical practice and the integration or development questions you want to discuss.",
  },
];
export const partnerChecklist = [
  "Practice and service focus noted",
  "Relevant experience prepared",
  "Contact person identified",
  "Questions for the team listed",
];
export const groups: Group[] = ["Learn", "Get Services", "Collaborate"];

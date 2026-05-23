const enMessages = {
  common: {
    tryFree: "Get Started Free →",
    watchDemo: "▶ Watch Demo",
    priceNote: "US$ 9.99/month · All tools included · No credit card needed",
    viewAllApps: "Explore 50+ tools ↗",
    seeAllFeatures: "Explore all features ↗",
    contactSales: "Talk to Sales",
    freeTrialNote: "Free trial · No credit card · Instant access",
  },

  hero: {
    tag: "✦ Manage your entire business in one place",
    titlePrefix: "Simple, fast,",
    typeWords: [
      "financial management",
      "subscription handling",
      "daily operations",
      "business growth",
    ],
    description:
      "Set up in minutes with no coding or complicated configuration. Manage your team, sales, accounting, and operations from one connected platform.",
  },

  apps: {
    tag: "✦ Built for modern businesses",
    title: "Manage everything with",
    titleHand: "one",
    titleSuffix: "smart Adon ERP",
    description:
      "Keep accounting, sales, customer management, inventory, and team workflows connected in one system. Reduce manual work, avoid mistakes, and make faster business decisions.",
    altLabel: "Adon",
  },

  nativeAi: {
    tag: "Smart AI Assistance",
    title: "AI support across your entire business",
    quotePrefix: "Use",
    quoteHighlight: "Adon",
    quoteSuffix: "to simplify your",
    typeWords: ["accounting", "sales", "operations", "HR"],
    description:
      "Generate reports, understand data, automate tasks, and make faster decisions with built-in AI assistance.",
  },

  levelUp: {
    tag: "✦ Fast & reliable",
    titlePrefix: "Built to improve",
    titleHand: "productivity",
    description:
      "Enjoy fast workflows, clean interfaces, and smart suggestions that help your team complete more work in less time.",
    stats: [
      { icon: "⚡", value: "Fast workflows", label: "Smooth daily operations" },
      {
        icon: "🧠",
        value: "AI-powered",
        label: "Smart assistance where needed",
      },
      {
        icon: "🔒",
        value: "Secure platform",
        label: "Protect your business data",
      },
    ],
  },

  features: {
    titlePrefix: "Everything your business",
    titleHand: "needs",
    titleSuffix: "in one platform.",
  },

  enterprise: {
    tag: "✦ Powerful business solution",
    titlePrefix: "Modern",
    titleCircled: "business",
    titleSuffix: "management software",
    cards: [
      {
        icon: "🌍",
        title: "Flexible for every business",
        desc: "Whether you're a startup or a large company, Adon adapts to the way your team works.",
        badge: "Flexible",
      },
      {
        icon: "🔒",
        title: "Your data stays yours",
        desc: "Keep your business data secure with full control. Use our cloud or host it on your own infrastructure.",
        badge: "Secure",
      },
      {
        icon: "🤖",
        title: "AI that helps you work smarter",
        desc: "Use AI assistance for reporting, analysis, automation, and faster decision-making across your business.",
        badge: "AI Ready",
      },
      {
        icon: "💰",
        title: "Simple pricing",
        desc: "No hidden fees or complicated plans. Transparent pricing designed for growing businesses.",
        badge: "Transparent",
      },
    ],
  },

  stats: {
    tag: "✦ Built for growing businesses",
    title: "Start small, grow with confidence",
    items: [
      { value: "100+", label: "Early users" },
      { value: "50+", label: "Business tools" },
      { value: "Reliable", label: "Stable daily workflows" },
      { value: "Simple", label: "Easy for every team" },
    ],
  },
  testimonials: {
    tag: "✦ Customer stories",
    title: "Teams love using Adon",
    extraQuote:
      "Adon helped us simplify accounting, sales, and team management in one place. Instead of juggling multiple tools, everything is now connected and much easier to manage.",
    extraAuthor: "Richard Miles",
    extraRole: "Training Manager, Enterprise Corp",
  },

  cta: {
    title: "Take your business to the next level",
    description:
      "Manage billing, payments, renewals, customer relationships, and reporting from one unified platform with Adon ERP.",
  },
} as const;

export default enMessages;

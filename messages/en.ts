const enMessages = {
  common: {
    tryFree: "Start now — it's free →",
    watchDemo: "▶ Watch demo",
    priceNote: "US$ 9.99/month · All apps · No credit card required",
    viewAllApps: "View all 50+ apps ↗",
    seeAllFeatures: "See all features ↗",
    contactSales: "Contact Sales",
    freeTrialNote: "Free trial · No credit card · Instant access",
  },
  hero: {
    tag: "✦ All your business on one platform",
    titlePrefix: "Simple, efficient,",
    typeWords: [
      "finances automatically",
      "subscriptions effortlessly",
      "operations seamlessly",
      "growth intelligently",
    ],
    description:
      "One click install. No complexity, no code — just a single platform that empowers every person in your business.",
  },
  apps: {
    tag: "✦ Built for modern businesses",
    title: "Run faster with",
    titleHand: "one",
    titleSuffix: "connected Adon ERP",
    description:
      "From accounting to CRM, every app shares one data flow so your team moves faster, reduces manual work, and scales with confidence.",
    altLabel: "Adon",
  },
  nativeAi: {
    tag: "Native AI",
    title: "Native AI across all your business",
    quotePrefix: "You use",
    quoteHighlight: "Adon",
    quoteSuffix: "to run your",
    typeWords: ["finance", "sales", "operations", "HR"],
    description:
      "Automate work, tailor features, perform deep research, and scale without limits.",
  },
  levelUp: {
    tag: "✦ Performance",
    titlePrefix: "Optimised for",
    titleHand: "productivity",
    description:
      "Experience true speed. Sub-second data entry, smart AI, and a fast UI. All operations complete in less than 90ms.",
    stats: [
      { icon: "⚡", value: "90ms", label: "Average operation speed" },
      { icon: "🧠", value: "Native AI", label: "Built into every workflow" },
      { icon: "🔒", value: "SOC 2", label: "Enterprise-grade security" },
    ],
  },
  features: {
    titlePrefix: "All the",
    titleHand: "features",
    titleSuffix: "done right.",
  },
  enterprise: {
    tag: "✦ Enterprise grade",
    titlePrefix: "Enterprise",
    titleCircled: "software",
    titleSuffix: "done right",
    cards: [
      {
        icon: "🌍",
        title: "Open Source",
        desc: "Built on a community of 30k+ developers. Available in Community (free) and Enterprise editions.",
        badge: "Community",
      },
      {
        icon: "🔒",
        title: "No vendor lock-in",
        desc: "Your data stays yours. Self-host on any infrastructure or use our cloud — full flexibility.",
        badge: "Self-host",
      },
      {
        icon: "🤖",
        title: "Open Source + AI",
        desc: "Use Adon AI to develop with an ultra-cost-efficient mindset. All models trained on our source code.",
        badge: "40k+ apps",
      },
      {
        icon: "💰",
        title: "Fair pricing",
        desc: "No module pricing, no feature upselling, no long-term contracts — one transparent price per user.",
        badge: "Transparent",
      },
    ],
  },
  stats: {
    tag: "✦ Trusted worldwide",
    title: "Scale with confidence",
    items: [
      { value: "15M+", label: "Businesses worldwide" },
      { value: "50+", label: "Integrated apps" },
      { value: "99.9%", label: "Uptime guaranteed" },
      { value: "4.8★", label: "Customer rating" },
    ],
  },
  testimonials: {
    tag: "✦ Stories",
    title: "Loved by teams",
    extraQuote:
      "Adon is so full of a software Army Knife. You can tailor it to your business requirements. This is one of the key reasons that has helped us implement Adon successfully.",
    extraAuthor: "Richard Miles",
    extraRole: "Training Manager, Enterprise Corp",
  },
  cta: {
    title: "Unleash your growth potential",
    description:
      "Build recurring revenue workflows with automated billing, renewals, payments, and customer retention inside Adon ERP.",
  },
} as const;

export default enMessages;

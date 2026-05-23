export type AppItem = {
  name: string;
  icon: string;
  color: string;
};

export type FeatureItem = {
  icon: string;
  title: string;
  desc: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  score: number;
};

export const APPS: AppItem[] = [
  { name: "Accounting", icon: "📊", color: "#e8d5f5" },
  { name: "Knowledge", icon: "📘", color: "#d5e8f5" },
  { name: "Sign", icon: "✍️", color: "#d5f5e8" },
  { name: "CRM", icon: "🤝", color: "#f5e8d5" },
  { name: "Studio", icon: "🛠️", color: "#f5d5e8" },
  { name: "Subscribe", icon: "🔄", color: "#e8f5d5" },
  { name: "AI", icon: "🤖", color: "#fffbe6" },
  { name: "Point Sale", icon: "🏪", color: "#d5f5f5" },
  { name: "Discuss", icon: "💬", color: "#ede8ff" },
  { name: "Documents", icon: "📂", color: "#fff0e6" },
  { name: "Project", icon: "✅", color: "#d5eeff" },
  { name: "Timesheets", icon: "⏱️", color: "#d5ffe8" },
  { name: "Field Svc", icon: "⚡", color: "#ffe8e8" },
  { name: "Planning", icon: "🔀", color: "#e8e8ff" },
  { name: "Helpdesk", icon: "🎯", color: "#ffe8f5" },
  { name: "eCommerce", icon: "🛍️", color: "#e8ffe8" },
  { name: "Website", icon: "🌐", color: "#fff8d5" },
  { name: "Email Mktg", icon: "🚀", color: "#d5f0ff" },
  { name: "Purchase", icon: "💳", color: "#f0d5ff" },
  { name: "Inventory", icon: "📦", color: "#d5ffd5" },
  { name: "Manufactur", icon: "🏭", color: "#ffd5f0" },
  { name: "Sales", icon: "📈", color: "#f0ffd5" },
  { name: "HR", icon: "👥", color: "#d5e8f0" },
  { name: "Dashboard", icon: "🎛️", color: "#f0e8d5" },
];

export const ALTS: Record<string, string> = {
  Accounting: "Quickbooks",
  Knowledge: "Notion",
  Sign: "DocuSign",
  CRM: "Salesforce",
  Subscribe: "Chargebee",
  "Point Sale": "Lightspeed",
  Discuss: "Slack",
  Project: "Asana",
  Timesheets: "Harvest",
  "Field Svc": "Service Cloud",
  Helpdesk: "Zendesk",
  eCommerce: "Shopify",
  "Email Mktg": "Hubspot",
  HR: "BambooHR",
  Dashboard: "Tableau",
};

export const FEATURES: FeatureItem[] = [
  {
    icon: "⚡",
    title: "Automated renewals",
    desc: "Renew contracts and invoices automatically without manual tracking.",
  },
  {
    icon: "👤",
    title: "Customer portal",
    desc: "Let customers view plans, invoices, and payment history securely.",
  },
  {
    icon: "📄",
    title: "Recurring invoices",
    desc: "Generate invoices based on billing cycles and contract rules.",
  },
  {
    icon: "💳",
    title: "Payment automation",
    desc: "Collect payments, retry failed charges, keep billing updated.",
  },
  {
    icon: "📊",
    title: "Revenue analytics",
    desc: "Track MRR, ARR, churn, renewals, and lifetime value in real time.",
  },
  {
    icon: "🛡️",
    title: "Retention flows",
    desc: "Trigger smart follow-ups before renewals or cancellation risks.",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Nazmus Sadat",
    role: "Project Manager, Net Reputation",
    quote:
      "Adon ERP cut our billing time by 70%. Every invoice runs itself now.",
    avatar: "🌸",
    score: 5,
  },
  {
    name: "David Rayan",
    role: "CEO, Reputation Prime",
    quote: "The accounting module alone replaced three separate tools we used.",
    avatar: "🎯",
    score: 5,
  },
  {
    name: "Md Mosarouf Hossain",
    role: "CFO, Gravionne",
    quote: "We grew 3× without hiring extra finance staff. That says it all.",
    avatar: "🌿",
    score: 5,
  },
];

import { productInventory } from "@/lib/product-inventory";
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

export const APPS: AppItem[] = productInventory.modules.map((module) => ({ name: module.titleKey, icon: "", color: "#1088ef" }));

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

// Endorsements are withheld until evidence and publication consent are documented.
export const TESTIMONIALS: TestimonialItem[] = [];

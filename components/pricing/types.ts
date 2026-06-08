export type BillingCycle = "yearly" | "semiannual" | "quarterly" | "monthly";
export type CurrencyCode = "BDT" | "USD";
export type PageType = "pricing" | "standard" | "success-packs";

export interface PlanFeature {
  projectManagement: boolean;
  emailPhoneSupport: boolean;
  trainingCoaching: boolean;
  configuration: boolean;
  dataImport: boolean;
  onsiteConsulting: boolean;
  customization: boolean;
  development: boolean;
  performanceIssues: boolean;
}

export interface SuccessPack {
  id: string;
  nameKey: string;
  color: string;
  hours: number;
  priceNew: number;
  priceReturning: number;
  recommendedKey: string;
  features: PlanFeature;
  highlighted?: boolean;
}

export interface ERPPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string | null;
  icon: string;
  accent: string;
  users: number;
  currency: CurrencyCode;
  setupFee: number;
  quarterlyFee?: number;
  monthlyFee?: number;
  serverFee?: number;
  cta: string;
  features: string[];
}

import type {
  PricingPageData,
  PricingPlanData,
} from "@/lib/pricing/types";

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

export type ERPPlan = PricingPlanData;
export type PricingContent = PricingPageData;

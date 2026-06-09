import { z } from "zod";

const localeSchema = z.enum(["en", "bn"]);
const currencySchema = z.enum(["BDT", "USD"]).optional();

export const pricingSettingsSchema = z.object({
  pricingPageEnabled: z.boolean(),
});

export const pricingPlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  badge: z.string().nullable().optional(),
  icon: z.string().min(1),
  accent: z.string().min(1),
  users: z.union([z.number().int().positive(), z.string().min(1)]).optional(),
  currency: currencySchema,
  setupFee: z.number().nonnegative().optional(),
  monthlyFee: z.number().nonnegative().optional(),
  quarterlyFee: z.number().nonnegative().optional(),
  serverFee: z.number().nonnegative().optional(),
  cta: z.string().min(1),
  order: z.number().int().nonnegative(),
  enabled: z.boolean(),
  features: z.array(z.string().min(1)),
});

export const pricingFaqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int().nonnegative(),
  enabled: z.boolean(),
});

export const pricingModuleSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1),
  order: z.number().int().nonnegative(),
  enabled: z.boolean(),
});

export const pricingContentSectionsSchema = z.object({
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  hero: z.record(z.any()),
  packagePricing: z.record(z.any()),
  includedFeaturesHeading: z.string().optional(),
  bottomNote: z.record(z.any()),
  modulesTitle: z.string().optional(),
  faqMeta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  finalCta: z.record(z.any()),
  standardPlanPage: z.record(z.any()),
  successPacksPage: z.record(z.any()),
  successPacksFaqMeta: z.object({
    title: z.string().optional(),
  }),
});

export const pricingAdminPayloadSchema = z.object({
  locale: localeSchema,
  settings: pricingSettingsSchema,
  sections: pricingContentSectionsSchema,
  plans: z.array(pricingPlanSchema),
  pricingFaqs: z.array(pricingFaqSchema),
  successFaqs: z.array(pricingFaqSchema),
  modules: z.array(pricingModuleSchema),
});

export const pricingAdminQuerySchema = z.object({
  locale: localeSchema.default("en"),
});

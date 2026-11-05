import { z } from "zod";

export const DEMO_MODULES = [
  "Accounting",
  "Manufacturing",
  "Quality (QMS)",
  "Inventory",
  "Sales & CRM",
  "HR & Payroll",
  "University",
  "Other",
] as const;
export const DEMO_STATUSES = [
  "NEW",
  "CONTACTED",
  "SCHEDULED",
  "CLOSED",
] as const;
export type DemoRequestStatus = (typeof DEMO_STATUSES)[number];
const name = (max: number) =>
  z
    .string()
    .trim()
    .min(2, "Please enter at least two characters.")
    .max(max)
    .regex(/^[^\u0000-\u001f\u007f]*$/, "Please remove control characters.");
const phoneField = z
  .string()
  .trim()
  .max(40)
  .regex(/^\+?[0-9\s().-]+$/, "Enter a valid phone number.")
  .refine((value) => {
    const n = value.replace(/\D/g, "").length;
    return n >= 7 && n <= 15;
  }, "Enter a phone number with 7–15 digits.");
const normalizePhone = (value: string) =>
  (value.startsWith("+") ? "+" : "") + value.replace(/\D/g, "");
export const demoDetailsSchema = z
  .object({
    fullName: name(120),
    companyName: name(160),
    phone: phoneField,
    shareMore: z.boolean().default(false),
    email: z.string().trim().max(254).default(""),
    modules: z.array(z.enum(DEMO_MODULES)).max(DEMO_MODULES.length).default([]),
    message: z
      .string()
      .trim()
      .max(2000, "Use no more than 2,000 characters.")
      .default(""),
  })
  .superRefine((value, context) => {
    if (
      value.shareMore &&
      value.email &&
      !z.string().email().safeParse(value.email).success
    )
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Enter a valid email address or leave it blank.",
      });
  })
  .transform((value) => ({
    ...value,
    phone: normalizePhone(value.phone),
    email: value.shareMore ? value.email.toLowerCase() : "",
    modules: value.shareMore ? [...new Set(value.modules)].sort() : [],
    message: value.shareMore ? value.message : "",
  }));
export type DemoDetails = z.infer<typeof demoDetailsSchema>;
export const EMPTY_DEMO_DETAILS: DemoDetails = {
  fullName: "",
  companyName: "",
  phone: "",
  shareMore: false,
  email: "",
  modules: [],
  message: "",
};
export const demoSubmissionSchema = z
  .object({
    details: z
      .object({
        fullName: z.unknown(),
        companyName: z.unknown(),
        phone: z.unknown(),
        shareMore: z.unknown().optional(),
        email: z.unknown().optional(),
        modules: z.unknown().optional(),
        message: z.unknown().optional(),
      })
      .strict()
      .pipe(demoDetailsSchema),
    requestKey: z.string().uuid(),
    locale: z
      .enum(["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"])
      .default("en"),
    website: z.string().max(0).default(""),
  })
  .strict();
export type DemoSubmission = z.infer<typeof demoSubmissionSchema>;
export const demoReceiptSchema = z.object({
  saved: z.literal(true),
  requestId: z.string().uuid(),
});
export const demoAdminQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  status: z.enum(["ALL", ...DEMO_STATUSES]).default("ALL"),
  page: z.coerce.number().int().min(1).max(10000).default(1),
});
const adminEmail = z
  .string()
  .trim()
  .max(254)
  .refine(
    (value) => !value || z.string().email().safeParse(value).success,
    "Enter a valid email address or leave it blank.",
  )
  .transform((value) => value.toLowerCase());
const adminModules = z
  .array(z.enum(DEMO_MODULES))
  .max(DEMO_MODULES.length)
  .transform((value) => [...new Set(value)].sort());
const adminMessage = z
  .string()
  .trim()
  .max(2000, "Use no more than 2,000 characters.");
const adminNotes = z.string().trim().max(4000);
const demoStatus = z.enum(DEMO_STATUSES);

/** Admin "New request" (manual entry, e.g. a lead received by phone). */
export const demoAdminCreateSchema = z
  .object({
    fullName: name(120),
    companyName: name(160),
    phone: phoneField.transform(normalizePhone),
    email: adminEmail.default(""),
    modules: adminModules.default([]),
    message: adminMessage.default(""),
    status: demoStatus.default("NEW"),
    adminNotes: adminNotes.default(""),
  })
  .strict();
export type DemoAdminCreate = z.infer<typeof demoAdminCreateSchema>;

/**
 * Admin update. `id` + `version` are required (optimistic locking); every other
 * field is optional so the same endpoint serves quick status changes and the
 * full edit form.
 */
export const demoAdminUpdateSchema = z
  .object({
    id: z.string().uuid(),
    version: z.number().int().min(0),
    status: demoStatus.optional(),
    adminNotes: adminNotes.optional(),
    fullName: name(120).optional(),
    companyName: name(160).optional(),
    phone: phoneField.transform(normalizePhone).optional(),
    email: adminEmail.optional(),
    modules: adminModules.optional(),
    message: adminMessage.optional(),
  })
  .strict();
export type DemoAdminUpdate = z.infer<typeof demoAdminUpdateSchema>;

export const demoAdminDeleteSchema = z
  .object({ id: z.string().uuid() })
  .strict();

export type DemoRequestRow = {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  shareMore: boolean;
  email: string | null;
  modules: string[];
  message: string | null;
  locale: string;
  status: DemoRequestStatus;
  adminNotes: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};
export type DemoAdminData = {
  requests: DemoRequestRow[];
  total: number;
  page: number;
  pageSize: number;
  counts: Record<DemoRequestStatus, number>;
};

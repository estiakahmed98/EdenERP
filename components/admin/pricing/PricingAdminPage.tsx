"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  CircleHelp,
  CreditCard,
  ExternalLink,
  Layers,
  LayoutTemplate,
  Megaphone,
  Package,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { PricingLocale, PricingPageData, PricingSiteConfig } from "@/lib/pricing/types";
import { languageNames, locales } from "@/i18n/config";
import { useTranslations } from "next-intl";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type EditableItem = {
  id?: string;
  order: number;
  enabled: boolean;
};

type EditableFaq = EditableItem & {
  question: string;
  answer: string;
};

type EditableModule = EditableItem & {
  label: string;
};

type EditablePlan = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  icon: string;
  accent: string;
  users: string;
  currency: "BDT" | "USD";
  setupFee: string;
  monthlyFee: string;
  quarterlyFee: string;
  serverFee: string;
  cta: string;
  order: number;
  enabled: boolean;
  features: string[];
};

type FormState = {
  pricingPageEnabled: boolean;
  metadataTitle: string;
  metadataDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  billingYearly: string;
  billingSemiannual: string;
  billingQuarterly: string;
  billingMonthly: string;
  billingYearlyDiscount: string;
  billingSemiannualDiscount: string;
  billingQuarterlyDiscount: string;
  currencyRate: string;
  perYear: string;
  perUserPerMonth: string;
  totalPerMonth: string;
  youSave: string;
  oneTimeSetup: string;
  monthlyCharge: string;
  serverMaintenance: string;
  usersLabel: string;
  includedFeaturesHeading: string;
  bottomNoteText: string;
  bottomNoteSuccessPacks: string;
  bottomNoteContactSales: string;
  modulesTitle: string;
  pricingFaqTitle: string;
  pricingFaqDescription: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButton: string;
  standardBackButton: string;
  standardTitle: string;
  standardDescription: string;
  standardUserCountLabel: string;
  standardImplementationLabel: string;
  standardSuccessPack: string;
  standardSuccessPackSublabel: string;
  standardSuccessPackMessage: string;
  standardReadMoreButton: string;
  standardTotalPerMonth: string;
  standardBuyNow: string;
  standardFirstYearDiscount: string;
  standardPerUserNote: string;
  standardQuotaPrint: string;
  successBackButton: string;
  successTitle: string;
  successDescription: string;
  successEstimatorBadge: string;
  successFeatureHeader: string;
  successFaqTitle: string;
  successNotes: string[];
  modules: EditableModule[];
  pricingFaqs: EditableFaq[];
  successFaqs: EditableFaq[];
  plans: EditablePlan[];
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const clone = [...items];
  const [item] = clone.splice(index, 1);
  clone.splice(nextIndex, 0, item);
  return clone;
}

function resequence<T extends { order: number }>(items: T[]) {
  return items.map((item, index) => ({ ...item, order: index }));
}

function parseOptionalNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function compactTextList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

type SanitizedPlan = {
  id: string;
  name: string;
  tagline: string;
  badge: string | null;
  icon: string;
  accent: string;
  users: number | string | undefined;
  currency: "BDT" | "USD";
  setupFee: number | undefined;
  monthlyFee: number | undefined;
  quarterlyFee: number | undefined;
  serverFee: number | undefined;
  cta: string;
  order: number;
  enabled: boolean;
  features: string[];
};

function buildFormState(
  settings: PricingSiteConfig,
  pageData: PricingPageData,
): FormState {
  return {
    pricingPageEnabled: settings.pricingPageEnabled,
    metadataTitle: pageData.metadata.title ?? "",
    metadataDescription: pageData.metadata.description ?? "",
    heroEyebrow: pageData.hero.eyebrow ?? "",
    heroTitle: pageData.hero.title ?? "",
    heroTitleHighlight: pageData.hero.titleHighlight ?? "",
    heroDescription: pageData.hero.description ?? "",
    billingYearly: pageData.hero.billingToggle?.yearly ?? "",
    billingSemiannual: pageData.hero.billingToggle?.semiannual ?? "",
    billingQuarterly: pageData.hero.billingToggle?.quarterly ?? "",
    billingMonthly: pageData.hero.billingToggle?.monthly ?? "",
    billingYearlyDiscount: pageData.hero.billingToggle?.yearlyDiscount ?? "",
    billingSemiannualDiscount:
      pageData.hero.billingToggle?.semiannualDiscount ?? "",
    billingQuarterlyDiscount:
      pageData.hero.billingToggle?.quarterlyDiscount ?? "",
    currencyRate: pageData.packagePricing.currencyRate ?? "",
    perYear: pageData.packagePricing.perYear ?? "",
    perUserPerMonth: pageData.packagePricing.perUserPerMonth ?? "",
    totalPerMonth: pageData.packagePricing.totalPerMonth ?? "",
    youSave: pageData.packagePricing.youSave ?? "",
    oneTimeSetup: pageData.packagePricing.oneTimeSetup ?? "",
    monthlyCharge: pageData.packagePricing.monthlyCharge ?? "",
    serverMaintenance: pageData.packagePricing.serverMaintenance ?? "",
    usersLabel: pageData.packagePricing.usersLabel ?? "",
    includedFeaturesHeading: pageData.includedFeaturesHeading ?? "",
    bottomNoteText: pageData.bottomNote.text ?? "",
    bottomNoteSuccessPacks: pageData.bottomNote.buttons?.successPacks ?? "",
    bottomNoteContactSales: pageData.bottomNote.buttons?.contactSales ?? "",
    modulesTitle: pageData.modules.title ?? "",
    pricingFaqTitle: pageData.faq.title ?? "",
    pricingFaqDescription: pageData.faq.description ?? "",
    finalCtaTitle: pageData.finalCta.title ?? "",
    finalCtaDescription: pageData.finalCta.description ?? "",
    finalCtaButton: pageData.finalCta.button ?? "",
    standardBackButton: pageData.standardPlanPage.backButton ?? "",
    standardTitle: pageData.standardPlanPage.title ?? "",
    standardDescription: pageData.standardPlanPage.description ?? "",
    standardUserCountLabel: pageData.standardPlanPage.userCountLabel ?? "",
    standardImplementationLabel:
      pageData.standardPlanPage.implementationLabel ?? "",
    standardSuccessPack:
      pageData.standardPlanPage.implementationOptions?.successPack ?? "",
    standardSuccessPackSublabel:
      pageData.standardPlanPage.implementationOptions?.successPackSublabel ??
      "",
    standardSuccessPackMessage:
      pageData.standardPlanPage.successPackMessage?.text ?? "",
    standardReadMoreButton:
      pageData.standardPlanPage.successPackMessage?.readMoreButton ?? "",
    standardTotalPerMonth:
      pageData.standardPlanPage.priceSummary?.totalPerMonth ?? "",
    standardBuyNow: pageData.standardPlanPage.priceSummary?.buyNow ?? "",
    standardFirstYearDiscount:
      pageData.standardPlanPage.priceSummary?.firstYearDiscount ?? "",
    standardPerUserNote:
      pageData.standardPlanPage.priceSummary?.perUserNote ?? "",
    standardQuotaPrint:
      pageData.standardPlanPage.priceSummary?.quotaPrint ?? "",
    successBackButton: pageData.successPacksPage.backButton ?? "",
    successTitle: pageData.successPacksPage.title ?? "",
    successDescription: pageData.successPacksPage.description ?? "",
    successEstimatorBadge: pageData.successPacksPage.estimatorBadge ?? "",
    successFeatureHeader:
      pageData.successPacksPage.comparisonTable?.featureHeader ?? "",
    successFaqTitle: pageData.successPacksPage.faq.title ?? "",
    successNotes: [...(pageData.successPacksPage.notes ?? [])],
    modules: pageData.modules.list.map((label, index) => ({
      label,
      order: index,
      enabled: true,
    })),
    pricingFaqs: pageData.faq.items.map((faq, index) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      order: index,
      enabled: faq.enabled ?? true,
    })),
    successFaqs: pageData.successPacksPage.faq.items.map((faq, index) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      order: index,
      enabled: faq.enabled ?? true,
    })),
    plans: pageData.erpPackages.map((plan, index) => ({
      id: plan.id,
      name: plan.name,
      tagline: plan.tagline,
      badge: plan.badge ?? "",
      icon: plan.icon,
      accent: plan.accent,
      users: plan.users?.toString() ?? "",
      currency: plan.currency ?? "BDT",
      setupFee: plan.setupFee?.toString() ?? "",
      monthlyFee: plan.monthlyFee?.toString() ?? "",
      quarterlyFee: plan.quarterlyFee?.toString() ?? "",
      serverFee: plan.serverFee?.toString() ?? "",
      cta: plan.cta,
      order: plan.order ?? index,
      enabled: plan.enabled,
      features: [...plan.features],
    })),
  };
}

interface PricingAdminPageProps {
  initialData: {
    settings: PricingSiteConfig;
    pageData: PricingPageData;
    plans: Array<{
      id: string;
      name: string;
      tagline: string;
      badge?: string | null;
      icon: string;
      accent: string;
      users?: number | string;
      currency?: "BDT" | "USD";
      setupFee?: number;
      monthlyFee?: number;
      quarterlyFee?: number;
      serverFee?: number;
      cta: string;
      order: number;
      enabled: boolean;
      features: string[];
    }>;
    faqs: Array<{
      id: string;
      pageType: string;
      question: string;
      answer: string;
      order: number;
      enabled: boolean;
    }>;
    modules: Array<{
      id: string;
      label: string;
      order: number;
      enabled: boolean;
    }>;
  };
}

function buildAdminFormState(
  initialData: PricingAdminPageProps["initialData"],
) {
  const { settings, pageData, plans, faqs, modules } = initialData;
  const form = buildFormState(settings, pageData);
  return {
    ...form,
    modules:
      modules.length > 0
        ? modules.map((module) => ({
            id: module.id,
            label: module.label,
            order: module.order,
            enabled: module.enabled,
          }))
        : form.modules,
    pricingFaqs:
      faqs.filter((faq) => faq.pageType === "pricing").length > 0
        ? faqs
            .filter((faq) => faq.pageType === "pricing")
            .map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
              order: faq.order,
              enabled: faq.enabled,
            }))
        : form.pricingFaqs,
    successFaqs:
      faqs.filter((faq) => faq.pageType === "success-packs").length > 0
        ? faqs
            .filter((faq) => faq.pageType === "success-packs")
            .map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
              order: faq.order,
              enabled: faq.enabled,
            }))
        : form.successFaqs,
    plans:
      plans.length > 0
        ? plans.map((plan, index) => ({
            id: plan.id,
            name: plan.name,
            tagline: plan.tagline,
            badge: plan.badge ?? "",
            icon: plan.icon,
            accent: plan.accent,
            users: plan.users?.toString() ?? "",
            currency: plan.currency ?? "BDT",
            setupFee: plan.setupFee?.toString() ?? "",
            monthlyFee: plan.monthlyFee?.toString() ?? "",
            quarterlyFee: plan.quarterlyFee?.toString() ?? "",
            serverFee: plan.serverFee?.toString() ?? "",
            cta: plan.cta,
            order: plan.order ?? index,
            enabled: plan.enabled,
            features: [...plan.features],
          }))
        : form.plans,
  };
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border ${className}`}
    >
      <h2 className="mb-5 flex items-center gap-2.5 text-base font-bold text-foreground">
        <span className="h-5 w-1.5 rounded-full bg-linear-to-b from-primary to-secondary" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function PlanCard({
  plan,
  index,
  isActive,
  totalPlans,
  onActivate,
  onChange,
  onMove,
  onDelete,
}: {
  plan: EditablePlan;
  index: number;
  isActive: boolean;
  totalPlans: number;
  onActivate: () => void;
  onChange: (updated: EditablePlan) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}) {
  const t = useTranslations("admin.pricing");
  const update = (patch: Partial<EditablePlan>) =>
    onChange({ ...plan, ...patch });

  return (
    <div
      onClick={onActivate}
      className={[
        "w-[280px] shrink-0 cursor-pointer rounded-xl border bg-card p-4 transition-all",
        isActive
          ? "border-[2px] shadow-sm"
          : "border-border opacity-70 hover:opacity-90",
      ].join(" ")}
      style={isActive ? { borderColor: plan.accent } : {}}
    >
      {/* Card header */}
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
          style={{ background: `${plan.accent}18` }}
        >
          {plan.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">
            {plan.name || t("unnamedPlan")}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {plan.tagline || "—"}
          </div>
        </div>
        <span
          className={[
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            plan.enabled
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {plan.enabled ? t("on") : t("off")}
        </span>
      </div>

      {/* Controls row */}
      <div
        className="mb-3 flex items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <Switch
          aria-label={t("planEnabled")}
          checked={plan.enabled}
          onCheckedChange={(checked) => update({ enabled: checked })}
        />
        <span className="ms-1 flex-1 text-xs text-muted-foreground">
          {t("enabled")}
        </span>
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          ←
        </button>
        <button
          type="button"
          disabled={index === totalPlans - 1}
          onClick={() => onMove(1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => {
            if (!window.confirm(t("deleteThisPlan"))) return;
            onDelete();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-destructive/20 text-destructive hover:bg-destructive/10"
        >
          ✕
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-2 text-sm" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-2 gap-2">
          <Field label={t("key")}>
            <Input
              className="h-8 text-xs"
              value={plan.id}
              onChange={(e) => update({ id: e.target.value })}
              placeholder="plan-key"
            />
          </Field>
          <Field label={t("name")}>
            <Input
              className="h-8 text-xs"
              value={plan.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder={t("planName")}
            />
          </Field>
        </div>
        <Field label={t("tagline")}>
          <Input
            className="h-8 text-xs"
            value={plan.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
            placeholder={t("shortTagline")}
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label={t("badge")}>
            <Input
              className="h-8 text-xs"
              value={plan.badge}
              onChange={(e) => update({ badge: e.target.value })}
              placeholder={t("eGPopular")}
            />
          </Field>
          <Field label={t("icon")}>
            <Input
              className="h-8 text-xs"
              value={plan.icon}
              onChange={(e) => update({ icon: e.target.value })}
              placeholder="📦"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label={t("accentColor")}>
            <input
              type="color"
              value={plan.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="h-8 w-full cursor-pointer rounded-md border border-border px-1 py-0.5"
            />
          </Field>
          <Field label={t("currency")}>
            <select
              value={plan.currency}
              onChange={(e) =>
                update({ currency: e.target.value as "BDT" | "USD" })
              }
              className="h-8 w-full rounded-md border border-border px-2 text-xs text-foreground/80"
            >
              <option value="BDT">BDT</option>
              <option value="USD">USD</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label={t("users")}>
            <Input
              className="h-8 text-xs"
              value={plan.users}
              onChange={(e) => update({ users: e.target.value })}
              placeholder={t("eG10")}
            />
          </Field>
          <Field label={t("ctaText")}>
            <Input
              className="h-8 text-xs"
              value={plan.cta}
              onChange={(e) => update({ cta: e.target.value })}
              placeholder={t("getStarted")}
            />
          </Field>
        </div>

        {/* Pricing */}
        <div className="rounded-lg bg-muted/50 p-2.5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t("pricing")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Field label={t("setupFee")}>
              <Input
                className="h-8 text-xs bg-card border border-border"
                value={plan.setupFee}
                onChange={(e) => update({ setupFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label={t("monthlyFee")}>
              <Input
                className="h-8 text-xs bg-card border border-border"
                value={plan.monthlyFee}
                onChange={(e) => update({ monthlyFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label={t("quarterlyFee")}>
              <Input
                className="h-8 text-xs bg-card border border-border"
                value={plan.quarterlyFee}
                onChange={(e) => update({ quarterlyFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label={t("serverFee")}>
              <Input
                className="h-8 text-xs bg-card border border-border"
                value={plan.serverFee}
                onChange={(e) => update({ serverFee: e.target.value })}
                placeholder="0"
              />
            </Field>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t("features")}
            </p>
            <button
              type="button"
              onClick={() => update({ features: [...plan.features, ""] })}
              className="text-[11px] text-primary hover:underline"
            >
              {t("add")}
            </button>
          </div>
          <div className="space-y-1.5">
            {plan.features.map((feature, fi) => (
              <div key={fi} className="flex gap-1.5">
                <Input
                  className="h-7 flex-1 text-xs"
                  value={feature}
                  onChange={(e) =>
                    update({
                      features: plan.features.map((f, idx) =>
                        idx === fi ? e.target.value : f,
                      ),
                    })
                  }
                  placeholder={t("featureText")}
                />
                <button
                  type="button"
                  onClick={() =>
                    update({
                      features: plan.features.filter((_, idx) => idx !== fi),
                    })
                  }
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-destructive/20 text-xs text-destructive hover:bg-destructive/10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqList({
  faqs,
  onChange,
}: {
  faqs: EditableFaq[];
  onChange: (updated: EditableFaq[]) => void;
}) {
  const t = useTranslations("admin.pricing");
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-border p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <Switch
              aria-label={t("faqEnabled")}
              checked={faq.enabled}
              onCheckedChange={(checked) =>
                onChange(
                  faqs.map((item, i) =>
                    i === index ? { ...item, enabled: checked } : item,
                  ),
                )
              }
            />
            <span className="flex-1 text-xs text-muted-foreground">
              {t("enabled")}
            </span>
            <button
              type="button"
              onClick={() => onChange(resequence(moveItem(faqs, index, -1)))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-muted"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => onChange(resequence(moveItem(faqs, index, 1)))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-muted"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => {
                if (!window.confirm(t("deleteThisFaq"))) return;
                onChange(resequence(faqs.filter((_, i) => i !== index)));
              }}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-destructive/20 text-xs text-destructive hover:bg-destructive/10"
            >
              ✕
            </button>
          </div>
          <Input
            className="mb-2 h-8 text-sm"
            value={faq.question}
            onChange={(e) =>
              onChange(
                faqs.map((item, i) =>
                  i === index ? { ...item, question: e.target.value } : item,
                ),
              )
            }
            placeholder={t("question")}
          />
          <Textarea
            className="text-sm"
            value={faq.answer}
            onChange={(e) =>
              onChange(
                faqs.map((item, i) =>
                  i === index ? { ...item, answer: e.target.value } : item,
                ),
              )
            }
            placeholder={t("answer")}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

type TabKey = "general" | "packages" | "plans" | "modules" | "faqs" | "standard";
const TABS: { key: TabKey; labelKey: string; icon: LucideIcon }[] = [
  { key: "general", labelKey: "tabs.general", icon: LayoutTemplate },
  { key: "packages", labelKey: "tabs.packages", icon: Megaphone },
  { key: "plans", labelKey: "tabs.plans", icon: CreditCard },
  { key: "modules", labelKey: "tabs.modules", icon: Layers },
  { key: "faqs", labelKey: "tabs.faqs", icon: CircleHelp },
  { key: "standard", labelKey: "tabs.standard", icon: Package },
];

export default function PricingAdminPage({
  initialData,
}: PricingAdminPageProps) {
  const t = useTranslations("admin.pricing");
  const [tab, setTab] = useState<TabKey>("general");
  const [, setMeasured] = useState(0);
  useEffect(() => {
    // The carousel centres on its container width, which is only known after mount.
    if (tab === "plans") setMeasured((n) => n + 1);
  }, [tab]);
  const [locale, setLocale] = useState<PricingLocale>(
    initialData.pageData.locale,
  );
  const [form, setForm] = useState<FormState>(buildAdminFormState(initialData));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialSnapshotRef = useRef<string>(
    JSON.stringify(buildAdminFormState(initialData)),
  );

  const isDirty = useMemo(
    () => JSON.stringify(form) !== initialSnapshotRef.current,
    [form],
  );

  /* Carousel state */
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((current) => ({ ...current, [key]: value })),
    [],
  );

  function updatePlan(index: number, updated: EditablePlan) {
    updateField(
      "plans",
      form.plans.map((p, i) => (i === index ? updated : p)),
    );
  }

  function movePlan(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= form.plans.length) return;
    updateField("plans", resequence(moveItem(form.plans, index, direction)));
    setActivePlanIndex(next);
  }

  function deletePlan(index: number) {
    updateField("plans", resequence(form.plans.filter((_, i) => i !== index)));
    setActivePlanIndex(
      Math.max(0, Math.min(activePlanIndex, form.plans.length - 2)),
    );
  }

  async function loadLocale(nextLocale: PricingLocale) {
    setLocale(nextLocale);
    setStatus(null);
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/admin/pricing?locale=${nextLocale}`);
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? t("loadLocaleFailed"));
        return;
      }
      const nextForm = buildAdminFormState(payload);
      setForm(nextForm);
      initialSnapshotRef.current = JSON.stringify(nextForm);
      setActivePlanIndex(0);
    });
  }

  async function handleSave() {
    setStatus(null);
    setError(null);

    const sanitizedPlans = resequence(form.plans)
      .map((plan) => {
        const trimmedId = plan.id.trim();
        const trimmedName = plan.name.trim();
        const trimmedTagline = plan.tagline.trim();
        const trimmedCta = plan.cta.trim();

        if (!trimmedId || !trimmedName || !trimmedTagline || !trimmedCta) {
          return null;
        }

        const trimmedUsers = plan.users.trim();

        return {
          ...plan,
          id: trimmedId,
          name: trimmedName,
          tagline: trimmedTagline,
          badge: plan.badge.trim() || null,
          icon: plan.icon.trim() || "📦",
          accent: plan.accent.trim() || "#1D9E75",
          users: trimmedUsers
            ? /^\d+$/.test(trimmedUsers)
              ? Number(trimmedUsers)
              : trimmedUsers
            : undefined,
          setupFee: parseOptionalNumber(plan.setupFee),
          monthlyFee: parseOptionalNumber(plan.monthlyFee),
          quarterlyFee: parseOptionalNumber(plan.quarterlyFee),
          serverFee: parseOptionalNumber(plan.serverFee),
          cta: trimmedCta,
          features: compactTextList(plan.features),
        };
      })
      .filter((plan): plan is SanitizedPlan => plan !== null);

    const planIds = sanitizedPlans.map((plan) => plan.id);
    const duplicatePlanIds = planIds.filter(
      (planId, index) => planIds.indexOf(planId) !== index,
    );

    if (duplicatePlanIds.length > 0) {
      setError(
        t("duplicatePlanKey", {
          keys: Array.from(new Set(duplicatePlanIds)).join(", "),
        }),
      );
      return;
    }

    const sanitizedPricingFaqs = resequence(form.pricingFaqs)
      .map((faq) => ({
        ...faq,
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer);

    const sanitizedSuccessFaqs = resequence(form.successFaqs)
      .map((faq) => ({
        ...faq,
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer);

    const sanitizedModules = resequence(form.modules)
      .map((module) => ({
        ...module,
        label: module.label.trim(),
      }))
      .filter((module) => module.label);

    const payload = {
      locale,
      settings: { pricingPageEnabled: form.pricingPageEnabled },
      sections: {
        metadata: {
          title: form.metadataTitle,
          description: form.metadataDescription,
        },
        hero: {
          eyebrow: form.heroEyebrow,
          title: form.heroTitle,
          titleHighlight: form.heroTitleHighlight,
          description: form.heroDescription,
          billingToggle: {
            yearly: form.billingYearly,
            semiannual: form.billingSemiannual,
            quarterly: form.billingQuarterly,
            monthly: form.billingMonthly,
            yearlyDiscount: form.billingYearlyDiscount,
            semiannualDiscount: form.billingSemiannualDiscount,
            quarterlyDiscount: form.billingQuarterlyDiscount,
          },
        },
        packagePricing: {
          currencyRate: form.currencyRate,
          perYear: form.perYear,
          perUserPerMonth: form.perUserPerMonth,
          totalPerMonth: form.totalPerMonth,
          youSave: form.youSave,
          oneTimeSetup: form.oneTimeSetup,
          monthlyCharge: form.monthlyCharge,
          serverMaintenance: form.serverMaintenance,
          usersLabel: form.usersLabel,
        },
        includedFeaturesHeading: form.includedFeaturesHeading,
        bottomNote: {
          text: form.bottomNoteText,
          buttons: {
            successPacks: form.bottomNoteSuccessPacks,
            contactSales: form.bottomNoteContactSales,
          },
        },
        modulesTitle: form.modulesTitle,
        faqMeta: {
          title: form.pricingFaqTitle,
          description: form.pricingFaqDescription,
        },
        finalCta: {
          title: form.finalCtaTitle,
          description: form.finalCtaDescription,
          button: form.finalCtaButton,
        },
        standardPlanPage: {
          backButton: form.standardBackButton,
          title: form.standardTitle,
          description: form.standardDescription,
          userCountLabel: form.standardUserCountLabel,
          implementationLabel: form.standardImplementationLabel,
          implementationOptions: {
            successPack: form.standardSuccessPack,
            successPackSublabel: form.standardSuccessPackSublabel,
          },
          successPackMessage: {
            text: form.standardSuccessPackMessage,
            readMoreButton: form.standardReadMoreButton,
          },
          priceSummary: {
            totalPerMonth: form.standardTotalPerMonth,
            buyNow: form.standardBuyNow,
            firstYearDiscount: form.standardFirstYearDiscount,
            perUserNote: form.standardPerUserNote,
            quotaPrint: form.standardQuotaPrint,
          },
        },
        successPacksPage: {
          backButton: form.successBackButton,
          title: form.successTitle,
          description: form.successDescription,
          estimatorBadge: form.successEstimatorBadge,
          comparisonTable: { featureHeader: form.successFeatureHeader },
          notes: form.successNotes,
        },
        successPacksFaqMeta: { title: form.successFaqTitle },
      },
      plans: sanitizedPlans,
      pricingFaqs: sanitizedPricingFaqs,
      successFaqs: sanitizedSuccessFaqs,
      modules: sanitizedModules,
    };

    startTransition(async () => {
      const response = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        const details = result.details ? JSON.stringify(result.details) : null;
        setError(
          details
            ? `${result.error ?? t("saveFailed")}: ${details}`
            : (result.error ?? t("saveFailed")),
        );
        return;
      }
      const savedForm = buildAdminFormState(result.data);
      setForm(savedForm);
      initialSnapshotRef.current = JSON.stringify(savedForm);
      setActivePlanIndex(0);
      setStatus(t("saved"));
    });
  }

  /* Carousel scroll: show active card */
  const CARD_W = 280 + 14; // card width + gap
  const carouselOffset = Math.max(
    0,
    activePlanIndex * CARD_W -
      (trackRef.current?.parentElement?.offsetWidth ?? 0) / 2 +
      CARD_W / 2,
  );

  return (
    <div className="min-h-screen p-6">
      <div className="w-full space-y-6">
        {/* ── Heading + controls ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("pricing")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("visibilityContentPlansModulesAnd")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={locale}
              onChange={(e) => loadLocale(e.target.value as PricingLocale)}
              aria-label={t("language")}
              className="h-10 rounded-xl border-0 bg-card px-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-border"
            >
              {locales.map((option) => (
                <option key={option} value={option}>{languageNames[option]}</option>
              ))}
            </select>
            <Button asChild variant="outline" className="h-10 rounded-xl">
              <a href={`/${locale}/pricing`} target="_blank" rel="noreferrer">
                <ExternalLink /> {t("preview")}
              </a>
            </Button>
          </div>
        </div>

        {/* Page enabled */}
        <div
          className={`flex items-center gap-4 rounded-3xl p-5 ring-1 transition-colors ${
            form.pricingPageEnabled
              ? "bg-linear-to-r from-primary/10 to-secondary/10 ring-primary/25"
              : "bg-muted/60 ring-border"
          }`}
        >
          <Switch
            aria-label={t("pricingPageEnabled")}
            checked={form.pricingPageEnabled}
            onCheckedChange={(checked) =>
              updateField("pricingPageEnabled", checked)
            }
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-foreground">
              {form.pricingPageEnabled ? t("pricingPageIsLive") : t("pricingPageIsHidden")}
            </div>
            <div className="text-xs text-muted-foreground">
              {form.pricingPageEnabled
                ? t("visitorsCanSeePricingIn")
                : t("pricingIsRemovedFromThe")}
            </div>
          </div>
          <span
            className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:inline ${
              form.pricingPageEnabled
                ? "bg-primary text-primary-foreground"
                : "bg-muted-foreground/20 text-muted-foreground"
            }`}
          >
            {form.pricingPageEnabled ? t("live") : t("off2")}
          </span>
        </div>

        {status && (
          <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            ✓ {status}
          </p>
        )}
        {error && (
          <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            ✕ {error}
          </p>
        )}

        {/* Section tabs */}
        <div
          role="tablist"
          aria-label={t("pricingSections")}
          className="sticky top-24 z-20 flex gap-1.5 overflow-x-auto rounded-2xl bg-card/90 p-1.5 shadow-sm ring-1 ring-border backdrop-blur-xl"
        >
          {TABS.map(({ key, labelKey, icon: Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === key
                  ? "bg-linear-to-r from-primary to-secondary text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {t(labelKey)}
            </button>
          ))}
        </div>

        {tab === "general" && (
          <div className="space-y-6">
        {/* ── Metadata & Billing ──────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={t("metadataHero")}>
            <div className="space-y-3">
              <Field label={t("pageTitle")}>
                <Input
                  value={form.metadataTitle}
                  onChange={(e) => updateField("metadataTitle", e.target.value)}
                  placeholder={t("eGPricingYourBrand")}
                />
              </Field>
              <Field label={t("metaDescription")}>
                <Textarea
                  value={form.metadataDescription}
                  onChange={(e) =>
                    updateField("metadataDescription", e.target.value)
                  }
                  placeholder={t("shortSeoDescription")}
                />
              </Field>
              <Field label={t("eyebrow")}>
                <Input
                  value={form.heroEyebrow}
                  onChange={(e) => updateField("heroEyebrow", e.target.value)}
                  placeholder={t("eGSimpleTransparent")}
                />
              </Field>
              <Field label={t("heroTitle")}>
                <Input
                  value={form.heroTitle}
                  onChange={(e) => updateField("heroTitle", e.target.value)}
                  placeholder={t("mainHeading")}
                />
              </Field>
              <Field label={t("titleHighlight")}>
                <Input
                  value={form.heroTitleHighlight}
                  onChange={(e) =>
                    updateField("heroTitleHighlight", e.target.value)
                  }
                  placeholder={t("highlightedWordS")}
                />
              </Field>
              <Field label={t("heroDescription")}>
                <Textarea
                  value={form.heroDescription}
                  onChange={(e) =>
                    updateField("heroDescription", e.target.value)
                  }
                  placeholder={t("subHeadingParagraph")}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title={t("billingLabels")}>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("yearly")}>
                <Input
                  value={form.billingYearly}
                  onChange={(e) => updateField("billingYearly", e.target.value)}
                  placeholder={t("yearly")}
                />
              </Field>
              <Field label={t("yearlyDiscount")}>
                <Input
                  value={form.billingYearlyDiscount}
                  onChange={(e) =>
                    updateField("billingYearlyDiscount", e.target.value)
                  }
                  placeholder={t("eGSave30")}
                />
              </Field>
              <Field label={t("semiannual")}>
                <Input
                  value={form.billingSemiannual}
                  onChange={(e) =>
                    updateField("billingSemiannual", e.target.value)
                  }
                  placeholder={t("6Months")}
                />
              </Field>
              <Field label={t("semiannualDiscount")}>
                <Input
                  value={form.billingSemiannualDiscount}
                  onChange={(e) =>
                    updateField("billingSemiannualDiscount", e.target.value)
                  }
                  placeholder={t("eGSave15")}
                />
              </Field>
              <Field label={t("quarterly")}>
                <Input
                  value={form.billingQuarterly}
                  onChange={(e) =>
                    updateField("billingQuarterly", e.target.value)
                  }
                  placeholder={t("3Months")}
                />
              </Field>
              <Field label={t("quarterlyDiscount")}>
                <Input
                  value={form.billingQuarterlyDiscount}
                  onChange={(e) =>
                    updateField("billingQuarterlyDiscount", e.target.value)
                  }
                  placeholder={t("eGSave10")}
                />
              </Field>
              <Field label={t("monthly")}>
                <Input
                  value={form.billingMonthly}
                  onChange={(e) =>
                    updateField("billingMonthly", e.target.value)
                  }
                  placeholder={t("monthly")}
                />
              </Field>
            </div>
          </SectionCard>
        </div>
          </div>
        )}

        {tab === "packages" && (
          <div className="space-y-6">
        {/* ── Package labels & CTAs ────────────────────────────────────────── */}
        <SectionCard title={t("packageLabelsCtaSections")}>
          <div className="grid gap-3 lg:grid-cols-2">
            <Field label={t("currencyRateLabel")}>
              <Input
                value={form.currencyRate}
                onChange={(e) => updateField("currencyRate", e.target.value)}
                placeholder={t("eG1Usd110")}
              />
            </Field>
            <Field label={t("perYearLabel")}>
              <Input
                value={form.perYear}
                onChange={(e) => updateField("perYear", e.target.value)}
                placeholder={t("year")}
              />
            </Field>
            <Field label={t("perUserPerMonth")}>
              <Input
                value={form.perUserPerMonth}
                onChange={(e) => updateField("perUserPerMonth", e.target.value)}
                placeholder={t("userMonth")}
              />
            </Field>
            <Field label={t("totalPerMonthLabel")}>
              <Input
                value={form.totalPerMonth}
                onChange={(e) => updateField("totalPerMonth", e.target.value)}
                placeholder={t("totalMonth")}
              />
            </Field>
            <Field label={t("youSaveTemplate")}>
              <Input
                value={form.youSave}
                onChange={(e) => updateField("youSave", e.target.value)}
                placeholder={t("youSave")}
              />
            </Field>
            <Field label={t("oneTimeSetupLabel")}>
              <Input
                value={form.oneTimeSetup}
                onChange={(e) => updateField("oneTimeSetup", e.target.value)}
                placeholder={t("oneTimeSetupFee")}
              />
            </Field>
            <Field label={t("monthlyChargeLabel")}>
              <Input
                value={form.monthlyCharge}
                onChange={(e) => updateField("monthlyCharge", e.target.value)}
                placeholder={t("monthlyCharge")}
              />
            </Field>
            <Field label={t("serverMaintenance")}>
              <Input
                value={form.serverMaintenance}
                onChange={(e) =>
                  updateField("serverMaintenance", e.target.value)
                }
                placeholder={t("serverMaintenance")}
              />
            </Field>
            <Field label={t("usersLabel")}>
              <Input
                value={form.usersLabel}
                onChange={(e) => updateField("usersLabel", e.target.value)}
                placeholder={t("users")}
              />
            </Field>
            <Field label={t("includedFeaturesHeading")}>
              <Input
                value={form.includedFeaturesHeading}
                onChange={(e) =>
                  updateField("includedFeaturesHeading", e.target.value)
                }
                placeholder={t("whatSIncluded")}
              />
            </Field>
            <Field label={t("finalCtaTitle")}>
              <Input
                value={form.finalCtaTitle}
                onChange={(e) => updateField("finalCtaTitle", e.target.value)}
                placeholder={t("readyToGetStarted")}
              />
            </Field>
            <Field label={t("finalCtaButton")}>
              <Input
                value={form.finalCtaButton}
                onChange={(e) => updateField("finalCtaButton", e.target.value)}
                placeholder={t("talkToSales")}
              />
            </Field>
          </div>
          <div className="mt-3 space-y-3">
            <Field label={t("finalCtaDescription")}>
              <Textarea
                value={form.finalCtaDescription}
                onChange={(e) =>
                  updateField("finalCtaDescription", e.target.value)
                }
                placeholder={t("ctaSupportingText")}
              />
            </Field>
            <Field label={t("bottomNoteText")}>
              <Textarea
                value={form.bottomNoteText}
                onChange={(e) => updateField("bottomNoteText", e.target.value)}
                placeholder={t("bottomNoteCopy")}
              />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t("bottomNoteSuccessPacksBtn")}>
              <Input
                value={form.bottomNoteSuccessPacks}
                onChange={(e) =>
                  updateField("bottomNoteSuccessPacks", e.target.value)
                }
                placeholder={t("exploreSuccessPacks")}
              />
            </Field>
            <Field label={t("bottomNoteContactSalesBtn")}>
              <Input
                value={form.bottomNoteContactSales}
                onChange={(e) =>
                  updateField("bottomNoteContactSales", e.target.value)
                }
                placeholder={t("contactSales")}
              />
            </Field>
          </div>
        </SectionCard>
          </div>
        )}

        {tab === "plans" && (
          <div className="space-y-6">
        {/* ── Plans carousel ───────────────────────────────────────────────── */}
        <SectionCard title={t("plans")}>
          <div className="mb-4 flex items-center justify-between">
            {/* Dot navigation */}
            <div className="flex items-center gap-1.5">
              {form.plans.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePlanIndex(i)}
                  className={[
                    "h-2 rounded-full transition-all",
                    i === activePlanIndex
                      ? "w-5 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  ].join(" ")}
                  aria-label={t("selectPlan", { number: i + 1 })}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Arrow navigation */}
              <button
                type="button"
                disabled={activePlanIndex === 0}
                onClick={() => setActivePlanIndex((i) => Math.max(0, i - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                disabled={activePlanIndex >= form.plans.length - 1}
                onClick={() =>
                  setActivePlanIndex((i) =>
                    Math.min(form.plans.length - 1, i + 1),
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30"
              >
                →
              </button>

              <Button
                type="button"
                onClick={() => {
                  const nextPlanNumber = form.plans.length + 1;
                  const newPlan: EditablePlan = {
                    id: `custom-plan-${nextPlanNumber}`,
                    name: t("newPlanName", { number: nextPlanNumber }),
                    tagline: t("newPlanTagline"),
                    badge: "",
                    icon: "📦",
                    accent: "#1D9E75",
                    users: "",
                    currency: "BDT",
                    setupFee: "",
                    monthlyFee: "",
                    quarterlyFee: "",
                    serverFee: "",
                    cta: t("newPlanCta"),
                    order: form.plans.length,
                    enabled: true,
                    features: [t("newPlanFeature")],
                  };
                  updateField("plans", resequence([...form.plans, newPlan]));
                  setActivePlanIndex(form.plans.length);
                }}
                className="btn-gradient text-white"
              >
                {t("addPlan")}
              </Button>
            </div>
          </div>

          {/* Scrollable track */}
          <div className="overflow-hidden rounded-xl">
            <div
              ref={trackRef}
              className="flex gap-3.5 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${carouselOffset}px)` }}
            >
              {form.plans.map((plan, index) => (
                <PlanCard
                  key={`${plan.id}-${index}`}
                  plan={plan}
                  index={index}
                  isActive={index === activePlanIndex}
                  totalPlans={form.plans.length}
                  onActivate={() => setActivePlanIndex(index)}
                  onChange={(updated) => updatePlan(index, updated)}
                  onMove={(dir) => movePlan(index, dir)}
                  onDelete={() => deletePlan(index)}
                />
              ))}
            </div>
          </div>
        </SectionCard>
          </div>
        )}

        {tab === "modules" && (
          <div className="space-y-6">
        {/* ── Modules & Success packs ──────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={t("modules")}>
            <Field label={t("sectionTitle")}>
              <Input
                className="mb-4"
                value={form.modulesTitle}
                onChange={(e) => updateField("modulesTitle", e.target.value)}
                placeholder={t("modulesSectionTitle")}
              />
            </Field>
            <div className="space-y-2">
              {form.modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-border p-2"
                >
                  <Switch
                    aria-label={t("moduleEnabled")}
                    checked={module.enabled}
                    onCheckedChange={(checked) =>
                      updateField(
                        "modules",
                        form.modules.map((item, i) =>
                          i === index ? { ...item, enabled: checked } : item,
                        ),
                      )
                    }
                  />
                  <Input
                    className="h-8 flex-1 text-sm"
                    value={module.label}
                    onChange={(e) =>
                      updateField(
                        "modules",
                        form.modules.map((item, i) =>
                          i === index
                            ? { ...item, label: e.target.value }
                            : item,
                        ),
                      )
                    }
                    placeholder={t("moduleName")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "modules",
                        resequence(moveItem(form.modules, index, -1)),
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-muted"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "modules",
                        resequence(moveItem(form.modules, index, 1)),
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-muted"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "modules",
                        resequence(form.modules.filter((_, i) => i !== index)),
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-destructive/20 text-xs text-destructive hover:bg-destructive/10"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-3 w-full border-dashed"
              onClick={() =>
                updateField("modules", [
                  ...form.modules,
                  { label: "", order: form.modules.length, enabled: true },
                ])
              }
            >
              {t("addModule")}
            </Button>
          </SectionCard>

          <SectionCard title={t("successPacksContent")}>
            <div className="space-y-3">
              <Field label={t("backButton")}>
                <Input
                  value={form.successBackButton}
                  onChange={(e) =>
                    updateField("successBackButton", e.target.value)
                  }
                  placeholder={t("back")}
                />
              </Field>
              <Field label={t("title")}>
                <Input
                  value={form.successTitle}
                  onChange={(e) => updateField("successTitle", e.target.value)}
                  placeholder={t("successPacksTitle")}
                />
              </Field>
              <Field label={t("description")}>
                <Textarea
                  value={form.successDescription}
                  onChange={(e) =>
                    updateField("successDescription", e.target.value)
                  }
                  placeholder={t("description")}
                />
              </Field>
              <Field label={t("estimatorBadge")}>
                <Input
                  value={form.successEstimatorBadge}
                  onChange={(e) =>
                    updateField("successEstimatorBadge", e.target.value)
                  }
                  placeholder={t("badgeText")}
                />
              </Field>
              <Field label={t("comparisonTableFeatureHeader")}>
                <Input
                  value={form.successFeatureHeader}
                  onChange={(e) =>
                    updateField("successFeatureHeader", e.target.value)
                  }
                  placeholder={t("feature")}
                />
              </Field>
              <Field label={t("faqTitle")}>
                <Input
                  value={form.successFaqTitle}
                  onChange={(e) =>
                    updateField("successFaqTitle", e.target.value)
                  }
                  placeholder={t("frequentlyAskedQuestions")}
                />
              </Field>
              <Field label={t("notesOnePerLine")}>
                <Textarea
                  value={form.successNotes.join("\n")}
                  onChange={(e) =>
                    updateField(
                      "successNotes",
                      e.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder={t("noteLine1NoteLine")}
                />
              </Field>
            </div>
          </SectionCard>
        </div>
          </div>
        )}

        {tab === "faqs" && (
          <div className="space-y-6">
        {/* ── FAQs ────────────────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {(
            [
              ["pricingFaqs", t("faqPricingTitle"), t("faqPricingSubtitle")],
              ["successFaqs", t("faqSuccessTitle"), t("faqSuccessSubtitle")],
            ] as const
          ).map(([key, title, subtitle]) => (
            <SectionCard key={key} title={title}>
              <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>
              <FaqList
                faqs={form[key]}
                onChange={(updated) =>
                  updateField(key, updated as FormState[typeof key])
                }
              />
              <Button
                type="button"
                variant="outline"
                className="mt-3 w-full border-dashed"
                onClick={() =>
                  updateField(key, [
                    ...form[key],
                    {
                      question: "",
                      answer: "",
                      order: form[key].length,
                      enabled: true,
                    },
                  ] as FormState[typeof key])
                }
              >
                {t("addFaq")}
              </Button>
            </SectionCard>
          ))}
        </div>
          </div>
        )}

        {tab === "standard" && (
          <div className="space-y-6">
        {/* ── Standard plan content ────────────────────────────────────────── */}
        <SectionCard title={t("standardPlanContent")}>
          <div className="grid gap-3 lg:grid-cols-2">
            <Field label={t("backButton")}>
              <Input
                value={form.standardBackButton}
                onChange={(e) =>
                  updateField("standardBackButton", e.target.value)
                }
                placeholder={t("backToPlans")}
              />
            </Field>
            <Field label={t("title")}>
              <Input
                value={form.standardTitle}
                onChange={(e) => updateField("standardTitle", e.target.value)}
                placeholder={t("standardPlanTitle")}
              />
            </Field>
            <Field label={t("description")}>
              <Textarea
                value={form.standardDescription}
                onChange={(e) =>
                  updateField("standardDescription", e.target.value)
                }
                placeholder={t("planDescription")}
              />
            </Field>
            <Field label={t("userCountLabel")}>
              <Input
                value={form.standardUserCountLabel}
                onChange={(e) =>
                  updateField("standardUserCountLabel", e.target.value)
                }
                placeholder={t("numberOfUsers")}
              />
            </Field>
            <Field label={t("implementationLabel")}>
              <Input
                value={form.standardImplementationLabel}
                onChange={(e) =>
                  updateField("standardImplementationLabel", e.target.value)
                }
                placeholder={t("implementationOption")}
              />
            </Field>
            <Field label={t("successPackLabel")}>
              <Input
                value={form.standardSuccessPack}
                onChange={(e) =>
                  updateField("standardSuccessPack", e.target.value)
                }
                placeholder={t("successPack")}
              />
            </Field>
            <Field label={t("successPackSublabel")}>
              <Input
                value={form.standardSuccessPackSublabel}
                onChange={(e) =>
                  updateField("standardSuccessPackSublabel", e.target.value)
                }
                placeholder={t("sublabel")}
              />
            </Field>
            <Field label={t("successPackMessage")}>
              <Textarea
                value={form.standardSuccessPackMessage}
                onChange={(e) =>
                  updateField("standardSuccessPackMessage", e.target.value)
                }
                placeholder={t("messageText")}
              />
            </Field>
            <Field label={t("readMoreButton")}>
              <Input
                value={form.standardReadMoreButton}
                onChange={(e) =>
                  updateField("standardReadMoreButton", e.target.value)
                }
                placeholder={t("readMore")}
              />
            </Field>
            <Field label={t("totalPerMonthLabel")}>
              <Input
                value={form.standardTotalPerMonth}
                onChange={(e) =>
                  updateField("standardTotalPerMonth", e.target.value)
                }
                placeholder={t("totalMonth")}
              />
            </Field>
            <Field label={t("buyNowLabel")}>
              <Input
                value={form.standardBuyNow}
                onChange={(e) => updateField("standardBuyNow", e.target.value)}
                placeholder={t("buyNow")}
              />
            </Field>
            <Field label={t("firstYearDiscountLabel")}>
              <Input
                value={form.standardFirstYearDiscount}
                onChange={(e) =>
                  updateField("standardFirstYearDiscount", e.target.value)
                }
                placeholder={t("firstYearDiscount")}
              />
            </Field>
            <Field label={t("perUserNote")}>
              <Input
                value={form.standardPerUserNote}
                onChange={(e) =>
                  updateField("standardPerUserNote", e.target.value)
                }
                placeholder={t("perUserNote")}
              />
            </Field>
            <Field label={t("printQuoteLabel")}>
              <Input
                value={form.standardQuotaPrint}
                onChange={(e) =>
                  updateField("standardQuotaPrint", e.target.value)
                }
                placeholder={t("printQuote")}
              />
            </Field>
          </div>
        </SectionCard>
          </div>
        )}
      </div>

      {/* Floating Save button (bottom-right). Pulses when there are unsaved changes. */}
      <div className="fixed bottom-6 end-6 z-50">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isPending}
          className={
            !isDirty || isPending
              ? "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground shadow-sm cursor-not-allowed opacity-80"
              : "inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gradient text-white shadow-lg ring-2 ring-primary/50 animate-pulse"
          }
        >
          {isPending ? t("saving") : t("saveChanges")}
        </button>
      </div>
    </div>
  );
}

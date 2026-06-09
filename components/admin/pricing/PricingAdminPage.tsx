"use client";

import { useState, useTransition, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { PricingPageData, PricingSiteConfig } from "@/lib/pricing/types";

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
    <div className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      <h2 className="mb-4 text-base font-semibold text-slate-800">{title}</h2>
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
      <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
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
  const update = (patch: Partial<EditablePlan>) =>
    onChange({ ...plan, ...patch });

  return (
    <div
      onClick={onActivate}
      className={[
        "w-[280px] shrink-0 cursor-pointer rounded-xl border bg-white p-4 transition-all",
        isActive
          ? "border-[2px] shadow-sm"
          : "border-slate-200 opacity-70 hover:opacity-90",
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
          <div className="truncate text-sm font-semibold text-slate-800">
            {plan.name || "Unnamed plan"}
          </div>
          <div className="truncate text-xs text-slate-400">
            {plan.tagline || "—"}
          </div>
        </div>
        <span
          className={[
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            plan.enabled
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-400",
          ].join(" ")}
        >
          {plan.enabled ? "On" : "Off"}
        </span>
      </div>

      {/* Controls row */}
      <div
        className="mb-3 flex items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <Switch
          checked={plan.enabled}
          onCheckedChange={(checked) => update({ enabled: checked })}
        />
        <span className="ml-1 flex-1 text-xs text-slate-500">Enabled</span>
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
        >
          ←
        </button>
        <button
          type="button"
          disabled={index === totalPlans - 1}
          onClick={() => onMove(1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => {
            if (!window.confirm("Delete this plan?")) return;
            onDelete();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-400 hover:bg-red-50"
        >
          ✕
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-2 text-sm" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Key">
            <Input
              className="h-8 text-xs"
              value={plan.id}
              onChange={(e) => update({ id: e.target.value })}
              placeholder="plan-key"
            />
          </Field>
          <Field label="Name">
            <Input
              className="h-8 text-xs"
              value={plan.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Plan name"
            />
          </Field>
        </div>
        <Field label="Tagline">
          <Input
            className="h-8 text-xs"
            value={plan.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
            placeholder="Short tagline"
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Badge">
            <Input
              className="h-8 text-xs"
              value={plan.badge}
              onChange={(e) => update({ badge: e.target.value })}
              placeholder="e.g. Popular"
            />
          </Field>
          <Field label="Icon">
            <Input
              className="h-8 text-xs"
              value={plan.icon}
              onChange={(e) => update({ icon: e.target.value })}
              placeholder="📦"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Accent color">
            <input
              type="color"
              value={plan.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="h-8 w-full cursor-pointer rounded-md border border-slate-200 px-1 py-0.5"
            />
          </Field>
          <Field label="Currency">
            <select
              value={plan.currency}
              onChange={(e) =>
                update({ currency: e.target.value as "BDT" | "USD" })
              }
              className="h-8 w-full rounded-md border border-slate-200 px-2 text-xs text-slate-700"
            >
              <option value="BDT">BDT</option>
              <option value="USD">USD</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Users">
            <Input
              className="h-8 text-xs"
              value={plan.users}
              onChange={(e) => update({ users: e.target.value })}
              placeholder="e.g. 10"
            />
          </Field>
          <Field label="CTA text">
            <Input
              className="h-8 text-xs"
              value={plan.cta}
              onChange={(e) => update({ cta: e.target.value })}
              placeholder="Get started"
            />
          </Field>
        </div>

        {/* Pricing */}
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Pricing
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Setup fee">
              <Input
                className="h-8 text-xs"
                value={plan.setupFee}
                onChange={(e) => update({ setupFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label="Monthly fee">
              <Input
                className="h-8 text-xs"
                value={plan.monthlyFee}
                onChange={(e) => update({ monthlyFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label="Quarterly fee">
              <Input
                className="h-8 text-xs"
                value={plan.quarterlyFee}
                onChange={(e) => update({ quarterlyFee: e.target.value })}
                placeholder="0"
              />
            </Field>
            <Field label="Server fee">
              <Input
                className="h-8 text-xs"
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
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Features
            </p>
            <button
              type="button"
              onClick={() => update({ features: [...plan.features, ""] })}
              className="text-[11px] text-teal-700 hover:underline"
            >
              + Add
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
                  placeholder="Feature text"
                />
                <button
                  type="button"
                  onClick={() =>
                    update({
                      features: plan.features.filter((_, idx) => idx !== fi),
                    })
                  }
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-red-100 text-xs text-red-400 hover:bg-red-50"
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
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-slate-100 p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <Switch
              checked={faq.enabled}
              onCheckedChange={(checked) =>
                onChange(
                  faqs.map((item, i) =>
                    i === index ? { ...item, enabled: checked } : item,
                  ),
                )
              }
            />
            <span className="flex-1 text-xs text-slate-400">Enabled</span>
            <button
              type="button"
              onClick={() => onChange(resequence(moveItem(faqs, index, -1)))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-400 hover:bg-slate-50"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => onChange(resequence(moveItem(faqs, index, 1)))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-400 hover:bg-slate-50"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => {
                if (!window.confirm("Delete this FAQ?")) return;
                onChange(resequence(faqs.filter((_, i) => i !== index)));
              }}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-xs text-red-400 hover:bg-red-50"
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
            placeholder="Question"
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
            placeholder="Answer"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function PricingAdminPage({
  initialData,
}: PricingAdminPageProps) {
  const [locale, setLocale] = useState<"en" | "bn">(
    initialData.pageData.locale,
  );
  const [form, setForm] = useState<FormState>(buildAdminFormState(initialData));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  async function loadLocale(nextLocale: "en" | "bn") {
    setLocale(nextLocale);
    setStatus(null);
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/admin/pricing?locale=${nextLocale}`);
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? "Failed to load locale data");
        return;
      }
      setForm(buildAdminFormState(payload));
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
        `Duplicate plan key found: ${Array.from(new Set(duplicatePlanIds)).join(", ")}`,
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
        const details = result.details
          ? JSON.stringify(result.details)
          : null;
        setError(
          details
            ? `${result.error ?? "Failed to save pricing data"}: ${details}`
            : (result.error ?? "Failed to save pricing data"),
        );
        return;
      }
      setForm(buildAdminFormState(result.data));
      setActivePlanIndex(0);
      setStatus("Pricing content saved.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8F7] to-[#EEEFE0] p-4 sm:p-6">
      <div className="container mx-auto space-y-6">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0E4B4B] to-[#086666] p-6 text-white shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Pricing management</h1>
              <p className="mt-1 text-sm text-white/70">
                Manage visibility, content, plans, modules, and FAQs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={locale}
                onChange={(e) => loadLocale(e.target.value as "en" | "bn")}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              >
                <option value="en">English</option>
                <option value="bn">Bangla</option>
              </select>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSave}
                disabled={isPending}
                className="font-medium"
              >
                {isPending ? "Saving…" : "Save changes"}
              </Button>
              <Button
                asChild
                type="button"
                variant="outline"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              >
                <a href={`/${locale}/pricing`} target="_blank" rel="noreferrer">
                  Preview ↗
                </a>
              </Button>
            </div>
          </div>

          {/* Page enabled toggle */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-4">
            <Switch
              checked={form.pricingPageEnabled}
              onCheckedChange={(checked) =>
                updateField("pricingPageEnabled", checked)
              }
            />
            <div>
              <div className="text-sm font-semibold">Pricing page enabled</div>
              <div className="text-xs text-white/60">
                Hides pricing from navigation and blocks direct access when off.
              </div>
            </div>
          </div>

          {status && (
            <p className="mt-3 rounded-lg bg-emerald-500/20 px-3 py-2 text-sm text-emerald-200">
              ✓ {status}
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-200">
              ✕ {error}
            </p>
          )}
        </div>

        {/* ── Metadata & Billing ──────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Metadata & hero">
            <div className="space-y-3">
              <Field label="Page title">
                <Input
                  value={form.metadataTitle}
                  onChange={(e) => updateField("metadataTitle", e.target.value)}
                  placeholder="e.g. Pricing — Your Brand"
                />
              </Field>
              <Field label="Meta description">
                <Textarea
                  value={form.metadataDescription}
                  onChange={(e) =>
                    updateField("metadataDescription", e.target.value)
                  }
                  placeholder="Short SEO description"
                />
              </Field>
              <Field label="Eyebrow">
                <Input
                  value={form.heroEyebrow}
                  onChange={(e) => updateField("heroEyebrow", e.target.value)}
                  placeholder="e.g. Simple & transparent"
                />
              </Field>
              <Field label="Hero title">
                <Input
                  value={form.heroTitle}
                  onChange={(e) => updateField("heroTitle", e.target.value)}
                  placeholder="Main heading"
                />
              </Field>
              <Field label="Title highlight">
                <Input
                  value={form.heroTitleHighlight}
                  onChange={(e) =>
                    updateField("heroTitleHighlight", e.target.value)
                  }
                  placeholder="Highlighted word(s)"
                />
              </Field>
              <Field label="Hero description">
                <Textarea
                  value={form.heroDescription}
                  onChange={(e) =>
                    updateField("heroDescription", e.target.value)
                  }
                  placeholder="Sub-heading paragraph"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Billing labels">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Yearly">
                <Input
                  value={form.billingYearly}
                  onChange={(e) => updateField("billingYearly", e.target.value)}
                  placeholder="Yearly"
                />
              </Field>
              <Field label="Yearly discount">
                <Input
                  value={form.billingYearlyDiscount}
                  onChange={(e) =>
                    updateField("billingYearlyDiscount", e.target.value)
                  }
                  placeholder="e.g. Save 30%"
                />
              </Field>
              <Field label="Semiannual">
                <Input
                  value={form.billingSemiannual}
                  onChange={(e) =>
                    updateField("billingSemiannual", e.target.value)
                  }
                  placeholder="6 months"
                />
              </Field>
              <Field label="Semiannual discount">
                <Input
                  value={form.billingSemiannualDiscount}
                  onChange={(e) =>
                    updateField("billingSemiannualDiscount", e.target.value)
                  }
                  placeholder="e.g. Save 15%"
                />
              </Field>
              <Field label="Quarterly">
                <Input
                  value={form.billingQuarterly}
                  onChange={(e) =>
                    updateField("billingQuarterly", e.target.value)
                  }
                  placeholder="3 months"
                />
              </Field>
              <Field label="Quarterly discount">
                <Input
                  value={form.billingQuarterlyDiscount}
                  onChange={(e) =>
                    updateField("billingQuarterlyDiscount", e.target.value)
                  }
                  placeholder="e.g. Save 10%"
                />
              </Field>
              <Field label="Monthly">
                <Input
                  value={form.billingMonthly}
                  onChange={(e) =>
                    updateField("billingMonthly", e.target.value)
                  }
                  placeholder="Monthly"
                />
              </Field>
            </div>
          </SectionCard>
        </div>

        {/* ── Package labels & CTAs ────────────────────────────────────────── */}
        <SectionCard title="Package labels & CTA sections">
          <div className="grid gap-3 lg:grid-cols-2">
            <Field label="Currency rate label">
              <Input
                value={form.currencyRate}
                onChange={(e) => updateField("currencyRate", e.target.value)}
                placeholder="e.g. 1 USD = 110 BDT"
              />
            </Field>
            <Field label="Per year label">
              <Input
                value={form.perYear}
                onChange={(e) => updateField("perYear", e.target.value)}
                placeholder="/ year"
              />
            </Field>
            <Field label="Per user per month">
              <Input
                value={form.perUserPerMonth}
                onChange={(e) => updateField("perUserPerMonth", e.target.value)}
                placeholder="/ user / month"
              />
            </Field>
            <Field label="Total per month label">
              <Input
                value={form.totalPerMonth}
                onChange={(e) => updateField("totalPerMonth", e.target.value)}
                placeholder="Total / month"
              />
            </Field>
            <Field label="You save template">
              <Input
                value={form.youSave}
                onChange={(e) => updateField("youSave", e.target.value)}
                placeholder="You save {amount}"
              />
            </Field>
            <Field label="One-time setup label">
              <Input
                value={form.oneTimeSetup}
                onChange={(e) => updateField("oneTimeSetup", e.target.value)}
                placeholder="One-time setup fee"
              />
            </Field>
            <Field label="Monthly charge label">
              <Input
                value={form.monthlyCharge}
                onChange={(e) => updateField("monthlyCharge", e.target.value)}
                placeholder="Monthly charge"
              />
            </Field>
            <Field label="Server maintenance">
              <Input
                value={form.serverMaintenance}
                onChange={(e) =>
                  updateField("serverMaintenance", e.target.value)
                }
                placeholder="Server maintenance"
              />
            </Field>
            <Field label="Users label">
              <Input
                value={form.usersLabel}
                onChange={(e) => updateField("usersLabel", e.target.value)}
                placeholder="Users"
              />
            </Field>
            <Field label="Included features heading">
              <Input
                value={form.includedFeaturesHeading}
                onChange={(e) =>
                  updateField("includedFeaturesHeading", e.target.value)
                }
                placeholder="What's included"
              />
            </Field>
            <Field label="Final CTA title">
              <Input
                value={form.finalCtaTitle}
                onChange={(e) => updateField("finalCtaTitle", e.target.value)}
                placeholder="Ready to get started?"
              />
            </Field>
            <Field label="Final CTA button">
              <Input
                value={form.finalCtaButton}
                onChange={(e) => updateField("finalCtaButton", e.target.value)}
                placeholder="Talk to sales"
              />
            </Field>
          </div>
          <div className="mt-3 space-y-3">
            <Field label="Final CTA description">
              <Textarea
                value={form.finalCtaDescription}
                onChange={(e) =>
                  updateField("finalCtaDescription", e.target.value)
                }
                placeholder="CTA supporting text"
              />
            </Field>
            <Field label="Bottom note text">
              <Textarea
                value={form.bottomNoteText}
                onChange={(e) => updateField("bottomNoteText", e.target.value)}
                placeholder="Bottom note copy"
              />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="Bottom note — success packs btn">
              <Input
                value={form.bottomNoteSuccessPacks}
                onChange={(e) =>
                  updateField("bottomNoteSuccessPacks", e.target.value)
                }
                placeholder="Explore success packs"
              />
            </Field>
            <Field label="Bottom note — contact sales btn">
              <Input
                value={form.bottomNoteContactSales}
                onChange={(e) =>
                  updateField("bottomNoteContactSales", e.target.value)
                }
                placeholder="Contact sales"
              />
            </Field>
          </div>
        </SectionCard>

        {/* ── Plans carousel ───────────────────────────────────────────────── */}
        <SectionCard title="Plans">
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
                      ? "w-5 bg-teal-700"
                      : "w-2 bg-slate-300 hover:bg-slate-400",
                  ].join(" ")}
                  aria-label={`Select plan ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Arrow navigation */}
              <button
                type="button"
                disabled={activePlanIndex === 0}
                onClick={() => setActivePlanIndex((i) => Math.max(0, i - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
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
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              >
                →
              </button>

              <Button
                type="button"
                onClick={() => {
                  const nextPlanNumber = form.plans.length + 1;
                  const newPlan: EditablePlan = {
                    id: `custom-plan-${nextPlanNumber}`,
                    name: `New Plan ${nextPlanNumber}`,
                    tagline: "Custom pricing package",
                    badge: "",
                    icon: "📦",
                    accent: "#1D9E75",
                    users: "",
                    currency: "BDT",
                    setupFee: "",
                    monthlyFee: "",
                    quarterlyFee: "",
                    serverFee: "",
                    cta: "Get started",
                    order: form.plans.length,
                    enabled: true,
                    features: ["Core module access"],
                  };
                  updateField("plans", resequence([...form.plans, newPlan]));
                  setActivePlanIndex(form.plans.length);
                }}
                className="bg-[#0E4B4B] text-white hover:bg-[#086666]"
              >
                + Add plan
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

        {/* ── Modules & Success packs ──────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Modules">
            <Field label="Section title">
              <Input
                className="mb-4"
                value={form.modulesTitle}
                onChange={(e) => updateField("modulesTitle", e.target.value)}
                placeholder="Modules section title"
              />
            </Field>
            <div className="space-y-2">
              {form.modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 p-2"
                >
                  <Switch
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
                    placeholder="Module name"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "modules",
                        resequence(moveItem(form.modules, index, -1)),
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-400 hover:bg-slate-50"
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
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-400 hover:bg-slate-50"
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
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-xs text-red-400 hover:bg-red-50"
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
              + Add module
            </Button>
          </SectionCard>

          <SectionCard title="Success packs content">
            <div className="space-y-3">
              <Field label="Back button">
                <Input
                  value={form.successBackButton}
                  onChange={(e) =>
                    updateField("successBackButton", e.target.value)
                  }
                  placeholder="← Back"
                />
              </Field>
              <Field label="Title">
                <Input
                  value={form.successTitle}
                  onChange={(e) => updateField("successTitle", e.target.value)}
                  placeholder="Success packs title"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={form.successDescription}
                  onChange={(e) =>
                    updateField("successDescription", e.target.value)
                  }
                  placeholder="Description"
                />
              </Field>
              <Field label="Estimator badge">
                <Input
                  value={form.successEstimatorBadge}
                  onChange={(e) =>
                    updateField("successEstimatorBadge", e.target.value)
                  }
                  placeholder="Badge text"
                />
              </Field>
              <Field label="Comparison table feature header">
                <Input
                  value={form.successFeatureHeader}
                  onChange={(e) =>
                    updateField("successFeatureHeader", e.target.value)
                  }
                  placeholder="Feature"
                />
              </Field>
              <Field label="FAQ title">
                <Input
                  value={form.successFaqTitle}
                  onChange={(e) =>
                    updateField("successFaqTitle", e.target.value)
                  }
                  placeholder="Frequently asked questions"
                />
              </Field>
              <Field label="Notes (one per line)">
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
                  placeholder={"Note line 1\nNote line 2"}
                />
              </Field>
            </div>
          </SectionCard>
        </div>

        {/* ── FAQs ────────────────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {(
            [
              ["pricingFaqs", "Pricing FAQs", "Main pricing page"],
              ["successFaqs", "Success pack FAQs", "Success packs page"],
            ] as const
          ).map(([key, title, subtitle]) => (
            <SectionCard key={key} title={title}>
              <p className="mb-4 text-xs text-slate-400">{subtitle}</p>
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
                + Add FAQ
              </Button>
            </SectionCard>
          ))}
        </div>

        {/* ── Standard plan content ────────────────────────────────────────── */}
        <SectionCard title="Standard plan content">
          <div className="grid gap-3 lg:grid-cols-2">
            <Field label="Back button">
              <Input
                value={form.standardBackButton}
                onChange={(e) =>
                  updateField("standardBackButton", e.target.value)
                }
                placeholder="← Back to plans"
              />
            </Field>
            <Field label="Title">
              <Input
                value={form.standardTitle}
                onChange={(e) => updateField("standardTitle", e.target.value)}
                placeholder="Standard plan title"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={form.standardDescription}
                onChange={(e) =>
                  updateField("standardDescription", e.target.value)
                }
                placeholder="Plan description"
              />
            </Field>
            <Field label="User count label">
              <Input
                value={form.standardUserCountLabel}
                onChange={(e) =>
                  updateField("standardUserCountLabel", e.target.value)
                }
                placeholder="Number of users"
              />
            </Field>
            <Field label="Implementation label">
              <Input
                value={form.standardImplementationLabel}
                onChange={(e) =>
                  updateField("standardImplementationLabel", e.target.value)
                }
                placeholder="Implementation option"
              />
            </Field>
            <Field label="Success pack label">
              <Input
                value={form.standardSuccessPack}
                onChange={(e) =>
                  updateField("standardSuccessPack", e.target.value)
                }
                placeholder="Success pack"
              />
            </Field>
            <Field label="Success pack sublabel">
              <Input
                value={form.standardSuccessPackSublabel}
                onChange={(e) =>
                  updateField("standardSuccessPackSublabel", e.target.value)
                }
                placeholder="Sublabel"
              />
            </Field>
            <Field label="Success pack message">
              <Textarea
                value={form.standardSuccessPackMessage}
                onChange={(e) =>
                  updateField("standardSuccessPackMessage", e.target.value)
                }
                placeholder="Message text"
              />
            </Field>
            <Field label="Read more button">
              <Input
                value={form.standardReadMoreButton}
                onChange={(e) =>
                  updateField("standardReadMoreButton", e.target.value)
                }
                placeholder="Read more"
              />
            </Field>
            <Field label="Total per month label">
              <Input
                value={form.standardTotalPerMonth}
                onChange={(e) =>
                  updateField("standardTotalPerMonth", e.target.value)
                }
                placeholder="Total / month"
              />
            </Field>
            <Field label="Buy now label">
              <Input
                value={form.standardBuyNow}
                onChange={(e) => updateField("standardBuyNow", e.target.value)}
                placeholder="Buy now"
              />
            </Field>
            <Field label="First year discount label">
              <Input
                value={form.standardFirstYearDiscount}
                onChange={(e) =>
                  updateField("standardFirstYearDiscount", e.target.value)
                }
                placeholder="First year discount"
              />
            </Field>
            <Field label="Per user note">
              <Input
                value={form.standardPerUserNote}
                onChange={(e) =>
                  updateField("standardPerUserNote", e.target.value)
                }
                placeholder="Per user note"
              />
            </Field>
            <Field label="Print quote label">
              <Input
                value={form.standardQuotaPrint}
                onChange={(e) =>
                  updateField("standardQuotaPrint", e.target.value)
                }
                placeholder="Print quote"
              />
            </Field>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

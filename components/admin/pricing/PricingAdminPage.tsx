"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { PricingPageData, PricingSiteConfig } from "@/lib/pricing/types";

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
      pageData.standardPlanPage.implementationOptions?.successPackSublabel ?? "",
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

export default function PricingAdminPage({ initialData }: PricingAdminPageProps) {
  const [locale, setLocale] = useState<"en" | "bn">(initialData.pageData.locale);
  const [form, setForm] = useState<FormState>(
    buildAdminFormState(initialData),
  );
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

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
    });
  }

  async function handleSave() {
    setStatus(null);
    setError(null);

    const payload = {
      locale,
      settings: {
        pricingPageEnabled: form.pricingPageEnabled,
      },
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
          comparisonTable: {
            featureHeader: form.successFeatureHeader,
          },
          notes: form.successNotes,
        },
        successPacksFaqMeta: {
          title: form.successFaqTitle,
        },
      },
      plans: resequence(form.plans).map((plan) => ({
        ...plan,
        badge: plan.badge || null,
        users: /^\d+$/.test(plan.users) ? Number(plan.users) : plan.users,
        setupFee: plan.setupFee ? Number(plan.setupFee) : undefined,
        monthlyFee: plan.monthlyFee ? Number(plan.monthlyFee) : undefined,
        quarterlyFee: plan.quarterlyFee ? Number(plan.quarterlyFee) : undefined,
        serverFee: plan.serverFee ? Number(plan.serverFee) : undefined,
      })),
      pricingFaqs: resequence(form.pricingFaqs),
      successFaqs: resequence(form.successFaqs),
      modules: resequence(form.modules),
    };

    startTransition(async () => {
      const response = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Failed to save pricing data");
        return;
      }

      setForm(buildAdminFormState(result.data));
      setStatus("Pricing content saved.");
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8F7] to-[#EEEFE0] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-linear-to-r from-[#0E4B4B] to-[#086666] p-6 text-white shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Pricing Management</h1>
              <p className="mt-2 text-sm text-white/75">
                Manage pricing visibility, content, plans, modules, and FAQs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={locale}
                onChange={(event) => loadLocale(event.target.value as "en" | "bn")}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="bn">Bangla</option>
              </select>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSave}
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button asChild type="button" variant="outline">
                <a href={`/${locale}/pricing`} target="_blank" rel="noreferrer">
                  Preview Pricing
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-4">
            <Switch
              checked={form.pricingPageEnabled}
              onCheckedChange={(checked) =>
                updateField("pricingPageEnabled", checked)
              }
            />
            <div>
              <div className="font-semibold">Pricing page enabled</div>
              <div className="text-sm text-white/70">
                Hides pricing from navigation and blocks direct page access when
                turned off.
              </div>
            </div>
          </div>
          {status ? <p className="mt-3 text-sm text-emerald-200">{status}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-200">{error}</p> : null}
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Metadata & Hero</h2>
            <div className="space-y-3">
              <Input value={form.metadataTitle} onChange={(e) => updateField("metadataTitle", e.target.value)} placeholder="Metadata title" />
              <Textarea value={form.metadataDescription} onChange={(e) => updateField("metadataDescription", e.target.value)} placeholder="Metadata description" />
              <Input value={form.heroEyebrow} onChange={(e) => updateField("heroEyebrow", e.target.value)} placeholder="Hero eyebrow" />
              <Input value={form.heroTitle} onChange={(e) => updateField("heroTitle", e.target.value)} placeholder="Hero title" />
              <Input value={form.heroTitleHighlight} onChange={(e) => updateField("heroTitleHighlight", e.target.value)} placeholder="Hero title highlight" />
              <Textarea value={form.heroDescription} onChange={(e) => updateField("heroDescription", e.target.value)} placeholder="Hero description" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Billing Labels</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={form.billingYearly} onChange={(e) => updateField("billingYearly", e.target.value)} placeholder="Yearly" />
              <Input value={form.billingYearlyDiscount} onChange={(e) => updateField("billingYearlyDiscount", e.target.value)} placeholder="Yearly discount" />
              <Input value={form.billingSemiannual} onChange={(e) => updateField("billingSemiannual", e.target.value)} placeholder="Semiannual" />
              <Input value={form.billingSemiannualDiscount} onChange={(e) => updateField("billingSemiannualDiscount", e.target.value)} placeholder="Semiannual discount" />
              <Input value={form.billingQuarterly} onChange={(e) => updateField("billingQuarterly", e.target.value)} placeholder="Quarterly" />
              <Input value={form.billingQuarterlyDiscount} onChange={(e) => updateField("billingQuarterlyDiscount", e.target.value)} placeholder="Quarterly discount" />
              <Input value={form.billingMonthly} onChange={(e) => updateField("billingMonthly", e.target.value)} placeholder="Monthly" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Package Labels & CTA Sections</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            <Input value={form.currencyRate} onChange={(e) => updateField("currencyRate", e.target.value)} placeholder="Currency rate label" />
            <Input value={form.perYear} onChange={(e) => updateField("perYear", e.target.value)} placeholder="Per year label" />
            <Input value={form.perUserPerMonth} onChange={(e) => updateField("perUserPerMonth", e.target.value)} placeholder="Per user per month label" />
            <Input value={form.totalPerMonth} onChange={(e) => updateField("totalPerMonth", e.target.value)} placeholder="Total per month label" />
            <Input value={form.youSave} onChange={(e) => updateField("youSave", e.target.value)} placeholder="You save template" />
            <Input value={form.oneTimeSetup} onChange={(e) => updateField("oneTimeSetup", e.target.value)} placeholder="One-time setup label" />
            <Input value={form.monthlyCharge} onChange={(e) => updateField("monthlyCharge", e.target.value)} placeholder="Monthly charge label" />
            <Input value={form.serverMaintenance} onChange={(e) => updateField("serverMaintenance", e.target.value)} placeholder="Server maintenance label" />
            <Input value={form.usersLabel} onChange={(e) => updateField("usersLabel", e.target.value)} placeholder="Users label" />
            <Input value={form.includedFeaturesHeading} onChange={(e) => updateField("includedFeaturesHeading", e.target.value)} placeholder="Included features heading" />
            <Input value={form.finalCtaTitle} onChange={(e) => updateField("finalCtaTitle", e.target.value)} placeholder="Final CTA title" />
            <Input value={form.finalCtaButton} onChange={(e) => updateField("finalCtaButton", e.target.value)} placeholder="Final CTA button" />
          </div>
          <Textarea className="mt-3" value={form.finalCtaDescription} onChange={(e) => updateField("finalCtaDescription", e.target.value)} placeholder="Final CTA description" />
          <Textarea className="mt-3" value={form.bottomNoteText} onChange={(e) => updateField("bottomNoteText", e.target.value)} placeholder="Bottom note text" />
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <Input value={form.bottomNoteSuccessPacks} onChange={(e) => updateField("bottomNoteSuccessPacks", e.target.value)} placeholder="Bottom note success packs button" />
            <Input value={form.bottomNoteContactSales} onChange={(e) => updateField("bottomNoteContactSales", e.target.value)} placeholder="Bottom note contact sales button" />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Plans</h2>
            <Button
              type="button"
              onClick={() =>
                updateField("plans", [
                  ...form.plans,
                  {
                    id: `plan-${Date.now()}`,
                    name: "",
                    tagline: "",
                    badge: "",
                    icon: "📦",
                    accent: "#3aafa9",
                    users: "",
                    currency: "BDT",
                    setupFee: "",
                    monthlyFee: "",
                    quarterlyFee: "",
                    serverFee: "",
                    cta: "Get started",
                    order: form.plans.length,
                    enabled: true,
                    features: [""],
                  },
                ])
              }
            >
              Add Plan
            </Button>
          </div>
          <div className="space-y-6">
            {form.plans.map((plan, index) => (
              <div key={`${plan.id}-${index}`} className="rounded-xl border p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold">Plan #{index + 1}</div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={plan.enabled}
                      onCheckedChange={(checked) =>
                        updateField(
                          "plans",
                          form.plans.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, enabled: checked } : item,
                          ),
                        )
                      }
                    />
                    <Button type="button" variant="outline" onClick={() => updateField("plans", resequence(moveItem(form.plans, index, -1)))}>Up</Button>
                    <Button type="button" variant="outline" onClick={() => updateField("plans", resequence(moveItem(form.plans, index, 1)))}>Down</Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        if (!window.confirm("Delete this plan?")) return;
                        updateField(
                          "plans",
                          resequence(form.plans.filter((_, itemIndex) => itemIndex !== index)),
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  <Input value={plan.id} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, id: e.target.value } : item))} placeholder="Plan key" />
                  <Input value={plan.name} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item))} placeholder="Plan name" />
                  <Input value={plan.tagline} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, tagline: e.target.value } : item))} placeholder="Tagline" />
                  <Input value={plan.badge} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, badge: e.target.value } : item))} placeholder="Badge" />
                  <Input value={plan.icon} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, icon: e.target.value } : item))} placeholder="Icon" />
                  <Input value={plan.accent} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, accent: e.target.value } : item))} placeholder="Accent color" />
                  <Input value={plan.users} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, users: e.target.value } : item))} placeholder="Users" />
                  <Input value={plan.cta} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, cta: e.target.value } : item))} placeholder="CTA text" />
                  <select
                    value={plan.currency}
                    onChange={(e) =>
                      updateField(
                        "plans",
                        form.plans.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, currency: e.target.value as "BDT" | "USD" }
                            : item,
                        ),
                      )
                    }
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="BDT">BDT</option>
                    <option value="USD">USD</option>
                  </select>
                  <Input value={plan.setupFee} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, setupFee: e.target.value } : item))} placeholder="Setup fee" />
                  <Input value={plan.quarterlyFee} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, quarterlyFee: e.target.value } : item))} placeholder="Quarterly fee" />
                  <Input value={plan.monthlyFee} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, monthlyFee: e.target.value } : item))} placeholder="Monthly fee" />
                  <Input value={plan.serverFee} onChange={(e) => updateField("plans", form.plans.map((item, itemIndex) => itemIndex === index ? { ...item, serverFee: e.target.value } : item))} placeholder="Server fee" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Features</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        updateField(
                          "plans",
                          form.plans.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, features: [...item.features, ""] }
                              : item,
                          ),
                        )
                      }
                    >
                      Add Feature
                    </Button>
                  </div>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={`${plan.id}-feature-${featureIndex}`} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          updateField(
                            "plans",
                            form.plans.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    features: item.features.map((entry, entryIndex) =>
                                      entryIndex === featureIndex ? e.target.value : entry,
                                    ),
                                  }
                                : item,
                            ),
                          )
                        }
                        placeholder="Feature text"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          updateField(
                            "plans",
                            form.plans.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    features: item.features.filter(
                                      (_, entryIndex) => entryIndex !== featureIndex,
                                    ),
                                  }
                                : item,
                            ),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Modules</h2>
              <Button type="button" onClick={() => updateField("modules", [...form.modules, { label: "", order: form.modules.length, enabled: true }])}>Add Module</Button>
            </div>
            <Input value={form.modulesTitle} onChange={(e) => updateField("modulesTitle", e.target.value)} placeholder="Modules section title" />
            <div className="mt-4 space-y-2">
              {form.modules.map((module, index) => (
                <div key={`module-${index}`} className="flex items-center gap-2">
                  <Switch checked={module.enabled} onCheckedChange={(checked) => updateField("modules", form.modules.map((item, itemIndex) => itemIndex === index ? { ...item, enabled: checked } : item))} />
                  <Input value={module.label} onChange={(e) => updateField("modules", form.modules.map((item, itemIndex) => itemIndex === index ? { ...item, label: e.target.value } : item))} placeholder="Module label" />
                  <Button type="button" variant="outline" onClick={() => updateField("modules", resequence(moveItem(form.modules, index, -1)))}>Up</Button>
                  <Button type="button" variant="outline" onClick={() => updateField("modules", resequence(moveItem(form.modules, index, 1)))}>Down</Button>
                  <Button type="button" variant="destructive" onClick={() => updateField("modules", resequence(form.modules.filter((_, itemIndex) => itemIndex !== index)))}>Delete</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Success Packs Content</h2>
            <div className="space-y-3">
              <Input value={form.successBackButton} onChange={(e) => updateField("successBackButton", e.target.value)} placeholder="Back button" />
              <Input value={form.successTitle} onChange={(e) => updateField("successTitle", e.target.value)} placeholder="Success packs title" />
              <Textarea value={form.successDescription} onChange={(e) => updateField("successDescription", e.target.value)} placeholder="Success packs description" />
              <Input value={form.successEstimatorBadge} onChange={(e) => updateField("successEstimatorBadge", e.target.value)} placeholder="Estimator badge" />
              <Input value={form.successFeatureHeader} onChange={(e) => updateField("successFeatureHeader", e.target.value)} placeholder="Comparison table feature header" />
              <Input value={form.successFaqTitle} onChange={(e) => updateField("successFaqTitle", e.target.value)} placeholder="Success FAQ title" />
              <Textarea
                value={form.successNotes.join("\n")}
                onChange={(e) =>
                  updateField(
                    "successNotes",
                    e.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                  )
                }
                placeholder="Notes, one per line"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {([
            ["pricingFaqs", "Pricing FAQs", form.pricingFaqTitle, form.pricingFaqDescription],
            ["successFaqs", "Success Pack FAQs", form.successFaqTitle, ""],
          ] as const).map(([key, title, sectionTitle, sectionDescription]) => {
            const items = form[key];

            return (
              <div key={key} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-sm text-slate-500">{sectionTitle}</p>
                    {sectionDescription ? (
                      <p className="text-sm text-slate-500">{sectionDescription}</p>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      updateField(key, [
                        ...items,
                        { question: "", answer: "", order: items.length, enabled: true },
                      ] as FormState[typeof key])
                    }
                  >
                    Add FAQ
                  </Button>
                </div>
                <div className="space-y-3">
                  {items.map((faq, index) => (
                    <div key={`${key}-${index}`} className="rounded-xl border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Switch checked={faq.enabled} onCheckedChange={(checked) => updateField(key, items.map((item, itemIndex) => itemIndex === index ? { ...item, enabled: checked } : item) as FormState[typeof key])} />
                        <Button type="button" variant="outline" onClick={() => updateField(key, resequence(moveItem(items, index, -1)) as FormState[typeof key])}>Up</Button>
                        <Button type="button" variant="outline" onClick={() => updateField(key, resequence(moveItem(items, index, 1)) as FormState[typeof key])}>Down</Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            if (!window.confirm("Delete this FAQ?")) return;
                            updateField(
                              key,
                              resequence(items.filter((_, itemIndex) => itemIndex !== index)) as FormState[typeof key],
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                      <Input value={faq.question} onChange={(e) => updateField(key, items.map((item, itemIndex) => itemIndex === index ? { ...item, question: e.target.value } : item) as FormState[typeof key])} placeholder="Question" />
                      <Textarea className="mt-3" value={faq.answer} onChange={(e) => updateField(key, items.map((item, itemIndex) => itemIndex === index ? { ...item, answer: e.target.value } : item) as FormState[typeof key])} placeholder="Answer" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Standard Plan Content</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            <Input value={form.standardBackButton} onChange={(e) => updateField("standardBackButton", e.target.value)} placeholder="Back button" />
            <Input value={form.standardTitle} onChange={(e) => updateField("standardTitle", e.target.value)} placeholder="Title" />
            <Textarea value={form.standardDescription} onChange={(e) => updateField("standardDescription", e.target.value)} placeholder="Description" />
            <Input value={form.standardUserCountLabel} onChange={(e) => updateField("standardUserCountLabel", e.target.value)} placeholder="User count label" />
            <Input value={form.standardImplementationLabel} onChange={(e) => updateField("standardImplementationLabel", e.target.value)} placeholder="Implementation label" />
            <Input value={form.standardSuccessPack} onChange={(e) => updateField("standardSuccessPack", e.target.value)} placeholder="Success pack label" />
            <Input value={form.standardSuccessPackSublabel} onChange={(e) => updateField("standardSuccessPackSublabel", e.target.value)} placeholder="Success pack sublabel" />
            <Textarea value={form.standardSuccessPackMessage} onChange={(e) => updateField("standardSuccessPackMessage", e.target.value)} placeholder="Success pack message" />
            <Input value={form.standardReadMoreButton} onChange={(e) => updateField("standardReadMoreButton", e.target.value)} placeholder="Read more button" />
            <Input value={form.standardTotalPerMonth} onChange={(e) => updateField("standardTotalPerMonth", e.target.value)} placeholder="Total per month label" />
            <Input value={form.standardBuyNow} onChange={(e) => updateField("standardBuyNow", e.target.value)} placeholder="Buy now label" />
            <Input value={form.standardFirstYearDiscount} onChange={(e) => updateField("standardFirstYearDiscount", e.target.value)} placeholder="First year discount label" />
            <Input value={form.standardPerUserNote} onChange={(e) => updateField("standardPerUserNote", e.target.value)} placeholder="Per user note" />
            <Input value={form.standardQuotaPrint} onChange={(e) => updateField("standardQuotaPrint", e.target.value)} placeholder="Print quote label" />
          </div>
        </section>
      </div>
    </div>
  );
}

// app/pricing/PricingClient.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Crown,
  Gem,
  Headphones,
  HelpCircle,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    badge: "For startups",
    monthlyPrice: "$29",
    annualPrice: "$278",
    periodMonthly: "/month",
    periodAnnual: "/year",
    description:
      "A focused workspace for small teams starting with CRM, tasks, sales, and basic reporting.",
    icon: Users,
    color: "from-violet-600 to-fuchsia-500",
    softBg: "bg-violet-50",
    iconText: "text-violet-600",
    cta: "Get Started",
    href: "/contact",
    highlighted: false,
    features: [
      "Up to 10 users",
      "10GB secure storage",
      "CRM and client pipeline",
      "Task and project management",
      "Basic sales tracking",
      "Email support",
      "Basic analytics dashboard",
      "Standard role access",
    ],
  },
  {
    name: "Professional",
    badge: "Most Popular",
    monthlyPrice: "$99",
    annualPrice: "$950",
    periodMonthly: "/month",
    periodAnnual: "/year",
    description:
      "Advanced automation, integrations, reports, and team visibility for fast-growing operations.",
    icon: Zap,
    color: "from-primary via-fuchsia-600 to-amber-500",
    softBg: "bg-primary/10",
    iconText: "text-primary",
    cta: "Start Free Trial",
    href: "/contact",
    highlighted: true,
    features: [
      "Up to 100 users",
      "1TB secure storage",
      "Advanced CRM and automation",
      "Inventory and sales reports",
      "Custom integrations and API access",
      "Priority support",
      "SSO and SAML options",
      "Custom branding",
      "Approval workflows",
      "Advanced activity logs",
    ],
  },
  {
    name: "Enterprise",
    badge: "Custom solution",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    periodMonthly: "",
    periodAnnual: "",
    description:
      "A tailored EdenERP environment for large teams, complex workflows, and dedicated support.",
    icon: Building2,
    color: "from-slate-950 via-violet-900 to-primary",
    softBg: "bg-slate-100",
    iconText: "text-slate-900",
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
    features: [
      "Unlimited users",
      "Unlimited storage",
      "Multi-company management",
      "Dedicated account manager",
      "Custom workflow development",
      "On-premises option",
      "24/7 premium support",
      "SLA guarantee",
      "Advanced security controls",
      "Custom reporting suite",
    ],
  },
];

const modules = [
  "CRM",
  "Sales",
  "Inventory",
  "Accounting",
  "HRM",
  "Projects",
  "Ecommerce",
  "Client Portal",
  "Automation",
  "Helpdesk",
  "Reports",
  "API",
];

const comparison = [
  {
    feature: "Users",
    starter: "10",
    professional: "100",
    enterprise: "Unlimited",
  },
  {
    feature: "Storage",
    starter: "10GB",
    professional: "1TB",
    enterprise: "Unlimited",
  },
  {
    feature: "CRM Pipeline",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "Task Management",
    starter: "Included",
    professional: "Advanced",
    enterprise: "Advanced",
  },
  {
    feature: "Inventory Management",
    starter: "Basic",
    professional: "Included",
    enterprise: "Advanced",
  },
  {
    feature: "Automation",
    starter: "Limited",
    professional: "Included",
    enterprise: "Advanced",
  },
  {
    feature: "API Access",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Custom Branding",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Approval Workflows",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "Support",
    starter: "Email",
    professional: "Priority",
    enterprise: "24/7 Dedicated",
  },
];

const addOns = [
  {
    title: "Extra Storage",
    price: "$10 / 100GB",
    description:
      "Add more secure storage for documents, images, reports, and operational records.",
    icon: ShieldCheck,
  },
  {
    title: "Advanced Analytics",
    price: "$25 / month",
    description:
      "Unlock deeper dashboards, custom exports, business intelligence, and performance tracking.",
    icon: BarChart3,
  },
  {
    title: "Implementation Support",
    price: "Custom",
    description:
      "Get expert help for migration, setup, onboarding, training, and workflow design.",
    icon: Sparkles,
  },
];

const benefits = [
  {
    title: "Transparent billing",
    description:
      "Clear pricing with no hidden implementation surprises for standard plans.",
    icon: CreditCard,
  },
  {
    title: "Secure workspace",
    description:
      "Role-based access, activity visibility, and secure business data handling.",
    icon: LockKeyhole,
  },
  {
    title: "Scale module by module",
    description:
      "Start with what you need today and expand as your business grows.",
    icon: Layers3,
  },
];

const faqs = [
  {
    q: "Can I change my plan anytime?",
    a: "Yes. You can upgrade or downgrade your plan anytime. Plan changes can be applied based on your billing cycle and workspace requirements.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. The Professional plan can include a 14-day trial so your team can explore the workflow before committing.",
  },
  {
    q: "Can I add only the modules I need?",
    a: "Yes. EdenERP is designed to scale module by module. You can start with CRM, tasks, sales, inventory, HR, ecommerce, or analytics depending on your business needs.",
  },
  {
    q: "Do you support custom workflows?",
    a: "Yes. Enterprise customers can request custom workflows, reports, integrations, role permissions, and deployment options.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Standard plans can support common online payment methods. Enterprise customers can use custom billing such as bank transfer or invoice-based payment.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Monthly plans do not require a long-term contract. Annual and enterprise agreements are also available for teams that need discounted or custom terms.",
  },
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl ${className}`}
      style={{
        fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl">
      <span>{icon}</span>
      {label}
    </div>
  );
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center gap-2 font-semibold text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
        Included
      </span>
    ) : (
      <span className="text-slate-400">Not included</span>
    );
  }

  return <span>{value}</span>;
}

export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  const isAnnual = billingCycle === "annually";

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf7ff_22%,_#ffffff_55%,_#fff8ed_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] lg:rounded-b-[7rem]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_12%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.16),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fbf7ff_62%,#ffffff_100%)]" />
        <div className="absolute left-10 top-28 -z-10 hidden h-24 w-24 rounded-[2rem] bg-white/80 shadow-xl backdrop-blur-xl lg:block" />
        <div className="absolute right-20 top-32 -z-10 hidden h-36 w-36 rounded-full bg-primary/10 blur-3xl lg:block" />
        <div className="absolute bottom-12 left-1/2 -z-10 hidden h-56 w-56 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex max-w-3xl flex-col justify-center space-y-8">
            <SectionEyebrow
              icon={<Sparkles className="h-4 w-4" />}
              label="Simple pricing for modern teams"
            />

            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/70">
                EdenERP Pricing
              </p>

              <h1
                className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
                style={{
                  fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
                }}
              >
                Choose the plan
                <span className="block bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] bg-clip-text text-transparent">
                  that grows with you.
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Start with the tools your team needs today, then scale into CRM,
                tasks, sales, accounting, inventory, ecommerce, automation, and
                reporting from one premium workspace.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                View Plans
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/80 px-7 py-4 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-white"
              >
                Talk to Sales
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              {["No hidden fees", "Cancel anytime", "14-day trial"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="absolute -left-4 top-8 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Best value
                  </p>
                  <p className="text-xs text-slate-500">Professional plan</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 bottom-12 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Rocket className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Scale-ready
                  </p>
                  <p className="text-xs text-slate-500">
                    Add modules anytime
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/75 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-medium text-white/50">
                    EdenERP Billing Center
                  </span>
                </div>

                <div className="space-y-5 p-5">
                  <div className="rounded-2xl bg-white p-5 text-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          Current plan
                        </p>
                        <h3 className="mt-1 text-2xl font-bold">
                          Professional
                        </h3>
                      </div>
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                        <Crown className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        ["100", "Users"],
                        ["1TB", "Storage"],
                        ["24/7", "Visibility"],
                      ].map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-2xl bg-slate-50 p-3 text-center"
                        >
                          <p className="font-bold text-slate-950">{value}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <CircleDollarSign className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-lg font-bold">
                        {isAnnual ? "$950/yr" : "$99/mo"}
                      </p>
                      <p className="text-xs text-white/50">Predictable cost</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <Clock3 className="h-5 w-5 text-amber-300" />
                      <p className="mt-3 text-lg font-bold">
                        {isAnnual ? "20%" : "14 days"}
                      </p>
                      <p className="text-xs text-white/50">
                        {isAnnual ? "Annual saving" : "Trial available"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[linear-gradient(135deg,_rgba(124,58,237,0.35),_rgba(245,158,11,0.22))] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <Workflow className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Automation included
                        </p>
                        <p className="text-xs text-white/60">
                          Workflows, approvals, reports
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Strip */}
      <section className="border-y border-slate-200 bg-white/70 py-8 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {modules.map((module) => (
              <span
                key={module}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        id="plans"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<Gem className="h-4 w-4" />}
            label="Flexible plans"
          />
          <div className="mt-8">
            <ScriptHeading>Simple pricing. Serious business power.</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Pick the package that matches your current stage. You can expand
            modules, users, storage, and support as your operation grows.
          </p>

          <div className="mt-8 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("annually")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "annually"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              Annually
              <span
                className={`ml-2 rounded-full px-2 py-1 text-xs ${
                  billingCycle === "annually"
                    ? "bg-white/20 text-white"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`group relative rounded-[2.2rem] transition-all duration-300 ${
                  plan.highlighted
                    ? "lg:-mt-5 lg:mb-5"
                    : "hover:-translate-y-1"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] px-5 py-2 text-sm font-semibold text-white shadow-xl">
                    Most Popular
                  </div>
                )}

                <div
                  className={`absolute inset-0 rounded-[2.2rem] bg-gradient-to-br ${plan.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20 ${
                    plan.highlighted ? "opacity-20" : ""
                  }`}
                />

                <div
                  className={`relative flex h-full flex-col rounded-[2.2rem] border bg-white p-7 shadow-sm transition-all duration-300 group-hover:shadow-2xl ${
                    plan.highlighted
                      ? "border-primary/40 shadow-[0_35px_90px_rgba(124,58,237,0.18)]"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {plan.badge}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-slate-950">
                        {plan.name}
                      </h3>
                    </div>

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${plan.softBg} ${plan.iconText}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <p className="mt-5 min-h-20 text-sm leading-7 text-slate-600">
                    {plan.description}
                  </p>

                  <div className="mt-7">
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-bold tracking-tight text-slate-950">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>

                      <span className="pb-2 text-base font-medium text-slate-500">
                        {isAnnual ? plan.periodAnnual : plan.periodMonthly}
                      </span>
                    </div>

                    {isAnnual && plan.name !== "Enterprise" && (
                      <p className="mt-3 text-sm font-semibold text-emerald-600">
                        You save 20% with annual billing
                      </p>
                    )}
                  </div>

                  <Link
                    href={plan.href}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-primary text-white shadow-xl shadow-primary/20 hover:-translate-y-0.5 hover:shadow-2xl"
                        : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-lg"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-8 border-t border-slate-100 pt-7">
                    <p className="text-sm font-semibold text-slate-950">
                      Features included:
                    </p>

                    <ul className="mt-5 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm leading-6 text-slate-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-[#f6f5f8] py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="self-center">
              <SectionEyebrow
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Built for confident scaling"
              />
              <div className="mt-8">
                <ScriptHeading>
                  Pricing that stays clear as your business grows.
                </ScriptHeading>
              </div>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                EdenERP keeps your cost structure predictable while giving your
                team room to add modules, users, workflows, storage, reporting,
                and enterprise support.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-white bg-white/85 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<BarChart3 className="h-4 w-4" />}
            label="Plan comparison"
          />
          <div className="mt-8">
            <ScriptHeading>Compare every plan clearly.</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Review users, storage, automation, integrations, branding, and
            support before choosing the right plan for your team.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-5 text-left font-bold text-slate-950">
                    Feature
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-slate-950">
                    Starter
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-primary">
                    Professional
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-slate-950">
                    Enterprise
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-950">
                      {row.feature}
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      <FeatureValue value={row.starter} />
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      <FeatureValue value={row.professional} />
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      <FeatureValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#fbf7ff_0%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Sparkles className="h-4 w-4" />}
              label="Optional add-ons"
            />
            <div className="mt-8">
              <ScriptHeading>Extend your workspace when needed.</ScriptHeading>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Add extra capacity, expert implementation help, or advanced
              analytics without changing your whole plan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {addOns.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-primary">
                    {item.price}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[linear-gradient(180deg,_#fff8ed_0%,_#ffffff_100%)] py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<HelpCircle className="h-4 w-4" />}
              label="Questions & answers"
            />
            <div className="mt-8">
              <ScriptHeading>Frequently asked questions.</ScriptHeading>
            </div>
          </div>

          <div className="mt-12 grid gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <h3 className="text-base font-semibold text-slate-950 transition-colors group-hover:text-primary">
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#111827_0%,_#4c1d95_55%,_#f59e0b_140%)] px-6 py-14 text-center text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:px-10 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.14),transparent_26%)]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl">
              <Headphones className="h-8 w-8" />
            </div>

            <h2
              className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{
                fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
              }}
            >
              Ready to run your business smarter?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
              Start with the plan that fits today, then add more modules,
              automation, reporting, and support as your company grows.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/15"
              >
                Talk to Sales
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                Premium ERP experience
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Secure role access
              </span>
              <span className="inline-flex items-center gap-2">
                <Rocket className="h-4 w-4 text-amber-300" />
                Scale without chaos
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

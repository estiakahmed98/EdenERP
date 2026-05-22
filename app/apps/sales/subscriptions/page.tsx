"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  FileText,
  LineChart,
  Repeat,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

const featureCards = [
  {
    title: "Automated renewals",
    description:
      "Renew contracts, invoices, and payment schedules automatically without manual tracking.",
    icon: Repeat,
  },
  {
    title: "Customer portal",
    description:
      "Let customers view plans, invoices, renewals, and payment history from a secure portal.",
    icon: Users,
  },
  {
    title: "Recurring invoices",
    description:
      "Generate subscription invoices based on billing cycles, plans, and contract rules.",
    icon: FileText,
  },
  {
    title: "Payment automation",
    description:
      "Collect payments, retry failed charges, and keep customer billing updated.",
    icon: CreditCard,
  },
  {
    title: "Revenue analytics",
    description:
      "Track MRR, ARR, churn, renewals, lifetime value, and growth opportunities.",
    icon: BarChart3,
  },
  {
    title: "Retention workflows",
    description:
      "Trigger smart follow-ups before renewals, failed payments, or cancellation risks.",
    icon: ShieldCheck,
  },
];

const apps = [
  { title: "CRM", desc: "Manage renewals", icon: Users },
  { title: "Sales", desc: "Upsell subscriptions", icon: TrendingUp },
  { title: "Invoicing", desc: "Recurring billing", icon: FileText },
  { title: "Accounting", desc: "Revenue reporting", icon: BarChart3 },
  { title: "Payments", desc: "Auto collection", icon: WalletCards },
  { title: "Analytics", desc: "Subscription insights", icon: LineChart },
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
      style={scriptFont}
    >
      {children}
    </h2>
  );
}

function HandUnderline({
  children,
  color = "bg-sky-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-2 w-[105%] -translate-x-1/2 -rotate-1 rounded-full ${color}`}
      />
    </span>
  );
}

function HandCircle({
  children,
  color = "border-teal-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.25em] -translate-y-1/2 -rotate-3 rounded-[50%] border-[5px] ${color}`}
      />
    </span>
  );
}

function SectionEyebrow({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
      <span className="text-amber-500">{icon}</span>
      {label}
    </div>
  );
}

function SubscriptionPreview() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-semibold text-slate-800">
            Adon Subscriptions
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
          Active billing
        </span>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <div className="grid grid-cols-[90px_1fr_120px_120px_120px] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span>ID</span>
            <span>Customer</span>
            <span>Next bill</span>
            <span>Revenue</span>
            <span>Status</span>
          </div>

          {[
            ["S00016", "Sophia Thomas", "09/25/2026", "$350/mo", "In Progress"],
            ["S00017", "Bright Studio", "10/12/2026", "$1,250/mo", "Quotation"],
            ["S00018", "Green Valley", "10/20/2026", "$650/mo", "In Progress"],
            ["S00019", "Nova Retail", "11/01/2026", "$2,400/mo", "In Progress"],
            ["S00020", "Urban Works", "11/15/2026", "$980/mo", "Quotation"],
          ].map((row, index) => (
            <div
              key={row[0]}
              className={`grid grid-cols-[90px_1fr_120px_120px_120px] px-4 py-3 text-sm ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
              }`}
            >
              <span className="font-medium text-slate-700">{row[0]}</span>
              <span className="text-slate-700">{row[1]}</span>
              <span className="text-rose-500">{row[2]}</span>
              <span className="font-semibold text-slate-900">{row[3]}</span>
              <span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    row[4] === "Quotation"
                      ? "bg-sky-100 text-sky-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {row[4]}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-200">
        <CirclePlay className="h-7 w-7 fill-amber-500 text-amber-500" />
      </button>
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(245,158,11,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(14,165,233,0.11),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Subscription management"
            icon={<Repeat className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Recurring revenues.{" "}
              <span className="text-amber-500" style={scriptFont}>
                Simplified.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              From subscription quotes and renewals to automated billing and
              retention workflows, Adon ERP keeps recurring revenue predictable.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#advisor"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-amber-300 hover:text-amber-700"
            >
              Meet an advisor
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <SubscriptionPreview />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-amber-500" />
              Auto renewals
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
              Revenue synced
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            Focus on selling
            <br />
            great services
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-lg font-semibold text-slate-800">
            Simple features to manage subscriptions automatically.
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Concentrate on customer relationships while Adon ERP handles
            contract creation, automated invoices, recurring renewals, payment
            reminders, and plan upgrades according to your settings.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="rounded-3xl bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-950">
                Office cleaning monthly
              </p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Active
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Plan", "Business Service"],
                ["Billing", "Monthly"],
                ["Renewal", "Automatic"],
                ["Next Invoice", "$850.00"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow-sm"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          From happy visitors to satisfied customers
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold text-slate-700">
          Create great long lasting relations with your subscribers.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "No login required and easy signup",
              description:
                "Let customers subscribe quickly without friction or long account creation steps.",
              icon: FileText,
            },
            {
              title: "User-friendly portal",
              description:
                "Give subscribers a clean portal to review contracts, invoices, and renewals.",
              icon: Users,
            },
            {
              title: "Automatic payments",
              description:
                "Save time with automated collection, payment retries, and invoice creation.",
              icon: CreditCard,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-4xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>Get a more efficient sales force</ScriptHeading>

          <p className="mx-auto mt-5 max-w-xl text-base font-semibold text-slate-700">
            Save time on routine tasks and focus on growing revenue.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Reusable templates",
                description:
                  "Speed up sales with contract templates for your most frequent subscription scenarios.",
                icon: FileText,
              },
              {
                title: "Smart reason tracking",
                description:
                  "Understand why customers cancel, pause, downgrade, or renew their subscription.",
                icon: Target,
              },
              {
                title: "Focused sales activity",
                description:
                  "Help sales teams focus on acquiring new customers and upgrading existing ones.",
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-3xl bg-white text-amber-500 shadow-sm ring-4 ring-slate-950/90">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Analysis tools to optimize your business
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold text-slate-700">
          Find out what metrics to act on in a click.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Improved sales performance",
              description:
                "Analyze individual and team performance to improve subscription growth.",
              icon: BarChart3,
            },
            {
              title: "Revenue analytics",
              description:
                "Track MRR, ARR, churn, upgrades, downgrades, renewals, and lifetime value.",
              icon: LineChart,
            },
            {
              title: "Future forecasting",
              description:
                "Forecast recurring revenue and compare growth against your targets.",
              icon: CalendarClock,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-4xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 p-5">
                  <Icon className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            All the <HandCircle color="border-teal-400">features</HandCircle>
            <br />
            done <HandUnderline color="bg-sky-400">right.</HandUnderline>
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          One <HandUnderline color="bg-sky-400">need</HandUnderline>, one{" "}
          <HandUnderline color="bg-sky-400">app</HandUnderline>.
        </ScriptHeading>

        <p className="mt-3 max-w-xl text-slate-600">
          Expand subscription workflows across the Adon ERP ecosystem.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-amber-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{app.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-amber-50 to-orange-50 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern subscription teams
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600">
              Teams use Adon Subscriptions to manage renewals, automate billing,
              and grow predictable revenue.
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-amber-600" />

        <ScriptHeading>
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Build recurring revenue workflows with automated billing, renewals,
          payments, and customer retention inside Adon ERP.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            id="advisor"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-amber-300 hover:text-amber-700"
          >
            Contact Sales
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Free trial available · No credit card required · Instant access
        </p>
      </section>
    </main>
  );
}
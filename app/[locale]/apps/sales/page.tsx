"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  BadgePercent,
  BarChart3,
  Boxes,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  FileCheck2,
  FileText,
  Globe2,
  HandCoins,
  Layers3,
  PackageCheck,
  Palette,
  ReceiptText,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tags,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

const features = [
  {
    title: "Reporting and forecasting",
    description:
      "Track quotation value, expected revenue, conversion rate, and team performance.",
    icon: BarChart3,
  },
  {
    title: "Shipping integration",
    description:
      "Connect quotations with delivery costs, carriers, and fulfilment workflows.",
    icon: PackageCheck,
  },
  {
    title: "Invoicing",
    description:
      "Convert approved quotations into invoices with products, taxes, and terms.",
    icon: ReceiptText,
  },
  {
    title: "Upselling",
    description:
      "Recommend related products and bundles directly inside the sales flow.",
    icon: Tags,
  },
  {
    title: "Quotation templates",
    description:
      "Reuse polished templates for different services, packages, and customer types.",
    icon: Layers3,
  },
  {
    title: "Customer communication",
    description:
      "Send quotes, reminders, and revisions while keeping the customer timeline clean.",
    icon: Send,
  },
];

const apps = [
  { title: "CRM", desc: "Convert leads into quotes", icon: Users },
  { title: "Invoicing", desc: "Bill approved orders", icon: ReceiptText },
  { title: "Sign", desc: "Approve documents online", icon: FileCheck2 },
  {
    title: "Accounting",
    desc: "Track revenue and taxes",
    icon: BadgeDollarSign,
  },
  { title: "Online Payment", desc: "Get paid faster", icon: CreditCard },
  { title: "Inventory", desc: "Reserve products instantly", icon: Boxes },
];

const strategies = [
  {
    title: "Loyalty programs",
    icon: HandCoins,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "Coupons",
    icon: BadgePercent,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    title: "Gift cards",
    icon: WalletCards,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "eWallet",
    icon: CreditCard,
    color: "text-sky-500",
    bg: "bg-sky-50",
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl ${className}`}
      style={scriptFont}
    >
      {children}
    </h2>
  );
}

function HandUnderline({
  children,
  color = "bg-amber-400",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-950/40 px-4 py-2 text-sm font-semibold text-rose-700 dark:text-rose-300 shadow-sm ring-1 ring-rose-100 dark:ring-rose-800">
      <span className="text-rose-500 dark:text-rose-400">{icon}</span>
      {label}
    </div>
  );
}

function QuotationPreview() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            Quotation · SO0319
          </span>
        </div>
        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Ready to send
        </span>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Deal summary
          </p>

          <div className="mt-5 space-y-4">
            {[
              ["Quote value", "$12,650.00"],
              ["Expected margin", "38%"],
              ["Payment term", "Net 15"],
              ["Valid until", "30 days"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 shadow-sm"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="mt-1 font-bold text-slate-950 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500 dark:text-rose-400">
                Proposal
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                Business automation package
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Prepared for Green Valley Trading with implementation,
                onboarding, support, and optional add-ons.
              </p>
            </div>
            <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/30 px-4 py-3 text-right">
              <p className="text-xs text-rose-500 dark:text-rose-400">Status</p>
              <p className="font-bold text-rose-700 dark:text-rose-300">
                Draft
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800">
            {[
              ["ERP Implementation", "1", "$8,500", "$8,500"],
              ["Team Training", "3", "$450", "$1,350"],
              ["Premium Support", "1", "$2,800", "$2,800"],
            ].map((row, index) => (
              <div
                key={row[0]}
                className={`grid grid-cols-[1fr_60px_90px_90px] gap-3 px-4 py-3 text-sm ${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <span className="font-medium text-slate-800 dark:text-white">
                  {row[0]}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {row[1]}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {row[2]}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {row[3]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Preview
            </button>
            <button className="rounded-xl bg-linear-to-r from-rose-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 dark:shadow-rose-500/30">
              Send quote
            </button>
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-rose-600 text-rose-600 dark:fill-rose-500 dark:text-rose-500" />
      </button>
    </div>
  );
}

export default function SalesQuotationPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(244,63,94,0.13),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(251,146,60,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(244,63,94,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(251,146,60,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Smart sales quotations"
            icon={<FileText className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Quotations{" "}
              <span
                className="text-rose-500 dark:text-rose-400"
                style={scriptFont}
              >
                that convert
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Adon ERP Sales helps your team create polished quotes, manage
              pricing, close deals faster, and convert opportunities into
              orders.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-rose-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5 dark:shadow-rose-500/30"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-rose-300 hover:text-rose-700 dark:hover:border-rose-600 dark:hover:text-rose-400"
            >
              Watch Demo
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <QuotationPreview />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-rose-600 dark:text-rose-400" />
              Faster proposals
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Ready to approve
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionEyebrow
              label="Manage products and pricing"
              icon={<ShoppingCart className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              Manage your products,
              <br />
              pricing, and discounts
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Build accurate quotations from a connected product catalog. Add
              bundles, optional items, discounts, taxes, and delivery costs
              without manual calculation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.1)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <p className="font-semibold text-slate-950 dark:text-white">
                Price list
              </p>
              <div className="mt-4 space-y-3">
                {["Starter Plan", "Business Plan", "Enterprise Add-on"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        ${[499, 1299, 2899][index]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.1)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <p className="font-semibold text-slate-950 dark:text-white">
                Product catalog
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {["CRM", "ERP", "Support", "Training"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-linear-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 p-4 text-center"
                  >
                    <PackageCheck className="mx-auto h-6 w-6 text-rose-600 dark:text-rose-400" />
                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -bottom-4 -left-14 h-20 w-20 rounded-full border-8 border-slate-200 dark:border-slate-700" />
            <div className="absolute -bottom-7 left-2 h-14 w-14 rounded-full border-6 border-slate-200 dark:border-slate-700" />
            <div className="relative rotate-6 rounded-2xl bg-amber-400 dark:bg-amber-500 p-4 shadow-xl ring-4 ring-slate-950 dark:ring-slate-800">
              <FileText className="h-14 w-14 text-slate-950 dark:text-slate-900" />
            </div>
          </div>
        </div>

        <SectionEyebrow
          label="Quote templates"
          icon={<Layers3 className="h-4 w-4" />}
        />

        <ScriptHeading className="mt-5">
          Use quote templates
          <br />
          to{" "}
          <HandUnderline color="bg-amber-400 dark:bg-amber-500">
            automate common orders
          </HandUnderline>
        </ScriptHeading>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Save your best sales structures as reusable templates. Your team can
          prepare consistent, branded, and accurate quotations in seconds.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                Template
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Monthly service package
              </h3>
            </div>
            <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition">
              Use template
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Implementation", "$4,500"],
              ["Support", "$950/mo"],
              ["Training", "$1,250"],
            ].map(([title, price]) => (
              <div
                key={title}
                className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5"
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
                  {price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label="Customer portal"
            icon={<Globe2 className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Close deals faster with
            <br />
            the customer portal
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Let customers review quotations, ask questions, accept terms, sign
            documents, and pay online through a clean branded portal.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Online quote acceptance",
              "Integrated payment option",
              "Automatic confirmation and order creation",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5">
            <p className="font-semibold text-slate-950 dark:text-white">
              Customer portal
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Review quote",
                "Add comment",
                "Accept & sign",
                "Pay online",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 shadow-sm"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50 text-sm font-bold text-rose-700 dark:text-rose-300">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionEyebrow
              label="Qualified leads"
              icon={<ShieldCheck className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              Only focus on
              <br />
              <HandCircle color="border-teal-400 dark:border-teal-500">
                qualified leads
              </HandCircle>
            </ScriptHeading>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Score opportunities automatically using deal value, engagement,
              customer history, and probability so your sales team focuses on
              what matters most.
            </p>
          </div>

          <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Lead score", "92%"],
                ["Win probability", "74%"],
                ["Expected revenue", "$18.4k"],
                ["Next action", "Send proposal"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <ScriptHeading>
              Create custom
              <br />
              pricing strategies
            </ScriptHeading>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {strategies.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-3xl ${item.bg} dark:bg-opacity-20 ${item.color} shadow-sm ring-4 ring-slate-950/90 dark:ring-slate-700`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>
                  <p
                    className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white"
                    style={scriptFont}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5">
            <p className="font-semibold text-slate-950 dark:text-white">
              Product configuration
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Seats",
                "Support level",
                "Implementation speed",
                "Payment term",
              ].map((item, index) => (
                <div key={item}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                    <span className="text-rose-600 dark:text-rose-400">
                      {["25 users", "Premium", "Fast", "Net 15"][index]}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-linear-to-r from-rose-500 to-orange-400"
                      style={{ width: `${[70, 85, 60, 90][index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionEyebrow
            label="Product control"
            icon={<Palette className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Complete product
            <br />
            control
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Configure variants, optional products, discounts, packages, and
            customer-specific price rules without breaking your sales workflow.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            All the{" "}
            <HandCircle color="border-teal-400 dark:border-teal-500">
              features
            </HandCircle>
            <br />
            done{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-500">
              right.
            </HandUnderline>
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300"
          >
            See all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          One{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-500">need</HandUnderline>
          , one{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-500">app</HandUnderline>.
        </ScriptHeading>
        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
          Expand your sales workflow across the Adon ERP ecosystem.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 dark:bg-slate-900/70 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern sales teams
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Teams use Adon Sales to create better quotes, close faster, and
              grow revenue with confidence.
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-rose-600 dark:text-rose-400" />

        <ScriptHeading>
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Build premium quotations, automate approvals, and turn more
          opportunities into confirmed orders with Adon ERP.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5 dark:shadow-rose-500/30"
          >
            Contact Sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

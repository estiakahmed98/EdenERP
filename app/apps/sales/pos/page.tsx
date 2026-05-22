"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  Gift,
  Globe2,
  Grid3X3,
  HandCoins,
  MonitorSmartphone,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
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
    title: "AI checkout assistance",
    description:
      "Speed up billing with smart product search, shortcut actions, and instant cart suggestions.",
    icon: Sparkles,
  },
  {
    title: "Offline payments",
    description:
      "Continue selling even when the internet drops, then sync everything automatically.",
    icon: CreditCard,
  },
  {
    title: "Loyalty programs",
    description:
      "Reward repeat customers with points, coupons, memberships, and custom benefits.",
    icon: HandCoins,
  },
  {
    title: "Integrated payments",
    description:
      "Accept cards, wallets, cash, and bank payments directly from your Adon ERP POS.",
    icon: WalletCards,
  },
  {
    title: "Multiple cashiers",
    description:
      "Manage shifts, cashier permissions, opening balances, and closing reports.",
    icon: Users,
  },
  {
    title: "Flexible invoicing",
    description:
      "Print receipts, send invoices by email, or convert POS orders into accounting entries.",
    icon: ReceiptText,
  },
];

const apps = [
  { title: "Website", desc: "Sell online and offline", icon: Globe2 },
  { title: "eCommerce", desc: "Sync storefront orders", icon: ShoppingBag },
  { title: "Inventory", desc: "Keep stock accurate", icon: PackageCheck },
  { title: "Email Marketing", desc: "Bring customers back", icon: Tags },
  { title: "CRM", desc: "Know every customer", icon: Users },
  { title: "Accounting", desc: "Close books faster", icon: BarChart3 },
];

const loyaltyTools = [
  {
    title: "Coupons",
    icon: BadgePercent,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "Loyalty cards",
    icon: Star,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    title: "Promotions",
    icon: Gift,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  { title: "Discounts", icon: Tags, color: "text-cyan-500", bg: "bg-cyan-50" },
  {
    title: "Gift cards",
    icon: WalletCards,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
      <span className="text-cyan-500">{icon}</span>
      {label}
    </div>
  );
}

function PosPreview() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-cyan-600" />
          <span className="text-sm font-semibold text-slate-800">
            Adon POS · Retail Counter
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
          Online
        </span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr_0.55fr]">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Order</p>

          <div className="mt-4 space-y-3">
            {[
              ["Office chair", "$120.00"],
              ["Desk lamp", "$38.00"],
              ["Storage box", "$22.00"],
            ].map(([item, price]) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow-sm"
              >
                <span className="font-medium text-slate-700">{item}</span>
                <span className="font-bold text-slate-950">{price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-cyan-600 p-4 text-white">
            <div className="flex items-center justify-between text-sm opacity-90">
              <span>Total</span>
              <span>$180.00</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-white py-2 text-sm font-bold text-cyan-700">
              Payment
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Products</p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
              32 items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Chair", "Table", "Sofa", "Lamp", "Shelf", "Cabinet"].map(
              (item, index) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div
                    className={`h-20 ${
                      [
                        "bg-linear-to-br from-cyan-100 to-sky-200",
                        "bg-linear-to-br from-emerald-100 to-teal-200",
                        "bg-linear-to-br from-amber-100 to-orange-200",
                        "bg-linear-to-br from-rose-100 to-pink-200",
                        "bg-linear-to-br from-violet-100 to-purple-200",
                        "bg-linear-to-br from-slate-100 to-slate-200",
                      ][index]
                    }`}
                  />
                  <div className="p-3 text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      {item}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">Tap to add</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-4 text-white">
          <p className="text-sm font-semibold">Card terminal</p>
          <div className="mt-4 rounded-2xl bg-white/10 p-4">
            <CreditCard className="mx-auto h-10 w-10 text-cyan-300" />
            <p className="mt-3 text-center text-xs text-white/70">
              Tap, swipe, or scan
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
              <div
                key={key}
                className="flex aspect-square items-center justify-center rounded-xl bg-white/10 text-sm"
              >
                {key}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-200">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600" />
      </button>
    </div>
  );
}

export default function PosRetailPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Modern point of sale"
            icon={<Store className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              <HandUnderline>PoS</HandUnderline>{" "}
              <span className="text-emerald-500" style={scriptFont}>
                made for retail
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Adon ERP POS helps your team sell faster, manage inventory, reward
              loyal customers, and sync every transaction with accounting.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700"
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
            <PosPreview />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600" />
              Fast checkout
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
              Synced with ERP
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Complex <HandCircle color="border-teal-400">meets</HandCircle>{" "}
          <HandCircle color="border-cyan-400">intuitive</HandCircle>
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Handle advanced retail operations with a clean interface your cashier
          can understand in minutes.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-slate-50 p-5 text-left">
              {[
                "Customer account",
                "Loyalty program",
                "Multi-price rules",
                "Multiple payment methods",
              ].map((item) => (
                <div
                  key={item}
                  className="mb-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-linear-to-br from-cyan-50 to-emerald-50 p-5">
              <div className="grid grid-cols-3 gap-3">
                {["Desk", "Chair", "Lamp", "Shelf", "Sofa", "Table"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <ShoppingBag className="mx-auto h-6 w-6 text-cyan-600" />
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-white" />
            <div className="relative rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Self ordering</p>
                  <div className="mt-4 space-y-3">
                    {["Select product", "Choose options", "Pay securely"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-cyan-600 p-4 text-white">
                  <Smartphone className="h-8 w-8" />
                  <p className="mt-4 text-2xl font-bold">Order #248</p>
                  <p className="mt-2 text-sm text-white/80">
                    Ready for payment
                  </p>
                  <button className="mt-6 w-full rounded-xl bg-white py-2 text-sm font-bold text-cyan-700">
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow
              label="Self ordering"
              icon={<MonitorSmartphone className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              Self ordering
              <br />
              for the win
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Let customers order from a kiosk, QR menu, tablet, or mobile page.
              Orders flow directly into your POS and inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <ScriptHeading>
            Reward loyal
            <br />
            customers
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Keep customers coming back with points, memberships, coupons,
            birthday rewards, and targeted retail promotions.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {loyaltyTools.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="text-center">
                <div
                  className={`mx-auto flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-3xl ${item.bg} ${item.color} shadow-sm ring-4 ring-slate-950/90`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <p
                  className="mt-5 text-2xl font-semibold text-slate-950"
                  style={scriptFont}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            <HandUnderline color="bg-rose-300">Cross-channel</HandUnderline>{" "}
            selling
          </ScriptHeading>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Sell from your store, website, social channels, and mobile orders
            while keeping stock and accounting perfectly connected.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
              <p className="text-left font-semibold text-slate-950">
                Online order
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "Customer checkout",
                  "Payment confirmed",
                  "Stock reserved",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
              <p className="text-left font-semibold text-slate-950">
                Store workflow
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Pick", "Pack", "Ship", "Invoice"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-linear-to-br from-cyan-50 to-emerald-50 px-4 py-5 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
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

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
          >
            See all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          One <HandUnderline color="bg-sky-400">need</HandUnderline>, one{" "}
          <HandUnderline color="bg-sky-400">app</HandUnderline>.
        </ScriptHeading>
        <p className="mt-3 max-w-xl text-slate-600">
          Expand your retail workflow across the Adon ERP ecosystem.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-cyan-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern retailers
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600">
              Retail teams use Adon POS to sell faster, manage stock, and serve
              customers with a connected business system.
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-cyan-600" />

        <ScriptHeading>
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Build a connected retail operation with POS, inventory, customer
          loyalty, ecommerce, and accounting in one Adon ERP workspace.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700"
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

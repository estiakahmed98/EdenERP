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
  HandCoins,
  MonitorSmartphone,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Table2,
  Tags,
  Utensils,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

const features = [
  {
    title: "Compatible with any device",
    description: "Run your restaurant POS on tablets, phones, laptops, or touch screens.",
    icon: MonitorSmartphone,
  },
  {
    title: "Offline payments",
    description: "Keep taking orders and payments even when your connection drops.",
    icon: CreditCard,
  },
  {
    title: "Integrated payments",
    description: "Accept cards, cash, mobile wallet, and online payments from one screen.",
    icon: WalletCards,
  },
  {
    title: "Split bills & tips",
    description: "Split orders, collect tips, and manage shared tables with ease.",
    icon: ReceiptText,
  },
  {
    title: "Kitchen printing",
    description: "Send food items directly to the kitchen with status tracking.",
    icon: Utensils,
  },
  {
    title: "Customer loyalty",
    description: "Reward repeat guests with points, coupons, and personalized offers.",
    icon: HandCoins,
  },
];

const apps = [
  { title: "Website", desc: "Online menu and ordering", icon: Globe2 },
  { title: "eCommerce", desc: "Sell food online", icon: ShoppingBag },
  { title: "Inventory", desc: "Track ingredients", icon: PackageCheck },
  { title: "Email Marketing", desc: "Bring guests back", icon: Tags },
  { title: "CRM", desc: "Guest relationships", icon: Users },
  { title: "Accounting", desc: "Restaurant finance", icon: BarChart3 },
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

function BrushHighlight({
  children,
  color = "bg-rose-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.05em] -translate-y-1/2 -rotate-2 rounded-xl ${color} opacity-80`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-100">
      <span className="text-sky-500">{icon}</span>
      {label}
    </div>
  );
}

function RestaurantPosPreview() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-sky-600" />
          <span className="text-sm font-semibold text-slate-800">
            Eden Restaurant POS
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
          Table 12
        </span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Current order</p>

          <div className="mt-4 space-y-3">
            {[
              ["Chicken Burger", "$12.50"],
              ["French Fries", "$4.20"],
              ["Fresh Juice", "$3.80"],
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

          <div className="mt-4 rounded-2xl bg-sky-600 p-4 text-white">
            <div className="flex justify-between text-sm opacity-90">
              <span>Total</span>
              <span>$20.50</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-white py-2 text-sm font-bold text-sky-700">
              Pay order
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Menu</p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
              48 items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Burger", "Pizza", "Pasta", "Tacos", "Salad", "Coffee"].map(
              (item, index) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div
                    className={`h-20 ${
                      [
                        "bg-linear-to-br from-orange-100 to-amber-200",
                        "bg-linear-to-br from-rose-100 to-pink-200",
                        "bg-linear-to-br from-sky-100 to-cyan-200",
                        "bg-linear-to-br from-emerald-100 to-teal-200",
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
              )
            )}
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-200">
        <CirclePlay className="h-7 w-7 fill-sky-600 text-sky-600" />
      </button>
    </div>
  );
}

export default function RestaurantPosPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(14,165,233,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Restaurant point of sale"
            icon={<Utensils className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              <HandUnderline color="bg-sky-400">All-in-one</HandUnderline>{" "}
              <span className="text-sky-500" style={scriptFont}>
                restaurant PoS
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Eden ERP Restaurant POS connects your tables, orders, kitchen,
              payments, inventory, and accounting in one seamless workflow.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-sky-300 hover:text-sky-700"
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
            <RestaurantPosPreview />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-sky-600" />
              Faster service
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
              Kitchen synced
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          One{" "}
          <HandUnderline color="bg-sky-400">interface</HandUnderline>
          <br />
          for seamless service
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
          From floor orders to kitchen preparation and payment collection,
          every restaurant workflow stays connected.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl bg-slate-50 p-5 text-left">
              {[
                "Floor plan control",
                "Loyalty programs",
                "Kitchen routing",
                "Split payments",
              ].map((item) => (
                <div
                  key={item}
                  className="mb-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-linear-to-br from-sky-50 to-emerald-50 p-5">
              <div className="grid grid-cols-3 gap-3">
                {["Burger", "Pizza", "Pasta", "Rice", "Coffee", "Juice"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <Utensils className="mx-auto h-6 w-6 text-sky-600" />
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {item}
                      </p>
                    </div>
                  )
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
                  <p className="font-semibold text-slate-900">QR menu</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Meal", "Drink", "Dessert", "Add-on"].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white px-4 py-5 text-center text-sm text-slate-600 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-sky-600 p-4 text-white">
                  <Smartphone className="h-8 w-8" />
                  <p className="mt-4 text-2xl font-bold">Order #482</p>
                  <p className="mt-2 text-sm text-white/80">
                    Waiting for payment
                  </p>
                  <button className="mt-6 w-full rounded-xl bg-white py-2 text-sm font-bold text-sky-700">
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
              Self ordering is the
              <br />
              future
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Let guests order from QR menus, kiosks, or tablets. Orders go
              straight to the kitchen and sync with your table management.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            Custom
            <br />
            <HandUnderline color="bg-teal-400">floor plans</HandUnderline>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Design your dining room, manage table availability, move guests
            between areas, and follow every order from seat to kitchen.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="grid grid-cols-5 gap-4 rounded-3xl bg-slate-50 p-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-bold ${
                  index % 5 === 0
                    ? "bg-rose-100 text-rose-700"
                    : index % 3 === 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-slate-600"
                }`}
              >
                T{index + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            Seamless{" "}
            <BrushHighlight color="bg-rose-300">order</BrushHighlight>{" "}
            preparation
          </ScriptHeading>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Send items to the right kitchen station, track preparation status,
            and serve faster during busy hours.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
              <p className="text-left font-semibold text-slate-950">
                Kitchen display
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["New orders", "Preparing", "Ready", "Served"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-linear-to-br from-sky-50 to-emerald-50 px-4 py-5 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 text-left shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
              <p className="font-semibold text-slate-950">
                Preparation workflow
              </p>
              <div className="mt-5 space-y-3">
                {["Order received", "Sent to kitchen", "Chef preparing", "Ready to serve"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                        {index + 1}
                      </span>
                      {item}
                    </div>
                  )
                )}
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
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
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
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
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
          Expand your restaurant workflow across the Eden ERP ecosystem.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sky-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-sky-50 to-emerald-50 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern restaurants
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600">
              Restaurant teams use Eden POS to serve faster, reduce errors, and
              keep every order connected from table to accounting.
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-sky-600" />

        <ScriptHeading>
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Build a connected restaurant operation with POS, kitchen display,
          table management, payments, inventory, and accounting.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-sky-300 hover:text-sky-700"
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
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CirclePlay,
  Database,
  FileSpreadsheet,
  Grid3X3,
  LineChart,
  Lock,
  PieChart,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  Table2,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const features = [
  {
    title: "Collaborative sheets",
    description:
      "Work with your team in real time with controlled access and shared views.",
    icon: Users,
  },
  {
    title: "Smart formulas",
    description:
      "Create calculations faster with formula suggestions and reusable logic.",
    icon: WandSparkles,
  },
  {
    title: "Live dashboards",
    description:
      "Turn spreadsheet data into reports, charts, and business dashboards.",
    icon: BarChart3,
  },
  {
    title: "Data validation",
    description:
      "Keep every cell clean with dropdowns, rules, and approval-ready checks.",
    icon: CheckCircle2,
  },
  {
    title: "ERP data sync",
    description:
      "Connect sales, inventory, finance, and projects without copy-paste.",
    icon: RefreshCw,
  },
  {
    title: "Secure sharing",
    description:
      "Share reports safely with role-based access and protected ranges.",
    icon: Lock,
  },
];

const apps = [
  { title: "Sales", desc: "Pipeline and revenue sheets", icon: BarChart3 },
  { title: "Inventory", desc: "Stock planning and forecasts", icon: Database },
  {
    title: "Accounting",
    desc: "Budgets and cash tracking",
    icon: FileSpreadsheet,
  },
  { title: "Projects", desc: "Task planning and workload", icon: Grid3X3 },
  { title: "CRM", desc: "Customer analysis", icon: Users },
  { title: "Reports", desc: "Live dashboards", icon: PieChart },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
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
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm ring-1 ring-cyan-100 dark:ring-cyan-800">
      <span className="text-cyan-500 dark:text-cyan-400">{icon}</span>
      {label}
    </div>
  );
}

function SpreadsheetMockup() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
            Adon Spreadsheet
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-emerald-700 dark:text-emerald-400">
            Live
          </span>
          <Share2 className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-[120px_repeat(5,1fr)] border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 text-xs">
        {["Metric", "Jan", "Feb", "Mar", "Apr", "Total"].map((item) => (
          <div
            key={item}
            className="border-r border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-400"
          >
            {item}
          </div>
        ))}
      </div>

      {[
        ["Revenue", "$12.4k", "$18.7k", "$21.9k", "$28.2k", "$81.2k"],
        ["Expenses", "$4.8k", "$6.1k", "$7.3k", "$8.9k", "$27.1k"],
        ["Profit", "$7.6k", "$12.6k", "$14.6k", "$19.3k", "$54.1k"],
        ["Growth", "12%", "18%", "21%", "32%", "24%"],
      ].map((row, index) => (
        <div
          key={row[0]}
          className="grid grid-cols-[120px_repeat(5,1fr)] text-sm"
        >
          {row.map((cell, cellIndex) => (
            <div
              key={cell}
              className={`border-r border-t border-slate-100 dark:border-slate-700 dark:border-slate-800 px-4 py-3 ${
                cellIndex === 0
                  ? "font-semibold text-slate-800 dark:text-slate-100 dark:text-white"
                  : index === 2
                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <div className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
              Revenue trend
            </span>
            <LineChart className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex h-28 items-end gap-3">
            {[35, 55, 48, 75, 68, 92].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-xl bg-linear-to-t from-cyan-600 to-emerald-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
              Smart insights
            </span>
            <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="space-y-3">
            {[
              "Sales increased by 32%",
              "Marketing cost is stable",
              "Cashflow forecast is healthy",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white dark:bg-slate-900 dark:bg-slate-800 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600 dark:fill-cyan-500 dark:text-cyan-500" />
      </button>
    </div>
  );
}

export default function SpreadsheetPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 dark:bg-slate-950 text-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.14),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.08),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Smart spreadsheets for Adon ERP"
            icon={<Table2 className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 dark:text-white sm:text-6xl lg:text-7xl">
              Decisions,{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                not just data.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Adon ERP Spreadsheet turns business data into live reports,
              collaborative planning sheets, and real-time dashboards without
              endless copy-paste.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
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
            <SpreadsheetMockup />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              Real-time sync
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              No copy-paste
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>
            No more copy/paste.
            <br />
            Real-time data.
          </ScriptHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Connect your ERP modules directly to spreadsheets and build live
            business views from CRM, projects, inventory, finance, and sales.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-4">
          {[
            ["CRM pipeline", Users],
            ["Project data", Grid3X3],
            ["Sales orders", BarChart3],
            ["Inventory values", Database],
          ].map(([title, Icon]) => {
            const LucideIcon = Icon as typeof Users;

            return (
              <div
                key={title as string}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                  <LucideIcon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
                  {title as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow
              label="Business pivot intelligence"
              icon={<PieChart className="h-4 w-4" />}
            />
            <ScriptHeading className="mt-5">
              Your business’s pivot{" "}
              <span className="text-cyan-600 dark:text-cyan-400">moment</span>
            </ScriptHeading>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Create dynamic pivot tables from ERP records and instantly reveal
              what matters: profitability, stock movement, sales performance,
              and team productivity.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Group data by customer, product, region, or team",
                "Refresh reports without exporting CSV files",
                "Share protected views with managers",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-200 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                Pivot analysis
              </span>
              <RefreshCw className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-3">
              {[
                ["North Region", "Sales", "$42,900", "32%"],
                ["South Region", "Inventory", "$21,400", "18%"],
                ["Online Store", "Orders", "$59,120", "41%"],
                ["Corporate", "Projects", "$33,700", "24%"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100 dark:text-white">
                    {row[0]}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {row[1]}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
                    {row[2]}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {row[3]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>
            Visualize, decide,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              succeed
            </span>
          </ScriptHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Build beautiful dashboards from spreadsheet data and keep every
            report connected to your live Adon ERP workspace.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              ["Leads", "1,240", "+18%"],
              ["Revenue", "$92.4k", "+32%"],
              ["Orders", "846", "+21%"],
              ["Profit", "$41.8k", "+27%"],
            ].map((stat) => (
              <div
                key={stat[0]}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                  {stat[0]}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-100 dark:text-white">
                  {stat[1]}
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {stat[2]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-linear-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 p-6">
            <div className="flex h-56 items-end gap-4">
              {[38, 52, 44, 70, 62, 88, 74, 96].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-2xl bg-linear-to-t from-cyan-600 to-emerald-400"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            All the features
            <br />
            done right.
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.6rem] border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
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
          One{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">need</HandUnderline>
          , one{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">app</HandUnderline>.
        </ScriptHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      {app.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 dark:bg-slate-900/70 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join growing teams
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Finance, sales, and operations teams use Adon ERP Spreadsheet to
              plan faster and report smarter.
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-cyan-600 dark:text-cyan-400" />
        <ScriptHeading>
          Unleash your
          <br />
          growth potential
        </ScriptHeading>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Replace disconnected sheets with live ERP-powered spreadsheets built
          for smarter decisions.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </main>
  );
}


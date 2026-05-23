"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  CirclePlay,
  Clock,
  FileText,
  Grid3X3,
  Headphones,
  LineChart,
  Mail,
  MessageCircle,
  Phone,
  PieChart,
  Plane,
  Play,
  Repeat,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

const features = [
  {
    title: "Pipeline automation",
    description:
      "Move leads through your sales process automatically with smart stages, actions, and reminders.",
    icon: Workflow,
  },
  {
    title: "AI lead scoring",
    description:
      "Prioritize the right opportunities using engagement, activity, source, and deal value.",
    icon: Sparkles,
  },
  {
    title: "Follow-up reminders",
    description:
      "Never miss a customer conversation with automated alerts, tasks, and next-step planning.",
    icon: Bell,
  },
  {
    title: "Quotation builder",
    description:
      "Create polished proposals and quotations from CRM opportunities in just a few clicks.",
    icon: FileText,
  },
  {
    title: "Customer timeline",
    description:
      "Track emails, calls, meetings, notes, deals, and activities in one complete customer profile.",
    icon: Users,
  },
  {
    title: "Sales analytics",
    description:
      "Visualize revenue, win rate, team performance, and forecasts with live dashboards.",
    icon: BarChart3,
  },
];

const apps = [
  { title: "Sales", desc: "Convert leads into orders", icon: TrendingUp },
  { title: "Invoicing", desc: "Bill customers faster", icon: FileText },
  { title: "Email Marketing", desc: "Nurture your leads", icon: Mail },
  { title: "Helpdesk", desc: "Support every customer", icon: Headphones },
  { title: "Projects", desc: "Deliver after closing", icon: Grid3X3 },
  { title: "Analytics", desc: "Measure performance", icon: PieChart },
];

const followUps = [
  { title: "New lead", icon: Target, time: "0 min" },
  { title: "Qualify", icon: BadgeCheck, time: "2 min" },
  { title: "Schedule call", icon: Phone, time: "1 day" },
  { title: "Send offer", icon: Send, time: "2 days" },
  { title: "Win deal", icon: CheckCircle2, time: "3 days" },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 dark:text-white sm:text-5xl ${className}`}
      style={scriptFont}
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

function CrmDashboard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
            Adon CRM Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Live
          </span>
          <Bell className="h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-400" />
        </div>
      </div>

      <div className="grid min-h-92 gap-4 p-5 md:grid-cols-4">
        {[
          [
            "New",
            "bg-cyan-50 dark:bg-cyan-950/30",
            "text-cyan-700 dark:text-cyan-400",
          ],
          [
            "Qualified",
            "bg-emerald-50 dark:bg-emerald-950/30",
            "text-emerald-700 dark:text-emerald-400",
          ],
          [
            "Proposal",
            "bg-amber-50 dark:bg-amber-950/30",
            "text-amber-700 dark:text-amber-400",
          ],
          [
            "Won",
            "bg-violet-50 dark:bg-violet-950/30",
            "text-violet-700 dark:text-violet-400",
          ],
        ].map(([column, bg, text], index) => (
          <div key={column} className={`rounded-2xl ${bg} p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <p className={`text-sm font-bold ${text}`}>{column}</p>
              <span className="rounded-full bg-white dark:bg-slate-900 dark:bg-slate-700 px-2 py-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                {index + 4}
              </span>
            </div>

            <div className="space-y-3">
              {[
                "Website redesign",
                "Retail ERP setup",
                "Marketing automation",
              ].map((item, itemIndex) => (
                <div
                  key={`${column}-${item}`}
                  className="rounded-xl bg-white dark:bg-slate-900 dark:bg-slate-800 p-3 text-left shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
                    {item}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    ${[5200, 8400, 12600][itemIndex].toLocaleString()} deal
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-800 bg-linear-to-br from-cyan-200 to-emerald-200 dark:from-cyan-700 dark:to-emerald-700"
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      Today
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600 dark:fill-cyan-500 dark:text-cyan-500" />
      </button>
    </div>
  );
}

export default function CrmPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 dark:bg-slate-950 text-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Intelligent customer management"
            icon={<Users className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 dark:text-white sm:text-6xl lg:text-7xl">
              Customer Relationship{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400"
                style={scriptFont}
              >
                Magic
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Adon ERP CRM helps your team capture leads, manage pipelines,
              automate follow-ups, and turn every opportunity into revenue.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
            >
              <Play className="h-4 w-4 -rotate-6" />
              Watch Demo
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <CrmDashboard />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              Real-time pipeline
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Smart follow-ups
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label="Sales pipeline"
            icon={<Target className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Track opportunities
            <br />
            easily in the sales software
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Keep every deal visible from first contact to close. Adon CRM gives
            your sales team a clean pipeline, next actions, deal values, and
            customer context in one place.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Drag deals between customizable stages",
              "See next activity and deal value instantly",
              "Keep all customer notes attached to the opportunity",
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

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="grid gap-4 sm:grid-cols-3">
            {["Leads", "Qualified", "Won"].map((stage, index) => (
              <div
                key={stage}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                  {stage}
                </p>
                <div className="mt-4 space-y-3">
                  {["Apex Ltd", "Bright Co", "Nova Group"].map((client) => (
                    <div
                      key={client}
                      className="rounded-xl bg-white dark:bg-slate-900 dark:bg-slate-800 p-3 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 dark:text-white">
                        {client}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                        ${[3200, 4800, 6900][index].toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            Never miss out on a{" "}
            <span className="rounded-xl bg-amber-100 dark:bg-amber-950/50 px-2 text-amber-600 dark:text-amber-400">
              follow-up
            </span>
          </ScriptHeading>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Schedule calls, emails, meetings, and reminders so every lead gets
            attention at the right time.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-5">
            {followUps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400">
                    {item.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Customer management with{" "}
          <span className="rounded-xl bg-emerald-100 dark:bg-emerald-950/50 px-2 text-emerald-600 dark:text-emerald-400">
            effortless
          </span>
          <br />
          communication
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Centralize calls, emails, live chat, SMS, and notes inside the
          customer timeline so your team always knows what happened last.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-5 text-left">
              <p className="font-semibold text-slate-950 dark:text-slate-100 dark:text-white">
                Customer profile
              </p>
              <div className="mt-5 space-y-3">
                {[
                  ["Company", "Green Valley Trading"],
                  ["Stage", "Proposal sent"],
                  ["Deal value", "$18,450"],
                  ["Next action", "Call tomorrow"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-3 text-sm shadow-sm"
                  >
                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      {label}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 p-5 text-left">
              <p className="font-semibold text-slate-950 dark:text-slate-100 dark:text-white">
                Communication
              </p>
              <div className="mt-5 space-y-3">
                {[
                  ["Email sent", "Quotation details shared"],
                  ["Call completed", "Client requested timeline"],
                  ["Meeting booked", "Product demo scheduled"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-xl bg-white dark:bg-slate-900 dark:bg-slate-800 p-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-5 sm:grid-cols-4">
          {[
            ["Email", Mail],
            ["Live chat", MessageCircle],
            ["SMS", Bell],
            ["VoIP", Phone],
          ].map(([label, Icon]) => {
            const LucideIcon = Icon as typeof Mail;

            return (
              <div
                key={label as string}
                className="rounded-2xl bg-white dark:bg-slate-900 dark:bg-slate-800 p-4"
              >
                <LucideIcon className="mx-auto h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200 dark:text-slate-300">
                  {label as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label="Quotation builder"
            icon={<FileText className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Attractive quotations
            <br />
            in{" "}
            <span className="text-amber-600 dark:text-amber-400">
              two clicks
            </span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Convert opportunities into polished quotations with products,
            pricing, taxes, discounts, and terms already connected to your ERP.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 dark:bg-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                  Quotation
                </p>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Ready
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["ERP Implementation", "$8,500"],
                  ["Training Session", "$1,200"],
                  ["Support Package", "$950"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between rounded-xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-600 dark:text-slate-300 dark:text-slate-400">
                      {name}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 dark:text-white">
                      {price}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition">
                Send quotation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:order-1">
          <div className="mb-5 grid gap-4 sm:grid-cols-3">
            {[
              ["Leads", "1,284", "+24%"],
              ["Won deals", "342", "+18%"],
              ["Revenue", "$94.8k", "+31%"],
            ].map(([label, value, change]) => (
              <div
                key={label}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-100 dark:text-white">
                  {value}
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {change}
                </p>
              </div>
            ))}
          </div>

          <div className="flex h-56 items-end gap-4 rounded-2xl bg-linear-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 p-6">
            {[38, 62, 80, 55, 92, 71].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-2xl bg-linear-to-t from-cyan-600 to-emerald-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow
            label="Revenue analytics"
            icon={<LineChart className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Turn reporting data
            <br />
            into money
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            See where revenue comes from, which activities convert best, and
            where your team should focus next.
          </p>
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

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
          >
            See all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          One{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">need</HandUnderline>
          , one{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">app</HandUnderline>.
        </ScriptHeading>
        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
          Expand your CRM workflow across the Adon ERP ecosystem.
        </p>

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

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className={`absolute rounded-3xl ${
                  index % 3 === 0
                    ? "h-12 w-12 bg-cyan-200 dark:bg-cyan-950/30"
                    : index % 3 === 1
                      ? "h-10 w-10 bg-slate-200 dark:bg-slate-800"
                      : "h-14 w-14 bg-emerald-100 dark:bg-emerald-950/30"
                }`}
                style={{
                  top: `${(index * 17) % 88}%`,
                  left: `${(index * 29) % 92}%`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 dark:bg-slate-900/70 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern sales teams
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Teams use Adon CRM to manage leads, communicate better, close
              faster, and grow revenue with confidence.
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
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Build stronger customer relationships with a CRM that connects your
          sales, marketing, service, and operations.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
          >
            Contact Sales
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
          Free trial available · No credit card required · Instant access
        </p>
      </section>
    </main>
  );
}


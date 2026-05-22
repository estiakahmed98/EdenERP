// components/landing/ServiceSection.tsx

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileSignature,
  FolderKanban,
  Globe2,
  Headphones,
  Layers3,
  Mail,
  Megaphone,
  MessageSquareText,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  Users,
  Warehouse,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

interface AppItem {
  name: string;
  alternative?: string;
  category:
    | "Finance"
    | "Sales"
    | "Operations"
    | "People"
    | "Marketing"
    | "Productivity";
  icon: React.ElementType;
}

const appsData: AppItem[] = [
  {
    name: "Accounting",
    alternative: "QuickBooks",
    category: "Finance",
    icon: ReceiptText,
  },
  {
    name: "Invoicing",
    alternative: "FreshBooks",
    category: "Finance",
    icon: CreditCard,
  },
  { name: "CRM", alternative: "Salesforce", category: "Sales", icon: Users },
  {
    name: "Sales",
    alternative: "Pipedrive",
    category: "Sales",
    icon: ChartNoAxesCombined,
  },
  {
    name: "eCommerce",
    alternative: "Shopify",
    category: "Sales",
    icon: ShoppingBag,
  },
  {
    name: "Point of Sale",
    alternative: "Lightspeed",
    category: "Sales",
    icon: Building2,
  },
  {
    name: "Inventory",
    alternative: "Cin7",
    category: "Operations",
    icon: Warehouse,
  },
  {
    name: "Purchase",
    alternative: "SAP Ariba",
    category: "Operations",
    icon: PackageCheck,
  },
  {
    name: "Manufacturing",
    alternative: "Katana",
    category: "Operations",
    icon: Boxes,
  },
  {
    name: "Project",
    alternative: "Asana",
    category: "Productivity",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    alternative: "Monday.com",
    category: "Productivity",
    icon: ClipboardCheck,
  },
  {
    name: "Documents",
    alternative: "Google Drive",
    category: "Productivity",
    icon: FileSignature,
  },
  {
    name: "Knowledge",
    alternative: "Notion",
    category: "Productivity",
    icon: Layers3,
  },
  {
    name: "Discuss",
    alternative: "Slack",
    category: "Productivity",
    icon: MessageSquareText,
  },
  { name: "HR", alternative: "BambooHR", category: "People", icon: BadgeCheck },
  {
    name: "Helpdesk",
    alternative: "Zendesk",
    category: "People",
    icon: Headphones,
  },
  {
    name: "Website",
    alternative: "Webflow",
    category: "Marketing",
    icon: Globe2,
  },
  {
    name: "Email Marketing",
    alternative: "HubSpot",
    category: "Marketing",
    icon: Mail,
  },
  {
    name: "Marketing",
    alternative: "Mailchimp",
    category: "Marketing",
    icon: Megaphone,
  },
  {
    name: "AI Studio",
    alternative: "Disconnected AI tools",
    category: "Productivity",
    icon: BrainCircuit,
  },
  {
    name: "Automation",
    alternative: "Zapier",
    category: "Operations",
    icon: Workflow,
  },
  {
    name: "Field Service",
    alternative: "Service Cloud",
    category: "Operations",
    icon: Wrench,
  },
  {
    name: "Dashboard",
    alternative: "Tableau",
    category: "Finance",
    icon: BarChart3,
  },
  { name: "Planning", alternative: "Harvest", category: "People", icon: Zap },
];

const categoryStyles: Record<AppItem["category"], string> = {
  Finance: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Sales: "bg-violet-50 text-violet-700 ring-violet-100",
  Operations: "bg-amber-50 text-amber-700 ring-amber-100",
  People: "bg-sky-50 text-sky-700 ring-sky-100",
  Marketing: "bg-rose-50 text-rose-700 ring-rose-100",
  Productivity: "bg-slate-100 text-slate-700 ring-slate-200",
};

const stats = [
  { value: "50+", label: "Business apps" },
  { value: "1", label: "Shared database" },
  { value: "0", label: "Disconnected silos" },
];

const comparison = [
  "One login for every team",
  "Live data across all modules",
  "Automated workflow handoffs",
  "Lower software switching cost",
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl ${className}`}
      style={{
        fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
      }}
    >
      {children}
    </h2>
  );
}

export default function AdonAppsSection() {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#f8f5ff_48%,_#ffffff_100%)] py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute right-[-8rem] top-72 h-80 w-80 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/85 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Complete business platform
          </div>

          <div className="mt-8">
            <ScriptHeading>
              All your business apps,
              <br />
              perfectly connected.
            </ScriptHeading>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            AdonERP replaces scattered software with one elegant operating
            system for sales, accounting, inventory, projects, marketing, HR,
            support, and automation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowAlternatives((value) => !value)}
              className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-lg"
            >
              <span
                className={`relative flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-300 ${
                  showAlternatives ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    showAlternatives ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
              {showAlternatives ? "Hide alternatives" : "Compare alternatives"}
            </button>

            <a
              href="#all-apps"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              View all apps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/85 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,_#111827_0%,_#5b21b6_58%,_#f59e0b_130%)] p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/65">
                      AdonERP Suite
                    </p>
                    <h3 className="mt-2 text-3xl font-bold">One system</h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                    <Workflow className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white/10 p-4"
                    >
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="mt-1 text-xs text-white/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {comparison.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showAlternatives ? (
                <motion.div
                  key="alternatives"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-[2rem] border border-violet-100 bg-violet-50/80 p-6"
                >
                  <p className="text-sm font-semibold text-violet-800">
                    Without AdonERP
                  </p>
                  <p className="mt-2 text-sm leading-7 text-violet-700/80">
                    Teams often pay for multiple apps, duplicate data manually,
                    and lose visibility across departments.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="adon"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-[2rem] border border-emerald-100 bg-emerald-50/80 p-6"
                >
                  <p className="text-sm font-semibold text-emerald-800">
                    With AdonERP
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-700/80">
                    Every app shares the same data layer, so your business runs
                    with cleaner handoffs and fewer disconnected tools.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_35px_100px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  AdonERP App Ecosystem
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Connected modules for every department
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live connected
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {appsData.map((app, index) => {
                const Icon = app.icon;

                return (
                  <motion.div
                    key={app.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.025, 0.35),
                    }}
                    className="group relative min-h-[9.5rem] overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_rgba(109,40,217,0.1),rgba(245,158,11,0.28),rgba(16,185,129,0.12))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ${categoryStyles[app.category]}`}
                      >
                        {app.category}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-950">
                      {app.name}
                    </h3>

                    <div className="mt-3 min-h-7">
                      <AnimatePresence mode="wait">
                        {showAlternatives && app.alternative ? (
                          <motion.div
                            key="alt"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-100"
                          >
                            Replaces {app.alternative}
                          </motion.div>
                        ) : (
                          <motion.p
                            key="connected"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-xs leading-5 text-slate-500"
                          >
                            Works with every AdonERP module.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                Why teams choose one suite instead of many disconnected tools
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                With AdonERP, every department works from the same source of
                truth. Sales creates demand, operations deliver, finance tracks
                money, and leadership sees the full picture instantly.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "No duplicate customer data",
                "No broken reporting chains",
                "No manual app-to-app updates",
                "No expensive integration stack",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

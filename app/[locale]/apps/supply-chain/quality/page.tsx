"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  FileText,
  Layers3,
  PackageCheck,
  Play,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Works with your process",
    description:
      "Add quality checks inside manufacturing, inventory, and delivery operations without slowing your team.",
  },
  {
    title: "Centralize inspections",
    description:
      "Create control points, quality alerts, corrective actions, and inspection history in one place.",
  },
  {
    title: "Kanban view",
    description:
      "Manage quality alerts by status using a clean drag-and-drop workflow.",
  },
  {
    title: "Order integration",
    description:
      "Trigger checks directly from manufacturing orders, transfers, receipts, and deliveries.",
  },
];

const apps = [
  {
    title: "Manufacturing",
    description: "Manage production checks",
    icon: Factory,
  },
  {
    title: "Inventory",
    description: "Inspect receipts and deliveries",
    icon: PackageCheck,
  },
  {
    title: "PLM",
    description: "Improve engineering quality",
    icon: Layers3,
  },
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&h=96&fit=crop&crop=face",
];

export default function QualityLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Quality{" "}
            <HandUnderline color="bg-sky-300">
              <span className="text-sky-500">without the complexity</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Build smart quality checks, catch defects early, manage inspections,
            and keep production moving without adding unnecessary complexity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:text-[#9b6a8f]"
            >
              Meet an advisor
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    Quality
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Overview / Quality Control / Alerts / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-4">
                {[
                  {
                    title: "New",
                    cards: [
                      "Check received components",
                      "Visual inspection",
                      "Packaging review",
                    ],
                  },
                  {
                    title: "Confirmed",
                    cards: [
                      "Dimension mismatch",
                      "Paint color verification",
                      "Assembly tolerance",
                    ],
                  },
                  {
                    title: "In Progress",
                    cards: [
                      "Supplier defect report",
                      "Workshop check",
                      "Product validation",
                    ],
                  },
                  {
                    title: "Corrective Action",
                    cards: [
                      "Fix product batch",
                      "Replace damaged parts",
                      "Update control point",
                    ],
                  },
                ].map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                        {column.title}
                      </p>
                      <span className="text-lg font-bold text-slate-400">
                        +
                      </span>
                    </div>

                    <div className="space-y-3">
                      {column.cards.map((card, cardIndex) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 text-left shadow-sm ring-1 ring-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                            {card}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Quality Alert #{columnIndex + 1}
                            {cardIndex + 1}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1 text-amber-400">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-3.5 w-3.5 fill-current"
                                />
                              ))}
                            </div>

                            <img
                              src={
                                avatars[
                                  (columnIndex + cardIndex) % avatars.length
                                ]
                              }
                              alt="Assignee"
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-950 dark:bg-slate-900 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Quality{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>inspections</span>
            </HandUnderline>{" "}
            that won&apos;t interrupt
            <br />
            manufacturing
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-white dark:bg-slate-950 dark:bg-slate-900 px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-lg ring-1 ring-slate-100">
                  Quality / Control Points / Tablet view
                </div>
              </div>

              <DashedArrow className="mx-auto mb-6 h-20 w-20 rotate-90 text-[#714b67] dark:text-[#9b6a8f]/50" />

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    Quality control point
                  </p>
                  <span className="text-slate-400">×</span>
                </div>

                <div className="space-y-4">
                  {[
                    ["Product", "Manufacturing step"],
                    ["Control type", "Pass - Fail"],
                    ["Team", "Quality Team"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs font-bold text-slate-400">
                        {label}
                      </p>
                      <div className="mt-2 rounded-md bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-100">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                    Pass
                  </button>
                  <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                    Fail
                  </button>
                </div>
              </div>
            </div>

            <p className="mx-auto max-w-md text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
              Maintain product consistency and quality by configuring checks
              directly on manufacturing orders, work centers, receipts, and
              delivery flows.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Zero in on{" "}
              <HandUnderline color="bg-rose-300">
                <span>defects</span>
              </HandUnderline>
              <br />
              before they cost you
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Create quality alerts, isolate problems, assign responsibility,
              and take corrective action before defects affect customers or
              production schedules.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-24 right-6 hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 shadow-xl lg:block">
              {[
                "Scrap product",
                "Create alert",
                "Block transfer",
                "Quality check",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`mb-2 rounded-md px-4 py-2 text-xs font-bold last:mb-0 ${
                    index === 1
                      ? "bg-rose-500 text-white"
                      : "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <DashedArrow className="absolute -left-10 -top-8 hidden h-20 w-20 rotate-80 text-[#714b67] dark:text-[#9b6a8f]/60 lg:block" />

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Quality Alert
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    QA00079
                  </h3>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                  Critical
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Product", "Customizable Desk"],
                  ["Root Cause", "Supplier material defect"],
                  ["Team", "Quality Team"],
                  ["Priority", "High"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400">{label}</p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
                <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                  Corrective action
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Block the faulty batch, notify supplier, and re-check
                  components before production continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                Inspection worksheet
              </p>
              <span className="text-slate-400">×</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_170px]">
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
                <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Operator note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Add measurement, attach image, and validate the inspection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src={`https://images.unsplash.com/photo-${
                      [
                        "1497366754035-f200968a6e72",
                        "1516321318423-f06f85e504b3",
                        "1483058712412-4245e9b90334",
                        "1556761175-b413da4baf72",
                      ][index]
                    }?w=300&auto=format&fit=crop`}
                    alt="Inspection"
                    className="h-20 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                Pass
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                Fail
              </button>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              No product left
              <br />
              <HandUnderline color="bg-rose-300">
                <span>unchecked</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Choose product-specific checks and inspection worksheets. Track
              photos, measurements, pass/fail answers, and comments for every
              important operation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Put your{" "}
              <HandUnderline color="bg-sky-300">
                <span>quality</span>
              </HandUnderline>{" "}
              teams in control
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Create unlimited quality teams dedicated to specific products,
              operations, or issues. Assign alerts and make sure every concern
              reaches the right person.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 md:grid-cols-3">
              {["New", "In Progress", "Done"].map((column, columnIndex) => (
                <div
                  key={column}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4"
                >
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    {column}
                  </p>

                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 text-left shadow-sm"
                      >
                        <div className="h-3 w-3/4 rounded bg-slate-200" />
                        <div className="mt-2 h-2 w-full rounded bg-slate-100" />

                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                              index === 0
                                ? "bg-rose-50 text-rose-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            Alert
                          </span>

                          <img
                            src={
                              avatars[(columnIndex + index) % avatars.length]
                            }
                            alt="User"
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Worksheets make{" "}
            <HandUnderline color="bg-amber-300">
              <span>custom checks</span>
            </HandUnderline>{" "}
            effortless
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Create interactive worksheets for operators to fill out when
            performing quality checks.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7]" />

            <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-7 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Worksheet
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    Quality control checklist
                  </h3>
                </div>
                <span className="text-slate-400">×</span>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {[
                  "Visual check",
                  "Measurement value",
                  "Attach product photo",
                  "Confirm packaging",
                  "Operator signature",
                  "Final validation",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      {index % 2 === 0 ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                      )}
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      Required
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                  Save
                </button>
                <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>right.</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67] dark:text-[#9b6a8f]">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
                Quality statistics
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Track defects, inspections, teams, and corrective actions with
                easy-to-read reporting.
              </p>

              <div className="mt-8 flex h-64 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
                {[
                  { orange: 75, blue: 110 },
                  { orange: 45, blue: 170 },
                  { orange: 35, blue: 95 },
                ].map((bar, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className="w-full bg-sky-200"
                      style={{ height: `${bar.blue}px` }}
                    />
                    <div
                      className="w-full bg-orange-400"
                      style={{ height: `${bar.orange}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {features.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-300">
              <span>need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300">
              <span>app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:bg-slate-950 dark:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-950/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white dark:text-slate-100"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200">
                  Quality checks became easier to follow, and our teams now
                  catch issues before they reach customers.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      Robert Hayes
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Quality manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6]">growth</span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now
            </Link>

            <p className="mt-3 text-xs text-slate-400"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 25C75 30 105 58 102 91C99 120 70 138 36 130"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />
      <path
        d="M37 130L57 116M37 130L52 151"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

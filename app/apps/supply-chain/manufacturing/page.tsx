"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Factory,
  FileText,
  GitBranch,
  Layers3,
  PackageCheck,
  Play,
  Recycle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Master production schedule",
    description:
      "Plan demand, production, components, and expected stock with a clear manufacturing schedule.",
  },
  {
    title: "Powerful yet simple",
    description:
      "Manage manufacturing orders, work orders, planning, and quality from one clean interface.",
  },
  {
    title: "Leverage by-products",
    description:
      "Produce finished goods and by-products with accurate costing and inventory tracking.",
  },
  {
    title: "Up/down stream traceability",
    description:
      "Track components, lots, serial numbers, and finished products across every production step.",
  },
  {
    title: "IoT integrations",
    description:
      "Connect shop floor devices, scanners, quality tools, and machines to your manufacturing flow.",
  },
];

const apps = [
  {
    title: "Sales",
    description: "Forecast customer demand",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    description: "Control components",
    icon: Warehouse,
  },
  {
    title: "Project",
    description: "Coordinate work",
    icon: ClipboardCheck,
  },
  {
    title: "PLM",
    description: "Manage engineering changes",
    icon: GitBranch,
  },
  {
    title: "Maintenance",
    description: "Keep equipment running",
    icon: ShieldCheck,
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

export default function MRPLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            The{" "}
            <HandUnderline color="bg-sky-300">
              <span className="text-sky-500">future</span>
            </HandUnderline>{" "}
            of MRP
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Plan, manufacture, control quality, manage shop floor operations,
            and improve production with a simple modern MRP system.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Watch a demo
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="border-b border-slate-100 bg-white px-5 py-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-lg font-bold text-[#714b67]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      Manufacturing
                    </span>
                    <p className="mt-1 text-xs text-slate-400">
                      Orders / Work Centers / Planning / Quality / Shop Floor
                    </p>
                  </div>

                  <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                    Create
                  </button>
                </div>
              </div>

              <div className="grid bg-[#f7f8fb] p-6 lg:grid-cols-[210px_1fr]">
                <aside className="rounded-lg bg-white p-4 text-left shadow-sm ring-1 ring-slate-100">
                  <p className="text-sm font-bold text-slate-900">MRP Menu</p>

                  <div className="mt-5 space-y-2">
                    {[
                      "Overview",
                      "Manufacturing",
                      "Planning",
                      "Quality",
                      "Reporting",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-[#714b67] text-white"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 lg:ml-5 lg:mt-0">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ["To Produce", "42", "bg-sky-50 text-sky-600"],
                      ["Waiting", "18", "bg-amber-50 text-amber-600"],
                      ["Blocked", "04", "bg-rose-50 text-rose-600"],
                    ].map(([label, value, color]) => (
                      <div
                        key={label}
                        className={`rounded-lg p-4 text-left ${color}`}
                      >
                        <p className="text-xs font-bold">{label}</p>
                        <p className="mt-2 text-2xl font-bold">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Sofa Assembly",
                        status: "Ready",
                        color: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        title: "Wood Cutting",
                        status: "In Progress",
                        color: "bg-sky-50 text-sky-600",
                      },
                      {
                        title: "Quality Check",
                        status: "Waiting",
                        color: "bg-amber-50 text-amber-600",
                      },
                      {
                        title: "Final Packaging",
                        status: "Blocked",
                        color: "bg-rose-50 text-rose-600",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-lg bg-white p-5 text-left shadow-sm ring-1 ring-slate-100"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900">
                            {item.title}
                          </p>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold ${item.color}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="h-2 rounded-full bg-slate-100">
                            <div className="h-2 w-[68%] rounded-full bg-[#714b67]" />
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
                            <span>Components</span>
                            <span>Work center</span>
                            <span>Deadline</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-sky-400"
              text="Check all operations in real time"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-24 w-24 rotate-[-18deg] text-slate-300" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300">
                <span>Real-time</span>
              </HandUnderline>{" "}
              simulated
              <br />
              operations
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Simulate manufacturing orders with real-time capacity, inventory,
              components, work centers, and schedule constraints before
              execution.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900">Simulation result</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                Feasible
              </span>
            </div>

            <div className="overflow-hidden rounded-lg ring-1 ring-slate-100">
              <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                <span>Order</span>
                <span>Material</span>
                <span>Stock</span>
                <span>Time</span>
                <span>Status</span>
              </div>

              {[
                ["MO/1042", "Wood", "Available", "2h", "Ready"],
                ["MO/1043", "Fabric", "Low", "4h", "Warning"],
                ["MO/1044", "Foam", "Available", "3h", "Ready"],
                ["MO/1045", "Paint", "Available", "1h", "Ready"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-5 border-b border-slate-100 px-4 py-4 text-left text-xs last:border-0"
                >
                  <span className="font-bold text-[#714b67]">{row[0]}</span>
                  <span className="text-slate-600">{row[1]}</span>
                  <span className="text-slate-500">{row[2]}</span>
                  <span className="text-slate-500">{row[3]}</span>
                  <span
                    className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                      row[4] === "Ready"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {row[4]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Factory className="mx-auto h-12 w-12 text-amber-500" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Planning that puts you ahead of schedule
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Schedule manufacturing orders, reserve components, balance work
            centers, and see production timing before problems happen.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-4 text-xs font-bold text-slate-400">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <div key={day}>{day}</div>
                  ),
                )}
              </div>

              <div className="mt-5 space-y-4 text-left">
                {[
                  {
                    line: "Wood cutting",
                    blocks: ["bg-amber-200", "bg-rose-200", "bg-sky-200"],
                  },
                  {
                    line: "Assembly",
                    blocks: ["bg-sky-200", "bg-purple-200", "bg-emerald-200"],
                  },
                  {
                    line: "Quality control",
                    blocks: ["bg-emerald-200", "bg-amber-200", "bg-rose-200"],
                  },
                  {
                    line: "Packing",
                    blocks: ["bg-purple-200", "bg-sky-200", "bg-amber-200"],
                  },
                ].map((row, rowIndex) => (
                  <div
                    key={row.line}
                    className="grid grid-cols-[140px_1fr] items-center gap-4"
                  >
                    <p className="text-sm font-bold text-slate-700">
                      {row.line}
                    </p>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-12 rounded-md ${
                            row.blocks[(index + rowIndex) % row.blocks.length]
                          }`}
                        >
                          {index % 2 === 0 && (
                            <div className="p-2 text-[10px] font-bold text-slate-700">
                              MO/{rowIndex + 1}
                              {index + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300">
                <span>Record</span>
              </HandUnderline>{" "}
              production and
              <br />
              components
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Register each production operation, consume components, record
              finished products, print labels, and keep traceability clean from
              start to finish.
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-sky-400"
              text="Scan, produce, and validate"
            />
          </div>

          <div className="relative">
            <p
              className="absolute -top-10 right-4 hidden rotate-[-10deg] text-lg font-bold text-sky-500 lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Mobile barcode app
            </p>

            <div className="mx-auto max-w-xs rounded-4xl border border-slate-200 bg-white p-4 shadow-[0_30px_90px_rgba(15,23,42,0.16)]">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="mx-auto mb-5 h-2 w-20 rounded-full bg-slate-200" />

                <ScanLine className="mx-auto h-16 w-16 text-[#714b67]" />

                <p className="mt-6 text-center text-sm font-bold text-slate-900">
                  Active work order
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Scan component",
                    "Start operation",
                    "Validate quantity",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg bg-white px-4 py-3 text-center text-xs font-bold text-slate-600 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <button className="mt-5 w-full rounded-md bg-[#714b67] px-4 py-3 text-xs font-bold text-white">
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                <div className="space-y-3">
                  {["BOM", "Routing", "Work order", "Quality"].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg bg-slate-50 p-4 text-sm font-bold text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-slate-50 p-5">
                  <div className="mb-4 h-4 w-40 rounded bg-slate-200" />
                  <div className="space-y-3">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"
                      >
                        <span className="text-xs font-bold text-slate-600">
                          Component {index + 1}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
                          Ready
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Become a{" "}
              <HandUnderline color="bg-rose-300">
                <span className="text-rose-500">paperless</span>
              </HandUnderline>
              <br />
              company
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Give operators everything they need directly on screen:
              instructions, components, checks, drawings, notes, and validation
              actions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Recycle className="mx-auto h-12 w-12 text-[#02a6a6]" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Get ready for{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>Six-Sigma</span>
            </HandUnderline>{" "}
            level 6!
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <p className="text-left text-sm leading-7 text-slate-600">
              Cut costs, reduce waste, detect quality issues, and ensure every
              product meets your standards. Track checks directly inside your
              production process.
            </p>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-4 md:grid-cols-3">
                {["Checks", "Control Points", "Alerts"].map((title, col) => (
                  <div key={title} className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-4 text-sm font-bold text-slate-900">
                      {title}
                    </p>

                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-white p-3 text-left shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                (index + col) % 2 === 0
                                  ? "bg-emerald-400"
                                  : "bg-amber-400"
                              }`}
                            />
                            <span className="text-xs font-bold text-slate-600">
                              QC Step {index + 1}
                            </span>
                          </div>
                          <div className="mt-2 h-2 rounded bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            The perfect tool for{" "}
            <HandUnderline color="bg-sky-300">
              <span>Kaizen</span>
            </HandUnderline>
          </h2>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="grid items-center gap-5 md:grid-cols-5">
              {[
                "Work order",
                "Quality check",
                "Improvement",
                "Engineering change",
                "New flow",
                "Root cause",
                "Corrective action",
                "Validation",
                "New standard",
                "Feedback",
              ].map((item, index) => (
                <div key={item} className="relative">
                  <div className="rounded-lg bg-white p-4 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-100">
                    {item}
                  </div>

                  {index < 9 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 md:block" />
                  )}
                </div>
              ))}
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
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>right.</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300">
              <span>app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
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

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  Adon allowed our company to efficiently manage a growth from a
                  turnover of $2.4M to $10M in 4 years.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Andrew Morgan</p>
                    <p className="text-sm text-slate-500">
                      Manufacturing director
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
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">growth</span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FloatingNote({
  className = "",
  text = "Share information and make connections",
  color = "bg-sky-400",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white py-3 pl-16 pr-8 text-sm italic text-slate-700 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />

      {text}
    </div>
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

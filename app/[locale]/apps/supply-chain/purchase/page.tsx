"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FileText,
  HandCoins,
  PackageCheck,
  Play,
  ReceiptText,
  RefreshCcw,
  ShoppingCart,
  Sparkles,
  Star,
  Tags,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "More companies, less problems",
    description:
      "Create companies, manage suppliers, centralize purchases, and keep every procurement record organized.",
  },
  {
    title: "Built for any device",
    description:
      "Approve requests, compare offers, and track purchase orders from desktop, tablet, or mobile.",
  },
  {
    title: "Stats that actually make sense",
    description:
      "Understand vendor performance, product costs, lead times, and purchase trends with clear reports.",
  },
  {
    title: "Smarter purchasing decisions",
    description:
      "Compare prices, quantities, vendor terms, and delivery promises before confirming a purchase.",
  },
];

const apps = [
  {
    title: "Inventory",
    description: "Control stock levels",
    icon: Boxes,
  },
  {
    title: "Sales",
    description: "Forecast customer needs",
    icon: BarChart3,
  },
  {
    title: "Field Service",
    description: "Source materials on time",
    icon: Truck,
  },
  {
    title: "Accounting",
    description: "Manage vendor bills",
    icon: ReceiptText,
  },
  {
    title: "Manufacturing",
    description: "Buy components",
    icon: PackageCheck,
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

export default function PurchaseLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Restock on time{" "}
            <HandUnderline color="bg-rose-300">
              <span className="text-rose-500">without overbuying</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Automate RFQs, compare vendors, control costs, avoid stockouts, and
            purchase exactly what your business needs.
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
                      Purchase
                    </span>
                    <p className="mt-1 text-xs text-slate-400">
                      RFQ / Purchase Orders / Vendors / Products / Bills
                    </p>
                  </div>

                  <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                    New RFQ
                  </button>
                </div>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {[
                    ["RFQs", "16", "bg-[#714b67] text-white"],
                    ["To Approve", "09", "bg-[#7f5f78] text-white"],
                    ["Orders", "34", "bg-slate-100 text-slate-700"],
                    ["Late", "03", "bg-rose-50 text-rose-600"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className={`rounded-lg p-4 text-left ${color}`}
                    >
                      <p className="text-xs font-bold opacity-80">{label}</p>
                      <p className="mt-2 text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Reference</span>
                    <span>Vendor</span>
                    <span>Buyer</span>
                    <span>Product</span>
                    <span>Expected</span>
                    <span>Total</span>
                    <span>Status</span>
                  </div>

                  {[
                    ["P00023", "Azure Interior", "Mitchell", "Desk", "Today", "$4,250", "RFQ"],
                    ["P00024", "Ready Mat", "Marc", "Chairs", "Tomorrow", "$1,840", "Approved"],
                    ["P00025", "Wood Corner", "Audrey", "Table", "Friday", "$2,400", "Ordered"],
                    ["P00026", "Office Plus", "Mitchell", "Lamp", "Monday", "$620", "Received"],
                    ["P00027", "Stock Lab", "Joel", "Storage", "Tuesday", "$3,950", "Approved"],
                    ["P00028", "Global Supply", "Marc", "Monitor", "Next week", "$7,100", "RFQ"],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="font-bold text-[#714b67]">{row[0]}</span>
                      <span className="text-slate-700">{row[1]}</span>
                      <span className="text-slate-500">{row[2]}</span>
                      <span className="text-slate-500">{row[3]}</span>
                      <span className="text-slate-500">{row[4]}</span>
                      <span className="font-bold text-slate-900">{row[5]}</span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row[6] === "Received"
                            ? "bg-emerald-50 text-emerald-600"
                            : row[6] === "Ordered"
                              ? "bg-sky-50 text-sky-600"
                              : row[6] === "Approved"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {row[6]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400"
              text="Never run out, never overbuy"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span>Automated</span>
            </HandUnderline>{" "}
            RFQs
            <br />
            for the busy bee
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Automatically trigger RFQs from replenishment rules, compare vendor
            offers, and confirm the best purchase at the right time.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

            <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-6">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      ["RFQ", "12"],
                      ["To Send", "08"],
                      ["Late", "02"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg bg-[#714b67] p-4 text-white"
                      >
                        <p className="text-xs font-bold opacity-80">{label}</p>
                        <p className="mt-2 text-2xl font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100">
                  <p className="font-bold text-slate-900">Replenishment rules</p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Laptop stand",
                      "Office chair",
                      "Wooden table",
                      "Desk lamp",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm"
                      >
                        <span className="font-semibold text-slate-700">
                          {item}
                        </span>
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold text-sky-600">
                          Auto RFQ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100">
                  <p className="font-bold text-slate-900">RFQ Status</p>

                  <div className="mt-5 space-y-3">
                    {[
                      ["5 x 500", "Purchased"],
                      ["7 x 350", "Purchased"],
                      ["8 x 700", "Purchased"],
                      ["6 x 400", "RFQ"],
                      ["5 x 350", "RFQ"],
                    ].map(([qty, status]) => (
                      <div
                        key={qty}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm"
                      >
                        <span className="font-bold text-slate-700">{qty}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                            status === "Purchased"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-sky-50 text-sky-600"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100">
                  <p className="font-bold text-slate-900">Smart actions</p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Order once",
                      "Automate",
                      "Confirm",
                      "Receive",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Flexible purchase agreements,
            <br />
            for every situation
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Optimize procurement with blanket orders, vendor agreements, prices,
            delivery schedules, and purchase conditions.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-16 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="flex flex-col justify-between gap-5 border-b border-slate-100 pb-5 md:flex-row">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Purchase Agreement
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">
                    P00023
                  </h3>
                </div>

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-slate-400">Vendor</p>
                    <p className="font-bold text-slate-900">Azure Interior</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">
                      Agreement Type
                    </p>
                    <p className="font-bold text-slate-900">Blanket Order</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-slate-100">
                <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                  <span>Product</span>
                  <span>Vendor Ref</span>
                  <span>Scheduled</span>
                  <span>Qty</span>
                  <span>Price</span>
                </div>

                {[
                  ["Office Chair", "OFF-442", "2026-03-14", "120", "$89.00"],
                  ["Desk Lamp", "LMP-930", "2026-03-22", "250", "$18.00"],
                  ["Wood Table", "TBL-610", "2026-04-01", "75", "$144.00"],
                  ["Storage Box", "BOX-119", "2026-04-08", "400", "$7.00"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-5 border-b border-slate-100 px-4 py-4 text-sm last:border-0"
                  >
                    {row.map((cell, index) => (
                      <span
                        key={cell}
                        className={
                          index === 0
                            ? "font-bold text-slate-900"
                            : "text-slate-500"
                        }
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <DashedArrow className="mx-auto mt-10 h-24 w-24 rotate-90 text-[#714b67]/40" />

            <div className="relative mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
              <div className="grid grid-cols-6 gap-4 border-b border-slate-100 bg-slate-50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                <span>Order</span>
                <span>Product</span>
                <span>Vendor</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Status</span>
              </div>

              {[
                ["P00024", "Office Chair", "Azure", "40", "$89.00", "Order"],
                ["P00025", "Desk Lamp", "Azure", "80", "$18.00", "Draft"],
                ["P00026", "Wood Table", "Azure", "20", "$144.00", "Order"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-6 gap-4 border-b border-slate-100 px-4 py-4 text-left text-xs last:border-0"
                >
                  {row.map((cell, index) => (
                    <span
                      key={cell}
                      className={
                        index === 0
                          ? "font-bold text-[#714b67]"
                          : index === 5
                            ? "w-fit rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600"
                            : "text-slate-500"
                      }
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400"
              text="Agreements make purchasing smooth"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Charge vendors on
              <br />
              <HandUnderline color="bg-rose-300">
                <span>your terms</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Create vendor price lists, payment terms, delivery agreements, and
              approval flows. Keep every supplier aligned with your purchasing
              rules.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white" />

            <div className="relative grid gap-5 sm:grid-cols-[0.8fr_1.1fr]">
              <div className="rounded-xl bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
                <p className="mb-5 text-left font-bold text-slate-900">
                  Payment terms
                </p>

                {["30 days", "45 days", "Prepaid", "Milestone", "Credit"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-xs"
                    >
                      <span className="font-bold text-slate-700">{item}</span>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                          index < 2
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        Active
                      </span>
                    </div>
                  ),
                )}
              </div>

              <div className="rounded-xl bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
                <p className="mb-5 text-left font-bold text-slate-900">
                  Vendor bills
                </p>

                {[
                  ["Azure Interior", "$4,250", "Paid"],
                  ["Wood Corner", "$2,400", "To Pay"],
                  ["Office Plus", "$620", "Draft"],
                  ["Stock Lab", "$3,950", "Paid"],
                ].map(([vendor, amount, status]) => (
                  <div
                    key={vendor}
                    className="mb-3 grid grid-cols-[1fr_70px_70px] items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-xs"
                  >
                    <span className="font-bold text-slate-700">{vendor}</span>
                    <span className="text-slate-500">{amount}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-center text-[10px] font-bold ${
                        status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : status === "To Pay"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {status}
                    </span>
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
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the small things that make
            <br />
            <HandUnderline color="bg-[#02cfc3]">
              <span>procurement</span>
            </HandUnderline>{" "}
            possible
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Manage purchase approvals, vendor references, product variants,
            taxes, landed costs, and every detail that keeps procurement clean.
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            {[
              {
                title: "Purchase settings",
                tags: ["RFQ", "Approval", "Vendor"],
                offset: "translate-x-0",
              },
              {
                title: "Vendor rules",
                tags: ["Terms", "Taxes", "Currency"],
                offset: "translate-x-8 -translate-y-4",
              },
              {
                title: "Product options",
                tags: ["UoM", "Routes", "Lead time"],
                offset: "-translate-x-8 -translate-y-8",
              },
            ].map((card, index) => (
              <div
                key={card.title}
                className={`relative mx-auto mb-0 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.10)] ${card.offset}`}
                style={{ zIndex: 10 - index }}
              >
                <p className="font-bold text-slate-900">{card.title}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        tagIndex === 0
                          ? "bg-[#714b67] text-white"
                          : tagIndex === 1
                            ? "bg-[#02cfc3]/20 text-[#02a6a6]"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
          <div className="relative mx-auto min-h-[360px]">
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
                  We successfully supply 70 restaurants through 1,000 orders a
                  day thanks to Adon Purchase.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Arthur King</p>
                    <p className="text-sm text-slate-500">
                      Procurement director
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
  color = "bg-amber-400",
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
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  PackageCheck,
  Play,
  QrCode,
  ScanBarcode,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Barcode scanning",
    description:
      "Scan products, lots, serial numbers, packages, locations, and transfers in seconds.",
  },
  {
    title: "Batch operations",
    description:
      "Validate multiple receipts, deliveries, inventory adjustments, and internal transfers faster.",
  },
  {
    title: "Lot and serial tracking",
    description:
      "Track each product movement with full traceability from receipt to delivery.",
  },
  {
    title: "Mobile warehouse flow",
    description:
      "Use barcode flows on phones, tablets, scanners, or warehouse devices.",
  },
  {
    title: "Inventory accuracy",
    description:
      "Reduce manual mistakes and keep real-time stock quantities clean and reliable.",
  },
];

const apps = [
  {
    title: "Inventory",
    description: "Track stock",
    icon: Warehouse,
  },
  {
    title: "Sales",
    description: "Deliver orders",
    icon: BarChart3,
  },
  {
    title: "Purchase",
    description: "Receive products",
    icon: ShoppingCart,
  },
  {
    title: "Manufacturing",
    description: "Scan components",
    icon: Boxes,
  },
  {
    title: "Quality",
    description: "Validate checks",
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

export default function BarcodeLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Scan faster.{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Move smarter.</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Barcode helps your warehouse team receive, pick, pack, transfer,
            count, and validate inventory with speed and accuracy.
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

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <ScanBarcode className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900">Barcode</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Receipts / Delivery Orders / Inventory / Transfers
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  Scan
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] p-6 lg:grid-cols-[260px_1fr]">
                <aside className="rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl bg-slate-50">
                    <QrCode className="h-24 w-24 text-slate-900" />
                  </div>

                  <p className="mt-5 text-center text-sm font-bold text-slate-900">
                    Scan product barcode
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Product scanned",
                      "Lot number detected",
                      "Quantity updated",
                      "Location assigned",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 lg:ml-5 lg:mt-0">
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      ["Receipts", "48", "bg-sky-50 text-sky-600"],
                      ["Pickings", "21", "bg-amber-50 text-amber-600"],
                      ["Transfers", "36", "bg-emerald-50 text-emerald-600"],
                      ["Errors", "02", "bg-rose-50 text-rose-600"],
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

                  <div className="mt-5 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="grid grid-cols-6 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                      <span>Barcode</span>
                      <span>Product</span>
                      <span>Lot/Serial</span>
                      <span>Location</span>
                      <span>Qty</span>
                      <span>Status</span>
                    </div>

                    {[
                      ["BC-000421", "Office Chair", "LOT-24A", "WH/Stock", "28", "Done"],
                      ["BC-000422", "Desk Lamp", "SN-9921", "WH/Input", "12", "Ready"],
                      ["BC-000423", "Storage Box", "LOT-19C", "WH/Pack", "64", "Picked"],
                      ["BC-000424", "Blue Sofa", "SN-4178", "WH/Output", "04", "Waiting"],
                      ["BC-000425", "Wood Table", "LOT-77B", "WH/Stock", "18", "Done"],
                    ].map((row) => (
                      <div
                        key={row[0]}
                        className="grid grid-cols-6 gap-4 border-b border-slate-100 px-5 py-4 text-left text-xs last:border-0"
                      >
                        <span className="font-bold text-[#714b67]">{row[0]}</span>
                        <span className="text-slate-700">{row[1]}</span>
                        <span className="text-slate-500">{row[2]}</span>
                        <span className="text-slate-500">{row[3]}</span>
                        <span className="font-bold text-slate-900">{row[4]}</span>
                        <span
                          className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                            row[5] === "Done"
                              ? "bg-emerald-50 text-emerald-600"
                              : row[5] === "Ready"
                                ? "bg-sky-50 text-sky-600"
                                : row[5] === "Picked"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {row[5]}
                        </span>
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
              color="bg-[#02cfc3]"
              text="Scan once. Update everywhere."
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-24 w-24 rotate-[-18deg] text-slate-300" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-[#02cfc3]">
                <span>Receive</span>
              </HandUnderline>{" "}
              products
              <br />
              without the paperwork
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Scan incoming goods, validate purchase orders, confirm quantities,
              and place products directly into the right warehouse location.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900">Incoming Shipment</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  Ready
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Vendor", "Azure Interior"],
                  ["Reference", "WH/IN/00042"],
                  ["Expected", "Today"],
                  ["Destination", "WH/Stock"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-400">{label}</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Office Chair", "28 / 28", "Validated"],
                  ["Desk Lamp", "12 / 12", "Validated"],
                  ["Wood Table", "18 / 20", "To scan"],
                ].map(([name, qty, status]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_90px_100px] items-center rounded-lg border border-slate-100 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-slate-700">{name}</span>
                    <span className="text-slate-500">{qty}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-center text-[10px] font-bold ${
                        status === "Validated"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
                Validate receipt
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute left-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-full bg-slate-100" />

              <div className="relative rotate-12 rounded-3xl bg-slate-900 p-4 shadow-2xl">
                <div className="h-96 w-56 rounded-2xl bg-white p-4">
                  <div className="mx-auto h-3 w-16 rounded-full bg-slate-200" />

                  <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
                    <QrCode className="mx-auto h-24 w-24 text-slate-900" />
                    <p className="mt-3 text-xs font-bold text-slate-500">
                      Scan package
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "WH/OUT/00091",
                      "Customer: Deco Addict",
                      "3 products picked",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-lg bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button className="mt-5 w-full rounded-md bg-[#714b67] px-4 py-3 text-xs font-bold text-white">
                    Scan next
                  </button>
                </div>
              </div>

              <ScanLine className="absolute -right-8 top-16 h-14 w-14 text-[#02a6a6]" />
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Pick, pack, and{" "}
              <HandUnderline color="bg-amber-300">
                <span>ship</span>
              </HandUnderline>
              <br />
              with confidence
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Scan each product during picking and packing. Prevent wrong
              shipments, missing items, duplicate scans, and location mistakes.
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-amber-400"
              text="No more wrong packages"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Count inventory{" "}
            <HandUnderline color="bg-sky-300">
              <span>without chaos</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Run physical counts by scanning locations and products. Update stock
            quantities with clean audit trails and fewer manual corrections.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7]" />

            <div className="relative grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Scan location",
                  icon: Warehouse,
                  color: "bg-sky-100 text-sky-600",
                },
                {
                  title: "Scan product",
                  icon: ScanBarcode,
                  color: "bg-[#02cfc3]/20 text-[#02a6a6]",
                },
                {
                  title: "Confirm quantity",
                  icon: CheckCircle2,
                  color: "bg-emerald-100 text-emerald-600",
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="relative rounded-xl border border-slate-200 bg-white p-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                  >
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3
                      className="mt-5 text-2xl font-bold text-slate-900"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Step {index + 1} for fast and clean inventory adjustment.
                    </p>

                    {index < 2 && (
                      <ArrowRight className="absolute -right-5 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-slate-300 md:block" />
                    )}
                  </div>
                );
              })}
            </div>
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
              Full traceability
              <br />
              from{" "}
              <HandUnderline color="bg-rose-300">
                <span>barcode to delivery</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Link barcodes with lots, serial numbers, packages, warehouse
              locations, vendor receipts, manufacturing components, and customer
              deliveries.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-bold text-slate-900">Traceability Report</p>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                  Live
                </span>
              </div>

              <div className="space-y-4">
                {[
                  ["Receipt", "WH/IN/00042", "Vendor → WH/Input"],
                  ["Quality Check", "QC/0018", "Passed"],
                  ["Internal Transfer", "WH/INT/00031", "Input → Stock"],
                  ["Picking", "WH/OUT/00091", "Stock → Pack"],
                  ["Delivery", "WH/OUT/00091", "Pack → Customer"],
                ].map(([type, reference, route], index) => (
                  <div
                    key={`${type}:${reference}:${index}`}
                    className="grid grid-cols-[42px_1fr] gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#714b67] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      {index < 4 && <span className="h-8 w-px bg-slate-200" />}
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4 text-left">
                      <p className="text-sm font-bold text-slate-900">{type}</p>
                      <p className="mt-1 text-xs font-bold text-[#714b67]">
                        {reference}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{route}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ScanBarcode className="absolute -bottom-8 right-8 h-14 w-14 text-amber-500" />
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
                  Barcode helped our warehouse team reduce manual mistakes,
                  speed up picking, and keep every product movement visible.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Andrew Ross</p>
                    <p className="text-sm text-slate-500">
                      Warehouse manager
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
              Speed up
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">warehouse</span>
              </HandUnderline>{" "}
              flow
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
  color = "bg-[#02cfc3]",
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

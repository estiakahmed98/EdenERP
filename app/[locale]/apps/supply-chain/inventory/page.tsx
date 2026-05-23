"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Database,
  FileBarChart,
  Layers3,
  PackageCheck,
  Play,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Fast barcode scanner",
    description:
      "Manage products and warehouse movements with barcode scanning and quick validation.",
  },
  {
    title: "Clear reservation mechanisms",
    description:
      "Track reserved quantities, incoming goods, outgoing goods, and available stock.",
  },
  {
    title: "Reduce distances with smart routes",
    description:
      "Optimize warehouse paths and reduce unnecessary picking and packing movement.",
  },
  {
    title: "Clear traceability",
    description:
      "Track every product movement with lots, serial numbers, transfers, and history.",
  },
  {
    title: "Inventory valuation",
    description:
      "Follow stock value with reliable inventory costing and accounting integration.",
  },
];

const apps = [
  {
    title: "Sales",
    description: "Sell your products",
    icon: BarChart3,
  },
  {
    title: "Manufacturing",
    description: "Plan production",
    icon: Layers3,
  },
  {
    title: "Purchase",
    description: "Buy from suppliers",
    icon: ShoppingCart,
  },
  {
    title: "Accounting",
    description: "Track stock value",
    icon: FileBarChart,
  },
  {
    title: "Quality",
    description: "Control operations",
    icon: ClipboardCheck,
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

export default function InventoryLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Modern</span>
            </HandUnderline>{" "}
            inventory system
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Track every product movement, automate stock operations, optimize
            warehouse flows, and manage your inventory with complete visibility.
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
                      Inventory
                    </span>
                    <p className="mt-1 text-xs text-slate-400">
                      Operations / Receipts / Delivery Orders / Stock Moves
                    </p>
                  </div>

                  <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                    Create
                  </button>
                </div>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Receipts", "42", "bg-emerald-50 text-emerald-600"],
                    ["Delivery", "18", "bg-sky-50 text-sky-600"],
                    ["Internal", "27", "bg-amber-50 text-amber-600"],
                    ["Waiting", "09", "bg-rose-50 text-rose-600"],
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

                <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Reference</span>
                    <span>Product</span>
                    <span>Source</span>
                    <span>Destination</span>
                    <span>Qty</span>
                    <span>Status</span>
                    <span>Date</span>
                  </div>

                  {[
                    [
                      "WH/IN/00034",
                      "Office Chair",
                      "Vendor",
                      "Stock",
                      "28",
                      "Ready",
                      "Today",
                    ],
                    [
                      "WH/OUT/00129",
                      "Laptop Stand",
                      "Stock",
                      "Customer",
                      "12",
                      "Waiting",
                      "Today",
                    ],
                    [
                      "WH/INT/00011",
                      "Desk Lamp",
                      "Aisle A",
                      "Aisle B",
                      "40",
                      "Done",
                      "Yesterday",
                    ],
                    [
                      "WH/IN/00035",
                      "Storage Box",
                      "Vendor",
                      "Stock",
                      "64",
                      "Ready",
                      "Tomorrow",
                    ],
                    [
                      "WH/OUT/00130",
                      "Wood Table",
                      "Stock",
                      "Customer",
                      "07",
                      "Ready",
                      "Friday",
                    ],
                    [
                      "WH/INT/00012",
                      "Blue Sofa",
                      "Zone 1",
                      "Zone 3",
                      "09",
                      "Done",
                      "Monday",
                    ],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 px-5 py-4 text-left text-xs last:border-0"
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
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {row[5]}
                      </span>
                      <span className="text-slate-400">{row[6]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <div className="relative z-50 mx-auto mt-10 max-w-md rounded-xl bg-white p-5 shadow-xl ring-1 ring-slate-100">
              <div className="grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <p className="font-bold text-slate-900">Forecasted</p>
                  <p className="mt-1 text-slate-500">12,400 units</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Available</p>
                  <p className="mt-1 text-slate-500">9,800 units</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Replenishment</p>
                  <p className="mt-1 text-slate-500">Auto rules</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Traceability</p>
                  <p className="mt-1 text-slate-500">Lots / serials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 rotate-[-20deg] text-slate-300" />

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Flawless{" "}
            <HandUnderline color="bg-rose-300">
              <span>replenishments</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            Never run out of stock again. Forecast needs, automate purchase
            rules, replenish based on minimum quantities, and keep the right
            product available at the right time.
          </p>

          <div className="mx-auto mt-12 max-w-4xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div className="grid items-center gap-8 md:grid-cols-3">
              {[
                {
                  title: "Replenishment",
                  icon: Truck,
                  color: "bg-sky-100 text-sky-600",
                },
                {
                  title: "Quality control",
                  icon: ShieldCheck,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Storage",
                  icon: Warehouse,
                  color: "bg-rose-100 text-rose-600",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="relative text-center">
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <p
                      className="mt-4 text-xl font-bold text-slate-900"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {item.title}
                    </p>

                    {index < 2 && (
                      <div className="absolute right-[-45px] top-8 hidden w-24 border-t-2 border-dashed border-[#714b67] md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute left-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-full bg-slate-100" />
              <div className="relative -rotate-12 rounded-3xl bg-slate-900 p-4 shadow-2xl">
                <div className="h-80 w-44 rounded-2xl bg-white p-4">
                  <div className="mx-auto h-3 w-16 rounded-full bg-slate-200" />
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <QrCode className="mx-auto h-20 w-20 text-slate-900" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                    <div className="h-10 rounded bg-[#714b67]" />
                  </div>
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
              Speed up receipt,{" "}
              <HandUnderline color="bg-amber-300">
                <span>quality</span>
              </HandUnderline>
              <br />
              control and storage
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Barcode scanning and smart routes let your warehouse team receive
              products, verify quality, and put items away quickly and
              accurately.
            </p>

            <FloatingNote
              className="mt-10 z-30"
              text="Scan faster. Move smarter."
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-28 w-28 -rotate-90 text-slate-300" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Optimize your warehouse
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Build clean warehouse operations with locations, routes, putaway
              rules, replenishment rules, picking flows, and transfer
              management.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-10 translate-y-10 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-4 sm:grid-cols-3">
                {["Receipts", "Pick", "Pack"].map((title, columnIndex) => (
                  <div key={title} className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-4 text-sm font-bold text-slate-900">
                      {title}
                    </p>

                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100"
                        >
                          <p className="text-xs font-bold text-[#714b67]">
                            WH/{columnIndex + 1}0{index + 1}
                          </p>
                          <div className="mt-2 h-2 rounded bg-slate-100" />
                          <div className="mt-2 h-2 w-3/4 rounded bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Boxes className="absolute -bottom-8 right-8 h-14 w-14 text-amber-500" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 -rotate-90 text-slate-300" />

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Minimize</span>
            </HandUnderline>{" "}
            picking movements
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            Use smart routes, batches, waves, zones, and optimized pick paths to
            reduce walking time and speed up warehouse operations.
          </p>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {["Wave picking", "Cluster picking", "Batch picking"].map(
              (title, cardIndex) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="grid h-52 grid-cols-5 gap-2 rounded-lg bg-slate-50 p-4">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded ${
                          [2, 8, 13, 17].includes(index + cardIndex)
                            ? "bg-[#02cfc3]"
                            : [4, 11, 18].includes(index + cardIndex)
                              ? "bg-amber-300"
                              : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <h3
                    className="mt-5 text-xl font-bold text-slate-900"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Reduce unnecessary walking and pick items in smarter groups.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-rose-300">
                <span>Packing</span>
              </HandUnderline>{" "}
              has never been easier
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Validate transfers, prepare packages, print labels, scan products,
              and make sure every delivery is accurate before it leaves your
              warehouse.
            </p>
          </div>

          <div className="relative h-80">
            <div className="absolute bottom-8 right-0 h-44 w-[560px] rounded-lg border border-slate-300 bg-slate-100 shadow-xl">
              <div className="absolute -left-28 bottom-0 h-28 w-32 rounded-l-xl bg-slate-200 shadow-lg">
                <div className="absolute bottom-0 left-4 h-12 w-12 rounded-full bg-slate-900" />
                <div className="absolute bottom-0 right-4 h-12 w-12 rounded-full bg-slate-900" />
              </div>
              <div className="absolute bottom-0 right-16 h-12 w-12 rounded-full bg-slate-900" />
              <div className="absolute bottom-0 right-36 h-12 w-12 rounded-full bg-slate-900" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-orange-500" />
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
                  Adon inventory reduced our logistics spreadsheet work while
                  making our warehouse easier to manage. The biggest benefit is
                  real-time stock visibility and fewer manual mistakes.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Andrew Ross</p>
                    <p className="text-sm text-slate-500">Warehouse manager</p>
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
              Being organized
              <br />
              never felt so good
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
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white py-3 pl-16 pr-8 text-sm italic text-slate-700 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-[#02cfc3]" />

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

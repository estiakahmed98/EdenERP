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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = memoT((t: TFn) => ([
  {
    title: t("page.barcodeScanning"),
    description:
      t("page.scanProductsLotsSerialNumbersPackages"),
  },
  {
    title: t("page.batchOperations"),
    description:
      t("page.validateMultipleReceiptsDeliveriesInvent"),
  },
  {
    title: t("page.lotAndSerialTracking"),
    description:
      t("page.trackEachProductMovementWithFull"),
  },
  {
    title: t("page.mobileWarehouseFlow"),
    description:
      t("page.useBarcodeFlowsOnPhonesTablets"),
  },
  {
    title: t("page.inventoryAccuracy"),
    description:
      t("page.reduceManualMistakesAndKeepReal"),
  },
]));

const apps = memoT((t: TFn) => ([
  {
    title: t("page.inventory"),
    description: t("page.trackStock"),
    icon: Warehouse,
  },
  {
    title: t("page.sales"),
    description: t("page.deliverOrders"),
    icon: BarChart3,
  },
  {
    title: t("page.purchase"),
    description: t("page.receiveProducts"),
    icon: ShoppingCart,
  },
  {
    title: t("page.manufacturing"),
    description: t("page.scanComponents"),
    icon: Boxes,
  },
  {
    title: t("page.quality"),
    description: t("page.validateChecks"),
    icon: ShieldCheck,
  },
]));

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
  const t = useTranslations("pages.appPages.barcode");
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("page.scanFaster")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("page.moveSmarter")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("page.barcodeHelpsYourWarehouseTeamReceive")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md btn-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 dark:shadow-primary/40"
            >
              {t("page.startNow")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("page.watchADemo")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <ScanBarcode className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t("page.barcode")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("page.receiptsDeliveryOrdersInventoryTransfers")}
                  </span>
                </div>

                <button className="rounded-md btn-gradient px-4 py-2 text-xs font-bold text-white transition">
                  {t("page.scan")}
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-[260px_1fr]">
                <aside className="rounded-xl bg-white dark:bg-slate-800 p-5 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <QrCode className="h-24 w-24 text-slate-900 dark:text-white" />
                  </div>

                  <p className="mt-5 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {t("page.scanProductBarcode")}
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      t("page.productScanned"),
                      t("page.lotNumberDetected"),
                      t("page.quantityUpdated"),
                      t("page.locationAssigned"),
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 lg:ml-5 lg:mt-0">
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      [
                        t("page.receipts"),
                        "48",
                        "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
                      ],
                      [
                        t("page.pickings"),
                        "21",
                        "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
                      ],
                      [
                        t("page.transfers"),
                        "36",
                        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
                      ],
                      [
                        t("page.errors"),
                        "02",
                        "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
                      ],
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

                  <div className="mt-5 overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                    <div className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                      <span>{t("page.barcode")}</span>
                      <span>{t("page.product")}</span>
                      <span>{t("page.lotSerial")}</span>
                      <span>{t("page.location")}</span>
                      <span>{t("page.qty")}</span>
                      <span>{t("page.status")}</span>
                    </div>

                    {[
                      [
                        "BC-000421",
                        t("page.officeChair"),
                        "LOT-24A",
                        "WH/Stock",
                        "28",
                        t("page.done"),
                      ],
                      [
                        "BC-000422",
                        t("page.deskLamp"),
                        "SN-9921",
                        "WH/Input",
                        "12",
                        t("page.ready"),
                      ],
                      [
                        "BC-000423",
                        t("page.storageBox"),
                        "LOT-19C",
                        "WH/Pack",
                        "64",
                        t("page.picked"),
                      ],
                      [
                        "BC-000424",
                        t("page.blueSofa"),
                        "SN-4178",
                        "WH/Output",
                        "04",
                        t("page.waiting"),
                      ],
                      [
                        "BC-000425",
                        t("page.woodTable"),
                        "LOT-77B",
                        "WH/Stock",
                        "18",
                        t("page.done"),
                      ],
                    ].map((row) => (
                      <div
                        key={row[0]}
                        className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                      >
                        <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                          {row[0]}
                        </span>
                        <span className="text-slate-700 dark:text-slate-200">
                          {row[1]}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {row[2]}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {row[3]}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {row[4]}
                        </span>
                        <span
                          className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                            row[5] === "Done"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                              : row[5] === "Ready"
                                ? "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
                                : row[5] === "Picked"
                                  ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                          }`}
                        >
                          {row[5]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-[#02cfc3] dark:bg-[#02cfc3]/30"
              text={t("page.scanOnceUpdateEverywhere")}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-24 w-24 rotate-[-18deg] text-slate-300 dark:text-slate-600" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">{t("page.receive")}</span>
              </HandUnderline>{" "}
              {t("page.products")}
              <br />
              {t("page.withoutThePaperwork")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("page.scanIncomingGoodsValidatePurchaseOrders")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white dark:bg-slate-800" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("page.incomingShipment")}
                </p>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {t("page.ready")}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t("page.vendor"), t("page.azureInterior")],
                  [t("page.reference"), "WH/IN/00042"],
                  [t("page.expected"), t("page.today")],
                  [t("page.destination"), "WH/Stock"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  [t("page.officeChair"), "28 / 28", t("page.validated")],
                  [t("page.deskLamp"), "12 / 12", t("page.validated")],
                  [t("page.woodTable"), "18 / 20", t("page.toScan")],
                ].map(([name, qty, status]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_90px_100px] items-center rounded-lg border border-slate-100 dark:border-slate-700 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {qty}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-center text-[10px] font-bold ${
                        status === "Validated"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full rounded-md btn-gradient px-5 py-3 text-sm font-bold text-white transition">
                {t("page.validateReceipt")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute left-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-full bg-slate-100 dark:bg-slate-800" />

              <div className="relative rotate-12 rounded-3xl bg-slate-900 dark:bg-slate-800 p-4 shadow-2xl">
                <div className="h-96 w-56 rounded-2xl bg-white dark:bg-slate-900 p-4">
                  <div className="mx-auto h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />

                  <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 text-center">
                    <QrCode className="mx-auto h-24 w-24 text-slate-900 dark:text-white" />
                    <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t("page.scanPackage")}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "WH/OUT/00091",
                      t("page.customerDecoAddict"),
                      t("page.n3ProductsPicked"),
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button className="mt-5 w-full rounded-md btn-gradient px-4 py-3 text-xs font-bold text-white transition">
                    {t("page.scanNext")}
                  </button>
                </div>
              </div>

              <ScanLine className="absolute -right-8 top-16 h-14 w-14 text-[#02a6a6] dark:text-[#02cfc3]" />
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("page.pickPackAnd")}{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">{t("page.ship")}</span>
              </HandUnderline>
              <br />
              {t("page.withConfidence")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("page.scanEachProductDuringPickingAnd")}
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-amber-400 dark:bg-amber-700"
              text={t("page.noMoreWrongPackages")}
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("page.countInventory")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("page.withoutChaos")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("page.runPhysicalCountsByScanningLocations")}
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative grid gap-6 md:grid-cols-3">
              {[
                {
                  title: t("page.scanLocation"),
                  icon: Warehouse,
                  color:
                    "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
                },
                {
                  title: t("page.scanProduct"),
                  icon: ScanBarcode,
                  color:
                    "bg-[#02cfc3] dark:bg-[#02cfc3]/30 text-[#02a6a6] dark:text-[#02cfc3]",
                },
                {
                  title: t("page.confirmQuantity"),
                  icon: CheckCircle2,
                  color:
                    "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                  >
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3
                      className="mt-5 text-2xl font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {t("page.step")}{" "}{index + 1}{" "}{t("page.forFastAndCleanInventoryAdjustment")}
                    </p>

                    {index < 2 && (
                      <ArrowRight className="absolute -right-5 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-slate-300 dark:text-slate-600 md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("page.fullTraceability")}
              <br />
              {t("page.from")}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t("page.barcodeToDelivery")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("page.linkBarcodesWithLotsSerialNumbers")}
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("page.traceabilityReport")}
                </p>
                <span className="rounded-full bg-sky-50 dark:bg-sky-950/50 px-3 py-1 text-xs font-bold text-sky-600 dark:text-sky-400">
                  {t("page.live")}
                </span>
              </div>

              <div className="space-y-4">
                {[
                  [t("page.receipt"), "WH/IN/00042", t("page.vendorWhInput")],
                  [t("page.qualityCheck"), "QC/0018", t("page.passed")],
                  [t("page.internalTransfer"), "WH/INT/00031", t("page.inputStock")],
                  [t("page.picking"), "WH/OUT/00091", t("page.stockPack")],
                  [t("page.delivery"), "WH/OUT/00091", t("page.packCustomer")],
                ].map(([type, reference, route], index) => (
                  <div
                    key={`${type}:${reference}:${index}`}
                    className="grid grid-cols-[42px_1fr] gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#714b67] text-xs font-bold text-white dark:bg-[#8a5a7e]">
                        {index + 1}
                      </span>
                      {index < 4 && (
                        <span className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                      )}
                    </div>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-left">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {type}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#714b67] dark:text-[#9b6a8f]">
                        {reference}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {route}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ScanBarcode className="absolute -bottom-8 right-8 h-14 w-14 text-amber-500 dark:text-amber-400" />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("page.allThe")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t("page.features")}</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            {t("page.done2")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("page.right")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features(t).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("page.seeAllFeatures")}{" "}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("page.one")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("page.need")}</span>
            </HandUnderline>
            {t("page.one2")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("page.app")}</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("page.expandAsYouGrow")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {apps(t).map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("page.seeAllApps")}{" "}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt={t("page.userAvatar")}
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("page.join15MillionUsers")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("page.whoGrowTheirBusinessWithAdon")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {t("page.barcodeHelpedOurWarehouseTeamReduce")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt={t("page.customer")}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("page.andrewRoss")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("page.warehouseManager")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("page.speedUp")}
              <br />
              {t("page.your")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("page.warehouse")}
                </span>
              </HandUnderline>{" "}
              {t("page.flow")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md btn-gradient px-7 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 dark:shadow-primary/40"
            >
              {t("page.startNow")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FloatingNote({
  className = "",
  text = "Share information and make connections",
  color = "bg-[#02cfc3] dark:bg-[#02cfc3]/30",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  const t = useTranslations("pages.appPages.barcode");
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt={t("page.user")}
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

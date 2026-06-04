"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Boxes, Building2, CheckCircle2, ClipboardList,
    FileCheck2, FileText, HandCoins, PackageCheck, Play, ReceiptText,
    RefreshCcw, ShoppingCart, Sparkles, Star, Tags, Truck, Users, WalletCards,
    ArrowRight,
  };
  return icons[iconName] || ShoppingCart;
};

// Avatar images array (kept as static since these are image URLs)
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
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />
      <img
        src={avatars[1]}
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

export default function PurchaseLandingSections() {
  const t = useTranslations("pages.purchase");

  const dashboardStats = t.raw("hero.dashboard.stats");
  const dashboardRows = t.raw("hero.dashboard.rows");
  const tableHeaders = t.raw("hero.dashboard.tableHeaders");
  const rfqStats = t.raw("rfqSection.stats");
  const replenishmentItems = t.raw("rfqSection.replenishmentItems");
  const rfqItems = t.raw("rfqSection.rfqItems");
  const smartActions = t.raw("rfqSection.smartActions");
  const agreementItems = t.raw("agreementSection.agreement.items");
  const agreementOrders = t.raw("agreementSection.orders");
  const paymentTerms = t.raw("vendorSection.paymentTerms");
  const vendorBills = t.raw("vendorSection.vendorBills");
  const settingsCards = t.raw("settingsSection.cards");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      Received: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      Ordered: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
      Approved: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      RFQ: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
    };
    return colorMap[status] || colorMap.RFQ;
  };

  const getVendorBillColor = (status: string) => {
    const colorMap: Record<string, string> = {
      Paid: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      "To Pay": "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      Draft: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
    };
    return colorMap[status] || colorMap.Draft;
  };

  const getPaymentTermColor = (index: number) => {
    return index < 2
      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
      : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400";
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="text-rose-500 dark:text-rose-400">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("hero.startButton")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.demoButton")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {t("hero.dashboard.title")}
                    </span>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {t("hero.dashboard.subtitle")}
                    </p>
                  </div>

                  <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                    {t("hero.dashboard.newButton")}
                  </button>
                </div>
              </div>

              <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {dashboardStats.map((stat: any) => (
                    <div
                      key={stat.label}
                      className={`rounded-lg p-4 text-left ${
                        stat.color === "primary"
                          ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                          : stat.color === "secondary"
                            ? "bg-[#7f5f78] text-white dark:bg-[#9b6a8f] dark:text-white"
                            : stat.color === "slate"
                              ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              : "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                      }`}
                    >
                      <p className="text-xs font-bold opacity-80">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                    {tableHeaders.map((header: string) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>

                  {dashboardRows.map((row: any) => (
                    <div
                      key={row.reference}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                        {row.reference}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200">
                        {row.vendor}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row.buyer}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row.product}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row.expected}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {row.total}
                      </span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${getStatusColor(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400 dark:bg-amber-700"
              text={t("hero.floatingNote")}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Automated RFQs Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("rfqSection.title")}</span>
            </HandUnderline>{" "}
            {t("rfqSection.titleHighlight")}
            <br />
            {t("rfqSection.subtitle")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("rfqSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-slate-800" />

            <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-6">
                <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-3 gap-4">
                    {rfqStats.map((stat: any) => (
                      <div
                        key={stat.label}
                        className="rounded-lg bg-[#714b67] dark:bg-[#8a5a7e] p-4 text-white"
                      >
                        <p className="text-xs font-bold opacity-80">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white dark:bg-slate-800 p-6 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Replenishment rules
                  </p>

                  <div className="mt-5 space-y-3">
                    {replenishmentItems.map((item: string) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm"
                      >
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {item}
                        </span>
                        <span className="rounded-full bg-sky-50 dark:bg-sky-950/50 px-3 py-1 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                          Auto RFQ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-xl bg-white dark:bg-slate-800 p-6 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    RFQ Status
                  </p>

                  <div className="mt-5 space-y-3">
                    {rfqItems.map((item: any) => (
                      <div
                        key={item.qty}
                        className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm"
                      >
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {item.qty}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                            item.status === "Purchased" || item.status === "ক্রয় করা হয়েছে"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                              : "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white dark:bg-slate-800 p-6 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Smart actions
                  </p>

                  <div className="mt-5 space-y-3">
                    {smartActions.map((action: string) => (
                      <div
                        key={action}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible purchase agreements Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("agreementSection.title")}
            <br />
            {t("agreementSection.subtitle")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("agreementSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-16 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col justify-between gap-5 border-b border-slate-100 dark:border-slate-800 pb-5 md:flex-row">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {t("agreementSection.agreement.title")}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {t("agreementSection.agreement.reference")}
                  </h3>
                </div>

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      Vendor
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("agreementSection.agreement.vendor")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      Agreement Type
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("agreementSection.agreement.type")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="grid grid-cols-5 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                  <span>Product</span>
                  <span>Vendor Ref</span>
                  <span>Scheduled</span>
                  <span>Qty</span>
                  <span>Price</span>
                </div>

                {agreementItems.map((item: any) => (
                  <div
                    key={item.product}
                    className="grid grid-cols-5 border-b border-slate-100 dark:border-slate-700 px-4 py-4 text-sm last:border-0"
                  >
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.vendorRef}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.scheduled}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.qty}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DashedArrow className="mx-auto mt-10 h-24 w-24 rotate-90 text-[#714b67] dark:text-[#9b6a8f]/40" />

            <div className="relative mt-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <div className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                <span>Order</span>
                <span>Product</span>
                <span>Vendor</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Status</span>
              </div>

              {agreementOrders.map((order: any) => (
                <div
                  key={order.order}
                  className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 px-4 py-4 text-left text-xs last:border-0"
                >
                  <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                    {order.order}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {order.product}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {order.vendor}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {order.qty}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {order.price}
                  </span>
                  <span className="w-fit rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {order.status}
                  </span>
                </div>
              ))}
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400 dark:bg-amber-700"
              text={t("agreementSection.floatingNote")}
            />
          </div>
        </div>
      </section>

      {/* Charge vendors on your terms Section */}
      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("vendorSection.title")}
              <br />
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t("vendorSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("vendorSection.description")}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white dark:bg-slate-800" />

            <div className="relative grid gap-5 sm:grid-cols-[0.8fr_1.1fr]">
              <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)] ring-1 ring-slate-100 dark:ring-slate-700">
                <p className="mb-5 text-left font-bold text-slate-900 dark:text-white">
                  Payment terms
                </p>

                {paymentTerms.map((term: string, index: number) => (
                  <div
                    key={term}
                    className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {term}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${getPaymentTermColor(index)}`}
                    >
                      Active
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)] ring-1 ring-slate-100 dark:ring-slate-700">
                <p className="mb-5 text-left font-bold text-slate-900 dark:text-white">
                  Vendor bills
                </p>

                {vendorBills.map((bill: any) => (
                  <div
                    key={bill.vendor}
                    className="mb-3 grid grid-cols-[1fr_70px_70px] items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {bill.vendor}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {bill.amount}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-center text-[10px] font-bold ${getVendorBillColor(bill.status)}`}
                    >
                      {bill.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All the small things Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("settingsSection.title")}
            <br />
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("settingsSection.titleHighlight")}</span>
            </HandUnderline>{" "}
            {t("settingsSection.titleEnd")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("settingsSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            {settingsCards.map((card: any, index: number) => (
              <div
                key={card.title}
                className={`relative mx-auto mb-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)] ${
                  index === 0
                    ? "translate-x-0"
                    : index === 1
                      ? "translate-x-8 -translate-y-4"
                      : "-translate-x-8 -translate-y-8"
                }`}
                style={{ zIndex: 10 - index }}
              >
                <p className="font-bold text-slate-900 dark:text-white">
                  {card.title}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        tagIndex === 0
                          ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                          : tagIndex === 1
                            ? "bg-[#02cfc3] dark:bg-[#02cfc3]/30 text-[#02a6a6] dark:text-[#02cfc3]"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
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

      {/* Features Grid Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature: any) => (
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
            {t("featuresSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
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
            {t("appsSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
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
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaBanner.description")}
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
                  {t("testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("testimonial.role")}
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
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("footerCta.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("footerCta.titleEnd")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("footerCta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
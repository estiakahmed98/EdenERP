"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  Gift,
  Globe2,
  HandCoins,
  MonitorSmartphone,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Table2,
  Tags,
  Utensils,
  Users,
  WalletCards,
  Zap,
  Play,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl ${className}`}
      style={scriptFont}
    >
      {children}
    </h2>
  );
}

function HandUnderline({
  children,
  color = "bg-sky-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-2 w-[105%] -translate-x-1/2 -rotate-1 rounded-full ${color} dark:opacity-80`}
      />
    </span>
  );
}

function BrushHighlight({
  children,
  color = "bg-rose-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.05em] -translate-y-1/2 -rotate-2 rounded-xl ${color} opacity-80 dark:opacity-60`}
      />
    </span>
  );
}

function HandCircle({
  children,
  color = "border-teal-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.25em] -translate-y-1/2 -rotate-3 rounded-[50%] border-[5px] ${color} dark:border-opacity-70`}
      />
    </span>
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
    <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/40 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300 shadow-sm ring-1 ring-sky-100 dark:ring-sky-800">
      <span className="text-sky-500 dark:text-sky-400">{icon}</span>
      {label}
    </div>
  );
}

function RestaurantPosPreview({ t }: { t: any }) {
  const orderItems = [
    {
      name: t("dashboard.currentOrder.item1"),
      price: t("dashboard.currentOrder.item1Price"),
    },
    {
      name: t("dashboard.currentOrder.item2"),
      price: t("dashboard.currentOrder.item2Price"),
    },
    {
      name: t("dashboard.currentOrder.item3"),
      price: t("dashboard.currentOrder.item3Price"),
    },
  ];

  const menuItems = [
    t("dashboard.menu.item1"),
    t("dashboard.menu.item2"),
    t("dashboard.menu.item3"),
    t("dashboard.menu.item4"),
    t("dashboard.menu.item5"),
    t("dashboard.menu.item6"),
  ];

  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            {t("dashboard.appName")}
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {t("dashboard.tableNumber")}
        </span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-4">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {t("dashboard.currentOrder.title")}
          </p>

          <div className="mt-4 space-y-3">
            {orderItems.map(({ name, price }) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 text-sm shadow-sm"
              >
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {name}
                </span>
                <span className="font-bold text-slate-950 dark:text-white">
                  {price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-sky-600 p-4 text-white">
            <div className="flex justify-between text-sm opacity-90">
              <span>{t("dashboard.currentOrder.total")}</span>
              <span>{t("dashboard.currentOrder.totalAmount")}</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-white dark:bg-slate-900 py-2 text-sm font-bold text-sky-700">
              {t("dashboard.currentOrder.payButton")}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {t("dashboard.menu.title")}
            </p>
            <span className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              48 {t("dashboard.menu.itemsCount")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {menuItems.map((item, index) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm"
              >
                <div
                  className={`h-20 ${
                    [
                      "bg-linear-to-br from-orange-100 to-amber-200 dark:from-orange-900/50 dark:to-amber-900/50",
                      "bg-linear-to-br from-rose-100 to-pink-200 dark:from-rose-900/50 dark:to-pink-900/50",
                      "bg-linear-to-br from-sky-100 to-cyan-200 dark:from-sky-900/50 dark:to-cyan-900/50",
                      "bg-linear-to-br from-emerald-100 to-teal-200 dark:from-emerald-900/50 dark:to-teal-900/50",
                      "bg-linear-to-br from-violet-100 to-purple-200 dark:from-violet-900/50 dark:to-purple-900/50",
                      "bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700",
                    ][index % 6]
                  }`}
                />
                <div className="p-3 text-left">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {t("dashboard.menu.tapToAdd")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-sky-600 text-sky-600 dark:fill-sky-500 dark:text-sky-500" />
      </button>
    </div>
  );
}

export default function RestaurantPosPage() {
  const t = useTranslations("pages.restaurant-pos");

  const featuresList = [
    {
      title: t("featuresSection.features.compatibleDevice.title"),
      description: t("featuresSection.features.compatibleDevice.description"),
      icon: MonitorSmartphone,
    },
    {
      title: t("featuresSection.features.offlinePayments.title"),
      description: t("featuresSection.features.offlinePayments.description"),
      icon: CreditCard,
    },
    {
      title: t("featuresSection.features.integratedPayments.title"),
      description: t("featuresSection.features.integratedPayments.description"),
      icon: WalletCards,
    },
    {
      title: t("featuresSection.features.splitBills.title"),
      description: t("featuresSection.features.splitBills.description"),
      icon: ReceiptText,
    },
    {
      title: t("featuresSection.features.kitchenPrinting.title"),
      description: t("featuresSection.features.kitchenPrinting.description"),
      icon: Utensils,
    },
    {
      title: t("featuresSection.features.customerLoyalty.title"),
      description: t("featuresSection.features.customerLoyalty.description"),
      icon: HandCoins,
    },
  ];

  const appsList = [
    {
      title: t("appsSection.apps.website.title"),
      desc: t("appsSection.apps.website.desc"),
      icon: Globe2,
    },
    {
      title: t("appsSection.apps.ecommerce.title"),
      desc: t("appsSection.apps.ecommerce.desc"),
      icon: ShoppingBag,
    },
    {
      title: t("appsSection.apps.inventory.title"),
      desc: t("appsSection.apps.inventory.desc"),
      icon: PackageCheck,
    },
    {
      title: t("appsSection.apps.emailMarketing.title"),
      desc: t("appsSection.apps.emailMarketing.desc"),
      icon: Tags,
    },
    {
      title: t("appsSection.apps.crm.title"),
      desc: t("appsSection.apps.crm.desc"),
      icon: Users,
    },
    {
      title: t("appsSection.apps.accounting.title"),
      desc: t("appsSection.apps.accounting.desc"),
      icon: BarChart3,
    },
  ];

  const serviceFeatures = [
    t("serviceSection.features.floorPlan"),
    t("serviceSection.features.loyalty"),
    t("serviceSection.features.kitchenRouting"),
    t("serviceSection.features.splitPayments"),
  ];

  const serviceMenuItems = [
    t("serviceSection.menuItems.burger"),
    t("serviceSection.menuItems.pizza"),
    t("serviceSection.menuItems.pasta"),
    t("serviceSection.menuItems.rice"),
    t("serviceSection.menuItems.coffee"),
    t("serviceSection.menuItems.juice"),
  ];

  const qrMenuItems = [
    t("selfOrderingSection.qrMenu.meal"),
    t("selfOrderingSection.qrMenu.drink"),
    t("selfOrderingSection.qrMenu.dessert"),
    t("selfOrderingSection.qrMenu.addon"),
  ];

  const kitchenDisplayItems = [
    t("orderPreparationSection.kitchenDisplay.newOrders"),
    t("orderPreparationSection.kitchenDisplay.preparing"),
    t("orderPreparationSection.kitchenDisplay.ready"),
    t("orderPreparationSection.kitchenDisplay.served"),
  ];

  const preparationSteps = [
    t("orderPreparationSection.preparationWorkflow.step1"),
    t("orderPreparationSection.preparationWorkflow.step2"),
    t("orderPreparationSection.preparationWorkflow.step3"),
    t("orderPreparationSection.preparationWorkflow.step4"),
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(14,165,233,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(14,165,233,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label={t("hero.eyebrow.label")}
            icon={<Utensils className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              <HandUnderline color="bg-sky-400">
                {t("hero.titlePrefix")}
              </HandUnderline>{" "}
              <span
                className="text-sky-500 dark:text-sky-400"
                style={scriptFont}
              >
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 dark:shadow-sky-500/30"
            >
              <Play className="h-4 w-4" />
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <RestaurantPosPreview t={t} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-sky-600 dark:text-sky-400" />
              {t("dashboard.badges.fasterService")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t("dashboard.badges.kitchenSynced")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          {t("serviceSection.title")}{" "}
          <HandUnderline color="bg-sky-400">
            {t("serviceSection.highlight")}
          </HandUnderline>
          <br />
          {t("serviceSection.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("serviceSection.description")}
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-5 text-left">
              {serviceFeatures.map((item) => (
                <div
                  key={item}
                  className="mb-3 rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-linear-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 p-5">
              <div className="grid grid-cols-3 gap-3">
                {serviceMenuItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm"
                  >
                    <Utensils className="mx-auto h-6 w-6 text-sky-600 dark:text-sky-400" />
                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-800" />
            <div className="relative rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-4">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {t("selfOrderingSection.qrMenu.title")}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {qrMenuItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white dark:bg-slate-800 px-4 py-5 text-center text-sm text-slate-600 dark:text-slate-400 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-sky-600 p-4 text-white">
                  <Smartphone className="h-8 w-8" />
                  <p className="mt-4 text-2xl font-bold">
                    {t("selfOrderingSection.orderCard.orderNumber")}
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {t("selfOrderingSection.orderCard.status")}
                  </p>
                  <button className="mt-6 w-full rounded-xl bg-white dark:bg-slate-900 py-2 text-sm font-bold text-sky-700">
                    {t("selfOrderingSection.orderCard.payNow")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow
              label={t("selfOrderingSection.eyebrow.label")}
              icon={<MonitorSmartphone className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              {t("selfOrderingSection.title")}
              <br />
              {t("selfOrderingSection.subtitle")}
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("selfOrderingSection.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            {t("floorPlanSection.title")}
            <br />
            <HandUnderline color="bg-teal-400">
              {t("floorPlanSection.highlight")}
            </HandUnderline>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("floorPlanSection.description")}
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-5 gap-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-bold ${
                  index % 5 === 0
                    ? "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400"
                    : index % 3 === 0
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                T{index + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("orderPreparationSection.title")}{" "}
            <BrushHighlight color="bg-rose-300 dark:bg-rose-800">
              {t("orderPreparationSection.highlight")}
            </BrushHighlight>{" "}
            {t("orderPreparationSection.subtitle")}
          </ScriptHeading>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("orderPreparationSection.description")}
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <p className="text-left font-semibold text-slate-950 dark:text-white">
                {t("orderPreparationSection.kitchenDisplay.title")}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {kitchenDisplayItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-linear-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 px-4 py-5 text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <p className="font-semibold text-slate-950 dark:text-white">
                {t("orderPreparationSection.preparationWorkflow.title")}
              </p>
              <div className="mt-5 space-y-3">
                {preparationSteps.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950/50 text-xs font-bold text-sky-700 dark:text-sky-400">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("featuresSection.title")}{" "}
            <HandCircle color="border-teal-400 dark:border-teal-500">
              {t("featuresSection.highlight")}
            </HandCircle>
            <br />
            {t("featuresSection.subtitle")}{" "}
            <HandUnderline color="bg-sky-400">
              {t("featuresSection.subtitle")}
            </HandUnderline>
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuresList.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
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
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
          >
            {t("featuresSection.seeAllFeatures")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          {t("appsSection.title")}{" "}
          <HandUnderline color="bg-sky-400">
            {t("appsSection.needHighlight")}
          </HandUnderline>
          ,{" "}
          <HandUnderline color="bg-sky-400">
            {t("appsSection.appHighlight")}
          </HandUnderline>
          .
        </ScriptHeading>

        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
          {t("appsSection.description")}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appsList.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
        >
          {t("appsSection.seeAllApps")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-sky-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              {t("ctaSection.description")}
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-sky-600 dark:text-sky-400" />

        <ScriptHeading>
          {t("getStartedSection.title")}
          <br />
          {t("getStartedSection.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("getStartedSection.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 dark:shadow-sky-500/30"
          >
            {t("getStartedSection.buttons.contactSales")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

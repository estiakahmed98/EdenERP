"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSignature,
  Globe2,
  ListTodo,
  Menu,
  MessageCircle,
  PackageCheck,
  PenLine,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

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

export default function RentalPage() {
  const t = useTranslations("pages.rental");

  const featuresList = [
    {
      title: t("featuresSection.features.unavailableDays.title"),
      description: t("featuresSection.features.unavailableDays.description"),
      icon: CalendarDays,
    },
    {
      title: t("featuresSection.features.minimalRentalTime.title"),
      description: t("featuresSection.features.minimalRentalTime.description"),
      icon: Clock3,
    },
    {
      title: t("featuresSection.features.paddingInOut.title"),
      description: t("featuresSection.features.paddingInOut.description"),
      icon: Zap,
    },
    {
      title: t("featuresSection.features.delayCosts.title"),
      description: t("featuresSection.features.delayCosts.description"),
      icon: ReceiptText,
    },
    {
      title: t("featuresSection.features.defaultPaddingTime.title"),
      description: t("featuresSection.features.defaultPaddingTime.description"),
      icon: ShieldCheck,
    },
    {
      title: t("featuresSection.features.easyQuotations.title"),
      description: t("featuresSection.features.easyQuotations.description"),
      icon: FileSignature,
    },
  ];

  const appsList = [
    {
      title: t("appsSection.apps.sign.title"),
      desc: t("appsSection.apps.sign.desc"),
      icon: PenLine,
    },
    {
      title: t("appsSection.apps.inventory.title"),
      desc: t("appsSection.apps.inventory.desc"),
      icon: PackageCheck,
    },
    {
      title: t("appsSection.apps.invoicing.title"),
      desc: t("appsSection.apps.invoicing.desc"),
      icon: ReceiptText,
    },
    {
      title: t("appsSection.apps.ecommerce.title"),
      desc: t("appsSection.apps.ecommerce.desc"),
      icon: Globe2,
    },
    {
      title: t("appsSection.apps.maintenance.title"),
      desc: t("appsSection.apps.maintenance.desc"),
      icon: CheckCircle2,
    },
  ];

  const menuItems = [
    t("hero.dashboard.menuItems.rentalOrders"),
    t("hero.dashboard.menuItems.quotations"),
    t("hero.dashboard.menuItems.products"),
    t("hero.dashboard.menuItems.calendar"),
  ];

  const weekDays = [
    t("hero.dashboard.calendarDays.mon"),
    t("hero.dashboard.calendarDays.tue"),
    t("hero.dashboard.calendarDays.wed"),
    t("hero.dashboard.calendarDays.thu"),
    t("hero.dashboard.calendarDays.fri"),
    t("hero.dashboard.calendarDays.sat"),
    t("hero.dashboard.calendarDays.sun"),
  ];

  const rentalItems = [
    t("hero.dashboard.rentalItems.cameraKit"),
    t("hero.dashboard.rentalItems.meetingRoom"),
    t("hero.dashboard.rentalItems.deliveryVan"),
    t("hero.dashboard.rentalItems.projector"),
  ];

  const stepItems = [
    t("onlineRentalSection.demoCard.steps.pickDates"),
    t("onlineRentalSection.demoCard.steps.confirmProduct"),
    t("onlineRentalSection.demoCard.steps.payOnline"),
  ];

  const quotationDetails = [
    {
      label: t("timeMoneySection.quotationCard.customer"),
      value: t("timeMoneySection.quotationCard.values.customer"),
    },
    {
      label: t("timeMoneySection.quotationCard.rentalPeriod"),
      value: t("timeMoneySection.quotationCard.values.rentalPeriod"),
    },
    {
      label: t("timeMoneySection.quotationCard.subtotal"),
      value: t("timeMoneySection.quotationCard.values.subtotal"),
    },
    {
      label: t("timeMoneySection.quotationCard.taxes"),
      value: t("timeMoneySection.quotationCard.values.taxes"),
    },
    {
      label: t("timeMoneySection.quotationCard.total"),
      value: t("timeMoneySection.quotationCard.values.total"),
    },
  ];

  const todoTasks = [
    {
      name: t("todoSection.tasks.prepareProduct.name"),
      priority: t("todoSection.tasks.prepareProduct.priority"),
      date: t("todoSection.tasks.prepareProduct.date"),
      status: t("todoSection.tasks.prepareProduct.status"),
    },
    {
      name: t("todoSection.tasks.sendAgreement.name"),
      priority: t("todoSection.tasks.sendAgreement.priority"),
      date: t("todoSection.tasks.sendAgreement.date"),
      status: t("todoSection.tasks.sendAgreement.status"),
    },
    {
      name: t("todoSection.tasks.confirmPayment.name"),
      priority: t("todoSection.tasks.confirmPayment.priority"),
      date: t("todoSection.tasks.confirmPayment.date"),
      status: t("todoSection.tasks.confirmPayment.status"),
    },
    {
      name: t("todoSection.tasks.schedulePickup.name"),
      priority: t("todoSection.tasks.schedulePickup.priority"),
      date: t("todoSection.tasks.schedulePickup.date"),
      status: t("todoSection.tasks.schedulePickup.status"),
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <p className="mx-auto mb-4 max-w-xl text-sm font-medium text-slate-500 dark:text-slate-400">
            {t("hero.subtitle")}
          </p>

          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <span className="relative inline-block text-[#02a6a6] dark:text-[#02cfc3]">
              {t("hero.titleHighlight")}
              <span className="absolute -bottom-2 left-2 h-2 w-[90%] rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-8 hidden rotate-[-18deg] text-[#ff5c78] dark:text-[#ff7a8e] sm:block">
              <Sparkles className="h-12 w-12" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-300 dark:bg-red-700" />
                    <span className="h-3 w-3 rounded-full bg-amber-300 dark:bg-amber-700" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300 dark:bg-emerald-700" />
                  </div>
                  <div className="h-3 w-40 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-7 w-7 rounded-full bg-[#714b67] dark:bg-[#8a5a7e]" />
                </div>

                <div className="grid gap-3 p-5 lg:grid-cols-[190px_1fr]">
                  <div className="space-y-3 rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm">
                    {menuItems.map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-left text-xs font-semibold ${
                          index === 0
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm">
                    <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-500">
                      {weekDays.map((day) => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="ml-[14%] h-8 w-[45%] rounded-md bg-[#f6c453] dark:bg-[#d4a83a] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100">
                        {rentalItems[0]}
                      </div>
                      <div className="ml-[25%] h-8 w-[38%] rounded-md bg-[#93c5fd] dark:bg-[#6b9fd3] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100">
                        {rentalItems[1]}
                      </div>
                      <div className="ml-[40%] h-8 w-[35%] rounded-md bg-[#a7f3d0] dark:bg-[#7ecfa5] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100">
                        {rentalItems[2]}
                      </div>
                      <div className="ml-[8%] h-8 w-[28%] rounded-md bg-[#c4b5fd] dark:bg-[#9a87d4] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100">
                        {rentalItems[3]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-[#02a6a6] dark:text-[#02cfc3]">
            <Wifi className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("onlineRentalSection.title")}{" "}
            <span className="relative inline-block">
              {t("onlineRentalSection.titleHighlight")}
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("onlineRentalSection.description")}
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop"
                  alt="Rental workspace"
                  className="h-64 w-full rounded-lg object-cover"
                />
              </div>

              <div className="p-6 text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("onlineRentalSection.demoCard.productTitle")}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {t("onlineRentalSection.demoCard.selectDates")}
                </p>

                <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
                  {Array.from({ length: 35 }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex h-8 items-center justify-center rounded-md ${
                        [10, 11, 12, 18, 19].includes(index)
                          ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("onlineRentalSection.demoCard.bookNow")}
                </button>
              </div>
            </div>

            <div className="bg-[#171824] dark:bg-[#0a0a14] px-6 py-5 text-left text-white">
              <div className="grid gap-4 sm:grid-cols-3">
                {stepItems.map((item) => (
                  <div key={item}>
                    <p className="text-xs font-bold">{item}</p>
                    <p className="mt-1 text-[11px] text-white/55">
                      {t("onlineRentalSection.demoCard.stepDesc")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute left-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="mt-2 h-3 w-20 rounded bg-slate-100 dark:bg-slate-700/50" />
                </div>
                <div className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("timeMoneySection.quotationCard.sendButton")}
                </div>
              </div>

              <div className="space-y-3">
                {quotationDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-500 dark:text-slate-400">
                      {label}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("timeMoneySection.title")}
              <br />
              {t("timeMoneySection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {t("timeMoneySection.description")}
            </p>

            <div className="mt-10 flex items-center gap-4 text-slate-300 dark:text-slate-600">
              <div className="h-px w-20 border-t border-dashed border-slate-300 dark:border-slate-700" />
              <ArrowDown className="h-8 w-8 rotate-[-25deg]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("signatureSection.title")}
              <br />
              {t("signatureSection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {t("signatureSection.description")}
            </p>
          </div>

          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 shadow-sm">
                {t("signatureSection.flow")}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="h-4 w-24 rounded bg-[#714b67] dark:bg-[#8a5a7e]" />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="h-5 w-48 rounded bg-slate-800 dark:bg-slate-600" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-11/12 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-6 flex justify-end">
                    <div
                      className="text-2xl text-[#714b67] dark:text-[#9b6a8f]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {t("signatureSection.signatureLabel")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-[#02a6a6] dark:text-[#02cfc3]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("todoSection.title")}{" "}
            <span className="relative inline-block text-[#f59e0b] dark:text-[#fbbf24]">
              {t("todoSection.titleHighlight")}
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#f59e0b]/20 dark:bg-[#fbbf24]/30" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("todoSection.description")}
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-3 text-left">
              {todoTasks.map((task) => (
                <div
                  key={task.name}
                  className="grid grid-cols-4 items-center rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-white">
                    {task.name}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {task.priority}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {task.date}
                  </span>
                  <span className="rounded-full bg-white dark:bg-slate-700 px-3 py-1 text-center font-bold text-[#714b67] dark:text-[#9b6a8f]">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block text-[#02a6a6] dark:text-[#02cfc3]">
              {t("featuresSection.highlight")}
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
            </span>
            <br />
            {t("featuresSection.subtitle")}
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <Icon className="h-5 w-5" />
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
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("featuresSection.seeAllFeatures")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-900">
              {t("appsSection.needHighlight")}
            </HandUnderline>
            ,{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-900">
              {t("appsSection.appHighlight")}
            </HandUnderline>
            .
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appsList.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.desc}
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
            {t("appsSection.seeAllApps")} <ArrowRight className="h-4 w-4" />
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
                alt="User avatar"
                className="absolute h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaSection.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaSection.description")}
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
                  {t("ctaSection.testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("ctaSection.testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("ctaSection.testimonial.title")}
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
              {t("getStartedSection.title")}
              <br />
              {t("getStartedSection.subtitle")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("getStartedSection.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

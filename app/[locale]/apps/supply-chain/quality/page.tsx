"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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
    key: "worksWithProcess",
    icon: BadgeCheck,
  },
  {
    key: "centralizeInspections",
    icon: BadgeCheck,
  },
  {
    key: "kanbanView",
    icon: BadgeCheck,
  },
  {
    key: "orderIntegration",
    icon: BadgeCheck,
  },
];

const apps = [
  {
    key: "manufacturing",
    icon: Factory,
  },
  {
    key: "inventory",
    icon: PackageCheck,
  },
  {
    key: "plm",
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
  const t = useTranslations("pages.quality");

  // Kanban board columns data
  const kanbanColumns = [
    {
      key: "new",
      cards: [
        "checkComponents",
        "visualInspection",
        "packagingReview",
      ],
    },
    {
      key: "confirmed",
      cards: [
        "dimensionMismatch",
        "paintColorVerification",
        "assemblyTolerance",
      ],
    },
    {
      key: "inProgress",
      cards: [
        "supplierDefect",
        "workshopCheck",
        "productValidation",
      ],
    },
    {
      key: "correctiveAction",
      cards: [
        "fixBatch",
        "replaceParts",
        "updateControlPoint",
      ],
    },
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t('header.title')}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
                {t('header.subtitle')}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('header.description')}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t('header.buttons.startNow')}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t('header.buttons.meetAdvisor')}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Quality
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    Overview / Quality Control / Alerts / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  New
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 md:grid-cols-4">
                {kanbanColumns.map((column, columnIndex) => (
                  <div
                    key={column.key}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {t(`kanbanBoard.columns.${column.key}`)}
                      </p>
                      <span className="text-lg font-bold text-slate-400 dark:text-slate-500">
                        +
                      </span>
                    </div>

                    <div className="space-y-3">
                      {column.cards.map((card, cardIndex) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {t(`kanbanBoard.cards.${card}`)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            Quality Alert #{columnIndex + 1}
                            {cardIndex + 1}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1 text-amber-400 dark:text-amber-500">
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

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t('section1.title')}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t('section1.subtitle')}</span>
            </HandUnderline>{" "}
            {t('section1.description')}
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-white dark:bg-slate-800 px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-lg ring-1 ring-slate-100 dark:ring-slate-700">
                  Quality / Control Points / Tablet view
                </div>
              </div>

              <DashedArrow className="mx-auto mb-6 h-20 w-20 rotate-90 text-[#714b67] dark:text-[#9b6a8f]/50" />

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {t('section1.controlPoint.title')}
                  </p>
                  <span className="text-slate-400 dark:text-slate-500">×</span>
                </div>

                <div className="space-y-4">
                  {[
                    ["product", t('section1.controlPoint.fields.product')],
                    ["manufacturingStep", t('section1.controlPoint.fields.manufacturingStep')],
                    ["controlType", t('section1.controlPoint.fields.controlType')],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        {label}
                      </p>
                      <div className="mt-2 rounded-md bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-100 dark:ring-slate-700">
                        {key === "product" && t('section1.controlPoint.fields.product')}
                        {key === "manufacturingStep" && t('section1.controlPoint.fields.manufacturingStep')}
                        {key === "controlType" && t('section1.controlPoint.fields.passFail')}
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {t('section1.controlPoint.fields.team')}
                    </p>
                    <div className="mt-2 rounded-md bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-100 dark:ring-slate-700">
                      Quality Team
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                    {t('section1.controlPoint.buttons.pass')}
                  </button>
                  <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    {t('section1.controlPoint.buttons.fail')}
                  </button>
                </div>
              </div>
            </div>

            <p className="mx-auto max-w-md text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t('section1.descriptionText')}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t('section2.title')}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t('section2.subtitle')}</span>
              </HandUnderline>
              <br />
              {t('section2.description')}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t('section2.qualityAlert.correctiveActionText')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-24 right-6 hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-xl lg:block">
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
                      : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <DashedArrow className="absolute -left-10 -top-8 hidden h-20 w-20 rotate-80 text-[#714b67] dark:text-[#9b6a8f]/60 lg:block" />

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {t('section2.qualityAlert.title')}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {t('section2.qualityAlert.id')}
                  </h3>
                </div>

                <span className="rounded-full bg-rose-50 dark:bg-rose-950/50 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                  {t('section2.qualityAlert.critical')}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {t('section2.qualityAlert.product')}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {t('section2.qualityAlert.productValue')}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {t('section2.qualityAlert.rootCause')}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {t('section2.qualityAlert.rootCauseValue')}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {t('section2.qualityAlert.team')}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {t('section2.qualityAlert.teamValue')}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {t('section2.qualityAlert.priority')}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {t('section2.qualityAlert.priorityValue')}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('section2.qualityAlert.correctiveAction')}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t('section2.qualityAlert.correctiveActionText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                {t('section3.inspectionWorksheet.title')}
              </p>
              <span className="text-slate-400 dark:text-slate-500">×</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_170px]">
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-700/50" />
                <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-700/50" />
                <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {t('section3.inspectionWorksheet.operatorNote')}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {t('section3.inspectionWorksheet.operatorNoteText')}
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
              <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                {t('section1.controlPoint.buttons.pass')}
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                {t('section1.controlPoint.buttons.fail')}
              </button>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t('section3.title')}
              <br />
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t('section3.subtitle')}</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t('section3.descriptionText')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t('section4.title')}{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t('section4.subtitle')}</span>
              </HandUnderline>{" "}
              {t('section4.description')}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t('section4.descriptionText')}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 md:grid-cols-3">
              {["new", "inProgress", "done"].map((column, columnIndex) => (
                <div
                  key={column}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
                >
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                    {t(`section4.columns.${column}`)}
                  </p>

                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm"
                      >
                        <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mt-2 h-2 w-full rounded bg-slate-100 dark:bg-slate-700/50" />

                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                              index === 0
                                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
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

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t('section5.title')}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">{t('section5.subtitle')}</span>
            </HandUnderline>{" "}
            {t('section5.description')}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t('section5.description')}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Worksheet
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {t('section5.checklist.title')}
                  </h3>
                </div>
                <span className="text-slate-400 dark:text-slate-500">×</span>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {t.raw('section5.checklist.items').map((item: string, index: number) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      {index % 2 === 0 ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                      ) : (
                        <FileText className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                      )}
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      Required
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t('section5.buttons.save')}
                </button>
                <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  {t('section5.buttons.cancel')}
                </button>
              </div>
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
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t('featuresSection.title')}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t('featuresSection.subtitle1')}</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            {t('featuresSection.subtitle2')}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t('featuresSection.done')}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {t('featuresSection.qualityStats.title')}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t('featuresSection.qualityStats.description')}
              </p>

              <div className="mt-8 flex h-64 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
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
                      className="w-full bg-sky-200 dark:bg-sky-800"
                      style={{ height: `${bar.blue}px` }}
                    />
                    <div
                      className="w-full bg-orange-400 dark:bg-orange-600"
                      style={{ height: `${bar.orange}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {features.slice(1).map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.key}
                  className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    {t(`features.${feature.key}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t('featuresSection.seeAllFeatures')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t('appsSection.title')}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t('appsSection.subtitle1')}</span>
            </HandUnderline>
            , {t('appsSection.subtitle2')}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t('appsSection.subtitle3')}</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t('appsSection.description')}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.key}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {t(`apps.${app.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {t(`apps.${app.key}.description`)}
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
            {t('appsSection.seeAllApps')} <ArrowRight className="h-4 w-4" />
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
                {t('testimonialSection.joinTitle')}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t('testimonialSection.joinSubtitle')}
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
                  {t('testimonialSection.testimonial.text')}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t('testimonialSection.testimonial.name')}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t('testimonialSection.testimonial.role')}
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
              {t('ctaSection.title')}
              <br />
              {t('ctaSection.subtitle')}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t('ctaSection.subtitle2')}
                </span>
              </HandUnderline>{" "}
              {t('ctaSection.subtitle3')}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t('ctaSection.button')}
            </Link>

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
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

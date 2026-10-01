"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Factory,
  Gauge,
  Layers3,
  ListChecks,
  PackageCheck,
  Plus,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const apps = [
  { key: "manufacturing", icon: Factory },
  { key: "inventory", icon: PackageCheck },
  { key: "plm", icon: Layers3 },
];

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#f8eff6] px-4 py-2 text-sm font-semibold text-[#714b67] shadow-sm ring-1 ring-[#714b67]/10 dark:bg-[#2a1a24] dark:text-[#c79bb8] dark:ring-[#9b6a8f]/30">
      <span className="text-[#714b67] dark:text-[#c79bb8]">{icon}</span>
      {label}
    </div>
  );
}

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl ${className}`}
      style={{ fontFamily: handwrittenFont }}
    >
      {children}
    </h2>
  );
}

export default function QualityLandingSections() {
  const t = useTranslations("pages.quality");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("header.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
                {t("header.subtitle")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("header.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("header.buttons.startNow")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("header.buttons.meetAdvisor")}
            </Link>
          </div>

          {/* Quality Dashboard screenshot */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t("advancedSections.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("advancedSections.dashboard.description")}
                  </span>
                </div>
                <button className="flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <RefreshCw className="h-3.5 w-3.5" />
                  {t("advancedSections.dashboard.refresh")}
                </button>
              </div>

              <img
                src="/Assets/Quality/Quality Dashboard.png"
                alt={t("advancedSections.dashboard.imageAlt")}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Non-Conformance */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<ShieldAlert className="h-4 w-4" />}
              label={t("advancedSections.nonConformance.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("advancedSections.nonConformance.titleStart")}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">
                  {t("advancedSections.nonConformance.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("advancedSections.nonConformance.titleEnd")}
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("advancedSections.nonConformance.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("advancedSections.nonConformance.panelTitle")}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t("advancedSections.nonConformance.panelDescription")}
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition">
                <Plus className="h-3.5 w-3.5" />
                {t("advancedSections.nonConformance.button")}
              </button>
            </div>

            <img
              src="/Assets/Quality/Non-Conformance.png"
              alt={t("advancedSections.nonConformance.imageAlt")}
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                title: t("advancedSections.nonConformance.highlights.severity.title"),
                desc: t("advancedSections.nonConformance.highlights.severity.description"),
              },
              {
                title: t("advancedSections.nonConformance.highlights.rootCause.title"),
                desc: t("advancedSections.nonConformance.highlights.rootCause.description"),
              },
              {
                title: t("advancedSections.nonConformance.highlights.traceability.title"),
                desc: t("advancedSections.nonConformance.highlights.traceability.description"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-sm"
              >
                <p className="font-bold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPA */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<ClipboardList className="h-4 w-4" />}
              label={t("advancedSections.capa.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("advancedSections.capa.titleStart")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">
                  {t("advancedSections.capa.titleHighlight")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("advancedSections.capa.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("advancedSections.capa.panelTitle")}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t("advancedSections.capa.panelDescription")}
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                <Plus className="h-3.5 w-3.5" />
                {t("advancedSections.capa.button")}
              </button>
            </div>

            <img
              src="/Assets/Quality/CAPA.png"
              alt={t("advancedSections.capa.imageAlt")}
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("advancedSections.capa.methodsTitle")}
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {t("advancedSections.capa.methods.fiveWhys.title")}
                  </strong>{" "}
                  {t("advancedSections.capa.methods.fiveWhys.description")}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {t("advancedSections.capa.methods.fishbone.title")}
                  </strong>{" "}
                  {t("advancedSections.capa.methods.fishbone.description")}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {t("advancedSections.capa.methods.eightD.title")}
                  </strong>{" "}
                  {t("advancedSections.capa.methods.eightD.description")}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {t("advancedSections.capa.methods.pareto.title")}
                  </strong>{" "}
                  {t("advancedSections.capa.methods.pareto.description")}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("advancedSections.capa.lifecycleTitle")}
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  t("advancedSections.capa.lifecycle.raiseNc"),
                  t("advancedSections.capa.lifecycle.containment"),
                  t("advancedSections.capa.lifecycle.rootCause"),
                  t("advancedSections.capa.lifecycle.openCapa"),
                  t("advancedSections.capa.lifecycle.corrective"),
                  t("advancedSections.capa.lifecycle.preventive"),
                  t("advancedSections.capa.lifecycle.verification"),
                  t("advancedSections.capa.lifecycle.close"),
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 px-3 py-2"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#714b67]/10 text-xs font-bold text-[#714b67] dark:bg-[#9b6a8f]/20 dark:text-[#c79bb8]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AQL Sampling */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Calculator className="h-4 w-4" />}
              label={t("advancedSections.aql.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("advancedSections.aql.titleStart")}{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">
                  {t("advancedSections.aql.titleHighlight")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("advancedSections.aql.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("advancedSections.aql.panelTitle")}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t("advancedSections.aql.panelDescription")}
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                <RefreshCw className="h-3.5 w-3.5" />
                {t("advancedSections.aql.button")}
              </button>
            </div>

            <img
              src="/Assets/Quality/AQL Sampling.png"
              alt={t("advancedSections.aql.imageAlt")}
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-6 text-left">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("advancedSections.aql.exampleTitle")}
              </p>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
                {[
                  {
                    label: t("advancedSections.aql.example.lotSize.label"),
                    value: t("advancedSections.aql.example.lotSize.value"),
                  },
                  {
                    label: t("advancedSections.aql.example.sampleSize.label"),
                    value: t("advancedSections.aql.example.sampleSize.value"),
                  },
                  {
                    label: t("advancedSections.aql.example.acceptReject.label"),
                    value: t("advancedSections.aql.example.acceptReject.value"),
                  },
                  {
                    label: t("advancedSections.aql.example.defectsFound.label"),
                    value: t("advancedSections.aql.example.defectsFound.value"),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm"
                  >
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {t("advancedSections.aql.exampleDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPC */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute left-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<TrendingUp className="h-4 w-4" />}
              label={t("advancedSections.spc.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("advancedSections.spc.titleStart")}{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">
                  {t("advancedSections.spc.titleHighlight")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("advancedSections.spc.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("advancedSections.spc.panelTitle")}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {t("advancedSections.spc.panelDescription")}
              </p>
            </div>

            <img
              src="/Assets/Quality/SPC.png"
              alt={t("advancedSections.spc.imageAlt")}
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              {
                title: t("advancedSections.spc.highlights.capability.title"),
                desc: t("advancedSections.spc.highlights.capability.description"),
              },
              {
                title: t("advancedSections.spc.highlights.limits.title"),
                desc: t("advancedSections.spc.highlights.limits.description"),
              },
              {
                title: t("advancedSections.spc.highlights.alerts.title"),
                desc: t("advancedSections.spc.highlights.alerts.description"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-sm"
              >
                <p className="font-bold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QMS Workflow */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("advancedSections.workflow.titleStart")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("advancedSections.workflow.titleHighlight")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>{" "}
            {t("advancedSections.workflow.titleEnd")}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("advancedSections.workflow.description")}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              {
                icon: ShieldAlert,
                title: t("advancedSections.workflow.steps.inspect.title"),
                desc: t("advancedSections.workflow.steps.inspect.description"),
              },
              {
                icon: Bell,
                title: t("advancedSections.workflow.steps.raiseNc.title"),
                desc: t("advancedSections.workflow.steps.raiseNc.description"),
              },
              {
                icon: ClipboardList,
                title: t("advancedSections.workflow.steps.capa.title"),
                desc: t("advancedSections.workflow.steps.capa.description"),
              },
              {
                icon: TrendingUp,
                title: t("advancedSections.workflow.steps.spc.title"),
                desc: t("advancedSections.workflow.steps.spc.description"),
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("featuresSection.seeAllFeatures")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Apps */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("appsSection.subtitle1")}</span>
            </HandUnderline>
            , {t("appsSection.subtitle2")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("appsSection.subtitle3")}</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
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
            {t("appsSection.seeAllApps")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                &ldquo;
              </div>
              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {t("testimonialSection.testimonial.text")}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#714b67] font-bold text-white">
                    RH
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("testimonialSection.testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("testimonialSection.testimonial.role")}
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
              {t("ctaSection.title")}
              <br />
              {t("ctaSection.subtitle")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("ctaSection.subtitle2")}
                </span>
              </HandUnderline>{" "}
              {t("ctaSection.subtitle3")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("ctaSection.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

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
                    Quality Dashboard
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    Non-conformance, CAPA and inspection quality at a glance — last 90 days
                  </span>
                </div>
                <button className="flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </button>
              </div>

              <img
                src="/Assets/Quality/Quality Dashboard.png"
                alt="Quality Dashboard"
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
              label="Non-Conformance"
            />
            <ScriptHeading className="mt-4">
              Track every{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">quality defect</span>
              </HandUnderline>{" "}
              to closure
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              From inspections, production, or customer complaints — every
              defect gets an NC record, a severity, and a disposition, from
              raise to close.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Non-Conformance
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Track every quality defect to a disposition and closure — from
                  inspections, production or complaints.
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition">
                <Plus className="h-3.5 w-3.5" />
                Raise NC
              </button>
            </div>

            <img
              src="/Assets/Quality/Non-Conformance.png"
              alt="Non-Conformance"
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                title: "Severity levels",
                desc: "Minor, Major, and Critical — Critical means customer safety risk, recall, or shipment hold.",
              },
              {
                title: "Root-cause methods",
                desc: "5 Whys, Fishbone (Ishikawa), 8D, or Pareto — pick the method that fits the problem.",
              },
              {
                title: "Full traceability",
                desc: "Every NC links to the CAPA, inspection, and shipment it came from.",
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
              label="CAPA"
            />
            <ScriptHeading className="mt-4">
              Corrective &{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">Preventive Action</span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              Drive every non-conformance to a verified, effective fix — root
              cause, action items, verification, and closure. Not just
              &quot;fix it once&quot;, but &quot;make sure it never happens
              again&quot;.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  CAPA — Corrective &amp; Preventive Action
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Drive every non-conformance to a verified, effective fix —
                  root cause, action items, verification, closure.
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                <Plus className="h-3.5 w-3.5" />
                Open CAPA
              </button>
            </div>

            <img
              src="/Assets/Quality/CAPA.png"
              alt="CAPA - Corrective and Preventive Action"
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                Root-cause methods built in
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    5 Whys —
                  </strong>{" "}
                  ask &quot;why?&quot; repeatedly (usually 5 times) to trace a
                  defect back to its true cause.
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    Fishbone (Ishikawa) —
                  </strong>{" "}
                  maps causes across Machine, Material, Method, Man,
                  Measurement, Environment.
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    8D —
                  </strong>{" "}
                  eight-discipline process for major customer complaints and
                  export shipments.
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    Pareto —
                  </strong>{" "}
                  ranks defects by frequency so you fix the biggest problem
                  first.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                CAPA lifecycle
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  "Raise NC",
                  "Containment action",
                  "Root cause analysis",
                  "Open CAPA & assign owner",
                  "Corrective action",
                  "Preventive action",
                  "Effectiveness verification",
                  "QA approval & close",
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
              label="AQL Sampling"
            />
            <ScriptHeading className="mt-4">
              ISO 2859-1{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">
                  acceptance sampling
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              Give the lot size, AQL, and inspection level — the calculator
              tells you the sample size and the accept/reject numbers.
              Trusted by H&amp;M, Zara, Primark, Walmart, and Target buyer
              audits.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  AQL Sampling (ISO 2859-1)
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Acceptance sampling for buyer audits — lot size + AQL + level
                  → sample size and accept/reject.
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                <RefreshCw className="h-3.5 w-3.5" />
                Evaluate
              </button>
            </div>

            <img
              src="/Assets/Quality/AQL Sampling.png"
              alt="AQL Sampling - ISO 2859-1"
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-6 text-left">
              <p className="font-bold text-slate-900 dark:text-white">
                Worked example
              </p>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
                {[
                  { label: "Lot size", value: "1,200 pcs" },
                  { label: "Sample size", value: "80 pcs" },
                  { label: "Accept / Reject", value: "10 / 11" },
                  { label: "Defects found", value: "6 → PASS" },
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
                6 defects out of 80 sampled ≤ accept number 10, so the lot
                passes and ships. If defects exceed the reject number (11+),
                the lot fails and an NC + CAPA is raised automatically.
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
              label="SPC — Early Warning System"
            />
            <ScriptHeading className="mt-4">
              Catch drift{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">before it's a defect</span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              Statistical Process Control watches your process while
              production runs — not just the finished product. Individuals
              &amp; moving-range charts plus process capability (Cp/Cpk) from
              QC readings.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <p className="font-bold text-slate-900 dark:text-white">
                SPC — Statistical Process Control
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Individuals &amp; moving-range control charts and process
                capability (Cp/Cpk) from QC readings.
              </p>
            </div>

            <img
              src="/Assets/Quality/SPC.png"
              alt="SPC - Statistical Process Control"
              className="w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              {
                title: "Cp / Cpk",
                desc: "Cp shows process width vs spec. Cpk shows whether the process is centered — below 1 means it needs attention.",
              },
              {
                title: "UCL / LCL vs USL / LSL",
                desc: "Control limits (statistical) are not the same as spec limits (customer requirement) — SPC watches both.",
              },
              {
                title: "Out-of-control alerts",
                desc: "The moment a reading crosses the control limit, production stops for investigation — before parts are rejected.",
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
            One system,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">zero</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>{" "}
            repeat defects
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            NC, CAPA, AQL, and SPC are connected — a failed inspection raises
            an NC, an NC opens a CAPA, and SPC prevents the next one before it
            starts.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              {
                icon: ShieldAlert,
                title: "1. Inspect",
                desc: "QC inspection or AQL sampling finds a defect.",
              },
              {
                icon: Bell,
                title: "2. Raise NC",
                desc: "Non-conformance recorded with severity and source.",
              },
              {
                icon: ClipboardList,
                title: "3. CAPA",
                desc: "Root cause found, corrective + preventive action assigned.",
              },
              {
                icon: TrendingUp,
                title: "4. SPC watch",
                desc: "Process monitored so the same defect can't recur.",
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

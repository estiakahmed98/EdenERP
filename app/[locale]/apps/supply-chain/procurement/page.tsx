"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Ship,
  ClipboardList,
  FileSpreadsheet,
  Gavel,
  Factory,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const apps = [
  { key: "purchase", icon: Factory },
  { key: "inventory", icon: PackageCheck },
  { key: "quality", icon: ShieldCheck },
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

export default function ProcurementLandingSections() {
  const t = useTranslations("pages.procurement");
  const tenderStats = t.raw("tenderSection.stats") as {
    label: string;
    value: string;
  }[];
  const workflowSteps = t.raw("workflowSection.steps") as {
    title: string;
    description: string;
  }[];

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

          <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Supply Chain & Landed Cost */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Ship className="h-4 w-4" />}
              label={t("landedCostSection.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("landedCostSection.title")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">
                  {t("landedCostSection.subtitle")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("landedCostSection.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("landedCostSection.eyebrow")}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Shipments → goods receipts → landed-cost allocation → true
                landed unit cost
              </p>
            </div>

            <Image
              src="/Assets/Supply Chain/Supply Chain & Landed Cost.png"
              alt="Supply Chain & Landed Cost"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {(t.raw("landedCostSection.features") as string[]).map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-sm"
              >
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Workflow className="h-4 w-4" />}
              label={t("procurementSection.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("procurementSection.title")}{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">
                  {t("procurementSection.subtitle")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("procurementSection.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("procurementSection.eyebrow")}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Purchase requisition → comparative statement → PO → GRN →
                bill
              </p>
            </div>

            <Image
              src="/Assets/Supply Chain/Procurement Purchase Requisitions.png"
              alt="Procurement - Purchase Requisitions"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {(t.raw("procurementSection.features") as string[]).map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-sm"
                >
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Purchase Requisitions */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionEyebrow
              icon={<ClipboardList className="h-4 w-4" />}
              label={t("requisitionsSection.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("requisitionsSection.title")}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">
                  {t("requisitionsSection.subtitle")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("requisitionsSection.description")}
            </p>

            <div className="mt-8 space-y-4">
              {(t.raw("requisitionsSection.features") as string[]).map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-sm">
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <Image
              src="/Assets/Supply Chain/Procurement Purchase Requisitions.png"
              alt="Purchase Requisitions"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Comparative Statements */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)] lg:order-1">
            <Image
              src="/Assets/Supply Chain/Comparative Statements.png"
              alt="Comparative Statements"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>

          <div className="order-2">
            <SectionEyebrow
              icon={<FileSpreadsheet className="h-4 w-4" />}
              label={t("comparativeSection.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("comparativeSection.title")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">
                  {t("comparativeSection.subtitle")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("comparativeSection.description")}
            </p>

            <div className="mt-8 space-y-4">
              {(t.raw("comparativeSection.features") as string[]).map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tender Management */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Gavel className="h-4 w-4" />}
              label={t("tenderSection.eyebrow")}
            />
            <ScriptHeading className="mt-4">
              {t("tenderSection.title")}{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">
                  {t("tenderSection.subtitle")}
                </span>
              </HandUnderline>
            </ScriptHeading>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("tenderSection.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("tenderSection.eyebrow")}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {t("tenderSection.description")}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {tenderStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-left"
                  >
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Image
              src="/Assets/Supply Chain/Tender Management.png"
              alt="Tender Management"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {(t.raw("tenderSection.features") as string[]).map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-sm"
              >
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected workflow */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-white dark:bg-slate-950 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("workflowSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("workflowSection.highlight")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("workflowSection.description")}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {workflowSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("featuresSection.subtitle1")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            {t("featuresSection.subtitle2")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("featuresSection.done")}
              </span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {(
              [
                "multiVendor",
                "landedCost",
                "tenderWorkflow",
                "approvalRouting",
              ] as const
            ).map((key) => (
              <div
                key={key}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {t(`features.${key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t(`features.${key}.description`)}
                </p>
              </div>
            ))}
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

      {/* Apps */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">
                {t("appsSection.subtitle1")}
              </span>
            </HandUnderline>
            , {t("appsSection.subtitle2")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">
                {t("appsSection.subtitle3")}
              </span>
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

      {/* Testimonial + CTA */}
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
                    FC
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

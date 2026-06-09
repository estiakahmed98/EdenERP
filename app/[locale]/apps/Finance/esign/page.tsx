"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  CirclePlay,
  FileCheck2,
  FileSignature,
  Lock,
  PenLine,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

// Feature icons mapping
const featureIcons = {
  "Draw or upload signature": PenLine,
  "Cryptographic traceability": ShieldCheck,
  "SMS authentication": Smartphone,
  "Signing order": Workflow,
  "Automatic reminders": Bell,
  "Legal validation": BadgeCheck,
};

// App icons mapping
const appIcons = {
  Accounting: FileCheck2,
  Sales: Send,
  Recruitment: Users,
  Documents: FileSignature,
  "Field Service": Smartphone,
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
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
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm ring-1 ring-cyan-100 dark:ring-cyan-800">
      <span className="text-cyan-500 dark:text-cyan-400">{icon}</span>
      {label}
    </div>
  );
}

function EsignDashboard({ t }: { t: any }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileSignature className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t("dashboard.appName")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-cyan-100 dark:bg-cyan-950/50 px-2 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
            {t("dashboard.status")}
          </span>
          <Lock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      <div className="grid min-h-90 md:grid-cols-[210px_1fr]">
        <aside className="border-r border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4">
          {[
            t("dashboard.menu.dashboard"),
            t("dashboard.menu.toSign"),
            t("dashboard.menu.waiting"),
            t("dashboard.menu.completed"),
            t("dashboard.menu.templates"),
          ].map((item, index) => (
            <div
              key={item}
              className={`mb-2 rounded-xl px-3 py-2 text-sm ${
                index === 1
                  ? "bg-cyan-100 dark:bg-cyan-950/50 font-semibold text-cyan-700 dark:text-cyan-300"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {item}
            </div>
          ))}
        </aside>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          {[
            t("dashboard.columns.draft"),
            t("dashboard.columns.waitingSignature"),
            t("dashboard.columns.signed"),
          ].map((column, index) => (
            <div
              key={column}
              className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {column}
                </p>
                <span className="rounded-full bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                  {index + 3}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  t("dashboard.documents.serviceAgreement"),
                  t("dashboard.documents.ndaContract"),
                  t("dashboard.documents.offerLetter"),
                ].map((item, i) => (
                  <div
                    key={`${column}-${item}-${i}`}
                    className="rounded-xl bg-white dark:bg-slate-900 p-3 text-left shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {index === 2
                        ? t("dashboard.statuses.completed")
                        : t("dashboard.statuses.needsAction")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600 dark:fill-cyan-500 dark:text-cyan-500" />
      </button>
    </div>
  );
}

export default function EsignPage() {
  const t = useTranslations("pages.eSign");

  // Get translated features
  const featuresList = [
    {
      title: t("featuresSection.features.drawSignature.title"),
      description: t("featuresSection.features.drawSignature.description"),
      icon: PenLine,
    },
    {
      title: t("featuresSection.features.cryptographicTraceability.title"),
      description: t(
        "featuresSection.features.cryptographicTraceability.description",
      ),
      icon: ShieldCheck,
    },
    {
      title: t("featuresSection.features.smsAuth.title"),
      description: t("featuresSection.features.smsAuth.description"),
      icon: Smartphone,
    },
    {
      title: t("featuresSection.features.signingOrder.title"),
      description: t("featuresSection.features.signingOrder.description"),
      icon: Workflow,
    },
    {
      title: t("featuresSection.features.automaticReminders.title"),
      description: t("featuresSection.features.automaticReminders.description"),
      icon: Bell,
    },
    {
      title: t("featuresSection.features.legalValidation.title"),
      description: t("featuresSection.features.legalValidation.description"),
      icon: BadgeCheck,
    },
  ];

  // Get translated apps
  const appsList = [
    {
      title: t("appsSection.apps.accounting.title"),
      desc: t("appsSection.apps.accounting.desc"),
      icon: FileCheck2,
    },
    {
      title: t("appsSection.apps.sales.title"),
      desc: t("appsSection.apps.sales.desc"),
      icon: Send,
    },
    {
      title: t("appsSection.apps.recruitment.title"),
      desc: t("appsSection.apps.recruitment.desc"),
      icon: Users,
    },
    {
      title: t("appsSection.apps.documents.title"),
      desc: t("appsSection.apps.documents.desc"),
      icon: FileSignature,
    },
    {
      title: t("appsSection.apps.fieldService.title"),
      desc: t("appsSection.apps.fieldService.desc"),
      icon: Smartphone,
    },
  ];

  const simplifyFeatures = [
    t("simplifySection.features.templates"),
    t("simplifySection.features.notify"),
    t("simplifySection.features.archive"),
  ];

  const mobileFeatures = [
    t("mobileSection.features.mobileReady"),
    t("mobileSection.features.oneClick"),
    t("mobileSection.features.secureIdentity"),
    t("mobileSection.features.instantConfirmation"),
  ];

  const controlStats = [
    [t("controlSection.stats.waiting"), "12", "cyan"],
    [t("controlSection.stats.reminderSent"), "7", "amber"],
    [t("controlSection.stats.completed"), "42", "emerald"],
    [t("controlSection.stats.expired"), "2", "rose"],
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label={t("hero.eyebrow.label")}
            icon={<FileSignature className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1
              style={{
                fontFamily:
                  '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
              }}
              className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            >
              {t("hero.title")}{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
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
              href="#advisor"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
            >
              {t("hero.buttons.meetAdvisor")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <EsignDashboard t={t} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              {t("dashboard.badges.instantWorkflow")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t("dashboard.badges.legallyTraceable")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            {t("simplifySection.title")}
            <br />
            {t("simplifySection.subtitle")}
            <br />
            <span className="text-cyan-600 dark:text-cyan-400">
              {t("simplifySection.highlight")}
            </span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("simplifySection.description")}
          </p>

          <div className="mt-8 space-y-4">
            {simplifyFeatures.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t("simplifySection.demoCard.title")}
              </p>
              <div className="space-y-3">
                <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-dashed border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/30 p-4 text-center text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                  {t("simplifySection.demoCard.signature1")}
                </div>
                <div className="rounded-xl border border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {t("simplifySection.demoCard.signature2")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-800" />
            <div className="relative mx-auto max-w-xs rounded-[2.5rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
                <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t("mobileSection.signatureCard.title")}
                </p>

                <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("mobileSection.signatureCard.fullName")}
                  </p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                    {t("mobileSection.signatureCard.name")}
                  </p>

                  <div
                    className="mt-5 rounded-xl border border-dashed border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/30 p-4 text-center text-2xl text-cyan-700 dark:text-cyan-400"
                    style={{
                      fontFamily:
                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                    }}
                  >
                    {t("mobileSection.signatureCard.name")}
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition">
                  {t("mobileSection.signatureCard.button")}
                </button>
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow
              label={t("mobileSection.eyebrow.label")}
              icon={<Smartphone className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              {t("mobileSection.title")}
              <br />
              {t("mobileSection.subtitle")}
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("mobileSection.description")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {mobileFeatures.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label={t("controlSection.eyebrow.label")}
            icon={<Workflow className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("controlSection.title")}
            <br />
            <span className="text-cyan-600 dark:text-cyan-400">
              {t("controlSection.titleHighlight")}
            </span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("controlSection.description")}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {controlStats.map(([label, count, color]) => (
              <div
                key={label}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-5"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p
                  className={`mt-3 text-4xl font-bold ${
                    color === "cyan"
                      ? "text-cyan-600 dark:text-cyan-400"
                      : color === "amber"
                        ? "text-amber-600 dark:text-amber-400"
                        : color === "emerald"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("featuresSection.title")}
            <br />
            {t("featuresSection.subtitle")}
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuresList.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.6rem] border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
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
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
          >
            {t("featuresSection.seeAllFeatures")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          {t("appsSection.title")}{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">
            {t("appsSection.needHighlight")}
          </HandUnderline>
          ,{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-900">
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
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
        >
          {t("appsSection.seeAllApps")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className={`absolute rounded-3xl ${
                  index % 3 === 0
                    ? "h-12 w-12 bg-cyan-200 dark:bg-cyan-950/30"
                    : index % 3 === 1
                      ? "h-10 w-10 bg-slate-200 dark:bg-slate-800"
                      : "h-14 w-14 bg-emerald-100 dark:bg-emerald-950/30"
                }`}
                style={{
                  top: `${(index * 17) % 88}%`,
                  left: `${(index * 29) % 92}%`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-cyan-600 dark:text-cyan-400" />

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
            id="advisor"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
          >
            {t("getStartedSection.buttons.contactSales")}
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          {t("getStartedSection.footer.freeTrial")} ·{" "}
          {t("getStartedSection.footer.instantAccess")}
        </p>
      </section>
    </main>
  );
}

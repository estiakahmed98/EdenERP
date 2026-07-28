"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  FileText,
  Grid3X3,
  Headphones,
  LineChart,
  Mail,
  MessageCircle,
  Phone,
  PieChart,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-5xl ${className}`}
      style={scriptFont}
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

function CrmDashboard({ t }: { t: any }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t("dashboard.appName")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {t("dashboard.status")}
          </span>
          <Bell className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      <Image
        src="/Assets/CRM/Adon CRM Pipeline.png"
        alt="Adon CRM Pipeline"
        width={1200}
        height={900}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function CrmPage() {
  const t = useTranslations("pages.crm");

  // Get translated features
  const featuresList = [
    {
      title: t("featuresSection.features.pipelineAutomation.title"),
      description: t("featuresSection.features.pipelineAutomation.description"),
      icon: Workflow,
    },
    {
      title: t("featuresSection.features.aiLeadScoring.title"),
      description: t("featuresSection.features.aiLeadScoring.description"),
      icon: Sparkles,
    },
    {
      title: t("featuresSection.features.followupReminders.title"),
      description: t("featuresSection.features.followupReminders.description"),
      icon: Bell,
    },
    {
      title: t("featuresSection.features.quotationBuilder.title"),
      description: t("featuresSection.features.quotationBuilder.description"),
      icon: FileText,
    },
    {
      title: t("featuresSection.features.customerTimeline.title"),
      description: t("featuresSection.features.customerTimeline.description"),
      icon: Users,
    },
    {
      title: t("featuresSection.features.salesAnalytics.title"),
      description: t("featuresSection.features.salesAnalytics.description"),
      icon: BarChart3,
    },
  ];

  // Get translated apps
  const appsList = [
    {
      title: t("appsSection.apps.sales.title"),
      desc: t("appsSection.apps.sales.desc"),
      icon: TrendingUpIcon,
    },
    {
      title: t("appsSection.apps.invoicing.title"),
      desc: t("appsSection.apps.invoicing.desc"),
      icon: FileText,
    },
    {
      title: t("appsSection.apps.emailMarketing.title"),
      desc: t("appsSection.apps.emailMarketing.desc"),
      icon: Mail,
    },
    {
      title: t("appsSection.apps.helpdesk.title"),
      desc: t("appsSection.apps.helpdesk.desc"),
      icon: Headphones,
    },
    {
      title: t("appsSection.apps.projects.title"),
      desc: t("appsSection.apps.projects.desc"),
      icon: Grid3X3,
    },
    {
      title: t("appsSection.apps.analytics.title"),
      desc: t("appsSection.apps.analytics.desc"),
      icon: PieChart,
    },
  ];

  const followUps = [
    { title: t("followupSection.steps.newLead"), icon: Target, time: "0 min" },
    {
      title: t("followupSection.steps.qualify"),
      icon: BadgeCheck,
      time: "2 min",
    },
    {
      title: t("followupSection.steps.scheduleCall"),
      icon: Phone,
      time: "1 day",
    },
    { title: t("followupSection.steps.sendOffer"), icon: Send, time: "2 days" },
    {
      title: t("followupSection.steps.winDeal"),
      icon: CheckCircle2,
      time: "3 days",
    },
  ];

  const pipelineFeatures = [
    t("pipelineSection.features.dragDeals"),
    t("pipelineSection.features.nextActivity"),
    t("pipelineSection.features.customerNotes"),
  ];

  const communicationChannels = [
    { label: t("communicationSection.channels.email"), icon: Mail },
    { label: t("communicationSection.channels.liveChat"), icon: MessageCircle },
    { label: t("communicationSection.channels.sms"), icon: Bell },
    { label: t("communicationSection.channels.voip"), icon: Phone },
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label={t("hero.eyebrow.label")}
            icon={<Users className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              {t("hero.title")}{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400"
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
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
            >
              <Play className="h-4 w-4 -rotate-6" />
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <CrmDashboard t={t} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              {t("dashboard.badges.realTimePipeline")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t("dashboard.badges.smartFollowups")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label={t("pipelineSection.eyebrow.label")}
            icon={<Target className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("pipelineSection.title")}
            <br />
            {t("pipelineSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("pipelineSection.description")}
          </p>

          <div className="mt-8 space-y-4">
            {pipelineFeatures.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <Image
            src="/Assets/CRM/Sales pipeline.png"
            alt="Sales pipeline"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("followupSection.title")}{" "}
            <span className="rounded-xl bg-amber-100 dark:bg-amber-950/50 px-2 text-amber-600 dark:text-amber-400">
              {t("followupSection.highlight")}
            </span>
          </ScriptHeading>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("followupSection.description")}
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-5">
            {followUps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                    {item.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          {t("communicationSection.title")}{" "}
          <span className="rounded-xl bg-emerald-100 dark:bg-emerald-950/50 px-2 text-emerald-600 dark:text-emerald-400">
            {t("communicationSection.highlight")}
          </span>
          <br />
          {t("communicationSection.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("communicationSection.description")}
        </p>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <Image
            src="/Assets/CRM/Customer management.png"
            alt="Customer management"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-5 sm:grid-cols-4">
          {communicationChannels.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl bg-white dark:bg-slate-900 p-4"
            >
              <Icon className="mx-auto h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label={t("quotationSection.eyebrow.label")}
            icon={<FileText className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("quotationSection.title")}
            <br />
            <span className="text-amber-600 dark:text-amber-400">
              {t("quotationSection.highlight")}
            </span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("quotationSection.description")}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <Image
            src="/Assets/CRM/Quotation.png"
            alt="Quotation"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:order-1">
          <Image
            src="/Assets/CRM/Revenue analytics.png"
            alt="Revenue analytics"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow
            label={t("analyticsSection.eyebrow.label")}
            icon={<LineChart className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("analyticsSection.title")}
            <br />
            {t("analyticsSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("analyticsSection.description")}
          </p>
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 dark:shadow-cyan-500/30"
          >
            {t("getStartedSection.buttons.contactSales")}
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          {t("getStartedSection.footer.freeTrial")} ·{" "}
          {t("getStartedSection.footer.noCreditCard")} ·{" "}
          {t("getStartedSection.footer.instantAccess")}
        </p>
      </section>
    </main>
  );
}

// Helper component for TrendingUp icon since it wasn't imported
function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

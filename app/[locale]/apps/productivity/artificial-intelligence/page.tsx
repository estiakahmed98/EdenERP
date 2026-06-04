"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe2,
  Mail,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Bot, Brain, CheckCircle2, ClipboardList,
    FileText, Globe2, Mail, MessageCircle, Play, Sparkles, Star,
    Users, WandSparkles, Zap, ArrowRight,
  };
  return icons[iconName] || Brain;
};

// Avatar images array (kept as static since these are image URLs)
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
];

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

export default function AIPoweredAppsLandingPage() {
  const t = useTranslations("pages.ai");

  const automationMetrics = t.raw("automationSection.metrics");
  const agentsSteps = t.raw("agentsSection.steps");
  const nextMoveItems = t.raw("nextMoveSection.demo.items");
  const organizationSteps = t.raw("organizationSection.steps");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
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
              {t("hero.advisorButton")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-sky-400 dark:text-sky-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex h-64 items-center justify-center bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
                <div className="relative">
                  <div className="absolute -left-8 -top-8 text-amber-400 dark:text-amber-500">
                    <Sparkles className="h-8 w-8 rotate-[-15deg]" />
                  </div>

                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-2xl">
                    <span className="bg-linear-to-r from-[#714b67] via-amber-400 to-sky-500 dark:from-[#9b6a8f] dark:via-amber-400 dark:to-sky-400 bg-clip-text text-5xl font-black text-transparent">
                      AI
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-40 bg-white dark:bg-slate-900" />

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Automate the work that slows you down Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("automationSection.title")}</span>
            </HandUnderline>{" "}
            {t("automationSection.titleHighlight")}
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {automationMetrics.map((metric: any, index: number) => (
              <div
                key={metric.label}
                className="relative rounded-xl bg-white dark:bg-slate-900 p-6 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-slate-50 dark:bg-slate-800/50 px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                    {metric.label}
                  </span>

                  {index % 3 === 0 ? (
                    <Bot className="h-7 w-7 text-sky-500 dark:text-sky-400" />
                  ) : index % 3 === 1 ? (
                    <Brain className="h-7 w-7 text-amber-500 dark:text-amber-400" />
                  ) : (
                    <Zap className="h-7 w-7 text-rose-500 dark:text-rose-400" />
                  )}
                </div>

                <p className="text-center text-4xl font-black text-slate-900 dark:text-white">
                  {metric.value}
                </p>

                <p className="mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents on your terms Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">{t("agentsSection.title")}</span>
            </HandUnderline>{" "}
            {t("agentsSection.titleHighlight")}
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("agentsSection.description")}
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              {agentsSteps.slice(0, 2).map((step: any) => (
                <div key={step.number} className="mb-10 flex gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 dark:border-rose-600 text-lg font-bold text-rose-500 dark:text-rose-400">
                    {step.number}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <span className="absolute -left-10 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 dark:border-rose-600 text-lg font-bold text-rose-500 dark:text-rose-400">
                3
              </span>

              <p className="mb-5 font-bold text-slate-900 dark:text-white">
                {agentsSteps[2]?.title}
              </p>

              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("agentsSection.demo.compliance.title")}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t("agentsSection.demo.compliance.message")}
                </p>
              </div>

              <div className="mt-5 rounded-lg bg-[#e9fbf8] dark:bg-[#0a2a2d] p-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("agentsSection.demo.generated.title")}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t("agentsSection.demo.generated.message")}
                </p>
              </div>
            </div>

            <DashedArrow className="absolute left-1/2 top-28 hidden h-28 w-28 rotate-80 text-[#714b67] dark:text-[#9b6a8f]/50 lg:block" />
          </div>
        </div>
      </section>

      {/* Let AI drive the next move Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("nextMoveSection.title")}{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("nextMoveSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("nextMoveSection.description")}
            </p>

            <p
              className="mt-10 text-2xl font-bold text-sky-500 dark:text-sky-400"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("nextMoveSection.useCase")}
              <br />
              {t("nextMoveSection.useCaseSubtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100 dark:bg-sky-900/30" />

            <div className="relative z-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow ring-1 ring-slate-100 dark:ring-slate-700">
                  <span className="bg-linear-to-r from-[#714b67] via-amber-400 to-sky-500 dark:from-[#9b6a8f] dark:via-amber-400 dark:to-sky-400 bg-clip-text text-2xl font-black text-transparent">
                    AI
                  </span>
                </span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("nextMoveSection.demo.title")}
                </p>
              </div>

              <div className="space-y-3">
                {nextMoveItems.map((item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                {t("nextMoveSection.demo.button")}
              </button>
            </div>

            <DashedArrow className="absolute right-0 top-12 z-20 h-24 w-24 rotate-210 text-[#714b67] dark:text-[#9b6a8f]/50" />
            <DashedArrow className="absolute bottom-8 left-0 z-20 h-24 w-24 rotate-20 text-[#714b67] dark:text-[#9b6a8f]/50" />
          </div>
        </div>
      </section>

      {/* Instant business insights Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Zap className="mb-6 h-12 w-12 text-amber-500 dark:text-amber-400" />

          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <span className="relative inline-block px-2">
              <span className="relative z-10">{t("insightsSection.title")}</span>
              <span className="absolute inset-x-0 bottom-2 h-6 rounded-lg bg-amber-300 dark:bg-amber-700" />
            </span>{" "}
            {t("insightsSection.titleHighlight")}
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("insightsSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl bg-white dark:bg-slate-900 p-8">
            <div className="flex h-80 items-end gap-4 border-b border-slate-200 dark:border-slate-700">
              {[45, 52, 48, 65, 80, 110, 155, 230].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-[#02cfc3] dark:bg-[#02cfc3]/50"
                    style={{ height }}
                  />
                  <div
                    className="w-full bg-rose-400 dark:bg-rose-600"
                    style={{ height: height * 0.45 }}
                  />
                  <div
                    className="w-full bg-amber-400 dark:bg-amber-600"
                    style={{ height: height * 0.3 }}
                  />
                  <p className="mt-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                    A{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next-level organization Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("organizationSection.title")}
            <br />
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("organizationSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("organizationSection.description")}
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[300px_1fr]">
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#02cfc3] dark:bg-[#02cfc3]/30 text-[#02a6a6] dark:text-[#02cfc3]">
                <FileText className="h-8 w-8" />
              </div>

              <p
                className="mt-5 text-xl font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("organizationSection.uploadText")}
              </p>
            </div>

            <div className="space-y-4">
              {organizationSteps.map((step: string) => (
                <div
                  key={step}
                  className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 px-5 py-4"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {step}
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                </div>
              ))}
            </div>

            <DashedArrow className="absolute left-65 top-20 hidden h-24 w-24 rotate-260 text-[#714b67] dark:text-[#9b6a8f]/50 lg:block" />
          </div>

          <p
            className="mt-12 text-center text-lg font-bold text-amber-500 dark:text-amber-400"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("organizationSection.footerText")}
          </p>
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
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
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
           
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("appsSection.description")}</span>
            </HandUnderline>
          </h2>

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
                alt=""
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
                    src={avatars[4]}
                    alt=""
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
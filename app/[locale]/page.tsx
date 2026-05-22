import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  CheckCircle2,
  Factory,
  Globe2,
  GraduationCap,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type ModuleKey =
  | "finance"
  | "sales"
  | "operations"
  | "people"
  | "commerce"
  | "analytics";

type WorkflowKey = "discover" | "launch" | "scale";
type IndustryKey = "retail" | "manufacturing" | "services" | "education";

const modules: Array<{
  key: ModuleKey;
  icon: typeof Wallet;
  accent: string;
}> = [
  { key: "finance", icon: Wallet, accent: "from-emerald-500 to-teal-500" },
  { key: "sales", icon: ShoppingBag, accent: "from-rose-500 to-orange-400" },
  { key: "operations", icon: Boxes, accent: "from-sky-500 to-cyan-400" },
  { key: "people", icon: Users, accent: "from-violet-500 to-fuchsia-500" },
  { key: "commerce", icon: Globe2, accent: "from-amber-500 to-yellow-400" },
  { key: "analytics", icon: BarChart3, accent: "from-slate-700 to-slate-500" }
];

const workflowSteps: Array<{
  key: WorkflowKey;
  icon: typeof Sparkles;
}> = [
  { key: "discover", icon: Sparkles },
  { key: "launch", icon: ShieldCheck },
  { key: "scale", icon: CheckCircle2 }
];

const industries: Array<{
  key: IndustryKey;
  icon: typeof ShoppingBag;
}> = [
  { key: "retail", icon: ShoppingBag },
  { key: "manufacturing", icon: Factory },
  { key: "services", icon: Briefcase },
  { key: "education", icon: GraduationCap }
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage.metadata");

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <main className="bg-[#fcfaf7] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fcfaf7_52%,#f4f2ee_100%)]">
        <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-700 shadow-sm">
              {t("hero.eyebrow")}
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t.rich("hero.title", {
                accent: (chunks) => (
                  <span className="bg-linear-to-r from-cyan-700 to-emerald-600 bg-clip-text text-transparent">
                    {chunks}
                  </span>
                )
              })}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/community/get-services/meet-advisor"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              {["pointOne", "pointTwo", "pointThree"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm"
                >
                  {t(`hero.points.${item}`)}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {t("dashboard.label")}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    {t("dashboard.title")}
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  {t("dashboard.badge")}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {["revenue", "orders", "inventory", "support"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      {t(`dashboard.metrics.${item}.label`)}
                    </p>
                    <p className="mt-3 text-3xl font-black text-slate-950">
                      {t(`dashboard.metrics.${item}.value`)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {t(`dashboard.metrics.${item}.note`)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-linear-to-r from-slate-950 to-slate-800 p-5 text-white">
                <p className="text-sm font-bold text-white/70">
                  {t("dashboard.highlight.label")}
                </p>
                <p className="mt-2 text-lg font-bold leading-8">
                  {t("dashboard.highlight.text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
            {t("platform.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {t("platform.title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {t("platform.description")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.key}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${module.accent} text-white`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {t(`platform.modules.${module.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {t(`platform.modules.${module.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">
              {t("workflow.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {t("workflow.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {t("workflow.description")}
            </p>
          </div>

          <div className="grid gap-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.key}
                  className="grid gap-4 rounded-3xl border border-slate-200 bg-[#fcfaf7] p-5 shadow-sm sm:grid-cols-[72px_1fr]"
                >
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                      {t("workflow.stepLabel", { index: index + 1 })}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-slate-950">
                      {t(`workflow.steps.${step.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {t(`workflow.steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-700">
              {t("industries.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {t("industries.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {t("industries.description")}
            </p>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-900"
          >
            {t("industries.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.key}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {t(`industries.cards.${industry.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {t(`industries.cards.${industry.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-18 text-white sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              {t("trust.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {t("trust.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {t("trust.description")}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm">
            <p className="text-lg leading-8 text-slate-100">
              {t("trust.quote")}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                  {t("trust.author")}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {t("trust.role")}
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                {t("trust.badge")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_45%,#166534_100%)] px-6 py-12 text-white shadow-[0_30px_90px_rgba(8,47,73,0.25)] sm:px-10 lg:px-14">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
            {t("cta.eyebrow")}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-cyan-50/85">
            {t("cta.description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
            >
              {t("cta.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/community/get-services/support"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {t("cta.secondaryCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

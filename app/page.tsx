import EdenAppsSection from "@/components/landing/ServiceSection";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CirclePlay,
  Clock3,
  Globe2,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

const stats = [
  { value: "45+", label: "Business apps" },
  { value: "99.9%", label: "Reliable uptime" },
  { value: "24/7", label: "Team visibility" },
  { value: "1", label: "Unified workspace" },
];

const highlights = [
  {
    title: "Sales, CRM & Clients",
    description:
      "Manage leads, clients, quotations, onboarding, follow-ups, and revenue from one connected pipeline.",
    icon: Users,
  },
  {
    title: "Tasks & Operations",
    description:
      "Assign work, track progress, automate approval flows, and keep every team aligned without scattered tools.",
    icon: Workflow,
  },
  {
    title: "Finance & Reports",
    description:
      "Monitor invoices, payouts, profit, activity logs, and business performance with clear dashboards.",
    icon: BarChart3,
  },
];

const modules = [
  "CRM",
  "Projects",
  "Inventory",
  "Accounting",
  "HRM",
  "Ecommerce",
  "Client Portal",
  "Automation",
];

const timeline = [
  "Capture client request",
  "Create package & assignment",
  "Generate tasks automatically",
  "Review quality & approvals",
  "Publish, report, and scale",
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl ${className}`}
      style={{
        fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
      }}
    >
      {children}
    </h2>
  );
}

function Eyebrow({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl">
      {icon}
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf7ff_22%,_#ffffff_52%,_#fff8ed_100%)] text-slate-800">
      <section className="relative isolate min-h-[760px] overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] lg:rounded-b-[8rem]">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/Assets/hero.png"
            alt="EdenERP business workspace"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_38%,rgba(255,255,255,0.48)_70%,rgba(255,255,255,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.14),transparent_28%),linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.86)_100%)]" />
        </div>

        <div className="absolute left-8 top-28 hidden h-20 w-20 rounded-[2rem] bg-white/75 shadow-xl backdrop-blur-xl lg:block" />
        <div className="absolute right-20 top-40 hidden h-28 w-28 rounded-full bg-primary/10 blur-2xl lg:block" />
        <div className="absolute bottom-20 left-1/2 hidden h-56 w-56 -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div className="flex max-w-2xl flex-col justify-center space-y-8">
            <Eyebrow icon={<Sparkles className="h-4 w-4" />}>
              Modern ERP for growing teams
            </Eyebrow>

            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/70">
                EdenERP Business Suite
              </p>

              <h1
                className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
                style={{
                  fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
                }}
              >
                Run your entire
                <span className="block bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] bg-clip-text text-transparent">
                  business beautifully.
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-600">
                EdenERP brings CRM, tasks, accounting, inventory, ecommerce,
                clients, teams, reports, and automation into one premium
                workspace built for speed, clarity, and growth.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/75 px-7 py-4 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-white"
              >
                <CirclePlay className="h-5 w-5 fill-primary/15" />
                Watch Demo
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="text-2xl font-bold text-slate-950">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="absolute -left-6 top-6 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Tasks synced
                  </p>
                  <p className="text-xs text-slate-500">124 updates today</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 bottom-12 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Rocket className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Growth ready
                  </p>
                  <p className="text-xs text-slate-500">Scale without chaos</p>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/75 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-inner">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-medium text-white/50">
                    EdenERP Command Center
                  </span>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="space-y-3">
                    {modules.slice(0, 6).map((module, index) => (
                      <div
                        key={module}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                          index === 0
                            ? "bg-white text-slate-950"
                            : "bg-white/8 text-white/70"
                        }`}
                      >
                        {module}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white p-5 text-slate-900">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Revenue Flow</p>
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="mt-6 h-32 rounded-2xl bg-[linear-gradient(135deg,_#ede9fe,_#fef3c7)] p-4">
                        <div className="flex h-full items-end gap-2">
                          {[35, 55, 42, 78, 66, 92, 74].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-xl bg-primary/80"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <Clock3 className="h-5 w-5 text-amber-300" />
                        <p className="mt-3 text-lg font-bold">8.4h</p>
                        <p className="text-xs text-white/50">Saved weekly</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <ShieldCheck className="h-5 w-5 text-emerald-300" />
                        <p className="mt-3 text-lg font-bold">Secure</p>
                        <p className="text-xs text-white/50">Role access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <Eyebrow icon={<Layers3 className="h-4 w-4" />}>
            One platform, every workflow
          </Eyebrow>
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>
              Replace scattered tools with one beautifully connected system.
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              EdenERP helps your business operate with fewer tabs, fewer manual
              updates, and far more visibility.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f5f8] py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="self-center">
            <Eyebrow icon={<Zap className="h-4 w-4" />}>
              Smart automation
            </Eyebrow>
            <div className="mt-8">
              <ScriptHeading>
                From client request to delivery, every step stays organized.
              </ScriptHeading>
            </div>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Build repeatable workflows for sales, onboarding, task creation,
              quality control, posting, reporting, and support—without losing
              the human touch.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white bg-white/80 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="space-y-4">
              {timeline.map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                    <p className="font-semibold text-slate-900">{step}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Automated handoff with clear ownership
                    </p>
                  </div>
                  {index < timeline.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 text-slate-300 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EdenAppsSection />

      <section
        id="demo"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#111827_0%,_#4c1d95_55%,_#f59e0b_140%)] p-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
              <CirclePlay className="h-9 w-9 fill-white/20" />
            </div>
            <h2
              className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{
                fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
              }}
            >
              See how EdenERP feels in action.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
              A premium ERP experience should feel simple, fast, and confident
              from the first click. Explore the workflow before you start.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center gap-2 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="mt-6 text-xl leading-9 text-slate-700">
              “EdenERP gives teams the clarity of a modern command center—every
              client, task, report, and workflow stays connected.”
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquareText className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-950">Operations Team</p>
                <p className="text-sm text-slate-500">Built for daily growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 text-center sm:px-6 lg:px-8 lg:pb-28">
        <div className="rounded-[3rem] bg-white px-6 py-14 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <LockKeyhole className="h-8 w-8" />
          </div>
          <ScriptHeading className="mt-7">
            Start small. Scale beautifully.
          </ScriptHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Launch with the apps you need today and keep expanding your system
            as your business grows.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/apps"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
            >
              Explore Apps
              <Globe2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const apps = [
  {
    title: "Employees",
    description: "Allow employees to request appraisals",
    icon: Users,
  },
  {
    title: "Recruitment",
    description: "Streamline your recruitment process",
    icon: Target,
  },
  {
    title: "Survey",
    description: "Create and customize 360 feedback survey",
    icon: ClipboardCheck,
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

export default function PerformanceLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Performance{" "}
            <HandUnderline color="bg-amber-300">
              <span className="text-amber-500">magic</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Unlock your team&apos;s full potential with 360° feedback, real-time
            goals, and automated appraisal cycles.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Meet an advisor
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Appraisals
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Appraisals / Goals / Reporting / Configuration
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100">
                  <div className="border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={avatars[0]}
                          alt="Anita Oliver"
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Anita Oliver
                          </h3>
                          <p className="text-sm text-slate-500">
                            Product Manager
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        To Confirm
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-0 lg:grid-cols-2">
                    <div className="border-r border-slate-100 dark:border-slate-700 p-6 text-left">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        Employee&apos;s Feedback
                      </p>

                      <div className="mt-5 space-y-5">
                        {[
                          "What was my best achievement?",
                          "What has been the most challenging aspect?",
                          "What would I need to improve my work?",
                        ].map((question) => (
                          <div key={question}>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              {question}
                            </p>
                            <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                            <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/40 p-6 text-left">
                      <div className="mb-5 flex items-center justify-between">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          Manager&apos;s Feedback
                        </p>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      </div>

                      <div className="rounded-lg bg-white dark:bg-slate-900 p-5 shadow-sm">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          Feedback
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                          She can provide achievement that convinced you of the
                          employee&apos;s value.
                        </p>
                      </div>

                      <div className="mt-5 rounded-lg bg-white dark:bg-slate-900 p-5 shadow-sm">
                        <p className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                          Evaluation
                        </p>

                        {[
                          ["Stress Resistance", 4],
                          ["Time Management", 5],
                          ["Teamwork", 4],
                          ["Autonomy", 5],
                        ].map(([label, score]) => (
                          <div
                            key={String(label)}
                            className="mb-3 flex items-center justify-between text-sm"
                          >
                            <span className="font-medium text-slate-600 dark:text-slate-300">
                              {label}
                            </span>
                            <span className="text-amber-400">
                              {"★".repeat(Number(score))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Set up periodical employee evaluation
          </h2>

          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
            Strengthen your company&apos;s key asset : employees
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Maintain the motivational process in your company by doing
            periodical evaluations of your employees&apos; performance.
            Regularly assess your human resources to bring benefits for your
            people as well as for your organization.
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Easy follow-up",
                icon: CheckCircle2,
                description:
                  "Clearly see the appraisal status for each employee or for the whole company.",
              },
              {
                title: "Clear calendar view",
                icon: CalendarCheck,
                description:
                  "Keep track of upcoming evaluations and send reminders to respondents.",
              },
              {
                title: "Exportable answers",
                icon: FileText,
                description: "Turn every evaluation into a printable PDF form.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <p className="mb-5 font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    {index === 0 && (
                      <div className="space-y-3 text-left">
                        <div className="rounded-lg bg-[#02cfc3]/20 p-4 text-sm font-bold text-[#02a6a6]">
                          Appraisal planned
                        </div>
                        <div className="h-3 rounded bg-slate-100" />
                        <div className="h-3 w-3/4 rounded bg-slate-100" />
                      </div>
                    )}

                    {index === 1 && (
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-8 rounded ${
                              [7, 16, 24].includes(i)
                                ? "bg-[#714b67]"
                                : "bg-slate-50 dark:bg-slate-800/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            Evaluation
                          </span>
                          <span className="rounded bg-[#714b67] px-3 py-1 text-xs text-white">
                            PDF
                          </span>
                        </div>
                        <div className="h-3 rounded bg-slate-100" />
                        <div className="h-3 rounded bg-slate-100" />
                        <div className="h-3 w-2/3 rounded bg-slate-100" />
                      </div>
                    )}

                    <Icon className="mx-auto mt-5 h-6 w-6 text-[#714b67]" />
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Build the right appraisal
          </h2>

          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
            Ask the right questions and collect insightful information
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Create the right survey to collect your employees answers. Prepare
            your own templates or choose from existing ones. Manage several
            types of evaluations: bottom-up, top-down, self-evaluations, and
            final evaluation by the manager.
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="bg-[#714b67] px-6 py-4 text-left text-white">
              <p className="font-bold">Appraisal</p>
            </div>

            <div className="overflow-hidden">
              <div className="grid grid-cols-6 bg-slate-50 dark:bg-slate-800/40 px-5 py-3 text-left text-xs font-bold uppercase text-slate-400">
                <span>Employee</span>
                <span>Department</span>
                <span>Appraisal Deadline</span>
                <span>Final Interview</span>
                <span>Status</span>
                <span>Answers</span>
              </div>

              {[
                [
                  "Anita Oliver",
                  "Management",
                  "07/24/2026",
                  "Planned",
                  "To Confirm",
                  "12",
                ],
                [
                  "Mitchell Admin",
                  "HR",
                  "08/03/2026",
                  "Done",
                  "Confirmed",
                  "9",
                ],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-6 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                >
                  {row.map((cell, index) => (
                    <span
                      key={cell}
                      className={
                        index === 0
                          ? "font-bold text-slate-900 dark:text-slate-100"
                          : index === 4
                            ? "w-fit rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600"
                            : "text-slate-500"
                      }
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Design your own survey
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
              Use templates or create them your way
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Create your own surveys to gather important information and
              opinions from your employees. Quickly add questions, edit pages,
              and draft a useful survey using great built-in templates or making
              your own design from scratch.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <p className="mb-5 text-left text-xl font-bold text-slate-900 dark:text-slate-100">
              Employee Appraisal Form
            </p>

            <div className="space-y-4">
              {[
                "Employee satisfaction",
                "Manager feedback",
                "Goal achievement",
                "Communication",
                "Teamwork",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {index + 1} answer
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded bg-[#02cfc3]/20 px-3 py-1 text-xs font-bold text-[#02a6a6]">
                AUTOMATED APPRAISAL PLAN
              </span>
              <span className="rounded bg-[#714b67] px-3 py-1 text-xs font-bold text-white">
                Done
              </span>
            </div>

            <div className="text-left">
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Mitchell Admin
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Appraisal plan generated automatically
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {["Self evaluation", "Manager review", "Final validation"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3"
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {item}
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Automate the evaluation
              <br />
              process
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
              Make sure evaluations stick to the schedule
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Create evaluation plans with a clear schedule to automatically
              generate interview requests. Specify the employee, department or
              level in the hierarchy which can answer your surveys.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-300">
              <span>need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300">
              <span>app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800/60 dark:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">growth</span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now
            </Link>

            <p className="mt-3 text-xs text-slate-400"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

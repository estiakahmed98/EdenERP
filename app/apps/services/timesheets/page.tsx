"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Timer,
  Users,
  X,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

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

const features = [
  {
    title: "Views",
    description: "Switch between different views as per your needs.",
  },
  {
    title: "Reminders",
    description:
      "Send reminders to users that have timesheets to encode or validate.",
  },
  {
    title: "Validation",
    description: "Validate entries in one click.",
  },
  {
    title: "Sales orders",
    description: "Link sales orders or services to timesheets.",
  },
  {
    title: "Invoicing",
    description:
      "Start and stop the timer from anywhere using keyboard shortcuts. Save time immediately with a task log.",
  },
  {
    title: "Access rights",
    description: "Grant or restrict your team’s access.",
  },
];

const apps = [
  {
    title: "Project",
    description: "Track time on tasks",
    icon: Clock3,
  },
  {
    title: "Helpdesk",
    description: "Track time on tickets",
    icon: HelpCircle,
  },
  {
    title: "Field Service",
    description: "Track time on interventions",
    icon: Zap,
  },
  {
    title: "Accounting",
    description: "Connect invoicing and payments",
    icon: BarChart3,
  },
  {
    title: "Time Off",
    description: "Create timesheets for days off",
    icon: Timer,
  },
];

export default function TimesheetsLandingPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Don&apos;t waste time.{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Track it.</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Adon Timesheets allows you to automate time tracking, eliminate
            leakage, and boost billable hours. All with an interface powered by
            smart recommendations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Meet an advisor
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users. See why
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900">Timesheets</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Timesheets / To Validate / Reporting / Configuration
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-[1.4fr_repeat(7,80px)] border-b border-slate-100 bg-slate-50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Description</span>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Total"].map(
                      (day) => (
                        <span key={day} className="text-center">
                          {day}
                        </span>
                      ),
                    )}
                  </div>

                  {[
                    [
                      "SO001 - Website Design",
                      "0:00",
                      "3:00",
                      "2:00",
                      "4:00",
                      "1:00",
                      "0:00",
                      "10:00",
                    ],
                    [
                      "Office Design",
                      "2:30",
                      "1:00",
                      "0:30",
                      "3:00",
                      "2:00",
                      "0:00",
                      "9:00",
                    ],
                    [
                      "Research & Development",
                      "1:00",
                      "2:00",
                      "4:00",
                      "2:00",
                      "1:30",
                      "0:00",
                      "10:30",
                    ],
                    [
                      "Support - Subscription",
                      "0:30",
                      "1:30",
                      "2:00",
                      "1:00",
                      "0:30",
                      "0:00",
                      "5:30",
                    ],
                    [
                      "Internal Meeting",
                      "1:00",
                      "0:30",
                      "1:00",
                      "0:30",
                      "1:00",
                      "0:00",
                      "4:00",
                    ],
                    [
                      "Training",
                      "0:00",
                      "0:00",
                      "2:00",
                      "2:00",
                      "0:00",
                      "0:00",
                      "4:00",
                    ],
                  ].map((row, rowIndex) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-[1.4fr_repeat(7,80px)] items-center border-b border-slate-100 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="flex items-center gap-2 font-bold text-slate-900">
                        <img
                          src={avatars[rowIndex]}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {row[0]}
                      </span>

                      {row.slice(1).map((cell, index) => (
                        <span
                          key={index}
                          className={`text-center ${
                            index === 5
                              ? "bg-[#b9eef0]/80 py-3 font-bold text-slate-900"
                              : index === 6
                                ? "bg-slate-200 py-3 font-bold text-slate-900"
                                : "text-slate-500"
                          }`}
                        >
                          {cell}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400"
              text="Everything time by team has been auto suggested already"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center gap-8 text-2xl">
            <span className="rotate-[-20deg] text-rose-400">⌞</span>
            <span className="text-sky-400">|||</span>
            <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
            <span className="rotate-30 text-amber-400">⌝</span>
          </div>

          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Where did all those hours go?
            <br />
            <HandUnderline color="bg-amber-300">
              <span>Stop wondering</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Smart time tracking. Launch a timer on the fly, and ensure that
            timesheets are always linked to the correct project, task, or sales
            order. No more missing data.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="mb-4 rounded-lg bg-white px-5 py-3 text-left shadow-sm ring-1 ring-slate-100">
              <span className="rounded bg-[#714b67] px-3 py-1 text-xs font-bold text-white">
                Day
              </span>
              <span className="ml-4 text-xs font-bold text-slate-500">
                Week
              </span>
              <span className="ml-4 text-xs font-bold text-slate-500">
                Month
              </span>
              <span className="ml-6 text-xs text-slate-400">
                SO001 / Project Check Code
              </span>
            </div>

            <p
              className="absolute -left-4 top-14 hidden rotate-[-8deg] text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Timer ↗
            </p>

            <p
              className="absolute left-44 top-12 hidden rotate-[4deg] text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Projects and tasks ↘
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid grid-cols-[1fr_1fr_90px] border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-400">
                <span>Day</span>
                <span className="text-center">Task Time</span>
                <span className="text-center">Hours</span>
              </div>

              {[
                ["Total Task - Web app validation", "2:20", "2:30"],
                ["Internal Meeting", "3:15", "3:15"],
                ["Support / Sales Demo", "0:45", "0:45"],
                ["SEO Changes", "4:20", "4:20"],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[1fr_1fr_90px] border-b border-slate-100 px-4 py-4 text-left text-xs last:border-0"
                >
                  <span className="font-bold text-slate-800">{row[0]}</span>
                  <span className="bg-[#b9eef0]/70 py-2 text-center font-bold text-slate-800">
                    {row[1]}
                  </span>
                  <span className="text-center text-slate-500">{row[2]}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-7 max-w-xl rounded-lg bg-white px-5 py-3 shadow-sm ring-1 ring-slate-100">
              <div className="h-6 rounded bg-[#714b67]/40">
                <div className="h-6 w-3/4 rounded bg-[#714b67]/60 text-center text-xs font-bold leading-6 text-white">
                  05:15
                </div>
              </div>
            </div>

            <div
              className="mt-3 flex justify-center gap-24 text-lg font-bold text-[#714b67]"
              style={{ fontFamily: handwrittenFont }}
            >
              <span>Sales orders and invoices</span>
              <span>Total hours worked</span>
            </div>

            <p
              className="mt-4 text-lg font-bold text-[#714b67]"
              style={{ fontFamily: handwrittenFont }}
            >
              Overtime ↗
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24">
        <div className="absolute left-1/2 top-1/2 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Make every minute count
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Keep it profitable. Get an overview of your billable time by team
              member, project, task, and billing type.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-4 flex justify-end">
              <div className="w-48 rounded bg-slate-100 px-4 py-2 text-xs text-slate-400">
                Time
              </div>
            </div>

            <div className="flex h-64 items-end gap-3">
              {[
                65, 92, 88, 70, 110, 220, 85, 76, 95, 130, 230, 92, 97, 105, 82,
                75, 68, 110, 80,
              ].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-sky-600/80"
                    style={{ height: `${height}px` }}
                  />
                  <span className="mt-2 h-2 w-2 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">right.</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                  <Clock3 className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">Views</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Switch between 5 different views as per your needs.
              </p>

              <div className="mt-8 overflow-hidden rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-3 flex gap-2">
                  <span className="rounded bg-[#714b67] px-3 py-1 text-xs font-bold text-white">
                    Day
                  </span>
                  <span className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-500">
                    Week
                  </span>
                  <span className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-500">
                    Month
                  </span>
                </div>

                {[
                  ["Audrey Peterson", "Research", "2:30"],
                  ["Mitchell Admin", "Website", "4:00"],
                  ["Joel Willis", "Support", "1:15"],
                  ["Jennie Fletcher", "Planning", "3:30"],
                ].map((row, index) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1fr_1fr_60px] border-b border-white px-3 py-3 text-xs last:border-0"
                  >
                    <span className="font-bold text-slate-800">{row[0]}</span>
                    <span className="text-slate-500">{row[1]}</span>
                    <span className="font-bold text-slate-800">{row[2]}</span>
                  </div>
                ))}
              </div>
            </div>

            {features.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
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

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{app.title}</h3>
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

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[360px]">
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

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  Our day-to-day tasks have become simpler, and we have been
                  able to complete them in less time. Thanks to Adon automation
                  and integration features, our work efficiency has grown
                  significantly.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[5]}
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Martins Carvalho</p>
                    <p className="text-sm text-slate-500">
                      Operations and reporting director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
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
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FloatingNote({
  className = "",
  text = "Project note",
  color = "bg-[#02cfc3]",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white py-3 pl-16 pr-8 text-sm italic text-slate-700 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt=""
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />

      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900" />

      {text}
    </div>
  );
}

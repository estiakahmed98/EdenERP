"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Factory,
  LineChart,
  MonitorSmartphone,
  PackageCheck,
  Play,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const apps = [
  {
    title: "Manufacturing",
    description: "Track workcenter control and quality",
    icon: Factory,
  },
  {
    title: "Quality",
    description: "Define quality control points",
    icon: ShieldCheck,
  },
  {
    title: "PLM",
    description: "Manage engineering changes",
    icon: PackageCheck,
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

export default function MaintenanceLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Plan Maintenance.{" "}
            <HandUnderline color="bg-rose-300">
              <span className="text-rose-500">Not Emergencies.</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Manage preventive and corrective maintenance in one place, so issues
            are handled early and emergencies stay off the schedule.
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
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:text-[#9b6a8f]"
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

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    Maintenance
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Dashboard / Requests / Equipment / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-4">
                {[
                  {
                    title: "New Request",
                    cards: [
                      "Screen not working",
                      "Printer",
                      "Some keys are not working",
                    ],
                  },
                  {
                    title: "In Progress",
                    cards: [
                      "Touchpad not working",
                      "Battery drains fast",
                      "Motherboard failed",
                    ],
                  },
                  {
                    title: "Repaired",
                    cards: [
                      "Keyboard not working",
                      "Resolution is bad",
                      "Fan noise issue",
                    ],
                  },
                  {
                    title: "Scrap",
                    cards: ["Old laptop", "Broken monitor", "Damaged printer"],
                  },
                ].map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                        {column.title}
                      </p>
                      <span className="text-lg font-bold text-slate-400">
                        +
                      </span>
                    </div>

                    <div className="space-y-3">
                      {column.cards.map((card, cardIndex) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 text-left shadow-sm ring-1 ring-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                            {card}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Request #{columnIndex + 1}
                            {cardIndex + 1} / Equipment
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1 text-amber-400">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-3.5 w-3.5 fill-current"
                                />
                              ))}
                            </div>

                            <img
                              src={
                                avatars[
                                  (columnIndex + cardIndex) % avatars.length
                                ]
                              }
                              alt="Assignee"
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-950 dark:bg-slate-900 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-center text-xs font-bold text-slate-400">
                {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`min-h-16 rounded-md p-1 text-left text-[10px] ${
                      [3, 10, 16, 18, 25, 29].includes(index)
                        ? "bg-emerald-100 text-emerald-700"
                        : [7, 14, 23].includes(index)
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-50 dark:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <span>{index + 1}</span>
                    {[3, 10, 16, 18, 25, 29].includes(index) && (
                      <p className="mt-1 font-bold">Preventive</p>
                    )}
                    {[7, 14, 23].includes(index) && (
                      <p className="mt-1 font-bold">Repair</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl">
              Automate preventive
              <br />
              maintenance
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
              to keep your line running.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Use computed statistics, scheduling rules, expected next failure
              dates, and IoT data to automate metrology and preventive
              maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl">
              Organize your
              <br />
              maintenance requests
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
              with great kanban and calendar views.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Easily track maintenance requests with kanban view. Use the
              maintenance calendar to organize activities and manage team
              workload in a clean drag-and-drop interface.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 md:grid-cols-3">
              {["New Request", "In Progress", "Repaired"].map(
                (column, columnIndex) => (
                  <div
                    key={column}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4"
                  >
                    <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      {column}
                    </p>

                    <div className="space-y-3">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 text-left shadow-sm"
                        >
                          <div className="h-3 w-3/4 rounded bg-slate-200" />
                          <div className="mt-2 h-2 w-full rounded bg-slate-100" />
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1 text-amber-400">
                              {Array.from({ length: 3 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className="h-3 w-3 fill-current"
                                />
                              ))}
                            </div>
                            <img
                              src={
                                avatars[(columnIndex + index) % avatars.length]
                              }
                              alt="User"
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex justify-center">
            <div className="relative rounded-[2.3rem] bg-slate-900 p-4 shadow-2xl">
              <div className="h-[520px] w-[250px] rounded-[1.7rem] bg-white dark:bg-slate-950 dark:bg-slate-900 p-4">
                <div className="mx-auto mb-5 h-2 w-20 rounded-full bg-slate-200" />

                <div className="rounded-lg bg-[#714b67] px-4 py-3 text-white">
                  <p className="text-sm font-bold">Equipment</p>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Compressor",
                    "Conveyor Belt",
                    "Laser Printer",
                    "Tablet Scanner",
                    "AC System",
                    "CNC Machine",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 dark:text-white dark:text-slate-100">
                          {item}
                        </p>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            index % 3 === 0
                              ? "bg-rose-400"
                              : index % 2 === 0
                                ? "bg-amber-400"
                                : "bg-emerald-400"
                          }`}
                        />
                      </div>
                      <div className="mt-2 h-2 w-3/4 rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl">
              Increase overall equipment
              <br />
              effectiveness.
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
              with efficient maintenance.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Manufacturing teams can trigger maintenance requests directly from
              work centers. When the team acts, the right people are updated in
              real time.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Better communication reduces downtime and makes your manufacturing
              operation more efficient.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl">
              Dashboard & Statistics
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
              to optimize your performance.
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Use automatically computed statistics including MTBF and MTBR to
              fine tune preventive maintenance rules and reduce risk of
              equipment failure.
            </p>
          </div>

          <div className="mt-16 flex h-[430px] items-end justify-center gap-6">
            {[
              {
                name: "Camille Watkins",
                orange: 90,
                blue: 65,
                light: 80,
              },
              {
                name: "Frances Pierce",
                orange: 0,
                blue: 92,
                light: 40,
              },
              {
                name: "Toni Buchanan",
                orange: 105,
                blue: 90,
                light: 85,
              },
              {
                name: "Judy Garza",
                orange: 140,
                blue: 190,
                light: 105,
              },
              {
                name: "Andrew Hill",
                orange: 0,
                blue: 90,
                light: 170,
              },
            ].map((bar) => (
              <div
                key={bar.name}
                className="relative flex w-36 flex-col items-center"
              >
                <div className="absolute -top-12 z-10 rounded-md bg-white dark:bg-slate-950 dark:bg-slate-900 px-4 py-2 text-xs shadow-lg ring-1 ring-slate-100">
                  <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                    {bar.name}
                  </p>
                  <p className="mt-1 text-slate-400">New request</p>
                </div>

                {bar.orange > 0 && (
                  <div
                    className="w-full bg-orange-300"
                    style={{ height: `${bar.orange}px` }}
                  />
                )}
                <div
                  className="w-full bg-sky-200"
                  style={{ height: `${bar.light}px` }}
                />
                <div
                  className="w-full bg-sky-600/70"
                  style={{ height: `${bar.blue}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
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
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:bg-slate-950 dark:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 dark:bg-slate-900 py-20">
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

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-950/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white dark:text-slate-100"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
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

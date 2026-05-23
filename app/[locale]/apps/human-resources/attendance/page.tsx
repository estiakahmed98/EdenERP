"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileSignature,
  Fingerprint,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  Users,
  Wifi,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Smart check-in",
    description:
      "Let employees check in and out from kiosk, browser, mobile, or RFID-style flows.",
  },
  {
    title: "Attendance analysis",
    description:
      "Review working hours, late arrivals, overtime, missing check-outs, and attendance trends.",
  },
  {
    title: "Extra hours",
    description:
      "Automatically calculate extra hours and compare attendance with planned working time.",
  },
  {
    title: "Manager approval",
    description:
      "Let managers review exceptions, validate corrections, and approve attendance records.",
  },
  {
    title: "Connected HR",
    description:
      "Connect attendance with employees, time off, payroll, planning, and reporting.",
  },
];

const apps = [
  {
    title: "Employees",
    description: "Manage employee records",
    icon: Users,
  },
  {
    title: "Time Off",
    description: "Track absence",
    icon: CalendarCheck,
  },
  {
    title: "Payroll",
    description: "Calculate work time",
    icon: BriefcaseBusiness,
  },
  {
    title: "Sign",
    description: "Approve documents",
    icon: FileSignature,
  },
  {
    title: "Planning",
    description: "Schedule shifts",
    icon: Clock3,
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

const attendanceRows = [
  ["Marc Demo", "08:57", "17:35", "8h 38m", "On time"],
  ["Anita Oliver", "09:18", "18:02", "8h 44m", "Late"],
  ["Beth Evans", "08:45", "17:20", "8h 35m", "On time"],
  ["Audrey Peterson", "09:02", "17:55", "8h 53m", "On time"],
  ["Joel Willis", "08:50", "18:30", "9h 40m", "Extra"],
  ["Jennie Fletcher", "—", "—", "0h", "Missing"],
];

export default function AttendanceLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Attendance{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">made effortless</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Track check-ins, check-outs, working hours, late arrivals, and
            overtime in one simple HR attendance system.
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
                  <Clock3 className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Attendance
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Overview / Check In / Management / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  Check In
                </button>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Present", "38", "bg-emerald-50 text-emerald-600"],
                    ["Late", "06", "bg-amber-50 text-amber-600"],
                    ["Missing", "03", "bg-rose-50 text-rose-600"],
                    ["Extra Hours", "21h", "bg-sky-50 text-sky-600"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className={`rounded-lg p-4 text-left ${color}`}
                    >
                      <p className="text-xs font-bold">{label}</p>
                      <p className="mt-2 text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Employee</span>
                    <span>Check In</span>
                    <span>Check Out</span>
                    <span>Worked</span>
                    <span>Location</span>
                    <span>Status</span>
                  </div>

                  {attendanceRows.map((row, index) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                        <img
                          src={avatars[index]}
                          alt={row[0]}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {row[0]}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {row[1]}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {row[2]}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {row[3]}
                      </span>
                      <span className="text-slate-500">Office</span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row[4] === "On time"
                            ? "bg-emerald-50 text-emerald-600"
                            : row[4] === "Late"
                              ? "bg-amber-50 text-amber-600"
                              : row[4] === "Extra"
                                ? "bg-sky-50 text-sky-600"
                                : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {row[4]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-[#02cfc3]"
              text="Check in, work smart, go home happy"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Clock in with{" "}
              <HandUnderline color="bg-sky-300">
                <span>one tap</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Employees can check in from a kiosk, browser, or mobile device.
              Keep attendance fast, clear, and easy for the whole team.
            </p>

            <DashedArrow className="mt-10 h-28 w-28 rotate-[-18deg] text-slate-300" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white dark:bg-slate-900" />

            <div className="relative mx-auto max-w-sm rounded-4xl bg-slate-900 p-4 shadow-2xl">
              <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 text-center">
                <div className="mx-auto mb-6 h-2 w-20 rounded-full bg-slate-200" />

                <img
                  src={avatars[1]}
                  alt="Employee"
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Anita Oliver
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Frontend Developer
                </p>

                <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#714b67] text-white shadow-lg shadow-[#714b67]/30">
                  <Fingerprint className="h-12 w-12" />
                </div>

                <button className="mt-8 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
                  Check In
                </button>

                <p className="mt-4 text-xs text-slate-400">
                  Today · 08:57 AM · Office
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Clock3 className="mx-auto h-12 w-12 text-amber-500" />

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Never lose track of{" "}
            <HandUnderline color="bg-amber-300">
              <span>working hours</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Monitor work time, breaks, check-in history, and exceptions without
            chasing spreadsheets or manual reports.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7]" />

            <div className="relative grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Worked Today",
                  value: "8h 42m",
                  icon: Clock3,
                  color: "bg-sky-100 text-sky-600",
                },
                {
                  title: "Extra Hours",
                  value: "1h 12m",
                  icon: TimerReset,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Approved",
                  value: "96%",
                  icon: CheckCircle2,
                  color: "bg-emerald-100 text-emerald-600",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                  >
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <p className="mt-5 text-sm font-bold text-slate-500">
                      {item.title}
                    </p>

                    <p
                      className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-100"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-900 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Know who is{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span>present</span>
              </HandUnderline>
              <br />
              right now
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              See live attendance status across departments. Quickly understand
              who is checked in, working remotely, late, or missing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Office", "Remote", "Late", "Missing", "Extra Hours"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-50 dark:bg-slate-800/40 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 ring-1 ring-slate-100"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Audrey Peterson", "Checked in", "Office", avatars[0]],
                ["Mitchell Admin", "Remote", "Home", avatars[1]],
                ["Joel Willis", "Late", "Office", avatars[2]],
                ["Jennie Fletcher", "Missing", "—", avatars[3]],
              ].map(([name, status, location, avatar]) => (
                <div
                  key={name}
                  className="flex gap-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <img
                    src={avatar}
                    alt={name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      {name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{location}</p>

                    <span
                      className={`mt-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold ${
                        status === "Checked in"
                          ? "bg-emerald-50 text-emerald-600"
                          : status === "Remote"
                            ? "bg-sky-50 text-sky-600"
                            : status === "Late"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
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
              <p className="font-bold text-slate-900 dark:text-slate-100">
                Attendance Correction
              </p>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                To Review
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Employee", "Marc Demo"],
                ["Missing Check Out", "Yesterday"],
                ["Suggested Time", "17:45"],
                ["Reason", "Forgot to check out"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4"
                >
                  <p className="text-xs font-bold text-slate-400">{label}</p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                Approve
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                Refuse
              </button>
            </div>
          </div>

          <div>
            <ShieldCheck className="mb-6 h-12 w-12 text-[#02a6a6]" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Review exceptions,
              <br />
              <HandUnderline color="bg-rose-300">
                <span>approve</span>
              </HandUnderline>{" "}
              corrections
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Managers can review missing check-outs, late arrivals, unusual
              hours, and correction requests before they impact payroll or
              reports.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <BarChart3 className="mx-auto h-12 w-12 text-sky-500" />

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Reporting that{" "}
            <HandUnderline color="bg-sky-300">
              <span>makes sense</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Analyze attendance by employee, department, week, month, work
            location, and approval status.
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-slate-100">
                Attendance Analysis
              </p>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                Monthly
              </span>
            </div>

            <div className="flex h-72 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
              {[45, 80, 120, 95, 150].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-emerald-300"
                    style={{ height: `${height * 0.35}px` }}
                  />
                  <div
                    className="w-full bg-sky-200"
                    style={{ height: `${height * 0.55}px` }}
                  />
                  <div
                    className="w-full bg-orange-400"
                    style={{ height: `${height}px` }}
                  />
                  <p className="mt-3 text-xs font-bold text-slate-400">
                    Week {index + 1}
                  </p>
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
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>right.</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200">
                  Attendance used to be scattered across spreadsheets. Now we
                  know who is present, who needs approval, and how many hours
                  our team worked in real time.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      Laura Johnson
                    </p>
                    <p className="text-sm text-slate-500">HR director</p>
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

function FloatingNote({
  className = "",
  text = "Check in, work smart, go home happy",
  color = "bg-[#02cfc3]",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-900 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />

      {text}
    </div>
  );
}

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

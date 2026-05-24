"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSignature,
  HeartHandshake,
  Plane,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Accrual plans",
    description:
      "Create leave plans, rules, and yearly allocations based on contracts, seniority, and company policy.",
  },
  {
    title: "Time off analysis",
    description:
      "Analyze absences, balances, approvals, and team availability with clear reports.",
  },
  {
    title: "Stress days",
    description:
      "Configure company holidays, weekends, and unavailable days for better planning.",
  },
  {
    title: "Multi-step approvals",
    description:
      "Route requests through managers, HR teams, or custom approval flows.",
  },
];

const apps = [
  {
    title: "Sign",
    description: "Approve documents",
    icon: FileSignature,
  },
  {
    title: "Manufacturing",
    description: "Plan workforce",
    icon: BriefcaseBusiness,
  },
  {
    title: "Invoicing",
    description: "Track paid time",
    icon: WalletCards,
  },
  {
    title: "eCommerce",
    description: "Manage your team",
    icon: ShieldCheck,
  },
  {
    title: "Maintenance",
    description: "Plan availability",
    icon: CalendarCheck,
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

const requests = [
  {
    name: "Marc Demo",
    type: "Paid Time Off",
    days: "5 days",
    status: "Approved",
    image: avatars[0],
  },
  {
    name: "Anita Oliver",
    type: "Sick Leave",
    days: "2 days",
    status: "To Approve",
    image: avatars[1],
  },
  {
    name: "Beth Evans",
    type: "Remote Work",
    days: "1 day",
    status: "Approved",
    image: avatars[2],
  },
  {
    name: "Audrey Peterson",
    type: "Vacation",
    days: "8 days",
    status: "Pending",
    image: avatars[3],
  },
];

export default function TimeOffLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Time off{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="text-rose-500 dark:text-rose-400">
                without the hassle
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Manage leave requests, approvals, allocations, holidays, and team
            availability in one simple HR workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/10"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:text-[#714b67]"
            >
              Meet an advisor
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Time Off
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    My Time Off / Management / Reporting / Configuration
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="bg-[#f7f8fb] dark:bg-slate-800/50 p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-[#714b67] p-4 text-left text-white">
                    <p className="text-xs font-bold opacity-80">Requests</p>
                    <p className="mt-2 text-2xl font-bold">42</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-left text-emerald-600 dark:text-emerald-400">
                    <p className="text-xs font-bold opacity-80">Approved</p>
                    <p className="mt-2 text-2xl font-bold">31</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-4 text-left text-amber-600 dark:text-amber-400">
                    <p className="text-xs font-bold opacity-80">Pending</p>
                    <p className="mt-2 text-2xl font-bold">08</p>
                  </div>
                  <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-4 text-left text-rose-600 dark:text-rose-400">
                    <p className="text-xs font-bold opacity-80">Refused</p>
                    <p className="mt-2 text-2xl font-bold">03</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                    <span>Employee</span>
                    <span>Type</span>
                    <span>Start</span>
                    <span>End</span>
                    <span>Duration</span>
                    <span>Approver</span>
                    <span>Status</span>
                  </div>

                  {[
                    [
                      "Marc Demo",
                      "Paid Time Off",
                      "Jul 04",
                      "Jul 09",
                      "5 days",
                      "Mitchell",
                      "Approved",
                    ],
                    [
                      "Anita Oliver",
                      "Sick Leave",
                      "Jul 11",
                      "Jul 12",
                      "2 days",
                      "Audrey",
                      "To Approve",
                    ],
                    [
                      "Beth Evans",
                      "Remote Work",
                      "Jul 15",
                      "Jul 15",
                      "1 day",
                      "Marc",
                      "Approved",
                    ],
                    [
                      "Audrey Peterson",
                      "Vacation",
                      "Jul 20",
                      "Jul 28",
                      "8 days",
                      "Mitchell",
                      "Pending",
                    ],
                    [
                      "Joel Willis",
                      "Paid Time Off",
                      "Aug 01",
                      "Aug 03",
                      "3 days",
                      "Audrey",
                      "Approved",
                    ],
                    [
                      "Jennie Fletcher",
                      "Sick Leave",
                      "Aug 05",
                      "Aug 06",
                      "2 days",
                      "Marc",
                      "Refused",
                    ],
                  ].map((row) => (
                    <div
                      key={`${row[0]}-${row[2]}`}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {row[0]}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {row[1]}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row[2]}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row[3]}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {row[4]}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row[5]}
                      </span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row[6] === "Approved"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                            : row[6] === "To Approve" || row[6] === "Pending"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                              : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {row[6]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-slate-800/30 [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Features Section 2 */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Always be ready
            <br />
            for every{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">request</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Customize leave types and absence forms so every request collects
            the right information from the start.
          </p>

          <div className="relative mx-auto mt-14 grid max-w-4xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <p className="mb-5 text-left font-bold text-slate-900 dark:text-slate-100">
                Time Off Types
              </p>

              {[
                "Paid Time Off",
                "Sick Leave",
                "Remote Work",
                "Unpaid Leave",
                "Training",
                "Compensatory Days",
              ].map((item, index) => (
                <div
                  key={item}
                  className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-left text-sm"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      index % 3 === 0
                        ? "bg-[#714b67]"
                        : index % 2 === 0
                          ? "bg-sky-400 dark:bg-sky-500"
                          : "bg-amber-400 dark:bg-amber-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Training Time Off
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Requires allocation", "Yes"],
                  ["Approval", "Manager + HR"],
                  ["Responsible", "Marc Demo"],
                  ["Validity", "Current year"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {["Vacation", "Sick", "Remote", "Training", "Custom"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#714b67]/10 dark:bg-[#714b67]/20 px-3 py-1 text-xs font-bold text-[#714b67]"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <ArrowRight className="absolute left-[39%] top-1/2 hidden h-8 w-8 -translate-y-1/2 text-[#714b67]/60 dark:text-[#714b67]/40 lg:block" />
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="relative bg-[#f3f4f7] dark:bg-slate-800/30 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <p
              className="mb-5 text-center text-lg font-bold text-rose-400 dark:text-rose-500"
              style={{ fontFamily: handwrittenFont }}
            >
              See the breakdown of your available days
            </p>

            <div className="grid grid-cols-6 gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {Array.from({ length: 36 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-14 rounded-md p-1 text-left text-[10px] ${
                    [3, 9, 16, 22, 30].includes(index)
                      ? "bg-[#714b67] text-white"
                      : [5, 14, 25].includes(index)
                        ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400"
                        : "bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span>{index + 1}</span>
                  {[3, 9, 16, 22, 30].includes(index) && (
                    <p className="mt-1 font-bold">PTO</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Clock3 className="mb-6 h-12 w-12 text-rose-400 dark:text-rose-500" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Do you have
              <br />
              the{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="text-amber-600 dark:text-amber-400">
                  time?
                </span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Know exactly how many days are available, planned, taken, and
              pending before an employee submits a request.
            </p>
          </div>
        </div>
      </section>

      {/* Freedom Section */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-slate-800/20 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="text-sky-600 dark:text-sky-400">Freedom</span>
              </HandUnderline>{" "}
              is only a<br />
              few clicks away
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Employees can submit a leave request in seconds. Managers get the
              context they need to approve or refuse without confusion.
            </p>
          </div>

          <div>
            <p
              className="mb-4 text-right text-lg font-bold text-sky-500 dark:text-sky-400"
              style={{ fontFamily: handwrittenFont }}
            >
              Track your time on request move
            </p>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={avatars[3]}
                  alt="Employee"
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Anita Oliver
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Paid Time Off Request
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Time Off Type", "Paid Time Off"],
                  ["Duration", "5 days"],
                  ["From", "July 15"],
                  ["To", "July 20"],
                  ["Approver", "Marc Demo"],
                  ["Status", "To Approve"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
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
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#02a6a6] dark:text-[#02a6a6]" />

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Review,{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6]">approve</span>
            </HandUnderline>
            , done
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Managers can review all requests from one dashboard, approve
            quickly, and keep the team calendar accurate.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="grid gap-4 md:grid-cols-3">
                {["Absent", "Present", "To Approve"].map(
                  (column, columnIndex) => (
                    <div
                      key={column}
                      className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4"
                    >
                      <p className="mb-5 text-left font-bold text-slate-900 dark:text-slate-100">
                        {column}
                      </p>

                      <div className="space-y-4">
                        {requests.slice(0, 3).map((request, index) => (
                          <div
                            key={`${column}-${request.name}`}
                            className="flex gap-3 rounded-lg bg-white dark:bg-slate-900 p-3 text-left shadow-sm"
                          >
                            <img
                              src={request.image}
                              alt={request.name}
                              className="h-14 w-14 rounded-xl object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                                {request.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {request.type}
                              </p>

                              <span
                                className={`mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${
                                  (index + columnIndex) % 2 === 0
                                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                                    : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                                }`}
                              >
                                {request.days}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400 dark:bg-amber-600"
              text="Approved in one click"
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-slate-800/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/50" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6]">right.</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#714b67]/20 text-[#714b67]">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                Accrual plans
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Customize accrual levels, allocation rules, and yearly leave
                calculations for your team.
              </p>

              <div className="mt-8 space-y-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 p-5">
                {[
                  ["Monthly accrual", "1.5 days"],
                  ["Yearly allocation", "18 days"],
                  ["Carryover", "5 days"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-white dark:bg-slate-900 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {features.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#714b67]/20 text-[#714b67]">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] hover:text-[#5f3d56] dark:hover:text-[#8b5e7e]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">app.</span>
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
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] hover:text-[#5f3d56] dark:hover:text-[#8b5e7e]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[400px] sm:min-h-[500px]">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-[#714b67] opacity-70 dark:opacity-50"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/95 dark:bg-slate-900/95 p-6 sm:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-2xl sm:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-6 sm:p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                "
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  After realizing that our configured spreadsheets were not
                  looking for an HR application, we found exactly what we needed
                  with Adon Time Off.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[5]}
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      Laura Johnson
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      HR director
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
              className="text-3xl sm:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
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

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FloatingNote({
  className = "",
  text = "Approved in one click",
  color = "bg-amber-400",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color} dark:opacity-70`}
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

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileSignature,
  FileText,
  HandCoins,
  Play,
  ReceiptText,
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
    title: "Salary rules",
    description:
      "Create flexible salary structures, allowances, deductions, benefits, and country-specific payroll rules.",
  },
  {
    title: "Payslip batches",
    description:
      "Generate payslips for teams, departments, or the whole company in a clean batch workflow.",
  },
  {
    title: "Work entries",
    description:
      "Connect attendance, time off, planning, and contracts to calculate accurate payroll inputs.",
  },
  {
    title: "Accounting integration",
    description:
      "Post salary expenses, liabilities, and journal entries directly to your accounting system.",
  },
  {
    title: "Employee portal",
    description:
      "Let employees access payslips, contracts, benefits, and payroll documents securely.",
  },
];

const apps = [
  {
    title: "Employees",
    description: "Manage employee contracts",
    icon: Users,
  },
  {
    title: "Attendance",
    description: "Track worked hours",
    icon: Clock3,
  },
  {
    title: "Time Off",
    description: "Calculate absences",
    icon: CalendarCheck,
  },
  {
    title: "Accounting",
    description: "Post payroll entries",
    icon: ReceiptText,
  },
  {
    title: "Sign",
    description: "Approve documents",
    icon: FileSignature,
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

const payrollRows = [
  ["Marc Demo", "Basic Salary", "$4,200", "$620", "$3,580", "Done"],
  ["Anita Oliver", "Monthly Wage", "$5,100", "$740", "$4,360", "Done"],
  ["Beth Evans", "Hourly Wage", "$3,880", "$410", "$3,470", "Draft"],
  ["Audrey Peterson", "Monthly Wage", "$6,400", "$920", "$5,480", "Ready"],
  ["Joel Willis", "Contract", "$4,950", "$680", "$4,270", "Done"],
  ["Jennie Fletcher", "Monthly Wage", "$5,750", "$810", "$4,940", "Ready"],
];

export default function PayrollLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Payroll{" "}
            <HandUnderline color="bg-amber-300">
              <span className="text-amber-500">without the headache</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Automate payslips, contracts, work entries, deductions, benefits,
            and salary payments from one accurate payroll system.
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
                  <WalletCards className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Payroll
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Payslips / Contracts / Work Entries / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New Batch
                </button>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Payslips", "42", "bg-[#714b67] text-white"],
                    ["Ready", "18", "bg-emerald-50 text-emerald-600"],
                    ["Draft", "09", "bg-amber-50 text-amber-600"],
                    ["Net Pay", "$82k", "bg-sky-50 text-sky-600"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className={`rounded-lg p-4 text-left ${color}`}
                    >
                      <p className="text-xs font-bold opacity-80">{label}</p>
                      <p className="mt-2 text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-6 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Employee</span>
                    <span>Structure</span>
                    <span>Gross</span>
                    <span>Deductions</span>
                    <span>Net Pay</span>
                    <span>Status</span>
                  </div>

                  {payrollRows.map((row, index) => (
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
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {row[2]}
                      </span>
                      <span className="text-slate-500">{row[3]}</span>
                      <span className="font-bold text-emerald-600">
                        {row[4]}
                      </span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row[5] === "Done"
                            ? "bg-emerald-50 text-emerald-600"
                            : row[5] === "Ready"
                              ? "bg-sky-50 text-sky-600"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {row[5]}
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
              color="bg-amber-400"
              text="Payroll done right, every month"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-24 w-24 rotate-[-18deg] text-slate-300" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Generate payslips
              <br />
              in{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span>one click</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Create payslips from employee contracts, work entries, attendance,
              time off, and salary rules without manual calculation.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-white dark:bg-slate-900" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Payslip Batch
                </p>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                  July Payroll
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Employees", "42"],
                  ["Gross Pay", "$102k"],
                  ["Net Pay", "$82k"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4"
                  >
                    <p className="text-xs font-bold text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Compute work entries",
                  "Apply salary rules",
                  "Generate payslips",
                  "Post accounting entries",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3"
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {item}
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
                Generate Payslips
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Calculator className="mx-auto h-12 w-12 text-[#02a6a6]" />

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Flexible{" "}
            <HandUnderline color="bg-sky-300">
              <span>salary rules</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Build payroll structures with basic wage, allowances, deductions,
            tax rules, reimbursements, benefits, and employer contributions.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7]" />

            <div className="relative grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Basic Salary",
                  amount: "$4,200",
                  icon: Banknote,
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  title: "Allowances",
                  amount: "$650",
                  icon: HandCoins,
                  color: "bg-sky-100 text-sky-600",
                },
                {
                  title: "Deductions",
                  amount: "-$420",
                  icon: ReceiptText,
                  color: "bg-rose-100 text-rose-600",
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
                      {item.amount}
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
              Work entries
              <br />
              that{" "}
              <HandUnderline color="bg-amber-300">
                <span>make sense</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Connect contracts, attendance, planning, and time off to create
              accurate payroll inputs before payslips are calculated.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Regular Work",
                  "160h",
                  "Validated",
                  "bg-emerald-50 text-emerald-600",
                ],
                ["Paid Time Off", "16h", "Approved", "bg-sky-50 text-sky-600"],
                ["Sick Leave", "8h", "To Review", "bg-amber-50 text-amber-600"],
                ["Unpaid Leave", "4h", "Deducted", "bg-rose-50 text-rose-600"],
              ].map(([name, hours, status, color]) => (
                <div
                  key={name}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      {name}
                    </p>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {hours}
                    </span>
                  </div>

                  <span
                    className={`mt-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold ${color}`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-[#714b67] p-5 text-left text-white">
              <p className="text-sm font-bold">Payroll Input Summary</p>
              <p className="mt-2 text-3xl font-bold">172h calculated</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-slate-100">
                Employee Payslip
              </p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                Ready
              </span>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <img
                src={avatars[3]}
                alt="Audrey Peterson"
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Audrey Peterson
                </p>
                <p className="text-sm text-slate-500">July 2026 Payslip</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                ["Basic Salary", "$5,200"],
                ["Transport Allowance", "$300"],
                ["Meal Allowance", "$180"],
                ["Tax Deduction", "-$620"],
                ["Insurance", "-$210"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {label}
                  </span>
                  <span
                    className={`font-bold ${
                      value.startsWith("-")
                        ? "text-rose-500"
                        : "text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-emerald-50 px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-700">Net Salary</span>
                <span className="text-2xl font-bold text-emerald-700">
                  $4,850
                </span>
              </div>
            </div>
          </div>

          <div>
            <FileCheck2 className="mb-6 h-12 w-12 text-[#02a6a6]" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Clear payslips,
              <br />
              happy{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span>employees</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Give employees transparent payslips with earnings, deductions,
              benefits, worked time, and net salary clearly explained.
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
            Payroll reporting
            <br />
            <HandUnderline color="bg-sky-300">
              <span>without confusion</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Understand salary cost, taxes, departments, deductions, and payroll
            trends with clean visual reporting.
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-slate-100">
                Payroll Analysis
              </p>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                Monthly
              </span>
            </div>

            <div className="flex h-72 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
              {[55, 90, 125, 105, 155].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-emerald-300"
                    style={{ height: `${height * 0.3}px` }}
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
                    Month {index + 1}
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
                  Payroll used to take days of spreadsheet checks. Now payslips,
                  deductions, work entries, and salary reports are generated in
                  one place.
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
              Pay your team
              <br />
              with{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">confidence</span>
              </HandUnderline>
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FloatingNote({
  className = "",
  text = "Payroll done right, every month",
  color = "bg-amber-400",
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

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  FolderKanban,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Timer,
  Users,
  Workflow,
  X,
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
    title: "Document management",
    description: "Dedicate workspace for each project.",
  },
  {
    title: "Templates",
    description: "Create repeatable workflows and project structures.",
  },
  {
    title: "Milestones",
    description: "Track major project goals that must be reached on time.",
  },
  {
    title: "Reporting",
    description: "Get project profitability, tasks, workload, and progress.",
  },
  {
    title: "Track costs and revenues",
    description: "Integrate timesheets, invoicing, purchases, and sales.",
  },
];

const apps = [
  {
    title: "Timesheet",
    description: "Record time on tasks",
    icon: Timer,
  },
  {
    title: "Sales",
    description: "Sell tasks and services",
    icon: BarChart3,
  },
  {
    title: "Field Service",
    description: "Manage onsite work",
    icon: BriefcaseBusiness,
  },
  {
    title: "Accounting",
    description: "Invoice projects",
    icon: ClipboardList,
  },
  {
    title: "Documents",
    description: "Centralize files",
    icon: FileText,
  },
];

export default function ProjectLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-sky-300">
              <span className="text-sky-500">Modern</span>
            </HandUnderline>{" "}
            teamwork
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            The AI-powered project management software to plan, track, and
            deliver faster.
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
                  <FolderKanban className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white dark:text-slate-100">Project</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Tasks / Gantt / Calendar / Reporting / Configuration
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-4">
                {[
                  {
                    title: "To Do",
                    cards: ["App Design", "Website Wireframe", "SEO Setup"],
                  },
                  {
                    title: "In Progress",
                    cards: ["User Story", "Dashboard UI", "Landing Page"],
                  },
                  {
                    title: "Development",
                    cards: ["API Integration", "Testing", "Bug Fixing"],
                  },
                  {
                    title: "Done",
                    cards: ["Client Brief", "Brand Assets", "Planning"],
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
                            {cardIndex + 2} tasks · {columnIndex + 1} days left
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white">
                              Project
                            </span>

                            <div className="flex -space-x-2">
                              <img
                                src={
                                  avatars[
                                    (columnIndex + cardIndex) % avatars.length
                                  ]
                                }
                                alt="Member"
                                className="h-6 w-6 rounded-full border-2 border-white object-cover"
                              />
                              <img
                                src={
                                  avatars[
                                    (columnIndex + cardIndex + 2) %
                                      avatars.length
                                  ]
                                }
                                alt="Member"
                                className="h-6 w-6 rounded-full border-2 border-white object-cover"
                              />
                            </div>
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

        <div className="absolute bottom-0 left-0 -z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 rotate-[90deg] text-slate-300" />

          <div className="mb-8 flex justify-center gap-6">
            {[
              { icon: CalendarDays, color: "text-amber-500" },
              { icon: ClipboardList, color: "text-sky-500" },
              { icon: Workflow, color: "text-[#02a6a6]" },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-slate-950 dark:bg-slate-900 shadow-sm"
                >
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>
              );
            })}
          </div>

          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Different{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>needs</span>
            </HandUnderline>
            , different{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>views</span>
            </HandUnderline>
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 text-left">
              {[
                "The powerful spreadsheet-like list view keeps every task organized.",
                "Plan tasks and milestones with a flexible timeline view.",
                "Calendar, kanban, and task stages keep every team aligned.",
              ].map((text, index) => (
                <div key={text} className="flex gap-4">
                  <Sparkles className="mt-1 h-5 w-5 flex-none text-[#02cfc3]" />
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      {index === 0
                        ? "Spreadsheet view."
                        : index === 1
                          ? "Planner schedule."
                          : "Flexible flow."}
                    </span>{" "}
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">Project Schedule</p>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                  Timeline
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-3 text-left">
                {["Design", "Development", "Review", "Launch"].map(
                  (row, rowIndex) => (
                    <div key={row} className="contents">
                      <p className="py-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                        {row}
                      </p>

                      <div className="grid grid-cols-5 gap-2 py-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-10 rounded-md ${
                              index >= rowIndex && index <= rowIndex + 1
                                ? "bg-[#714b67]/20"
                                : index === rowIndex + 2
                                  ? "bg-amber-100"
                                  : "bg-slate-50 dark:bg-slate-800/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Enjoy a comprehensive dashboard
          </h2>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <p
              className="absolute -left-10 top-20 hidden rotate-[-15deg] text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Status view
            </p>

            <p
              className="absolute -right-10 top-28 hidden rotate-[15deg] text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Tags
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-5 md:grid-cols-2">
                {["In Progress", "Final Checks"].map((column, columnIndex) => (
                  <div key={column} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
                    <p className="mb-4 text-left font-bold text-slate-900 dark:text-white dark:text-slate-100">
                      {column}
                    </p>

                    {[
                      "Kitchen drawings",
                      "Appliances choice",
                      "Design Definition",
                    ].map((task, index) => (
                      <div
                        key={`${column}-${task}`}
                        className="mb-3 rounded-lg bg-white dark:bg-slate-950 dark:bg-slate-900 p-4 text-left shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">{task}</p>
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          Task #{columnIndex + 1}
                          {index + 1}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                            Client
                          </span>
                          <span className="rounded-full bg-[#714b67]/10 px-2 py-1 text-[10px] font-bold text-[#714b67] dark:text-[#9b6a8f]">
                            Internal
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-5 text-center text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
              style={{ fontFamily: handwrittenFont }}
            >
              Kanban view &nbsp;&nbsp;&nbsp;&nbsp; All activities
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <Rocket className="mb-6 h-14 w-14 rotate-25 text-amber-500" />
            <DashedArrow className="absolute left-16 -top-20 h-32 w-32 rotate-20 text-slate-300" />

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Foster{" "}
              <span className="relative inline-block px-2">
                <span className="relative z-10">collaboration</span>
                <span className="absolute inset-x-0 bottom-2 h-7 rounded-lg bg-amber-300" />
              </span>{" "}
              to
              <br />
              boost efficiency
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Involve your customers.
              </span>{" "}
              Decide what parts of your project stakeholders can view and edit.
              Manage all your communication on one simple interface.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">Project Discussion</p>
            </div>

            <div className="space-y-4">
              {[
                ["Audrey Peterson", "Can you review the kitchen layout?"],
                ["Mitchell Admin", "Approved, looks good to me."],
                ["Joel Willis", "I added a new document for the client."],
              ].map(([name, message], index) => (
                <div
                  key={message}
                  className="flex gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <img
                    src={avatars[index]}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100">{name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <Timer className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Time is money
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Timesheets and analytics help you know exactly where the money is
            going and how your team is spending billable hours.
          </p>

          <div className="mx-auto mt-8 flex w-fit rounded-lg bg-slate-100 p-1">
            <button className="rounded-md bg-[#714b67] px-5 py-2 text-xs font-bold text-white">
              Stage 1
            </button>
            <button className="px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              Record
            </button>
            <button className="px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              00:42:00
            </button>
          </div>

          <DashedArrow className="mx-auto my-8 h-24 w-24 rotate-90 text-[#714b67] dark:text-[#9b6a8f]/50" />

          <div className="relative mx-auto max-w-4xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Check List</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Project Task Details</p>

            <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-slate-100">
              <div className="grid grid-cols-5 bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-xs font-bold uppercase text-slate-400">
                <span>Date</span>
                <span>Employee</span>
                <span>Description</span>
                <span>Hours</span>
                <span>Billable</span>
              </div>

              {[
                ["7/10/2025", "Lii Lambert", "Design review", "2.5h", "Yes"],
                ["7/11/2025", "Marc Demo", "Development", "4h", "Yes"],
                ["7/12/2025", "Audrey", "Client call", "1h", "No"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-5 border-b border-slate-100 dark:border-slate-700 px-4 py-4 text-xs last:border-0"
                >
                  {row.map((cell, index) => (
                    <span
                      key={cell}
                      className={
                        index === 1
                          ? "font-bold text-slate-900 dark:text-white dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400"
                      }
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <DashedArrow className="mx-auto mt-10 h-28 w-28 rotate-[90deg] text-slate-300" />
          <X className="mx-auto -mt-8 h-10 w-10 text-[#02cfc3]" />
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2
                className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl"
                style={{ fontFamily: handwrittenFont }}
              >
                Always know where your
                <br />
                project stands
              </h2>

              <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                Project updates are generated in real-time and give quick access
                to important statistics, invoices, costs, revenue, and progress.
              </p>
            </div>

            <FloatingNote
              className="justify-self-center lg:justify-self-end"
              color="bg-[#02cfc3] dark:bg-[#02cfc3]/30"
              text="Your client can follow along"
            />
          </div>

          <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7]" />

            {[
              ["Tasks", "48", "+12%"],
              ["Milestones", "7", "On track"],
              ["Costs", "$8,420", "-3%"],
            ].map(([title, value, trend], index) => (
              <div
                key={title}
                className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-500">
                  {index + 1}
                </span>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{title}</p>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-emerald-600">
                  {trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white dark:text-slate-100 sm:text-6xl"
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
            <div className="rounded-xl border border-white bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67] dark:text-[#9b6a8f]">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
                Project planning
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Plan tasks, deadlines, resources, and activities from one visual
                workspace.
              </p>

              <div className="mt-8 grid grid-cols-5 gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
                {Array.from({ length: 30 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-8 rounded ${
                      [2, 8, 12, 17, 21, 25].includes(index)
                        ? "bg-[#714b67]/30"
                        : [5, 15, 24].includes(index)
                          ? "bg-amber-200"
                          : "bg-white dark:bg-slate-950 dark:bg-slate-900"
                    }`}
                  />
                ))}
              </div>
            </div>

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white dark:bg-slate-950 dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 dark:bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
                    <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">{app.title}</h3>
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

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200">
                  Adon is the backbone of Kick & Rush, fostering collaboration,
                  providing consistency, and adapting to unique requirements.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[5]}
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white dark:text-slate-100">Tyrone Miller</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Project director</p>
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
  text = "Project note",
  color = "bg-[#02cfc3] dark:bg-[#02cfc3]/30",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-950 dark:bg-slate-900 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />

      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900 dark:text-white dark:text-slate-100" />

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



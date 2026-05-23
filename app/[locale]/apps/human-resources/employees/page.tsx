"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileSignature,
  FileText,
  FolderLock,
  GraduationCap,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  UserCheck,
  UserRound,
  WandSparkles,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const employees = [
  {
    name: "Audrey Peterson",
    role: "Consultant",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    status: "Online",
  },
  {
    name: "Alicia Nelson",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
    status: "Away",
  },
  {
    name: "Mitchell Admin",
    role: "HR Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    status: "Online",
  },
  {
    name: "Joel Willis",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    status: "Online",
  },
  {
    name: "Jennie Fletcher",
    role: "Recruitment Officer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    status: "Away",
  },
  {
    name: "Ronald Lewis",
    role: "Account Executive",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&crop=face",
    status: "Online",
  },
];

const features = [
  {
    title: "Performance appraisals",
    description:
      "Schedule appraisals and measure skills, feedback, goals, and development.",
  },
  {
    title: "Onboarding plans",
    description:
      "Assign activities for newly hired employees and track their progress.",
  },
  {
    title: "Org chart",
    description:
      "Set teams and view company hierarchy on every employee profile.",
  },
  {
    title: "Attendance monitoring",
    description:
      "Track attendance, check-ins, working hours, and time management.",
  },
  {
    title: "Recruitment management",
    description: "Create job openings and manage applications from one place.",
  },
];

const apps = [
  {
    title: "Recruitment",
    description: "Track applications",
    icon: Target,
  },
  {
    title: "Appraisals",
    description: "Evaluate performance",
    icon: Trophy,
  },
  {
    title: "Sign",
    description: "Approve documents",
    icon: FileSignature,
  },
  {
    title: "Expenses",
    description: "Manage reimbursements",
    icon: BriefcaseBusiness,
  },
  {
    title: "Time Off",
    description: "Approve leave requests",
    icon: CalendarClock,
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

export default function HumanResourcesLandingSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Human Resources{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Magic</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Streamline hiring, onboarding, attendance, performance, payroll, and
            employee self-service in one AI-powered people platform.
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
                  <Users className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">Employees</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Directory / Departments / Contracts / Planning
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] p-6 lg:grid-cols-[230px_1fr]">
                <aside className="rounded-xl bg-white dark:bg-slate-900 p-5 text-left shadow-sm ring-1 ring-slate-100">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Departments
                  </p>

                  <div className="mt-5 space-y-2">
                    {[
                      "All",
                      "Administration",
                      "Sales",
                      "Research & Development",
                      "Human Resources",
                      "Marketing",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? "bg-[#714b67] text-white"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 grid gap-4 lg:ml-5 lg:mt-0 sm:grid-cols-2">
                  {employees.map((employee) => (
                    <div
                      key={employee.name}
                      className="flex items-center gap-4 rounded-xl bg-white dark:bg-slate-900 p-4 text-left shadow-sm ring-1 ring-slate-100"
                    >
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-slate-900 dark:text-slate-100">
                          {employee.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {employee.role}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              employee.status === "Online"
                                ? "bg-emerald-500"
                                : "bg-amber-400"
                            }`}
                          />
                          <span className="text-xs font-bold text-slate-400">
                            {employee.status}
                          </span>
                        </div>
                      </div>

                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  ))}
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

      <section className="bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All of your people.
            <br />
            All in one place.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Get a detailed view of every department and employee. Sort by role,
            team, skill, manager, contract status, and attendance details.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  Employees
                </button>
                <div className="flex-1 rounded-md bg-slate-50 dark:bg-slate-800/40 px-4 py-2 text-left text-sm text-slate-400">
                  Search...
                </div>
                <span className="text-xs text-slate-400">1-12 / 42</span>
              </div>
            </div>

            <DashedArrow className="mx-auto my-10 h-24 w-24 rotate-90 text-slate-300" />

            <div className="mx-auto max-w-3xl rounded-xl bg-white dark:bg-slate-900 p-7 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] ring-1 ring-slate-100">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                    Filters
                  </p>
                  {[
                    "Department",
                    "Job Position",
                    "Manager",
                    "Tags",
                    "Contract Type",
                  ].map((item) => (
                    <div
                      key={item}
                      className="mb-3 rounded-md bg-slate-50 dark:bg-slate-800/40 px-3 py-2 text-xs font-semibold text-slate-500"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                    Group By
                  </p>
                  {["Manager", "Department", "Job Position", "Skills"].map(
                    (item) => (
                      <div
                        key={item}
                        className="mb-3 rounded-md bg-slate-50 dark:bg-slate-800/40 px-3 py-2 text-xs font-semibold text-slate-500"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <div>
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                    Favorites
                  </p>
                  {["Save current search", "My team", "New hires"].map(
                    (item) => (
                      <div
                        key={item}
                        className="mb-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-600"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Keep the{" "}
              <HandUnderline color="bg-rose-300">
                <span>private</span>
              </HandUnderline>
              <br />
              stuff private
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Restricted access settings protect employee contracts, wages,
              private information, emergency contacts, visa information, and
              sensitive HR records.
            </p>
          </div>

          <div className="relative">
            <LockKeyhole className="absolute -right-4 -top-10 h-14 w-14 text-rose-500" />

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={avatars[0]}
                  alt="Audrey Peterson"
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Audrey Peterson
                  </p>
                  <p className="text-sm text-rose-500">Confidential</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Private Address", "Restricted"],
                  ["Wage", "Manager only"],
                  ["Emergency Contact", "Private"],
                  ["Contract", "HR only"],
                  ["Visa", "Protected"],
                  ["Bank Account", "Hidden"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                    <p className="text-xs font-bold text-slate-400">{label}</p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600">
                <FolderLock className="h-5 w-5" />
                Only authorized users can view this profile.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {employees.slice(0, 4).map((employee, index) => (
                <div
                  key={employee.name}
                  className="flex gap-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{employee.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {employee.role}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Sales", "Design"]
                        .slice(0, index + 1)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-white dark:bg-slate-900 px-2 py-1 text-[10px] font-bold text-[#714b67]"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Show off
              <br />
              <HandUnderline color="bg-amber-300">
                <span>those skills</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Record every employee&apos;s skill set so the next time you need a
              French-speaking JavaScript expert, you know exactly who to call.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["React", "French", "JavaScript", "Design", "Sales"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-50 dark:bg-slate-800/40 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 ring-1 ring-slate-100"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <Clock3 className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Take control of{" "}
            <HandUnderline color="bg-sky-300">
              <span>time off</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Stay on top of PTO requests with integrated time off tracking. Use
            absence reports to monitor attendance and quickly approve vacation
            requests.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-10 rounded-full bg-[#f3f4f7]" />

            <div className="relative grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Absent",
                  people: employees.slice(0, 2),
                },
                {
                  title: "Present",
                  people: employees.slice(2, 4),
                },
                {
                  title: "To Define",
                  people: employees.slice(4, 6),
                },
              ].map((column) => (
                <div
                  key={column.title}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <p className="mb-5 text-left font-bold text-slate-900 dark:text-slate-100">
                    {column.title}
                  </p>

                  <div className="space-y-4">
                    {column.people.map((person, index) => (
                      <div
                        key={person.name}
                        className="flex gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3 text-left"
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {person.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {index === 0 ? "Paid Time Off" : "Sick Leave"}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                            Approved
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Never lose track of another document
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Upload every contract, request signature, then store them all in one
            secure location.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 rounded-xl bg-[#f3f4f7] p-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Share",
                icon: Target,
                color: "bg-rose-100 text-rose-600",
              },
              {
                title: "PDFs",
                icon: FileText,
                color: "bg-amber-100 text-amber-600",
              },
              {
                title: "Docs",
                icon: ShieldCheck,
                color: "bg-sky-100 text-sky-600",
              },
              {
                title: "And more...",
                icon: FileSignature,
                color: "bg-[#02cfc3]/20 text-[#02a6a6]",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <p
                    className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
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
            <div className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                  <Trophy className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                Performance appraisals
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Schedule employee appraisals and measure skills development.
              </p>

              <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={employees[4].image}
                    alt="Jennie Fletcher"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">Jennie Fletcher</p>
                    <p className="text-xs text-slate-400">
                      Manager&apos;s Feedback
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    ["Job knowledge", 5],
                    ["Time management", 4],
                    ["Teamwork", 5],
                    ["Autonomy", 4],
                  ].map(([label, score]) => (
                    <div key={String(label)}>
                      <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                        <span>{label}</span>
                        <span>{"★".repeat(Number(score))}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white dark:bg-slate-900">
                        <div
                          className="h-2 rounded-full bg-[#714b67]"
                          style={{ width: `${Number(score) * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {features.slice(1).map((feature) => (
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
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{app.title}</h3>
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
              Build a better
              <br />
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">people</span>
              </HandUnderline>{" "}
              experience
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



"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Timer,
  Users,
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
];

const features = [
  {
    title: "Open shifts",
    description:
      "Leave shifts unassigned and assign them with a simple drag and drop.",
  },
  {
    title: "Schedule",
    description:
      "Manage all shifts by organizing them by role, employee, or project.",
  },
  {
    title: "Avoid conflicts",
    description:
      "Get a warning if multiple shifts are scheduled simultaneously for an employee.",
  },
  {
    title: "Pivot table analysis",
    description:
      "Create advanced pivot tables and export the data in .xls files.",
  },
];

const apps = [
  { title: "Sales", description: "Plan from sales orders", icon: BarChart3 },
  {
    title: "Project",
    description: "Forecast deadlines accurately",
    icon: CheckCircle2,
  },
  {
    title: "Time Off",
    description: "Plan around employees’ leave",
    icon: Timer,
  },
  { title: "Payroll", description: "Security is key", icon: BriefcaseBusiness },
  {
    title: "Timesheet",
    description: "Compare with effective hours",
    icon: Clock3,
  },
];

export default function PlanningLandingPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Smart planning.{" "}
            <HandUnderline color="bg-sky-300">
              <span className="text-sky-500">No surprises.</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Adon Planning optimizes scheduling through automation. Schedule
            shifts and resources, manage onsite work, and enjoy the simplicity
            of integrated timesheets and invoices.
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

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900">Planning</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Schedule / My Planning / Reporting / Configuration
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="bg-[#f7f8fb] p-6">
                <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="grid grid-cols-[150px_repeat(6,1fr)] border-b border-slate-100 bg-slate-50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400">
                    <span>Employee</span>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <span key={day} className="text-center">
                        {day}
                      </span>
                    ))}
                  </div>

                  {[
                    "Anita Oliver",
                    "Audrey Peterson",
                    "Beth Evans",
                    "Deco Cola",
                    "Mitchell Admin",
                  ].map((name, rowIndex) => (
                    <div
                      key={name}
                      className="grid grid-cols-[150px_repeat(6,1fr)] border-b border-slate-100 px-4 py-3 text-xs last:border-0"
                    >
                      <span className="flex items-center gap-2 font-bold text-slate-900">
                        <img
                          src={avatars[rowIndex % avatars.length]}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {name}
                      </span>

                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className={`mx-1 rounded px-2 py-3 text-center font-bold ${
                            (index + rowIndex) % 4 === 0
                              ? "bg-[#02cfc3]/30 text-[#027f7c]"
                              : (index + rowIndex) % 4 === 1
                                ? "bg-amber-100 text-amber-700"
                                : (index + rowIndex) % 4 === 2
                                  ? "bg-rose-100 text-rose-600"
                                  : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {(index + rowIndex) % 3 === 0
                            ? "Consultant"
                            : (index + rowIndex) % 3 === 1
                              ? "7:00 AM"
                              : "Body ME"}
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
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span>Step up</span>
            </HandUnderline>{" "}
            your scheduling game
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Visualize and optimize your schedule. Gain clarity and efficiency
            with a stunning Gantt chart tool, templates, auto-planning, and
            recurrent tasks simplify your agenda management.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <p
              className="absolute -right-14 top-10 hidden rotate-28 text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Allocation of hours
              <br />
              remaining hours
            </p>

            <DashedArrow className="absolute -right-4 top-28 hidden h-24 w-24 rotate-140 text-slate-300 lg:block" />

            <div className="rounded-xl border border-slate-200 bg-white p-7 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-bold text-slate-900">Add Shift</p>
                <span className="text-slate-400">×</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  "8 AM - HR Management",
                  "9 AM - Project Manager",
                  "10 AM - HR Management",
                  "11 AM - CEO",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {[
                  ["Resource", "Open Shift"],
                  ["Role", "Consultant"],
                  ["Project", "Planning"],
                  ["Repeat", "Weekly"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-bold text-slate-400">{label}</p>
                    <div className="mt-2 rounded-md bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                  Save
                </button>
                <button className="rounded-md border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600">
                  Publish & Save
                </button>
                <button className="rounded-md border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600">
                  Auto Plan
                </button>
              </div>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-[#02cfc3]"
              text="We cannot wait for you to use this"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-[#02cfc3]">
                <span>Cover</span>
              </HandUnderline>{" "}
              my shift?
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600">
              Control your planning. Create shifts and reassign them
              effortlessly using a user-friendly drag-and-drop interface. With
              collaboration options, allow everyone on the team to see open
              shifts and switch them among one another.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg rounded-xl border border-slate-200 bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="rounded-lg bg-white p-5">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-12 rounded ${
                      [8, 14, 20].includes(index)
                        ? "bg-[#02cfc3]/30"
                        : [10, 16, 24].includes(index)
                          ? "bg-[#714b67]/40"
                          : "bg-slate-50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 text-left shadow-2xl">
              <p className="font-bold text-slate-900">
                Anita Oliver - Developer
              </p>
              <p className="mt-2 text-sm text-slate-500">
                This shift needs to be covered by another team member.
              </p>

              <button className="mt-5 rounded-md border border-rose-200 px-4 py-2 text-sm font-bold text-rose-500">
                Unassign shift
              </button>
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
            {features.map((feature) => (
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
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt=""
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
                  Adon improved resource management, making planning and
                  invoicing more efficient, enhancing communication and
                  collaboration.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Cédric Lesaux</p>
                    <p className="text-sm text-slate-500">CEO of XLG</p>
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
        className={`absolute -left-10 z-0 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt=""
        className="absolute left-3 z-10 h-12 w-12 rounded-full object-cover"
      />

      <MessageCircle className="absolute -top-9 left-9 z-10 h-8 w-8 text-slate-900" />

      <span className="relative z-10">{text}</span>
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

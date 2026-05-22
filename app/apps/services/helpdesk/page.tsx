"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  Map,
  MapPin,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Timer,
  Truck,
  Users,
  Wrench,
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
];

const features = [
  {
    title: "Calendar view",
    description:
      "Simplify planning, drag and drop appointments, and manage every technician’s schedule.",
  },
  {
    title: "Map view",
    description:
      "Plan routes, group nearby interventions, and reduce unnecessary travel.",
  },
  {
    title: "Quote view",
    description:
      "Manage customer needs, generate quotes, and track related services.",
  },
  {
    title: "Mobile availability",
    description:
      "Workers get everything they need on-site from a mobile-friendly interface.",
  },
  {
    title: "Time tracking",
    description:
      "Launch timers, track exact intervention time, and invoice service hours.",
  },
  {
    title: "Invoice from Sales orders",
    description:
      "Attach products, services, timesheets, and generate invoices quickly.",
  },
];

const apps = [
  {
    title: "Project",
    description: "Manage work tasks",
    icon: CheckCircle2,
  },
  {
    title: "Tracking",
    description: "Track field operations",
    icon: MapPin,
  },
  {
    title: "Sales",
    description: "Create service quotes",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    description: "Use spare parts",
    icon: ClipboardList,
  },
  {
    title: "Helpdesk",
    description: "Turn tickets into tasks",
    icon: HelpCircle,
  },
];

export default function FieldServiceLandingPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Field service.{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Simplified</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Optimize routes, schedule, dispatch, invoice, and manage field teams
            with one integrated timesheets and billing flow.
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
              <Sparkles className="h-12 w-12 rotate-[-20" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900">Field Service</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    My Tasks / All Tasks / Planning / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-3">
                {[
                  {
                    title: "9:30 AM",
                    cards: ["Repair office AC", "Install smart lock", "Fix printer issue"],
                  },
                  {
                    title: "11:30 AM",
                    cards: ["Measurement update", "Customer follow-up", "Maintenance check"],
                  },
                  {
                    title: "2:00 PM",
                    cards: ["Solar panel setup", "Router inspection", "Final validation"],
                  },
                ].map((column, columnIndex) => (
                  <div key={column.title} className="rounded-lg bg-slate-50 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900">
                        {column.title}
                      </p>
                      <span className="text-lg font-bold text-slate-400">+</span>
                    </div>

                    <div className="space-y-3">
                      {column.cards.map((card, cardIndex) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white p-4 text-left shadow-sm ring-1 ring-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-900">
                            {card}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Customer #{columnIndex + 1}
                            {cardIndex + 1}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                              Planned
                            </span>

                            <img
                              src={avatars[(columnIndex + cardIndex) % avatars.length]}
                              alt=""
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <div className="absolute -right-8 bottom-8 z-30 hidden w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl lg:block">
              <div className="h-64 bg-[#dff4f7] p-4">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded ${
                        index % 5 === 0
                          ? "bg-[#714b67]/30"
                          : index % 3 === 0
                            ? "bg-sky-200"
                            : "bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                <MapPin className="absolute right-16 top-20 h-8 w-8 text-rose-500" />
                <MapPin className="absolute bottom-20 left-16 h-8 w-8 text-[#714b67]" />
                <MapPin className="absolute bottom-28 right-10 h-8 w-8 text-[#02a6a6]" />
              </div>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-sky-400"
              text="Drag and drop your day on the map"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center gap-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-500 shadow-sm">
              <CalendarDays className="h-7 w-7" />
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-500 shadow-sm">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#02cfc3]/10 text-[#02a6a6] shadow-sm">
              <Map className="h-7 w-7" />
            </div>
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Great plan = great{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>execution</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Planning operations, work orders, and tasks is much easier when
            your team knows where to go, what to do, and what comes next.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-3 text-center text-xs font-bold text-slate-400">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`min-h-16 rounded-md p-2 text-left text-[10px] ${
                      [3, 8, 16, 18, 25, 29].includes(index)
                        ? "bg-amber-100 text-amber-700"
                        : [7, 14, 23].includes(index)
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <span>{index + 1}</span>
                    {[3, 8, 16, 18, 25, 29].includes(index) && (
                      <p className="mt-1 font-bold">Install</p>
                    )}
                    {[7, 14, 23].includes(index) && (
                      <p className="mt-1 font-bold">Service</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -right-8 bottom-8 z-30 hidden w-64 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-2xl lg:block">
              <p className="font-bold text-slate-900">Task detail</p>
              <p className="mt-2 text-sm text-slate-500">Install solar panel</p>

              <div className="mt-5 space-y-3">
                {["Customer ready", "Route optimized", "Parts available"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span>All-in-one</span>
            </HandUnderline>{" "}
            mobile app
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Everything you need in your pocket. Access powerful mobile tools to
            manage tasks, track time, capture signatures, and invoice on-site.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <p
              className="absolute left-0 top-12 hidden rotate-15 text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Cool features and clear steps
            </p>

            <p
              className="absolute right-0 top-8 hidden rotate-12 text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Record time spent on each appointment
            </p>

            <p
              className="absolute bottom-12 right-8 hidden rotate-10 text-lg font-bold text-[#714b67] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Keep track of your parts and manage invoices
            </p>

            <DashedArrow className="absolute left-20 top-20 hidden h-24 w-24 rotate-80 text-slate-300 lg:block" />
            <DashedArrow className="absolute right-24 top-20 hidden h-24 w-24 rotate-220 text-slate-300 lg:block" />

            <div className="relative mx-auto max-w-xs rounded-4xl bg-slate-900 p-4 shadow-2xl">
              <div className="rounded-3xl bg-white p-5 text-left">
                <div className="mx-auto mb-5 h-2 w-20 rounded-full bg-slate-200" />

                <p className="text-xl font-bold text-slate-900">Field Task</p>
                <p className="mt-1 text-sm text-slate-500">
                  Customer intervention
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Route confirmed",
                    "Parts checked",
                    "Timer running",
                    "Signature required",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-bold text-slate-400">Signature</p>
                  <div
                    className="mt-3 text-2xl text-slate-900"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    J. Customer
                  </div>
                </div>

                <button className="mt-5 w-full rounded-md bg-[#714b67] px-4 py-3 text-xs font-bold text-white">
                  Validate task
                </button>
              </div>
            </div>

            <div className="absolute right-52 top-16 hidden rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-100 lg:block">
              <p className="text-xs font-bold text-slate-400">Timer</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">00:43</p>
            </div>

            <div className="absolute bottom-28 right-44 hidden rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-100 lg:block">
              <p className="text-xs font-bold text-slate-400">Invoice</p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                2 products added
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24">
        <div className="absolute bottom-0 right-0 z-0 hidden h-72 w-1/2 bg-[#f3f4f7] lg:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 flex gap-2 text-2xl">🌹🌹🌹</div>

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Carefree{" "}
              <HandUnderline color="bg-sky-300">
                <span>invoicing</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600">
              Invoice customers, add products, track timesheets, and turn field
              service work into billable revenue.
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-sky-400"
              text="Create invoices directly from the task"
            />
          </div>

          <div className="relative z-20 mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <p className="text-sm font-bold text-slate-400">Invoice</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              INV/2026/00038
            </h3>

            <div className="mt-8 space-y-4">
              {[
                ["Installation service", "$350.00"],
                ["Maintenance", "$120.00"],
                ["External battery", "$240.00"],
                ["Travel fee", "$45.00"],
              ].map(([label, price]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm"
                >
                  <span className="font-semibold text-slate-600">{label}</span>
                  <span className="font-bold text-slate-900">{price}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between rounded-lg bg-emerald-50 px-5 py-4">
              <span className="font-bold text-emerald-700">Total</span>
              <span className="text-2xl font-bold text-emerald-700">
                $755.00
              </span>
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
            <div className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Calendar view
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Simplify planning and drag appointments directly in your
                calendar.
              </p>

              <div className="mt-8 grid grid-cols-5 gap-2 rounded-lg bg-slate-50 p-5">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-10 rounded ${
                      [2, 8, 12, 17, 21, 25].includes(index)
                        ? "bg-[#02cfc3]/30"
                        : [5, 15, 24].includes(index)
                          ? "bg-amber-200"
                          : "bg-white"
                    }`}
                  />
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
                who grow their business with Odoo
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  The purchasing time for accounting documents prior to analysis
                  is now reduced from 2 days to only 5 hours.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Arthur Green</p>
                    <p className="text-sm text-slate-500">
                      Field service director
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
        className={`absolute -left-10 z-0 h-20 w-32 rotate-[-14 rounded-[35%] ${color}`}
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
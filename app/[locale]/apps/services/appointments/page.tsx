"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MessageCircle,
  MonitorPlay,
  Play,
  Sparkles,
  Star,
  Users,
  Video,
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
    title: "Plan and select",
    description: "Online appointments from any compatible device.",
  },
  {
    title: "Manage time with ease",
    description: "Set employee schedules and manage resources like rooms.",
  },
  {
    title: "Calendar integration",
    description: "Fully integrated with the Adon Calendar app.",
  },
  {
    title: "Leads / Opportunities",
    description: "Create records in your CRM from scheduled meetings.",
  },
  {
    title: "Professional communication",
    description: "Use clear confirmation and reminder emails.",
  },
  {
    title: "Customer choices",
    description: "Let customers choose options that fit their needs.",
  },
];

const apps = [
  { title: "Website", description: "Create appointment pages", icon: Globe2 },
  { title: "Contacts", description: "Manage customer bookings", icon: Users },
  {
    title: "WhatsApp",
    description: "Send booking reminders",
    icon: MessageCircle,
  },
  { title: "SMS Marketing", description: "Reach clients quickly", icon: Mail },
  {
    title: "CRM",
    description: "Convert meetings into opportunities",
    icon: BarChart3,
  },
];

export default function AppointmentSchedulingPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Scheduling{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="text-amber-500 dark:text-amber-400">
                for businesses
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Generate appointments, schedule resources, manage meetings,
            reminders, video calls, and customer booking pages from one smart
            system.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              Meet an advisor
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Appointments
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    Slots / Bookings / Availability / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  New
                </button>
              </div>

              <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                <p className="mb-5 text-left font-bold text-slate-900 dark:text-white">
                  Choose your appointments
                </p>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    ["Consultation", "Book a discovery meeting"],
                    ["Demo Call", "See the product live"],
                    ["Onsite Meeting", "Meet with an expert"],
                    ["Support Session", "Get help from our team"],
                  ].map(([title, desc], index) => (
                    <div
                      key={title}
                      className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                    >
                      <div
                        className={`h-28 ${
                          index === 0
                            ? "bg-slate-200 dark:bg-slate-700"
                            : index === 1
                              ? "bg-emerald-100 dark:bg-emerald-900/50"
                              : index === 2
                                ? "bg-rose-100 dark:bg-rose-900/50"
                                : "bg-amber-100 dark:bg-amber-900/50"
                        }`}
                      />

                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {desc}
                        </p>

                        <button className="mt-4 rounded-md bg-[#714b67] px-3 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                          Book now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Appointments, at your
              <br />
              customers fingertips{" "}
              <span className="text-amber-500 dark:text-amber-400">👌</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Scheduling made easy. Access a free platform to schedule, discuss,
              and share availabilities with your customers.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                Select a date & time
              </p>
              <span className="text-slate-400 dark:text-slate-500">×</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => (
                <button
                  key={index}
                  className={`h-9 rounded-md text-xs font-bold transition ${
                    index === 17
                      ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                      : [10, 12, 19, 24].includes(index)
                        ? "bg-[#02cfc3] dark:bg-[#02cfc3]/30 text-[#02a6a6] dark:text-[#02cfc3]"
                        : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {["09:00", "10:30", "14:00", "16:30"].map((time) => (
                <button
                  key={time}
                  className="rounded-md border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Set{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">availabilities</span>
            </HandUnderline>
            , get your link,
            <br />
            and connect your calendar
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Configure templates, upload availability, publish your booking page,
            and sync it with your Google Calendar, Outlook, and more.
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_80px_1fr]">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <p className="mb-4 font-bold text-slate-900 dark:text-white">
                Availability
              </p>

              {[
                "Monday 9:00 - 17:00",
                "Tuesday 9:00 - 17:00",
                "Wednesday 10:00 - 16:00",
              ].map((item) => (
                <div
                  key={item}
                  className="mb-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <ArrowRight className="mx-auto h-12 w-12 text-[#714b67] dark:text-[#9b6a8f]" />

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <span key={index}>{day}</span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-10 rounded-md ${
                      [8, 12, 16, 24].includes(index)
                        ? "bg-amber-200 dark:bg-amber-800/50"
                        : [7, 14, 21].includes(index)
                          ? "bg-[#02cfc3] dark:bg-[#02cfc3]/30"
                          : "bg-slate-50 dark:bg-slate-800/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Never miss out on an
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">opportunity!</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Use appointment scheduling to transform every conversation into an
              opportunity, meeting, lead, or customer relationship.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 gap-3">
              {avatars.slice(0, 4).map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  <img
                    src={avatar}
                    alt=""
                    className="h-40 w-full object-cover"
                  />

                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
                    {index === 0 ? "Sales call" : "Meeting"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-slate-900 dark:bg-slate-800 p-4 text-white">
              <Video className="h-5 w-5" />
              <span className="text-sm font-bold">Video meeting ready</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CalendarDays className="mx-auto h-12 w-12 text-[#02a6a6] dark:text-[#02cfc3]" />

          <h2
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Online appointment{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">scheduling</span>
            </HandUnderline>
            <br />
            made easy
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Manage appointment scheduling with automated forms, custom
            questions, and a simple booking experience for customers.
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl bg-slate-900/70 dark:bg-slate-800/70 p-12 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-xl rounded-lg bg-white dark:bg-slate-900 p-7 text-left">
              <p className="mb-5 font-bold text-slate-900 dark:text-white">
                Schedule meeting
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Appointment type", "Business Consultation"],
                  ["Contact", "Customer name"],
                  ["Date", "July 24, 2026"],
                  ["Time", "10:30 AM"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <div className="mt-2 rounded-md bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                Confirm appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block px-2">
                <span className="relative z-10">Reporting:</span>
                <span className="absolute inset-x-0 bottom-2 h-6 rounded-lg bg-amber-300 dark:bg-amber-700" />
              </span>{" "}
              Analyze your
              <br />
              bookings
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Optimize your resources based on time constraints and discover how
              customers interact with your booking flow.
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-sky-400 dark:bg-sky-800"
              text="Appointment reporting has never been easier"
            />
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="flex h-72 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
              {[120, 40, 115, 190, 170, 130].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-sky-600/80 dark:bg-sky-400/80"
                    style={{ height: `${height}px` }}
                  />
                  <p className="mt-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                    {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                Appointment
              </p>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Confirmed
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Customer", "Anita Oliver"],
                ["Meeting", "Business consultation"],
                ["Date", "July 24, 2026"],
                ["Options", "Video call + Reminder"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
                >
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Appointments loaded
              <br />
              with{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">options</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Set your schedule, manage appointment configuration, and
              communication messages. Each booking can include extra options and
              custom questions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Send calendar alarms
              <br />
              or reminders{" "}
              <span className="text-amber-500 dark:text-amber-400">🔔</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Get into contact reminders using customized text messages,
              WhatsApp notifications, and email reminders so everyone shows up
              on time.
            </p>
          </div>

          <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <Bell className="absolute -right-5 -top-5 h-12 w-12 text-amber-500 dark:text-amber-400" />

            <div className="mb-5 flex items-center gap-4">
              <img
                src={avatars[1]}
                alt=""
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Reminder message
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sent 24 hours before
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Hi Anita, this is a reminder for your appointment tomorrow at
              10:30 AM. Reply CONFIRM to keep your booking.
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                Send reminder
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                Preview
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">right.</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">app.</span>
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
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt=""
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  By improving CRM-related features, Enadysim estimates
                  management and efficiency in the appointment process.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Milan Ayala
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      CEO
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
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  growth
                </span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
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
  text = "Project note",
  color = "bg-[#02cfc3] dark:bg-[#02cfc3]/30",
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
        className={`absolute -left-10 z-0 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt=""
        className="absolute left-3 z-10 h-12 w-12 rounded-full object-cover"
      />

      <MessageCircle className="absolute -top-9 left-9 z-10 h-8 w-8 text-slate-900 dark:text-white" />

      <span className="relative z-10">{text}</span>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Bell, CalendarDays, CheckCircle2, Clock3,
    Globe2, Mail, MessageCircle, MonitorPlay, Play, Sparkles, Star,
    Users, Video, ArrowRight,
  };
  return icons[iconName] || CalendarDays;
};

// Avatar images array (kept as static since these are image URLs)
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
];

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
        src={avatars[1]}
        alt=""
        className="absolute left-3 z-10 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 z-10 h-8 w-8 text-slate-900 dark:text-white" />
      <span className="relative z-10">{text}</span>
    </div>
  );
}

export default function AppointmentSchedulingPage() {
  const t = useTranslations("pages.appointments");

  const appointmentTypes = t.raw("hero.dashboard.appointmentTypes");
  const availabilityDays = t.raw("availabilitySection.demo.days");
  const availabilityTimes = t.raw("availabilitySection.demo.times");
  const availabilityItems = t.raw("setupSection.availabilityItems");
  const scheduleFields = t.raw("onlineSchedulingSection.demo.fields");
  const optionsFields = t.raw("optionsSection.demo.fields");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="text-amber-500 dark:text-amber-400">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("hero.startButton")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.advisorButton")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t("hero.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("hero.dashboard.subtitle")}
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("hero.dashboard.newButton")}
                </button>
              </div>

              <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                <p className="mb-5 text-left font-bold text-slate-900 dark:text-white">
                  {t("hero.dashboard.chooseText")}
                </p>

                <div className="grid gap-4 md:grid-cols-4">
                  {appointmentTypes.map((type: any, index: number) => (
                    <div
                      key={type.title}
                      className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                    >
                      <div
                        className={`h-28 ${
                          type.bgColor === "slate"
                            ? "bg-slate-200 dark:bg-slate-700"
                            : type.bgColor === "emerald"
                              ? "bg-emerald-100 dark:bg-emerald-900/50"
                              : type.bgColor === "rose"
                                ? "bg-rose-100 dark:bg-rose-900/50"
                                : "bg-amber-100 dark:bg-amber-900/50"
                        }`}
                      />

                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {type.title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {type.description}
                        </p>

                        <button className="mt-4 rounded-md bg-[#714b67] px-3 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                          {t("hero.dashboard.bookButton")}
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

      {/* Appointments at your customers fingertips Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("availabilitySection.title")}
              <br />
              {t("availabilitySection.subtitle")}{" "}
              <span className="text-amber-500 dark:text-amber-400">👌</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("availabilitySection.description")}
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("availabilitySection.demo.title")}
              </p>
              <span className="text-slate-400 dark:text-slate-500">×</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              {availabilityDays.map((day: string, idx: number) => (
                <span key={idx}>{day}</span>
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
              {availabilityTimes.map((time: string) => (
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

      {/* Set availabilities, get your link, and connect your calendar Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("setupSection.title")}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">{t("setupSection.titleHighlight")}</span>
            </HandUnderline>
            , {t("setupSection.titleMiddle")}
            <br />
            {t("setupSection.titleEnd")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("setupSection.description")}
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_80px_1fr]">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <p className="mb-4 font-bold text-slate-900 dark:text-white">
                Availability
              </p>

              {availabilityItems.map((item: string) => (
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
                {availabilityDays.map((day: string, idx: number) => (
                  <span key={idx}>{day}</span>
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

      {/* Never miss out on an opportunity Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("opportunitySection.title")}
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("opportunitySection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("opportunitySection.description")}
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
              <span className="text-sm font-bold">{t("opportunitySection.demo.videoReady")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Online appointment scheduling made easy Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CalendarDays className="mx-auto h-12 w-12 text-[#02a6a6] dark:text-[#02cfc3]" />

          <h2
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("onlineSchedulingSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("onlineSchedulingSection.titleHighlight")}</span>
            </HandUnderline>
            <br />
            {t("onlineSchedulingSection.titleEnd")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("onlineSchedulingSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl bg-slate-900/70 dark:bg-slate-800/70 p-12 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-xl rounded-lg bg-white dark:bg-slate-900 p-7 text-left">
              <p className="mb-5 font-bold text-slate-900 dark:text-white">
                {t("onlineSchedulingSection.demo.title")}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {scheduleFields.map(([label, value]: [string, string]) => (
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
                {t("onlineSchedulingSection.demo.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting - Analyze your bookings Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block px-2">
                <span className="relative z-10">{t("reportingSection.title")}</span>
                <span className="absolute inset-x-0 bottom-2 h-6 rounded-lg bg-amber-300 dark:bg-amber-700" />
              </span>{" "}
              {t("reportingSection.titleHighlight")}
              <br />
              {t("reportingSection.titleEnd")}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("reportingSection.description")}
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-sky-400 dark:bg-sky-800"
              text={t("reportingSection.floatingNote")}
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

      {/* Appointments loaded with options Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("optionsSection.demo.title")}
              </p>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {t("optionsSection.demo.status")}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {optionsFields.map(([label, value]: [string, string]) => (
                <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
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
              {t("optionsSection.title")}
              <br />
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="dark:text-[#02cfc3]">{t("optionsSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("optionsSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Send calendar alarms or reminders Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("remindersSection.title")}
              <br />
              {t("remindersSection.subtitle")}{" "}
              <span className="text-amber-500 dark:text-amber-400">🔔</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("remindersSection.description")}
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
                  {t("remindersSection.demo.title")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("remindersSection.demo.subtitle")}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("remindersSection.demo.message")}
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                {t("remindersSection.demo.sendButton")}
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                {t("remindersSection.demo.previewButton")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature: any) => (
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
            {t("featuresSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
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
            {t("appsSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
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
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaBanner.description")}
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
                  {t("testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("testimonial.role")}
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
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("footerCta.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("footerCta.titleEnd")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("footerCta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
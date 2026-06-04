"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

type Employee = {
  name: string;
  role: string;
  status: string;
};

type IconItem = {
  title: string;
  description?: string;
  icon: string;
};

const asArray = <T,>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const getScoreValue = (score: unknown) => {
  if (typeof score === "number") {
    return score;
  }

  if (typeof score === "string") {
    const parsedScore = Number(score);
    return Number.isFinite(parsedScore) ? parsedScore : 0;
  }

  return 0;
};

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Target, Trophy, FileSignature, BriefcaseBusiness, CalendarClock,
    BadgeCheck, FileText, ShieldCheck, Users, Star, Play, Sparkles,
    LockKeyhole, FolderLock, CheckCircle2, Clock3, ArrowRight,
  };
  return icons[iconName] || Target;
};

// Avatar images array (kept as static since these are image URLs)
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

export default function HumanResourcesLandingSections() {
  const t = useTranslations("pages.hr");

  const employeesList = asArray<Employee>(t.raw("hero.dashboard.employees"));
  const departmentsList = asArray<string>(t.raw("hero.dashboard.departments"));
  const filtersList = asArray<string>(t.raw("allInOneSection.filters"));
  const groupByList = asArray<string>(t.raw("allInOneSection.groupBy"));
  const favoritesList = asArray<string>(t.raw("allInOneSection.favorites"));
  const privacyFieldsList = asArray<[string, string]>(t.raw("privacySection.demo.fields"));
  const skillsList = asArray<string>(t.raw("skillsSection.skills"));
  const timeOffColumnsList = asArray<string>(t.raw("timeOffSection.columns"));
  const leaveTypesList = asArray<string>(t.raw("timeOffSection.leaveTypes"));
  const documentsItemsList = asArray<IconItem>(t.raw("documentsSection.items"));
  const featuresList = asArray<IconItem>(t.raw("featuresSection.features"));
  const appsList = asArray<IconItem>(t.raw("appsSection.apps"));
  const appraisalCriteriaList = asArray<[string, unknown]>(t.raw("featuresSection.appraisal.criteria"));

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0a0a1a] text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0a0a1a] pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">{t("hero.titleHighlight")}</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
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
              className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#11111f] px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.advisorButton")}
            </Link>
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            {t("hero.freeText")}
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#11111f] shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#11111f] px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("hero.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-gray-400 dark:text-gray-500 sm:block">
                    {t("hero.dashboard.directory")}
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition">
                  {t("hero.dashboard.newButton")}
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-[230px_1fr]">
                <aside className="rounded-xl bg-white dark:bg-[#11111f] p-5 text-left shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Departments
                  </p>

                  <div className="mt-5 space-y-2">
                    {departmentsList.map((item: string, index: number) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-gray-50 dark:bg-[#1a1a2a] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#22223a] transition cursor-pointer"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 grid gap-4 lg:ml-5 lg:mt-0 sm:grid-cols-2">
                  {employeesList.map((employee) => (
                    <div
                      key={employee.name}
                      className="flex items-center gap-4 rounded-xl bg-white dark:bg-[#11111f] p-4 text-left shadow-sm ring-1 ring-gray-100 dark:ring-gray-800"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face`}
                        alt={employee.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-gray-900 dark:text-white">
                          {employee.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {employee.role}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              employee.status === "Online" ? "bg-emerald-500" : "bg-amber-400"
                            }`}
                          />
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                            {employee.status}
                          </span>
                        </div>
                      </div>

                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-[#11111f] text-[#714b67] dark:text-[#9b6a8f] shadow-xl hover:scale-105 transition">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0a0a14] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* All in one place Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("allInOneSection.title")}
            <br />
            {t("allInOneSection.subtitle")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
            {t("allInOneSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl bg-white dark:bg-[#11111f] p-5 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
              <div className="flex items-center gap-3">
                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  Employees
                </button>
                <div className="flex-1 rounded-md bg-gray-50 dark:bg-[#1a1a2a] px-4 py-2 text-left text-sm text-gray-400 dark:text-gray-500">
                  {t("allInOneSection.searchPlaceholder")}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {t("allInOneSection.pagination")}
                </span>
              </div>
            </div>

            <DashedArrow className="mx-auto my-10 h-24 w-24 rotate-90 text-gray-300 dark:text-gray-700" />

            <div className="mx-auto max-w-3xl rounded-xl bg-white dark:bg-[#11111f] p-7 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)] ring-1 ring-gray-100 dark:ring-gray-800">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
                    Filters
                  </p>
                  {filtersList.map((item: string) => (
                    <div
                      key={item}
                      className="mb-3 rounded-md bg-gray-50 dark:bg-[#1a1a2a] px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
                    Group By
                  </p>
                  {groupByList.map((item: string) => (
                    <div
                      key={item}
                      className="mb-3 rounded-md bg-gray-50 dark:bg-[#1a1a2a] px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
                    Favorites
                  </p>
                  {favoritesList.map((item: string) => (
                    <div
                      key={item}
                      className="mb-3 rounded-md bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep private stuff private */}
      <section className="bg-white dark:bg-[#0a0a1a] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("privacySection.title")}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-900">
                <span className="dark:text-rose-300">{t("privacySection.titleHighlight")}</span>
              </HandUnderline>
              <br />
              {t("privacySection.titleEnd")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
              {t("privacySection.description")}
            </p>
          </div>

          <div className="relative">
            <LockKeyhole className="absolute -right-4 -top-10 h-14 w-14 text-rose-500 dark:text-rose-400" />

            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#11111f] p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={avatars[0]}
                  alt="Audrey Peterson"
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("privacySection.demo.name")}
                  </p>
                  <p className="text-sm text-rose-500 dark:text-rose-400">
                    {t("privacySection.demo.confidential")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {privacyFieldsList.map(([label, value]: [string, string]) => (
                  <div key={label} className="rounded-lg bg-gray-50 dark:bg-[#1a1a2a] p-4">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 px-4 py-3 text-sm font-bold text-rose-600 dark:text-rose-400">
                <FolderLock className="h-5 w-5" />
                {t("privacySection.demo.footer")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Show off those skills */}
      <section className="bg-white dark:bg-[#0a0a1a] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#11111f] p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {employeesList.slice(0, 4).map((employee, index) => (
                <div
                  key={employee.name}
                  className="flex gap-4 rounded-lg bg-gray-50 dark:bg-[#1a1a2a] p-4 text-left"
                >
                  <img
                    src={avatars[index]}
                    alt={employee.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {employee.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {employee.role}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Sales", "Design"].slice(0, index + 1).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-white dark:bg-[#11111f] px-2 py-1 text-[10px] font-bold text-[#714b67] dark:text-[#9b6a8f] shadow-sm"
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
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("skillsSection.title")}
              <br />
              <HandUnderline color="bg-amber-300 dark:bg-amber-900">
                <span className="dark:text-amber-300">{t("skillsSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
              {t("skillsSection.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {skillsList.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-50 dark:bg-[#1a1a2a] px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 ring-1 ring-gray-100 dark:ring-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Take control of time off */}
      <section className="bg-white dark:bg-[#0a0a1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
            <Clock3 className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("timeOffSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-900">
              <span className="dark:text-sky-300">{t("timeOffSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
            {t("timeOffSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute inset-0 translate-y-10 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative grid gap-4 md:grid-cols-3">
              {timeOffColumnsList.map((column: string, colIndex: number) => (
                <div
                  key={column}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#11111f] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                >
                  <p className="mb-5 text-left font-bold text-gray-900 dark:text-white">
                    {column}
                  </p>

                  <div className="space-y-4">
                    {employeesList.slice(colIndex * 2, colIndex * 2 + 2).map((person: any, idx: number) => (
                      <div
                        key={person.name}
                        className="flex gap-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2a] p-3 text-left"
                      >
                        <img
                          src={avatars[colIndex * 2 + idx]}
                          alt={person.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {person.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {leaveTypesList[idx] ?? ""}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
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

      {/* Never lose track of another document */}
      <section className="bg-white dark:bg-[#0a0a1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("documentsSection.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
            {t("documentsSection.description")}
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 rounded-xl bg-[#f3f4f7] dark:bg-[#0f0f1a] p-8 sm:grid-cols-2 lg:grid-cols-4">
            {documentsItemsList.map((item) => {
              const Icon = getIconComponent(item.icon);
              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                      item.title === "Share"
                        ? "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                        : item.title === "PDFs"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                          : item.title === "Docs"
                            ? "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
                            : "bg-[#02cfc3]/20 text-[#02a6a6] dark:bg-[#02cfc3]/10 dark:text-[#02cfc3]"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <p
                    className="mt-4 text-lg font-bold text-gray-900 dark:text-white"
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

      {/* Features Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/70 dark:border-gray-800 bg-white dark:bg-[#11111f] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                  <Trophy className="h-5 w-5" />
                </div>

                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                {featuresList[0]?.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {featuresList[0]?.description}
              </p>

              <div className="mt-8 rounded-xl bg-gray-50 dark:bg-[#1a1a2a] p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt="Jennie Fletcher"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {t("featuresSection.appraisal.name")}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {t("featuresSection.appraisal.role")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {appraisalCriteriaList.map(([label, score]) => {
                    const scoreValue = getScoreValue(score);

                    return (
                      <div key={label}>
                        <div className="mb-2 flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                          <span>{label}</span>
                          <span>{"★".repeat(scoreValue)}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white dark:bg-[#0a0a1a]">
                          <div
                            className="h-2 rounded-full bg-[#714b67] dark:bg-[#9b6a8f]"
                            style={{ width: `${scoreValue * 20}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {featuresList.slice(1).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/70 dark:border-gray-800 bg-white dark:bg-[#11111f] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
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

      {/* One need, one app */}
      <section className="bg-white dark:bg-[#0a0a1a] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-900">
              <span className="dark:text-sky-300">need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-900">
              <span className="dark:text-sky-300">app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app) => {
              const Icon = getIconComponent(app.icon);
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#11111f] p-5 transition hover:bg-white dark:hover:bg-[#1a1a2a] hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-[#0a0a1a] text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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

      {/* Join 15 million users */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0a0a1a] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-[#11111f] object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-gray-100 dark:bg-[#1a1a2a]"
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

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-[#11111f]/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-gray-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {t("ctaBanner.description")}
              </p>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("footerCta.title")}
              <br />
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

            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

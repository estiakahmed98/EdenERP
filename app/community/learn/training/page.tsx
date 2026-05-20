// app/community/learn/training/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Check,
  CirclePlay,
  Clock3,
  GraduationCap,
  Layers3,
  MapPin,
  MonitorPlay,
  PlayCircle,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Training | EdenERP Community",
  description:
    "Professional EdenERP training programs, live classes, workshops, and guided learning paths for teams.",
};

const learningPaths = [
  {
    title: "Functional Consultant",
    level: "Beginner to advanced",
    duration: "6 weeks",
    lessons: "42 lessons",
    description:
      "Master business workflows, app configuration, implementation planning, and client-facing ERP delivery.",
    topics: ["CRM", "Sales", "Inventory", "Accounting", "Implementation"],
  },
  {
    title: "Developer Bootcamp",
    level: "Intermediate",
    duration: "8 weeks",
    lessons: "56 lessons",
    description:
      "Build modules, customize workflows, connect APIs, and prepare production-ready EdenERP extensions.",
    topics: ["Next.js", "API", "Prisma", "Automation", "Deployment"],
  },
  {
    title: "Business User Training",
    level: "Team friendly",
    duration: "3 weeks",
    lessons: "24 lessons",
    description:
      "Train daily users to manage customers, quotations, invoices, tasks, reports, and approvals confidently.",
    topics: ["Dashboard", "Tasks", "Reports", "Approvals", "Productivity"],
  },
];

const formats = [
  {
    title: "Live Online Classes",
    description:
      "Join instructor-led sessions with real-time Q&A, demos, and guided exercises.",
    icon: MonitorPlay,
  },
  {
    title: "On-site Team Training",
    description:
      "Bring EdenERP experts to your organization for role-based hands-on workshops.",
    icon: Users,
  },
  {
    title: "Self-paced Academy",
    description:
      "Learn anytime through structured videos, checkpoints, quizzes, and downloadable resources.",
    icon: Video,
  },
  {
    title: "Certification Prep",
    description:
      "Practice implementation cases and prepare for consultant or developer certification.",
    icon: Trophy,
  },
];

const schedule = [
  {
    title: "ERP Foundations Workshop",
    type: "Live online",
    date: "Mar 12",
    time: "10:00 AM",
    location: "Remote",
  },
  {
    title: "Inventory & Sales Masterclass",
    type: "Advanced",
    date: "Mar 18",
    time: "02:00 PM",
    location: "Remote",
  },
  {
    title: "Developer Customization Lab",
    type: "Hands-on",
    date: "Mar 25",
    time: "06:00 PM",
    location: "Dhaka / Online",
  },
];

const stats = [
  ["12k+", "learners trained"],
  ["96%", "completion satisfaction"],
  ["40+", "practical labs"],
  ["24/7", "academy access"],
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">
      <span className="text-violet-500">{icon}</span>
      {label}
    </div>
  );
}

export default function TrainingPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fbf7ff_20%,_#ffffff_100%)] text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_14%_12%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(251,191,36,0.16),transparent_25%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,245,255,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <SectionEyebrow
              icon={<GraduationCap className="h-4 w-4" />}
              label="EdenERP Training Academy"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Learn / Training
              </p>
              <h1
                className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                Learn EdenERP
                <br />
                the practical way
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Build real ERP confidence with guided courses, live workshops,
                hands-on labs, and role-based training for business users,
                consultants, and developers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#paths"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore training paths
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#schedule"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                View schedule
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-2xl font-semibold text-slate-900">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-amber-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white p-5 shadow-[0_40px_100px_rgba(76,29,149,0.16)]">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,_#f4ebff_0%,_#fff8ed_100%)] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-500">
                      Live class
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                      ERP Foundations
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                    <CirclePlay className="h-8 w-8 fill-primary" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 rounded-[1.6rem] bg-white/85 p-4 shadow-sm">
                  {[
                    [BookOpenCheck, "12 modules", "Structured learning"],
                    [Clock3, "4h 30m", "Total video time"],
                    [BadgeCheck, "Certificate", "After completion"],
                  ].map(([Icon, title, text]) => {
                    const IconComponent = Icon as typeof BookOpenCheck;
                    return (
                      <div
                        key={title as string}
                        className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {title as string}
                          </p>
                          <p className="text-sm text-slate-500">
                            {text as string}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[1.6rem] bg-slate-900 p-5 text-white">
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-200">
                    “The training helped our team understand the full workflow,
                    not just individual screens.”
                  </p>
                  <p className="mt-4 text-sm font-semibold">Ariyan Rahman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="paths"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<Layers3 className="h-4 w-4" />}
            label="Role-based learning paths"
          />
          <div className="mt-8">
            <ScriptHeading>Choose the path that fits your role</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Every course path is designed around practical implementation work,
            so learners can apply the concepts immediately in real business
            scenarios.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {learningPaths.map((path, index) => (
            <div
              key={path.title}
              className={`rounded-[2rem] border bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-primary/30 shadow-[0_30px_80px_rgba(124,58,237,0.12)]"
                  : "border-slate-200"
              }`}
            >
              {index === 1 && (
                <div className="mb-5 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              <h3 className="text-2xl font-semibold text-slate-900">
                {path.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {path.description}
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  {path.level}
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {path.duration}
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  {path.lessons}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {path.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <Link
                href="#get-started"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
              >
                Start this path
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f5f7] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              Training formats
              <br />
              for every team.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Learn live, on-site, or at your own pace. Mix formats to build a
              training plan that works for your team and implementation stage.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {formats.map((format) => {
              const Icon = format.icon;
              return (
                <div
                  key={format.title}
                  className="rounded-[1.8rem] border border-white bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {format.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {format.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="schedule"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5 self-center">
            <SectionEyebrow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Upcoming sessions"
            />
            <ScriptHeading>Join the next live training</ScriptHeading>
            <p className="max-w-md text-base leading-7 text-slate-600">
              Reserve a seat for upcoming classes and workshops. Each session
              includes downloadable resources, recordings, and exercises.
            </p>
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Reserve a seat
            </Link>
          </div>

          <div className="space-y-4">
            {schedule.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      {item.type}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" /> {item.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4" /> {item.time}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {item.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#get-started"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-primary/30 hover:text-primary"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"
      >
        <SectionEyebrow
          icon={<Sparkles className="h-4 w-4" />}
          label="Start learning today"
        />
        <div className="mt-8">
          <ScriptHeading>
            Build stronger teams
            <br />
            with EdenERP training
          </ScriptHeading>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Give your users, consultants, and developers a clear learning path so
          adoption becomes faster, cleaner, and easier to scale.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start now
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <Check className="h-4 w-4" />
            Includes certificate option
          </div>
        </div>
      </section>
    </main>
  );
}

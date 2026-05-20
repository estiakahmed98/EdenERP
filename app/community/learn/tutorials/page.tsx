// app/community/learn/tutorials/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CirclePlay,
  Clock3,
  Code2,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  ListChecks,
  PlayCircle,
  Search,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tutorials | EdenERP Community",
  description:
    "Learn EdenERP step by step with practical tutorials, guided learning paths, videos, and role-based business workflows.",
};

const tutorialCategories = [
  {
    title: "Getting Started",
    description:
      "Set up your workspace, users, company profile, apps, and basic access rules.",
    lessons: "12 tutorials",
    icon: Compass,
  },
  {
    title: "Sales & CRM",
    description:
      "Manage leads, customers, quotations, pipelines, follow-ups, and sales reports.",
    lessons: "18 tutorials",
    icon: Users,
  },
  {
    title: "Inventory & Purchase",
    description:
      "Track products, stock moves, vendors, purchase orders, and replenishment rules.",
    lessons: "16 tutorials",
    icon: LibraryBig,
  },
  {
    title: "Accounting & Invoicing",
    description:
      "Create invoices, track payments, review taxes, and monitor financial activity.",
    lessons: "14 tutorials",
    icon: BadgeCheck,
  },
  {
    title: "Project & Tasks",
    description:
      "Organize tasks, teams, approvals, deadlines, and performance dashboards.",
    lessons: "20 tutorials",
    icon: LayoutDashboard,
  },
  {
    title: "Developer Guides",
    description:
      "Learn API usage, customization patterns, modules, automation, and integrations.",
    lessons: "10 tutorials",
    icon: Code2,
  },
];

const featuredTutorials = [
  {
    title: "Create your first company workspace",
    level: "Beginner",
    time: "18 min",
    tag: "Setup",
  },
  {
    title: "Build a complete sales pipeline",
    level: "Beginner",
    time: "24 min",
    tag: "CRM",
  },
  {
    title: "Configure roles and permissions",
    level: "Intermediate",
    time: "32 min",
    tag: "Security",
  },
  {
    title: "Automate purchase replenishment",
    level: "Intermediate",
    time: "28 min",
    tag: "Inventory",
  },
];

const learningPath = [
  "Choose your business app",
  "Watch guided tutorials",
  "Practice with sample data",
  "Apply it to your workflow",
  "Track progress and improve",
];

const stats = [
  ["90+", "practical tutorials"],
  ["12", "business workflows"],
  ["15 min", "average lesson"],
  ["24/7", "self-paced access"],
];

const faqs = [
  {
    q: "Are the tutorials beginner friendly?",
    a: "Yes. Each tutorial starts from the basics and then moves into practical business use cases.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "Most business tutorials require no coding. Developer tutorials are clearly marked separately.",
  },
  {
    q: "Can my team follow the same learning path?",
    a: "Yes. Teams can use the tutorials to train sales, inventory, finance, support, and operations users.",
  },
  {
    q: "Are tutorials connected with documentation?",
    a: "Tutorials explain the practical flow, while documentation can be used for deeper reference.",
  },
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
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
      <span className="text-amber-500">{icon}</span>
      {label}
    </div>
  );
}

export default function TutorialsPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fffcf7_18%,_#ffffff_100%)] text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_15%_12%,rgba(251,191,36,0.18),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(167,139,250,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,252,247,1)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<GraduationCap className="h-4 w-4" />}
              label="Community learning center"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Learn / Tutorials
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Learn EdenERP with practical
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Tutorials
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Master every EdenERP workflow through short, practical, and
                business-focused tutorials designed for owners, managers,
                operators, accountants, and developers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#tutorials"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start learning
              </Link>
              <Link
                href="#learning-path"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                View learning path
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-semibold text-slate-900">
                    {value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-amber-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />

            <div className="relative w-full rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-[0_40px_100px_rgba(76,29,149,0.16)]">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,_#f7f0ff_0%,_#fff8ed_100%)] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Tutorial player
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      Sales pipeline basics
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-md">
                    <PlayCircle className="h-7 w-7 fill-primary/10" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.6rem] bg-slate-900 p-5 text-white shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.25),transparent_24%),radial-gradient(circle_at_82%_40%,rgba(168,85,247,0.28),transparent_24%)]" />
                  <div className="relative flex min-h-56 items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                      <CirclePlay className="h-10 w-10 fill-primary text-primary" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["Watch", "Practice", "Apply"].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white px-4 py-3 shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Step {index + 1}
                      </p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tutorials"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="text-center">
          <SectionEyebrow
            icon={<BookOpen className="h-4 w-4" />}
            label="Browse by business workflow"
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>
              Everything you need
              <br />
              to learn faster.
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Pick a topic, follow the guided lesson, and apply the workflow to
              your real business process immediately.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <span className="text-sm text-slate-500">
            Search tutorials by app, workflow, role, or difficulty...
          </span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tutorialCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {category.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      <Video className="h-3.5 w-3.5" />
                      {category.lessons}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f5f7] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.08),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5 self-center">
              <SectionEyebrow
                icon={<Sparkles className="h-4 w-4" />}
                label="Featured lessons"
              />
              <ScriptHeading>
                Start with the
                <br />
                most useful flows.
              </ScriptHeading>
              <p className="max-w-md text-base leading-7 text-slate-600">
                These tutorials are selected for new teams who want to launch
                faster and understand the core EdenERP workflow from day one.
              </p>
              <Link
                href="#learning-path"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                See recommended path
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredTutorials.map((tutorial, index) => (
                <div
                  key={tutorial.title}
                  className="rounded-[1.8rem] border border-white bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CirclePlay className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-slate-900">
                    {tutorial.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      {tutorial.tag}
                    </span>
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      {tutorial.level}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <Clock3 className="h-3 w-3" />
                      {tutorial.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="learning-path"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24"
      >
        <div className="space-y-5 self-center">
          <SectionEyebrow
            icon={<ListChecks className="h-4 w-4" />}
            label="Guided learning path"
          />
          <ScriptHeading>
            Learn it once.
            <br />
            Use it every day.
          </ScriptHeading>
          <p className="max-w-md text-base leading-7 text-slate-600">
            Follow a clear path from setup to daily operation. Each lesson is
            built around real business actions, not theory only.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-10 rounded-full bg-slate-100" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_35px_80px_rgba(15,23,42,0.1)]">
            <div className="space-y-4">
              {learningPath.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{step}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Complete this step and move to the next recommended
                      workflow.
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#faf5ff_45%,_#fff8ed_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
          <div className="absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-violet-100 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Star className="h-7 w-7 fill-current" />
            </div>
            <ScriptHeading className="mt-6">
              Built for teams who
              <br />
              want to learn by doing.
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
              Train your team with tutorials that connect learning, practice,
              and real operational workflows inside one business platform.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="#tutorials"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Browse tutorials
              </Link>
              <Link
                href="/community/learn/documentation"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Read documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <SectionEyebrow
            icon={<BookOpen className="h-4 w-4" />}
            label="Common questions"
          />
          <ScriptHeading className="mt-8">Tutorial FAQ</ScriptHeading>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary/30"
            >
              <h3 className="font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

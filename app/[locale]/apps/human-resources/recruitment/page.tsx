"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MailCheck,
  MessageCircle,
  Play,
  SearchCheck,
  Sparkles,
  Star,
  Target,
  Users,
  UserSearch,
  WandSparkles,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "AI in for decision",
    description:
      "Create smart hiring workflows and keep every recruitment step clear.",
  },
  {
    title: "Stay on target",
    description:
      "Set hiring goals, interview stages, and follow-up activities for each role.",
  },
  {
    title: "Thin the pool",
    description:
      "Score candidates, filter applications, and shortlist the best people faster.",
  },
  {
    title: "You're hired!",
    description:
      "Turn a successful applicant into an employee with smooth onboarding.",
  },
  {
    title: "Get Feedback",
    description:
      "Send and collect interview feedback from your recruitment team.",
  },
  {
    title: "Quick communication",
    description:
      "Contact candidates directly and keep every message attached to the job.",
  },
];

const apps = [
  {
    title: "Employees",
    description: "Create employee records",
    icon: Users,
  },
  {
    title: "Employee Referral",
    description: "Invite team referrals",
    icon: UserSearch,
  },
  {
    title: "Fleet",
    description: "Assign company assets",
    icon: BriefcaseBusiness,
  },
  {
    title: "Time Off",
    description: "Manage leave after hiring",
    icon: CalendarDays,
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

const candidates = [
  {
    name: "Joel Willis",
    role: "Product Designer",
    stage: "First Interview",
    image: avatars[0],
  },
  {
    name: "Audrey Peterson",
    role: "Frontend Developer",
    stage: "Contract Proposal",
    image: avatars[1],
  },
  {
    name: "Ronald Lewis",
    role: "Sales Manager",
    stage: "Qualified",
    image: avatars[2],
  },
  {
    name: "Jennie Fletcher",
    role: "Marketing Officer",
    stage: "New",
    image: avatars[3],
  },
];

export default function RecruitmentATSPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">Next-Gen</span>
            </HandUnderline>{" "}
            ATS
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Source, track, interview, and hire candidates from one beautiful
            recruitment pipeline.
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
                  <BriefcaseBusiness className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">Recruitment</span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Jobs / Applications / Interviews / Reporting
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  New Job
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-4">
                {[
                  {
                    title: "New Applications",
                    cards: [
                      "Graphic Designer",
                      "Sales Executive",
                      "QA Engineer",
                    ],
                  },
                  {
                    title: "Initial Qualification",
                    cards: [
                      "Frontend Developer",
                      "Marketing Manager",
                      "HR Officer",
                    ],
                  },
                  {
                    title: "First Interview",
                    cards: [
                      "Product Designer",
                      "Account Manager",
                      "UX Researcher",
                    ],
                  },
                  {
                    title: "Contract Proposal",
                    cards: [
                      "Senior Developer",
                      "Operations Lead",
                      "SEO Specialist",
                    ],
                  },
                ].map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
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
                          className="rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm ring-1 ring-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {card}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {cardIndex + 2} applications
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white">
                              Interview
                            </span>
                            <img
                              src={
                                avatars[
                                  (columnIndex + cardIndex) % avatars.length
                                ]
                              }
                              alt="Candidate"
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Never wonder about a{" "}
            <HandUnderline color="bg-rose-300">
              <span>job&apos;s status</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Get full pipeline visibility from application to offer, so your team
            always knows what comes next.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-4 md:grid-cols-3">
                {["Open Jobs", "In Progress", "Hired"].map(
                  (column, columnIndex) => (
                    <div key={column} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                      <p className="mb-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">
                        {column}
                      </p>

                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="mb-3 rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm"
                        >
                          <div className="h-3 w-3/4 rounded bg-[#714b67]" />
                          <div className="mt-2 h-2 w-full rounded bg-slate-100" />
                          <div className="mt-2 h-2 w-2/3 rounded bg-slate-100" />
                          <p className="mt-3 text-xs text-slate-400">
                            {columnIndex + index + 2} candidates
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Visualize the{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>pipeline</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Move applicants through your recruitment stages with a clean kanban
            view, interview status, tags, activities, and notes.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid gap-4 md:grid-cols-3">
                {["Qualified", "Interview", "Contract"].map(
                  (stage, stageIndex) => (
                    <div key={stage} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                      <p className="mb-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">
                        {stage}
                      </p>

                      {candidates.slice(0, 3).map((candidate, index) => (
                        <div
                          key={`${stage}-${candidate.name}`}
                          className="mb-3 rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm"
                        >
                          <div className="flex gap-3">
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />

                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                {candidate.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {candidate.role}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                              {stageIndex + index + 1} stars
                            </span>
                            <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white">
                              Interview
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
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
              <HandUnderline color="bg-rose-300">
                <span>Don&apos;t</span>
              </HandUnderline>{" "}
              waste time
              <br />
              typing
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Automate descriptions using templates and AI. Generate job posts,
              interview invitations, and candidate messages quickly.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-slate-100">Job Description</p>
              <WandSparkles className="h-5 w-5 text-amber-500" />
            </div>

            <div className="space-y-4 text-left">
              {[
                ["Programmer", "Software development and web applications"],
                ["Requirements", "React, Next.js, TypeScript, REST API"],
                ["Location", "Remote / Hybrid"],
                ["Experience", "3+ years"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                  <p className="text-xs font-bold text-slate-400">{label}</p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
              Generate description
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Tailor-made{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>pipelines</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Create custom recruitment steps for every department, job role, and
            hiring process.
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7]" />

            <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-slate-100">Pipeline Builder</p>
                <span className="text-slate-400">×</span>
              </div>

              {[
                "New Application",
                "Initial Qualification",
                "First Interview",
                "Technical Test",
                "Contract Proposal",
              ].map((step, index) => (
                <div
                  key={step}
                  className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-200">{step}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      index < 2
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#714b67]/10 text-[#714b67]"
                    }`}
                  >
                    Stage {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-900 py-24">
        <div className="absolute left-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-center text-xs font-bold text-slate-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-14 rounded-md p-1 text-left text-[10px] ${
                    [3, 8, 16, 22, 29].includes(index)
                      ? "bg-[#714b67] text-white"
                      : [10, 18, 24].includes(index)
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-50 dark:bg-slate-800/40 text-slate-400"
                  }`}
                >
                  <span>{index + 1}</span>
                  {[3, 8, 16, 22, 29].includes(index) && (
                    <p className="mt-1 font-bold">Interview</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Less scheduling,
              <br />
              more interviewing!
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Schedule interviews, send calendar invitations, coordinate with
              hiring teams, and keep candidates updated automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300">
              <span>Reporting</span>
            </HandUnderline>{" "}
            that makes sense
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Look at your hiring data and understand where your candidates come
            from, how your pipeline performs, and where your team can improve.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-slate-100">Recruitment Analysis</p>
                <BarChart3 className="h-5 w-5 text-[#714b67]" />
              </div>

              <div className="flex h-72 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
                {[35, 58, 80, 130].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className="w-full bg-emerald-300"
                      style={{ height: `${height * 0.35}px` }}
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
                      Stage {index + 1}
                    </p>
                  </div>
                ))}
              </div>
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200">
                  Adon saved us plenty of web development time, allowing us to
                  focus on individual strengths, which is immensely helpful for
                  start-ups.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">Daphne Wright</p>
                    <p className="text-sm text-slate-500">HR manager</p>
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



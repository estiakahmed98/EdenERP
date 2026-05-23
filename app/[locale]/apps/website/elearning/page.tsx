"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  MonitorSmartphone,
  Play,
  Star,
  Sparkles,
  Trophy,
  Users,
  ClipboardCheck,
  BarChart3,
  MessageSquareText,
  ShoppingBag,
  Globe2,
  BriefcaseBusiness,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Quizzes",
    description:
      "Evaluate and challenge your students with beautiful quizzes and assessments.",
  },
  {
    title: "Reviews",
    description:
      "Collect feedback on your content, lessons, courses, and learning paths.",
  },
  {
    title: "Prerequisites",
    description:
      "Create learning paths and make courses available in the right order.",
  },
  {
    title: "Sell your courses",
    description:
      "Monetize your knowledge with paid courses, checkout, and subscriptions.",
  },
  {
    title: "Forum",
    description:
      "Create discussion spaces and let students ask questions and share ideas.",
  },
];

const apps = [
  {
    title: "Forum",
    description: "Create a community",
    icon: MessageSquareText,
  },
  {
    title: "Survey",
    description: "Get student feedback",
    icon: ClipboardCheck,
  },
  {
    title: "eCommerce",
    description: "Sell courses online",
    icon: ShoppingBag,
  },
  {
    title: "Website",
    description: "Create professional pages",
    icon: MonitorSmartphone,
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

export default function ELearningLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Keep your learners{" "}
            <HandUnderline color="bg-rose-300">
              <span className="text-rose-500">engaged</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Create online courses, publish lessons, track progress, measure
            results, and help your students reach success with a beautiful
            learning platform.
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
              Watch a demo
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <p
              className="absolute -right-10 top-8 hidden rotate-12 text-lg font-bold text-rose-400 lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              Available
              <br />
              for any device
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="border-b border-slate-100 bg-white px-5 py-4 text-left">
                <span
                  className="text-xl font-bold text-[#714b67]"
                  style={{ fontFamily: handwrittenFont }}
                >
                  Learn Academy
                </span>
              </div>

              <div className="grid bg-white lg:grid-cols-[230px_1fr]">
                <aside className="border-r border-slate-100 bg-slate-50 p-5 text-left">
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <p className="text-sm font-bold text-slate-900">
                      Course progress
                    </p>

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                        <span>Completed</span>
                        <span>47%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[47%] rounded-full bg-[#714b67]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {[
                      "Introduction",
                      "Lessons",
                      "Exercises",
                      "Quiz",
                      "Certificate",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-white text-[#714b67] shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="bg-white p-6 text-left">
                  <div className="relative overflow-hidden rounded-lg bg-[#7a4d6e] p-8 text-white">
                    <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10" />

                    <p className="text-sm font-bold text-white/70">
                      Gardening Course
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      Taking care of Trees
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                      Learn how to grow, care, and protect beautiful trees
                      through structured lessons and interactive activities.
                    </p>

                    <button className="mt-6 flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#714b67]">
                      <Play className="h-4 w-4 fill-current" />
                      Continue
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      ["01", "Why trees matter", "Complete"],
                      ["02", "Soil and watering", "In progress"],
                      ["03", "Pruning basics", "Locked"],
                      ["04", "Final quiz", "Locked"],
                    ].map(([number, title, status], index) => (
                      <div
                        key={title}
                        className="grid grid-cols-[44px_1fr_110px] items-center rounded-lg border border-slate-100 px-4 py-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-[#714b67]">
                          {number}
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          {title}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-center text-[10px] font-bold ${
                            index === 0
                              ? "bg-emerald-50 text-emerald-600"
                              : index === 1
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <FloatingNote className="mx-auto mt-12 z-30" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Easy to use, fun to{" "}
            <HandUnderline color="bg-rose-300">
              <span>learn</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Create engaging courses with lessons, videos, quizzes, text blocks,
            images, downloadable files, and interactive learning content.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid lg:grid-cols-[1fr_250px]">
                <div className="bg-white p-7">
                  <div className="mb-5 rounded-lg bg-[#714b67] px-5 py-4 text-left text-white">
                    <p className="text-sm font-bold">Taking care of Trees</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      {
                        title: "Tree care basics",
                        image:
                          "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=700&auto=format&fit=crop",
                      },
                      {
                        title: "Indoor plants",
                        image:
                          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&auto=format&fit=crop",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={`overflow-hidden rounded-xl border ${
                          index === 1 ? "border-[#02cfc3]" : "border-slate-100"
                        } bg-slate-50`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 w-full object-cover"
                        />

                        <div className="p-5 text-left">
                          <h3 className="font-bold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Learn with beautiful content blocks and simple
                            course structure.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="border-l border-slate-200 bg-[#171824] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">Editor</p>

                  {[
                    "Course layout",
                    "Lesson card",
                    "Progress bar",
                    "Button color",
                    "Mobile view",
                    "Quiz options",
                  ].map((item, index) => (
                    <div key={item} className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                        <span>{item}</span>
                        <span>{index + 1}</span>
                      </div>

                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[#02cfc3]"
                          style={{ width: `${45 + index * 8}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300">
                <span className="text-sky-600">Learning</span>
              </HandUnderline>{" "}
              is a journey,
              <br />
              not a destination
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Engage students. Keep them motivated with points, badges,
              profiles, progress tracking, and achievement milestones that make
              learning feel rewarding.
            </p>

            <DashedArrow className="mt-10 h-36 w-36 rotate-180 translate-x-100 rotate-x-180 text-rose-300" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-10 translate-y-8 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="bg-[#714b67] px-6 py-5 text-white">
                <div className="flex items-center gap-4">
                  <img
                    src={avatars[2]}
                    alt="Student"
                    className="h-20 w-20 rounded-full border-4 border-white object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">Joel Willis</h3>
                    <p className="text-sm text-white/70">Top learner</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[180px_1fr]">
                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <Trophy className="mx-auto h-12 w-12 text-amber-400" />
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    3,407
                  </p>
                  <p className="text-xs font-bold text-slate-400">XP POINTS</p>
                </div>

                <div className="space-y-3">
                  {[
                    "Completed lesson: Plant care",
                    "Unlocked badge: Fast learner",
                    "Passed quiz: Soil basics",
                    "Started course: Tree growth",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 text-sm"
                    >
                      <span className="font-semibold text-slate-700">
                        {item}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-amber-300">
              <span>Train</span>
            </HandUnderline>{" "}
            people. Measure results.
            <br />
            <HandUnderline color="bg-rose-300">
              <span>Drive growth.</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Evaluate attendance, progress, answers, grades, and participation.
            Use insights to improve learning and support students better.
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-10 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid min-h-[430px] lg:grid-cols-[220px_1fr]">
                <aside className="bg-[#1f2937] p-5 text-left text-white">
                  <p className="text-sm font-bold">Course results</p>

                  <div className="mt-6 space-y-2">
                    {[
                      "Attendance",
                      "Quiz answers",
                      "Certificates",
                      "Reports",
                      "Students",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-white/15 text-white"
                            : "text-white/60"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="p-7 text-left">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                      Survey and quiz feedback
                    </h3>

                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                      In progress
                    </span>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        question: "What is photosynthesis?",
                        answers: ["Energy from sunlight", "Plant watering"],
                      },
                      {
                        question: "What is the best soil for young trees?",
                        answers: ["Loose and rich soil", "Dry sand"],
                      },
                    ].map((item) => (
                      <div
                        key={item.question}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                      >
                        <p className="font-bold text-slate-900">
                          {item.question}
                        </p>

                        <div className="mt-4 space-y-2">
                          {item.answers.map((answer, index) => (
                            <div
                              key={answer}
                              className={`rounded-lg px-4 py-3 text-sm ${
                                index === 0
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-white text-slate-500"
                              }`}
                            >
                              {answer}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
                    See evaluation
                  </button>
                </div>
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
            <HandUnderline color="bg-[#02cfc3]">
              <span>right.</span>
            </HandUnderline>
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
            <HandUnderline color="bg-[#02cfc3]">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  Adon is so full of a software Army Knife. You can tailor it to
                  your business requirements. This is one of the key reasons
                  that has helped us implement Adon.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Richard Miles</p>
                    <p className="text-sm text-slate-500">Training manager</p>
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

function FloatingNote({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white py-3 pl-16 pr-8 text-sm italic text-slate-700 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-amber-400" />
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900" />
      Create courses and help learners grow
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

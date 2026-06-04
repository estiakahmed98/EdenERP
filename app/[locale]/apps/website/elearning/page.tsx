"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

function FloatingNote({ className = "", t }: { className?: string; t: any }) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-amber-400 dark:bg-amber-700" />
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900 dark:text-white" />
      {t("floatingNote.text")}
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

export default function ELearningLandingSections() {
  const t = useTranslations("pages.elearning");

  // Sidebar items
  const sidebarItems = [
    t("hero.sidebar.introduction"),
    t("hero.sidebar.lessons"),
    t("hero.sidebar.exercises"),
    t("hero.sidebar.quiz"),
    t("hero.sidebar.certificate"),
  ];

  // Lessons
  const lessons = [
    {
      number: t("hero.lessons.lesson1.number"),
      title: t("hero.lessons.lesson1.title"),
      status: t("hero.lessons.lesson1.status"),
    },
    {
      number: t("hero.lessons.lesson2.number"),
      title: t("hero.lessons.lesson2.title"),
      status: t("hero.lessons.lesson2.status"),
    },
    {
      number: t("hero.lessons.lesson3.number"),
      title: t("hero.lessons.lesson3.title"),
      status: t("hero.lessons.lesson3.status"),
    },
    {
      number: t("hero.lessons.lesson4.number"),
      title: t("hero.lessons.lesson4.title"),
      status: t("hero.lessons.lesson4.status"),
    },
  ];

  // Editor items
  const editorItems = [
    t("easyLearnSection.editor.courseLayout"),
    t("easyLearnSection.editor.lessonCard"),
    t("easyLearnSection.editor.progressBar"),
    t("easyLearnSection.editor.buttonColor"),
    t("easyLearnSection.editor.mobileView"),
    t("easyLearnSection.editor.quizOptions"),
  ];

  // Course cards
  const courseCards = [
    {
      title: t("easyLearnSection.courseCards.treeCare.title"),
      description: t("easyLearnSection.courseCards.treeCare.description"),
      image:
        "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=700&auto=format&fit=crop",
    },
    {
      title: t("easyLearnSection.courseCards.indoorPlants.title"),
      description: t("easyLearnSection.courseCards.indoorPlants.description"),
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&auto=format&fit=crop",
    },
  ];

  // Student activities
  const studentActivities = [
    t("learningJourneySection.activities.completedLesson"),
    t("learningJourneySection.activities.unlockedBadge"),
    t("learningJourneySection.activities.passedQuiz"),
    t("learningJourneySection.activities.startedCourse"),
  ];

  // Course results sidebar
  const courseResultsItems = [
    t("trainSection.sidebar.attendance"),
    t("trainSection.sidebar.quizAnswers"),
    t("trainSection.sidebar.certificates"),
    t("trainSection.sidebar.reports"),
    t("trainSection.sidebar.students"),
  ];

  // Quiz questions
  const quizQuestions = [
    {
      text: t("trainSection.quiz.question1.text"),
      answers: [
        t("trainSection.quiz.question1.answers.0"),
        t("trainSection.quiz.question1.answers.1"),
      ],
    },
    {
      text: t("trainSection.quiz.question2.text"),
      answers: [
        t("trainSection.quiz.question2.answers.0"),
        t("trainSection.quiz.question2.answers.1"),
      ],
    },
  ];

  // Features list
  const featuresList = [
    {
      title: t("featuresSection.features.quizzes.title"),
      description: t("featuresSection.features.quizzes.description"),
    },
    {
      title: t("featuresSection.features.reviews.title"),
      description: t("featuresSection.features.reviews.description"),
    },
    {
      title: t("featuresSection.features.prerequisites.title"),
      description: t("featuresSection.features.prerequisites.description"),
    },
    {
      title: t("featuresSection.features.sellCourses.title"),
      description: t("featuresSection.features.sellCourses.description"),
    },
    {
      title: t("featuresSection.features.forum.title"),
      description: t("featuresSection.features.forum.description"),
    },
  ];

  // Apps list
  const appsList = [
    {
      title: t("appsSection.apps.forum.title"),
      desc: t("appsSection.apps.forum.desc"),
      icon: MessageSquareText,
    },
    {
      title: t("appsSection.apps.survey.title"),
      desc: t("appsSection.apps.survey.desc"),
      icon: ClipboardCheck,
    },
    {
      title: t("appsSection.apps.ecommerce.title"),
      desc: t("appsSection.apps.ecommerce.desc"),
      icon: ShoppingBag,
    },
    {
      title: t("appsSection.apps.website.title"),
      desc: t("appsSection.apps.website.desc"),
      icon: MonitorSmartphone,
    },
  ];

  // Avatar images
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

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="text-rose-500 dark:text-rose-400">
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
              {t("hero.buttons.startNow")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <p
              className="absolute -right-10 top-8 hidden rotate-12 text-lg font-bold text-rose-400 dark:text-rose-500 lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("hero.availableText")}
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <span
                  className="text-xl font-bold text-[#714b67] dark:text-[#9b6a8f]"
                  style={{ fontFamily: handwrittenFont }}
                >
                  {t("hero.courseHeader.title")}
                </span>
              </div>

              <div className="grid bg-white dark:bg-slate-900 lg:grid-cols-[230px_1fr]">
                <aside className="border-r border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-5 text-left">
                  <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {t("hero.courseHeader.courseProgress")}
                    </p>

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                        <span>{t("hero.courseHeader.completed")}</span>
                        <span>{t("hero.courseHeader.percent")}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-2 w-[47%] rounded-full bg-[#714b67] dark:bg-[#8a5a7e]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {sidebarItems.map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-sm"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="bg-white dark:bg-slate-900 p-6 text-left">
                  <div className="relative overflow-hidden rounded-lg bg-[#7a4d6e] dark:bg-[#5a3854] p-8 text-white">
                    <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10 dark:bg-white/5" />

                    <p className="text-sm font-bold text-white/70">
                      {t("hero.featuredCourse.category")}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      {t("hero.featuredCourse.title")}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                      {t("hero.featuredCourse.description")}
                    </p>

                    <button className="mt-6 flex items-center gap-2 rounded-md bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]">
                      <Play className="h-4 w-4 fill-current" />
                      {t("hero.featuredCourse.continue")}
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {lessons.map((lesson, index) => (
                      <div
                        key={lesson.title}
                        className="grid grid-cols-[44px_1fr_110px] items-center rounded-lg border border-slate-100 dark:border-slate-700 px-4 py-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-[#714b67] dark:text-[#9b6a8f]">
                          {lesson.number}
                        </span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {lesson.title}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-center text-[10px] font-bold ${
                            index === 0
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                              : index === 1
                                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                                : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                          }`}
                        >
                          {lesson.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <FloatingNote className="mx-auto mt-12 z-30" t={t} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("easyLearnSection.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">
                {t("easyLearnSection.titleHighlight")}
              </span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("easyLearnSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid lg:grid-cols-[1fr_250px]">
                <div className="bg-white dark:bg-slate-900 p-7">
                  <div className="mb-5 rounded-lg bg-[#714b67] dark:bg-[#8a5a7e] px-5 py-4 text-left text-white">
                    <p className="text-sm font-bold">
                      {t("hero.featuredCourse.title")}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {courseCards.map((item, index) => (
                      <div
                        key={item.title}
                        className={`overflow-hidden rounded-xl border ${
                          index === 1
                            ? "border-[#02cfc3] dark:border-[#02cfc3]/50"
                            : "border-slate-100 dark:border-slate-700"
                        } bg-slate-50 dark:bg-slate-800/50`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 w-full object-cover"
                        />
                        <div className="p-5 text-left">
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="border-l border-slate-200 dark:border-slate-700 bg-[#171824] dark:bg-[#0f0f1a] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">
                    {t("easyLearnSection.editor.title")}
                  </p>

                  {editorItems.map((item, index) => (
                    <div key={item} className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                        <span>{item}</span>
                        <span>{index + 1}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 dark:bg-white/5">
                        <div
                          className="h-2 rounded-full bg-[#02cfc3] dark:bg-[#02cfc3]/50"
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

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="text-sky-600 dark:text-sky-400">
                  {t("learningJourneySection.title")}
                </span>
              </HandUnderline>{" "}
              {t("learningJourneySection.titleHighlight")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("learningJourneySection.description")}
            </p>

            <DashedArrow className="mt-10 h-36 w-36 rotate-180 translate-x-100 rotate-x-180 text-rose-300 dark:text-rose-600" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-10 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="bg-[#714b67] dark:bg-[#8a5a7e] px-6 py-5 text-white">
                <div className="flex items-center gap-4">
                  <img
                    src={avatars[2]}
                    alt="Student"
                    className="h-20 w-20 rounded-full border-4 border-white dark:border-slate-800 object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">
                      {t("learningJourneySection.student.name")}
                    </h3>
                    <p className="text-sm text-white/70">
                      {t("learningJourneySection.student.role")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[180px_1fr]">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-5 text-center">
                  <Trophy className="mx-auto h-12 w-12 text-amber-400 dark:text-amber-500" />
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                    {t("learningJourneySection.student.xpPoints")}
                  </p>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {t("learningJourneySection.student.xpLabel")}
                  </p>
                </div>

                <div className="space-y-3">
                  {studentActivities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg border border-slate-100 dark:border-slate-700 px-4 py-3 text-sm"
                    >
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">
                {t("trainSection.title")}
              </span>
            </HandUnderline>{" "}
            {t("trainSection.titleHighlight1")}
            <br />
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">
                {t("trainSection.titleHighlight2")}
              </span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("trainSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-10 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid min-h-105 lg:grid-cols-[220px_1fr]">
                <aside className="bg-[#1f2937] dark:bg-[#0f0f1a] p-5 text-left text-white">
                  <p className="text-sm font-bold">
                    {t("trainSection.sidebar.title")}
                  </p>

                  <div className="mt-6 space-y-2">
                    {courseResultsItems.map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-white/15 dark:bg-white/10 text-white"
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
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t("trainSection.quiz.title")}
                    </h3>

                    <span className="rounded-full bg-amber-50 dark:bg-amber-950/50 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      {t("trainSection.quiz.inProgress")}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {quizQuestions.map((item) => (
                      <div
                        key={item.text}
                        className="rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-5"
                      >
                        <p className="font-bold text-slate-900 dark:text-white">
                          {item.text}
                        </p>

                        <div className="mt-4 space-y-2">
                          {item.answers.map((answer, index) => (
                            <div
                              key={answer}
                              className={`rounded-lg px-4 py-3 text-sm ${
                                index === 0
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                  : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {answer}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                    {t("trainSection.button")}
                  </button>
                </div>
              </div>
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
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("featuresSection.highlight")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            {t("featuresSection.subtitle")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("featuresSection.subtitle")}
              </span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature) => (
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
            {t("featuresSection.seeAllFeatures")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("appsSection.needHighlight")}
              </span>
            </HandUnderline>
            , {t("appsSection.appHighlight")}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appsList.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.desc}
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
            {t("appsSection.seeAllApps")} <ArrowRight className="h-4 w-4" />
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
                alt="User avatar"
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
                {t("ctaSection.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaSection.description")}
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
                  {t("ctaSection.testimonial.quote")}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("ctaSection.testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("ctaSection.testimonial.title")}
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
              {t("getStartedSection.title")}
              <br />
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("getStartedSection.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("getStartedSection.subtitle")}
            </h2>
            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("getStartedSection.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

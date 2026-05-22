"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Handshake,
  Languages,
  Lightbulb,
  Megaphone,
  MessageSquareText,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const STATS = [
  { value: "70+", label: "Languages supported" },
  { value: "800+", label: "Community translators" },
  { value: "1,400+", label: "Strings translated" },
];

const languages = [
  { name: "English", progress: 100, flag: "🇺🇸" },
  { name: "Spanish", progress: 94, flag: "🇪🇸" },
  { name: "French", progress: 88, flag: "🇫🇷" },
  { name: "German", progress: 82, flag: "🇩🇪" },
  { name: "Portuguese", progress: 78, flag: "🇵🇹" },
  { name: "Italian", progress: 74, flag: "🇮🇹" },
  { name: "Chinese (Simplified)", progress: 68, flag: "🇨🇳" },
  { name: "Japanese", progress: 62, flag: "🇯🇵" },
  { name: "Dutch", progress: 57, flag: "🇳🇱" },
  { name: "Russian", progress: 52, flag: "🇷🇺" },
  { name: "Arabic", progress: 47, flag: "🇸🇦" },
  { name: "Turkish", progress: 41, flag: "🇹🇷" },
];

const benefits = [
  {
    icon: Globe2,
    title: "Reach a global audience",
    description:
      "Make Adon ERP accessible to users in their native language, opening doors to markets around the world.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Join a vibrant community",
    description:
      "Collaborate with hundreds of passionate translators who share knowledge, best practices, and encouragement.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: BadgeCheck,
    title: "Earn contributor recognition",
    description:
      "Qualified contributors receive official badges, community shoutouts, and invitations to translator events.",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    icon: Rocket,
    title: "Improve user experience",
    description:
      "High-quality translations directly impact how intuitive and delightful Adon ERP feels for non-English speakers.",
    gradient: "from-purple-500 to-indigo-600",
  },
];

const features = [
  "Built-in translation editor",
  "Real-time string updates",
  "Terminology glossary",
  "Plural & gender-aware",
  "Community voting system",
  "Continuous quality checks",
];

const workSteps = [
  {
    step: "01",
    title: "Pick your language",
    description:
      "Browse available language teams and find one that needs your expertise — or start a new one.",
    icon: Search,
  },
  {
    step: "02",
    title: "Translate & review",
    description:
      "Use the web-based editor to work on strings, consult the glossary, and collaborate with fellow translators.",
    icon: Languages,
  },
  {
    step: "03",
    title: "Get it validated",
    description:
      "Community validators and language leads review merged strings before they ship to production.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Ship to the world",
    description:
      "Once validated, your translations go live with every Adon ERP release — reaching millions of users.",
    icon: Globe2,
  },
];

const testimonials = [
  {
    quote:
      "Translating Adon ERP into Bengali has been one of the most rewarding open-source contributions I've ever made. The tooling makes it genuinely enjoyable.",
    name: "Rafi Hossain",
    role: "Bengali Language Team Lead",
    avatar: "RH",
  },
  {
    quote:
      "The community is welcoming, the editor is excellent, and knowing our work is used daily by thousands makes every session feel worth it.",
    name: "Lena Kowalska",
    role: "Polish Translator & Reviewer",
    avatar: "LK",
  },
];

const topContributors = [
  { name: "Rafi Hossain", role: "Bengali Lead", strings: 284, badge: "gold" },
  { name: "Lena Kowalska", role: "Polish Lead", strings: 221, badge: "gold" },
  { name: "Tiago Nascimento", role: "Portuguese Lead", strings: 198, badge: "gold" },
  { name: "Yuki Tanaka", role: "Japanese Lead", strings: 176, badge: "silver" },
  { name: "Sam Kipchirchir", role: "Swahili Lead", strings: 143, badge: "silver" },
  { name: "Ana López", role: "Spanish Lead", strings: 131, badge: "silver" },
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
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
      <span className="text-cyan-500">{icon}</span>
      {label}
    </div>
  );
}

export default function TranslationsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const [activeLang, setActiveLang] = useState<string | null>(null);

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#f0f9ff_18%,_#ffffff_100%)] text-slate-800">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(6,182,212,0.13),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(59,130,246,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(240,249,255,1)_30%,rgba(255,255,255,1)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <motion.div
            className="max-w-xl space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionEyebrow
              icon={<Languages className="h-4 w-4" />}
              label="Community Translations"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Collaborate / Translations
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Help us make Adon ERP
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Speak Every
                  <br />
                  Language
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Join our global community of translators and make Adon ERP
                accessible to users in their native language — one string at a
                time.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#languages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start Translating
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                How It Works
              </Link>
            </div>

            {/* Trust badge */}
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-cyan-500">&quot;</div>
              <p className="text-base leading-7 text-slate-700">
                The translation platform has been a joy to use. Clear context,
                helpful glossary, and a welcoming community — it feels like the
                project actually cares about quality.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">
                    Carlos Mendez
                  </p>
                  <p className="text-sm text-slate-500">
                    Spanish Language Lead
                  </p>
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — language globe card */}
          <motion.div
            className="relative mx-auto flex w-full max-w-xl items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              heroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.88 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-cyan-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-blue-100 blur-3xl" />

            <div className="relative h-[28rem] w-full overflow-hidden rounded-[2.5rem] border-8 border-white shadow-[0_40px_100px_rgba(15,23,42,0.16)] bg-[linear-gradient(135deg,#f0f9ff_0%,#ffffff_50%,#eef2ff_100%)]">
              <div className="absolute inset-0">
                {/* Globe dots */}
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-cyan-500/[0.04] p-6 shadow-inner">
                  <div className="grid h-full grid-cols-8 gap-2.5">
                    {Array.from({ length: 72 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-xs ${
                          [
                            "bg-cyan-200/60",
                            "bg-blue-200/60",
                            "bg-indigo-200/60",
                            "bg-cyan-300/60",
                            "bg-blue-300/60",
                            "bg-cyan-100/80",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Speech bubbles */}
                <div className="absolute bottom-16 left-12 h-20 w-24 rounded-[1.5rem] rounded-bl-none bg-cyan-200 shadow-lg" />
                <div className="absolute bottom-20 left-[7.5rem] h-16 w-20 rounded-[1.5rem] rounded-bl-none bg-blue-200 shadow-lg" />
                <div className="absolute bottom-12 right-10 h-24 w-24 rounded-[1.5rem] rounded-br-none bg-indigo-200 shadow-lg" />
                <div className="absolute bottom-6 right-[7.5rem] h-14 w-14 rounded-[1.5rem] rounded-br-none bg-cyan-300 shadow-lg" />

                {/* Floating dots */}
                <div className="absolute top-28 left-16 h-5 w-5 rounded-full bg-cyan-400 shadow-md" />
                <div className="absolute top-40 right-20 h-4 w-4 rounded-full bg-blue-400 shadow-md" />
                <div className="absolute bottom-36 left-[4.5rem] h-4 w-4 rounded-full bg-indigo-400 shadow-md" />
                <div className="absolute bottom-28 right-[5.5rem] h-3.5 w-3.5 rounded-full bg-purple-400 shadow-md" />
              </div>

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-600">
                    <Globe2 className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ WHY TRANSLATE ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Why translate"
          />
          <ScriptHeading className="mt-6">
            Make Adon ERP
            <br />
            speak your language
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Every translation goes directly into production. Your words help
            thousands of businesses around the world use Adon ERP with
            confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-[0.030] transition-opacity duration-300 group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-md shadow-cyan-500/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ HOW IT WORKS ═════════════════════ */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Lightbulb className="h-4 w-4" />}
            label="Getting started"
          />
          <ScriptHeading className="mt-6">
            From zero to
            <br />
            published in four steps
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Our guided workflow makes contributing translations simple for
            first-timers and efficient for seasoned editors alike.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 shadow-sm">
                  <Icon className="h-6 w-6 text-cyan-600" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ PLATFORM FEATURES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-slate-50/50 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Rocket className="h-4 w-4" />}
            label="Built for contributors"
          />
          <ScriptHeading className="mt-6">
            A platform that
            <br />
            respects your time
          </ScriptHeading>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <MessageSquareText className="h-5 w-5 text-cyan-600" />
              </div>
              <span className="text-sm font-medium text-slate-800">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Editor mock */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-semibold text-slate-800">
                Translation Editor
              </span>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              Auto-save on
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-2">
            {[
              { label: "English (Source)", text: "Start your free trial today.", flag: "🇺🇸" },
              { label: "Spanish", text: "Empieza tu prueba gratuita hoy.", flag: "🇪🇸" },
              { label: "French", text: "Commencez votre essai gratuit aujourd’hui.", flag: "🇫🇷" },
              { label: "German", text: "Starten Sie noch heute Ihre kostenlose Testversion.", flag: "🇩🇪" },
            ].map((row, idx) => (
              <div
                key={row.label}
                className={`flex flex-col gap-1 px-6 py-4 ${
                  idx % 2 === 0 ? "border-r border-slate-100" : ""
                } ${
                  idx < 2 ? "" : "border-t border-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{row.flag}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {row.label}
                  </span>
                </div>
                <p className="text-sm text-slate-700">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ PROGRESS ═════════════════════ */}
      <section id="languages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Globe2 className="h-4 w-4" />}
            label="Language coverage"
          />
          <ScriptHeading className="mt-6">
            Every language
            <br />
            matters
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            See how far each language team has come. Pick a language and
            contribute to bring it to 100%.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.04, 0.35),
              }}
              viewport={{ once: true, amount: 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {lang.name}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold ${
                    lang.progress === 100
                      ? "text-emerald-600"
                      : lang.progress > 70
                        ? "text-cyan-600"
                        : lang.progress > 40
                          ? "text-amber-600"
                          : "text-rose-600"
                  }`}
                >
                  {lang.progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.progress}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.04,
                  }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${
                    lang.progress === 100
                      ? "bg-emerald-500"
                      : lang.progress > 70
                        ? "bg-cyan-500"
                        : lang.progress > 40
                          ? "bg-amber-500"
                          : "bg-rose-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ TOP CONTRIBUTORS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Community leaders"
          />
          <ScriptHeading className="mt-6">
            Our top contributors
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            These amazing community members have led their language teams to
            some of the highest completion rates across the platform.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topContributors.map((contributor, index) => (
            <motion.div
              key={contributor.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 text-sm font-black text-white">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {contributor.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        contributor.badge === "gold"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {contributor.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{contributor.role}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-sm font-bold text-cyan-600">
                      {contributor.strings}+
                    </span>
                    <span className="text-xs text-slate-400">
                      strings contributed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ TESTIMONIALS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Users className="h-4 w-4" />}
            label="Translator voices"
          />
          <ScriptHeading className="mt-6">
            Voices from
            <br />
            the community
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-cyan-100/40 blur-3xl" />
              <div className="relative space-y-5">
                <p className="text-base leading-8 text-slate-700">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-1 text-cyan-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-600 text-sm font-black text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ CTA ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-slate-900 via-cyan-900 to-blue-900 px-6 py-16 text-center shadow-[0_50px_130px_rgba(15,23,42,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-cyan-500/25 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Languages className="h-8 w-8 text-cyan-300" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              Your language is
              <br />
              waiting to be heard
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-cyan-100/80">
              Join the Adon ERP translation community and help millions of users
              experience the platform in their own voice.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-cyan-900 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                Start translating
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/community/get-services/find-partner"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Handshake className="h-4 w-4" />
                Find a Language Lead
              </Link>
            </div>

            <p className="mt-6 text-sm text-cyan-200/60">
              Free to join · No experience needed · Community-driven
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe2,
  Mail,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Users,
  WandSparkles,
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
];

const features = [
  {
    title: "Voice Transcription",
    description:
      "Effortlessly record, transcribe, summarize, and organize conversations.",
  },
  {
    title: "AI fields",
    description:
      "Create summaries, tags, and smart labels from text records instantly.",
  },
  {
    title: "AI chatter assistant",
    description:
      "Chat with AI inside Adon, preparing replies, summaries, and next steps.",
  },
  {
    title: "Email template",
    description:
      "Transform AI-written drafts into professional emails in seconds.",
  },
  {
    title: "Web page content",
    description:
      "Generate website copy, product descriptions, and marketing text.",
  },
  {
    title: "Livechat",
    description: "Answer website visitors faster with AI-assisted responses.",
  },
];

const apps = [
  { title: "CRM", description: "Smart sales recommendations", icon: Brain },
  { title: "Website", description: "AI content creation", icon: Globe2 },
  {
    title: "Documents",
    description: "AI-powered document analysis",
    icon: FileText,
  },
  {
    title: "Project",
    description: "Generate project summaries",
    icon: ClipboardList,
  },
  {
    title: "Sales",
    description: "AI pricing and forecasting",
    icon: BarChart3,
  },
];

export default function AIPoweredAppsLandingPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Your apps.{" "}
            <HandUnderline color="bg-sky-300">
              <span className="text-sky-500">AI-powered</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Adon Artificial Intelligence turns your everyday data into smarter
            decisions, faster workflows, and better results.
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
            <div className="absolute -left-10 -top-10 hidden text-sky-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex h-64 items-center justify-center bg-linear-to-r from-slate-950 via-slate-900 to-slate-800">
                <div className="relative">
                  <div className="absolute -left-8 -top-8 text-amber-400">
                    <Sparkles className="h-8 w-8 rotate-[-15" />
                  </div>

                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white shadow-2xl">
                    <span className="bg-linear-to-r from-[#714b67] via-amber-400 to-sky-500 bg-clip-text text-5xl font-black text-transparent">
                      AI
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-40 bg-white" />

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span>Automate</span>
            </HandUnderline>{" "}
            the work that slows you down
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              ["Data entry", "-75%", "time wasted on paperwork"],
              ["Email replies", "-60%", "manual follow-ups"],
              ["Invoice matching", "-85%", "processing time"],
              ["Lead scoring", "+90%", "sales team efficiency"],
              ["Document search", "25%", "less admin workload"],
              ["Data quality", "15%", "reduction in errors"],
            ].map(([label, value, description], index) => (
              <div
                key={label}
                className="relative rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
                    {label}
                  </span>

                  {index % 3 === 0 ? (
                    <Bot className="h-7 w-7 text-sky-500" />
                  ) : index % 3 === 1 ? (
                    <Brain className="h-7 w-7 text-amber-500" />
                  ) : (
                    <Zap className="h-7 w-7 text-rose-500" />
                  )}
                </div>

                <p className="text-center text-4xl font-black text-slate-900">
                  {value}
                </p>

                <p className="mt-2 text-center text-sm font-bold text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300">
              <span>Agents</span>
            </HandUnderline>{" "}
            on your terms
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            Set up your AI assistant, define tasks, configure permissions, and
            let it work inside your apps.
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-10 flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 text-lg font-bold text-rose-500">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-900">Create your agent</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Define role, tools, access, and what this assistant can do.
                  </p>
                </div>
              </div>

              <div className="mb-10 flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 text-lg font-bold text-rose-500">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-900">Configure it</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Train it with documents, workflow rules, and business data.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <span className="absolute -left-10 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 text-lg font-bold text-rose-500">
                3
              </span>

              <p className="mb-5 font-bold text-slate-900">
                Get tailored responses
              </p>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Compliance Assistant
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  I found the required policy, summarized the risk, and prepared
                  a reply for approval.
                </p>
              </div>

              <div className="mt-5 rounded-lg bg-[#e9fbf8] p-4">
                <p className="text-sm font-bold text-slate-900">
                  AI generated answer
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Based on your company rules, this customer request can be
                  accepted with a manager validation.
                </p>
              </div>
            </div>

            <DashedArrow className="absolute left-1/2 top-28 hidden h-28 w-28 rotate-80 text-[#714b67]/50 lg:block" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Let AI drive the{" "}
              <HandUnderline color="bg-sky-300">
                <span>next move</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600">
              From everyday manual work to smart business recommendations, AI
              can suggest actions, summarize records, and move work forward.
            </p>

            <p
              className="mt-10 text-2xl font-bold text-sky-500"
              style={{ fontFamily: handwrittenFont }}
            >
              Use case
              <br />
              Prep a quote for a big client
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100" />

            <div className="relative z-10 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow ring-1 ring-slate-100">
                  <span className="bg-linear-to-r from-[#714b67] via-amber-400 to-sky-500 bg-clip-text text-2xl font-black text-transparent">
                    AI
                  </span>
                </span>
                <p className="font-bold text-slate-900">Draft sales proposal</p>
              </div>

              <div className="space-y-3">
                {[
                  "Customer context analyzed",
                  "Quote items suggested",
                  "Email draft prepared",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                Apply suggestion
              </button>
            </div>

            <DashedArrow className="absolute right-0 top-12 z-20 h-24 w-24 rotate-210 text-[#714b67]/50" />
            <DashedArrow className="absolute bottom-8 left-0 z-20 h-24 w-24 rotate-20 text-[#714b67]/50" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Zap className="mb-6 h-12 w-12 text-amber-500" />

          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <span className="relative inline-block px-2">
              <span className="relative z-10">Instant</span>
              <span className="absolute inset-x-0 bottom-2 h-6 rounded-lg bg-amber-300" />
            </span>{" "}
            business insights
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            Ask your data what matters. AI turns business questions into instant
            reporting and visual analytics.
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl bg-white p-8">
            <div className="flex h-80 items-end gap-4 border-b border-slate-200">
              {[45, 52, 48, 65, 80, 110, 155, 230].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div className="w-full bg-[#02cfc3]" style={{ height }} />
                  <div
                    className="w-full bg-rose-400"
                    style={{ height: height * 0.45 }}
                  />
                  <div
                    className="w-full bg-amber-400"
                    style={{ height: height * 0.3 }}
                  />
                  <p className="mt-3 text-xs font-bold text-slate-400">
                    A{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Next-level organization.
            <br />
            Next-level{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>organization</span>
            </HandUnderline>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            Documents, tasks, emails, and records become searchable, organized,
            and easier to act on with AI.
          </p>

          <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[300px_1fr]">
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#02cfc3]/10 text-[#02a6a6]">
                <FileText className="h-8 w-8" />
              </div>

              <p
                className="mt-5 text-xl font-bold text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Upload files
              </p>
            </div>

            <div className="space-y-4">
              {[
                "AI detected document type",
                "AI extracted important fields",
                "AI suggested next action",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-5 py-4"
                >
                  <span className="font-bold text-slate-700">{item}</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              ))}
            </div>

            <DashedArrow className="absolute left-[260px] top-20 hidden h-24 w-24 rotate-[260 text-[#714b67]/50 lg:block" />
          </div>

          <p
            className="mt-12 text-center text-lg font-bold text-amber-500"
            style={{ fontFamily: handwrittenFont }}
          >
            Be useful! There is work!!!
          </p>
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
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  The processing time for accounting documents prior to analysis
                  is now reduced dramatically with AI automation.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Mike Solutions</p>
                    <p className="text-sm text-slate-500">Operations manager</p>
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

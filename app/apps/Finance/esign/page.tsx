"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  CirclePlay,
  Clock,
  FileCheck2,
  FileSignature,
  Fingerprint,
  Grid3X3,
  KeyRound,
  Lock,
  Mail,
  PenLine,
  Repeat,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const features = [
  {
    title: "Draw or upload signature",
    description:
      "Let signers draw, type, or upload their signature with a clean guided experience.",
    icon: PenLine,
  },
  {
    title: "Cryptographic traceability",
    description:
      "Every action is logged securely with IP, timestamp, signer identity, and audit trail.",
    icon: ShieldCheck,
  },
  {
    title: "SMS authentication",
    description:
      "Verify signers with one-time codes before they access sensitive agreements.",
    icon: Smartphone,
  },
  {
    title: "Signing order",
    description:
      "Define who signs first, second, and last with automatic workflow routing.",
    icon: Workflow,
  },
  {
    title: "Automatic reminders",
    description:
      "Send polite follow-ups to pending signers without manual tracking.",
    icon: Bell,
  },
  {
    title: "Legal validation",
    description:
      "Keep completed documents archived with proof-ready signing evidence.",
    icon: BadgeCheck,
  },
];

const apps = [
  { title: "Accounting", desc: "Sign vendor and client documents", icon: FileCheck2 },
  { title: "Sales", desc: "Close contracts faster", icon: Send },
  { title: "Recruitment", desc: "Sign hiring documents", icon: Users },
  { title: "Documents", desc: "Archive signed agreements", icon: FileSignature },
  { title: "Field Service", desc: "Collect signatures on-site", icon: Smartphone },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
      <span className="text-cyan-500">{icon}</span>
      {label}
    </div>
  );
}

function EsignDashboard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileSignature className="h-5 w-5 text-cyan-600" />
          <span className="text-sm font-semibold text-slate-800">
            Eden Sign
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-700">
            Live
          </span>
          <Lock className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="grid min-h-[360px] md:grid-cols-[210px_1fr]">
        <aside className="border-r border-slate-100 bg-slate-50 p-4">
          {["Dashboard", "To Sign", "Waiting", "Completed", "Templates"].map(
            (item, index) => (
              <div
                key={item}
                className={`mb-2 rounded-xl px-3 py-2 text-sm ${
                  index === 1
                    ? "bg-cyan-100 font-semibold text-cyan-700"
                    : "text-slate-600"
                }`}
              >
                {item}
              </div>
            )
          )}
        </aside>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          {["Draft", "Waiting Signature", "Signed"].map((column, index) => (
            <div key={column} className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{column}</p>
                <span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
                  {index + 3}
                </span>
              </div>

              <div className="space-y-3">
                {["Service Agreement", "NDA Contract", "Offer Letter"].map(
                  (item, i) => (
                    <div
                      key={`${column}-${item}-${i}`}
                      className="rounded-xl bg-white p-3 text-left shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-800">
                        {item}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {index === 2 ? "Completed" : "Needs action"}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-200">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600" />
      </button>
    </div>
  );
}

export default function EsignPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.12),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Secure digital signature"
            icon={<FileSignature className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1
              style={{
                fontFamily:
                  '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
              }}
              className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            >
              eSign.{" "}
              <span
                className="text-cyan-600"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                Reinvented.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Send, sign, and manage business agreements inside Eden ERP with
              secure workflows, reminders, audit trails, and one-click approvals.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#advisor"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700"
            >
              Meet an advisor
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <EsignDashboard />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600" />
              Instant workflow
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600" />
              Legally traceable
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            Simplify it,
            <br />
            automate it,
            <br />
            <span className="text-cyan-600">sign it</span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Drag and drop signature fields, assign recipients, set signing
            order, and let Eden ERP handle reminders, tracking, and final
            archiving.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Prepare agreements with reusable templates",
              "Automatically notify every signer",
              "Archive signed documents in the right workspace",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-slate-900">
                Service agreement
              </p>
              <div className="space-y-3">
                <div className="h-3 rounded bg-slate-200" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-3 w-4/6 rounded bg-slate-200" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-dashed border-cyan-300 bg-cyan-50 p-4 text-center text-sm font-semibold text-cyan-700">
                  Signature 1
                </div>
                <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700">
                  Signature 2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-white" />
            <div className="relative mx-auto max-w-xs rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-4 text-sm font-semibold text-slate-900">
                  Adopt your signature
                </p>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs text-slate-500">Full name</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Katie Cole
                  </p>

                  <div
                    className="mt-5 rounded-xl border border-dashed border-cyan-300 bg-cyan-50 p-4 text-center text-2xl text-cyan-700"
                    style={{
                      fontFamily:
                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                    }}
                  >
                    Katie Cole
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white">
                  Sign
                </button>
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow
              label="Sign from anywhere"
              icon={<Smartphone className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              Whenever,
              <br />
              wherever
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Clients and teammates can review and sign agreements from any
              device. No printing, scanning, or back-and-forth email chaos.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Mobile ready", "One-click signing", "Secure identity check", "Instant confirmation"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label="Signing control"
            icon={<Workflow className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Your signing process
            <br />
            under <span className="text-cyan-600">control</span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Track every request, recipient, deadline, reminder, and completion
            status from one clean signing dashboard.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Waiting for signature", "12", "cyan"],
              ["Reminder sent", "7", "amber"],
              ["Completed", "42", "emerald"],
              ["Expired", "2", "rose"],
            ].map(([label, count, color]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{label}</p>
                <p
                  className={`mt-3 text-4xl font-bold ${
                    color === "cyan"
                      ? "text-cyan-600"
                      : color === "amber"
                        ? "text-amber-600"
                        : color === "emerald"
                          ? "text-emerald-600"
                          : "text-rose-600"
                  }`}
                >
                  {count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            All the features
            <br />
            done right.
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.6rem] border border-white bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
          >
            See all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          One <HandUnderline color="bg-sky-400">need</HandUnderline>, one{" "}
          <HandUnderline color="bg-sky-400">app</HandUnderline>.
        </ScriptHeading>
        <p className="mt-3 max-w-xl text-slate-600">
          Expand your signing workflow across the Eden ERP ecosystem.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-cyan-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{app.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className={`absolute rounded-3xl ${
                  index % 3 === 0
                    ? "h-12 w-12 bg-cyan-200"
                    : index % 3 === 1
                      ? "h-10 w-10 bg-slate-200"
                      : "h-14 w-14 bg-emerald-100"
                }`}
                style={{
                  top: `${(index * 17) % 88}%`,
                  left: `${(index * 29) % 92}%`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern teams
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600">
              Teams use Eden Sign to close agreements faster, reduce paperwork,
              and keep every signature traceable.
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-cyan-600" />

        <ScriptHeading>
          Unleash
          <br />
          your growth potential
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Replace manual signing with a secure, automated, and beautifully simple
          agreement workflow inside Eden ERP.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            id="advisor"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700"
          >
            Contact Sales
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Free trial available · No credit card required · Instant access
        </p>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  CirclePlay,
  Clock,
  Cloud,
  Database,
  File,
  FileCheck2,
  FileSignature,
  FolderKanban,
  Grid3X3,
  Inbox,
  Lock,
  Mail,
  MessageSquare,
  PenLine,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const features = [
  {
    title: "Split PDFs",
    description:
      "Separate contracts, invoices, and forms into clean documents in seconds.",
    icon: File,
  },
  {
    title: "Auto folder rules",
    description:
      "Route files to the right workspace using tags, clients, projects, and teams.",
    icon: FolderKanban,
  },
  {
    title: "Smart search",
    description:
      "Find any document by title, content, owner, client, or approval status.",
    icon: Search,
  },
  {
    title: "Secure sharing",
    description:
      "Share files with role-based permissions, expiry links, and audit trails.",
    icon: Lock,
  },
  {
    title: "E-sign workflows",
    description:
      "Send, sign, approve, and archive documents without leaving Adon ERP.",
    icon: FileSignature,
  },
  {
    title: "Activity insights",
    description:
      "Track views, approvals, comments, and document performance in one place.",
    icon: BarChart3,
  },
];

const apps = [
  { title: "CRM", desc: "Client files and proposals", icon: Users },
  { title: "Projects", desc: "Tasks, briefs, and docs", icon: Grid3X3 },
  { title: "Accounting", desc: "Bills and statements", icon: FileCheck2 },
  { title: "HR", desc: "Employee documents", icon: BadgeCheck },
  { title: "Helpdesk", desc: "Tickets and attachments", icon: MessageSquare },
  { title: "Approvals", desc: "Review and sign-off flows", icon: ShieldCheck },
];

const documentTypes = [
  { title: "Email", icon: Mail },
  { title: "Scan", icon: UploadCloud },
  { title: "Files", icon: File },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100 ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-orange-950/40 dark:text-orange-200 dark:ring-orange-900/60">
      <span className="text-orange-500 dark:text-orange-300">{icon}</span>
      {label}
    </div>
  );
}

function DocumentDashboard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-orange-600" />
          <span className="text-sm font-semibold text-slate-800">
            Adon Documents
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400" />
          <Bell className="h-4 w-4 text-slate-400" />
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
            Synced
          </span>
        </div>
      </div>

      <div className="grid min-h-[360px] md:grid-cols-[210px_1fr_240px]">
        <aside className="border-r border-slate-100 bg-slate-50 p-4">
          <div className="space-y-2">
            {["Inbox", "Contracts", "Invoices", "HR Files", "Shared", "Archive"].map(
              (item, index) => (
                <div
                  key={item}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    index === 0
                      ? "bg-orange-100 font-semibold text-orange-700"
                      : "text-slate-600"
                  }`}
                >
                  <span>{item}</span>
                  <span className="text-xs">{index === 0 ? "24" : index + 3}</span>
                </div>
              )
            )}
          </div>
        </aside>

        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Client contract", "Ready for signature", "orange"],
              ["Supplier invoice", "Auto-classified", "emerald"],
              ["HR onboarding", "Needs approval", "cyan"],
              ["Project brief", "Shared with team", "violet"],
            ].map(([title, status, color]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div
                  className={`mb-4 h-24 rounded-xl bg-linear-to-br ${
                    color === "orange"
                      ? "from-orange-100 to-amber-50"
                      : color === "emerald"
                        ? "from-emerald-100 to-teal-50"
                        : color === "cyan"
                          ? "from-cyan-100 to-sky-50"
                          : "from-violet-100 to-purple-50"
                  }`}
                />
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{status}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden border-l border-slate-100 bg-slate-950 p-4 text-white md:block">
          <p className="text-sm font-semibold">Preview</p>
          <div className="mt-4 rounded-2xl bg-white p-4">
            <div className="space-y-2">
              <div className="h-3 rounded bg-slate-200" />
              <div className="h-3 w-3/4 rounded bg-slate-200" />
              <div className="mt-5 h-24 rounded-xl bg-slate-100" />
              <div className="h-3 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {["Owner: Finance", "Status: Review", "Access: Private"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </aside>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-200">
        <CirclePlay className="h-7 w-7 fill-orange-600 text-orange-600" />
      </button>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(249,115,22,0.14),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(6,182,212,0.1),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label="Smart document management"
            icon={<Cloud className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Files organized.{" "}
              <span
                className="text-orange-500"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                Time saved.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Adon ERP Documents gives your team one secure hub to scan, store,
              approve, sign, share, and find every business file.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-orange-300 hover:text-orange-700"
            >
              Watch Demo
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <DocumentDashboard />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-orange-600" />
              Auto-classified
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-lg md:flex">
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600" />
              Secure archive
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Your{" "}
          <span className="rounded-xl bg-orange-100 px-2 text-orange-600">
            document hub
          </span>
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Bring every file into one intelligent workspace. Capture documents
          from email, scanning, uploads, clients, teams, and ERP workflows.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {documentTypes.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-4 font-semibold text-slate-900">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="grid gap-5 md:grid-cols-[1fr_1.2fr_1fr]">
            <div className="space-y-4">
              {["Payment slip", "Contract file"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left"
                >
                  <p className="font-semibold text-slate-900">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Captured from email
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.7rem] bg-slate-50 p-4">
              <div className="mx-auto max-w-xs rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">Document inbox</span>
                  <Inbox className="h-4 w-4 text-orange-500" />
                </div>
                <div className="space-y-3">
                  {["Invoice", "Agreement", "Receipt", "Approval note"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {["Client doc", "Signed certificate"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left"
                >
                  <p className="font-semibold text-slate-900">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Ready to archive
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-slate-100" />
          <div className="relative mx-auto max-w-xs rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="mb-4 text-sm font-semibold text-slate-900">
                Signature request
              </p>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="mt-3 h-24 rounded-xl bg-slate-100" />
                <div className="mt-4 rounded-xl border border-dashed border-cyan-300 bg-cyan-50 p-3 text-center text-sm font-semibold text-cyan-700">
                  Signature
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white">
                Sign & Send
              </button>
            </div>
          </div>
        </div>

        <div>
          <SectionEyebrow
            label="Digital signing"
            icon={<PenLine className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            Print, sign, scan?
            <br />
            Sign online!
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Send contracts, offers, approvals, and agreements for signature.
            Adon ERP keeps every signed document attached to the right client,
            task, or project.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Send signature requests in one click",
              "Track signed, pending, and expired documents",
              "Automatically archive completed files",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center gap-3">
          {[Cloud, FolderKanban, FileCheck2].map((Icon, index) => (
            <div
              key={index}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-emerald-100 text-cyan-700"
            >
              <Icon className="h-6 w-6" />
            </div>
          ))}
        </div>

        <ScriptHeading>Organization is the key</ScriptHeading>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Keep departments, clients, tasks, and approvals connected. Your team
          always knows where every file belongs and what needs action.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 bg-white p-5 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
          <div className="grid gap-4 md:grid-cols-4">
            {["Inbox", "In Review", "Waiting Signature", "Approved"].map(
              (column, index) => (
                <div key={column} className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {column}
                    </p>
                    <span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
                      {index + 3}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {["Invoice", "Proposal", "Agreement"].map((card, i) => (
                      <div
                        key={`${column}-${card}-${i}`}
                        className="rounded-xl bg-white p-3 text-left shadow-sm"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {card}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Client workspace
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label="Team collaboration"
            icon={<Users className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            The art of effective{" "}
            <span className="text-cyan-600">collaboration</span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Discuss documents with teammates, assign ownership, request
            approvals, and keep all comments connected to the file.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Comments", "Approvals", "Mentions", "Access control"].map(
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

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Website contract draft
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Please review the pricing section before sending it to the
                client.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Sarah", "Approved the final terms"],
                ["Nadim", "Added missing client attachment"],
                ["Emma", "Requested signature from client"],
              ].map(([name, comment]) => (
                <div
                  key={name}
                  className="rounded-xl bg-white px-4 py-3 text-left shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-500">{comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionEyebrow
              label="Time-saving tool"
              icon={<Clock className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">Time-saving tool</ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Measure exactly how much time your team saves by automating
              capture, routing, signing, approvals, and archiving.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["Manual file sorting", "42h saved/month"],
                ["Signature follow-up", "18h saved/month"],
                ["Approval tracking", "31h saved/month"],
                ["Searching documents", "24h saved/month"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="text-orange-600">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-3/4 rounded-full bg-linear-to-r from-orange-500 to-amber-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Average search time</p>
              <p className="mt-3 text-5xl font-bold text-slate-950">40.9</p>
              <p className="mt-2 text-sm text-slate-500">seconds saved per file</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Automation accuracy</p>
              <p className="mt-3 text-5xl font-bold text-slate-950">90.4%</p>
              <p className="mt-2 text-sm text-slate-500">classification success</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2">
              <p className="mb-4 font-semibold text-slate-900">
                How does document automation work?
              </p>

              <div className="space-y-3">
                {[
                  "Upload or scan a document",
                  "Adon ERP identifies the type and owner",
                  "The file is routed to the right workflow",
                  "Approvals, signatures, and archive rules run automatically",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
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
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
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
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
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

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-orange-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-orange-50 to-cyan-50 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 28 }).map((_, index) => (
              <div
                key={index}
                className={`absolute rounded-3xl ${
                  index % 3 === 0
                    ? "h-12 w-12 bg-orange-200"
                    : index % 3 === 1
                      ? "h-10 w-10 bg-slate-200"
                      : "h-14 w-14 bg-cyan-100"
                }`}
                style={{
                  top: `${(index * 17) % 88}%`,
                  left: `${(index * 29) % 92}%`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join modern teams
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600">
              Teams use Adon ERP Documents to organize operations, reduce file
              chaos, and move work forward faster.
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
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-orange-600" />

        <ScriptHeading>
          Rediscover bliss
          <br />
          in your work
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
          Replace scattered folders with a secure, searchable, automated
          document workspace inside Adon ERP.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-orange-300 hover:text-orange-700"
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

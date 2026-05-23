"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  Command,
  Copy,
  ExternalLink,
  ForkKnife,
  GitBranch,
  GitFork,
  Globe2,
  Handshake,
  Lightbulb,
  MessageSquareText,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  Terminal,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const STATS = [
  { value: "12K+", label: "GitHub Stars" },
  { value: "3K+", label: "Contributors" },
  { value: "180+", label: "Countries" },
];

const FEATURES = [
  {
    icon: Code2,
    title: "Open-source codebase",
    description:
      "Browse the full source code under a permissive license. Understand exactly how things work and propose improvements.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: GitFork,
    title: "Fork & build freely",
    description:
      "Clone, fork, and tailor the platform to your needs — whether you are building a module, an integration, or an entire vertical.",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Power the community",
    description:
      "Your patches and features ship to thousands of businesses. Every line of code you contribute has real-world impact.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Ship faster together",
    description:
      "Collaborate with developers, designers, and product folks on issues, RFCs, and pull requests — with tooling built for async teamwork.",
    gradient: "from-violet-500 to-purple-600",
  },
];

const workSteps = [
  {
    step: "01",
    title: "Browse open issues",
    description:
      "Find an issue tagged good-first-issue or feature-request. Our curated issue boards make discovery fast.",
    icon: Search,
  },
  {
    step: "02",
    title: "Fork & branch",
    description:
      "Fork the repo, create a focused branch, and start building. Our CONTRIBUTING guide covers every step.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Open a pull request",
    description:
      "Share your changes with the maintainer team. Clear PR templates and automated CI checks keep reviews smooth.",
    icon: ForkKnife,
  },
  {
    step: "04",
    title: "Ship & celebrate",
    description:
      "Once merged, your code ships to users worldwide. Earn contributor badges, changelog mentions, and community recognition.",
    icon: Rocket,
  },
];

const activePRs = [
  {
    summary: "Inventory: barcode lookahead validation",
    tags: ["in-progress", "review"],
    author: "Omar Y.",
    comments: 4,
  },
  {
    summary: "Accounting: auto-reconciliation engine",
    tags: ["approved"],
    author: "Aisha K.",
    comments: 12,
  },
  {
    summary: "Website: new elearning course player",
    tags: ["in-progress"],
    author: "Jules P.",
    comments: 8,
  },
  {
    summary: "CRM: bulk-import lead scoring",
    tags: ["draft"],
    author: "Nadia R.",
    comments: 2,
  },
];

const featuredContributors = [
  { name: "Omar Yousef", commits: 342, prs: 47, badge: "gold" },
  { name: "Aisha Karim", commits: 289, prs: 38, badge: "gold" },
  { name: "Lena Kowalska", commits: 204, prs: 31, badge: "silver" },
  { name: "Tiago Nascimento", commits: 176, prs: 24, badge: "silver" },
];

const milestones = [
  { label: "Reviewer", need: "5 merged PRs" },
  { label: "Author", need: "20 merged PRs" },
  { label: "Maintainer", need: "50 merged PRs + 6 months" },
  { label: "Core committer", need: "100 merged PRs + naming rights" },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function BadgeTag({
  children,
  variant = "blue",
}: {
  children: React.ReactNode;
  variant?: "blue" | "green" | "amber" | "slate";
}) {
  const styles: Record<string, string> = {
    blue: "bg-primary/10 text-primary ring-primary/20",
    green: "bg-accent/10 text-accent-foreground ring-accent/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    slate: "bg-muted text-muted-foreground ring-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${
        styles[variant]
      }`}
    >
      {children}
    </span>
  );
}

export default function GithubPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(139,92,246,0.06),transparent_26%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <motion.div
            className="max-w-xl space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionEyebrow
              icon={<GitBranch className="h-4 w-4" />}
              label="Collaborate on GitHub"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Collaborate / GitHub
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Build Adon ERP
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Together, on
                  <br />
                  <span className="text-primary">GitHub</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Adon ERP is open-source. Fork the repo, contribute code, review
                pull requests, and shape the roadmap alongside developers from
                more than 180 countries.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <GitBranch className="h-4 w-4" />
                View Repository
              </a>
              <Link
                href="#contributing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                Contributing Guide
              </Link>
            </div>

            {/* Trust / activity card */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <GitBranch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Latest commit</p>
                  <p className="text-xs text-muted-foreground">main · 3 minutes ago</p>
                </div>
              </div>
              <div className="rounded-xl bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      feat(purchase): add multi-currency PO matching
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Reviewed by 2 maintainers · 14 files changed
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs font-semibold text-accent-foreground bg-accent/10 px-2 py-0.5 rounded-full">+412</span>
                      <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">−89</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — code preview card */}
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />

            <div className="h-[28rem] w-full overflow-hidden rounded-[2.5rem] border-8 border-card bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.22)]">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-medium text-slate-400">terminal — zsh</span>
              </div>
              <div className="flex h-[calc(100%-3rem)]">
                {/* Sidebar */}
                <div className="hidden w-48 shrink-0 border-r border-slate-800 p-4 sm:block">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">Explorer</p>
                  {["src", "core", "addons", "tests", "docs"].map((f) => (
                    <div key={f} className="mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-800">
                      <Command className="h-3 w-3 text-slate-600" />
                      {f}
                    </div>
                  ))}
                </div>
                {/* Code area */}
                <div className="flex-1 overflow-hidden p-6">
                  <div className="space-y-1.5">
                    {[
                      { line: "1", content: "import", color: "text-violet-400" },
                      { line: "2", content: "  { Command } from 'lucide-react'", color: "text-slate-400" },
                      { line: "3", content: "import", color: "text-violet-400" },
                      { line: "4", content: "  { AdonERP } from '@/core/app'", color: "text-slate-400" },
                      { line: "5", content: "", color: "" },
                      { line: "6", content: "export async function", color: "text-sky-400" },
                      { line: "7", content: "  initPurchasingModule() {", color: "text-cyan-300" },
                      { line: "8", content: "  const app = await", color: "text-slate-300" },
                      { line: "9", content: "    AdonERP.register(async () => (", color: "text-slate-300" },
                      { line: "10", content: "    <PurchasingApp />", color: "text-emerald-300" },
                      { line: "11", content: "  ))", color: "text-slate-300" },
                      { line: "12", content: "  return 0", color: "text-slate-300" },
                    ].map((row) => (
                      <div key={row.line} className="flex gap-4">
                        <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">{row.line}</span>
                        <span className={`text-[11px] leading-[1.6] ${row.color}`}>{row.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Merged
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-lg">
                <GitBranch className="h-3.5 w-3.5" />
                main
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ WHY CONTRIBUTE ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Rocket className="h-4 w-4" />}
            label="Why contribute"
          />
          <ScriptHeading className="mt-6">
            Your code,
            <br />
            shipped worldwide
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every contribution goes into production. Fix a bug, ship a feature,
            improve docs — and watch your work land in the hands of tens of
            thousands of businesses.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-[0.030] transition-opacity duration-300 group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-md shadow-primary/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ HOW IT WORKS ═════════════════════ */}
      <section
        id="contributing"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Lightbulb className="h-4 w-4" />}
            label="Getting started"
          />
          <ScriptHeading className="mt-6">
            Four steps to your first pull request
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Our open-source workflow is documented, automated, and welcoming to
            first-time contributors.
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
                className="group relative flex flex-col items-center rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ ACTIVE PRs ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<BarChart3 className="h-4 w-4" />}
            label="Recent activity"
          />
          <ScriptHeading className="mt-6">
            Active pull requests
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            See what collaborators are working on right now.
          </p>
        </div>

        <div className="space-y-3">
          {activePRs.map((pr, index) => (
            <motion.div
              key={pr.summary}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <GitFork className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {pr.summary}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {pr.tags.map((tag) => (
                    <BadgeTag
                      key={tag}
                      variant={
                        tag === "approved"
                          ? "green"
                          : tag === "in-progress"
                            ? "blue"
                            : tag === "draft"
                              ? "slate"
                              : "amber"
                      }
                    >
                      {tag === "in-progress" ? "In review" : tag}
                    </BadgeTag>
                  ))}
                  <span className="text-xs text-muted-foreground">
                    by {pr.author} · {pr.comments} comments
                  </span>
                </div>
              </div>
              <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted/30">
                View PR
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <Code2 className="mb-4 h-9 w-9 text-primary" />
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                CLI: your first commit in 2 minutes
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Install the AdonERP CLI, authenticate with your GitHub account,
                and push your first patch — all without leaving the terminal.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-slate-950 p-5 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Terminal</span>
                <button className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground">
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
              </div>
              <pre className="text-xs leading-relaxed text-slate-300">
  <span className="text-slate-500">$</span>{" "}
  <span className="text-primary">npx</span> adonerp-cli init
</pre>
              <pre className="text-xs leading-relaxed text-slate-300">
  <span className="text-slate-500">●</span>{" "}
  <span className="text-slate-400">Cloning adonerp/server ...</span>
</pre>
              <pre className="text-xs leading-relaxed text-slate-300">
  <span className="text-primary">✔</span>{" "}
  <span className="text-primary-foreground">Ready</span> at{" "}
  <span className="text-cyan-400">~/Code/adonerp</span>
</pre>
              <pre className="text-xs leading-relaxed text-slate-300">
  <span className="text-slate-500">$</span>{" "}
  <span className="text-primary">cd</span> adonerp &&{" "}
  <span className="text-primary">npm</span> run dev
</pre>
              <pre className="text-xs leading-relaxed text-primary-foreground/80">
  <span className="text-primary">✔</span>{" "}
  AdonERP running at{" "}
  <span className="text-cyan-400">http://localhost:8069</span>
</pre>
              <pre className="text-xs leading-relaxed text-slate-300 mt-2">
  <span className="text-slate-500">$</span>{" "}
  <span className="text-primary">npx</span> adonerp-cli pr
</pre>
              <pre className="text-xs leading-relaxed text-slate-300">
  <span className="text-primary">✔</span>{" "}
  PR template ready — add your description and push!
</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════ TOP CONTRIBUTORS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Star className="h-4 w-4" />}
            label="Hall of contributors"
          />
          <ScriptHeading className="mt-6">
            Our top contributors
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Developers who go above and beyond deserve the spotlight. These
            contributors have shaped the most active areas of the codebase this
            year.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredContributors.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {c.name}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        c.badge === "gold"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Contributor</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-primary">{c.commits}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Commits</p>
                </div>
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-secondary-foreground">{c.prs}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">PRs</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ MILESTONES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<BadgeCheck className="h-4 w-4" />}
            label="Recognition levels"
          />
          <ScriptHeading className="mt-6">
            Earn your place
            <br />
            in the hall of fame
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            As you contribute, you unlock increasingly prestigious contributor
            tiers — each with its own badge, perks, and community privileges.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, index) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl text-center"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Star
                  className={`h-5 w-5 ${
                    index === 0
                      ? "text-muted-foreground"
                      : index === 1
                        ? "text-amber-500"
                        : index === 2
                          ? "text-violet-500"
                          : "text-rose-500"
                  }`}
                />
              </div>
              <h3 className="text-base font-bold text-foreground">{m.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{m.need}</p>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: 4 - index }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      index === 0
                        ? "text-muted-foreground"
                        : index === 1
                          ? "text-amber-400"
                          : index === 2
                            ? "text-violet-400"
                            : "text-rose-400"
                    }`}
                  />
                ))}
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
            label="Contributor voices"
          />
          <ScriptHeading className="mt-6">
            From the
            <br />
            developer community
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {[
            {
              quote:
                "Contributing to Adon ERP gave me a real sense of ownership. I shipped features that thousands of companies now use daily. The review process is genuinely friendly and thorough.",
              name: "Omar Yousef",
              role: "Top Contributor · Egypt",
              avatar: "OY",
            },
            {
              quote:
                "The open-source docs alone convinced me this is special. I started with a typo fix, ended up owning the inventory barcode module. Best collaboration experience I have had.",
              name: "Lena Kowalska",
              role: "Maintainer · Poland",
              avatar: "LK",
            },
          ].map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative space-y-5">
                <p className="text-base leading-8 text-foreground/80">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
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
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-primary/90 to-primary/70 px-6 py-16 text-center shadow-[0_50px_130px_rgba(0,0,0,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <GitBranch className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              Ready to ship your first PR?
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Adon ERP is open-source — built by a global community of developers, product people, and designers. Your code matters here.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <GitBranch className="h-4 w-4" />
                Fork on GitHub
              </a>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Calendar className="h-4 w-4" />
                Join dev call
              </Link>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Open-source · MIT Licensed · Welcoming to first-timers
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
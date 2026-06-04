"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Code2, GitFork, Users, Sparkles, Search, GitBranch, ForkKnife, Rocket,
    BarChart3, Star, BadgeCheck, Terminal, Copy, CheckCircle2, Calendar,
    ArrowRight, BookOpen, Globe2, Handshake, Lightbulb, MessageSquareText,
    Play, ShieldCheck, Target, Zap,
  };
  return icons[iconName] || GitBranch;
};

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
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
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
  const t = useTranslations("pages.github");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const heroStats = t.raw("hero.stats");
  const whyFeatures = t.raw("whyContributeSection.features");
  const workSteps = t.raw("howItWorksSection.steps");
  const activePRs = t.raw("activePRsSection.prs");
  const cliCommands = t.raw("activePRsSection.cli.commands");
  const contributors = t.raw("contributorsSection.contributors");
  const milestonesList = t.raw("milestonesSection.milestones");
  const testimonials = t.raw("testimonialsSection.testimonials");

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
              iconName={t("hero.eyebrowIcon")}
              labelKey="hero.eyebrowLabel"
              t={t}
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {t("hero.communityLabel")}
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.preHeading")}
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.title")}
                  <br />
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
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
                {t("hero.viewRepoButton")}
              </a>
              <Link
                href="#contributing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                {t("hero.guideButton")}
              </Link>
            </div>

            {/* Trust / activity card */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <GitBranch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t("hero.latestCommit.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("hero.latestCommit.time")}
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {t("hero.latestCommit.message")}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t("hero.latestCommit.reviewed")}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs font-semibold text-accent-foreground bg-accent/10 px-2 py-0.5 rounded-full">
                        {t("hero.latestCommit.added")}
                      </span>
                      <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                        {t("hero.latestCommit.removed")}
                      </span>
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
                <span className="ml-3 text-xs font-medium text-slate-400">
                  terminal — zsh
                </span>
              </div>
              <div className="flex h-[calc(100%-3rem)]">
                {/* Sidebar */}
                <div className="hidden w-48 shrink-0 border-r border-slate-800 p-4 sm:block">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
                    Explorer
                  </p>
                  {["src", "core", "addons", "tests", "docs"].map((f) => (
                    <div
                      key={f}
                      className="mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-800"
                    >
                      <Command className="h-3 w-3 text-slate-600" />
                      {f}
                    </div>
                  ))}
                </div>
                {/* Code area */}
                <div className="flex-1 overflow-hidden p-6">
                  <div className="space-y-1.5">
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">1</span>
                      <span className="text-[11px] leading-[1.6] text-violet-400">import</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">2</span>
                      <span className="text-[11px] leading-[1.6] text-slate-400">  {'{'} Command {'}'} from 'lucide-react'</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">3</span>
                      <span className="text-[11px] leading-[1.6] text-violet-400">import</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">4</span>
                      <span className="text-[11px] leading-[1.6] text-slate-400">  {'{'} AdonERP {'}'} from '@/core/app'</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">5</span>
                      <span className="text-[11px] leading-[1.6] text-slate-400"></span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">6</span>
                      <span className="text-[11px] leading-[1.6] text-sky-400">export async function</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">7</span>
                      <span className="text-[11px] leading-[1.6] text-cyan-300">  initPurchasingModule() {'{'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">8</span>
                      <span className="text-[11px] leading-[1.6] text-slate-300">  const app = await</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">9</span>
                      <span className="text-[11px] leading-[1.6] text-slate-300">    AdonERP.register(async () =&gt; (</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">10</span>
                      <span className="text-[11px] leading-[1.6] text-emerald-300">    &lt;PurchasingApp /&gt;</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">11</span>
                      <span className="text-[11px] leading-[1.6] text-slate-300">  ))</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[10px] text-slate-700 select-none">12</span>
                      <span className="text-[11px] leading-[1.6] text-slate-300">  return 0</span>
                    </div>
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
            iconName={t("whyContributeSection.eyebrowIcon")}
            labelKey="whyContributeSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("whyContributeSection.title")}
            <br />
            {t("whyContributeSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("whyContributeSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyFeatures.map((feature: any, index: number) => {
            const Icon = getIconComponent(feature.icon);
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
            iconName={t("howItWorksSection.eyebrowIcon")}
            labelKey="howItWorksSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("howItWorksSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("howItWorksSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step: any, index: number) => {
            const Icon = getIconComponent(step.icon);
            return (
              <motion.div
                key={step.step}
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
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {step.description}
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
            iconName={t("activePRsSection.eyebrowIcon")}
            labelKey="activePRsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("activePRsSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("activePRsSection.description")}
          </p>
        </div>

        <div className="space-y-3">
          {activePRs.map((pr: any, index: number) => (
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
                  {pr.tags.map((tag: string) => (
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
                {t("activePRsSection.cli.title")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t("activePRsSection.cli.description")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-slate-950 p-5 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Terminal
                </span>
                <button className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground">
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
              </div>
              {cliCommands.map((cmd: string, idx: number) => (
                <pre key={idx} className="text-xs leading-relaxed text-slate-300">
                  {cmd.startsWith("✔") ? (
                    <><span className="text-primary">✔</span> {cmd.substring(2)}</>
                  ) : cmd.startsWith("●") ? (
                    <><span className="text-slate-500">●</span> {cmd.substring(2)}</>
                  ) : cmd.startsWith("$") ? (
                    <><span className="text-slate-500">$</span> <span className="text-primary">{cmd.substring(2)}</span></>
                  ) : (
                    cmd
                  )}
                </pre>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════ TOP CONTRIBUTORS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("contributorsSection.eyebrowIcon")}
            labelKey="contributorsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("contributorsSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("contributorsSection.description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contributors.map((c: any, index: number) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                  {c.name.split(" ").map((n: string) => n[0]).join("")}
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
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                    Commits
                  </p>
                </div>
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-secondary-foreground">{c.prs}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                    PRs
                  </p>
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
            iconName={t("milestonesSection.eyebrowIcon")}
            labelKey="milestonesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("milestonesSection.title")}
            <br />
            {t("milestonesSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("milestonesSection.description")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {milestonesList.map((m: any, index: number) => (
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
            iconName={t("testimonialsSection.eyebrowIcon")}
            labelKey="testimonialsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("testimonialsSection.title")}
            <br />
            {t("testimonialsSection.subtitle")}
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((tItem: any, index: number) => (
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
                <p className="text-base leading-8 text-foreground/80">
                  &quot;{tItem.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                    {tItem.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tItem.name}</p>
                    <p className="text-sm text-muted-foreground">{tItem.role}</p>
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
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <GitBranch className="h-4 w-4" />
                {t("ctaSection.forkButton")}
              </a>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Calendar className="h-4 w-4" />
                {t("ctaSection.callButton")}
              </Link>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              {t("ctaSection.footerText")}
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

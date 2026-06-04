"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Languages, Globe2, Users, BadgeCheck, Rocket, Search, ShieldCheck,
    Sparkles, Lightbulb, MessageSquareText, Star, ArrowRight, Handshake,
    BookOpen, Calendar, Play, CheckCircle2,
  };
  return icons[iconName] || Languages;
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

export default function TranslationsPage() {
  const t = useTranslations("pages.translations");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const [activeLang, setActiveLang] = useState<string | null>(null);

  const heroStats = t.raw("hero.stats");
  const benefitsList = t.raw("whyTranslateSection.benefits");
  const workSteps = t.raw("howItWorksSection.steps");
  const platformFeatures = t.raw("platformFeatures.features");
  const editorRows = t.raw("platformFeatures.editor.rows");
  const languagesList = t.raw("languagesSection.languages");
  const contributorsList = t.raw("contributorsSection.contributors");
  const testimonialsList = t.raw("testimonialsSection.testimonials");

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(6,182,212,0.08),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(59,130,246,0.08),transparent_26%)]" />

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
              <Link
                href="#languages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t("hero.startButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                {t("hero.howItWorksButton")}
              </Link>
            </div>

            {/* Trust badge */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-primary/50">&quot;</div>
              <p className="text-base leading-7 text-card-foreground">
                {t("hero.testimonial.quote")}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">
                    {t("hero.testimonial.name")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("hero.testimonial.role")}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-primary/60">
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative h-[28rem] w-full overflow-hidden rounded-[2.5rem] border-8 border-background shadow-[0_40px_100px_rgba(15,23,42,0.16)] bg-gradient-to-br from-background via-card to-muted/50">
              <div className="absolute inset-0">
                {/* Globe dots */}
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-primary/5 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-8 gap-2.5">
                    {Array.from({ length: 72 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-xs ${
                          [
                            "bg-primary/20",
                            "bg-secondary/20",
                            "bg-accent/20",
                            "bg-primary/30",
                            "bg-secondary/30",
                            "bg-primary/15",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Speech bubbles */}
                <div className="absolute bottom-16 left-12 h-20 w-24 rounded-[1.5rem] rounded-bl-none bg-primary/30 shadow-lg" />
                <div className="absolute bottom-20 left-[7.5rem] h-16 w-20 rounded-[1.5rem] rounded-bl-none bg-secondary/30 shadow-lg" />
                <div className="absolute bottom-12 right-10 h-24 w-24 rounded-[1.5rem] rounded-br-none bg-accent/30 shadow-lg" />
                <div className="absolute bottom-6 right-[7.5rem] h-14 w-14 rounded-[1.5rem] rounded-br-none bg-primary/40 shadow-lg" />

                {/* Floating dots */}
                <div className="absolute top-28 left-16 h-5 w-5 rounded-full bg-primary shadow-md" />
                <div className="absolute top-40 right-20 h-4 w-4 rounded-full bg-secondary shadow-md" />
                <div className="absolute bottom-36 left-[4.5rem] h-4 w-4 rounded-full bg-accent shadow-md" />
                <div className="absolute bottom-28 right-[5.5rem] h-3.5 w-3.5 rounded-full bg-primary/70 shadow-md" />
              </div>

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card/95 shadow-2xl backdrop-blur-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Globe2 className="h-8 w-8 text-primary-foreground" />
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
            iconName={t("whyTranslateSection.eyebrowIcon")}
            labelKey="whyTranslateSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("whyTranslateSection.title")}
            <br />
            {t("whyTranslateSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("whyTranslateSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefitsList.map((benefit: any, index: number) => {
            const Icon = getIconComponent(benefit.icon);
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
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-md shadow-primary/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
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
            iconName={t("howItWorksSection.eyebrowIcon")}
            labelKey="howItWorksSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("howItWorksSection.title")}
            <br />
            {t("howItWorksSection.subtitle")}
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
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-card-foreground">
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

      {/* ═════════════════════ PLATFORM FEATURES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-muted/30 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("platformFeatures.eyebrowIcon")}
            labelKey="platformFeatures.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("platformFeatures.title")}
            <br />
            {t("platformFeatures.subtitle")}
          </ScriptHeading>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map((feature: string, index: number) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquareText className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-card-foreground">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Editor mock */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-card-foreground">
                {t("platformFeatures.editor.title")}
              </span>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {t("platformFeatures.editor.autoSave")}
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-2">
            {editorRows.map((row: any, idx: number) => (
              <div
                key={row.label}
                className={`flex flex-col gap-1 px-6 py-4 ${
                  idx % 2 === 0 ? "border-r border-border" : ""
                } ${
                  idx < 2 ? "" : "border-t border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{row.flag}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
                    {row.label}
                  </span>
                </div>
                <p className="text-sm text-card-foreground">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ PROGRESS ═════════════════════ */}
      <section id="languages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("languagesSection.eyebrowIcon")}
            labelKey="languagesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("languagesSection.title")}
            <br />
            {t("languagesSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("languagesSection.description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {languagesList.map((lang: any, index: number) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.04, 0.35),
              }}
              viewport={{ once: true, amount: 0.1 }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-semibold text-card-foreground">
                    {lang.name}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold ${
                    lang.progress === 100
                      ? "text-emerald-600 dark:text-emerald-400"
                      : lang.progress > 70
                        ? "text-primary"
                        : lang.progress > 40
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {lang.progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
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
                        ? "bg-primary"
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contributorsList.map((contributor: any, index: number) => (
            <motion.div
              key={contributor.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-sm font-black text-primary-foreground">
                  {contributor.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">
                      {contributor.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        contributor.badge === "gold"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {contributor.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{contributor.role}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-sm font-bold text-primary">
                      {contributor.strings}+
                    </span>
                    <span className="text-xs text-muted-foreground">
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
          {testimonialsList.map((tItem: any, index: number) => (
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
                <p className="text-base leading-8 text-card-foreground">
                  &quot;{tItem.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary/60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-primary-foreground">
                    {tItem.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{tItem.name}</p>
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
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/90 via-primary to-secondary px-6 py-16 text-center shadow-[0_50px_130px_rgba(15,23,42,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-primary-foreground/20 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-secondary-foreground/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Languages className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-primary-foreground text-4xl sm:text-5xl lg:text-6xl">
              {t("ctaSection.title")}
              <br />
              {t("ctaSection.subtitle")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                {t("ctaSection.translateButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/community/get-services/find-partner"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Handshake className="h-4 w-4" />
                {t("ctaSection.findLeadButton")}
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
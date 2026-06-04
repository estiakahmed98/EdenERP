"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
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
  ThumbsUp,
  TrendingUp,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Search, ThumbsUp, Video, MessageSquareText, Building2, Globe2, Rocket,
    Handshake, TrendingUp, Zap, Sparkles, Star, Users, ArrowRight, CheckCircle2,
    Play, Lightbulb, BarChart3, ShieldCheck,
  };
  return icons[iconName] || Sparkles;
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

export default function CustomerStoriesPage() {
  const t = useTranslations("pages.customerstories");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const heroStats = t.raw("hero.stats");
  const featuresList = t.raw("featuresSection.features");
  const industriesList = t.raw("industriesSection.industries");
  const storiesList = t.raw("storiesSection.stories");
  const impactStatsList = t.raw("impactSection.stats");
  const testimonialsList = t.raw("testimonialsSection.testimonials");

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
              <Link
                href="#stories"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4" />
                {t("hero.readButton")}
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <Play className="h-4 w-4" />
                {t("hero.watchButton")}
              </a>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 rounded-2xl border border-primary/20 bg-card/80 p-5 backdrop-blur-sm shadow-sm">
              {heroStats.map((s: any) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black text-primary">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — featured story card */}
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

            <div className="w-full overflow-hidden rounded-[2.5rem] border-8 border-card bg-card shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded-lg bg-muted px-3 py-1">
                  <span className="text-xs text-muted-foreground">
                    community.adonerp.com/stories
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {/* Video placeholder */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_60%)]" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/30">
                    <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/70 backdrop-blur-sm px-2.5 py-1">
                    <span className="text-[10px] font-semibold text-foreground">
                      {t("hero.featuredStory.duration")}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    {t("hero.featuredStory.badge")}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t("hero.featuredStory.title")}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[9px] font-black text-white">
                      RM
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {t("hero.featuredStory.name")} — {t("hero.featuredStory.role")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ FEATURES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("featuresSection.eyebrowIcon")}
            labelKey="featuresSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("featuresSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("featuresSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.map((feature: any, index: number) => {
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
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                    <Icon className="h-5.5 w-5.5" />
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

      {/* ═════════════════════ INDUSTRY FILTER ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("industriesSection.eyebrowIcon")}
            labelKey="industriesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("industriesSection.title")}
          </ScriptHeading>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industriesList.map((ind: any, index: number) => {
            const Icon = getIconComponent(ind.icon);
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {ind.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{ind.count}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ CUSTOMER STORIES ═════════════════════ */}
      <section id="stories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("storiesSection.eyebrowIcon")}
            labelKey="storiesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("storiesSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("storiesSection.description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {storiesList.map((story: any, index: number) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground shadow-md shadow-primary/10">
                      {story.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {story.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{story.role}</p>
                    </div>
                  </div>
                  <BadgeTag variant="blue">{story.tier}</BadgeTag>
                </div>

                {/* Quote */}
                <p className="text-base leading-8 text-foreground/80">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Results */}
                <div className="flex flex-wrap gap-2">
                  {story.results.map((r: string) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {r}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-primary/60">
                    {[1, 2, 3, 4].map((i) => (
                      <ThumbsUp key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-muted-foreground">
                      Helpful
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe2 className="h-3.5 w-3.5" />
                    {story.country}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ BY THE NUMBERS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("impactSection.eyebrowIcon")}
            labelKey="impactSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("impactSection.title")}
          </ScriptHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStatsList.map((item: any, index: number) => {
            const Icon = getIconComponent(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-sm text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-black text-primary">{item.stat}</p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
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
                <div className="flex items-center gap-4">
                  <Star className="h-8 w-8 text-primary/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Customer Story
                  </span>
                </div>
                <p className="text-base leading-8 text-foreground/80">
                  &ldquo;{tItem.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 text-primary/60">
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
              <Sparkles className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              {t("ctaSection.title")}
              <br />
              {t("ctaSection.subtitle")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                {t("ctaSection.submitButton")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Video className="h-4 w-4" />
                {t("ctaSection.videoButton")}
              </a>
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
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useMessages } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Code2,
  Eye,
  Flame,
  Handshake,
  Headphones,
  Lightbulb,
  MessageSquareText,
  PlusCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

type MessageRecord = Record<string, unknown>;
type ScopedTranslator = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

function isRecord(value: unknown): value is MessageRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getByPath(source: unknown, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((currentValue, key) => {
    if (!isRecord(currentValue)) {
      return undefined;
    }

    return currentValue[key];
  }, source);
}

function createTranslator(scope: unknown): ScopedTranslator {
  const translator = ((key: string) => {
    const value = getByPath(scope, key);

    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : key;
  }) as ScopedTranslator;

  translator.raw = (key: string) => getByPath(scope, key);

  return translator;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    MessageSquareText, BookOpen, Code2, Zap, ShieldCheck, Lightbulb,
    Search, ThumbsUp, Headphones, TrendingUp, CheckCircle2, Sparkles,
    Rocket, Star, Users, Flame, BarChart3, ArrowRight, PlusCircle,
  };
  return icons[iconName] || MessageSquareText;
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

function HandUnderlineText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative ${className}`}>
      {children}
      <svg
        className="absolute -bottom-2 left-0 w-full"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9C40 3 80 2 120 3.5C160 5 180 8 201 2.5"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function ForumPage() {
  const messages = useMessages();
  const forumMessages =
    getByPath(messages, "pages.collaborate.forum") ??
    getByPath(messages, "pages.community.forum");
  const t = createTranslator(forumMessages);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const heroStats = asArray(t.raw("hero.stats"));
  const heroThreads = asArray(t.raw("hero.recentThreads"));
  const categoriesList = asArray(t.raw("categoriesSection.categories"));
  const whyFeatures = asArray(t.raw("whyForumSection.features"));
  const recentThreadsList = asArray(t.raw("recentThreadsSection.threads"));
  const contributorsList = asArray(t.raw("contributorsSection.contributors"));
  const guidelinesRules = asArray(t.raw("guidelinesSection.rules"));
  const testimonialsList = asArray(t.raw("testimonialsSection.testimonials"));

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
                  <span className="text-primary">{t("hero.title")}</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <MessageSquareText className="h-4 w-4" />
                {t("hero.browseButton")}
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <PlusCircle className="h-4 w-4" />
                {t("hero.startButton")}
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

          {/* Right — thread preview card */}
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
                    community.adonerp.com/forum
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {heroThreads.map((thread: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-primary/5"
                  >
                    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MessageSquareText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {thread.hot && (
                          <Flame className="h-3 w-3 text-destructive" />
                        )}
                        <p className="truncate text-sm font-medium text-foreground">
                          {thread.title}
                        </p>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {thread.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ BOARD CATEGORIES ═════════════════════ */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("categoriesSection.eyebrowIcon")}
            labelKey="categoriesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("categoriesSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("categoriesSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesList.map((cat: any, index: number) => {
            const Icon = getIconComponent(cat.icon);
            return (
              <motion.div
                key={cat.title}
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
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-[0.030] transition-opacity duration-300 group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} shadow-md shadow-primary/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {cat.description}
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Browse threads
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ WHY FORUM ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("whyForumSection.eyebrowIcon")}
            labelKey="whyForumSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("whyForumSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("whyForumSection.description")}
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

      {/* ═════════════════════ RECENT THREADS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("recentThreadsSection.eyebrowIcon")}
            labelKey="recentThreadsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("recentThreadsSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("recentThreadsSection.description")}
          </p>
        </div>

        <div className="space-y-3">
          {recentThreadsList.map((thread: any, index: number) => (
            <motion.div
              key={thread.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquareText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {thread.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {thread.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    by {thread.author} &middot; {thread.replies} replies &middot; {thread.views} views &middot; {thread.lastActive}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex gap-2">
                {thread.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                View
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            {t("recentThreadsSection.viewAllButton")}
            <ArrowRight className="h-4 w-4" />
          </a>
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
          {contributorsList.map((c: any, index: number) => (
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
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Contributor</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-primary">{c.posts}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                    Posts
                  </p>
                </div>
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-secondary-foreground">{c.badges}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                    Badges
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ GUIDELINES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("guidelinesSection.eyebrowIcon")}
            labelKey="guidelinesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("guidelinesSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("guidelinesSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guidelinesRules.map((rule: any, index: number) => {
            const Icon = getIconComponent(rule.icon);
            return (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {rule.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {rule.description}
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
                  <BarChart3 className="h-8 w-8 text-primary/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Forum
                  </span>
                </div>
                <p className="text-base leading-8 text-foreground/80">
                  &quot;{tItem.quote}&quot;
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
              <Users className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4" />
                {t("ctaSection.createButton")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <BookOpen className="h-4 w-4" />
                {t("ctaSection.guidelinesButton")}
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

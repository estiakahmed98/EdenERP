import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CirclePlay,
  Clock3,
  Code2,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  ListChecks,
  PlayCircle,
  Search,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";

type Category = {
  title: string;
  description: string;
  lessons: string;
  icon: keyof typeof categoryIcons;
};

type FeaturedTutorial = {
  title: string;
  level: string;
  time: string;
  tag: string;
};

const categoryIcons = {
  Compass,
  Users,
  LibraryBig,
  BadgeCheck,
  LayoutDashboard,
  Code2,
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.learnTutorials");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/learn/tutorials"),
  };
}

export default async function TutorialsPage() {
  const t = await getTranslations("pages.community.tutorials");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const categories = t.raw("categories") as Category[];
  const featuredTutorials = t.raw("featuredTutorials") as FeaturedTutorial[];
  const learningPath = t.raw("learningPath") as string[];
  const faqs = t.raw("faqs") as Array<{ q: string; a: string }>;
  const playerSteps = t.raw("player.steps") as string[];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.06),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.04),transparent_24%)]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<GraduationCap className="h-4 w-4" />}
              label={t("hero.eyebrow")}
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {t("hero.breadcrumb")}
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.lead")}
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.title")}
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#tutorials"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("hero.primaryCta")}
              </Link>
              <Link
                href="#learning-path"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card/90 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative w-full rounded-[2.5rem] border border-border bg-card p-5 shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
              <div className="rounded-[2rem] bg-gradient-to-br from-muted to-background p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("player.label")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {t("player.title")}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-md">
                    <PlayCircle className="h-7 w-7 fill-primary/10" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.25),transparent_24%),radial-gradient(circle_at_82%_40%,rgba(139,92,246,0.2),transparent_24%)]" />
                  <div className="relative flex min-h-56 items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/95 shadow-2xl">
                      <CirclePlay className="h-10 w-10 fill-primary text-primary" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {playerSteps.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-card px-4 py-3 shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Step {index + 1}
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tutorials"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="text-center">
          <SectionEyebrow
            icon={<BookOpen className="h-4 w-4" />}
            label={t("categoriesSection.eyebrow")}
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>
              {t("categoriesSection.titleLine1")}
              <br />
              {t("categoriesSection.titleLine2")}
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("categoriesSection.description")}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {t("categoriesSection.searchPlaceholder")}
          </span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon];

            return (
              <div
                key={category.title}
                className="group rounded-[1.8rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Video className="h-3.5 w-3.5" />
                      {category.lessons}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-muted/30 py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5 self-center">
              <SectionEyebrow
                icon={<Sparkles className="h-4 w-4" />}
                label={t("featuredSection.eyebrow")}
              />
              <ScriptHeading>
                {t("featuredSection.titleLine1")}
                <br />
                {t("featuredSection.titleLine2")}
              </ScriptHeading>
              <p className="max-w-md text-base leading-7 text-muted-foreground">
                {t("featuredSection.description")}
              </p>
              <Link
                href="#learning-path"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {t("featuredSection.link")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredTutorials.map((tutorial, index) => (
                <div
                  key={tutorial.title}
                  className="rounded-[1.8rem] border border-border bg-card p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CirclePlay className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-foreground">
                    {tutorial.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {tutorial.tag}
                    </span>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {tutorial.level}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-foreground">
                      <Clock3 className="h-3 w-3" />
                      {tutorial.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="learning-path"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24"
      >
        <div className="space-y-5 self-center">
          <SectionEyebrow
            icon={<ListChecks className="h-4 w-4" />}
            label={t("learningPathSection.eyebrow")}
          />
          <ScriptHeading>
            {t("learningPathSection.titleLine1")}
            <br />
            {t("learningPathSection.titleLine2")}
          </ScriptHeading>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            {t("learningPathSection.description")}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-10 rounded-full bg-muted" />
          <div className="relative rounded-[2rem] border border-border bg-card p-6 shadow-[0_35px_80px_rgba(0,0,0,0.1)]">
            <div className="space-y-4">
              {learningPath.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl bg-muted/30 px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{step}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("learningPathSection.stepDescription")}
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-accent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-background via-primary/5 to-muted px-6 py-16 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:px-10">
          <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Star className="h-7 w-7 fill-current" />
            </div>
            <ScriptHeading className="mt-6">
              {t("ctaSection.titleLine1")}
              <br />
              {t("ctaSection.titleLine2")}
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {t("ctaSection.description")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="#tutorials"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("ctaSection.primaryCta")}
              </Link>
              <Link
                href="/community/learn/documentation"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                {t("ctaSection.secondaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <SectionEyebrow
            icon={<BookOpen className="h-4 w-4" />}
            label={t("faqSection.eyebrow")}
          />
          <ScriptHeading className="mt-8">{t("faqSection.title")}</ScriptHeading>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  LifeBuoy,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";

const categoryIcons = {
  Sparkles,
  Workflow,
  Users,
  Code2,
  ShieldCheck,
  LifeBuoy,
};

type DocCategory = {
  title: string;
  description: string;
  icon: keyof typeof categoryIcons;
  articles: string;
};

type QuickLink = {
  label: string;
  href: string;
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
  const t = await getTranslations(
    "pages.community.metadata.learnDocumentation",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/learn/documentation"),
  };
}

export default async function DocumentationPage() {
  const t = await getTranslations("pages.community.documentation");
  const categories = t.raw("categories") as DocCategory[];
  const previewItems = t.raw("preview.items") as string[];
  const popularDocs = t.raw("popularDocs") as string[];
  const developerSteps = t.raw("developerSteps") as string[];
  const quickLinks = t.raw("quickLinks") as QuickLink[];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_12%_16%,rgba(139,92,246,0.08),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(139,92,246,0.06),transparent_25%)]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <SectionEyebrow
              icon={<BookOpen className="h-4 w-4" />}
              label={t("hero.eyebrow")}
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {t("hero.kicker")}
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
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="h-14 w-full rounded-2xl border border-border bg-card pl-13 pr-4 text-sm text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.08)] outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("hero.primaryCta")}
              </Link>
              <Link
                href="#developer"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-4 top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-8 left-6 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-5 shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
              <div className="rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {t("preview.domain")}
                  </span>
                </div>

                <div className="space-y-3 rounded-[1.5rem] bg-card p-4 text-foreground">
                  <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {t("preview.cardTitle")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("preview.cardDescription")}
                      </p>
                    </div>
                  </div>

                  {previewItems.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-muted/30 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                      <span className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
                        {index + 4} min
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.5rem] bg-slate-950 p-4 font-mono text-xs leading-6 text-violet-100">
                  <p className="text-emerald-300">GET /api/v1/products</p>
                  <p className="text-white/60">Authorization: Bearer API_KEY</p>
                  <p className="text-amber-200">status: 200 OK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<FileText className="h-4 w-4" />}
            label={t("categoriesSection.eyebrow")}
          />
          <div className="mt-8">
            <ScriptHeading>{t("categoriesSection.title")}</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {t("categoriesSection.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon];

            return (
              <div
                key={category.title}
                className="group rounded-[1.7rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_25px_70px_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {category.articles}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t("categoriesSection.browseLabel")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-muted/30 py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-44 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.06),transparent_68%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-5 self-center">
            <SectionEyebrow
              icon={<PlayCircle className="h-4 w-4" />}
              label={t("popularSection.eyebrow")}
            />
            <ScriptHeading>
              {t("popularSection.titleLine1")}
              <br />
              {t("popularSection.titleLine2")}
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              {t("popularSection.description")}
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:p-6">
            <div className="divide-y divide-border">
              {popularDocs.map((doc, index) => (
                <div
                  key={doc}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted/30 text-sm font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {doc}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="developer"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24"
      >
        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-8 rounded-full bg-primary/10" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.16)]">
            <div className="mb-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <TerminalSquare className="h-5 w-5 text-emerald-300" />
                <span className="font-semibold">
                  {t("developerSection.label")}
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                v1.0
              </span>
            </div>
            <pre className="overflow-x-auto rounded-[1.5rem] bg-slate-950 p-5 text-sm leading-7 text-violet-100">
              {`const response = await fetch("/api/v1/customers", {
  method: "POST",
  headers: {
    Authorization: "Bearer ADON_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Adon Books",
    email: "team@example.com",
  }),
});`}
            </pre>
          </div>
        </div>

        <div className="space-y-6 self-center">
          <SectionEyebrow
            icon={<Code2 className="h-4 w-4" />}
            label={t("developerSection.eyebrow")}
          />
          <ScriptHeading className="text-3xl sm:text-4xl">
            {t("developerSection.title")}
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            {t("developerSection.description")}
          </p>
          <div className="space-y-3">
            {developerSteps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-background via-primary/5 to-muted px-6 py-14 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:px-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<BookOpen className="h-4 w-4" />}
              label={t("continueSection.eyebrow")}
            />
            <div className="mt-8">
              <ScriptHeading>{t("continueSection.title")}</ScriptHeading>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("continueSection.description")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

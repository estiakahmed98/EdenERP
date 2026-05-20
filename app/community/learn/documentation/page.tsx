// app/community/learn/documentation/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Documentation | EdenERP",
  description:
    "Explore EdenERP documentation, guides, developer references, and implementation resources.",
};

const docCategories = [
  {
    title: "Getting Started",
    description:
      "Install, configure, and launch your EdenERP workspace with guided setup steps.",
    icon: Sparkles,
    articles: "18 articles",
  },
  {
    title: "Apps & Modules",
    description:
      "Learn how CRM, Sales, Inventory, Accounting, HR, and Projects work together.",
    icon: Workflow,
    articles: "42 articles",
  },
  {
    title: "User Management",
    description:
      "Configure teams, roles, access rights, approvals, and secure collaboration rules.",
    icon: Users,
    articles: "16 articles",
  },
  {
    title: "Developer Docs",
    description:
      "Use APIs, webhooks, custom fields, integrations, and automation workflows.",
    icon: Code2,
    articles: "31 articles",
  },
  {
    title: "Security & Compliance",
    description:
      "Understand authentication, permissions, audit logs, backups, and data governance.",
    icon: ShieldCheck,
    articles: "12 articles",
  },
  {
    title: "Support Center",
    description:
      "Troubleshoot common issues and find best-practice answers from the support team.",
    icon: LifeBuoy,
    articles: "25 articles",
  },
];

const popularDocs = [
  "Set up your company profile and workspace",
  "Invite users and assign role-based permissions",
  "Create products, variants, and inventory rules",
  "Connect sales orders with invoices and payments",
  "Build approval workflows for your team",
  "Configure dashboards and reporting views",
];

const developerSteps = [
  "Create an API key from your admin settings",
  "Choose REST endpoints or webhook events",
  "Map EdenERP objects with your external system",
  "Test requests safely in a sandbox workspace",
];

const quickLinks = [
  { label: "Tutorials", href: "/community/learn/tutorials" },
  { label: "Certifications", href: "/community/learn/certifications" },
  { label: "Training", href: "/community/learn/training" },
  { label: "Blog", href: "/community/learn/blog" },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">
      <span className="text-violet-500">{icon}</span>
      {label}
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf7ff_18%,_#ffffff_100%)] text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_12%_16%,rgba(168,85,247,0.18),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(251,191,36,0.16),transparent_25%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,247,255,1)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <SectionEyebrow
              icon={<BookOpen className="h-4 w-4" />}
              label="Community / Learn / Documentation"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                EdenERP Documentation
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Everything you need to master
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  EdenERP
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Browse clear guides, product documentation, developer
                references, and workflow examples to help your team launch
                faster and run every business process with confidence.
              </p>
            </div>

            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search documentation, guides, APIs..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-13 pr-4 text-sm text-slate-700 shadow-[0_20px_60px_rgba(15,23,42,0.08)] outline-none transition-all placeholder:text-slate-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Browse docs
              </Link>
              <Link
                href="#developer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Developer reference
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-4 top-8 h-32 w-32 rounded-full bg-amber-100 blur-3xl" />
            <div className="absolute -bottom-8 left-6 h-40 w-40 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-[0_40px_100px_rgba(76,29,149,0.16)]">
              <div className="rounded-[2rem] bg-slate-950 p-4 text-white">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    docs.eden-erp.com
                  </span>
                </div>

                <div className="space-y-3 rounded-[1.5rem] bg-white p-4 text-slate-800">
                  <div className="flex items-center gap-3 rounded-2xl bg-violet-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Setup Guide
                      </p>
                      <p className="text-sm text-slate-500">
                        Company, apps, users, and workflow basics
                      </p>
                    </div>
                  </div>

                  {[
                    "CRM configuration",
                    "Inventory rules",
                    "Invoice workflow",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
                        {index + 4} min
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.5rem] bg-[#17112b] p-4 font-mono text-xs leading-6 text-violet-100">
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
            label="Product knowledge base"
          />
          <div className="mt-8">
            <ScriptHeading>Find the right answer faster.</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Documentation is grouped by workflow so business teams, managers,
            and developers can move from problem to solution without confusion.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href="#"
                className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_25px_70px_rgba(15,23,42,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-violet-50 text-primary ring-1 ring-violet-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                    {category.articles}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f5f7] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-44 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.08),transparent_68%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-5 self-center">
            <SectionEyebrow
              icon={<PlayCircle className="h-4 w-4" />}
              label="Popular guides"
            />
            <ScriptHeading>
              Learn what matters,
              <br /> exactly when you need it.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Start with the most-used documentation topics for daily business
              setup, team operations, reporting, and system administration.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="divide-y divide-slate-100">
              {popularDocs.map((doc, index) => (
                <Link
                  key={doc}
                  href="#"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="font-medium text-slate-800 group-hover:text-primary">
                      {doc}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
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
          <div className="absolute inset-x-12 bottom-0 top-8 rounded-full bg-violet-50" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.16)]">
            <div className="mb-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <TerminalSquare className="h-5 w-5 text-emerald-300" />
                <span className="font-semibold">API Reference</span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                v1.0
              </span>
            </div>
            <pre className="overflow-x-auto rounded-[1.5rem] bg-[#120f1f] p-5 text-sm leading-7 text-violet-100">
              {`const response = await fetch("/api/v1/customers", {
  method: "POST",
  headers: {
    Authorization: "Bearer EDEN_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Eden Books",
    email: "team@example.com",
  }),
});`}
            </pre>
          </div>
        </div>

        <div className="space-y-6 self-center">
          <SectionEyebrow
            icon={<Code2 className="h-4 w-4" />}
            label="Developer-friendly integration"
          />
          <ScriptHeading className="text-3xl sm:text-4xl">
            Connect EdenERP with your own tools.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Use clean references and practical examples to integrate accounting,
            ecommerce, logistics, analytics, and internal automation systems.
          </p>
          <div className="space-y-3">
            {developerSteps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#faf5ff_45%,_#fff8ed_100%)] px-6 py-14 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-violet-100 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<BookOpen className="h-4 w-4" />}
              label="Continue learning"
            />
            <div className="mt-8">
              <ScriptHeading>One platform, many ways to learn.</ScriptHeading>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Move from documentation to guided lessons, training resources, and
              community knowledge whenever your team needs deeper support.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Box,
  Building,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Gift,
  Heart,
  Home,
  Hotel,
  Package,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  Utensils,
  Wallet,
  Key,
  PenTool,
  FileSignature,
  Ruler,
  HardDrive,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Architecture Firm | AdonERP Industries",
  description:
    "An architecture firm landing page for AdonERP with project management, quotations, timesheets, invoicing, and resource planning.",
};

const features = [
  {
    title: "CRM pipeline",
    description: "Track leads, proposals, and project stages from one dashboard.",
  },
  {
    title: "Custom quotations",
    description: "Create professional quotes aligned with project scope and pricing.",
  },
  {
    title: "Quote Calculator",
    description: "Calculate costs automatically based on materials, labor, and services.",
  },
  {
    title: "Valid electronic signatures",
    description: "Collect legally binding signatures on contracts from any device.",
  },
  {
    title: "Integrated timesheets",
    description: "Track billable hours and project costs accurately.",
  },
  {
    title: "Easy invoicing",
    description: "Generate invoices based on fixed rates, time & material, or milestones.",
  },
];

const apps = [
  { title: "CRM", subtitle: "Lead and client management", icon: Users },
  { title: "Website", subtitle: "Portfolio showcase", icon: Home },
  { title: "Sales", subtitle: "Quotations and proposals", icon: ShoppingCart },
  { title: "Project", subtitle: "Task and milestone tracking", icon: HardDrive },
  { title: "Accounting", subtitle: "Financial management", icon: CreditCard },
  { title: "Planning", subtitle: "Resource scheduling", icon: Calendar },
];

const testimonials = [
  {
    name: "Michael Chen",
    role: "Principal Architect, Chen & Associates",
    content:
      "AdonERP's automation has reduced human error and increased productivity, allowing employees to focus on activities that add the most value.",
    rating: 5,
  },
  {
    name: "Isabella Rossi",
    role: "Studio Director, Urban Design Collective",
    content:
      "From project quotes to timesheets and invoicing, AdonERP transformed our workflow. We now deliver projects faster and with better profitability tracking.",
    rating: 5,
  },
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
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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

export default function ArchitectureFirmPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Ruler className="h-4 w-4" />}
              label="Architecture industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Architecture Firm
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The ultimate software for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Architecture Firm
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Handle all your projects, from gathering leads and creating quotations
                to managing tasks, signing plans, and logging timesheets.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 text-4xl leading-none text-primary">"</div>
              <p className="text-base leading-7 text-card-foreground">
                AdonERP's automation has reduced human error and increased productivity,
                allowing employees to focus on activities that add the most value.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Principal Architect, Chen & Associates</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-card bg-gradient-to-br from-muted to-background shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-primary/80 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-cyan-300/70",
                            "bg-sky-300/70",
                            "bg-teal-300/70",
                            "bg-cyan-300/70",
                            "bg-sky-300/70",
                            "bg-teal-300/70",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-accent shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-secondary shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-muted shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-muted shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-muted/80 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-muted/80 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/95 shadow-2xl">
                  <Ruler className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart project management Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="rounded-xl bg-muted/30 p-4">
                    <div className="mb-3 h-4 rounded-full bg-muted" />
                    <div className="h-16 rounded-xl bg-card shadow-sm" />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 text-5xl">🏠</div>
              <ScriptHeading>
                <span className="rounded-full border-4 border-secondary px-2">
                  Smart
                </span>{" "}
                project
                <br />
                management
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Centralize dashboards, handle recurring tasks, organize activities,
                and keep every project moving smoothly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <HardDrive className="h-4 w-4 text-primary" />
                  Task tracking
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Users className="h-4 w-4 text-primary" />
                  Team collaboration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State of the art quotations Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          State of the art{" "}
          <span className="underline decoration-primary underline-offset-8">
            quotations
          </span>
        </ScriptHeading>

        <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2">
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            Create custom quotations aligned with your project scope, pricing,
            files, blueprints, and architectural services.
          </div>
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            Use templates and built-in quote tools to make proposals faster and
            more professional.
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {["Quotation", "Proposal", "Invoice"].map((title, idx) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="mb-5 aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-muted" />
              <h3 className="font-bold text-foreground">{title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Ready to send</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finance management to turn profit Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScriptHeading>
              Finance management to turn{" "}
              <span className="text-primary underline decoration-primary underline-offset-8">
                profit
              </span>
            </ScriptHeading>
          </div>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
              <div className="mb-8 h-8 w-32 rounded-full bg-muted" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded-full bg-muted" />
                  <div className="h-4 w-16 rounded-full bg-muted" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded-full bg-muted" />
                  <div className="h-4 w-12 rounded-full bg-muted" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 rounded-full bg-muted" />
                  <div className="h-4 w-14 rounded-full bg-muted" />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 rounded-full bg-muted" />
                    <div className="h-5 w-20 rounded-full bg-primary/20" />
                  </div>
                </div>
                <div className="h-10 rounded-xl bg-primary" />
              </div>
            </div>

            <div className="space-y-5 text-left">
              <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
                <strong className="text-foreground">Flexible invoicing.</strong>
                <p className="mt-2 text-muted-foreground">Invoice clients based on fixed rates, time and material, or milestones.</p>
              </div>
              <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
                <strong className="text-foreground">Analytical breakdowns</strong>
                <p className="mt-2 text-muted-foreground">Help track profitability and costs on each project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource planning Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <ScriptHeading>
            Resource{" "}
            <span className="underline decoration-primary underline-offset-8">
              planning
            </span>
          </ScriptHeading>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Create shifts, track colleagues, material resources, planning,
            recruiting shifts and project timelines.
          </p>
        </div>

        <div className="relative mx-auto mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
          <div className="border-b border-border bg-muted/30 px-6 py-3">
            <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span>Resource</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {["Senior Architect", "Junior Designer", "3D Visualizer", "Project Manager", "Intern"].map((role, idx) => (
              <div key={role} className="grid grid-cols-5 gap-3 px-6 py-3 text-sm">
                <span className="font-medium text-foreground">{role}</span>
                <div className={`h-6 rounded ${idx % 2 === 0 ? "bg-primary/20" : "bg-muted"}`} />
                <div className={`h-6 rounded ${idx % 3 === 0 ? "bg-accent/20" : "bg-muted"}`} />
                <div className={`h-6 rounded ${idx % 2 === 1 ? "bg-primary/20" : "bg-muted"}`} />
                <div className={`h-6 rounded ${idx % 4 === 0 ? "bg-secondary/20" : "bg-muted"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-muted/30 py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Complete tools for architecture projects, quotes, planning,
              signatures, timesheets and invoicing.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <ScriptHeading>
            One need, one app.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Expand as you grow with connected apps for your architecture firm,
            project management, client relationships, and financials.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="group rounded-[1.6rem] border border-border bg-card px-5 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{app.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {app.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-card-foreground">
                "{testimonial.content}"
              </p>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Banner */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-background via-primary/5 to-muted px-6 py-16 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-primary/20" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-secondary/20" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-accent/20" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-card/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-muted-foreground">
              who grow their business with AdonERP — the complete solution for
              architecture firms and design studios.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Ready to scale your firm"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch an architecture firm workflow that helps you manage projects,
            create professional quotes, and track profitability.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Start now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
      <span className="text-cyan-500">{icon}</span>
      {label}
    </div>
  );
}

export default function ArchitectureFirmPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#ecfeff_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(6,182,212,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(236,254,255,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Ruler className="h-4 w-4" />}
              label="Architecture industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700/70">
                Industries / Architecture Firm
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The ultimate software for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Architecture Firm
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Handle all your projects, from gathering leads and creating quotations
                to managing tasks, signing plans, and logging timesheets.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-cyan-600/30 hover:text-cyan-600"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-cyan-500">
                "
              </div>
              <p className="text-base leading-7 text-slate-700">
                AdonERP's automation has reduced human error and increased productivity,
                allowing employees to focus on activities that add the most value.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Michael Chen</p>
                  <p className="text-sm text-slate-500">Principal Architect, Chen & Associates</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-cyan-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#ecfeff_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(6,182,212,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-cyan-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-cyan-300",
                            "bg-sky-300",
                            "bg-teal-300",
                            "bg-cyan-300",
                            "bg-sky-300",
                            "bg-teal-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-cyan-600 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <Ruler className="h-10 w-10 fill-cyan-500 text-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart project management Section */}
      <section className="bg-cyan-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-3 h-4 rounded-full bg-slate-200" />
                    <div className="h-16 rounded-xl bg-white shadow-sm" />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 text-5xl">🏠</div>
              <ScriptHeading>
                <span className="rounded-full border-4 border-pink-400 px-2">
                  Smart
                </span>{" "}
                project
                <br />
                management
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Centralize dashboards, handle recurring tasks, organize activities,
                and keep every project moving smoothly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <HardDrive className="h-4 w-4 text-cyan-600" />
                  Task tracking
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Users className="h-4 w-4 text-cyan-600" />
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
          <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
            quotations
          </span>
        </ScriptHeading>

        <div className="mt-8 grid gap-6 text-base leading-7 text-slate-600 md:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            Create custom quotations aligned with your project scope, pricing,
            files, blueprints, and architectural services.
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            Use templates and built-in quote tools to make proposals faster and
            more professional.
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {["Quotation", "Proposal", "Invoice"].map((title, idx) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-5 aspect-[3/4] rounded-xl bg-gradient-to-br from-cyan-100 to-slate-200" />
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-400">Ready to send</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finance management to turn profit Section */}
      <section className="bg-cyan-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScriptHeading>
              Finance management to turn{" "}
              <span className="text-teal-600 underline decoration-teal-400 decoration-4 underline-offset-8">
                profit
              </span>
            </ScriptHeading>
          </div>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-8 h-8 w-32 rounded-full bg-slate-100" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded-full bg-slate-100" />
                  <div className="h-4 w-16 rounded-full bg-slate-100" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded-full bg-slate-100" />
                  <div className="h-4 w-12 rounded-full bg-slate-100" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 rounded-full bg-slate-100" />
                  <div className="h-4 w-14 rounded-full bg-slate-100" />
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                    <div className="h-5 w-20 rounded-full bg-cyan-100" />
                  </div>
                </div>
                <div className="h-10 rounded-xl bg-cyan-600" />
              </div>
            </div>

            <div className="space-y-5 text-left text-slate-600">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <strong className="text-slate-900">Flexible invoicing.</strong>
                <p className="mt-2">Invoice clients based on fixed rates, time and material, or milestones.</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <strong className="text-slate-900">Analytical breakdowns</strong>
                <p className="mt-2">Help track profitability and costs on each project.</p>
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
            <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
              planning
            </span>
          </ScriptHeading>
          <p className="mt-6 text-base leading-7 text-slate-600">
            Create shifts, track colleagues, material resources, planning,
            recruiting shifts and project timelines.
          </p>
        </div>

        <div className="relative mx-auto mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
            <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span>Resource</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {["Senior Architect", "Junior Designer", "3D Visualizer", "Project Manager", "Intern"].map((role, idx) => (
              <div key={role} className="grid grid-cols-5 gap-3 px-6 py-3 text-sm text-slate-600">
                <span className="font-medium text-slate-900">{role}</span>
                <div className={`h-6 rounded ${idx % 2 === 0 ? "bg-cyan-100" : "bg-slate-100"}`} />
                <div className={`h-6 rounded ${idx % 3 === 0 ? "bg-purple-100" : "bg-slate-100"}`} />
                <div className={`h-6 rounded ${idx % 2 === 1 ? "bg-cyan-100" : "bg-slate-100"}`} />
                <div className={`h-6 rounded ${idx % 4 === 0 ? "bg-yellow-100" : "bg-slate-100"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#ecfeff] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Complete tools for architecture projects, quotes, planning,
              signatures, timesheets and invoicing.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.6rem] border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
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
          <p className="max-w-xl text-base leading-7 text-slate-600">
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
                className="group rounded-[1.6rem] border border-slate-200 bg-white px-5 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{app.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
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
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-slate-700">
                "{testimonial.content}"
              </p>
              <div className="mt-6">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Banner */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#ecfeff_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-cyan-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-amber-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
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
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch an architecture firm workflow that helps you manage projects,
            create professional quotes, and track profitability.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start now
            </Link>
            <div
              id="advisor"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
            >
              <Calendar className="h-4 w-4" />
              15-day free trial
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">No credit card required</p>
        </div>
      </section>
    </main>
  );
}
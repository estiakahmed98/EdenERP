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
  Hammer,
  ClipboardList,
  Warehouse,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Business | EdenERP Industries",
  description:
    "A construction business landing page for EdenERP with project management, material tracking, timesheets, invoicing, and field service.",
};

const features = [
  {
    title: "Quotation builder",
    description: "Create professional construction quotes with materials, labor, and markup.",
  },
  {
    title: "Timesheet timer",
    description: "Track billable hours for crew members and subcontractors accurately.",
  },
  {
    title: "Clear traceability",
    description: "Follow every material from purchase order to job site installation.",
  },
  {
    title: "Invoicing",
    description: "Generate progress invoices based on milestones or completion percentage.",
  },
  {
    title: "Resource planning",
    description: "Schedule crew, equipment, and materials across multiple job sites.",
  },
  {
    title: "Opportunities",
    description: "Track bids, proposals, and win rates from your sales pipeline.",
  },
];

const apps = [
  { title: "CRM", subtitle: "Lead and bid management", icon: Users },
  { title: "Sales", subtitle: "Quotations and proposals", icon: ShoppingCart },
  { title: "Project", subtitle: "Job site task tracking", icon: HardDrive },
  { title: "Inventory", subtitle: "Material stock control", icon: Warehouse },
  { title: "Purchase", subtitle: "Supplier orders", icon: Package },
  { title: "Field Service", subtitle: "On-site operations", icon: Truck },
];

const testimonials = [
  {
    name: "Robert Johnson",
    role: "Owner, Johnson Construction Group",
    content:
      "The most significant change that EdenERP has brought to our business operations and culture is the sense of calm that has permeated our daily work life.",
    rating: 5,
  },
  {
    name: "Maria Gonzales",
    role: "Project Director, BuildRight Contractors",
    content:
      "From material tracking to timesheets and invoicing, EdenERP streamlined our entire construction workflow. No more material shortages or budget overruns.",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
      <span className="text-amber-500">{icon}</span>
      {label}
    </div>
  );
}

export default function ConstructionPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fffbeb_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(245,158,11,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,251,235,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Hammer className="h-4 w-4" />}
              label="Construction industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700/70">
                Industries / Construction
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  All-in-one toolkit for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  🏠 Construction business
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                EdenERP allows you to handle all aspects of construction projects from
                start to finish while eliminating pain points such as material
                shortages and budget management.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-amber-600/30 hover:text-amber-600"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-amber-500">
                "
              </div>
              <p className="text-base leading-7 text-slate-700">
                The most significant change that EdenERP has brought to our business
                operations and culture is the sense of calm that has permeated our
                daily work life.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Robert Johnson</p>
                  <p className="text-sm text-slate-500">Owner, Johnson Construction Group</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-amber-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#fffbeb_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(245,158,11,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-amber-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-amber-300",
                            "bg-yellow-300",
                            "bg-orange-300",
                            "bg-amber-300",
                            "bg-yellow-300",
                            "bg-orange-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-amber-600 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <Hammer className="h-10 w-10 fill-amber-500 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Groundbreaking project management Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Groundbreaking{" "}
              <span className="underline decoration-pink-400 decoration-4 underline-offset-8">
                project
              </span>
              <br />
              management
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Manage all aspects of your construction project from one dashboard.
              Track tasks, materials, stock moves, planning shifts and deadlines.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <ClipboardList className="h-4 w-4 text-amber-600" />
                Task tracking
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 text-amber-600" />
                Deadline management
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-3 h-4 rounded-full bg-slate-200" />
                  <div className="h-16 rounded-xl bg-white shadow-sm" />
                </div>
              ))}
            </div>
            <div className="mt-3 text-center text-xs text-slate-400">Project kanban • Active jobs</div>
          </div>
        </div>
      </section>

      {/* Never lose track of materials Section */}
      <section className="bg-amber-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-5xl">📦</div>
          <ScriptHeading>
            Never lose{" "}
            <span className="bg-yellow-300 px-2">track</span> of materials
          </ScriptHeading>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div className="space-y-5 text-slate-600">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <strong className="text-slate-900">Streamline purchasing.</strong>
                <p className="mt-2">Keep track of vendor orders and automate procurement with purchase agreements.</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <strong className="text-slate-900">Barcode scanning.</strong>
                <p className="mt-2">Use barcode scanners to simplify inventory operations.</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <strong className="text-slate-900">Material control.</strong>
                <p className="mt-2">Track all materials stored and used on construction jobs.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-slate-100" />
              <div className="space-y-3">
                {["Concrete", "Rebar", "Lumber", "Drywall", "Paint"].map((material, idx) => (
                  <div key={material} className="grid grid-cols-4 gap-3">
                    <div className={`h-7 rounded-xl ${idx === 0 ? "bg-amber-100" : "bg-slate-100"}`} />
                    <div className="h-7 rounded-xl bg-slate-100" />
                    <div className="h-7 rounded-xl bg-slate-100" />
                    <div className={`h-7 rounded-xl ${idx === 2 ? "bg-teal-100" : "bg-slate-100"}`} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center text-xs text-slate-400">Material inventory • Stock levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep an eye on the costs Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
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
                  <div className="h-5 w-20 rounded-full bg-amber-100" />
                </div>
              </div>
              <div className="h-10 rounded-xl bg-amber-600" />
            </div>
          </div>

          <div>
            <div className="mb-4 text-5xl">👁️</div>
            <ScriptHeading>
              Keep an eye on the{" "}
              <span className="bg-sky-300 px-2">costs</span>
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Invoice clients, manage contractor bills, log timesheets, track
              expenses and analyze cost distribution to keep every job profitable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <Clock className="h-4 w-4 text-amber-600" />
                Timesheet tracking
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <ReceiptText className="h-4 w-4 text-amber-600" />
                Expense management
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On to some final touches Section */}
      <section className="bg-amber-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            On to some final{" "}
            <span className="text-teal-600 underline decoration-teal-400 decoration-4 underline-offset-8">
              touches!
            </span>
          </ScriptHeading>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            Handle after-sales support, customer service requests and field service
            visits with organized tasks and map-based planning.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_280px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-3 h-4 rounded-full bg-slate-200" />
                    <div className="h-16 rounded-xl bg-white shadow-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="aspect-[3/5] rounded-xl bg-gradient-to-br from-sky-100 to-amber-100" />
              <div className="mt-3 text-center text-xs text-slate-400">Service map • Field locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#fffbeb] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Practical tools for construction quotes, projects, inventory,
              timesheets, invoices and planning.
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
            Expand as you grow with connected apps for your construction business,
            project management, inventory, and field operations.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
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
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#fffbeb_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-amber-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-yellow-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with EdenERP — the complete solution for
              construction companies and contractors.
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
            label="Ready to scale your business"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch a construction management workflow that helps you track materials,
            manage costs, and deliver projects on time and on budget.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 transition-transform duration-300 hover:-translate-y-0.5"
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
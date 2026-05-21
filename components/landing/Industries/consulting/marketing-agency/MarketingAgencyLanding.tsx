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
  Shirt,
  Scissors,
  Factory,
  Wrench,
  Cog,
  Layers,
  Sofa,
  Armchair,
  Calculator,
  Briefcase,
  FileCheck,
  Megaphone,
  TrendingUp,
  BarChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing Agency | EdenERP Industries",
  description:
    "A marketing agency landing page for EdenERP with website builder, project management, CRM, invoicing, and campaign tracking.",
};

const features = [
  {
    title: "Website builder",
    description: "Create stunning agency websites with drag-and-drop tools and AI assistance.",
  },
  {
    title: "Product configurator",
    description: "Build customizable service packages for different client needs.",
  },
  {
    title: "Pricelists",
    description: "Set flexible pricing by client tier, service type, or campaign.",
  },
  {
    title: "Automated delivery",
    description: "Auto-send deliverables and reports to clients upon completion.",
  },
  {
    title: "Recurring invoices",
    description: "Set up subscription billing for retainer clients.",
  },
  {
    title: "Easy purchasing",
    description: "Manage vendor orders for ad spend, printing, and tools.",
  },
];

const apps = [
  { title: "CRM", subtitle: "Lead and client management", icon: Users },
  { title: "Sales", subtitle: "Proposals and contracts", icon: ShoppingCart },
  { title: "Project", subtitle: "Campaign task tracking", icon: HardDrive },
  { title: "Social Marketing", subtitle: "Social media management", icon: Megaphone },
  { title: "Invoicing", subtitle: "Client billing", icon: ReceiptText },
  { title: "Website", subtitle: "Portfolio showcase", icon: Home },
];

const testimonials = [
  {
    name: "Michael Bennett",
    role: "CEO, Creative Spark Agency",
    content:
      "With most systems, you get 70% of what you hoped. With EdenERP, you get more than what you expected. It transformed our agency operations.",
    rating: 5,
  },
  {
    name: "Jessica Taylor",
    role: "Operations Director, Digital Flow",
    content:
      "From project management to recurring invoices, EdenERP streamlined everything. Our team is more productive and clients love the transparency.",
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

export default function MarketingAgencyPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#ecfeff_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(6,182,212,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(236,254,255,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Megaphone className="h-4 w-4" />}
              label="Agency industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700/70">
                Industries / Marketing Agency
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The best solution for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Marketing Agency
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                EdenERP allows you to streamline all aspects of your marketing agency on
                one intuitive platform, from building websites to managing projects,
                client communication and invoicing.
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
                With most systems, you get 70% of what you hoped. With EdenERP, you get
                more than what you expected. It transformed our agency operations.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Michael Bennett</p>
                  <p className="text-sm text-slate-500">CEO, Creative Spark Agency</p>
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
                  <Megaphone className="h-10 w-10 fill-cyan-500 text-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Make your services shine Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          Make your services shine
        </ScriptHeading>

        <div className="mt-8 grid gap-6 text-base leading-7 text-slate-600 md:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            Create a stunning website using EdenERP's AI-based builder, add
            photos, drag-and-drop elements, and SEO optimization tools.
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            Use templates and customization tools to showcase your agency services
            in a clear, polished way.
          </div>
        </div>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-5 h-8 rounded-xl bg-slate-100" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan-100 to-slate-200"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100" />
            <h3 className="font-bold text-slate-900">Creative Studio</h3>
            <p className="mt-1 text-sm text-slate-500">Present your services beautifully</p>
            <button className="mt-4 w-full rounded-xl bg-cyan-600 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* All-in-one project hub Section */}
      <section className="bg-cyan-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            All-in-one{" "}
            <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
              project
            </span>{" "}
            hub
          </ScriptHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Manage projects, tasks, timesheets, meetings, documents and team
            expenses from one complete dashboard.
          </p>

          <div className="mx-auto mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-4">
              {["To Do", "In Progress", "Review", "Done"].map((stage) => (
                <div key={stage} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-3 text-xs font-semibold text-cyan-600">{stage}</div>
                  <div className="space-y-2">
                    <div className="h-12 rounded-xl bg-white shadow-sm" />
                    <div className="h-12 rounded-xl bg-white shadow-sm" />
                    <div className="h-12 rounded-xl bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* From lead to invoice Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              From lead to{" "}
              <span className="underline decoration-yellow-400 decoration-4 underline-offset-8">
                invoice
              </span>
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Centralize leads, send invoices to clients in one click, and choose
              the best payment methods for your agency.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-cyan-600" />
                Lead tracking
              </div>
              <div className="flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm">
                <ReceiptText className="h-4 w-4 text-cyan-600" />
                One-click invoicing
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-3">
              {["New", "Proposal", "Won"].map((stage, idx) => (
                <div key={stage} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-3 text-xs font-semibold text-cyan-600">{stage}</div>
                  <div className="space-y-2">
                    <div className="h-12 rounded-xl bg-white shadow-sm" />
                    <div className="h-12 rounded-xl bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expand as you grow Section */}
      <section className="bg-cyan-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-slate-100" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {["SEO", "Social", "Content", "Email"].map((item, idx) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl mb-2">{idx === 0 ? "🔍" : idx === 1 ? "📱" : idx === 2 ? "✍️" : "📧"}</div>
                    <div className="text-xs font-medium">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <ScriptHeading>
                Expand as you grow
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Marketing warehouse apps centralize all your tools in one platform,
                automate scheduling, create events, and track campaign performance.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <BarChart className="h-4 w-4 text-cyan-600" />
                  Campaign analytics
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Calendar className="h-4 w-4 text-cyan-600" />
                  Auto-scheduling
                </div>
              </div>
            </div>
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
              Practical tools for agency websites, services, sales,
              automation, purchasing and recurring billing.
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
            Expand as you grow with connected apps for your agency, client
            management, projects, and billing.
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
              who grow their business with EdenERP — the complete solution for
              marketing agencies and creative studios.
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
            label="Ready to scale your agency"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch a marketing agency workflow that helps you manage clients,
            track campaigns, and deliver exceptional results.
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
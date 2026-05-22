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
  ClipboardCheck,
  MapPin,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Audit & Certification | AdonERP Industries",
  description:
    "An audit and certification landing page for AdonERP with website builder, CRM pipeline, field service, timesheets, and invoicing.",
};

const features = [
  {
    title: "CRM pipeline",
    description: "Track leads, audits, and certifications through every stage.",
  },
  {
    title: "Website builder",
    description: "Create professional websites with AI-generated content and forms.",
  },
  {
    title: "Service invoicing",
    description: "Generate invoices for audit services and certification fees.",
  },
  {
    title: "Timesheets",
    description: "Track billable hours by client, audit type, and certification level.",
  },
  {
    title: "Custom worksheets",
    description: "Create detailed audit checklists and certification forms.",
  },
  {
    title: "Free domain name",
    description: "Get a professional domain name included with your website.",
  },
];

const apps = [
  { title: "Website", subtitle: "Professional online presence", icon: Home },
  { title: "Sign", subtitle: "Electronic signatures", icon: FileSignature },
  { title: "Invoicing", subtitle: "Client billing", icon: ReceiptText },
  { title: "CRM", subtitle: "Lead management", icon: Users },
  { title: "Appointments", subtitle: "Onsite visit scheduling", icon: Calendar },
  { title: "Project", subtitle: "Audit task tracking", icon: HardDrive },
];

const testimonials = [
  {
    name: "Robert Chen",
    role: "Managing Director, Assurance Plus",
    content:
      "Our client base has increased by 40%, and AdonERP's advanced technology and tools have reduced operational efforts by 80%.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Operations Manager, Global Certifications",
    content:
      "The mobile audit solution transformed our field operations. Auditors can now complete certifications onsite and get signatures instantly.",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
      <span className="text-emerald-500">{icon}</span>
      {label}
    </div>
  );
}

export default function AuditCertificationPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#ecfdf5_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(236,253,245,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<ClipboardCheck className="h-4 w-4" />}
              label="Audit industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700/70">
                Industries / Audit & Certification
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  #1 software for
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Audit and Certification businesses
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                AdonERP contains an AI-based website builder, an intuitive CRM pipeline
                to manage leads, and a complete Field Service solution to handle your
                onsite visits.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-emerald-600/30 hover:text-emerald-600"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-emerald-500">
                "
              </div>
              <p className="text-base leading-7 text-slate-700">
                Our client base has increased by 40%, and AdonERP's advanced
                technology and tools have reduced operational efforts by 80%.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Robert Chen</p>
                  <p className="text-sm text-slate-500">Managing Director, Assurance Plus</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-emerald-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#ecfdf5_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(16,185,129,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-emerald-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-emerald-300",
                            "bg-green-300",
                            "bg-teal-300",
                            "bg-emerald-300",
                            "bg-green-300",
                            "bg-teal-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-emerald-600 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <ClipboardCheck className="h-10 w-10 fill-emerald-500 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-based website builder Section */}
      <section className="bg-emerald-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 text-5xl">💡</div>
              <ScriptHeading>
                <span className="underline decoration-pink-400 decoration-4 underline-offset-8">
                  AI-based
                </span>{" "}
                website
                <br />
                builder
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Build a professional website using AI-generated content, templates,
                picture libraries and drag-and-drop elements.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  AI content generation
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Home className="h-4 w-4 text-emerald-600" />
                  Free domain included
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-slate-100" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-100 to-slate-200"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 text-base leading-7 text-slate-600 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              Set up contact forms that automatically create leads, appointments or
              onsite audit tasks.
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              Enjoy a free domain plan connected to your database and business site.
            </div>
          </div>
        </div>
      </section>

      {/* Easy lead management Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Easy lead
              <br />
              management
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Centralize leads from your website, email, phone and direct contact in
              one intuitive pipeline. Schedule activities and turn leads into sales
              with ease.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm">
                <Users className="h-4 w-4 text-emerald-600" />
                Lead tracking
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 text-emerald-600" />
                Activity scheduling
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-3">
              {["New Leads", "Qualified", "Won"].map((stage) => (
                <div key={stage} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-3 text-xs font-semibold text-emerald-600">{stage}</div>
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

      {/* Mobile solution for onsite audits Section */}
      <section className="bg-emerald-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-5xl">📱</div>
          <ScriptHeading>
            <span className="text-teal-600">Mobile</span> solution for onsite
            audits
          </ScriptHeading>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6 text-left text-base leading-7 text-slate-600 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              Streamline services. Once a sale is finalized, a task containing all
              visit information is automatically created.
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              Auditors can navigate to the client location, verify information, fill
              certification data and get signatures.
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="mx-auto max-w-xs rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="aspect-[3/5] rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-emerald-600" />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-slate-700">Navigate to location</p>
            </div>

            <div className="mx-auto max-w-xs rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="mb-5 h-6 w-24 rounded-full bg-slate-100" />
              <div className="space-y-3">
                <div className="h-8 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-emerald-100" />
                <div className="h-10 rounded-xl bg-emerald-200" />
                <div className="h-8 rounded-xl bg-teal-100" />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-slate-700">Fill in certification data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#ecfdf5] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Tools for audit and certification teams to manage leads, websites,
              visits, timesheets, worksheets and invoicing.
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
            Expand as you grow with connected apps for your audit and certification
            business, lead management, field service, and billing.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
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
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#ecfdf5_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-emerald-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-amber-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with AdonERP — the complete solution for
              audit firms and certification bodies.
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
            Launch an audit and certification workflow that helps you manage leads,
            conduct onsite visits, and deliver professional certifications.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 hover:-translate-y-0.5"
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
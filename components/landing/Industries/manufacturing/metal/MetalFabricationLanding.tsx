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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Metal Fabrication | AdonERP Industries",
  description:
    "A metal fabrication landing page for AdonERP with CRM, quote calculator, procurement automation, inventory, and project management.",
};

const features = [
  {
    title: "CRM pipeline",
    description: "Track leads, quotes, and projects through every sales stage.",
  },
  {
    title: "Clear traceability",
    description: "Follow materials from raw stock to finished fabricated parts.",
  },
  {
    title: "Quote Calculator",
    description: "Calculate accurate quotes based on materials, labor, and complexity.",
  },
  {
    title: "Automate procurement",
    description: "Auto-create purchase orders when raw materials run low.",
  },
  {
    title: "Project top bar",
    description: "Visualize project progress, deadlines, and key metrics at a glance.",
  },
  {
    title: "Flexible invoicing",
    description: "Invoice based on milestones, partial deliveries, or custom terms.",
  },
];

const apps = [
  { title: "CRM", subtitle: "Lead and quote management", icon: Users },
  { title: "Manufacturing", subtitle: "Production planning", icon: Factory },
  { title: "Inventory", subtitle: "Raw material stock", icon: Warehouse },
  { title: "Invoicing", subtitle: "Customer billing", icon: ReceiptText },
  { title: "Purchase", subtitle: "Supplier orders", icon: Package },
  { title: "Project", subtitle: "Order tracking", icon: HardDrive },
];

const testimonials = [
  {
    name: "Mike Thompson",
    role: "Operations Director, Precision Metals Inc.",
    content:
      "I am the first to admit, after all of that cussing and badmouthing because we were just a mess at the beginning, now that it's functioning, it is a fantastic program.",
    rating: 5,
  },
  {
    name: "Elena Vasquez",
    role: "Owner, Superior Fabrication",
    content:
      "AdonERP transformed our metal fabrication business. The quote calculator alone saved us hours, and the procurement automation keeps our shop running smoothly.",
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

// Calculator icon component
function Calculator(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <circle cx="12" cy="14" r="1" />
      <circle cx="12" cy="18" r="1" />
      <line x1="8" y1="14" x2="8" y2="18" />
      <line x1="8" y1="10" x2="16" y2="10" />
    </svg>
  );
}

export default function MetalFabricationPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Cog className="h-4 w-4" />}
              label="Metal fabrication industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Metal Fabrication
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The All-in-One Software for
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Metal Fabrication
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Manage customer relationships, create accurate quotes, and handle
                everything from simple sales orders to complex projects.
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
                I am the first to admit, after all of that cussing and badmouthing
                because we were just a mess at the beginning, now that it's
                functioning, it is a fantastic program.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Mike Thompson</p>
                  <p className="text-sm text-muted-foreground">Operations Director, Precision Metals Inc.</p>
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
                            "bg-slate-300/70",
                            "bg-gray-300/70",
                            "bg-slate-400/70",
                            "bg-gray-400/70",
                            "bg-slate-300/70",
                            "bg-gray-300/70",
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
                  <Cog className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft custom quotes Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
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

            <div>
              <ScriptHeading>
                Craft custom
                <br />
                <span className="bg-primary/20 px-2 rounded">quotes</span>
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Generate quotations and define the most accurate price for clients
                with a built-in quote calculator.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Calculator className="h-4 w-4 text-primary" />
                  Material costing
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  Labor estimation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timely delivery starts with timely replenishment Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Timely delivery{" "}
          <span className="underline decoration-primary underline-offset-8">
            starts
          </span>{" "}
          with timely replenishment
        </ScriptHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
          Get a complete overview of production processes and manage everything
          from cost estimation to final delivery.
        </p>

        <div className="relative mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span>Material</span>
              <span>On Hand</span>
              <span>Min Stock</span>
              <span>Order Qty</span>
              <span>Status</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {[
              ["Steel Sheet 3mm", "2,500 kg", "1,000 kg", "3,000 kg", "Good"],
              ["Aluminum Bar", "850 kg", "500 kg", "1,000 kg", "Reorder"],
              ["Stainless Rod", "320 kg", "300 kg", "500 kg", "Low stock"],
              ["Brass Plate", "1,200 kg", "800 kg", "1,500 kg", "Good"],
              ["Copper Wire", "180 kg", "200 kg", "300 kg", "Reorder"],
            ].map((row) => (
              <div key={row[0]} className="grid grid-cols-5 gap-3 px-6 py-4 text-sm">
                <span className="font-medium text-foreground">{row[0]}</span>
                <span className="text-foreground">{row[1]}</span>
                <span className="text-foreground">{row[2]}</span>
                <span className="text-foreground">{row[3]}</span>
                <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                  row[4] === "Good" ? "bg-accent/20 text-accent-foreground" :
                  row[4] === "Reorder" ? "bg-destructive/20 text-destructive" :
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}>{row[4]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track your purchase Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            Track your{" "}
            <span className="underline decoration-primary underline-offset-8">
              purchase
            </span>
          </ScriptHeading>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Manage, group, compare and validate your purchases while automating the
            creation process.
          </p>

          <div className="relative mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="grid grid-cols-6 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>PO #</span>
                <span>Supplier</span>
                <span>Material</span>
                <span>Qty</span>
                <span>Unit Price</span>
                <span>Status</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                ["PO-2451", "Metal Supply Co.", "Steel Sheet", "500 kg", "$2.50/kg", "Delivered"],
                ["PO-2452", "Alloy Distributors", "Aluminum Bar", "300 kg", "$4.20/kg", "Processing"],
                ["PO-2453", "Fastener World", "Bolts M8", "1,000 pcs", "$0.15/pc", "Shipped"],
                ["PO-2454", "Metal Depot", "Stainless Rod", "200 kg", "$5.80/kg", "Processing"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-6 gap-3 px-6 py-4 text-sm">
                  <span className="font-medium text-foreground">{row[0]}</span>
                  <span className="text-foreground">{row[1]}</span>
                  <span className="text-foreground">{row[2]}</span>
                  <span className="text-foreground">{row[3]}</span>
                  <span className="text-foreground">{row[4]}</span>
                  <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                    row[5] === "Delivered" ? "bg-accent/20 text-accent-foreground" :
                    row[5] === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>{row[5]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Effortless project management Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Effortless project
              <br />
              management
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Customize your project overview, track only the essential information,
              and keep the right details visible without overload.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Layers className="h-4 w-4" />
                Custom views
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Calendar className="h-4 w-4" />
                Timeline tracking
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-3">
              {["To Do", "In Progress", "Done"].map((stage, idx) => (
                <div key={stage} className="rounded-xl bg-muted/30 p-4">
                  <div className="mb-3 text-xs font-semibold text-primary">{stage}</div>
                  <div className="space-y-2">
                    <div className="h-12 rounded-xl bg-card shadow-sm" />
                    <div className="h-12 rounded-xl bg-card shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
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
              Complete tools for fabrication quotes, production, purchasing,
              traceability, invoicing and project management.
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
            Expand as you grow with connected apps for your metal fabrication
            operation, CRM, production, and inventory.
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
              metal fabrication shops and manufacturers.
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
            label="Ready to scale your fabrication shop"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a metal fabrication workflow that helps you create accurate quotes,
            manage production, and deliver quality products on time.
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
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Textile Manufacturing | AdonERP Industries",
  description:
    "A textile manufacturing landing page for AdonERP with CRM, production management, inventory tracking, purchasing, and subcontracting.",
};

const features = [
  {
    title: "CRM pipeline",
    description: "Track leads, samples, and quotations through every sales stage.",
  },
  {
    title: "Clear traceability",
    description: "Follow materials from raw goods to finished products with lot tracking.",
  },
  {
    title: "Subcontracting Management",
    description: "Coordinate with external partners for dyeing, printing, and finishing.",
  },
  {
    title: "Automate workflow",
    description: "Auto-create manufacturing orders when sales are confirmed.",
  },
  {
    title: "Project top bar",
    description: "Visualize project progress, deadlines, and key metrics at a glance.",
  },
  {
    title: "Flexible invoicing",
    description: "Invoice based on milestones, quantities, or custom terms.",
  },
];

const apps = [
  { title: "CRM", subtitle: "Lead and sample management", icon: Users },
  { title: "Manufacturing", subtitle: "Production planning", icon: Factory },
  { title: "Inventory", subtitle: "Raw material stock", icon: Warehouse },
  { title: "Website", subtitle: "Product showcase", icon: Home },
  { title: "Purchase", subtitle: "Supplier orders", icon: Package },
  { title: "Project", subtitle: "Order tracking", icon: HardDrive },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Production Director, Silk Road Textiles",
    content:
      "It's very good and detailed. Each module has so many things, you are never out of control. From raw material to finished goods, everything is traceable.",
    rating: 5,
  },
  {
    name: "Ahmed Malik",
    role: "Owner, Crescent Fabrics",
    content:
      "AdonERP transformed our textile manufacturing workflow. The integration between CRM, production, and inventory is seamless. Our lead times have improved dramatically.",
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

export default function TextileManufacturingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Shirt className="h-4 w-4" />}
              label="Textile industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Textile Manufacturing
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
                  Textile Manufacturing
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Manage customer relationships, create accurate quotes, and handle
                every step of production from product design to shipping.
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
                It's very good and detailed. Each module has so many things, you
                are never out of control. From raw material to finished goods,
                everything is traceable.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Production Director, Silk Road Textiles</p>
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
                            "bg-teal-300/70",
                            "bg-cyan-300/70",
                            "bg-emerald-300/70",
                            "bg-green-300/70",
                            "bg-teal-300/70",
                            "bg-cyan-300/70",
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
                  <Shirt className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Efficient client communication Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Efficient client{" "}
          <span className="underline decoration-primary underline-offset-8">
            communication
          </span>
        </ScriptHeading>

        <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2">
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            The CRM qualifies leads, allowing immediate creation of project
            samples and quotations.
          </div>
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            Allow customers to easily request a quote using predefined templates
            on your website.
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-4">
            {["New Leads", "Samples", "Quotations", "Production"].map((stage, idx) => (
              <div key={stage} className="rounded-xl bg-muted/30 p-4">
                <div className="mb-3 text-xs font-semibold text-primary">{stage}</div>
                <div className="space-y-2">
                  <div className="h-12 rounded-xl bg-card shadow-sm" />
                  <div className="h-12 rounded-xl bg-card shadow-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">CRM pipeline • Lead to production</div>
        </div>
      </section>

      {/* Streamlined stock management Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            <span className="underline decoration-primary underline-offset-8">
              Streamlined
            </span>{" "}
            stock management
          </ScriptHeading>

          <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2">
            <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
              Delivery orders are automatically created in inventory when sales
              operations are confirmed.
            </div>
            <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
              Lots and package tracking allows full traceability of your inventory.
            </div>
          </div>

          <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-muted" />
              <div className="grid grid-cols-2 gap-5">
                {["Cotton Rolls", "Dyed Fabric", "Zippers", "Threads"].map((item, idx) => (
                  <div key={item} className="rounded-xl bg-muted/30 p-5">
                    <div className="mb-4 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-muted" />
                    <div className="h-8 rounded-xl bg-primary/20" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-card" />
              <div className="space-y-3">
                {["Order #TX-101", "Order #TX-102", "Order #TX-103", "Order #TX-104"].map((order, idx) => (
                  <div key={order} className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                    <div className="h-8 w-8 rounded-full bg-card" />
                    <div className="h-3 flex-1 rounded-full bg-muted" />
                    <div className={`h-5 w-12 rounded-full ${idx % 2 === 0 ? "bg-accent/20" : "bg-secondary/20"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth production workflow Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Smooth production
              <br />
              workflow
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Create predefined or custom bills of material, procure components
              automatically, and track production with shop floor operations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Scissors className="h-4 w-4" />
                BOM management
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Factory className="h-4 w-4" />
                Shop floor control
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-5 h-8 rounded-xl bg-muted" />
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="rounded-xl bg-muted/30 p-4">
                  <div className="mb-3 h-4 rounded-full bg-muted" />
                  <div className="h-14 rounded-xl bg-card shadow-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track your purchase Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            Track your{" "}
            <span className="underline decoration-primary underline-offset-8">
              purchase
            </span>
          </ScriptHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Handle purchasing, dropshipping, and subcontracting to keep your
            inventory perfectly stocked.
          </p>

          <div className="relative mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="grid grid-cols-6 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>PO #</span>
                <span>Supplier</span>
                <span>Material</span>
                <span>Qty</span>
                <span>Status</span>
                <span>ETA</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                ["PO-1001", "Fabric Supply Co.", "Cotton Blend", "500 m", "Shipped", "May 28"],
                ["PO-1002", "Thread Masters", "Polyester Thread", "100 spools", "Processing", "Jun 02"],
                ["PO-1003", "Dye Solutions", "Reactive Dyes", "50 kg", "Delivered", "May 25"],
                ["PO-1004", "Zipper World", "Metal Zippers", "200 pcs", "Processing", "Jun 05"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-6 gap-3 px-6 py-4 text-sm">
                  <span className="font-medium text-foreground">{row[0]}</span>
                  <span className="text-foreground">{row[1]}</span>
                  <span className="text-foreground">{row[2]}</span>
                  <span className="text-foreground">{row[3]}</span>
                  <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                    row[4] === "Delivered" ? "bg-accent/20 text-accent-foreground" :
                    row[4] === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>{row[4]}</span>
                  <span className="text-foreground">{row[5]}</span>
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
              Smart tools for textile production, inventory, quotations,
              traceability, purchasing and invoicing.
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
            Expand as you grow with connected apps for your textile manufacturing
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
              textile manufacturers and apparel producers.
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
            label="Ready to scale your production"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a textile manufacturing workflow that helps you manage
            production, track materials, and deliver quality products on time.
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
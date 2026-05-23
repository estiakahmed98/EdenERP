import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Box,
  Calendar,
  Clock,
  CreditCard,
  Heart,
  Package,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Table,
  Tag,
  Truck,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant | AdonERP Industries",
  description:
    "A restaurant industry landing page for AdonERP with point of sale, table booking, inventory management, and staff scheduling.",
};

const features = [
  {
    title: "Compatible with any device",
    description: "Works perfectly on tablets, laptops, desktops, and kitchen display systems.",
  },
  {
    title: "Custom floor plans",
    description: "Design and manage your restaurant layout with drag-and-drop tools.",
  },
  {
    title: "Table management",
    description: "Track table status, split bills, and manage orders efficiently.",
  },
  {
    title: "Purchase Orders",
    description: "Create and track purchase orders for ingredients and supplies.",
  },
  {
    title: "Table Booking",
    description: "Accept online reservations and manage booking calendar.",
  },
  {
    title: "Staff Scheduling",
    description: "Plan shifts, manage attendance, and optimize labor costs.",
  },
  {
    title: "Replenishment",
    description: "Automated reordering when stock reaches minimum levels.",
  },
  {
    title: "Planning",
    description: "Organize services, events, and daily operations seamlessly.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast order taking & billing", icon: ShoppingBag },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Package },
  { title: "Appointments", subtitle: "Online table booking", icon: Calendar },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Box },
  { title: "Planning", subtitle: "Staff shift management", icon: Clock },
  { title: "Website", subtitle: "Restaurant online presence", icon: Utensils },
];

const testimonials = [
  {
    name: "Chef Antonio Rossi",
    role: "Owner, Bella Italia",
    content:
      "AdonERP improved resource management, making planning and invoicing more efficient, enhancing communication and collaboration across our team.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Manager, The Gourmet Kitchen",
    content:
      "From table bookings to inventory management, AdonERP transformed how we run our restaurant. The POS is incredibly intuitive and our staff loves it.",
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

export default function RestaurantPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Utensils className="h-4 w-4" />}
              label="Restaurant industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Restaurant
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
                  Restaurant
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                AdonERP offers everything your restaurant needs to manage point of sale,
                inventory, staff, reservations, purchasing, and services from one platform.
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
                AdonERP improved resource management, making planning and invoicing more
                efficient, enhancing communication and collaboration across our team.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Chef Antonio Rossi</p>
                  <p className="text-sm text-muted-foreground">Owner, Bella Italia</p>
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
                            "bg-orange-300/70",
                            "bg-amber-300/70",
                            "bg-yellow-300/70",
                            "bg-red-300/70",
                            "bg-rose-300/70",
                            "bg-lime-300/70",
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
                  <Utensils className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Take your orders with precision Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Take your orders with precision
        </ScriptHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
          Manage restaurant orders, floor operations, split bills and payments
          with an intuitive point-of-sale interface.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl md:col-span-2">
            <div className="mb-4 h-8 rounded-xl bg-muted" />
            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-muted" />
              <div className="h-12 rounded-xl bg-muted" />
              <div className="h-12 rounded-xl bg-primary/20" />
              <div className="h-12 rounded-xl bg-muted" />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 h-8 rounded-xl bg-muted" />
            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-muted" />
              <div className="h-12 rounded-xl bg-primary/20" />
              <div className="h-12 rounded-xl bg-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* Table booking made simple Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-3 text-5xl">😊</div>
            <ScriptHeading>
              Table booking made simple
            </ScriptHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              Create table bookings, manage reservations, and organize restaurant
              floor plans with clear visual tools.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-muted text-2xl"
                  >
                    {index % 4 === 0 && "🍽️"}
                    {index % 4 === 1 && "🪑"}
                    {index % 4 === 2 && "🧑"}
                    {index % 4 === 3 && "✨"}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Floor plan • 12 tables
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-24 rounded-full bg-muted" />
                <div className="h-6 w-16 rounded-full bg-primary/20" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-32 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-20 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-primary/20" />
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-28 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-16 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-primary/20" />
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-36 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-24 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Never ever run out of stock Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Never ever run{" "}
          <span className="bg-primary/20 px-2 rounded">out of stock</span>
        </ScriptHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
          Automate purchase orders and manage replenishment so your kitchen always
          has the ingredients it needs.
        </p>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>Ingredient</span>
                <span>On Hand</span>
                <span>Min Stock</span>
                <span>Order Qty</span>
                <span>Status</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                ["Tomatoes", "15 kg", "10 kg", "20 kg", "Good"],
                ["Onions", "8 kg", "10 kg", "15 kg", "Reorder"],
                ["Chicken Breast", "22 kg", "15 kg", "25 kg", "Good"],
                ["Olive Oil", "5 L", "8 L", "12 L", "Low stock"],
                ["Parmesan Cheese", "3 kg", "4 kg", "6 kg", "Reorder"],
                ["Fresh Basil", "2 kg", "2 kg", "3 kg", "Warning"],
              ].map((row, idx) => (
                <div key={row[0]} className="grid grid-cols-5 gap-3 px-6 py-4 text-sm">
                  <span className="font-medium text-foreground">{row[0]}</span>
                  <span className="text-foreground">{row[1]}</span>
                  <span className="text-foreground">{row[2]}</span>
                  <span className="text-foreground">{row[3]}</span>
                  <span>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      row[4] === "Good" ? "bg-accent/20 text-accent-foreground" :
                      row[4] === "Reorder" ? "bg-destructive/20 text-destructive" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {row[4]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plan your services like a pro Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="mb-4 h-8 rounded-xl bg-muted" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-32 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-48 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-primary/20" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-28 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-40 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-primary/20" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 w-36 rounded-full bg-muted" />
                    <div className="mt-1 h-2 w-52 rounded-full bg-muted/50" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-primary/20" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 text-5xl">🕒</div>
              <ScriptHeading>
                Plan your services
                <br />
                like a pro
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Schedule staff, organize shifts, manage planning and keep your
                restaurant team aligned every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  Shift planning
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Users className="h-4 w-4 text-primary" />
                  Team management
                </div>
              </div>
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
              Smart restaurant tools for service, reservations, stock management, and
              team coordination from one platform.
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
            Expand as you grow with connected apps for your restaurant operation,
            inventory, reservations, and team management.
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
              restaurants and hospitality.
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
            label="Ready to scale your restaurant"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a restaurant management workflow that helps your team serve
            faster, manage reservations, and scale from one location to many.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Start now
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required</p>
        </div>
      </section>
    </main>
  );
}
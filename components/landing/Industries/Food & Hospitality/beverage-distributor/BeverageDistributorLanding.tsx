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
  Gift,
  Heart,
  Home,
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
  Beer,
  Wine,
  Coffee,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beverage Distributor | EdenERP Industries",
  description:
    "A beverage distributor and liquor store landing page for EdenERP with point of sale, inventory management, B2B/B2C eCommerce, and bottle return workflows.",
};

const features = [
  {
    title: "Easy Material renting",
    description: "Manage keg and equipment rentals for events and bars with ease.",
  },
  {
    title: "HR Apps",
    description: "Track employee schedules, payroll, and performance from one place.",
  },
  {
    title: "Organize Events",
    description: "Plan tastings, launches, and promotions directly from your platform.",
  },
  {
    title: "Marketing Apps",
    description: "Launch email campaigns and loyalty programs to boost repeat business.",
  },
  {
    title: "Transport Management System",
    description: "Optimize delivery routes and manage fleet operations efficiently.",
  },
  {
    title: "Customer Loyalty tools",
    description: "Reward repeat customers with points, discounts, and exclusive offers.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Package },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Box },
  { title: "Planning", subtitle: "Delivery route optimization", icon: Calendar },
  { title: "Employees", subtitle: "Staff management", icon: Users },
  { title: "Project", subtitle: "Event management", icon: Calendar },
];

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Owner, Vintage Wines & Spirits",
    content:
      "The processing time for accounting documents prior to analysis is now reduced from 2 days to only 5 hours, allowing us to focus on reporting and counseling.",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    role: "Operations Director, Craft Beer Collective",
    content:
      "EdenERP transformed our beverage distribution. From keg tracking to B2B ordering, everything runs smoothly. Our customers love the online shop.",
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

export default function BeverageDistributorPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fffbeb_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(245,158,11,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,251,235,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Beer className="h-4 w-4" />}
              label="Beverage industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700/70">
                Industries / Beverage Distributor
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  All you need to digitize your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  🍺 Liquor Store
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                EdenERP allows you to manage the entire sales cycle of your beverage
                distribution business, from inventory to point of sale, custom
                features, craft drinks and bottle returns.
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
                The processing time for accounting documents prior to analysis is now
                reduced from 2 days to only 5 hours, allowing us to focus on reporting
                and counseling.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Marco Rossi</p>
                  <p className="text-sm text-slate-500">Owner, Vintage Wines & Spirits</p>
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
                  <Beer className="h-10 w-10 fill-amber-500 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POS optimized for beverages Section */}
      <section className="bg-amber-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="mb-4 h-8 rounded-xl bg-slate-100" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100"
                  />
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <ScriptHeading>
                PoS optimized for
                <br />
                <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
                  beverages
                </span>
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Run a beverage store with B2B pricelists, multiple packaging, fast
                product creation, consignments, and bottle return workflows.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Beer className="h-4 w-4 text-amber-600" />
                  Bottle return
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Package className="h-4 w-4 text-amber-600" />
                  Multiple packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B and B2C online shop Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          B2B and{" "}
          <span className="underline decoration-yellow-400 decoration-4 underline-offset-8">
            B2C
          </span>{" "}
          online shop
        </ScriptHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
          Restaurants and cafés work with your B2B account, while customers can
          browse products, pick up in store, or order delivery.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl items-start gap-8 md:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-5 h-8 rounded-xl bg-slate-100" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-amber-100 to-slate-200"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <h3 className="font-bold text-slate-900">Your Cart</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Craft Beer Pack</span>
                <span>$24.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Red Wine Bottle</span>
                <span>$18.50</span>
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$42.50</span>
              </div>
            </div>
            <button className="mt-5 w-full rounded-xl bg-amber-600 py-2 text-sm font-semibold text-white transition hover:bg-amber-700">
              Checkout
            </button>
          </div>
        </div>
      </section>

      {/* Modern inventory management Section */}
      <section className="bg-amber-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 flex gap-1 text-4xl text-amber-600">
                <Barcode className="h-10 w-10" />
              </div>
              <ScriptHeading>
                Modern{" "}
                <span className="underline decoration-pink-400 decoration-4 underline-offset-8">
                  inventory
                </span>
                <br />
                management
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Receive, store and deliver faster with barcode scanning. Buy
                pallets, sell by boxes, and handle packaging smoothly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Barcode className="h-4 w-4 text-amber-600" />
                  Batch tracking
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Box className="h-4 w-4 text-amber-600" />
                  Multi-unit selling
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-5 h-8 rounded-xl bg-slate-100" />
              <div className="space-y-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="h-8 w-8 rounded-full bg-white" />
                    <div className="h-3 flex-1 rounded-full bg-slate-200" />
                    <div className="h-6 w-12 rounded-full bg-amber-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Accounting Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1 mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
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

          <div className="order-1 md:order-2">
            <div className="mb-4 text-5xl">📘</div>
            <ScriptHeading>
              Integrated Accounting
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Imagine having all your data in real-time, from inventory to sales.
              Everything becomes easier with inventory valuation, customer
              statements, and more.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <CreditCard className="h-4 w-4 text-amber-600" />
                Real-time valuation
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
                <ReceiptText className="h-4 w-4 text-amber-600" />
                Customer statements
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#fefaf0] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Smart tools for beverage retail, inventory management, logistics, events,
              team management, and customer loyalty.
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
            Expand as you grow with connected apps for your beverage distribution
            operation, inventory, logistics, and customer management.
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
              beverage distributors and liquor stores.
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
              The #1 Brewery
              <br />
              and liquor store apps
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch a beverage distribution workflow that helps you manage inventory,
            streamline B2B/B2C sales, and scale from one location to many.
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
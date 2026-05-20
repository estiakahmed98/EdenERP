import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Box,
  Calendar,
  CreditCard,
  Heart,
  Package,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Grocery Store | EdenERP Industries",
  description:
    "A grocery store industry landing page for EdenERP with point of sale, inventory management, loyalty programs, and expiration tracking.",
};

const rewards = ["Coupon", "Loyalty cards", "Promotions", "Discount", "Gift card"];

const features = [
  {
    title: "Payment providers",
    description: "Accept multiple payment methods including cards, e-wallets, and contactless.",
  },
  {
    title: "Multiple cashiers",
    description: "Manage several cashier accounts with badges or PIN codes.",
  },
  {
    title: "Integrated accounting",
    description: "Seamless accounting integration for real-time financial tracking.",
  },
  {
    title: "Bills reloading",
    description: "Easily reload and manage utility bill payments for customers.",
  },
  {
    title: "Loyalty programs",
    description: "Reward returning customers with points and exclusive discounts.",
  },
  {
    title: "Reporting",
    description: "Track sales trends, bestsellers, and stock performance in one place.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "Sales", subtitle: "Manage orders and quotations", icon: ShoppingCart },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Package },
  { title: "Employees", subtitle: "Staff management and scheduling", icon: Users },
  { title: "Accounting", subtitle: "Professional financial management", icon: CreditCard },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Box },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Owner, FreshMart",
    content:
      "I have used other programs before, but EdenERP has a variety of layers that make it easier to work. From expiration tracking to loyalty programs, everything just works.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Store Manager, GreenGrocers",
    content:
      "The integrated POS and inventory management saved us hours of manual work. Our perishable waste reduced by 30% since we started tracking expiration dates.",
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

export default function GroceryStorePage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#f0fdf4_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(34,197,94,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(240,253,244,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<ShoppingBag className="h-4 w-4" />}
              label="Grocery industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700/70">
                Industries / Grocery Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  All-in-one software for
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Grocery Stores
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                EdenERP contains an intuitive, easy-to-set-up Point of Sale, and allows
                you to streamline purchasing, sales, inventory management, accounting,
                and B2C/B2B sales from one platform.
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
                I have used other programs before, but EdenERP has a variety
                of layers that make it easier to work. From expiration tracking
                to loyalty programs, everything just works.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">Owner, FreshMart</p>
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
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#f0fdf4_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(34,197,94,0.15)]">
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
                            "bg-sky-300",
                            "bg-amber-300",
                            "bg-fuchsia-300",
                            "bg-rose-300",
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
                  <ShoppingCart className="h-10 w-10 fill-emerald-500 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reliable Point of Sale Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionEyebrow
            icon={<ShoppingBag className="h-4 w-4" />}
            label="Point of sale"
          />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <ScriptHeading>
            A{" "}
            <span className="underline decoration-emerald-400 decoration-4 underline-offset-8">
              reliable
            </span>{" "}
            Point of Sale
          </ScriptHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-100 to-amber-50"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Convenient shopping & Loyalty Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Convenient shopping to boost{" "}
              <span className="underline decoration-amber-400 decoration-4 underline-offset-8">
                loyalty
              </span>
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Promotions and discounts offer customers flexible shopping experiences,
              while loyalty programs help them keep coming back.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm">
                <Heart className="h-4 w-4 text-emerald-600" />
                Member pricing
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm">
                <Tag className="h-4 w-4 text-emerald-600" />
                Weekly specials
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {rewards.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="text-4xl">
                  {item === "Coupon" && "🎫"}
                  {item === "Loyalty cards" && "💳"}
                  {item === "Promotions" && "🔥"}
                  {item === "Discount" && "🏷️"}
                  {item === "Gift card" && "🎁"}
                </div>
                <p className="mt-2 font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expiration Dates Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="mb-3 text-5xl">📅</div>
            <ScriptHeading>
              Expiration dates
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Track product expiration dates, manage lots and serial numbers, and
              reduce waste with better inventory visibility. Never sell expired
              products again.
            </p>
            <div className="mt-6 flex gap-3">
              <div className="rounded-full bg-red-50 px-4 py-2 text-sm text-red-600">
                ⚠️ Expiry alerts
              </div>
              <div className="rounded-full bg-green-50 px-4 py-2 text-sm text-green-600">
                ✓ Lot tracking
              </div>
            </div>
          </div>

          <div className="order-1 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:order-2">
            <div className="space-y-1">
              {[
                { name: "Organic Apples", date: "12/2026", status: "fresh" },
                { name: "Whole Wheat Bread", date: "11/2026", status: "fresh" },
                { name: "Fresh Milk", date: "09/2026", status: "warning" },
                { name: "Fresh Dates", date: "02/2027", status: "fresh" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b border-slate-100 py-4"
                >
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "warning"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flawless Replenishment Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Flawless Replenishment
        </ScriptHeading>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Never run out of stock with automated purchase orders and smart replenishment rules.
        </p>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="aspect-video rounded-t-2xl bg-gradient-to-br from-slate-100 to-emerald-100" />
            <div className="relative flex justify-center">
              <div className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
                  ▶
                </div>
              </div>
            </div>
            <div className="p-6 text-left">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Auto reorder point</p>
                  <p className="font-semibold text-slate-900">When stock &lt; 50</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Order quantity</p>
                  <p className="font-semibold text-slate-900">200 units</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Supplier lead time</p>
                  <p className="font-semibold text-slate-900">2 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scan it, that's it Section */}
      <section className="bg-emerald-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-3 flex gap-1 text-3xl text-emerald-600">
                <Barcode className="h-10 w-10" />
              </div>
              <ScriptHeading>
                <span className="bg-emerald-300 px-2">Scan</span> it, that's it
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Scan products to speed up inventory transfers, receiving, checkout,
                and product traceability. Works with any barcode scanner.
              </p>
              <div className="mt-6 flex gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Barcode className="h-4 w-4" />
                  Receiving
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Barcode className="h-4 w-4" />
                  Checkout
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Barcode className="h-4 w-4" />
                  Transfers
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100" />
                <div className="h-4 w-32 rounded-full bg-slate-100" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <Barcode className="h-5 w-5 text-slate-400" />
                  <div className="h-2 flex-1 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <Barcode className="h-5 w-5 text-slate-400" />
                  <div className="h-2 flex-1 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                  <Barcode className="h-5 w-5 text-emerald-600" />
                  <div className="h-2 flex-1 rounded-full bg-emerald-200" />
                  <span className="text-xs text-emerald-600">✓ Scanned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#fafaf5] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Powerful grocery tools for daily sales, stock management, and reporting.
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
            Expand as you grow with connected apps for your grocery operation,
            finance, supplier flows, and customer communication.
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
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#f0fdf4_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
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
              who grow their business with EdenERP — the complete solution for
              grocery retailers.
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
            label="Ready to scale your store"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch a grocery store workflow that helps your team sell faster,
            manage inventory smarter, and reduce waste with expiration tracking.
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
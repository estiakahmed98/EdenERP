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
  HardDrive,
  Heart,
  Package,
  ReceiptText,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hardware Store | AdonERP Industries",
  description:
    "A hardware store industry landing page for AdonERP with point of sale, inventory management, loyalty programs, and multi-channel sales.",
};

const features = [
  {
    title: "All devices welcome",
    description: "Works perfectly on tablets, laptops, desktops, and industrial scanners.",
  },
  {
    title: "Physical inventory",
    description: "Conduct cycle counts and full inventory audits with ease.",
  },
  {
    title: "Multiple cashiers",
    description: "Manage several cashier accounts with badges or PIN codes.",
  },
  {
    title: "Website domain name",
    description: "Get a professional domain name included with your online store.",
  },
  {
    title: "All payment methods",
    description: "Accept cash, cards, e-wallets, and contactless payments.",
  },
  {
    title: "Shipping integrations",
    description: "Connect with major carriers for seamless delivery management.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Package },
  { title: "Invoicing", subtitle: "Professional billing", icon: ReceiptText },
  { title: "Planning", subtitle: "Optimize staff schedules", icon: Calendar },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Box },
  { title: "eCommerce", subtitle: "Sell hardware online", icon: ShoppingCart },
];

const rewards = ["Coupons", "Loyalty cards", "Promotions", "eWallet", "Gift cards"];

const testimonials = [
  {
    name: "PT Global Teknologi Niaga",
    role: "Hardware Retail Chain",
    content:
      "It's great to see how technology solutions like AdonERP can streamline operations and enhance productivity for businesses in the hardware retail industry.",
    rating: 5,
  },
  {
    name: "Michael Zhang",
    role: "Owner, ToolBox Hardware",
    content:
      "From inventory management to multi-channel sales, AdonERP handles everything. Our team mastered the POS in just one day.",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
      <span className="text-blue-500">{icon}</span>
      {label}
    </div>
  );
}

export default function HardwareStorePage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#eff6ff_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Wrench className="h-4 w-4" />}
              label="Hardware industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700/70">
                Industries / Hardware Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The #1 solution for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Hardware Store
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                AdonERP covers all the software needs for your hardware store, from
                online and in-store transactions to order management and inventory
                control.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-blue-600/30 hover:text-blue-600"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-blue-500">
                "
              </div>
              <p className="text-base leading-7 text-slate-700">
                It's great to see how technology solutions like AdonERP can
                streamline operations and enhance productivity for businesses in
                the hardware retail industry.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">PT Global Teknologi Niaga</p>
                  <p className="text-sm text-slate-500">Hardware Retail Chain</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(59,130,246,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-blue-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-blue-300",
                            "bg-sky-300",
                            "bg-cyan-300",
                            "bg-indigo-300",
                            "bg-violet-300",
                            "bg-rose-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-blue-600 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <Wrench className="h-10 w-10 fill-blue-500 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intuitive Interface Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 text-6xl">😊</div>
          <ScriptHeading>
            An{" "}
            <span className="bg-yellow-300 px-2">intuitive</span> interface for
            <br />
            hardware sales
          </ScriptHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            An efficient point-of-sale that lets anyone master AdonERP POS in minutes,
            adapt to any configuration, and focus on what matters: the customer.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-4 h-6 w-48 rounded-md bg-slate-100" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-blue-100 to-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stock Levels Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Stay on top of your{" "}
              <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
                stock
              </span>{" "}
              levels
            </ScriptHeading>
          </div>
          <div className="grid gap-6 text-base leading-7 text-slate-600 md:grid-cols-2">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <strong className="text-slate-900">Flexible product configuration.</strong>
              <p className="mt-2 text-sm">Hardware comes in all configurations. Display more variants by configuring memory, components, and other variables.</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <strong className="text-slate-900">Effortless stock management.</strong>
              <p className="mt-2 text-sm">Real-time inventory updates and automatic replenishment keep you ahead.</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>Product</span>
                <span>On Hand</span>
                <span>Forecast</span>
                <span>Min / Max</span>
                <span>Status</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                ["Hammer (16oz)", "32", "28", "10/50", "Healthy"],
                ["Power Drill", "12", "8", "5/25", "Reorder"],
                ["Screwdriver Set", "45", "42", "20/80", "Healthy"],
                ["Measuring Tape", "18", "15", "10/40", "Low stock"],
                ["Toolbox 20\"", "6", "4", "5/20", "Reorder"],
                ["Paint Brush Set", "27", "25", "10/50", "Healthy"],
              ].map((row, idx) => (
                <div key={row[0]} className="grid grid-cols-5 gap-3 px-6 py-4 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{row[0]}</span>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>{row[3]}</span>
                  <span>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      row[4] === "Healthy" ? "bg-emerald-100 text-emerald-700" :
                      row[4] === "Reorder" ? "bg-rose-100 text-rose-700" :
                      "bg-amber-100 text-amber-700"
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

      {/* Boost Sales with Loyalty Programs */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Boost{" "}
              <span className="underline decoration-amber-400 decoration-4 underline-offset-8">
                sales
              </span>{" "}
              with
              <br />
              loyalty programs
            </ScriptHeading>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
              Loyalty programs improve your clients' shopping experience.
              Handle products from around the world and reward repeat customers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm">
                <Heart className="h-4 w-4 text-blue-600" />
                Reward points
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm">
                <Wallet className="h-4 w-4 text-blue-600" />
                Digital wallet
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
                  {item === "Coupons" && "🎫"}
                  {item === "Loyalty cards" && "💳"}
                  {item === "Promotions" && "🔥"}
                  {item === "eWallet" && "📱"}
                  {item === "Gift cards" && "🎁"}
                </div>
                <p className="mt-2 font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f9ff] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Smart tools to run hardware retail, stock management, payments, and
              delivery from one place.
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
            Expand as you grow with connected apps for your hardware retail operation,
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
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
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#eff6ff_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-blue-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-amber-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with AdonERP — the complete solution for
              hardware retailers.
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
            Launch a hardware store workflow that helps your team sell faster,
            manage inventory smarter, and scale from one location to many.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 hover:-translate-y-0.5"
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
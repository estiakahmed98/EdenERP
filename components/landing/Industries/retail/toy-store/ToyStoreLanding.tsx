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
  Gift,
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
  title: "Toy Store | AdonERP Industries",
  description:
    "A toy store industry landing page for AdonERP with point of sale, inventory management, loyalty programs, and multi-channel sales.",
};

const features = [
  {
    title: "All devices welcome",
    description: "Works perfectly on tablets, laptops, desktops, and industrial scanners.",
  },
  {
    title: "Website domain name",
    description: "Get a professional domain name included with your online store.",
  },
  {
    title: "Multiple cashiers",
    description: "Manage several cashier accounts with badges or PIN codes.",
  },
  {
    title: "Click and collect",
    description: "Let customers shop online and pick up orders at your store.",
  },
  {
    title: "All payment methods",
    description: "Accept cash, cards, e-wallets, and contactless payments.",
  },
  {
    title: "Shipping integration",
    description: "Connect with major carriers for seamless delivery management.",
  },
  {
    title: "Physical inventory",
    description: "Conduct cycle counts and full inventory audits with ease.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "eCommerce", subtitle: "Sell toys online", icon: ShoppingCart },
  { title: "Invoicing", subtitle: "Professional billing", icon: ReceiptText },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Package },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Box },
  { title: "Email Marketing", subtitle: "Launch customer campaigns", icon: Mail },
  { title: "Planning", subtitle: "Optimize staff schedules", icon: Calendar },
];

const rewards = ["Coupons", "Loyalty cards", "Promotions", "eWallet", "Gift cards"];

const testimonials = [
  {
    name: "Emma Watson",
    role: "Owner, Wonder Toys",
    content:
      "Working with AdonERP allowed us to digitize all our internal processes. We were able to be more efficient and finally reach full traceability on our products lifecycle.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Store Manager, Kid's Joy",
    content:
      "The intuitive POS and multi-channel capabilities transformed our toy store. Our team mastered it in minutes and sales have never been better.",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-rose-100">
      <span className="text-rose-500">{icon}</span>
      {label}
    </div>
  );
}

// Import Mail icon
function Mail(props: any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

export default function ToyStorePage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fff0f5_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(244,114,182,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,240,245,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Gift className="h-4 w-4" />}
              label="Toy industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-700/70">
                Industries / Toy Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The #1 software suite for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Toy Store
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                AdonERP allows you to maximize sales across multiple channels, manage
                inventory, track purchases, and run your toy store from one platform.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-rose-600/30 hover:text-rose-600"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-rose-500">
                "
              </div>
              <p className="text-base leading-7 text-slate-700">
                Working with AdonERP allowed us to digitize all our internal processes.
                We were able to be more efficient and finally reach full traceability
                on our products lifecycle.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Emma Watson</p>
                  <p className="text-sm text-slate-500">Owner, Wonder Toys</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-rose-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#fff0f5_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(244,114,182,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-rose-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-rose-300",
                            "bg-pink-300",
                            "bg-yellow-300",
                            "bg-green-300",
                            "bg-purple-300",
                            "bg-orange-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-rose-600 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <Gift className="h-10 w-10 fill-rose-500 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intuitive POS Interface Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-4 text-6xl">🌀</div>
        <ScriptHeading>
          Play with the intuitive
          <br />
          point-of-sale interface
        </ScriptHeading>

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
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-rose-100 to-yellow-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thousands of products Section */}
      <section className="rounded-r-[5rem] bg-rose-50/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 text-5xl">🧺</div>
              <ScriptHeading>
                <span className="bg-pink-200 px-2">Thousands</span> of products?
                <br />
                Don't be puzzled!
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Product configuration, stock tracking, purchasing and sales tools
                keep your toy inventory easy to manage.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Tag className="h-4 w-4 text-rose-600" />
                  Variants
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                  <Package className="h-4 w-4 text-rose-600" />
                  Stock tracking
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-rose-100 to-yellow-100" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">Teddy Bears</div>
                <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">Action Figures</div>
                <div className="rounded-lg bg-slate-50 p-2 text-center text-xs">Board Games</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game-changing Rewards Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="mb-3 text-5xl">🏆</div>
            <ScriptHeading>
              Game-changing{" "}
              <span className="underline decoration-sky-400 decoration-4 underline-offset-8">
                rewards
              </span>
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Reward your customers with coupons, loyalty cards, promotions, gift
              cards and eWallet options. Keep them coming back for more toys.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm">
                <Heart className="h-4 w-4 text-rose-600" />
                Points system
              </div>
              <div className="flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm">
                <Wallet className="h-4 w-4 text-rose-600" />
                Digital wallet
              </div>
            </div>
          </div>

          <div className="order-1 grid grid-cols-2 gap-6 sm:grid-cols-3 md:order-2">
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

      {/* Building blocks for online store Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-xl">
            <div className="mb-4 text-5xl">🧪</div>
            <ScriptHeading>
              Building blocks to{" "}
              <span className="text-teal-600 underline decoration-teal-400 decoration-4 underline-offset-8">
                create
              </span>{" "}
              your online store
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Use ready-made website blocks to create a beautiful toy store
              online and sell through ecommerce. No coding required.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-2 text-sm text-slate-400">drag & drop builder</div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] rounded-xl bg-gradient-to-br from-rose-100 to-yellow-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#fef2f2] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Everything you need to run toy sales, stock management, payments, and
              online orders from one platform.
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
            Expand as you grow with connected apps for your toy retail operation,
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
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
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700"
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
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#fff0f5_45%,_#fefce8_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-rose-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-yellow-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with AdonERP — the complete solution for
              toy retailers.
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
            Launch a toy store workflow that helps your team sell faster,
            manage inventory smarter, and create magical shopping experiences.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-transform duration-300 hover:-translate-y-0.5"
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
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  CreditCard,
  Gift,
  Heart,
  LayoutGrid,
  Package,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Clothing Store | EdenERP Industries",
  description:
    "A clothing store industry landing page for EdenERP with point of sale, inventory, and retail workflow sections.",
};

const features = [
  {
    title: "Multiple variants",
    description: "Configure sizes, colors, and materials for every product in your catalog.",
  },
  {
    title: "Loyalty programs",
    description: "Reward returning customers with points, tiered perks, and exclusive discounts.",
  },
  {
    title: "All payment methods",
    description: "Accept cash, cards, e-wallets, and contactless payments in-store and online.",
  },
  {
    title: "Dynamic pricing",
    description: "Set flexible pricing by season, customer type, or automatic promotions.",
  },
  {
    title: "Gift cards & eWallet",
    description: "Create, top up, and redeem physical or digital gift cards in seconds.",
  },
  {
    title: "Click & collect",
    description: "Let customers shop online and pick up orders at your store.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Package },
  { title: "Purchase", subtitle: "Automated replenishment", icon: ReceiptText },
  { title: "Invoicing", subtitle: "Professional invoices", icon: CreditCard },
  { title: "eCommerce", subtitle: "Sell clothes online", icon: ShoppingCart },
  { title: "Planning", subtitle: "Optimize staff schedules", icon: Users },
];

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Founder, Moda Boutique",
    content:
      "EdenERP transformed how we manage our clothing store. From RFID inventory to seamless POS, everything just works.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Operations Director, Urban Threads",
    content:
      "The omnichannel capabilities are incredible. Our online and in-store stock sync perfectly, and customers love it.",
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

export default function ClothingStorePage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fffaf5_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(244,114,182,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,250,245,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<ShoppingBag className="h-4 w-4" />}
              label="Fashion industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600/70">
                Industries / Clothing Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The best software fit for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Clothing Store
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Easily configure products in PoS and eCommerce, use RFID barcode
                integration for real-time stock tracking, and create client reward
                systems to boost retention.
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
                EdenERP made us an omnichannel brand with 360-degree sales
                visibility. From RFID inventory to client loyalty, everything
                runs seamlessly.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Pierre Hamblenne</p>
                  <p className="text-sm text-slate-500">CEO of J&JOY</p>
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
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-gradient(180deg,_#fef2f2_0%,_#ffffff_35%,_#fefce8_100%)] shadow-[0_40px_100px_rgba(225,29,72,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-rose-800 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-rose-300",
                            "bg-amber-300",
                            "bg-sky-300",
                            "bg-emerald-300",
                            "bg-fuchsia-300",
                            "bg-orange-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-slate-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-rose-500 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <ShoppingBag className="h-10 w-10 fill-rose-500 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Point of Sale Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            icon={<LayoutGrid className="h-4 w-4" />}
            label="Efficient point of sale"
          />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <ScriptHeading>
            An efficient POS that anyone
            <br />
            can master in minutes
          </ScriptHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[0.85fr_0.65fr_1.25fr]">
              {/* Cart Items */}
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="space-y-3">
                  {[
                    ["Linen Wide Leg Pant", "$45.00", "1"],
                    ["Chiffon Jumpsuit", "$59.00", "1"],
                    ["Silk Scarf", "$28.00", "2"],
                    ["Cotton T-Shirt", "$24.00", "1"],
                  ].map(([title, price, qty]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
                    >
                      <div>
                        <span className="font-medium text-slate-700">{title}</span>
                        <span className="ml-2 text-xs text-slate-400">x{qty}</span>
                      </div>
                      <span className="text-sm text-slate-500">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-rose-600 px-4 py-4 text-white">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Subtotal</span>
                    <span>$184.00</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm opacity-90">
                    <span>Tax (10%)</span>
                    <span>$18.40</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold">$202.40</div>
                </div>
              </div>

              {/* Numpad */}
              <div className="rounded-[1.5rem] bg-rose-50 p-4">
                <div className="grid grid-cols-3 gap-2">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "%", "0", "Pay"].map(
                    (key) => (
                      <div
                        key={key}
                        className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold ${
                          key === "Pay"
                            ? "bg-rose-600 text-white"
                            : "bg-white text-slate-600 shadow-sm"
                        }`}
                      >
                        {key}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Product Categories */}
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Categories
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                    New Arrivals
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    "Dresses",
                    "Tops",
                    "Bottoms",
                    "Outerwear",
                    "Accessories",
                    "Shoes",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="overflow-hidden rounded-[1.3rem] bg-white shadow-sm"
                    >
                      <div
                        className={`h-24 ${
                          [
                            "bg-gradient-to-br from-rose-200 to-pink-300",
                            "bg-gradient-to-br from-amber-200 to-yellow-300",
                            "bg-gradient-to-br from-sky-200 to-indigo-300",
                            "bg-gradient-to-br from-emerald-200 to-teal-300",
                            "bg-gradient-to-br from-violet-200 to-fuchsia-300",
                            "bg-gradient-to-br from-orange-200 to-rose-300",
                          ][index]
                        }`}
                      />
                      <div className="space-y-1 p-3">
                        <p className="text-sm font-semibold text-slate-700">{item}</p>
                        <p className="text-xs text-slate-400">Tap to add</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Cashier avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">Handle all transactions with ease.</span>
          </div>
        </div>
      </section>

      {/* RFID & Inventory Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="space-y-5 self-center">
          <div className="flex items-center gap-3 text-slate-900">
            <Barcode className="h-10 w-10 text-rose-500" />
            <div className="h-1 w-24 rounded-full bg-rose-300" />
          </div>
          <ScriptHeading className="text-3xl sm:text-4xl">
            Scan it, track it
          </ScriptHeading>
          <p className="max-w-md text-base leading-7 text-slate-600">
            Use RFID barcode integration for real-time stock tracking. Create or
            search products, process operations faster, and manage your inventory
            effortlessly.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-10 rounded-full bg-slate-100" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_35px_80px_rgba(15,23,42,0.1)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">
                  Product details
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  Chiffon Jumpsuit
                </h3>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                In stock: 42 units
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Price", "$59.00"],
                ["SKU", "CHF-JMP-001"],
                ["Category", "Dresses / Jumpsuits"],
                ["Sizes", "XS, S, M, L, XL"],
                ["Colors", "Black, Navy, Olive"],
                ["Material", "100% Chiffon"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 font-medium text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Staff avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">Real-time stock updates.</span>
          </div>
        </div>
      </section>

      {/* Inventory Management Table */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            icon={<Package className="h-4 w-4" />}
            label="Inventory discipline"
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>
              Stock management that never sleeps
            </ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Real-time inventory level updates and automated replenishment keep
              your bestsellers always available.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute inset-x-14 top-8 h-72 rounded-full bg-slate-100" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span>Product</span>
              <span>Location</span>
              <span>On Hand</span>
              <span>Forecast</span>
              <span>Min</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                ["Linen Wide Leg Pant", "Warehouse A", "8", "12", "15", "Reorder"],
                ["Chiffon Jumpsuit", "Store Floor", "42", "28", "10", "Healthy"],
                ["Silk Scarf", "Warehouse B", "3", "5", "8", "Low stock"],
                ["Cotton T-Shirt", "Store Floor", "56", "34", "20", "Healthy"],
                ["Denim Jacket", "Warehouse A", "12", "9", "10", "Reorder"],
              ].map((row, rowIndex) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 px-6 py-4 text-sm text-slate-600"
                >
                  {row.map((cell, cellIndex) => (
                    <div
                      key={`${row[0]}-${cellIndex}`}
                      className={
                        cellIndex === 5
                          ? `inline-flex max-w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                              rowIndex === 0 || rowIndex === 4
                                ? "bg-rose-100 text-rose-700"
                                : rowIndex === 2
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`
                          : cellIndex === 0
                            ? "font-semibold text-slate-900"
                            : ""
                      }
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-7 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Manager avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">But wait! There's more.</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#faf7f2] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(225,29,72,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Everything your clothing business needs in one simple platform,
              from checkout to replenishment.
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
            Expand as you grow with connected apps for your retail operation,
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

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#fff_0%,_#fef2f2_45%,_#fff8ed_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-rose-200/50" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-amber-200/50" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-violet-200/50" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Heart className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with EdenERP — the smart choice for modern
              clothing retailers.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start 15-day trial
              </Link>
            </div>
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
            Launch a clothing store workflow that helps your team sell faster,
            stock smarter, and scale from one boutique to many.
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
              <Tag className="h-4 w-4" />
              15-day free trial
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CheckCircle2,
  Crown,
  Gift,
  Heart,
  LineChart,
  MessageCircle,
  MonitorSmartphone,
  PackageCheck,
  Palette,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Mobile adaptive",
    description:
      "Your online store looks clean, fast, and professional on every screen size.",
  },
  {
    title: "Click and collect",
    description:
      "Let customers order online and collect products directly from your shop.",
  },
  {
    title: "Integration",
    description:
      "Connect ecommerce with inventory, invoicing, marketing, CRM, and analytics.",
  },
  {
    title: "Shipping option",
    description:
      "Create delivery methods, shipping zones, and flexible checkout options.",
  },
];

const apps = [
  {
    title: "Website",
    description: "Build your site",
    icon: MonitorSmartphone,
  },
  {
    title: "Sales",
    description: "Sell smarter",
    icon: BarChart3,
  },
  {
    title: "CRM",
    description: "Track customers",
    icon: Heart,
  },
  {
    title: "Rental",
    description: "Rent products",
    icon: PackageCheck,
  },
  {
    title: "Inventory",
    description: "Manage stock",
    icon: Boxes,
  },
  {
    title: "Email Marketing",
    description: "Grow audience",
    icon: WandSparkles,
  },
];

const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&h=96&fit=crop&crop=face",
];

export default function EcommerceArtisticSections() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <p
            className="mb-2 text-lg font-bold text-sky-500 dark:text-sky-400"
            style={{ fontFamily: handwrittenFont }}
          >
            The best
          </p>

          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Open source{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-800">
              <span className="text-slate-900 dark:text-white">eCommerce</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Sell anything, anywhere, with everything connected in one app.
            Create your store, manage products, accept orders, and grow your
            brand beautifully.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              Watch a demo
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-sky-400 dark:text-sky-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="grid bg-white dark:bg-slate-900 lg:grid-cols-[220px_1fr]">
                <aside className="border-r border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Categories
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "All",
                      "Chairs",
                      "Tables",
                      "Lighting",
                      "Storage",
                      "Decor",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Filter
                    </p>
                    <div className="mt-3 space-y-2">
                      {["In stock", "New arrivals", "On sale"].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                        >
                          <span className="h-3 w-3 rounded border border-slate-300 dark:border-slate-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Furniture Store
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        8 products found
                      </p>
                    </div>

                    <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                      Customize
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Oak Chair",
                        price: "$149.00",
                        image:
                          "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop",
                      },
                      {
                        title: "Blue Sofa",
                        price: "$499.00",
                        image:
                          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop",
                      },
                      {
                        title: "Wood Table",
                        price: "$249.00",
                        image:
                          "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&auto=format&fit=crop",
                      },
                      {
                        title: "Modern Lamp",
                        price: "$89.00",
                        image:
                          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop",
                      },
                      {
                        title: "Storage Box",
                        price: "$39.00",
                        image:
                          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500&auto=format&fit=crop",
                      },
                      {
                        title: "Side Stool",
                        price: "$129.00",
                        image:
                          "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=500&auto=format&fit=crop",
                      },
                    ].map((product, index) => (
                      <div
                        key={product.title}
                        className="group overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-36 w-full object-cover"
                          />

                          {index === 1 && (
                            <span className="absolute left-3 top-3 rounded-full bg-emerald-500 dark:bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="p-4 text-left">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {product.title}
                          </h3>

                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-bold text-[#714b67] dark:text-[#9b6a8f]">
                              {product.price}
                            </p>

                            <button className="rounded-md bg-slate-100 dark:bg-slate-700 p-2 text-slate-500 dark:text-slate-300 transition group-hover:bg-[#714b67] group-hover:text-white dark:group-hover:bg-[#8a5a7e]">
                              <ShoppingBag className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-4">
            <Zap className="h-9 w-9 text-slate-900 dark:text-white" />
            <div className="flex-1 rounded-md bg-[#02cfc3] dark:bg-[#02cfc3]/30 py-2">
              <h2
                className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
                style={{ fontFamily: handwrittenFont }}
              >
                No code Mode
              </h2>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Build your online store visually. Add products, edit pages, manage
            checkout, customize layouts, and publish without writing code.
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid lg:grid-cols-[1fr_250px]">
                <div className="bg-white dark:bg-slate-900 p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="flex gap-2">
                      <span className="h-8 w-8 rounded bg-slate-100 dark:bg-slate-800" />
                      <span className="h-8 w-20 rounded bg-[#714b67] dark:bg-[#8a5a7e]" />
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&auto=format&fit=crop"
                      alt="Cake product"
                      className="h-80 w-full rounded-lg object-cover"
                    />

                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Sugar Bloom Box
                      </h3>

                      <div className="mt-3 flex gap-1 text-amber-400 dark:text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <p className="mt-4 text-2xl font-bold text-[#714b67] dark:text-[#9b6a8f]">
                        $29.00
                      </p>

                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        A beautiful product page with images, reviews, product
                        options, and quick checkout.
                      </p>

                      <button className="mt-6 rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                        Add to cart
                      </button>

                      <div className="mt-8 space-y-3">
                        {[
                          "Customer reviews",
                          "Secure checkout",
                          "Inventory tracking",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="border-l border-slate-200 dark:border-slate-700 bg-[#171824] dark:bg-[#0f0f1a] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">Edit panel</p>

                  {[
                    "Product layout",
                    "Image gallery",
                    "Price style",
                    "Button color",
                    "Reviews",
                    "Mobile view",
                  ].map((item, index) => (
                    <div key={item} className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                        <span>{item}</span>
                        <span>{index + 1}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 dark:bg-white/5">
                        <div
                          className="h-2 rounded-full bg-[#02cfc3] dark:bg-[#02cfc3]/50"
                          style={{ width: `${45 + index * 8}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </aside>
              </div>
            </div>

            <div className="mt-10 text-center">
              <span
                className="text-2xl font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                + 3 million free photos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Crown className="mx-auto h-12 w-12 text-amber-500 dark:text-amber-400" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">Product</span>
            </HandUnderline>{" "}
            is king
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="text-left">
              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                Adaptable products
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Build simple products, variants, digital products, services,
                bundles, and subscriptions. Every product can include images,
                inventory rules, pricing, descriptions, and promotions.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  "Advanced stock management",
                  "Flexible product options",
                  "Upsells and cross-selling",
                ].map((item) => (
                  <div key={item}>
                    <p
                      className="text-lg font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {item}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Manage your store with connected data and smart actions.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-10 translate-y-10 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

              <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
                  <img
                    src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop"
                    alt="Product"
                    className="h-72 w-full rounded-lg object-cover"
                  />

                  <div className="text-left">
                    <p className="text-xs font-bold text-[#714b67] dark:text-[#9b6a8f]">
                      CUSTOMIZABLE DESK
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                      Modern Oak Chair
                    </h3>

                    <div className="mt-3 flex gap-1 text-amber-400 dark:text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="mt-4 text-2xl font-bold text-[#714b67] dark:text-[#9b6a8f]">
                      $149.00
                    </p>

                    <div className="mt-5 grid grid-cols-4 gap-2">
                      {["Oak", "Black", "White", "Blue"].map((item, index) => (
                        <span
                          key={item}
                          className={`rounded-md border px-2 py-2 text-center text-xs font-bold ${
                            index === 0
                              ? "border-[#714b67] text-[#714b67] dark:border-[#9b6a8f] dark:text-[#9b6a8f]"
                              : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                      Add to cart
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-16 rounded-md bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex items-center justify-center gap-5">
            <Heart className="h-9 w-9 fill-amber-300 dark:fill-amber-800 text-amber-400 dark:text-amber-500" />
            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Bump up{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">loyalty</span>
              </HandUnderline>
              ,
              <br />
              maximize revenues
            </h2>
            <Gift className="h-9 w-9 text-rose-500 dark:text-rose-400" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Encourage conversations, collect customer feedback, create rewards,
            send promotions, and keep your buyers coming back.
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="mb-5 rounded-md bg-[#714b67] dark:bg-[#8a5a7e] px-4 py-3 text-left text-sm font-bold text-white">
                Messages
              </div>

              <div className="space-y-4 text-left">
                {[
                  "Hi! Do you have this chair in black?",
                  "Yes, it is available for delivery today.",
                  "Perfect, I will place the order now!",
                ].map((message, index) => (
                  <div
                    key={message}
                    className={`rounded-2xl p-4 text-sm leading-6 ${
                      index === 1
                        ? "ml-8 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                        : "mr-8 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {message}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Loyalty feed
              </h3>

              <div className="mt-5 space-y-5">
                {[
                  ["Free shipping", "Reward customers after 3 orders"],
                  ["Exclusive coupon", "Send personalized discount codes"],
                  ["Social sharing", "Turn happy buyers into promoters"],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Your store in the{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">spotlight</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Understand visitors, revenue, conversion, products, and campaign
              performance with visual ecommerce analytics.
            </p>
          </div>

          <div className="relative">
            <div className="mb-5 flex justify-end gap-3 text-slate-700 dark:text-slate-200">
              <BarChart3 className="h-7 w-7 text-sky-500 dark:text-sky-400" />
              <TrendingUp className="h-7 w-7 text-amber-500 dark:text-amber-400" />
              <LineChart className="h-7 w-7 text-rose-500 dark:text-rose-400" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  Revenue analytics
                </p>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  +28%
                </span>
              </div>

              <div className="flex h-72 items-end gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
                {[35, 48, 42, 58, 63, 55, 72, 80, 76, 92, 88, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end rounded-t-md bg-sky-300/80 dark:bg-sky-500/80"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>

            <p
              className="ml-auto mt-8 max-w-xs rotate-[-10deg] text-center text-lg text-[#714b67] dark:text-[#9b6a8f]"
              style={{ fontFamily: handwrittenFont }}
            >
              Integrated with Google Analytics
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Built using our apps
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&auto=format&fit=crop",
                title: "Online shop",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop",
                title: "Agency site",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&auto=format&fit=crop",
                title: "Gaming brand",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)] ${
                  index === 1 ? "md:mt-10" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 text-left">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Built with ecommerce, website, inventory, and marketing.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                features
              </span>
            </HandUnderline>
            <br />
            done right.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">need</span>
            </HandUnderline>
            , one app.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Expand as you grow with integrated apps that work together.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatarImages.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  Adon transformed our operations by integrating ecommerce
                  functions, simplifying product management, and offering
                  cost-effective maintenance.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Noah Carter
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      eCommerce Founder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  growth
                </span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

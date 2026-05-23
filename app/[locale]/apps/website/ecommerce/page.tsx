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
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <p
            className="mb-2 text-lg font-bold text-sky-500"
            style={{ fontFamily: handwrittenFont }}
          >
            The best
          </p>

          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Open source{" "}
            <HandUnderline color="bg-sky-400">
              <span className="text-slate-900">eCommerce</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Sell anything, anywhere, with everything connected in one app.
            Create your store, manage products, accept orders, and grow your
            brand beautifully.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Watch a demo
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-sky-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="grid bg-white lg:grid-cols-[220px_1fr]">
                <aside className="border-r border-slate-100 bg-white p-5 text-left">
                  <p className="text-sm font-bold text-slate-900">Categories</p>

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
                            ? "bg-[#714b67] text-white"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-bold text-slate-500">Filter</p>
                    <div className="mt-3 space-y-2">
                      {["In stock", "New arrivals", "On sale"].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-slate-500"
                        >
                          <span className="h-3 w-3 rounded border border-slate-300" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="bg-[#f7f8fb] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Furniture Store
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        8 products found
                      </p>
                    </div>

                    <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
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
                        className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-36 w-full object-cover"
                          />

                          {index === 1 && (
                            <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="p-4 text-left">
                          <h3 className="text-sm font-bold text-slate-900">
                            {product.title}
                          </h3>

                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-bold text-[#714b67]">
                              {product.price}
                            </p>

                            <button className="rounded-md bg-slate-100 p-2 text-slate-500 transition group-hover:bg-[#714b67] group-hover:text-white">
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

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-4">
            <Zap className="h-9 w-9 text-slate-900" />
            <div className="flex-1 rounded-md bg-[#02cfc3] py-2">
              <h2
                className="text-3xl font-bold text-slate-900 sm:text-4xl"
                style={{ fontFamily: handwrittenFont }}
              >
                No code Mode
              </h2>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
            Build your online store visually. Add products, edit pages, manage
            checkout, customize layouts, and publish without writing code.
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid lg:grid-cols-[1fr_250px]">
                <div className="bg-white p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="h-4 w-40 rounded bg-slate-100" />
                    <div className="flex gap-2">
                      <span className="h-8 w-8 rounded bg-slate-100" />
                      <span className="h-8 w-20 rounded bg-[#714b67]" />
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&auto=format&fit=crop"
                      alt="Cake product"
                      className="h-80 w-full rounded-lg object-cover"
                    />

                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-slate-900">
                        Sugar Bloom Box
                      </h3>

                      <div className="mt-3 flex gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <p className="mt-4 text-2xl font-bold text-[#714b67]">
                        $29.00
                      </p>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        A beautiful product page with images, reviews, product
                        options, and quick checkout.
                      </p>

                      <button className="mt-6 rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
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
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="border-l border-slate-200 bg-[#171824] p-5 text-left text-white">
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
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[#02cfc3]"
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
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                + 3 million free photos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Crown className="mx-auto h-12 w-12 text-amber-500" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-amber-300">
              <span>Product</span>
            </HandUnderline>{" "}
            is king
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="text-left">
              <h3
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Adaptable products
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600">
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
                      className="text-lg font-bold text-slate-900"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {item}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage your store with connected data and smart actions.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-10 translate-y-10 rounded-full bg-[#f3f4f7]" />

              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
                  <img
                    src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop"
                    alt="Product"
                    className="h-72 w-full rounded-lg object-cover"
                  />

                  <div className="text-left">
                    <p className="text-xs font-bold text-[#714b67]">
                      CUSTOMIZABLE DESK
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-900">
                      Modern Oak Chair
                    </h3>

                    <div className="mt-3 flex gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="mt-4 text-2xl font-bold text-[#714b67]">
                      $149.00
                    </p>

                    <div className="mt-5 grid grid-cols-4 gap-2">
                      {["Oak", "Black", "White", "Blue"].map((item, index) => (
                        <span
                          key={item}
                          className={`rounded-md border px-2 py-2 text-center text-xs font-bold ${
                            index === 0
                              ? "border-[#714b67] text-[#714b67]"
                              : "border-slate-200 text-slate-400"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white">
                      Add to cart
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-16 rounded-md bg-slate-100 ring-1 ring-slate-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex items-center justify-center gap-5">
            <Heart className="h-9 w-9 fill-amber-300 text-amber-400" />
            <h2
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Bump up{" "}
              <HandUnderline color="bg-amber-300">
                <span>loyalty</span>
              </HandUnderline>
              ,
              <br />
              maximize revenues
            </h2>
            <Gift className="h-9 w-9 text-rose-500" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Encourage conversations, collect customer feedback, create rewards,
            send promotions, and keep your buyers coming back.
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="mb-5 rounded-md bg-[#714b67] px-4 py-3 text-left text-sm font-bold text-white">
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
                        ? "ml-8 bg-emerald-50 text-emerald-700"
                        : "mr-8 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {message}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <h3 className="text-lg font-bold text-slate-900">Loyalty feed</h3>

              <div className="mt-5 space-y-5">
                {[
                  ["Free shipping", "Reward customers after 3 orders"],
                  ["Exclusive coupon", "Send personalized discount codes"],
                  ["Social sharing", "Turn happy buyers into promoters"],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8eff6] text-[#714b67]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">{title}</p>
                      <p className="mt-1 text-sm text-slate-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Your store in the{" "}
              <HandUnderline color="bg-amber-300">
                <span>spotlight</span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Understand visitors, revenue, conversion, products, and campaign
              performance with visual ecommerce analytics.
            </p>
          </div>

          <div className="relative">
            <div className="mb-5 flex justify-end gap-3 text-slate-700">
              <BarChart3 className="h-7 w-7 text-sky-500" />
              <TrendingUp className="h-7 w-7 text-amber-500" />
              <LineChart className="h-7 w-7 text-rose-500" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900">Revenue analytics</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  +28%
                </span>
              </div>

              <div className="flex h-72 items-end gap-3 rounded-lg bg-slate-50 p-5">
                {[35, 48, 42, 58, 63, 55, 72, 80, 76, 92, 88, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end rounded-t-md bg-sky-300/80"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>

            <p
              className="ml-auto mt-8 max-w-xs rotate-[-10deg] text-center text-lg text-[#714b67]"
              style={{ fontFamily: handwrittenFont }}
            >
              Integrated with Google Analytics
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
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
                className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] ${
                  index === 1 ? "md:mt-10" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 text-left">
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">
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
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">features</span>
            </HandUnderline>
            <br />
            done right.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>need</span>
            </HandUnderline>
            , one app.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow with integrated apps that work together.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatarImages.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
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
                    <p className="font-bold text-slate-900">Noah Carter</p>
                    <p className="text-sm text-slate-500">eCommerce Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">growth</span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

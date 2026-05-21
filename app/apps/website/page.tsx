"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  Diamond,
  FileText,
  Globe2,
  GraduationCap,
  ImageIcon,
  Layers3,
  LayoutGrid,
  MessageCircle,
  MousePointerClick,
  PackageCheck,
  Palette,
  PenTool,
  Play,
  Rocket,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const builderSteps = [
  {
    title: "Site",
    description: "Your first page",
    icon: Compass,
    color: "bg-rose-100 text-rose-600",
  },
  {
    title: "Add",
    description: "Your apps",
    icon: Layers3,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Adjust",
    description: "Your features",
    icon: Settings2,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Grow",
    description: "Your business",
    icon: Rocket,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const features = [
  {
    title: "Mobile responsive",
    description:
      "Your website automatically adapts to every screen size, from desktop to mobile.",
  },
  {
    title: "Translation",
    description:
      "Translate pages, products, and content to reach customers around the world.",
  },
  {
    title: "Theme customization",
    description:
      "Choose colors, fonts, layouts, and blocks to match your brand identity.",
  },
  {
    title: "SEO",
    description:
      "Optimize pages and product content to help customers find you online.",
  },
  {
    title: "Shapes and animations",
    description:
      "Give your website visual movement with modern sections, shapes, and effects.",
  },
  {
    title: "Analytics",
    description:
      "Learn where your visitors come from and understand what works best.",
  },
];

const apps = [
  {
    title: "eCommerce",
    description: "Sell online",
    icon: ShoppingBag,
  },
  {
    title: "Events",
    description: "Promote events",
    icon: Sparkles,
  },
  {
    title: "eLearning",
    description: "Create courses",
    icon: GraduationCap,
  },
  {
    title: "CRM",
    description: "Track leads",
    icon: Diamond,
  },
  {
    title: "Appointments",
    description: "Book meetings",
    icon: CheckCircle2,
  },
  {
    title: "Marketing",
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

export default function WebsiteBuilderSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Scale your brand{" "}
            <HandUnderline color="bg-orange-300">
              <span className="text-orange-500">online</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Build more than a website. Build a business. Design beautiful pages,
            sell products, manage customers, and grow from one integrated app.
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

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-[#ff5c78] sm:block">
              <Sparkles className="h-12 w-12 rotate-[-25deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="grid bg-[#11121b] lg:grid-cols-[1fr_260px]">
                <div className="relative min-h-[430px] bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&auto=format&fit=crop')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/35" />

                  <div className="relative flex h-full min-h-[430px] flex-col justify-between p-8 text-left text-white">
                    <div>
                      <p className="text-sm font-bold tracking-wide">
                        Monday Coffee Lab
                      </p>
                      <h2 className="mt-10 max-w-xs text-5xl font-bold leading-none">
                        Superior Sips
                      </h2>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                        Fresh coffee, crafted with care for your morning energy.
                      </p>
                      <button className="mt-8 rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white">
                        Order now
                      </button>
                    </div>

                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </div>

                    <div className="absolute bottom-8 left-10 w-64 rounded-lg bg-white p-4 text-slate-900 shadow-2xl">
                      <div className="mb-3 h-3 w-24 rounded bg-slate-200" />
                      <div className="space-y-2">
                        {["Hero image", "Main button", "Product card"].map(
                          (item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-xs text-slate-500"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              {item}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-white/10 bg-[#171824] p-5 text-left text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-bold">Theme</p>
                    <div className="h-7 w-7 rounded-full bg-[#714b67]" />
                  </div>

                  <div className="space-y-4">
                    {[
                      "Color palette",
                      "Typography",
                      "Spacing",
                      "Buttons",
                      "Sections",
                      "Animation",
                      "Mobile",
                    ].map((item, index) => (
                      <div key={item}>
                        <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                          <span>{item}</span>
                          <span>{index + 1}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-[#02a6a6]"
                            style={{ width: `${45 + index * 6}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg bg-white/5 p-4">
                    <p className="text-xs text-white/60">Live preview</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-10 rounded bg-white/10"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-100">
            <MessageCircle className="h-4 w-4 text-[#02a6a6]" />
            What do you want to build?
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Dream it?{" "}
            <HandUnderline color="bg-[#02a6a6]">
              <span className="text-[#02a6a6]">Build it!</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Let the builder guide your website from idea to launch with smart
            blocks, apps, and editable designs.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 rounded-xl bg-[#f3f4f7] p-8 sm:grid-cols-2 lg:grid-cols-4">
            {builderSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-md text-sm leading-7 text-slate-500">
            There is only one way to create a beautiful website:
            <br />
            <span className="font-semibold text-slate-900">
              Anywhere and at full speed.
            </span>
          </p>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="grid min-h-[420px] lg:grid-cols-[220px_1fr]">
              <aside className="border-r border-slate-100 bg-white p-5 text-left">
                <p className="mb-6 text-sm font-bold text-slate-900">
                  Website
                </p>

                {[
                  "Pages",
                  "Blocks",
                  "Theme",
                  "Style",
                  "Media",
                  "Settings",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`mb-2 rounded-md px-4 py-3 text-sm font-semibold ${
                      index === 3
                        ? "bg-[#714b67] text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </aside>

              <div className="bg-[#eef0f4] p-7">
                <div className="grid gap-5 md:grid-cols-3">
                  {[
                    {
                      image:
                        "https://images.unsplash.com/photo-1524758631624-e2822e304c36c?w=500&auto=format&fit=crop",
                      title: "Studio",
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&auto=format&fit=crop",
                      title: "Portfolio",
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop",
                      title: "Agency",
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop",
                      title: "Startup",
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop",
                      title: "Shop",
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop",
                      title: "Landing",
                    },
                  ].map((template) => (
                    <div
                      key={template.title}
                      className="overflow-hidden rounded-lg bg-white shadow-sm"
                    >
                      <img
                        src={template.image}
                        alt={template.title}
                        className="h-28 w-full object-cover"
                      />
                      <div className="p-3 text-left">
                        <p className="text-xs font-bold text-slate-900">
                          {template.title}
                        </p>
                        <div className="mt-2 h-2 w-16 rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-[#02a6a6]">
            <Diamond className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Craft your site like a designer
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Drag and drop building blocks. Take full creative control with
            layouts, colors, images, fonts, spacing, and responsive design.
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f4f7]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#0f0715] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.15)]">
              <div className="grid min-h-[430px] lg:grid-cols-[1fr_260px]">
                <div className="flex items-center justify-center p-8">
                  <div className="grid w-full max-w-2xl gap-8 lg:grid-cols-[1fr_260px]">
                    <div className="text-left text-white">
                      <p className="text-sm text-white/50">Section block</p>
                      <h3 className="mt-4 text-3xl font-bold">
                        A Section Subtitle
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/60">
                        Create a beautiful page section with editable content,
                        media, and buttons.
                      </p>
                      <button className="mt-6 rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-900">
                        Learn more
                      </button>
                    </div>

                    <div className="relative rounded-2xl border-8 border-[#7c3aed] bg-white p-3 shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop"
                        alt="Design preview"
                        className="h-72 w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                <aside className="border-l border-white/10 bg-[#171824] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">Blocks</p>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      LayoutGrid,
                      ImageIcon,
                      FileText,
                      MousePointerClick,
                      Palette,
                      Code2,
                      Store,
                      Search,
                    ].map((Icon, index) => (
                      <div
                        key={index}
                        className="flex h-16 items-center justify-center rounded-lg bg-white/5 text-[#02a6a6]"
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-4">
                    {["Width", "Radius", "Shadow", "Spacing"].map(
                      (item, index) => (
                        <div key={item}>
                          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                            <span>{item}</span>
                            <span>{index + 2}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full bg-[#02a6a6]"
                              style={{ width: `${55 + index * 8}%` }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-100">
            <MessageCircle className="h-4 w-4 text-[#02a6a6]" />
            Can you help me edit?
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                {["Edit", "SEO", "Style", "Content"].map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${
                      index === 0
                        ? "bg-[#714b67] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <XIcon />
            </div>

            <div className="space-y-3 text-left">
              {[
                "Generate a landing page headline for my furniture store.",
                "Rewrite this product description in a friendly tone.",
                "Create SEO meta title and description.",
                "Suggest a stronger call-to-action button.",
              ].map((text) => (
                <div
                  key={text}
                  className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                Apply
              </button>
              <button className="rounded-md border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600">
                Cancel
              </button>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Your AI sidekick
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Build great pages faster with smart AI assistance. Ask for
              headlines, product text, SEO content, translations, and layout
              ideas while you work.
            </p>
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
              Scalable and fully
              <br />
              integrated
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Plug your website into sales, inventory, marketing, CRM,
              appointments, accounting, and everything else your business needs.
            </p>

            <p
              className="mt-8 text-lg text-rose-500"
              style={{ fontFamily: handwrittenFont }}
            >
              Easy peasy!
            </p>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-lg">
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-slate-100">
              <Boxes className="h-12 w-12 text-[#02a6a6]" />
            </div>

            {[
              {
                label: "Accounting",
                icon: ReceiptIcon,
                left: "16%",
                top: "18%",
              },
              {
                label: "CRM",
                icon: Diamond,
                left: "68%",
                top: "15%",
              },
              {
                label: "Inventory",
                icon: PackageCheck,
                left: "13%",
                top: "68%",
              },
              {
                label: "Calendar",
                icon: CheckCircle2,
                left: "69%",
                top: "69%",
              },
              {
                label: "Marketing",
                icon: WandSparkles,
                left: "42%",
                top: "3%",
              },
              {
                label: "Website",
                icon: Globe2,
                left: "42%",
                top: "82%",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-white text-center shadow-lg ring-1 ring-slate-100"
                  style={{ left: item.left, top: item.top }}
                >
                  <Icon className="h-7 w-7 text-[#714b67]" />
                  <span className="mt-2 text-[11px] font-bold text-slate-600">
                    {item.label}
                  </span>
                </div>
              );
            })}

            <div className="absolute left-1/2 top-1/2 h-px w-[75%] -translate-x-1/2 bg-slate-200" />
            <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-y-1/2 bg-slate-200" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#7a4d6e] px-8 py-20 text-center text-white shadow-[0_25px_70px_rgba(113,75,103,0.25)]">
            <h2
              className="text-4xl font-bold leading-tight sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              It&apos;s free.
              <br />
              For real.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80">
              Your website builder is included with your apps. Build your
              website, connect your tools, and manage your business without
              jumping between platforms.
            </p>
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
            <HandUnderline color="bg-[#02a6a6]">
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
            <HandUnderline color="bg-[#02a6a6]">
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
          <div className="relative mx-auto min-h-[360px]">
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
                who grow their business with Odoo
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  Odoo&apos;s flexibility, scalability, and app ecosystem have
                  been crucial for our success and community growth.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Andrew Reed</p>
                    <p className="text-sm text-slate-500">
                      Digital business owner
                    </p>
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
              <HandUnderline color="bg-[#02a6a6]">
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

function XIcon() {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400"
      aria-label="Close"
    >
      ×
    </button>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}
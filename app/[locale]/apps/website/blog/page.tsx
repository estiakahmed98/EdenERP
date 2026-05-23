"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  ImageIcon,
  Layers3,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  PenLine,
  Play,
  Search,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Type,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const blogPosts = [
  {
    title: "How to build a creative blog strategy",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop",
  },
  {
    title: "A beginner guide to publishing content",
    category: "Tutorial",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop",
  },
  {
    title: "Travel writing that converts readers",
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
  },
  {
    title: "Visual storytelling for modern brands",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=900&auto=format&fit=crop",
  },
  {
    title: "Content ideas for business growth",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop",
  },
  {
    title: "SEO tips for your next article",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop",
  },
];

const features = [
  {
    title: "Building blocks",
    description:
      "Drag, drop, and customize beautiful content blocks to create articles, landing pages, and stories faster.",
  },
  {
    title: "Translation",
    description:
      "Create multilingual blog content and connect with readers across different regions.",
  },
  {
    title: "Boost in one platform",
    description:
      "Publish your blog articles and manage SEO, social sharing, email campaigns, and analytics in one place.",
  },
  {
    title: "Domain Name",
    description:
      "Use your own domain name and make your blog feel professional and branded.",
  },
  {
    title: "Analytics",
    description:
      "Track views, audience behavior, and performance so you know what content works.",
  },
];

const apps = [
  {
    title: "Website",
    description: "Create amazing website",
    icon: MonitorSmartphone,
  },
  {
    title: "Commerce",
    description: "Sell online",
    icon: Globe2,
  },
  {
    title: "Social Marketing",
    description: "Share content",
    icon: Megaphone,
  },
  {
    title: "Email Marketing",
    description: "Send newsletters",
    icon: Share2,
  },
];

const avatars = [
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

export default function BlogLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Share your{" "}
            <HandUnderline color="bg-rose-300">
              <span className="text-rose-500">expertise</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Create beautiful blog posts, connect with your audience, improve
            SEO, and turn your knowledge into a powerful growth channel.
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
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="relative h-56 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/35" />

                <div className="relative flex h-full flex-col items-center justify-center text-white">
                  <p className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold backdrop-blur">
                    Travel / Adventure / Blog
                  </p>

                  <h2
                    className="mt-5 text-4xl font-bold sm:text-5xl"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    Buying a Telescope
                  </h2>

                  <button className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </button>
                </div>
              </div>

              <div className="grid gap-5 bg-white p-6 md:grid-cols-3">
                {blogPosts.slice(0, 6).map((post) => (
                  <article
                    key={post.title}
                    className="overflow-hidden rounded-lg bg-slate-50 text-left ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-32 w-full object-cover"
                    />

                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#714b67]">
                        {post.category}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-900">
                        {post.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                        Share your thoughts, stories, and useful ideas with a
                        clean reading experience.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-100">
            <MessageCircle className="h-4 w-4 text-[#02a6a6]" />
            Write your next story faster
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Explore our text{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">editor&apos;s</span>
            </HandUnderline>{" "}
            magic
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Write, format, structure, and publish your articles visually with a
            beautiful editor made for creators and businesses.
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="grid lg:grid-cols-[220px_1fr_230px]">
                <aside className="border-r border-slate-100 bg-white p-5 text-left">
                  <p className="mb-5 text-sm font-bold text-slate-900">
                    Blog Tools
                  </p>

                  {[
                    "Text",
                    "Image",
                    "Quote",
                    "CTA button",
                    "Gallery",
                    "Social share",
                    "SEO preview",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`mb-2 rounded-md px-3 py-2 text-xs font-semibold ${
                        index === 0
                          ? "bg-[#714b67] text-white"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </aside>

                <div className="relative bg-white p-6 text-left">
                  <div className="relative h-56 overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative flex h-full flex-col items-center justify-center text-white">
                      <h3
                        className="text-4xl font-bold"
                        style={{ fontFamily: handwrittenFont }}
                      >
                        Buying a Telescope
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="h-4 w-2/3 rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-11/12 rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                  </div>

                  <div
                    className="mt-8 rotate-[-8deg] text-lg text-[#714b67]"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    Drag and drop any block here
                  </div>
                </div>

                <aside className="border-l border-slate-200 bg-[#171824] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">Design</p>

                  {[
                    "Typography",
                    "Paragraph",
                    "Image radius",
                    "Spacing",
                    "Colors",
                    "Mobile",
                  ].map((item, index) => (
                    <div key={item} className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                        <span>{item}</span>
                        <span>{index + 1}</span>
                      </div>

                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[#02cfc3]"
                          style={{ width: `${50 + index * 7}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <Zap className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Effortlessly{" "}
            <HandUnderline color="bg-amber-300">
              <span>convert</span>
            </HandUnderline>{" "}
            your audience
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="grid gap-5 sm:grid-cols-2">
                {["Starter Plan", "Premium Plan"].map((plan, index) => (
                  <div
                    key={plan}
                    className="rounded-lg bg-slate-50 p-5 text-left"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#714b67] shadow-sm">
                      <FileText className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900">{plan}</h3>
                    <p className="mt-2 text-sm font-bold text-[#714b67]">
                      ${index === 0 ? "9" : "29"}.00
                    </p>

                    <button className="mt-5 rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                      Choose
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-slate-50 p-5 text-left">
                <p className="font-bold text-slate-900">Analyze this</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add forms, lead magnets, offers, and call-to-action sections
                  directly inside your articles.
                </p>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-900">
                Engaging user experience
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                Build articles that guide readers toward a next step: subscribe,
                contact you, download a resource, or purchase your offer.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Smart CTA blocks",
                  "Lead capture forms",
                  "Related posts",
                  "Newsletter signup",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f7] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <TrendingUp className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Maximize your{" "}
            <HandUnderline color="bg-sky-300">
              <span>SEO</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Improve discoverability with metadata, snippets, search previews,
            internal links, and structured content.
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="grid lg:grid-cols-2">
              <div className="border-r border-slate-100 p-6 text-left">
                <p className="text-sm font-bold text-slate-900">SEO settings</p>

                <div className="mt-5 space-y-4">
                  {[
                    "Meta title",
                    "Meta description",
                    "URL slug",
                    "Social image",
                    "Focus keyword",
                  ].map((item) => (
                    <div key={item}>
                      <label className="text-xs font-bold text-slate-500">
                        {item}
                      </label>
                      <div className="mt-2 h-10 rounded-md bg-slate-50 ring-1 ring-slate-100" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 text-left">
                <p className="text-sm font-bold text-slate-900">
                  Search preview
                </p>

                <div className="mt-5 rounded-lg border border-slate-200 p-5">
                  <p className="text-sm text-blue-600">
                    Your Blog Article | Website
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    Buying a Telescope: Complete Guide
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Learn how to choose the right telescope, understand key
                    features, and start exploring the sky.
                  </p>

                  <img
                    src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&auto=format&fit=crop"
                    alt="SEO preview"
                    className="mt-5 h-36 w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-100">
            <MessageCircle className="h-4 w-4 text-sky-500" />
            SEO score improved
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            {avatars.map((avatar, index) => (
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
                  Adon replaced multiple applications in one. With better
                  productivity, powerful easy access to centralized information,
                  and simplified processes.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Robert Chen</p>
                    <p className="text-sm text-slate-500">Content strategist</p>
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

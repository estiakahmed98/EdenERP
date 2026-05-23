"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  Crown,
  HelpCircle,
  LayoutGrid,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const features = [
  {
    title: "Sort content",
    description:
      "Organize by relevance, latest activity, date, newest, most answered, most voted.",
  },
  {
    title: "Enrich discussion",
    description:
      "Embed videos and images directly into your community messages.",
  },
  {
    title: "Theme selection",
    description: "Select the best theme for your business and community style.",
  },
  {
    title: "Notifications",
    description:
      "Subscribe to interesting content and get email alerts when a new answer is posted.",
  },
  {
    title: "Categories",
    description:
      "Provide well-organized and easily accessible content with topic categories.",
  },
];

const apps = [
  {
    title: "Website",
    description: "Create amazing websites",
    icon: MonitorSmartphone,
  },
  {
    title: "eCommerce",
    description: "Manage your online store",
    icon: LayoutGrid,
  },
  {
    title: "Blog",
    description: "Share interesting content",
    icon: MessageCircle,
  },
  {
    title: "Live Chat",
    description: "Engage your visitors",
    icon: MessageCircle,
  },
  {
    title: "Helpdesk",
    description: "Help your customers",
    icon: HelpCircle,
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

export default function ForumLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Connect with{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6]">your community</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Create a community, foster collaboration, improve support, and give
            users a simple place to ask, answer, vote, and share knowledge.
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
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xl font-bold text-orange-700"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    Monkey Coffee Lab
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    Home / Shop / Forum / About
                  </span>
                </div>

                <button className="rounded-md bg-orange-600 px-4 py-2 text-xs font-bold text-white">
                  Contact us
                </button>
              </div>

              <div className="grid min-h-[420px] lg:grid-cols-[230px_1fr]">
                <aside className="border-r border-slate-100 bg-slate-50 p-5 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Robin Cole
                      </p>
                      <p className="text-xs text-slate-500">Top user</p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-2">
                    {[
                      "Posts",
                      "My profile",
                      "Popular answers",
                      "Favorites",
                      "Categories",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? "bg-white text-[#714b67] shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-bold text-slate-500">Tags</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Help", "Tips", "Support"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="bg-white p-6 text-left">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        The coffee lovers corner
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Ask questions, share tips, and help each other.
                      </p>
                    </div>

                    <button className="rounded-md bg-orange-600 px-4 py-2 text-xs font-bold text-white">
                      New Post
                    </button>
                  </div>

                  <div className="mb-5 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                    <Search className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      Search discussions...
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Which espresso machine should I buy?",
                        tag: "Solved",
                        replies: 12,
                        views: 45,
                        time: "4 minutes ago",
                      },
                      {
                        title: "New blend suggestions",
                        tag: "New",
                        replies: 8,
                        views: 31,
                        time: "2 hours ago",
                      },
                      {
                        title: "What is the best French press?",
                        tag: "Popular",
                        replies: 14,
                        views: 82,
                        time: "1 day ago",
                      },
                      {
                        title: "How long to roast beans?",
                        tag: "Help",
                        replies: 5,
                        views: 22,
                        time: "3 days ago",
                      },
                    ].map((post, index) => (
                      <div
                        key={post.title}
                        className="grid gap-4 rounded-lg border border-slate-100 bg-white p-4 shadow-sm sm:grid-cols-[1fr_90px_90px_120px]"
                      >
                        <div>
                          <p className="font-bold text-slate-900">
                            {post.title}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                                index === 0
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {post.tag}
                            </span>
                            <div className="flex -space-x-2">
                              {avatars.slice(0, 3).map((avatar) => (
                                <img
                                  key={avatar}
                                  src={avatar}
                                  alt="User"
                                  className="h-6 w-6 rounded-full border-2 border-white object-cover"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-slate-500">
                          <span className="font-bold text-slate-900">
                            {post.replies}
                          </span>{" "}
                          replies
                        </div>

                        <div className="text-sm text-slate-500">
                          <span className="font-bold text-slate-900">
                            {post.views}
                          </span>{" "}
                          views
                        </div>

                        <div className="text-sm text-slate-400">
                          {post.time}
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
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-center text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-left"
              style={{ fontFamily: handwrittenFont }}
            >
              By and for the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">community</span>
                <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[5px] border-orange-300" />
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600">
              Enable users to help each other. Boost collective knowledge and
              anticipate your customer&apos;s needs with valuable insights and
              problem-solving discussions.
            </p>

            <div className="mt-10 flex max-w-xs items-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-100">
              <MessageCircle className="h-4 w-4 text-rose-500" />
              Get customer service
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <h3 className="text-lg font-bold text-slate-900">
                The best brushes for pottery?
              </h3>

              <div className="mt-6 space-y-5">
                {[
                  {
                    name: "Alex Martin",
                    text: "Which brush is best for smooth details?",
                    bg: "bg-white",
                  },
                  {
                    name: "Kate Rowan",
                    text: "I recommend soft natural brushes for clean strokes.",
                    bg: "bg-emerald-50",
                  },
                  {
                    name: "Thomas Joseph",
                    text: "Thanks! This was super helpful.",
                    bg: "bg-white",
                  },
                ].map((item, index) => (
                  <div
                    key={item.name}
                    className={`rounded-xl border border-slate-100 p-4 text-left ${item.bg}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={avatars[index]}
                        alt={item.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400">Community user</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Trophy className="mx-auto h-12 w-12 text-amber-500" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Gamification drives{" "}
            <HandUnderline color="bg-rose-300">
              <span>motivation</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Motivate, engage, and drive actions. Set up a reward system with
            karma points to give your most active members more moderation
            features and responsibilities.
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="bg-[#714b67] px-6 py-5 text-left text-white">
              <p className="text-xl font-bold">All Users</p>
            </div>

            <div className="grid gap-5 bg-white p-6 sm:grid-cols-3">
              {[
                ["Robin Bineau", "2877 XP", avatars[0]],
                ["Marine Duvelle", "1791 XP", avatars[1]],
                ["Joel Willis", "1657 XP", avatars[2]],
              ].map(([name, score, avatar]) => (
                <div
                  key={name}
                  className="rounded-xl bg-slate-50 p-5 text-center ring-1 ring-slate-100"
                >
                  <img
                    src={avatar}
                    alt={name}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                  <p className="mt-4 font-bold text-slate-900">{name}</p>
                  <p className="mt-1 text-sm text-[#714b67]">{score}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-5">
              {["New badge unlocked", "Answer accepted", "Top contributor"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last:border-0"
                  >
                    <span className="text-slate-600">{item}</span>
                    <span className="font-bold text-[#714b67]">+25 Karma</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#02cfc3] text-slate-900 shadow-[8px_8px_0_rgba(15,23,42,0.9)]">
              <Palette className="h-9 w-9" />
            </div>

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Customize</span>
                <span className="absolute bottom-2 left-0 h-5 w-full rounded-full bg-[#02cfc3]" />
              </span>{" "}
              your
              <br />
              content&apos;s design
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600">
              User-friendly and advanced text editor. Enable users to edit and
              structure their content with plenty of helpful features.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-bold text-slate-900">Your Answer</p>
                <span className="text-sm text-slate-400">•••</span>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="mb-4 flex gap-2">
                  {["B", "I", "U", "Link", "Image", "Code"].map((tool) => (
                    <span
                      key={tool}
                      className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-500"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="h-3 w-full rounded bg-slate-200" />
                  <div className="h-3 w-11/12 rounded bg-slate-200" />
                  <div className="h-3 w-4/5 rounded bg-slate-200" />
                  <div className="h-24 rounded bg-white ring-1 ring-slate-100" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-16 left-8 hidden w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-xl lg:block">
              {["Bold text", "Upload image", "Embed video", "Insert quote"].map(
                (item) => (
                  <div
                    key={item}
                    className="mb-2 flex items-center gap-2 text-xs text-slate-500 last:mb-0"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>right.</span>
            </HandUnderline>
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
            , one{" "}
            <HandUnderline color="bg-sky-300">
              <span>app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow.
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
            See all Apps <ArrowRight className="h-4 w-4" />
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
                  Adon ensures product quality and triples production without
                  extra hiring.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Mark Anderson</p>
                    <p className="text-sm text-slate-500">CEO & Founder</p>
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

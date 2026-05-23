"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Code2,
  Eye,
  Flame,
  Handshake,
  Headphones,
  Lightbulb,
  MessageSquareText,
  PlusCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

const CATEGORIES = [
  {
    icon: MessageSquareText,
    title: "General Discussion",
    description:
      "Chat about anything Adon ERP — from quick tips to deep architectural debates.",
    count: "2.4K threads",
    color: "text-blue-600",
    bg: "bg-blue-50",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Getting Started",
    description:
      "New to Adon ERP? Ask setup questions, browse tutorials, and connect with mentors.",
    count: "1.8K threads",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Code2,
    title: "Development & API",
    description:
      "Dive into the codebase, discuss API endpoints, and share integration patterns.",
    count: "3.1K threads",
    color: "text-violet-600",
    bg: "bg-violet-50",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Feature Requests",
    description:
      "Propose new features, vote on what the community wants next, and shape the roadmap.",
    count: "965 threads",
    color: "text-amber-600",
    bg: "bg-amber-50",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Bug Reports",
    description:
      "Found something unexpected? File a bug report here and get triage from the team.",
    count: "760 threads",
    color: "text-rose-600",
    bg: "bg-rose-50",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Lightbulb,
    title: "Ideas & Show & Tell",
    description:
      "Share what you have built, demo your modules, and inspire the next contributor.",
    count: "540 threads",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    gradient: "from-cyan-500 to-sky-600",
  },
];

const FEATURES = [
  {
    icon: Search,
    title: "Search everything",
    description:
      "Full-text search across all threads, replies, and attachments — find the answer before you ask.",
  },
  {
    icon: ThumbsUp,
    title: "Vote on answers",
    description:
      "Upvote helpful replies so the best solution rises to the top. Accepted answers get a green check.",
  },
  {
    icon: Headphones,
    title: "Community-led support",
    description:
      "Active contributors and maintainers answer questions daily. Average first response is under 2 hours.",
  },
  {
    icon: TrendingUp,
    title: "Trending topics",
    description:
      "Hot threads are surfaced on the home page so you never miss a topic the community is buzzing about.",
  },
];

const RECENT_THREADS = [
  {
    title: "How to extend the Purchase module with custom fields?",
    category: "Development & API",
    author: "Sofia L.",
    replies: 14,
    views: 312,
    lastActive: "2 hours ago",
    tags: ["purchase", "custom-fields"],
  },
  {
    title: "Best practices for multi-currency reporting in v17?",
    category: "General Discussion",
    author: "Rajesh M.",
    replies: 8,
    views: 189,
    lastActive: "5 hours ago",
    tags: ["multi-currency", "reporting"],
  },
  {
    title: "Feature request: webhook notifications for stock transfers",
    category: "Feature Requests",
    author: "Lena K.",
    replies: 34,
    views: 721,
    lastActive: "30 minutes ago",
    tags: ["webhook", "inventory", "feature-request"],
  },
  {
    title: "Getting Started guide for Windows dev setup",
    category: "Getting Started",
    author: "Jules P.",
    replies: 21,
    views: 540,
    lastActive: "1 hour ago",
    tags: ["windows", "setup", "dev"],
  },
  {
    title: "Bug: stock reconciliation produces negative qty on partial picks",
    category: "Bug Reports",
    author: "Omar Y.",
    replies: 6,
    views: 134,
    lastActive: "12 hours ago",
    tags: ["inventory", "bug", "stock"],
  },
  {
    title: "Show & Tell: our custom CRM module for service firms",
    category: "Ideas & Show & Tell",
    author: "Nadia R.",
    replies: 18,
    views: 445,
    lastActive: "3 hours ago",
    tags: ["crm", "module", "show-and-tell"],
  },
];

const TOP_CONTRIBUTORS = [
  { name: "Omar Yousef", posts: 382, badges: 12, role: "Moderator" },
  { name: "Aisha Karim", posts: 291, badges: 9, role: "Top Contributor" },
  { name: "Lena Kowalska", posts: 245, badges: 8, role: "Top Contributor" },
  { name: "Tiago Nascimento", posts: 198, badges: 6, role: "Contributor" },
];

const STATS = [
  { value: "50K+", label: "Posts" },
  { value: "12K+", label: "Members" },
  { value: "180+", label: "Countries" },
  { value: "< 2hrs", label: "Avg response" },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function HandUnderlineText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative ${className}`}>
      {children}
      <svg
        className="absolute -bottom-2 left-0 w-full"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9C40 3 80 2 120 3.5C160 5 180 8 201 2.5"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function ForumPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(139,92,246,0.06),transparent_26%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <motion.div
            className="max-w-xl space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionEyebrow
              icon={<MessageSquareText className="h-4 w-4" />}
              label="Join the conversation"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Collaborate / Forum
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Questions, tips,
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  <span className="text-primary">discussions</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                The Adon ERP community forum is where developers, users, and
                partners connect. Ask questions, share insights, and have a say
                in the product roadmap.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <MessageSquareText className="h-4 w-4" />
                Browse categories
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <PlusCircle className="h-4 w-4" />
                Start a thread
              </a>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 rounded-2xl border border-primary/20 bg-card/80 p-5 backdrop-blur-sm shadow-sm">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black text-primary">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — thread preview card */}
          <motion.div
            className="relative mx-auto flex w-full max-w-xl items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              heroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.88 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />

            <div className="w-full overflow-hidden rounded-[2.5rem] border-8 border-card bg-card shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded-lg bg-muted px-3 py-1">
                  <span className="text-xs text-muted-foreground">
                    community.adonerp.com/forum
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  {
                    title: "How to extend Purchase module with custom fields",
                    meta: "Sofia L. · 5 replies · 10m ago",
                    hot: true,
                  },
                  {
                    title: "Feature request: webhook for stock notifications",
                    meta: "Lena K. · 12 replies · 25m ago",
                    hot: true,
                  },
                  {
                    title: "v17: multi-currency journal entry best practices",
                    meta: "Rajesh M. · 8 replies · 1h ago",
                    hot: false,
                  },
                  {
                    title: "Beginner: first module — need help",
                    meta: "Jules P. · 3 replies · 2h ago",
                    hot: false,
                  },
                  {
                    title: "Bug report — inventory reconciliation quirk",
                    meta: "Omar Y. · 1h ago",
                    hot: false,
                  },
                ].map((thread, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-primary/5"
                  >
                    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MessageSquareText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {thread.hot && (
                          <Flame className="h-3 w-3 text-destructive" />
                        )}
                        <p className="truncate text-sm font-medium text-foreground">
                          {thread.title}
                        </p>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {thread.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ BOARD CATEGORIES ═════════════════════ */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<BookOpen className="h-4 w-4" />}
            label="Forum desks"
          />
          <ScriptHeading className="mt-6">
            Find the right place to ask
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every topic has a home. Browse categories and jump into the
            conversation that matters most to you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-[0.030] transition-opacity duration-300 group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} shadow-md shadow-primary/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {cat.description}
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Browse threads
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ WHY FORUM ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Rocket className="h-4 w-4" />}
            label="Why a forum"
          />
          <ScriptHeading className="mt-6">
            Built for <HandUnderlineText>answers</HandUnderlineText>, not noise
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Reddit-style chaos has no place here. Our forum is curated, voted, and
            moderated — so the good stuff rises to the top.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ RECENT THREADS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Flame className="h-4 w-4" />}
            label="Trending now"
          />
          <ScriptHeading className="mt-6">
            Hot threads from this week
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Catch up on what the community is talking about right now.
          </p>
        </div>

        <div className="space-y-3">
          {RECENT_THREADS.map((thread, index) => (
            <motion.div
              key={thread.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquareText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {thread.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {thread.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    by {thread.author} &middot;{" "}
                    {thread.replies} replies &middot; {thread.views + " views"} &middot;{" "}
                    {thread.lastActive}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex gap-2">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                View
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            View all threads
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ═════════════════════ TOP CONTRIBUTORS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Star className="h-4 w-4" />}
            label="Hall of voices"
          />
          <ScriptHeading className="mt-6">
            Our top forum contributors
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Members who consistently help others, welcome newcomers, and keep
            the conversation constructive.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_CONTRIBUTORS.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {c.name}
                    </p>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Contributor</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-primary">{c.posts}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Posts</p>
                </div>
                <div className="rounded-xl bg-muted/30 p-3 text-center">
                  <p className="text-lg font-black text-secondary-foreground">{c.badges}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Badges</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ GUIDELINES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Community guidelines"
          />
          <ScriptHeading className="mt-6">
            Keep it welcoming
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A great community starts with great behaviour. Follow these simple
            rules and help us keep Adon ERP a safe, inclusive place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: CheckCircle2,
              title: "Be respectful",
              description:
                "Treat every member with kindness. Constructive debate is welcome; personal attacks are not.",
            },
            {
              icon: BookOpen,
              title: "Search before posting",
              description:
                "Chances are someone has already asked your question. A quick search saves everyone time.",
            },
            {
              icon: Sparkles,
              title: "Stay on topic",
              description:
                "Keep discussions relevant to Adon ERP. Off-topic posts dilute the signal for everyone.",
            },
            {
              icon: ShieldCheck,
              title: "Match the tone",
              description:
                "Jargon-free when helping beginners. Detailed and precise when discussing maintainer-level topics.",
            },
          ].map((rule, index) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {rule.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {rule.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ TESTIMONIALS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Users className="h-4 w-4" />}
            label="Member voices"
          />
          <ScriptHeading className="mt-6">
            From the
            <br />
            community forum
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {[
            {
              quote:
                "I asked a question about custom reports at 9 pm and had three excellent answers before I went to bed. This forum is genuinely the best developer community I have joined.",
              name: "Julia Saab",
              role: "ERP Consultant · Lebanon",
              avatar: "JS",
            },
            {
              quote:
                "The search is so good that I rarely even need to post. Being able to upvote the right answer means the next person with the same problem gets instant help.",
              name: "Kwame Osei",
              role: "Full-stack Developer · Ghana",
              avatar: "KO",
            },
          ].map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-8 w-8 text-primary/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Forum
                  </span>
                </div>
                <p className="text-base leading-8 text-foreground/80">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary/60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ CTA ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-primary/90 to-primary/70 px-6 py-16 text-center shadow-[0_50px_130px_rgba(0,0,0,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Users className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              Ready to join the&nbsp;
              <HandUnderlineText>conversation</HandUnderlineText>?
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Whether you are here to ask, answer, or just lurk — the Adon ERP
              community forum welcomes you.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4" />
                Create an account
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <BookOpen className="h-4 w-4" />
                Read the guidelines
              </a>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Free &amp; open to everyone &middot; No spam &middot; Community-moderated
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
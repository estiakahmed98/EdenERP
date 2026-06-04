"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

export default function ForumLandingSections() {
  const t = useTranslations("pages.forum");

  // Sidebar menu items
  const sidebarMenuItems = [
    t("hero.sidebar.posts"),
    t("hero.sidebar.myProfile"),
    t("hero.sidebar.popularAnswers"),
    t("hero.sidebar.favorites"),
    t("hero.sidebar.categories"),
  ];

  // Tags
  const tags = [
    t("hero.sidebar.tagHelp"),
    t("hero.sidebar.tagTips"),
    t("hero.sidebar.tagSupport"),
  ];

  // Forum posts
  const forumPosts = [
    {
      title: t("hero.forumContent.posts.post1.title"),
      tag: t("hero.forumContent.posts.post1.tag"),
      replies: t("hero.forumContent.posts.post1.replies"),
      views: t("hero.forumContent.posts.post1.views"),
      time: t("hero.forumContent.posts.post1.time"),
    },
    {
      title: t("hero.forumContent.posts.post2.title"),
      tag: t("hero.forumContent.posts.post2.tag"),
      replies: t("hero.forumContent.posts.post2.replies"),
      views: t("hero.forumContent.posts.post2.views"),
      time: t("hero.forumContent.posts.post2.time"),
    },
    {
      title: t("hero.forumContent.posts.post3.title"),
      tag: t("hero.forumContent.posts.post3.tag"),
      replies: t("hero.forumContent.posts.post3.replies"),
      views: t("hero.forumContent.posts.post3.views"),
      time: t("hero.forumContent.posts.post3.time"),
    },
    {
      title: t("hero.forumContent.posts.post4.title"),
      tag: t("hero.forumContent.posts.post4.tag"),
      replies: t("hero.forumContent.posts.post4.replies"),
      views: t("hero.forumContent.posts.post4.views"),
      time: t("hero.forumContent.posts.post4.time"),
    },
  ];

  // Comments data
  const comments = [
    {
      name: t("communitySection.discussion.comments.0.name"),
      text: t("communitySection.discussion.comments.0.text"),
      role: t("communitySection.discussion.comments.0.role"),
    },
    {
      name: t("communitySection.discussion.comments.1.name"),
      text: t("communitySection.discussion.comments.1.text"),
      role: t("communitySection.discussion.comments.1.role"),
    },
    {
      name: t("communitySection.discussion.comments.2.name"),
      text: t("communitySection.discussion.comments.2.text"),
      role: t("communitySection.discussion.comments.2.role"),
    },
  ];

  // Leaderboard users
  const leaderboardUsers = [
    {
      name: t("gamificationSection.leaderboard.users.0.name"),
      xp: t("gamificationSection.leaderboard.users.0.xp"),
    },
    {
      name: t("gamificationSection.leaderboard.users.1.name"),
      xp: t("gamificationSection.leaderboard.users.1.xp"),
    },
    {
      name: t("gamificationSection.leaderboard.users.2.name"),
      xp: t("gamificationSection.leaderboard.users.2.xp"),
    },
  ];

  // Activities
  const activities = [
    t("gamificationSection.activities.newBadge"),
    t("gamificationSection.activities.answerAccepted"),
    t("gamificationSection.activities.topContributor"),
  ];

  // Editor tools
  const editorTools = t.raw("customizeSection.editor.tools");

  // Editor features
  const editorFeatures = [
    t("customizeSection.editor.features.boldText"),
    t("customizeSection.editor.features.uploadImage"),
    t("customizeSection.editor.features.embedVideo"),
    t("customizeSection.editor.features.insertQuote"),
  ];

  // Features list
  const featuresList = [
    {
      title: t("featuresSection.features.sortContent.title"),
      description: t("featuresSection.features.sortContent.description"),
    },
    {
      title: t("featuresSection.features.enrichDiscussion.title"),
      description: t("featuresSection.features.enrichDiscussion.description"),
    },
    {
      title: t("featuresSection.features.themeSelection.title"),
      description: t("featuresSection.features.themeSelection.description"),
    },
    {
      title: t("featuresSection.features.notifications.title"),
      description: t("featuresSection.features.notifications.description"),
    },
    {
      title: t("featuresSection.features.categories.title"),
      description: t("featuresSection.features.categories.description"),
    },
  ];

  // Apps list
  const appsList = [
    {
      title: t("appsSection.apps.website.title"),
      desc: t("appsSection.apps.website.desc"),
      icon: MonitorSmartphone,
    },
    {
      title: t("appsSection.apps.ecommerce.title"),
      desc: t("appsSection.apps.ecommerce.desc"),
      icon: LayoutGrid,
    },
    {
      title: t("appsSection.apps.blog.title"),
      desc: t("appsSection.apps.blog.desc"),
      icon: MessageCircle,
    },
    {
      title: t("appsSection.apps.liveChat.title"),
      desc: t("appsSection.apps.liveChat.desc"),
      icon: MessageCircle,
    },
    {
      title: t("appsSection.apps.helpdesk.title"),
      desc: t("appsSection.apps.helpdesk.desc"),
      icon: HelpCircle,
    },
  ];

  // Avatar images
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

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("hero.buttons.startNow")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xl font-bold text-orange-700 dark:text-orange-400"
                    style={{ fontFamily: handwrittenFont }}
                  >
                    {t("hero.forumHeader.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("hero.forumHeader.breadcrumb")}
                  </span>
                </div>

                <button className="rounded-md bg-orange-600 dark:bg-orange-700 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition">
                  {t("hero.forumHeader.contactButton")}
                </button>
              </div>

              <div className="grid min-h-105 lg:grid-cols-[230px_1fr]">
                <aside className="border-r border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {t("hero.sidebar.profileName")}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("hero.sidebar.profileRole")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-2">
                    {sidebarMenuItems.map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? "bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-sm"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t("hero.sidebar.tags")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-[11px] font-bold text-slate-500 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="bg-white dark:bg-slate-900 p-6 text-left">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {t("hero.forumContent.title")}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {t("hero.forumContent.description")}
                      </p>
                    </div>

                    <button className="rounded-md bg-orange-600 dark:bg-orange-700 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition">
                      {t("hero.forumContent.newPost")}
                    </button>
                  </div>

                  <div className="mb-5 flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
                    <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm text-slate-400 dark:text-slate-500">
                      {t("hero.forumContent.searchPlaceholder")}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {forumPosts.map((post, index) => (
                      <div
                        key={post.title}
                        className="grid gap-4 rounded-lg border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm sm:grid-cols-[1fr_90px_90px_120px]"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {post.title}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                                index === 0
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
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
                                  className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {post.replies}
                          </span>{" "}
                          replies
                        </div>

                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {post.views}
                          </span>{" "}
                          views
                        </div>

                        <div className="text-sm text-slate-400 dark:text-slate-500">
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

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-center text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-left"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("communitySection.title")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10">
                  {t("communitySection.titleHighlight")}
                </span>
                <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[5px] border-orange-300 dark:border-orange-600" />
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("communitySection.description")}
            </p>

            <div className="mt-10 flex max-w-xs items-center gap-3 rounded-full bg-white dark:bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-lg ring-1 ring-slate-100 dark:ring-slate-700">
              <MessageCircle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
              {t("communitySection.badge")}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("communitySection.discussion.title")}
              </h3>

              <div className="mt-6 space-y-5">
                {comments.map((item, index) => (
                  <div
                    key={item.name}
                    className={`rounded-xl border border-slate-100 dark:border-slate-700 p-4 text-left ${
                      index === 1
                        ? "bg-emerald-50 dark:bg-emerald-950/30"
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={avatars[index]}
                        alt={item.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Trophy className="mx-auto h-12 w-12 text-amber-500 dark:text-amber-400" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("gamificationSection.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">
                {t("gamificationSection.titleHighlight")}
              </span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("gamificationSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="bg-[#714b67] dark:bg-[#8a5a7e] px-6 py-5 text-left text-white">
              <p className="text-xl font-bold">
                {t("gamificationSection.leaderboard.title")}
              </p>
            </div>

            <div className="grid gap-5 bg-white dark:bg-slate-900 p-6 sm:grid-cols-3">
              {leaderboardUsers.map((user, index) => (
                <div
                  key={user.name}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-5 text-center ring-1 ring-slate-100 dark:ring-slate-700"
                >
                  <img
                    src={avatars[index]}
                    alt={user.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                  <p className="mt-4 font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="mt-1 text-sm text-[#714b67] dark:text-[#9b6a8f]">
                    {user.xp}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 p-5">
              {activities.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 py-3 text-sm last:border-0"
                >
                  <span className="text-slate-600 dark:text-slate-300">
                    {item}
                  </span>
                  <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                    {t("gamificationSection.activities.karmaPoints")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#02cfc3] dark:bg-[#02cfc3]/30 text-slate-900 dark:text-white shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
              <Palette className="h-9 w-9" />
            </div>

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">
                  {t("customizeSection.title")}
                </span>
                <span className="absolute bottom-2 left-0 h-5 w-full rounded-full bg-[#02cfc3] dark:bg-[#02cfc3]/40" />
              </span>{" "}
              {t("customizeSection.subtitle")}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("customizeSection.description")}
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("customizeSection.editor.title")}
                </p>
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  •••
                </span>
              </div>

              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
                <div className="mb-4 flex gap-2">
                  {Array.isArray(editorTools) &&
                    editorTools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded bg-white dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400"
                      >
                        {tool}
                      </span>
                    ))}
                </div>

                <div className="space-y-3">
                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-24 rounded bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-16 left-8 hidden w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-xl lg:block">
              {editorFeatures.map((item) => (
                <div
                  key={item}
                  className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 last:mb-0"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("featuresSection.highlight")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            {t("featuresSection.subtitle")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("featuresSection.subtitle")}
              </span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature) => (
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
            {t("featuresSection.seeAllFeatures")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("appsSection.needHighlight")}
              </span>
            </HandUnderline>
            , {t("appsSection.appHighlight")}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appsList.map((app) => {
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
                      {app.desc}
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
            {t("appsSection.seeAllApps")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
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
                {t("ctaSection.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaSection.description")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                &ldquo;
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {t("ctaSection.testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("ctaSection.testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("ctaSection.testimonial.title")}
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
              {t("getStartedSection.title")}
              <br />
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("getStartedSection.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("getStartedSection.subtitle")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("getStartedSection.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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

function XIcon() {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      aria-label="Close"
    >
      ×
    </button>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}

export default function WebsiteBuilderSections() {
  const t = useTranslations("pages.website-builder");

  // Build steps from translations
  const builderSteps = [
    {
      title: t("builderSection.steps.site.title"),
      description: t("builderSection.steps.site.description"),
      icon: Compass,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    },
    {
      title: t("builderSection.steps.add.title"),
      description: t("builderSection.steps.add.description"),
      icon: Layers3,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      title: t("builderSection.steps.adjust.title"),
      description: t("builderSection.steps.adjust.description"),
      icon: Settings2,
      color: "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
    },
    {
      title: t("builderSection.steps.grow.title"),
      description: t("builderSection.steps.grow.description"),
      icon: Rocket,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
  ];

  // Sidebar items
  const sidebarItems = [
    t("builderSection.sidebar.pages"),
    t("builderSection.sidebar.blocks"),
    t("builderSection.sidebar.theme"),
    t("builderSection.sidebar.style"),
    t("builderSection.sidebar.media"),
    t("builderSection.sidebar.settings"),
  ];

  // Templates
  const templates = [
    {
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36c?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.studio"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.portfolio"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.agency"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.startup"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.shop"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop",
      title: t("builderSection.templates.landing"),
    },
  ];

  // Theme items
  const themeItems = [
    t("hero.dashboard.themePanel.items.colorPalette"),
    t("hero.dashboard.themePanel.items.typography"),
    t("hero.dashboard.themePanel.items.spacing"),
    t("hero.dashboard.themePanel.items.buttons"),
    t("hero.dashboard.themePanel.items.sections"),
    t("hero.dashboard.themePanel.items.animation"),
    t("hero.dashboard.themePanel.items.mobile"),
  ];

  // Editor labels
  const editorLabels = [
    t("hero.dashboard.editorLabels.heroImage"),
    t("hero.dashboard.editorLabels.mainButton"),
    t("hero.dashboard.editorLabels.productCard"),
  ];

  // AI suggestions
  const aiSuggestions = [
    t("aiSection.suggestions.headline"),
    t("aiSection.suggestions.rewrite"),
    t("aiSection.suggestions.seo"),
    t("aiSection.suggestions.cta"),
  ];

  // AI tabs
  const aiTabs = [
    t("aiSection.tabs.edit"),
    t("aiSection.tabs.seo"),
    t("aiSection.tabs.style"),
    t("aiSection.tabs.content"),
  ];

  // Integration apps
  const integrationApps = [
    {
      label: t("integrationSection.apps.accounting"),
      icon: ReceiptIcon,
      left: "16%",
      top: "18%",
    },
    {
      label: t("integrationSection.apps.crm"),
      icon: Diamond,
      left: "68%",
      top: "15%",
    },
    {
      label: t("integrationSection.apps.inventory"),
      icon: PackageCheck,
      left: "13%",
      top: "68%",
    },
    {
      label: t("integrationSection.apps.calendar"),
      icon: CheckCircle2,
      left: "69%",
      top: "69%",
    },
    {
      label: t("integrationSection.apps.marketing"),
      icon: WandSparkles,
      left: "42%",
      top: "3%",
    },
    {
      label: t("integrationSection.apps.website"),
      icon: Globe2,
      left: "42%",
      top: "82%",
    },
  ];

  // Features list
  const featuresList = [
    {
      title: t("featuresSection.features.mobileResponsive.title"),
      description: t("featuresSection.features.mobileResponsive.description"),
    },
    {
      title: t("featuresSection.features.translation.title"),
      description: t("featuresSection.features.translation.description"),
    },
    {
      title: t("featuresSection.features.themeCustomization.title"),
      description: t("featuresSection.features.themeCustomization.description"),
    },
    {
      title: t("featuresSection.features.seo.title"),
      description: t("featuresSection.features.seo.description"),
    },
    {
      title: t("featuresSection.features.shapesAnimations.title"),
      description: t("featuresSection.features.shapesAnimations.description"),
    },
    {
      title: t("featuresSection.features.analytics.title"),
      description: t("featuresSection.features.analytics.description"),
    },
  ];

  // Apps list
  const appsList = [
    {
      title: t("appsSection.apps.ecommerce.title"),
      desc: t("appsSection.apps.ecommerce.desc"),
      icon: ShoppingBag,
    },
    {
      title: t("appsSection.apps.events.title"),
      desc: t("appsSection.apps.events.desc"),
      icon: Sparkles,
    },
    {
      title: t("appsSection.apps.elearning.title"),
      desc: t("appsSection.apps.elearning.desc"),
      icon: GraduationCap,
    },
    {
      title: t("appsSection.apps.crm.title"),
      desc: t("appsSection.apps.crm.desc"),
      icon: Diamond,
    },
    {
      title: t("appsSection.apps.appointments.title"),
      desc: t("appsSection.apps.appointments.desc"),
      icon: CheckCircle2,
    },
    {
      title: t("appsSection.apps.marketing.title"),
      desc: t("appsSection.apps.marketing.desc"),
      icon: WandSparkles,
    },
  ];

  // Avatar images
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

  // Block icons
  const blockIcons = [
    LayoutGrid,
    ImageIcon,
    FileText,
    MousePointerClick,
    Palette,
    Code2,
    Store,
    Search,
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
            <HandUnderline color="bg-orange-300 dark:bg-orange-800">
              <span className="text-orange-500 dark:text-orange-400">
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

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-[#ff5c78] dark:text-[#ff7a8e] sm:block">
              <Sparkles className="h-12 w-12 rotate-[-25deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="grid bg-[#11121b] dark:bg-[#0a0a14] lg:grid-cols-[1fr_260px]">
                <div className="relative min-h-107 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&auto=format&fit=crop')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/35" />

                  <div className="relative flex h-full min-h-107 flex-col justify-between p-8 text-left text-white">
                    <div>
                      <p className="text-sm font-bold tracking-wide">
                        {t("hero.dashboard.siteTitle")}
                      </p>
                      <h2 className="mt-10 max-w-xs text-5xl font-bold leading-none">
                        {t("hero.dashboard.heroTitle")}
                      </h2>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                        {t("hero.dashboard.heroDescription")}
                      </p>
                      <button className="mt-8 rounded-md bg-orange-500 dark:bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600 transition">
                        {t("hero.dashboard.orderButton")}
                      </button>
                    </div>

                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </div>

                    <div className="absolute bottom-8 left-10 w-64 rounded-lg bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white shadow-2xl">
                      <div className="mb-3 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-2">
                        {editorLabels.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-white/10 bg-[#171824] dark:bg-[#0f0f1a] p-5 text-left text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-bold">
                      {t("hero.dashboard.themePanel.title")}
                    </p>
                    <div className="h-7 w-7 rounded-full bg-[#714b67] dark:bg-[#8a5a7e]" />
                  </div>

                  <div className="space-y-4">
                    {themeItems.map((item, index) => (
                      <div key={item}>
                        <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                          <span>{item}</span>
                          <span>{index + 1}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 dark:bg-white/5">
                          <div
                            className="h-2 rounded-full bg-[#02a6a6] dark:bg-[#02cfc3]"
                            style={{ width: `${45 + index * 6}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg bg-white/5 dark:bg-white/5 p-4">
                    <p className="text-xs text-white/60">
                      {t("hero.dashboard.themePanel.livePreview")}
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-10 rounded bg-white/10 dark:bg-white/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white dark:bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-lg ring-1 ring-slate-100 dark:ring-slate-700">
            <MessageCircle className="h-4 w-4 text-[#02a6a6] dark:text-[#02cfc3]" />
            {t("builderSection.badge")}
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("builderSection.title")}{" "}
            <HandUnderline color="bg-[#02a6a6] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("builderSection.titleHighlight")}
              </span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("builderSection.description")}
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 rounded-xl bg-[#f3f4f7] dark:bg-[#0f0f1a] p-8 sm:grid-cols-2 lg:grid-cols-4">
            {builderSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
            {t("builderSection.quote")}
            <br />
            <span className="font-semibold text-slate-900 dark:text-white">
              {t("builderSection.quoteHighlight")}
            </span>
          </p>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="grid min-h-107 lg:grid-cols-[220px_1fr]">
              <aside className="border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-left">
                <p className="mb-6 text-sm font-bold text-slate-900 dark:text-white">
                  {t("builderSection.sidebar.website")}
                </p>

                {sidebarItems.map((item, index) => (
                  <div
                    key={item}
                    className={`mb-2 rounded-md px-4 py-3 text-sm font-semibold ${
                      index === 2
                        ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </aside>

              <div className="bg-[#eef0f4] dark:bg-[#0f0f1a] p-7">
                <div className="grid gap-5 md:grid-cols-3">
                  {templates.map((template) => (
                    <div
                      key={template.title}
                      className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm"
                    >
                      <img
                        src={template.image}
                        alt={template.title}
                        className="h-28 w-full object-cover"
                      />
                      <div className="p-3 text-left">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {template.title}
                        </p>
                        <div className="mt-2 h-2 w-16 rounded bg-slate-100 dark:bg-slate-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-950/50 text-[#02a6a6] dark:text-[#02cfc3]">
            <Diamond className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("designerSection.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("designerSection.description")}
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-[#0f0715] dark:bg-[#0a0a14] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.15)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="grid min-h-107 lg:grid-cols-[1fr_260px]">
                <div className="flex items-center justify-center p-8">
                  <div className="grid w-full max-w-2xl gap-8 lg:grid-cols-[1fr_260px]">
                    <div className="text-left text-white">
                      <p className="text-sm text-white/50">
                        {t("designerSection.blockPreview.sectionBlock")}
                      </p>
                      <h3 className="mt-4 text-3xl font-bold">
                        {t("designerSection.blockPreview.subtitle")}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/60">
                        {t("designerSection.blockPreview.description")}
                      </p>
                      <button className="mt-6 rounded-full bg-white dark:bg-slate-800 px-5 py-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-gray-100 transition">
                        {t("designerSection.blockPreview.button")}
                      </button>
                    </div>

                    <div className="relative rounded-2xl border-8 border-[#7c3aed] dark:border-[#9b6a8f] bg-white dark:bg-slate-800 p-3 shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop"
                        alt="Design preview"
                        className="h-72 w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                <aside className="border-l border-white/10 bg-[#171824] dark:bg-[#0f0f1a] p-5 text-left text-white">
                  <p className="mb-5 text-sm font-bold">
                    {t("designerSection.sidebar.blocks")}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {blockIcons.map((Icon, index) => (
                      <div
                        key={index}
                        className="flex h-16 items-center justify-center rounded-lg bg-white/5 dark:bg-white/5 text-[#02a6a6] dark:text-[#02cfc3]"
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      t("designerSection.sidebar.width"),
                      t("designerSection.sidebar.radius"),
                      t("designerSection.sidebar.shadow"),
                      t("designerSection.sidebar.spacing"),
                    ].map((item, index) => (
                      <div key={item}>
                        <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                          <span>{item}</span>
                          <span>{index + 2}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 dark:bg-white/5">
                          <div
                            className="h-2 rounded-full bg-[#02a6a6] dark:bg-[#02cfc3]"
                            style={{ width: `${55 + index * 8}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 rounded-full bg-white dark:bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-lg ring-1 ring-slate-100 dark:ring-slate-700">
            <MessageCircle className="h-4 w-4 text-[#02a6a6] dark:text-[#02cfc3]" />
            {t("designerSection.chatBadge")}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                {aiTabs.map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${
                      index === 0
                        ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <XIcon />
            </div>

            <div className="space-y-3 text-left">
              {aiSuggestions.map((text) => (
                <div
                  key={text}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300"
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                {t("aiSection.buttons.apply")}
              </button>
              <button className="rounded-md border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                {t("aiSection.buttons.cancel")}
              </button>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("aiSection.title")}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {t("aiSection.description")}
            </p>
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
              {t("integrationSection.title")}
              <br />
              {t("integrationSection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {t("integrationSection.description")}
            </p>

            <p
              className="mt-8 text-lg text-rose-500 dark:text-rose-400"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("integrationSection.happyText")}
            </p>
          </div>

          <div className="relative mx-auto h-90 w-full max-w-lg">
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <Boxes className="h-12 w-12 text-[#02a6a6] dark:text-[#02cfc3]" />
            </div>

            {integrationApps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-center shadow-lg ring-1 ring-slate-100 dark:ring-slate-700"
                  style={{ left: item.left, top: item.top }}
                >
                  <Icon className="h-7 w-7 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="mt-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                </div>
              );
            })}

            <div className="absolute left-1/2 top-1/2 h-px w-[75%] -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
            <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-y-1/2 bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#7a4d6e] dark:bg-[#5a3854] px-8 py-20 text-center text-white shadow-[0_25px_70px_rgba(113,75,103,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <h2
              className="text-4xl font-bold leading-tight sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("freeSection.title")}
              <br />
              {t("freeSection.subtitle")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80">
              {t("freeSection.description")}
            </p>
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
            {t("featuresSection.title")}{" "}
            <HandUnderline color="bg-[#02a6a6] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("featuresSection.highlight")}
              </span>
            </HandUnderline>
            <br />
            {t("featuresSection.subtitle")}
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
            <HandUnderline color="bg-[#02a6a6] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">
                {t("appsSection.needHighlight")}
              </span>
            </HandUnderline>
            , {t("appsSection.appHighlight")}.
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
              <HandUnderline color="bg-[#02a6a6] dark:bg-[#02cfc3]/30">
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

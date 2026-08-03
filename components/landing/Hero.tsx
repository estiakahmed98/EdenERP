"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  CalendarClock,
  ChartNoAxesCombined,
  PackageCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { HandText, SectionTag, ThreeBg, TypeWriter } from "./landing-ui";

const SUBSCRIPTIONS = [
  { id: "AD-102", business: "Pixel Craft", renewal: "12 Sep", plan: "Starter", status: "Active", accent: "from-cyan-400 to-blue-500" },
  { id: "AD-103", business: "Nexa Fashion", renewal: "18 Sep", plan: "Business", status: "Active", accent: "from-rose-400 to-orange-400" },
  { id: "AD-104", business: "Urban Mart", renewal: "22 Sep", plan: "Starter", status: "Pending", accent: "from-amber-300 to-orange-500" },
  { id: "AD-105", business: "Bright Agency", renewal: "01 Oct", plan: "Enterprise", status: "Active", accent: "from-violet-400 to-fuchsia-500" },
  { id: "AD-106", business: "Northstar Labs", renewal: "04 Oct", plan: "Business", status: "Active", accent: "from-emerald-400 to-teal-500" },
  { id: "AD-107", business: "Canvas Studio", renewal: "09 Oct", plan: "Starter", status: "Pending", accent: "from-pink-400 to-rose-500" },
  { id: "AD-108", business: "Vertex Retail", renewal: "14 Oct", plan: "Enterprise", status: "Active", accent: "from-indigo-400 to-blue-600" },
] as const;

const VISIBLE_SUBSCRIPTIONS = 4;

const PLAN_STYLES = {
  Starter: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  Business:
    "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Enterprise:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
} as const;

export default function Hero() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const typeWords = t.raw("hero.typeWords") as string[];
  const shouldReduceMotion = useReducedMotion();
  const [isSubscriptionListPaused, setIsSubscriptionListPaused] =
    useState(false);
  const [visibleSubscriptions, setVisibleSubscriptions] = useState(() =>
    SUBSCRIPTIONS.slice(0, VISIBLE_SUBSCRIPTIONS),
  );

  useEffect(() => {
    if (shouldReduceMotion || isSubscriptionListPaused) return;

    const interval = window.setInterval(() => {
      setVisibleSubscriptions((currentRows) => {
        const lastRow = currentRows[currentRows.length - 1];
        const lastIndex = SUBSCRIPTIONS.findIndex(
          (subscription) => subscription.id === lastRow.id,
        );
        const nextRow = SUBSCRIPTIONS[(lastIndex + 1) % SUBSCRIPTIONS.length];

        return [...currentRows.slice(1), nextRow];
      });
    }, 2600);

    return () => window.clearInterval(interval);
  }, [isSubscriptionListPaused, shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-25">
      <ThreeBg />

      <div className="pointer-events-none absolute -left-20 -top-30 h-105 w-105 rounded-full bg-[#f3eef122] blur-[60px]" />

      <div className="pointer-events-none absolute -right-25 top-15 h-80 w-80 rounded-full bg-[#02cfc30a] blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-225 px-6 text-center">
        <SectionTag>{t("hero.tag")}</SectionTag>

        <h1 className="reveal reveal-d1 mt-6 font-hand text-[clamp(34px,5.5vw,78px)] font-bold leading-[1.1] tracking-[-1px] text-(--ink)">
          {t("hero.titlePrefix")} <br />
          <HandText>
            <TypeWriter words={typeWords} />
          </HandText>
        </h1>

        <p className="reveal reveal-d2 mx-auto mt-5 max-w-130 font-body text-lg leading-[1.7] text-[var(--muted)]">
          {t("hero.description")}
        </p>

        <div className="reveal reveal-d3 mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-[10px] border-[1.5px] border-transparent bg-(--purple) px-5.5 py-3 font-body text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95">
            {commonT("watchDemo")}
          </button>
        </div>

        {/* <p className="reveal mt-3 font-body text-xs text-[#aaa]">
          {t("common.priceNote")}
        </p> */}

        <div className="reveal shadow-float relative mt-14 animate-[scale-in_.8s_.5s_both] overflow-hidden rounded-[24px] border border-white/70 bg-card shadow-[0_30px_100px_-35px_rgba(32,30,74,0.38)] ring-1 ring-black/5 dark:border-white/10">
          <div className="flex items-center gap-2 border-b border-border/70 bg-background/75 px-4.5 py-2.5 backdrop-blur-xl">
            <div className="flex gap-1.25">
              {["#f87171", "#fbbf24", "#34d399"].map((color) => (
                <div
                  key={color}
                  className="h-2.75 w-2.75 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>

            <div className="mx-auto flex h-6 max-w-90 flex-1 items-center justify-center gap-1.5 rounded-md border border-border/60 bg-muted/40 text-[10px] text-muted-foreground shadow-inner sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              app.adon-erp.com/subscriptions
            </div>
          </div>

          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_0%,rgba(6,182,212,0.10),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(139,92,246,0.12),transparent_34%)] p-4 sm:p-6">
            <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 text-left">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 text-white shadow-lg shadow-violet-500/20">
                  <PackageCheck className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-extrabold tracking-tight text-foreground sm:text-base">
                      Client Subscriptions
                    </h2>
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                    Live billing and renewal overview
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 sm:text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                24 Active Plans
              </span>
            </div>

            <div className="relative mb-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Monthly revenue", value: "$18.4K", icon: ChartNoAxesCombined, color: "text-cyan-600" },
                { label: "Growth", value: "+12.4%", icon: TrendingUp, color: "text-emerald-600" },
                { label: "Renewing soon", value: "07", icon: CalendarClock, color: "text-violet-600" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border/70 bg-background/70 p-2.5 text-left shadow-[0_8px_30px_-20px_rgba(15,23,42,0.7)] backdrop-blur-md sm:p-3"
                >
                  <div className="mb-1 flex items-center justify-between gap-1">
                    <span className="truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:text-[9px]">
                      {label}
                    </span>
                    <Icon className={`hidden h-3.5 w-3.5 sm:block ${color}`} />
                  </div>
                  <span className="text-sm font-extrabold tracking-tight text-foreground sm:text-lg">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="relative rounded-2xl border border-border/70 bg-muted/20 p-1.5 shadow-inner sm:p-2"
              onMouseEnter={() => setIsSubscriptionListPaused(true)}
              onMouseLeave={() => setIsSubscriptionListPaused(false)}
            >
              <div className="mb-1 hidden grid-cols-[72px_minmax(0,1fr)_110px_110px_90px] px-3 py-1.5 text-left font-body text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:grid">
                {['ID', 'Business', 'Renewal', 'Plan', 'Status'].map((heading) => (
                  <span key={heading}>{heading}</span>
                ))}
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleSubscriptions.map((row) => (
                    <motion.div
                      layout
                      key={row.id}
                      initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, scale: 0.98, filter: "blur(4px)" }}
                      transition={{
                        opacity: { duration: 0.28 },
                        filter: { duration: 0.3 },
                        layout: { type: "spring", stiffness: 300, damping: 28 },
                      }}
                      className="group relative mb-1.5 grid grid-cols-[minmax(0,1fr)_auto] items-center overflow-hidden rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-left text-xs shadow-[0_8px_24px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md transition-colors hover:border-primary/25 hover:bg-background sm:grid-cols-[72px_minmax(0,1fr)_110px_110px_90px] sm:py-2"
                    >
                      <span className={`absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b ${row.accent}`} />

                      <span className="hidden font-mono text-[10px] font-bold text-muted-foreground sm:block">
                        {row.id}
                      </span>

                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-black text-white shadow-sm ${row.accent}`}>
                          {row.business
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-bold text-foreground">
                            {row.business}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-muted-foreground sm:hidden">
                            <span>{row.id}</span>
                            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
                            <span>{row.renewal}</span>
                            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
                            <span>{row.plan}</span>
                          </span>
                        </span>
                      </span>

                      <span className="hidden items-center gap-1.5 text-[10px] font-semibold text-muted-foreground sm:flex">
                        <CalendarClock className="h-3.5 w-3.5 text-cyan-600" />
                        {row.renewal}
                      </span>

                      <span className={`hidden w-fit rounded-full border px-2 py-1 text-[9px] font-bold sm:inline-flex ${PLAN_STYLES[row.plan]}`}>
                        {row.plan}
                      </span>

                      <span className={`inline-flex items-center justify-self-end rounded-full px-2 py-1 text-[9px] font-bold ${
                        row.status === "Pending"
                          ? "bg-amber-500/12 text-amber-700 dark:text-amber-300"
                          : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
                      }`}>
                        {row.status === "Active" ? (
                          <Activity className="mr-1 h-3 w-3" />
                        ) : (
                          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                        )}
                        {row.status}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

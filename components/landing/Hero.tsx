"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  ChartNoAxesCombined,
  PackageCheck,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import LiveDemoButton from "@/components/live-demo-button";

import {
  HandText,
  ICON_TONES,
  SectionTag,
  ThreeBg,
  TypeWriter,
} from "./landing-ui";

const SUBSCRIPTIONS = [
  { id: "AD-102", business: "Pixel Craft", renewal: "12 Sep", plan: "Starter", status: "Active" },
  { id: "AD-103", business: "Nexa Fashion", renewal: "18 Sep", plan: "Business", status: "Active" },
  { id: "AD-104", business: "Urban Mart", renewal: "22 Sep", plan: "Starter", status: "Pending" },
  { id: "AD-105", business: "Bright Agency", renewal: "01 Oct", plan: "Enterprise", status: "Active" },
  { id: "AD-106", business: "Northstar Labs", renewal: "04 Oct", plan: "Business", status: "Active" },
  { id: "AD-107", business: "Canvas Studio", renewal: "09 Oct", plan: "Starter", status: "Pending" },
  { id: "AD-108", business: "Vertex Retail", renewal: "14 Oct", plan: "Enterprise", status: "Active" },
] as const;

const VISIBLE_SUBSCRIPTIONS = 4;

const PLAN_STYLES = {
  Starter: "bg-muted text-(--muted)",
  Business: "bg-(--purple-light) text-(--purple)",
  Enterprise: "bg-(--teal)/10 text-(--teal)",
} as const;

const STATS = [
  { label: "Monthly revenue", value: "$18.4K", icon: ChartNoAxesCombined },
  { label: "Growth", value: "+12.4%", icon: TrendingUp },
  { label: "Renewing soon", value: "07", icon: CalendarClock },
] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("");

export default function Hero() {
  const t = useTranslations("pages.home");
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
    }, 3200);

    return () => window.clearInterval(interval);
  }, [isSubscriptionListPaused, shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden bg-(--cream) px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
      <ThreeBg />
      <div className="pointer-events-none absolute -left-20 -top-30 h-105 w-105 rounded-full bg-(--purple-light)/60 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-240 text-center">
        <SectionTag>{t("hero.tag")}</SectionTag>

        <h1 className="hero-in hero-d1 mt-5 font-hand text-[clamp(34px,5.5vw,72px)] font-bold leading-[1.1] tracking-[-1px] text-(--ink)">
          {t("hero.titlePrefix")} <br />
          <HandText>
            <TypeWriter words={typeWords} />
          </HandText>
        </h1>

        <p className="hero-in hero-d2 mx-auto mt-5 max-w-130 font-body text-lg leading-[1.7] text-(--muted)">
          {t("hero.description")}
        </p>

        <div className="hero-in hero-d3 mt-8 flex flex-wrap justify-center gap-3">
          <LiveDemoButton />
        </div>

        {/* Product preview */}
        <div className="reveal shadow-float relative mx-auto mt-14 max-w-225 overflow-hidden rounded-3xl border border-border bg-card text-left">
          <div className="flex items-center gap-2 border-b border-border bg-(--cream) px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              {["#f87171", "#fbbf24", "#34d399"].map((color) => (
                <span
                  key={color}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="mx-auto flex h-6 max-w-90 flex-1 items-center justify-center gap-1.5 rounded-md bg-muted/60 text-[11px] text-(--muted)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--teal)" />
              app.adon-erp.com/subscriptions
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${ICON_TONES[0]}`}>
                  <PackageCheck className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <h2 className="font-body text-sm font-semibold text-(--ink) sm:text-base">
                    Client Subscriptions
                  </h2>
                  <p className="mt-0.5 text-[11px] text-(--muted)">
                    Billing and renewal overview
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-(--teal)/10 px-3 py-1 text-[11px] font-semibold text-(--teal)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--teal)" />
                24 active plans
              </span>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
              {STATS.map(({ label, value, icon: Icon }, index) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-(--cream) p-3"
                >
                  <div className="mb-1 flex items-center justify-between gap-1">
                    <span className="truncate text-[10px] font-medium text-(--muted) sm:text-[11px]">
                      {label}
                    </span>
                    <Icon
                      className={`hidden h-3.5 w-3.5 sm:block ${index === 1 ? "text-(--teal)" : "text-(--purple)"}`}
                    />
                  </div>
                  <span className="font-body text-base font-semibold tabular-nums text-(--ink) sm:text-lg">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl border border-border p-1.5 sm:p-2"
              onMouseEnter={() => setIsSubscriptionListPaused(true)}
              onMouseLeave={() => setIsSubscriptionListPaused(false)}
            >
              <div className="mb-1 hidden grid-cols-[72px_minmax(0,1fr)_110px_110px_90px] px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-(--muted) sm:grid">
                {["ID", "Business", "Renewal", "Plan", "Status"].map((heading) => (
                  <span key={heading}>{heading}</span>
                ))}
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleSubscriptions.map((row, index) => (
                    <motion.div
                      layout
                      key={row.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{
                        opacity: { duration: 0.35, ease: "easeOut" },
                        y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="mb-1.5 grid grid-cols-[minmax(0,1fr)_auto] items-center rounded-xl bg-(--cream) px-3 py-2.5 text-xs last:mb-0 sm:grid-cols-[72px_minmax(0,1fr)_110px_110px_90px] sm:py-2"
                    >
                      <span className="hidden font-mono text-[10px] text-(--muted) sm:block">
                        {row.id}
                      </span>

                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-semibold ${ICON_TONES[index % ICON_TONES.length]}`}
                        >
                          {initials(row.business)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-(--ink)">
                            {row.business}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-(--muted) sm:hidden">
                            {row.id} · {row.renewal} · {row.plan}
                          </span>
                        </span>
                      </span>

                      <span className="hidden items-center gap-1.5 text-[11px] text-(--muted) sm:flex">
                        <CalendarClock className="h-3.5 w-3.5" />
                        {row.renewal}
                      </span>

                      <span
                        className={`hidden w-fit rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline-flex ${PLAN_STYLES[row.plan]}`}
                      >
                        {row.plan}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 justify-self-end rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          row.status === "Pending"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            : "bg-(--teal)/10 text-(--teal)"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
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

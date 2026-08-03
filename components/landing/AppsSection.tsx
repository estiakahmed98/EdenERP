"use client";

import {
  ArrowUpRight,
  Bot,
  BookOpen,
  Calculator,
  CalendarRange,
  Check,
  Clock3,
  CreditCard,
  Factory,
  FileSignature,
  FolderOpen,
  Globe2,
  Handshake,
  Layers3,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  MessageCircle,
  PackageOpen,
  RefreshCw,
  Send,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { APPS, type AppItem } from "./landing-data";
import { HandText, SectionTag } from "./landing-ui";

const APP_ICONS = [
  Calculator,
  BookOpen,
  FileSignature,
  Handshake,
  Wrench,
  RefreshCw,
  Bot,
  Store,
  MessageCircle,
  FolderOpen,
  ListChecks,
  Clock3,
  Zap,
  CalendarRange,
  LifeBuoy,
  ShoppingBag,
  Globe2,
  Send,
  CreditCard,
  PackageOpen,
  Factory,
  TrendingUp,
  UsersRound,
  LayoutDashboard,
] as const;

const ROW_STYLES = [
  {
    animation: "animate-[marqueeRight_30s_linear_infinite]",
    icon: "from-cyan-400 to-blue-500 shadow-cyan-500/20",
    glow: "bg-cyan-400/20",
  },
  {
    animation: "animate-[marqueeLeft_34s_linear_infinite]",
    icon: "from-violet-400 to-fuchsia-500 shadow-violet-500/20",
    glow: "bg-violet-400/20",
  },
  {
    animation: "animate-[marqueeRight_38s_linear_infinite]",
    icon: "from-emerald-400 to-teal-500 shadow-emerald-500/20",
    glow: "bg-emerald-400/20",
  },
  {
    animation: "animate-[marqueeLeft_32s_linear_infinite]",
    icon: "from-amber-300 to-orange-500 shadow-orange-500/20",
    glow: "bg-orange-400/20",
  },
] as const;

function AppGroup({
  apps,
  rowIndex,
  badge,
  ariaHidden = false,
}: {
  apps: AppItem[];
  rowIndex: number;
  badge: string;
  ariaHidden?: boolean;
}) {
  const rowStyle = ROW_STYLES[rowIndex];

  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 gap-3 pr-3">
      {apps.map((app, appIndex) => {
        const Icon = APP_ICONS[rowIndex * 6 + appIndex];

        return (
          <div
            key={app.name}
            className="group/card relative flex h-19 w-52 shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-border/70 bg-background/85 px-3.5 text-left shadow-[0_12px_35px_-25px_rgba(15,23,42,0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-background hover:shadow-[0_18px_45px_-24px_rgba(15,23,42,0.55)] sm:w-55"
          >
            <span
              className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-opacity duration-300 group-hover/card:opacity-100 ${rowStyle.glow}`}
            />

            <span
              className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${rowStyle.icon}`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-body text-[13px] font-extrabold tracking-[-0.01em] text-foreground">
                {app.name}
              </span>
              <span className="mt-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
                {badge}
              </span>
            </span>

            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-primary" />
          </div>
        );
      })}
    </div>
  );
}

function AppMarqueeRow({
  apps,
  rowIndex,
  badge,
}: {
  apps: AppItem[];
  rowIndex: number;
  badge: string;
}) {
  return (
    <div
      className="group/marquee overflow-hidden py-1.5"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        className={`flex w-max ${ROW_STYLES[rowIndex].animation} group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        <AppGroup apps={apps} rowIndex={rowIndex} badge={badge} />
        <AppGroup
          apps={apps}
          rowIndex={rowIndex}
          badge={badge}
          ariaHidden
        />
      </div>
    </div>
  );
}

export default function AppsSection() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const rows = [0, 1, 2, 3].map((rowIndex) =>
    APPS.slice(rowIndex * 6, rowIndex * 6 + 6),
  );

  return (
    <section className="relative overflow-hidden bg-(--cream) px-4 py-24 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-175 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(113,75,103,0.10),transparent_68%)]" />

      <div className="relative mx-auto max-w-240 text-center">
        <div className="reveal">
          <SectionTag>{t("apps.tag")}</SectionTag>
          <h2 className="mb-2.5 mt-4 font-hand text-[clamp(36px,5vw,62px)] font-bold leading-[1.1] text-(--ink)">
            {t("apps.title")} <HandText>{t("apps.titleHand")}</HandText>{" "}
            {t("apps.titleSuffix")}
          </h2>
          <p className="mx-auto mb-11 max-w-130 font-body text-[15px] leading-[1.7] text-[var(--muted)]">
            {t("apps.description")}
          </p>
        </div>

        <div className="reveal relative overflow-hidden rounded-[28px] border border-border/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.48))] py-5 shadow-[0_35px_100px_-50px_rgba(15,23,42,0.4)] ring-1 ring-black/[0.025] backdrop-blur-xl dark:bg-[linear-gradient(145deg,rgba(30,41,59,0.68),rgba(15,23,42,0.45))] sm:rounded-[34px] sm:py-6">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(113,75,103,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(113,75,103,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="pointer-events-none absolute -left-20 top-1/4 h-52 w-52 rounded-full bg-cyan-400/10 blur-[65px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-violet-400/10 blur-[70px]" />

          <div className="relative mx-4 mb-3 flex flex-col items-start justify-between gap-3 border-b border-border/60 px-1 pb-5 text-left sm:mx-7 sm:flex-row sm:items-center sm:px-2">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--purple) text-white shadow-lg shadow-primary/15">
                <Layers3 className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-body text-sm font-extrabold text-foreground sm:text-base">
                    {t("apps.ecosystemLabel", { count: APPS.length })}
                  </h3>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                  {t("apps.ecosystemHint")}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("apps.readyLabel")}
            </span>
          </div>

          <div className="relative space-y-1 px-1 sm:px-2">
            {rows.map((row, rowIndex) => (
              <AppMarqueeRow
                key={rowIndex}
                apps={row}
                rowIndex={rowIndex}
                badge={t("apps.appBadge")}
              />
            ))}
          </div>
        </div>

        <Link
          href="/apps"
          className="group mt-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-5 py-2.5 font-body text-[12px] font-extrabold text-(--purple) no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/10 hover:shadow-[0_12px_30px_-18px_rgba(113,75,103,0.6)]"
        >
          {commonT("viewAllApps")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}

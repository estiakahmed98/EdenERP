"use client";

import React from "react";
import {
  BadgeDollarSign,
  BookOpen,
  Bot,
  Boxes,
  BriefcaseBusiness,
  ContactRound,
  FileSignature,
  Globe2,
  Headphones,
  Megaphone,
  PackageCheck,
  ShoppingBag,
  Store,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

const APP_ICONS = [
  BadgeDollarSign,
  ContactRound,
  UsersRound,
  Boxes,
  ShoppingBag,
  Megaphone,
  Headphones,
  Bot,
  PackageCheck,
  FileSignature,
  BriefcaseBusiness,
  BookOpen,
  Store,
  Globe2,
] as const;

const ICON_STYLES = [
  "from-cyan-400 to-blue-500 shadow-cyan-500/20",
  "from-violet-400 to-fuchsia-500 shadow-violet-500/20",
  "from-emerald-400 to-teal-500 shadow-emerald-500/20",
  "from-amber-300 to-orange-500 shadow-orange-500/20",
] as const;

function MarqueeItems({
  items,
  ariaHidden = false,
}: {
  items: string[];
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 gap-3 pr-3">
      {items.map((item, index) => {
        const Icon = APP_ICONS[index % APP_ICONS.length];
        const iconStyle = ICON_STYLES[index % ICON_STYLES.length];

        return (
          <div
            key={item}
            className="group/item flex h-14 shrink-0 items-center gap-3 rounded-2xl border border-border/80 bg-card/80 px-3.5 pr-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_30px_-20px_rgba(15,23,42,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-card dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_-20px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-white/[0.09]"
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br text-white shadow-lg ${iconStyle}`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="whitespace-nowrap font-body text-[13px] font-bold tracking-[-0.01em] text-foreground dark:text-white/90 sm:text-sm">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-cyan-600/60 transition-transform duration-300 group-hover/item:scale-150 dark:bg-cyan-300/60" />
          </div>
        );
      })}
    </div>
  );
}

export default function MarqueeStrip() {
  const t = useTranslations("pages.home.marquee");
  const items = t.raw("items") as string[];

  return (
    <section className="relative isolate overflow-hidden border-y border-border/70 bg-[linear-gradient(135deg,#fbfdff_0%,#f4f7fb_48%,#fbf7fa_100%)] py-7 text-foreground dark:border-white/10 dark:bg-[linear-gradient(135deg,#10131b_0%,#12121a_48%,#171222_100%)] dark:text-white sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[70px] dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-violet-400/15 blur-[70px] dark:bg-violet-500/20" />

      <div className="relative mx-auto mb-5 flex max-w-225 flex-col items-center justify-between gap-2 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300 sm:text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-60 motion-reduce:animate-none dark:bg-cyan-300" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-300" />
          </span>
          {t("eyebrow")}
        </div>
        <p className="text-center font-body text-xs font-medium text-muted-foreground dark:text-white/55 sm:text-right sm:text-sm">
          {t("title")}
        </p>
      </div>

      <div
        className="group/marquee relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marqueeLeft_38s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          <MarqueeItems items={items} />
          <MarqueeItems items={items} ariaHidden />
        </div>
      </div>
    </section>
  );
}

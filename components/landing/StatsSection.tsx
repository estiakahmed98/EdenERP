"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Blocks,
  ShieldCheck,
  Smile,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { HandText, ICON_TONES, SectionTag, plainTag } from "./landing-ui";

// Order matches `stats.items`.
const STAT_ICONS: LucideIcon[] = [UsersRound, Blocks, ShieldCheck, Smile];

// A slight, uneven tilt so the tiles read like notes pinned to a board.
const TILTS = ["-rotate-1", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-1"] as const;

export default function StatsSection() {
  const t = useTranslations("pages.home");
  const stats = t.raw("stats.items") as Array<{
    value: string;
    label: string;
  }>;

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-10 text-center">
          <SectionTag>{plainTag(t("stats.tag"))}</SectionTag>
          <h2 className="mx-auto mt-4 landing-heading text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.1] text-(--ink)">
            <HandText>{t("stats.title")}</HandText>
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, index) => {
            const Icon = STAT_ICONS[index] ?? Blocks;
            return (
              <li
                key={`${stat.label}-${index}`}
                className={`reveal reveal-d${(index % 3) + 1}`}
              >
                <div
                  className={`group relative h-full rounded-2xl border border-border bg-card px-5 pb-5 pt-7 transition duration-300 hover:rotate-0 hover:border-(--purple)/30 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${TILTS[index % TILTS.length]}`}
                >
                  {/* Tape strip holding the note in place */}
                  <span
                    className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 rounded-xs bg-(--purple-light) opacity-90"
                    aria-hidden="true"
                  />

                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${ICON_TONES[index % ICON_TONES.length]}`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden="true" />
                  </span>

                  <p className="mt-4 font-body text-[40px] font-bold leading-none text-(--ink)">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-body text-[13px] leading-snug text-(--muted)">
                    {stat.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

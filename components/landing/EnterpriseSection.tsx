"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Lightbulb,
  LockKeyhole,
  ReceiptText,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { ManufacturingStickyNote } from "@/components/manufacturing/design-system";
import visual from "@/components/manufacturing/manufacturing-visuals.module.css";
import { Circled, ICON_TONES, SURFACE, SectionTag, plainTag } from "./landing-ui";

// Line icons replace the emoji in the translations; order matches `enterprise.cards`.
const ENTERPRISE_ICONS: LucideIcon[] = [
  SlidersHorizontal,
  LockKeyhole,
  Lightbulb,
  ReceiptText,
];

const RIBBON_TONES = ["bg-(--purple)", "bg-(--teal)"] as const;

export default function EnterpriseSection() {
  const t = useTranslations("pages.home");
  const cards = t.raw("enterprise.cards") as Array<{
    icon: string;
    title: string;
    desc: string;
    badge: string;
  }>;

  return (
    <section className="relative overflow-hidden rounded-t-[48px] bg-background px-4 py-14 sm:px-6 sm:py-16">
      {/* Faint blueprint grid: an engineering backdrop, fading out to the left */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-70 ${visual.blueprintGrid}`}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-240">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionTag>{plainTag(t("enterprise.tag"))}</SectionTag>
            <h2 className="mt-4 max-w-140 landing-heading text-[clamp(36px,4.6vw,58px)] font-bold leading-[1.1] text-(--ink)">
              {t("enterprise.titlePrefix")}{" "}
              <Circled color="var(--teal)">{t("enterprise.titleCircled")}</Circled>{" "}
              {t("enterprise.titleSuffix")}
            </h2>
          </div>
          <div className="hidden md:block">
            <ManufacturingStickyNote>{t("enterprise.note")}</ManufacturingStickyNote>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = ENTERPRISE_ICONS[index] ?? SlidersHorizontal;
            return (
              <article
                key={card.title}
                className={`group reveal reveal-d${(index % 3) + 1} relative overflow-hidden p-5 ${SURFACE}`}
              >
                {/* Corner ribbon carries the badge */}
                <span
                  className={`absolute -end-10 top-4 w-36 rotate-45 py-1 text-center font-body text-[10px] font-semibold text-white shadow-sm ${RIBBON_TONES[index % RIBBON_TONES.length]}`}
                >
                  <span className="block truncate px-8">{card.badge}</span>
                </span>

                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${ICON_TONES[index % ICON_TONES.length]}`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden="true" />
                </span>

                <h3 className="mt-4 pe-6 font-body text-base font-semibold leading-snug text-(--ink)">
                  {card.title}
                </h3>
                <p className="mt-1.5 font-body text-[13px] leading-[1.65] text-(--muted)">
                  {card.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

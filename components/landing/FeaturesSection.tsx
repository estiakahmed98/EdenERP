"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  BarChart3,
  CreditCard,
  FileText,
  HeartHandshake,
  RefreshCw,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { ManufacturingCallout } from "@/components/manufacturing/design-system";
import { Circled, ICON_TONES, SURFACE } from "./landing-ui";

// Line icons replace the emoji in the translations; order matches `features.cards`.
const FEATURE_ICONS: LucideIcon[] = [
  RefreshCw,
  UserRound,
  FileText,
  CreditCard,
  BarChart3,
  HeartHandshake,
];

/** Dashed hand-off arrow between neighbouring cards in a row (desktop only). */
function FlowArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 12"
      className="pointer-events-none absolute -end-[22px] top-1/2 z-10 hidden h-3 w-6 -translate-y-1/2 text-(--purple)/50 lg:block"
      fill="none"
    >
      <path d="M1 6H20" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
      <path
        d="m17 2 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturesSection() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const features = t.raw("features.cards") as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  return (
    <section
      id="features"
      className="rounded-t-[48px] bg-(--gray-bg) px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-240">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-140 landing-heading text-[clamp(36px,4.6vw,58px)] font-bold leading-[1.1] text-(--ink)">
            {t("features.titlePrefix")}{" "}
            <Circled color="var(--teal)">{t("features.titleHand")}</Circled>{" "}
            {t("features.titleSuffix")}
          </h2>
          <div className="hidden pb-2 md:block">
            <ManufacturingCallout variant="swoop">
              {t("features.callout")}
            </ManufacturingCallout>
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index] ?? FileText;
            return (
              <li
                key={feature.title}
                className={`group reveal reveal-d${(index % 3) + 1} relative p-5 ${SURFACE}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${ICON_TONES[index % ICON_TONES.length]}`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] text-(--muted)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 font-body text-base font-semibold text-(--ink)">
                  {feature.title}
                </h3>
                <p className="mt-1.5 font-body text-[13px] leading-[1.65] text-(--muted)">
                  {feature.desc}
                </p>

                {index % 3 !== 2 && index < features.length - 1 && <FlowArrow />}
              </li>
            );
          })}
        </ol>

        <a
          href="#"
          className="reveal mt-8 inline-flex items-center gap-1.5 rounded-[10px] btn-gradient px-5.5 py-3 font-body text-[15px] font-semibold text-white no-underline transition hover:-translate-y-0.5"
        >
          {commonT("seeAllFeatures")}
        </a>
      </div>
    </section>
  );
}

"use client";

import { Check, Layers3, type LucideIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { productInventory, productCounts } from "@/lib/product-inventory";
import { MODULE_ICONS } from "./MarqueeStrip";
import { Link } from "@/i18n/navigation";
type AppItem = { name: string; Icon: LucideIcon; href: string };
import {
  HandText,
  ICON_TONES,
  MARQUEE_MASK,
  SURFACE,
  SectionTag,
  marqueeDuration,
} from "./landing-ui";
import LiveDemoButton from "../live-demo-button";

const ROW_COUNT = 4;

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
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 gap-3 pr-3">
      {apps.map((app, appIndex) => {
        const Icon = app.Icon;
        // Checkerboard tones: neighbours differ across and between rows.
        const tone = ICON_TONES[(rowIndex + appIndex) % ICON_TONES.length];

        return (
          <Link
            key={app.name}
            href={app.href}
            tabIndex={ariaHidden ? -1 : undefined}
            className={`flex h-16 w-52 shrink-0 items-center gap-3 px-3 text-left sm:w-56 ${SURFACE}`}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tone}`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-body text-sm font-semibold text-(--ink)">
                {app.name}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] text-(--muted)">
                <Check className="h-3 w-3 text-(--teal)" strokeWidth={2.5} />
                {badge}
              </span>
            </span>
          </Link>
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
  // Rows alternate direction at one shared pace.
  const animation =
    rowIndex % 2 === 0
      ? "animate-[marqueeRight_40s_linear_infinite]"
      : "animate-[marqueeLeft_40s_linear_infinite]";

  return (
    <div className="group/marquee overflow-hidden" style={MARQUEE_MASK}>
      <div
        className={`flex w-max ${animation} group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none`}
        style={{ animationDuration: marqueeDuration(apps.length) }}
      >
        <AppGroup apps={apps} rowIndex={rowIndex} badge={badge} />
        <AppGroup apps={apps} rowIndex={rowIndex} badge={badge} ariaHidden />
      </div>
    </div>
  );
}

export default function AppsSection() {
  const t = useTranslations("pages.home");
  const format = useFormatter();
  const header = useTranslations("layout.header");
  const apps = productInventory.modules.map((module) => ({
    name: header(module.titleKey),
    Icon: MODULE_ICONS[module.titleKey] ?? Layers3,
    href: module.links[0].href,
  }));
  const perRow = Math.ceil(apps.length / ROW_COUNT);
  const rows = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
    apps.slice(rowIndex * perRow, (rowIndex + 1) * perRow),
  );

  return (
    <section className="bg-(--cream) px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-240 text-center">
        <div className="reveal">
          <SectionTag>{t("apps.tag")}</SectionTag>
          <h2 className="mt-5 landing-heading text-[clamp(34px,5vw,60px)] font-bold leading-[1.1] text-(--ink)">
            {t("apps.title")} <HandText>{t("apps.titleHand")}</HandText>{" "}
            {t("apps.titleSuffix")}
          </h2>
        </div>

        <div className="reveal shadow-float mt-12 overflow-hidden rounded-3xl border border-border bg-card py-5 sm:py-6">
          <div className="mx-4 mb-4 flex flex-col items-start justify-between gap-3 border-b border-border pb-5 text-left sm:mx-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl ${ICON_TONES[0]}`}
              >
                <Layers3 className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-body text-sm font-semibold text-(--ink) sm:text-base">
                  {t("apps.ecosystemLabel", {
                    count: format.number(productCounts.modules),
                  })}
                </h3>
                <p className="mt-0.5 text-[11px] text-(--muted)">
                  {t("apps.ecosystemHint")}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-(--teal)/10 px-3 py-1 text-[11px] font-semibold text-(--teal)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--teal)" />
              {t("apps.readyLabel")}
            </span>
          </div>

          <div className="space-y-3">
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

        <div className="reveal reveal-d3 mt-10 flex flex-wrap justify-center gap-3">
          <LiveDemoButton />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import {
  BadgeDollarSign,
  BarChart3,
  Boxes,
  Building2,
  Car,
  ContactRound,
  Factory,
  FolderKanban,
  GraduationCap,
  HandCoins,
  Handshake,
  Landmark,
  LayoutGrid,
  PiggyBank,
  Plug,
  School,
  Shirt,
  ShieldCheck,
  Stethoscope,
  Store,
  Truck,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { appsMegaMenu } from "@/lib/apps-menu";
import {
  ICON_TONES,
  MARQUEE_MASK,
  SURFACE,
  SectionTag,
  marqueeDuration,
} from "./landing-ui";

// Icon per header mega-menu column (keyed by the column's titleKey).
export const MODULE_ICONS: Record<string, LucideIcon> = {
  "modules.accounting.title": BadgeDollarSign,
  "modules.projectAccounting.title": FolderKanban,
  "modules.budgetManagement.title": PiggyBank,
  "modules.supplyChain.title": Truck,
  "modules.inventory.title": Boxes,
  "modules.openPlatform.title": Plug,
  "modules.manufacturing.title": Factory,
  "modules.quality.title": ShieldCheck,
  "modules.hrPayroll.title": UsersRound,
  "modules.employeePortal.title": ContactRound,
  "modules.engineeringMaintenance.title": Wrench,
  "modules.medicalCentre.title": Stethoscope,
  "modules.tradeFinance.title": Landmark,
  "modules.salesCrm.title": Handshake,
  "modules.transportPool.title": Car,
  "modules.analytics.title": BarChart3,
  "modules.realEstate.title": Building2,
  "modules.education.title": School,
  "modules.pos.title": Store,
  "modules.merchandising.title": Shirt,
  "modules.fundAccounting.title": HandCoins,
  "modules.university.title": GraduationCap,
};

type MarqueeModule = { label: string; Icon: LucideIcon };

function MarqueeItems({
  items,
  ariaHidden = false,
}: {
  items: MarqueeModule[];
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 gap-3 pr-3">
      {items.map(({ label, Icon }, index) => (
        <div
          key={`${label}-${index}`}
          className={`flex h-14 shrink-0 items-center gap-3 pl-2.5 pr-5 ${SURFACE}`}
        >
          <span
            className={`grid h-9 w-9 place-items-center rounded-xl ${ICON_TONES[index % ICON_TONES.length]}`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="whitespace-nowrap font-body text-sm font-semibold text-(--ink)">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  const t = useTranslations("pages.home.marquee");
  const tHeader = useTranslations("layout.header");
  // Same modules as the header Apps mega menu, so the two never drift apart.
  const items: MarqueeModule[] = appsMegaMenu.map((column) => ({
    label: tHeader(column.titleKey),
    Icon: MODULE_ICONS[column.titleKey] ?? LayoutGrid,
  }));

  return (
    <section className="border-y border-border bg-(--cream) py-12 sm:py-14">
      <div className="mx-auto mb-7 flex max-w-240 flex-col items-center gap-3 px-4 text-center sm:px-6">
        <SectionTag>{t("eyebrow")}</SectionTag>
        <p className="font-body text-sm text-(--muted) sm:text-base">
          {t("title")}
        </p>
      </div>

      <div className="group/marquee overflow-hidden" style={MARQUEE_MASK}>
        <div
          className="flex w-max animate-[marqueeLeft_60s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: marqueeDuration(items.length) }}
        >
          <MarqueeItems items={items} />
          <MarqueeItems items={items} ariaHidden />
        </div>
      </div>
    </section>
  );
}

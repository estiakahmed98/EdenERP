"use client";

import {
  BarChart3,
  Bot,
  BookOpen,
  Building2,
  Calculator,
  CalendarRange,
  Car,
  Check,
  Clock3,
  ContactRound,
  CreditCard,
  Factory,
  FileSignature,
  FolderKanban,
  FolderOpen,
  Globe2,
  GraduationCap,
  HandCoins,
  Handshake,
  Landmark,
  Layers3,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  MessageCircle,
  PackageOpen,
  PiggyBank,
  Plug,
  RefreshCw,
  School,
  Send,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Stethoscope,
  Store,
  TrendingUp,
  Truck,
  UsersRound,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { APPS, type AppItem } from "./landing-data";
import {
  HandText,
  ICON_TONES,
  MARQUEE_MASK,
  SURFACE,
  SectionTag,
  marqueeDuration,
} from "./landing-ui";
import LiveDemoButton from "../live-demo-button";

const APP_ICONS: Record<string, LucideIcon> = {
  Accounting: Calculator,
  Knowledge: BookOpen,
  Sign: FileSignature,
  CRM: Handshake,
  Studio: Wrench,
  Subscribe: RefreshCw,
  AI: Bot,
  "Point Sale": Store,
  Discuss: MessageCircle,
  Documents: FolderOpen,
  Project: ListChecks,
  Timesheets: Clock3,
  "Field Svc": Zap,
  Planning: CalendarRange,
  Helpdesk: LifeBuoy,
  eCommerce: ShoppingBag,
  Website: Globe2,
  "Email Mktg": Send,
  Purchase: CreditCard,
  Inventory: PackageOpen,
  Manufactur: Factory,
  Sales: TrendingUp,
  HR: UsersRound,
  Dashboard: LayoutDashboard,
  "Project Acctg": FolderKanban,
  Budgeting: PiggyBank,
  "Supply Chain": Truck,
  "Open Platform": Plug,
  Quality: ShieldCheck,
  "Emp. Portal": ContactRound,
  "Eng. Maint.": Wrench,
  Medical: Stethoscope,
  "Trade Finance": Landmark,
  Transport: Car,
  Analytics: BarChart3,
  "Real Estate": Building2,
  Education: School,
  Merchandising: Shirt,
  "Fund Acctg": HandCoins,
  University: GraduationCap,
};

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
        const Icon = APP_ICONS[app.name] ?? Layers3;
        // Checkerboard tones: neighbours differ across and between rows.
        const tone = ICON_TONES[(rowIndex + appIndex) % ICON_TONES.length];

        return (
          <div
            key={app.name}
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
  const perRow = Math.ceil(APPS.length / ROW_COUNT);
  const rows = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
    APPS.slice(rowIndex * perRow, (rowIndex + 1) * perRow),
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
                  {t("apps.ecosystemLabel", { count: APPS.length })}
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

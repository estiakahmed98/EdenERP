"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  BadgeDollarSign,
  BarChart3,
  Check,
  Factory,
  PackageSearch,
  School,
  Truck,
  UsersRound,
  Handshake,
  Boxes,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { SiAnthropic, SiGooglegemini, SiNvidia, SiOpenai } from "react-icons/si";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

export type ProviderId = "openai" | "anthropic" | "gemini" | "nvidia";

/** Brand marks come from simple-icons; colors follow each owner's published hex. */
export const PROVIDERS: Record<
  ProviderId,
  { name: string; family: string; Icon: IconType; color: string; dark?: string }
> = {
  openai: { name: "OpenAI", family: "GPT", Icon: SiOpenai, color: "#412991" },
  anthropic: {
    name: "Anthropic",
    family: "Claude",
    Icon: SiAnthropic,
    color: "#191919",
    dark: "#f5f4ef",
  },
  gemini: { name: "Google Gemini", family: "Gemini", Icon: SiGooglegemini, color: "#8E75B2" },
  nvidia: { name: "NVIDIA", family: "NIM", Icon: SiNvidia, color: "#76B900" },
};

/** Module keys match `layout.header.modules.*` (the header Apps menu). */
export type ModuleKey =
  | "accounting"
  | "inventory"
  | "manufacturing"
  | "education"
  | "supplyChain"
  | "hrPayroll"
  | "salesCrm"
  | "analytics";

export const MODULE_META: Record<ModuleKey, { icon: LucideIcon; accent: string }> = {
  accounting: { icon: BadgeDollarSign, accent: "#10b981" },
  inventory: { icon: Boxes, accent: "#f43f5e" },
  manufacturing: { icon: Factory, accent: "#14b8a6" },
  education: { icon: School, accent: "#0ea5e9" },
  supplyChain: { icon: Truck, accent: "#f59e0b" },
  hrPayroll: { icon: UsersRound, accent: "#059669" },
  salesCrm: { icon: Handshake, accent: "#8b5cf6" },
  analytics: { icon: BarChart3, accent: "#1088ef" },
};

export type Metrics = (key: string) => string;

/* ------------------------------------------------------------------ */
/* Shared shells                                                       */
/* ------------------------------------------------------------------ */

const accentStyle = (accent: string) => ({ "--accent": accent }) as CSSProperties;

export function ProviderCard({ id }: { id: ProviderId }) {
  const { name, family, Icon, color, dark } = PROVIDERS[id];
  return (
    <div
      className="flex w-[168px] items-center gap-2.5 rounded-2xl border border-border bg-card p-2 pr-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.45)]"
      style={{ "--brand": color, "--brand-dark": dark ?? color } as CSSProperties}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-(--brand)/10 text-(--brand) dark:bg-(--brand-dark)/10 dark:text-(--brand-dark)">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold leading-tight text-(--ink)">
          {name}
        </span>
        <span className="block text-[10px] text-(--muted)">{family}</span>
      </span>
    </div>
  );
}

export function ProviderTile({ id }: { id: ProviderId }) {
  const { name, Icon, color, dark } = PROVIDERS[id];
  return (
    <span
      title={name}
      className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-(--brand) dark:text-(--brand-dark)"
      style={{ "--brand": color, "--brand-dark": dark ?? color } as CSSProperties}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

function CardShell({
  name,
  moduleKey,
  live,
  children,
}: {
  name: string;
  moduleKey: ModuleKey;
  live: string;
  children: ReactNode;
}) {
  const { icon: Icon, accent } = MODULE_META[moduleKey];
  return (
    <div
      className="w-[clamp(176px,15.5vw,212px)] rounded-2xl border border-border bg-card p-3 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.5)]"
      style={accentStyle(accent)}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-(--accent)/12 text-(--accent)">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-(--ink)">
          {name}
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-(--muted)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
          {live}
        </span>
      </div>
      {children}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-[10px] text-(--muted)">{children}</p>
);
const Value = ({ children }: { children: ReactNode }) => (
  <p className="font-body text-[17px] font-semibold leading-tight tabular-nums text-(--ink)">
    {children}
  </p>
);

/* ------------------------------------------------------------------ */
/* Miniature module dashboards: each one shows its data a different way */
/* ------------------------------------------------------------------ */

function AccountingBody({ m }: { m: Metrics }) {
  return (
    <>
      <Label>{m("netCash")}</Label>
      <div className="flex items-end justify-between gap-2">
        <Value>৳ 4.82 Cr</Value>
        <svg viewBox="0 0 80 28" className="h-7 w-20" aria-hidden="true">
          <path d="M0 22 L12 18 L24 20 L36 12 L48 14 L60 7 L80 4 V28 H0 Z" className="fill-(--accent)/12" />
          <path d="M0 22 L12 18 L24 20 L36 12 L48 14 L60 7 L80 4" fill="none" className="stroke-(--accent)" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
        <span className="rounded-lg bg-(--cream) px-2 py-1 text-(--muted)">
          {m("receivables")} <b className="block font-semibold text-(--ink)">৳ 1.24 Cr</b>
        </span>
        <span className="rounded-lg bg-(--cream) px-2 py-1 text-(--muted)">
          {m("payables")} <b className="block font-semibold text-(--ink)">৳ 0.86 Cr</b>
        </span>
      </div>
    </>
  );
}

function InventoryBody({ m }: { m: Metrics }) {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <Label>{m("stockHealth")}</Label>
        <span className="text-[11px] font-semibold tabular-nums text-(--ink)">82%</span>
      </div>
      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-muted">
        <span className="w-[82%] bg-(--accent)/70" />
        <span className="w-[12%] bg-amber-400" />
        <span className="w-[6%] bg-(--ink)/25" />
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-(--cream) px-2 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-(--muted)">
          <PackageSearch className="h-3 w-3 text-amber-500" aria-hidden="true" />
          {m("lowStock")}
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-(--ink)">12 SKU</span>
      </div>
    </>
  );
}

function ManufacturingBody({ m }: { m: Metrics }) {
  const pct = 87;
  const c = 2 * Math.PI * 16;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r="16" className="stroke-muted" strokeWidth="4" fill="none" />
        <circle
          cx="20"
          cy="20"
          r="16"
          className="stroke-(--accent)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(c * pct) / 100} ${c}`}
        />
      </svg>
      <div className="min-w-0">
        <Label>{m("lineEfficiency")}</Label>
        <Value>{pct}%</Value>
        <p className="mt-0.5 text-[10px] text-(--muted)">
          {m("ordersRunning")} <b className="font-semibold text-(--ink)">24</b>
        </p>
      </div>
    </div>
  );
}

function EducationBody({ m }: { m: Metrics }) {
  const week = [88, 92, 95, 90, 94];
  return (
    <>
      <div className="flex items-end justify-between gap-2">
        <div>
          <Label>{m("attendance")}</Label>
          <Value>94%</Value>
        </div>
        <div className="flex h-8 items-end gap-1" aria-hidden="true">
          {week.map((v, i) => (
            <span
              key={i}
              className={`w-2 rounded-sm ${i === 4 ? "bg-(--accent)" : "bg-(--accent)/30"}`}
              style={{ height: `${(v - 70) * 3.3}%` }}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-(--muted)">
        {m("feesCollected")} <b className="font-semibold text-(--ink)">৳ 18.6 L</b>
      </p>
    </>
  );
}

function SupplyChainBody({ m }: { m: Metrics }) {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div>
          <Label>{m("openPos")}</Label>
          <Value>38</Value>
        </div>
        <Truck className="h-4 w-4 text-(--accent)" aria-hidden="true" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-(--muted)">
        <span>{m("received")}</span>
        <span className="font-semibold tabular-nums text-(--ink)">72%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <span className="block h-full w-[72%] rounded-full bg-(--accent)" />
      </div>
    </>
  );
}

function HrBody({ m }: { m: Metrics }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Label>{m("headcount")}</Label>
          <Value>1,248</Value>
        </div>
        <div className="flex -space-x-1.5" aria-hidden="true">
          {["RA", "TH", "SK", "MN"].map((n, i) => (
            <span
              key={n}
              className={`grid h-6 w-6 place-items-center rounded-full border-2 border-card text-[8px] font-semibold ${
                i % 2 ? "bg-(--purple-light) text-(--purple)" : "bg-(--accent)/15 text-(--accent)"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-(--accent)/10 px-2 py-0.5 text-[10px] font-medium text-(--accent)">
        <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden="true" />
        {m("payrollReady")}
      </span>
    </>
  );
}

function SalesBody({ m }: { m: Metrics }) {
  return (
    <>
      <Label>{m("pipeline")}</Label>
      <Value>৳ 2.3 Cr</Value>
      <div className="mt-2 space-y-1" aria-hidden="true">
        {[100, 68, 41].map((w, i) => (
          <span
            key={w}
            className="block h-1.5 rounded-full bg-(--accent)"
            style={{ width: `${w}%`, opacity: 1 - i * 0.28 }}
          />
        ))}
      </div>
      <p className="mt-2 text-[10px] text-(--muted)">
        {m("wonThisMonth")} <b className="font-semibold text-(--ink)">+18</b>
      </p>
    </>
  );
}

function AnalyticsBody({ m }: { m: Metrics }) {
  const bars = [42, 55, 48, 66, 58, 74, 86];
  return (
    <>
      <div className="flex items-baseline justify-between">
        <Label>{m("revenue")}</Label>
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">+12.4%</span>
      </div>
      <div className="mt-2 flex h-12 items-end gap-1" aria-hidden="true">
        {bars.map((v, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-(--accent)" : "bg-(--accent)/25"}`}
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
    </>
  );
}

const BODIES: Record<ModuleKey, (props: { m: Metrics }) => ReactNode> = {
  accounting: AccountingBody,
  inventory: InventoryBody,
  manufacturing: ManufacturingBody,
  education: EducationBody,
  supplyChain: SupplyChainBody,
  hrPayroll: HrBody,
  salesCrm: SalesBody,
  analytics: AnalyticsBody,
};

export function ModuleCard({
  moduleKey,
  name,
  m,
}: {
  moduleKey: ModuleKey;
  name: string;
  m: Metrics;
}) {
  const Body = BODIES[moduleKey];
  return (
    <CardShell name={name} moduleKey={moduleKey} live={m("live")}>
      <Body m={m} />
    </CardShell>
  );
}

/** Compact two-line chip for small screens. */
export function ModuleChip({
  moduleKey,
  name,
  label,
  value,
}: {
  moduleKey: ModuleKey;
  name: string;
  label: string;
  value: string;
}) {
  const { icon: Icon, accent } = MODULE_META[moduleKey];
  return (
    <div
      className="flex items-center gap-2.5 rounded-2xl border border-border bg-card p-2.5"
      style={accentStyle(accent)}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-(--accent)/12 text-(--accent)">
        <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-semibold text-(--ink)">{name}</span>
        <span className="flex items-baseline gap-1 text-[10px] text-(--muted)">
          <span className="truncate">{label}</span>
          <b className="shrink-0 font-semibold tabular-nums text-(--ink)">{value}</b>
        </span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Executive layer                                                     */
/* ------------------------------------------------------------------ */

export const INSIGHT_META = [
  { icon: Wallet, accent: "#10b981" },
  { icon: PackageSearch, accent: "#f59e0b" },
  { icon: Factory, accent: "#1088ef" },
] as const;

export function InsightCard({
  index,
  title,
  body,
  compact = false,
}: {
  index: number;
  title: string;
  body: string;
  compact?: boolean;
}) {
  const { icon: Icon, accent } = INSIGHT_META[index];
  return (
    <div
      className={`flex gap-2.5 rounded-2xl border border-border bg-card text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.55)] ${
        compact ? "px-2.5 py-2" : "w-[248px] p-3"
      }`}
      style={accentStyle(accent)}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-(--accent)/12 text-(--accent)">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-semibold text-(--ink)">{title}</span>
        <span className={`mt-0.5 text-[11px] leading-snug text-(--muted) ${compact ? "line-clamp-1" : "block"}`}>
          {body}
        </span>
      </span>
    </div>
  );
}

export function QuestionBubble({ label, question }: { label: string; question: string }) {
  return (
    <div className="w-[232px] rounded-2xl rounded-br-md border border-border bg-card p-3 text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.55)]">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-(--ink) text-[8px] font-bold text-(--cream)">
          CEO
        </span>
        <span className="text-[10px] font-medium text-(--muted)">{label}</span>
      </div>
      <p className="text-[13px] font-semibold leading-snug text-(--ink)">{question}</p>
    </div>
  );
}

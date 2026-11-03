import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import visual from "./manufacturing-visuals.module.css";

/** Hand-drawn accents are decorative and never replace a readable label. */
export function ManufacturingHandDrawnArrow({
  variant = "loop",
  className,
}: {
  variant?: "loop" | "swoop";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 180 92"
      className={cn(
        "pointer-events-none h-20 w-40 overflow-visible",
        visual.directional,
        className,
      )}
      fill="none"
    >
      <path
        pathLength="1"
        className={visual.sketchStroke}
        d={
          variant === "loop"
            ? "M158 12C137 1 117 6 120 26C123 48 155 40 144 23C134 7 106 8 105 31C104 57 74 78 18 74M28 63L16 74L31 83"
            : "M161 9C169 38 143 27 122 23C90 16 102 60 74 64C55 67 38 65 17 75M25 64L15 76L30 81"
        }
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          variant === "loop"
            ? "M155 15C137 6 121 10 124 27M101 39C96 60 62 76 30 77"
            : "M158 12C162 36 139 31 125 27M69 68C48 73 33 70 23 76"
        }
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function ManufacturingMarker({ children }: { children: ReactNode }) {
  return <span className={visual.marker}>{children}</span>;
}

export function ManufacturingStickyNote({ children }: { children: ReactNode }) {
  return (
    <aside
      className={cn("relative max-w-64 px-5 pb-4 pt-6", visual.stickyNote)}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 36 36"
        className="mb-2 size-8"
        fill="none"
      >
        <path
          d="M7 9L28 7L30 29L6 30L7 9ZM11 18L16 23L26 13M29 3L31 1M33 9L36 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="showcase-heading-highlight text-xl leading-snug">
        {children}
      </p>
    </aside>
  );
}

export function ManufacturingScribble({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block pb-2">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 360 15"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3 w-full overflow-visible text-primary/45"
        fill="none"
      >
        <path
          pathLength="1"
          className={visual.sketchStroke}
          d="M4 9C85 1 238 3 354 7M35 13C138 7 252 8 328 11"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ManufacturingSketchRing({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block px-1">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 140 62"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible text-primary/60"
        fill="none"
      >
        <path
          pathLength="1"
          className={visual.sketchStroke}
          d="M129 13C109-1 29 0 10 17C-11 37 19 59 70 56C117 55 147 34 129 15C116 2 66-1 34 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ManufacturingCallout({
  children,
  variant = "loop",
}: {
  children: ReactNode;
  variant?: "loop" | "swoop";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none inline-flex max-w-56 flex-col items-end text-primary",
        visual.callout,
      )}
    >
      <p className="showcase-heading-highlight text-xl leading-tight tracking-normal sm:text-2xl">
        {children}
      </p>
      <ManufacturingHandDrawnArrow
        variant={variant}
        className="-mt-1 me-1 h-16 w-32 sm:h-20 sm:w-40"
      />
    </div>
  );
}

export function ManufacturingFlowConnector({
  split = false,
}: {
  split?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 46"
      preserveAspectRatio="none"
      className="pointer-events-none h-10 w-full text-primary/50"
      fill="none"
    >
      <path
        className={visual.flowStroke}
        d={
          split
            ? "M80 2V12Q80 19 93 19H147Q160 19 160 30V40M240 2V12Q240 19 227 19H173Q160 19 160 30"
            : "M160 2V40"
        }
        stroke="currentColor"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="m155 35 5 6 5-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Opt-in foundations for Manufacturing: shared brand tokens, spacing, type and states. */
export const manufacturingStyles = {
  container: "mx-auto w-full max-w-[1240px] px-5 sm:px-8",
  section: "py-16 sm:py-24",
  panel: "rounded-2xl border border-border bg-card",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
};

export function ManufacturingEyebrow({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
    </p>
  );
}

export function ManufacturingSectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
      <div className="max-w-2xl">
        <ManufacturingEyebrow>{eyebrow}</ManufacturingEyebrow>
        <h2 className="showcase-heading mt-3 text-3xl leading-[1.15] tracking-[-0.025em] text-[var(--ink)] sm:text-[2.5rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function ManufacturingAction({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors",
        manufacturingStyles.focus,
        visual.action,
        secondary
          ? "border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
          : "btn-gradient text-white shadow-sm",
      )}
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/** One label, destination and visual treatment for every Manufacturing demo CTA. */
export function ManufacturingDemoButton() {
  return (
    <ManufacturingAction href="/demo">Book a live demo</ManufacturingAction>
  );
}

export type ManufacturingStatus =
  "draft" | "confirmed" | "inProgress" | "completed";
const statusStyles: Record<ManufacturingStatus, string> = {
  draft: "bg-muted/60 text-muted-foreground",
  confirmed: "bg-primary/10 text-primary",
  inProgress: "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  completed: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
};

export function ManufacturingStatusBadge({
  status,
  children,
}: {
  status: ManufacturingStatus;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium",
        statusStyles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

export function ManufacturingMetric({
  label,
  value,
  detail,
  icon: Icon,
  annotated = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  annotated?: boolean;
}) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-4 sm:p-5">
      <dt className="pe-6 text-xs font-medium text-muted-foreground">
        {label}
      </dt>
      <Icon
        className="absolute end-4 top-4 size-4 text-muted-foreground sm:end-5 sm:top-5"
        aria-hidden="true"
      />
      <dd className="mt-3 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
        {annotated ? (
          <ManufacturingSketchRing>{value}</ManufacturingSketchRing>
        ) : (
          value
        )}
      </dd>
      <dd className="mt-1.5 text-[11px] text-muted-foreground">{detail}</dd>
    </div>
  );
}

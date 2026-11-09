"use client";

import LiveDemoButton from "@/components/live-demo-button";

import {
  ArrowRight,
  ArrowUpRight,
  Barcode,
  CalendarRange,
  CheckCheck,
  ClipboardCheck,
  ClipboardList,
  Factory,
  Gauge,
  GitBranch,
  Layers3,
  LayoutDashboard,
  ListOrdered,
  PackageCheck,
  Recycle,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  Wallet,
  Workflow,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ManufacturingCallout,
  ManufacturingEyebrow,
  ManufacturingMarker,
  ManufacturingScribble,
  ManufacturingSectionHeading,
  ManufacturingSketchRing,
  ManufacturingStickyNote,
  manufacturingStyles as styles,
} from "./design-system";
import ModuleWorkspace from "./module-workspace";
import DemoPreview from "./demo-preview";
import RecordedDemoWorkspace, {
  useRecordedDemoCopy,
} from "./recorded-demo-workspace";
import { isRecordedDemoSlug } from "./recorded-demo-data";
import type {
  ManufacturingModuleContent,
  ManufacturingSlug,
} from "./module-content";
import ManufacturingHero from "./heroes/manufacturing-hero";
import visual from "./manufacturing-visuals.module.css";

const icons = {
  factory: Factory,
  route: GitBranch,
  layers: Layers3,
  plan: ClipboardList,
  gauge: Gauge,
  calendar: CalendarRange,
  board: LayoutDashboard,
  allocation: Workflow,
  floor: ScanLine,
  batch: PackageCheck,
  serial: Barcode,
  template: ClipboardCheck,
  quality: ShieldCheck,
  scrap: Recycle,
  vendor: Truck,
  standard: SlidersHorizontal,
  cost: Wallet,
};

export default function ManufacturingModuleShowcase({
  slug,
  content,
}: {
  slug: ManufacturingSlug;
  content: ManufacturingModuleContent;
}) {
  const t = useTranslations("pages.manufacturingModules.ui");
  const locale = useLocale();
  const Icon = icons[content.icon];
  const titleLower = content.title.toLocaleLowerCase(locale);
  const recordedCopy = useRecordedDemoCopy(
    isRecordedDemoSlug(slug) ? slug : "work-centers",
  );
  const previewCopy = isRecordedDemoSlug(slug) ? recordedCopy : null;
  return (
    <main className="bg-background text-foreground">
      <ManufacturingHero slug={slug} copy={content} />
      <nav aria-label={t("onThisPage")} className="border-b border-border bg-card">
        <div className={cn(styles.container, "flex gap-7 overflow-x-auto")}>
          {[
            ["sample-workspace", t("navSample")],
            ["module-workflow", t("navWorkflow")],
            ["module-connections", t("navConnected")],
          ].map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "inline-flex min-h-14 shrink-0 items-center gap-2 border-b-2 border-transparent text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary",
                styles.focus,
              )}
            >
              <span className="text-[10px] text-primary">0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <section
        id="sample-workspace"
        className={cn(styles.section, "scroll-mt-24")}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={t("inFocus", { title: content.title })}
            title={
              <ManufacturingMarker>
                {previewCopy?.title ?? content.workspaceTitle}
              </ManufacturingMarker>
            }
            description={
              previewCopy?.description ?? content.workspaceDescription
            }
          >
            <div className="hidden lg:block">
              <ManufacturingCallout variant="swoop">
                {previewCopy ? t("calloutRecorded") : t("calloutExplore")}
              </ManufacturingCallout>
            </div>
          </ManufacturingSectionHeading>
          <DemoPreview key={slug} title={content.title}>
            {isRecordedDemoSlug(slug) ? (
              <RecordedDemoWorkspace slug={slug} />
            ) : (
              <ModuleWorkspace content={content} />
            )}
          </DemoPreview>
        </div>
      </section>
      <section
        id="module-workflow"
        className={cn(
          styles.section,
          "scroll-mt-24 border-y border-border bg-[var(--cream)]",
        )}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={t("workflowEyebrow")}
            title={
              <>
                {t("workflowTitleA")}{" "}
                <ManufacturingMarker>
                  <span className="text-primary">{t("workflowTitleB")}</span>
                </ManufacturingMarker>
              </>
            }
            description={t("workflowDescription", { title: titleLower })}
          >
            <div className="mb-2 ms-auto mt-3 sm:me-2">
              <ManufacturingStickyNote>{content.note}</ManufacturingStickyNote>
            </div>
          </ManufacturingSectionHeading>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.workflow.map(([title, description], index) => (
              <li
                key={title}
                className={cn(
                  "relative rounded-xl border border-border bg-card p-6 hover:border-primary/35",
                  visual.workflowCard,
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                    {index === 3 ? (
                      <CheckCheck className="size-5" aria-hidden="true" />
                    ) : (
                      <ListOrdered className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {index === 3 ? (
                      <ManufacturingSketchRing>04</ManufacturingSketchRing>
                    ) : (
                      `0${index + 1}`
                    )}
                  </span>
                </div>
                <h3 className="mt-6 text-base font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                {index < 3 && (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 40 24"
                    className={cn(
                      "pointer-events-none absolute -end-7 top-11 z-10 hidden h-6 w-10 overflow-visible text-primary/60 lg:block",
                      visual.directional,
                    )}
                    fill="none"
                  >
                    <path
                      className={visual.flowStroke}
                      d="M2 12C13 0 22 24 36 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m30 10 7 2-4 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        id="module-connections"
        className={cn(styles.section, "scroll-mt-24")}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={t("connectEyebrow")}
            title={
              <>
                {t("connectTitleA")}{" "}
                <ManufacturingScribble>
                  {t("connectTitleB")}
                </ManufacturingScribble>
              </>
            }
            description={t("connectDescription")}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.capabilities.map(([title, description, link], index) => (
              <Link
                key={title}
                href={`/apps/manufacturing/${link}`}
                className={cn(
                  "group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-primary/[0.025]",
                  styles.focus,
                  visual.connectionCard,
                )}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-primary">
                    0{index + 1} / {t("connect")}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  {t("exploreModule")}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-[var(--cream)] py-14 sm:py-16">
        <div
          className={cn(
            styles.container,
            "flex flex-wrap items-center justify-between gap-8",
          )}
        >
          <div className="max-w-xl">
            <ManufacturingEyebrow icon={Icon}>
              {t("ctaEyebrow")}
            </ManufacturingEyebrow>
            <h2 className="showcase-heading mt-3 text-3xl tracking-tight sm:text-4xl">
              {t("ctaTitle", { title: titleLower })}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {t("ctaBody")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}

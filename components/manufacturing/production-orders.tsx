"use client";

import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  CheckCheck,
  ClipboardCheck,
  Factory,
  GitBranch,
  Layers3,
  PackageCheck,
  ShieldCheck,
  Timer,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ManufacturingDemoButton,
  ManufacturingCallout,
  ManufacturingEyebrow,
  ManufacturingMarker,
  ManufacturingSectionHeading,
  ManufacturingStickyNote,
  manufacturingStyles as styles,
} from "./design-system";
import visual from "./manufacturing-visuals.module.css";
import ManufacturingHero from "./heroes/manufacturing-hero";
import DemoPreview from "./demo-preview";
import RecordedDemoWorkspace, {
  recordedDemoCopy,
} from "./recorded-demo-workspace";

type Step = { title: string; description: string };
const featureIcons = [GitBranch, ShieldCheck, Truck, Factory];
const featureLinks = [
  "bill-of-materials",
  "quality-control",
  "subcontracting",
  "work-centers",
];
const workflowIcons = [ClipboardCheck, Factory, PackageCheck, CheckCheck];
export default function ManufacturingProductionOrders() {
  const t = useTranslations("pages.manufacturingDetails.productionOrders");
  const ui = useTranslations("pages.manufacturingShowcase");
  const steps = t.raw("workflowSteps") as Step[];
  const features = t.raw("features") as Step[];
  return (
    <main className="bg-background text-foreground">
      <ManufacturingHero
        slug="production-orders"
        target="order-workspace"
        copy={{
          title: ui("productionOrders"),
          category: ui("eyebrow"),
          hero: [t("heroTitle"), t("heroTitleHighlight")],
          description: t("heroDescription"),
          callout: ui("annotations.blueprint"),
        }}
      />
      <nav
        aria-label={ui("pageNavigation")}
        className="border-b border-border bg-card"
      >
        <div className={cn(styles.container, "flex gap-7 overflow-x-auto")}>
          {["order-workspace", "production-workflow", "connected-modules"].map(
            (id, index) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "inline-flex min-h-14 shrink-0 items-center gap-2 border-b-2 border-transparent text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary",
                  styles.focus,
                )}
              >
                <span className="text-[10px] text-primary/70">
                  0{index + 1}
                </span>
                {ui(["overview", "workflow", "connections"][index])}
              </a>
            ),
          )}
        </div>
      </nav>
      <section
        id="order-workspace"
        className={cn(styles.section, "scroll-mt-24")}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={ui("workspaceEyebrow")}
            title={
              <ManufacturingMarker>
                {recordedDemoCopy["production-orders"].title}
              </ManufacturingMarker>
            }
            description={recordedDemoCopy["production-orders"].description}
          >
            <div className="flex flex-col items-end">
              <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground">
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
                Software data preview
              </span>
              <div className="mt-3 hidden lg:block">
                <ManufacturingCallout variant="swoop">
                  A closer look at the real workflow.
                </ManufacturingCallout>
              </div>
            </div>
          </ManufacturingSectionHeading>
          <DemoPreview title="Production Orders">
            <RecordedDemoWorkspace slug="production-orders" />
          </DemoPreview>
        </div>
      </section>
      <section
        id="production-workflow"
        className={cn(
          styles.section,
          "scroll-mt-24 border-y border-border bg-[var(--cream)]",
        )}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={ui("workflowEyebrow")}
            title={
              <>
                {t("workflowTitle")}{" "}
                <ManufacturingMarker>
                  <span className="text-primary">{t("workflowHighlight")}</span>
                </ManufacturingMarker>
              </>
            }
            description={t("workflowDescription")}
          >
            <div className="mb-2 ms-auto mt-3 sm:me-2">
              <ManufacturingStickyNote>
                {ui("annotations.workflowNote")}
              </ManufacturingStickyNote>
            </div>
          </ManufacturingSectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = workflowIcons[index];
              return (
                <article
                  key={step.title}
                  className={cn(
                    "relative rounded-xl border border-border bg-card p-6 hover:border-primary/35",
                    visual.workflowCard,
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-base font-semibold tracking-tight">
                    {step.title.replace(/^[\d০-৯]+[.\s]+/, "")}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -end-7 top-11 z-10 hidden h-6 w-10 text-primary/60 lg:block",
                        visual.directional,
                      )}
                    >
                      <svg
                        viewBox="0 0 40 24"
                        className="size-full overflow-visible"
                        fill="none"
                        focusable="false"
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
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="connected-modules"
        className={cn(styles.section, "scroll-mt-24")}
      >
        <div className={styles.container}>
          <ManufacturingSectionHeading
            eyebrow={ui("connectionsEyebrow")}
            title={t("featuresTitle")}
            description={ui("connectionsDescription")}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <Link
                  href={`/apps/manufacturing/${featureLinks[index]}`}
                  key={feature.title}
                  className={cn(
                    "group flex gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-primary/[0.025]",
                    styles.focus,
                    visual.connectionCard,
                  )}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-[var(--cream)] text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex items-start justify-between gap-3 text-base font-semibold">
                      {feature.title}
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-muted-foreground">
            {[
              { icon: Layers3, key: "materialsConnected" },
              { icon: ShieldCheck, key: "qualityConnected" },
              { icon: Timer, key: "costConnected" },
            ].map(({ icon: Icon, key }) => (
              <span key={key} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {ui(key)}
              </span>
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
            <ManufacturingEyebrow icon={ClipboardCheck}>
              {ui("closingEyebrow")}
            </ManufacturingEyebrow>
            <h2 className="showcase-heading mt-3 text-3xl tracking-tight sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {t("ctaDescription")}
            </p>
          </div>
          <ManufacturingDemoButton />
        </div>
      </section>
    </main>
  );
}

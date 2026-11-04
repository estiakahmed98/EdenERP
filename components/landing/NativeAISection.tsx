"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { SectionTag } from "./landing-ui";
import AiCharacter, {
  CHARACTER_ASPECT,
  CHARACTER_INTAKE,
} from "./native-ai/ai-character";
import {
  InsightCard,
  MODULE_META,
  ModuleCard,
  ModuleChip,
  ProviderCard,
  ProviderTile,
  QuestionBubble,
  type Metrics,
  type ModuleKey,
  type ProviderId,
} from "./native-ai/stage-cards";

/*
 * Scroll timeline (0 → 1 across the pinned section)
 *   0.00–0.20  monochrome introduction
 *   0.20–0.50  data collection: cards drift in, streams flow to the assistant
 *   0.50–0.80  activation: the assistant and every card take on color
 *   0.80–1.00  executive intelligence: answers appear, then the pin releases
 */

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

// Character box: horizontally centred, top 3%, height 97% of the stage.
const CHAR_TOP = 3;
const CHAR_HEIGHT = 97;
const TARGET = { x: 50, y: CHAR_TOP + CHARACTER_INTAKE.y * CHAR_HEIGHT };

type StageNode = {
  id: string;
  x: number; // % of stage width (card centre)
  y: number; // % of stage height (card centre)
  delay: number; // small offset so cards don't move in lockstep
  pull: number; // fraction of the distance travelled toward the assistant
  accent: string;
} & (
  | { kind: "provider"; provider: ProviderId }
  | { kind: "module"; module: ModuleKey }
);

const provider = (p: ProviderId, x: number, y: number, delay: number): StageNode => ({
  id: p,
  kind: "provider",
  provider: p,
  x,
  y,
  delay,
  pull: 0.1,
  accent: "#8b7cf8",
});

const module_ = (m: ModuleKey, x: number, y: number, delay: number): StageNode => ({
  id: m,
  kind: "module",
  module: m,
  x,
  y,
  delay,
  pull: 0.17,
  accent: MODULE_META[m].accent,
});

// AI providers cluster at the upper left; business modules orbit the rest.
const NODES: StageNode[] = [
  provider("openai", 10, 10, 0),
  provider("anthropic", 28, 15, 0.02),
  provider("gemini", 11, 28, 0.03),
  provider("nvidia", 29, 33, 0.05),
  module_("accounting", 13, 53, 0.01),
  module_("education", 30, 71, 0.04),
  module_("hrPayroll", 12, 88, 0.06),
  module_("manufacturing", 73, 12, 0),
  module_("analytics", 91, 34, 0.03),
  module_("inventory", 70, 47, 0.02),
  module_("supplyChain", 89, 63, 0.05),
  module_("salesCrm", 71, 83, 0.07),
];

const MOBILE_MODULES: { key: ModuleKey; metric: string; value: string }[] = [
  { key: "accounting", metric: "netCash", value: "৳ 4.82 Cr" },
  { key: "inventory", metric: "stockHealth", value: "82%" },
  { key: "manufacturing", metric: "lineEfficiency", value: "87%" },
  { key: "education", metric: "attendance", value: "94%" },
];

const PHASE_WINDOWS: [number, number, number, number][] = [
  [-1, 0, 0.17, 0.22],
  [0.19, 0.24, 0.45, 0.5],
  [0.47, 0.52, 0.76, 0.81],
];

const FLOAT_CSS = `
.native-ai-float { animation: nativeAiFloat 7s ease-in-out infinite; }
@keyframes nativeAiFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@media (prefers-reduced-motion: reduce) { .native-ai-float { animation: none; } }
`;

type Insight = { title: string; body: string };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** SSR-safe: the server and first client render both assume motion is allowed. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Curved path (in px) from a card's resting point to the assistant's intake. */
function streamGeometry(node: StageNode, w: number, h: number) {
  const tx = (TARGET.x / 100) * w;
  const ty = (TARGET.y / 100) * h;
  const ox = (node.x / 100) * w;
  const oy = (node.y / 100) * h;
  const sx = ox + (tx - ox) * node.pull;
  const sy = oy + (ty - oy) * node.pull;
  const dx = tx - sx;
  const dy = ty - sy;
  const len = Math.hypot(dx, dy) || 1;
  const bend = 0.18 * len * (node.x < 50 ? 1 : -1);
  return {
    sx,
    sy,
    cx: (sx + tx) / 2 + (-dy / len) * bend,
    cy: (sy + ty) / 2 + (dx / len) * bend,
    tx,
    ty,
  };
}

const bezier = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;

/** Grey layer that desaturates whatever sits beneath it (opacity 1 = monochrome). */
function MonoVeil({
  opacity,
  className = "rounded-2xl",
}: {
  opacity: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[#8a8a8a] mix-blend-saturation",
        className,
      )}
      style={{ opacity }}
    />
  );
}

function useCharacterMotion(progress: MotionValue<number>) {
  return {
    color: useTransform(progress, [0.5, 0.8], [0, 1]),
    scanY: useTransform(progress, [0.5, 0.8], [-90, 400]),
    scanOpacity: useTransform(progress, [0.48, 0.53, 0.76, 0.81], [0, 1, 1, 0]),
    glow: useTransform(progress, [0.55, 0.95], [0, 1]),
  };
}

/* ------------------------------------------------------------------ */
/* Desktop stage                                                       */
/* ------------------------------------------------------------------ */

type StageSize = { w: MotionValue<number>; h: MotionValue<number> };

function NodeCard({
  node,
  progress,
  size,
  children,
}: {
  node: StageNode;
  progress: MotionValue<number>;
  size: StageSize;
  children: ReactNode;
}) {
  const pull = useTransform(
    progress,
    [0.18 + node.delay, 0.48 + node.delay / 2],
    [0, 1],
  );
  const x = useTransform([pull, size.w], ([p, w]: number[]) =>
    p * node.pull * ((TARGET.x - node.x) / 100) * w,
  );
  const y = useTransform([pull, size.h], ([p, h]: number[]) =>
    p * node.pull * ((TARGET.y - node.y) / 100) * h,
  );
  const scale = useTransform(pull, [0, 1], [1, node.kind === "provider" ? 0.96 : 0.9]);
  const veil = useTransform(
    progress,
    [0.52 + node.delay, 0.72 + node.delay],
    [1, 0],
  );
  // Once the brief is ready, module cards step back so the answers lead.
  const opacity = useTransform(
    progress,
    [0.82, 0.92],
    [1, node.kind === "module" ? 0.22 : 1],
  );

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${node.x}%`, top: `${node.y}%`, x, y, scale, opacity }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          className="native-ai-float"
          style={{ animationDelay: `${-node.delay * 90}s` }}
        >
          <div className="relative isolate">
            {children}
            <MonoVeil opacity={veil} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stream({
  node,
  progress,
  w,
  h,
}: {
  node: StageNode;
  progress: MotionValue<number>;
  w: number;
  h: number;
}) {
  const draw = useTransform(progress, [0.2 + node.delay, 0.46 + node.delay], [0, 1]);
  const base = useTransform(progress, [0.18, 0.24, 0.8, 0.92], [0, 1, 1, 0.4]);
  const tint = useTransform(progress, [0.52 + node.delay, 0.72 + node.delay], [0, 0.75]);
  const { sx, sy, cx, cy, tx, ty } = streamGeometry(node, w, h);
  const d = `M${sx} ${sy} Q${cx} ${cy} ${tx} ${ty}`;

  return (
    <g fill="none" strokeLinecap="round">
      <motion.path
        d={d}
        stroke="var(--ink)"
        strokeOpacity={0.16}
        strokeWidth={1}
        strokeDasharray="1 5"
        style={{ opacity: base }}
      />
      <motion.path
        d={d}
        stroke={node.accent}
        strokeWidth={1.4}
        style={{ pathLength: draw, opacity: tint }}
      />
    </g>
  );
}

function Particle({
  node,
  progress,
  size,
  offset,
}: {
  node: StageNode;
  progress: MotionValue<number>;
  size: StageSize;
  offset: number;
}) {
  // Scroll-driven travel along the stream; several trips across phases 2–3.
  const t = useTransform(progress, (p) => {
    const start = 0.22 + node.delay;
    const end = 0.8;
    if (p < start || p > end) return -1;
    return ((p - start) * 4.5 + offset) % 1;
  });
  const x = useTransform([t, size.w, size.h], ([tt, w, h]: number[]) => {
    if (tt < 0 || !w) return 0;
    const g = streamGeometry(node, w, h);
    return bezier(g.sx, g.cx, g.tx, tt);
  });
  const y = useTransform([t, size.w, size.h], ([tt, w, h]: number[]) => {
    if (tt < 0 || !w) return 0;
    const g = streamGeometry(node, w, h);
    return bezier(g.sy, g.cy, g.ty, tt);
  });
  const opacity = useTransform(t, (tt) => (tt < 0 ? 0 : Math.sin(Math.PI * tt) * 0.9));
  const backgroundColor = useTransform(
    progress,
    [0.5 + node.delay, 0.7 + node.delay],
    ["#94a3b8", node.accent],
  );

  return (
    <motion.span
      className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
      style={{ x, y, opacity, backgroundColor }}
    />
  );
}

function Appear({
  progress,
  at,
  x,
  y,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  x: number;
  y: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [at, at + 0.07], [0, 1]);
  const shift = useTransform(progress, [at, at + 0.07], [16, 0]);
  const scale = useTransform(progress, [at, at + 0.07], [0.96, 1]);
  return (
    <motion.div
      className="absolute z-30"
      style={{ left: `${x}%`, top: `${y}%`, opacity, y: shift, scale }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">{children}</div>
    </motion.div>
  );
}

function DesktopStage({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("pages.home.nativeAi");
  const tHeader = useTranslations("layout.header");
  const m: Metrics = (key) => t(`stage.metrics.${key}`);
  const insights = t.raw("stage.insights") as Insight[];

  const ref = useRef<HTMLDivElement>(null);
  const w = useMotionValue(0);
  const h = useMotionValue(0);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      w.set(width);
      h.set(height);
      setBox({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [w, h]);

  const character = useCharacterMotion(progress);
  const ring = useTransform(character.glow, [0, 1], [0, 0.45]);
  const size = { w, h };

  return (
    <div ref={ref} className="absolute inset-0 hidden lg:block">
      {/* Halo and orbit lines behind the assistant */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[44%] aspect-square h-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--purple)_20%,transparent)_0%,color-mix(in_srgb,#8b7cf8_9%,transparent)_38%,transparent_68%)]"
        style={{ opacity: character.glow }}
      />
      {box.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${box.w} ${box.h}`}
          fill="none"
        >
          <ellipse
            cx={box.w / 2}
            cy={box.h * 0.5}
            rx={box.w * 0.27}
            ry={box.h * 0.47}
            stroke="var(--border)"
            strokeDasharray="2 6"
          />
          <motion.ellipse
            cx={box.w / 2}
            cy={box.h * 0.5}
            rx={box.w * 0.27}
            ry={box.h * 0.47}
            stroke="var(--purple)"
            style={{ opacity: ring }}
          />
          {NODES.map((node) => (
            <Stream key={node.id} node={node} progress={progress} w={box.w} h={box.h} />
          ))}
        </svg>
      )}

      {/* Data particles (drawn beneath the figure so they disappear into it) */}
      <div className="pointer-events-none absolute inset-0">
        {NODES.flatMap((node) =>
          (node.kind === "module" ? [0, 0.5] : [0.25]).map((offset) => (
            <Particle
              key={`${node.id}-${offset}`}
              node={node}
              progress={progress}
              size={size}
              offset={offset}
            />
          )),
        )}
      </div>

      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          top: `${CHAR_TOP}%`,
          height: `${CHAR_HEIGHT}%`,
          aspectRatio: CHARACTER_ASPECT,
        }}
      >
        <AiCharacter className="h-full w-full" {...character} />
      </div>

      <p className="absolute left-[3%] top-0 z-20 text-[10px] font-semibold uppercase tracking-[0.14em] text-(--muted)">
        {t("stage.providersLabel")}
      </p>

      {NODES.map((node) => (
        <NodeCard key={node.id} node={node} progress={progress} size={size}>
          {node.kind === "provider" ? (
            <ProviderCard id={node.provider} />
          ) : (
            <ModuleCard
              moduleKey={node.module}
              name={tHeader(`modules.${node.module}.title`)}
              m={m}
            />
          )}
        </NodeCard>
      ))}

      {/* Executive layer */}
      <Appear progress={progress} at={0.8} x={29} y={50}>
        <QuestionBubble label={t("stage.askLabel")} question={t("stage.question")} />
      </Appear>
      <Appear progress={progress} at={0.83} x={77} y={13}>
        <span className="inline-flex items-center gap-2 rounded-full bg-(--purple-light) px-3 py-1 text-[11px] font-semibold text-(--purple)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--purple)" />
          {t("stage.briefLabel")}
        </span>
      </Appear>
      {insights.map((insight, index) => (
        <Appear
          key={insight.title}
          progress={progress}
          at={0.84 + index * 0.025}
          x={index === 1 ? 80 : 77}
          y={30 + index * 20}
        >
          <InsightCard index={index} title={insight.title} body={insight.body} />
        </Appear>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet stage: same timeline, simpler composition           */
/* ------------------------------------------------------------------ */

function MobileStage({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("pages.home.nativeAi");
  const tHeader = useTranslations("layout.header");
  const insights = t.raw("stage.insights") as Insight[];
  const character = useCharacterMotion(progress);

  const veil = useTransform(progress, [0.5, 0.72], [1, 0]);
  const providersY = useTransform(progress, [0.2, 0.5], [0, 8]);
  const chipsY = useTransform(progress, [0.2, 0.5], [0, -12]);
  const chipsScale = useTransform(progress, [0.2, 0.5], [1, 0.96]);
  const chipsOpacity = useTransform(progress, [0.8, 0.87], [1, 0]);
  const insightsOpacity = useTransform(progress, [0.83, 0.9], [0, 1]);
  const insightsY = useTransform(progress, [0.83, 0.9], [12, 0]);
  const ringRotate = useTransform(progress, [0.2, 0.8], [0, 160]);
  const ringOpacity = useTransform(progress, [0.18, 0.26, 0.8, 0.9], [0, 1, 1, 0.3]);

  return (
    <div className="absolute inset-0 flex flex-col items-center gap-3 lg:hidden">
      <motion.div className="flex gap-2" style={{ y: providersY }}>
        {(["openai", "anthropic", "gemini", "nvidia"] as const).map((id) => (
          <span key={id} className="relative isolate">
            <ProviderTile id={id} />
            <MonoVeil opacity={veil} className="rounded-xl" />
          </span>
        ))}
      </motion.div>

      <div className="relative min-h-0 w-full flex-1">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--purple)_20%,transparent)_0%,transparent_66%)]"
          style={{ opacity: character.glow }}
        />
        <div className="absolute left-1/2 top-1/2 aspect-square h-[92%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full border border-dashed border-(--purple)/40"
            style={{ rotate: ringRotate, opacity: ringOpacity }}
          />
        </div>
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2"
          style={{ aspectRatio: CHARACTER_ASPECT }}
        >
          <AiCharacter className="h-full w-full" {...character} />
        </div>
      </div>

      <div className="relative h-[164px] w-full max-w-sm shrink-0">
        <motion.div
          className="grid grid-cols-2 gap-2"
          style={{ y: chipsY, scale: chipsScale, opacity: chipsOpacity }}
        >
          {MOBILE_MODULES.map(({ key, metric, value }) => (
            <div key={key} className="relative isolate">
              <ModuleChip
                moduleKey={key}
                name={tHeader(`modules.${key}.title`)}
                label={t(`stage.metrics.${metric}`)}
                value={value}
              />
              <MonoVeil opacity={veil} />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col gap-2"
          style={{ opacity: insightsOpacity, y: insightsY }}
        >
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.title}
              index={index}
              title={insight.title}
              body={insight.body}
              compact
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Captions                                                            */
/* ------------------------------------------------------------------ */

function PhaseCaption({
  progress,
  window,
  index,
  children,
}: {
  progress: MotionValue<number>;
  window: [number, number, number, number];
  index: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, window, [0, 1, 1, 0]);
  const y = useTransform(progress, window, [10, 0, 0, -10]);
  return (
    <motion.p
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-body text-sm text-(--muted) sm:text-base"
      style={{ opacity, y }}
    >
      <span className="me-2 font-semibold tabular-nums text-(--purple)">0{index + 1}</span>
      {children}
    </motion.p>
  );
}

function ProgressSegment({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const scaleX = useTransform(progress, range, [0, 1]);
  return (
    <span className="h-0.75 w-7 overflow-hidden rounded-full bg-border">
      <motion.span
        className="block h-full origin-left rounded-full bg-(--purple)"
        style={{ scaleX }}
      />
    </span>
  );
}

function Captions({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("pages.home.nativeAi");
  const phases = t.raw("stage.phases") as string[];
  const finalOpacity = useTransform(progress, [0.8, 0.87], [0, 1]);
  const finalY = useTransform(progress, [0.8, 0.87], [14, 0]);

  return (
    <div className="relative z-20 mx-auto w-full max-w-170 shrink-0 text-center">
      <div className="relative h-[112px]">
        {PHASE_WINDOWS.map((window, index) => (
          <PhaseCaption key={index} progress={progress} window={window} index={index}>
            {phases[index]}
          </PhaseCaption>
        ))}
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          style={{ opacity: finalOpacity, y: finalY }}
        >
          <h3 className="font-hand text-[clamp(24px,3vw,38px)] font-bold leading-[1.15] text-(--ink)">
            {t("stage.executiveTitle")}
          </h3>
          <p className="mx-auto mt-2 max-w-130 font-body text-sm leading-[1.6] text-(--muted)">
            {t("description")}
          </p>
        </motion.div>
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5" aria-hidden="true">
        {(
          [
            [0, 0.2],
            [0.2, 0.5],
            [0.5, 0.8],
            [0.8, 0.95],
          ] as [number, number][]
        ).map((range) => (
          <ProgressSegment key={range[0]} progress={progress} range={range} />
        ))}
      </div>
      {/* <p className="mt-2 text-[10px] text-(--muted)">{t("stage.providersNote")}</p> */}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

function Experience({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <div
        className="pointer-events-none relative mx-auto mt-4 min-h-0 w-full max-w-[1240px] flex-1"
        aria-hidden="true"
      >
        <DesktopStage progress={progress} />
        <MobileStage progress={progress} />
      </div>
      <Captions progress={progress} />
    </>
  );
}

export default function NativeAISection() {
  const t = useTranslations("pages.home.nativeAi");
  const insights = t.raw("stage.insights") as Insight[];
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // A light spring smooths wheel steps while staying locked to scroll position.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 34,
    mass: 0.35,
    restDelta: 0.0005,
  });
  // Reduced motion: show the finished state without pinning.
  const settled = useMotionValue(1);
  const progress = reduced ? settled : smooth;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="native-ai-title"
      className={cn("relative bg-(--cream)", !reduced && "h-[260vh] lg:h-[380vh]")}
    >
      <style>{FLOAT_CSS}</style>
      <div
        className={cn(
          "flex h-svh min-h-[600px] flex-col overflow-hidden px-4 pb-5 pt-20 sm:px-6 lg:pt-24",
          reduced ? "relative" : "sticky top-0",
        )}
      >
        <div className="relative z-20 mx-auto max-w-240 shrink-0 text-center">
          <SectionTag>{t("tag")}</SectionTag>
          <h2
            id="native-ai-title"
            className="mt-3 font-hand text-[clamp(28px,3.8vw,50px)] font-bold leading-[1.1] text-(--ink)"
          >
            {t("title")}
          </h2>
        </div>

        <Experience key={reduced ? "settled" : "scroll"} progress={progress} />
      </div>

      <div className="sr-only">
        <p>{t("stage.question")}</p>
        <ul>
          {insights.map((insight) => (
            <li key={insight.title}>
              {insight.title}: {insight.body}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

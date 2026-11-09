"use client";

import { useEffect, useState } from "react";

const PEAK = 96; // utilization (%) reached before easing back to available
const RISE_MS = 3200;
const HOLD_MS = 700;
const FALL_MS = 3200;
const REST_MS = 600;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Animated utilization meter: Available (0%) → Overloaded (~96%) → back. */
export default function CapacityGauge({
  utilizationLabel,
  availableLabel,
  overloadedLabel,
}: {
  utilizationLabel: string;
  availableLabel: string;
  overloadedLabel: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const total = RISE_MS + HOLD_MS + FALL_MS + REST_MS;
    const tick = (now: number) => {
      const t = (now - start) % total;
      let v = 0;
      if (t < RISE_MS) v = ease(t / RISE_MS) * PEAK;
      else if (t < RISE_MS + HOLD_MS) v = PEAK;
      else if (t < RISE_MS + HOLD_MS + FALL_MS)
        v = (1 - ease((t - RISE_MS - HOLD_MS) / FALL_MS)) * PEAK;
      setValue(v);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const angle = (value / 100) * 180;
  const tone =
    value >= 85 ? "#dc2626" : value >= 65 ? "#d97706" : "var(--primary)";

  return (
    <>
      <path
        d="M45 190A135 135 0 0 1 315 190"
        stroke="var(--border)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M45 190A135 135 0 0 1 315 190"
        pathLength={100}
        stroke={tone}
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray={`${value} 100`}
      />
      <g transform={`rotate(${angle} 180 188)`}>
        <path
          d="m180 188-118 0"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <circle cx="180" cy="188" r="7" fill="var(--ink)" />
      <text
        x="180"
        y="140"
        textAnchor="middle"
        fontSize="43"
        fontWeight="600"
        fill="var(--ink)"
      >
        {Math.round(value)}%
      </text>
      <text
        x="180"
        y="166"
        textAnchor="middle"
        fontSize="11"
        fill="var(--muted-foreground)"
      >
        {utilizationLabel}
      </text>
      <text x="36" y="227" fontSize="11" fill="var(--muted-foreground)">
        {availableLabel}
      </text>
      <text x="265" y="227" fontSize="11" fill="var(--muted-foreground)">
        {overloadedLabel}
      </text>
    </>
  );
}

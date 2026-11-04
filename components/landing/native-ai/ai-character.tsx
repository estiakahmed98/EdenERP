"use client";

import { useId } from "react";
import { motion, type MotionValue } from "framer-motion";

type Mode = "line" | "color";

const VIEW_W = 320;
const VIEW_H = 400;

/** Where data streams land, as a fraction of the character's box (lower visor). */
export const CHARACTER_INTAKE = { x: 0.5, y: 0.4 };
export const CHARACTER_ASPECT = VIEW_W / VIEW_H;

const BODY =
  "M50 400 L54 318 C58 262 102 222 160 220 C218 222 262 262 266 318 L270 400 Z";
const BAND = "M84 130 C84 30 236 30 236 130";

/**
 * One drawing, rendered twice: a thin monochrome line-art pass and a colored
 * pass that fades in on top as the assistant "activates".
 */
function Figure({ mode, id }: { mode: Mode; id: string }) {
  const line = mode === "line";
  const stroke = line ? "var(--ink)" : "var(--purple)";
  const faint = line ? 0.45 : 0.55;
  const shell = line ? "var(--card)" : `url(#${id}-shell)`;
  const jacket = line ? "var(--card)" : `url(#${id}-jacket)`;
  const accent = line ? "var(--ink)" : `url(#${id}-accent)`;
  const sw = 1.5;

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* Torso and jacket */}
      <path d={BODY} fill={jacket} stroke={stroke} strokeWidth={sw} />
      <path
        d="M120 230 C132 262 146 284 160 298 C174 284 188 262 200 230 M160 298 V400"
        fill="none"
        stroke={stroke}
        strokeOpacity={faint}
        strokeWidth={1.2}
      />
      <path
        d="M66 302 C86 278 108 266 128 260 M254 302 C234 278 212 266 192 260"
        fill="none"
        stroke={accent}
        strokeOpacity={line ? 0.5 : 1}
        strokeWidth={line ? 1.2 : 2.6}
      />
      <path
        d="M88 400 L94 334 M232 400 L226 334 M96 352 H128"
        fill="none"
        stroke={stroke}
        strokeOpacity={faint * 0.7}
        strokeWidth={1.1}
      />
      <rect
        x="188"
        y="320"
        width="38"
        height="18"
        rx="5"
        fill={line ? "var(--card)" : "var(--purple-light)"}
        stroke={stroke}
        strokeWidth={1.1}
      />
      <path d="M195 329 H219" stroke={accent} strokeWidth={1.4} />
      {/* Chest core */}
      <circle
        cx="160"
        cy="334"
        r="20"
        fill="none"
        stroke={stroke}
        strokeOpacity={faint}
        strokeWidth={1}
      />
      <circle
        cx="160"
        cy="334"
        r="12"
        fill={line ? "var(--card)" : `url(#${id}-core)`}
        stroke={stroke}
        strokeWidth={sw}
      />

      {/* Neck and collar */}
      <rect x="140" y="186" width="40" height="38" rx="8" fill={shell} stroke={stroke} strokeWidth={sw} />
      <path d="M146 200 H174 M146 210 H174" stroke={stroke} strokeOpacity={faint} strokeWidth={1} />
      <path
        d="M110 232 C124 212 196 212 210 232 C196 246 124 246 110 232 Z"
        fill={line ? "var(--card)" : `url(#${id}-band)`}
        stroke={stroke}
        strokeWidth={sw}
      />

      {/* Headphone band: an outlined band in line mode, a gradient band in color */}
      {line ? (
        <>
          <path d={BAND} fill="none" stroke="var(--ink)" strokeWidth={9} />
          <path d={BAND} fill="none" stroke="var(--card)" strokeWidth={6} />
        </>
      ) : (
        <path d={BAND} fill="none" stroke={`url(#${id}-band)`} strokeWidth={7} />
      )}

      {/* Head */}
      <rect x="96" y="52" width="128" height="138" rx="58" fill={shell} stroke={stroke} strokeWidth={sw} />
      <path d="M118 74 C140 62 180 62 202 74" fill="none" stroke={stroke} strokeOpacity={faint} strokeWidth={1.1} />
      <path d="M150 170 H170" stroke={stroke} strokeOpacity={faint} strokeWidth={1.4} />

      {/* Visor */}
      <rect
        x="110"
        y="96"
        width="100"
        height="52"
        rx="26"
        fill={line ? "var(--card)" : `url(#${id}-visor)`}
        stroke={stroke}
        strokeWidth={sw}
      />
      {line ? (
        <path d="M138 122 H152 M168 122 H182" stroke="var(--ink)" strokeWidth={3} />
      ) : (
        <>
          <path d="M122 106 C142 100 172 100 196 104" fill="none" stroke="#ffffff" strokeOpacity={0.22} strokeWidth={2} />
          <ellipse cx="145" cy="122" rx="14" ry="8" fill="#67e8f9" opacity={0.28} />
          <ellipse cx="175" cy="122" rx="14" ry="8" fill="#67e8f9" opacity={0.28} />
          <rect x="136" y="118" width="18" height="8" rx="4" fill="#a5f3fc" />
          <rect x="166" y="118" width="18" height="8" rx="4" fill="#a5f3fc" />
        </>
      )}

      {/* Ear cups */}
      {[72, 218].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y="100"
            width="30"
            height="60"
            rx="15"
            fill={line ? "var(--card)" : `url(#${id}-cup)`}
            stroke={stroke}
            strokeWidth={sw}
          />
          <rect
            x={x + 8}
            y="112"
            width="14"
            height="36"
            rx="7"
            fill={line ? "none" : "#a5f3fc"}
            fillOpacity={0.55}
            stroke={line ? "var(--ink)" : "none"}
            strokeOpacity={faint}
            strokeWidth={1}
          />
        </g>
      ))}

      {/* Microphone boom */}
      <path d="M236 152 C246 184 222 198 194 194" fill="none" stroke={stroke} strokeWidth={2} />
      <circle cx="190" cy="194" r="5" fill={line ? "var(--card)" : "#67e8f9"} stroke={stroke} strokeWidth={sw} />

      {/* Antenna */}
      <path d="M160 52 V38" stroke={stroke} strokeWidth={sw} />
      <circle cx="160" cy="33" r="5" fill={line ? "var(--card)" : "#67e8f9"} stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

export default function AiCharacter({
  color,
  scanY,
  scanOpacity,
  className,
}: {
  /** 0 = pure line art, 1 = fully colored. */
  color: MotionValue<number>;
  /** Vertical position of the highlight sweep, in SVG units. */
  scanY: MotionValue<number>;
  scanOpacity: MotionValue<number>;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      // Let the torso dissolve into the page instead of ending on a hard edge.
      style={{
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--card)" }} />
          <stop offset="1" style={{ stopColor: "var(--purple-light)" }} />
        </linearGradient>
        <linearGradient id={`${id}-jacket`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--card)" }} />
          <stop offset="1" style={{ stopColor: "var(--purple-light)" }} />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b7cf8" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8b7cf8" />
          <stop offset="1" style={{ stopColor: "var(--purple)" }} />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--purple)" }} />
          <stop offset="1" stopColor="#7c6cf6" />
        </linearGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13284a" />
          <stop offset="1" stopColor="#0a1628" />
        </linearGradient>
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor="#cffafe" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" style={{ stopColor: "var(--purple)" }} />
        </radialGradient>
        <linearGradient id={`${id}-scan`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#67e8f9" stopOpacity="0" />
          <stop offset="0.5" stopColor="#67e8f9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8b7cf8" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-silhouette`}>
          <path d={BODY} />
          <rect x="96" y="52" width="128" height="138" rx="58" />
          <rect x="72" y="100" width="30" height="60" rx="15" />
          <rect x="218" y="100" width="30" height="60" rx="15" />
          <rect x="140" y="186" width="40" height="38" rx="8" />
        </clipPath>
      </defs>

      <Figure mode="line" id={id} />
      <motion.g style={{ opacity: color }}>
        <Figure mode="color" id={id} />
      </motion.g>
      <g clipPath={`url(#${id}-silhouette)`}>
        <motion.rect
          x="0"
          y="0"
          width={VIEW_W}
          height="90"
          fill={`url(#${id}-scan)`}
          style={{ y: scanY, opacity: scanOpacity }}
        />
      </g>
    </svg>
  );
}

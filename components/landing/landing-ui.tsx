"use client";

import React, { useEffect, useRef, useState } from "react";

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.landing-page {
  --purple: #1088ef;
  --purple-light: #e8f1fb;
  --purple-dark: #003180;
  --teal: #21a816;
  --cream: #f7fafd;
  --gray-bg: #eef3f9;
  --ink: #14233b;
  --muted: #556a85;
  --hand: var(--font-caveat), 'Segoe Print', cursive;
  --body: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.landing-page { font-family: var(--body); background: var(--cream); color: var(--ink); overflow-x: hidden; }
html[lang^='bn'] .landing-page { --body: var(--font-tiro-bangla), var(--font-rubik), ui-sans-serif, system-ui, sans-serif; --hand: var(--font-tiro-bangla), serif; }
.dark .landing-page { --purple: #1088ef; --purple-dark: #003180; --teal: #21a816; --cream: #0a1424; --gray-bg: #0f1c30; --ink: #eaf1fa; --muted: #9fb2cc; --purple-light: #12263f; }
.landing-page.green, .landing-page.theme-green, .green .landing-page, .theme-green .landing-page {
  --purple: #238b5a;
  --purple-light: #e8f6ee;
  --purple-dark: #176c45;
  --teal: #16b38a;
  --cream: #f5fbf7;
  --gray-bg: #edf7f0;
  --ink: #133321;
  --muted: #4f6b5d;
}
.landing-page.ocean, .landing-page.theme-ocean, .ocean .landing-page, .theme-ocean .landing-page {
  --purple: #2563eb;
  --purple-light: #e8f2ff;
  --purple-dark: #1d4ed8;
  --teal: #06b6d4;
  --cream: #f5fbff;
  --gray-bg: #ecf7fb;
  --ink: #08263d;
  --muted: #557086;
}

/* Light and dark themes: section accents follow the logo blue and green. */
.light .landing-page,
.dark .landing-page {
  --wavy: #9bdc95;
  --color-violet-50: #e8f1fb;
  --color-violet-100: #d7e7f8;
  --color-violet-200: #b7d4f3;
  --color-violet-300: #86b8ec;
  --color-violet-400: #4c95e3;
  --color-violet-500: #1088ef;
  --color-violet-600: #1088ef;
  --color-violet-700: #0860b8;
  --color-violet-800: #003180;
  --color-fuchsia-300: #86d982;
  --color-fuchsia-500: #21a816;
  --color-cyan-300: #86b8ec;
  --color-cyan-400: #1088ef;
  --color-cyan-500: #1088ef;
  --color-cyan-600: #1088ef;
  --color-cyan-700: #0860b8;
  --color-teal-300: #86d982;
  --color-teal-500: #21a816;
}

@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes scale-in { from{transform:scale(0.93);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.landing-page .reveal { opacity:0; transform:translateY(28px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
.landing-page .reveal.in { opacity:1; transform:translateY(0); }
.landing-page .reveal-d1 { transition-delay:.1s; }
.landing-page .reveal-d2 { transition-delay:.2s; }
.landing-page .reveal-d3 { transition-delay:.3s; }

.landing-page .font-hand { font-family: var(--hand); }
.landing-page .font-body { font-family: var(--body); }
.landing-page .shadow-float { box-shadow: 0 30px 80px rgba(15,23,42,.10), 0 0 0 1px rgba(15,23,42,.04); }
.landing-page .marquee-left { animation: marqueeLeft 20s linear infinite; }
.landing-page .marquee-right { animation: marqueeRight 20s linear infinite; }
`;

declare global {
  interface Window {
    THREE?: any;
  }
}

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export function ThreeBg() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      if (!ref.current || !window.THREE) return;

      const THREE = window.THREE;
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      const renderer = new THREE.WebGLRenderer({
        canvas: ref.current,
        antialias: true,
        alpha: true,
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);
      cam.position.z = 60;

      const styles = getComputedStyle(ref.current);
      const purple = new THREE.Color(styles.getPropertyValue("--purple").trim());
      const teal = new THREE.Color(styles.getPropertyValue("--teal").trim());

      const geo = new THREE.BufferGeometry();
      const particleCount = 220;
      const pos = new Float32Array(particleCount * 3);
      const col = new Float32Array(particleCount * 3);

      for (let index = 0; index < particleCount; index++) {
        pos[index * 3] = (Math.random() - 0.5) * 140;
        pos[index * 3 + 1] = (Math.random() - 0.5) * 80;
        pos[index * 3 + 2] = (Math.random() - 0.5) * 60;

        const tone = Math.random();
        if (tone > 0.7) {
          col[index * 3] = purple.r;
          col[index * 3 + 1] = purple.g;
          col[index * 3 + 2] = purple.b;
        } else if (tone > 0.4) {
          col[index * 3] = teal.r;
          col[index * 3 + 1] = teal.g;
          col[index * 3 + 2] = teal.b;
        } else {
          col[index * 3] = 0.92;
          col[index * 3 + 1] = 0.91;
          col[index * 3 + 2] = 0.94;
        }
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.55,
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);

      const tor = new THREE.Mesh(
        new THREE.TorusGeometry(24, 0.8, 16, 80),
        new THREE.MeshBasicMaterial({
          color: purple,
          transparent: true,
          opacity: 0.05,
        }),
      );
      scene.add(tor);

      const tor2 = new THREE.Mesh(
        new THREE.TorusGeometry(36, 0.4, 16, 80),
        new THREE.MeshBasicMaterial({
          color: teal,
          transparent: true,
          opacity: 0.04,
        }),
      );
      tor2.rotation.x = 0.4;
      scene.add(tor2);

      let mouseX = 0;
      let mouseY = 0;
      const onMouse = (event: MouseEvent) => {
        mouseX = (event.clientX / innerWidth - 0.5) * 2;
        mouseY = -(event.clientY / innerHeight - 0.5) * 2;
      };

      window.addEventListener("mousemove", onMouse);
      let rafId: number;
      const tick = (timestamp: number) => {
        rafId = requestAnimationFrame(tick);
        pts.rotation.y = timestamp * 0.00008 + mouseX * 0.04;
        pts.rotation.x = mouseY * 0.03;
        tor.rotation.y = timestamp * 0.00012;
        tor.rotation.x = timestamp * 0.00006;
        tor2.rotation.z = timestamp * 0.00009;
        renderer.render(scene, cam);
      };

      rafId = requestAnimationFrame(tick);
      (ref.current as HTMLCanvasElement & { _cleanup?: () => void })._cleanup =
        () => {
          cancelAnimationFrame(rafId);
          renderer.dispose();
          window.removeEventListener("mousemove", onMouse);
        };
    };

    document.head.appendChild(script);

    return () => {
      (
        ref.current as (HTMLCanvasElement & { _cleanup?: () => void }) | null
      )?._cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function TypeWriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    let deleting = false;
    const word = words[wordIndex];

    const step = () => {
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex >= word.length) {
          deleting = true;
          timeout = setTimeout(step, 2200);
          return;
        }
        timeout = setTimeout(step, 55);
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          setWordIndex((current) => (current + 1) % words.length);
          return;
        }
        timeout = setTimeout(step, 32);
      }
    };

    timeout = setTimeout(step, 400);
    return () => clearTimeout(timeout);
  }, [wordIndex, words]);

  return (
    <span className="font-hand text-(--purple)">
      {text}
      <span className="animate-[blink_1s_infinite] font-light">|</span>
    </span>
  );
}

export function SectionTag({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-xs font-bold tracking-[0.5px] ${
        light
          ? "border-white/20 bg-white/10 text-white"
          : "border-border bg-(--purple-light) text-(--purple)"
      }`}
    >
      {children}
    </span>
  );
}

function Wavy({ color = "var(--wavy, #fde68a)" }: { color?: string }) {
  return (
    <svg
      width="100%"
      height="10"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1 left-0 z-0"
    >
      <path
        d="M0,6 Q25,1 50,6 Q75,11 100,6 Q125,1 150,6 Q175,11 200,6"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export function HandText({
  children,
  color = "var(--wavy, #fde68a)",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Wavy color={color} />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export function Circled({
  children,
  color = "var(--teal)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <ellipse
          cx="50%"
          cy="50%"
          fill="none"
          rx="51%"
          ry="52%"
          stroke={color}
          strokeDasharray="5 3"
          strokeWidth="3"
          style={{ transform: "rotate(-2deg)", transformOrigin: "center" }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

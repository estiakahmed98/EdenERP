"use client";

import React, { useEffect, useRef, useState } from "react";

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --purple: #714b67;
  --purple-light: #f3eef1;
  --purple-dark: #5a3854;
  --teal: #02cfc3;
  --cream: #faf9f7;
  --gray-bg: #f3f4f7;
  --ink: #1a1a2e;
  --muted: #64748b;
  --hand: 'Caveat', 'Segoe Print', cursive;
  --body: 'Plus Jakarta Sans', system-ui, sans-serif;
}

body { font-family: var(--body); background: #fff; color: var(--ink); overflow-x: hidden; }

@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes scale-in { from{transform:scale(0.93);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.reveal { opacity:0; transform:translateY(28px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
.reveal.in { opacity:1; transform:translateY(0); }
.reveal-d1 { transition-delay:.1s; }
.reveal-d2 { transition-delay:.2s; }
.reveal-d3 { transition-delay:.3s; }

.font-hand { font-family: var(--hand); }
.font-body { font-family: var(--body); }
.shadow-float { box-shadow: 0 30px 80px rgba(15,23,42,.10), 0 0 0 1px rgba(15,23,42,.04); }
.marquee-left { animation: marqueeLeft 20s linear infinite; }
.marquee-right { animation: marqueeRight 20s linear infinite; }
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
          col[index * 3] = 0.44;
          col[index * 3 + 1] = 0.3;
          col[index * 3 + 2] = 0.4;
        } else if (tone > 0.4) {
          col[index * 3] = 0.02;
          col[index * 3 + 1] = 0.81;
          col[index * 3 + 2] = 0.76;
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
          color: 0x714b67,
          transparent: true,
          opacity: 0.05,
        }),
      );
      scene.add(tor);

      const tor2 = new THREE.Mesh(
        new THREE.TorusGeometry(36, 0.4, 16, 80),
        new THREE.MeshBasicMaterial({
          color: 0x02cfc3,
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
    <span className="font-hand text--purple">
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
          : "border-[#714b6722] bg-(--purple-light) text-(--purple)"
      }`}
    >
      {children}
    </span>
  );
}

function Wavy({ color = "#fde68a" }: { color?: string }) {
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
  color = "#fde68a",
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
  color = "#02cfc3",
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

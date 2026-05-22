"use client";

import { useEffect, useRef, useState } from "react";

type AppItem = {
  name: string;
  icon: string;
  color: string;
};

type FeatureItem = {
  icon: string;
  title: string;
  desc: string;
};

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  score: number;
};

const APPS: AppItem[] = [
  { name: "Accounting", icon: "📊", color: "#e8d5f5" },
  { name: "Knowledge", icon: "📘", color: "#d5e8f5" },
  { name: "Sign", icon: "✍️", color: "#d5f5e8" },
  { name: "CRM", icon: "🤝", color: "#f5e8d5" },
  { name: "Studio", icon: "🛠️", color: "#f5d5e8" },
  { name: "Subscribe", icon: "🔄", color: "#e8f5d5" },
  { name: "AI", icon: "🤖", color: "#fffbe6" },
  { name: "Point Sale", icon: "🏪", color: "#d5f5f5" },
  { name: "Discuss", icon: "💬", color: "#ede8ff" },
  { name: "Documents", icon: "📂", color: "#fff0e6" },
  { name: "Project", icon: "✅", color: "#d5eeff" },
  { name: "Timesheets", icon: "⏱️", color: "#d5ffe8" },
  { name: "Field Svc", icon: "⚡", color: "#ffe8e8" },
  { name: "Planning", icon: "🔀", color: "#e8e8ff" },
  { name: "Helpdesk", icon: "🎯", color: "#ffe8f5" },
  { name: "eCommerce", icon: "🛍️", color: "#e8ffe8" },
  { name: "Website", icon: "🌐", color: "#fff8d5" },
  { name: "Email Mktg", icon: "🚀", color: "#d5f0ff" },
  { name: "Purchase", icon: "💳", color: "#f0d5ff" },
  { name: "Inventory", icon: "📦", color: "#d5ffd5" },
  { name: "Manufactur", icon: "🏭", color: "#ffd5f0" },
  { name: "Sales", icon: "📈", color: "#f0ffd5" },
  { name: "HR", icon: "👥", color: "#d5e8f0" },
  { name: "Dashboard", icon: "🎛️", color: "#f0e8d5" },
];

const ALTS: Record<string, string> = {
  Accounting: "Quickbooks",
  Knowledge: "Notion",
  Sign: "DocuSign",
  CRM: "Salesforce",
  Subscribe: "Chargebee",
  "Point Sale": "Lightspeed",
  Discuss: "Slack",
  Project: "Asana",
  Timesheets: "Harvest",
  "Field Svc": "Service Cloud",
  Helpdesk: "Zendesk",
  eCommerce: "Shopify",
  "Email Mktg": "Hubspot",
  HR: "BambooHR",
  Dashboard: "Tableau",
};

const FEATURES: FeatureItem[] = [
  {
    icon: "⚡",
    title: "Automated renewals",
    desc: "Renew contracts and invoices automatically without manual tracking.",
  },
  {
    icon: "👤",
    title: "Customer portal",
    desc: "Let customers view plans, invoices, and payment history securely.",
  },
  {
    icon: "📄",
    title: "Recurring invoices",
    desc: "Generate invoices based on billing cycles and contract rules.",
  },
  {
    icon: "💳",
    title: "Payment automation",
    desc: "Collect payments, retry failed charges, keep billing updated.",
  },
  {
    icon: "📊",
    title: "Revenue analytics",
    desc: "Track MRR, ARR, churn, renewals, and lifetime value in real time.",
  },
  {
    icon: "🛡️",
    title: "Retention flows",
    desc: "Trigger smart follow-ups before renewals or cancellation risks.",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Fiona Laurent",
    role: "CEO, Floral Studio",
    quote: "Adon ERP cut our billing time by 70%. Every invoice runs itself now.",
    avatar: "🌸",
    score: 5,
  },
  {
    name: "James Park",
    role: "CTO, Nova Retail",
    quote: "The accounting module alone replaced three separate tools we used.",
    avatar: "🎯",
    score: 5,
  },
  {
    name: "Amara Diallo",
    role: "CFO, Green Valley",
    quote: "We grew 3× without hiring extra finance staff. That says it all.",
    avatar: "🌿",
    score: 5,
  },
];

const GLOBAL_CSS = `
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

function useReveal() {
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

function ThreeBg() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
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
      (ref.current as HTMLCanvasElement & { _cleanup?: () => void })._cleanup = () => {
        cancelAnimationFrame(rafId);
        renderer.dispose();
        window.removeEventListener("mousemove", onMouse);
      };
    };

    document.head.appendChild(script);

    return () => {
      (ref.current as HTMLCanvasElement & { _cleanup?: () => void } | null)?._cleanup?.();
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

function TypeWriter({ words }: { words: string[] }) {
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
    <span className="font-hand text-[var(--purple)]">
      {text}
      <span className="animate-[blink_1s_infinite] font-light">|</span>
    </span>
  );
}

function SectionTag({
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
          : "border-[#714b6722] bg-[var(--purple-light)] text-[var(--purple)]"
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

function HandText({
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

function Circled({
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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-[100px]">
      <ThreeBg />
      <div className="pointer-events-none absolute -left-20 -top-[120px] h-[420px] w-[420px] rounded-full bg-[#f3eef122] blur-[60px]" />
      <div className="pointer-events-none absolute -right-[100px] top-[60px] h-80 w-80 rounded-full bg-[#02cfc30a] blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        <div className="reveal animate-[fadeIn_.6s_both]">
          <SectionTag>✦ All your business on one platform</SectionTag>
        </div>

        <h1 className="reveal reveal-d1 mt-6 font-hand text-[clamp(52px,8vw,96px)] font-bold leading-[1.05] tracking-[-1px] text-[#1a1a2e]">
          Simple, efficient,
          <br />
          yet{" "}
          <HandText>
            <TypeWriter
              words={[
                "finances automatically",
                "subscriptions effortlessly",
                "operations seamlessly",
                "growth intelligently",
              ]}
            />
          </HandText>
        </h1>

        <p className="reveal reveal-d2 mx-auto mt-5 max-w-[520px] font-body text-lg leading-[1.7] text-[var(--muted)]">
          One click install. No complexity, no code — just a single platform that empowers every
          person in your business.
        </p>

        <div className="reveal reveal-d3 mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-[10px] bg-[var(--purple)] px-8 py-[15px] font-body text-[15px] font-bold text-white shadow-[0_4px_20px_#714b6730] transition hover:-translate-y-0.5 hover:bg-[var(--purple-dark)] hover:shadow-[0_8px_28px_#714b6740]">
            Start now — it's free →
          </button>
          <button className="rounded-[10px] border-[1.5px] border-[#e2dde8] bg-white px-[22px] py-3 font-body text-[15px] font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--purple)] hover:text-[var(--purple)]">
            ▶ Watch demo
          </button>
        </div>

        <p className="reveal mt-3 font-body text-xs text-[#aaa]">
          US$ 9.99/month · All apps · No credit card required
        </p>

        <div className="reveal shadow-float mt-14 animate-[scale-in_.8s_.5s_both] overflow-hidden rounded-[20px] border border-[#eeedf2] bg-white">
          <div className="flex items-center gap-2 border-b border-[#ede8e0] bg-[#f8f5f2] px-[18px] py-2.5">
            <div className="flex gap-[5px]">
              {["#f87171", "#fbbf24", "#34d399"].map((color) => (
                <div key={color} className="h-[11px] w-[11px] rounded-full" style={{ background: color }} />
              ))}
            </div>
            <div className="flex h-[22px] flex-1 items-center justify-center rounded-md bg-[#ede8e0] text-[11px] text-[#999]">
              adon-erp.com/subscriptions
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-sm font-bold text-[#1a1a2e]">🔄 Subscriptions</span>
              <span className="rounded-full bg-[#d1fae5] px-2.5 py-1 text-[11px] font-bold text-[#065f46]">
                ● Active billing
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#f0eae0]">
              <div className="grid grid-cols-[80px_1fr_110px_110px_100px] bg-[#f8f5f0] px-4 py-[9px] font-body text-[10px] font-bold uppercase tracking-[1px] text-[#999]">
                {["ID", "Customer", "Next Bill", "Revenue", "Status"].map((heading) => (
                  <span key={heading}>{heading}</span>
                ))}
              </div>
              {[
                ["S-0016", "Sophia Thomas", "09/25/2026", "$350/mo", "Active"],
                ["S-0017", "Bright Studio", "10/12/2026", "$1,250/mo", "Quote"],
                ["S-0018", "Green Valley", "10/20/2026", "$650/mo", "Active"],
                ["S-0019", "Nova Retail", "11/01/2026", "$2,400/mo", "Active"],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className={`grid grid-cols-[80px_1fr_110px_110px_100px] border-t border-[#f0eae0] px-4 py-[11px] text-xs ${
                    index % 2 === 0 ? "bg-white" : "bg-[#fdfaf7]"
                  }`}
                >
                  <span className="font-semibold text-[var(--purple)]">{row[0]}</span>
                  <span className="text-[#1a1a2e]">{row[1]}</span>
                  <span className="text-[#e11d48]">{row[2]}</span>
                  <span className="font-bold">{row[3]}</span>
                  <span>
                    <span
                      className={`rounded-full px-2.5 py-[3px] text-[10px] font-bold ${
                        row[4] === "Quote"
                          ? "bg-[#eff6ff] text-[#1d4ed8]"
                          : "bg-[#d1fae5] text-[#065f46]"
                      }`}
                    >
                      {row[4]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "Accounting",
    "CRM",
    "HR Suite",
    "Inventory",
    "eCommerce",
    "Marketing",
    "Helpdesk",
    "AI Studio",
    "Subscribe",
    "Sign",
    "Project",
    "Knowledge",
    "Point of Sale",
    "Website",
  ];

  return (
    <div className="overflow-hidden bg-[var(--purple)] py-3">
      <div className="flex w-max animate-[marqueeLeft_32s_linear_infinite]">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap px-8 font-hand text-base font-semibold text-white opacity-90"
          >
            {item} <span className="text-xs opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function AppsSection() {
  const [altsOn, setAltsOn] = useState(false);
  const rows = [0, 1, 2, 3].map((rowIndex) => APPS.slice(rowIndex * 6, rowIndex * 6 + 6));

  const monogram = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] px-6 py-[100px]">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,40 C220,120 360,20 560,90 C760,160 920,60 1200,140"
            fill="none"
            stroke="var(--purple)"
            strokeDasharray="6 10"
            strokeWidth="2"
            opacity=".28"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[920px] text-center">
        <div className="reveal">
          <SectionTag>✦ 50+ apps</SectionTag>
          <h2 className="mt-4 mb-2.5 font-hand text-[clamp(36px,5vw,62px)] font-bold leading-[1.1] text-[#1a1a2e]">
            Imagine <HandText>without</HandText> Adon ERP
          </h2>
          <p className="mx-auto mb-12 max-w-[460px] font-body text-[15px] leading-[1.7] text-[var(--muted)]">
            Each app simplifies a process. Toggle to see what you'd need instead.
          </p>
        </div>

        <div className={`reveal mx-auto max-w-[860px] transition-[padding-top] duration-300 ${altsOn ? "pt-11" : "pt-0"}`}>
          {rows.map((row, rowIndex) => {
            const track = [...row, ...row];
            const direction = rowIndex % 2 === 0 ? "marquee-right" : "marquee-left";

            return (
              <div
                key={rowIndex}
                className="mb-3 overflow-hidden rounded-[14px] border border-dashed border-[#d8cbbe] bg-white/50"
              >
                <div className={`flex w-max gap-3 p-2 ${direction}`}>
                  {track.map((app, cardIndex) => {
                    const alt = ALTS[app.name];
                    return (
                      <div
                        key={`${rowIndex}-${app.name}-${cardIndex}`}
                        className="relative min-w-[132px] cursor-pointer overflow-visible rounded-2xl border-[1.5px] border-[#f0edf4] bg-white px-3 py-[18px] text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.04] hover:border-[#714b6733] hover:shadow-[0_16px_40px_#714b6715]"
                      >
                        {alt && altsOn && (
                          <div className="absolute -top-[38px] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#714b6733] bg-white px-2 py-[3px] font-hand text-[10px] italic text-[var(--purple)]">
                            {alt}
                            <div className="absolute -bottom-[5px] left-1/2 h-1.5 w-px -translate-x-1/2 bg-[var(--purple)]" />
                          </div>
                        )}

                        <div
                          className="relative mx-auto mb-2.5 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_14px_28px_#0000000a]"
                          style={{ border: `1px solid ${app.color}` }}
                        >
                          <svg
                            width="62"
                            height="62"
                            viewBox="0 0 62 62"
                            className="pointer-events-none absolute -inset-[3px]"
                          >
                            <path
                              d="M10,22 C14,10 27,7 34,10 C45,14 54,24 52,36 C50,49 39,55 27,52 C16,49 6,35 10,22 Z"
                              fill={`${app.color}33`}
                              stroke={app.color}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.3"
                            />
                          </svg>
                          <span className="relative z-10 font-hand text-[23px] font-extrabold leading-none tracking-normal text-[#1a1a2e]">
                            {monogram(app.name)}
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-[10px] border text-[13px] shadow-[0_10px_22px_#00000012] saturate-125"
                            style={{ background: app.color, borderColor: app.color }}
                          >
                            {app.icon}
                          </span>
                        </div>

                        <span className="font-body text-xs font-extrabold uppercase tracking-[0.4px] text-[#55637a]">
                          {app.name}
                        </span>
                        <div
                          className={`mt-1.5 min-h-[18px] font-hand text-sm ${
                            altsOn && alt ? "text-[var(--purple)] opacity-100" : "text-[#8f8688] opacity-90"
                          }`}
                        >
                          {altsOn && alt ? alt : "Adon"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <a
          href="apps"
          className="mt-5 inline-block font-body text-[13px] font-bold text-[var(--purple)] no-underline"
        >
          View all 50+ apps ↗
        </a>
      </div>
    </section>
  );
}

function NativeAISection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f6f3ff_0%,#eef9ff_45%,#effdfb_100%)] px-6 py-[100px] text-center">
      <div className="pointer-events-none absolute -left-20 -top-20 h-[340px] w-[340px] rounded-full bg-[#714b6718] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-[60px] -right-20 h-80 w-80 rounded-full bg-[#02cfc318] blur-[60px]" />

      <div className="relative z-10">
        <SectionTag>Native AI</SectionTag>
        <h2 className="reveal mt-5 mb-10 font-hand text-[clamp(32px,5vw,58px)] font-bold leading-[1.2] text-[#1a1a2e]">
          Native AI across all your business
        </h2>

        <div className="reveal shadow-float mx-auto max-w-[680px] rounded-3xl border border-white bg-white/80 px-6 py-11 backdrop-blur-sm sm:px-12">
          <p className="font-hand text-[clamp(28px,4vw,48px)] font-semibold leading-[1.3] text-[#1a1a2e]">
            You use <span className="text-[var(--teal)]">Adon</span> to run your
          </p>
          <p className="mt-2 min-h-[1.4em] font-hand text-[clamp(28px,4vw,48px)] font-bold">
            <TypeWriter
              words={[
                "finances automatically",
                "subscriptions effortlessly",
                "operations seamlessly",
                "growth intelligently",
              ]}
            />
          </p>
          <div className="mx-auto mt-6 h-[3px] w-10 rounded-sm bg-[var(--purple)]" />
          <p className="mt-4 font-body text-sm leading-[1.7] text-[#475569]">
            Automate work, tailor features, perform deep research, and scale without limits.
          </p>
        </div>
      </div>
    </section>
  );
}

function LevelUpSection() {
  return (
    <section className="bg-white px-6 py-[100px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid items-center gap-[72px] lg:grid-cols-2">
          <div className="reveal">
            <SectionTag>✦ Performance</SectionTag>
            <h2 className="mt-4 font-hand text-[clamp(36px,5vw,56px)] font-bold leading-[1.15] text-[#1a1a2e]">
              Optimised for{" "}
              <HandText color="#bfdbfe" className="text-[#1d4ed8]">
                productivity
              </HandText>
            </h2>
            <p className="mt-5 font-body text-[15px] leading-[1.8] text-[var(--muted)]">
              Experience true speed. Sub-second data entry, smart AI, and a fast UI. All
              operations complete in less than 90ms.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                ["⚡", "90ms", "Average operation speed"],
                ["🧠", "Native AI", "Built into every workflow"],
                ["🔒", "SOC 2", "Enterprise-grade security"],
              ].map(([icon, value, label]) => (
                <div
                  key={value}
                  className="flex items-center gap-3.5 rounded-[14px] border border-[#eeedf2] bg-[var(--cream)] px-[18px] py-3.5"
                >
                  <span className="text-[22px]">{icon}</span>
                  <span className="font-body text-base font-extrabold text-[var(--purple)]">{value}</span>
                  <span className="font-body text-[13px] text-[var(--muted)]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal shadow-float overflow-hidden rounded-[20px] border border-[#eeedf2]">
            <div className="flex items-center gap-2.5 bg-[var(--purple)] px-5 py-3.5">
              <span className="text-base">✅</span>
              <span className="font-body text-sm font-bold text-white">Adon Project</span>
              <span className="ml-auto rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                Sprint 4
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 bg-[var(--gray-bg)] p-4">
              {[
                { col: "To Do", color: "#fef3c7", items: ["Design mockup", "User research", "API spec"] },
                { col: "In Progress", color: "#dbeafe", items: ["Auth flow", "Dashboard", "Mobile nav"] },
                { col: "Done", color: "#d1fae5", items: ["DB schema", "CI/CD", "Staging env"] },
              ].map((column) => (
                <div key={column.col}>
                  <div className="mb-2 font-body text-[10px] font-bold uppercase tracking-[1px] text-[var(--muted)]">
                    {column.col}
                  </div>
                  {column.items.map((item) => (
                    <div
                      key={item}
                      className="mb-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-[#1a1a2e]"
                      style={{ background: column.color }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border-[1.5px] border-[#eeedf2] bg-white p-7 transition hover:-translate-y-1 hover:border-[#714b6722] hover:shadow-[0_20px_60px_#714b6712] ${className}`}
    >
      {children}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="rounded-t-[48px] bg-[var(--gray-bg)] px-6 py-[100px]">
      <div className="mx-auto max-w-[960px]">
        <div className="reveal mb-12">
          <h2 className="max-w-[500px] font-hand text-[clamp(40px,6vw,68px)] font-bold leading-[1.1] text-[#1a1a2e]">
            All the <Circled color="var(--teal)">features</Circled>
            <br />
            done <HandText color="var(--teal)">right.</HandText>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} className={`reveal reveal-d${(index % 2) + 1}`}>
              <div className="flex items-start justify-between">
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[var(--purple-light)] text-[22px]">
                  {feature.icon}
                </div>
                <span className="text-base text-[#fbbf24]">★</span>
              </div>
              <h3 className="mt-[18px] mb-2 font-body text-base font-bold text-[#1a1a2e]">
                {feature.title}
              </h3>
              <p className="font-body text-[13px] leading-[1.7] text-[var(--muted)]">{feature.desc}</p>
            </FeatureCard>
          ))}
        </div>

        <a
          href="#"
          className="reveal mt-8 inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-[var(--purple)] no-underline"
        >
          See all features ↗
        </a>
      </div>
    </section>
  );
}

function EnterpriseSection() {
  const cards = [
    {
      icon: "🌍",
      title: "Open Source",
      desc: "Built on a community of 30k+ developers. Available in Community (free) and Enterprise editions.",
      badge: "Community",
    },
    {
      icon: "🔒",
      title: "No vendor lock-in",
      desc: "Your data stays yours. Self-host on any infrastructure or use our cloud — full flexibility.",
      badge: "Self-host",
    },
    {
      icon: "🤖",
      title: "Open Source + AI",
      desc: "Use Adon AI to develop with an ultra-cost-efficient mindset. All models trained on our source code.",
      badge: "40k+ apps",
    },
    {
      icon: "💰",
      title: "Fair pricing",
      desc: "No module pricing, no feature upselling, no long-term contracts — one transparent price per user.",
      badge: "Transparent",
    },
  ];

  return (
    <section className="bg-white px-6 py-[100px]">
      <div className="mx-auto max-w-[960px]">
        <div className="reveal mb-14">
          <SectionTag>✦ Enterprise grade</SectionTag>
          <h2 className="mt-4 font-hand text-[clamp(36px,5vw,60px)] font-bold leading-[1.15] text-[#1a1a2e]">
            Enterprise <Circled color="var(--teal)">software</Circled>
            <br />
            done right
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <FeatureCard key={card.title} className={`reveal reveal-d${(index % 2) + 1}`}>
              <div className="flex items-start justify-between">
                <div className="text-3xl">{card.icon}</div>
                <span className="rounded-full bg-[var(--purple-light)] px-2.5 py-1 font-body text-[11px] font-extrabold text-[var(--purple)]">
                  {card.badge}
                </span>
              </div>
              <h3 className="mt-4 mb-2 font-body text-base font-extrabold">{card.title}</h3>
              <p className="font-body text-[13px] leading-[1.7] text-[var(--muted)]">{card.desc}</p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-white px-6 py-[90px]">
      <div className="mx-auto max-w-[960px]">
        <div className="reveal mb-6">
          <SectionTag>✦ Trusted worldwide</SectionTag>
          <h2 className="mt-3.5 font-hand text-[clamp(34px,5vw,58px)] font-bold leading-[1.1] text-[#1a1a2e]">
            Scale with confidence
          </h2>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "15M+", label: "Businesses worldwide" },
            { value: "50+", label: "Integrated apps" },
            { value: "99.9%", label: "Uptime guaranteed" },
            { value: "4.8★", label: "Customer rating" },
          ].map((stat) => (
            <FeatureCard key={stat.label} className="reveal p-[22px] text-center">
              <div className="font-hand text-[42px] font-extrabold text-[var(--purple)]">{stat.value}</div>
              <div className="mt-1.5 font-body text-xs font-bold text-[var(--muted)]">{stat.label}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[var(--gray-bg)] px-6 py-[100px]">
      <div className="mx-auto max-w-[960px]">
        <div className="reveal mb-8">
          <SectionTag>✦ Stories</SectionTag>
          <h2 className="mt-3.5 font-hand text-[clamp(34px,5vw,58px)] font-bold leading-[1.1] text-[#1a1a2e]">
            Loved by teams
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <FeatureCard key={testimonial.name} className={`reveal reveal-d${index + 1} text-left`}>
              <div className="mb-4 text-[32px]">{testimonial.avatar}</div>
              <div className="mb-3 flex gap-0.5">
                {[...Array(testimonial.score)].map((_, starIndex) => (
                  <span key={starIndex} className="text-[#fbbf24]">
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-5 font-body text-sm italic leading-[1.8] text-[#475569]">
                "{testimonial.quote}"
              </p>
              <div className="font-body text-[13px] font-bold text-[var(--purple)]">{testimonial.name}</div>
              <div className="mt-0.5 font-body text-xs text-[var(--muted)]">{testimonial.role}</div>
            </FeatureCard>
          ))}
        </div>

        <div className="reveal shadow-float mt-6 flex items-start gap-6 rounded-[20px] bg-white px-6 py-9 text-left sm:px-10">
          <div className="shrink-0 font-serif text-[60px] leading-none text-[#fbbf24]">"</div>
          <div>
            <p className="font-body text-base leading-[1.8] text-[#475569]">
              Adon is so full of a software Army Knife. You can tailor it to your business
              requirements. This is one of the key reasons that has helped us implement Adon
              successfully.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--purple-light)] text-xl">
                👤
              </div>
              <div>
                <div className="font-body text-[13px] font-bold text-[#1a1a2e]">Richard Miles</div>
                <div className="font-body text-xs text-[var(--muted)]">
                  Training Manager, Enterprise Corp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--purple),#5a3854)] px-6 py-[100px] text-center">
      <div className="pointer-events-none absolute -left-[100px] -top-[100px] h-[300px] w-[300px] rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[260px] w-[260px] rounded-full bg-white/5" />
      <div className="relative z-10">
        <div className="mb-4 text-5xl">✨</div>
        <h2 className="reveal mb-5 font-hand text-[clamp(40px,7vw,80px)] font-bold leading-[1.1] text-white">
          Unleash
          <br />
          your growth potential
        </h2>
        <p className="reveal mx-auto mb-10 max-w-[460px] font-body text-base leading-[1.7] text-white/60">
          Build recurring revenue workflows with automated billing, renewals, payments, and customer
          retention inside Adon ERP.
        </p>
        <div className="reveal flex flex-wrap justify-center gap-3">
          <button className="rounded-[10px] bg-white px-8 py-[15px] font-body text-[15px] font-bold text-[var(--purple)] shadow-[0_8px_32px_#00000033] transition hover:-translate-y-0.5">
            Start now — it's free →
          </button>
          <button className="rounded-[10px] border-[1.5px] border-white/25 bg-transparent px-[22px] py-3 font-body text-[15px] font-semibold text-white transition hover:-translate-y-0.5">
            Contact Sales
          </button>
        </div>
        <p className="reveal mt-5 font-body text-xs text-white/35">
          Free trial · No credit card · Instant access
        </p>
      </div>
    </section>
  );
}

export default function AdonLandingPage() {
  useReveal();

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <style>{GLOBAL_CSS}</style>
      <Hero />
      <MarqueeStrip />
      <AppsSection />
      <NativeAISection />
      <LevelUpSection />
      <FeaturesSection />
      <EnterpriseSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}


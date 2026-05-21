"use client";

import { useEffect, useRef, useState } from "react";

// ─── FONTS & BASE STYLES ─────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; }

:root {
  --purple: #714b67;
  --purple-light: #f3eef1;
  --purple-dark: #5a3854;
  --teal: #02cfc3;
  --teal-dark: #02a6a6;
  --cream: #faf9f7;
  --gray-bg: #f3f4f7;
  --ink: #1a1a2e;
  --muted: #64748b;
  --hand: 'Caveat', 'Segoe Print', cursive;
  --body: 'Plus Jakarta Sans', system-ui, sans-serif;
}

body { font-family: var(--body); background: #fff; color: var(--ink); overflow-x: hidden; }

@keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes marqueeAnim { from { transform:translateX(0); } to { transform:translateX(-50%); } }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes scale-in { from{transform:scale(0.93);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.reveal { opacity:0; transform:translateY(28px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
.reveal.in { opacity:1; transform:translateY(0); }
.reveal-d1 { transition-delay:.1s; }
.reveal-d2 { transition-delay:.2s; }
.reveal-d3 { transition-delay:.3s; }

.app-card {
  background: #fff; border: 1.5px solid #f0edf4; border-radius: 16px;
  padding: 18px 12px; text-align: center;
  transition: all .25s cubic-bezier(.16,1,.3,1); cursor: pointer;
  position: relative; overflow: hidden;
}
.app-card:hover { transform:translateY(-6px) scale(1.04); border-color:#714b6733; box-shadow:0 16px 40px #714b6715; }

.feature-card {
  background: #fff; border: 1.5px solid #eeedf2; border-radius: 20px;
  padding: 28px; transition: all .3s; position: relative; overflow: hidden;
}
.feature-card:hover { transform:translateY(-5px); box-shadow:0 20px 60px #714b6712; border-color:#714b6722; }

.btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--purple); color:#fff; border:none; border-radius:10px; padding:13px 24px;
  font-family:var(--body); font-size:14px; font-weight:700; cursor:pointer; transition:all .2s;
  box-shadow:0 4px 20px #714b6730;
}
.btn-primary:hover { background:var(--purple-dark); transform:translateY(-2px); box-shadow:0 8px 28px #714b6740; }

.btn-outline {
  display:inline-flex; align-items:center; gap:8px;
  background:#fff; color:var(--ink); border:1.5px solid #e2dde8; border-radius:10px; padding:12px 22px;
  font-family:var(--body); font-size:14px; font-weight:600; cursor:pointer; transition:all .2s;
}
.btn-outline:hover { border-color:var(--purple); color:var(--purple); transform:translateY(-2px); }

.shadow-float { box-shadow: 0 30px 80px rgba(15,23,42,.10), 0 0 0 1px rgba(15,23,42,.04); }

.section-tag {
  display:inline-flex; align-items:center; gap:6px;
  background:var(--purple-light); color:var(--purple);
  border-radius:99px; padding:6px 14px; font-size:12px; font-weight:700; letter-spacing:.5px;
}

.toggle { width:44px; height:24px; border-radius:99px; border:none; cursor:pointer; position:relative; transition:background .25s; }
.toggle-thumb { position:absolute; top:3px; width:18px; height:18px; border-radius:50%; background:#fff; transition:left .25s; box-shadow:0 1px 3px #0002; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const APPS = [
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

const ALTS = {
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

const FEATURES = [
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

const TESTIMONIALS = [
  {
    name: "Fiona Laurent",
    role: "CEO, Floral Studio",
    quote:
      "Eden ERP cut our billing time by 70%. Every invoice runs itself now.",
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

// ─── THREE.JS HERO BACKGROUND ─────────────────────────────────────────────────
function ThreeBg() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => {
      if (!ref.current) return;
      const THREE = window.THREE;
      const W = ref.current.offsetWidth,
        H = ref.current.offsetHeight;
      const renderer = new THREE.WebGLRenderer({
        canvas: ref.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 500);
      cam.position.z = 60;

      // Soft particles
      const geo = new THREE.BufferGeometry();
      const N = 220;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 140;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
        const t = Math.random();
        if (t > 0.7) {
          col[i * 3] = 0.44;
          col[i * 3 + 1] = 0.3;
          col[i * 3 + 2] = 0.4;
        } else if (t > 0.4) {
          col[i * 3] = 0.02;
          col[i * 3 + 1] = 0.81;
          col[i * 3 + 2] = 0.76;
        } else {
          col[i * 3] = 0.92;
          col[i * 3 + 1] = 0.91;
          col[i * 3 + 2] = 0.94;
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

      let mx = 0,
        my = 0;
      const onMouse = (e) => {
        mx = (e.clientX / innerWidth - 0.5) * 2;
        my = -(e.clientY / innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);
      let rafId;
      const tick = (ts) => {
        rafId = requestAnimationFrame(tick);
        pts.rotation.y = ts * 0.00008 + mx * 0.04;
        pts.rotation.x = my * 0.03;
        tor.rotation.y = ts * 0.00012;
        tor.rotation.x = ts * 0.00006;
        tor2.rotation.z = ts * 0.00009;
        renderer.render(scene, cam);
      };
      rafId = requestAnimationFrame(tick);
      ref.current._cleanup = () => {
        cancelAnimationFrame(rafId);
        renderer.dispose();
        window.removeEventListener("mousemove", onMouse);
      };
    };
    document.head.appendChild(s);
    return () => {
      ref.current?._cleanup?.();
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── TYPEWRITER ────────────────────────────────────────────────────────────────
function TypeWriter({ words }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  useEffect(() => {
    let timeout,
      charIdx = 0,
      deleting = false;
    const word = words[wi];
    const step = () => {
      if (!deleting) {
        charIdx++;
        setText(word.slice(0, charIdx));
        if (charIdx >= word.length) {
          deleting = true;
          timeout = setTimeout(step, 2200);
          return;
        }
        timeout = setTimeout(step, 55);
      } else {
        charIdx--;
        setText(word.slice(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          setWi((p) => (p + 1) % words.length);
          return;
        }
        timeout = setTimeout(step, 32);
      }
    };
    timeout = setTimeout(step, 400);
    return () => clearTimeout(timeout);
  }, [wi]);
  return (
    <span
      style={{
        color: "var(--purple)",
        fontFamily: "var(--hand)",
        fontSize: "inherit",
      }}
    >
      {text}
      <span style={{ animation: "blink 1s infinite", fontWeight: 300 }}>|</span>
    </span>
  );
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── WAVY UNDERLINE ────────────────────────────────────────────────────────────
const Wavy = ({ color = "#fde68a" }) => (
  <svg
    width="100%"
    height="10"
    viewBox="0 0 200 10"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      bottom: -3,
      left: 0,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <path
      d="M0,6 Q25,1 50,6 Q75,11 100,6 Q125,1 150,6 Q175,11 200,6"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const HandText = ({ children, color = "#fde68a", style: sx = {} }) => (
  <span style={{ position: "relative", display: "inline-block", ...sx }}>
    <Wavy color={color} />
    <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
  </span>
);

const Circled = ({ children, color = "#02cfc3" }) => (
  <span
    style={{ position: "relative", display: "inline-block", padding: "0 8px" }}
  >
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <ellipse
        cx="50%"
        cy="50%"
        rx="51%"
        ry="52%"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="5 3"
        style={{ transform: "rotate(-2deg)", transformOrigin: "center" }}
      />
    </svg>
    <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
  </span>
);

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      <ThreeBg />
      {/* soft cream blobs */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "#f3eef122",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 60,
          right: -100,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#02cfc30a",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div className="reveal" style={{ animation: "fadeIn .6s both" }}>
          <span className="section-tag">
            ✦ All your business on one platform
          </span>
        </div>

        <h1
          className="reveal reveal-d1"
          style={{
            fontFamily: "var(--hand)",
            fontSize: "clamp(52px,8vw,96px)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
            color: "#1a1a2e",
            letterSpacing: -1,
          }}
        >
          Simple, efficient,
          <br />
          yet{" "}
          <HandText color="#fde68a">
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

        <p
          className="reveal reveal-d2"
          style={{
            fontFamily: "var(--body)",
            fontSize: 18,
            color: "var(--muted)",
            maxWidth: 520,
            margin: "20px auto 0",
            lineHeight: 1.7,
          }}
        >
          One click install. No complexity, no code — just a single platform
          that empowers every person in your business.
        </p>

        <div
          className="reveal reveal-d3"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary"
            style={{ fontSize: 15, padding: "15px 32px" }}
          >
            Start now — it's free →
          </button>
          <button className="btn-outline" style={{ fontSize: 15 }}>
            ▶ Watch demo
          </button>
        </div>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--body)",
            fontSize: 12,
            color: "#aaa",
            marginTop: 12,
          }}
        >
          US$ 9.99/month · All apps · No credit card required
        </p>

        {/* App preview mockup */}
        <div
          className="reveal shadow-float"
          style={{
            marginTop: 56,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #eeedf2",
            background: "#fff",
            animation: "scale-in .8s .5s both",
          }}
        >
          <div
            style={{
              background: "#f8f5f2",
              borderBottom: "1px solid #ede8e0",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                background: "#ede8e0",
                borderRadius: 6,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: "#999",
              }}
            >
              eden-erp.com/subscriptions
            </div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>
                🔄 Subscriptions
              </span>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 99,
                  padding: "4px 10px",
                }}
              >
                ● Active billing
              </span>
            </div>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #f0eae0",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 110px 110px 100px",
                  background: "#f8f5f0",
                  padding: "9px 16px",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#999",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {["ID", "Customer", "Next Bill", "Revenue", "Status"].map(
                  (h) => (
                    <span key={h}>{h}</span>
                  ),
                )}
              </div>
              {[
                ["S-0016", "Sophia Thomas", "09/25/2026", "$350/mo", "Active"],
                ["S-0017", "Bright Studio", "10/12/2026", "$1,250/mo", "Quote"],
                ["S-0018", "Green Valley", "10/20/2026", "$650/mo", "Active"],
                ["S-0019", "Nova Retail", "11/01/2026", "$2,400/mo", "Active"],
              ].map((row, i) => (
                <div
                  key={row[0]}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 110px 110px 100px",
                    padding: "11px 16px",
                    fontSize: 12,
                    background: i % 2 === 0 ? "#fff" : "#fdfaf7",
                    borderTop: "1px solid #f0eae0",
                  }}
                >
                  <span style={{ color: "var(--purple)", fontWeight: 600 }}>
                    {row[0]}
                  </span>
                  <span style={{ color: "#1a1a2e" }}>{row[1]}</span>
                  <span style={{ color: "#e11d48" }}>{row[2]}</span>
                  <span style={{ fontWeight: 700 }}>{row[3]}</span>
                  <span>
                    <span
                      style={{
                        background: row[4] === "Quote" ? "#eff6ff" : "#d1fae5",
                        color: row[4] === "Quote" ? "#1d4ed8" : "#065f46",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
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

// ─── MARQUEE ───────────────────────────────────────────────────────────────────
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
  const d = [...items, ...items];
  return (
    <div
      style={{
        background: "var(--purple)",
        padding: "12px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marqueeAnim 32s linear infinite",
          width: "max-content",
        }}
      >
        {d.map((it, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--hand)",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              padding: "0 32px",
              whiteSpace: "nowrap",
              opacity: 0.9,
            }}
          >
            {it} <span style={{ opacity: 0.4, fontSize: 12 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── APPS GRID ─────────────────────────────────────────────────────────────────
function AppsSection() {
  const [altsOn, setAltsOn] = useState(false);
  const rows = [0, 1, 2, 3].map((rowIndex) =>
    APPS.slice(rowIndex * 6, rowIndex * 6 + 6),
  );
  const monogram = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? "")
      .join("");
  return (
    <section
      style={{
        background: "var(--cream)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.35,
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,40 C220,120 360,20 560,90 C760,160 920,60 1200,140"
            fill="none"
            stroke="var(--purple)"
            strokeWidth="2"
            strokeDasharray="6 10"
            opacity=".28"
          />
        </svg>
      </div>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <div className="reveal">
          <span className="section-tag">✦ 50+ apps</span>
          <h2
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(36px,5vw,62px)",
              fontWeight: 700,
              color: "#1a1a2e",
              marginTop: 16,
              marginBottom: 10,
              lineHeight: 1.1,
            }}
          >
            Imagine <HandText color="#fde68a">without</HandText> Eden ERP
          </h2>
          <p
            style={{
              fontFamily: "var(--body)",
              color: "var(--muted)",
              fontSize: 15,
              maxWidth: 460,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Each app simplifies a process. Toggle to see what you'd need
            instead.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            maxWidth: 860,
            margin: "0 auto",
            paddingTop: altsOn ? 44 : 0,
            transition: "padding-top .3s",
          }}
        >
          {rows.map((row, rowIndex) => {
            return (
              <div
                key={rowIndex}
                style={{
                  overflow: "hidden",
                  marginBottom: 12,
                  borderRadius: 14,
                  border: "1px dashed #d8cbbe",
                  background: "#ffffff80",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, minmax(112px, 1fr))",
                    gap: 12,
                    minWidth: 860,
                    padding: 8,
                  }}
                >
                  {row.map((app, cardIndex) => {
                    const alt = ALTS[app.name];
                    return (
                      <div
                        key={`${rowIndex}-${cardIndex}`}
                        className="app-card"
                      >
                        {alt && altsOn && (
                          <div
                            style={{
                              position: "absolute",
                              top: -38,
                              left: "50%",
                              transform: "translateX(-50%)",
                              whiteSpace: "nowrap",
                              background: "#fff",
                              border: "1px solid #714b6733",
                              borderRadius: 6,
                              padding: "3px 8px",
                              fontSize: 10,
                              fontFamily: "var(--hand)",
                              fontStyle: "italic",
                              color: "var(--purple)",
                              zIndex: 10,
                            }}
                          >
                            {alt}
                            <div
                              style={{
                                position: "absolute",
                                bottom: -5,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 1,
                                height: 6,
                                background: "var(--purple)",
                              }}
                            />
                          </div>
                        )}
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: "white",
                            display: "grid",
                            placeItems: "center",
                            margin: "0 auto 10px",
                            position: "relative",
                            boxShadow: "0 14px 28px #0000000a",
                            border: `1px solid ${app.color}`,
                          }}
                        >
                          <svg
                            width="62"
                            height="62"
                            viewBox="0 0 62 62"
                            style={{
                              position: "absolute",
                              inset: -3,
                              pointerEvents: "none",
                            }}
                          >
                            <path
                              d="M10,22 C14,10 27,7 34,10 C45,14 54,24 52,36 C50,49 39,55 27,52 C16,49 6,35 10,22 Z"
                              fill={`${app.color}33`}
                              stroke={app.color}
                              strokeWidth="2.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            style={{
                              fontFamily: "var(--hand)",
                              fontSize: 23,
                              fontWeight: 800,
                              color: "#1a1a2e",
                              letterSpacing: 0,
                            }}
                          >
                            {monogram(app.name)}
                          </span>
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              right: -6,
                              bottom: -6,
                              width: 24,
                              height: 24,
                              borderRadius: 10,
                              background: app.color,
                              border: `1px solid ${app.color}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              boxShadow: "0 10px 22px #00000012",
                              filter: "saturate(1.25)",
                            }}
                          >
                            {app.icon}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            letterSpacing: 0.4,
                            color: "#55637a",
                            textTransform: "uppercase",
                            fontFamily: "var(--body)",
                          }}
                        >
                          {app.name}
                        </span>
                        <div
                          style={{
                            marginTop: 6,
                            fontFamily: "var(--hand)",
                            fontSize: 14,
                            minHeight: 18,
                            color: altsOn && alt ? "var(--purple)" : "#8f8688",
                            opacity: altsOn && alt ? 1 : 0.9,
                          }}
                        >
                          {altsOn && alt ? alt : "Eden"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div onClick={() => setAltsOn(!altsOn)} style={{ cursor: "pointer" }}>
            <div
              className="toggle"
              style={{ background: altsOn ? "var(--purple)" : "#d9cebd" }}
            >
              <div className="toggle-thumb" style={{ left: altsOn ? 23 : 3 }} />
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--purple)",
            }}
          >
            {altsOn ? "Imagine without Eden ERP ✦" : "Compare alternatives"}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── NATIVE AI ─────────────────────────────────────────────────────────────────
function NativeAISection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,#f6f3ff 0%, #eef9ff 45%, #effdfb 100%)",
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "-80px",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "#714b6718",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-80px",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#02cfc318",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          className="section-tag reveal"
          style={{
            background: "#ffffff12",
            color: "#fff",
            border: "1px solid #ffffff22",
          }}
        >
          🤖 Native AI
        </span>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--hand)",
            fontSize: "clamp(32px,5vw,58px)",
            fontWeight: 700,
            color: "#1a1a2e",
            marginTop: 20,
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          Native AI across all your business
        </h2>
        <div
          className="reveal shadow-float"
          style={{
            maxWidth: 680,
            margin: "0 auto",
            background: "#ffffffcc",
            backdropFilter: "blur(14px)",
            borderRadius: 24,
            border: "1px solid #ffffff",
            padding: "44px 48px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 600,
              color: "#1a1a2e",
              lineHeight: 1.3,
            }}
          >
            You use <span style={{ color: "var(--teal)" }}>Eden</span> to run
            your
          </p>
          <p
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              marginTop: 8,
              minHeight: "1.4em",
            }}
          >
            <TypeWriter
              words={[
                "finances automatically",
                "subscriptions effortlessly",
                "operations seamlessly",
                "growth intelligently",
              ]}
            />
          </p>
          <div
            style={{
              width: 40,
              height: 3,
              background: "var(--purple)",
              borderRadius: 2,
              margin: "24px auto 0",
            }}
          />
          <p
            style={{
              fontFamily: "var(--body)",
              color: "#475569",
              fontSize: 14,
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            Automate work, tailor features, perform deep research, and scale
            without limits.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── LEVEL UP SECTION ─────────────────────────────────────────────────────────
function LevelUpSection() {
  return (
    <section style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          <div className="reveal">
            <span className="section-tag">✦ Performance</span>
            <h2
              style={{
                fontFamily: "var(--hand)",
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 700,
                color: "#1a1a2e",
                marginTop: 16,
                lineHeight: 1.15,
              }}
            >
              Optimised for{" "}
              <HandText color="#bfdbfe" sx={{ color: "#1d4ed8" }}>
                productivity
              </HandText>
            </h2>
            <p
              style={{
                fontFamily: "var(--body)",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.8,
                marginTop: 20,
              }}
            >
              Experience true speed. Sub-second data entry, smart AI, and a fast
              UI. All operations complete in less than 90ms.
            </p>
            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                ["⚡", "90ms", "Average operation speed"],
                ["🧠", "Native AI", "Built into every workflow"],
                ["🔒", "SOC 2", "Enterprise-grade security"],
              ].map(([ico, val, lbl]) => (
                <div
                  key={val}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "var(--cream)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    border: "1px solid #eeedf2",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{ico}</span>
                  <span
                    style={{
                      fontFamily: "var(--body)",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "var(--purple)",
                    }}
                  >
                    {val}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Kanban mockup */}
          <div
            className="reveal shadow-float"
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #eeedf2",
            }}
          >
            <div
              style={{
                background: "var(--purple)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>✅</span>
              <span
                style={{
                  fontFamily: "var(--body)",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                Eden Project
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  background: "#ffffff22",
                  borderRadius: 99,
                  padding: "2px 10px",
                  fontSize: 11,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Sprint 4
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                padding: 16,
                background: "var(--gray-bg)",
              }}
            >
              {[
                {
                  col: "To Do",
                  color: "#fef3c7",
                  items: ["Design mockup", "User research", "API spec"],
                },
                {
                  col: "In Progress",
                  color: "#dbeafe",
                  items: ["Auth flow", "Dashboard", "Mobile nav"],
                },
                {
                  col: "Done",
                  color: "#d1fae5",
                  items: ["DB schema", "CI/CD", "Staging env"],
                },
              ].map((col) => (
                <div key={col.col}>
                  <div
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--muted)",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {col.col}
                  </div>
                  {col.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        background: col.color,
                        borderRadius: 8,
                        padding: "8px 10px",
                        marginBottom: 8,
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#1a1a2e",
                      }}
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

// ─── FEATURES ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        background: "var(--gray-bg)",
        padding: "100px 24px",
        borderRadius: "48px 48px 0 0",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(40px,6vw,68px)",
              fontWeight: 700,
              color: "#1a1a2e",
              lineHeight: 1.1,
              maxWidth: 500,
            }}
          >
            All the <Circled color="var(--teal)">features</Circled>
            <br />
            done <HandText color="var(--teal)">right.</HandText>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card reveal reveal-d${(i % 2) + 1}`}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: "var(--purple-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {f.icon}
                </div>
                <span style={{ color: "#fbbf24", fontSize: 16 }}>★</span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--body)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#1a1a2e",
                  marginTop: 18,
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="reveal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 32,
            fontFamily: "var(--body)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--purple)",
            textDecoration: "none",
          }}
        >
          See all features ↗
        </a>
      </div>
    </section>
  );
}

// ─── ENTERPRISE ────────────────────────────────────────────────────────────────
function EnterpriseSection() {
  return (
    <section style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <span className="section-tag">✦ Enterprise grade</span>
          <h2
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 700,
              color: "#1a1a2e",
              marginTop: 16,
              lineHeight: 1.15,
            }}
          >
            Enterprise <Circled color="var(--teal)">software</Circled>
            <br />
            done right
          </h2>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {[
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
              desc: "Use Eden AI to develop with an ultra-cost-efficient mindset. All models trained on our source code.",
              badge: "40k+ apps",
            },
            {
              icon: "💰",
              title: "Fair pricing",
              desc: "No module pricing, no feature upselling, no long-term contracts — one transparent price per user.",
              badge: "Transparent",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              className={`feature-card reveal reveal-d${(i % 2) + 1}`}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--body)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#1a1a2e",
                  marginBottom: 8,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {c.desc}
              </p>
              <span
                style={{
                  background: "var(--purple-light)",
                  color: "var(--purple)",
                  borderRadius: 99,
                  padding: "4px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {c.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ─────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section
      style={{
        background: "var(--purple)",
        padding: "72px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 64,
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {[
          ["15M+", "Businesses worldwide"],
          ["50+", "Integrated apps"],
          ["99.9%", "Uptime guaranteed"],
          ["4.8★", "Customer rating"],
        ].map(([v, l]) => (
          <div key={l} className="reveal">
            <div
              style={{
                fontFamily: "var(--hand)",
                fontSize: 52,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {v}
            </div>
            <div
              style={{
                fontFamily: "var(--body)",
                fontSize: 12,
                color: "#ffffff99",
                marginTop: 8,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section
      style={{
        background: "var(--cream)",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="reveal">
          <span className="section-tag">✦ Loved by teams worldwide</span>
          <h2
            style={{
              fontFamily: "var(--hand)",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 700,
              color: "#1a1a2e",
              marginTop: 16,
              marginBottom: 56,
              lineHeight: 1.15,
            }}
          >
            Join <HandText color="#fde68a">15 million</HandText> users
          </h2>
        </div>

        {/* Avatar scatter card */}
        <div
          className="reveal"
          style={{ position: "relative", height: 280, marginBottom: 40 }}
        >
          {["#714b67", "#714b67", "#02cfc3", "#714b67"].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 8,
                background: c,
                opacity: 0.15 + i * 0.1,
                left: `${15 + i * 18}%`,
                top: `${22 + i * 12}%`,
                transform: `rotate(${-12 + i * 8}deg)`,
              }}
            />
          ))}
          {["🌸", "🎯", "🌿", "⚡", "✨", "🎨", "🔥", "💡", "🦋", "🌊"].map(
            (e, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #eeedf2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxShadow: "0 4px 14px #0001",
                  left: `${5 + ((i * 13) % 82)}%`,
                  top: `${15 + ((i * 23) % 62)}%`,
                }}
              >
                {e}
              </div>
            ),
          )}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              background: "rgba(255,255,255,.92)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              padding: "28px 40px",
              boxShadow: "0 24px 80px #0000001a",
              textAlign: "center",
              minWidth: 280,
            }}
          >
            <p
              style={{
                fontFamily: "var(--hand)",
                fontSize: 34,
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.2,
              }}
            >
              Join 15 million users
            </p>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 13,
                color: "var(--muted)",
                marginTop: 8,
              }}
            >
              who grow their business with Eden
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`feature-card reveal reveal-d${i + 1}`}
              style={{ textAlign: "left" }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{t.avatar}</div>
              <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                {[...Array(t.score)].map((_, j) => (
                  <span key={j} style={{ color: "#fbbf24" }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                "{t.quote}"
              </p>
              <div
                style={{
                  fontFamily: "var(--body)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--purple)",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>

        {/* Featured quote */}
        <div
          className="reveal shadow-float"
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "36px 40px",
            textAlign: "left",
            marginTop: 24,
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 60,
              color: "#fbbf24",
              lineHeight: 1,
              fontFamily: "Georgia,serif",
              flexShrink: 0,
            }}
          >
            "
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 16,
                color: "#475569",
                lineHeight: 1.8,
              }}
            >
              Eden is so full of a software Army Knife. You can tailor it to
              your business requirements. This is one of the key reasons that
              has helped us implement Eden successfully.
            </p>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--purple-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                👤
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--body)",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#1a1a2e",
                  }}
                >
                  Richard Miles
                </div>
                <div
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
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

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg,var(--purple),#5a3854)",
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#ffffff08",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "#ffffff08",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--hand)",
            fontSize: "clamp(40px,7vw,80px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Unleash
          <br />
          your growth potential
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--body)",
            color: "#ffffff99",
            fontSize: 16,
            maxWidth: 460,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Build recurring revenue workflows with automated billing, renewals,
          payments, and customer retention inside Eden ERP.
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary"
            style={{
              background: "#fff",
              color: "var(--purple)",
              boxShadow: "0 8px 32px #00000033",
              fontSize: 15,
              padding: "15px 32px",
            }}
          >
            Start now — it's free →
          </button>
          <button
            className="btn-outline"
            style={{
              background: "transparent",
              color: "#fff",
              borderColor: "#ffffff44",
              fontSize: 15,
            }}
          >
            Contact Sales
          </button>
        </div>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--body)",
            fontSize: 12,
            color: "#ffffff55",
            marginTop: 20,
          }}
        >
          Free trial · No credit card · Instant access
        </p>
      </div>
    </section>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function EdenLandingPage() {
  useReveal();
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
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

"use client";

import React, { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const apps = [
  { name: "Accounting", icon: "📊", color: "#e8d5f5" },
  { name: "Knowledge",  icon: "📘", color: "#d5e8f5" },
  { name: "Sign",       icon: "✍️",  color: "#d5f5e8" },
  { name: "CRM",        icon: "🤝", color: "#f5e8d5" },
  { name: "Studio",     icon: "🛠️",  color: "#f5d5e8" },
  { name: "Subscribe",  icon: "🔄", color: "#e8f5d5" },
  { name: "AI",         icon: "🤖", color: "#f5f5d5" },
  { name: "Point Sale", icon: "🏪", color: "#d5f5f5" },
  { name: "Discuss",    icon: "💬", color: "#e8d5f5" },
  { name: "Documents",  icon: "📂", color: "#f5e8d5" },
  { name: "Project",    icon: "✅", color: "#d5e8f5" },
  { name: "Timesheets", icon: "⏱️",  color: "#d5f5e8" },
  { name: "Field Svc",  icon: "⚡", color: "#f5d5d5" },
  { name: "Planning",   icon: "🔀", color: "#d5d5f5" },
  { name: "Helpdesk",   icon: "➕", color: "#f5e8f5" },
  { name: "eCommerce",  icon: "🛍️",  color: "#e8f5e8" },
  { name: "Website",    icon: "🌐", color: "#f5f0d5" },
  { name: "Email Mktg", icon: "🚀", color: "#d5f0f5" },
  { name: "Purchase",   icon: "💳", color: "#f0d5f5" },
  { name: "Inventory",  icon: "📦", color: "#d5f5f0" },
  { name: "Manufactur", icon: "🏭", color: "#f5d5f0" },
  { name: "Sales",      icon: "📈", color: "#f0f5d5" },
  { name: "HR",         icon: "👥", color: "#d5e8f0" },
  { name: "Dashboard",  icon: "🎛️",  color: "#f0e8d5" },
];

const features = [
  { icon: "⚡", title: "Automated renewals", desc: "Renew contracts and invoices automatically without manual tracking." },
  { icon: "👤", title: "Customer portal",    desc: "Let customers view plans, invoices, and payment history securely." },
  { icon: "📄", title: "Recurring invoices", desc: "Generate invoices based on billing cycles and contract rules." },
  { icon: "💳", title: "Payment automation", desc: "Collect payments, retry failed charges, keep billing updated." },
  { icon: "📊", title: "Revenue analytics",  desc: "Track MRR, ARR, churn, renewals, and lifetime value." },
  { icon: "🛡️", title: "Retention flows",    desc: "Trigger smart follow-ups before renewals or cancellation risks." },
];

const testimonials = [
  { name: "Fiona Laurent", role: "CEO, Floral Studio", quote: "Eden ERP cut our billing time by 70%. Every invoice runs itself now.", avatar: "🌸" },
  { name: "James Park",    role: "CTO, Nova Retail",    quote: "The accounting module alone replaced three separate tools we used.", avatar: "🎯" },
  { name: "Amara Diallo",  role: "CFO, Green Valley",   quote: "We grew 3× without hiring extra finance staff. That says it all.",  avatar: "🌿" },
];

const stats = [
  { value: "15M+", label: "Businesses worldwide" },
  { value: "50+",  label: "Integrated apps" },
  { value: "99.9%",label: "Uptime guaranteed" },
  { value: "4.8★", label: "Customer rating" },
];

// ─── STYLE CONSTANTS ─────────────────────────────────────────────────────────

const PURPLE  = "#7C4A8C";
const PURPLE2 = "#5B3A89";
const CREAM   = "#FAF7F2";
const INK     = "#1C1117";
const MUTED   = "#7A6A72";

const serif  = '"Playfair Display", Georgia, serif';
const script = '"Dancing Script", "Segoe Print", cursive';
const sans   = '"DM Sans", "Inter", sans-serif';

// ─── TINY HELPERS ────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "#F3EDF7", color: PURPLE,
    borderRadius: 99, padding: "5px 14px",
    fontSize: 12, fontWeight: 600, letterSpacing: 1.2,
    textTransform: "uppercase", fontFamily: sans,
    border: `1px solid ${PURPLE}22`,
  }}>{children}</span>
);

const Btn = ({ children, primary, style = {}, ...rest }) => (
  <button {...rest} style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: primary ? "13px 28px" : "12px 26px",
    borderRadius: 12,
    background: primary ? `linear-gradient(135deg,${PURPLE},${PURPLE2})` : "white",
    color: primary ? "white" : INK,
    border: primary ? "none" : `1.5px solid ${INK}18`,
    fontFamily: sans, fontSize: 14, fontWeight: 600,
    cursor: "pointer",
    boxShadow: primary ? `0 8px 32px ${PURPLE}44` : "0 2px 8px #0002",
    transition: "transform .18s,box-shadow .18s",
    ...style,
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
  >{children}</button>
);

// Handwritten underline decoration
const Squiggle = ({ color = PURPLE }) => (
  <svg width="100%" height="10" viewBox="0 0 200 10" preserveAspectRatio="none"
    style={{ position: "absolute", bottom: -4, left: 0, pointerEvents: "none" }}>
    <path d="M0,7 Q25,2 50,7 Q75,12 100,7 Q125,2 150,7 Q175,12 200,7"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Highlighted = ({ children, color = "#FFE066" }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span style={{
      position: "absolute", left: -4, right: -4, bottom: 0,
      height: "40%", background: color, zIndex: 0, borderRadius: 4,
    }} />
    <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
  </span>
);

const Circled = ({ children }) => (
  <span style={{ position: "relative", display: "inline-block", padding: "0 10px" }}>
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }}>
      <ellipse cx="50%" cy="50%" rx="49%" ry="48%" fill="none"
        stroke={PURPLE} strokeWidth="2.5" strokeDasharray="4 2"
        style={{ transform: "rotate(-3deg)", transformOrigin:"center" }} />
    </svg>
    <span style={{ position:"relative", zIndex:1 }}>{children}</span>
  </span>
);

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{
      background: CREAM, textAlign:"center",
      padding: "80px 48px 60px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Background blobs */}
      {[
        { top:-120, left:-80, size:420, color:"#E8D5F5" },
        { top:40, right:-100, size:300, color:"#D5E8F5" },
        { bottom:-60, left:"30%", size:260, color:"#F5E8D5" },
      ].map((b,i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width:b.size, height:b.size,
          top:b.top, left:b.left, right:b.right, bottom:b.bottom,
          background:b.color, filter:"blur(60px)", opacity:.55,
          pointerEvents:"none",
        }} />
      ))}

      <div style={{ position:"relative", zIndex:1 }}>
        <Eyebrow>✦ All your business on one platform</Eyebrow>

        <h1 style={{
          fontFamily: serif,
          fontSize: "clamp(44px, 6vw, 80px)",
          fontWeight: 700,
          color: INK,
          lineHeight: 1.1,
          marginTop: 28,
          letterSpacing: -2,
        }}>
          Simple, efficient,<br />
          yet{" "}
          <span style={{ position:"relative", display:"inline-block", color: PURPLE }}>
            <Squiggle color={PURPLE} />
            affordable.
          </span>
        </h1>

        <p style={{
          fontFamily: sans, fontSize: 18, color: MUTED,
          maxWidth: 520, margin: "22px auto 0", lineHeight: 1.7,
        }}>
          One click install. No complexity, no code — just a single platform
          that empowers every person in your business.
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:36, flexWrap:"wrap" }}>
          <Btn primary style={{ fontSize:15, padding:"15px 32px" }}>Start Free Trial →</Btn>
          <Btn style={{ fontSize:15 }}>▶ Watch demo</Btn>
        </div>

        <p style={{ fontFamily:sans, fontSize:12, color:MUTED, marginTop:14 }}>
          US$ 9.99 / month · for All apps · No credit card required
        </p>

        {/* Hero preview card */}
        <div style={{
          marginTop: 56, maxWidth: 860, marginInline:"auto",
          background:"white", borderRadius: 24,
          boxShadow: "0 40px 100px #0000001a, 0 0 0 1px #0000000a",
          overflow:"hidden",
        }}>
          {/* Fake browser bar */}
          <div style={{
            background:"#F8F5F0", borderBottom:"1px solid #E8E0D8",
            padding:"10px 18px", display:"flex", alignItems:"center", gap:8,
          }}>
            <div style={{ display:"flex", gap:6 }}>
              {["#F87171","#FBBF24","#34D399"].map(c=>(
                <div key={c} style={{ width:12, height:12, borderRadius:"50%", background:c }} />
              ))}
            </div>
            <div style={{
              flex:1, background:"#EDE8E0", borderRadius:6, height:24,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontFamily:sans, color:MUTED,
            }}>eden-erp.com/subscriptions</div>
          </div>

          {/* Mini table */}
          <div style={{ padding:"24px 28px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontFamily:sans, fontWeight:700, fontSize:15, color:INK }}>🔄 Eden Subscriptions</span>
              <span style={{ background:"#D1FAE5", color:"#065F46", fontSize:11, fontWeight:700, borderRadius:99, padding:"4px 10px" }}>● Active billing</span>
            </div>
            <div style={{ borderRadius:12, overflow:"hidden", border:"1px solid #F0EAE0" }}>
              <div style={{
                display:"grid", gridTemplateColumns:"80px 1fr 110px 110px 100px",
                background:"#F8F5F0", padding:"10px 16px",
                fontSize:10, fontFamily:sans, fontWeight:700, color:MUTED,
                letterSpacing:1, textTransform:"uppercase",
              }}>
                {["ID","Customer","Next Bill","Revenue","Status"].map(h=><span key={h}>{h}</span>)}
              </div>
              {[
                ["S00016","Sophia Thomas","09/25/2026","$350/mo","Active"],
                ["S00017","Bright Studio","10/12/2026","$1,250/mo","Quote"],
                ["S00018","Green Valley","10/20/2026","$650/mo","Active"],
                ["S00019","Nova Retail","11/01/2026","$2,400/mo","Active"],
              ].map((row,i)=>(
                <div key={row[0]} style={{
                  display:"grid", gridTemplateColumns:"80px 1fr 110px 110px 100px",
                  padding:"11px 16px", fontSize:12, fontFamily:sans,
                  background: i%2===0 ? "white" : "#FDFAF7",
                  borderTop:"1px solid #F0EAE0",
                }}>
                  <span style={{ color:PURPLE, fontWeight:600 }}>{row[0]}</span>
                  <span style={{ color:INK }}>{row[1]}</span>
                  <span style={{ color:"#E11D48" }}>{row[2]}</span>
                  <span style={{ fontWeight:700, color:INK }}>{row[3]}</span>
                  <span>
                    <span style={{
                      background: row[4]==="Quote" ? "#EFF6FF" : "#D1FAE5",
                      color: row[4]==="Quote" ? "#1D4ED8" : "#065F46",
                      borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700,
                    }}>{row[4]}</span>
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

function AppsGrid() {
  const [altsOn, setAltsOn] = useState(false);

  const alts = {
    "Accounting":"Quickbooks","Knowledge":"Notion","Sign":"DocuSign",
    "CRM":"Salesforce","Subscribe":"Chargebee","Point Sale":"Lightspeed",
    "Discuss":"Slack","Project":"Asana","Timesheets":"Harvest",
    "Field Svc":"Service Cloud","Helpdesk":"Zendesk","eCommerce":"Shopify",
    "Email Mktg":"Hubspot","HR":"BambooHR","Dashboard":"Tableau",
  };

  return (
    <section style={{ background: CREAM, padding:"80px 48px", textAlign:"center" }}>
      <Eyebrow>✦ 50+ apps</Eyebrow>
      <h2 style={{
        fontFamily:serif, fontSize:"clamp(32px,4vw,54px)", fontWeight:700,
        color:INK, marginTop:20, marginBottom:8, letterSpacing:-1,
      }}>
        Imagine{" "}
        <Highlighted color="#FFE066">without</Highlighted>
        {" "}Eden ERP
      </h2>
      <p style={{ fontFamily:sans, color:MUTED, fontSize:15, maxWidth:480, margin:"0 auto 48px", lineHeight:1.7 }}>
        Each app simplifies a process and empowers more people.
        Toggle to see what you'd replace each one with.
      </p>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(6, 1fr)",
        columnGap: 16,
        rowGap: altsOn ? 58 : 24,
        maxWidth: 820, margin:"0 auto",
        paddingTop: altsOn ? 44 : 0,
        transition:"row-gap .3s ease, padding-top .3s ease",
        position:"relative",
      }}>
        {apps.map((app,i) => {
          const alt = alts[app.name];
          return (
            <div key={i} style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:8,
              position:"relative", cursor:"pointer",
            }}>
              {/* Alt badge */}
              {alt && (
                <div style={{
                  position:"absolute", top:-38, left:"50%",
                  transform:"translateX(-50%)",
                  whiteSpace:"nowrap", padding:"3px 10px",
                  borderRadius:4, fontSize:10, fontFamily:serif,
                  fontStyle:"italic", color:PURPLE,
                  border:`1px solid ${PURPLE}55`,
                  background:CREAM, zIndex:20,
                  opacity: altsOn ? 1 : 0,
                  pointerEvents:"none",
                  transition:"opacity .25s",
                }}>
                  {alt}
                  <div style={{
                    position:"absolute", bottom:-5, left:"50%",
                    transform:"translateX(-50%)",
                    width:1, height:6, background:PURPLE,
                  }} />
                </div>
              )}
              {/* Icon */}
              <div style={{
                width:68, height:68, borderRadius:12,
                background: app.color,
                border:`1.5px solid ${app.color}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:26, position:"relative",
                boxShadow:`4px 4px 0 ${app.color}88`,
                transition:"transform .2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px) rotate(-2deg)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
              >
                {app.icon}
              </div>
              <span style={{
                fontSize:10, fontWeight:600, letterSpacing:.5,
                color:MUTED, textAlign:"center", textTransform:"uppercase",
                fontFamily:sans,
              }}>{app.name}</span>
            </div>
          );
        })}
      </div>

      {/* SAP line */}
      <div style={{
        maxWidth:820, margin:"28px auto 0",
        opacity: altsOn ? 1 : 0, transition:"opacity .35s",
        display:"flex", alignItems:"center", gap:16,
        fontFamily:serif, fontStyle:"italic", fontSize:18, color:PURPLE,
      }}>
        <div style={{ flex:1, height:1, background:`linear-gradient(to right,transparent,${PURPLE}44)` }} />
        ↙ replaces SAP ↘
        <div style={{ flex:1, height:1, background:`linear-gradient(to left,transparent,${PURPLE}44)` }} />
      </div>

      {/* Toggle */}
      <div style={{ marginTop:44, display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
        <div onClick={()=>setAltsOn(!altsOn)} style={{
          width:48, height:26, borderRadius:13,
          background: altsOn ? PURPLE : "#D9CEBD",
          border:`1px solid ${altsOn?PURPLE:"#B8A89A"}`,
          position:"relative", cursor:"pointer", transition:"background .25s",
        }}>
          <div style={{
            position:"absolute", top:4, left: altsOn?26:4,
            width:16, height:16, borderRadius:"50%",
            background:"white", transition:"left .25s",
            boxShadow:"0 1px 3px #0003",
          }} />
        </div>
        <span style={{ fontFamily:sans, fontSize:13, fontWeight:600, color:PURPLE }}>
          {altsOn ? "Imagine without Eden ERP ✦" : "Compare alternatives"}
        </span>
      </div>

      <a href="#" style={{
        display:"inline-block", marginTop:20,
        fontFamily:sans, fontSize:13, color:PURPLE, fontWeight:600,
        textDecoration:"none", letterSpacing:1,
      }}>View all 50+ apps ↗</a>
    </section>
  );
}

function LevelUp() {
  return (
    <section style={{ background:"white", padding:"100px 48px", textAlign:"center" }}>
      <h2 style={{
        fontFamily:script, fontSize:"clamp(36px,5vw,64px)",
        color:INK, marginBottom:48, lineHeight:1.2,
      }}>
        <span style={{ color:PURPLE, textDecoration:"underline", textDecorationStyle:"wavy", textDecorationColor:PURPLE }}>Level up</span>
        {" "}your quality of work
      </h2>

      {/* Fake storefront cards */}
      <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
        {[
          { name:"Monkey Coffee Lab", emoji:"☕", bg:"#1C1117", fg:"white", tag:"Café & Roasters" },
          { name:"Fiona's Floral Cafe", emoji:"🌸", bg:"#FDF4F0", fg:INK, tag:"Flower Boutique" },
          { name:"Nova Tech Studio",   emoji:"💻", bg:"#0F172A", fg:"white", tag:"Software Agency" },
        ].map(s=>(
          <div key={s.name} style={{
            background:s.bg, color:s.fg,
            borderRadius:20, padding:"32px 28px", width:220,
            boxShadow:"0 20px 60px #0000001a",
            textAlign:"left",
          }}>
            <div style={{ fontSize:36, marginBottom:12 }}>{s.emoji}</div>
            <div style={{ fontFamily:serif, fontSize:16, fontWeight:700, marginBottom:4 }}>{s.name}</div>
            <div style={{ fontSize:11, opacity:.5, fontFamily:sans, letterSpacing:1, textTransform:"uppercase" }}>{s.tag}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop:48, display:"inline-flex", alignItems:"center", gap:12,
        background:"#F3EDF7", borderRadius:16, padding:"16px 24px",
        border:`1px solid ${PURPLE}22`,
      }}>
        <span style={{ fontSize:24 }}>🤖</span>
        <div style={{ textAlign:"left" }}>
          <div style={{ fontFamily:sans, fontWeight:700, color:INK, fontSize:14 }}>
            Eden AI — Your smartest employee
          </div>
          <div style={{ fontFamily:sans, color:MUTED, fontSize:12, marginTop:2 }}>
            Native AI across all your business operations
          </div>
        </div>
      </div>
    </section>
  );
}

function Productivity() {
  return (
    <section style={{ background:CREAM, padding:"100px 48px" }}>
      <div style={{ maxWidth:960, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
        <div>
          <Eyebrow>✦ Performance</Eyebrow>
          <h2 style={{
            fontFamily:script, fontSize:"clamp(32px,4vw,52px)",
            color:INK, marginTop:20, lineHeight:1.2,
          }}>
            Optimised for{" "}
            <span style={{ color:PURPLE }}>productivity</span>
          </h2>
          <p style={{ fontFamily:sans, color:MUTED, fontSize:15, lineHeight:1.8, marginTop:18 }}>
            Experience true speed. Sub-second data entry, smart AI, and a fast UI.
            All operations are done in less than 90ms — faster than a blink.
          </p>
          <div style={{ marginTop:32, display:"flex", flexDirection:"column", gap:14 }}>
            {[
              ["⚡","90ms","Average operation speed"],
              ["🧠","Native AI","Built into every workflow"],
              ["🔒","SOC 2","Enterprise-grade security"],
            ].map(([ico,val,lbl])=>(
              <div key={val} style={{
                display:"flex", alignItems:"center", gap:14,
                background:"white", borderRadius:12, padding:"14px 18px",
                border:"1px solid #E8E0D8",
              }}>
                <span style={{ fontSize:22 }}>{ico}</span>
                <span style={{ fontFamily:sans, fontWeight:800, fontSize:16, color:PURPLE }}>{val}</span>
                <span style={{ fontFamily:sans, fontSize:13, color:MUTED }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: fake kanban */}
        <div style={{
          background:"white", borderRadius:20, overflow:"hidden",
          boxShadow:"0 30px 80px #0000001a", border:"1px solid #E8E0D8",
        }}>
          <div style={{ background:PURPLE, padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:16 }}>✅</span>
            <span style={{ fontFamily:sans, fontWeight:700, color:"white", fontSize:14 }}>Eden Project</span>
            <span style={{ marginLeft:"auto", background:"white22", borderRadius:99, padding:"2px 10px", fontSize:11, color:"white", fontWeight:600 }}>Sprint 4</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, padding:16 }}>
            {[
              { col:"To Do", color:"#FEF3C7", items:["Design mockup","User research","API spec"] },
              { col:"In Progress", color:"#DBEAFE", items:["Auth flow","Dashboard","Mobile nav"] },
              { col:"Done", color:"#D1FAE5", items:["DB schema","CI/CD","Staging env"] },
            ].map(col=>(
              <div key={col.col}>
                <div style={{ fontFamily:sans, fontSize:10, fontWeight:700, color:MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>{col.col}</div>
                {col.items.map(item=>(
                  <div key={item} style={{
                    background:col.color, borderRadius:8, padding:"8px 10px",
                    marginBottom:8, fontSize:11, fontFamily:sans, fontWeight:500, color:INK,
                    boxShadow:"0 1px 4px #0001",
                  }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NativeAI() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { q:"You use Eden to run your", completions:["finances automatically","subscriptions effortlessly","operations seamlessly"] },
  ];
  useEffect(()=>{
    const t = setInterval(()=>setIdx(i=>(i+1)%3),2200);
    return ()=>clearInterval(t);
  },[]);

  return (
    <section style={{
      background:INK, padding:"100px 48px", textAlign:"center",
      position:"relative", overflow:"hidden",
    }}>
      {/* Noise texture */}
      <div style={{
        position:"absolute", inset:0, opacity:.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"200px",
      }} />
      <Eyebrow>🤖 Native AI</Eyebrow>
      <h2 style={{
        fontFamily:script, fontSize:"clamp(32px,5vw,60px)",
        color:"white", marginTop:24, marginBottom:16,
      }}>Native AI across all your business</h2>

      <div style={{
        maxWidth:700, margin:"48px auto",
        background:"#FFFFFF0F", backdropFilter:"blur(20px)",
        borderRadius:24, border:"1px solid #FFFFFF18",
        padding:"40px 48px",
      }}>
        <div style={{ fontFamily:serif, fontSize:"clamp(24px,3vw,40px)", color:"white", fontWeight:700, lineHeight:1.3 }}>
          You use{" "}
          <span style={{ color:PURPLE, fontStyle:"italic" }}>Eden</span>
          {" "}to run your
        </div>
        <div style={{
          fontFamily:serif, fontSize:"clamp(24px,3vw,40px)",
          color:"#FFE066", fontWeight:700, marginTop:8,
          minHeight:"1.4em",
          transition:"opacity .3s",
        }}>
          {["finances automatically","subscriptions effortlessly","operations seamlessly"][idx]}
        </div>
        <div style={{ width:40, height:3, background:PURPLE, borderRadius:2, margin:"24px auto 0" }} />
        <p style={{ fontFamily:sans, color:"#FFFFFF88", fontSize:14, marginTop:16, lineHeight:1.7 }}>
          Automate work, tailor features, perform deep research,
          and scale without limits.
        </p>
      </div>
    </section>
  );
}

function EnterpriseSection() {
  return (
    <section style={{ background:CREAM, padding:"100px 48px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <div style={{ marginBottom:56 }}>
          <Eyebrow>✦ Enterprise grade</Eyebrow>
          <h2 style={{
            fontFamily:script, fontSize:"clamp(36px,5vw,60px)",
            color:INK, marginTop:20, lineHeight:1.2,
          }}>
            Enterprise{" "}
            <Circled>software</Circled>
            <br />done right
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {[
            { icon:"🌍", title:"Open Source", desc:"Built on a community of 30k+ developers. Available in two editions: Community (free) and Enterprise.", badge:"Community" },
            { icon:"🔒", title:"No vendor lock-in", desc:"Your data stays yours. Self-host on any infrastructure or use our cloud — full flexibility.", badge:"Self-host" },
            { icon:"🤖", title:"Open Source + AI", desc:"Use Eden AI to develop in ultra-cost-efficient mindset. All models are already trained on our source code.", badge:"40k+ apps" },
            { icon:"💰", title:"Fair pricing", desc:"No module pricing, no feature upselling, no long-term contracts — all at a single price per user.", badge:"Transparent" },
          ].map(c=>(
            <div key={c.title} style={{
              background:"white", borderRadius:20, padding:"28px",
              border:"1px solid #E8E0D8",
              boxShadow:"0 4px 20px #0000000a",
              transition:"transform .2s, box-shadow .2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 48px #0000001a";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px #0000000a";}}
            >
              <div style={{ fontSize:32, marginBottom:16 }}>{c.icon}</div>
              <div style={{ fontFamily:sans, fontWeight:700, fontSize:16, color:INK, marginBottom:8 }}>{c.title}</div>
              <p style={{ fontFamily:sans, fontSize:13, color:MUTED, lineHeight:1.7, marginBottom:16 }}>{c.desc}</p>
              <span style={{
                background:"#F3EDF7", color:PURPLE,
                borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700,
                fontFamily:sans,
              }}>{c.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section style={{ background:"white", padding:"100px 48px", textAlign:"center" }}>
      <Eyebrow>✦ Features</Eyebrow>
      <h2 style={{
        fontFamily:script, fontSize:"clamp(32px,4vw,54px)",
        color:INK, marginTop:20, letterSpacing:-1,
      }}>
        All the features,{" "}
        <span style={{ position:"relative", display:"inline-block" }}>
          <Squiggle color="#FFE066" />
          <span style={{ position:"relative", zIndex:1 }}>done right.</span>
        </span>
      </h2>

      <div style={{
        display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20,
        maxWidth:900, margin:"56px auto 0",
      }}>
        {features.map(f=>(
          <div key={f.title} style={{
            background:CREAM, borderRadius:20, padding:"28px",
            border:"1px solid #E8E0D8", textAlign:"left",
            transition:"transform .2s, box-shadow .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 48px #0000001a";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
          >
            <div style={{
              width:44, height:44, borderRadius:12, background:"white",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, marginBottom:16,
              boxShadow:"0 4px 12px #0000000f",
            }}>{f.icon}</div>
            <div style={{ fontFamily:sans, fontWeight:700, fontSize:15, color:INK, marginBottom:8 }}>{f.title}</div>
            <p style={{ fontFamily:sans, fontSize:13, color:MUTED, lineHeight:1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ background:PURPLE, padding:"72px 48px", textAlign:"center" }}>
      <div style={{ display:"flex", justifyContent:"center", gap:64, flexWrap:"wrap" }}>
        {stats.map(s=>(
          <div key={s.label}>
            <div style={{ fontFamily:serif, fontSize:48, fontWeight:700, color:"white", lineHeight:1 }}>{s.value}</div>
            <div style={{ fontFamily:sans, fontSize:13, color:"#FFFFFF99", marginTop:6, letterSpacing:1 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background:CREAM, padding:"100px 48px", textAlign:"center" }}>
      <Eyebrow>✦ Loved by teams worldwide</Eyebrow>
      <h2 style={{
        fontFamily:script, fontSize:"clamp(32px,4vw,52px)",
        color:INK, marginTop:20, marginBottom:56,
      }}>
        Join <Highlighted>15 million</Highlighted> users
      </h2>

      <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", maxWidth:900, margin:"0 auto" }}>
        {testimonials.map(t=>(
          <div key={t.name} style={{
            background:"white", borderRadius:24, padding:"32px",
            border:"1px solid #E8E0D8", maxWidth:280, textAlign:"left",
            boxShadow:"0 8px 32px #0000000a",
          }}>
            <div style={{ fontSize:32, marginBottom:16 }}>{t.avatar}</div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:INK, lineHeight:1.7, marginBottom:20 }}>
              "{t.quote}"
            </p>
            <div style={{ fontFamily:sans, fontWeight:700, fontSize:13, color:PURPLE }}>{t.name}</div>
            <div style={{ fontFamily:sans, fontSize:12, color:MUTED, marginTop:2 }}>{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{
      background:`linear-gradient(135deg,${PURPLE},${PURPLE2})`,
      padding:"100px 48px", textAlign:"center", position:"relative", overflow:"hidden",
    }}>
      {[
        { top:-100, left:-100, size:300 },
        { bottom:-80, right:-80, size:250 },
      ].map((b,i)=>(
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width:b.size, height:b.size,
          top:b.top, left:b.left, right:b.right, bottom:b.bottom,
          background:"#FFFFFF0A", pointerEvents:"none",
        }} />
      ))}

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:48, marginBottom:20 }}>✨</div>
        <h2 style={{
          fontFamily:script, fontSize:"clamp(36px,6vw,72px)",
          color:"white", lineHeight:1.1, marginBottom:20,
        }}>
          Unleash<br />your growth potential
        </h2>
        <p style={{ fontFamily:sans, color:"#FFFFFF99", fontSize:16, maxWidth:480, margin:"0 auto 40px", lineHeight:1.7 }}>
          Build recurring revenue workflows with automated billing,
          renewals, payments, and customer retention inside Eden ERP.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn style={{ background:"white", color:PURPLE, fontSize:15, padding:"15px 32px", fontWeight:700, boxShadow:"0 8px 32px #00000033" }}>
            Start Free Trial →
          </Btn>
          <Btn style={{ background:"transparent", color:"white", border:"1.5px solid #FFFFFF44", fontSize:15 }}>
            Contact Sales
          </Btn>
        </div>
        <p style={{ fontFamily:sans, fontSize:13, color:"#FFFFFF66", marginTop:20 }}>
          Free trial · No credit card · Instant access
        </p>
      </div>
    </section>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function EdenLandingPage() {
  return (
    <main style={{ background:CREAM, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=Dancing+Script:wght@700&display=swap');
      `}</style>
      <Hero />
      <AppsGrid />
      <LevelUp />
      <Productivity />
      <NativeAI />
      <EnterpriseSection />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </main>
  );
}

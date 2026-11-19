import design from "./health-design.module.css";
import LiveDemoButton from "@/components/live-demo-button";
import { Barcode, FileCheck2, FlaskConical, HandCoins } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [HandCoins, Barcode, FileCheck2, FlaskConical];
/** Pipeline stages: label key, count key, share of the day's samples (fictional). */
const stages = [
  { label: "pipeLab", count: "nLab", pct: 27, tone: "bg-(--sector-amber)" },
  { label: "pipeVerified", count: "nVerified", pct: 43, tone: "bg-(--sector-blue)" },
  { label: "pipeDelivered", count: "nDelivered", pct: 30, tone: "bg-(--sector-green)" },
] as const;
const ON_TIME = 94;

/** Diagnostic center: sample pipeline bar and report turnaround ring. */
export default async function HealthDiagnosticCenterPage() {
  const s = await loadSector("health", "diagnostic-center");
  const { p } = s;
  const v = p.visual;
  const ring = 2 * Math.PI * 42;

  return (
    <main className={`${sectorRoot} ${design.page} ${design.diagnostic}`}>
      <section className={design.hero}>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
        <Crumbs s={s} />
        <div className={`${wrap} ${design.heroLayout} relative py-14 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{p.hero.eyebrow}</Eyebrow>
              <h1 className={`${design.headline} mt-4 text-4xl font-bold leading-tight tracking-tight text-(--ink) sm:text-5xl`}>
                {p.hero.title} <span className="text-(--sector-blue)">{p.hero.highlight}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <div className={design.heroActions}><LiveDemoButton /></div>
            </div>
            <dl className="grid gap-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3">
                  <dt className="order-last text-sm text-muted-foreground">{st.label}</dt>
                  <dd className="min-w-24 font-mono text-sm font-bold text-(--sector-blue)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sample pipeline + on-time ring */}
          <figure className={`${design.preview} mt-12 grid gap-6 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center`}>
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <figcaption className="font-semibold text-(--ink)">{v.pipeTitle}</figcaption>
                <p className="text-sm text-muted-foreground">
                  {v.pipeCollected} <span className="font-mono text-lg font-bold text-(--ink)">{v.nCollected}</span>
                </p>
              </div>
              <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-(--cream)" aria-hidden>
                {stages.map((st) => (
                  <span key={st.label} className={st.tone} style={{ width: `${st.pct}%` }} />
                ))}
              </div>
              <ul className="mt-5 grid grid-cols-3 gap-3">
                {stages.map((st) => (
                  <li key={st.label} className="rounded-xl bg-(--cream) px-3 py-2">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`size-2.5 rounded-full ${st.tone}`} aria-hidden />
                      {v[st.label]}
                    </span>
                    <span className="mt-1 block font-mono text-xl font-bold text-(--ink)">{v[st.count]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">{v.pipeCaption}</p>
            </div>
            <div className="flex items-center gap-4 lg:flex-col lg:text-center">
              <svg viewBox="0 0 100 100" className="size-28 -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--cream)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="var(--sector-blue)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(ring * ON_TIME) / 100} ${ring}`}
                />
              </svg>
              <div>
                <p className="text-3xl font-bold text-(--sector-blue)">{v.tatValue}</p>
                <p className="max-w-40 text-xs text-muted-foreground">{v.tatLabel}</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow>{s.c.pillarsEyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-(--ink) sm:text-4xl">{v.pillarsTitle}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {p.pillars.map((pl, i) => {
                const Icon = icons[i];
                return (
                  <div key={pl.title} className="rounded-2xl border border-border bg-gradient-to-br from-(--sector-wash) to-card p-6">
                    <Icon className="size-7 text-(--sector-blue)" strokeWidth={1.6} aria-hidden />
                    <h3 className="mt-4 font-semibold text-(--ink)">{pl.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow>{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-(--ink) sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="bg-card p-5">
                <span className="font-mono text-xs font-semibold text-(--sector-blue)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-(--ink)">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <SampleTable s={s} />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{v.referralNote}</p>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

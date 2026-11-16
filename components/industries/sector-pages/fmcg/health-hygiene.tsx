import { CheckCircle2, CircleDashed, ShieldCheck } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

/** Health & Hygiene (OTC): clinical white/blue, batch-release checklist and QC gates. */
export default async function HealthHygienePage() {
  const s = await loadSector("fmcg", "health-hygiene");
  const { p } = s;
  const v = p.visual;
  const checks = [
    { label: v.check1, done: true },
    { label: v.check2, done: true },
    { label: v.check3, done: true },
    { label: v.check4, done: false },
  ];

  return (
    <main className="bg-background">
      <section className="relative border-b border-primary/10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--primary)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--primary)_8%,transparent)_1px,transparent_1px)] bg-[size:32px_32px]">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-20`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              <ShieldCheck className="size-3.5" aria-hidden />
              {p.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {p.hero.title} <span className="text-primary">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 overflow-hidden rounded-xl border border-primary/10 bg-card">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col border-e border-primary/10 p-4 last:border-e-0">
                  <dt className="text-[11px] leading-snug text-muted-foreground">{st.label}</dt>
                  <dd className="order-first font-mono text-lg font-bold text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-xs text-muted-foreground">{v.releaseLabel}</p>
                <p className="font-mono font-semibold text-foreground">{v.releaseBatch}</p>
              </div>
              <span className="rounded-md bg-chart-4/10 px-2 py-1 text-xs font-semibold text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]">{v.releaseStatus}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {checks.map((c) => (
                <li key={c.label} className="flex items-center gap-3 text-sm">
                  {c.done ? (
                    <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden />
                  ) : (
                    <CircleDashed className="size-5 shrink-0 text-chart-4" aria-hidden />
                  )}
                  <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg bg-primary/5 p-3 text-xs text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{v.releaseNote}</p>
          </div>
        </div>
      </section>

      {/* Stepper with gates */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-primary" />
          <ol className="grid gap-4 lg:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{v.stepLabel} {i + 1}</span>
                  {i < p.flow.length - 1 && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{v.gateLabel}</span>}
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars: checklist panel */}
      <section className="bg-primary/5 py-16 sm:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.5fr]`}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-primary" />
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {p.pillars.map((pl) => (
              <li key={pl.title} className="flex gap-4 p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="font-semibold text-foreground">{pl.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-primary/20"
            head="bg-primary text-primary-foreground"
            badge="bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-primary"
        card="border-border bg-card hover:border-primary/80"
        icon="text-primary"
        item="border-border bg-card open:border-primary/30"
        chip="border-primary/20 hover:bg-primary/5"
        surface="bg-muted/30"
      />
      <Closing s={s} panel="border border-primary/20 bg-card text-foreground" accent="text-primary" />
    </main>
  );
}

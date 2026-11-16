import { ArrowRight, Factory } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap } from "../kit";

const plants = [
  { key: "plant1", load: 82, tone: "bg-accent" },
  { key: "plant2", load: 67, tone: "bg-accent" },
  { key: "plant3", load: 91, tone: "bg-chart-4" },
  { key: "plant4", load: 45, tone: "bg-primary" },
  { key: "plant5", load: 74, tone: "bg-accent" },
  { key: "plant6", load: 58, tone: "bg-primary" },
];

/** Group Manufacturing: many plants, one consolidated view (indigo control room). */
export default async function GroupManufacturingPage() {
  const s = await loadSector("group", "manufacturing");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-gradient-to-br from-secondary via-secondary to-secondary text-white">
        <Crumbs s={s} tone="text-[color-mix(in_oklab,var(--primary),white_55%)]" />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow className="text-[color-mix(in_oklab,var(--primary),white_55%)]">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {p.hero.title} <span className="text-[color-mix(in_oklab,var(--primary),white_55%)]">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary-foreground/85">{p.hero.lead}</p>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col">
                  <dt className="text-xs text-secondary-foreground/65">{st.label}</dt>
                  <dd className="order-first text-2xl font-bold text-white">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between text-xs text-secondary-foreground/65">
              <span>{v.mapTitle}</span>
              <span className="font-mono">{v.mapPeriod}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {plants.map((pl) => (
                <div key={pl.key} className="rounded-xl border border-white/10 bg-secondary/40 p-4">
                  <div className="flex items-center justify-between">
                    <Factory className="size-4 text-[color-mix(in_oklab,var(--primary),white_55%)]" aria-hidden />
                    <span className={`size-2 rounded-full ${pl.tone}`} aria-hidden />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{v[pl.key]}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full ${pl.tone}`} style={{ width: `${pl.load}%` }} />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-secondary-foreground/65">{v.loadLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal flow with arrows */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow className="text-primary">{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-4 lg:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl bg-primary/5 p-6">
                <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                {i < p.flow.length - 1 && (
                  <ArrowRight className="absolute -end-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-background p-1 text-primary lg:block rtl:-scale-x-100" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sticky heading + pillar cards */}
      <section className="py-16 sm:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="text-primary">{s.c.pillarsEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.pillars.map((pl) => (
              <div key={pl.title} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                <span className="block h-1 w-10 rounded-full bg-primary" aria-hidden />
                <h3 className="mt-5 font-semibold text-foreground">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-primary/20"
            head="bg-secondary text-secondary-foreground"
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
      />
      <Closing s={s} panel="bg-gradient-to-r from-secondary to-primary/80 text-white" accent="text-[color-mix(in_oklab,var(--primary),white_55%)]" />
    </main>
  );
}

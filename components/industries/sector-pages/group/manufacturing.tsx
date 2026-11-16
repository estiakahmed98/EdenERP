import { ArrowRight, Factory } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap, sectorRoot } from "../kit";

const plants = [
  { key: "plant1", load: 82, tone: "bg-(--sector-green)" },
  { key: "plant2", load: 67, tone: "bg-(--sector-green)" },
  { key: "plant3", load: 91, tone: "bg-(--sector-amber)" },
  { key: "plant4", load: 45, tone: "bg-(--sector-blue)" },
  { key: "plant5", load: 74, tone: "bg-(--sector-green)" },
  { key: "plant6", load: 58, tone: "bg-(--sector-blue)" },
];

/** Group Manufacturing: many plants, one consolidated view (indigo control room). */
export default async function GroupManufacturingPage() {
  const s = await loadSector("group", "manufacturing");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="bg-gradient-to-br from-(--cream) via-(--cream) to-(--cream) text-(--ink)">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow className="text-(--sector-blue)">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {p.hero.title} <span className="text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col">
                  <dt className="text-xs text-muted-foreground">{st.label}</dt>
                  <dd className="order-first text-2xl font-bold text-(--ink)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{v.mapTitle}</span>
              <span className="font-mono">{v.mapPeriod}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {plants.map((pl) => (
                <div key={pl.key} className="rounded-xl border border-border bg-(--cream) p-4">
                  <div className="flex items-center justify-between">
                    <Factory className="size-4 text-(--sector-blue)" aria-hidden />
                    <span className={`size-2 rounded-full ${pl.tone}`} aria-hidden />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{v[pl.key]}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card">
                    <div className={`h-full rounded-full ${pl.tone}`} style={{ width: `${pl.load}%` }} />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">{v.loadLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal flow with arrows */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow className="text-(--sector-blue)">{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-4 lg:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl bg-(--sector-wash) p-6">
                <span className="text-xs font-bold text-(--sector-blue)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                {i < p.flow.length - 1 && (
                  <ArrowRight className="absolute -end-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-background p-1 text-(--sector-blue) lg:block rtl:-scale-x-100" aria-hidden />
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
            <Eyebrow className="text-(--sector-blue)">{s.c.pillarsEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.pillars.map((pl) => (
              <div key={pl.title} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                <span className="block h-1 w-10 rounded-full bg-(--sector-blue)" aria-hidden />
                <h3 className="mt-5 font-semibold text-foreground">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable s={s} />
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

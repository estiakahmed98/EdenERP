import { Baby, Heart, ShieldCheck, Smile } from "lucide-react";
import { Closing, Crumbs, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const icons = [ShieldCheck, Heart, Baby, Smile];
const tints = [
  "bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]",
  "bg-chart-4/10 text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]",
  "bg-accent/10 text-[color-mix(in_oklab,var(--accent),var(--foreground)_35%)]",
  "bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]",
];

/** Baby & Child Care: rounded, gentle, safety-first lot tracing. */
export default async function BabyCarePage() {
  const s = await loadSector("fmcg", "baby-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -start-20 top-10 size-72 rounded-full bg-primary/20 blur-2xl" />
        <div aria-hidden className="absolute -end-10 top-40 size-56 rounded-full bg-chart-4/20 blur-2xl" />
        <div aria-hidden className="absolute bottom-0 start-1/3 size-48 rounded-full bg-accent/20 blur-2xl" />
        <Crumbs s={s} />
        <div className={`${wrap} relative py-16 text-center lg:py-24`}>
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Baby className="size-8" aria-hidden />
          </span>
          <p className="mt-5 text-sm font-semibold text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{p.hero.eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            {p.hero.title}{" "}
            <span className="rounded-full bg-chart-4/20 px-3 text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]">{p.hero.highlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
          <dl className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {p.stats.map((st, i) => (
              <div key={st.label} className={`flex flex-col rounded-[2rem] p-5 ${tints[i]}`}>
                <dt className="text-sm opacity-80">{st.label}</dt>
                <dd className="order-first text-2xl font-extrabold">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Rounded pillars */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-primary" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="rounded-[2rem] border-2 border-dashed border-primary/20 bg-card p-6 text-center">
                  <span className={`mx-auto flex size-14 items-center justify-center rounded-full ${tints[i]}`}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-bold text-foreground">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lot trace card + flow */}
      <section className="bg-primary/5 py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div className="rounded-[2.5rem] bg-card p-8 shadow-xl shadow-primary/10">
            <p className="text-sm font-semibold text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{v.traceTitle}</p>
            <div className="mt-6 space-y-4">
              {["trace1", "trace2", "trace3", "trace4"].map((k, i) => (
                <div key={k} className="flex items-center gap-4">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tints[i]}`}>{i + 1}</span>
                  <div className="flex-1 rounded-2xl bg-muted/60 px-4 py-3">
                    <p className="text-xs text-muted-foreground">{v[`${k}Label`]}</p>
                    <p className="font-mono text-sm font-semibold text-foreground">{v[`${k}Value`]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-primary" />
            <ol className="space-y-5">
              {p.flow.map((step) => (
                <li key={step.title} className="rounded-3xl bg-card p-5">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="rounded-[2rem] border-primary/20"
            head="bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
            badge="bg-chart-4/10 text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-primary"
        card="rounded-[2rem] border-primary/10 bg-card hover:border-primary/30"
        icon="text-primary"
        item="rounded-[2rem] border-primary/10 bg-card"
        chip="border-primary/20 hover:bg-primary/5"
      />
      <Closing s={s} panel="rounded-[2.5rem] bg-primary text-primary-foreground" accent="text-primary-foreground/80" />
    </main>
  );
}

import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const nodes = ["unit1", "unit2", "unit3", "unit4", "unit5"];

/** Group Textiles: vertical integration from fibre to export, unit by unit. */
export default async function GroupTextilesPage() {
  const s = await loadSector("group", "textiles");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-primary/5">
        <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_14px,color-mix(in_oklab,var(--primary)_8%,transparent)_14px,color-mix(in_oklab,var(--primary)_8%,transparent)_15px)]" />
        <Crumbs s={s} />
        <div className={`${wrap} relative py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Eyebrow className="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {p.hero.title} <span className="text-primary">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
          </div>

          {/* Chain */}
          <ol className="relative mt-14 grid gap-4 sm:grid-cols-5">
            <div aria-hidden className="absolute start-[10%] end-[10%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-primary/30 via-accent/80 to-primary sm:block" />
            {nodes.map((k, i) => (
              <li key={k} className="relative flex flex-row items-center gap-4 sm:flex-col sm:text-center">
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border-4 border-primary/5 bg-primary font-mono text-sm font-bold text-primary-foreground">
                  U{i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{v[k]}</p>
                  <p className="text-xs text-muted-foreground">{v[`${k}Note`]}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-14 grid gap-4 sm:grid-cols-3">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col rounded-2xl bg-card p-5 shadow-sm">
                <dt className="text-sm text-muted-foreground">{st.label}</dt>
                <dd className="order-first text-2xl font-bold text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pillars with side borders */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]" />
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {p.pillars.map((pl) => (
              <div key={pl.title} className="border-s-4 border-primary ps-5">
                <h3 className="text-lg font-semibold text-foreground">{pl.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical flow */}
      <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
          <div>
            <Eyebrow className="text-[color-mix(in_oklab,var(--primary),white_55%)]">{s.c.flowEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{v.flowTitle}</h2>
            <p className="mt-4 text-[color-mix(in_oklab,var(--primary),white_55%)]">{v.flowNote}</p>
          </div>
          <ol className="relative space-y-8 border-s border-primary ps-8">
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute -start-[2.65rem] flex size-5 items-center justify-center rounded-full bg-accent/80 text-[10px] font-bold text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{i + 1}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color-mix(in_oklab,var(--primary),white_55%)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-primary/20"
            head="bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
            badge="bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
        card="border-border bg-card hover:border-primary/80"
        icon="text-primary"
        item="border-border bg-card open:border-primary/30"
        chip="border-primary/20 hover:bg-primary/5"
        surface="bg-muted/30"
      />
      <Closing s={s} panel="bg-primary text-primary-foreground" accent="text-primary-foreground/80" />
    </main>
  );
}

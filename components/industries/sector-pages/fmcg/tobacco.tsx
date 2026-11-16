import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap } from "../kit";

/** Tobacco: sober editorial ledger focused on duty, stamps and controlled movement. */
export default async function TobaccoPage() {
  const s = await loadSector("fmcg", "tobacco");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-secondary text-secondary-foreground/85">
        <Crumbs s={s} tone="text-secondary-foreground/65" />
        <div className={`${wrap} grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24`}>
          <div>
            <Eyebrow className="text-[color-mix(in_oklab,var(--chart-4),white_35%)]">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] sm:text-6xl">
              {p.hero.title}
              <br />
              <span className="italic text-[color-mix(in_oklab,var(--chart-4),white_55%)]">{p.hero.highlight}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-secondary-foreground/85">{p.hero.lead}</p>
          </div>
          <dl className="self-end border-t border-foreground/70">
            {p.stats.map((st) => (
              <div key={st.label} className="flex items-baseline justify-between gap-6 border-b border-foreground/70 py-5">
                <dt className="text-sm text-secondary-foreground/65">{st.label}</dt>
                <dd className="font-mono text-2xl text-[color-mix(in_oklab,var(--chart-4),white_55%)]">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ledger rows */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <div className="grid gap-10 border-b border-border pb-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow className="text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]">{s.c.pillarsEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
            </div>
            <div className="divide-y divide-border border-t border-border">
              {p.pillars.map((pl, i) => (
                <div key={pl.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr_2fr] sm:gap-6">
                  <span className="font-mono text-sm text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]">§{i + 1}</span>
                  <h3 className="font-semibold text-foreground">{pl.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stamp reconciliation strip */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow className="text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]">{s.c.flowEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground">{v.flowTitle}</h2>
            </div>
            <div>
              <div className="flex h-12 overflow-hidden rounded-md border border-border font-mono text-xs">
                <span className="flex items-center justify-center bg-secondary px-3 text-secondary-foreground/85" style={{ width: "58%" }}>{v.barApplied}</span>
                <span className="flex items-center justify-center bg-chart-4 px-3 text-primary-foreground" style={{ width: "30%" }}>{v.barStock}</span>
                <span className="flex items-center justify-center bg-destructive px-2 text-white" style={{ width: "12%" }}>{v.barDamaged}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{v.barCaption}</p>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2">
                {p.flow.map((step, i) => (
                  <li key={step.title} className="border-s-2 border-border ps-4">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="rounded-md border-border"
            head="bg-secondary text-secondary-foreground"
            badge="bg-border text-foreground"
          />
          <p className="mt-6 text-xs text-muted-foreground">{v.complianceNote}</p>
        </div>
      </section>

      <Tail
        s={s}
        accent="text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]"
        card="rounded-md border-border bg-card hover:border-foreground/30"
        icon="text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]"
        item="rounded-md border-border bg-card"
        chip="rounded-md border-border hover:bg-muted"
      />
      <Closing s={s} panel="rounded-md bg-secondary text-secondary-foreground/85" accent="text-[color-mix(in_oklab,var(--chart-4),white_35%)]" />
    </main>
  );
}

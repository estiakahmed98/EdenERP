import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap, sectorRoot } from "../kit";

/** Tobacco: sober editorial ledger focused on duty, stamps and controlled movement. */
export default async function TobaccoPage() {
  const s = await loadSector("fmcg", "tobacco");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="bg-(--cream) text-muted-foreground">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24`}>
          <div>
            <Eyebrow className="text-(--sector-blue)">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] sm:text-6xl">
              {p.hero.title}
              <br />
              <span className="italic text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
          </div>
          <dl className="self-end border-t border-foreground/70">
            {p.stats.map((st) => (
              <div key={st.label} className="flex items-baseline justify-between gap-6 border-b border-foreground/70 py-5">
                <dt className="text-sm text-muted-foreground">{st.label}</dt>
                <dd className="font-mono text-2xl text-(--sector-blue)">{st.value}</dd>
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
              <Eyebrow className="text-(--sector-blue)">{s.c.pillarsEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
            </div>
            <div className="divide-y divide-border border-t border-border">
              {p.pillars.map((pl, i) => (
                <div key={pl.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr_2fr] sm:gap-6">
                  <span className="font-mono text-sm text-(--sector-blue)">§{i + 1}</span>
                  <h3 className="font-semibold text-foreground">{pl.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stamp reconciliation strip */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow className="text-(--sector-blue)">{s.c.flowEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground">{v.flowTitle}</h2>
            </div>
            <div>
              <div className="flex h-12 overflow-hidden rounded-md border border-border font-mono text-xs">
                <span className="flex items-center justify-center bg-(--sector-blue) px-3 text-card" style={{ width: "58%" }}>{v.barApplied}</span>
                <span className="flex items-center justify-center bg-(--sector-amber) px-3 text-card" style={{ width: "30%" }}>{v.barStock}</span>
                <span className="flex items-center justify-center bg-destructive px-2 text-destructive-foreground" style={{ width: "12%" }}>{v.barDamaged}</span>
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

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable s={s} />
          <p className="mt-6 text-xs text-muted-foreground">{v.complianceNote}</p>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

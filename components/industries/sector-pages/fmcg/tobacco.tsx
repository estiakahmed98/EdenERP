import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap } from "../kit";

/** Tobacco: sober editorial ledger focused on duty, stamps and controlled movement. */
export default async function TobaccoPage() {
  const s = await loadSector("fmcg", "tobacco");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-stone-950 text-stone-100">
        <Crumbs s={s} tone="text-stone-400" />
        <div className={`${wrap} grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24`}>
          <div>
            <Eyebrow className="text-amber-400">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] sm:text-6xl">
              {p.hero.title}
              <br />
              <span className="italic text-amber-300">{p.hero.highlight}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-300">{p.hero.lead}</p>
          </div>
          <dl className="self-end border-t border-stone-700">
            {p.stats.map((st) => (
              <div key={st.label} className="flex items-baseline justify-between gap-6 border-b border-stone-800 py-5">
                <dt className="text-sm text-stone-400">{st.label}</dt>
                <dd className="font-mono text-2xl text-amber-300">{st.value}</dd>
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
              <Eyebrow className="text-amber-700 dark:text-amber-400">{s.c.pillarsEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
            </div>
            <div className="divide-y divide-border border-t border-border">
              {p.pillars.map((pl, i) => (
                <div key={pl.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr_2fr] sm:gap-6">
                  <span className="font-mono text-sm text-amber-700 dark:text-amber-400">§{i + 1}</span>
                  <h3 className="font-semibold text-foreground">{pl.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stamp reconciliation strip */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow className="text-amber-700 dark:text-amber-400">{s.c.flowEyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground">{v.flowTitle}</h2>
            </div>
            <div>
              <div className="flex h-12 overflow-hidden rounded-md border border-border font-mono text-xs">
                <span className="flex items-center justify-center bg-stone-800 px-3 text-stone-100" style={{ width: "58%" }}>{v.barApplied}</span>
                <span className="flex items-center justify-center bg-amber-600 px-3 text-white" style={{ width: "30%" }}>{v.barStock}</span>
                <span className="flex items-center justify-center bg-red-700 px-2 text-white" style={{ width: "12%" }}>{v.barDamaged}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{v.barCaption}</p>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2">
                {p.flow.map((step, i) => (
                  <li key={step.title} className="border-s-2 border-stone-300 ps-4 dark:border-stone-700">
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

      <section className="bg-stone-100 py-16 sm:py-20 dark:bg-stone-900/40">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="rounded-md border-stone-300 dark:border-stone-700"
            head="bg-stone-900 text-amber-200"
            badge="bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200"
          />
          <p className="mt-6 text-xs text-muted-foreground">{v.complianceNote}</p>
        </div>
      </section>

      <Tail
        s={s}
        accent="text-amber-700 dark:text-amber-400"
        card="rounded-md border-border bg-card hover:border-stone-500"
        icon="text-amber-700"
        item="rounded-md border-border bg-card"
        chip="rounded-md border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900"
      />
      <Closing s={s} panel="rounded-md bg-stone-950 text-stone-100" accent="text-amber-400" />
    </main>
  );
}

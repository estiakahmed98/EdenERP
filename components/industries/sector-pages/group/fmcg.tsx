import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const tiles = [
  "bg-amber-400 text-amber-950 col-span-2",
  "bg-sky-500 text-white",
  "bg-rose-400 text-rose-950",
  "bg-emerald-500 text-white",
  "bg-violet-500 text-white col-span-2",
];
const bars = ["bg-amber-400", "bg-sky-500", "bg-rose-400", "bg-emerald-500"];

/** Group FMCG: many brands, one distribution engine (colourful brand mosaic). */
export default async function GroupFmcgPage() {
  const s = await loadSector("group", "fmcg");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section>
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:py-20`}>
          <div>
            <Eyebrow className="text-fuchsia-600 dark:text-fuchsia-400">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
              {p.hero.title}{" "}
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["brand1", "brand2", "brand3", "brand4", "brand5"].map((k, i) => (
              <div key={k} className={`flex min-h-28 flex-col justify-between rounded-2xl p-4 ${tiles[i]}`}>
                <span className="font-mono text-[11px] opacity-80">{v[`${k}Cat`]}</span>
                <span className="text-lg font-black leading-tight">{v[k]}</span>
              </div>
            ))}
            <div className="flex min-h-28 items-center justify-center rounded-2xl border-2 border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              {v.brandMore}
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 py-10 text-white">
        <dl className={`${wrap} grid gap-6 text-center sm:grid-cols-3`}>
          {p.stats.map((st) => (
            <div key={st.label} className="flex flex-col">
              <dt className="text-sm text-white/85">{st.label}</dt>
              <dd className="order-first text-3xl font-black">{st.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-fuchsia-600 dark:text-fuchsia-400" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className="overflow-hidden rounded-2xl border border-border bg-card">
                <span className={`block h-2 ${bars[i]}`} aria-hidden />
                <div className="p-6">
                  <h3 className="font-semibold text-foreground">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow as columns with a top rule */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-fuchsia-600 dark:text-fuchsia-400" />
          <ol className="grid gap-8 md:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="border-t-4 pt-5" style={{ borderColor: ["#fbbf24", "#0ea5e9", "#fb7185", "#8b5cf6"][i] }}>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-fuchsia-200 dark:border-fuchsia-900"
            head="bg-gradient-to-r from-amber-100 via-rose-100 to-violet-100 text-foreground dark:from-amber-950/40 dark:via-rose-950/40 dark:to-violet-950/40"
            badge="bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-fuchsia-600 dark:text-fuchsia-400"
        card="border-border bg-card hover:border-fuchsia-400"
        icon="text-fuchsia-600"
        item="border-border bg-card open:border-fuchsia-300"
        chip="border-fuchsia-200 hover:bg-fuchsia-50 dark:border-fuchsia-900 dark:hover:bg-fuchsia-950/40"
        surface="bg-muted/30"
      />
      <Closing s={s} panel="bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 text-white" accent="text-white/90" />
    </main>
  );
}

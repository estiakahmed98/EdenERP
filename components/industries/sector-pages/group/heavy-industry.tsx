import { Gauge, HardHat, Wrench } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, Tail, loadSector, wrap } from "../kit";

const stripes = "bg-[repeating-linear-gradient(-45deg,#f97316_0,#f97316_14px,#18181b_14px,#18181b_28px)]";
const gauges = [
  { key: "asset1", value: 78 },
  { key: "asset2", value: 52 },
  { key: "asset3", value: 91 },
];

/** Heavy Industry: rugged zinc + safety orange, assets and maintenance first. */
export default async function HeavyIndustryPage() {
  const s = await loadSector("group", "heavy-industry");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-zinc-900 text-zinc-100">
        <div className={`h-3 ${stripes}`} aria-hidden />
        <Crumbs s={s} tone="text-zinc-400" />
        <div className={`${wrap} py-14 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-widest text-zinc-950">
                <HardHat className="size-4" aria-hidden />
                {p.hero.eyebrow}
              </span>
              <h1 className="mt-6 text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-6xl">
                {p.hero.title} <span className="text-orange-500">{p.hero.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">{p.hero.lead}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {gauges.map((g) => (
                <div key={g.key} className="border border-zinc-700 bg-zinc-950 p-4 text-center">
                  <div
                    className="mx-auto flex size-20 items-center justify-center rounded-full"
                    style={{ background: `conic-gradient(#f97316 ${g.value * 3.6}deg, #3f3f46 0deg)` }}
                    aria-hidden
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-zinc-950">
                      <Gauge className="size-5 text-orange-400" />
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold">{v[g.key]}</p>
                  <p className="font-mono text-[10px] text-zinc-500">{v[`${g.key}Note`]}</p>
                </div>
              ))}
            </div>
          </div>
          <dl className="mt-12 grid border-t border-zinc-700 sm:grid-cols-3">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col border-b border-zinc-800 py-5 sm:border-b-0 sm:border-e sm:px-6 sm:first:ps-0 sm:last:border-e-0">
                <dt className="text-sm uppercase tracking-wide text-zinc-400">{st.label}</dt>
                <dd className="order-first text-3xl font-black text-orange-500">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pillars: industrial plates */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow className="text-orange-600">{s.c.pillarsEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-black uppercase leading-tight text-foreground sm:text-4xl">{v.pillarsTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className="relative border-2 border-zinc-900 bg-card p-6 dark:border-zinc-600">
                <span className="absolute end-3 top-3 size-2 rounded-full bg-zinc-400" aria-hidden />
                <span className="absolute bottom-3 end-3 size-2 rounded-full bg-zinc-400" aria-hidden />
                <span className="font-mono text-xs font-bold text-orange-600">{`EQ-0${i + 1}`}</span>
                <h3 className="mt-3 font-bold uppercase text-foreground">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow: work order steps */}
      <section className="bg-zinc-100 py-16 sm:py-20 dark:bg-zinc-900/60">
        <div className={wrap}>
          <div className="flex items-center gap-3">
            <Wrench className="size-6 text-orange-600" aria-hidden />
            <Eyebrow className="text-orange-600">{s.c.flowEyebrow}</Eyebrow>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-black uppercase text-foreground sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-0 md:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="border-s-4 border-orange-500 bg-card p-6 md:border-s-0 md:border-t-4">
                <span className="font-mono text-4xl font-black text-zinc-300 dark:text-zinc-700">{i + 1}</span>
                <h3 className="mt-2 font-bold text-foreground">{step.title}</h3>
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
            frame="rounded-none border-2 border-zinc-900 dark:border-zinc-600"
            head="bg-zinc-900 text-orange-400"
            badge="rounded-none bg-orange-500 text-zinc-950"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-orange-600"
        card="rounded-none border-2 border-zinc-900 bg-card hover:bg-orange-50 dark:border-zinc-600 dark:hover:bg-zinc-900"
        icon="text-orange-600"
        item="rounded-none border-2 border-zinc-300 bg-card dark:border-zinc-700"
        chip="rounded-none border-2 border-zinc-900 hover:bg-orange-500 hover:text-zinc-950 dark:border-zinc-600"
      />
      <section className="pb-4">
        <div className={`h-3 ${stripes}`} aria-hidden />
      </section>
      <Closing s={s} panel="rounded-none bg-zinc-900 text-zinc-100" accent="text-orange-500" />
    </main>
  );
}

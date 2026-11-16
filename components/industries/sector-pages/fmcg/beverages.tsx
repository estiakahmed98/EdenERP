import { MapPin, Store, Warehouse } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const bubbles = [
  "start-[8%] top-[20%] size-3", "start-[18%] top-[70%] size-5", "start-[42%] top-[12%] size-2",
  "start-[60%] top-[80%] size-4", "start-[75%] top-[30%] size-6", "start-[88%] top-[62%] size-3",
];

/** Beverages: dark, fizzy route-to-market page with a depot → outlet route. */
export default async function BeveragesPage() {
  const s = await loadSector("fmcg", "beverages");
  const { p } = s;
  const v = p.visual;
  const stops = [
    { icon: Warehouse, label: v.stop1, note: v.stop1Note },
    { icon: MapPin, label: v.stop2, note: v.stop2Note },
    { icon: Store, label: v.stop3, note: v.stop3Note },
  ];

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.25),transparent_60%)]" />
        {bubbles.map((b) => (
          <span key={b} aria-hidden className={`absolute rounded-full border border-cyan-300/40 bg-cyan-300/10 ${b}`} />
        ))}
        <Crumbs s={s} tone="text-cyan-100/70" />
        <div className={`${wrap} relative py-16 text-center lg:py-24`}>
          <Eyebrow className="text-cyan-300">{p.hero.eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            {p.hero.title}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-500 bg-clip-text text-transparent">{p.hero.highlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{p.hero.lead}</p>
        </div>
        <div className={`${wrap} relative pb-10`}>
          <dl className="grid gap-4 sm:grid-cols-3">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <dt className="mt-2 text-sm text-slate-300">{st.label}</dt>
                <dd className="order-first text-3xl font-black text-cyan-300">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Route */}
      <section className="py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center`}>
          <div>
            <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-sky-600 dark:text-cyan-400" />
            <ol className="space-y-6">
              {p.flow.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-mono text-sm font-bold text-sky-600 dark:text-cyan-400">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-8 dark:border-sky-900/40 dark:from-sky-950/40 dark:to-slate-900">
            <p className="text-sm font-semibold text-sky-800 dark:text-cyan-300">{v.routeTitle}</p>
            <div className="relative mt-8 space-y-10 ps-10">
              <div aria-hidden className="absolute bottom-4 start-4 top-4 w-0.5 border-s-2 border-dashed border-sky-300 dark:border-sky-700" />
              {stops.map(({ icon: Icon, label, note }) => (
                <div key={label} className="relative">
                  <span className="absolute -start-10 flex size-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/30">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-xl bg-white/70 p-3 text-xs text-muted-foreground dark:bg-white/5">{v.routeFoot}</p>
          </div>
        </div>
      </section>

      {/* Pillars: big numbered rows */}
      <section className="border-y border-border py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-sky-600 dark:text-cyan-400" center />
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className="bg-card p-7">
                <span className="text-5xl font-black text-sky-100 dark:text-sky-900">{i + 1}</span>
                <h3 className="mt-3 font-semibold text-foreground">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-sky-200 dark:border-sky-900/60"
            head="bg-slate-900 text-cyan-200"
            badge="bg-cyan-400/15 text-cyan-300"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-sky-600 dark:text-cyan-400"
        card="border-border bg-card hover:border-sky-400"
        icon="text-sky-600"
        item="border-border bg-card open:border-sky-300"
        chip="border-sky-200 hover:bg-sky-50 dark:border-sky-900 dark:hover:bg-sky-950/40"
      />
      <Closing s={s} panel="bg-gradient-to-r from-slate-950 to-sky-900 text-white" accent="text-cyan-300" />
    </main>
  );
}

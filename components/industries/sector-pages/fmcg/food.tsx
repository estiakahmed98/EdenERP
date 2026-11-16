import { CalendarClock, Leaf, PackageCheck, Snowflake, Truck, Wheat } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const icons = [Wheat, Snowflake, PackageCheck, Truck];

/** Food: warm farm-to-shelf story built around a FEFO batch ticket. */
export default async function FoodPage() {
  const s = await loadSector("fmcg", "food");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/30">
        <div aria-hidden className="pointer-events-none absolute -end-32 -top-32 size-[28rem] rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />
        <Crumbs s={s} />
        <div className={`${wrap} relative grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20`}>
          <div>
            <Eyebrow className="text-amber-700 dark:text-amber-400">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {p.hero.title}{" "}
              <span className="relative whitespace-nowrap text-amber-600 dark:text-amber-400">
                {p.hero.highlight}
                <svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-2 start-0 h-3 w-full text-amber-300 dark:text-amber-700" preserveAspectRatio="none">
                  <path d="M2 9 Q 60 2 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col border-s-2 border-amber-400 ps-3">
                  <dt className="text-xs leading-snug text-muted-foreground">{st.label}</dt>
                  <dd className="order-first text-xl font-bold text-foreground">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Batch ticket */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-amber-200/60 dark:bg-amber-900/30" aria-hidden />
            <div className="relative rounded-3xl border border-amber-200 bg-card p-6 shadow-xl dark:border-amber-900/50">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{v.ticketTag}</span>
                <CalendarClock className="size-5 text-amber-600" aria-hidden />
              </div>
              <p className="mt-5 font-mono text-sm text-muted-foreground">{v.batchCode}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{v.productName}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[["madeLabel", "madeValue"], ["expiryLabel", "expiryValue"], ["lineLabel", "lineValue"], ["storeLabel", "storeValue"]].map(([l, val]) => (
                  <div key={l} className="rounded-xl bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">{v[l]}</p>
                    <p className="mt-0.5 font-semibold text-foreground">{v[val]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{v.shelfLifeLabel}</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">{v.shelfLifeValue}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500" />
                </div>
              </div>
              <div className="mt-6 border-t border-dashed border-amber-300 pt-4 text-xs text-muted-foreground dark:border-amber-800">
                <Leaf className="me-1.5 inline size-3.5 text-emerald-600" aria-hidden />
                {v.ticketFoot}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm-to-shelf timeline */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-amber-700 dark:text-amber-400" />
          <ol className="relative grid gap-8 md:grid-cols-4">
            <div aria-hidden className="absolute start-0 end-0 top-5 hidden h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-400 md:block dark:from-amber-900" />
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white ring-8 ring-background">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-amber-50/60 py-16 sm:py-20 dark:bg-amber-950/10">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-amber-700 dark:text-amber-400" />
          <div className="grid gap-5 sm:grid-cols-2">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={pl.title} className="flex gap-5 rounded-3xl border border-amber-100 bg-card p-6 dark:border-amber-900/40">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{pl.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-amber-200 dark:border-amber-900/50"
            head="bg-amber-100/70 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
            badge="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-amber-700 dark:text-amber-400"
        card="border-border bg-card hover:border-amber-400"
        icon="text-amber-600"
        item="border-border bg-card open:border-amber-300"
        chip="border-amber-200 hover:bg-amber-50 dark:border-amber-900 dark:hover:bg-amber-950/40"
        surface="bg-muted/30"
      />
      <Closing s={s} panel="bg-amber-500 text-amber-950" accent="text-amber-900" />
    </main>
  );
}

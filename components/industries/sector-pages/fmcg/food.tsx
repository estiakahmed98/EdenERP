import { CalendarClock, Leaf, PackageCheck, Snowflake, Truck, Wheat } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [Wheat, Snowflake, PackageCheck, Truck];

/** Food: warm farm-to-shelf story built around a FEFO batch ticket. */
export default async function FoodPage() {
  const s = await loadSector("fmcg", "food");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="relative overflow-hidden bg-gradient-to-b from-(--sector-sand) to-background">
        <div aria-hidden className="pointer-events-none absolute -end-32 -top-32 size-[28rem] rounded-full bg-(--sector-sand) blur-3xl" />
        <Crumbs s={s} />
        <div className={`${wrap} relative grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20`}>
          <div>
            <Eyebrow className="text-(--sector-blue)">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {p.hero.title}{" "}
              <span className="relative whitespace-nowrap text-(--sector-blue)">
                {p.hero.highlight}
                <svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-2 start-0 h-3 w-full text-(--sector-blue)" preserveAspectRatio="none">
                  <path d="M2 9 Q 60 2 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col border-s-2 border-(--sector-amber) ps-3">
                  <dt className="text-xs leading-snug text-muted-foreground">{st.label}</dt>
                  <dd className="order-first text-xl font-bold text-foreground">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Batch ticket */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-(--sector-sand)" aria-hidden />
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-(--sector-sand) px-3 py-1 text-xs font-semibold text-(--sector-blue)">{v.ticketTag}</span>
                <CalendarClock className="size-5 text-(--sector-blue)" aria-hidden />
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
                  <span className="font-semibold text-(--sector-blue)">{v.shelfLifeValue}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-(--sector-green) via-(--sector-amber)/80 to-(--sector-amber)" />
                </div>
              </div>
              <div className="mt-6 border-t border-dashed border-border pt-4 text-xs text-muted-foreground">
                <Leaf className="me-1.5 inline size-3.5 text-(--sector-blue)" aria-hidden />
                {v.ticketFoot}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm-to-shelf timeline */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} />
          <ol className="relative grid gap-8 md:grid-cols-4">
            <div aria-hidden className="absolute start-0 end-0 top-5 hidden h-0.5 bg-gradient-to-r from-(--sector-sand) via-(--sector-amber)/80 to-(--sector-green)/80 md:block" />
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-(--sector-amber) text-sm font-bold text-card ring-8 ring-background">
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
      <section className="bg-(--sector-sand) py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-5 sm:grid-cols-2">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={pl.title} className="flex gap-5 rounded-3xl border border-border bg-card p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-(--sector-sand) text-(--sector-blue)">
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
          <SampleTable s={s} />
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

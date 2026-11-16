import { Droplets, FlaskConical, Recycle, ShoppingCart } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const formula = [
  { key: "ing1", pct: 62, bar: "bg-(--sector-green)" },
  { key: "ing2", pct: 18, bar: "bg-(--sector-green)" },
  { key: "ing3", pct: 12, bar: "bg-(--sector-blue)" },
  { key: "ing4", pct: 8, bar: "bg-(--sector-green)" },
];
const icons = [FlaskConical, Droplets, Recycle, ShoppingCart];

/** Home & Household Care: clean formula card + bento grid. */
export default async function HomeCarePage() {
  const s = await loadSector("fmcg", "home-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="border-b border-border">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:py-20`}>
          <div className="order-last lg:order-first">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{v.formulaTitle}</p>
                <span className="font-mono text-xs text-muted-foreground">{v.formulaCode}</span>
              </div>
              <div className="mt-5 flex h-4 overflow-hidden rounded-full">
                {formula.map((f) => (
                  <span key={f.key} className={f.bar} style={{ width: `${f.pct}%` }} aria-hidden />
                ))}
              </div>
              <ul className="mt-5 space-y-3">
                {formula.map((f) => (
                  <li key={f.key} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className={`size-2.5 rounded-full ${f.bar}`} aria-hidden />
                      {v[f.key]}
                    </span>
                    <span className="font-mono font-semibold text-foreground">{v[`${f.key}Pct`]}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">{v.batchLabel}</p>
                  <p className="font-semibold text-foreground">{v.batchValue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{v.yieldLabel}</p>
                  <p className="font-semibold text-(--sector-blue)">{v.yieldValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow className="text-(--sector-blue)">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {p.hero.title} <span className="text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col rounded-2xl bg-(--sector-sage) p-4">
                  <dt className="text-xs text-muted-foreground">{st.label}</dt>
                  <dd className="order-first text-lg font-bold text-(--sector-blue)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Bento pillars */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              const big = i === 0;
              return (
                <div
                  key={pl.title}
                  className={`rounded-3xl p-7 ${big ? "border border-border bg-(--sector-sage) md:row-span-2" : "border border-border bg-card"} ${i === 3 ? "md:col-span-2" : ""}`}
                >
                  <Icon className={`size-7 text-(--sector-blue)`} aria-hidden />
                  <h3 className={`mt-5 font-semibold text-(--ink) ${big ? "text-2xl" : ""}`}>{pl.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed text-muted-foreground`}>{pl.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flow with large digits */}
      <section className="bg-(--cream) py-16 text-(--ink) sm:py-20">
        <div className={wrap}>
          <Eyebrow className="text-(--sector-blue)">{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2">
            {p.flow.map((step, i) => (
              <li key={step.title} className="flex gap-6">
                <span className="text-6xl font-black leading-none text-(--sector-blue)">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
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

import { Sparkles } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

/** Example shade family S-01…S-06: sand → amber, then two blues (shared palette). */
const swatches = [
  "bg-(--sector-sand)",
  "bg-(--sector-amber)/40",
  "bg-(--sector-amber)/70",
  "bg-(--sector-amber)",
  "bg-(--sector-blue)/60",
  "bg-(--sector-blue)",
];

/** Personal Care & Beauty: soft, editorial, variant-led (shade × pack size). */
export default async function PersonalCarePage() {
  const s = await loadSector("fmcg", "personal-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="bg-gradient-to-b from-(--sector-sand) via-(--sector-sand) to-background dark:via-background">
        <Crumbs s={s} />
        <div className={`${wrap} py-16 text-center lg:py-24`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-(--sector-blue)">
            <Sparkles className="size-3.5" aria-hidden />
            {p.hero.eyebrow}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            {p.hero.title}{" "}
            <em className="font-semibold not-italic text-(--sector-blue)">{p.hero.highlight}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>

          <div className="mx-auto mt-12 flex max-w-xl items-end justify-center gap-3">
            {swatches.map((sw, i) => (
              <div key={`S-0${i + 1}`} className="flex flex-col items-center gap-2">
                <span className={`block w-10 rounded-t-full rounded-b-lg shadow-md sm:w-14 ${sw}`} style={{ height: `${70 + ((i * 23) % 50)}px` }} aria-hidden />
                <span className="font-mono text-[10px] text-muted-foreground">{`S-0${i + 1}`}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{v.swatchCaption}</p>

          <dl className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center divide-x divide-border rtl:divide-x-reverse">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col px-6 py-2">
                <dt className="text-xs text-muted-foreground">{st.label}</dt>
                <dd className="order-first text-2xl font-semibold text-(--sector-blue)">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Flow as soft pills */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} center />
          <ol className="flex flex-wrap justify-center gap-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="w-full max-w-xs rounded-[2rem] bg-(--sector-sand) p-6 text-center">
                <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-(--sector-blue) shadow-sm">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Zig-zag pillars */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="space-y-6">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className={`grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-last" : ""}`}>
                <div className={`flex aspect-[5/2] items-center justify-center rounded-3xl ${i % 2 ? "bg-(--sector-sand)" : "bg-(--sector-sand)"}`}>
                  <span className="text-6xl font-light text-(--sector-blue)">0{i + 1}</span>
                </div>
                <div className="md:px-6">
                  <h3 className="text-xl font-semibold text-foreground">{pl.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              </div>
            ))}
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

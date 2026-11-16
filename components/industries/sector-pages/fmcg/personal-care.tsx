import { Sparkles } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const swatches = ["bg-rose-200", "bg-rose-300", "bg-pink-400", "bg-fuchsia-500", "bg-rose-700", "bg-amber-200"];

/** Personal Care & Beauty: soft, editorial, variant-led (shade × pack size). */
export default async function PersonalCarePage() {
  const s = await loadSector("fmcg", "personal-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-gradient-to-b from-rose-50 via-pink-50/40 to-background dark:from-rose-950/30 dark:via-background">
        <Crumbs s={s} />
        <div className={`${wrap} py-16 text-center lg:py-24`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <Sparkles className="size-3.5" aria-hidden />
            {p.hero.eyebrow}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            {p.hero.title}{" "}
            <em className="font-semibold not-italic text-rose-600 dark:text-rose-400">{p.hero.highlight}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>

          <div className="mx-auto mt-12 flex max-w-xl items-end justify-center gap-3">
            {swatches.map((sw, i) => (
              <div key={sw} className="flex flex-col items-center gap-2">
                <span className={`block w-10 rounded-t-full rounded-b-lg shadow-md sm:w-14 ${sw}`} style={{ height: `${70 + ((i * 23) % 50)}px` }} aria-hidden />
                <span className="font-mono text-[10px] text-muted-foreground">{`S-0${i + 1}`}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{v.swatchCaption}</p>

          <dl className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center divide-x divide-rose-200 rtl:divide-x-reverse dark:divide-rose-900">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col px-6 py-2">
                <dt className="text-xs text-muted-foreground">{st.label}</dt>
                <dd className="order-first text-2xl font-semibold text-rose-600 dark:text-rose-400">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Flow as soft pills */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-rose-600 dark:text-rose-400" center />
          <ol className="flex flex-wrap justify-center gap-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="w-full max-w-xs rounded-[2rem] bg-rose-50 p-6 text-center dark:bg-rose-950/30">
                <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-rose-600 shadow-sm dark:bg-rose-900/50 dark:text-rose-300">{i + 1}</span>
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
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-rose-600 dark:text-rose-400" />
          <div className="space-y-6">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className={`grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-last" : ""}`}>
                <div className={`flex aspect-[5/2] items-center justify-center rounded-3xl ${i % 2 ? "bg-pink-100 dark:bg-pink-950/40" : "bg-rose-100 dark:bg-rose-950/40"}`}>
                  <span className="text-6xl font-light text-rose-400 dark:text-rose-600">0{i + 1}</span>
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
          <SampleTable
            s={s}
            frame="border-rose-200 dark:border-rose-900/60"
            head="bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
            badge="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-rose-600 dark:text-rose-400"
        card="border-rose-100 bg-card hover:border-rose-300 dark:border-rose-950"
        icon="text-rose-500"
        item="border-rose-100 bg-card dark:border-rose-950 open:bg-rose-50/50 dark:open:bg-rose-950/20"
        chip="border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
        surface="bg-rose-50/40 dark:bg-rose-950/10"
      />
      <Closing s={s} panel="bg-gradient-to-br from-rose-100 to-pink-200 text-rose-950 dark:from-rose-900 dark:to-pink-900 dark:text-rose-50" accent="text-rose-700 dark:text-rose-200" />
    </main>
  );
}

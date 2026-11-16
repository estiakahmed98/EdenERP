import { Bone, Cat, Dog, PawPrint } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

/** Soft supporting tints from the shared palette, one per channel / pillar. */
const tints = ["bg-(--sector-sage)", "bg-(--sector-sand)", "bg-(--sector-wash)", "bg-(--sector-sand)"];
const icons = [Dog, Cat, Bone, PawPrint];

/** Pet Care: friendly, channel-led (pet shops, vets, online, own outlets) with paw-print accents. */
export default async function PetCarePage() {
  const s = await loadSector("fmcg", "pet-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="relative overflow-hidden bg-gradient-to-b from-(--sector-sage) to-background">
        {/* scattered paw prints */}
        {["start-[6%] top-[22%] rotate-12", "start-[46%] top-[10%] -rotate-12", "end-[4%] bottom-[14%] rotate-45", "start-[38%] bottom-[8%] -rotate-6"].map((pos) => (
          <PawPrint key={pos} aria-hidden className={`pointer-events-none absolute size-10 text-(--sector-blue) opacity-[0.07] ${pos}`} />
        ))}
        <Crumbs s={s} />
        <div className={`${wrap} relative grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:py-20`}>
          <div>
            <Eyebrow>{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-tight text-(--ink) sm:text-6xl">
              {p.hero.title}{" "}
              <span className="text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <div aria-hidden className="mt-3 flex gap-1.5 text-(--sector-blue)">
              {[0, 1, 2].map((i) => (
                <PawPrint key={i} className="size-4" style={{ opacity: 1 - i * 0.3 }} />
              ))}
            </div>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-8 flex flex-wrap gap-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
                  <dt className="order-last text-sm text-muted-foreground">{st.label}</dt>
                  <dd className="font-bold text-(--sector-blue)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Channel hub */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              {["channel1", "channel2", "channel3", "channel4"].map((k, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={k}
                    className={`rounded-3xl border border-border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${tints[i]}`}
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-card text-(--sector-blue) shadow-sm">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <p className="mt-4 font-bold text-(--ink)">{v[k]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{v[`${k}Note`]}</p>
                  </div>
                );
              })}
            </div>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-(--sector-blue) shadow-md"
            >
              <PawPrint className="size-7" />
            </span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary">
                  <span className={`flex size-12 items-center justify-center rounded-2xl text-(--sector-blue) ${tints[i]}`}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-(--ink)">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flow: paw-print trail */}
      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} />
          <ol className="relative grid gap-6 md:grid-cols-4">
            <div aria-hidden className="absolute start-6 end-6 top-6 hidden border-t-2 border-dashed border-border md:block" />
            {p.flow.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-border bg-card text-(--sector-blue) shadow-sm">
                  <PawPrint className="size-5" aria-hidden />
                  <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-(--sector-blue) text-[10px] font-bold text-card">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-bold text-(--ink)">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
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

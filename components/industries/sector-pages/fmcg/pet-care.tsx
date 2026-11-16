import { Bone, Cat, Dog, PawPrint } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const stickers = [
  "-rotate-2 bg-accent/20 text-[color-mix(in_oklab,var(--accent),var(--foreground)_35%)]",
  "rotate-1 bg-chart-4/20 text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]",
  "rotate-2 bg-primary/20 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]",
  "-rotate-1 bg-chart-4/20 text-[color-mix(in_oklab,var(--chart-4),var(--foreground)_35%)]",
];
const icons = [Dog, Cat, Bone, PawPrint];

/** Pet Care: playful sticker cards, channel-led (pet shops, vets, online). */
export default async function PetCarePage() {
  const s = await loadSector("fmcg", "pet-care");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-accent/5">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:py-20`}>
          <div>
            <Eyebrow className="text-chart-4">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              {p.hero.title}{" "}
              <span className="inline-block -rotate-1 rounded-xl bg-chart-4 px-3 py-1 text-primary-foreground">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-8 flex flex-wrap gap-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-center gap-2 rounded-full border-2 border-foreground/80 bg-card px-4 py-2">
                  <dt className="order-last text-sm text-foreground">{st.label}</dt>
                  <dd className="font-black text-chart-4">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            {["channel1", "channel2", "channel3", "channel4"].map((k, i) => {
              const Icon = icons[i];
              return (
                <div key={k} className={`rounded-3xl border-2 border-foreground/80 p-5 shadow-[4px_4px_0_0] shadow-foreground/80 ${stickers[i]}`}>
                  <Icon className="size-8" aria-hidden />
                  <p className="mt-4 font-bold">{v[k]}</p>
                  <p className="mt-1 font-mono text-xs opacity-80">{v[`${k}Note`]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticker pillars */}
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-chart-4" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className={`rounded-3xl border-2 border-foreground/80 p-6 shadow-[5px_5px_0_0] shadow-foreground/80 transition-transform hover:rotate-0 ${stickers[i]}`}>
                <h3 className="text-lg font-black">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow as checklist cards */}
      <section className="bg-chart-4/5 py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.flowEyebrow} title={v.flowTitle} accent="text-chart-4" />
          <ol className="grid gap-4 md:grid-cols-2">
            {p.flow.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl bg-card p-5">
                <PawPrint className={`size-6 shrink-0 ${i % 2 ? "text-accent" : "text-chart-4"}`} aria-hidden />
                <div>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SampleTable
            s={s}
            frame="border-2 border-foreground/80"
            head="bg-accent/20 text-[color-mix(in_oklab,var(--accent),var(--foreground)_35%)]"
            badge="bg-chart-4 text-primary-foreground"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-chart-4"
        card="border-2 border-foreground/70 bg-card hover:bg-accent/5"
        icon="text-chart-4"
        item="border-2 border-foreground/70 bg-card"
        chip="border-2 border-foreground/70 hover:bg-chart-4/10"
        surface="bg-accent/5"
      />
      <Closing s={s} panel="border-2 border-foreground/80 bg-chart-4 text-primary-foreground shadow-[6px_6px_0_0] shadow-foreground/80" accent="text-primary-foreground/80" />
    </main>
  );
}

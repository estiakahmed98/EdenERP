import { BedDouble, ClipboardList, ReceiptText, Stethoscope, UserRound } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const journey = [
  { key: "jOpd", Icon: UserRound },
  { key: "jAdmit", Icon: ClipboardList },
  { key: "jWard", Icon: BedDouble },
  { key: "jBill", Icon: ReceiptText },
  { key: "jDischarge", Icon: Stethoscope },
] as const;

/** Bed board: o = occupied, f = available, c = being cleaned. Fictional. */
const beds = "ooofoocoofooooocfoooofoo";
const bedTone = {
  o: "bg-(--sector-blue) text-card",
  f: "border border-dashed border-(--sector-green) bg-card text-(--sector-green)",
  c: "bg-(--sector-sand) text-(--sector-amber)",
} as const;

/** Hospital: patient journey stepper and a ward bed board. */
export default async function HealthHospitalPage() {
  const s = await loadSector("health", "hospital");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="border-b border-border bg-gradient-to-b from-(--sector-wash) to-background">
        <Crumbs s={s} />
        <div className={`${wrap} py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Eyebrow>{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-(--ink) sm:text-5xl">
              {p.hero.title} <span className="text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
          </div>

          {/* Patient journey */}
          <figure className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <ol className="grid gap-4 sm:grid-cols-5">
              {journey.map(({ key, Icon }, i) => (
                <li key={key} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
                  {i < journey.length - 1 && (
                    <span aria-hidden className="absolute start-1/2 top-6 hidden h-px w-full bg-(--sector-blue)/30 sm:block" />
                  )}
                  <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-(--sector-wash) text-(--sector-blue) ring-4 ring-card">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-(--ink)">{v[key]}</span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-6 text-center text-xs text-muted-foreground">{v.journeyCaption}</figcaption>
          </figure>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col rounded-2xl border border-border bg-card px-5 py-4">
                <dt className="order-last text-sm text-muted-foreground">{st.label}</dt>
                <dd className="text-2xl font-bold text-(--sector-blue)">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start`}>
          <div>
            <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
            <div className="grid gap-4 sm:grid-cols-2">
              {p.pillars.map((pl) => (
                <div key={pl.title} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-(--ink)">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bed board */}
          <figure className="rounded-3xl border border-border bg-(--cream) p-6">
            <figcaption className="font-semibold text-(--ink)">{v.wardTitle}</figcaption>
            <div className="mt-5 grid grid-cols-6 gap-2" aria-hidden>
              {[...beds].map((b, i) => (
                <span
                  key={i}
                  className={`grid aspect-square place-items-center rounded-lg font-mono text-[11px] font-semibold ${bedTone[b as keyof typeof bedTone]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="size-3 rounded bg-(--sector-blue)" aria-hidden />{v.legendOccupied}</li>
              <li className="flex items-center gap-2"><span className="size-3 rounded border border-dashed border-(--sector-green)" aria-hidden />{v.legendFree}</li>
              <li className="flex items-center gap-2"><span className="size-3 rounded bg-(--sector-sand)" aria-hidden />{v.legendCleaning}</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">{v.wardCaption}</p>
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow>{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-(--ink) sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
                <span className="font-mono text-xs font-semibold text-(--sector-blue)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-(--ink)">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <SampleTable s={s} />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{v.clinicalNote}</p>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

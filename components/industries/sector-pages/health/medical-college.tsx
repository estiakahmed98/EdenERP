import { BookOpenCheck, GraduationCap, Hospital, UsersRound } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [UsersRound, BookOpenCheck, Hospital, GraduationCap];
const phases = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

/** Medical college: MBBS phase timeline from admission to internship. */
export default async function HealthMedicalCollegePage() {
  const s = await loadSector("health", "medical-college");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="border-b border-border bg-(--cream)">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow>{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-(--ink) sm:text-5xl">
              {p.hero.title} <span className="italic text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 border-t border-foreground/40">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-baseline justify-between gap-6 border-b border-foreground/40 py-4">
                  <dt className="text-sm text-muted-foreground">{st.label}</dt>
                  <dd className="font-serif text-xl text-(--sector-blue)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Academic timeline */}
          <figure className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <figcaption className="font-semibold text-(--ink)">{v.timelineTitle}</figcaption>
            <ol className="mt-6 space-y-0">
              {phases.map((k, i) => (
                <li key={k} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${
                        i < 3 ? "bg-(--sector-blue) text-card" : i === 3 ? "bg-(--sector-wash) text-(--sector-blue) ring-2 ring-(--sector-blue)" : "bg-(--cream) text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i < phases.length - 1 && <span aria-hidden className="h-6 w-px bg-border" />}
                  </div>
                  <p className={`pt-2 text-sm ${i === 3 ? "font-semibold text-(--sector-blue)" : "text-(--ink)"}`}>{v[k]}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted-foreground">{v.timelineCaption}</p>
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-5 md:grid-cols-2">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="flex gap-5 border-t-2 border-(--sector-blue) pt-5">
                  <Icon className="size-7 shrink-0 text-(--sector-blue)" strokeWidth={1.5} aria-hidden />
                  <div>
                    <h3 className="font-semibold text-(--ink)">{pl.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-(--sector-wash) py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow>{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-(--ink) sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-card p-5">
                <span className="font-serif text-3xl text-(--sector-blue)">{i + 1}</span>
                <h3 className="mt-2 font-semibold text-(--ink)">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <SampleTable s={s} />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{v.regNote}</p>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

import { FlaskConical, Microscope, Pill, ShieldCheck } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [FlaskConical, Microscope, ShieldCheck, Pill];

/** Pharmaceuticals: batch genealogy tree and GMP-style release record. */
export default async function GroupPharmaPage() {
  const s = await loadSector("group", "pharmaceuticals");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--sector-green)_25%,transparent)_1px,transparent_0)] bg-[size:22px_22px]" />
        <Crumbs s={s} />
        <div className={`${wrap} relative grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow className="text-(--sector-blue)">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              {p.hero.title} <span className="font-bold text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 space-y-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-center gap-4">
                  <dt className="order-last text-sm text-muted-foreground">{st.label}</dt>
                  <dd className="min-w-24 rounded-lg bg-(--sector-green) px-3 py-1.5 text-center font-mono text-sm font-bold text-card">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Genealogy tree */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-foreground">{v.treeTitle}</p>
            <div className="mt-6 flex flex-col items-center">
              <div className="rounded-xl bg-(--sector-green) px-4 py-2 text-center text-card">
                <p className="font-mono text-xs opacity-80">{v.fgCode}</p>
                <p className="text-sm font-semibold">{v.fgName}</p>
              </div>
              <span className="h-6 w-px bg-(--sector-sage)" aria-hidden />
              <div className="h-px w-3/4 bg-(--sector-sage)" aria-hidden />
              <div className="grid w-full grid-cols-3 gap-2">
                {["in1", "in2", "in3"].map((k) => (
                  <div key={k} className="flex flex-col items-center">
                    <span className="h-5 w-px bg-(--sector-sage)" aria-hidden />
                    <div className="w-full rounded-lg border border-border bg-(--sector-sage) px-2 py-2 text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">{v[`${k}Code`]}</p>
                      <p className="text-xs font-semibold text-foreground">{v[k]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{v.treeNote}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-5 md:grid-cols-2">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="flex gap-5 rounded-2xl border border-border bg-gradient-to-br from-(--sector-sage) to-card p-6">
                  <Icon className="size-8 shrink-0 text-(--sector-blue)" strokeWidth={1.5} aria-hidden />
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

      {/* Flow as a lab protocol */}
      <section className="bg-(--cream) py-16 text-(--ink) sm:py-20">
        <div className={wrap}>
          <Eyebrow className="text-(--sector-blue)">{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 overflow-hidden rounded-2xl border border-(--sector-green)">
            {p.flow.map((step, i) => (
              <li key={step.title} className="grid gap-2 border-b border-(--sector-green) p-5 last:border-b-0 sm:grid-cols-[6rem_1fr_2fr] sm:gap-6">
                <span className="font-mono text-sm text-(--sector-blue)">{v.stepPrefix}-{i + 1}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
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

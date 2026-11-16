import { Landmark } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap } from "../kit";

const subs = ["sub1", "sub2", "sub3", "sub4"];

/** Financial Services: navy + gold, consolidation tree and intercompany eliminations. */
export default async function FinancialServicesPage() {
  const s = await loadSector("group", "financial-services");
  const { p } = s;
  const v = p.visual;

  return (
    <main className="bg-background">
      <section className="bg-secondary text-secondary-foreground/85">
        <Crumbs s={s} tone="text-secondary-foreground/65" />
        <div className={`${wrap} py-16 lg:py-24`}>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-[color-mix(in_oklab,var(--primary),white_55%)]">{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
              {p.hero.title} <span className="text-[color-mix(in_oklab,var(--primary),white_55%)]">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary-foreground/85">{p.hero.lead}</p>
          </div>

          {/* Consolidation tree */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="mx-auto w-fit rounded-xl border border-primary/30 bg-primary/10 px-6 py-3 text-center">
              <Landmark className="mx-auto size-5 text-[color-mix(in_oklab,var(--primary),white_55%)]" aria-hidden />
              <p className="mt-1 font-semibold">{v.parent}</p>
              <p className="font-mono text-[11px] text-[color-mix(in_oklab,var(--primary),white_55%)]">{v.parentNote}</p>
            </div>
            <span className="mx-auto block h-6 w-px bg-primary/30" aria-hidden />
            <div className="mx-auto h-px w-3/4 bg-primary/30" aria-hidden />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {subs.map((k) => (
                <div key={k} className="flex flex-col items-center">
                  <span className="h-5 w-px bg-primary/30" aria-hidden />
                  <div className="w-full rounded-lg border border-white/15 bg-white/5 p-3 text-center">
                    <p className="text-sm font-semibold">{v[k]}</p>
                    <p className="font-mono text-[11px] text-secondary-foreground/65">{v[`${k}Note`]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col bg-secondary p-5 text-center">
                <dt className="text-xs text-secondary-foreground/65">{st.label}</dt>
                <dd className="order-first font-serif text-2xl text-[color-mix(in_oklab,var(--primary),white_55%)]">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} accent="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]" />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {p.pillars.map((pl, i) => (
              <div key={pl.title} className="bg-card p-8">
                <span className="font-serif text-3xl text-primary">{["I", "II", "III", "IV"][i]}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{pl.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{pl.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Month-end close flow */}
      <section className="bg-muted py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.5fr]`}>
          <div>
            <Eyebrow className="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{s.c.flowEyebrow}</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">{v.flowTitle}</h2>
          </div>
          <ol className="space-y-3">
            {p.flow.map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-xl border border-border bg-card p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary font-serif text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
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
            frame="border-border"
            head="bg-secondary text-secondary-foreground"
            badge="bg-primary/10 text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
          />
        </div>
      </section>

      <Tail
        s={s}
        accent="text-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)]"
        card="border-border bg-card hover:border-primary"
        icon="text-primary"
        item="border-border bg-card open:border-primary/80"
        chip="border-border hover:bg-muted"
        surface="bg-muted/30"
      />
      <Closing s={s} panel="bg-secondary text-secondary-foreground/85" accent="text-[color-mix(in_oklab,var(--primary),white_55%)]" />
    </main>
  );
}

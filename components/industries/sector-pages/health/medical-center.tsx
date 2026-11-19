import { CalendarClock, ClipboardPen, PhoneCall, Wallet } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [CalendarClock, PhoneCall, ClipboardPen, Wallet];
const chambers = ["1", "2", "3"] as const;

/** Medical center / clinic: today's chamber schedule and a serial display. */
export default async function HealthMedicalCenterPage() {
  const s = await loadSector("health", "medical-center");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={sectorRoot}>
      <section className="border-b border-border">
        <Crumbs s={s} />
        <div className={`${wrap} grid gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow>{p.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-(--ink) sm:text-5xl">
              {p.hero.title}
              <br />
              <span className="text-(--sector-blue)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border rtl:divide-x-reverse">
              {p.stats.map((st) => (
                <div key={st.label} className="flex flex-col px-4 py-4">
                  <dt className="order-last mt-1 text-xs leading-snug text-muted-foreground">{st.label}</dt>
                  <dd className="text-base font-bold text-(--sector-blue) sm:text-lg">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Chamber schedule with a serial display */}
          <figure className="relative rounded-3xl border border-border bg-(--sector-wash) p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <figcaption className="font-semibold text-(--ink)">{v.chamberTitle}</figcaption>
              <div className="rounded-xl bg-(--sector-blue) px-4 py-2 text-center text-card">
                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{v.nowServing}</p>
                <p className="font-mono text-lg font-bold">{v.serialNo}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {chambers.map((n, i) => (
                <li key={n} className={`rounded-2xl border bg-card p-4 ${i === 1 ? "border-(--sector-blue)" : "border-border"}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-(--ink)">{v[`doc${n}`]}</p>
                    <p className="font-mono text-xs text-muted-foreground">{v[`time${n}`]}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                    <span className="rounded-full bg-(--sector-sage) px-2.5 py-1 font-medium text-(--sector-green)">{v[`spec${n}`]}</span>
                    <span className="font-semibold text-(--sector-blue)">{v[`serials${n}`]}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">{v.chamberCaption}</p>
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-(--sector-wash) text-(--sector-blue)">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-(--ink)">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.3fr]`}>
          <div>
            <Eyebrow>{s.c.flowEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-(--ink) sm:text-4xl">{v.flowTitle}</h2>
            <ol className="mt-8 space-y-6 border-s-2 border-(--sector-blue)/30 ps-6">
              {p.flow.map((step, i) => (
                <li key={step.title} className="relative">
                  <span aria-hidden className="absolute -start-[31px] top-1 size-3 rounded-full bg-(--sector-blue) ring-4 ring-(--cream)" />
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-semibold text-(--ink)">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:pt-12">
            <SampleTable s={s} />
          </div>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

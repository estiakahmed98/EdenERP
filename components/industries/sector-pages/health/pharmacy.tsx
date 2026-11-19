import design from "./health-design.module.css";
import LiveDemoButton from "@/components/live-demo-button";
import { AlertTriangle, CalendarX2, PackageSearch, ScanBarcode, Truck } from "lucide-react";
import { Closing, Crumbs, Eyebrow, SampleTable, SectionHead, Tail, loadSector, wrap, sectorRoot } from "../kit";

const icons = [ScanBarcode, CalendarX2, PackageSearch, Truck];
const items = ["1", "2", "3"] as const;

/** Pharmacy: counter bill with batch/expiry per line and near-expiry alerts. */
export default async function HealthPharmacyPage() {
  const s = await loadSector("health", "pharmacy");
  const { p } = s;
  const v = p.visual;

  return (
    <main className={`${sectorRoot} ${design.page} ${design.pharmacy}`}>
      <section className={design.hero}>
        <Crumbs s={s} />
        <div className={`${wrap} ${design.heroLayout} grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20`}>
          <div>
            <Eyebrow>{p.hero.eyebrow}</Eyebrow>
            <h1 className={`${design.headline} mt-4 text-4xl font-bold leading-tight tracking-tight text-(--ink) sm:text-5xl`}>
              {p.hero.title} <span className="text-(--sector-green)">{p.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.hero.lead}</p>
            <div className={design.heroActions}><LiveDemoButton /></div>
            <dl className="mt-10 flex flex-wrap gap-3">
              {p.stats.map((st) => (
                <div key={st.label} className="flex items-baseline gap-1.5 rounded-full border border-border bg-(--sector-sage) px-4 py-2 text-sm">
                  <dt className="order-last text-muted-foreground">{st.label}</dt>
                  <dd className="font-bold text-(--sector-green)">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Counter bill + expiry alert */}
          <div className="relative">
            <figure className={`${design.preview} rounded-3xl border border-border bg-card p-6 font-mono text-sm shadow-sm sm:p-8`}>
              <figcaption className="flex items-center justify-between border-b border-dashed border-border pb-3 font-sans font-semibold text-(--ink)">
                {v.receiptTitle}
                <span className="rounded-full bg-(--sector-wash) px-2.5 py-1 text-[11px] font-semibold text-(--sector-blue)">{s.c.sampleBadge}</span>
              </figcaption>
              <ul className="divide-y divide-dashed divide-border">
                {items.map((n) => (
                  <li key={n} className="py-3">
                    <div className="flex items-baseline justify-between gap-3 text-(--ink)">
                      <span className="font-sans font-medium">{v[`item${n}`]}</span>
                      <span>{v[`amt${n}`]}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {v[`qty${n}`]} · {v.batchLabel} {v[`batch${n}`]} · {v.expiryLabel} {v[`exp${n}`]}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-between border-t-2 border-(--ink) pt-3 font-bold text-(--ink)">
                <span className="font-sans">{v.totalLabel}</span>
                <span className="text-lg">{v.totalValue}</span>
              </div>
              <p className="mt-3 font-sans text-xs text-muted-foreground">{v.receiptCaption}</p>
            </figure>
            <div className="mt-4 rounded-2xl border border-(--sector-amber)/40 bg-(--sector-sand) p-4 lg:absolute lg:-bottom-10 lg:-start-10 lg:mt-0 lg:w-72">
              <p className="flex items-center gap-2 text-sm font-semibold text-(--sector-amber)">
                <AlertTriangle className="size-4" aria-hidden />
                {v.alertTitle}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-(--ink)">
                <li>{v.alert1}</li>
                <li>{v.alert2}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.pillarsEyebrow} title={v.pillarsTitle} />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {p.pillars.map((pl, i) => {
              const Icon = icons[i];
              return (
                <div key={pl.title} className="bg-card p-6">
                  <Icon className="size-7 text-(--sector-green)" strokeWidth={1.6} aria-hidden />
                  <h3 className="mt-4 font-semibold text-(--ink)">{pl.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pl.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <Eyebrow>{s.c.flowEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-(--ink) sm:text-4xl">{v.flowTitle}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.flow.map((step, i) => (
              <li key={step.title} className="border-t-2 border-(--sector-green) pt-4">
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-semibold text-(--ink)">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <SampleTable s={s} />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{v.rxNote}</p>
        </div>
      </section>

      <Tail s={s} />
      <Closing s={s} />
    </main>
  );
}

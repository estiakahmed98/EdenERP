"use client";

import LiveDemoButton from "@/components/live-demo-button";

import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCheck,
  CircleAlert,
  ClipboardCheck,
  Layers3,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { qualityPages, suppliedSpcSummary, type QualitySlug } from "./data";
import { Provenance, css } from "./ui";

function Breadcrumb({ slug }: { slug: QualitySlug }) {
  return (
    <nav className={css.breadcrumb} aria-label="Breadcrumb">
      <Link href="/apps/supply-chain/quality">Quality (QMS)</Link>
      <ArrowRight size={12} aria-hidden="true" />
      <span aria-current="page">{qualityPages[slug].title}</span>
    </nav>
  );
}
function HeroActions() {
  return (
    <div className={css.heroActions}>
      <LiveDemoButton />
      <Link href="#qms-workspace" className={css.exploreLink}>
        Explore the workspace
        <ArrowDown size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

function DashboardHero() {
  return (
    <section className={css.dashboardHero} data-qms-hero="quality-dashboard">
      <div className={css.wrap}>
        <Breadcrumb slug="quality-dashboard" />
        <div className={css.observatory}>
          <div className={css.observatoryCopy}>
            <span className={css.eyebrow}>Quality intelligence / 01</span>
            <h1 className="showcase-heading">
              Every signal.
              <br />A clearer <span>quality story.</span>
            </h1>
            <p>
              See the exceptions, follow the actions and keep your production
              quality in focus.
            </p>
            <HeroActions />
            <div className={css.heroEvidence}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Supplied quality snapshot · Last 90 days</span>
            </div>
          </div>
          <div className={css.observatoryBento}>
            <figure className={css.yieldTile}>
              <div className={css.tileLabel}>
                First-pass yield
                <CheckCheck size={15} aria-hidden="true" />
              </div>
              <div className={css.yieldOrbit}>
                <svg
                  viewBox="0 0 180 180"
                  role="img"
                  aria-label="Supplied first-pass yield: 92 percent"
                  fill="none"
                >
                  <circle
                    cx="90"
                    cy="90"
                    r="72"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="72"
                    pathLength="100"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeDasharray="92 100"
                    transform="rotate(-90 90 90)"
                    strokeLinecap="round"
                  />
                  <text
                    x="90"
                    y="100"
                    textAnchor="middle"
                    fill="var(--ink)"
                    fontSize="37"
                    fontWeight="600"
                  >
                    92%
                  </text>
                </svg>
              </div>
              <figcaption>Inspect the outcome.</figcaption>
            </figure>
            <div className={css.riskTile}>
              <span className={css.microLabel}>Open quality cases</span>
              <strong>
                4<span>of 6 raised</span>
              </strong>
              <div>
                <CircleAlert size={15} aria-hidden="true" />
                <span>1 critical NC in the snapshot</span>
              </div>
            </div>
            <div className={css.signalTile}>
              <div>
                <span className={css.microLabel}>October 2026</span>
                <h2>
                  6 findings.
                  <br />
                  One month in view.
                </h2>
              </div>
              <div
                className={css.signalStack}
                role="img"
                aria-label="October 2026: six non-conformances, including one critical"
              >
                <span />
                <i />
                <small>1 critical</small>
              </div>
            </div>
            <div className={css.actionTile}>
              <ClipboardCheck size={21} aria-hidden="true" />
              <span>Open CAPAs</span>
              <strong>4</strong>
              <small>0 overdue</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NcHero() {
  return (
    <section className={css.ncHero} data-qms-hero="non-conformance">
      <div className={css.wrap}>
        <Breadcrumb slug="non-conformance" />
        <div className={css.ncHeroHeader}>
          <div>
            <span className={css.eyebrow}>Exception management / 02</span>
            <h1 className="showcase-heading">
              Find the exception.
              <br />
              <span>Keep the whole story.</span>
            </h1>
          </div>
          <div>
            <p>
              Give every quality finding a clear source, a considered
              disposition and an evidence trail worth following.
            </p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.exceptionFile}>
          <div className={css.fileIndex}>
            <span>QUALITY CASE FILE</span>
            <strong>NC-0004</strong>
            <small>Detected Oct 19, 2026</small>
          </div>
          <div className={css.fileEvidence}>
            <div className={css.fileEvidenceTop}>
              <span>Corrugation pitch out of tolerance</span>
              <span>Production · Major</span>
            </div>
            <svg
              viewBox="0 0 650 105"
              role="img"
              aria-label="Illustrative corrugated profile with one highlighted tolerance exception; no measured values are implied."
              fill="none"
            >
              <rect
                x="0"
                y="25"
                width="650"
                height="45"
                rx="3"
                fill="var(--primary)"
                fillOpacity=".04"
              />
              <path
                d="M0 47H650"
                stroke="var(--primary)"
                strokeOpacity=".25"
                strokeDasharray="4 7"
              />
              <path
                d="M10 72 35 35H68L91 72H116L141 35H174L197 72H222L252 17H285L307 72H332L357 35H390L413 72H438L463 35H496L519 72H544L569 35H602L625 72H640"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle
                cx="267"
                cy="24"
                r="18"
                stroke="#c38c24"
                strokeWidth="1.5"
              />
              <path d="m282 12 23-9" stroke="#c38c24" strokeWidth="1.5" />
              <text x="312" y="13" fontSize="10" fill="var(--muted-foreground)">
                review the exception
              </text>
            </svg>
            <figcaption>
              Illustrative profile · Case identity and severity come from the
              supplied record.
            </figcaption>
          </div>
          <div className={css.fileDisposition}>
            <span className={css.microLabel}>Current source status</span>
            <strong>Open</strong>
            <p>Contain → investigate → act</p>
            <Provenance />
          </div>
        </figure>
      </div>
    </section>
  );
}

function CapaHero() {
  return (
    <section className={css.capaHero} data-qms-hero="capa">
      <div className={css.wrap}>
        <Breadcrumb slug="capa" />
        <header className={css.capaHeroHeader}>
          <span className={css.eyebrow}>
            Corrective & preventive action / 03
          </span>
          <h1 className="showcase-heading">
            A finding becomes an action.
            <br />
            <span>Evidence closes the loop.</span>
          </h1>
          <p>
            Bring root-cause thinking, accountable work and verification into
            one deliberate quality journey.
          </p>
          <HeroActions />
        </header>
        <figure className={css.actionArchitecture}>
          <div className={css.actionRoute} aria-hidden="true" />
          <div className={css.capaSketch}>
            Verify the fix.
            <svg viewBox="0 0 90 44" aria-hidden="true" fill="none">
              <path
                d="M79 4C76 29 43 4 32 25C28 34 20 36 7 35M15 28 6 35 17 40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {[
            {
              label: "Understand",
              caption: "Define the problem",
              Icon: Microscope,
            },
            {
              label: "Plan",
              caption: "Choose the right action",
              Icon: Layers3,
            },
            { label: "Act", caption: "Follow the work", Icon: ClipboardCheck },
            {
              label: "Verify",
              caption: "Review effectiveness",
              Icon: ShieldCheck,
            },
          ].map(({ label, caption, Icon }, index) => (
            <div className={css.actionPavilion} key={label}>
              <div className={css.isometricPlinth}>
                <svg viewBox="0 0 160 100" aria-hidden="true" fill="none">
                  <path
                    d="m12 40 68-31 68 31-68 31Z"
                    fill="var(--card)"
                    stroke="var(--primary)"
                    strokeOpacity=".3"
                  />
                  <path
                    d="m12 40 68 31v16L12 56Z"
                    fill="var(--primary)"
                    fillOpacity=".08"
                    stroke="var(--primary)"
                    strokeOpacity=".2"
                  />
                  <path
                    d="m80 71 68-31v16L80 87Z"
                    fill="var(--primary)"
                    fillOpacity=".17"
                    stroke="var(--primary)"
                    strokeOpacity=".2"
                  />
                </svg>
                <Icon size={28} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <span>0{index + 1}</span>
              <h2>{label}</h2>
              <p>{caption}</p>
            </div>
          ))}
          <figcaption>
            Supplied snapshot: 5 CAPAs · 4 open · 1 closed. The process
            illustration is a workflow model.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function AqlHero() {
  return (
    <section className={css.aqlHero} data-qms-hero="aql-sampling">
      <div className={css.wrap}>
        <Breadcrumb slug="aql-sampling" />
        <div className={css.samplingLab}>
          <figure className={css.lotField}>
            <div className={css.tileLabel}>
              FROM LOT TO SAMPLE<span>Code H</span>
            </div>
            <div
              className={css.lotDots}
              role="img"
              aria-label="Sampling illustration: 500 units in a lot, sample 50. Each dot represents five units."
            >
              {Array.from({ length: 100 }, (_, i) => (
                <i key={i} className={i < 10 ? css.sampleDot : undefined} />
              ))}
            </div>
            <div className={css.lotReduction}>
              <div>
                <span>Lot quantity</span>
                <strong>500</strong>
              </div>
              <ArrowRight size={25} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span>Sample quantity</span>
                <strong>50</strong>
              </div>
            </div>
            <figcaption>
              Each dot represents 5 units. Supplied AQL 2.5 / General II
              example.
            </figcaption>
          </figure>
          <div className={css.samplingCopy}>
            <span className={css.eyebrow}>Acceptance sampling / 04</span>
            <h1 className="showcase-heading">
              A smaller sample.
              <br />
              <span>A transparent decision.</span>
            </h1>
            <p>
              Give lot size, inspection basis and acceptance limits a clear
              place in the quality conversation.
            </p>
            <div className={css.samplingThreshold}>
              <span>
                <Check size={13} aria-hidden="true" />
                Accept ≤ 3
              </span>
              <span>Reject ≥ 4</span>
            </div>
            <HeroActions />
            <p className={css.heroFootnote}>
              The interactive demo uses the numeric excerpt supplied in your
              screenshot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpcHero() {
  const { mean, sigma, lsl, usl } = suppliedSpcSummary;
  const points = Array.from({ length: 101 }, (_, i) => {
    const x = 20 + i * 0.07;
    return `${45 + (x - 20) * 100},${180 - Math.exp(-0.5 * ((x - mean) / sigma) ** 2) * 145}`;
  }).join(" ");
  return (
    <section className={css.spcHero} data-qms-hero="spc">
      <div className={css.wrap}>
        <Breadcrumb slug="spc" />
        <div className={css.spcHeroHeader}>
          <div>
            <span className={css.eyebrow}>
              Statistical process control / 05
            </span>
            <h1 className="showcase-heading">
              Read the variation.
              <br />
              <span>Understand the process.</span>
            </h1>
          </div>
          <div>
            <p>
              Put process behavior, control limits and specification context in
              the same field of view.
            </p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.processObservatory}>
          <div className={css.processInstrument}>
            <svg
              viewBox="0 0 800 220"
              role="img"
              aria-label="Illustrative normal model using the supplied mean 23.3958 and sigma 0.8053, with specification limits 22 and 25 micrometers."
              fill="none"
            >
              <path
                d="M30 180H770M30 110H770M30 40H770"
                stroke="white"
                strokeOpacity=".07"
              />
              <rect
                x={45 + (lsl - 20) * 100}
                y="20"
                width={(usl - lsl) * 100}
                height="160"
                fill="#1088ef"
                fillOpacity=".08"
              />
              <path
                d={`M${45 + (lsl - 20) * 100} 20V180M${45 + (usl - 20) * 100} 20V180`}
                stroke="#f0be5d"
                strokeDasharray="4 6"
              />
              <polyline points={points} stroke="#72c5ff" strokeWidth="2.5" />
              <path
                d={`M${45 + (mean - 20) * 100} 30V180`}
                stroke="#72c5ff"
                strokeDasharray="2 7"
                strokeOpacity=".5"
              />
              <text
                x={45 + (lsl - 20) * 100}
                y="202"
                textAnchor="middle"
                fill="#c5d6ed"
                fontSize="11"
              >
                LSL 22
              </text>
              <text
                x={45 + (mean - 20) * 100}
                y="202"
                textAnchor="middle"
                fill="#72c5ff"
                fontSize="11"
              >
                MEAN 23.3958
              </text>
              <text
                x={45 + (usl - 20) * 100}
                y="202"
                textAnchor="middle"
                fill="#c5d6ed"
                fontSize="11"
              >
                USL 25
              </text>
            </svg>
            <figcaption>
              Illustrative normal model based on the supplied summary; not the
              original QC readings.
            </figcaption>
          </div>
          <dl className={css.sourceSpcNumbers}>
            <div>
              <dt>Source Cp</dt>
              <dd>0.621</dd>
            </div>
            <div>
              <dt>Source Cpk</dt>
              <dd>0.578</dd>
            </div>
            <div>
              <dt>Readings analyzed</dt>
              <dd>100</dd>
            </div>
            <div>
              <dt>Beyond control limits</dt>
              <dd>3</dd>
            </div>
          </dl>
        </figure>
      </div>
    </section>
  );
}

const heroes = {
  "quality-dashboard": DashboardHero,
  "non-conformance": NcHero,
  capa: CapaHero,
  "aql-sampling": AqlHero,
  spc: SpcHero,
};
export default function QualityHero({ slug }: { slug: QualitySlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}

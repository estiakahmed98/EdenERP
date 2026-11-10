import { Check, ClipboardCheck, ScanLine, ShieldCheck } from "lucide-react";
import { ManufacturingCallout } from "../design-system";
import {
  Actions,
  Caption,
  css,
  Description,
  Diagram,
  Eyebrow,
  Frame,
  MiniLabel,
  Title,
  type HeroProps,
} from "./hero-parts";

export function BatchesHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="batches-lots" className={css.batchFrame}>
      <div className={css.batchLayout}>
        <div className={css.batchCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
          <div className={css.lotStamp}>
            LOT
            <br />
            <strong>LINKED</strong>
          </div>
        </div>
        <figure className={css.genealogy}>
          <MiniLabel>Supplied batch context</MiniLabel>
          <div className={css.genealogyRoot}>
            <span>Alif Plain Colour Sheet 0.40 mm CNG Green</span>
            <strong>PS-040-GRN</strong>
            <small>Product identity</small>
          </div>
          <div className={css.genealogyStem} aria-hidden="true" />
          <div className={css.genealogyMiddle}>
            <span>Batch reference</span>
            <strong>AS-2609-1089</strong>
            <small>Active</small>
          </div>
          <div className={css.genealogyFork} aria-hidden="true" />
          <div className={css.genealogyLeaves}>
            <div>
              <span>Manufactured</span>
              <strong>Sep 17, 2026</strong>
            </div>
            <div>
              <span>Recorded quantity</span>
              <strong>3,696.26</strong>
            </div>
          </div>
          <Caption>
            Product, batch identity, date and quantity from the supplied record.
          </Caption>
        </figure>
      </div>
    </Frame>
  );
}

export function SerialsHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="serial-numbers" className={css.serialFrame}>
      <header className={css.serialHeader}>
        <Eyebrow>{copy.category}</Eyebrow>
        <Title copy={copy} inline />
      </header>
      <figure className={css.unitPassport}>
        <div className={css.passportSeal}>
          <ScanLine size={32} strokeWidth={1.2} aria-hidden="true" />
          <span>
            UNIT
            <br />
            PASSPORT
          </span>
        </div>
        <div className={css.passportIdentity}>
          <MiniLabel>Individual production identity</MiniLabel>
          <h2>SN-2026-00081</h2>
          <div className={css.serialBarcode} aria-hidden="true">
            <span className={css.scanBeam} />
          </div>
          <p>Sealing unit assembly / Product SEAL-01</p>
        </div>
        <div className={css.passportChecks}>
          <span>
            <Check size={14} aria-hidden="true" />
            Production linked
          </span>
          <span>
            <Check size={14} aria-hidden="true" />
            Inspection recorded
          </span>
          <strong>MO-0161</strong>
          <small>Sample unit reference</small>
        </div>
        <Caption>A single unit deserves a single, traceable identity.</Caption>
      </figure>
      <div className={css.serialFooter}>
        <Description copy={copy} />
        <Actions target={target} />
      </div>
    </Frame>
  );
}

export function QcTemplatesHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="qc-templates" className={css.templateFrame}>
      <div className={css.templateLayout}>
        <div className={css.templateCopy}>
          <span className={css.templateEdition}>STANDARD / 001</span>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
        </div>
        <div className={css.templateArtwork}>
          <div className={css.templateAnnotation}>
            <ManufacturingCallout variant="swoop">
              Define what good looks like.
            </ManufacturingCallout>
          </div>
          <figure className={css.inspectionPaper}>
            <div className={css.paperUnderlay} aria-hidden="true" />
            <div className={css.paperFront}>
              <div className={css.paperHeader}>
                <ClipboardCheck
                  size={23}
                  strokeWidth={1.3}
                  aria-hidden="true"
                />
                <span>QCT-001 / IN-PROCESS</span>
              </div>
              <h2>
                Film thickness
                <br />
                inspection standard.
              </h2>
              <div className={css.paperFields}>
                {[
                  ["01", "Thickness", "Numeric · 45–55 μm"],
                  ["02", "Width", "Numeric · defined range"],
                  ["03", "Appearance", "Visual · acceptance criteria"],
                ].map(([n, label, value]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <p>
                      <strong>{label}</strong>
                      <small>{value}</small>
                    </p>
                    <Check size={13} aria-hidden="true" />
                  </div>
                ))}
              </div>
              <p className={css.paperFootnote}>
                Illustrative parameters · Required results belong to the
                checkpoint.
              </p>
            </div>
            <Caption>
              A reusable standard is the starting point for a consistent check.
            </Caption>
          </figure>
        </div>
      </div>
    </Frame>
  );
}

export function QualityHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="quality-control" className={css.qualityFrame}>
      <div className={css.qualityLayout}>
        <figure className={css.inspectionLens}>
          <div className={css.inspectionReference}>
            <MiniLabel>QC-1101 / Sample checkpoint</MiniLabel>
            <ShieldCheck size={20} aria-hidden="true" />
          </div>
          <Diagram
            label="Illustrative film-thickness inspection lens: a 51 micrometer reading within a sample 45 to 55 micrometer range."
            viewBox="0 0 400 350"
          >
            <defs>
              <clipPath id="qc-lens-clip">
                <circle cx="195" cy="163" r="106" />
              </clipPath>
              <linearGradient id="qc-sweep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity=".14" />
              </linearGradient>
            </defs>
            <path
              className={css.lensTicks}
              d="M195 22V56M195 270V304M53 163H86M304 163H338"
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
            <circle
              className={css.lensHalo}
              cx="195"
              cy="163"
              r="127"
              stroke="var(--primary)"
              strokeOpacity=".15"
            />
            <g className={css.lensFloat}>
              <circle
                cx="195"
                cy="163"
                r="110"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="8"
              />
              <g clipPath="url(#qc-lens-clip)" aria-hidden="true">
                <g className={css.lensSweep}>
                  <rect
                    x="85"
                    y="25"
                    width="220"
                    height="30"
                    fill="url(#qc-sweep)"
                  />
                  <path
                    d="M85 55H305"
                    stroke="var(--primary)"
                    strokeOpacity=".45"
                  />
                </g>
              </g>
              <path
                className={css.filmWave}
                pathLength="1"
                d="M119 137C160 125 220 146 270 128"
                stroke="var(--primary)"
                strokeWidth="2"
              />
              <path
                className={css.filmWave}
                pathLength="1"
                d="M119 184C160 172 220 193 270 175"
                stroke="var(--primary)"
                strokeWidth="2"
                style={{ animationDelay: "0.25s" }}
              />
              <path
                className={css.gaugeArrow}
                d="M147 137V180M141 143L147 137L153 143M141 174L147 180L153 174"
                stroke="var(--teal)"
                strokeWidth="1.5"
              />
              <path
                className={css.lensHandle}
                d="m283 253 62 60"
                stroke="var(--ink)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <text
                className={css.lensReading}
                x="207"
                y="165"
                textAnchor="middle"
                fontSize="28"
                fontWeight="600"
                fill="var(--ink)"
              >
                51 μm
              </text>
              <text
                className={css.lensLimit}
                x="195"
                y="228"
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted-foreground)"
              >
                DEFINED LIMIT: 45–55 μm
              </text>
            </g>
          </Diagram>
          <span className={css.inspectionPassed}>
            <Check size={15} aria-hidden="true" />
            Within sample limits
          </span>
          <Caption>Inspect the parameter. Keep the result in context.</Caption>
        </figure>
        <div className={css.qualityCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
          <div className={css.qualityPrinciples}>
            <span>Define</span>
            <i />
            <span>Measure</span>
            <i />
            <span>Review</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

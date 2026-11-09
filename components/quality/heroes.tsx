"use client";
import { useTranslations } from "next-intl";

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
import { getQualityPages, suppliedSpcSummary, type QualitySlug } from "./data";
import { Provenance, css } from "./ui";

function Breadcrumb({ slug }: { slug: QualitySlug }) {
  const t = useTranslations("pages.qualityApp");
  const qualityPages = getQualityPages(t);

  return (
    <nav className={css.breadcrumb} aria-label={t("copy.breadcrumb")}>
      <Link href="/apps/supply-chain/quality">{t("copy.qualityQms")}</Link>
      <ArrowRight size={12} aria-hidden="true" />
      <span aria-current="page">{qualityPages[slug].title}</span>
    </nav>
  );
}
function HeroActions() {
  const t = useTranslations("pages.qualityApp");

  return (
    <div className={css.heroActions}>
      <LiveDemoButton />
      <Link href="#qms-workspace" className={css.exploreLink}>
        {t("copy.exploreTheWorkspace")}
        <ArrowDown size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

function DashboardHero() {
  const t = useTranslations("pages.qualityApp");

  return (
    <section className={css.dashboardHero} data-qms-hero="quality-dashboard">
      <div className={css.wrap}>
        <Breadcrumb slug="quality-dashboard" />
        <div className={css.observatory}>
          <div className={css.observatoryCopy}>
            <span className={css.eyebrow}>
              {t("copy.qualityIntelligence01")}
            </span>
            <h1 className="showcase-heading">
              {t("copy.everySignal")}
              <br />
              {t.rich("ui.qualityStory", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h1>
            <p>{t("copy.seeTheExceptionsFollowTheActionsAndKeep")}</p>
            <HeroActions />
            <div className={css.heroEvidence}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>{t("copy.suppliedQualitySnapshotLast90Days")}</span>
            </div>
          </div>
          <div className={css.observatoryBento}>
            <figure className={css.yieldTile}>
              <div className={css.tileLabel}>
                {t("copy.firstPassYield")}
                <CheckCheck size={15} aria-hidden="true" />
              </div>
              <div className={css.yieldOrbit}>
                <svg
                  viewBox="0 0 180 180"
                  role="img"
                  aria-label={t("copy.suppliedFirstPassYield92Percent")}
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
              <figcaption>{t("copy.inspectTheOutcome")}</figcaption>
            </figure>
            <div className={css.riskTile}>
              <span className={css.microLabel}>
                {t("copy.openQualityCases")}
              </span>
              <strong>
                4<span>{t("copy.of6Raised")}</span>
              </strong>
              <div>
                <CircleAlert size={15} aria-hidden="true" />
                <span>{t("copy.1CriticalNcInTheSnapshot")}</span>
              </div>
            </div>
            <div className={css.signalTile}>
              <div>
                <span className={css.microLabel}>{t("copy.october2026")}</span>
                <h2>
                  {t("copy.6Findings")}
                  <br />
                  {t("copy.oneMonthInView")}
                </h2>
              </div>
              <div
                className={css.signalStack}
                role="img"
                aria-label={t(
                  "copy.october2026SixNonConformancesIncludingOneCritical",
                )}
              >
                <span />
                <i />
                <small>{t("copy.1Critical")}</small>
              </div>
            </div>
            <div className={css.actionTile}>
              <ClipboardCheck size={21} aria-hidden="true" />
              <span>{t("copy.openCapas")}</span>
              <strong>4</strong>
              <small>{t("copy.0Overdue")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NcHero() {
  const t = useTranslations("pages.qualityApp");

  return (
    <section className={css.ncHero} data-qms-hero="non-conformance">
      <div className={css.wrap}>
        <Breadcrumb slug="non-conformance" />
        <div className={css.ncHeroHeader}>
          <div>
            <span className={css.eyebrow}>
              {t("copy.exceptionManagement02")}
            </span>
            <h1 className="showcase-heading">
              {t("copy.findTheException")}
              <br />
              <span>{t("copy.keepTheWholeStory")}</span>
            </h1>
          </div>
          <div>
            <p>{t("copy.giveEveryQualityFindingAClearSourceA")}</p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.exceptionFile}>
          <div className={css.fileIndex}>
            <span>{t("copy.qualityCaseFile")}</span>
            <strong>NC-0004</strong>
            <small>{t("copy.detectedOct192026")}</small>
          </div>
          <div className={css.fileEvidence}>
            <div className={css.fileEvidenceTop}>
              <span>{t("copy.corrugationPitchOutOfTolerance")}</span>
              <span>{t("copy.productionMajor")}</span>
            </div>
            <svg
              viewBox="0 0 650 105"
              role="img"
              aria-label={t(
                "copy.illustrativeCorrugatedProfileWithOneHighlightedToleranceException",
              )}
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
                {t("copy.reviewTheException")}
              </text>
            </svg>
            <figcaption>
              {t("copy.illustrativeProfileCaseIdentityAndSeverityComeFrom")}
            </figcaption>
          </div>
          <div className={css.fileDisposition}>
            <span className={css.microLabel}>
              {t("copy.currentSourceStatus")}
            </span>
            <strong>{t("copy.open")}</strong>
            <p>{t("copy.containInvestigateAct")}</p>
            <Provenance />
          </div>
        </figure>
      </div>
    </section>
  );
}

function CapaHero() {
  const t = useTranslations("pages.qualityApp");

  return (
    <section className={css.capaHero} data-qms-hero="capa">
      <div className={css.wrap}>
        <Breadcrumb slug="capa" />
        <header className={css.capaHeroHeader}>
          <span className={css.eyebrow}>
            {t("copy.correctivePreventiveAction03")}
          </span>
          <h1 className="showcase-heading">
            {t("copy.aFindingBecomesAnAction")}
            <br />
            <span>{t("copy.evidenceClosesTheLoop")}</span>
          </h1>
          <p>
            {t("copy.bringRootCauseThinkingAccountableWorkAndVerification")}
          </p>
          <HeroActions />
        </header>
        <figure className={css.actionArchitecture}>
          <div className={css.actionRoute} aria-hidden="true" />
          <div className={css.capaSketch}>
            {t("copy.verifyTheFix")}
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
              label: t("copy.understand"),
              caption: t("copy.defineTheProblem"),
              Icon: Microscope,
            },
            {
              label: t("copy.plan"),
              caption: t("copy.chooseTheRightAction"),
              Icon: Layers3,
            },
            {
              label: t("copy.act"),
              caption: t("copy.followTheWork"),
              Icon: ClipboardCheck,
            },
            {
              label: t("copy.verify"),
              caption: t("copy.reviewEffectiveness"),
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
            {t("copy.suppliedSnapshot5Capas4Open1Closed")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function AqlHero() {
  const t = useTranslations("pages.qualityApp");

  return (
    <section className={css.aqlHero} data-qms-hero="aql-sampling">
      <div className={css.wrap}>
        <Breadcrumb slug="aql-sampling" />
        <div className={css.samplingLab}>
          <figure className={css.lotField}>
            <div className={css.tileLabel}>
              {t("copy.fromLotToSample")}
              <span>{t("copy.codeH")}</span>
            </div>
            <div
              className={css.lotDots}
              role="img"
              aria-label={t("copy.samplingIllustration500UnitsInALotSample")}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <i key={i} className={i < 10 ? css.sampleDot : undefined} />
              ))}
            </div>
            <div className={css.lotReduction}>
              <div>
                <span>{t("copy.lotQuantity")}</span>
                <strong>500</strong>
              </div>
              <ArrowRight size={25} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span>{t("copy.sampleQuantity")}</span>
                <strong>50</strong>
              </div>
            </div>
            <figcaption>
              {t("copy.eachDotRepresents5UnitsSuppliedAql2")}
            </figcaption>
          </figure>
          <div className={css.samplingCopy}>
            <span className={css.eyebrow}>
              {t("copy.acceptanceSampling04")}
            </span>
            <h1 className="showcase-heading">
              {t("copy.aSmallerSample")}
              <br />
              <span>{t("copy.aTransparentDecision")}</span>
            </h1>
            <p>{t("copy.giveLotSizeInspectionBasisAndAcceptanceLimits")}</p>
            <div className={css.samplingThreshold}>
              <span>
                <Check size={13} aria-hidden="true" />
                {t("copy.accept3")}
              </span>
              <span>{t("copy.reject4")}</span>
            </div>
            <HeroActions />
            <p className={css.heroFootnote}>
              {t("copy.theInteractiveDemoUsesTheNumericExcerptSupplied")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpcHero() {
  const t = useTranslations("pages.qualityApp");

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
              {t("copy.statisticalProcessControl05")}
            </span>
            <h1 className="showcase-heading">
              {t("copy.readTheVariation")}
              <br />
              <span>{t("copy.understandTheProcess")}</span>
            </h1>
          </div>
          <div>
            <p>
              {t("copy.putProcessBehaviorControlLimitsAndSpecificationContext")}
            </p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.processObservatory}>
          <div className={css.processInstrument}>
            <svg
              viewBox="0 0 800 220"
              role="img"
              aria-label={t(
                "copy.illustrativeNormalModelUsingTheSuppliedMean23",
              )}
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
                {t("copy.mean233958")}
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
              {t("copy.illustrativeNormalModelBasedOnTheSuppliedSummary")}
            </figcaption>
          </div>
          <dl className={css.sourceSpcNumbers}>
            <div>
              <dt>{t("copy.sourceCp")}</dt>
              <dd>0.621</dd>
            </div>
            <div>
              <dt>{t("copy.sourceCpk")}</dt>
              <dd>0.578</dd>
            </div>
            <div>
              <dt>{t("copy.readingsAnalyzed")}</dt>
              <dd>100</dd>
            </div>
            <div>
              <dt>{t("copy.beyondControlLimits")}</dt>
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

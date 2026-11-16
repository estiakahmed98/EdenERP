"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BedDouble,
  Check,
  CreditCard,
  Fingerprint,
  FlaskConical,
  HeartPulse,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import { hospitalPage, type HospitalSlug } from "./registry";
import { useHospital } from "./ui";
import HospitalFigure from "./illustrations";
import {
  BloodUnitArt,
  DepartmentAtrium,
  HospitalCampus,
  ImagingRoom,
  WardCutaway,
} from "./medical-art";
import s from "./editorial.module.css";

function Heading({ slug }: { slug: HospitalSlug }) {
  const { t } = useHospital();
  return (
    <div className={s.copy}>
      <p className={s.eyebrow}>{t(`pages.${slug}.title`)}</p>
      <h1>
        {t(`pages.${slug}.headline`)
          .split("\n")
          .map((line, i) => (
            <span key={line} className={i ? s.accent : undefined}>
              {line}
            </span>
          ))}
      </h1>
      <p className={s.description}>{t(`pages.${slug}.description`)}</p>
    </div>
  );
}
function Actions() {
  const { t } = useHospital();
  return (
    <div className={s.actions}>
      <LiveDemoButton />
      <a href="#hospital-workspace">
        {t("ui.explore")}
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
function Art({
  slug,
  children,
  className = "",
  source = false,
}: {
  slug: HospitalSlug;
  children?: ReactNode;
  className?: string;
  source?: boolean;
}) {
  const { t } = useHospital();
  return (
    <figure
      className={`${s.art} ${className}`}
      aria-label={t(`pages.${slug}.title`)}
      tabIndex={slug === "doctors-sittings" ? 0 : undefined}
      role={slug === "doctors-sittings" ? "region" : undefined}
    >
      {children ?? <HospitalFigure slug={slug} />}
      <figcaption>{t(source ? "ui.source" : "ui.illustrative")}</figcaption>
    </figure>
  );
}
function HandNote({ label }: { label: string }) {
  const { t } = useHospital();
  return (
    <div className={s.handNote}>
      <svg viewBox="0 0 95 44" fill="none" aria-hidden="true">
        <path
          d="M3 3c19 40 62 37 82 15m-19 4 20-6-4 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{t(`ui.${label}`)}</span>
    </div>
  );
}
function Journey({
  stages,
  className = "",
}: {
  stages: string[];
  className?: string;
}) {
  const { t, number } = useHospital();
  const [stage, setStage] = useState(0);
  return (
    <div className={`${s.journey} ${className}`} data-hero-journey>
      <ol>
        {stages.map((key, index) => (
          <li key={key}>
            <button
              type="button"
              aria-pressed={stage === index}
              onClick={() => setStage(index)}
            >
              <span>{number(index + 1)}</span>
              <strong>{t(`ui.${key}`)}</strong>
            </button>
            {index !== stages.length - 1 && (
              <ArrowRight size={16} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p aria-live="polite">
        <span>{t("ui.focus")}</span>
        {t(`ui.${stages[stage]}`)}
      </p>
    </div>
  );
}
function SourceNumber({ value, label }: { value: number; label: string }) {
  const { t, number } = useHospital();
  return (
    <div className={s.sourceNumber}>
      <strong>{number(value)}</strong>
      <span>{t(`ui.${label}`)}</span>
    </div>
  );
}
function BlueprintLabel({ label, code }: { label: string; code: string }) {
  const { t } = useHospital();
  return (
    <div className={s.blueprintLabel}>
      <span>{t(`ui.${label}`)}</span>
      <strong>{code}</strong>
    </div>
  );
}

/** Each route has a separate editorial structure, rather than a shared split hero. */
function Composition({ slug }: { slug: HospitalSlug }) {
  const { t, number, digits } = useHospital();
  switch (slug) {
    case "hospital-dashboard":
      return (
        <>
          <div className={s.dashboardTitle}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.campusStage}>
            <Art slug={slug}>
              <HospitalCampus />
            </Art>
            <div className={s.campusPassport}>
              <HeartPulse size={22} aria-hidden="true" />
              <span>{t("ui.suppliedSummary")}</span>
              <SourceNumber value={1000} label="patientsRegistered" />
              <div className={s.passportPair}>
                <SourceNumber value={12} label="doctors" />
                <SourceNumber value={10} label="departments" />
              </div>
              <small>{t("ui.source")}</small>
            </div>
            <div className={s.campusSideNote}>
              <HandNote label="handover" />
              <span>{t("ui.illustrativeChart")}</span>
            </div>
          </div>
          <Journey
            stages={["identity", "appointment", "consulting", "payment"]}
            className={s.campusJourney}
          />
        </>
      );
    case "patients":
      return (
        <>
          <div className={s.identityHeadline}>
            <Heading slug={slug} />
            <div className={s.identityIndex}>
              <Fingerprint size={34} strokeWidth={1.3} aria-hidden="true" />
              <span>UHID</span>
              <span className={s.mono}>DEMO-P01</span>
            </div>
          </div>
          <div className={s.identityDossier}>
            <div className={s.identitySpine}>
              {t("ui.identity")}
              <span>{digits("01 / 03")}</span>
            </div>
            <Art slug={slug} />
            <div className={s.identityTimeline}>
              <span className={s.smallCaps}>{t("ui.history")}</span>
              <Journey stages={["identity", "consent", "appointment"]} />
              <HandNote label="trace" />
            </div>
          </div>
          <Actions />
        </>
      );
    case "opd-serials":
      return (
        <>
          <div className={s.queueHeading}>
            <span className={s.largeOutline}>{digits("01")}</span>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.waitingRoom}>
            <div className={s.waitingDisplay}>
              <span>{t("ui.called")}</span>
              <strong>{digits("01")}</strong>
              <div>
                <i />
                {t("ui.illustrative")}
              </div>
            </div>
            <div className={s.waitingSequence}>
              <Journey
                stages={["booked", "arrived", "called", "consulting", "seen"]}
              />
              <div className={s.sittingTickets}>
                {["medicine", "cardiology", "radiology"].map((key, index) => (
                  <div key={key}>
                    <Stethoscope size={18} aria-hidden="true" />
                    <span>{t(`ui.${key}`)}</span>
                    <small>DEMO-S0{index + 1}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    case "consultations":
      return (
        <>
          <div className={s.consultationDesk}>
            <div className={s.deskMargin}>
              <span>{t("ui.visit")}</span>
              <strong>DEMO-C01</strong>
              <div className={s.deskRules} />
            </div>
            <Art slug={slug} className={s.largeFolio} />
            <div className={s.consultationCopy}>
              <Heading slug={slug} />
              <Actions />
              <HandNote label="notes" />
              <p className={s.microNote}>
                <LockKeyhole size={14} aria-hidden="true" />
                {t("ui.noClinicalDocument")}
              </p>
            </div>
          </div>
          <div className={s.consultationIndex}>
            {["draft", "review", "amend"].map((key, i) => (
              <span key={key}>
                <i>{number(i + 1)}</i>
                {t(`ui.${key}`)}
              </span>
            ))}
          </div>
        </>
      );
    case "billing":
      return (
        <>
          <div className={s.billingEditorial}>
            <div>
              <span className={s.edition}>BDT / {t("ui.estimate")}</span>
              <Heading slug={slug} />
              <Actions />
            </div>
            <div className={s.invoiceStage}>
              <span className={s.invoiceGhost}>৳</span>
              <Art slug={slug} />
              <HandNote label="total" />
            </div>
          </div>
          <div className={s.invoiceEquation}>
            {["service", "quantity", "subtotal", "total"].map((key, index) => (
              <span key={key}>
                {index > 0 && (
                  <i>{index === 3 ? "→" : index === 2 ? "=" : "×"}</i>
                )}
                <strong>{t(`ui.${key}`)}</strong>
              </span>
            ))}
          </div>
        </>
      );
    case "day-close":
      return (
        <>
          <div className={s.closeMasthead}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.ledgerSpread}>
            <div className={s.ledgerLeaf}>
              <span className={s.smallCaps}>{t("ui.charges")}</span>
              <div className={s.ruledPaper} />
              <span>{t("ui.review")}</span>
            </div>
            <div className={s.ledgerCentre}>
              <Art slug={slug} />
              <HandNote label="reconciled" />
            </div>
            <div className={s.ledgerLeaf}>
              <span className={s.smallCaps}>{t("ui.collections")}</span>
              <div className={s.ruledPaper} />
              <span>{t("ui.difference")}</span>
            </div>
          </div>
          <p className={s.microNote}>{t("ui.notLedger")}</p>
        </>
      );
    case "doctors-money":
      return (
        <>
          <div className={s.settlementHeading}>
            <span className={s.sectionMark}>↗</span>
            <Heading slug={slug} />
          </div>
          <div className={s.settlementMap}>
            <div className={s.settlementPrinciple}>
              <CreditCard size={28} aria-hidden="true" />
              <span>{t("ui.collected")}</span>
              <p>{t("ui.noSettlement")}</p>
              <Actions />
            </div>
            <Art slug={slug} />
            <div className={s.settlementMargin}>
              <span>{t("ui.share")}</span>
              <i />
              <span>{t("ui.owed")}</span>
              <HandNote label="allocation" />
            </div>
          </div>
        </>
      );
    case "wards-beds":
      return (
        <>
          <div className={s.wardTitle}>
            <Heading slug={slug} />
            <div className={s.zeroLicense}>
              <SourceNumber value={0} label="license" />
              <small>{t("ui.source")}</small>
            </div>
          </div>
          <Art slug={slug} className={s.wardPanorama}>
            <WardCutaway />
            <div className={s.planLegend}>
              {["available", "occupied", "blocked"].map((key) => (
                <span key={key}>
                  <i />
                  {t(`ui.${key}`)}
                </span>
              ))}
            </div>
            <div className={s.planAnnotation}>
              <BedDouble size={19} aria-hidden="true" />
              {t("ui.illustrative")}
            </div>
          </Art>
          <div className={s.wardFooter}>
            <Actions />
            <HandNote label="loadWard" />
          </div>
        </>
      );
    case "admissions":
      return (
        <>
          <div className={s.arrivalCopy}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.arrivalAtlas}>
            <div className={s.arrivalLine} aria-hidden="true">
              <svg viewBox="0 0 1200 180" fill="none">
                <path
                  d="M30 130c170-170 300 110 490-10s390-85 650-20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />
              </svg>
            </div>
            {["identity", "requestBed", "handover"].map((key, i) => (
              <div className={s.arrivalStation} key={key}>
                <span>{number(i + 1).padStart(2, number(0))}</span>
                {i === 0 ? (
                  <Fingerprint size={38} strokeWidth={1.2} aria-hidden="true" />
                ) : i === 1 ? (
                  <BedDouble size={38} strokeWidth={1.2} aria-hidden="true" />
                ) : (
                  <Check size={38} strokeWidth={1.2} aria-hidden="true" />
                )}
                <strong>{t(`ui.${key}`)}</strong>
                <small>DEMO / {t("ui.review")}</small>
              </div>
            ))}
          </div>
        </>
      );
    case "bed-census":
      return (
        <>
          <div className={s.censusMasthead}>
            <div className={s.censusZero}>
              <span>{t("ui.license")}</span>
              <strong>{number(0)}</strong>
              <small>{t("ui.source")}</small>
            </div>
            <div>
              <Heading slug={slug} />
              <Actions />
            </div>
          </div>
          <div className={s.capacityStudy}>
            <div className={s.capacityStudyGrid} aria-hidden="true">
              {Array.from({ length: 60 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <div>
              <span className={s.smallCaps}>{t("ui.formula")}</span>
              <p>
                {t("ui.occupiedBeds")} <i>÷</i> {t("ui.capacity")}{" "}
                <i>× {number(100)}</i>
              </p>
              <span>{t("ui.noCensus")}</span>
            </div>
          </div>
        </>
      );
    case "laboratory":
      return (
        <>
          <div className={s.labBench}>
            <div className={s.labCopy}>
              <p className={s.edition}>L / 01 — {t("ui.trace")}</p>
              <Heading slug={slug} />
              <Actions />
            </div>
            <div className={s.labArt}>
              <Art slug={slug} />
              <BlueprintLabel label="specimen" code="DEMO-L01" />
            </div>
            <div className={s.labRuler} aria-hidden="true" />
          </div>
          <Journey
            stages={["collect", "receive", "processing", "verify"]}
            className={s.labJourney}
          />
        </>
      );
    case "imaging":
      return (
        <>
          <div className={s.imagingHeader}>
            <span className={s.imagingIndex}>
              <ScanLine size={25} aria-hidden="true" />
              CT / MRI / ECG
            </span>
            <Heading slug={slug} />
          </div>
          <div className={s.imagingPanorama}>
            <Art slug={slug}>
              <ImagingRoom />
            </Art>
            <div className={s.imagingDocket}>
              <BlueprintLabel label="worklist" code="DEMO-IS01" />
              <span>{t("ui.scanNote")}</span>
              <Actions />
            </div>
          </div>
          <Journey stages={["todo", "toReport", "draft"]} />
        </>
      );
    case "pharmacy":
      return (
        <>
          <div className={s.pharmacyMasthead}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.apothecary}>
            <div className={s.shelfSide}>
              <span className={s.verticalLabel}>{t("ui.stock")}</span>
              <strong>Rx</strong>
              <HandNote label="expiry" />
            </div>
            <Art slug={slug} />
            <div className={s.inventoryDocket}>
              <span>{t("ui.identifier")}</span>
              <strong>DEMO-SKU01</strong>
              <div className={s.inventoryBars} aria-hidden="true" />
              <p>{t("ui.noDispense")}</p>
            </div>
          </div>
        </>
      );
    case "operating-theatre":
      return (
        <>
          <div className={s.theatreBlueprint}>
            <div className={s.theatreSheet}>
              <div className={s.sheetCorner}>OT / 01</div>
              <Art slug={slug} />
              <div className={s.measureRule} aria-hidden="true" />
              <HandNote label="readiness" />
            </div>
            <div className={s.theatreCopy}>
              <Heading slug={slug} />
              <Actions />
              <p className={s.microNote}>{t("ui.notChecklist")}</p>
            </div>
          </div>
        </>
      );
    case "emergency":
      return (
        <>
          <div className={s.emergencyHeadline}>
            <div className={s.emergencySignal}>
              <HeartPulse size={39} strokeWidth={1.3} aria-hidden="true" />
              <span>{t("ui.handover")}</span>
            </div>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.handoverRunway}>
            {["intake", "assessment", "transfer"].map((key, index) => (
              <div key={key}>
                <span className={s.runwayNumber}>
                  {number(index + 1).padStart(2, number(0))}
                </span>
                <h3>{t(`ui.${key}`)}</h3>
                <ArrowRight size={25} strokeWidth={1.1} aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className={s.microNote}>{t("ui.emergencyNote")}</p>
        </>
      );
    case "blood-bank":
      return (
        <>
          <div className={s.bloodEditorial}>
            <div className={s.bloodLabel}>
              <span>{t("ui.trace")}</span>
              <strong>DEMO-U01</strong>
              <div className={s.inventoryBars} aria-hidden="true" />
            </div>
            <Art slug={slug} className={s.bloodBag}>
              <BloodUnitArt />
            </Art>
            <div className={s.bloodCopy}>
              <Heading slug={slug} />
              <Actions />
              <Journey
                stages={["verifiedIdentity", "documentation", "reviewer"]}
              />
            </div>
          </div>
        </>
      );
    case "payers":
      return (
        <>
          <div className={s.coverageMasthead}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.coverageBridge}>
            <div>
              <span>{t("ui.patientShare")}</span>
              <Fingerprint size={42} strokeWidth={1} aria-hidden="true" />
            </div>
            <div className={s.coverageArch}>
              <ShieldCheck size={58} strokeWidth={1.1} aria-hidden="true" />
              <svg viewBox="0 0 600 140" fill="none" aria-hidden="true">
                <path
                  d="M10 130C90-25 500-25 590 130"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                />
              </svg>
              <span>{t("ui.coverage")}</span>
            </div>
            <div>
              <span>{t("ui.payerShare")}</span>
              <CreditCard size={42} strokeWidth={1} aria-hidden="true" />
            </div>
          </div>
          <div className={s.coverageFineprint}>
            <HandNote label="authorisation" />
            <p>{t("ui.noClaim")}</p>
          </div>
        </>
      );
    case "indicators":
      return (
        <>
          <div className={s.indicatorEditorial}>
            <div className={s.indicatorHeading}>
              <Heading slug={slug} />
              <Actions />
            </div>
            <div className={s.indicatorPrint}>
              <span>{t("ui.labTimely")}</span>
              <strong>
                {number(92)}
                <small>%</small>
              </strong>
              <div className={s.indicatorFraction}>
                <span>{number(505)}</span>
                <i />
                {number(549)}
              </div>
              <p>{t("ui.source")}</p>
            </div>
          </div>
          <div className={s.indicatorDefinitions}>
            <span>{t("ui.definition")}</span>
            <p>{t("ui.labFormula")}</p>
            <HandNote label="formula" />
          </div>
        </>
      );
    case "doctors-sittings":
      return (
        <>
          <div className={s.rotaHeadline}>
            <Heading slug={slug} />
            <div className={s.timeEdition}>
              <span>{t("ui.schedule")}</span>
              <strong>{digits("17:00")}</strong>
              <small>{t("ui.illustrative")}</small>
            </div>
          </div>
          <Art slug={slug} className={s.rotaPaper} />
          <div className={s.rotaActions}>
            <HandNote label="sitting" />
            <Actions />
          </div>
        </>
      );
    case "services-prices":
      return (
        <>
          <div className={s.priceBook}>
            <div className={s.priceBookSpine}>
              <span>BDT</span>
              <span>{t("ui.services")}</span>
            </div>
            <div className={s.priceBookCopy}>
              <Heading slug={slug} />
              <Actions />
            </div>
            <div className={s.priceBookPage}>
              <span className={s.smallCaps}>{t("ui.estimate")}</span>
              <Art slug={slug} />
              <p>{t("ui.noPricePromise")}</p>
            </div>
          </div>
        </>
      );
    case "hospital-departments":
      return (
        <>
          <div className={s.departmentMasthead}>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.departmentAtlas}>
            <div className={s.departmentCampus}>
              <DepartmentAtrium />
            </div>
            <div className={s.specialtyLabels}>
              {[
                { label: "clinicalTeam", Icon: Stethoscope },
                { label: "diagnosticTeam", Icon: FlaskConical },
                { label: "adminTeam", Icon: ShieldCheck },
              ].map(({ label, Icon }) => (
                <div key={label}>
                  <Icon size={24} strokeWidth={1.2} aria-hidden="true" />
                  <span>{t(`ui.${label}`)}</span>
                  <i />
                </div>
              ))}
            </div>
          </div>
          <p className={s.microNote}>{t("ui.illustrativeChart")}</p>
        </>
      );
    case "staff-registrations":
      return (
        <>
          <div className={s.credentialsCover}>
            <div className={s.credentialCopy}>
              <span className={s.edition}>{t("ui.registration")} / 01</span>
              <Heading slug={slug} />
              <Actions />
            </div>
            <div className={s.credentialPortfolio}>
              <div className={s.credentialTab}>{t("ui.validUntil")}</div>
              <Art slug={slug} />
              <HandNote label="asOf" />
            </div>
          </div>
          <div className={s.credentialStates}>
            {["expired", "expiring", "valid"].map((key, i) => (
              <span key={key}>
                <i data-state={i} />
                {t(`ui.${key}`)}
              </span>
            ))}
          </div>
        </>
      );
    case "record-access-log":
      return (
        <>
          <div className={s.accessMasthead}>
            <div className={s.accessSeal}>
              <LockKeyhole size={43} strokeWidth={1.1} aria-hidden="true" />
              <span>{t("ui.trace")}</span>
            </div>
            <Heading slug={slug} />
            <Actions />
          </div>
          <div className={s.accessRibbon}>
            {["searched", "viewed", "exported"].map((key, i) => (
              <div key={key}>
                <time>{digits(`09:${String(i * 12).padStart(2, "0")}`)}</time>
                <span className={s.accessPoint} />
                <strong>{t(`ui.${key}`)}</strong>
                <small>DEMO-0{i + 1}</small>
              </div>
            ))}
          </div>
          <p className={s.microNote}>{t("ui.logNote")}</p>
        </>
      );
    case "hospital-settings":
      return (
        <>
          <div className={s.settingsEditorial}>
            <div className={s.settingsCopy}>
              <Heading slug={slug} />
              <Actions />
              <HandNote label="facility" />
            </div>
            <div className={s.explodedSettings}>
              <div className={s.settingsPlane}>
                <span>{t("ui.facility")}</span>
                <strong>DEMO-CENTRE</strong>
              </div>
              <div className={s.settingsPlane}>
                <span>{t("ui.languages")}</span>
                <strong>{t("ui.both")}</strong>
              </div>
              <div className={s.settingsPlane}>
                <span>{t("ui.permissions")}</span>
                <div>
                  <Fingerprint size={27} aria-hidden="true" />
                  <LockKeyhole size={27} aria-hidden="true" />
                </div>
              </div>
              <svg viewBox="0 0 420 340" fill="none" aria-hidden="true">
                <path
                  d="M60 50v230M360 40v230"
                  stroke="currentColor"
                  strokeDasharray="4 7"
                />
              </svg>
            </div>
          </div>
          <div className={s.settingsFootnote}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>{t("ui.notSettingsSave")}</span>
          </div>
        </>
      );
  }
}

export default function HospitalHero({ slug }: { slug: HospitalSlug }) {
  return (
    <section
      className={`${s.hero} ${s[hospitalPage(slug).visual] ?? ""}`}
      data-hospital-hero={hospitalPage(slug).visual}
      data-hero-composition={slug}
    >
      <Composition slug={slug} />
    </section>
  );
}

"use client";

import {
  Activity,
  ArrowRight,
  BedDouble,
  Check,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Fingerprint,
  FlaskConical,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Pill,
  ScanLine,
  Settings2,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import type { HospitalSlug } from "./registry";
import { Badge, css, useHospital } from "./ui";

export default function HospitalFigure({ slug }: { slug: HospitalSlug }) {
  const { t, number } = useHospital();
  const label = (key: string) => t(`ui.${key}`);
  const cell = (Icon: typeof HeartPulse, key: string) => (
    <span className={css.visualCell}>
      <Icon size={21} aria-hidden="true" />
      <span>{label(key)}</span>
    </span>
  );
  const steps = (keys: string[]) => (
    <div className={css.visualSteps}>
      {keys.map((key, index) => (
        <span key={key}>
          <i>{number(index + 1)}</i>
          {label(key)}
          {index < keys.length - 1 && (
            <ArrowRight size={17} aria-hidden="true" />
          )}
        </span>
      ))}
    </div>
  );
  switch (slug) {
    case "hospital-dashboard":
      return (
        <div className={css.controlMosaic}>
          <div className={css.pulseTile}>
            <HeartPulse size={30} aria-hidden="true" />
            <span>{label("sourceFacility")}</span>
            <strong>{number(1000)}</strong>
            <small>{label("patientsRegistered")}</small>
          </div>
          <div>
            {cell(Stethoscope, "doctors")}
            <strong>{number(12)}</strong>
          </div>
          <div>
            {cell(Layers3, "departments")}
            <strong>{number(10)}</strong>
          </div>
          <div className={css.mosaicPath}>
            {steps(["identity", "appointment", "consulting", "payment"])}
          </div>
        </div>
      );
    case "patients":
      return (
        <div className={css.identityScene}>
          <div className={css.identityRing}>
            <Fingerprint size={64} strokeWidth={1} aria-hidden="true" />
          </div>
          <div className={css.identityCard}>
            <span className={css.microLabel}>UHID</span>
            <strong>DEMO-P01</strong>
            <div className={css.barcode} aria-hidden="true" />
            <span>{label("identity")}</span>
            <Badge>{label("consent")}</Badge>
          </div>
          <span className={css.handAnnotation}>{label("history")}</span>
        </div>
      );
    case "opd-serials":
      return (
        <div className={css.queueScene}>
          <div className={css.queueToken}>
            <span>{label("called")}</span>
            <strong>01</strong>
            <small>{label("sitting")}</small>
          </div>
          <div className={css.queueTrack}>
            {["arrived", "called", "consulting", "seen"].map((key, index) => (
              <div key={key}>
                <span className={css.queueDot}>
                  {index === 3 ? (
                    <Check size={17} aria-hidden="true" />
                  ) : (
                    number(index + 1)
                  )}
                </span>
                <span>{label(key)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "consultations":
      return (
        <div className={css.folioScene}>
          <div className={css.paperBehind} />
          <div className={css.paper}>
            <div className={css.paperHeader}>
              <Stethoscope size={23} aria-hidden="true" />
              <span>{label("visit")} / DEMO-C01</span>
            </div>
            <h3>{label("notes")}</h3>
            <div className={css.writingLines} aria-hidden="true" />
            <div className={css.paperStamp}>
              <LockKeyhole size={15} aria-hidden="true" />
              {label("review")}
            </div>
          </div>
          <span className={css.marginTab}>{label("history")}</span>
        </div>
      );
    case "billing":
      return (
        <div className={css.receiptScene}>
          <div className={css.receiptPaper}>
            <CreditCard size={26} aria-hidden="true" />
            <h3>{label("estimate")}</h3>
            {["service", "quantity", "subtotal"].map((key) => (
              <div key={key}>
                <span>{label(key)}</span>
                <span aria-hidden="true">—</span>
              </div>
            ))}
            <strong>
              {label("total")}
              <ArrowRight size={19} aria-hidden="true" />
            </strong>
            <div className={css.barcode} aria-hidden="true" />
          </div>
          <span className={css.floatingSeal}>
            <ShieldCheck size={22} aria-hidden="true" />
            {label("noPayment")}
          </span>
        </div>
      );
    case "day-close":
      return (
        <div className={css.balanceScene}>
          <div className={css.balanceSide}>
            {cell(CreditCard, "collections")}
          </div>
          <div className={css.balanceRing}>
            <Check size={36} aria-hidden="true" />
            <span>{label("reconciled")}</span>
          </div>
          <div className={css.balanceSide}>{cell(FileCheck2, "charges")}</div>
          <div className={css.balanceLine} />
        </div>
      );
    case "doctors-money":
      return (
        <div className={css.distributionScene}>
          <div className={css.collectionNode}>
            <CreditCard size={25} aria-hidden="true" />
            <span>{label("collected")}</span>
          </div>
          <svg viewBox="0 0 420 110" fill="none" aria-hidden="true">
            <path
              d="M210 0V35Q210 55 130 55H80Q60 55 60 80V110M210 35V110M210 35Q210 55 290 55H340Q360 55 360 80V110"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
          </svg>
          <div className={css.splitNodes}>
            {cell(Stethoscope, "share")}
            {cell(ClipboardCheck, "review")}
            {cell(CreditCard, "owed")}
          </div>
        </div>
      );
    case "wards-beds":
      return (
        <div className={css.wardScene}>
          <div className={css.wardLabel}>
            <BedDouble size={17} aria-hidden="true" />
            {label("ward")} / {label("illustrative")}
          </div>
          <div className={css.floorCells}>
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index}>
                <BedDouble size={22} strokeWidth={1.5} aria-hidden="true" />
                <small>W-{String(index + 1).padStart(2, "0")}</small>
              </span>
            ))}
          </div>
          <div className={css.wardCorridor}>
            <ArrowRight size={18} aria-hidden="true" />
            {label("handover")}
          </div>
        </div>
      );
    case "admissions":
      return (
        <div className={css.arrivalScene}>
          {["identity", "requestBed", "handover"].map((key, index) => (
            <div key={key} style={{ "--step": index } as React.CSSProperties}>
              <span>{number(index + 1)}</span>
              {index === 0 ? (
                <Fingerprint aria-hidden="true" />
              ) : index === 1 ? (
                <BedDouble aria-hidden="true" />
              ) : (
                <Check aria-hidden="true" />
              )}
              <strong>{label(key)}</strong>
            </div>
          ))}
        </div>
      );
    case "bed-census":
      return (
        <div className={css.censusScene}>
          <div>
            <span>{label("license")}</span>
            <strong>{number(0)}</strong>
            <small>{label("source")}</small>
          </div>
          <div className={css.censusDots} aria-hidden="true">
            {Array.from({ length: 48 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
      );
    case "laboratory":
      return (
        <div className={css.specimenScene}>
          <div className={css.tubeRack}>
            {[0, 1, 2].map((index) => (
              <div className={css.tube} key={index}>
                <span />
                <div className={css.tubeLabel}>
                  DEMO
                  <br />
                  L-0{index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className={css.specimenStrip}>
            <ScanLine size={23} aria-hidden="true" />
            {steps(["collect", "receive", "verify"])}
          </div>
        </div>
      );
    case "imaging":
      return (
        <div className={css.scannerScene}>
          <div className={css.scannerRing}>
            <div>
              <ScanLine size={43} strokeWidth={1} aria-hidden="true" />
            </div>
          </div>
          <div className={css.scannerDesk} />
          <span className={css.scannerTag}>
            {label("worklist")}
            <ArrowRight size={15} aria-hidden="true" />
            {label("report")}
          </span>
        </div>
      );
    case "pharmacy":
      return (
        <div className={css.shelfScene}>
          {["stock", "expiry", "issue"].map((key, index) => (
            <div key={key}>
              <span>{label(key)}</span>
              <div>
                {Array.from({ length: 4 - index }, (_, i) => (
                  <span key={i} className={css.medicineBox}>
                    <Pill size={20} aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "operating-theatre":
      return (
        <div className={css.theatreScene}>
          <div className={css.roomPlan}>
            <span className={css.roomLight} />
            <div className={css.operatingTable} />
            <span className={css.roomCabinet} />
            <span className={css.roomDoor} />
          </div>
          <div className={css.theatreChecklist}>
            {["room", "equipment", "team"].map((key) => (
              <span key={key}>
                <span className={css.checkOutline} />
                {label(key)}
              </span>
            ))}
          </div>
        </div>
      );
    case "emergency":
      return (
        <div className={css.triageScene}>
          <HeartPulse size={45} strokeWidth={1.5} aria-hidden="true" />
          <div className={css.handoverLanes}>
            {["intake", "assessment", "transfer"].map((key, index) => (
              <div key={key}>
                <i>{number(index + 1)}</i>
                <span>{label(key)}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      );
    case "blood-bank":
      return (
        <div className={css.bankScene}>
          <div className={css.unitCard}>
            <span className={css.dropShape} aria-hidden="true" />
            <strong>DEMO-U01</strong>
            <span>{label("trace")}</span>
          </div>
          <div className={css.unitTrail}>
            {["verifiedIdentity", "documentation", "reviewer"].map((key) => (
              <span key={key}>
                <span className={css.checkOutline} />
                {label(key)}
              </span>
            ))}
          </div>
        </div>
      );
    case "payers":
      return (
        <div className={css.coverageScene}>
          <div className={css.coverageUmbrella}>
            <ShieldCheck size={50} strokeWidth={1} aria-hidden="true" />
          </div>
          <div className={css.coverageBranch}>
            <span>{label("patientShare")}</span>
            <span>{label("payerShare")}</span>
          </div>
          <div className={css.coverageCard}>
            {cell(FileCheck2, "authorisation")}
            {cell(CreditCard, "claim")}
          </div>
        </div>
      );
    case "indicators":
      return (
        <div className={css.lensScene}>
          <div className={css.lensRing}>
            <Activity size={49} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <div className={css.formulaCard}>
            <span>{label("formula")}</span>
            <p>{label("seenFormula")}</p>
          </div>
        </div>
      );
    case "doctors-sittings":
      return (
        <div className={css.rotaScene}>
          <div className={css.rotaHours}>
            <span>17:00</span>
            <span>18:00</span>
            <span>19:00</span>
            <span>20:00</span>
          </div>
          {["medicine", "cardiology", "radiology"].map((key, index) => (
            <div className={css.rotaRow} key={key}>
              <span>{label(key)}</span>
              <i style={{ "--offset": index } as React.CSSProperties}>
                {label("sitting")}
              </i>
            </div>
          ))}
        </div>
      );
    case "services-prices":
      return (
        <div className={css.catalogueScene}>
          <div className={css.catalogueTabs}>
            {["self", "staff", "corporate"].map((key) => (
              <span key={key}>{label(key)}</span>
            ))}
          </div>
          <div className={css.cataloguePages}>
            {[Stethoscope, FlaskConical, ScanLine].map((Icon, index) => (
              <div key={index}>
                <Icon size={29} strokeWidth={1.4} aria-hidden="true" />
                <span>
                  {label(["consultation", "laboratory", "report"][index])}
                </span>
                <span aria-hidden="true">—</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "hospital-departments":
      return (
        <div className={css.departmentScene}>
          <div className={css.departmentRoot}>
            <HeartPulse size={27} aria-hidden="true" />
            {label("hospital")}
          </div>
          <div className={css.departmentTree}>
            {cell(Stethoscope, "clinicalTeam")}
            {cell(FlaskConical, "diagnosticTeam")}
            {cell(UsersRound, "adminTeam")}
          </div>
        </div>
      );
    case "staff-registrations":
      return (
        <div className={css.credentialScene}>
          <div className={css.credentialCard}>
            <ShieldCheck size={35} strokeWidth={1.3} aria-hidden="true" />
            <h3>{label("registration")}</h3>
            <strong>DEMO-REG-01</strong>
            <div className={css.writingLines} aria-hidden="true" />
            <span>{label("validUntil")}</span>
          </div>
          <div className={css.expiryClock}>
            <span>{label("asOf")}</span>
            <strong>16 / 11</strong>
            <small>2026</small>
          </div>
        </div>
      );
    case "record-access-log":
      return (
        <div className={css.traceScene}>
          <div className={css.traceRail} />
          <LockKeyhole size={25} aria-hidden="true" />
          {["searched", "viewed", "exported"].map((key, index) => (
            <div key={key}>
              <span className={css.traceDot} />
              <code>09:{String(index * 12).padStart(2, "0")}</code>
              <span>{label(key)}</span>
              <span>DEMO-0{index + 1}</span>
            </div>
          ))}
        </div>
      );
    case "hospital-settings":
      return (
        <div className={css.configurationScene}>
          <Settings2 size={31} aria-hidden="true" />
          <h3>{label("facility")}</h3>
          {["outpatients", "laboratory", "languages"].map((key, index) => (
            <div key={key}>
              <span>{label(key)}</span>
              <span
                className={`${css.decorativeToggle} ${index !== 1 ? css.toggled : ""}`}
              />
            </div>
          ))}
        </div>
      );
  }
}

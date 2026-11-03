"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Download,
  FileText,
  Globe2,
  Layers3,
  Pencil,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  EMPTY_PLANNER_DETAILS,
  ERP_MODULES,
  addCalendarDays,
  calendarKey,
  keyToCalendarDate,
  localCalendarKey,
  minuteLabel,
  plannerDetailsSchema,
  preferenceTimes,
  requestSummary,
  timezones,
  validTimezone,
  type PlannerDetails,
  type PreferredTime,
} from "@/lib/live-demo-planner";
import { usePlannerSettings } from "./use-planner-settings";
import css from "./booking.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: () => void;
};
type Errors = Partial<Record<keyof PlannerDetails, string>>;
export default function BookingDialog({
  open,
  onOpenChange,
  returnFocus,
}: Props) {
  const t = useTranslations("common.demoBooking");
  const settings = usePlannerSettings();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<PlannerDetails>({
    ...EMPTY_PLANNER_DETAILS,
    modules: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<PreferredTime | null>(null);
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [now, setNow] = useState(() => new Date());
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const dialogElement = useRef<HTMLDivElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const formId = `${uid}-request-form`;
  const detectedTimezone = useRef(false);
  const zones = useMemo(timezones, []);
  const zoneChoices = useMemo(
    () => [...new Set([timezone, ...zones])],
    [timezone, zones],
  );
  const today = calendarKey(now, settings.timezone),
    last = addCalendarDays(today, settings.horizonDays);
  const times = useMemo(
    () => (day ? preferenceTimes(day, settings, now) : []),
    [day, settings, now],
  );
  const active =
    time && times.some((value) => value.startsAt === time.startsAt)
      ? time
      : null;
  useEffect(() => {
    if (!open) return;
    setNow(new Date());
    if (!detectedTimezone.current) {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (validTimezone(detected)) setTimezone(detected);
      } catch {
        /* Keep the explicit default. */
      }
      detectedTimezone.current = true;
    }
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    scrollArea.current?.scrollTo({ top: 0, behavior: "auto" });
    if (step > 0 || ready) heading.current?.focus({ preventScroll: true });
  }, [open, step, ready]);
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      const element = dialogElement.current;
      if (!element) return;
      const height = viewport?.height ?? window.innerHeight;
      element.style.setProperty("--booking-viewport-height", `${height}px`);
      element.style.setProperty(
        "--booking-viewport-top",
        `${viewport?.offsetTop ?? 0}px`,
      );
      element.dataset.compactViewport = String(height < 500);
    };
    updateViewport();
    const frame = window.requestAnimationFrame(updateViewport);
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.cancelAnimationFrame(frame);
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, [open]);
  function update(key: keyof Omit<PlannerDetails, "modules">, value: string) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setError("");
  }
  function validateDetails() {
    const result = plannerDetailsSchema.safeParse(details);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof PlannerDetails;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setError(t("fixErrors"));
      const first = result.error.issues[0]?.path[0];
      window.requestAnimationFrame(() =>
        document.getElementById(`${uid}-${String(first)}`)?.focus(),
      );
      return false;
    }
    setDetails(result.data);
    setErrors({});
    setError("");
    return true;
  }
  function validateTime() {
    if (
      !day ||
      !time ||
      !preferenceTimes(day, settings, new Date()).some(
        (value) => value.startsAt === time.startsAt,
      )
    ) {
      setNow(new Date());
      setTime(null);
      setError(t("staleTime"));
      setStep(1);
      return false;
    }
    return true;
  }
  function next(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (step === 0 && validateDetails()) setStep(1);
    else if (step === 1) {
      if (!time) {
        setError(t("selectTime"));
        return;
      }
      if (validateTime()) setStep(2);
    } else if (step === 2) {
      if (!validateDetails()) {
        setStep(0);
        return;
      }
      if (!validateTime()) return;
      if (!consent) {
        setError(t("consentError"));
        return;
      }
      setReady(true);
    }
  }
  function reset() {
    setDetails({ ...EMPTY_PLANNER_DETAILS, modules: [] });
    setStep(0);
    setReady(false);
    setDay(null);
    setTime(null);
    setConsent(false);
    setError("");
    setErrors({});
    setDownloadStatus("");
    window.requestAnimationFrame(() =>
      document.getElementById(`${uid}-fullName`)?.focus(),
    );
  }
  function download() {
    if (!time) return;
    try {
      const blob = new Blob([requestSummary(details, time, timezone)], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "EdenERP-demo-request-draft.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDownloadStatus(t("downloaded"));
    } catch {
      setDownloadStatus(t("downloadError"));
    }
  }
  const dateLabel = (value: string, zone = timezone) =>
    new Intl.DateTimeFormat("en", { timeZone: zone, dateStyle: "full" }).format(
      new Date(value),
    );
  const timeLabel = (value: string) =>
    new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(value));
  const titles = [t("detailsTitle"), t("timeTitle"), t("reviewTitle")];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogElement}
        lang="en"
        dir="ltr"
        showCloseButton={false}
        className={css.dialog}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          window.requestAnimationFrame(() =>
            heading.current?.focus({ preventScroll: true }),
          );
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus();
        }}
      >
        <header className={css.header} data-booking-region="header">
          <div className={css.headerTop}>
            <div className={css.brand}>
              <span className={css.brandIcon}>
                <Layers3 size={18} aria-hidden="true" />
              </span>
              <strong>EdenERP</strong>
              <span className={css.brandDivider} />
              <span>{t("liveDemoLabel")}</span>
            </div>
            <DialogClose className={css.close} aria-label={t("closeLabel")}>
              <X size={18} aria-hidden="true" />
            </DialogClose>
          </div>
          <div className={css.titleRow}>
            <div>
              <DialogTitle className={css.title}>{t("title")}</DialogTitle>
              <DialogDescription className={css.intro}>
                {t("description")}
              </DialogDescription>
            </div>
            <span className={css.duration}>
              <Clock3 size={14} aria-hidden="true" />
              {t("duration", { minutes: settings.durationMinutes })}
            </span>
          </div>
          {!ready ? (
            <ol className={css.steps} aria-label={t("stepProgressLabel")}>
              {[t("stepDetails"), t("stepTime"), t("stepReview")].map(
                (label, index) => (
                  <li
                    key={label}
                    data-current={step === index}
                    data-complete={step > index}
                    aria-current={step === index ? "step" : undefined}
                  >
                    <span>
                      {step > index ? (
                        <Check size={13} aria-hidden="true" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <strong>{label}</strong>
                  </li>
                ),
              )}
            </ol>
          ) : (
            <div className={css.preparedProgress}>
              <Check size={14} aria-hidden="true" />
              {t("readyEyebrow")}
              <span>{t("notSubmitted")}</span>
            </div>
          )}
        </header>
        <div
          ref={scrollArea}
          className={css.body}
          data-booking-region="body"
          role="region"
          aria-labelledby={uid + "-step-heading"}
          tabIndex={0}
        >
          <div className={css.content} key={ready ? "ready" : step}>
            <div className={css.sectionIntro}>
              <h3
                id={uid + "-step-heading"}
                ref={heading}
                tabIndex={-1}
                className={css.stepHeading}
              >
                {ready ? t("readyTitle") : titles[step]}
              </h3>
              <p className={css.stepDescription}>
                {ready
                  ? t("readyBody")
                  : [
                      t("detailsDescription"),
                      t("timeDescription"),
                      t("reviewDescription"),
                    ][step]}
              </p>
            </div>
            {!ready && (
              <div className={css.disclosure}>
                <ShieldCheck size={16} aria-hidden="true" />
                <div>
                  <strong>{t("unconnected")}</strong>
                  <p>{t("unconnectedBody")}</p>
                </div>
              </div>
            )}
            {ready ? (
              <div className={css.ready}>
                <div className={css.readyIcon}>
                  <FileText size={27} aria-hidden="true" />
                </div>
                <span className={css.draftBadge}>{t("notSubmitted")}</span>
                {time && (
                  <div className={css.preferredSummary}>
                    <CalendarDays size={21} aria-hidden="true" />
                    <div>
                      <strong>{dateLabel(time.startsAt)}</strong>
                      <span>
                        {timeLabel(time.startsAt)} – {timeLabel(time.endsAt)}
                      </span>
                      <small>
                        {timezone} · {details.companyName}
                      </small>
                    </div>
                  </div>
                )}
                <div className={css.nextSteps}>
                  <h4>{t("nextStepsTitle")}</h4>
                  <p>{t("nextStepsBody")}</p>
                  <p>{t("noEmail")}</p>
                </div>
                {downloadStatus && (
                  <p role="status" className={css.feedback}>
                    {downloadStatus}
                  </p>
                )}
                <button
                  type="button"
                  className={css.textButton}
                  onClick={reset}
                >
                  {t("startOver")}
                </button>
              </div>
            ) : (
              <form id={formId} onSubmit={next} noValidate>
                {step === 0 && (
                  <>
                    <div className={css.fields}>
                      {(
                        [
                          ["fullName", "name", "text"],
                          ["companyName", "organization", "text"],
                          ["email", "email", "email"],
                          ["phone", "tel", "tel"],
                          ["country", "country-name", "text"],
                        ] as const
                      ).map(([key, autoComplete, type]) => (
                        <label
                          className={cn(
                            css.field,
                            key === "country" && css.fullWidth,
                          )}
                          key={key}
                          htmlFor={`${uid}-${key}`}
                        >
                          <span>
                            {t(key)} <small>*</small>
                          </span>
                          <input
                            id={`${uid}-${key}`}
                            type={type}
                            autoComplete={autoComplete}
                            value={details[key]}
                            required
                            maxLength={
                              key === "email"
                                ? 254
                                : key === "phone"
                                  ? 40
                                  : key === "country"
                                    ? 80
                                    : key === "fullName"
                                      ? 120
                                      : 160
                            }
                            aria-invalid={!!errors[key]}
                            aria-describedby={
                              errors[key] ? `${uid}-${key}-error` : undefined
                            }
                            onChange={(event) =>
                              update(key, event.target.value)
                            }
                          />
                          {errors[key] && (
                            <span
                              className={css.fieldError}
                              id={`${uid}-${key}-error`}
                            >
                              {errors[key]}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                    <fieldset className={css.moduleField}>
                      <legend>
                        {t("modules")} <small>*</small>
                      </legend>
                      <div
                        className={css.moduleChoices}
                        id={`${uid}-modules`}
                        tabIndex={-1}
                        role="group"
                        aria-label={t("modules")}
                        aria-invalid={!!errors.modules}
                        aria-describedby={
                          errors.modules ? `${uid}-modules-error` : undefined
                        }
                      >
                        {ERP_MODULES.map((module) => (
                          <label key={module} className={css.moduleChoice}>
                            <input
                              type="checkbox"
                              checked={details.modules.includes(module)}
                              onChange={(event) => {
                                const checked = event.target.checked;
                                setDetails((current) => ({
                                  ...current,
                                  modules: checked
                                    ? [...current.modules, module]
                                    : current.modules.filter(
                                        (value) => value !== module,
                                      ),
                                }));
                                setErrors((current) => ({
                                  ...current,
                                  modules: undefined,
                                }));
                                setError("");
                              }}
                            />
                            <span>
                              <Check size={12} />
                              {module}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.modules && (
                        <p
                          className={css.fieldError}
                          id={`${uid}-modules-error`}
                        >
                          {errors.modules}
                        </p>
                      )}
                    </fieldset>
                    <label className={css.field} htmlFor={`${uid}-message`}>
                      <span>
                        {t("message")} <em>{t("optional")}</em>
                      </span>
                      <textarea
                        id={`${uid}-message`}
                        rows={3}
                        maxLength={2000}
                        value={details.message}
                        placeholder={t("messageHint")}
                        aria-invalid={!!errors.message}
                        onChange={(event) =>
                          update("message", event.target.value)
                        }
                      />
                      <small className={css.counter}>
                        {details.message.length}/2000
                      </small>
                      {errors.message && (
                        <span className={css.fieldError}>{errors.message}</span>
                      )}
                    </label>
                  </>
                )}
                {step === 1 && (
                  <>
                    <label className={cn(css.field, css.zoneField)}>
                      <span>
                        <Globe2 size={14} />
                        {t("yourTimezone")}
                      </span>
                      <select
                        value={timezone}
                        onChange={(event) => setTimezone(event.target.value)}
                      >
                        {zoneChoices.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                      <small>
                        {t("timezoneHint", { timezone: settings.timezone })}
                      </small>
                    </label>
                    <div className={css.dateGrid}>
                      <section
                        className={css.calendarPanel}
                        aria-label={t("advisorCalendar")}
                      >
                        <div className={css.panelLabel}>
                          <CalendarDays size={14} />
                          <strong>{t("advisorCalendar")}</strong>
                        </div>
                        <p className={css.scheduleLabel}>
                          {t("schedule", {
                            start: minuteLabel(settings.startMinute),
                            end: minuteLabel(settings.endMinute),
                            timezone: settings.timezone,
                          })}
                        </p>
                        <Calendar
                          className={css.calendar}
                          mode="single"
                          selected={day ? keyToCalendarDate(day) : undefined}
                          startMonth={keyToCalendarDate(today)}
                          endMonth={keyToCalendarDate(last)}
                          defaultMonth={keyToCalendarDate(day ?? today)}
                          showOutsideDays={false}
                          fixedWeeks
                          disabled={(date) => {
                            const key = localCalendarKey(date);
                            return (
                              key < today ||
                              key > last ||
                              !settings.workingDays.includes(date.getDay())
                            );
                          }}
                          onSelect={(date) => {
                            setDay(date ? localCalendarKey(date) : null);
                            setTime(null);
                            setError("");
                            setConsent(false);
                          }}
                        />
                      </section>
                      <section
                        className={css.timePanel}
                        aria-label={t("preferenceTimes")}
                      >
                        <div className={css.panelLabel}>
                          <Clock3 size={14} />
                          <strong>{t("preferenceTimes")}</strong>
                        </div>
                        <p className={css.notAvailability}>
                          {t("notAvailability")}
                        </p>
                        {times.length ? (
                          <div
                            className={css.times}
                            role="group"
                            aria-label={t("preferenceTimes")}
                          >
                            {times.map((value) => (
                              <button
                                key={value.startsAt}
                                type="button"
                                aria-pressed={
                                  active?.startsAt === value.startsAt
                                }
                                onClick={() => {
                                  setTime(value);
                                  setError("");
                                  setConsent(false);
                                }}
                              >
                                <span>{timeLabel(value.startsAt)}</span>
                                <small>
                                  {new Intl.DateTimeFormat("en", {
                                    timeZone: timezone,
                                    month: "short",
                                    day: "numeric",
                                  }).format(new Date(value.startsAt))}
                                </small>
                                {active?.startsAt === value.startsAt && (
                                  <Check size={13} />
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className={css.timeEmpty}>
                            <Clock3 size={23} />
                            <strong>
                              {day ? t("noTimes") : t("pickDate")}
                            </strong>
                            <p>{day ? t("noTimesBody") : t("pickDateBody")}</p>
                          </div>
                        )}
                      </section>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div className={css.review}>
                    <section>
                      <div className={css.reviewHeading}>
                        <h4>
                          <CalendarDays size={15} />
                          {t("preferredSession")}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setError("");
                          }}
                        >
                          <Pencil size={12} />
                          {t("edit")}
                        </button>
                      </div>
                      {time && (
                        <>
                          <strong className={css.reviewDate}>
                            {dateLabel(time.startsAt)}
                          </strong>
                          <p>
                            {timeLabel(time.startsAt)} –{" "}
                            {timeLabel(time.endsAt)}
                          </p>
                          <small>
                            {timezone} · {settings.durationMinutes} minutes
                          </small>
                        </>
                      )}
                      <span className={css.draftBadge}>
                        {t("notAvailability")}
                      </span>
                    </section>
                    <section>
                      <div className={css.reviewHeading}>
                        <h4>{t("businessDetails")}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setStep(0);
                            setError("");
                          }}
                        >
                          <Pencil size={12} />
                          {t("edit")}
                        </button>
                      </div>
                      <dl className={css.reviewDetails}>
                        {(
                          [
                            "fullName",
                            "companyName",
                            "email",
                            "phone",
                            "country",
                          ] as const
                        ).map((key) => (
                          <div key={key}>
                            <dt>{t(key)}</dt>
                            <dd>{details[key]}</dd>
                          </div>
                        ))}
                        <div>
                          <dt>{t("modules")}</dt>
                          <dd>{details.modules.join(", ")}</dd>
                        </div>
                        <div>
                          <dt>{t("message")}</dt>
                          <dd>{details.message || t("emptyMessage")}</dd>
                        </div>
                      </dl>
                    </section>
                    <label className={css.consent}>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(event) => {
                          setConsent(event.target.checked);
                          setError("");
                        }}
                      />
                      <span>{t("consent")}</span>
                    </label>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
        <footer className={css.footer} data-booking-region="footer">
          {!ready && error && (
            <p role="alert" className={css.error}>
              {error}
            </p>
          )}
          <div className={css.actions}>
            <div className={css.footerStart}>
              {ready ? (
                <button
                  type="button"
                  className={css.back}
                  onClick={() => {
                    setReady(false);
                    setDownloadStatus("");
                  }}
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  {t("editDraft")}
                </button>
              ) : step > 0 ? (
                <button
                  type="button"
                  className={css.back}
                  onClick={() => {
                    setStep((current) => current - 1);
                    setError("");
                  }}
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  {t("back")}
                </button>
              ) : (
                <span className={css.requiredNote}>* {t("required")}</span>
              )}
              {!ready && (
                <span className={css.stepCount}>
                  {t("stepCount", { current: step + 1, total: 3 })}
                </span>
              )}
            </div>
            {ready ? (
              <button type="button" className={css.primary} onClick={download}>
                <Download size={16} aria-hidden="true" />
                {t("download")}
              </button>
            ) : (
              <button className={css.primary} type="submit" form={formId}>
                {step === 0
                  ? t("nextTime")
                  : step === 1
                    ? t("nextReview")
                    : t("prepare")}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className={css.footerNote}>
            <ShieldCheck size={12} aria-hidden="true" />
            {t("calendarNote")}
          </p>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

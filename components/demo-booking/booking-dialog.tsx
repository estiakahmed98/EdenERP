"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Loader2,
  MessagesSquare,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { isLocale } from "@/i18n/config";
import {
  DEMO_MODULES,
  EMPTY_DEMO_DETAILS,
  demoDetailsSchema,
  demoReceiptSchema,
  type DemoDetails,
} from "@/lib/demo-requests/validation";
import css from "./booking.module.css";
import DemoIllustration from "./demo-illustration";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: () => void;
};
type Errors = Partial<Record<keyof DemoDetails, string>>;

export default function DemoRequestDialog({
  open,
  onOpenChange,
  returnFocus,
}: Props) {
  const t = useTranslations("common.demoRequest");
  const params = useParams();
  const uid = useId();
  const formId = uid + "-demo-request";
  const [details, setDetails] = useState<DemoDetails>({
    ...EMPTY_DEMO_DETAILS,
    modules: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [website, setWebsite] = useState("");
  const pending = useRef(false);
  const attempt = useRef<{ signature: string; key: string } | null>(null);
  const dialogElement = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const update = () => {
      const el = dialogElement.current;
      if (!el) return;
      const height = viewport?.height || window.innerHeight;
      el.style.setProperty("--demo-viewport-height", height + "px");
      el.style.setProperty(
        "--demo-viewport-top",
        (viewport?.offsetTop ?? 0) + "px",
      );
      el.dataset.compactViewport = String(height < 500);
    };
    update();
    const frame = window.requestAnimationFrame(update);
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  useEffect(() => {
    if (saved && open) {
      body.current?.scrollTo({ top: 0 });
      successHeading.current?.focus({ preventScroll: true });
    }
  }, [saved, open]);
  useEffect(() => {
    if (open || !saved) return;
    const timer = window.setTimeout(() => {
      setSaved(false);
      setDetails({ ...EMPTY_DEMO_DETAILS, modules: [] });
      setErrors({});
      setError("");
      setWebsite("");
      attempt.current = null;
    }, 200);
    return () => window.clearTimeout(timer);
  }, [open, saved]);
  function update(
    key: "fullName" | "companyName" | "phone" | "email" | "message",
    value: string,
  ) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setError("");
  }
  function shareMore(value: boolean) {
    setDetails((current) => ({
      ...current,
      shareMore: value,
      ...(!value ? { email: "", modules: [], message: "" } : {}),
    }));
    setErrors((current) => ({
      fullName: current.fullName,
      companyName: current.companyName,
      phone: current.phone,
    }));
    setError("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (pending.current) return;
    const parsed = demoDetailsSchema.safeParse(details);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof DemoDetails;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setError(t("invalid"));
      window.requestAnimationFrame(() =>
        document
          .getElementById(uid + "-" + String(parsed.error.issues[0]?.path[0]))
          ?.focus(),
      );
      return;
    }
    pending.current = true;
    setSubmitting(true);
    setErrors({});
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const signature = JSON.stringify(parsed.data);
      if (attempt.current?.signature !== signature)
        attempt.current = { signature, key: crypto.randomUUID() };
      const locale =
        typeof params?.locale === "string" && isLocale(params.locale)
          ? params.locale
          : "en";
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          details: parsed.data,
          requestKey: attempt.current.key,
          locale,
          website,
        }),
        signal: controller.signal,
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const code =
          typeof data === "object" && data !== null && "code" in data
            ? String(data.code)
            : "";
        if (code === "REQUEST_CHANGED") attempt.current = null;
        setError(
          response.status === 429
            ? t("rateLimited")
            : code === "REQUEST_CHANGED"
              ? t("changed")
              : t("failed"),
        );
        return;
      }
      if (!demoReceiptSchema.safeParse(data).success) {
        setError(t("failed"));
        return;
      }
      setSaved(true);
      setDetails({ ...EMPTY_DEMO_DETAILS, modules: [] });
      window.dispatchEvent(new Event("eden-demo-request-created"));
    } catch {
      setError(t("failed"));
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
      setSubmitting(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogElement}
        lang="en"
        dir="ltr"
        showCloseButton={false}
        className={css.dialog}
        data-expanded={details.shareMore}
        data-saved={saved}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          document
            .getElementById(uid + "-fullName")
            ?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus();
        }}
      >
        <header className={css.header}>
          <span className={css.brandLogo}>
            <Image
              src="/adon_erp_logo.png"
              alt="AdonERP"
              width={168}
              height={94}
              priority
            />
          </span>
          <span className={css.headerNote}>{t("eyebrow")}</span>
          <DialogClose className={css.close} aria-label={t("close")}>
            <X size={18} aria-hidden="true" />
          </DialogClose>
        </header>
        <div
          ref={body}
          className={css.body}
          role="region"
          aria-label={t("title")}
          tabIndex={0}
        >
          <div className={css.layout}>
            {!saved && (
              <aside className={css.visualPanel} aria-hidden="true">
                <span className={css.eyebrow}>
                  <span />
                  {t("liveDemo")}
                </span>
                <p className={css.visualTitle}>
                  {t("visualTitle")
                    .split("\n")
                    .map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                </p>
                <p className={css.visualCaption}>{t("visualCaption")}</p>
                <div className={css.illustration}>
                  <DemoIllustration />
                </div>
              </aside>
            )}
            <div className={css.formPanel}>
              <div className={css.intro}>
                <span className={css.introIcon} aria-hidden="true">
                  <MessagesSquare size={21} />
                </span>
                <div>
                  <DialogTitle className={css.title}>
                    {saved ? t("successTitle") : t("title")}
                  </DialogTitle>
                  <DialogDescription className={css.description}>
                    {saved ? t("successCaption") : t("description")}
                  </DialogDescription>
                </div>
              </div>
              {saved ? (
                <div className={css.success}>
                  <div className={css.successIcon}>
                    <CheckCircle2 size={31} aria-hidden="true" />
                  </div>
                  <h3 className={css.srOnly} ref={successHeading} tabIndex={-1}>
                    {t("successTitle")}
                  </h3>
                  <p role="status">{t("success")}</p>
                </div>
              ) : (
                <form
                  id={formId}
                  onSubmit={submit}
                  noValidate
                  aria-busy={submitting}
                >
                  <fieldset disabled={submitting} className={css.fields}>
                    <div className={css.contactCard}>
                      {(
                        [
                          ["fullName", "name", "text", 120],
                          ["companyName", "organization", "text", 160],
                          ["phone", "tel", "tel", 40],
                        ] as const
                      ).map(([key, autoComplete, type, max]) => (
                        <label
                          className={css.field}
                          data-invalid={!!errors[key]}
                          key={key}
                          htmlFor={uid + "-" + key}
                        >
                          <span className={css.fieldIcon} aria-hidden="true">
                            {key === "fullName" ? (
                              <UserRound size={18} />
                            ) : key === "companyName" ? (
                              <Building2 size={18} />
                            ) : (
                              <Phone size={18} />
                            )}
                          </span>
                          <span className={css.fieldControl}>
                            <span
                              className={css.fieldLabel}
                              id={uid + "-" + key + "-label"}
                            >
                              {t(key)}
                              <small aria-hidden="true">*</small>
                            </span>
                            <input
                              id={uid + "-" + key}
                              type={type}
                              autoComplete={autoComplete}
                              required
                              maxLength={max}
                              value={details[key]}
                              placeholder={t(key + "Placeholder")}
                              onChange={(event) =>
                                update(key, event.target.value)
                              }
                              aria-invalid={!!errors[key]}
                              aria-labelledby={uid + "-" + key + "-label"}
                              aria-describedby={
                                errors[key]
                                  ? uid + "-" + key + "-error"
                                  : undefined
                              }
                            />
                          </span>
                          {errors[key] && (
                            <span
                              className={css.fieldError}
                              id={uid + "-" + key + "-error"}
                            >
                              {errors[key]}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                    <fieldset className={css.question}>
                      <legend>{t("additionalQuestion")}</legend>
                      <div className={css.choices}>
                        {[true, false].map((value) => (
                          <label key={String(value)}>
                            <input
                              type="radio"
                              name={uid + "-more"}
                              checked={details.shareMore === value}
                              onChange={() => shareMore(value)}
                            />
                            <span>
                              {value ? t("yes") : t("no")}
                              {details.shareMore === value && (
                                <Check size={12} aria-hidden="true" />
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    {details.shareMore && (
                      <div className={css.optional}>
                        <label
                          className={css.optionalField}
                          htmlFor={uid + "-email"}
                        >
                          <span>
                            {t("email")}
                            <em>{t("optional")}</em>
                          </span>
                          <input
                            id={uid + "-email"}
                            type="email"
                            autoComplete="email"
                            placeholder={t("emailPlaceholder")}
                            maxLength={254}
                            value={details.email}
                            onChange={(event) =>
                              update("email", event.target.value)
                            }
                            aria-invalid={!!errors.email}
                            aria-describedby={
                              errors.email ? uid + "-email-error" : undefined
                            }
                          />
                          {errors.email && (
                            <span
                              className={css.fieldError}
                              id={uid + "-email-error"}
                            >
                              {errors.email}
                            </span>
                          )}
                        </label>
                        <fieldset className={css.modules}>
                          <legend>
                            {t("modules")}
                            <em>{t("optional")}</em>
                          </legend>
                          <div
                            className={css.moduleChoices}
                            id={uid + "-modules"}
                            tabIndex={-1}
                          >
                            {DEMO_MODULES.map((module) => (
                              <label key={module}>
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
                                    setError("");
                                  }}
                                />
                                <span>
                                  <Check size={11} aria-hidden="true" />
                                  {module}
                                </span>
                              </label>
                            ))}
                          </div>
                          {errors.modules && (
                            <p className={css.fieldError}>{errors.modules}</p>
                          )}
                        </fieldset>
                        <label
                          className={css.optionalField}
                          htmlFor={uid + "-message"}
                        >
                          <span>
                            {t("message")}
                            <em>{t("optional")}</em>
                          </span>
                          <textarea
                            id={uid + "-message"}
                            rows={3}
                            maxLength={2000}
                            placeholder={t("messagePlaceholder")}
                            value={details.message}
                            onChange={(event) =>
                              update("message", event.target.value)
                            }
                          />
                          <small className={css.counter}>
                            {details.message.length}/2000
                          </small>
                        </label>
                      </div>
                    )}
                    <div className={css.honeypot} aria-hidden="true">
                      <label htmlFor={uid + "-website"}>Website</label>
                      <input
                        id={uid + "-website"}
                        name="website"
                        autoComplete="off"
                        tabIndex={-1}
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                      />
                    </div>
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </div>
        <footer className={css.footer}>
          <div className={css.footerInner}>
            {error && (
              <p className={css.error} role="alert">
                {error}
              </p>
            )}
            {saved ? (
              <DialogClose className={css.submit}>{t("done")}</DialogClose>
            ) : (
              <>
                <button
                  form={formId}
                  type="submit"
                  className={css.submit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2
                      size={16}
                      className={css.spinner}
                      aria-hidden="true"
                    />
                  ) : null}
                  {submitting ? t("submitting") : t("submit")}
                  {!submitting && (
                    <span className={css.submitIcon}>
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  )}
                </button>
                {submitting && (
                  <p className={css.srOnly} role="status">
                    {t("loading")}
                  </p>
                )}
              </>
            )}
            {!saved && (
              <p className={css.privacy}>
                <Phone size={11} aria-hidden="true" />
                {t("phoneFollowUp")}
              </p>
            )}
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Clock3,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import english from "@/messages/en.json";
import LiveDemoButton from "@/components/live-demo-button";
import DemoBookingProvider from "./provider";
import {
  DEFAULT_PLANNER_SETTINGS,
  WEEKDAYS,
  minuteLabel,
  plannerSettingsSchema,
  timezones,
  writePlannerSettings,
  type PlannerSettings,
} from "@/lib/live-demo-planner";
import { usePlannerSettings } from "./use-planner-settings";
import css from "./admin-planner.module.css";

export default function AdminDemoPlanner() {
  const saved = usePlannerSettings();
  const [draft, setDraft] = useState<PlannerSettings>(DEFAULT_PLANNER_SETTINGS);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [zones] = useState(timezones);
  useEffect(() => setDraft(saved), [saved]);
  function update<K extends keyof PlannerSettings>(
    key: K,
    value: PlannerSettings[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  }
  function save(event: FormEvent) {
    event.preventDefault();
    const result = plannerSettingsSchema.safeParse(draft);
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ?? "Check the schedule settings.",
      );
      return;
    }
    try {
      writePlannerSettings(result.data);
      setMessage(
        "Saved in this browser. The live demo planner now uses these settings here; nothing has been published.",
      );
      setError("");
    } catch {
      setError("Browser storage is unavailable. Settings were not saved.");
    }
  }
  function reset() {
    try {
      writePlannerSettings(DEFAULT_PLANNER_SETTINGS);
      setDraft(DEFAULT_PLANNER_SETTINGS);
      setError("");
      setMessage("Default planning settings restored in this browser.");
    } catch {
      setError("Browser storage is unavailable. Defaults were not saved.");
    }
  }
  return (
    <NextIntlClientProvider locale="en" messages={{ common: english.common }}>
      <DemoBookingProvider>
        <main className={css.admin} lang="en" dir="ltr">
          <header className={css.adminHeader}>
            <div>
              <span className={css.overline}>
                <SlidersHorizontal size={13} />
                Live demo experience
              </span>
              <h1>Booking planner settings</h1>
              <p>
                Shape the frontend planning experience. Your schedule settings
                are stored on this device and update the shared popup in this
                browser.
              </p>
            </div>
            <LiveDemoButton />
          </header>
          <div className={css.adminBanner}>
            <strong>Frontend only · no published availability</strong>Settings
            here are browser-local preferences. They do not publish slots,
            reserve time, create bookings, send emails or connect an external
            calendar.
          </div>
          <div className={css.adminGrid}>
            <section className={css.adminPanel}>
              <h2>Advisor schedule</h2>
              <p>
                The default is a 30-minute session, Sunday–Thursday, 10:00–18:00
                in Asia/Dhaka. Friday and Saturday are excluded.
              </p>
              <form onSubmit={save} noValidate>
                <div className={css.fields}>
                  <label className={css.field}>
                    <span>Demo duration (minutes)</span>
                    <input
                      type="number"
                      min={15}
                      max={120}
                      step={5}
                      value={draft.durationMinutes}
                      onChange={(event) =>
                        update("durationMinutes", Number(event.target.value))
                      }
                    />
                  </label>
                  <label className={css.field}>
                    <span>Advisor timezone</span>
                    <select
                      value={draft.timezone}
                      onChange={(event) =>
                        update("timezone", event.target.value)
                      }
                    >
                      {[...new Set([draft.timezone, ...zones])].map((zone) => (
                        <option key={zone}>{zone}</option>
                      ))}
                    </select>
                  </label>
                  <label className={css.field}>
                    <span>Working day starts</span>
                    <input
                      type="time"
                      value={minuteLabel(draft.startMinute)}
                      onChange={(event) => {
                        const [h, m] = event.target.value
                          .split(":")
                          .map(Number);
                        update("startMinute", h * 60 + m);
                      }}
                    />
                  </label>
                  <label className={css.field}>
                    <span>Working day ends</span>
                    <input
                      type="time"
                      value={minuteLabel(draft.endMinute)}
                      onChange={(event) => {
                        const [h, m] = event.target.value
                          .split(":")
                          .map(Number);
                        update("endMinute", h * 60 + m);
                      }}
                    />
                  </label>
                  <label className={css.field}>
                    <span>Planning lead time (minutes)</span>
                    <input
                      type="number"
                      min={0}
                      max={10080}
                      value={draft.leadMinutes}
                      onChange={(event) =>
                        update("leadMinutes", Number(event.target.value))
                      }
                    />
                    <small>
                      Hide preferred start times earlier than this interval.
                    </small>
                  </label>
                  <label className={css.field}>
                    <span>Planning horizon (days)</span>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={draft.horizonDays}
                      onChange={(event) =>
                        update("horizonDays", Number(event.target.value))
                      }
                    />
                  </label>
                </div>
                <fieldset className={css.moduleField}>
                  <legend>Working days</legend>
                  <div className={css.adminDays}>
                    {WEEKDAYS.map((day, index) => (
                      <label key={day}>
                        <input
                          type="checkbox"
                          checked={draft.workingDays.includes(index)}
                          onChange={(event) =>
                            update(
                              "workingDays",
                              event.target.checked
                                ? [...draft.workingDays, index]
                                : draft.workingDays.filter(
                                    (value) => value !== index,
                                  ),
                            )
                          }
                        />
                        <span>{day.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {error && (
                  <p role="alert" className={css.error}>
                    {error}
                  </p>
                )}
                {message && (
                  <p role="status" className={css.feedback}>
                    {message}
                  </p>
                )}
                <footer className={css.actions}>
                  <button className={css.back} type="button" onClick={reset}>
                    Restore defaults
                  </button>
                  <button className={css.primary} type="submit">
                    Save on this browser
                  </button>
                </footer>
              </form>
            </section>
            <div>
              <section className={css.adminPanel}>
                <h2>Connection status</h2>
                <p>
                  These services are not connected in this frontend
                  implementation.
                </p>
                <div className={css.integrationList}>
                  <div>
                    <strong>Booking storage</strong>
                    <span>Not connected · requests remain in memory</span>
                  </div>
                  <div>
                    <strong>Published availability</strong>
                    <span>Not connected · no live slots are offered</span>
                  </div>
                  <div>
                    <strong>Email notifications</strong>
                    <span>Not configured · no messages are sent</span>
                  </div>
                  <div>
                    <strong>Google / Microsoft calendar</strong>
                    <span>
                      Not configured · no synchronization or meeting links
                    </span>
                  </div>
                </div>
              </section>
              <section className={css.adminPanel} style={{ marginTop: 24 }}>
                <h2>Booking management</h2>
                <div className={css.adminEmpty}>
                  <FileText size={29} />
                  <strong>No booking service connected</strong>
                  <p>
                    The public popup prepares a downloadable draft. There are no
                    submitted requests to manage here.
                  </p>
                  <span className={css.draftBadge}>
                    <CalendarDays size={12} /> &nbsp; Preferences only
                  </span>
                </div>
              </section>
            </div>
          </div>
          <p className={css.feedback}>
            <Clock3
              size={12}
              style={{ display: "inline", verticalAlign: "middle" }}
            />{" "}
            No schema, migration, API or database change is part of this screen.
          </p>
        </main>
      </DemoBookingProvider>
    </NextIntlClientProvider>
  );
}

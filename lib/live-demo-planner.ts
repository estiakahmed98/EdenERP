import { z } from "zod";

export const PLANNER_SETTINGS_KEY = "eden.demo-planner.settings.v1";
export const PLANNER_SETTINGS_EVENT = "eden-demo-planner-settings";
export const ERP_MODULES = [
  "Accounting",
  "Manufacturing",
  "Quality (QMS)",
  "Inventory",
  "Sales & CRM",
  "HR & Payroll",
  "University",
  "Other",
] as const;
export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export function validTimezone(value: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}
export const plannerSettingsSchema = z
  .object({
    durationMinutes: z.number().int().min(15).max(120),
    timezone: z.string().max(80).refine(validTimezone),
    workingDays: z
      .array(z.number().int().min(0).max(6))
      .min(1)
      .max(7)
      .transform((days) => [...new Set(days)].sort()),
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(1).max(1440),
    leadMinutes: z.number().int().min(0).max(10080),
    horizonDays: z.number().int().min(1).max(90),
  })
  .refine(
    (value) => value.endMinute - value.startMinute >= value.durationMinutes,
    "Working hours must fit a full session.",
  );
export type PlannerSettings = z.infer<typeof plannerSettingsSchema>;
export const DEFAULT_PLANNER_SETTINGS: PlannerSettings = {
  durationMinutes: 30,
  timezone: "Asia/Dhaka",
  workingDays: [0, 1, 2, 3, 4],
  startMinute: 600,
  endMinute: 1080,
  leadMinutes: 120,
  horizonDays: 90,
};
const required = (max: number) =>
  z.string().trim().min(2, "Please enter at least two characters.").max(max);
export const plannerDetailsSchema = z.object({
  fullName: required(120),
  companyName: required(160),
  email: z
    .string()
    .trim()
    .email("Enter a valid business email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^\+?[0-9\s().-]+$/, "Enter a valid phone number.")
    .refine((value) => {
      const n = value.replace(/\D/g, "").length;
      return n >= 7 && n <= 15;
    }, "Include your country code and 7–15 digits."),
  country: required(80),
  modules: z
    .array(z.enum(ERP_MODULES))
    .min(1, "Choose at least one ERP module.")
    .max(ERP_MODULES.length)
    .transform((value) => [...new Set(value)]),
  message: z.string().trim().max(2000, "Use no more than 2,000 characters."),
});
export type PlannerDetails = z.infer<typeof plannerDetailsSchema>;
export const EMPTY_PLANNER_DETAILS: PlannerDetails = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  modules: [],
  message: "",
};
export type PreferredTime = { startsAt: string; endsAt: string };
export function calendarKey(value: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  return ["year", "month", "day"]
    .map((type) => parts.find((p) => p.type === type)?.value)
    .join("-");
}
export function localCalendarKey(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}
export function keyToCalendarDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}
export function addCalendarDays(key: string, days: number) {
  const date = keyToCalendarDate(key);
  date.setDate(date.getDate() + days);
  return localCalendarKey(date);
}
export function minuteLabel(minute: number) {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}

/** Resolve wall times through actual IANA offsets, including DST transitions. */
export function wallTimeCandidates(
  key: string,
  minute: number,
  timezone: string,
) {
  const [year, month, day] = key.split("-").map(Number),
    wall = Date.UTC(year, month - 1, day, Math.floor(minute / 60), minute % 60);
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const candidates = new Set<number>();
  for (const hours of [-36, -12, 0, 12, 36]) {
    const probe = wall + hours * 3600000;
    const parts = Object.fromEntries(
      formatter.formatToParts(probe).map((part) => [part.type, part.value]),
    );
    const offset =
      Date.UTC(
        +parts.year,
        +parts.month - 1,
        +parts.day,
        +parts.hour,
        +parts.minute,
      ) - probe;
    const candidate = wall - offset;
    const actual = Object.fromEntries(
      formatter.formatToParts(candidate).map((part) => [part.type, part.value]),
    );
    if (
      +actual.year === year &&
      +actual.month === month &&
      +actual.day === day &&
      +actual.hour === Math.floor(minute / 60) &&
      +actual.minute === minute % 60
    )
      candidates.add(candidate);
  }
  return [...candidates].sort((a, b) => a - b);
}

/** Planning suggestions only. This never represents published availability. */
export function preferenceTimes(
  key: string,
  settings: PlannerSettings,
  now = new Date(),
): PreferredTime[] {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(key) ||
    !plannerSettingsSchema.safeParse(settings).success
  )
    return [];
  const date = keyToCalendarDate(key);
  if (
    localCalendarKey(date) !== key ||
    !settings.workingDays.includes(date.getDay())
  )
    return [];
  const today = calendarKey(now, settings.timezone);
  if (key < today || key > addCalendarDays(today, settings.horizonDays))
    return [];
  const results: PreferredTime[] = [];
  for (
    let minute = settings.startMinute;
    minute + settings.durationMinutes <= settings.endMinute;
    minute += settings.durationMinutes
  ) {
    for (const start of wallTimeCandidates(key, minute, settings.timezone)) {
      const end = start + settings.durationMinutes * 60000;
      const endParts = new Intl.DateTimeFormat("en", {
        timeZone: settings.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(end);
      const endMinute =
        Number(endParts.find((p) => p.type === "hour")?.value) * 60 +
        Number(endParts.find((p) => p.type === "minute")?.value);
      const endKey = calendarKey(new Date(end), settings.timezone);
      const midnightEnd =
        settings.endMinute === 1440 &&
        endKey === addCalendarDays(key, 1) &&
        endMinute === 0;
      if (
        start >= now.getTime() + settings.leadMinutes * 60000 &&
        ((endKey === key && endMinute <= settings.endMinute) || midnightEnd)
      )
        results.push({
          startsAt: new Date(start).toISOString(),
          endsAt: new Date(end).toISOString(),
        });
    }
  }
  return results.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
export function timezones() {
  try {
    return [
      ...new Set(["Asia/Dhaka", "UTC", ...Intl.supportedValuesOf("timeZone")]),
    ];
  } catch {
    return [
      "Asia/Dhaka",
      "UTC",
      "Asia/Kolkata",
      "Asia/Kathmandu",
      "Asia/Dubai",
      "Europe/London",
      "America/New_York",
      "Asia/Singapore",
      "Australia/Sydney",
    ];
  }
}
export function readPlannerSettings(): PlannerSettings {
  if (typeof window === "undefined") return DEFAULT_PLANNER_SETTINGS;
  try {
    const value = window.localStorage.getItem(PLANNER_SETTINGS_KEY);
    if (value) {
      const result = plannerSettingsSchema.safeParse(JSON.parse(value));
      if (result.success) return result.data;
    }
  } catch {
    /* Defaults remain usable when browser storage is unavailable. */
  }
  return DEFAULT_PLANNER_SETTINGS;
}
export function writePlannerSettings(settings: PlannerSettings) {
  const value = plannerSettingsSchema.parse(settings);
  window.localStorage.setItem(PLANNER_SETTINGS_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(PLANNER_SETTINGS_EVENT));
}
export function requestSummary(
  details: PlannerDetails,
  time: PreferredTime,
  timezone: string,
) {
  const format = (value: string) =>
    new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(value));
  return [
    "EdenERP — Live demo request draft",
    "NOT SUBMITTED · NOT A CONFIRMED BOOKING",
    "",
    `Full name: ${details.fullName}`,
    `Company: ${details.companyName}`,
    `Business email: ${details.email}`,
    `Phone: ${details.phone}`,
    `Country: ${details.country}`,
    `ERP modules: ${details.modules.join(", ")}`,
    "",
    `Preferred start: ${format(time.startsAt)}`,
    `Preferred end: ${format(time.endsAt)}`,
    `Timezone: ${timezone}`,
    `UTC start: ${time.startsAt}`,
    `UTC end: ${time.endsAt}`,
    "",
    `Additional message: ${details.message || "None"}`,
    "",
    "This draft was prepared on your device. It has not been submitted or saved to an ERP database. Availability, meeting details and booking confirmation require an advisor. No emails have been sent.",
  ].join("\n");
}

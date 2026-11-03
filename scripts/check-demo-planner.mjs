import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const source = fs.readFileSync("lib/live-demo-planner.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const module = { exports: {} };
new Function("require", "module", "exports", compiled)(
  createRequire(import.meta.url),
  module,
  module.exports,
);
const {
  DEFAULT_PLANNER_SETTINGS: defaults,
  plannerSettingsSchema,
  plannerDetailsSchema,
  preferenceTimes,
  calendarKey,
  wallTimeCandidates,
  requestSummary,
  readPlannerSettings,
  writePlannerSettings,
  PLANNER_SETTINGS_KEY,
} = module.exports;
assert.equal(defaults.durationMinutes, 30);
assert.equal(defaults.timezone, "Asia/Dhaka");
assert.deepEqual(defaults.workingDays, [0, 1, 2, 3, 4]);
assert.equal(defaults.startMinute, 600);
assert.equal(defaults.endMinute, 1080);
const now = new Date("2026-11-03T00:00:00Z");
const times = preferenceTimes("2026-11-03", defaults, now);
assert.equal(times.length, 16);
assert.equal(times[0].startsAt, "2026-11-03T04:00:00.000Z");
assert.equal(times.at(-1).endsAt, "2026-11-03T12:00:00.000Z");
for (const key of [
  "2026-11-06",
  "2026-11-07",
  "2026-11-02",
  "2026-02-30",
  "2027-05-03",
  "invalid",
])
  assert.deepEqual(preferenceTimes(key, defaults, now), [], key);
assert.equal(
  preferenceTimes("2026-11-03", defaults, new Date("2026-11-03T03:00:00Z"))[0]
    .startsAt,
  "2026-11-03T05:00:00.000Z",
);
assert.equal(
  calendarKey(new Date("2026-11-03T18:30:00Z"), "Asia/Dhaka"),
  "2026-11-04",
);
assert.deepEqual(wallTimeCandidates("2026-11-03", 600, "Asia/Kathmandu"), [
  Date.parse("2026-11-03T04:15:00Z"),
]);
assert.deepEqual(wallTimeCandidates("2026-03-08", 150, "America/New_York"), []);
assert.deepEqual(wallTimeCandidates("2026-11-01", 90, "America/New_York"), [
  Date.parse("2026-11-01T05:30:00Z"),
  Date.parse("2026-11-01T06:30:00Z"),
]);
assert.equal(
  preferenceTimes(
    "2026-11-03",
    { ...defaults, startMinute: 1410, endMinute: 1440 },
    now,
  )[0].endsAt,
  "2026-11-03T18:00:00.000Z",
);
assert.equal(
  preferenceTimes("2026-11-03", { ...defaults, durationMinutes: 15 }, now)
    .length,
  32,
);
for (const overrides of [
  { workingDays: [] },
  { timezone: "Invalid/Zone" },
  { durationMinutes: 300 },
  { startMinute: 1000, endMinute: 1010 },
  { horizonDays: 0 },
])
  assert.equal(
    plannerSettingsSchema.safeParse({ ...defaults, ...overrides }).success,
    false,
  );

const valid = {
  fullName: "Alex Tester",
  companyName: "Testing Company",
  email: " ALEX@EXAMPLE.TEST ",
  phone: "+880 1700 000000",
  country: "Bangladesh",
  modules: ["Manufacturing", "Manufacturing"],
  message: "A focused demo.",
};
const details = plannerDetailsSchema.parse(valid);
assert.equal(details.email, "alex@example.test");
assert.deepEqual(details.modules, ["Manufacturing"]);
for (const overrides of [
  { fullName: "" },
  { companyName: "" },
  { email: "bad" },
  { phone: "12" },
  { country: "" },
  { modules: [] },
  { message: "x".repeat(2001) },
])
  assert.equal(
    plannerDetailsSchema.safeParse({ ...valid, ...overrides }).success,
    false,
  );
const summary = requestSummary(details, times[0], "Asia/Dhaka");
assert(summary.includes("NOT SUBMITTED · NOT A CONFIRMED BOOKING"));
assert(summary.includes("No emails have been sent."));
assert(summary.includes("2026-11-03T04:00:00.000Z"));

const storage = new Map();
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
  dispatchEvent: () => true,
};
assert.deepEqual(readPlannerSettings(), defaults);
writePlannerSettings({
  ...defaults,
  durationMinutes: 45,
  email: "must-not-be-stored@example.test",
});
assert.equal(readPlannerSettings().durationMinutes, 45);
assert(!storage.get(PLANNER_SETTINGS_KEY).includes("must-not-be-stored"));
storage.set(PLANNER_SETTINGS_KEY, "not json");
assert.deepEqual(readPlannerSettings(), defaults);
window.localStorage.getItem = () => {
  throw new Error("Storage blocked");
};
assert.deepEqual(readPlannerSettings(), defaults);
delete globalThis.window;

for (const file of fs.readdirSync("components/demo-booking")) {
  const text = fs.readFileSync(`components/demo-booking/${file}`, "utf8");
  assert(
    !/\bfetch\s*\(|\/api\/|@\/lib\/db|@\/lib\/prisma/.test(text),
    `Unexpected backend dependency in ${file}`,
  );
}
const english = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
const dialog = fs.readFileSync(
  "components/demo-booking/booking-dialog.tsx",
  "utf8",
);
for (const [, key] of dialog.matchAll(/\bt\("([^"]+)"/g))
  assert.equal(
    typeof english.common.demoBooking[key],
    "string",
    `Missing copy: ${key}`,
  );
assert(
  fs
    .readFileSync("components/landing/Hero.tsx", "utf8")
    .includes("<LiveDemoButton />"),
);
console.log(
  "PASS: frontend details/settings validation, Dhaka working hours/weekends, past times, horizon, fractional offsets, DST gaps/repeats, midnight boundary, local-only storage, draft disclosure, translation keys and homepage CTA.",
);

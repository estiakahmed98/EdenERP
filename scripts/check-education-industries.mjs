import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
function load(relative) {
  const output = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", output)(module, module.exports);
  return module.exports;
}
const { findConflicts, creditTotal } = load(
  "../components/education/industry/calculations.ts",
);
const {
  educationIndustries,
  pages,
  sessions,
  courses,
  lessons,
  learners,
  attendanceInitial,
} = load("../components/education/industry/data.ts");
const proposal = {
  day: "Sunday",
  start: "09:30",
  end: "10:30",
  room: "Lab 01",
  tutor: "Tutor B",
  group: "Humanities 1",
};
assert.deepEqual(findConflicts(proposal, sessions), [
  { id: "EX-01", reasons: ["room"] },
  { id: "EX-02", reasons: ["tutor", "group"] },
]);
assert.deepEqual(findConflicts({ ...proposal, day: "Tuesday" }, sessions), []);
assert.deepEqual(
  findConflicts(
    {
      ...proposal,
      start: "10:00",
      end: "10:30",
      room: "Lab 01",
      tutor: "Tutor A",
      group: "Science 1",
    },
    sessions,
  ),
  [],
);
assert.deepEqual(
  findConflicts(
    {
      ...proposal,
      start: "09:00",
      end: "10:00",
      tutor: "Tutor A",
      group: "Science 1",
    },
    sessions,
  ),
  [{ id: "EX-01", reasons: ["room", "tutor", "group"] }],
);
assert.deepEqual(findConflicts(proposal, []), []);
for (const start of ["", "9:00", "24:00", "09:60", "10:30", "11:00"])
  assert.throws(() => findConflicts({ ...proposal, start }, sessions));
assert.equal(creditTotal([courses[0].id, courses[1].id], courses), 6);
assert.equal(
  creditTotal(
    courses.map((row) => row.id),
    courses,
  ),
  14,
);
assert.equal(creditTotal([courses[0].id, courses[0].id], courses), 3);
assert.equal(creditTotal([], courses), 0);
assert.throws(() => creditTotal(["unknown"], courses));
for (const credits of [-1, 0, NaN, Infinity])
  assert.throws(() => creditTotal(["test"], [{ id: "test", credits }]));
assert.equal(learners.length, 4);
assert.equal(
  Object.values(attendanceInitial).filter((mark) => mark !== "unmarked").length,
  3,
);
assert.equal(lessons.length, 3);
assert.equal(new Set(lessons.map((row) => row.id)).size, 3);
assert.equal(educationIndustries.length, 4);
for (const industry of educationIndustries) {
  const route = fs.readFileSync(
    `app/[locale]/industries/${industry}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`industry="${industry}"`) &&
      !route.includes("ComingSoonPage"),
  );
  assert.equal(pages[industry].journeys.length, 3);
  for (const tool of pages[industry].tools) {
    const file = `app/[locale]${tool.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing product preview ${tool.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Linked placeholder ${tool.href}`,
    );
  }
}
console.log(
  "PASS: timetable overlap boundaries, credit deduplication/invalid input, four route mappings and implemented product-preview destinations.",
);

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  collegePages,
  collegeHref,
} from "../components/medical-college/registry.ts";
import {
  seatBalance,
  marksSummary,
  validDate,
  addDays,
  overlaps,
  planningAmount,
  progress,
  thresholdCheck,
} from "../components/medical-college/calculations.ts";

test("eight explicit College routes have distinct compositions and valid next links", () => {
  assert.equal(collegePages.length, 8);
  assert.equal(new Set(collegePages.map((p) => p.visual)).size, 8);
  const heroes = readFileSync("components/medical-college/heroes.tsx", "utf8");
  for (const p of collegePages) {
    assert.ok(existsSync(`app/[locale]${collegeHref(p.slug)}/page.tsx`));
    assert.ok(heroes.includes(`case "${p.slug}":`));
    assert.ok(collegePages.some((x) => x.slug === p.next));
  }
});
test("College renders breadcrumb directly before hero without a module navigation block", () => {
  const shell = readFileSync(
    "components/medical-college/experience.tsx",
    "utf8",
  );
  assert.doesNotMatch(shell, /<aside\b|<select\b|contextBar|contextLinks/);
  assert.match(shell, /<\/nav>\s*<CollegeHero/);
});
test("English and Bengali College copy has full key parity; global menu labels exist", () => {
  const en = JSON.parse(readFileSync("messages/en.json", "utf8")).pages
      .medicalCollegeApp,
    bn = JSON.parse(readFileSync("messages/bn.json", "utf8")).pages
      .medicalCollegeApp;
  assert.deepEqual(Object.keys(en.ui).sort(), Object.keys(bn.ui).sort());
  for (const p of collegePages)
    for (const key of ["title", "headline", "description"]) {
      assert.ok(en.pages[p.slug][key]);
      assert.ok(bn.pages[p.slug][key]);
    }
  for (const locale of ["en", "bn", "tr", "ar", "zh", "ja", "ne", "vi"]) {
    const m = JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
    for (const p of collegePages)
      assert.ok(m.layout.header.modules.medicalCollege.links[p.slug]);
  }
});
test("seat planning rejects fractional, negative and over-allocated counts", () => {
  assert.equal(seatBalance(0, 0), 0);
  assert.equal(seatBalance(40, 15), 25);
  for (const a of [
    [20, 21],
    [20, -1],
    [20, 1.2],
    [Infinity, 0],
    [100000, 0],
  ])
    assert.equal(seatBalance(a[0], a[1]), null);
});
test("marks remain uncomputed for blank or impossible scores", () => {
  assert.equal(marksSummary([{ score: "", maximum: "100" }]), null);
  assert.equal(marksSummary([{ score: "0", maximum: "0" }]), null);
  assert.equal(marksSummary([{ score: "101", maximum: "100" }]), null);
  assert.equal(marksSummary([{ score: "-1", maximum: "100" }]), null);
  assert.deepEqual(
    marksSummary([
      { score: "20", maximum: "40" },
      { score: "30", maximum: "60" },
    ]),
    { total: 50, maximum: 100, percentage: 50 },
  );
});
test("dates reject normalization and rotation ranges treat touching days as a conflict", () => {
  assert.equal(validDate("2026-02-30"), false);
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(addDays("2026-12-30", 3), "2027-01-02");
  assert.equal(addDays("invalid", 1), null);
  const rows = [{ start: "2026-11-10", end: "2026-11-15" }];
  assert.equal(overlaps("2026-11-15", "2026-11-20", rows), true);
  assert.equal(overlaps("2026-11-16", "2026-11-20", rows), false);
  assert.equal(overlaps("2026-11-20", "2026-11-10", rows), null);
});
test("allowance preview conserves cents and rejects overflow or invalid months", () => {
  assert.equal(planningAmount(0.1, 3), 0.3);
  assert.equal(planningAmount(10000, 3), 30000);
  for (const [r, m] of [
    [-1, 2],
    [200, 0],
    [200, 1.5],
    [200, 121],
    [Number.MAX_VALUE, 120],
  ])
    assert.equal(planningAmount(r, m), null);
});
test("progress and eligibility study never infer a denominator or institutional threshold", () => {
  assert.equal(progress(0, 0), null);
  assert.equal(progress(11, 10), null);
  assert.equal(progress(3, 4), 75);
  assert.equal(thresholdCheck("80", ""), null);
  assert.equal(thresholdCheck("", "75"), null);
  assert.equal(thresholdCheck("101", "75"), null);
  assert.equal(thresholdCheck("74", "75"), false);
  assert.equal(thresholdCheck("75", "75"), true);
});

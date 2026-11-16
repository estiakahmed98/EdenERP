import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  canPreviewClose,
  expiryState,
  moneyTotal,
  nextQueueState,
  occupancy,
  splitCoverage,
} from "../components/hospital/calculations.ts";
import {
  hospitalPages,
  hospitalHref,
} from "../components/hospital/registry.ts";

test("all 24 hospital pages have a unique identity and an existing next route", () => {
  assert.equal(hospitalPages.length, 24);
  assert.equal(new Set(hospitalPages.map((page) => page.slug)).size, 24);
  assert.equal(new Set(hospitalPages.map((page) => page.visual)).size, 24);
  assert.equal(new Set(hospitalPages.map((page) => page.workspace)).size, 24);
  const compositions = readFileSync(
    "components/hospital/editorial-heroes.tsx",
    "utf8",
  );
  for (const page of hospitalPages) {
    assert.ok(
      compositions.includes(`case "${page.slug}":`),
      `Missing editorial composition: ${page.slug}`,
    );
    assert.ok(existsSync(`app/[locale]${hospitalHref(page.slug)}/page.tsx`));
    assert.ok(hospitalPages.some((other) => other.slug === page.next));
  }
});
test("Hospital breadcrumb is followed directly by the hero, without extra navigation", () => {
  const shell = readFileSync("components/hospital/experience.tsx", "utf8");
  assert.doesNotMatch(
    shell,
    /<aside\b|css\.sidebar|data-hospital-context|css\.contextLinks|<select\b/,
  );
  assert.match(
    shell,
    /<nav className=\{css\.breadcrumb\}[\s\S]*?<\/nav>\s*<HospitalHero slug=\{slug\}/,
  );
});
test("English and Bengali have every hospital title, description and control label", () => {
  const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
  const bn = JSON.parse(readFileSync("messages/bn.json", "utf8"));
  for (const page of hospitalPages)
    for (const key of ["title", "description", "headline"]) {
      assert.equal(typeof en.pages.hospitalApp.pages[page.slug][key], "string");
      assert.ok(bn.pages.hospitalApp.pages[page.slug][key]);
    }
  assert.deepEqual(
    Object.keys(en.pages.hospitalApp.ui).sort(),
    Object.keys(bn.pages.hospitalApp.ui).sort(),
  );
  for (const locale of ["en", "bn", "zh", "ar", "tr", "vi", "ja", "ne"]) {
    const messages = JSON.parse(
      readFileSync(`messages/${locale}.json`, "utf8"),
    );
    for (const page of hospitalPages)
      assert.ok(messages.layout.header.modules.hospital.links[page.slug]);
  }
});
test("bill quantities reject negative, fractional, non-finite and overflowing input", () => {
  assert.equal(
    moneyTotal([
      { price: 800, quantity: 2 },
      { price: 100, quantity: 1 },
    ]),
    1700,
  );
  for (const quantity of [-1, 0.5, Infinity, 1000])
    assert.equal(moneyTotal([{ price: 800, quantity }]), null);
  assert.equal(
    moneyTotal([{ price: Number.MAX_SAFE_INTEGER, quantity: 2 }]),
    null,
  );
  assert.equal(moneyTotal([{ price: -5, quantity: 1 }]), null);
});
test("payer and patient totals conserve cents at coverage boundaries", () => {
  for (const percentage of [0, 33, 60, 100]) {
    const result = splitCoverage(100.01, percentage)!;
    assert.equal(Math.round((result.payer + result.patient) * 100), 10001);
  }
  assert.deepEqual(splitCoverage(2000, 60), { payer: 1200, patient: 800 });
  assert.equal(splitCoverage(100, 101), null);
  assert.equal(splitCoverage(-1, 20), null);
  assert.equal(splitCoverage(100, NaN), null);
});
test("zero licensed beds never produce a misleading occupancy percentage", () => {
  assert.equal(occupancy(0, 0), null);
  assert.equal(occupancy(0, 1), null);
  assert.equal(occupancy(10, 12), null);
  assert.equal(occupancy(10, 2.5), null);
  assert.equal(occupancy(10, 4), 40);
});
test("expiry uses whole calendar days and rejects invalid dates", () => {
  assert.equal(expiryState("2026-11-15", "2026-11-16"), "expired");
  assert.equal(expiryState("2026-11-16", "2026-11-16"), "expiring");
  assert.equal(expiryState("2027-01-15", "2026-11-16"), "expiring");
  assert.equal(expiryState("2027-01-16", "2026-11-16"), "valid");
  assert.equal(expiryState("2026-02-30", "2026-11-16"), null);
  assert.equal(expiryState("2026-12-01", ""), null);
});
test("queue progression is bounded and rejects unknown clinical states", () => {
  assert.equal(nextQueueState("booked"), "arrived");
  assert.equal(nextQueueState("consulting"), "seen");
  assert.equal(nextQueueState("seen"), null);
  assert.equal(nextQueueState("not-a-state"), null);
});
test("day close preview is blocked by earlier days or mismatched collections", () => {
  assert.equal(canPreviewClose(21000, 19750, false), false);
  assert.equal(canPreviewClose(21000, 21000, true), false);
  assert.equal(canPreviewClose(-100, -100, false), false);
  assert.equal(canPreviewClose(NaN, NaN, false), false);
  assert.equal(canPreviewClose(21000, 21000, false), true);
});

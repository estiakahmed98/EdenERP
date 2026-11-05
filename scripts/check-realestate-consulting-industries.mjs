import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
function load(relative) {
  const code = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", code)(module, module.exports);
  return module.exports;
}
const {
  filterProperties,
  costLines,
  budgetDifference,
  allocation,
  checklist,
  candidateCounts,
  evidenceCounts,
  tripEstimate,
} = load("../components/industries/professional/calculations.ts");
const {
  professionalSlugs,
  pages,
  properties,
  phases,
  workItems,
  candidates,
  evidenceRows,
  routeFor,
} = load("../components/industries/professional/data.ts");

assert.deepEqual(
  filterProperties(properties, "all", 15000000).map((p) => p.id),
  ["EX-P01", "EX-P02"],
);
assert.equal(filterProperties(properties, "Office", 9800000)[0].id, "EX-P02");
assert.equal(filterProperties(properties, "Shop", 15000000).length, 0);
assert.equal(filterProperties(properties, "all", 0).length, 0);
assert.equal(filterProperties(properties, "all", 100000000).length, 3);
for (const limit of [-1, NaN, Infinity, 100000001])
  assert.throws(() => filterProperties(properties, "all", limit));

assert.deepEqual(
  costLines(phases.map((p) => ({ quantity: p.hours, rate: 1500 }))),
  { lines: [18000, 30000, 12000], total: 60000 },
);
const work = costLines(
  workItems.map((w) => ({ quantity: w.quantity, rate: w.rate })),
);
assert.deepEqual(work, { lines: [102000, 76000, 72000], total: 250000 });
assert.equal(budgetDifference(work.total, 300000), 50000);
assert.equal(budgetDifference(300001, 300000), -1);
assert.equal(budgetDifference(1000000000000, 100000000), -999900000000);
assert.deepEqual(
  costLines([
    { quantity: 3, rate: 0.1 },
    { quantity: 1, rate: 0.2 },
  ]),
  { lines: [0.3, 0.2], total: 0.5 },
);
assert.deepEqual(costLines([]), { lines: [], total: 0 });
assert.equal(
  costLines([{ quantity: 10000, rate: 100000000 }]).total,
  1000000000000,
);
for (const quantity of [-1, 0.5, 10001, NaN, Infinity])
  assert.throws(() => costLines([{ quantity, rate: 1 }]));
for (const rate of [-1, NaN, Infinity, 100000001])
  assert.throws(() => costLines([{ quantity: 1, rate }]));
for (const total of [-1, NaN, Infinity, Number.MAX_SAFE_INTEGER])
  assert.throws(() => budgetDifference(total, 1));

assert.deepEqual(allocation([120000, 105000, 75000], 300000), {
  assigned: 300000,
  remaining: 0,
  shares: [40, 35, 25],
});
assert.equal(allocation([80, 40], 100).remaining, -20);
assert.deepEqual(allocation([0, 0, 0], 0), {
  assigned: 0,
  remaining: 0,
  shares: [0, 0, 0],
});
const fractionalAllocation = allocation([0.1, 0.2], 0.4);
assert.equal(fractionalAllocation.assigned, 0.3);
assert.equal(fractionalAllocation.remaining, 0.1);
assert.ok(Math.abs(fractionalAllocation.shares[0] - 100 / 3) < 1e-10);
assert.ok(Math.abs(fractionalAllocation.shares[1] - 200 / 3) < 1e-10);
assert.deepEqual(allocation([0.001, 0], 0), {
  assigned: 0,
  remaining: 0,
  shares: [0, 0],
});
assert.throws(() => allocation([NaN], 1));
assert.throws(() => allocation([1], -1));

assert.deepEqual(checklist([true, false, false, false]), {
  done: 1,
  total: 4,
  remaining: 3,
  percent: 25,
});
assert.equal(checklist([true, true]).percent, 100);
assert.equal(checklist([false, false]).percent, 0);
assert.equal(checklist([]).percent, null);
assert.throws(() => checklist(["true"]));
assert.deepEqual(candidateCounts(candidates.map((c) => c.stage)), {
  applied: 1,
  interview: 1,
  shortlist: 1,
});
assert.deepEqual(candidateCounts([]), {
  applied: 0,
  interview: 0,
  shortlist: 0,
});
assert.deepEqual(candidateCounts(["interview", "interview", "interview"]), {
  applied: 0,
  interview: 3,
  shortlist: 0,
});
assert.deepEqual(evidenceCounts(evidenceRows.map((r) => r.state)), {
  missing: 1,
  provided: 2,
  reviewed: 1,
  total: 4,
  percent: 25,
});
assert.equal(evidenceCounts([]).percent, null);
assert.equal(evidenceCounts(["reviewed", "reviewed"]).percent, 100);
for (const invalid of ["constructor", "__proto__", "", "done"]) {
  assert.throws(() => candidateCounts([invalid]));
  assert.throws(() => evidenceCounts([invalid]));
}

const trip = {
  travellers: 2,
  fare: 25000,
  rooms: 1,
  nights: 3,
  nightly: 5000,
  transfer: 3000,
};
assert.deepEqual(tripEstimate(trip), {
  fares: 50000,
  stay: 15000,
  transfer: 3000,
  total: 68000,
});
assert.deepEqual(
  tripEstimate({
    travellers: 3,
    fare: 0.1,
    rooms: 1,
    nights: 3,
    nightly: 0.2,
    transfer: 0.1,
  }),
  { fares: 0.3, stay: 0.6, transfer: 0.1, total: 1 },
);
assert.equal(
  tripEstimate({ ...trip, fare: 0, nightly: 0, transfer: 0 }).total,
  0,
);
for (const key of ["travellers", "rooms", "nights"])
  for (const bad of [0, -1, 0.5, NaN])
    assert.throws(() => tripEstimate({ ...trip, [key]: bad }));
assert.throws(() => tripEstimate({ ...trip, travellers: 101 }));
assert.throws(() => tripEstimate({ ...trip, rooms: 101 }));
assert.throws(() => tripEstimate({ ...trip, nights: 366 }));
for (const key of ["fare", "nightly", "transfer"])
  for (const bad of [-1, NaN, Infinity, 100000001])
    assert.throws(() => tripEstimate({ ...trip, [key]: bad }));

const stems = {
  "real-estate-agency": "RealEstateAgencyLanding",
  "architecture-firm": "ArchitectureFirmLanding",
  construction: "ConstructionLanding",
  "accounting-firm": "AccountingFirmLanding",
  "marketing-agency": "MarketingAgencyLanding",
  "talent-acquisition": "TalentAcquisitionLanding",
  "audit-certification": "AuditCertificationLanding",
};
const destinations = new Set();
assert.equal(professionalSlugs.length, 8);
for (const slug of professionalSlugs) {
  const p = pages[slug],
    route = fs.readFileSync(`app/[locale]${routeFor(slug)}/page.tsx`, "utf8");
  assert.ok(
    route.includes(`professionalMetadata("${slug}")`),
    `Metadata ${slug}`,
  );
  const render =
    slug === "travel-agency"
      ? route
      : fs.readFileSync(
          `components/landing/Industries/${p.group}/${slug}/${stems[slug]}.tsx`,
          "utf8",
        );
  assert.ok(render.includes(`slug="${slug}"`), `Route binding ${slug}`);
  assert.ok(!route.includes("ComingSoonPage"));
  assert.equal(p.steps.length, 3);
  assert.equal(p.faqs.length, 3);
  assert.equal(p.tools.length, 4);
  for (const target of p.tools) {
    const file = `app/[locale]${target.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing product ${target.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Placeholder ${target.href}`,
    );
    destinations.add(target.href);
  }
}
console.log(
  `PASS: property filters, cost/cents/budget boundaries, zero allocations, manual checklists, candidate/evidence states, trip arithmetic, eight routes and ${destinations.size} implemented product targets.`,
);

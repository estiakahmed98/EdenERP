import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
function load(relative) {
  const output = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", output)(module, module.exports);
  return module.exports;
}
const {
  seatFit,
  ticketCounts,
  nextTicketStage,
  stayEstimate,
  cartonLoad,
  hotelSnapshot,
} = load("../components/industries/hospitality/calculations.ts");
const {
  hospitalitySlugs,
  pages,
  arrivalDate,
  departureDate,
  drinks,
  rooms,
  tickets,
} = load("../components/industries/hospitality/data.ts");

assert.deepEqual(seatFit(4, 4), { enough: true, spare: 0, short: 0 });
assert.deepEqual(seatFit(4, 2), { enough: true, spare: 2, short: 0 });
assert.deepEqual(seatFit(2, 5), { enough: false, spare: 0, short: 3 });
for (const seats of [0, -1, 1.5, 101, NaN, Infinity])
  assert.throws(() => seatFit(seats, 1));
for (const party of [0, -1, 1.5, 1001, NaN, Infinity])
  assert.throws(() => seatFit(4, party));

assert.deepEqual(ticketCounts(tickets.map((t) => t.stage)), {
  queued: 1,
  preparing: 1,
  ready: 1,
});
assert.deepEqual(ticketCounts([]), { queued: 0, preparing: 0, ready: 0 });
assert.equal(nextTicketStage("queued"), "preparing");
assert.equal(nextTicketStage("preparing"), "ready");
assert.equal(nextTicketStage("ready"), "ready");
let stages = tickets.map((t) => t.stage);
for (let i = 0; i < 3; i++) stages = stages.map(nextTicketStage);
assert.deepEqual(ticketCounts(stages), { queued: 0, preparing: 0, ready: 3 });
for (const stage of ["done", "constructor", "__proto__", ""]) {
  assert.throws(() => ticketCounts([stage]));
  assert.throws(() => nextTicketStage(stage));
}

assert.deepEqual(stayEstimate(arrivalDate, departureDate, 4000), {
  nights: 3,
  nightly: 4000,
  total: 12000,
});
assert.deepEqual(stayEstimate("2028-02-28", "2028-03-01", 0.1), {
  nights: 2,
  nightly: 0.1,
  total: 0.2,
});
assert.deepEqual(stayEstimate("2026-12-31", "2027-01-01", 0), {
  nights: 1,
  nightly: 0,
  total: 0,
});
assert.equal(stayEstimate("2026-01-01", "2027-01-01", 100).nights, 365);
assert.equal(stayEstimate("2026-01-01", "2026-01-04", 12.345).total, 37.05);
assert.throws(() => stayEstimate("2028-01-01", "2029-01-01", 1));
assert.throws(() => stayEstimate(arrivalDate, arrivalDate, 1));
assert.throws(() => stayEstimate(departureDate, arrivalDate, 1));
for (const date of [
  "",
  "2026-02-29",
  "2026-04-31",
  "2026-13-01",
  "1999-12-31",
  "2101-01-01",
  "2026-1-01",
]) {
  assert.throws(() => stayEstimate(date, departureDate, 1));
  assert.throws(() => stayEstimate(arrivalDate, date, 1));
}
for (const rate of [-1, NaN, Infinity, 10000001])
  assert.throws(() => stayEstimate(arrivalDate, departureDate, rate));

assert.deepEqual(cartonLoad(drinks, 600), {
  lines: [144, 192, 36],
  cartons: 26,
  units: 372,
  remaining: 228,
});
assert.deepEqual(cartonLoad([{ cartons: 2, units: 12 }], 24), {
  lines: [24],
  cartons: 2,
  units: 24,
  remaining: 0,
});
assert.equal(cartonLoad(drinks, 300).remaining, -72);
assert.deepEqual(cartonLoad([], 1), {
  lines: [],
  cartons: 0,
  units: 0,
  remaining: 1,
});
assert.equal(cartonLoad([{ cartons: 0, units: 12 }], 1).units, 0);
assert.equal(
  cartonLoad([{ cartons: 10000, units: 1000 }], 100000000).units,
  10000000,
);
for (const cartons of [-1, 0.5, 10001, NaN])
  assert.throws(() => cartonLoad([{ cartons, units: 1 }], 1));
for (const units of [0, -1, 0.5, 1001, NaN])
  assert.throws(() => cartonLoad([{ cartons: 1, units }], 1));
for (const limit of [0, -1, 0.5, 100000001, NaN])
  assert.throws(() => cartonLoad(drinks, limit));

assert.deepEqual(hotelSnapshot(rooms), {
  ready: 2,
  occupied: 3,
  service: 1,
  denominator: 5,
  occupancy: 60,
  chargeTotal: 16500,
  occupiedAverage: 5500,
});
const allService = hotelSnapshot(
  rooms.map((r) => ({ ...r, state: "service" })),
);
assert.equal(allService.denominator, 0);
assert.equal(allService.occupancy, null);
assert.equal(allService.occupiedAverage, null);
assert.equal(allService.chargeTotal, 0);
const allReady = hotelSnapshot(rooms.map((r) => ({ ...r, state: "ready" })));
assert.equal(allReady.occupancy, 0);
assert.equal(allReady.occupiedAverage, null);
assert.equal(
  hotelSnapshot(rooms.map((r) => ({ ...r, state: "occupied" }))).occupancy,
  100,
);
assert.deepEqual(hotelSnapshot([]), {
  ready: 0,
  occupied: 0,
  service: 0,
  denominator: 0,
  occupancy: null,
  chargeTotal: 0,
  occupiedAverage: null,
});
assert.equal(
  hotelSnapshot([
    { state: "occupied", rate: 0.1 },
    { state: "occupied", rate: 0.2 },
  ]).chargeTotal,
  0.3,
);
assert.throws(() => hotelSnapshot([{ state: "constructor", rate: 1 }]));
assert.throws(() => hotelSnapshot([{ state: "service", rate: NaN }]));

const leaves = {
  restaurant: "Restaurant/RestaurentLanding",
  "fast-food": "fast-food/FastFoodLanding",
  "guest-house": "guest-house/GuestHouseLanding",
  "beverage-distributor": "beverage-distributor/BeverageDistributorLanding",
  hotel: "hotel/HotelLanding",
};
const destinations = new Set();
assert.equal(hospitalitySlugs.length, 5);
for (const slug of hospitalitySlugs) {
  const route = fs.readFileSync(
    `app/[locale]/industries/food&hospitality/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`hospitalityMetadata("${slug}")`),
    `Metadata binding ${slug}`,
  );
  const leaf = fs.readFileSync(
    `components/landing/Industries/Food & Hospitality/${leaves[slug]}.tsx`,
    "utf8",
  );
  assert.ok(leaf.includes(`slug="${slug}"`), `Legacy binding ${slug}`);
  assert.equal(pages[slug].stages.length, 3);
  assert.equal(pages[slug].faqs.length, 3);
  for (const target of pages[slug].tools) {
    const file = `app/[locale]${target.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing destination ${target.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Placeholder ${target.href}`,
    );
    destinations.add(target.href);
  }
}
console.log(
  `PASS: seat boundaries, ticket transitions, UTC stay dates/cents, carton arithmetic, zero-denominator room states, five routes and ${destinations.size} implemented product destinations.`,
);

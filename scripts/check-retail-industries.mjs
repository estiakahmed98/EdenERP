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
const {
  basketTotal,
  variantComparison,
  furnitureTotal,
  batchDates,
  purchasePacks,
  giftBudget,
} = load("../components/industries/retail/calculations.ts");
const { retailSlugs, pages, books, furniture, batches, referenceDate, toys } =
  load("../components/industries/retail/data.ts");

assert.equal(
  basketTotal(
    books.map((b, i) => ({ price: b.price, quantity: i === 1 ? 0 : 1 })),
  ),
  970,
);
assert.equal(basketTotal([{ price: 0.1, quantity: 3 }], 0.2), 0.5);
assert.equal(basketTotal([]), 0);
assert.equal(basketTotal([{ price: 1, quantity: 99 }]), 99);
for (const quantity of [-1, 0.5, 100, NaN, Infinity])
  assert.throws(() => basketTotal([{ price: 1, quantity }]));
for (const price of [-1, NaN, Infinity, 10000001]) {
  assert.throws(() => basketTotal([{ price, quantity: 1 }]));
  assert.throws(() => basketTotal([], price));
}
assert.deepEqual(variantComparison(12, 3), {
  covered: 3,
  short: 0,
  remaining: 9,
});
assert.deepEqual(variantComparison(0, 3), {
  covered: 0,
  short: 3,
  remaining: 0,
});
assert.deepEqual(variantComparison(5, 8), {
  covered: 5,
  short: 3,
  remaining: 0,
});
for (const value of [-1, 0.5, 1000001, NaN]) {
  assert.throws(() => variantComparison(value, 1));
  assert.throws(() => variantComparison(1, value));
}
assert.throws(() => variantComparison(1, 0));

assert.deepEqual(
  furnitureTotal(
    furniture.map((f) => ({ price: f.price, quantity: 1 })),
    0,
    1000,
  ),
  { pieces: 3, subtotal: 47800, delivery: 1000, total: 48800 },
);
assert.deepEqual(
  furnitureTotal(
    [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
    ],
    3,
    5,
  ),
  { pieces: 3, subtotal: 49, delivery: 5, total: 54 },
);
assert.deepEqual(furnitureTotal([{ price: 10, quantity: 0 }], 3, 5), {
  pieces: 0,
  subtotal: 0,
  delivery: 0,
  total: 0,
});
assert.equal(furnitureTotal([{ price: 0.1, quantity: 3 }], 0.2, 0.1).total, 1);
assert.throws(() => furnitureTotal([{ price: 10, quantity: 21 }], 0, 0));
assert.throws(() => furnitureTotal([], 0, NaN));
assert.throws(() => furnitureTotal([], -1, 0));

const dates = batchDates(referenceDate, 3, batches);
assert.deepEqual(
  dates.map((d) => d.state),
  ["past", "window", "today", "later"],
);
assert.deepEqual(
  dates.map((d) => d.days),
  [-1, 1, 0, 28],
);
assert.equal(
  batchDates(referenceDate, 0, [{ date: "2026-12-16", quantity: 1 }])[0].state,
  "later",
);
assert.equal(
  batchDates("2028-02-28", 1, [{ date: "2028-02-29", quantity: 1 }])[0].days,
  1,
);
assert.equal(
  batchDates("2026-12-31", 1, [{ date: "2027-01-01", quantity: 1 }])[0].state,
  "window",
);
for (const date of [
  "",
  "2026-02-29",
  "2026-04-31",
  "2026-13-01",
  "1999-12-31",
  "2101-01-01",
  "2026-1-01",
]) {
  assert.throws(() => batchDates(date, 3, batches));
  assert.throws(() => batchDates(referenceDate, 3, [{ date, quantity: 1 }]));
}
for (const window of [-1, 0.5, 366, NaN])
  assert.throws(() => batchDates(referenceDate, window, batches));

assert.deepEqual(purchasePacks(240, 65, 50), {
  shortage: 175,
  packs: 4,
  incoming: 200,
  after: 265,
  remaining: 25,
});
assert.deepEqual(purchasePacks(100, 100, 50), {
  shortage: 0,
  packs: 0,
  incoming: 0,
  after: 100,
  remaining: 0,
});
assert.deepEqual(purchasePacks(0, 30, 10), {
  shortage: 0,
  packs: 0,
  incoming: 0,
  after: 30,
  remaining: 30,
});
assert.equal(purchasePacks(100, 0, 50).packs, 2);
assert.equal(purchasePacks(1, 0, 1000000).remaining, 999999);
for (const target of [-1, 0.5, 1000001, NaN])
  assert.throws(() => purchasePacks(target, 0, 1));
for (const size of [0, -1, 0.5, 1000001, NaN])
  assert.throws(() => purchasePacks(1, 0, size));
for (const hand of [-1, 0.5, 1000001, NaN])
  assert.throws(() => purchasePacks(1, hand, 1));

const giftRows = toys.map((t, i) => ({
  price: t.price,
  quantity: i === 1 ? 0 : 1,
}));
assert.deepEqual(giftBudget(giftRows, 0, 2000), {
  total: 1500,
  remaining: 500,
});
assert.deepEqual(giftBudget(giftRows, 150, 1000), {
  total: 1650,
  remaining: -650,
});
assert.deepEqual(giftBudget([], 0, 0), { total: 0, remaining: 0 });
assert.deepEqual(giftBudget([{ price: 0.1, quantity: 3 }], 0.2, 0.6), {
  total: 0.5,
  remaining: 0.1,
});
assert.throws(() => giftBudget([], 0, -1));

const destinations = new Set();
assert.equal(retailSlugs.length, 6);
for (const slug of retailSlugs) {
  const route = fs.readFileSync(
    `app/[locale]/industries/retail/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`retailMetadata("${slug}")`),
    `Locale metadata: ${slug}`,
  );
  const stem = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  const renderSource =
    slug === "book-store"
      ? route
      : fs.readFileSync(
          `components/landing/Industries/retail/${slug}/${stem}Landing.tsx`,
          "utf8",
        );
  assert.ok(renderSource.includes(`slug="${slug}"`), `Route binding: ${slug}`);
  assert.equal(pages[slug].stages.length, 3);
  assert.equal(pages[slug].faqs.length, 3);
  for (const target of pages[slug].tools) {
    const file = `app/[locale]${target.href}/page.tsx`;
    assert.ok(
      fs.existsSync(file),
      `Missing product destination ${target.href}`,
    );
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Placeholder ${target.href}`,
    );
    destinations.add(target.href);
  }
}
console.log(
  `PASS: six retail calculators, rounding/empty/boundary/invalid-input cases, UTC date cases, six route/legacy bindings and ${destinations.size} implemented product destinations.`,
);

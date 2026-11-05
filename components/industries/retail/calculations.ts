function whole(value: number, min: number, max: number, label: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
}
function cents(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 10000000)
    throw new Error(`${label} must be between 0 and 10,000,000.`);
  return Math.round(value * 100);
}
export function basketTotal(
  rows: { price: number; quantity: number }[],
  extra = 0,
) {
  let total = 0;
  for (const row of rows) {
    whole(row.quantity, 0, 99, "Quantity");
    total += cents(row.price, "Unit price") * row.quantity;
  }
  return (total + cents(extra, "Additional amount")) / 100;
}
export function variantComparison(stock: number, requested: number) {
  whole(stock, 0, 1000000, "Example stock");
  whole(requested, 1, 1000000, "Requested quantity");
  return {
    covered: Math.min(stock, requested),
    short: Math.max(0, requested - stock),
    remaining: Math.max(0, stock - requested),
  };
}
export function furnitureTotal(
  rows: { price: number; quantity: number }[],
  finishExtra: number,
  delivery: number,
) {
  const surcharge = cents(finishExtra, "Finish surcharge");
  const deliveryCents = cents(delivery, "Delivery amount");
  let pieces = 0,
    subtotal = 0;
  for (const row of rows) {
    whole(row.quantity, 0, 20, "Furniture quantity");
    pieces += row.quantity;
    subtotal +=
      (cents(row.price, "Furniture price") + surcharge) * row.quantity;
  }
  if (pieces === 0) return { pieces: 0, subtotal: 0, delivery: 0, total: 0 };
  return {
    pieces,
    subtotal: subtotal / 100,
    delivery: deliveryCents / 100,
    total: (subtotal + deliveryCents) / 100,
  };
}
function dateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
    throw new Error("Choose a valid example date.");
  const [y, m, d] = value.split("-").map(Number);
  if (y < 2000 || y > 2100)
    throw new Error("Use an example date between 2000 and 2100.");
  const stamp = Date.UTC(y, m - 1, d);
  if (new Date(stamp).toISOString().slice(0, 10) !== value)
    throw new Error("Choose a valid calendar date.");
  return stamp;
}
export function batchDates(
  reference: string,
  window: number,
  rows: readonly { date: string; quantity: number }[],
) {
  const base = dateValue(reference);
  whole(window, 0, 365, "Review window");
  return rows.map((row) => {
    whole(row.quantity, 0, 1000000, "Batch quantity");
    const days = (dateValue(row.date) - base) / 86400000;
    return {
      days,
      state:
        days < 0
          ? "past"
          : days === 0
            ? "today"
            : days <= window
              ? "window"
              : "later",
    };
  });
}
export function purchasePacks(target: number, onHand: number, perPack: number) {
  whole(target, 0, 1000000, "Target units");
  whole(onHand, 0, 1000000, "On-hand units");
  whole(perPack, 1, 1000000, "Units per pack");
  const shortage = Math.max(0, target - onHand),
    packs = Math.ceil(shortage / perPack),
    incoming = packs * perPack;
  return {
    shortage,
    packs,
    incoming,
    after: onHand + incoming,
    remaining: onHand + incoming - target,
  };
}
export function giftBudget(
  rows: { price: number; quantity: number }[],
  wrap: number,
  budget: number,
) {
  const total = basketTotal(rows, wrap),
    budgetCents = cents(budget, "Budget");
  return { total, remaining: (budgetCents - Math.round(total * 100)) / 100 };
}

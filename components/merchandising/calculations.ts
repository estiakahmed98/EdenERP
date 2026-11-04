export function marginScenario(price: number, cost: number, qty = 1) {
  if (
    ![price, cost, qty].every(Number.isFinite) ||
    price < 0.01 ||
    price > 1000000 ||
    cost < 0 ||
    cost > 1000000 ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > 1000000
  )
    throw new Error(
      "Use a price of at least USD 0.01, non-negative cost and whole quantity within the input limits.",
    );
  const revenue = Math.round(price * 100) * qty;
  const expense = Math.round(cost * 100) * qty;
  return {
    revenue: revenue / 100,
    cost: expense / 100,
    net: (revenue - expense) / 100,
    margin: ((revenue - expense) / revenue) * 100,
  };
}
export function remainingDays(
  orderQty: number,
  completed: number,
  daily: number,
) {
  if (
    ![orderQty, completed, daily].every(Number.isFinite) ||
    ![orderQty, completed, daily].every(Number.isInteger) ||
    orderQty < 1 ||
    orderQty > 100000000 ||
    completed < 0 ||
    completed > 100000000 ||
    daily < 0 ||
    daily > 1000000
  )
    throw new Error(
      "Use valid whole quantities and a non-negative daily pace.",
    );
  const remaining = Math.max(0, orderQty - completed);
  return {
    remaining,
    days: remaining === 0 ? 0 : daily === 0 ? null : remaining / daily,
  };
}
function dayNumber(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error("Choose a valid date.");
  const [year, month, day] = iso.split("-").map(Number);
  if (year < 2000 || year > 2100)
    throw new Error("Choose a date between 2000 and 2100.");
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.toISOString().slice(0, 10) !== iso)
    throw new Error("Choose a valid calendar date.");
  return date.getTime() / 86400000;
}
export function compareDates(plan: string, actual: string, wall?: string) {
  const compared = dayNumber(actual);
  return {
    delay: compared - dayNumber(plan),
    wallDelay: wall ? compared - dayNumber(wall) : null,
  };
}

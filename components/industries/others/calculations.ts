function minorUnits(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 100000000)
    throw new Error(`${label} must be between 0 and 100,000,000.`);
  return Math.round(value * 100);
}
export function basketTotals(
  lines: { price: number; qty: number }[],
  delivery: number,
  discount: number,
) {
  const subtotal = lines.reduce((sum, row) => {
    if (!Number.isInteger(row.qty) || row.qty < 1 || row.qty > 99)
      throw new Error("Use whole item quantities from 1 to 99.");
    return sum + minorUnits(row.price, "Price") * row.qty;
  }, 0);
  const shipping = minorUnits(delivery, "Delivery"),
    deduction = minorUnits(discount, "Discount");
  if (deduction > subtotal)
    throw new Error("The example discount cannot exceed the item subtotal.");
  return {
    subtotal: subtotal / 100,
    delivery: subtotal > 0 ? shipping / 100 : 0,
    discount: deduction / 100,
    total: (subtotal + (subtotal > 0 ? shipping : 0) - deduction) / 100,
  };
}
export function programmeBudget(budget: number, allocations: number[]) {
  const available = minorUnits(budget, "Budget");
  if (available === 0)
    throw new Error("Use an example budget of at least 0.01.");
  const assigned = allocations.reduce(
    (sum, value) => sum + minorUnits(value, "Allocation"),
    0,
  );
  return {
    assigned: assigned / 100,
    remaining: (available - assigned) / 100,
    share: (assigned / available) * 100,
  };
}
export function durationSeconds(value: string) {
  if (!/^\d{1,3}:[0-5]\d$/.test(value))
    throw new Error("Use segment durations in mm:ss format.");
  const [m, s] = value.split(":").map(Number);
  const seconds = m * 60 + s;
  if (seconds > 10800)
    throw new Error("Each example segment must be no longer than 180:00.");
  return seconds;
}
export function formatDuration(seconds: number) {
  const amount = Math.abs(seconds);
  return `${String(Math.floor(amount / 60)).padStart(2, "0")}:${String(amount % 60).padStart(2, "0")}`;
}
function clock(value: number) {
  const days = Math.floor(value / 86400),
    seconds = value % 86400;
  return {
    time: `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
    days,
  };
}
export function programmeRundown(
  start: string,
  targetMinutes: number,
  rows: { id: string; duration: string }[],
) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(start))
    throw new Error("Choose a valid 24-hour start time.");
  if (
    !Number.isInteger(targetMinutes) ||
    targetMinutes < 1 ||
    targetMinutes > 180
  )
    throw new Error("Use a whole target length from 1 to 180 minutes.");
  const [h, m] = start.split(":").map(Number);
  let cursor = h * 3600 + m * 60;
  let total = 0;
  const timings = rows.map((row) => {
    const duration = durationSeconds(row.duration);
    const begins = clock(cursor);
    cursor += duration;
    total += duration;
    if (total > 86400)
      throw new Error("The local example cannot exceed 24 hours in total.");
    return { id: row.id, start: begins, end: clock(cursor), duration };
  });
  return { timings, total, remaining: targetMinutes * 60 - total };
}

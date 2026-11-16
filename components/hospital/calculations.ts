/** Presentation-only calculations. Never posts charges, signs a record or moves stock. */
export function moneyTotal(
  lines: readonly { price: number; quantity: number }[],
) {
  if (
    lines.some(
      ({ price, quantity }) =>
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isSafeInteger(quantity) ||
        quantity < 0 ||
        quantity > 999,
    )
  )
    return null;
  const total = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  return Number.isSafeInteger(total) ? total : null;
}
export function splitCoverage(total: number, percentage: number) {
  if (
    !Number.isFinite(total) ||
    total < 0 ||
    !Number.isFinite(percentage) ||
    percentage < 0 ||
    percentage > 100
  )
    return null;
  const payer = Math.round(total * percentage) / 100;
  return { payer, patient: Math.round((total - payer) * 100) / 100 };
}
export function occupancy(licensed: number, occupied: number) {
  if (
    ![licensed, occupied].every(Number.isSafeInteger) ||
    licensed < 0 ||
    occupied < 0 ||
    occupied > licensed
  )
    return null;
  return licensed ? (occupied / licensed) * 100 : null;
}
export function expiryState(
  value: string,
  asOf: string,
): "expired" | "expiring" | "valid" | null {
  const validDate = (date: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(Date.parse(date)) &&
    new Date(date).toISOString().slice(0, 10) === date;
  if (!validDate(value) || !validDate(asOf)) return null;
  const days = (Date.parse(value) - Date.parse(asOf)) / 86400000;
  return days < 0 ? "expired" : days <= 60 ? "expiring" : "valid";
}
export const queueStates = [
  "booked",
  "arrived",
  "called",
  "consulting",
  "seen",
] as const;
export function nextQueueState(state: string) {
  const index = queueStates.findIndex((value) => value === state);
  return index >= 0 && index < queueStates.length - 1
    ? queueStates[index + 1]
    : null;
}
export function canPreviewClose(
  charges: number,
  payments: number,
  priorOpen: boolean,
) {
  return (
    Number.isFinite(charges) &&
    Number.isFinite(payments) &&
    charges >= 0 &&
    payments >= 0 &&
    charges === payments &&
    !priorOpen
  );
}

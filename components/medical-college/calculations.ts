/** Local planning arithmetic. These functions do not encode regulatory eligibility or approval. */
export function seatBalance(capacity: number, allocated: number) {
  if (
    ![capacity, allocated].every(Number.isSafeInteger) ||
    capacity < 0 ||
    capacity > 99999 ||
    allocated < 0 ||
    allocated > capacity
  )
    return null;
  return capacity - allocated;
}
export function marksSummary(
  rows: readonly { score: string; maximum: string }[],
) {
  if (!rows.length || rows.some((r) => !r.score.trim() || !r.maximum.trim()))
    return null;
  const entries = rows.map((r) => ({
    score: Number(r.score),
    maximum: Number(r.maximum),
  }));
  if (
    entries.some(
      (r) =>
        !Number.isFinite(r.score) ||
        !Number.isFinite(r.maximum) ||
        r.maximum <= 0 ||
        r.maximum > 10000 ||
        r.score < 0 ||
        r.score > r.maximum,
    )
  )
    return null;
  const total = entries.reduce((s, r) => s + r.score, 0),
    maximum = entries.reduce((s, r) => s + r.maximum, 0);
  return { total, maximum, percentage: (total / maximum) * 100 };
}
export function validDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export function addDays(value: string, days: number) {
  if (!validDate(value) || !Number.isSafeInteger(days) || Math.abs(days) > 3660)
    return null;
  const date = new Date(value);
  date.setUTCDate(date.getUTCDate() + days);
  const result = date.toISOString().slice(0, 10);
  return validDate(result) ? result : null;
}
export function overlaps(
  start: string,
  end: string,
  rows: readonly { start: string; end: string }[],
) {
  if (!validDate(start) || !validDate(end) || end < start) return null;
  return rows.some((row) => start <= row.end && end >= row.start);
}
export function planningAmount(rate: number, months: number) {
  if (
    !Number.isFinite(rate) ||
    rate < 0 ||
    !Number.isSafeInteger(months) ||
    months < 1 ||
    months > 120 ||
    !Number.isSafeInteger(Math.round(rate * 100))
  )
    return null;
  const cents = Math.round(rate * 100) * months;
  return Number.isSafeInteger(cents) ? cents / 100 : null;
}
export function progress(completed: number, target: number) {
  if (
    ![completed, target].every(Number.isSafeInteger) ||
    target <= 0 ||
    completed < 0 ||
    completed > target
  )
    return null;
  return (completed / target) * 100;
}
export function thresholdCheck(actual: string, minimum: string) {
  if (!actual.trim() || !minimum.trim()) return null;
  const a = Number(actual),
    m = Number(minimum);
  return [a, m].every((n) => Number.isFinite(n) && n >= 0 && n <= 100)
    ? a >= m
    : null;
}

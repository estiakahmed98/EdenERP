import type { CandidateStage, EvidenceState } from "./data";
function whole(value: number, min: number, max: number, label: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
}
function cents(value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 100000000)
    throw new Error("Example amounts must be from 0 to 100,000,000.");
  return Math.round(value * 100);
}
export function filterProperties<T extends { type: string; price: number }>(
  rows: readonly T[],
  type: string,
  limit: number,
) {
  const maximum = cents(limit);
  return rows.filter(
    (row) =>
      (type === "all" || row.type === type) && cents(row.price) <= maximum,
  );
}
export function costLines(rows: readonly { quantity: number; rate: number }[]) {
  const lineCents = rows.map((row) => {
    whole(row.quantity, 0, 10000, "Quantity / whole hours");
    return row.quantity * cents(row.rate);
  });
  return {
    lines: lineCents.map((v) => v / 100),
    total: lineCents.reduce((sum, v) => sum + v, 0) / 100,
  };
}
export function allocation(amounts: readonly number[], budget: number) {
  const budgetCents = cents(budget),
    values = amounts.map(cents),
    assigned = values.reduce((sum, v) => sum + v, 0);
  return {
    assigned: assigned / 100,
    remaining: (budgetCents - assigned) / 100,
    shares: values.map((v) => (assigned > 0 ? (v / assigned) * 100 : 0)),
  };
}
export function checklist(selected: readonly boolean[]) {
  if (selected.some((v) => typeof v !== "boolean"))
    throw new Error("Use selected or unselected example tasks.");
  const done = selected.filter(Boolean).length;
  return {
    done,
    total: selected.length,
    remaining: selected.length - done,
    percent: selected.length > 0 ? (done / selected.length) * 100 : null,
  };
}
export function candidateCounts(stages: readonly CandidateStage[]) {
  const counts = { applied: 0, interview: 0, shortlist: 0 };
  for (const stage of stages) {
    if (!Object.hasOwn(counts, stage))
      throw new Error("Unknown example candidate stage.");
    counts[stage]++;
  }
  return counts;
}
export function evidenceCounts(states: readonly EvidenceState[]) {
  const counts = { missing: 0, provided: 0, reviewed: 0 };
  for (const state of states) {
    if (!Object.hasOwn(counts, state))
      throw new Error("Unknown example evidence state.");
    counts[state]++;
  }
  return {
    ...counts,
    total: states.length,
    percent: states.length > 0 ? (counts.reviewed / states.length) * 100 : null,
  };
}
export function tripEstimate(input: {
  travellers: number;
  fare: number;
  rooms: number;
  nights: number;
  nightly: number;
  transfer: number;
}) {
  whole(input.travellers, 1, 100, "Travellers");
  whole(input.rooms, 1, 100, "Rooms");
  whole(input.nights, 1, 365, "Nights");
  const fareCents = cents(input.fare) * input.travellers,
    stayCents = cents(input.nightly) * input.rooms * input.nights,
    transferCents = cents(input.transfer);
  return {
    fares: fareCents / 100,
    stay: stayCents / 100,
    transfer: transferCents / 100,
    total: (fareCents + stayCents + transferCents) / 100,
  };
}

export function budgetDifference(total: number, budget: number) {
  const amount = Math.round(total * 100);
  if (!Number.isFinite(total) || total < 0 || !Number.isSafeInteger(amount))
    throw new Error("Calculated example total is outside the supported range.");
  return (cents(budget) - amount) / 100;
}

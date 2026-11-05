import type { RoomState, TicketStage } from "./data";
function whole(value: number, min: number, max: number, label: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
}
function cents(value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 10000000)
    throw new Error("Example rate must be between 0 and 10,000,000.");
  return Math.round(value * 100);
}
export function seatFit(seats: number, party: number) {
  whole(seats, 1, 100, "Table seats");
  whole(party, 1, 1000, "Party size");
  return {
    enough: party <= seats,
    spare: Math.max(0, seats - party),
    short: Math.max(0, party - seats),
  };
}
export function ticketCounts(stages: readonly TicketStage[]) {
  const counts = { queued: 0, preparing: 0, ready: 0 };
  for (const stage of stages) {
    if (!Object.hasOwn(counts, stage))
      throw new Error("Unknown example ticket stage.");
    counts[stage]++;
  }
  return counts;
}
export function nextTicketStage(stage: TicketStage): TicketStage {
  if (stage === "queued") return "preparing";
  if (stage === "preparing" || stage === "ready") return "ready";
  throw new Error("Unknown example ticket stage.");
}
function dateValue(raw: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw))
    throw new Error("Choose valid example arrival and departure dates.");
  const [y, m, d] = raw.split("-").map(Number);
  if (y < 2000 || y > 2100)
    throw new Error("Use example dates between 2000 and 2100.");
  const stamp = Date.UTC(y, m - 1, d);
  if (new Date(stamp).toISOString().slice(0, 10) !== raw)
    throw new Error("Choose a valid calendar date.");
  return stamp;
}
export function stayEstimate(arrival: string, departure: string, rate: number) {
  const nights = (dateValue(departure) - dateValue(arrival)) / 86400000;
  whole(nights, 1, 365, "Stay length in nights");
  const nightlyCents = cents(rate);
  return {
    nights,
    nightly: nightlyCents / 100,
    total: (nights * nightlyCents) / 100,
  };
}
export function cartonLoad(
  rows: readonly { cartons: number; units: number }[],
  limit: number,
) {
  whole(limit, 1, 100000000, "Entered unit-count limit");
  const lines = rows.map((row) => {
    whole(row.cartons, 0, 10000, "Cartons");
    whole(row.units, 1, 1000, "Units per carton");
    return row.cartons * row.units;
  });
  const cartons = rows.reduce((sum, row) => sum + row.cartons, 0),
    units = lines.reduce((sum, value) => sum + value, 0);
  return { lines, cartons, units, remaining: limit - units };
}
export function hotelSnapshot(
  rooms: readonly { state: RoomState; rate: number }[],
) {
  const counts = { ready: 0, occupied: 0, service: 0 };
  let chargeCents = 0;
  for (const room of rooms) {
    if (!Object.hasOwn(counts, room.state))
      throw new Error("Unknown example room state.");
    const rateCents = cents(room.rate);
    counts[room.state]++;
    if (room.state === "occupied") chargeCents += rateCents;
  }
  const denominator = counts.ready + counts.occupied;
  return {
    ...counts,
    denominator,
    occupancy: denominator > 0 ? (counts.occupied / denominator) * 100 : null,
    chargeTotal: chargeCents / 100,
    occupiedAverage:
      counts.occupied > 0 ? chargeCents / counts.occupied / 100 : null,
  };
}

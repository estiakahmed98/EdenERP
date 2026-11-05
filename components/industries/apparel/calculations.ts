function integer(value: number, min: number, max: number, label: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
}
export function sizeBreakdown(quantity: number, ratios: number[]) {
  integer(quantity, 1, 1000000, "Order quantity");
  if (!ratios.length || ratios.length > 20)
    throw new Error("Use between 1 and 20 example sizes.");
  ratios.forEach((value) => integer(value, 0, 1000, "Ratio"));
  const total = ratios.reduce((a, b) => a + b, 0);
  if (total === 0)
    throw new Error("At least one size ratio must be greater than zero.");
  const exact = ratios.map((value) => (quantity * value) / total);
  const pieces = exact.map(Math.floor);
  const rank = exact
    .map((value, index) => ({ index, remainder: value - pieces[index] }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  const remaining = quantity - pieces.reduce((a, b) => a + b, 0);
  for (let i = 0; i < remaining; i++) pieces[rank[i].index]++;
  return pieces;
}
export function trimRequirements(
  quantity: number,
  allowance: number,
  rows: { perPiece: number; stock: number }[],
) {
  integer(quantity, 1, 1000000, "Order quantity");
  if (!Number.isFinite(allowance) || allowance < 0 || allowance > 100)
    throw new Error("Extra allowance must be between 0 and 100 percent.");
  const basisPoints = Math.round(allowance * 100);
  return rows.map((row) => {
    integer(row.perPiece, 0, 100, "Per-piece count");
    integer(row.stock, 0, 100000000, "Example stock");
    const required = Math.ceil(
      (quantity * row.perPiece * (10000 + basisPoints)) / 10000,
    );
    return {
      required,
      short: Math.max(0, required - row.stock),
      surplus: Math.max(0, row.stock - required),
    };
  });
}
type Settlement =
  | { mode: "margin"; quantity: number; selling: number; buying: number }
  | { mode: "commission"; quantity: number; fee: number };
function cents(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 1000000)
    throw new Error(`${label} must be from 0 to 1,000,000 USD.`);
  return Math.round(value * 100);
}
export function settlementScenario(input: Settlement) {
  integer(input.quantity, 1, 1000000, "Example quantity");
  if (input.mode === "commission") {
    return {
      mode: input.mode,
      revenue: (cents(input.fee, "Per-piece fee") * input.quantity) / 100,
      cost: null,
      contribution: null,
      margin: null,
    };
  }
  const selling = cents(input.selling, "Selling price");
  if (selling === 0)
    throw new Error("Selling price must be at least USD 0.01.");
  const buying = cents(input.buying, "Purchase cost");
  const revenue = selling * input.quantity,
    cost = buying * input.quantity;
  return {
    mode: input.mode,
    revenue: revenue / 100,
    cost: cost / 100,
    contribution: (revenue - cost) / 100,
    margin: ((revenue - cost) / revenue) * 100,
  };
}
export function milestoneDates(pcd: string, offsets: number[]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pcd))
    throw new Error("Choose a valid example cutting date.");
  const [year, month, day] = pcd.split("-").map(Number);
  if (year < 2000 || year > 2100)
    throw new Error("Choose a cutting date between 2000 and 2100.");
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.toISOString().slice(0, 10) !== pcd)
    throw new Error("Choose a valid calendar date.");
  return offsets.map((offset) => {
    integer(offset, 0, 365, "Calendar-day offset");
    return new Date(date.getTime() - offset * 86400000)
      .toISOString()
      .slice(0, 10);
  });
}

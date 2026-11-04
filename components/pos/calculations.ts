/** Integer-paisa arithmetic for the local, VAT-inclusive checkout exercise. */
export function basketTotals(
  lines: { price: number; qty: number }[],
  tender: number,
  vatRate = 15,
) {
  if (
    !Number.isFinite(tender) ||
    tender < 0 ||
    tender > 100000000 ||
    !Number.isFinite(vatRate) ||
    vatRate < 0 ||
    vatRate > 100
  )
    throw new Error("Enter a valid non-negative tender and VAT rate.");
  const totalPaisa = lines.reduce((total, line) => {
    if (
      !Number.isFinite(line.price) ||
      line.price < 0 ||
      line.price > 1000000 ||
      !Number.isInteger(line.qty) ||
      line.qty < 1 ||
      line.qty > 999
    )
      throw new Error("Invalid basket line.");
    return total + Math.round(line.price * 100) * line.qty;
  }, 0);
  const taxPaisa = Math.round((totalPaisa * vatRate) / (100 + vatRate));
  const received = Math.round(tender * 100);
  return {
    total: totalPaisa / 100,
    tax: taxPaisa / 100,
    exTax: (totalPaisa - taxPaisa) / 100,
    change: Math.max(0, received - totalPaisa) / 100,
    due: Math.max(0, totalPaisa - received) / 100,
    ready: totalPaisa > 0 && received >= totalPaisa,
  };
}

/** Largest-remainder apportionment keeps the distributed paisa equal to the lot cost. */
export function allocateCost(
  cost: number,
  lines: { qty: number; retail: number }[],
  basis: "quantity" | "retail",
) {
  if (
    !Number.isFinite(cost) ||
    cost <= 0 ||
    cost > 100000000 ||
    !lines.length ||
    lines.some(
      (row) =>
        !Number.isInteger(row.qty) ||
        row.qty < 1 ||
        row.qty > 100000 ||
        !Number.isFinite(row.retail) ||
        row.retail <= 0 ||
        row.retail > 1000000,
    )
  )
    throw new Error(
      "Use positive quantities, retail prices and lot cost within the input limits.",
    );
  const weights = lines.map(
    (row) => row.qty * (basis === "retail" ? row.retail : 1),
  );
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const paisa = Math.round(cost * 100);
  const exact = weights.map((weight) => (paisa * weight) / totalWeight);
  const shares = exact.map(Math.floor);
  const remaining = paisa - shares.reduce((a, b) => a + b, 0);
  const rank = exact
    .map((value, index) => ({ index, remainder: value - shares[index] }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (let i = 0; i < remaining; i++) shares[rank[i].index]++;
  return shares.map((share, index) => ({
    value: share / 100,
    unitCost: share / 100 / lines[index].qty,
  }));
}

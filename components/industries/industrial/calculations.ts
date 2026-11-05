function whole(value: number, min: number, max: number, label: string) {
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
}
export function fabricLength(metres: number, losses: readonly number[]) {
  if (!Number.isFinite(metres) || metres < 0.001 || metres > 1000000)
    throw new Error("Incoming length must be from 0.001 to 1,000,000 metres.");
  const incoming = Math.round(metres * 1000);
  let remaining = incoming;
  const stages = losses.map((loss) => {
    if (!Number.isFinite(loss) || loss < 0 || loss > 100)
      throw new Error("Each example loss must be from 0 to 100 percent.");
    const basisPoints = Math.round(loss * 100),
      before = remaining;
    remaining = Math.round((before * (10000 - basisPoints)) / 10000);
    return {
      before: before / 1000,
      loss: (before - remaining) / 1000,
      after: remaining / 1000,
      percent: basisPoints / 100,
    };
  });
  return {
    incoming: incoming / 1000,
    stages,
    finished: remaining / 1000,
    lost: (incoming - remaining) / 1000,
    retainedPercent: (remaining / incoming) * 100,
  };
}
export function barPattern(
  stock: number,
  piece: number,
  allowance: number,
  quantity: number,
) {
  whole(stock, 1, 1000000, "Stock length in mm");
  whole(piece, 1, 1000000, "Piece length in mm");
  whole(allowance, 0, 1000, "Per-piece allowance in mm");
  whole(quantity, 1, 10000, "Requested pieces");
  const consumption = piece + allowance,
    perBar = Math.floor(stock / consumption);
  if (perBar === 0)
    throw new Error(
      "A piece plus its entered allowance must fit inside the stock length.",
    );
  const fullBars = Math.floor(quantity / perBar),
    partialPieces = quantity % perBar,
    bars = fullBars + (partialPieces > 0 ? 1 : 0);
  const patterns: {
    bars: number;
    pieces: number;
    used: number;
    remaining: number;
  }[] = [];
  if (fullBars > 0)
    patterns.push({
      bars: fullBars,
      pieces: perBar,
      used: perBar * consumption,
      remaining: stock - perBar * consumption,
    });
  if (partialPieces > 0)
    patterns.push({
      bars: 1,
      pieces: partialPieces,
      used: partialPieces * consumption,
      remaining: stock - partialPieces * consumption,
    });
  return {
    perBar,
    bars,
    patterns,
    stockTotal: bars * stock,
    pieceTotal: quantity * piece,
    allowanceTotal: quantity * allowance,
    remaining: bars * stock - quantity * consumption,
  };
}
export function componentKits(
  quantity: number,
  rows: readonly { perUnit: number; stock: number }[],
) {
  whole(quantity, 1, 10000, "Example order quantity");
  if (!rows.length) throw new Error("Use at least one example component line.");
  const lines = rows.map((row) => {
    whole(row.perUnit, 1, 100, "Pieces per furniture unit");
    whole(row.stock, 0, 100000000, "Example component stock");
    const required = quantity * row.perUnit;
    return {
      required,
      short: Math.max(0, required - row.stock),
      remaining: Math.max(0, row.stock - required),
      kits: Math.floor(row.stock / row.perUnit),
    };
  });
  const available = Math.min(...lines.map((line) => line.kits));
  return {
    lines,
    available,
    covered: Math.min(quantity, available),
    short: Math.max(0, quantity - available),
  };
}

function grams(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 100000000)
    throw new Error(`${label} must be from 0 to 100,000,000 kg.`);
  return Math.round(value * 1000);
}
export function steelWeight(
  gross: number,
  tare: number,
  allocations: number[],
) {
  const grossGrams = grams(gross, "Gross"),
    tareGrams = grams(tare, "Tare");
  if (tareGrams > grossGrams)
    throw new Error("Tare cannot exceed gross weight.");
  const net = grossGrams - tareGrams;
  const allocated = allocations.reduce(
    (sum, value) => sum + grams(value, "Allocation"),
    0,
  );
  return {
    net: net / 1000,
    allocated: allocated / 1000,
    remaining: (net - allocated) / 1000,
  };
}
export function riceMassBalance(
  input: number,
  outputs: { headRice: number; brokenRice: number; bran: number; husk: number },
) {
  const intake = grams(input, "Input");
  if (intake === 0) throw new Error("Input must be at least 0.001 kg.");
  const head = grams(outputs.headRice, "Head rice"),
    broken = grams(outputs.brokenRice, "Broken rice"),
    bran = grams(outputs.bran, "Bran"),
    husk = grams(outputs.husk, "Husk");
  const recorded = head + broken + bran + husk;
  return {
    recorded: recorded / 1000,
    unassigned: (intake - recorded) / 1000,
    headRicePercent: (head / intake) * 100,
    ricePercent: ((head + broken) / intake) * 100,
  };
}

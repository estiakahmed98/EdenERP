import { suppliedAqlPlans, type AqlPlan } from "./data";

export function lookupAqlPlan(
  lot: number,
  aql: string,
  level: string,
): { plan: AqlPlan | null; error: string | null } {
  if (!Number.isFinite(lot) || !Number.isInteger(lot) || lot < 2)
    return {
      plan: null,
      error: "Enter a whole-number lot size of at least 2.",
    };
  if (aql !== "2.5" || level !== "II")
    return {
      plan: null,
      error:
        "This combination is not in the supplied numeric excerpt. Choose AQL 2.5 and General II.",
    };
  const plan =
    suppliedAqlPlans.find((row) => lot >= row.min && lot <= row.max) ?? null;
  return {
    plan,
    error: plan
      ? null
      : "The supplied excerpt covers lots 2–500. Load a supported example or use your configured full plan.",
  };
}

export function evaluateAql(
  plan: AqlPlan,
  defects: number,
): { decision: "Accept" | "Reject" | null; error: string | null } {
  if (
    !Number.isFinite(defects) ||
    !Number.isInteger(defects) ||
    defects < 0 ||
    defects > plan.sample
  )
    return {
      decision: null,
      error: `Enter a whole-number defective count from 0 to ${plan.sample}.`,
    };
  return {
    decision: defects <= plan.accept ? "Accept" : "Reject",
    error: null,
  };
}

export function calculateSpc(
  readings: readonly number[],
  lsl: number,
  usl: number,
) {
  if (readings.length < 2 || readings.some((x) => !Number.isFinite(x)))
    throw new Error("At least two finite readings are required.");
  if (!Number.isFinite(lsl) || !Number.isFinite(usl) || lsl >= usl)
    throw new Error(
      "The lower specification must be below the upper specification.",
    );
  const mean =
    readings.reduce((sum, value) => sum + value, 0) / readings.length;
  const ranges = readings
    .slice(1)
    .map((value, i) => Math.abs(value - readings[i]));
  const mrMean = ranges.reduce((sum, value) => sum + value, 0) / ranges.length;
  const sigma = mrMean / 1.128;
  if (![mean, mrMean, sigma].every(Number.isFinite))
    throw new Error("The readings exceed the supported numeric range.");
  const ucl = mean + 3 * sigma;
  const lcl = mean - 3 * sigma;
  return {
    count: readings.length,
    mean,
    sigma,
    ranges,
    mrMean,
    ucl,
    lcl,
    mrUcl: mrMean * 3.267,
    mrLcl: 0,
    cp: sigma > 0 ? (usl - lsl) / (6 * sigma) : null,
    cpk:
      sigma > 0
        ? Math.min((usl - mean) / (3 * sigma), (mean - lsl) / (3 * sigma))
        : null,
    outOfControl:
      sigma > 0
        ? readings.filter((value) => value < lcl || value > ucl).length
        : 0,
    outOfSpec: readings.filter((value) => value < lsl || value > usl).length,
  };
}

export function parseReadings(text: string): number[] {
  const tokens = text
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean);
  if (tokens.length < 2 || tokens.length > 500)
    throw new Error(
      "Enter 2–500 readings, separated by commas, spaces or new lines.",
    );
  const values = tokens.map((token) => Number(token));
  if (values.some((value) => !Number.isFinite(value)))
    throw new Error("Every reading must be a finite number.");
  return values;
}

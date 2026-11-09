import type { TFn } from "@/lib/i18n/t-types";

// Stored enum values remain unchanged; translate only their presentation.
export function enumLabel(t: TFn, value: string) {
  return t(`enums.${value}`);
}
const errorKeys: Record<string, string> = {
  "Enter a whole-number lot size of at least 2.": "invalidLot",
  "This combination is not in the supplied numeric excerpt. Choose AQL 2.5 and General II.":
    "unsupportedCombination",
  "The supplied excerpt covers lots 2–500. Load a supported example or use your configured full plan.":
    "unsupportedLot",
  "At least two finite readings are required.": "minimumReadings",
  "The lower specification must be below the upper specification.":
    "specificationOrder",
  "The readings exceed the supported numeric range.": "numericRange",
  "Enter 2–500 readings, separated by commas, spaces or new lines.":
    "readingCount",
  "Every reading must be a finite number.": "finiteReading",
};
export function qualityError(t: TFn, message: string | null) {
  return t(`errors.${errorKeys[message ?? ""] ?? "unknown"}`);
}
export function formatDate(locale: string, value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value + "T00:00:00Z"));
}

import type { TFn } from "@/lib/i18n/t-types";

// Labels are localized; the timetable's comparison values remain stable.
const choices: Record<string, string> = {
  Sunday: "sunday",
  Monday: "monday",
  Tuesday: "tuesday",
  "Lab 01": "lab01",
  "Hall B": "hallB",
  "Tutor A": "tutorA",
  "Tutor B": "tutorB",
  "Science 1": "science1",
  "Humanities 1": "humanities1",
};
export function choiceLabel(t: TFn, value: string) {
  const key = choices[value];
  if (!key) throw new Error("Unknown education example choice");
  return t(`choices.${key}`);
}

export type Session = {
  id: string;
  day: string;
  start: string;
  end: string;
  room: string;
  tutor: string;
  group: string;
};
function minutes(value: string) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value))
    throw new Error("Choose valid start and end times.");
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}
export function findConflicts(
  candidate: Omit<Session, "id">,
  sessions: Session[],
) {
  const start = minutes(candidate.start),
    end = minutes(candidate.end);
  if (start >= end) throw new Error("End time must be after start time.");
  return sessions
    .filter(
      (row) =>
        row.day === candidate.day &&
        start < minutes(row.end) &&
        minutes(row.start) < end,
    )
    .map((row) => ({
      id: row.id,
      reasons: [
        row.room === candidate.room ? "room" : null,
        row.tutor === candidate.tutor ? "tutor" : null,
        row.group === candidate.group ? "group" : null,
      ].filter((reason): reason is string => reason !== null),
    }))
    .filter((row) => row.reasons.length > 0);
}
export function creditTotal(
  ids: string[],
  catalog: { id: string; credits: number }[],
) {
  if (catalog.some((row) => !Number.isFinite(row.credits) || row.credits <= 0))
    throw new Error("Invalid example course credits.");
  return [...new Set(ids)].reduce((sum, id) => {
    const course = catalog.find((row) => row.id === id);
    if (!course) throw new Error("Unknown example course.");
    return sum + course.credits;
  }, 0);
}

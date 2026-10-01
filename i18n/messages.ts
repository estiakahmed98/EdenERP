function isMessageObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Keep untranslated branches available while a locale's catalog is incomplete.
// Arrays are replaced as a whole so translated lists keep their own ordering.
export function mergeMessages<T extends Record<string, unknown>>(
  fallback: T,
  translations: Record<string, unknown>,
): T {
  const messages: Record<string, unknown> = { ...fallback };

  for (const [key, value] of Object.entries(translations)) {
    const original = messages[key];
    messages[key] =
      isMessageObject(original) && isMessageObject(value)
        ? mergeMessages(original, value)
        : value;
  }

  return messages as T;
}

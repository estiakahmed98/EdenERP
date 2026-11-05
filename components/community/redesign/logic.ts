import type { Guide } from "./data";
export function filterGuides(
  rows: readonly Guide[],
  query: string,
  category: string,
) {
  const q = query.trim().toLocaleLowerCase();
  return rows.filter(
    (row) =>
      (category === "all" || row.category === category) &&
      [row.title, row.summary, ...row.steps]
        .join(" ")
        .toLocaleLowerCase()
        .includes(q),
  );
}
export function selectedAgenda<T extends { id: string }>(
  rows: readonly T[],
  selected: readonly string[],
) {
  const ids = new Set(selected);
  return rows.filter((row) => ids.has(row.id));
}
export function agendaMinutes(count: number, minutes: number) {
  if (
    !Number.isInteger(count) ||
    count < 0 ||
    count > 20 ||
    !Number.isInteger(minutes) ||
    minutes < 5 ||
    minutes > 120
  )
    throw new Error("Use a supported topic count and whole-minute duration.");
  return count * minutes;
}
export function emailDraft(email: string, subject: string, body: string) {
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email))
    throw new Error("A valid configured contact email is required.");
  return `mailto:${email}?subject=${encodeURIComponent(subject.slice(0, 200))}&body=${encodeURIComponent(body.slice(0, 5000))}`;
}
export function translationArtifact(locale: string, text: string) {
  if (!["en", "bn", "ar"].includes(locale))
    throw new Error("Choose a configured language.");
  if (!text.trim() || text.length > 500)
    throw new Error("Use a draft label from 1 to 500 characters.");
  return JSON.stringify(
    {
      locale,
      namespace: "common.actions",
      draft: true,
      messages: { liveDemo: text.trim() },
    },
    null,
    2,
  );
}
export function articleText(html: string) {
  return html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<\/(p|div|h[1-6]|li|blockquote|pre)>/gi, "\n\n")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(
      /&(amp|lt|gt|quot|apos|nbsp);/g,
      (_, name: string) =>
        (
          ({
            amp: "&",
            lt: "<",
            gt: ">",
            quot: '"',
            apos: "'",
            nbsp: " ",
          }) as Record<string, string>
        )[name] ?? "",
    )
    .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (entity: string, code: string) => {
      const n =
        code[0].toLowerCase() === "x"
          ? Number.parseInt(code.slice(1), 16)
          : Number.parseInt(code, 10);
      return n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : entity;
    })
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}
export type PublicPost = {
  id: number;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
};
export function parseJournal(value: unknown): {
  posts: PublicPost[];
  page: number;
  pages: number;
  total: number;
} {
  if (
    !value ||
    typeof value !== "object" ||
    !("blogs" in value) ||
    !("pagination" in value)
  )
    throw new Error("The journal response could not be read.");
  const record = value as Record<string, unknown>,
    pagination = record.pagination;
  if (
    !Array.isArray(record.blogs) ||
    !pagination ||
    typeof pagination !== "object"
  )
    throw new Error("The journal response could not be read.");
  const p = pagination as Record<string, unknown>;
  for (const key of ["page", "pages", "total"])
    if (
      typeof p[key] !== "number" ||
      !Number.isInteger(p[key]) ||
      (p[key] as number) < (key === "page" ? 1 : 0)
    )
      throw new Error("The journal pagination could not be read.");
  const posts = record.blogs.map((row: unknown) => {
    if (!row || typeof row !== "object")
      throw new Error("An article record could not be read.");
    const item = row as Record<string, unknown>;
    if (
      typeof item.id !== "number" ||
      !Number.isInteger(item.id) ||
      item.id < 1 ||
      !["title", "author", "date", "summary", "content"].every(
        (k) => typeof item[k] === "string",
      )
    )
      throw new Error("An article record could not be read.");
    return {
      id: item.id,
      title: item.title as string,
      author: item.author as string,
      date: item.date as string,
      summary: item.summary as string,
      content: item.content as string,
    };
  });
  return {
    posts,
    page: p.page as number,
    pages: p.pages as number,
    total: p.total as number,
  };
}

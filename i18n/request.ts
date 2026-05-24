// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

import { defaultLocale, isLocale } from "@/i18n/config";

type Locale = "en" | "bn";

type Messages = Record<string, unknown>;

async function loadMessagesFromDirectory(
  directoryPath: string,
): Promise<Messages> {
  const entries = await readdir(directoryPath, { withFileTypes: true });

  const messages: Messages = {};

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        messages[entry.name] = await loadMessagesFromDirectory(fullPath);
        return;
      }

      if (entry.isFile() && entry.name.endsWith(".json")) {
        const namespace = entry.name.replace(/\.json$/, "");
        const fileContent = await readFile(fullPath, "utf8");

        messages[namespace] = JSON.parse(fileContent);
      }
    }),
  );

  return messages;
}

async function getMessagesForLocale(locale: Locale) {
  const messagesDirectory = path.join(process.cwd(), "messages", locale);

  return loadMessagesFromDirectory(messagesDirectory);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});

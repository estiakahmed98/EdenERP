// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

import { defaultLocale, isLocale } from "@/i18n/config";

type Locale = "en" | "bn";

type Messages = Record<string, unknown>;

function isRecord(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages(
  existingValue: unknown,
  incomingValue: unknown,
): unknown {
  if (isRecord(existingValue) && isRecord(incomingValue)) {
    const merged: Messages = { ...existingValue };

    for (const [key, value] of Object.entries(incomingValue)) {
      merged[key] = key in merged ? mergeMessages(merged[key], value) : value;
    }

    return merged;
  }

  return incomingValue;
}

async function loadMessagesFromDirectory(
  directoryPath: string,
): Promise<Messages> {
  const entries = await readdir(directoryPath, { withFileTypes: true });

  const messages: Messages = {};

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        const incomingMessages = await loadMessagesFromDirectory(fullPath);
        messages[entry.name] = entry.name in messages
          ? mergeMessages(messages[entry.name], incomingMessages)
          : incomingMessages;
        return;
      }

      if (entry.isFile() && entry.name.endsWith(".json")) {
        const namespace = entry.name.replace(/\.json$/, "");
        const fileContent = await readFile(fullPath, "utf8");
        const parsedContent = JSON.parse(fileContent);

        messages[namespace] = namespace in messages
          ? mergeMessages(messages[namespace], parsedContent)
          : parsedContent;
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

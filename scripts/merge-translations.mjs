import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "messages");
const LOCALES = ["en", "bn"];

function isObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Deep merge two values.
 *
 * Important for EdenERP:
 *
 * pages/community.json
 * +
 * pages/community/training.json
 *
 * must become:
 *
 * pages: {
 *   community: {
 *     ...communityJson,
 *     training: {...}
 *   }
 * }
 */
function deepMerge(target, source, currentPath = "", conflicts = []) {
  if (!isObject(target) || !isObject(source)) {
    if (
      target !== undefined &&
      JSON.stringify(target) !== JSON.stringify(source)
    ) {
      conflicts.push({
        path: currentPath || "(root)",
        oldType: getType(target),
        newType: getType(source),
      });
    }

    return source;
  }

  const result = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const nextPath = currentPath
      ? `${currentPath}.${key}`
      : key;

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = deepMerge(
        result[key],
        value,
        nextPath,
        conflicts
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

function getType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

/**
 * Recursively load a locale directory.
 *
 * Example:
 *
 * messages/en/common.json
 * -> common
 *
 * messages/en/pages/home.json
 * -> pages.home
 *
 * messages/en/pages/community/training.json
 * -> pages.community.training
 */
async function loadDirectory(directoryPath, relativePath = "") {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  // Sort for deterministic output.
  entries.sort((a, b) => a.name.localeCompare(b.name));

  let messages = {};
  let fileCount = 0;
  const conflicts = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const child = await loadDirectory(
        fullPath,
        path.join(relativePath, entry.name)
      );

      const namespace = entry.name;

      if (Object.prototype.hasOwnProperty.call(messages, namespace)) {
        messages[namespace] = deepMerge(
          messages[namespace],
          child.messages,
          [...relativePath.split(path.sep).filter(Boolean), namespace].join("."),
          conflicts
        );
      } else {
        messages[namespace] = child.messages;
      }

      fileCount += child.fileCount;
      conflicts.push(...child.conflicts);

      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }

    const namespace = entry.name.replace(/\.json$/i, "");
    const fileContent = await fs.readFile(fullPath, "utf8");

    let parsed;

    try {
      parsed = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(
        `Invalid JSON:\n${fullPath}\n\n${error.message}`
      );
    }

    const namespacePath = [
      ...relativePath.split(path.sep).filter(Boolean),
      namespace,
    ].join(".");

    if (Object.prototype.hasOwnProperty.call(messages, namespace)) {
      messages[namespace] = deepMerge(
        messages[namespace],
        parsed,
        namespacePath,
        conflicts
      );
    } else {
      messages[namespace] = parsed;
    }

    fileCount++;
  }

  return {
    messages,
    fileCount,
    conflicts,
  };
}

function countLeafKeys(value) {
  if (!isObject(value)) {
    return 1;
  }

  let count = 0;

  for (const child of Object.values(value)) {
    count += countLeafKeys(child);
  }

  return count;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function mergeLocale(locale) {
  const sourceDirectory = path.join(MESSAGES_DIR, locale);
  const outputFile = path.join(
    MESSAGES_DIR,
    `${locale}.json`
  );

  console.log("");
  console.log("========================================");
  console.log(`Processing locale: ${locale}`);
  console.log("========================================");

  if (!(await fileExists(sourceDirectory))) {
    throw new Error(
      `Source directory not found: ${sourceDirectory}`
    );
  }

  const result = await loadDirectory(sourceDirectory);

  const json =
    JSON.stringify(result.messages, null, 2) + "\n";

  await fs.writeFile(outputFile, json, "utf8");

  const leafKeys = countLeafKeys(result.messages);

  console.log(`Source JSON files : ${result.fileCount}`);
  console.log(`Translation keys  : ${leafKeys}`);
  console.log(`Output             : messages/${locale}.json`);

  if (result.conflicts.length > 0) {
    console.log("");
    console.log(
      `WARNING: ${result.conflicts.length} merge conflict(s) detected`
    );

    for (const conflict of result.conflicts) {
      console.log(
        `  - ${conflict.path}: ${conflict.oldType} -> ${conflict.newType}`
      );
    }
  } else {
    console.log("Merge conflicts    : 0");
  }

  return {
    locale,
    fileCount: result.fileCount,
    leafKeys,
    conflicts: result.conflicts.length,
    outputFile,
  };
}

async function main() {
  console.log("");
  console.log("EdenERP Translation Merger");
  console.log("==========================");
  console.log("");
  console.log(
    "This script does NOT delete existing translation folders."
  );

  const results = [];

  for (const locale of LOCALES) {
    results.push(await mergeLocale(locale));
  }

  console.log("");
  console.log("========================================");
  console.log("MERGE SUMMARY");
  console.log("========================================");

  for (const result of results) {
    console.log(
      `${result.locale}: ` +
        `${result.fileCount} files -> ` +
        `${result.leafKeys} keys -> ` +
        `${result.conflicts} conflicts`
    );
  }

  const en = results.find((item) => item.locale === "en");
  const bn = results.find((item) => item.locale === "bn");

  console.log("");

  if (en && bn) {
    if (en.leafKeys === bn.leafKeys) {
      console.log(
        `Key count: MATCH (${en.leafKeys})`
      );
    } else {
      console.log(
        "WARNING: English/Bangla key counts are different."
      );
      console.log(`English: ${en.leafKeys}`);
      console.log(`Bangla : ${bn.leafKeys}`);
    }
  }

  console.log("");
  console.log("Generated:");
  console.log("  messages/en.json");
  console.log("  messages/bn.json");

  console.log("");
  console.log(
    "Original messages/en and messages/bn folders were NOT modified."
  );

  console.log("");
  console.log("Next:");
  console.log("  1. Review generated JSON files");
  console.log("  2. Run npm run i18n:check");
  console.log("  3. Update i18n/request.ts");
  console.log("  4. Run npm run build");
}

main().catch((error) => {
  console.error("");
  console.error("Translation merge failed:");
  console.error(error);
  process.exit(1);
});
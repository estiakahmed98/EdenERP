import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const messagesDir = path.join(rootDir, "messages");
const locales = ["en", "bn"];

async function collectJsonFiles(dir, baseDir = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectJsonFiles(fullPath, baseDir);
      }

      if (entry.isFile() && entry.name.endsWith(".json")) {
        return [path.relative(baseDir, fullPath)];
      }

      return [];
    }),
  );

  return files.flat();
}

function compareValues(left, right, currentPath, errors) {
  const leftIsArray = Array.isArray(left);
  const rightIsArray = Array.isArray(right);

  if (leftIsArray || rightIsArray) {
    if (!leftIsArray || !rightIsArray) {
      errors.push(`${currentPath}: array/non-array mismatch`);
      return;
    }

    if (left.length !== right.length) {
      errors.push(`${currentPath}: array length mismatch (${left.length} vs ${right.length})`);
    }

    const maxLength = Math.min(left.length, right.length);
    for (let index = 0; index < maxLength; index += 1) {
      compareValues(left[index], right[index], `${currentPath}[${index}]`, errors);
    }
    return;
  }

  const leftIsObject = typeof left === "object" && left !== null;
  const rightIsObject = typeof right === "object" && right !== null;

  if (leftIsObject || rightIsObject) {
    if (!leftIsObject || !rightIsObject) {
      errors.push(`${currentPath}: object/non-object mismatch`);
      return;
    }

    const leftKeys = Object.keys(left).sort();
    const rightKeys = Object.keys(right).sort();

    for (const key of leftKeys) {
      if (!rightKeys.includes(key)) {
        errors.push(`${currentPath}.${key}: missing in bn`);
      }
    }

    for (const key of rightKeys) {
      if (!leftKeys.includes(key)) {
        errors.push(`${currentPath}.${key}: missing in en`);
      }
    }

    for (const key of leftKeys) {
      if (rightKeys.includes(key)) {
        compareValues(left[key], right[key], `${currentPath}.${key}`, errors);
      }
    }
    return;
  }

  if (typeof left !== typeof right) {
    errors.push(`${currentPath}: type mismatch (${typeof left} vs ${typeof right})`);
  }
}

async function main() {
  const localeDirs = locales.map((locale) => path.join(messagesDir, locale));
  const [enFiles, bnFiles] = await Promise.all(localeDirs.map((dir) => collectJsonFiles(dir)));
  const errors = [];

  const enSet = new Set(enFiles);
  const bnSet = new Set(bnFiles);

  for (const file of enSet) {
    if (!bnSet.has(file)) {
      errors.push(`${file}: missing file in bn`);
    }
  }

  for (const file of bnSet) {
    if (!enSet.has(file)) {
      errors.push(`${file}: missing file in en`);
    }
  }

  const sharedFiles = [...enSet].filter((file) => bnSet.has(file)).sort();

  for (const relativeFile of sharedFiles) {
    const [enContent, bnContent] = await Promise.all([
      readFile(path.join(messagesDir, "en", relativeFile), "utf8"),
      readFile(path.join(messagesDir, "bn", relativeFile), "utf8"),
    ]);

    compareValues(
      JSON.parse(enContent),
      JSON.parse(bnContent),
      relativeFile.replace(/\\/g, "/"),
      errors,
    );
  }

  if (errors.length > 0) {
    console.error("i18n key parity check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("i18n key parity check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

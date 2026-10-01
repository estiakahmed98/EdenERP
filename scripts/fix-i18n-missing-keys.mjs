import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "messages");

const LOCALES = {
  en: path.join(MESSAGES_DIR, "en"),
  bn: path.join(MESSAGES_DIR, "bn"),
};

function isObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getJsonFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getJsonFiles(fullPath, baseDir)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files.sort();
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${filePath}\n${error.message}`
    );
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}

function fillMissingKeys(target, source, currentPath, report) {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) {
      return target;
    }

    for (let i = 0; i < source.length; i++) {
      const nextPath = `${currentPath}[${i}]`;

      if (target[i] === undefined) {
        target[i] = clone(source[i]);

        report.push({
          path: nextPath,
          value: source[i],
        });

        continue;
      }

      if (
        (isObject(target[i]) && isObject(source[i])) ||
        (Array.isArray(target[i]) && Array.isArray(source[i]))
      ) {
        fillMissingKeys(
          target[i],
          source[i],
          nextPath,
          report
        );
      }
    }

    return target;
  }

  if (!isObject(source) || !isObject(target)) {
    return target;
  }

  for (const [key, sourceValue] of Object.entries(source)) {
    const nextPath = currentPath
      ? `${currentPath}.${key}`
      : key;

    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = clone(sourceValue);

      report.push({
        path: nextPath,
        value: sourceValue,
      });

      continue;
    }

    const targetValue = target[key];

    if (
      (isObject(targetValue) && isObject(sourceValue)) ||
      (Array.isArray(targetValue) && Array.isArray(sourceValue))
    ) {
      fillMissingKeys(
        targetValue,
        sourceValue,
        nextPath,
        report
      );
    }
  }

  return target;
}

async function ensureFileExists(targetFile, sourceFile) {
  if (await fileExists(targetFile)) {
    return false;
  }

  await fs.mkdir(path.dirname(targetFile), {
    recursive: true,
  });

  const sourceContent = await fs.readFile(sourceFile, "utf8");
  await fs.writeFile(targetFile, sourceContent, "utf8");

  return true;
}

async function main() {
  console.log("");
  console.log("EdenERP i18n Missing Key Fixer");
  console.log("==============================");
  console.log("");
  console.log("Existing values will NOT be overwritten.");
  console.log("Only missing files/keys will be added.");
  console.log("");

  const enFiles = await getJsonFiles(LOCALES.en);
  const bnFiles = await getJsonFiles(LOCALES.bn);

  const allFiles = Array.from(
    new Set([...enFiles, ...bnFiles])
  ).sort();

  let addedToEn = 0;
  let addedToBn = 0;
  let createdEnFiles = 0;
  let createdBnFiles = 0;

  const enReport = [];
  const bnReport = [];

  for (const relativeFile of allFiles) {
    const enFile = path.join(LOCALES.en, relativeFile);
    const bnFile = path.join(LOCALES.bn, relativeFile);

    const enExists = await fileExists(enFile);
    const bnExists = await fileExists(bnFile);

    if (!enExists && bnExists) {
      await ensureFileExists(enFile, bnFile);

      createdEnFiles++;
      console.log(
        `[EN FILE CREATED] ${relativeFile}`
      );

      continue;
    }

    if (!bnExists && enExists) {
      await ensureFileExists(bnFile, enFile);

      createdBnFiles++;
      console.log(
        `[BN FILE CREATED] ${relativeFile}`
      );

      continue;
    }

    if (!enExists || !bnExists) {
      continue;
    }

    const enData = await readJson(enFile);
    const bnData = await readJson(bnFile);

    const missingInEn = [];
    const missingInBn = [];

    fillMissingKeys(
      enData,
      bnData,
      "",
      missingInEn
    );

    fillMissingKeys(
      bnData,
      enData,
      "",
      missingInBn
    );

    if (missingInEn.length > 0) {
      await writeJson(enFile, enData);

      for (const item of missingInEn) {
        enReport.push({
          file: relativeFile,
          path: item.path,
        });

        console.log(
          `[ADDED TO EN] ${relativeFile}.${item.path}`
        );
      }

      addedToEn += missingInEn.length;
    }

    if (missingInBn.length > 0) {
      await writeJson(bnFile, bnData);

      for (const item of missingInBn) {
        bnReport.push({
          file: relativeFile,
          path: item.path,
        });

        console.log(
          `[ADDED TO BN] ${relativeFile}.${item.path}`
        );
      }

      addedToBn += missingInBn.length;
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),

    createdFiles: {
      en: createdEnFiles,
      bn: createdBnFiles,
    },

    addedKeys: {
      en: addedToEn,
      bn: addedToBn,
    },

    details: {
      en: enReport,
      bn: bnReport,
    },
  };

  const reportPath = path.join(
    ROOT,
    "i18n-missing-keys-report.json"
  );

  await writeJson(reportPath, report);

  console.log("");
  console.log("================================");
  console.log("SUMMARY");
  console.log("================================");
  console.log(`Created EN files : ${createdEnFiles}`);
  console.log(`Created BN files : ${createdBnFiles}`);
  console.log(`Keys added to EN : ${addedToEn}`);
  console.log(`Keys added to BN : ${addedToBn}`);

  console.log("");
  console.log(
    "Report: i18n-missing-keys-report.json"
  );

  console.log("");
  console.log("Next command:");
  console.log("npm run i18n:check");
}

main().catch((error) => {
  console.error("");
  console.error("Failed to fix missing i18n keys:");
  console.error(error);
  process.exit(1);
});
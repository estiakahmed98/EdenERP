import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "messages");

const EN_DIR = path.join(MESSAGES_DIR, "en");
const BN_DIR = path.join(MESSAGES_DIR, "bn");

function isObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
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
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(
        ...(await getJsonFiles(fullPath, baseDir))
      );
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".json")
    ) {
      files.push(
        path.relative(baseDir, fullPath)
      );
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

/**
 * Convert Bengali digits to English digits.
 *
 * Example:
 * "১২৩"    -> "123"
 * "৮৫.৫"   -> "85.5"
 * "১,২০০"  -> "1,200"
 */
function bengaliDigitsToEnglish(value) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /[০-৯]/g,
    (digit) => String(bengaliDigits.indexOf(digit))
  );
}

/**
 * Safely convert a string to number.
 *
 * Handles:
 * "12"
 * "12.5"
 * "১"
 * "১২"
 * "৮৫.৫"
 * "1,200"
 * "১,২০০"
 *
 * Does NOT convert:
 * "12%"
 * "5 users"
 * "৳500"
 */
function stringToNumber(value) {
  if (typeof value !== "string") {
    return null;
  }

  let normalized = bengaliDigitsToEnglish(value)
    .trim()
    .replace(/,/g, "");

  if (normalized === "") {
    return null;
  }

  // Strict numeric validation
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }

  const number = Number(normalized);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
}

function convertValue(value, targetType) {
  const currentType = getType(value);

  if (currentType === targetType) {
    return {
      success: true,
      value,
    };
  }

  // string -> number
  if (
    targetType === "number" &&
    currentType === "string"
  ) {
    const converted = stringToNumber(value);

    if (converted === null) {
      return {
        success: false,
        value,
      };
    }

    return {
      success: true,
      value: converted,
    };
  }

  // number -> string
  if (
    targetType === "string" &&
    currentType === "number"
  ) {
    return {
      success: true,
      value: String(value),
    };
  }

  // boolean -> string
  if (
    targetType === "string" &&
    currentType === "boolean"
  ) {
    return {
      success: true,
      value: String(value),
    };
  }

  // string -> boolean
  if (
    targetType === "boolean" &&
    currentType === "string"
  ) {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") {
      return {
        success: true,
        value: true,
      };
    }

    if (normalized === "false") {
      return {
        success: true,
        value: false,
      };
    }
  }

  return {
    success: false,
    value,
  };
}

/**
 * English structure/type is canonical.
 *
 * We only modify BN primitive values where a safe
 * conversion is possible.
 *
 * Object/array structure is never converted.
 */
function normalizeNode(
  enNode,
  bnNode,
  currentPath,
  report
) {
  if (
    Array.isArray(enNode) &&
    Array.isArray(bnNode)
  ) {
    const length = Math.min(
      enNode.length,
      bnNode.length
    );

    for (let i = 0; i < length; i++) {
      const nextPath =
        `${currentPath}[${i}]`;

      const result = normalizeNode(
        enNode[i],
        bnNode[i],
        nextPath,
        report
      );

      if (result.changed) {
        bnNode[i] = result.value;
      }
    }

    return {
      changed: false,
      value: bnNode,
    };
  }

  if (
    isObject(enNode) &&
    isObject(bnNode)
  ) {
    for (const key of Object.keys(enNode)) {
      if (
        !Object.prototype.hasOwnProperty.call(
          bnNode,
          key
        )
      ) {
        continue;
      }

      const nextPath = currentPath
        ? `${currentPath}.${key}`
        : key;

      const result = normalizeNode(
        enNode[key],
        bnNode[key],
        nextPath,
        report
      );

      if (result.changed) {
        bnNode[key] = result.value;
      }
    }

    return {
      changed: false,
      value: bnNode,
    };
  }

  const enType = getType(enNode);
  const bnType = getType(bnNode);

  if (enType === bnType) {
    return {
      changed: false,
      value: bnNode,
    };
  }

  /**
   * Never automatically convert structural mismatches.
   */
  const structuralTypes = new Set([
    "array",
    "object",
    "null",
  ]);

  if (
    structuralTypes.has(enType) ||
    structuralTypes.has(bnType)
  ) {
    report.skipped.push({
      path: currentPath,
      enType,
      bnType,
      enValue: enNode,
      bnValue: bnNode,
      reason: "Structural mismatch",
    });

    return {
      changed: false,
      value: bnNode,
    };
  }

  const conversion = convertValue(
    bnNode,
    enType
  );

  if (!conversion.success) {
    report.skipped.push({
      path: currentPath,
      enType,
      bnType,
      enValue: enNode,
      bnValue: bnNode,
      reason: "Unsafe conversion",
    });

    return {
      changed: false,
      value: bnNode,
    };
  }

  report.fixed.push({
    path: currentPath,
    fromType: bnType,
    toType: enType,
    oldValue: bnNode,
    newValue: conversion.value,
  });

  return {
    changed: true,
    value: conversion.value,
  };
}

async function main() {
  console.log("");
  console.log("EdenERP i18n Type Fixer v2");
  console.log("==========================");
  console.log("");
  console.log(
    "English JSON type is treated as canonical."
  );
  console.log(
    "Bengali numeric strings are supported."
  );
  console.log(
    "Structural mismatches will NOT be modified."
  );
  console.log("");

  const enFiles = await getJsonFiles(EN_DIR);

  const globalReport = {
    generatedAt: new Date().toISOString(),
    changedFiles: [],
    fixed: [],
    skipped: [],
  };

  let changedFiles = 0;

  for (const relativeFile of enFiles) {
    const enFile = path.join(
      EN_DIR,
      relativeFile
    );

    const bnFile = path.join(
      BN_DIR,
      relativeFile
    );

    if (!(await fileExists(bnFile))) {
      continue;
    }

    const enData = await readJson(enFile);
    const bnData = await readJson(bnFile);

    const fileReport = {
      fixed: [],
      skipped: [],
    };

    normalizeNode(
      enData,
      bnData,
      "",
      fileReport
    );

    if (fileReport.fixed.length > 0) {
      await writeJson(
        bnFile,
        bnData
      );

      changedFiles++;

      globalReport.changedFiles.push(
        relativeFile
      );

      for (const item of fileReport.fixed) {
        globalReport.fixed.push({
          file: relativeFile,
          ...item,
        });

        console.log(
          `[FIXED] ${relativeFile}.${item.path}`
        );

        console.log(
          `        ${item.fromType} -> ${item.toType}`
        );

        console.log(
          `        ${JSON.stringify(item.oldValue)} -> ${JSON.stringify(item.newValue)}`
        );
      }
    }

    for (const item of fileReport.skipped) {
      globalReport.skipped.push({
        file: relativeFile,
        ...item,
      });

      console.log(
        `[SKIPPED] ${relativeFile}.${item.path}`
      );

      console.log(
        `          ${item.enType} vs ${item.bnType}`
      );

      console.log(
        `          EN: ${JSON.stringify(item.enValue)}`
      );

      console.log(
        `          BN: ${JSON.stringify(item.bnValue)}`
      );
    }
  }

  const reportPath = path.join(
    ROOT,
    "i18n-type-fix-report.json"
  );

  await writeJson(
    reportPath,
    globalReport
  );

  console.log("");
  console.log("================================");
  console.log("SUMMARY");
  console.log("================================");

  console.log(
    `Changed files : ${changedFiles}`
  );

  console.log(
    `Types fixed   : ${globalReport.fixed.length}`
  );

  console.log(
    `Skipped       : ${globalReport.skipped.length}`
  );

  console.log("");
  console.log(
    "Report: i18n-type-fix-report.json"
  );

  console.log("");

  if (globalReport.skipped.length === 0) {
    console.log(
      "All safe type mismatches were fixed."
    );
  } else {
    console.log(
      "Some mismatches were intentionally skipped."
    );
  }

  console.log("");
  console.log("Next:");
  console.log("npm run i18n:check");
}

main().catch((error) => {
  console.error("");
  console.error(
    "i18n type fixing failed:"
  );
  console.error(error);
  process.exit(1);
});
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import path from "node:path";

const require = createRequire(import.meta.url);
const watcherRequire = createRequire(require.resolve("@parcel/watcher"));
const picomatch = watcherRequire("picomatch");

test("the installed watcher resolves the patched local matcher", () => {
  assert.equal(watcherRequire("picomatch/package.json").version, "4.0.7-eden.1");
  assert.equal(typeof require("@parcel/watcher").subscribe, "function");
});

test("repeated extglobs fail before compiling or matching, within a process timeout", () => {
  const output = execFileSync(process.execPath, ["-e", `
    const assert = require('node:assert/strict');
    const {createRequire} = require('node:module');
    const fromWatcher = createRequire(require.resolve('@parcel/watcher'));
    const pm = fromWatcher('picomatch');
    const parse = fromWatcher('picomatch/lib/parse');
    const patterns = ['+(*)', '+(*a)', '*(*)', '*(*a)', '**/+(*a).js',
      '@(+(*a))', '+(a|aa)', '*(a|aa)', '+(+(a))', '*(*(*a))'];
    for (const pattern of patterns) {
      for (const options of [{}, {fastpaths: false}, {windows: true},
        {windows: false}, {maxExtglobRecursion: false}]) {
        for (const compile of [pm, pm.makeRe, pm.parse, parse, parse.fastpaths]) {
          assert.throws(() => compile(pattern, options), /Repeated extglobs/);
        }
      }
    }
    process.stdout.write('rejected');
  `], { cwd: process.cwd(), encoding: "utf8", timeout: 5000 });
  assert.equal(output, "rejected");
});

test("ordinary watcher globs retain matching behavior on POSIX and Windows", () => {
  for (const windows of [false, true]) {
    const options = { dot: true, windows };
    const regex = picomatch.makeRe("**/node_modules/**", options);
    assert.equal(regex.test("/project/node_modules/pkg/index.js"), true);
    assert.equal(regex.test("/project/src/index.ts"), false);
    assert.equal(picomatch("**/*.{ts,tsx}", options)("src/page.tsx"), true);
    assert.equal(picomatch("**/*.{ts,tsx}", options)("src/page.js"), false);
    assert.equal(picomatch("**/!(*.test).ts", options)("src/page.ts"), true);
    assert.equal(picomatch("**/!(*.test).ts", options)("src/page.test.ts"), false);
    assert.equal(picomatch(String.raw`\+\(a\)`, options)("+(a)"), true);
    assert.equal(picomatch("src/?(page).ts", options)("src/page.ts"), true);
  }
});

test("the watcher wrapper compiles its directory ignores with the patched matcher", async () => {
  const { createWrapper } = watcherRequire("./wrapper");
  let captured: { ignoreGlobs: string[] } | undefined;
  const wrapper = createWrapper({
    subscribe(_dir: string, _callback: unknown, options: { ignoreGlobs: string[] }) {
      captured = options;
    },
    unsubscribe() {},
  });
  const directories = ["node_modules", ".next", ".git", "dist", "build", "coverage"];
  const subscription = await wrapper.subscribe(process.cwd(), () => {}, {
    ignore: directories.map((name) => `**/${name}/**`),
  });
  assert.ok(captured);
  assert.equal(captured.ignoreGlobs.length, directories.length);
  for (const [index, name] of directories.entries()) {
    const regex: RegExp = new RegExp(captured.ignoreGlobs[index]);
    assert.equal(regex.test(path.join(process.cwd(), name, "file.ts")), true);
    assert.equal(regex.test(path.join(process.cwd(), "src", "file.ts")), false);
  }
  await subscription.unsubscribe();
  await assert.rejects(
    wrapper.subscribe(process.cwd(), () => {}, { ignore: ["+(*a)"] }),
    /Repeated extglobs/,
  );
});

# Local picomatch security mitigation

This directory vendors the MIT-licensed npm release `picomatch@4.0.7`.
The upstream LICENSE and README are retained. Local version: `4.0.7-eden.1`.
The manifest omits upstream development dependencies and scripts, marks the
copy private, and includes this notice in its package files.

Upstream tarball integrity:
`sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==`

Advisory: https://github.com/advisories/GHSA-fc5q-39xc-vjpf

Until an upstream fix is available, `lib/safe-extglobs.js` rejects all unescaped
`+(...)` and `*(...)` constructs before regex compilation. This deliberately
restricts repeated extglob syntax, including nested forms and uses inside
character classes or quoted text. Ordinary stars, globstars, braces, optional
and negated extglobs retain upstream behavior. Escaped literal operators remain
supported. The guard runs in both the normal parser and its fast path, and
cannot be disabled by parser options.

Only `@parcel/watcher`'s `picomatch` dependency is overridden in package.json.
Its next-intl source watcher uses ordinary `**/directory/**` ignore patterns.
The current app does not enable next-intl's experimental source extractor.

Local file dependencies are not checked against npm's upstream advisory feed.
A clean audit therefore does not independently certify this patch. Run
`node --test tests/picomatch-security.test.ts` to verify the rejection and watcher
integration. Remove the override and this directory after a patched upstream
release is available and the regression tests pass against it.

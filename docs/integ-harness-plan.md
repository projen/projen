# Implementation Plan — Projen Cross-Platform Integration Test Harness

## Problem Statement
Projen's integration tests today are a set of bash scripts (`scripts/integ-*.sh`) plus one Jest snapshot suite (`test/integ.test.ts`), wired through the `IntegrationTests` component in `projenrc/integ-test.ts`. They only run on `ubuntu-latest` (bash-only), install the local tarball via ad-hoc `--no-save`/`replace`/`install-file` mechanics per language, and don't exercise the package-manager matrix. Replace this with a unified, cross-platform, Jest-based harness modeled on aws-cdk-cli's `@aws-cdk-testing/cli-integ`.

## Requirements
- Authoring model: TypeScript + Jest. Helper/engine library in `lib/`; suites are Jest tests in `tests/`. Runs cross-platform via Node.
- Assertions: Only expose what today's tests actually use — no speculative additions.
- Matrix: Each test self-declares which languages it applies to. Package managers exercised via a `test.each()`-style abstraction plus a simple facility to ensure a given PM is available. Per-language PM sets, kept minimal. GHA level: all tests run on Ubuntu + Windows × 3 Node versions, with a representative set of other-language versions.
- Packaging: A standalone package built as a projen child project (subproject), NOT published. Parent build produces artifacts with real version numbers; the harness serves them from local registries (Verdaccio for npm; equivalents for Python/Java/Go) — mirroring aws-cdk-cli's `--cli-source`/`publib-ca` approach without requiring AWS CodeArtifact.
- Must use the prebuilt artifacts in `dist/{js,python,java,go}`.
- All existing tests replaceable: TS create+build, downstream `npm ci` (#4746), Python import + `projen new python`, Java import compat, Go import compat, eject self-containment (#3679/#4407), and the projenrc snapshot suite (`test/integ.test.ts`).

## Background / Findings
- Current tarball handling (`scripts/integ-common.sh`): npm `install <tarball> --no-save`, Python `pipx run --spec=<wheel>`, Java `mvn install:install-file`, Go `go mod edit -replace`. Version asserted `== 0.0.0` (dev build). Moving to local registries lets all PMs resolve `projen@<version>` by name, so assert against the actual built version read from the artifact, not a hardcoded `0.0.0`.
- Local serving strategy (grounded in publib/aws-cdk-cli):
  - npm/yarn/pnpm/bun → Verdaccio local registry; `npm publish` the tarball, point each PM's registry at `http://localhost:<port>`.
  - Python (pip/uv) → local PEP-503 simple index (e.g. `pypiserver` or a static index dir) via `--index-url`/`PIP_INDEX_URL`/`UV_INDEX_URL`.
  - Java (Maven) → `dist/java` is already a file-based Maven repo layout; reference via generated `settings.xml`/`<repository>` `file://` URL (no `install-file`).
  - Go → file-based `GOPROXY` built from `dist/go` module layout (or `replace` fallback).
- Root project (`.projenrc.ts`) is a jsii `TypeScriptProject`. Subprojects created by passing `parent:`. The integ child project must NOT run during normal `build`, and must NOT publish. Package task names to reuse: `package:js`, `package:python`, `package:java`, `package:go`, `package-all`, `bundle:task-runner`.
- Windows blockers: all logic currently in bash. Engine must use Node APIs for temp dirs, paths, process spawning, and PM detection so it runs natively on `windows-latest`.

## Proposed Solution
A new child project (working name `@projen/integ`, `outdir: test/integ`, `release: false`, excluded from npmignore) containing:

```
test/integ/
├── src/
│   ├── engine/
│   │   ├── workspace.ts        # temp dir lifecycle (cross-platform)
│   │   ├── artifacts.ts        # locate dist/* + read built version
│   │   ├── command.ts          # cross-platform spawn + captured result
│   │   ├── assertions.ts       # ONLY the assertions current tests use
│   │   ├── registries/
│   │   │   ├── npm-verdaccio.ts
│   │   │   ├── python-index.ts
│   │   │   ├── maven-repo.ts
│   │   │   └── go-proxy.ts
│   │   └── package-managers/
│   │       ├── types.ts        # PackageManager iface: install/exec/isAvailable
│   │       ├── node.ts         # npm, yarn-classic, yarn-berry, pnpm, bun
│   │       ├── python.ts       # pip, uv (minimal)
│   │       └── index.ts        # helpers: eachAvailable(pms) for test.each
│   └── integ-test.ts           # test.each wrapper + language guards
├── tests/
│   ├── node-typescript.integ.test.ts   # create+build, downstream npm ci (#4746)
│   ├── eject.integ.test.ts             # #3679/#4407
│   ├── python.integ.test.ts
│   ├── java.integ.test.ts
│   ├── go.integ.test.ts
│   └── projenrc-snapshot.integ.test.ts # ports test/integ.test.ts
└── package.json (+ projen files)
```

The `IntegrationTests` component in `projenrc/integ-test.ts` is rewritten to: (a) instantiate the child project, (b) generate the new `integ` GitHub workflow with the OS × Node matrix and representative other-language versions, and (c) keep local `integ`/`integ:*` tasks. Old bash scripts and `test/integ.test.ts` are removed once parity is proven.

## Task Breakdown

Task 0: Write this plan to `docs/integ-harness-plan.md` (verbatim).
- Demo: file exists with the full plan.

Task 1: Scaffold the integ child project.
- In `projenrc/integ-test.ts`, create a non-published `TypeScriptProject` subproject (`parent: project`, `outdir: "test/integ"`, `release: false`, own Jest config with `testMatch` for `*.integ.test.ts`, generous timeouts, low `maxWorkers`). Exclude from parent npmignore and from parent's normal `build`/`test`. Add placeholder `tests/smoke.integ.test.ts` with `expect(true).toBe(true)`.
- Follow aws-cdk-cli "add a trivially succeeding suite first" strategy. Reuse parent prettier/eslint conventions.
- Test: placeholder runs green via child project's test task.
- Demo: `node ./projen.js` synths the child project; its test task runs the smoke test.

Task 2: Command runner + workspace + artifact resolution (engine core).
- Implement `command.ts` (cross-platform `spawn` wrapper returning `{code, stdout, stderr}`, no shell-injection, env overlay), `workspace.ts` (Node `mkdtemp` + guaranteed cleanup, Windows-safe paths), `artifacts.ts` (locate `dist/js/*.tgz`, `dist/python/*.whl`, `dist/java`, `dist/go`; read built version from tarball `package.json`).
- Port intent of `integ-common.sh` (`find_npm_tarball`, `setup_workdir`). Clear "run package-all first" error when artifacts missing.
- Test: unit tests for artifact discovery + version parsing (fixture/mock fs); temp-workspace lifecycle test (create + cleanup) on both path separators.
- Demo: test resolves tarball path + prints detected version; temp workdir created and removed.

Task 3: Assertion helpers grounded in current tests.
- Implement `assertions.ts` exposing only what today's tests use: `expectExit(result, code)`, `expectStdoutContains`, `fileExists`/`fileAbsent`, `jsonPathEquals` (`.projen/tree.json` → `projen.version` === built version), `fileContains`/`fileNotContains` (package.json projen reference + `scripts/run-task.cjs` rewire for eject), `directorySnapshot` (port of `test/util.ts` `directorySnapshot`/`sanitizeOutput`).
- Do NOT add assertions beyond these.
- Test: unit tests for each assertion (pass + fail paths) against fixtures.
- Demo: sample test asserts a fabricated `tree.json` version and a directory snapshot.

Task 4: npm/Verdaccio registry + Node package-manager abstraction.
- Implement `npm-verdaccio.ts` (start Verdaccio on ephemeral port, publish built tarball, expose registry URL, tear down) and `package-managers/node.ts` implementing `PackageManager` for npm, yarn-classic, yarn-berry, pnpm, bun — each with `isAvailable()`, `configureRegistry()`, `install()`, `exec()`. Add `eachAvailable()` for `test.each`.
- Keep simple: `isAvailable()` probes the binary; unavailable PMs are skipped (filtered), not failed. Verdaccio + all PMs must work on Windows.
- Test: integ test that, per available Node PM, installs `projen@<version>` from Verdaccio into a temp project and runs `projen --version` asserting it equals the built version.
- Demo: suite shows per-PM parametrized tests (npm/pnpm/yarn/bun) installing from local registry.

Task 5: Port the Node/TypeScript suite (create + build, downstream `npm ci` #4746).
- `node-typescript.integ.test.ts` — per available Node PM: `projen new typescript --project-tree`, `projen build`, assert synthesized `tree.json` version. Plus downstream consumer test (#4746): consumer `package.json` depending on `projen@<version>` from Verdaccio, install then `npm ci`, assert success.
- Replaces `scripts/integ-node.sh`. Node-only language guard.
- Demo: `integ:node` passes across available PMs, including #4746 check.

Task 6: Port the eject suite (#3679/#4407).
- `eject.integ.test.ts` — create TS project (npm), `projen eject`, assert `scripts/run-task.cjs` exists, `package.json` no longer references `projen` and is rewired to bundled runner; remove `node_modules/projen`; run `compile` through ejected runner and assert `lib/index.js` produced.
- Replaces `scripts/integ-eject.sh`. Requires `bundle:task-runner` output in tarball — workflow builds it before `package:js`.
- Demo: `integ:eject` passes with projen fully removed from `node_modules`.

Task 7: Python registry + suite.
- Implement `python-index.ts` (local PEP-503 index serving `dist/python/*.whl`) and minimal `package-managers/python.ts` (pip, uv with `isAvailable`). `python.integ.test.ts` — import-compat (`.projenrc.py` instantiating `Project` + synth) and `projen new python --no-post`, asserting synthesized version.
- Replaces `scripts/integ-python.sh`. Resolve `projen==<version>` by name from local index. Python-only guard.
- Demo: `integ:python` passes installing from local index on at least one Python version.

Task 8: Java and Go registries + suites.
- Implement `maven-repo.ts` (generate `settings.xml`/POM `<repository>` pointing at `file://dist/java`) and `go-proxy.ts` (file-based `GOPROXY` from `dist/go`, `replace` fallback). Add `java.integ.test.ts` (Maven project with `projenrc.java`, compile+run, assert version) and `go.integ.test.ts` (module + `projenrc.go`, run, assert version).
- Replaces `scripts/integ-java.sh` and `scripts/integ-go.sh`; prefer repository resolution over `install-file`/`replace` where clean, keeping real versions. java-only / go-only guards.
- Demo: `integ:java` and `integ:go` pass resolving projen from local repos.

Task 9: Port the projenrc snapshot suite.
- `projenrc-snapshot.integ.test.ts` — port `test/integ.test.ts`: discover `**/*.projenrc.js` fixtures under `test/integration`, synth against the INSTALLED projen (from Verdaccio, not a source symlink), sanitize, snapshot. Move/keep fixtures accessible to child project.
- Last piece to retire `test/integ.test.ts`. Snapshots absorb real version via existing sanitize logic.
- Demo: `integ:snapshot` passes against packaged artifact; old `test/integ.test.ts` can be deleted.

Task 10: Rewrite the `IntegrationTests` component and GHA workflow; retire old scripts.
- Rewrite `projenrc/integ-test.ts` to (a) wire the child project, (b) create `integ`/`integ:node|eject|python|java|go|snapshot` tasks that build/package the parent then run child suites, (c) regenerate the `integ` workflow: matrix `[ubuntu-latest, windows-latest]` × 3 Node versions for node/eject/snapshot suites, plus representative Python/Java/Go versions (each on Ubuntu + Windows), per-language setup steps, and a final aggregation job. Update `integ-versions.ts` for representative sets. Delete `scripts/integ-*.sh` and `test/integ.test.ts`. Update `AGENTS.md`/`CLAUDE.md` integration-test guidance to reference the new harness.
- Preserve existing self-contained-job + aggregation pattern; add Windows perf tweaks analogous to `WindowsBuild` (npm cache/TEMP on `D:`).
- Test: full parity check — every retired script's assertions exist in a suite; `node ./projen.js` synths cleanly; lint passes.
- Demo: new `integ` workflow runs all suites green on Ubuntu and Windows across the matrix, with no remaining bash scripts.

## Risk Notes
- Verdaccio/pypiserver startup and Windows PM availability (bun especially) are likely friction — Task 4/7 include `isAvailable()` skipping so missing PMs don't fail the matrix.
- Go/Java local-repo resolution with real versions is the other area to validate early (Task 8).

## Verification
After each task, run the child project's build/test task and `node ./projen.js eslint`. Do not run the full parent build (slow); run targeted tasks. Clean up temp files.

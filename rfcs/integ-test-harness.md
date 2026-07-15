# Cross-platform Integration Test Harness

> **Author**: [@mrgrain](https://github.com/mrgrain), **Status**: Implemented

projen ships to five package managers across four languages, but its end-to-end
tests were a set of bash scripts (`scripts/integ-*.sh`) plus a single Jest
snapshot suite. Because the scripts were bash, they only ran on Linux; each
language installed the local build through a different ad-hoc mechanism
(`npm install <tarball>`, `pipx run --spec=<wheel>`, `mvn install:install-file`,
`go mod edit -replace`); and none of them exercised more than one package
manager. As a result we could not catch regressions that only surface on
Windows or under yarn/pnpm/bun, even though we support all of them.

This RFC proposes (and describes the implementation of) a single cross-platform,
Jest-based integration test harness, modeled on aws-cdk-cli's
[`@aws-cdk-testing/cli-integ`](https://github.com/aws/aws-cdk-cli/tree/main/packages/%40aws-cdk-testing/cli-integ).
The harness is a non-published projen child project rooted at `integ/`. It
exercises the *packaged* release artifacts (`dist/{js,python,java,go}`) served
from local registries, runs identically on Unix and Windows, and covers all
supported package managers and languages.

## Problem Statement

The existing integration tests have four concrete shortcomings:

1. **Linux-only.** The logic lives in bash, so nothing runs on Windows.
2. **Inconsistent artifact handling.** Every language installs the local build
   differently, and the npm path (`npm install <tarball> --no-save`) does not
   resolve `projen` by name the way a real consumer does.
3. **No package-manager coverage.** Only npm is tested, despite yarn (classic
   and berry), pnpm, and bun being supported.
4. **Two parallel systems.** Bash scripts for cross-language checks and a Jest
   snapshot suite (`test/integ.test.ts`) for projenrc snapshots, with no shared
   assertions or runner.

## README (working backwards)

A contributor writes a suite as a plain Jest test under `integ/tests/` using the
harness helpers in `integ/src`. To add a test that runs across every available
Node package manager:

```ts
import {
  Artifacts, NpmRegistry, Workspace,
  expectExit, nodePackageManagerCases, runProjenCli,
} from "../src/integ-test";

const registry = /* started in beforeAll, publishes dist/js tarball */;

describe.each(nodePackageManagerCases())("%s", (_id, pm) => {
  test("creates a TypeScript project", () => {
    const ws = Workspace.create();
    try {
      pm.configureRegistry(ws.dir, registry.url);
      pm.install(ws.dir, `projen@${registry.version}`);
      expectExit(runProjenCli(ws.dir, ["new", "typescript"]), 0);
    } finally {
      ws.dispose();
    }
  });
});
```

Each suite declares which languages it applies to; package managers that are not
installed are skipped rather than failed, so the matrix degrades gracefully. A
contributor runs everything locally with:

```shell
$ npx projen integ            # build + package + run every suite
$ npx projen integ:node       # a single suite
```

and CI runs the same suites on Ubuntu and Windows across the Node version matrix
with a representative Python/Java/Go version each.

## Design

### A non-published child project

The harness is a projen `TypeScriptProject` subproject created in
`projenrc/integ-harness.ts` with `outdir: "integ"`, `release: false`,
`github: false`, and `package: false`. It is a top-level directory (deliberately
*not* under `test/`) so its code paths never mix with the parent's `src`/`test`.
The parent's `.npmignore` excludes `/integ/`, and the parent `jest`/`eslint`/
`tsc` globs (`src`/`test`) never pick it up.

### Engine (`integ/src/engine`)

- `command.ts` — a shell-free (`spawn`, `shell: false`) cross-platform command
  runner returning `{ code, stdout, stderr }`, with env overlay and Windows
  `.cmd` resolution. Running shell-free avoids bash-vs-cmd quoting differences.
- `workspace.ts` — temporary workspace lifecycle (`mkdtemp` + guaranteed
  cleanup) that works identically on both platforms.
- `artifacts.ts` — locates `dist/{js,python,java,go}` and the built version
  (handling jsii-pacmak's `projen@<version>.jsii.tgz` naming).
- `assertions.ts` — a small, deliberately scoped set of assertions: exit code,
  stdout/stderr contains, file exists/absent, JSON/text content, and directory
  snapshot + version sanitization. Nothing beyond what the suites use.
- `package-managers/` — an abstraction over npm, yarn, pnpm and bun with
  `isAvailable()`, `configureRegistry()` and `install()`, plus `eachAvailable()`
  for `test.each`.

### Local registries

The harness serves the packaged `projen` locally so any package manager resolves
it by name, exactly like a downstream consumer — while transitive dependencies
resolve from the public registries:

| Language | Mechanism |
| --- | --- |
| npm/yarn/pnpm/bun | Verdaccio, run as a child process bound to `127.0.0.1`, `projen` published locally and all other packages proxied to npmjs |
| Python (pip/uv) | `pip install --find-links <wheel dir>` |
| Java (Maven) | a `file://` `<repository>` pointing at `dist/java` |
| Go | a `go.mod` `replace` directive pointing at `dist/go/projen` |

> Note: Verdaccio is run as a child process rather than embedded, because the
> embedded programmatic server stalls on authenticated `npm publish` PUTs.

### Suites

The suites are one-to-one replacements for the retired scripts and snapshot
test: `node-typescript` (create+build across every Node PM, plus the #4746
downstream `npm ci` regression), `eject` (#3679/#4407), `python`, `java`, `go`,
and `projenrc-snapshot` (ports `test/integ.test.ts`).

### CI

`projenrc/integ-test.ts` (the `IntegrationTests` component) creates the child
project, exposes `integ` and `integ:<suite>` tasks, and generates an `integ`
GitHub workflow. The Node suites run on **Ubuntu and Windows** across the Node
version matrix; Python/Java/Go run on a representative (newest) version each,
also on both operating systems; a final aggregation job provides a single
required status check.

## Alternatives considered

- **Keep bash, add a Windows variant (PowerShell/batch).** Rejected: doubles the
  maintenance surface and still cannot share assertions with the Jest snapshot
  suite.
- **Publish to CodeArtifact (as aws-cdk-cli does via `publib-ca`).** Rejected
  for local/PR runs: it requires AWS credentials. Local registries give the same
  "resolve by name" fidelity with no cloud dependency.
- **Pre-seed Verdaccio storage instead of `npm publish`.** Considered while
  debugging the publish stall; running Verdaccio as a child process solved the
  stall without hand-crafting registry metadata.

## Migration

`scripts/integ-*.sh` and `test/integ.test.ts` (and its snapshot) are deleted.
The contributor guidance in `AGENTS.md`/`CLAUDE.md` now points at `integ/`. No
behavior visible to projen users changes; this is entirely test infrastructure.

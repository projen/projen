# Breaking Changes — Removal of Deprecated APIs

This release removes a large set of APIs that had been marked `@deprecated`. Most
removed APIs have a documented replacement. Where there is no drop-in replacement
(usually because the underlying feature no longer exists upstream), an **escape
hatch** is shown so you can still reproduce the old behavior. Entries below
include a before/after example.

> A smaller number of deprecated APIs were intentionally **kept** because removing
> them would require major internal changes or no obvious replacement exists.
> See [Deprecated but retained](#deprecated-but-retained) at the end.

---

## `javascript` — `NodeProject` / `NodeProjectOptions`

### `mutableBuild` (option) — removed

Use `buildWorkflowOptions.mutableBuild`.

```ts
// before
new NodeProject({ mutableBuild: false, /* ... */ });
// after
new NodeProject({ buildWorkflowOptions: { mutableBuild: false }, /* ... */ });
```

### `buildWorkflowTriggers` (option) — removed

Use `buildWorkflowOptions.workflowTriggers`.

```ts
// before
new NodeProject({ buildWorkflowTriggers: { push: {} }, /* ... */ });
// after
new NodeProject({ buildWorkflowOptions: { workflowTriggers: { push: {} } }, /* ... */ });
```

### `releaseWorkflow` (option) — removed

Use `release`.

```ts
// before
new NodeProject({ releaseWorkflow: true, /* ... */ });
// after
new NodeProject({ release: true, /* ... */ });
```

### `npmignore` (option) — removed

Use `project.addPackageIgnore(...)` after construction (or `npmIgnoreOptions`).

```ts
// before
new NodeProject({ npmignore: ["foo", "bar"], /* ... */ });
// after
const project = new NodeProject({ /* ... */ });
project.addPackageIgnore("foo");
project.addPackageIgnore("bar");
```

### `allowLibraryDependencies` (getter) — removed

Use `project.package.allowLibraryDependencies`.

```ts
// before
const allow = project.allowLibraryDependencies;
// after
const allow = project.package.allowLibraryDependencies;
```

### `entrypoint` (getter) — removed

Use `project.package.entrypoint`.

```ts
// before
const entry = project.entrypoint;
// after
const entry = project.package.entrypoint;
```

### `packageManager` (getter) — removed

Use `project.package.packageManager`.

```ts
// before
const pm = project.packageManager;
// after
const pm = project.package.packageManager;
```

### `manifest` (getter) — removed

Use `project.package.manifest` (still available on `NodePackage`).  
`NodePackage.manifest` is also deprecated, but retained while we are investigating a suitable replacement.

```ts
// before
project.manifest.scripts.foo = "bar";
// after
project.package.manifest.scripts.foo = "bar";
```

### `publisher` (property) — removed

Use `project.release?.publisher`.

```ts
// before
project.publisher?.publishToNpm();
// after
project.release?.publisher.publishToNpm();
```

### `hasScript(name)` (method) — removed

Use `project.tasks.tryFind(name)`.

```ts
// before
if (project.hasScript("build")) { /* ... */ }
// after
if (project.tasks.tryFind("build") !== undefined) { /* ... */ }
```

### `addCompileCommand(...cmds)` (method) — removed

Use `project.compileTask.exec(cmd)`.

```ts
// before
project.addCompileCommand("tsc", "echo done");
// after
project.compileTask.exec("tsc");
project.compileTask.exec("echo done");
```

### `addTestCommand(...cmds)` (method) — removed

Use `project.testTask.exec(cmd)`.

```ts
// before
project.addTestCommand("jest");
// after
project.testTask.exec("jest");
```

---

## `javascript` — `NodePackage` / `NodePackageOptions`

### `npmRegistry` (option) — removed

Use `npmRegistryUrl` (full URL, including scheme).

```ts
// before
{ npmRegistry: "my.registry.com" }
// after
{ npmRegistryUrl: "https://my.registry.com" }
```

### `scripts` (option) — removed

Define tasks/scripts explicitly.

```ts
// before
new NodeProject({ scripts: { foo: "echo bar" }, /* ... */ });
// after
const project = new NodeProject({ /* ... */ });
project.addTask("foo", { exec: "echo bar" });
// or: project.package.setScript("foo", "echo bar");
```

### `hasScript(name)` (method) — removed

Use `project.tasks.tryFind(name)`.

```ts
// before
if (pkg.hasScript("build")) { /* ... */ }
// after
if (pkg.project.tasks.tryFind("build") !== undefined) { /* ... */ }
```

### `projenCommand` (getter) — removed

Use `project.projenCommand`.

```ts
// before
const cmd = pkg.projenCommand;
// after
const cmd = project.projenCommand;
```

---

## `javascript` — `Yarnrc` (`YarnrcOptions` / `YarnNetworkSetting`)

### `caFilePath` (network setting) — removed

Use `httpsCaFilePath` (Yarn v4+).

```ts
// before
{ networkSettings: { "my-host": { caFilePath: "./ca.pem" } } }
// after
{ networkSettings: { "my-host": { httpsCaFilePath: "./ca.pem" } } }
```

### `ignoreCwd`, `lockfileFilename`, `pnpDataPath`, `preferAggregateCacheInfo` — removed

These options were removed from Yarn itself in v4, so they are no longer projen
options. If you are pinned to an older Yarn that still understands one of these keys,
write it straight into the rc file as a raw override:

```ts
// before
new YarnFile(project, { ignoreCwd: true });
// after — inject the raw key
(project.tryFindObjectFile(".yarnrc.yml") as ObjectFile)?.addOverride(
  "ignoreCwd",
  true,
);
```

---

## `javascript` — `Eslint` (`EslintOptions`)

### `lintProjenRcFile` (option) — removed

Add the file/directory through `devdirs` instead.

```ts
// before
{ lintProjenRcFile: ".projenrc.js" }
// after
{ devdirs: [".projenrc.js"] }
```

### `lintProjenRc` (option) — removed

projen no longer automatically adds lint patterns, rule overrides, or ignore-pattern
exceptions for `.projenrc.js`. To keep the old behavior, add them manually:

```ts
// before
{ lintProjenRc: true } // implicit default
// after
const project = new TypeScriptProject({ /* ... */ });
project.eslint?.addOverride({
  files: [".projenrc.js"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "import/no-extraneous-dependencies": "off",
  },
});
project.eslint?.addIgnorePattern("!.projenrc.js");
```

---

## `javascript` — `Jest` (`JestOptions` / `JestConfigOptions`)

### `coverage` (option) — removed

Use `jestConfig.collectCoverage`.

```ts
// before
{ jestOptions: { coverage: true } }
// after
{ jestOptions: { jestConfig: { collectCoverage: true } } }
```

### `ignorePatterns` (option) — removed

Use `jestConfig.coveragePathIgnorePatterns` and/or `jestConfig.testPathIgnorePatterns`.

```ts
// before
{ jestOptions: { ignorePatterns: ["/build/"] } }
// after
{ jestOptions: { jestConfig: {
    coveragePathIgnorePatterns: ["/build/"],
    testPathIgnorePatterns: ["/build/"],
} } }
```

### `JestConfigOptions` index signature (`[name: string]: any`) — removed

Use `additionalOptions` for arbitrary Jest config values.

```ts
// before
{ jestConfig: { someFutureJestOption: true } }
// after
{ jestConfig: { additionalOptions: { someFutureJestOption: true } } }
```

---

## `javascript` — `Bundler` (`BundlerOptions`)

### `addToPreCompile` (option) — removed

Use `runBundleTask`.

```ts
// before
{ addToPreCompile: false }
// after
{ runBundleTask: RunBundleTask.MANUAL }
// (addToPreCompile: true, the old default, maps to RunBundleTask.PRE_COMPILE)
```

---

## `awscdk`

### `AwsCdkConstructLibrary.version` (getter) — removed

Use `cdkVersion`.

```ts
// before
const v = project.version;
// after
const v = project.cdkVersion;
```

### `AwsCdkConstructLibrary.addCdkDependencies(...)` (method) — removed

CDK v2 ships all modules in `aws-cdk-lib`; add any extra (e.g. alpha) modules via
`deps`/`peerDeps`.

```ts
// before
project.addCdkDependencies("@aws-cdk/aws-lambda");
// after
project.addPeerDeps("@aws-cdk/aws-lambda-go-alpha");
```

### `AwsCdkConstructLibrary.addCdkTestDependencies(...)` (method) — removed

Add test dependencies via `devDeps` (all CDK v2 modules ship in `aws-cdk-lib`).

```ts
// before
project.addCdkTestDependencies("@aws-cdk/aws-lambda");
// after
project.addDevDeps("@aws-cdk/integ-tests-alpha");
```

### `ConstructLibraryAws` / `ConstructLibraryAwsOptions` — removed

Use `AwsCdkConstructLibrary` / `AwsCdkConstructLibraryOptions`.

```ts
// before
new awscdk.ConstructLibraryAws({ /* ... */ });
// after
new awscdk.AwsCdkConstructLibrary({ /* ... */ });
```

### `AwsCdkJavaApp.addCdkDependency(...)` (method) — removed

CDK v2 ships all modules in `software.amazon.awscdk/aws-cdk-lib`; add any extra
modules via `deps`.

```ts
// before
project.addCdkDependency("software.amazon.awscdk/aws-lambda");
// after
project.addDeps("software.amazon.awscdk/aws-lambda-go-alpha");
```

### `AwsCdkPythonAppOptions.testdir` / `AwsCdkPythonApp.testdir` — removed

Property was incorrectly named and always determined the location of the sample tests.
Use the more accurately named `sampleTestdir`.

```ts
// before
new awscdk.AwsCdkPythonApp({ testdir: "tests", /* ... */ });
// after
new awscdk.AwsCdkPythonApp({ sampleTestdir: "tests", /* ... */ });
```

### CDK v1 dependency subsystem — removed

AWS CDK v1 (which is end-of-support) is no longer supported at all. `AwsCdkDeps` and
all project types now require CDK v2 — constructing one with `cdkVersion: "1.x"` (or
any non-2 major) throws `AWS CDK v1 is not supported. Use "cdkVersion" 2.x`.

```ts
// before (CDK v1)
new awscdk.AwsCdkConstructLibrary({
  cdkVersion: "1.150.0",
  cdkDependencies: ["@aws-cdk/aws-lambda"],
  /* ... */
});
// after (CDK v2 — all modules are in aws-cdk-lib)
new awscdk.AwsCdkConstructLibrary({
  cdkVersion: "2.189.1",
  /* ... */
});
```

The following were removed along with v1 support:

- `cdkDependencies` → use `deps`/`peerDeps`.
- `cdkTestDependencies` → use `devDeps`/`testDeps`.
- `addV1Dependencies()` / `addV1DevDependencies()` → use `project.addDeps()` /
  `addPeerDeps()` / `addDevDeps()`.
- `AwsCdkJavaApp.addCdkDependency()` / `AwsCdkTypeScriptApp.addCdkDependency()` → use
  `deps`.
- `cdkAssert` / `cdkAssertions` → not needed; the assertions library is bundled in
  `aws-cdk-lib`.
- `cdkDependenciesAsDeps` (option + `AwsCdkDeps` property) → CDK v1 only; v2
  dependencies are managed normally, so there is nothing to configure.
- `AwsCdkPackageNames.coreV1` / `.assert` / `.assertions` → v2 only exposes `coreV2`
  and `constructs`.
- `CdkFeatureFlagsV1` / `CdkFeatureFlags.V1` → use `CdkFeatureFlags.V2`.

### `LambdaRuntime.NODEJS_10_X` / `NODEJS_12_X` — removed

These Node.js runtimes are EOL in AWS Lambda and can no longer be created or updated,
so they are no longer exposed as constants (Node.js 14/16/18 are retained for now).
Prefer a supported runtime; if you genuinely still need a removed one, recreate it via
the public `LambdaRuntime` constructor.

```ts
// before
runtime: LambdaRuntime.NODEJS_10_X,
// after — use a supported runtime
runtime: LambdaRuntime.NODEJS_20_X,
// or, to recreate the removed runtime exactly:
runtime: new awscdk.LambdaRuntime("nodejs10.x", "node10", {
  defaultExternals: ["aws-sdk"],
}),
```

---

## `release` — `Publisher` / `PublisherOptions` / `NpmPublishOptions`

### `jsiiReleaseVersion` (option and property) — removed

Use `publibVersion`.

```ts
// before
{ jsiiReleaseVersion: "^1" }
// after
{ publibVersion: "^1" }
```

> Note: `Release` still accepts a `jsiiReleaseVersion` option (it is **not**
> deprecated there); it now feeds `publibVersion` internally.

### `JsiiReleaseNpm` / `JsiiReleasePyPi` / `JsiiReleaseNuget` / `JsiiReleaseMaven` / `JsiiReleaseGo` (interfaces) — removed

Use `NpmPublishOptions` / `PyPiPublishOptions` / `NugetPublishOptions` /
`MavenPublishOptions` / `GoPublishOptions` respectively.

```ts
// before
const opts: JsiiReleaseNpm = { /* ... */ };
// after
const opts: NpmPublishOptions = { /* ... */ };
```

### `NpmPublishOptions.distTag` — removed

Set the dist-tag per release branch via `npmDistTag`.

```ts
// before
project.release.publisher.publishToNpm({ distTag: "next" });
// after (per-branch)
new Release(project, {
  /* ... */
  releaseBranches: { main: { majorVersion: 1, npmDistTag: "next" } },
});
```

---

## `release` — `Release` (`ReleaseProjectOptions` / `ReleaseOptions`)

### `releaseEveryCommit` (option) — removed

Use `releaseTrigger`.

```ts
// before
{ releaseEveryCommit: true }   // old default
{ releaseEveryCommit: false }
// after
{ releaseTrigger: ReleaseTrigger.continuous() }
{ releaseTrigger: ReleaseTrigger.manual({ changelog: false }) }
```

### `releaseSchedule` (option) — removed

Use `releaseTrigger`.

```ts
// before
{ releaseSchedule: "0 17 * * *" }
// after
{ releaseTrigger: ReleaseTrigger.scheduled({ schedule: "0 17 * * *" }) }
```

### `ReleaseOptions.task` (option) — removed

Use `tasks` (an array).

```ts
// before
new Release(project, { task: project.buildTask, /* ... */ });
// after
new Release(project, { tasks: [project.buildTask], /* ... */ });
```

---

## `github`

### `GitHubOptions.projenTokenSecret` — removed

Use `projenCredentials`.

```ts
// before
{ projenTokenSecret: "MY_SECRET" }
// after
{ projenCredentials: GithubCredentials.fromPersonalAccessToken({ secret: "MY_SECRET" }) }
```

### `GitHubProjectOptions.projenTokenSecret` — removed

Same replacement as above (`projenCredentials`).

```ts
// before
new NodeProject({ projenTokenSecret: "MY_SECRET", /* ... */ });
// after
new NodeProject({
  projenCredentials: GithubCredentials.fromPersonalAccessToken({ secret: "MY_SECRET" }),
  /* ... */
});
```

### `GitHubProjectOptions.mergify` — removed

Use `githubOptions.mergify`.

```ts
// before
new NodeProject({ mergify: false, /* ... */ });
// after
new NodeProject({ githubOptions: { mergify: false }, /* ... */ });
```

### `GitHubProjectOptions.mergifyOptions` — removed

Use `githubOptions.mergifyOptions`.

```ts
// before
new NodeProject({ mergifyOptions: { /* ... */ }, /* ... */ });
// after
new NodeProject({ githubOptions: { mergifyOptions: { /* ... */ } }, /* ... */ });
```

### `CIPermissions.repositoryProjects` / `AppPermissions.repositoryAnnouncementBanners` — removed

Removed by GitHub — these permission scopes no longer exist, so there is nothing to
replace them with. If GitHub ever introduces a new scope before projen adds it, inject
a raw key by overriding the rendered workflow file.

```ts
// before
permissions: { repositoryProjects: JobPermission.READ }
// after — drop it; or, to emit a custom scope, override the workflow file:
(project.tryFindObjectFile(".github/workflows/build.yml") as ObjectFile)?.addOverride(
  "jobs.build.permissions.some-new-scope",
  "read",
);
```

### `MergifyQueue.conditions` — removed

Removed by Mergify. Use `queueConditions`.

```ts
// before
{ name: "default", conditions: ["..."] }
// after
{ name: "default", queueConditions: ["..."] }
```

> (`MergifyRule.conditions` is unaffected — only the queue-level `conditions` was removed.)

### `WorkflowActions.setupGitIdentity(id)` (static method) — removed

Use `WorkflowSteps.setupGitIdentity(...)`.

```ts
// before
const steps = WorkflowActions.setupGitIdentity(id); // returned JobStep[]
// after
const steps = [WorkflowSteps.setupGitIdentity({ gitIdentity: id })];
```

---

## `cdk` — `JsiiProject` (`JsiiProjectOptions`)

### `python` (option) — removed

Use `publishToPypi`.

```ts
// before
new JsiiProject({ python: { distName: "x", module: "x" }, /* ... */ });
// after
new JsiiProject({ publishToPypi: { distName: "x", module: "x" }, /* ... */ });
```

### `dotnet` (option) — removed

Use `publishToNuget`.

```ts
// before
new JsiiProject({ dotnet: { dotNetNamespace: "X", packageId: "X" }, /* ... */ });
// after
new JsiiProject({ publishToNuget: { dotNetNamespace: "X", packageId: "X" }, /* ... */ });
```

---

## Core

### `ProjectType` enum + `GitHubProject.projectType` (option + property) — removed

The project type (`LIB`/`APP`/`UNKNOWN`) is no longer tracked; it had only minor effects in projen itself.
Similar `GitHubProjectOptions.projectType` and the `GitHubProject.projectType` property are
gone. For `PythonProject`, packaging is no longer auto-enabled based on `projectType`
— enable it explicitly. (`projectType` was otherwise just metadata; if your own code
branched on it, store the value yourself.)

```ts
// before
new PythonProject({ projectType: ProjectType.LIB, /* ... */ }); // implied setuptools
// after
new PythonProject({ setuptools: true, /* ... */ });
```

### `Project.tryFindJsonFile(path)` — removed

Use `tryFindObjectFile(path)`.

```ts
// before
const f = project.tryFindJsonFile("package.json");
// after
const f = project.tryFindObjectFile("package.json") as JsonFile | undefined;
```

### `Project.addTip(message)` — removed

Use `project.logger.info(message)`.

```ts
// before
project.addTip("watch out for X");
// after
project.logger.info("watch out for X");
```

### `typescript.TypeScriptLibraryProject` / `TypeScriptLibraryProjectOptions` — removed

Use `TypeScriptProject` / `TypeScriptProjectOptions`.

```ts
// before
new typescript.TypeScriptLibraryProject({ /* ... */ });
// after
new typescript.TypeScriptProject({ /* ... */ });
```

### `Projenrc` / `ProjenrcOptions` (in `projenrc-json`) — removed

Use `ProjenrcJson` / `ProjenrcJsonOptions`.

```ts
// before
new Projenrc(project, opts);
// after
new ProjenrcJson(project, opts);
```

### `Version.STANDARD_VERSION` (static) — removed

Use the `bumpPackage` option on `Version`. The previous constant value was
`"commit-and-tag-version@^12"`.

```ts
// before
const pkg = Version.STANDARD_VERSION;
// after
new Version(project, { bumpPackage: "commit-and-tag-version@^12", /* ... */ });
```

### `Semver` class — removed (and dropped from the package exports)

Specify semver requirements inline as strings instead.

```ts
// before
deps: [Semver.caret("4.0.0")]
// after
deps: ["express@^4.0.0"]
```

### `Task.prepend(shell)` — removed

Use `Task.prependExec(shell)`.

```ts
// before
task.prepend("echo first");
// after
task.prependExec("echo first");
```

### `python.PytestOptions.testdir` / `Pytest.testdir` — removed

Reference `sampleTestdir` on the project; to change the test discovery directory use
`testMatch`.

```ts
// before
new PythonProject({ pytestOptions: { testdir: "tests" }, /* ... */ });
// after
new PythonProject({ sampleTestdir: "tests", /* ... */ });
// to change where tests are discovered:
new PythonProject({ pytestOptions: { testMatch: ["tests/unit"] }, /* ... */ });
```

### `python.SetupPyOptions` index signature (`[name: string]: any`) — removed

Use `additionalOptions`.

```ts
// before
{ setupConfig: { someExtraField: "x" } as any }
// after
{ additionalOptions: { someExtraField: "x" } }
```

### `gitlab` `Reports.cobertura` — removed

Use `coverageReport` (GitLab deprecated the `cobertura` keyword).

```ts
// before
{ reports: { cobertura: ["coverage/cobertura-coverage.xml"] } }
// after
{ reports: { coverageReport: {
    coverageFormat: "cobertura",
    path: "coverage/cobertura-coverage.xml",
} } }
```

### `web.ReactTypeDef` / `ReactTypeDefOptions` — removed

These were unused (`@deprecated No longer used.`). If you still want the generated
type-reference file, create it with a plain `TextFile`.

```ts
// before
new ReactTypeDef(project, "src/react-app-env.d.ts");
// after
new TextFile(project, "src/react-app-env.d.ts", {
  lines: ['/// <reference types="react-scripts" />'],
});
```

---

## CLI

### Legacy synthesis (`--rc` / `tryLegacySynth`) — removed

The deprecated `--rc` CLI flag and the legacy synthesis fallback (running
`node .projenrc.js` directly when there is no `default` task) have been removed.
Modern projen projects always synthesize via the generated `default` task. To run a
projenrc directly (the old `--rc` behavior), invoke it with node.

```console
# before
$ projen --rc ./custom-projenrc.js
# after — run the projenrc directly
$ node ./custom-projenrc.js
```

---

## Deprecated but retained

The following remained `@deprecated` but are **not** removed today.
Removing them would require larger internal changes, or no suitable replacement is available yet.
They remain candidates for future removal.

- **`GitHubProject` class** — still the base class for `NodeProject`, `JavaProject`,
  and `PythonProject`. Removing it requires abstracting CI/CD "engines" away from
  GitHub first.
- **`NodePackageManager.YARN` and `YARN2`** — load-bearing across package-manager
  inference logic; projen's own docs note `YARN` may later be repurposed. Use
  `YARN_CLASSIC` / `YARN_BERRY` in new code.
- **`NodePackage.manifest`** — the live backing store for `package.json`, read across
  modules; there is no read replacement (`addField` only writes).
- **`JsiiProject` `authorAddress` vs `authorEmail` / `authorUrl`** — jsii reconciles
  its required `authorAddress` with the inherited `authorEmail`/`authorUrl`, and its
  error messages call the latter two "deprecated". Retained because the future author
  API is undecided.
- **Implicit `packageManager` default** — when `packageManager` is not set on a
  `NodePackage` / `NodeProject` (and cannot be inferred from an existing
  `package.json`), projen logs a `[DEPRECATED]` warning and falls back to
  `NodePackageManager.YARN_CLASSIC`. This default is intended to become a required
  option in a future version, but is retained for now because it was only recently
  introduced. Set `packageManager` explicitly to silence the warning and pin the
  behavior.

Some values are "soft-deprecated" by upstream services. They are discouraged from use,
but otherwise functional. Projen keeps these values until the upstream service fully
removes support for them:

- **Deprecated Lambda runtimes (newer EOL)** — `LambdaRuntime.NODEJS_14_X` / `16_X` /
  `18_X`; prefer newer runtimes (e.g. `NODEJS_20_X`, `NODEJS_22_X`).
- **`DockerComposeProps.schemaVersion`** — the obsolete top-level Compose `version:`
  field. Retained since this is only a soft-deprecation upstream and is harmless.

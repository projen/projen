import { NodePackageManager } from "../src/javascript";
import type { TypeScriptProject } from "../src/typescript";
import { TypeScriptProject as TypeScriptProjectImpl } from "../src/typescript";

/**
 * Creates the projen integration-test harness as a non-published child project
 * (subproject) rooted at `integ` (a top-level directory, kept out of the
 * parent's `src`/`test` code paths).
 *
 * The harness is a cross-platform, Jest-based test runner that exercises the
 * *packaged* projen artifacts (the npm tarball in `dist/js`, the wheel in
 * `dist/python`, the Maven repo in `dist/java` and the Go module in `dist/go`)
 * served from local registries. It is modeled on aws-cdk-cli's
 * `@aws-cdk-testing/cli-integ` package.
 *
 * This child project is intentionally NOT released/published and does not run
 * as part of the parent's normal `build`/`test`.
 */
export function setupIntegHarness(
  parent: TypeScriptProject,
): TypeScriptProject {
  const integ = new TypeScriptProjectImpl({
    parent,
    outdir: "integ",
    name: "@projen/integ",
    description:
      "Cross-platform integration test harness for projen (not published)",
    defaultReleaseBranch: "main",
    packageManager: NodePackageManager.NPM,

    // Match the parent repo's formatting (prettier, double quotes).
    prettier: true,

    // This project is managed by the parent's .projenrc.ts - it has no
    // projenrc of its own, is never released, and owns no CI (the parent
    // generates the integ workflow).
    projenrcJson: false,
    release: false,
    github: false,
    buildWorkflow: false,
    package: false,
    sampleCode: false,
    licensed: false,
    entrypoint: "",

    // The harness installs projen from a local registry at runtime; it must not
    // bake in a projen version as a dependency.
    projenDevDependency: false,

    // fast-glob is imported from src/ (engine), so it is a runtime dependency;
    // cross-spawn gives robust cross-platform command execution (Windows .cmd
    // shims and PATHEXT). verdaccio is only used to stand up a throwaway
    // registry (dev tooling).
    deps: ["fast-glob", "cross-spawn"],
    devDeps: ["verdaccio", "@types/cross-spawn"],

    tsconfig: {
      compilerOptions: {
        lib: ["es2022"],
        target: "ES2022",
        module: "commonjs",
        esModuleInterop: true,
        skipLibCheck: true,
      },
    },

    jestOptions: {
      configFilePath: "jest.config.json",
      jestConfig: {
        // Integration suites live in tests/*.integ.test.ts; engine unit tests
        // live alongside the engine in src/**/*.test.ts.
        testMatch: [
          "<rootDir>/tests/**/*.integ.test.ts",
          "<rootDir>/src/**/*.test.ts",
        ],
        // Installing packages / spawning toolchains is slow.
        testTimeout: 1500000,
        // Suites spawn child processes and start local registries; keep them
        // serialized to avoid port/CPU contention.
        maxWorkers: 1,
        coverageThreshold: undefined,
      },
    },
  });

  // Do not force coverage - these are end-to-end tests, not unit tests.
  integ.jest?.addIgnorePattern("/node_modules/");

  // The harness is a top-level directory; keep it out of the published package.
  parent.npmignore?.exclude("/integ/");

  return integ;
}

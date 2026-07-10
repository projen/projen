import { NodePackageManager } from "../src/javascript";
import type { TypeScriptProject } from "../src/typescript";
import { TypeScriptProject as TypeScriptProjectImpl } from "../src/typescript";

/**
 * Creates the projen integration-test harness as a non-published child project
 * (subproject) rooted at `test/integ`.
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
export function setupIntegHarness(parent: TypeScriptProject): TypeScriptProject {
  const integ = new TypeScriptProjectImpl({
    parent,
    outdir: "test/integ",
    name: "@projen/integ",
    description:
      "Cross-platform integration test harness for projen (not published)",
    defaultReleaseBranch: "main",
    packageManager: NodePackageManager.NPM,

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

    devDeps: ["verdaccio", "fast-glob"],

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
        testTimeout: 600000,
        // Suites spawn child processes and start local registries; keep them
        // serialized to avoid port/CPU contention.
        maxWorkers: 1,
        coverageThreshold: undefined,
      },
    },
  });

  // Do not force coverage - these are end-to-end tests, not unit tests.
  integ.jest?.addIgnorePattern("/node_modules/");

  return integ;
}

/**
 * Interface defining the supported language versions for integration tests.
 */
export interface JavaVersion {
  /** Java version number */
  version: string;
  /** Java distribution (e.g., 'corretto', 'temurin', 'zulu') */
  distribution: string;
}

/**
 * Interface defining all supported language versions for integration tests.
 */
export interface LanguageVersions {
  /** Node.js versions for JS/Go/Java tests */
  node: string[];
  /** Python versions for Python tests */
  python: string[];
  /** Go versions for Go tests */
  go: string[];
  /** Java versions and distributions for Java tests */
  java: JavaVersion[];
}

/**
 * Centralized configuration for all integration test language versions.
 *
 * This constant defines the versions of each programming language runtime
 * that integration tests will run against. Update this single location
 * to modify the version matrix for CI workflows.
 */
export const INTEG_TEST_VERSIONS: LanguageVersions = {
  // Latest patch of each LTS line (`lts/-N`) plus the oldest viable patch as
  // canaries for APIs added in later patches, e.g. `process.getBuiltinModule`
  // (20.16 / 22.3, never in 18.x) whose absence broke all task commands (#4846).
  // 18.18.0/20.9.0 are the oldest patches the generated project's toolchain
  // supports (eslint 9); node 16 can't run the toolchain at all.
  node: ["18.18.0", "20.9.0", "lts/-2", "22.0.0", "lts/-1", "24.0.0", "lts/*"],
  python: ["3.10", "3.11", "3.12", "3.13", "3.14"],
  go: ["1.25.x", "1.26.x"],
  java: [
    { version: "8", distribution: "corretto" },
    { version: "11", distribution: "corretto" },
    { version: "17", distribution: "corretto" },
    { version: "21", distribution: "corretto" },
    { version: "25", distribution: "corretto" },
  ],
};

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
  // Latest patch of each LTS line (`lts/-N`) plus the minimum supported
  // version as a canary for APIs added in later patches. 22.13.0 is the first
  // 22.x that can `require()` ESM-only dependencies without an experimental
  // warning.
  node: ["22.13.0", "lts/-2", "lts/-1", "lts/*"],
  python: ["3.11", "3.12", "3.13", "3.14", "3.15"],
  go: ["1.26.x", "1.27.x"],
  java: [
    { version: "8", distribution: "corretto" },
    { version: "11", distribution: "corretto" },
    { version: "17", distribution: "corretto" },
    { version: "21", distribution: "corretto" },
    { version: "25", distribution: "corretto" },
  ],
};

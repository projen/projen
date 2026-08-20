import type { IConstruct } from "constructs";
import { SonarqubeProperties } from "./sonarqube";
import type { SonarqubePropertiesOptions } from "./sonarqube";
import { deepMerge } from "../util";

/**
 * Options for `SonarqubeRustProperties`.
 *
 * Extends base options with Rust-specific defaults.
 */
export interface SonarqubeRustPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for Rust projects.
 *
 * Provides sensible defaults for Rust analysis:
 * - `sonar.language` = `rust`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `tests`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - Typical exclusions for `coverage`, test, and `target` dirs
 * - `sonar.rust.lcov.reportPaths` = `target/lcov.info`
 * - `sonar.rust.clippy.enabled` = `false`
 * - `sonar.rust.clippyReport.reportPaths` = `target/clippy.json`
 *
 * All defaults can be overridden via options. Nested options (e.g. `coverage`,
 * `rust`) are deep-merged with the defaults, so overriding one nested field
 * does not drop the other defaults in that subtree.
 *
 * @example
 * new SonarqubeRustProperties(project, {
 *   projectKey: 'my-org_my-rust-project',
 * });
 */
export class SonarqubeRustProperties extends SonarqubeProperties {
  constructor(scope: IConstruct, options: SonarqubeRustPropertiesOptions) {
    super(
      scope,
      deepMerge([
        {
          language: "rust",
          sources: "src",
          tests: "tests",
          sourceEncoding: "UTF-8",
          profile: "Sonar Way",
          scm: { provider: "git" },
          exclusions: ["**/coverage/**", "**/tests/**", "**/target/**"],
          coverage: {
            exclusions: ["**/tests/**", "**/target/**"],
          },
          cpd: { exclusions: ["**/tests/**/*.json"] },
          rust: {
            lcov: { reportPaths: ["target/lcov.info"] },
            clippy: { enabled: false },
            clippyReport: { reportPaths: ["target/clippy.json"] },
          },
        },
        options,
      ]) as SonarqubeRustPropertiesOptions,
    );
  }
}

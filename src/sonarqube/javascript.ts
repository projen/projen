import type { IConstruct } from "constructs";
import { SonarqubeProperties } from "./sonarqube";
import type { SonarqubePropertiesOptions } from "./sonarqube";
import { deepMerge } from "../util";

/**
 * Options for `SonarqubeJavascriptProperties`.
 *
 * Extends base options with JavaScript-specific defaults.
 */
export interface SonarqubeJavascriptPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for JavaScript projects.
 *
 * Provides sensible defaults for JavaScript analysis:
 * - `sonar.language` = `js`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `test`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - Typical exclusions for `node_modules`, `coverage`, and test files
 * - `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`
 *
 * All defaults can be overridden via options. Nested options (e.g. `coverage`,
 * `javascript`) are deep-merged with the defaults, so overriding one nested
 * field does not drop the other defaults in that subtree.
 *
 * @example
 * new SonarqubeJavascriptProperties(project, {
 *   projectKey: 'my-org_my-js-project',
 * });
 */
export class SonarqubeJavascriptProperties extends SonarqubeProperties {
  constructor(
    scope: IConstruct,
    options: SonarqubeJavascriptPropertiesOptions,
  ) {
    super(
      scope,
      deepMerge([
        {
          language: "js",
          sources: "src",
          tests: "test",
          sourceEncoding: "UTF-8",
          profile: "Sonar Way",
          scm: { provider: "git" },
          exclusions: [
            "**/node_modules/**",
            "**/coverage/**",
            "**/test/**",
            "**/__tests__/**",
            "**/*.test.ts",
            "**/*.spec.ts",
          ],
          coverage: { exclusions: ["**/test/**", "**/__tests__/**"] },
          cpd: { exclusions: ["**/test/**/*.json", "**/__tests__/**/*.json"] },
          javascript: { lcov: { reportPaths: ["coverage/lcov.info"] } },
        },
        options,
      ]) as SonarqubeJavascriptPropertiesOptions,
    );
  }
}

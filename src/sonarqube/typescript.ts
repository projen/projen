import type { IConstruct } from "constructs";
import { SonarqubeProperties } from "./sonarqube";
import type { SonarqubePropertiesOptions } from "./sonarqube";
import { deepMerge } from "../util";

/**
 * Options for `SonarqubeTypescriptProperties`.
 *
 * Extends base options with TypeScript-specific defaults.
 */
export interface SonarqubeTypescriptPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for TypeScript projects.
 *
 * Provides sensible defaults for TypeScript analysis:
 * - `sonar.language` = `ts`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `test`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - `sonar.typescript.tsconfigPath` = `tsconfig.json`
 * - Typical exclusions for `node_modules`, `coverage`, test files
 * - `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`
 *
 * All defaults can be overridden via options. Nested options (e.g. `coverage`,
 * `javascript`) are deep-merged with the defaults, so overriding one nested
 * field does not drop the other defaults in that subtree.
 *
 * @example
 * new SonarqubeTypescriptProperties(project, {
 *   projectKey: 'my-org_my-ts-project',
 * });
 */
export class SonarqubeTypescriptProperties extends SonarqubeProperties {
  constructor(
    scope: IConstruct,
    options: SonarqubeTypescriptPropertiesOptions,
  ) {
    super(
      scope,
      deepMerge([
        {
          language: "ts",
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
            "**/dist/**",
            "**/build/**",
          ],
          coverage: { exclusions: ["**/test/**", "**/__tests__/**"] },
          cpd: { exclusions: ["**/test/**/*.json", "**/__tests__/**/*.json"] },
          javascript: { lcov: { reportPaths: ["coverage/lcov.info"] } },
          typescript: { tsconfigPath: "tsconfig.json" },
        },
        options,
      ]) as SonarqubeTypescriptPropertiesOptions,
    );
  }
}

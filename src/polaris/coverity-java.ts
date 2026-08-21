import { PolarisCoverity } from "./coverity";
import type { PolarisCoverityOptions } from "./coverity";
import { LanguagesConfigurationInclude } from "./coverity-config";
import type { Project } from "../project";
import { deepMerge } from "../util";

/**
 * Options for `PolarisCoverityJava`.
 *
 * Extends base options with Java-specific defaults.
 */
export interface PolarisCoverityJavaOptions extends PolarisCoverityOptions {}

/**
 * A Coverity on Polaris configuration preset for Java projects.
 *
 * Provides sensible defaults for Java analysis:
 * - `capture.languages.include` = `[java]`
 * - `capture.buildCapture.buildCommand` = `mvn package`
 * - `capture.buildCapture.cleanCommand` = `mvn clean`
 * - `capture.compilerConfiguration.covConfigure` = `[["--java"]]`
 * - `capture.files.excludeRegex` excludes `target`, `dist/java` and other
 *   conventional Maven/Gradle build artifacts
 *
 * All defaults can be overridden via options. Nested options (e.g.
 * `capture`) are deep-merged with the defaults, so overriding one nested
 * field does not drop the other defaults in that subtree.
 *
 * @example
 * new PolarisJavaCoverity(project, {
 *   commit: {},
 * });
 */
export class PolarisJavaCoverity extends PolarisCoverity {
  constructor(project: Project, options: PolarisCoverityJavaOptions) {
    super(
      project,
      deepMerge([
        {
          capture: {
            buildCapture: {
              buildCommand: "mvn package",
              cleanCommand: "mvn clean",
            },
            compilerConfiguration: {
              covConfigure: [["--java"]],
            },
            files: {
              excludeRegex: "(\\.settings/.*|dist/java/.*|target/.*)",
            },
            languages: {
              include: [LanguagesConfigurationInclude.JAVA],
            },
          },
        },
        options,
      ]) as PolarisCoverityJavaOptions,
    );
  }
}

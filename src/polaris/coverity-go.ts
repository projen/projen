import { PolarisCoverity } from "./coverity";
import type { PolarisCoverityOptions } from "./coverity";
import { LanguagesConfigurationInclude } from "./coverity-config";
import type { Project } from "../project";
import { deepMerge } from "../util";

/**
 * Options for `PolarisCoverityGo`.
 *
 * Extends base options with Go-specific defaults.
 */
export interface PolarisCoverityGoOptions extends PolarisCoverityOptions {}

/**
 * A Coverity on Polaris configuration preset for Go projects.
 *
 * Provides sensible defaults for Go analysis:
 * - `capture.languages.include` = `[go]`
 * - `capture.buildCapture.buildCommand` = `go build .`
 * - `capture.compilerConfiguration.covConfigure` = `[["--go"]]`
 * - `capture.files.excludeRegex` excludes `vendor`, `bin` and other
 *   conventional Go build artifacts
 *
 * All defaults can be overridden via options. Nested options (e.g.
 * `capture`) are deep-merged with the defaults, so overriding one nested
 * field does not drop the other defaults in that subtree.
 *
 * @example
 * new PolarisGoCoverity(project, {
 *   commit: {},
 * });
 */
export class PolarisGoCoverity extends PolarisCoverity {
  constructor(project: Project, options: PolarisCoverityGoOptions) {
    super(
      project,
      deepMerge([
        {
          capture: {
            buildCapture: {
              buildCommand: "go build .",
            },
            compilerConfiguration: {
              covConfigure: [["--go"]],
            },
            files: {
              excludeRegex: "(vendor/.*|bin/.*|dist/.*)",
            },
            languages: {
              include: [LanguagesConfigurationInclude.GO],
            },
          },
        },
        options,
      ]) as PolarisCoverityGoOptions,
    );
  }
}

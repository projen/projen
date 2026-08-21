import { PolarisCoverity } from "./coverity";
import type { PolarisCoverityOptions } from "./coverity";
import { LanguagesConfigurationInclude } from "./coverity-config";
import type { Project } from "../project";
import { deepMerge } from "../util";

/**
 * Options for `PolarisCoverityJavascript`.
 *
 * Extends base options with JavaScript/TypeScript-specific defaults.
 */
export interface PolarisCoverityJavascriptOptions extends PolarisCoverityOptions {}

/**
 * A Coverity on Polaris configuration preset for JavaScript/TypeScript
 * projects.
 *
 * Provides sensible defaults for JavaScript/TypeScript analysis:
 * - `capture.languages.include` = `[javascript]`
 * - `capture.files.excludeRegex` excludes `node_modules`, `lib`, `dist`,
 *   `coverage` and other build artifacts, based on the paths projen's
 *   `TypeScriptProject` excludes from git by default
 *
 * All defaults can be overridden via options. Nested options (e.g.
 * `capture`) are deep-merged with the defaults, so overriding one nested
 * field does not drop the other defaults in that subtree.
 *
 * @example
 * new PolarisJavascriptCoverity(project, {
 *   commit: {},
 * });
 */
export class PolarisJavascriptCoverity extends PolarisCoverity {
  constructor(project: Project, options: PolarisCoverityJavascriptOptions) {
    super(
      project,
      deepMerge([
        {
          capture: {
            files: {
              excludeRegex:
                "(node_modules/.*|lib/.*|dist/.*|coverage/.*|.*\\.d\\.ts|.*\\.js\\.map)",
            },
            languages: {
              include: [LanguagesConfigurationInclude.JAVASCRIPT],
            },
          },
        },
        options,
      ]) as PolarisCoverityJavascriptOptions,
    );
  }
}

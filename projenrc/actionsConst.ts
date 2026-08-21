import { readFileSync } from "node:fs";
import * as JSONC from "comment-json";
import type { FileBaseOptions, Project } from "../src";
import { TextFile } from "../src";
import { Biome, Eslint, Jest } from "../src/javascript";

/**
 * A single action entry in the map.
 */
export interface ActionEntry {
  /**
   * The approved version line (e.g. "v7"). Changing this requires human
   * review. Used directly as a floating tag unless a pin is set.
   */
  readonly major: string;
  /**
   * Optional concrete ref (commit SHA or immutable tag) within the major
   * line. Written by the update script, never by hand.
   */
  readonly pin?: string;
  /**
   * The human-readable version the pin corresponds to. Required when the pin
   * is not self-describing (i.e. a SHA).
   */
  readonly version?: string;
  /**
   * Whether the pin is an immutable tag: a release GitHub reports as
   * immutable, meaning the tag cannot be repointed and is as strong a
   * guarantee as a commit SHA. Set from the GitHub API, not by hand.
   */
  readonly isImmutable?: boolean;
}

/**
 * The shape of the github-actions.jsonc file.
 */
export interface ActionsFile {
  /**
   * Map of action name to its entry.
   */
  readonly actions: Record<string, ActionEntry>;
}

export interface ActionsConstOptions extends FileBaseOptions {
  /**
   * The path to the jsonc file holding the action map.
   */
  readonly jsonPath: string;
  /**
   * The path to the generated file.
   */
  readonly filePath: string;
  /**
   * A comment describing the contents
   * @default - a generic description
   */
  readonly comment?: string;
}

/**
 * A component that generates a typescript file exporting one constant per
 * GitHub Action, holding its fully qualified reference (`owner/repo@ref`).
 *
 * The source of truth is a jsonc map of action name to version information,
 * so that all action versions used across the code base can be reviewed and
 * bumped in a single place. Comments in that file explain any non-obvious
 * pins.
 *
 * The reference uses the entry's `pin` when set (a concrete ref within the
 * approved major line), and the floating `major` tag otherwise.
 */
export class ActionsConst extends TextFile {
  constructor(project: Project, options: ActionsConstOptions) {
    super(project, options.filePath, {
      committed: true,
      marker: true,
      readonly: true,
    });

    const fileContent = readFileSync(options.jsonPath, "utf-8");
    // The third argument strips comments, so we get a plain object back.
    const data = JSONC.parse(
      fileContent,
      undefined,
      true,
    ) as unknown as ActionsFile;

    Eslint.of(project)?.addIgnorePattern(this.path);
    Biome.of(project)?.addFilePattern(`!${this.path}`);
    Jest.of(project)?.addIgnorePattern(this.path);

    if (this.marker) {
      this.addLine(`// ${this.marker}\n`);
    }

    const comment =
      options.comment ??
      "Fully qualified references for all GitHub Actions used by this project.";

    this.addLine("/**");
    for (const line of comment.split("\n")) {
      this.addLine(` * ${line}`);
    }
    this.addLine(" */");
    this.addLine("export class GitHubActions {");

    // Guard against two action names collapsing into the same constant name,
    // which would produce a file that does not compile.
    const seen = new Map<string, string>();

    for (const action of Object.keys(data.actions).sort()) {
      const entry = data.actions[action];
      const name = constantName(action);

      const collision = seen.get(name);
      if (collision) {
        throw new Error(
          `Actions "${collision}" and "${action}" both map to the constant "${name}". Rename one of them in ${options.jsonPath}.`,
        );
      }
      seen.set(name, action);

      const ref = entry.pin ?? entry.major;
      const label = entry.version ?? entry.pin ?? entry.major;
      const immutable = entry.isImmutable ? " (immutable)" : "";

      this.addLine(`  /** ${action} at ${label}${immutable} */`);
      this.addLine(`  public static readonly ${name} = "${action}@${ref}";`);
    }

    this.addLine("");
    this.addLine("  private constructor() {}");
    this.addLine("}");
  }
}

/**
 * Derive a constant name from an action name.
 *
 * `actions/setup-node` becomes `ACTIONS_SETUP_NODE`.
 */
function constantName(action: string): string {
  return action.replace(/[^a-zA-Z0-9]+/g, "_").toUpperCase();
}
